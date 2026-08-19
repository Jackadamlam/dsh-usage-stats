/**
 * usgx-status-bar — per-day, per-model token-usage aggregation over session
 * event logs. Pure functions, free of cordis imports.
 *
 * Ported from `dsh-usage-stats` (MIT, https://github.com/Ychris12138/dsh-usage-stats)
 * so this plugin is self-contained and does not depend on the upstream
 * package. Semantics mirror `dsh-token-meter`'s `tokenUsage` projection: a
 * usage sample rides an `assistant/chunk` (`data.chunk.type === "usage"`) or
 * an `assistant/message` (`data.usage`); a repeated sample for the same
 * (turn, step) REPLACES the earlier value instead of double counting it, and
 * the replacement is re-attributed to the day of the later event. Each sample
 * is attributed to the model that produced it; samples with no model info land
 * in the `unknown/unknown` bucket.
 *
 * @module usgx-status-bar/usage
 */

/** Local-calendar `YYYY-MM-DD` key for a millisecond epoch. */
export function dayKey(timeMs) {
  const date = new Date(timeMs)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

/** Empty token bucket. */
export function zeroBuckets() {
  return { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0 }
}

/** Provider usage → buckets (missing cache fields are absent in some reports). */
export function bucketsOf(usage) {
  return {
    inputTokens: usage.inputTokens ?? 0,
    outputTokens: usage.outputTokens ?? 0,
    cacheReadTokens: usage.cacheReadTokens ?? 0,
    cacheWriteTokens: usage.cacheWriteTokens ?? 0,
  }
}

/** Total tokens across all buckets. */
export function totalTokens(buckets) {
  return buckets.inputTokens + buckets.outputTokens + buckets.cacheReadTokens + buckets.cacheWriteTokens
}

/** Prompt-side cache hit rate in percent (0–100, one decimal), or null. */
export function cacheHitRate(buckets) {
  const input = buckets.inputTokens ?? 0
  const cacheRead = buckets.cacheReadTokens ?? 0
  const cacheWrite = buckets.cacheWriteTokens ?? 0
  const promptTokens = input + cacheRead + cacheWrite
  if (promptTokens <= 0) return null
  return Math.round((cacheRead / promptTokens) * 1000) / 10
}

function addInto(target, source) {
  target.inputTokens += source.inputTokens
  target.outputTokens += source.outputTokens
  target.cacheReadTokens += source.cacheReadTokens
  target.cacheWriteTokens += source.cacheWriteTokens
  return target
}

function subtractFrom(target, source) {
  target.inputTokens -= source.inputTokens
  target.outputTokens -= source.outputTokens
  target.cacheReadTokens -= source.cacheReadTokens
  target.cacheWriteTokens -= source.cacheWriteTokens
  return target
}

/** Extract the usage sample an event carries, if any. */
function sampleOf(event) {
  if (event.type === 'assistant/chunk' && event.data?.chunk?.type === 'usage') {
    return { key: `${event.data.turn}:${event.data.step}`, usage: event.data.chunk.usage }
  }
  if (event.type === 'assistant/message' && event.data?.usage !== undefined) {
    return { key: `${event.data.turn}:${event.data.step}`, usage: event.data.usage }
  }
  return undefined
}

/** The `provider/model` attribution key of a usage sample. */
function modelOf(event) {
  const source = event.data?.message?.source
  if (source !== undefined && typeof source.model === 'string') {
    return `${typeof source.provider === 'string' && source.provider.length > 0 ? source.provider : 'unknown'}/${source.model}`
  }
  const config = event.data?.header?.config
  if (config !== undefined && typeof config.model === 'string') {
    return `${typeof config.provider === 'string' && config.provider.length > 0 ? config.provider : 'unknown'}/${config.model}`
  }
  return undefined
}

function entryOf(byDay, day) {
  let entry = byDay.get(day)
  if (entry === undefined) {
    entry = { totals: zeroBuckets(), models: new Map() }
    byDay.set(day, entry)
  }
  return entry
}

/** One session's incremental fold state. */
export function createUsageState() {
  return { days: new Map(), lastSample: null, currentModel: null, consumed: 0 }
}

/**
 * Fold a slice of NEW events onto an existing session state (mutating).
 * Replacements for the same (turn, step) subtract the previous sample's
 * buckets from the day/model bucket they were attributed to.
 */
export function applyUsageDelta(state, events) {
  let last = state.lastSample
  let currentModel = state.currentModel
  for (const event of events) {
    if (event.type === 'request/header') {
      const model = modelOf(event)
      if (model !== undefined) currentModel = model
    }
    const sample = sampleOf(event)
    if (sample === undefined) continue
    const buckets = bucketsOf(sample.usage)
    const model = modelOf(event) ?? currentModel ?? 'unknown/unknown'
    const day = dayKey(event.time)
    const entry = entryOf(state.days, day)
    if (last !== null && last.key === sample.key) {
      const previous = state.days.get(last.day)
      if (previous !== undefined) {
        subtractFrom(previous.totals, last.buckets)
        const previousModel = previous.models.get(last.model)
        if (previousModel !== undefined) subtractFrom(previousModel, last.buckets)
      }
    }
    addInto(entry.totals, buckets)
    let modelBucket = entry.models.get(model)
    if (modelBucket === undefined) {
      modelBucket = zeroBuckets()
      entry.models.set(model, modelBucket)
    }
    addInto(modelBucket, buckets)
    last = { key: sample.key, day, model, buckets }
  }
  state.lastSample = last
  state.currentModel = currentModel
}

/** Fold one session's events into per-day, per-model token buckets. */
export function foldUsage(events) {
  const state = createUsageState()
  applyUsageDelta(state, events)
  return state.days
}

/** Merge one session's folded days into a global per-day map. */
export function mergeInto(byDay, sessionDays) {
  for (const [day, entry] of sessionDays) {
    const target = entryOf(byDay, day)
    addInto(target.totals, entry.totals)
    for (const [model, buckets] of entry.models) {
      let modelBucket = target.models.get(model)
      if (modelBucket === undefined) {
        modelBucket = zeroBuckets()
        target.models.set(model, modelBucket)
      }
      addInto(modelBucket, buckets)
    }
  }
}

/** Merge one session fold into a global per-day map (convenience wrapper). */
export function consumeEvents(byDay, events) {
  mergeInto(byDay, foldUsage(events))
}

/**
 * Render a global per-day map into the wire shape for the usage endpoint.
 * @param byDay - day → entry map.
 * @param updatedAt - computation timestamp.
 * @returns `{ days, total, updatedAt }` with `days` sorted ascending; each
 *   day carries `models` (descending by tokens) and a `cacheHitRate` percent.
 */
export function renderUsage(byDay, updatedAt) {
  const days = [...byDay.entries()]
    .map(([date, entry]) => {
      const models = [...entry.models.entries()]
        .map(([model, buckets]) => ({
          model,
          ...buckets,
          tokens: totalTokens(buckets),
          cacheHitRate: cacheHitRate(buckets),
        }))
        .filter((entry) => entry.tokens > 0)
        .sort((a, b) => b.tokens - a.tokens)
      return {
        date,
        ...entry.totals,
        tokens: totalTokens(entry.totals),
        cacheHitRate: cacheHitRate(entry.totals),
        models,
      }
    })
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
  const total = zeroBuckets()
  for (const [, entry] of byDay) addInto(total, entry.totals)
  return {
    days,
    total: { ...total, tokens: totalTokens(total), cacheHitRate: cacheHitRate(total) },
    updatedAt,
  }
}
