/**
 * usgx-status-bar — browser half.
 *
 * Hand-written `__ModuleLoader__` bundle (no build step): an enhanced
 * composer status bar under the chat input (`conversation.composer.dock`),
 * replacing the shipped stats line with
 *   line 1: session time/token stats (one line)
 *   line 2: official DeepSeek whale logo + today's usage / cumulative /
 *           cache hit / account balance (one line), refreshed every 5 minutes
 * Data comes from the server half's /api/usgx/* proxy endpoints via
 * same-origin fetch.
 */
window.__ModuleLoader__.load({
  id: 'usgx-status-bar',
  factory: (require) => {
    var module = { exports: {} }
    var exports = module.exports
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })

    let react = require('react')

    //#region css
    const css = [
      '.usgx-bar{display:flex;flex-direction:column;gap:2px;padding:5px 12px 7px;font-size:12.5px;line-height:18px;color:var(--dsw-alias-label-secondary,var(--dsw-alias-label-primary));border-top:1px solid var(--dsw-alias-border-l2,rgba(128,128,128,.16));}',
      '.usgx-line{display:flex;align-items:center;gap:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
      '.usgx-line2{display:flex;align-items:center;gap:6px;flex-wrap:wrap;}',
      '.usgx-n{font-variant-numeric:tabular-nums;}',
      '.usgx-bal{font-weight:650;color:var(--dsw-alias-label-primary);}',
      '.usgx-warn{color:#e8a33d;}',
      '.usgx-low{color:#e5534b;}',
      '.usgx-ico{display:inline-flex;flex:none;align-items:center;}',
    ].join('')
    const tagId = 'usgx-status-bar/UsageStats.module.css'
    if (typeof document !== 'undefined' && document.querySelector(`style[data-plugin-css=${JSON.stringify(tagId)}]`) === null) {
      const tag = document.createElement('style')
      tag.dataset.plugin = 'usgx-status-bar'
      tag.dataset.pluginCss = tagId
      tag.textContent = css
      document.head.appendChild(tag)
    }
    //#endregion

    const el = (t, p, ...c) => react.createElement(t, p, ...c)

    // Official DeepSeek whale logo (cdn.deepseek.com/favicon.svg, brand blue #4D6BFE).
    const whale = el('svg', { viewBox: '0 0 50 50', width: 16, height: 16, 'aria-hidden': true, style: { display: 'block' } },
      el('path', { fill: '#4D6BFE', 'fill-rule': 'nonzero',
        d: 'M48.8354 10.0479C48.3232 9.79199 48.1025 10.2798 47.8032 10.5278C47.7007 10.6079 47.6143 10.7119 47.5273 10.8076C46.7793 11.624 45.9048 12.1597 44.7622 12.0957C43.0923 12 41.666 12.5356 40.4058 13.8398C40.1377 12.2319 39.2476 11.272 37.8926 10.6558C37.1836 10.3359 36.4668 10.0156 35.9702 9.31982C35.6235 8.82373 35.5293 8.27197 35.356 7.72754C35.2456 7.3999 35.1353 7.06396 34.7651 7.00781C34.3633 6.94385 34.2056 7.2876 34.0479 7.57568C33.418 8.75195 33.1733 10.0479 33.1973 11.3599C33.2524 14.312 34.4736 16.6641 36.8999 18.3359C37.1758 18.5278 37.2466 18.7197 37.1597 19C36.9946 19.5757 36.7974 20.1357 36.624 20.7119C36.5137 21.0801 36.3486 21.1597 35.9624 21C34.6309 20.4321 33.481 19.5918 32.4644 18.5757C30.7393 16.8721 29.1792 14.9917 27.2334 13.52C26.7764 13.1758 26.3193 12.856 25.8467 12.5518C23.8618 10.584 26.1069 8.96777 26.627 8.77588C27.1704 8.57568 26.8159 7.8877 25.0591 7.896C23.3022 7.90381 21.6953 8.50391 19.647 9.30371C19.3477 9.42383 19.0322 9.51172 18.7095 9.58398C16.8501 9.22363 14.9199 9.14355 12.9033 9.37598C9.10596 9.80762 6.07275 11.6396 3.84326 14.7681C1.16455 18.5278 0.53418 22.7998 1.30664 27.2559C2.11768 31.9521 4.46582 35.8398 8.07373 38.8799C11.8159 42.0322 16.1255 43.5762 21.041 43.2803C24.0269 43.104 27.3516 42.6963 31.1016 39.4561C32.0469 39.936 33.0396 40.1279 34.686 40.272C35.9546 40.3921 37.1758 40.208 38.1211 40.0078C39.6021 39.688 39.4995 38.2881 38.9639 38.0322C34.623 35.9678 35.5762 36.8081 34.71 36.1279C36.9155 33.4639 40.2402 30.6958 41.54 21.728C41.6426 21.0161 41.5557 20.5679 41.54 19.9917C41.5322 19.6396 41.6108 19.5039 42.0049 19.4639C43.0923 19.3359 44.1479 19.0317 45.1167 18.4878C47.9292 16.9199 49.064 14.3438 49.3315 11.2559C49.3711 10.7837 49.3237 10.2959 48.8354 10.0479ZM24.3262 37.8398C20.1196 34.4639 18.0791 33.3521 17.2358 33.3999C16.4482 33.4482 16.5898 34.3682 16.7632 34.9678C16.9443 35.5601 17.1812 35.9683 17.5117 36.4878C17.7402 36.832 17.8979 37.3442 17.2832 37.728C15.9282 38.584 13.5728 37.4399 13.4624 37.3838C10.7207 35.7358 8.42822 33.5601 6.81348 30.584C5.25342 27.7197 4.34766 24.6479 4.19775 21.3677C4.1582 20.5757 4.38672 20.2959 5.15869 20.1519C6.17529 19.96 7.22314 19.9199 8.23926 20.0718C12.5327 20.7119 16.1885 22.6719 19.2529 25.7759C21.002 27.5439 22.3252 29.6558 23.6885 31.7202C25.1377 33.9121 26.6978 36 28.6831 37.7119C29.3843 38.312 29.9434 38.7681 30.479 39.104C28.8643 39.2881 26.1699 39.3281 24.3262 37.8398ZM26.3433 24.6001C26.3433 24.248 26.6191 23.9678 26.9658 23.9678C27.0444 23.9678 27.1152 23.9839 27.1782 24.0078C27.2651 24.04 27.3438 24.0879 27.4067 24.1602C27.5171 24.272 27.5801 24.4321 27.5801 24.6001C27.5801 24.9521 27.3042 25.2319 26.9575 25.2319C26.6108 25.2319 26.3433 24.9521 26.3433 24.6001ZM32.6064 27.8799C32.2046 28.0479 31.8027 28.1919 31.4165 28.208C30.8179 28.2397 30.1641 27.9922 29.8096 27.688C29.2583 27.2158 28.8643 26.9521 28.6987 26.1279C28.6279 25.7759 28.6675 25.2319 28.7305 24.9199C28.8721 24.248 28.7144 23.8159 28.2495 23.4238C27.8716 23.104 27.3911 23.0161 26.8633 23.0161C26.666 23.0161 26.4849 22.9277 26.3511 22.856C26.1304 22.7441 25.9492 22.4639 26.1226 22.1201C26.1777 22.0078 26.4458 21.7358 26.5088 21.688C27.2256 21.272 28.0527 21.4077 28.8169 21.7197C29.5259 22.0161 30.0615 22.5601 30.834 23.3281C31.6216 24.2559 31.7632 24.5117 32.2124 25.208C32.5669 25.752 32.8901 26.312 33.1104 26.9521C33.2446 27.3521 33.0713 27.6802 32.6064 27.8799Z' }))

    //#region helpers
    function formatTokens(n) {
      if (typeof n !== 'number' || !Number.isFinite(n)) return '—'
      const scaled = (v) => (v >= 100 ? String(Math.round(v)) : String(Math.round(v * 10) / 10))
      if (n < 1000) return String(n)
      if (n < 1000000) return scaled(n / 1000) + 'K'
      return scaled(n / 1000000) + 'M'
    }
    function formatDuration(ms) {
      if (typeof ms !== 'number' || !Number.isFinite(ms) || ms <= 0) return null
      const s = ms / 1000
      if (s < 60) return Math.round(s * 10) / 10 + 's'
      const w = Math.round(s)
      return Math.floor(w / 60) + 'm' + (w % 60) + 's'
    }
    function todayKey() {
      const d = new Date()
      const p = (n) => String(n).padStart(2, '0')
      return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate())
    }
    //#endregion

    //#region StatsBar
    function StatsBar(props) {
      const useSession = props.useSession
      const useProjection = props.useProjection
      const nodes = useSession((s) => s.chat.legacy.nodes)
      const usage = useProjection('tokenUsage')
      const projected = useProjection('sessionStats')

      const [acct, setAcct] = react.useState(null)

      react.useEffect(() => {
        let alive = true
        const load = () => {
          Promise.all([
            fetch('/api/usgx/usage').then((r) => (r.ok ? r.json() : null)),
            fetch('/api/usgx/balance').then((r) => (r.ok ? r.json() : null)),
          ]).then(([u, b]) => {
            if (alive) setAcct({ usage: u, balance: b })
          }).catch(() => {})
        }
        load()
        const stop = ctx.interval(load, 5 * 60 * 1000)
        return () => { alive = false; stop() }
      }, [])

      const stats = react.useMemo(() => {
        if (projected) return projected
        let turns = 0, steps = 0, llmMs = 0, toolMs = 0, ttftMs = 0, ttftSteps = 0, decodeMs = 0, decodeTokens = 0
        const seen = new Set()
        for (const node of nodes) {
          if (node.kind === 'tool-result') {
            if (node.callTime != null) toolMs += Math.max(0, node.time - node.callTime)
            continue
          }
          if (node.kind !== 'assistant') continue
          seen.add(node.turn)
          steps += 1
          const timing = node.timing
          if (timing !== undefined && timing.stepStartTime != null) {
            llmMs += Math.max(0, timing.completedTime - timing.stepStartTime)
          }
          let rttft = null, rdec = null
          if (timing !== undefined && timing.stepStartTime != null && timing.firstTokenTime != null) {
            rttft = Math.max(0, timing.firstTokenTime - timing.stepStartTime)
          }
          if (timing !== undefined && timing.firstTokenTime != null) {
            rdec = Math.max(0, timing.completedTime - timing.firstTokenTime)
          }
          const u = node.usage
          const out = (typeof u === 'object' && u !== null && typeof u.outputTokens === 'number' && u.outputTokens >= 0) ? u.outputTokens : null
          if (rttft != null) { ttftMs += rttft; ttftSteps += 1 }
          if (rdec != null && out != null) { decodeMs += rdec; decodeTokens += out }
        }
        return { turns: seen.size, steps, llmMs, toolMs, ttftMs, ttftSteps, decodeMs, decodeTokens }
      }, [projected, nodes])

      // Line 1: session time/token stats, one line.
      const parts = []
      if (stats.steps > 0) {
        parts.push(String(stats.turns) + ' 轮 · ' + String(stats.steps) + ' 步')
        const dur = []
        const llm = formatDuration(stats.llmMs)
        const tool = formatDuration(stats.toolMs)
        if (llm) dur.push('LLM ' + llm)
        if (tool) dur.push('工具 ' + tool)
        if (dur.length) parts.push(dur.join(' · '))
        const spd = []
        if (stats.ttftSteps > 0) spd.push('TTFT ' + formatDuration(stats.ttftMs / stats.ttftSteps))
        if (stats.decodeMs > 0) spd.push((stats.decodeTokens / (stats.decodeMs / 1000)).toFixed(1) + ' tok/s')
        if (spd.length) parts.push(spd.join(' · '))
        if (usage !== undefined) {
          const billed = usage.uncachedInputTokens + usage.cacheReadTokens + usage.cacheWriteTokens
          if (billed > 0 || usage.outputTokens > 0) {
            const hit = billed > 0 ? Math.round(usage.cacheReadTokens / billed * 100) : null
            const tok = '输入 ' + formatTokens(billed) + ' · 输出 ' + formatTokens(usage.outputTokens)
            parts.push(hit != null ? '缓存 ' + String(hit) + '% · ' + tok : tok)
          }
        }
      }

      // Line 2 items: today usage, cumulative, cache hit, balance (wrap, never truncated).
      const items = []
      const key = todayKey()
      const u = acct && acct.usage
      const today = (u && u.ok) ? (() => { for (const d of (u.days || [])) { if (d.date === key) return d } return null })() : null
      if (today) items.push({ text: '今日 ' + formatTokens(today.tokens) + ' tok', cls: 'usgx-n' })
      if (u && u.ok && u.total) {
        items.push({ text: '累计 ' + formatTokens(u.total.tokens) + ' tok', cls: 'usgx-n' })
        if (typeof u.total.cacheHitRate === 'number') items.push({ text: '缓存 ' + String(u.total.cacheHitRate) + '%', cls: 'usgx-n' })
      }
      const b = acct && acct.balance
      if (b && b.ok && b.balance && typeof b.balance.total === 'number') {
        const total = b.balance.total
        const cur = b.balance.currency === 'CNY' ? '¥' : (b.balance.currency ? b.balance.currency + ' ' : '')
        const cls = total < 10 ? 'usgx-bal usgx-low' : (total < 30 ? 'usgx-bal usgx-warn' : 'usgx-bal')
        items.push({ text: '余额 ' + cur + total.toFixed(2), cls })
      }
      if (today) items.push({ text: '今日 ' + formatTokens(today.tokens) + ' tok', cls: 'usgx-n' })
      if (u && u.ok && u.total) {
        items.push({ text: '累计 ' + formatTokens(u.total.tokens) + ' tok', cls: 'usgx-n' })
        if (typeof u.total.cacheHitRate === 'number') items.push({ text: '缓存 ' + String(u.total.cacheHitRate) + '%', cls: 'usgx-n' })
      }

      const rows = []
      if (parts.length > 0) {
        rows.push(el('div', { className: 'usgx-line' }, el('span', { className: 'usgx-n' }, parts.join(' | '))))
      }
      if (items.length > 0) {
        const segs = []
        items.forEach((it, i) => {
          if (i > 0) segs.push(el('span', { className: 'usgx-n' }, '·'))
          segs.push(el('span', { className: it.cls }, it.text))
        })
        rows.push(el('div', { className: 'usgx-line2' }, el('span', { className: 'usgx-ico' }, whale), ...segs))
      } else {
        rows.push(el('div', { className: 'usgx-line2' }, el('span', { className: 'usgx-ico' }, whale), el('span', {}, '用量/余额暂不可用')))
      }
      if (rows.length === 0) return null
      return el('div', { className: 'usgx-bar' }, ...rows)
    }
    //#endregion

    //#region plugin body
    /** Services required by the client plugin body. */
    const inject = ['slots', 'timer']

    /** Client plugin body: replace the composer dock stats line with the enhanced bar. */
    function apply(ctx) {
      ctx.slots.inject('conversation.composer.dock', () => ctx.slots.register(
        { name: 'conversation.composer.dock', id: 'stats' },
        StatsBar,
      ))
    }
    //#endregion

    exports.apply = apply
    exports.inject = inject
    exports.StatsBar = StatsBar
    return module.exports
  },
})
