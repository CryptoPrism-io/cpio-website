# Mobile Home Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the dedicated mobile homepage (`CryptoPrism Mobile.dc.html`) as a separate component tree rendered instead of the desktop prism-home sections on viewports ≤ 640px.

**Architecture:** New `src/components/site/prism-home/mobile/` tree: `PrismMobileHome.tsx` (nav + 6 sections + reveal observer), `MobilePrismCanvas.tsx` (data-flows + prism render loop), one component per section, and `data.ts` (typed mock data). `PrismHome.tsx` renders `<PrismMobileHome />` in place of its `<main>` + desktop sections when mobile; the desktop tree is byte-for-byte untouched at >640px. The `prism-snap` class (scroll-snap) is only applied on desktop — the mobile design has no snap.

**Tech Stack:** React 19 function components + hooks, TypeScript, inline-style TSX, canvas 2D. No new dependencies.

## Global Constraints

- **Source of truth:** `docs/superpowers/specs/reference/2026-07-18-mobile-design-v1.html` (621 lines). All copy, data, colors, sizes byte-exact. Conversion rules (same as showcase-v3): `sc-if` → `{x && …}`, `sc-for` → `.map()` with key, `{{ }}` → JSX, `var(--accent)` → `'#0FAE72'`, `var(--accent-2)` → `'#0B8D84'`, style strings → JSX style objects (numeric px), literal `\uXXXX` escape artifacts in copy decode to their real characters (established convention).
- **Do NOT port:** the `accentColor`/`accentColor2`/`animate`/`rotationSpeed`/`particleDensity` props theming (hardcode defaults: accent `#0FAE72`, accent-2 `#0B8D84`, animate true, rotationSpeed 1, particleDensity 500); the `features` array in the script (reference lines 369–376 — declared but never referenced by any markup; verify with a grep for `features` in the reference before skipping, and note the result in your report).
- **Layout deviation (sanctioned):** the design wrapper is fixed `width: 390px; margin: 0 auto`. Implement as `width: 100%; max-width: 390px; margin: 0 auto; overflow: hidden` so 360px phones don't overflow. The canvas stays 390×380 (minor edge crop at 360px is acceptable).
- **Breakpoint:** mobile tree renders when `useIsMobile(640)` (the existing hook at `src/components/site/prism-home/hooks.ts:8`, which takes a breakpoint param). Desktop tree (and the `prism-snap` html class) renders at >640px. 640 — not the hook's default 900 — because the desktop sections have working tablet layouts at 641–900px and the mobile design is phone-shaped.
- **CTA convention:** every CTA button (`Request Demo`, `Launch Beta`, `Watch Demo`) gets `className="cta-early-access-trigger"`.
- **Never `git add -A`/`git add .`.** Stage only your task's files.
- **Verification gate per task:** `npm run lint` AND `npm run build` both pass (CI runs both — lint failures block deploy). Visual tasks: Playwright at 390×844 (`isMobile: true, hasTouch: true`); detect the dev-server port via playwright-skill `detectDevServers()`.

## File Structure

```
src/components/site/prism-home/
  PrismHome.tsx                    ← MODIFIED: isMobile switch (Task 1)
  mobile/
    data.ts                        ← NEW (Task 1): all mock data + types
    PrismMobileHome.tsx            ← NEW (Task 1): wrapper div, nav, section order, reveal observer
    MobilePrismCanvas.tsx          ← NEW (Task 2): flows + prism canvas
    sections/
      MobileHero.tsx               ← NEW (Task 2)
      MobileProblem.tsx            ← NEW (Task 3)
      MobileBiasLedger.tsx         ← NEW (Task 3): sticky-stack cards
      MobileProduct.tsx            ← NEW (Task 4): phone mock, 6 screens, tabs, autoplay+hold
      MobileEnterprise.tsx         ← NEW (Task 5)
      MobileFinalCta.tsx           ← NEW (Task 5): CTAs + FAQ accordion + footer
```

Reference line map (in `2026-07-18-mobile-design-v1.html`):

