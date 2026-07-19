# Desktop Fit-Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the v4 desktop design change: every homepage section fits exactly one viewport page (auto zoom-to-fit or stretch-to-fill), with mandatory scroll-snap — the "slide deck" scroll feel.

**Architecture:** A `fitPages()` runtime in `PrismHome.tsx` (desktop branch only) measures each `section[data-page]` and either CSS-`zoom`s it down to fit `vh - offset` or stretches it to that height with flex-centered content. CSS snap goes `proximity` → `mandatory`; the nav becomes a snap point; the Trust Bar leaves the snap flow by becoming a plain div inside the page flow. Mobile (≤640px, the PrismMobileHome tree) is untouched.

**Tech Stack:** React 19, TypeScript, CSS scroll-snap + `zoom`. No new dependencies.

## Global Constraints

- **Source of truth:** `docs/superpowers/specs/reference/2026-07-18-hero-design-v4-fit-pages.html`. Section tags: Hero line 47 (`data-page="76"`, closes 147), trust-bar div 149–164 (BETWEEN sections, no data-page — line 165's stray `</section>` is design-tool sloppiness, ignore it), Problem 167, BiasTax 290, FeatureShowcase 427, EnterpriseArchitecture 788, InstitutionalTrust 859, FinalCTA 889 (all bare `data-page`). Mechanism: `html { scroll-snap-type: y mandatory }` line 23; nav snap attrs line 28; `fitPages` lines 1264–1289.
- **Layout translation rule:** the design carries `padding: <top> 44px <bottom>` directly on sections; our components use vertical-only section padding + `.prism-wrap` for the 44px horizontal. Transplant ONLY the vertical values; keep horizontal 0 + prism-wrap. Components with `isMobile` (900px tablet) padding ternaries keep their tablet branch — update the desktop value only.
- **fitPages port (must match reference lines 1264–1284 semantically):** for each `section[data-page]` — first pass resets `zoom`/`height`/`minHeight` and sets `boxSizing: 'border-box'`, `scrollSnapAlign: 'start'`, `scrollSnapStop: 'always'`; second pass computes `offset = parseFloat(dataset.page) || 0`, `target = window.innerHeight - offset`, `natural = offsetHeight`; if `natural > target + 2` → `zoom = target/natural` and `height = natural + 'px'`; else `minHeight = target + 'px'`, `display flex`, `flexDirection column`, `justifyContent center`; if `offset` truthy → `scrollSnapAlign = 'none'` (Hero: the nav is its page's snap anchor). Run on mount, again at 400ms and 1500ms (`setTimeout`), and on window resize. Cleanup: clear both timeouts + remove the resize listener. Desktop only (`isMobile` false branch); TS note — if `style.zoom` isn't in the DOM lib, use `(s.style as CSSStyleDeclaration & { zoom: string }).zoom`.
- **Do not "fix" the design's UX choices:** the trust bar intentionally has no snap resting position (visible only mid-scroll); the bar-fill/snap quirks stay as authored.
- **Never `git add -A`.** Verification gate per task: `npm run lint` AND `npm run build` (CI runs both). Playwright via playwright-skill (detect port; scripts to the session scratchpad).
- Branch stacks on `feature/mobile-home` (PR #15) — shared files (PrismHome.tsx, prism-home.css) must merge cleanly onto it, not onto main.

## File Structure

```
src/styles/prism-home.css        ← MODIFIED (Task 1): mandatory snap, nav snap rules, remove scroll-padding-top + trustbar exclusion
src/components/site/prism-home/PrismHome.tsx  ← MODIFIED (Task 1): fitPages effect (desktop only)
src/components/site/prism-home/sections/TrustBar.tsx  ← MODIFIED (Task 2): section → div, v4 restyle
src/components/site/prism-home/sections/{Hero,Problem,BiasTax,FeatureShowcase,EnterpriseArchitecture,InstitutionalTrust,FinalCtaFaq}.tsx  ← MODIFIED (Task 2): data-page attrs + vertical padding updates
```

---

### Task 1: Snap mechanism + fitPages runtime

**Files:** `src/styles/prism-home.css`, `src/components/site/prism-home/PrismHome.tsx`

- [ ] In prism-home.css: `html.prism-snap` rule becomes `scroll-snap-type: y mandatory;` (drop `scroll-padding-top: 76px` — the Hero's `data-page="76"` offset replaces it; update the comment block accordingly — it currently explains why proximity was chosen; rewrite it to explain the v4 fit-pages model). Add to the `.prism-nav` rule: `scroll-snap-align: start; scroll-snap-stop: always;` (reference line 28). Remove the now-dead `.prism-home main > section.prism-trustbar-section { scroll-snap-align: none; }` rule and its comment (Task 2 removes the class). Keep `.prism-home main > section { scroll-snap-align: start; }` as the pre-JS baseline (fitPages overrides inline).
- [ ] In PrismHome.tsx: add the fitPages effect per the Global Constraints port spec, gated to the desktop branch (it must not run when the mobile tree is rendered; deps include `isMobile`). Note the effect runs against `section[data-page]` — Task 2 adds those attributes; until then the selector matches nothing and the effect is a no-op (safe to land first).
- [ ] `npm run lint && npm run build` → pass. Playwright 1280×900: page loads, no console errors, snap-type on html is mandatory (`getComputedStyle(document.documentElement).scrollSnapType` contains 'mandatory'), scroll still works (no sections have data-page yet — behavior ≈ current with mandatory snap on full-height-ish sections).
- [ ] Commit: `feat(fit-pages): mandatory snap + fitPages runtime (no-op until sections opt in)`

### Task 2: Section opt-in — data-page attrs, paddings, trust-bar demotion

**Files:** the 8 section components listed above.

- [ ] `TrustBar.tsx`: root `<section className="prism-trustbar-section">` becomes `<div>` (no data-page, no class) styled per reference lines 149–150: outer `maxWidth: 1560, margin: '0 auto', padding: '0 44px 36px'` — NOTE this one keeps its own 44px horizontal padding since it no longer uses prism-wrap sizing conventions… check the current component first: if it already uses `.prism-wrap`, keep that and set vertical padding `0 0 36px`. Card restyle: borderRadius 32→24, padding '40px 48px'→'22px 40px', label fontSize 15→14, items row marginTop 32→16 (diff v3→v4 confirmed these are the only changes; inner audience items are unchanged). Keep the existing mobile branch (`.prism-trustbar-mobile`) as-is.
- [ ] `Hero.tsx`: section gets `data-page="76"`; inner content wrapper vertical padding `72px … 56px` → `44px … 20px` (reference line 48; keep our horizontal convention).
- [ ] Remaining six sections get `data-page=""` and these vertical paddings (from reference lines 167/290/427/788/859/889): Problem 56/48, BiasTax 52/44, FeatureShowcase 44/40, EnterpriseArchitecture 52/44, InstitutionalTrust 52/44 (bottom was 0 — the dark stats bar block: check how the current bottom-flush layout interacts; the stats bar keeps its own spacing, just set section bottom padding 44), FinalCtaFaq top 56 bottom 0 AND remove its `marginTop: 90` (v4 line 889 has no margin). Tablet (`isMobile` 900px) ternary branches keep their existing values.
- [ ] `npm run lint && npm run build` → pass. Playwright 1280×900: scroll through the whole page wheel-step by wheel-step — each gesture lands on a full section page; `section[data-page]` elements all have inline zoom or minHeight set; Hero page = nav + hero exactly filling the viewport; trust bar visible only mid-transition (that's correct); screenshot each settled page.
- [ ] Commit: `feat(fit-pages): sections fit one viewport page; trust bar leaves the snap flow`

### Task 3: Verification sweep

- [ ] `npm run lint && npm run build` → pass.
- [ ] Playwright desktop matrix — 1280×800, 1600×900, 1920×1080: for each, after 2s settle, assert every `section[data-page]` fits: `Math.round(rect.height * (zoom||1)) <= innerHeight - offset + 4`; wheel through all 7 pages and confirm no freeze (each dispatched wheel gesture changes `scrollY` within 1.5s); Feature Showcase carousel autoplay + Analytics charts still render when zoomed; reveal-on-scroll still fires (no permanently-invisible rvh elements after full scroll).
- [ ] Short-viewport check 1280×680: heavily zoomed sections remain legible (screenshot + judge); if any section is illegible below ~0.55 zoom, report it as a finding (do NOT redesign — this is the design's own mechanism).
- [ ] Mobile regression: 390×844 — mobile tree unaffected, no snap, no fitPages inline styles anywhere.
- [ ] Reduced-motion 1280×900: page loads, snap still functional (snap is not an animation — it stays), no console errors.
- [ ] Fix-forward only for real defects; commit only if fixes were needed.

## Self-Review Notes
- fitPages is a faithful port including its quirks (double retrigger at 400/1500ms; zoom-based scaling). CSS `zoom` is Baseline (Firefox 126+); accepted.
- The old scroll-freeze fix (proximity + trustbar exclusion) is superseded wholesale by this model — removing it is intentional, not a regression; the freeze cause (a 136px snap target) no longer exists.
