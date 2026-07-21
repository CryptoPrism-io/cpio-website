# Desktop Homepage Motion + Radix Enhancement — Design

**Date:** 2026-07-21
**Author:** Yogesh Sahu (@CryptoPrism-io) + Claude
**Scope:** Desktop `prism-home` homepage only. Mobile is frozen.

## Goal

Enhance the desktop v5 homepage with (a) choreographed motion via **anime.js v4**
and (b) accessible interaction primitives via **Radix UI**, styled to match the
current look. This is polish on top of the shipped v5 design — no new copy, no new
data, no layout redesign.

## Hard constraints

1. **Mobile is frozen.** Nothing under `src/components/site/prism-home/mobile/**`
   changes. Every enhancement is gated behind the existing desktop branch
   (`!isMobile`). Any PR touching a shared file requires the 390×844 mobile
   regression check (mobile tree renders, no `prism-snap` class, no fitPages inline
   styles, hero/ledger/carousel unchanged).
2. **fitPages-safe.** Sections render at CSS `zoom` (not transform). Scroll-triggered
   motion must key off real, post-zoom geometry (IntersectionObserver against the
   actual scrolled element) and must never fight the mandatory one-page snap or the
   existing `[data-reveal]` stagger. anime.js runs *after* fitPages has sized a
   section; reveal triggers fire on intersection, not on a fixed timer tied to
   layout.
3. **Reduced-motion honored.** The existing CSS kill-rule covers keyframes. All new
   anime.js timelines get a JS guard: when
   `matchMedia('(prefers-reduced-motion: reduce)').matches`, skip the animation and
   apply the end state immediately (elements visible, numbers at final value).
4. **No Tailwind added to prism-home sections.** They stay inline-styled. Tailwind v4
   already exists project-wide (`@tailwindcss/vite`); it is used only where a
   component already uses it (the modal).

## Dependencies

- `animejs@^4.5.0` — already a dependency (currently used only in the orphaned
  `src/components/landing/**`). New usage is greenfield in `prism-home`.
- Radix primitives to add (each is a small, tree-shakeable package):
  - `@radix-ui/react-tabs` — Feature Showcase tabs
  - `@radix-ui/react-accordion` — Final CTA / FAQ accordion
  - `@radix-ui/react-dialog` — EarlyAccessModal migration
  - `@radix-ui/react-tooltip` — (optional) Hero trust-bar icon tooltips

## Shared foundation (built once, in the Hero PR)

New file `src/components/site/prism-home/motion.ts`:

- `prefersReducedMotion(): boolean` — single source of truth for the guard.
- `useInViewOnce(ref, opts?)` — IntersectionObserver hook returning a boolean that
  latches true the first time the element crosses the viewport. Threshold/rootMargin
  tuned for the fitPages one-page-per-section layout.
- `useAnimeReveal(ref, buildTimeline)` — runs an anime.js timeline once the ref is
  in view, unless reduced-motion is set (then it applies the timeline's end state
  synchronously). `buildTimeline` receives the resolved element(s).
- A small `<CountUp>` component (or `useCountUp` hook) that animates a number from 0
  to a target with anime.js on first in-view, respecting reduced-motion (renders the
  final value immediately when reduced).

These utilities keep each section's diff small and make the reduced-motion contract
impossible to forget.

## Per-section design

### PR 1 — EarlyAccessModal → Radix Dialog (do first; shared component)

Rebuild `src/components/EarlyAccessModal.tsx` on `@radix-ui/react-dialog`, keeping
the **exact current Tailwind styling and `motion/react` transitions** (the visual
result is identical). Radix provides focus-trap, `Esc`-to-close, scroll-lock,
`aria-modal`, and focus restoration — replacing the three hand-rolled `useEffect`
hooks (focus, Escape, and the manual backdrop). The `cta-early-access-trigger`
global click listener in `App.tsx` and the API POST flow are unchanged. Success
state and error handling unchanged.

**Why first:** it is an isolated shared component, independently testable, and the
Hero CTAs (PR 2) open it — validating it first de-risks the section work.

### PR 2 — Hero

- **Entrance choreography:** on first load, a staggered anime.js timeline cascades
  the hero content — pill → headline → sub → CTA row → trust strip — using
  transform/opacity only. Replaces/augments the current CSS `[data-reveal]` stagger
  for the hero specifically. The existing rotating-word CSS animation and aurora
  keyframes stay.
- **CTA micro-interactions:** hover lift + press spring on "Launch Beta" / "Watch
  Platform Demo" via anime.js (or retained CSS where already good).
- **(Optional) Tooltips:** Radix Tooltip on the trust-bar icon columns. Marked
  optional; drop if it adds noise.
- Reduced-motion: content renders fully visible with no cascade.

### PR 3 — Problem

- **Flip-cards:** replace the `setInterval` flip driver with an anime.js timeline
  for smoother, eased flips and coordinated stagger across the 4 cards. Behavior
  (cycling 8 sources through 4 cards) unchanged.
- **Flow curves:** stroke-draw the 4 flow paths (dashoffset animation) when the
  section first enters view.
- **Stat count-ups:** the numeric stats animate 0 → value on first in-view via
  `<CountUp>`.
- Reduced-motion: cards show a static face, curves drawn, numbers final.

### PR 4 — Feature Showcase

- **Radix Tabs:** replace the manual tab state with `@radix-ui/react-tabs` — gains
  roving-tabindex keyboard nav, `aria-selected`, and proper panel semantics. Styled
  inline to match the current tab strip exactly.
- **Tab transition:** anime.js crossfade/slide on the active screen when the tab
  changes.
- **Screen entrance:** each screen's key elements animate in on activation. The
  existing chart rendering is preserved (AnalyticsScreen animation stays off to
  respect its earlier decision).
- Reduced-motion: instant tab swap, no crossfade.

### PR 5 — Trust + Final CTA / FAQ

- **Radix Accordion:** replace the hand-rolled FAQ accordion in `FinalCtaFaq.tsx`
  with `@radix-ui/react-accordion` — keyboard nav, `aria-expanded`, height
  animation. The no-SOC-2 FAQ correction copy is preserved verbatim.
- **Stat count-ups:** the Institutional Trust real-metric stats (130+, 1,000+, 6,
  44, 0.896 AUC) count up on first in-view. **AUC stays formatted as `0.896` —
  count-up applies only to the integer stats; the AUC renders final immediately.**
- **Prism-triangle:** motion polish on the Final CTA decoration.
- Reduced-motion: numbers final, accordion still fully operable (Radix handles this).

## Out of scope

- No Tailwind added to prism-home sections.
- No mobile changes.
- No new copy, product data, or fabricated stats (real metrics only, per the
  no-dummy-data rule).
- No route changes; nav wiring already shipped in v5.
- No redesign of section layout, fitPages runtime, or the PrismCanvas.

## Rollout

Five sequential PRs (one per row above), each branched off `main` after the prior
merges, matching the established screen-by-screen review flow. Each PR:
`npm run lint && npm run build` clean, desktop verified via Playwright at 1280/1600/1920
widths, mobile regression checked at 390×844, reduced-motion verified.

## Verification checklist (every PR)

- `npm run lint` and `npm run build` both clean.
- Desktop: the enhanced section animates as designed; snap + fitPages intact; zero
  console errors at 1280×900 / 1600×900 / 1920×1080.
- Reduced-motion (`prefers-reduced-motion: reduce`): section legible, end state
  applied, no motion.
- Mobile gate (390×844): mobile tree renders, no `prism-snap` class, no fitPages
  inline styles, frozen mobile behavior unchanged.