| What | Lines |
|---|---|
| Nav | 26–35 |
| Hero (canvas labels, CTAs, trust line) | 37–57 |
| The Problem | 59–87 |
| Bias to Discipline (sticky ledger) | 89–114 |
| Product: header + phone frame + status bar | 116–129 |
| Product: scr0 Dashboard | 130–170 |
| Product: scr1 Screener | 171–193 |
| Product: scr2 Public Screens | 194–214 |
| Product: scr3 Analytics | 215–236 |
| Product: scr4 News | 237–254 |
| Product: scr5 Calendar | 255–270 |
| Product: caption + tool tabs | 274–282 |
| Enterprise | 285–299 |
| Final CTA + FAQ + footer | 301–322 |
| Script: state/renderVals data (faqs, sources, ledger, pulse, feed, toolTabs+go/hold, scr flags, phoneCaption, screenerRows, pubScreens, newsRows, calRows, trust) | 331–445 |
| componentDidMount (reveal IO, canvas setup, toolTimer 2500ms + holdUntil) | 446–467 |
| makeParticles / draw / drawFlows | 468–531 |
| hexToRgb / mixWhite / renderPrism | 532–616 |

---

### Task 1: Data module + shell + breakpoint switch

**Files:**
- Create: `src/components/site/prism-home/mobile/data.ts`
- Create: `src/components/site/prism-home/mobile/PrismMobileHome.tsx`
- Modify: `src/components/site/prism-home/PrismHome.tsx`

**Interfaces:**
- Produces from `data.ts` (all transcribed verbatim from reference lines 337–444, with derived-state fields like `open`/`mark`/`toggle`/`go`/`ink`/`bg`/`border`/`scrN` stripped — those are runtime state, implemented in components):
  - `SOURCES: { name: string; icon: string }[]` (8 items, lines 351–360)
  - `LEDGER: { num, top, tag, bias, to, desc, bg, border, numInk, ink, sub, biasInk, arrow, tagInk, tagBorder }[]` (3 items, lines 361–368 — the design has exactly 3 rows; ac→`'#0FAE72'`, ac2→`'#0B8D84'` in the row-3 gradient)
  - `PULSE` (3), `FEED` (3), `SCREENER_ROWS` (3), `PUB_SCREENS` (3), `NEWS_ROWS` (3), `CAL_ROWS` (4), `TRUST` (6), `FAQS: {q, a}[]` (4), `TOOL_TABS: { icon: string; name: string }[]` (6), `PHONE_CAPTIONS: string[]` (6) — each from its reference block, byte-exact.
- `PrismMobileHome` renders: wrapper div (`width: '100%', maxWidth: 390, margin: '0 auto', background: '#FAFAF8', position: 'relative', overflow: 'hidden'`), the nav (port lines 26–35; Request Demo button gets `cta-early-access-trigger`; the hamburger svg is decorative — no menu exists in the design), then the six section components in order. Until Tasks 2–5 land, missing sections render `<section style={{ padding: 40, textAlign: 'center', color: '#98A2B3', fontSize: 13 }}>…coming</section>` placeholders.
- Reveal observer (port lines 448–451): one `useEffect` in `PrismMobileHome` — `IntersectionObserver` threshold 0.12 over `[data-reveal]` elements scoped to the wrapper (`ref.current.querySelectorAll`), setting `opacity: '1'; transform: 'none'` and unobserving. Include the same 4s safety-net force-reveal timeout pattern used by `src/components/site/hooks.ts` (site convention — IO occasionally never fires; check that file for the pattern).
- `PrismHome.tsx` change: `const isMobile = useIsMobile(640);` — when true render `<PrismMobileHome />` (plus the existing `EarlyAccessModal` wiring if PrismHome hosts it — inspect and preserve); when false render the existing desktop tree exactly as-is. The `useEffect` that adds `prism-snap` to `<html>` must only apply when NOT mobile (and clean up on switch — resize across 640px must not leave the class stuck).

