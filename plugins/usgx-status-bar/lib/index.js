/**
 * usgx-status-bar — server half.
 *
 * Registers two read-only proxy endpoints on the web server that forward to
 * dsh-usage-stats (which must be installed in the same profile):
 *   GET /api/usgx/usage   -> /api/usage-stats/usage
 *   GET /api/usgx/balance -> /api/usage-stats/balance
 *
 * The client half fetches these same-origin endpoints (the browser may not
 * reach usage-stats directly when its own client entry is hidden by another
 * sidebar plugin), so the proxy keeps one stable data path. Requests carry no
 * credentials and return the upstream JSON verbatim.
 *
 * @module usgx-status-bar
 */

/** Stable Cordis plugin name. */
export const name = 'usgx-status-bar'

/** Services required before this plugin activates. */
export const inject = ['webServer']

const FALLBACK_HOST = '127.0.0.1:3080'

/** Forward one exact route to a same-host usage-stats endpoint. */
function proxy(targetPath) {
  return async (req, res) => {
    const host = (req.headers && typeof req.headers.host === 'string' && req.headers.host !== '')
      ? req.headers.host
      : FALLBACK_HOST
    try {
      const upstream = await fetch(`http://${host}${targetPath}`)
      const text = await upstream.text()
      res.writeHead(upstream.status, { 'content-type': 'application/json' })
      res.end(text)
    } catch (error) {
      res.writeHead(502, { 'content-type': 'application/json' })
      res.end(JSON.stringify({ ok: false, error: String((error && error.message) || error) }))
    }
  }
}

export function apply(ctx) {
  ctx.effect(() => ctx.webServer.register({
    kind: 'exact',
    path: '/api/usgx/usage',
    handler: proxy('/api/usage-stats/usage'),
  }), 'usgx-status-bar: usage proxy route')
  ctx.effect(() => ctx.webServer.register({
    kind: 'exact',
    path: '/api/usgx/balance',
    handler: proxy('/api/usage-stats/balance'),
  }), 'usgx-status-bar: balance proxy route')
}
