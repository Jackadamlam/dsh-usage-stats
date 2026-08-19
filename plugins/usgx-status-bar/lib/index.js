/**
 * usgx-status-bar — server half (self-contained).
 *
 * Registers two read-only endpoints that serve data WITHOUT depending on the
 * upstream dsh-usage-stats plugin:
 *   GET /api/usgx/usage   — per-day, per-model token usage aggregated from
 *                           live and persisted session logs (self-contained)
 *   GET /api/usgx/balance — DeepSeek account balance via the official
 *                           /user/balance endpoint (self-contained)
 *
 * Requests carry no credentials in the response; the API key is resolved from
 * the harness credentials seam at request time and only sent to the provider.
 *
 * @module usgx-status-bar
 */

import { consumeEvents, renderUsage } from './usage.js'

/** Stable Cordis plugin name. */
export const name = 'usgx-status-bar'

/** Services required before this plugin activates. */
export const inject = ['webServer']

/** Default DeepSeek connection facts when the settings namespace is absent. */
const DEEPSEEK_DEFAULTS = {
  apiKeyEnv: 'DEEPSEEK_API_KEY',
  baseURL: 'https://api.deepseek.com',
}

const UPSTREAM_TIMEOUT_MS = 15000

/** Write a JSON response. */
function json(res, status, value) {
  res.writeHead(status, { 'content-type': 'application/json' })
  res.end(JSON.stringify(value))
}

/**
 * Collect per-day usage across live and persisted sessions (full fold, no
 * incremental cache — this is a lean self-contained read; DSH logs are
 * re-folded on each request, which is fine at the 5-minute cadence).
 */
async function collectUsage(ctx) {
  const byDay = new Map()
  const liveIds = new Set()
  const live = ctx.get('sessions')
  if (live !== undefined) {
    for (const session of live.list()) {
      liveIds.add(session.id)
      const events = session.events
      if (Array.isArray(events) && events.length > 0) consumeEvents(byDay, events)
    }
  }
  const persistence = ctx.get('sessionPersistence')
  if (persistence !== undefined && typeof persistence.list === 'function') {
    let metas = []
    try {
      metas = await persistence.list()
    } catch {
      metas = []
    }
    for (const meta of metas) {
      if (liveIds.has(meta.id)) continue
      try {
        const { events } = await persistence.readFrom(meta.id, 0)
        if (Array.isArray(events) && events.length > 0) consumeEvents(byDay, events)
      } catch {
        /* unreadable session: skip, never fatal */
      }
    }
  }
  return renderUsage(byDay, Date.now())
}

/** Resolve one provider's API key from the credentials seam (env ref). */
async function resolveKey(ctx, apiKeyEnv) {
  if (typeof apiKeyEnv !== 'string' || apiKeyEnv.length === 0) return ''
  const credentials = ctx.get('credentials')
  if (credentials === undefined || typeof credentials.resolve !== 'function') return ''
  try {
    const hit = await credentials.resolve(apiKeyEnv)
    return typeof hit?.value === 'string' && hit.value.length > 0 ? hit.value : ''
  } catch {
    return ''
  }
}

/** Query the DeepSeek account balance (GET {base}/user/balance, Bearer key). */
async function queryDeepseekBalance(ctx) {
  const settings = ctx.get('settings')
  const ds = settings?.get?.('llm-deepseek')
  const apiKeyEnv = ds !== undefined && typeof ds?.apiKeyEnv === 'string' ? ds.apiKeyEnv : DEEPSEEK_DEFAULTS.apiKeyEnv
  const baseURL = ds !== undefined && typeof ds?.baseURL === 'string' ? ds.baseURL : DEEPSEEK_DEFAULTS.baseURL
  const key = await resolveKey(ctx, apiKeyEnv)
  if (key.length === 0) {
    return { ok: false, error: 'no-credential', message: apiKeyEnv, provider: 'deepseek-official' }
  }
  let response
  try {
    response = await fetch(new URL('/user/balance', baseURL).href, {
      headers: { authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    })
  } catch (error) {
    return { ok: false, error: 'failed', message: String((error && error.message) || error), provider: 'deepseek-official' }
  }
  if (!response.ok) {
    return { ok: false, error: 'failed', message: `balance API returned HTTP ${response.status}`, provider: 'deepseek-official' }
  }
  let body
  try {
    body = await response.json()
  } catch {
    return { ok: false, error: 'failed', message: 'balance API returned invalid JSON', provider: 'deepseek-official' }
  }
  const infos = Array.isArray(body?.balance_infos) ? body.balance_infos : []
  const info = infos.find((entry) => entry?.currency === 'CNY') ?? infos[0]
  return {
    ok: true,
    provider: 'deepseek-official',
    balance: {
      isAvailable: body?.is_available === true,
      currency: info?.currency,
      total: info?.total_balance,
      granted: info?.granted_balance,
      toppedUp: info?.topped_up_balance,
    },
    fetchedAt: Date.now(),
  }
}

export function apply(ctx) {
  ctx.effect(() => ctx.webServer.register({
    kind: 'exact',
    path: '/api/usgx/usage',
    handler: async (req, res) => {
      try {
        const result = await collectUsage(ctx)
        json(res, 200, { ok: true, ...result })
      } catch (error) {
        json(res, 500, { ok: false, error: 'internal', message: String((error && error.message) || error) })
      }
    },
  }), 'usgx-status-bar: usage route')

  ctx.effect(() => ctx.webServer.register({
    kind: 'exact',
    path: '/api/usgx/balance',
    handler: async (req, res) => {
      const result = await queryDeepseekBalance(ctx)
      json(res, 200, result)
    },
  }), 'usgx-status-bar: balance route')
}