**Steps:**
- [ ] Read reference lines 331–467; write `data.ts` (typed, verbatim values).
- [ ] Write `PrismMobileHome.tsx` (wrapper + nav + reveal observer + placeholders).
- [ ] Modify `PrismHome.tssx` breakpoint switch + conditional snap class.
- [ ] `npm run lint && npm run build` → both pass.
- [ ] Playwright 390×844: mobile nav renders, placeholders visible, `html.prism-snap` absent; 1280×900: desktop tree unchanged, `prism-snap` present.
- [ ] Commit: `feat(mobile-home): data module, shell, nav, and mobile/desktop switch`

---

### Task 2: Prism canvas + Hero

**Files:**
- Create: `src/components/site/prism-home/mobile/MobilePrismCanvas.tsx`
- Create: `src/components/site/prism-home/mobile/sections/MobileHero.tsx`
- Modify: `PrismMobileHome.tsx` (replace hero placeholder)

**Interfaces:**
- `MobilePrismCanvas` — self-contained component: `<canvas>` 390×380 CSS size, backing scale `min(devicePixelRatio,2)*1.3`, rAF loop calling the ported `draw()` (lines 475–487): `drawFlows` (lines 488–531 — 6 gray bezier in-lanes with 3 moving dots each, 3 accent out-beams with 2 moving rects each; lane arrays initialized once in a ref) then `renderPrism` (lines 534–616 — hex prism, ground shadow ellipse, inner glow, particles from `makeParticles` lines 468–474 at density 500, apex glow). Hardcode accent `#0FAE72` (so `hexToRgb(this.ac)` becomes a precomputed constant), `speed = 1`, `animate = true` (drop the frozenT branch). Cleanup cancels rAF on unmount. NOTE: this is a NEW canvas component — do not modify or reuse the desktop `PrismCanvas.tsx` (scroll-driven, different geometry).
- `MobileHero` — port lines 37–57: grid-mask backdrop div, pill, h1 (40px), sub, the 390×380 canvas block with RAW DATA / INTELLIGENCE labels (canvas wrapper uses `margin: '6px 0 0 -22px'` against the section's 22px padding — keep, it full-bleeds the canvas), stacked CTAs (`Launch Beta` + `Watch Demo`, both `cta-early-access-trigger`), trust line.

**Steps:**
- [ ] Port canvas + hero; wire into shell.
- [ ] `npm run lint && npm run build` → pass.
- [ ] Playwright 390×844: two screenshots ~1.5s apart — prism visibly animates (pixels differ), flows render on both sides, labels/CTAs present.
- [ ] Commit: `feat(mobile-home): hero with data-flow prism canvas`

---

### Task 3: Problem + Bias ledger

**Files:**
- Create: `mobile/sections/MobileProblem.tsx`, `mobile/sections/MobileBiasLedger.tsx`
- Modify: `PrismMobileHome.tsx`

**Interfaces:** `MobileProblem` ports lines 59–87 (header, 8 `SOURCES` chips, down arrow, decision card, tagline — keep every `data-reveal` attribute + its inline initial opacity/transform/transition styles verbatim so the shell's observer animates them). `MobileBiasLedger` ports lines 89–114: header, then `LEDGER.map` — each row a `position: 'sticky', top: row.top` wrapper (the stacking-cards scroll effect; `top` is a string like `'80px'` from data) containing the card (giant ghost number, tag pill, struck-through bias, arrow → `to`, desc — all colors from the row object), closing tagline.

**Steps:**
- [ ] Port both sections; wire into shell.
- [ ] `npm run lint && npm run build` → pass.
- [ ] Playwright 390×844: scroll through the ledger — screenshot mid-scroll showing card 2 overlapping card 1 (sticky stacking works); Problem chips all 8 visible after reveal.
- [ ] Commit: `feat(mobile-home): problem section and sticky bias ledger`

---

### Task 4: Product phone mock

**Files:**
- Create: `mobile/sections/MobileProduct.tsx`
- Modify: `PrismMobileHome.tsx`

**Interfaces:** Ports lines 116–283. Local state: `const [toolIdx, setToolIdx] = useState(0)`; hold ref: `const holdUntil = useRef(0)`. Autoplay (port lines 461–465): `useEffect` `setInterval` 2500ms — `if (Date.now() < holdUntil.current) return; setToolIdx(i => (i + 1) % 6);` cleanup clears. Tab click: `holdUntil.current = Date.now() + 8000; setToolIdx(i)`. `onPointerDown` anywhere on the tab row also sets holdUntil (+8000) per line 387. The six screens are conditional blocks (`toolIdx === 0` … `=== 5`) transcribed from their line ranges (scr0 130–170, scr1 171–193, scr2 194–214, scr3 215–236, scr4 237–254, scr5 255–270), each wrapped in a div with `animation: 'scrIn 0.4s ease'`. Add `@keyframes prism-scr-in` and `@keyframes prism-scr-blink` (the design's `scrIn`/`scrBlink`, lines 20–21) to `src/styles/prism-home.css` — prefixed per page convention; the blink cursor span (line 177) uses the blink keyframe. Phone frame chrome (122–129: 336px dark frame, status bar, 352px screen viewport), caption line (274, from `PHONE_CAPTIONS[toolIdx]`), tool tab chips (276–282, active styling `#FFFFFF`/`#0B1220`/`#0B1220` vs `#475467`/`#FFFFFF`/`#E7E9EC` per lines 396–398). Tab chips may be real `<button>`s (they're functional). Screens' internal chips/rows are divs/spans.

**Steps:**
- [ ] Port section; wire into shell.
- [ ] `npm run lint && npm run build` → pass.
- [ ] Playwright 390×844: screenshot each of the 6 screens by clicking each tab (mouse-hover doesn't pause here — clicks set an 8s hold, screenshot within it); verify autoplay advances when idle >2.5s; verify all 6 captions match `PHONE_CAPTIONS`.
- [ ] Commit: `feat(mobile-home): product phone mock with 6 auto-cycling screens`

---

### Task 5: Enterprise + Final CTA/FAQ

**Files:**
- Create: `mobile/sections/MobileEnterprise.tsx`, `mobile/sections/MobileFinalCta.tsx`
- Modify: `PrismMobileHome.tsx` (last placeholders gone)

**Interfaces:** `MobileEnterprise` ports 285–299 (dark grid-texture background via the two linear-gradients + 39px background-size, header, `TRUST.map` 2-col grid). `MobileFinalCta` ports 301–322: prism mark svg, h2, stacked CTAs (both `cta-early-access-trigger`), FAQ accordion — `const [openFaq, setOpenFaq] = useState(0)`, `FAQS.map`: row toggles `openFaq === i ? -1 : i`, mark `−`/`+` per line 441, answer renders when open — and the mini footer line.

**Steps:**
- [ ] Port both; wire into shell.
- [ ] `npm run lint && npm run build` → pass.
- [ ] Playwright 390×844: FAQ toggle works (click item 2 → opens, item 1 closes); CTAs open the EarlyAccessModal (click, screenshot modal).
- [ ] Commit: `feat(mobile-home): enterprise grid and final CTA with FAQ`

---

### Task 6: Full verification sweep

**Files:** none expected (fix-forward only if the sweep finds issues).

**Steps:**
- [ ] `npm run lint && npm run build` → pass.
- [ ] Playwright sweep: 390×844 full-page scroll-through (screenshot every viewport-height, verify no horizontal overflow: `document.documentElement.scrollWidth <= window.innerWidth`); 360×780 (no overflow, canvas edge-crop acceptable); 430×932; then 1280×900 and 1600×1000 — desktop must be pixel-identical in behavior (snap present, all 8 desktop sections render, showcase carousel works).
- [ ] Resize across the breakpoint in one session (Playwright `setViewportSize` 1280→390→1280): no stuck `prism-snap` class, no crashed canvas/timers (console clean).
- [ ] Commit (only if fixes were needed).

## Self-Review Notes

- Known sanctioned deviations: fluid `max-width: 390` wrapper; hardcoded theme defaults; `features` array skipped if confirmed unreferenced; keyframes renamed with `prism-` prefix; buttons for functional tab chips.
- The `ledger` has 3 rows while its intro copy says "four most expensive instincts" — that's the design's own content; transcribe both as-is, do not "fix."
- Desktop tree and `FeatureShowcase` are untouched at >640px; the only desktop-affecting change is the conditional `prism-snap` application in `PrismHome.tsx`.
