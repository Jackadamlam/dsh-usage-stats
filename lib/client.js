/**
 * dsh-usage-stats — browser half.
 *
 * Hand-written `__ModuleLoader__` bundle (no build step): a sidebar footer
 * action that opens a floating panel with provider balances, subscription
 * quota windows, a Codex-style blue daily token-usage heatmap, per-day
 * provider/model breakdowns, and cache hit rates. Data comes from the server
 * half's loopback-only endpoints via same-origin fetch.
 */
window.__ModuleLoader__.load({
	id: "@ychris12138/dsh-usage-stats",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		let react_dom = require("react-dom");
		let primitives = require("@deepseek-ai/dsh-client-ui-primitives");

		//#region css
		const css = [
			".usg_layer{flex:none;align-items:center;width:100%;height:49px;margin:8px 0 0;display:flex;position:relative}",
			".usg_footerButtons{align-items:center;width:100%;display:flex}",
			".usg_badge{width:100%;height:49px;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border:none;border-radius:12px;align-items:center;gap:8px;padding:0 8px 0 6px;font-family:inherit;font-size:14px;display:inline-flex;overflow:hidden}",
			".usg_badge:hover{background:var(--dsw-alias-interactive-bg-hover-solid)}",
			".usg_badge[data-active]{background:var(--dsw-alias-interactive-bg-hover)}",
			".usg_badgeLabel{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}",
			".usg_badgeAmount{color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;flex:none;font-size:12px;font-weight:600;line-height:16px}",
			".usg_badgeOk{color:var(--dsw-alias-state-success-primary)}",
			".usg_badgeBad{color:var(--dsw-alias-state-error-primary)}",
			".usg_badgeCount{color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;flex:none;margin-left:auto;font-size:12px;line-height:16px}",
			".usg_sessionPill{box-sizing:border-box;max-width:220px;height:28px;color:var(--dsw-alias-label-tertiary);background:var(--dsw-alias-fill-l1,transparent);border:1px solid var(--dsw-alias-border-l2);border-radius:999px;align-items:center;gap:5px;padding:0 8px;font:inherit;font-size:11px;line-height:16px;cursor:pointer;display:inline-flex;white-space:nowrap;overflow:hidden}",
			".usg_sessionPill:hover{background:var(--dsw-alias-interactive-bg-hover)}",
			".usg_sessionPill:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}",
			".usg_sessionPill[data-tone=normal]{color:var(--dsw-alias-label-secondary)}",
			".usg_sessionPill[data-tone=warning]{color:var(--dsw-alias-state-warn-label,var(--dsw-alias-state-warn-primary));border-color:var(--dsw-alias-state-warn-secondary,var(--dsw-alias-border-l2))}",
			".usg_sessionPill[data-tone=critical]{color:var(--dsw-alias-state-error-primary);border-color:var(--dsw-alias-state-error-secondary,var(--dsw-alias-border-l2))}",
			".usg_sessionPillProvider{max-width:88px;color:var(--dsw-alias-label-primary);font-weight:500;text-overflow:ellipsis;overflow:hidden}",
			".usg_sessionPillSeparator{color:var(--dsw-alias-label-caption);flex:none}",
			".usg_sessionPillValue{max-width:112px;font-variant-numeric:tabular-nums;text-overflow:ellipsis;overflow:hidden}",
			".usg_layer.usg_rail{width:36px;height:36px;margin:0}",
			".usg_layer.usg_rail .usg_badge{border-radius:50%;justify-content:center;gap:0;width:36px;height:36px;padding:0}",
			".usg_layer.usg_rail .usg_footerButtons{flex-direction:column;gap:2px}",
			".usg_panel{z-index:100;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-overlay,var(--dsw-alias-bg-base));width:440px;max-width:calc(100vw - 24px);max-height:74vh;box-shadow:var(--dsw-shadow-lv2);--dsh-scrollbar-thumb:var(--dsw-alias-scrollbar-bg-l2);--dsh-scrollbar-thumb-hover:var(--dsw-alias-scrollbar-hover-l2);--usg-blue:#1f6feb;--usg-cellEmpty:rgba(128,128,128,0.16);border-radius:12px;flex-direction:column;display:flex;position:fixed;bottom:128px;left:12px;overflow:hidden}",
			".usg_header{box-sizing:border-box;border-bottom:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-overlay,var(--dsw-alias-bg-base));flex:none;justify-content:space-between;align-items:center;min-height:44px;padding:10px 12px;display:flex}",
			".usg_headerLeft{align-items:center;gap:8px;display:flex}",
			".usg_title{color:var(--dsw-alias-label-primary);font-size:13px;font-weight:500;line-height:20px}",
			".usg_headerActions{align-items:center;gap:2px;display:flex}",
			".usg_iconButton{cursor:pointer;width:26px;height:26px;color:var(--dsw-alias-label-tertiary);background:0 0;border:none;border-radius:6px;justify-content:center;align-items:center;padding:0;display:inline-flex}",
			".usg_iconButton:hover{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-interactive-bg-hover)}",
			".usg_body{flex:1;min-height:0;padding:4px 14px 14px;overflow-y:auto}",
			".usg_section{margin-top:12px}",
			".usg_sectionTitle{color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px;margin:0 0 6px}",
			".usg_note{color:var(--dsw-alias-label-tertiary);margin:4px 0;font-size:12px;line-height:18px}",
			".usg_error{background:var(--dsw-alias-interactive-bg-hover-danger);color:var(--dsw-alias-state-error-primary);border-radius:8px;justify-content:space-between;align-items:flex-start;gap:8px;margin:4px 0;padding:7px 8px;font-size:12px;line-height:18px;display:flex}",
			".usg_retry{color:inherit;font:inherit;cursor:pointer;background:0 0;border:none;flex:none;padding:0}",
			".usg_balanceCard{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-fill-l1, transparent);border-radius:12px;padding:10px 12px;display:flex;flex-direction:column;gap:6px}",
			".usg_balanceMain{align-items:baseline;gap:8px;display:flex}",
			".usg_balanceAmount{color:var(--dsw-alias-label-primary);font-size:24px;font-weight:600;line-height:32px;font-variant-numeric:tabular-nums}",
			".usg_balanceStatus{align-items:center;gap:5px;font-size:12px;line-height:18px;display:inline-flex}",
			".usg_balanceOk{color:var(--dsw-alias-state-success-primary)}",
			".usg_balanceBad{color:var(--dsw-alias-state-error-primary)}",
			".usg_balanceRows{color:var(--dsw-alias-label-secondary);flex-direction:column;gap:2px;font-size:12px;line-height:18px;display:flex}",
			".usg_balanceRow{justify-content:space-between;display:flex}",
			".usg_providerPicker{align-items:center;gap:8px;margin:6px 0 8px;font-size:12px;line-height:18px;display:flex}",
			".usg_providerPickerLabel{color:var(--dsw-alias-label-tertiary);flex:none}",
			".usg_providerSelect{box-sizing:border-box;min-width:0;flex:1;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-overlay,var(--dsw-alias-bg-base));border:1px solid var(--dsw-alias-border-l2);border-radius:8px;padding:4px 6px;font:inherit;font-size:12px;line-height:18px}",
			".usg_accountGrid{flex-direction:column;gap:8px;display:flex}",
			".usg_accountCard{--usg-providerAccent:#1f6feb;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:linear-gradient(135deg,color-mix(in srgb,var(--usg-providerAccent) 8%,transparent),transparent 42%);border-radius:12px;padding:10px 11px;display:flex;flex-direction:column;gap:9px}",
			".usg_accountCard[data-provider=deepseek],.usg_accountCard[data-provider=deepseek-official]{--usg-providerAccent:#1f6feb}",
			".usg_accountCard[data-provider=opencode-go]{--usg-providerAccent:#00a67d}",
			".usg_accountCard[data-provider=ollama],.usg_accountCard[data-adapter=ollama]{--usg-providerAccent:#d97706}",
			".usg_accountCard[data-provider=zai],.usg_accountCard[data-provider=zai-coding-cn]{--usg-providerAccent:#7656e8}",
			".usg_accountCard[data-provider=openrouter]{--usg-providerAccent:#6366f1}",
			".usg_accountCard[data-provider=moonshotai],.usg_accountCard[data-provider=moonshotai-cn],.usg_accountCard[data-provider=kimi],.usg_accountCard[data-provider=kimi-coding]{--usg-providerAccent:#e07a1f}",
			".usg_accountHead{align-items:center;gap:8px;display:flex}",
			".usg_accountMark{width:24px;height:24px;color:#fff;background:var(--usg-providerAccent);border-radius:7px;justify-content:center;align-items:center;font-size:10px;font-weight:700;display:flex;box-shadow:0 4px 12px color-mix(in srgb,var(--usg-providerAccent) 25%,transparent)}",
			".usg_accountIdentity{min-width:0;flex:1;display:flex;flex-direction:column}",
			".usg_accountName{color:var(--dsw-alias-label-primary);font-size:13px;font-weight:600;line-height:18px}",
			".usg_accountPlan{color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;font-size:10px;line-height:14px;overflow:hidden}",
			".usg_accountStatus{color:var(--dsw-alias-label-tertiary);background:var(--dsw-alias-fill-l2);border-radius:999px;padding:2px 7px;font-size:10px;line-height:16px;white-space:nowrap}",
			".usg_accountStatus[data-status=ok]{color:var(--usg-providerAccent);background:color-mix(in srgb,var(--usg-providerAccent) 12%,transparent)}",
			".usg_accountHealth{border-top:1px solid var(--dsw-alias-border-l1);grid-template-columns:auto minmax(0,1fr);gap:3px 10px;margin:2px 0 0;padding-top:7px;display:grid}",
			".usg_accountHealth dt{color:var(--dsw-alias-label-caption);font-size:10px;line-height:15px}",
			".usg_accountHealth dd{color:var(--dsw-alias-label-secondary);min-width:0;margin:0;font-size:10px;line-height:15px;text-align:right;overflow-wrap:anywhere}",
			".usg_quotaList{flex-direction:column;gap:8px;display:flex}",
			".usg_quotaRow{display:flex;flex-direction:column;gap:4px}",
			".usg_quotaMeta{align-items:baseline;gap:8px;display:flex}",
			".usg_quotaLabel{color:var(--dsw-alias-label-secondary);font-size:11px;line-height:16px}",
			".usg_quotaValue{color:var(--dsw-alias-label-primary);margin-left:auto;font-size:12px;font-weight:600;line-height:16px;font-variant-numeric:tabular-nums}",
			".usg_quotaReset{color:var(--dsw-alias-label-caption);font-size:9px;line-height:14px;white-space:nowrap}",
			".usg_quotaTrack{height:6px;background:var(--dsw-alias-fill-l2);border-radius:999px;overflow:hidden}",
			".usg_quotaFill{height:100%;background:var(--usg-providerAccent);border-radius:inherit;min-width:2px;transition:width .2s ease}",
			".usg_quotaEmpty{color:var(--dsw-alias-label-tertiary);margin:0;font-size:11px;line-height:17px}",
			".usg_statsRow{display:flex;gap:8px}",
			".usg_pillList{display:flex;flex-direction:column;gap:4px;margin:0 0 6px;}",
			".usg_stat{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);border-radius:10px;flex:1;flex-direction:column;gap:1px;padding:8px 10px;display:flex}",
			".usg_statValue{color:var(--dsw-alias-label-primary);font-size:15px;font-weight:600;line-height:22px;font-variant-numeric:tabular-nums;white-space:nowrap}",
			".usg_statLabel{color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px}",
			".usg_hitCaption{color:var(--dsw-alias-label-tertiary);margin-top:6px;font-size:11px;line-height:16px;font-variant-numeric:tabular-nums}",
			".usg_hitCaption b{color:var(--dsw-alias-label-secondary);font-weight:600}",
			".usg_heat{overflow-x:auto}",
			".usg_heatHeader{justify-content:space-between;align-items:center;margin-bottom:6px;display:flex}",
			".usg_heatHeader .usg_sectionTitle{flex:none;margin:0}",
			".usg_providerFilter{cursor:pointer;max-width:160px;height:24px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-fill-l1,transparent);border:1px solid var(--dsw-alias-border-l2);border-radius:6px;padding:0 6px;font:inherit;font-size:11px;line-height:24px}",
			".usg_monthNav{align-items:center;gap:2px;display:flex}",
			".usg_navButton{cursor:pointer;width:24px;height:24px;color:var(--dsw-alias-label-secondary);background:0 0;border:none;border-radius:6px;justify-content:center;align-items:center;padding:0;display:inline-flex}",
			".usg_navButton:hover:not(:disabled){color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}",
			".usg_navButton:disabled{color:var(--dsw-alias-label-caption);cursor:default}",
			".usg_monthTitle{color:var(--dsw-alias-label-primary);min-width:88px;font-size:12px;font-weight:500;line-height:24px;text-align:center;font-variant-numeric:tabular-nums}",
			".usg_todayButton{cursor:pointer;color:var(--dsw-alias-label-secondary);background:0 0;border:none;border-radius:6px;padding:0 6px;font-size:11px;line-height:24px}",
			".usg_todayButton:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}",
			".usg_monthGrid{flex-direction:column;gap:4px;width:100%;display:flex}",
			".usg_weekHeader{color:var(--dsw-alias-label-tertiary);grid-template-columns:repeat(7,1fr);gap:4px;display:grid}",
			".usg_weekLabel{font-size:10px;line-height:16px;text-align:center}",
			".usg_heatRow{grid-template-columns:repeat(7,1fr);gap:4px;display:grid}",
			".usg_cell{aspect-ratio:1/1;min-width:0;width:100%;border-radius:8px;background:var(--usg-cellEmpty);border:0;padding:0;cursor:pointer;justify-content:center;align-items:center;font-family:inherit;display:flex}",
			".usg_cell:hover{box-shadow:0 0 0 1px var(--dsw-alias-label-secondary)}",
			".usg_cellToday{box-shadow:0 0 0 1px var(--usg-blue)}",
			".usg_cellToday:hover{box-shadow:0 0 0 1px var(--usg-blue)}",
			".usg_cellSelected{box-shadow:0 0 0 2px var(--dsw-alias-label-primary)}",
			".usg_cellSelected:hover{box-shadow:0 0 0 2px var(--dsw-alias-label-primary)}",
			".usg_cellDay{font-size:12px;font-weight:700;line-height:1;font-variant-numeric:tabular-nums;pointer-events:none}",
			".usg_emptyCell{aspect-ratio:1/1;min-width:0;width:100%}",
			".usg_legend{align-items:center;gap:4px;margin-top:6px;font-size:10px;line-height:14px;color:var(--dsw-alias-label-tertiary);display:flex}",
			".usg_legendSwatch{width:10px;height:10px;border-radius:2px;background:var(--dsw-alias-fill-l2)}",
			".usg_days{flex-direction:column;display:flex}",
			".usg_day{width:100%;min-height:30px;align-items:center;gap:8px;border:0;background:0 0;border-bottom:1px solid var(--dsw-alias-border-l1);padding:5px 0;font:inherit;text-align:left;cursor:pointer;display:flex}",
			".usg_day:last-child{border-bottom:0}",
			".usg_day:hover{background:var(--dsw-alias-interactive-bg-hover)}",
			".usg_dayDate{color:var(--dsw-alias-label-secondary);flex:none;width:104px;font-size:12px;line-height:18px;font-variant-numeric:tabular-nums}",
			".usg_dayTokens{color:var(--dsw-alias-label-primary);flex:none;font-size:12px;line-height:18px;font-variant-numeric:tabular-nums}",
			".usg_dayHit{color:var(--dsw-alias-label-tertiary);flex:none;width:52px;font-size:11px;line-height:18px;font-variant-numeric:tabular-nums;text-align:right}",
			".usg_dayBar{background:var(--usg-blue);border-radius:2px;height:6px;flex:1;min-width:4px;opacity:.65}",
			".usg_detailHeader{align-items:center;gap:8px;display:flex}",
			".usg_back{cursor:pointer;width:26px;height:26px;color:var(--dsw-alias-label-secondary);background:0 0;border:none;border-radius:6px;justify-content:center;align-items:center;padding:0;display:inline-flex;flex:none}",
			".usg_back:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}",
			".usg_detailDate{color:var(--dsw-alias-label-primary);font-size:13px;font-weight:500;line-height:20px}",
			".usg_detailHit{color:var(--dsw-alias-label-tertiary);margin-left:auto;font-size:11px;line-height:20px;font-variant-numeric:tabular-nums}",
			".usg_detailSummary{color:var(--dsw-alias-label-secondary);margin:6px 0 8px;font-size:12px;line-height:18px;font-variant-numeric:tabular-nums}",
			".usg_modelRow{border:1px solid var(--dsw-alias-border-l2);border-radius:10px;margin-bottom:8px;padding:8px 10px;display:flex;flex-direction:column;gap:4px}",
			".usg_modelRow:last-child{margin-bottom:0}",
			".usg_modelHead{align-items:center;gap:8px;display:flex}",
			".usg_modelName{color:var(--dsw-alias-label-primary);min-width:0;text-overflow:ellipsis;white-space:nowrap;flex:1;font-size:12px;font-weight:500;line-height:18px;overflow:hidden}",
			".usg_modelTokens{color:var(--dsw-alias-label-primary);flex:none;font-size:12px;line-height:18px;font-variant-numeric:tabular-nums}",
			".usg_modelHit{color:var(--dsw-alias-label-tertiary);flex:none;width:56px;font-size:11px;line-height:18px;font-variant-numeric:tabular-nums;text-align:right}",
			".usg_modelBarTrack{background:var(--dsw-alias-fill-l2);border-radius:2px;height:5px;overflow:hidden}",
			".usg_modelBar{background:var(--usg-blue);border-radius:2px;height:5px}",
			".usg_modelMeta{color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px;font-variant-numeric:tabular-nums}",
			".usg_footerNote{color:var(--dsw-alias-label-caption);margin-top:10px;font-size:11px;line-height:16px;font-variant-numeric:tabular-nums}",
			// ---- merged usgx-status-bar composer strip ----
			".usgx-bar{display:flex;flex-direction:column;gap:2px;padding:5px 12px 7px;font-size:12.5px;line-height:18px;color:var(--dsw-alias-label-secondary,var(--dsw-alias-label-primary));border-top:1px solid var(--dsw-alias-border-l2,rgba(128,128,128,.16));}",
			".usgx-line{display:flex;align-items:center;gap:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}",
			".usgx-line2{display:flex;align-items:center;gap:6px;flex-wrap:wrap;}",
			".usgx-n{font-variant-numeric:tabular-nums;}",
			".usgx-bal{font-weight:650;color:var(--dsw-alias-label-primary);}",
			".usgx-warn{color:#e8a33d;}",
			".usgx-low{color:#e5534b;}",
			".usgx-ico{display:inline-flex;flex:none;align-items:center;}",
			".usgx-link{color:inherit;text-decoration:none;border-radius:4px;transition:filter .12s ease,transform .12s ease;}",
			".usgx-link:hover{filter:brightness(1.25);transform:translateY(-1px);}",
			".usgx-link:focus-visible{outline:2px solid #4D6BFE;outline-offset:1px;}",
			".usgx-ds{display:inline-flex;align-items:center;gap:6px;}",
			".usgx-provider{width:100%;}",
			".usgx-providerName{color:var(--dsw-alias-label-secondary);font-weight:600;}",
			".usgx-idBadge{display:inline-flex;flex:none;align-items:center;justify-content:center;width:16px;height:16px;border-radius:4px;background:var(--dsw-alias-fill-l2);color:var(--dsw-alias-label-primary);font-size:10px;font-weight:700;}"
		].join("");
		const tagId = "dsh-usage-stats/UsageStats.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@ychris12138/dsh-usage-stats";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		const S = {
			layer: "usg_layer",
			rail: "usg_rail",
			footerButtons: "usg_footerButtons",
			badge: "usg_badge",
			badgeLabel: "usg_badgeLabel",
			badgeAmount: "usg_badgeAmount",
			badgeOk: "usg_badgeOk",
			badgeBad: "usg_badgeBad",
			badgeCount: "usg_badgeCount",
			sessionPill: "usg_sessionPill",
			sessionPillProvider: "usg_sessionPillProvider",
			sessionPillSeparator: "usg_sessionPillSeparator",
			sessionPillValue: "usg_sessionPillValue",
			panel: "usg_panel",
			header: "usg_header",
			headerLeft: "usg_headerLeft",
			title: "usg_title",
			headerActions: "usg_headerActions",
			iconButton: "usg_iconButton",
			body: "usg_body",
			section: "usg_section",
			sectionTitle: "usg_sectionTitle",
			note: "usg_note",
			error: "usg_error",
			retry: "usg_retry",
			providerPicker: "usg_providerPicker",
			providerPickerLabel: "usg_providerPickerLabel",
			providerSelect: "usg_providerSelect",
			accountGrid: "usg_accountGrid",
			accountCard: "usg_accountCard",
			accountHead: "usg_accountHead",
			accountMark: "usg_accountMark",
			accountIdentity: "usg_accountIdentity",
			accountName: "usg_accountName",
			accountPlan: "usg_accountPlan",
			accountStatus: "usg_accountStatus",
			accountHealth: "usg_accountHealth",
			quotaList: "usg_quotaList",
			quotaRow: "usg_quotaRow",
			quotaMeta: "usg_quotaMeta",
			quotaLabel: "usg_quotaLabel",
			quotaValue: "usg_quotaValue",
			quotaReset: "usg_quotaReset",
			quotaTrack: "usg_quotaTrack",
			quotaFill: "usg_quotaFill",
			quotaEmpty: "usg_quotaEmpty",
			balanceCard: "usg_balanceCard",
			balanceMain: "usg_balanceMain",
			balanceAmount: "usg_balanceAmount",
			balanceStatus: "usg_balanceStatus",
			balanceOk: "usg_balanceOk",
			balanceBad: "usg_balanceBad",
			balanceRows: "usg_balanceRows",
			balanceRow: "usg_balanceRow",
			statsRow: "usg_statsRow",
			pillList: "usg_pillList",
			stat: "usg_stat",
			statValue: "usg_statValue",
			statLabel: "usg_statLabel",
			hitCaption: "usg_hitCaption",
			heat: "usg_heat",
			heatHeader: "usg_heatHeader",
			providerFilter: "usg_providerFilter",
			monthNav: "usg_monthNav",
			navButton: "usg_navButton",
			monthTitle: "usg_monthTitle",
			todayButton: "usg_todayButton",
			monthGrid: "usg_monthGrid",
			weekHeader: "usg_weekHeader",
			weekLabel: "usg_weekLabel",
			heatRow: "usg_heatRow",
			cell: "usg_cell",
			cellSelected: "usg_cellSelected",
			cellToday: "usg_cellToday",
			cellDay: "usg_cellDay",
			emptyCell: "usg_emptyCell",
			legend: "usg_legend",
			legendSwatch: "usg_legendSwatch",
			days: "usg_days",
			day: "usg_day",
			dayDate: "usg_dayDate",
			dayTokens: "usg_dayTokens",
			dayHit: "usg_dayHit",
			dayBar: "usg_dayBar",
			detailHeader: "usg_detailHeader",
			back: "usg_back",
			detailDate: "usg_detailDate",
			detailHit: "usg_detailHit",
			detailSummary: "usg_detailSummary",
			modelRow: "usg_modelRow",
			modelHead: "usg_modelHead",
			modelName: "usg_modelName",
			modelTokens: "usg_modelTokens",
			modelHit: "usg_modelHit",
			modelBarTrack: "usg_modelBarTrack",
			modelBar: "usg_modelBar",
			modelMeta: "usg_modelMeta",
			footerNote: "usg_footerNote"
		};
		//#endregion

		//#region helpers
		/** Local `YYYY-MM-DD` for a Date. */
		function dayKeyOf(date) {
			const month = String(date.getMonth() + 1).padStart(2, "0");
			const day = String(date.getDate()).padStart(2, "0");
			return `${date.getFullYear()}-${month}-${day}`;
		}

		/** Today's local `YYYY-MM-DD`. */
		function todayKey() {
			return dayKeyOf(new Date());
		}

		/** Current month key `YYYY-MM`. */
		function currentMonthKey() {
			const now = new Date();
			return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
		}

		/** Shift a `YYYY-MM` key by a signed month delta. */
		function shiftMonth(key, delta) {
			const [year, month] = key.split("-").map(Number);
			const date = new Date(year, month - 1 + delta, 1);
			return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
		}

		/** Localized `YYYY-MM` → e.g. "2026年8月" / "Aug 2026". */
		function monthLabelOf(key, translate) {
			const [year, month] = key.split("-").map(Number);
			return translate("month.year", { year, month: monthName(month - 1, translate) });
		}

		/** Group thousands. */
		function fmt(n) {
			return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}

		/** Compact form: 1234 → "1.2k". */
		function fmtCompact(n) {
			if (n < 1000) return String(n);
			if (n < 1000000) return `${(n / 1000).toFixed(n < 10000 ? 1 : 0)}k`;
			return `${(n / 1000000).toFixed(1)}m`;
		}

		/** Hit-rate display: null/undefined → "—". */
		function fmtHit(hitRate) {
			return hitRate === null || hitRate === void 0 ? "—" : `${hitRate}%`;
		}

		/** Sum one day's per-model token buckets into a single bucket. */
		function sumBuckets(models) {
			const totals = { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0 };
			for (const model of models) {
				totals.inputTokens += model.inputTokens ?? 0;
				totals.outputTokens += model.outputTokens ?? 0;
				totals.cacheReadTokens += model.cacheReadTokens ?? 0;
				totals.cacheWriteTokens += model.cacheWriteTokens ?? 0;
			}
			return totals;
		}

		/** Total tokens across a bucket. */
		function tokensOf(bucket) {
			return (bucket.inputTokens ?? 0) + (bucket.outputTokens ?? 0) + (bucket.cacheReadTokens ?? 0) + (bucket.cacheWriteTokens ?? 0);
		}

		/** Prompt-side cache hit rate (0–100, one decimal), or null when no prompt tokens. */
		function hitOf(bucket) {
			const prompt = (bucket.inputTokens ?? 0) + (bucket.cacheReadTokens ?? 0) + (bucket.cacheWriteTokens ?? 0);
			if (prompt <= 0) return null;
			return Math.round((bucket.cacheReadTokens ?? 0) / prompt * 1000) / 10;
		}

		/** `provider/model` route key → provider id. */
		function providerOfRoute(model) {
			const index = model.indexOf("/");
			return index >= 0 ? model.slice(0, index) : model;
		}

		/** Currency-aware amount: `¥ 36.44` / `$ 12.00` (Intl, fallback keeps the raw value). */
		function fmtCurrency(amount, currency) {
			if (amount === void 0 || amount === null) return "—";
			const numeric = Number(amount);
			if (!Number.isFinite(numeric)) return "—";
			try {
				return new Intl.NumberFormat(undefined, { style: "currency", currency: currency ?? "CNY" }).format(numeric);
			} catch {
				return `${currency ?? "CNY"} ${amount}`;
			}
		}

		/**
		 * Collapsed-badge account value, derived from the unified v0.2.0 account
		 * snapshot. Balance providers show a real-currency amount; subscription /
		 * token-plan providers show the LOWEST remaining percent across all quota
		 * windows. Returns null for loading / not-configured / unsupported /
		 * unavailable / stale states so the badge omits the numeric value rather
		 * than rendering a false warning — a stale snapshot that still carries
		 * previous balance or windows data must NOT render a colored value.
		 * @returns `{ kind: "balance", value, display }`, `{ kind: "percent", value, display }`, or null.
		 */
		function badgeAccountValue(account) {
			if (account === null || account === void 0) return null;
			if (account.status !== "ok" || account.stale === true) return null;
			if (account.mode === "subscription") {
				const percents = Array.isArray(account.windows)
					? account.windows
						.map((w) => w && typeof w.remainingPercent === "number" ? w.remainingPercent : null)
						.filter((v) => v !== null)
					: [];
				if (percents.length === 0) return null;
				const value = Math.min(...percents);
				return { kind: "percent", value, display: `${value}%` };
			}
			if (account.balance !== null && account.balance !== void 0 && typeof account.balance.remaining === "number") {
				return { kind: "balance", value: account.balance.remaining, display: fmtCurrency(account.balance.remaining, account.balance.currency) };
			}
			return null;
		}

		/**
		 * Low-balance warning policy for the collapsed badge, isolated by
		 * `account.mode`: balance uses an absolute amount (remaining <= 5 currency
		 * units), subscription uses the lowest remaining percent (<= 5%). A null
		 * account value is never a warning.
		 */
		function badgeWarnOf(account) {
			const value = badgeAccountValue(account);
			if (value === null) return false;
			return value.value <= 5;
		}

		/**
		 * Per-request staleness guard: each `start()` bumps a private counter and
		 * only the most recent start may `isCurrent()`. Usage and balance each
		 * hold their OWN loader, so the two never invalidate each other (the
		 * shared-counter race that dropped the first usage response).
		 */
		function createLoader() {
			let current = 0;
			return {
				start: () => ++current,
				isCurrent: (id) => id === current
			};
		}


		/** True when a pointer event happened outside both the portaled panel and its sidebar badge. */
		function shouldDismissPanel(path, target, layer, panel) {
			const eventPath = Array.isArray(path) ? path : [];
			const inside = (root) => root !== null && root !== void 0 && (
				eventPath.includes(root)
				|| (target !== null && target !== void 0 && typeof root.contains === "function" && root.contains(target))
			);
			return !inside(layer) && !inside(panel);
		}

		const SAFE_DIAGNOSTIC_REASONS = new Set([
			"dns-resolution-failed",
			"timeout",
			"rate-limited",
			"unauthorized",
			"upstream-invalid-json",
			"upstream-not-json",
			"upstream-too-large",
			"upstream-invalid-response",
			"blocked-network",
			"all-addresses-unreachable",
			"no-validated-address",
			"sub2api-balance-shape-unrecognized",
			"unknown"
		]);

		/** Defense-in-depth filter for server-provided, secret-free diagnostic reasons. */
		function safeDiagnosticReason(reason) {
			return typeof reason === "string" && SAFE_DIAGNOSTIC_REASONS.has(reason) ? reason : null;
		}

		function diagnosticReasonText(reason, translate) {
			const value = safeDiagnosticReason(reason);
			if (value === null) return null;
			if (value === "dns-resolution-failed") return translate("account.reason.dnsResolutionFailed");
			if (value === "all-addresses-unreachable") return translate("account.reason.allAddressesUnreachable");
			if (value === "upstream-not-json") return translate("account.reason.upstreamNotJson");
			if (value === "upstream-invalid-json") return translate("account.reason.upstreamInvalidJson");
			if (value === "upstream-too-large") return translate("account.reason.upstreamTooLarge");
			if (value === "upstream-invalid-response") return translate("account.reason.upstreamInvalidResponse");
			if (value === "timeout") return translate("account.reason.timeout");
			if (value === "rate-limited") return translate("account.reason.rateLimited");
			if (value === "unauthorized") return translate("account.reason.unauthorized");
			if (value === "blocked-network") return translate("account.reason.blockedNetwork");
			if (value === "no-validated-address") return translate("account.reason.noValidatedAddress");
			if (value === "sub2api-balance-shape-unrecognized") return translate("account.reason.sub2apiBalanceShapeUnrecognized");
			return translate("account.reason.unknown");
		}

		/**
		 * Normalize server-provided account metadata for the single selector.
		 * Adapter/mode selection belongs to the server registry, never UI guesses.
		 */
		function buildProviderChoices(providers) {
			return Array.isArray(providers) ? providers.map((provider) => ({
				...provider,
				accountMode: provider.accountMode ?? "balance"
			})) : [];
		}

		/** Locale-safe template interpolation: `t("key", {a})` replaces `{a}`. */
		function interpolate(template, params) {
			if (params === void 0) return template;
			return template.replace(/\{(\w+)\}/g, (match, key) => (Object.hasOwn(params, key) ? String(params[key]) : match));
		}

		async function fetchJson(path) {
			const response = await fetch(path, { headers: { accept: "application/json" } });
			if (!response.ok) throw new Error(`HTTP ${response.status}`);
			const payload = await response.json();
			if (payload === null || typeof payload !== "object") throw new Error("unexpected response");
			return payload;
		}

		//#region CurrentSessionPill
		/**
		 * Compact event signature from the formal composer slot's point-in-time
		 * session snapshot. These fields change at turn/message boundaries where
		 * the server-side currentRoute can change, without reacting to every input
		 * keystroke or adding a timer/DOM observer.
		 */
		function sessionContextSignalOf(session) {
			const nodes = Array.isArray(session?.nodes) ? session.nodes.length : 0;
			const order = Array.isArray(session?.chat?.order) ? session.chat.order.length : 0;
			return `${session?.running === true ? 1 : 0}:${nodes}:${order}:${session?.partial === null || session?.partial === void 0 ? 0 : 1}:${session?.removed === true ? 1 : 0}`;
		}

		/** Event signature from DSH's existing per-session model selector store. */
		function modelSelectionSignalOf(snapshot) {
			const provider = typeof snapshot?.current?.provider === "string" ? snapshot.current.provider : "";
			const model = typeof snapshot?.current?.model === "string" ? snapshot.current.model : "";
			return JSON.stringify([provider, model]);
		}

		/**
		 * Resolve one explicit DSH session through the server-owned identity and
		 * account protocols. The account endpoint reads AccountService's existing
		 * cache; this function owns no provider mapping, credential, or cache.
		 */
		async function loadSessionPillSnapshot(sessionId, request = fetchJson, selectedRoute = null) {
			if (typeof sessionId !== "string" || sessionId === "") return null;
			const selectionQuery = typeof selectedRoute?.provider === "string" && selectedRoute.provider !== ""
				&& typeof selectedRoute.model === "string" && selectedRoute.model !== ""
				? `&provider=${encodeURIComponent(selectedRoute.provider)}&model=${encodeURIComponent(selectedRoute.model)}`
				: "";
			const contextPayload = await request(`/api/usage-stats/session-context?session=${encodeURIComponent(sessionId)}${selectionQuery}`);
			if (contextPayload?.ok !== true || contextPayload.context === null || typeof contextPayload.context !== "object") return null;
			const context = contextPayload.context;
			const accountId = typeof context.accountId === "string" && context.accountId !== ""
				? context.accountId
				: typeof context.providerId === "string" && context.providerId !== "" ? context.providerId : null;
			if (accountId === null) return null;
			try {
				const accountPayload = await request(`/api/usage-stats/account?provider=${encodeURIComponent(accountId)}&activity=active`);
				if (accountPayload?.ok === true && accountPayload.account !== null && typeof accountPayload.account === "object") {
					return { context, account: accountPayload.account };
				}
				return {
					context,
					account: null,
					status: accountPayload?.error === "unknown-provider" ? "unsupported" : "unavailable"
				};
			} catch {
				return { context, account: null, status: "unavailable" };
			}
		}

		function percentLabel(value) {
			return `${value.toFixed(value % 1 === 0 ? 0 : 1)}%`;
		}

		/** Reduce a server snapshot to display-only fields; never retain secrets. */
		function sessionPillViewOf(snapshot, translate, now = Date.now()) {
			if (snapshot === null || snapshot === void 0 || snapshot.context === null || typeof snapshot.context !== "object") return null;
			const account = snapshot.account !== null && typeof snapshot.account === "object" ? snapshot.account : null;
			const providerId = typeof snapshot.context.accountId === "string" && snapshot.context.accountId !== ""
				? snapshot.context.accountId
				: typeof snapshot.context.providerId === "string" && snapshot.context.providerId !== "" ? snapshot.context.providerId : null;
			if (providerId === null) return null;
			const providerLabel = typeof account?.displayName === "string" && account.displayName !== ""
				? account.displayName
				: typeof snapshot.context.providerId === "string" && snapshot.context.providerId !== "" ? snapshot.context.providerId : providerId;
			let status = typeof account?.status === "string" ? account.status : typeof snapshot.status === "string" ? snapshot.status : "unavailable";
			if (account?.stale === true && status === "ok") status = "unavailable";
			if (status !== "ok") {
				const value = status === "unsupported"
					? translate("sessionPill.status.unsupported")
					: subscriptionStatusLabel(status, translate);
				return {
					providerId,
					providerLabel,
					status,
					value,
					tone: "neutral",
					ariaLabel: translate("sessionPill.aria", { provider: providerLabel, value })
				};
			}

			let value = null;
			let auxiliaryLabel = "";
			if (account?.mode === "subscription") {
				const windows = Array.isArray(account.windows)
					? account.windows.filter((entry) => entry !== null && typeof entry === "object" && typeof entry.remainingPercent === "number" && Number.isFinite(entry.remainingPercent))
					: [];
				const tightest = windows.reduce((current, entry) => current === null || entry.remainingPercent < current.remainingPercent ? entry : current, null);
				if (tightest !== null) {
					value = `${quotaLabel(tightest.kind, translate)} · ${percentLabel(tightest.remainingPercent)}`;
					auxiliaryLabel = resetLabel(tightest.resetsAt, translate, now);
				}
			} else if (account?.balance?.unlimited === true) {
				value = "∞";
			} else if (account?.balance !== null && account?.balance !== void 0 && account.balance.remaining !== null && account.balance.remaining !== void 0 && Number.isFinite(Number(account.balance.remaining))) {
				value = fmtCurrency(account.balance.remaining, account.balance.currency);
			}

			if (value === null) {
				const invalid = translate("account.status.invalidResponse");
				return {
					providerId,
					providerLabel,
					status: "invalid-response",
					value: invalid,
					tone: "neutral",
					ariaLabel: translate("sessionPill.aria", { provider: providerLabel, value: invalid })
				};
			}
			const alertLevel = account?.alert?.level;
			const tone = alertLevel === "normal" || alertLevel === "warning" || alertLevel === "critical" ? alertLevel : "neutral";
			const accessibleValue = auxiliaryLabel === "" ? value : `${value} · ${auxiliaryLabel}`;
			return {
				providerId,
				providerLabel,
				status,
				value,
				tone,
				ariaLabel: translate("sessionPill.aria", { provider: providerLabel, value: accessibleValue })
			};
		}

		const usageStatsPanelOpeners = /* @__PURE__ */ new Set();

		function subscribeUsageStatsPanel(opener) {
			if (typeof opener !== "function") return () => {};
			usageStatsPanelOpeners.add(opener);
			return () => usageStatsPanelOpeners.delete(opener);
		}

		function requestUsageStatsPanel(providerId) {
			const openers = [...usageStatsPanelOpeners];
			openers[openers.length - 1]?.(providerId);
		}

		/** Pure compact pill view, separated for render/click regression tests. */
		function CurrentSessionPillView({ snapshot, translate, onOpen = requestUsageStatsPanel, now = Date.now() }) {
			const view = sessionPillViewOf(snapshot, translate, now);
			if (view === null) return null;
			return react_jsx_runtime.jsxs("button", {
				type: "button",
				className: S.sessionPill,
				"data-current-session-pill": true,
				"data-provider": view.providerId,
				"data-status": view.status,
				"data-tone": view.tone,
				"aria-label": view.ariaLabel,
				title: view.ariaLabel,
				onClick: () => onOpen(view.providerId),
				children: [
					react_jsx_runtime.jsx("span", { className: S.sessionPillProvider, children: view.providerLabel }),
					react_jsx_runtime.jsx("span", { className: S.sessionPillSeparator, "aria-hidden": true, children: "·" }),
					react_jsx_runtime.jsx("span", { className: S.sessionPillValue, children: view.value })
				]
			});
		}

		/** Formal `conversation.input.right` slot occupant. */
		function CurrentSessionPill({ sessionId, session, modelDirectory, request = fetchJson, t }) {
			const translate = (key, params) => interpolate(t !== void 0 ? t(key) : key, params);
			const [loaded, setLoaded] = react.useState({ key: null, snapshot: null });
			const loaderRef = react.useRef(null);
			if (loaderRef.current === null) loaderRef.current = createLoader();
			const signal = sessionContextSignalOf(session);
			const subscribeModelSelection = react.useCallback((notify) => typeof modelDirectory?.subscribe === "function"
				? modelDirectory.subscribe(notify)
				: () => {}, [modelDirectory]);
			const getModelSelectionSignal = react.useCallback(() => modelSelectionSignalOf(
				typeof modelDirectory?.getSnapshot === "function" ? modelDirectory.getSnapshot() : null
			), [modelDirectory]);
			const modelSignal = react.useSyncExternalStore(subscribeModelSelection, getModelSelectionSignal, getModelSelectionSignal);
			const requestKey = JSON.stringify([sessionId, signal, modelSignal]);
			const [selectedProvider, selectedModel] = JSON.parse(modelSignal);
			const selectedRoute = selectedProvider !== "" && selectedModel !== ""
				? { provider: selectedProvider, model: selectedModel }
				: null;
			react.useEffect(() => {
				const seq = loaderRef.current.start();
				let mounted = true;
				setLoaded({ key: requestKey, snapshot: null });
				loadSessionPillSnapshot(sessionId, request, selectedRoute).then((next) => {
					if (mounted && loaderRef.current.isCurrent(seq)) setLoaded({ key: requestKey, snapshot: next });
				}).catch(() => {
					if (mounted && loaderRef.current.isCurrent(seq)) setLoaded({ key: requestKey, snapshot: null });
				});
				return () => {
					mounted = false;
				};
			}, [sessionId, signal, modelSignal, request, requestKey, selectedRoute?.provider, selectedRoute?.model]);
			return react_jsx_runtime.jsx(CurrentSessionPillView, {
				snapshot: loaded.key === requestKey ? loaded.snapshot : null,
				translate
			});
		}
		//#endregion

		/**
		 * Build one month's calendar heatmap: weeks as rows (Mon-first), only
		 * the month's own days, padded with null placeholders. Cell tokens come
		 * from the day map; `max` is the month's largest daily total, used for
		 * the absolute log-scale color mapping.
		 * @param dayMap - date key → day entry map.
		 * @param year - calendar year.
		 * @param month - zero-based month.
		 * @returns `{ weeks, max }`.
		 */
		function buildMonthHeatmap(dayMap, year, month) {
			const first = new Date(year, month, 1);
			const daysInMonth = new Date(year, month + 1, 0).getDate();
			const lead = (first.getDay() + 6) % 7; // Monday = 0
			const weeks = [];
			let max = 0;
			for (let w = 0; w * 7 < lead + daysInMonth; w += 1) {
				const week = [];
				for (let d = 0; d < 7; d += 1) {
					const dayNum = w * 7 + d - lead + 1;
					if (dayNum < 1 || dayNum > daysInMonth) {
						week.push(null);
						continue;
					}
					const date = new Date(year, month, dayNum);
					const key = dayKeyOf(date);
					const entry = dayMap.get(key);
					const tokens = entry?.tokens ?? 0;
					week.push({ key, day: dayNum, tokens, hitRate: entry?.cacheHitRate ?? null });
					if (tokens > max) max = tokens;
				}
				weeks.push(week);
			}
			return { weeks, max };
		}

		/**
		 * Codex-style blue cell color: continuous square-root mapping against
		 * the month's max (more tokens → strictly deeper blue, no banding),
		 * rendered as a plain rgba overlay of #1f6feb so it works in every
		 * browser/theme without color-mix support. Zero is the neutral gray
		 * "empty" cell. Returns the cell's background and text color.
		 */
		const BLUE_RGB = [31, 111, 235];
		function cellColor(tokens, max) {
			if (tokens <= 0) {
				return {
					background: "var(--usg-cellEmpty)",
					color: "var(--dsw-alias-label-secondary)"
				};
			}
			const ratio = max > 0 ? Math.sqrt(tokens / max) : 1;
			const alpha = Math.min(1, 0.22 + 0.78 * ratio);
			return {
				background: `rgba(${BLUE_RGB[0]}, ${BLUE_RGB[1]}, ${BLUE_RGB[2]}, ${alpha.toFixed(3)})`,
				color: alpha >= 0.6 ? "rgba(255,255,255,0.95)" : "var(--dsw-alias-label-primary)"
			};
		}
		//#endregion

		//#region UsageStatsPanel
		/**
		 * Sidebar footer action: badge + floating panel with balance and usage.
		 * @param props - `wide` from the sidebar shell, `t` bound by the slot runtime.
		 */
		function UsageStatsPanel({ wide, t }) {
			const translate = (key, params) => interpolate(t !== void 0 ? t(key) : key, params);
			const [open, setOpen] = react.useState(false);
			const [usage, setUsage] = react.useState(null);
			const [usageError, setUsageError] = react.useState(null);
			const [selectedDay, setSelectedDay] = react.useState(null);
			const [usageFilter, setUsageFilter] = react.useState("");
			const [viewMonth, setViewMonth] = react.useState(() => currentMonthKey());
			const [providers, setProviders] = react.useState([]);
			const [providersLoaded, setProvidersLoaded] = react.useState(false);
			const [selectedProvider, setSelectedProvider] = react.useState(null);
			const [account, setAccount] = react.useState(null);
			const [accountLoading, setAccountLoading] = react.useState(false);
			const [accountError, setAccountError] = react.useState(null);
			const [refreshedAt, setRefreshedAt] = react.useState(null);
			const mountedRef = react.useRef(true);
			const usageLoaderRef = react.useRef(null);
			const accountLoaderRef = react.useRef(null);
			const layerRef = react.useRef(null);
			const panelRef = react.useRef(null);
			if (usageLoaderRef.current === null) usageLoaderRef.current = createLoader();
			if (accountLoaderRef.current === null) accountLoaderRef.current = createLoader();
			const providerChoices = react.useMemo(() => buildProviderChoices(providers), [providers]);
			const selectedProviderInfo = providerChoices.find((provider) => provider.id === selectedProvider) ?? null;
			const openForProvider = react.useCallback((providerId) => {
				if (typeof providerId === "string" && providerId !== "") setSelectedProvider(providerId);
				setOpen(true);
			}, []);

			// The composer pill and sidebar panel are separate slot roots. A tiny
			// in-module subscription bridge opens this existing panel without DOM
			// clicks, a new panel implementation, or another account state/cache.
			react.useEffect(() => subscribeUsageStatsPanel(openForProvider), [openForProvider]);

			const loadUsage = react.useCallback(() => {
				const seq = usageLoaderRef.current.start();
				setUsageError(null);
				fetchJson("/api/usage-stats/usage").then((payload) => {
					if (!mountedRef.current || !usageLoaderRef.current.isCurrent(seq)) return;
					if (payload.ok !== true) {
						setUsageError(payload.message ?? "usage aggregation failed");
						return;
					}
					setUsage(payload);
					setRefreshedAt(Date.now());
				}).catch((error) => {
					if (!mountedRef.current || !usageLoaderRef.current.isCurrent(seq)) return;
					setUsageError(error instanceof Error ? error.message : String(error));
				});
			}, []);

			const loadProviders = react.useCallback(() => {
				fetchJson("/api/usage-stats/providers").then((payload) => {
					if (!mountedRef.current) return;
					if (payload.ok !== true) {
						setProvidersLoaded(true);
						return;
					}
					const list = Array.isArray(payload.providers) ? payload.providers : [];
					setProviders(list);
					setProvidersLoaded(true);
				}).catch(() => { setProvidersLoaded(true); });
			}, []);

			const loadAccount = react.useCallback((providerId, force = false, activity = null) => {
				const seq = accountLoaderRef.current.start();
				setAccountLoading(true);
				setAccountError(null);
				const target = providerId;
				if (target === null) {
					setAccountLoading(false);
					setAccountError("no providers");
					return;
				}
				const activityQuery = activity === "detail" ? "&activity=detail" : "";
				const query = `?provider=${encodeURIComponent(target)}${force ? "&refresh=1" : ""}${activityQuery}`;
				fetchJson(`/api/usage-stats/account${query}`).then((payload) => {
					if (!mountedRef.current || !accountLoaderRef.current.isCurrent(seq)) return;
					if (payload.ok !== true) {
						setAccountError(payload.message ?? "account fetch failed");
						return;
					}
					setAccount(payload.account);
					setRefreshedAt(payload.account?.fetchedAt ?? Date.now());
				}).catch((error) => {
					if (!mountedRef.current || !accountLoaderRef.current.isCurrent(seq)) return;
					setAccountError(error instanceof Error ? error.message : String(error));
				}).finally(() => {
					if (mountedRef.current && accountLoaderRef.current.isCurrent(seq)) setAccountLoading(false);
				});
			}, []);

			react.useEffect(() => {
				mountedRef.current = true;
				return () => {
					mountedRef.current = false;
				};
			}, []);

			// The host footer-actions container lays sidebar.footer.action list
			// registrations out in a ROW, so two full-width entries squeeze onto
			// one line and the later one (us) is pushed out of view (#21). Switch
			// the container to column stacking while mounted and restore its
			// previous inline value on unmount. Walking up (instead of targeting
			// the host's hashed class) keeps this working across dsh versions,
			// and a container that is already columnar is left untouched.
			react.useEffect(() => {
				let host = layerRef.current?.parentElement ?? null;
				for (let depth = 0; host !== null && depth < 3; depth += 1) {
					if (window.getComputedStyle(host).display.includes("flex")) break;
					host = host.parentElement;
				}
				if (host === null) return void 0;
				const hostStyle = window.getComputedStyle(host);
				if (!hostStyle.display.includes("flex") || hostStyle.flexDirection === "column") return void 0;
				const previous = host.style.flexDirection;
				host.style.flexDirection = "column";
				return () => {
					host.style.flexDirection = previous;
				};
			}, []);


			// Utility-popover dismissal: the panel is portaled to document.body, so
			// use capture-phase pointerdown + composedPath rather than DOM ancestry.
			react.useEffect(() => {
				if (!open) return void 0;
				const onPointerDown = (event) => {
					const path = typeof event.composedPath === "function" ? event.composedPath() : [];
					if (shouldDismissPanel(path, event.target, layerRef.current, panelRef.current)) setOpen(false);
				};
				const onKeyDown = (event) => {
					if (event.key === "Escape") setOpen(false);
				};
				document.addEventListener("pointerdown", onPointerDown, true);
				document.addEventListener("keydown", onKeyDown, true);
				return () => {
					document.removeEventListener("pointerdown", onPointerDown, true);
					document.removeEventListener("keydown", onKeyDown, true);
				};
			}, [open]);

			// Keep exactly one valid provider selected across independent provider
			// and subscription responses. DeepSeek remains the initial preference.
			react.useEffect(() => {
				if (!providersLoaded || providerChoices.length === 0) return;
				setSelectedProvider((current) => {
					if (current !== null && providerChoices.some((provider) => provider.id === current)) return current;
					return providerChoices.find((provider) => provider.id === "deepseek-official" && provider.configured)?.id
						?? providerChoices.find((provider) => provider.id === "deepseek")?.id
						?? providerChoices.find((provider) => provider.configured)?.id
						?? providerChoices[0].id;
				});
			}, [providerChoices, providersLoaded]);

			react.useEffect(() => {
				if (!open) return;
				loadUsage();
				loadProviders();
				const usageTimer = window.setInterval(loadUsage, 60000);
				const providerTimer = window.setInterval(loadProviders, 300000);
				return () => {
					window.clearInterval(usageTimer);
					window.clearInterval(providerTimer);
				};
			}, [open, loadUsage, loadProviders]);

			// Fetch the selected account for BOTH the panel and the collapsed
			// sidebar badge. The server owns the adaptive upstream schedule; this
			// pre-existing shared panel path only re-reads that cache every five
			// minutes (no refresh=1), and marks an open detail view as active.
			react.useEffect(() => {
				if (selectedProvider === null) return;
				const activity = open ? "detail" : null;
				loadAccount(selectedProvider, false, activity);
				const cacheTimer = window.setInterval(() => loadAccount(selectedProvider, false, activity), 300000);
				return () => {
					window.clearInterval(cacheTimer);
				};
			}, [selectedProvider, loadAccount, open]);

			const usageProviders = react.useMemo(() => {
				const set = new Set();
				if (usage !== null && Array.isArray(usage.days)) {
					for (const day of usage.days) {
						for (const model of day.models ?? []) {
							const provider = providerOfRoute(model.model);
							if (provider !== "") set.add(provider);
						}
					}
				}
				return [...set].sort();
			}, [usage]);

			// Provider-scoped usage view computed purely from the already-fetched
			// per-model data — no upstream request. `usageFilter === ""` keeps the
			// aggregate across all providers (the default, unchanged behavior).
			const scopedUsage = react.useMemo(() => {
				if (usageFilter === "" || usage === null || !Array.isArray(usage.days)) return usage;
				const prefix = `${usageFilter}/`;
				const days = [];
				const total = { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0 };
				for (const day of usage.days) {
					const models = (day.models ?? []).filter((modelItem) => modelItem.model.startsWith(prefix));
					if (models.length === 0) continue;
					const buckets = sumBuckets(models);
					days.push({
						date: day.date,
						...buckets,
						tokens: tokensOf(buckets),
						cacheHitRate: hitOf(buckets),
						models
					});
					total.inputTokens += buckets.inputTokens;
					total.outputTokens += buckets.outputTokens;
					total.cacheReadTokens += buckets.cacheReadTokens;
					total.cacheWriteTokens += buckets.cacheWriteTokens;
				}
				return {
					days,
					total: { ...total, tokens: tokensOf(total), cacheHitRate: hitOf(total) },
					updatedAt: usage.updatedAt
				};
			}, [usage, usageFilter]);

			// Provider label map from the account-side provider list (usage route ids
			// sometimes differ; prefer the account displayName when the id matches).
			const providerNameById = react.useMemo(() => {
				const map = {};
				for (const provider of providerChoices) map[provider.id] = provider.displayName;
				return map;
			}, [providerChoices]);

			// Panel summary pills: one per provider (icon + name + today/month/total/cache).
			const panelUsagePills = react.useMemo(() => providerUsageStats(usage).map((row) => {
				const label = providerNameById[row.id] ?? row.id;
				return providerUsagePill(
					row,
					buildUsageParts(row, { showMonth: true, showBalance: false }, { displayName: label }),
					{ displayName: label }
				);
			}), [usage, providerNameById]);

			const dayMap = react.useMemo(() => {
				const map = new Map();
				if (scopedUsage !== null && Array.isArray(scopedUsage.days)) {
					for (const day of scopedUsage.days) map.set(day.date, day);
				}
				return map;
			}, [scopedUsage]);

			// Drop a stale selection when refreshed data no longer has that day.
			react.useEffect(() => {
				if (selectedDay !== null && !dayMap.has(selectedDay)) setSelectedDay(null);
			}, [dayMap, selectedDay]);

			// Never browse past the current month.
			react.useEffect(() => {
				const current = currentMonthKey();
				if (viewMonth > current) setViewMonth(current);
			}, [viewMonth]);

			const heat = react.useMemo(() => {
				// viewMonth is `YYYY-MM` with a 1-based month; the builder wants 0-based.
				const [year, monthOneBased] = viewMonth.split("-").map(Number);
				return buildMonthHeatmap(dayMap, year, monthOneBased - 1);
			}, [dayMap, viewMonth]);

			const stats = react.useMemo(() => {
				if (scopedUsage === null || !Array.isArray(scopedUsage.days)) return null;
				const today = todayKey();
				const month = today.slice(0, 7);
				let todayEntry = null;
				let dayTokens = 0;
				let monthTokens = 0;
				let total = scopedUsage.total?.tokens ?? 0;
				for (const day of scopedUsage.days) {
					if (day.date === today) {
						dayTokens = day.tokens ?? 0;
						todayEntry = day;
					}
					if (day.date.startsWith(month)) monthTokens += day.tokens ?? 0;
				}
				return { dayTokens, monthTokens, total, todayHit: todayEntry?.cacheHitRate ?? null };
			}, [scopedUsage]);

			const recent = react.useMemo(() => {
				// Last 14 CALENDAR days (not "last 14 recorded days"): days without
				// usage inside the window are omitted from the list.
				if (scopedUsage === null || !Array.isArray(scopedUsage.days)) return [];
				const cutoff = new Date();
				cutoff.setDate(cutoff.getDate() - 13);
				const cutoffKey = dayKeyOf(cutoff);
				return scopedUsage.days.filter((day) => day.date >= cutoffKey && day.date <= todayKey()).reverse();
			}, [scopedUsage]);

			const selectedEntry = selectedDay !== null ? dayMap.get(selectedDay) ?? null : null;
			const badgeCount = stats !== null ? fmtCompact(stats.dayTokens) : null;

			// Badge layout: 「用量/余额」label + today's token count on the right.
			// The account balance/quota amount is intentionally NOT rendered in the
			// sidebar badge; open the panel to see the balance.
			const badgeLabel = translate("panel.badge");

			const retry = () => {
				loadUsage();
				loadProviders();
				if (selectedProvider !== null) loadAccount(selectedProvider, true, open ? "detail" : null);
			};

			const updatedLabel = refreshedAt === null ? "" : translate("panel.updatedAt", {
				time: new Date(refreshedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
			});

			return react_jsx_runtime.jsxs("div", {
				ref: layerRef,
				className: wide ? S.layer : `${S.layer} ${S.rail}`,
				children: [
					// Portal the panel to document.body: sidebar-scoped theme tokens
					// (e.g. glass skins that set light label colors for a dark sidebar)
					// would otherwise leak into the panel and clash with its
					// overlay surface from the global scope (#17).
					open && react_dom.createPortal(react_jsx_runtime.jsxs("section", {
						ref: panelRef,
						className: S.panel,
						"data-usage-stats-panel": true,
						"aria-label": translate("panel.title"),
						children: [
							react_jsx_runtime.jsxs("header", {
								className: S.header,
								children: [
									react_jsx_runtime.jsxs("div", {
										className: S.headerLeft,
										children: [
											react_jsx_runtime.jsx(primitives.IconDataOutline16, { size: 16 }),
											react_jsx_runtime.jsx("span", { className: S.title, children: translate("panel.title") })
										]
									}),
									react_jsx_runtime.jsxs("div", {
										className: S.headerActions,
										children: [
											react_jsx_runtime.jsx(primitives.Tooltip, {
												label: translate("action.refresh"),
												side: "bottom",
												delayMs: 500,
												children: react_jsx_runtime.jsx("button", {
													type: "button",
													className: S.iconButton,
													"aria-label": translate("action.refresh"),
													onClick: retry,
													children: react_jsx_runtime.jsx(primitives.IconRefreshOutline14, { size: 14 })
												})
											}),
											react_jsx_runtime.jsx(primitives.Tooltip, {
												label: translate("action.close"),
												side: "bottom",
												delayMs: 500,
												children: react_jsx_runtime.jsx("button", {
													type: "button",
													className: S.iconButton,
													"aria-label": translate("action.close"),
													onClick: () => setOpen(false),
													children: react_jsx_runtime.jsx(primitives.IconCloseOutline16, { size: 14 })
												})
											})
										]
									})
								]
							}),
							react_jsx_runtime.jsxs("div", {
								className: S.body,
								children: [
									selectedEntry !== null ? react_jsx_runtime.jsx(DayDetail, {
										day: selectedEntry,
										translate,
										onBack: () => setSelectedDay(null)
									}) : react_jsx_runtime.jsxs(react_jsx_runtime.Fragment, {
										children: [
											react_jsx_runtime.jsx("section", {
												className: S.section,
												children: react_jsx_runtime.jsx("h3", { className: S.sectionTitle, children: translate("account.title") })
											}),
											react_jsx_runtime.jsx(ProviderPicker, {
												providers: providerChoices,
												selectedProvider,
												onSelect: (id) => setSelectedProvider(id),
												translate
											}),
											selectedProviderInfo === null ? react_jsx_runtime.jsx("p", { className: S.note, children: translate("account.loading") }) : react_jsx_runtime.jsx("div", {
												className: S.accountGrid,
											children: react_jsx_runtime.jsx(ProviderAccountCard, {
												provider: selectedProviderInfo,
												account: account?.id === selectedProvider ? account : null,
												accountLoading,
												accountError,
												translate,
												onRetry: () => loadAccount(selectedProvider, true, "detail")
												}, selectedProviderInfo.id)
											}),
											react_jsx_runtime.jsx("section", {
												className: S.section,
												children: react_jsx_runtime.jsxs("div", {
													className: S.heatHeader,
													children: [
														react_jsx_runtime.jsx("h3", { className: S.sectionTitle, children: translate("usage.title") }),
														usageProviders.length > 0 ? react_jsx_runtime.jsx("select", {
															className: S.providerFilter,
															value: usageFilter,
															onChange: (event) => setUsageFilter(event.target.value),
															"aria-label": translate("usage.providerFilter"),
															children: [
																react_jsx_runtime.jsx("option", { value: "", children: translate("usage.allProviders") }),
																usageProviders.map((provider) => react_jsx_runtime.jsx("option", { key: provider, value: provider, children: provider }))
															]
														}) : null
													]
												})
											}),
											stats === null && usageError === null ? react_jsx_runtime.jsx("p", { className: S.note, children: translate("usage.loading") }) : null,
											usageError !== null ? react_jsx_runtime.jsxs("div", {
												className: S.error,
												children: [
													react_jsx_runtime.jsx("span", { children: translate("usage.error", { message: usageError }) }),
													react_jsx_runtime.jsx("button", {
														type: "button",
														className: S.retry,
														onClick: loadUsage,
														children: translate("action.retry")
													})
												]
											}) : null,
											stats !== null && react_jsx_runtime.jsxs(react_jsx_runtime.Fragment, {
												children: [
													panelUsagePills.length > 0 ? react_jsx_runtime.jsxs("div", {
														className: S.pillList,
														children: panelUsagePills
													}) : null
												]
											}),
											usage !== null && usageError === null && react_jsx_runtime.jsxs("section", {
												className: S.section,
												children: [
													react_jsx_runtime.jsxs("div", {
														className: S.heatHeader,
														children: [
															react_jsx_runtime.jsx("h3", { className: S.sectionTitle, children: translate("usage.heatmap") }),
															react_jsx_runtime.jsxs("div", {
																className: S.monthNav,
																children: [
																	react_jsx_runtime.jsx("button", {
																		type: "button",
																		className: S.navButton,
																		"aria-label": translate("action.prevMonth"),
																		onClick: () => setViewMonth((month) => shiftMonth(month, -1)),
																		children: react_jsx_runtime.jsx(primitives.IconChevronLeftOutline14, { size: 12 })
																	}),
																	react_jsx_runtime.jsx("span", { className: S.monthTitle, children: monthLabelOf(viewMonth, translate) }),
																	react_jsx_runtime.jsx("button", {
																		type: "button",
																		className: S.navButton,
																		"aria-label": translate("action.nextMonth"),
																		disabled: viewMonth >= currentMonthKey(),
																		onClick: () => setViewMonth((month) => shiftMonth(month, 1)),
																		children: react_jsx_runtime.jsx(primitives.IconChevronRightOutline14, { size: 12 })
																	}),
																	viewMonth !== currentMonthKey() && react_jsx_runtime.jsx("button", {
																		type: "button",
																		className: S.todayButton,
																		onClick: () => setViewMonth(currentMonthKey()),
																		children: translate("action.today")
																	})
																]
															})
														]
													}),
													react_jsx_runtime.jsx(MonthHeatmap, {
														heat,
														translate,
														selectedKey: selectedDay,
														onSelect: setSelectedDay
													})
												]
											}),
											recent.length > 0 && react_jsx_runtime.jsxs("section", {
												className: S.section,
												children: [
													react_jsx_runtime.jsx("h3", { className: S.sectionTitle, children: translate("usage.recent") }),
													react_jsx_runtime.jsx("div", {
														className: S.days,
														children: recent.map((day) => {
															const maxRecent = Math.max(...recent.map((d) => d.tokens ?? 0), 1);
															return react_jsx_runtime.jsxs("button", {
																type: "button",
																className: S.day,
																onClick: () => setSelectedDay(day.date),
																children: [
																	react_jsx_runtime.jsx("span", { className: S.dayDate, children: dayLabel(day.date, translate) }),
																	react_jsx_runtime.jsx("span", { className: S.dayTokens, children: fmt(day.tokens ?? 0) }),
																	react_jsx_runtime.jsx("span", { className: S.dayHit, children: fmtHit(day.cacheHitRate) }),
																	react_jsx_runtime.jsx("div", {
																		className: S.dayBar,
																		style: { width: `${Math.max(4, Math.round(100 * (day.tokens ?? 0) / maxRecent))}%` }
																	})
																]
															}, day.date);
														})
													})
												]
											}),
											updatedLabel !== "" && react_jsx_runtime.jsx("p", { className: S.footerNote, children: updatedLabel })
										]
									})
								]
							})
						]
					}), document.body),
					react_jsx_runtime.jsx("div", {
						className: S.footerButtons,
						children: react_jsx_runtime.jsxs("button", {
							type: "button",
							className: S.badge,
							"data-usage-stats-badge": true,
							"aria-label": translate("panel.badge"),
							"aria-expanded": open,
							onClick: () => setOpen((value) => !value),
							children: [
								react_jsx_runtime.jsx(primitives.IconDataOutline16, { size: wide ? 14 : 18 }),
								wide && react_jsx_runtime.jsxs(react_jsx_runtime.Fragment, {
									children: [
										react_jsx_runtime.jsx("span", { className: S.badgeLabel, children: badgeLabel }),
										badgeCount !== null && react_jsx_runtime.jsx("span", { className: S.badgeCount, children: badgeCount })
									]
								})
							]
						})
					})
				]
			});
		}

		function providerMark(provider) {
			const known = {
				"deepseek-official": "DS",
				deepseek: "DS",
				"opencode-go": "GO",
				ollama: "OL",
				openrouter: "OR",
				moonshotai: "K",
				"moonshotai-cn": "K",
				kimi: "K",
				"kimi-coding": "K",
				zai: "Z",
				"zai-coding-cn": "Z"
			};
			return known[provider.id] ?? known[provider.adapter] ?? String(provider.displayName ?? provider.id).replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase();
		}

		/** Balance-mode body rendered inside the shared provider account frame. */
		function BalanceContent({ balance, state, message, translate, onRetry }) {
			if (state === "loading" || balance === null && state === "ok") return react_jsx_runtime.jsx("p", { className: S.quotaEmpty, children: translate("balance.loading") });
			if (state === "blocked") return react_jsx_runtime.jsx("p", { className: S.quotaEmpty, children: translate("account.blocked") });
			if (state === "unsupported") return react_jsx_runtime.jsx("p", { className: S.quotaEmpty, children: translate("balance.unsupported") });
			if (state === "no-credential") return react_jsx_runtime.jsx("p", { className: S.quotaEmpty, children: translate("balance.noCredential", { ref: message ?? "" }) });
			if (state === "error") return react_jsx_runtime.jsxs("div", {
				className: S.error,
				children: [
					react_jsx_runtime.jsx("span", { children: translate("balance.error", { message: message ?? "" }) }),
					react_jsx_runtime.jsx("button", { type: "button", className: S.retry, onClick: onRetry, children: translate("action.retry") })
				]
			});
			return react_jsx_runtime.jsxs(react_jsx_runtime.Fragment, {
				children: [
					react_jsx_runtime.jsxs("div", {
						className: S.balanceMain,
						children: [
							react_jsx_runtime.jsx("span", { className: S.balanceAmount, children: balance.unlimited ? "∞" : fmtCurrency(balance.remaining, balance.currency) }),
							react_jsx_runtime.jsx("span", { className: S.accountPlan, children: translate("balance.remaining") })
						]
					}),
					react_jsx_runtime.jsx("div", {
						className: S.balanceRows,
						children: [
							{ value: balance.used, label: translate("balance.used") },
							{ value: balance.total, label: translate("balance.total") },
							{ value: balance.breakdown?.toppedUp, label: translate("balance.toppedUp") },
							{ value: balance.breakdown?.granted, label: translate("balance.granted") }
						].filter((row) => row.value !== null && row.value !== void 0).map((row, index) => react_jsx_runtime.jsxs("div", {
							className: S.balanceRow,
							children: [
								react_jsx_runtime.jsx("span", { children: row.label }),
								react_jsx_runtime.jsx("span", { children: fmtCurrency(row.value, balance.currency) })
							]
						}, `${row.label}-${index}`))
					})
				]
			});
		}

		/** Provider selector shared by monetary and subscription account modes. */
		function ProviderPicker({ providers, selectedProvider, onSelect, translate }) {
			if (providers.length === 0) return null;
			return react_jsx_runtime.jsxs("label", {
				className: S.providerPicker,
				children: [
					react_jsx_runtime.jsx("span", { className: S.providerPickerLabel, children: translate("account.provider") }),
					react_jsx_runtime.jsx("select", {
						className: S.providerSelect,
						value: selectedProvider ?? "",
						"aria-label": translate("account.provider"),
						onChange: (event) => onSelect(event.target.value),
						children: providers.map((provider) => react_jsx_runtime.jsx("option", {
							value: provider.id,
							children: provider.displayName
						}, provider.id))
					})
				]
			});
		}

		function subscriptionStatusLabel(status, translate) {
			if (status === "ok") return translate("subscription.status.ok");
			if (status === "not-configured") return translate("subscription.status.notConfigured");
			if (status === "unauthorized") return translate("subscription.status.unauthorized");
			if (status === "rate-limited") return translate("subscription.status.rateLimited");
			if (status === "invalid-response") return translate("account.status.invalidResponse");
			if (status === "blocked") return translate("account.status.blocked");
			if (status === "unsupported") return translate("account.status.unsupported");
			if (status === "unknown") return translate("account.status.unknown");
			return translate("subscription.status.unavailable");
		}

		function quotaLabel(kind, translate) {
			if (kind === "session") return translate("subscription.window.session");
			if (kind === "daily") return translate("subscription.window.daily");
			if (kind === "weekly") return translate("subscription.window.weekly");
			if (kind === "monthly") return translate("subscription.window.monthly");
			if (kind === "quota") return translate("subscription.window.quota");
			if (kind === "billing") return translate("subscription.window.mcp");
			return kind;
		}

		function durationLabel(totalMinutes, translate) {
			if (totalMinutes >= 1440) {
				const days = Math.floor(totalMinutes / 1440);
				const hours = Math.floor(totalMinutes % 1440 / 60);
				return translate("duration.daysHours", { days, hours });
			}
			if (totalMinutes >= 60) {
				const hours = Math.floor(totalMinutes / 60);
				const minutes = totalMinutes % 60;
				return translate("duration.hoursMinutes", { hours, minutes });
			}
			return translate("duration.minutes", { minutes: totalMinutes });
		}

		function formatResetCountdown(resetsAt, now, translate) {
			if (typeof resetsAt !== "string") return "";
			const date = new Date(resetsAt);
			if (Number.isNaN(date.getTime())) return "";
			const diffMs = date.getTime() - now;
			if (diffMs <= 0) return translate("subscription.resetDue");
			const totalMinutes = Math.max(1, Math.ceil(diffMs / 60000));
			return translate("subscription.resets", { time: durationLabel(totalMinutes, translate) });
		}

		function resetLabel(resetsAt, translate, now = Date.now()) {
			return formatResetCountdown(resetsAt, now, translate);
		}

		function provenanceLabel(provenance, translate) {
			if (provenance === "official") return translate("account.provenance.official");
			if (provenance === "provider") return translate("account.provenance.provider");
			if (provenance === "configured") return translate("account.provenance.configured");
			if (provenance === "experimental") return translate("account.provenance.experimental");
			return translate("account.provenance.unknown");
		}

		function healthTimeLabel(value) {
			if (typeof value !== "number" || !Number.isFinite(value)) return "";
			const date = new Date(value);
			return Number.isNaN(date.getTime()) ? "" : date.toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
		}

		function healthAgeLabel(value, translate) {
			if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return "";
			return durationLabel(Math.floor(value / 60000), translate);
		}

		function AccountHealth({ account, translate }) {
			if (account === null || account === void 0 || typeof account !== "object") return null;
			const rows = [];
			const attempted = healthTimeLabel(account.lastAttemptAt);
			const succeeded = healthTimeLabel(account.lastSuccessAt);
			const age = healthAgeLabel(account.ageMs, translate);
			if (attempted !== "") rows.push(["account.health.lastAttempt", attempted]);
			if (succeeded !== "") rows.push(["account.health.lastSuccess", succeeded]);
			if (age !== "") rows.push(["account.health.age", age]);
			rows.push(["account.health.provenance", provenanceLabel(account.provenance, translate)]);
			return react_jsx_runtime.jsx("dl", {
				className: S.accountHealth,
				children: rows.flatMap(([label, value]) => [
					react_jsx_runtime.jsx("dt", { children: translate(label) }, `${label}-term`),
					react_jsx_runtime.jsx("dd", { children: value }, `${label}-value`)
				])
			});
		}

		/** Percentage-window body rendered inside the shared provider account frame. */
		function SubscriptionContent({ provider, translate }) {
			const windows = Array.isArray(provider.windows) ? provider.windows : [];
			const status = typeof provider.status === "string" ? provider.status : "unavailable";
			const emptyMessage = status === "not-configured"
				? translate("subscription.notConfigured", { refs: Array.isArray(provider.missingCredentials) ? provider.missingCredentials.join(" + ") : "" })
				: status === "unauthorized" ? translate("subscription.unauthorized")
					: status === "rate-limited" ? translate("subscription.rateLimited")
						: status === "invalid-response" ? translate("account.invalidResponse")
							: status === "blocked" ? translate("account.blocked")
								: status === "unsupported" ? translate("balance.unsupported")
									: translate("subscription.unavailable");
			return (status === "ok" || provider.stale === true) && windows.length > 0 ? react_jsx_runtime.jsx("div", {
						className: S.quotaList,
						children: windows.map((window) => {
							const used = Math.max(0, Math.min(100, Number(window.usedPercent) || 0));
							return react_jsx_runtime.jsxs("div", {
								className: S.quotaRow,
								children: [
									react_jsx_runtime.jsxs("div", {
										className: S.quotaMeta,
										children: [
											react_jsx_runtime.jsx("span", { className: S.quotaLabel, children: quotaLabel(window.kind, translate) }),
											react_jsx_runtime.jsx("span", { className: S.quotaReset, children: resetLabel(window.resetsAt, translate) }),
											react_jsx_runtime.jsx("span", { className: S.quotaValue, children: translate("subscription.used", { value: used.toFixed(used % 1 === 0 ? 0 : 1) }) })
										]
									}),
									react_jsx_runtime.jsx("div", {
										className: S.quotaTrack,
										role: "progressbar",
										"aria-label": quotaLabel(window.kind, translate),
										"aria-valuemin": 0,
										"aria-valuemax": 100,
										"aria-valuenow": used,
										children: react_jsx_runtime.jsx("div", { className: S.quotaFill, style: { width: `${used}%` } })
									})
								]
							}, window.kind);
						})
					}) : react_jsx_runtime.jsx("p", { className: S.quotaEmpty, children: emptyMessage });
		}

		/**
		 * The single account-card interface. Provider identity/colour/status live
		 * in the shared frame; only the inner balance/quota data varies by mode.
		 */
		function ProviderAccountCard({ provider, account, accountLoading, accountError, translate, onRetry }) {
			const mode = account?.mode ?? provider.accountMode ?? "balance";
			const subscriptionMode = mode === "subscription";
			const status = accountLoading && account === null ? "loading" : account?.status ?? "unavailable";
			const statusText = account?.stale === true ? translate("account.status.stale")
				: status === "loading" ? translate("account.status.loading")
				: status === "blocked" ? translate("account.status.blocked")
					: status === "unsupported" ? translate("account.status.unsupported")
						: subscriptionStatusLabel(status, translate);
			const subtitle = account?.plan ?? (subscriptionMode ? translate("subscription.planUnknown") : translate("account.balanceMode"));
			const balanceState = accountLoading && account === null ? "loading"
				: accountError !== null ? "error"
					: status === "not-configured" ? "no-credential"
						: status === "blocked" ? "blocked"
							: status === "unsupported" ? "unsupported"
								: account?.balance !== null && account?.balance !== void 0 ? "ok" : "error";
			const balanceMessage = accountError ?? account?.missingCredentials?.[0] ?? status;
			const reasonText = diagnosticReasonText(account?.reason, translate);
			return react_jsx_runtime.jsxs("article", {
				className: S.accountCard,
				"data-provider": provider.id,
				"data-adapter": provider.adapter ?? provider.accountMode ?? "",
				"data-account-mode": mode,
				"data-account-stale": account?.stale === true,
				children: [
					react_jsx_runtime.jsxs("div", {
						className: S.accountHead,
						children: [
							react_jsx_runtime.jsx("span", { className: S.accountMark, "aria-hidden": true, children: providerMark(provider) }),
							react_jsx_runtime.jsxs("span", {
								className: S.accountIdentity,
								children: [
									react_jsx_runtime.jsx("span", { className: S.accountName, children: provider.displayName }),
									react_jsx_runtime.jsx("span", { className: S.accountPlan, children: subtitle })
								]
							}),
							react_jsx_runtime.jsx("span", { className: S.accountStatus, "data-status": status, children: statusText })
						]
					}),
					subscriptionMode
						? accountError !== null ? react_jsx_runtime.jsxs("div", {
							className: S.error,
							children: [
								react_jsx_runtime.jsx("span", { children: translate("subscription.error", { message: accountError }) }),
								react_jsx_runtime.jsx("button", { type: "button", className: S.retry, onClick: onRetry, children: translate("action.retry") })
							]
						}) : accountLoading && account === null
							? react_jsx_runtime.jsx("p", { className: S.quotaEmpty, children: translate("subscription.loading") })
							: react_jsx_runtime.jsx(SubscriptionContent, { provider: account ?? { status: "unavailable", windows: [] }, translate })
						: react_jsx_runtime.jsx(BalanceContent, { balance: account?.balance ?? null, state: balanceState, message: balanceMessage, translate, onRetry }),
				react_jsx_runtime.jsx(AccountHealth, { account, translate }),
				reasonText !== null && status !== "ok" ? react_jsx_runtime.jsx("p", { className: S.note, children: reasonText }) : null
				]
			});
		}

		/**
		 * One day's per-model breakdown. `day` is the wire day entry carrying
		 * `tokens`, `cacheHitRate`, and `models` (descending by tokens).
		 */
		function DayDetail({ day, translate, onBack }) {
			const models = Array.isArray(day.models) ? day.models : [];
			const totalTokens = day.tokens ?? 0;
			return react_jsx_runtime.jsxs(react_jsx_runtime.Fragment, {
				children: [
					react_jsx_runtime.jsxs("div", {
						className: S.detailHeader,
						children: [
							react_jsx_runtime.jsx("button", {
								type: "button",
								className: S.back,
								"aria-label": translate("usage.back"),
								onClick: onBack,
								children: react_jsx_runtime.jsx(primitives.IconChevronLeftOutline14, { size: 14 })
							}),
							react_jsx_runtime.jsx("span", { className: S.detailDate, children: dayLabel(day.date, translate) }),
							react_jsx_runtime.jsx("span", { className: S.detailHit, children: `${translate("usage.hitRate")} ${fmtHit(day.cacheHitRate)}` })
						]
					}),
					react_jsx_runtime.jsx("p", {
						className: S.detailSummary,
						children: `${translate("usage.total")} ${fmt(totalTokens)} · ${translate("usage.input")} ${fmt(day.inputTokens ?? 0)} · ${translate("usage.output")} ${fmt(day.outputTokens ?? 0)} · ${translate("usage.cacheRead")} ${fmt(day.cacheReadTokens ?? 0)}`
					}),
					react_jsx_runtime.jsx("div", {
						className: S.days,
						children: models.length === 0 ? react_jsx_runtime.jsx("p", { className: S.note, children: translate("usage.noModels") }) : models.map((model) => {
							const share = totalTokens > 0 ? Math.max(3, Math.round(100 * (model.tokens ?? 0) / totalTokens)) : 0;
							return react_jsx_runtime.jsxs("div", {
								className: S.modelRow,
								children: [
									react_jsx_runtime.jsxs("div", {
										className: S.modelHead,
										children: [
											react_jsx_runtime.jsx("span", { className: S.modelName, title: model.model, children: modelLabelOf(model.model, translate) }),
											react_jsx_runtime.jsx("span", { className: S.modelTokens, children: fmt(model.tokens ?? 0) }),
											react_jsx_runtime.jsx("span", { className: S.modelHit, children: fmtHit(model.cacheHitRate) })
										]
									}),
									react_jsx_runtime.jsx("div", {
										className: S.modelBarTrack,
										children: react_jsx_runtime.jsx("div", { className: S.modelBar, style: { width: `${share}%` } })
									}),
									react_jsx_runtime.jsx("div", {
										className: S.modelMeta,
										children: `${translate("usage.input")} ${fmt(model.inputTokens ?? 0)} · ${translate("usage.output")} ${fmt(model.outputTokens ?? 0)} · ${translate("usage.cacheRead")} ${fmt(model.cacheReadTokens ?? 0)}`
									})
								]
							}, model.model);
						})
					})
				]
			});
		}

		/**
		 * Codex-style blue calendar heatmap for one month: weekday header row,
		 * weeks as rows (Mon-first), padded with placeholders. Cells are buttons
		 * that select a day.
		 */
		function MonthHeatmap({ heat, translate, selectedKey, onSelect }) {
			const select = typeof onSelect === "function" ? onSelect : () => {};
			const weekdayLabels = [
				translate("weekday.mon"),
				translate("weekday.tue"),
				translate("weekday.wed"),
				translate("weekday.thu"),
				translate("weekday.fri"),
				translate("weekday.sat"),
				translate("weekday.sun")
			];
			return react_jsx_runtime.jsxs("div", {
				className: S.heat,
				children: [
					react_jsx_runtime.jsxs("div", {
						className: S.monthGrid,
						children: [
							react_jsx_runtime.jsx("div", {
								className: S.weekHeader,
								children: weekdayLabels.map((label) => react_jsx_runtime.jsx("span", { className: S.weekLabel, children: label }, label))
							}),
							heat.weeks.map((week, weekIndex) => react_jsx_runtime.jsx("div", {
								className: S.heatRow,
								children: week.map((cell, dayIndex) => {
									if (cell === null) return react_jsx_runtime.jsx("span", { className: S.emptyCell, "aria-hidden": true }, `${weekIndex}-${dayIndex}`);
									const style = cellColor(cell.tokens, heat.max);
									const hit = cell.hitRate === null || cell.hitRate === void 0 ? "" : ` · ${translate("usage.hitRate")} ${cell.hitRate}%`;
									const isToday = cell.key === todayKey();
									return react_jsx_runtime.jsx("button", {
										type: "button",
										className: `${S.cell}${isToday ? ` ${S.cellToday}` : ""}${selectedKey === cell.key ? ` ${S.cellSelected}` : ""}`,
										style: { background: style.background, color: style.color },
										title: `${cell.key} · ${fmt(cell.tokens)} tokens${hit}`,
										"aria-label": `${cell.key} · ${fmt(cell.tokens)} tokens`,
										onClick: () => select(cell.key),
										children: react_jsx_runtime.jsx("span", { className: S.cellDay, children: cell.day })
									}, cell.key);
								})
							}, weekIndex))
						]
					}),
					react_jsx_runtime.jsxs("div", {
						className: S.legend,
						children: [
							react_jsx_runtime.jsx("span", { children: translate("usage.legendLess") }),
							[0.22, 0.42, 0.6, 0.8, 1].map((alpha, index) => react_jsx_runtime.jsx("span", {
								className: S.legendSwatch,
								style: { background: `rgba(${BLUE_RGB[0]}, ${BLUE_RGB[1]}, ${BLUE_RGB[2]}, ${alpha})` }
							}, index)),
							react_jsx_runtime.jsx("span", { children: translate("usage.legendMore") })
						]
					})
				]
			});
		}

		/** `YYYY-MM-DD` → `MM-DD 周X` display label. */
		function dayLabel(key, translate) {
			const [, month, day] = key.split("-");
			const date = new Date(Number(key.slice(0, 4)), Number(month) - 1, Number(day));
			const weekdays = [translate("weekday.sun"), translate("weekday.mon"), translate("weekday.tue"), translate("weekday.wed"), translate("weekday.thu"), translate("weekday.fri"), translate("weekday.sat")];
			return `${month}-${day} ${weekdays[date.getDay()]}`;
		}

		function monthName(month, translate) {
			const names = translate("month.names").split(",");
			return names[month] ?? String(month + 1);
		}

		/**
		 * Display label for a `provider/model` attribution key (the same model
		 * served by different providers must stay distinguishable).
		 */
		function modelLabelOf(key, translate) {
			if (typeof key !== "string") return "";
			const slash = key.indexOf("/");
			if (slash === -1) return key;
			const provider = key.slice(0, slash);
			const model = key.slice(slash + 1);
			const providerLabel = provider === "unknown" ? translate("usage.unknownModel") : provider;
			const modelLabel = model === "unknown" || model === "" ? translate("usage.unknownModel") : model;
			return `${providerLabel} · ${modelLabel}`;
		}
		//#endregion

		//#region locales
		/** `usageStats` namespace dictionaries (the zh key set is the source of truth). */
		const NS = "usageStats";
		const zh = {
			"panel.title": "用量与余额",
			"panel.badge": "用量/余额",
			"sessionPill.aria": "{provider} 账户：{value}",
			"sessionPill.status.unsupported": "不支持",
			"account.title": "供应商账户",
			"account.provider": "当前供应商",
			"account.balanceMode": "API 余额",
			"account.loading": "正在加载供应商…",
			"account.status.loading": "查询中",
			"account.status.stale": "数据已过期",
			"account.status.blocked": "已阻止",
			"account.status.unsupported": "不支持余额",
			"account.status.invalidResponse": "响应异常",
			"account.status.unknown": "未知",
			"account.invalidResponse": "供应商返回了无法识别的额度数据。",
			"account.reason.dnsResolutionFailed": "无法解析供应商域名。",
			"account.reason.allAddressesUnreachable": "已验证的网络地址均无法连接。",
			"account.reason.upstreamNotJson": "上游返回的不是 JSON",
			"account.reason.upstreamInvalidJson": "上游返回了无法解析的 JSON",
			"account.reason.sub2apiBalanceShapeUnrecognized": "Sub2API 余额接口返回了未识别的数据结构。",
			"account.reason.timeout": "账户请求超时。",
			"account.reason.rateLimited": "供应商限制了账户查询频率。",
			"account.reason.unauthorized": "账户凭据未通过验证。",
			"account.reason.upstreamTooLarge": "上游响应超过安全大小限制。",
			"account.reason.upstreamInvalidResponse": "上游返回了无法识别的响应。",
			"account.reason.blockedNetwork": "账户请求被本地网络安全策略阻止。",
			"account.reason.noValidatedAddress": "没有可安全连接的供应商地址。",
			"account.reason.unknown": "账户查询失败，未提供可安全展示的诊断信息。",
			"account.health.lastAttempt": "上次尝试",
			"account.health.lastSuccess": "上次成功",
			"account.health.age": "数据年龄",
			"account.health.provenance": "数据来源",
			"account.provenance.official": "官方接口",
			"account.provenance.provider": "供应商接口",
			"account.provenance.configured": "自定义配置",
			"account.provenance.experimental": "实验性探测",
			"account.provenance.unknown": "未知",
			"account.blocked": "账户查询被本地安全策略阻止，请检查 HTTPS、同源和私网访问设置。",
			"balance.title": "账户余额",
			"balance.provider": "供应商",
			"balance.noSchemeTag": "无余额接口",
			"balance.unsupported": "该供应商没有公开的余额查询接口。",
			"balance.total": "总余额",
			"balance.remaining": "可用余额",
			"balance.used": "已使用",
			"balance.toppedUp": "充值余额",
			"balance.granted": "赠送余额",
			"balance.available": "可用",
			"balance.unavailable": "不可用",
			"balance.loading": "正在查询余额…",
			"balance.noCredential": "未配置 {ref}（请编辑 ~/.dsh/.credentials.yaml）",
			"balance.error": "余额获取失败：{message}",
			"subscription.title": "订阅额度",
			"subscription.loading": "正在查询订阅额度…",
			"subscription.error": "订阅额度获取失败：{message}",
			"subscription.status.ok": "实时",
			"subscription.status.notConfigured": "未配置",
			"subscription.status.unauthorized": "需重新登录",
			"subscription.status.rateLimited": "请求受限",
			"subscription.status.unavailable": "暂不可用",
			"subscription.window.session": "5 小时窗口",
			"subscription.window.daily": "每日窗口",
			"subscription.window.weekly": "每周窗口",
			"subscription.window.monthly": "每月窗口",
			"subscription.window.quota": "总额度",
			"subscription.window.mcp": "MCP 月度额度",
			"subscription.used": "已用 {value}%",
			"subscription.resets": "{time}后重置",
			"subscription.resetDue": "已到重置时间",
			"duration.minutes": "{minutes} 分钟",
			"duration.hoursMinutes": "{hours} 小时 {minutes} 分钟",
			"duration.daysHours": "{days} 天 {hours} 小时",
			"subscription.notConfigured": "配置 {refs} 后显示真实订阅比例。",
			"subscription.unauthorized": "凭据已失效，请更新后重试。",
			"subscription.rateLimited": "供应商暂时限制查询，请稍后重试。",
			"subscription.unavailable": "供应商没有返回可识别的额度窗口。",
			"subscription.planUnknown": "订阅计划",
			"usage.title": "Token 用量",
			"usage.providerFilter": "按供应商筛选",
			"usage.allProviders": "全部供应商",
			"usage.today": "今日",
			"usage.month": "本月",
			"usage.total": "累计",
			"usage.loading": "正在统计用量…",
			"usage.error": "用量统计失败：{message}",
			"usage.heatmap": "当月每日用量",
			"usage.recent": "最近 14 天",
			"usage.legendLess": "少",
			"usage.legendMore": "多",
			"usage.back": "返回",
			"usage.hitRate": "缓存命中",
			"usage.hit.today": "今日缓存命中率",
			"usage.input": "输入",
			"usage.output": "输出",
			"usage.cacheRead": "缓存读",
			"usage.unknownModel": "未知模型",
			"usage.noModels": "这一天没有分模型数据。",
			"month.year": "{year}年{month}",
			"action.refresh": "刷新",
			"action.retry": "重试",
			"action.close": "关闭",
			"action.prevMonth": "上个月",
			"action.nextMonth": "下个月",
			"action.today": "回到今天",
			"panel.updatedAt": "更新于 {time}",
			"weekday.mon": "一",
			"weekday.tue": "二",
			"weekday.wed": "三",
			"weekday.thu": "四",
			"weekday.fri": "五",
			"weekday.sat": "六",
			"weekday.sun": "日",
			"month.names": "1月,2月,3月,4月,5月,6月,7月,8月,9月,10月,11月,12月"
		};
		const en = {
			"panel.title": "Usage & Balance",
			"panel.badge": "Usage/Balance",
			"sessionPill.aria": "{provider} account: {value}",
			"sessionPill.status.unsupported": "Unsupported",
			"account.title": "Provider account",
			"account.provider": "Current provider",
			"account.balanceMode": "API balance",
			"account.loading": "Loading providers…",
			"account.status.loading": "Loading",
			"account.status.stale": "Stale data",
			"account.status.blocked": "Blocked",
			"account.status.unsupported": "Balance unsupported",
			"account.status.invalidResponse": "Invalid response",
			"account.status.unknown": "Unknown",
			"account.invalidResponse": "The provider returned unrecognized quota data.",
			"account.reason.dnsResolutionFailed": "The provider hostname could not be resolved.",
			"account.reason.allAddressesUnreachable": "None of the validated network addresses could be reached.",
			"account.reason.upstreamNotJson": "The upstream response was not JSON",
			"account.reason.upstreamInvalidJson": "The upstream returned unparsable JSON",
			"account.reason.sub2apiBalanceShapeUnrecognized": "The Sub2API balance endpoint returned an unrecognized data shape.",
			"account.reason.timeout": "The account request timed out.",
			"account.reason.rateLimited": "The provider rate limited account checks.",
			"account.reason.unauthorized": "The account credential was rejected.",
			"account.reason.upstreamTooLarge": "The upstream response exceeded the safety size limit.",
			"account.reason.upstreamInvalidResponse": "The upstream returned an unrecognized response.",
			"account.reason.blockedNetwork": "The account request was blocked by the local network policy.",
			"account.reason.noValidatedAddress": "No validated provider address was available.",
			"account.reason.unknown": "The account check failed without a safe diagnostic detail.",
			"account.health.lastAttempt": "Last attempt",
			"account.health.lastSuccess": "Last success",
			"account.health.age": "Data age",
			"account.health.provenance": "Source",
			"account.provenance.official": "Official API",
			"account.provenance.provider": "Provider API",
			"account.provenance.configured": "Configured",
			"account.provenance.experimental": "Experimental",
			"account.provenance.unknown": "Unknown",
			"account.blocked": "The account query was blocked by the local security policy. Check HTTPS, same-origin, and private-network settings.",
			"balance.title": "Account balance",
			"balance.provider": "Provider",
			"balance.noSchemeTag": "no balance API",
			"balance.unsupported": "This provider has no public balance interface.",
			"balance.total": "Total balance",
			"balance.remaining": "Available balance",
			"balance.used": "Used",
			"balance.toppedUp": "Topped up",
			"balance.granted": "Granted",
			"balance.available": "available",
			"balance.unavailable": "unavailable",
			"balance.loading": "Fetching balance…",
			"balance.noCredential": "{ref} is not configured (edit ~/.dsh/.credentials.yaml)",
			"balance.error": "Balance fetch failed: {message}",
			"subscription.title": "Subscription usage",
			"subscription.loading": "Fetching subscription usage…",
			"subscription.error": "Subscription usage failed: {message}",
			"subscription.status.ok": "Live",
			"subscription.status.notConfigured": "Not configured",
			"subscription.status.unauthorized": "Sign in again",
			"subscription.status.rateLimited": "Rate limited",
			"subscription.status.unavailable": "Unavailable",
			"subscription.window.session": "5-hour window",
			"subscription.window.daily": "Daily window",
			"subscription.window.weekly": "Weekly window",
			"subscription.window.monthly": "Monthly window",
			"subscription.window.quota": "Total quota",
			"subscription.window.mcp": "Monthly MCP quota",
			"subscription.used": "{value}% used",
			"subscription.resets": "Resets in {time}",
			"subscription.resetDue": "Reset due",
			"duration.minutes": "{minutes}m",
			"duration.hoursMinutes": "{hours}h {minutes}m",
			"duration.daysHours": "{days}d {hours}h",
			"subscription.notConfigured": "Configure {refs} to show live subscription usage.",
			"subscription.unauthorized": "The credential has expired; update it and retry.",
			"subscription.rateLimited": "The provider is rate limiting checks; retry later.",
			"subscription.unavailable": "The provider returned no recognizable quota windows.",
			"subscription.planUnknown": "Subscription plan",
			"usage.title": "Token usage",
			"usage.providerFilter": "Filter by provider",
			"usage.allProviders": "All providers",
			"usage.today": "Today",
			"usage.month": "This month",
			"usage.total": "All time",
			"usage.loading": "Aggregating usage…",
			"usage.error": "Usage aggregation failed: {message}",
			"usage.heatmap": "Daily usage this month",
			"usage.recent": "Last 14 days",
			"usage.legendLess": "Less",
			"usage.legendMore": "More",
			"usage.back": "Back",
			"usage.hitRate": "Cache hit",
			"usage.hit.today": "Today's cache hit rate",
			"usage.input": "Input",
			"usage.output": "Output",
			"usage.cacheRead": "Cache read",
			"usage.unknownModel": "Unknown model",
			"usage.noModels": "No per-model data for this day.",
			"month.year": "{month} {year}",
			"action.refresh": "Refresh",
			"action.retry": "Retry",
			"action.close": "Close",
			"action.prevMonth": "Previous month",
			"action.nextMonth": "Next month",
			"action.today": "Today",
			"panel.updatedAt": "Updated at {time}",
			"weekday.mon": "M",
			"weekday.tue": "T",
			"weekday.wed": "W",
			"weekday.thu": "T",
			"weekday.fri": "F",
			"weekday.sat": "S",
			"weekday.sun": "S",
			"month.names": "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec"
		};
		//#endregion

		//#region ComposerStatsBar
		/**
		 * Merged from the former `usgx-status-bar` plugin: an ambient readout
		 * strip UNDER the composer card (`conversation.composer.dock`), shadowing
		 * the shipped stats line by registering the same `id: "stats"` cell at a
		 * lower priority. Line 1 carries live session turn/step/timing stats;
		 * line 2 carries today/cumulative/cache-hit + account balance with
		 * clickable brand icons (Qwen TokenPlan -> Qwen, DeepSeek whale grouped
		 * with the usage/balance data -> DeepSeek usage page).
		 *
		 * Data comes straight from this plugin's own loopback-only endpoints
		 * (`/api/usage-stats/usage`, `/api/usage-stats/balance`) — no proxy.
		 *
		 * Defensive by design: every hook access is guarded so a missing slot
		 * owner prop, a changed projection, or a fetch failure degrades to an
		 * empty strip instead of throwing and dragging the whole client bundle
		 * down (the client loader is fail-loud — one plugin crash aborting the
		 * shell would lock the GUI).
		 */
		const DS_USAGE_URL = "https://platform.deepseek.com/usage";
		const QWEN_TOKENPLAN_URL = "https://platform.qianwenai.com/home/billing/subscription/token-plan-individual";
		const QWEN_ICON_URL = "https://img.alicdn.com/imgextra/i4/O1CN01W9GrLX1GOnvqd6zGw_!!6000000000613-55-tps-28-28.svg";

		/** Official DeepSeek whale logo (brand blue #4D6BFE), as inline SVG. */
		function WhaleIcon(props) {
			return react_jsx_runtime.jsx("svg", Object.assign({
				viewBox: "0 0 50 50",
				width: 16,
				height: 16,
				"aria-hidden": true,
				style: { display: "block" }
			}, props, { children: react_jsx_runtime.jsx("path", {
				fill: "#4D6BFE",
				fillRule: "nonzero",
				d: "M48.8354 10.0479C48.3232 9.79199 48.1025 10.2798 47.8032 10.5278C47.7007 10.6079 47.6143 10.7119 47.5273 10.8076C46.7793 11.624 45.9048 12.1597 44.7622 12.0957C43.0923 12 41.666 12.5356 40.4058 13.8398C40.1377 12.2319 39.2476 11.272 37.8926 10.6558C37.1836 10.3359 36.4668 10.0156 35.9702 9.31982C35.6235 8.82373 35.5293 8.27197 35.356 7.72754C35.2456 7.3999 35.1353 7.06396 34.7651 7.00781C34.3633 6.94385 34.2056 7.2876 34.0479 7.57568C33.418 8.75195 33.1733 10.0479 33.1973 11.3599C33.2524 14.312 34.4736 16.6641 36.8999 18.3359C37.1758 18.5278 37.2466 18.7197 37.1597 19C36.9946 19.5757 36.7974 20.1357 36.624 20.7119C36.5137 21.0801 36.3486 21.1597 35.9624 21C34.6309 20.4321 33.481 19.5918 32.4644 18.5757C30.7393 16.8721 29.1792 14.9917 27.2334 13.52C26.7764 13.1758 26.3193 12.856 25.8467 12.5518C23.8618 10.584 26.1069 8.96777 26.627 8.77588C27.1704 8.57568 26.8159 7.8877 25.0591 7.896C23.3022 7.90381 21.6953 8.50391 19.647 9.30371C19.3477 9.42383 19.0322 9.51172 18.7095 9.58398C16.8501 9.22363 14.9199 9.14355 12.9033 9.37598C9.10596 9.80762 6.07275 11.6396 3.84326 14.7681C1.16455 18.5278 0.53418 22.7998 1.30664 27.2559C2.11768 31.9521 4.46582 35.8398 8.07373 38.8799C11.8159 42.0322 16.1255 43.5762 21.041 43.2803C24.0269 43.104 27.3516 42.6963 31.1016 39.4561C32.0469 39.936 33.0396 40.1279 34.686 40.272C35.9546 40.3921 37.1758 40.208 38.1211 40.0078C39.6021 39.688 39.4995 38.2881 38.9639 38.0322C34.623 35.9678 35.5762 36.8081 34.71 36.1279C36.9155 33.4639 40.2402 30.6958 41.54 21.728C41.6426 21.0161 41.5557 20.5679 41.54 19.9917C41.5322 19.6396 41.6108 19.5039 42.0049 19.4639C43.0923 19.3359 44.1479 19.0317 45.1167 18.4878C47.9292 16.9199 49.064 14.3438 49.3315 11.2559C49.3711 10.7837 49.3237 10.2959 48.8354 10.0479ZM24.3262 37.8398C20.1196 34.4639 18.0791 33.3521 17.2358 33.3999C16.4482 33.4482 16.5898 34.3682 16.7632 34.9678C16.9443 35.5601 17.1812 35.9683 17.5117 36.4878C17.7402 36.832 17.8979 37.3442 17.2832 37.728C15.9282 38.584 13.5728 37.4399 13.4624 37.3838C10.7207 35.7358 8.42822 33.5601 6.81348 30.584C5.25342 27.7197 4.34766 24.6479 4.19775 21.3677C4.1582 20.5757 4.38672 20.2959 5.15869 20.1519C6.17529 19.96 7.22314 19.9199 8.23926 20.0718C12.5327 20.7119 16.1885 22.6719 19.2529 25.7759C21.002 27.5439 22.3252 29.6558 23.6885 31.7202C25.1377 33.9121 26.6978 36 28.6831 37.7119C29.3843 38.312 29.9434 38.7681 30.479 39.104C28.8643 39.2881 26.1699 39.3281 24.3262 37.8398ZM26.3433 24.6001C26.3433 24.248 26.6191 23.9678 26.9658 23.9678C27.0444 23.9678 27.1152 23.9839 27.1782 24.0078C27.2651 24.04 27.3438 24.0879 27.4067 24.1602C27.5171 24.272 27.5801 24.4321 27.5801 24.6001C27.5801 24.9521 27.3042 25.2319 26.9575 25.2319C26.6108 25.2319 26.3433 24.9521 26.3433 24.6001ZM32.6064 27.8799C32.2046 28.0479 31.8027 28.1919 31.4165 28.208C30.8179 28.2397 30.1641 27.9922 29.8096 27.688C29.2583 27.2158 28.8643 26.9521 28.6987 26.1279C28.6279 25.7759 28.6675 25.2319 28.7305 24.9199C28.8721 24.248 28.7144 23.8159 28.2495 23.4238C27.8716 23.104 27.3911 23.0161 26.8633 23.0161C26.666 23.0161 26.4849 22.9277 26.3511 22.856C26.1304 22.7441 25.9492 22.4639 26.1226 22.1201C26.1777 22.0078 26.4458 21.7358 26.5088 21.688C27.2256 21.272 28.0527 21.4077 28.8169 21.7197C29.5259 22.0161 30.0615 22.5601 30.834 23.3281C31.6216 24.2559 31.7632 24.5117 32.2124 25.208C32.5669 25.752 32.8901 26.312 33.1104 26.9521C33.2446 27.3521 33.0713 27.6802 32.6064 27.8799Z"
			}) }));
		}

		/** Qwen cloud console favicon (matches the TokenPlan page exactly). */
		function QwenIcon(props) {
			return react_jsx_runtime.jsx("img", Object.assign({
				src: QWEN_ICON_URL,
				width: 16,
				height: 16,
				alt: "",
				draggable: false,
				style: { display: "block" }
			}, props));
		}

		/** Brand icon wrapped in an external link (opens in a new tab). */
		function iconLink(href, title, icon) {
			return react_jsx_runtime.jsx("a", {
				className: "usgx-ico usgx-link",
				href,
				target: "_blank",
				rel: "noopener noreferrer",
				title,
				"aria-label": title,
				children: icon,
			});
		}

		/** Brand icon for a usage provider id (or null for a generic badge). */
		function providerBrandIcon(id) {
			const fam = String(id ?? "").toLowerCase();
			if (fam === "deepseek-official" || fam === "deepseek" || fam.includes("deepseek")) return WhaleIcon;
			if (fam === "ark" || fam === "qwen" || fam.includes("qwen") || fam.includes("dashscope")) return QwenIcon;
			return null;
		}

		/** Brand destination link for a usage provider id (or null when unknown). */
		function providerBrandUrl(id) {
			const fam = String(id ?? "").toLowerCase();
			if (fam === "deepseek-official" || fam === "deepseek" || fam.includes("deepseek")) return DS_USAGE_URL;
			if (fam === "ark" || fam === "qwen" || fam.includes("qwen")) return QWEN_TOKENPLAN_URL;
			return null;
		}

		function zeroUsageBucket() {
			return { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0 };
		}

		function addModelIntoTarget(target, model) {
			target.inputTokens += model.inputTokens ?? 0;
			target.outputTokens += model.outputTokens ?? 0;
			target.cacheReadTokens += model.cacheReadTokens ?? 0;
			target.cacheWriteTokens += model.cacheWriteTokens ?? 0;
		}

		/**
		 * Per-provider usage summary from the local `/usage` payload.
		 * @returns `[{ id, today, month, total, cacheHitRate }]` sorted by total.
		 */
		function providerUsageStats(usage) {
			const today = todayKey();
			const month = today.slice(0, 7);
			const map = new Map();
			if (usage !== null && typeof usage === "object" && Array.isArray(usage.days)) {
				for (const day of usage.days) {
					const isToday = day.date === today;
					const isMonth = day.date.startsWith(month);
					for (const model of day.models ?? []) {
						const id = providerOfRoute(model.model);
						if (id === "") continue;
						let entry = map.get(id);
						if (entry === void 0) {
							entry = { today: zeroUsageBucket(), month: zeroUsageBucket(), total: zeroUsageBucket() };
							map.set(id, entry);
						}
						addModelIntoTarget(entry.total, model);
						if (isToday) addModelIntoTarget(entry.today, model);
						if (isMonth) addModelIntoTarget(entry.month, model);
					}
				}
			}
			return [...map.entries()]
				.map(([id, entry]) => ({
					id,
					today: tokensOf(entry.today),
					month: tokensOf(entry.month),
					total: tokensOf(entry.total),
					cacheHitRate: hitOf(entry.total)
				}))
				.sort((a, b) => (b.total - a.total) || String(a.id).localeCompare(b.id));
		}

		/** Provider display label from an account snapshot or the route id. */
		function providerLabel(account, id) {
			const display = account?.displayName;
			if (display !== null && display !== void 0 && display !== "") return display;
			if (id === "deepseek-official" || id === "deepseek") return "DeepSeek";
			if (id === "ark") return "千问";
			return id;
		}

		/** Balance/quota readout from an account snapshot, or null when none is usable. */
		function accountBalanceText(account) {
			if (account === null || typeof account !== "object") return null;
			if (account.status !== "ok") return null;
			if (account.mode === "balance") {
				const remaining = account?.balance?.remaining;
				if (typeof remaining !== "number") return null;
				const cur = account.balance.currency === "CNY" ? "¥" : (account.balance.currency ? account.balance.currency + " " : "");
				const cls = remaining < 10 ? "usgx-bal usgx-low" : remaining < 30 ? "usgx-bal usgx-warn" : "usgx-bal";
				return { text: "余额 " + cur + remaining.toFixed(2), cls };
			}
			if (account.mode === "subscription") {
				const remaining = (account.windows ?? []).map((window) => window.remainingPercent).filter((value) => typeof value === "number");
				if (remaining.length === 0) return null;
				return { text: "剩余 " + Math.min(...remaining) + "%", cls: "usgx-bal" };
			}
			return null;
		}

		/** Build the `今日/本月/累计/缓存/[余额]` segment list for one provider pill. */
		function buildUsageParts(row, opts = {}, account = null) {
			const parts = [];
			if (row.today > 0) parts.push({ text: "今日 " + formatTokens(row.today), cls: "usgx-n" });
			if (opts.showMonth === true && row.month > 0) parts.push({ text: "本月 " + formatTokens(row.month), cls: "usgx-n" });
			if (row.total > 0) parts.push({ text: "累计 " + formatTokens(row.total), cls: "usgx-n" });
			if (typeof row.cacheHitRate === "number") parts.push({ text: "缓存 " + row.cacheHitRate + "%", cls: "usgx-n" });
			if (opts.showBalance !== false) {
				const balance = accountBalanceText(account);
				if (balance !== null) parts.push({ text: balance.text, cls: balance.cls });
			}
			return parts;
		}

		/** One per-provider usage pill: `[icon] 名称: 今日 · 累计 · 缓存 [ · 余额]`. */
		function providerUsagePill(row, parts, account) {
			const label = providerLabel(account, row.id);
			const Icon = providerBrandIcon(row.id);
			const url = providerBrandUrl(row.id);
			const icon = Icon === null
				? react_jsx_runtime.jsx("span", { className: "usgx-idBadge", children: label.slice(0, 1).toUpperCase() })
				: url !== null
					? iconLink(url, label, react_jsx_runtime.jsx(Icon, {}))
					: react_jsx_runtime.jsx(Icon, {});
			return react_jsx_runtime.jsxs("div", { className: "usgx-line2 usgx-provider", children: [
				icon,
				react_jsx_runtime.jsxs("span", { className: "usgx-n", children: [
					react_jsx_runtime.jsx("span", { className: "usgx-providerName", children: label }),
					": ",
					parts.length > 0
						? react_jsx_runtime.jsxs(react_jsx_runtime.Fragment, { children: parts.map((part, index) => react_jsx_runtime.jsxs("span", { children: [
							index > 0 ? " · " : "",
							react_jsx_runtime.jsx("span", { className: part.cls, children: part.text })
						] }, index)) })
						: react_jsx_runtime.jsx("span", { children: "暂无用量" })
				] })
			] });
		}

		/** Compact token figure: `1234 -> 1.2K`, `2_000_000 -> 2M`. */
		function formatTokens(n) {
			if (typeof n !== "number" || !Number.isFinite(n)) return "—";
			const scaled = (v) => (v >= 100 ? String(Math.round(v)) : String(Math.round(v * 10) / 10));
			if (n < 1000) return String(n);
			if (n < 1000000) return scaled(n / 1000) + "K";
			return scaled(n / 1000000) + "M";
		}

		/** Human duration from ms: `83.4s`, `2m07s`; null when non-positive/non-finite. */
		function formatDuration(ms) {
			if (typeof ms !== "number" || !Number.isFinite(ms) || ms <= 0) return null;
			const s = ms / 1000;
			if (s < 60) return Math.round(s * 10) / 10 + "s";
			const w = Math.round(s);
			return Math.floor(w / 60) + "m" + (w % 60) + "s";
		}

		/**
		 * Ambient composer-dock occupant. `ctx` is passed explicitly (the
		 * component lives at module scope, no closure over apply's ctx), so the
		 * timer service must arrive as a parameter or the render crashes and the
		 * entry abdicates.
		 * @param ctx - plugin context (provides `interval`).
		 * @param props - slot owner share: `{ useSession, useProjection, ... }` from InputZone.
		 */
		function ComposerStatsBar(ctx, props) {
			const useSession = typeof props?.useSession === "function" ? props.useSession : null;
			const useProjection = typeof props?.useProjection === "function" ? props.useProjection : null;
			const nodes = useSession ? useSession((s) => s?.chat?.legacy?.nodes) : void 0;
			const usage = useProjection ? useProjection("tokenUsage") : void 0;
			const projected = useProjection ? useProjection("sessionStats") : void 0;

			const [acct, setAcct] = react.useState(null);

			react.useEffect(() => {
				let alive = true;
				const load = () => {
					fetch("/api/usage-stats/usage").then((r) => (r.ok ? r.json() : null)).then((u) => {
						if (!alive) return;
						const ids = providerUsageStats(u).map((row) => row.id);
						Promise.all(ids.map((id) =>
							fetch(`/api/usage-stats/account?provider=${encodeURIComponent(id)}`)
								.then((r) => (r.ok ? r.json() : null))
								.catch(() => null)
						)).then((snapshots) => {
							if (!alive) return;
							const accounts = {};
							snapshots.forEach((snapshot, index) => {
								if (snapshot?.ok === true && snapshot?.account !== null && snapshot?.account !== void 0) accounts[ids[index]] = snapshot.account;
							});
							setAcct({ usage: u, accounts });
						}).catch(() => {});
					}).catch(() => {});
				};
				load();
				// No `timer`/`ctx.interval` dependency: the cordis timer service is
				// injected for the HOST half, and on the client it is not guaranteed
				// to be present across dsh versions. `window.setInterval` is the
				// same primitive the sidebar UsageStatsPanel already uses, is
				// disposal-safe via the effect return, and cannot trip the plugin's
				// inject list (a missing inject service would strand PENDING).
				const id = window.setInterval(load, 5 * 60 * 1000);
				return () => { alive = false; window.clearInterval(id); };
			}, []);

			const stats = react.useMemo(() => {
				if (projected) return projected;
				let turns = 0, steps = 0, llmMs = 0, toolMs = 0, ttftMs = 0, ttftSteps = 0, decodeMs = 0, decodeTokens = 0;
				const seen = new Set();
				const list = Array.isArray(nodes) ? nodes : [];
				for (const node of list) {
					if (node.kind === "tool-result") {
						if (node.callTime != null) toolMs += Math.max(0, node.time - node.callTime);
						continue;
					}
					if (node.kind !== "assistant") continue;
					seen.add(node.turn);
					steps += 1;
					const timing = node.timing;
					if (timing !== undefined && timing.stepStartTime != null) {
						llmMs += Math.max(0, timing.completedTime - timing.stepStartTime);
					}
					let rttft = null, rdec = null;
					if (timing !== undefined && timing.stepStartTime != null && timing.firstTokenTime != null) {
						rttft = Math.max(0, timing.firstTokenTime - timing.stepStartTime);
					}
					if (timing !== undefined && timing.firstTokenTime != null) {
						rdec = Math.max(0, timing.completedTime - timing.firstTokenTime);
					}
					const u = node.usage;
					const out = (typeof u === "object" && u !== null && typeof u.outputTokens === "number" && u.outputTokens >= 0) ? u.outputTokens : null;
					if (rttft != null) { ttftMs += rttft; ttftSteps += 1; }
					if (rdec != null && out != null) { decodeMs += rdec; decodeTokens += out; }
				}
				return { turns: seen.size, steps, llmMs, toolMs, ttftMs, ttftSteps, decodeMs, decodeTokens };
			}, [projected, nodes]);

			// Line 1: session time/token stats.
			const parts = [];
			if (stats.steps > 0) {
				parts.push(String(stats.turns) + " 轮 · " + String(stats.steps) + " 步");
				const dur = [];
				const llm = formatDuration(stats.llmMs);
				const tool = formatDuration(stats.toolMs);
				if (llm) dur.push("LLM " + llm);
				if (tool) dur.push("工具 " + tool);
				if (dur.length) parts.push(dur.join(" · "));
				const spd = [];
				if (stats.ttftSteps > 0) spd.push("TTFT " + formatDuration(stats.ttftMs / stats.ttftSteps));
				if (stats.decodeMs > 0) spd.push((stats.decodeTokens / (stats.decodeMs / 1000)).toFixed(1) + " tok/s");
				if (spd.length) parts.push(spd.join(" · "));
				if (usage !== undefined) {
					const billed = usage.uncachedInputTokens + usage.cacheReadTokens + usage.cacheWriteTokens;
					if (billed > 0 || usage.outputTokens > 0) {
						const hit = billed > 0 ? Math.round(usage.cacheReadTokens / billed * 100) : null;
						const tok = "输入 " + formatTokens(billed) + " · 输出 " + formatTokens(usage.outputTokens);
						parts.push(hit != null ? "缓存 " + String(hit) + "% · " + tok : tok);
					}
				}
			}

			// Line 2: one pill per provider (icon + name + today/cumulative/cache [+ balance]).
			const rows = [];
			if (parts.length > 0) {
				rows.push(react_jsx_runtime.jsx("div", { className: "usgx-line", children: react_jsx_runtime.jsx("span", { className: "usgx-n", children: parts.join(" | ") }) }));
			}
			const usageRows = providerUsageStats(acct?.usage ?? null);
			const pills = usageRows.map((row) => providerUsagePill(
				row,
				buildUsageParts(row, { showMonth: false, showBalance: true }, acct?.accounts?.[row.id] ?? null),
				acct?.accounts?.[row.id] ?? null
			));
			if (pills.length > 0) {
				rows.push(...pills);
			} else {
				rows.push(react_jsx_runtime.jsxs("div", { className: "usgx-line2", children: [
					iconLink(QWEN_TOKENPLAN_URL, "千问 TokenPlan 余量", react_jsx_runtime.jsx(QwenIcon, {})),
					react_jsx_runtime.jsxs("span", { className: "usgx-ds", children: [
						iconLink(DS_USAGE_URL, "DeepSeek 用量", react_jsx_runtime.jsx(WhaleIcon, {})),
						react_jsx_runtime.jsx("span", { children: "用量/余额暂不可用" })
					] })
				] }));
			}
			if (rows.length === 0) return null;
			return react_jsx_runtime.jsxs("div", { className: "usgx-bar", children: rows });
		}
		//#endregion

		//#region plugin body
		/** Services required by the client plugin body. */
		const inject = ["slots", "locale"];

		/**
		 * Client plugin body: register dictionaries, the sidebar account panel, and
		 * the composer-dock usage/balance strip. The composer-right provider pill was
		 * removed.
		 * @param ctx - client root context.
		 */
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, { zh, en }), "usage-stats: dictionaries");
			ctx.slots.inject("sidebar.footer.action", () => ctx.slots.register({
				name: "sidebar.footer.action",
				id: "usage-stats",
				locale: NS,
				order: 10
			}, UsageStatsPanel));
			// The composer-right provider/balance pill was removed: no separate
			// "DeepSeek <balance>" control next to the model selector. The sidebar
			// panel remains the single account entry point.
			// Composer dock strip: shadow the shipped stats line. Same `id: "stats"`
			// cell at a lower `priority` is the sanctioned replacement (lowest
			// priority renders), avoiding the "already has an entry with id stats"
			// load error. Guarded so a missing slot never aborts the bundle: the
			// client loader is fail-loud, and one crash would lock the whole GUI.
			try {
				ctx.slots.inject("conversation.composer.dock", () => ctx.slots.register({
					name: "conversation.composer.dock",
					id: "stats",
					priority: -100
				}, (props) => ComposerStatsBar(ctx, props)));
			} catch (error) {
				console.warn("usage-stats: composer status bar unavailable", error);
			}
		}
		//#endregion

		exports.apply = apply;
		exports.inject = inject;
		exports.UsageStatsPanel = UsageStatsPanel;
		exports.CurrentSessionPill = CurrentSessionPill;
		exports.CurrentSessionPillView = CurrentSessionPillView;
		exports.DayDetail = DayDetail;
		exports.ProviderAccountCard = ProviderAccountCard;
		exports.MonthHeatmap = MonthHeatmap;
		exports.buildMonthHeatmap = buildMonthHeatmap;
		exports.cellColor = cellColor;
		exports.createLoader = createLoader;
		exports.buildProviderChoices = buildProviderChoices;
		exports.modelLabelOf = modelLabelOf;
		exports.fmt = fmt;
		exports.fmtCurrency = fmtCurrency;
		exports.badgeAccountValue = badgeAccountValue;
		exports.badgeWarnOf = badgeWarnOf;
		exports.shouldDismissPanel = shouldDismissPanel;
		exports.safeDiagnosticReason = safeDiagnosticReason;
		exports.formatResetCountdown = formatResetCountdown;
		exports.loadSessionPillSnapshot = loadSessionPillSnapshot;
		exports.modelSelectionSignalOf = modelSelectionSignalOf;
		exports.requestUsageStatsPanel = requestUsageStatsPanel;
		exports.sessionContextSignalOf = sessionContextSignalOf;
		exports.sessionPillViewOf = sessionPillViewOf;
		exports.subscribeUsageStatsPanel = subscribeUsageStatsPanel;
		exports.ComposerStatsBar = ComposerStatsBar;
		exports.formatTokens = formatTokens;
		exports.formatDuration = formatDuration;
		exports.WhaleIcon = WhaleIcon;
		exports.QwenIcon = QwenIcon;
		return module.exports;
	}
});
