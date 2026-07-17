---
name: design-fidelity-check
description: Compare a Claude Design source against the live cpio_website implementation, screen-by-screen, and produce a gap report. Use when a design mockup has been updated and the site may have drifted from it.
---

# Design Fidelity Check

## Overview

This repo's marketing site is periodically rebuilt from a Claude Design source (project "Website Cryptoprism"). Design sources keep iterating after a section is built; the live site doesn't update itself. This skill is the repeatable procedure for finding out *exactly* how far the live site has drifted, screen-by-screen, without guessing from screenshots alone — and for turning that into a report the founder can act on.

It pairs with the saved workflow at `.claude/workflows/design-fidelity-check.js`, which does the actual subagent fan-out. **This skill covers the steps that MUST happen before that workflow is invoked** — DesignSync MCP and the authenticated `claude-in-chrome` browser session are only available to the orchestrating session (you, right now), never to dispatched subagents or workflow agents. If you skip straight to spawning agents against the design tool, they will fail or silently return nothing.

## Step 0 — Pull the current design source (orchestrator only)

Use the DesignSync MCP tool (`get_file`) to pull the current `.dc.html` source for the relevant Claude Design project/file. Save the full content to a stable file path — e.g. `docs/superpowers/specs/reference/<date>-<name>.html` if it's meant to be a durable reference, or the session scratchpad if it's a one-off check. Note the saved path; it becomes `args.designSourcePath` for the workflow.

If you already have an older reference snapshot committed (check `docs/superpowers/specs/reference/`), a plain-text diff (`diff -u old.html new.html`) against the freshly-pulled source is the fastest way to scope *which* sections actually changed, so you don't have to re-audit sections that didn't move.

## Step 1 — Optional visual spot-check (orchestrator only, budget for flakiness)

The Design tool's own editor canvas does **not** scroll via normal mouse wheel input — it's a fixed-zoom pannable surface, not a document. To get a real, scrollable, live-rendered preview:

1. Click **Present ▾** (top-right toolbar) → **New tab**. This opens a fresh tab rendering the design inside a cross-origin `claudeusercontent.com` iframe (`data-testid="present-mode-iframe"`).
2. That tab frequently renders **solid black** on first load and again after almost every scroll or navigation. A single click inside the page reliably forces a repaint and reveals the real content. Treat "black screenshot" as "needs a click," not as a dead end — but don't loop on it more than 2-3 times; if it stays black, skip this step and rely on Step 0's raw source instead.
3. This step is a supplement, not a requirement. In practice the raw HTML/data source from Step 0 is the more reliable signal for *content* gaps (exact copy, values, structure); use the Present-tab preview only to sanity-check things the markup can't convey — spacing, motion, exact visual weight.

## Step 2 — Slice the design source into per-screen line ranges

Grep the saved source for the markers that bound each screen/tab/component. Typical patterns for this codebase's design sources (adjust to what the source actually uses):

```
Grep pattern: key: '(screen1|screen2|...)'|isScreen1|isScreen2|...|tabLabel
```

Record, for each screen: its markup line range (`jsxRange: [offset, limit]`) and, if the design uses a separate mock-data block (common pattern: a `SCREENS = [...]` array keyed by `key: '<name>'`), its data range (`dataRange: [offset, limit]`). Give each range generous padding — a few lines of overlap is cheaper than a subagent missing the closing boundary.

If a screen depends on shared code elsewhere in the file (e.g. chart-construction logic, shared refs, autoplay/progress-bar mechanics), note those as `extraDesignRanges` for that screen rather than making every screen re-read the whole file.

## Step 3 — Confirm the local side

- Re-detect the dev server port — it drifts between sessions (seen both 5173 and 5174 in this repo). Use the `playwright-skill`'s `detectDevServers()` helper rather than assuming a port.
- Identify the local file(s) that implement the section being checked, and whether it's one shared component (as with `FeatureShowcase.tsx`) or one file per screen. Note this as `localNotes` so compare agents don't waste a turn discovering it themselves.
- For each screen, write a one-line `localUiHint` — the concrete action that reveals it in the local UI (e.g. "hover the shelf card whose vertical title text is 'Analytics'", or "click the nav item labeled 'Screener'").

## Step 4 — Invoke the workflow

Build the `args` object per the shape documented at the top of `.claude/workflows/design-fidelity-check.js`, then:

```
Workflow({ name: 'design-fidelity-check', args })
```

This requires the user to have opted into multi-agent orchestration for this turn (say so explicitly, or confirm it applies — the Workflow tool itself enforces this gate). If that consent isn't in place, fall back to dispatching the same per-screen comparisons manually via the `Agent` tool (one call per screen, same prompt shape as `buildComparePrompt` in the workflow file), in a single message so they run concurrently — this is exactly what the workflow automates, just without the tool's built-in phase tracking.

The workflow returns `{ findings: [...], synthesis: "<markdown>" }` — one structured finding per screen (`screen`, `designSpecSummary`, `localImplSummary`, `gaps[]`, `severity`) plus a synthesized cross-cutting summary.

## Step 5 — Turn it into a deliverable

For a quick answer, the returned `synthesis` markdown is often enough to paste back to the user directly. For a polished, shareable document (what the founder actually wants to act on over time), hand the findings + synthesis to the `/report-writer` skill with instructions to produce a "McKinsey-light" style HTML/PDF: executive summary, root-cause analysis, per-screen findings table, remediation roadmap. See `docs/reports/2026-07-17-feature-showcase-gap-rca.html` for a worked example of the design system (Fraunces + Inter + JetBrains Mono, off-white paper background, hairline tables, severity badges, D3 effort/impact + gap-composition charts) — reuse it rather than redesigning from scratch each time.

## Known gotchas (learned the hard way)

- **Subagents cannot reach DesignSync MCP or the authenticated `claude-in-chrome` session.** All MCP/browser-preview work must happen in the orchestrating turn, before any `agent()`/`Agent` dispatch. This is why Steps 0-1 are marked "orchestrator only."
- **The Present-tab preview is flaky, not broken.** Black screen → click → real content is the normal recovery pattern. Don't burn more than 2-3 retries on it; the raw source is usually sufficient anyway.
- **Dev server ports drift across sessions/restarts.** Always re-detect; don't hardcode a port from a previous run.
- **Static image/screenshot exports go stale silently.** If the section under review is itself built from baked screenshots (not live components), expect to find drift even in "unchanged" screens — the export-once-and-forget pattern is a recurring root cause in this codebase, not a one-off.
