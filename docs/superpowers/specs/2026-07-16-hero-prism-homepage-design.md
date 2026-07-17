# CryptoPrism Homepage Rebuild — "Hero Prism" Design Spec

**Date:** 2026-07-16
**Status:** Draft, pending user review
**Source design:** Claude Design project `72004fbc-4c9e-4634-9111-8b486a2f5caa`, file `CryptoPrism Hero.dc.html`, imported read-only via the `DesignSync` MCP tool. Full extracted source saved at `docs/superpowers/specs/reference/2026-07-16-hero-prism-design-source.html` (861 lines) for implementation reference.

## 1. Problem statement / scope

The user asked to take the imported "CryptoPrism Hero.dc.html" design — which, despite its name, is a complete 8-section single-page marketing homepage, not just a hero — and switch the entire website to it, removing everything from the previous multi-page site. Confirmed scope: **collapse the whole site to one page.** The current site (`src/components/site/*`, routed in `src/App.tsx`) is a 9-effective-page build (Home + Product/Intelligence/Compare/Pricing/Institutional/Evidence/About/Invite). This spec covers replacing that entire structure with the new single-page design, reconciled against verified product facts.

**Out of scope (untouched):** pitch deck routes (`#/deck*`), `#/brandkit`.

## 2. Content integrity fixes (resolved with user, 2026-07-16)

The source mockup contained several fabricated/unverifiable claims that contradict its own "Private Beta" positioning and don't match any verified CryptoPrism fact (per `docs_revamp/02-market-primer-notes.md`: 6 chains, 130+ indicators, 1,000+ coins, 44 news sources, DMV Score AUC 0.896, Sharpe 7.69, $30/mo vs. Glassnode cost comparison). User confirmed: **use only real, verified claims** — apply this rule everywhere it appears in the source, not only where first flagged. Concrete fixes, applied at the copy level (see §4 for exact section-by-section text):

- **Institutional Trust — stats bar** (dark "Built on Trust" bar): replace the 5 fabricated tiles (99.9% Uptime, 256-bit Encryption, 50B+ Data Points/day, 100+ Countries, "Institutional Grade") with 5 real metrics: 130+ Indicators Tracked, 1,000+ Coins Covered, 6 Blockchains Unified, 44 News & Social Sources, 0.896 AUC DMV Score.
- **"Trusted by teams at [Hedge Funds/Fintechs/Exchanges/Family Offices/Research Firms/Asset Managers]"** (implies existing paying clients, which don't exist at private-beta stage) → reframed as **"Built for teams at"** the same industry list, everywhere this pattern appears (dark stats bar, and the top Trust Bar's "Trusted by builders creating the future of finance" → "Built for the builders shaping the future of finance").
- **Institutional Trust — "Enterprise Security" card**: drop the "SOC 2 Type II aligned" bullet (unverifiable compliance claim); replace with "Role-based access control". Soften card description from "Bank-grade security and compliance from day one" → "Security built in from day one".
- **Institutional Trust — "Private Deployment" card**: drop "VPC / on-prem ready", "Air-gapped options", "SLA-backed uptime" bullets (all imply infrastructure/contracts that don't exist yet); replace with "Cloud, hybrid, or on-prem options", "Data isolation by design", "Built to scale with you".
- **FAQ answer #6** ("How is my data secured?"): drop "SOC 2 Type II-aligned security practices" → "We use enterprise-grade encryption and strict access controls to protect your data at every layer."
- **Section subheads** using "trusted by ... worldwide" framing (Institutional Trust subhead, dark stats-bar subhead) get the same built-for/designed-for reword.
- Everything else — Hero, Trust Bar category badges, The Problem, The Bias Tax, Feature Showcase, Enterprise Architecture diagram, remaining 4 Institutional Trust cards (Explainable AI, APIs & Integrations, Audit Trail, Continuous Learning), remaining 5 FAQ answers — carries over as designed; it's narrative/conceptual/product-capability copy with no fabricated stats.

## 3. Navigation, CTAs, routing (resolved with user, 2026-07-16)

- **Nav:** minimal. Logo mark (prism-triangle SVG, same glyph reused elsewhere in the design) + "CryptoPrism." wordmark, in-page anchor links to sections that actually exist on the page (Platform → Feature Showcase, Enterprise → Enterprise Architecture, FAQ → FAQ block), one CTA button. Drop the mockup's "Products" dropdown, "Enterprise" as a separate nav concept beyond the anchor, "Research", "Blog", and "Sign In" — none map to anything real post-collapse.
- **CTAs:** every button on the page wires to the existing `EarlyAccessModal` via the `cta-early-access-trigger` class convention already used elsewhere in this codebase. Relabel where the mockup's label implies something that doesn't exist:
  - "Launch Beta" → **"Request Early Access"** (implies a live launched product; it isn't)
  - "Watch Platform Demo" → **"Request a Demo"** (no demo video exists; this becomes a human-demo request through the same modal)
  - "Sign In" → removed (covered by minimal-nav decision; no auth system exists)
  - "Request Demo", "Explore Enterprise Solutions", "Talk to Our Team" → kept as-is, wired to the modal
- **Old pages:** `src/App.tsx` routes for `#/product`, `#/intelligence`, `#/compare`, `#/pricing`, `#/institutional`, `#/evidence`, `#/about`, `#/invite` are removed. The corresponding page files under `src/components/site/` are **left on disk as orphans**, not deleted — matching the precedent already set with the prior `landing/*` components after the 2026-07-07 rebuild. `HomePage.tsx` is replaced by the new single-page component; `hooks.ts`/`shared.tsx` may still be reused if useful (see §6).

## 4. Page structure (in order)

All content lives in one scrolling route (replacing the current `#/` Home). Full literal markup/styling for every section is in the reference source file (§0); this section summarizes structure and flags exactly what changed vs. source.

1. **Nav** — see §3.
2. **Hero** — "Now in Private Beta" pill; H1 "AI-Native Financial Intelligence for **Modern Markets.**"; subhead "Starting with digital assets. Expanding across global financial markets."; body copy on AI-powered reasoning/quantitative models/research agents; trust row (No credit card / Private Beta / Enterprise Ready); two CTAs (relabeled per §3); animated data-flow diagram (8 source badges — News, On-chain Data, Macro, Sentiment, Exchange Data, Developer Activity, ETF Flows, Economic Calendar — flowing into the canvas prism anchor); 3 floating result cards (High Conviction Signal / Risk Alert / Research Summary) with `cardFloat` bobbing animation; the 3D canvas prism sits here (see §5).
3. **Trust Bar** — reworded per §2; 5-category badge row (Funds, Trading Firms, Fintechs, Research Teams, APIs) unchanged.
4. **The Problem** — pill/H2/subhead on fragmented signals; 8 labeled source rows (News, On-chain, Macro, ETF Flows, Derivatives, Research PDFs, Developer Activity, Sentiment) converging toward a result card (97% confidence example); closing statement. No fabricated claims — carries over as-is.
5. **The Bias Tax** — human-judgment-vs-machine-reasoning narrative; 3-column comparison (Human Thinking / CryptoPrism / Machine Reasoning); 6 bias cards (Recency, Confirmation, Loss Aversion, Overconfidence, Anchoring, Availability); "Prism Reasoning Engine" card; closing quote. No fabricated claims — carries over as-is.
6. **Feature Showcase** — 5-card hover-expand "shelf" (Unified Dashboard, AI Screener, Public Screens [default active], Analytics, News Intelligence), each with a product screenshot. No fabricated claims — carries over as-is (see §7 for asset sourcing).
7. **Enterprise Architecture** — "who it's for" / intelligence-layer / data-foundation diagram; describes product architecture/intent, not a claim about existing clients or certifications — carries over as-is. Closing CTAs wired per §3.
8. **Institutional Trust** — 6 capability cards (2 rewritten per §2) + dark stats bar (rewritten per §2). Subhead reworded per §2.
9. **Final CTA + FAQ** — dark closing section; CTAs relabeled per §3; 4 trust badges (Private Beta, Enterprise Ready, AI Native, Explainable) unchanged; 6-item FAQ accordion (#6 answer rewritten per §2); closing banner with CTAs wired per §3.

## 5. Interactive systems to port

These are genuine logic, not boilerplate — read directly from the source file's trailing `<script type="text/x-dc">` component class (reference source lines 612-858).

- **3D canvas prism** (`prismRef`): hand-rolled Canvas2D pseudo-3D render, not three.js. Faceted crystal (apex + hex ring + shallow bottom tip = 12 triangular faces), manual `proj(x,y,z)` perspective projection, continuous rotation, internal particle system (rising/orbiting points, ~14% tinted emerald), ground-shadow/reflection gradients, apex highlight. Driven by `requestAnimationFrame`. Editable props from the source: `rotationSpeed` (0-3, default 1), `particleDensity` (100-1600, default 700), `showGrid` (boolean, default true) — port these as component props/config, not necessarily end-user-editable in production.
- **Scroll-anchor prism travel**: the canvas DOM element's `left/top/width/height` are repositioned every frame based on `window.scrollY` relative to three anchor refs (`heroAnchor` in Hero, `sec2Anchor` in The Problem, `sec3Anchor` in The Bias Tax), using smoothstep easing (`p*p*(3-2*p)`) across two travel "legs". Port the anchor/measure/draw logic directly; note the source's `draw()` computes a `shatter` intensity value that its `renderPrism(...)` call passes as an 8th argument even though the function signature only declares 7 params — resolve this discrepancy during implementation (likely an unused/dropped parameter in the original mockup) rather than porting the bug verbatim.
- **Feature Showcase shelf**: hover-driven `flex` transition (`flex 0.55s cubic-bezier(0.22,1,0.36,1)`) expanding one of 5 cards, collapsing others to a vertical rotated-title strip; resets to default active index (2, "Public Screens") on mouse-leave.
- **FAQ accordion**: single-open-at-a-time toggle, chevron rotation transition.
- **Reveal-on-scroll**: `IntersectionObserver` (threshold 0.15) driving `data-reveal`-indexed elements with staggered delay (`index * 0.1s`). This matches the pattern already implemented in this repo's `useReveal` hook (`src/components/site/hooks.ts`, carried from `src/components/landing/hooks.ts`, including its 4s safety-net force-reveal timeout) — reuse that hook rather than reimplementing.

## 6. Implementation notes (non-binding detail, for the planning phase)

- Target stack: React 19 + TypeScript + Vite + Motion, matching the rest of the site. The `.dc.html` authoring format (`sc-if`/`sc-for`, `{{ }}` interpolation, `<x-import component-from-global-scope="image-slot">`) is Claude Design's own preview runtime and is not executable as-is — all of it needs reimplementing as real React/TSX.
- `image-slot.js` (also fetched from the design project) is generic Claude-Design-authoring boilerplate (a drag-and-drop image placeholder custom element) — not project logic worth porting; production images render as plain `<img>`/CSS background.
- Existing `.site-light` theme tokens (`src/styles/site.css`) do not match this design's palette (`#FAFAF8` bg, `#0FAE72`/`#0B8D84` green/teal accents, `#0B1220` text, Inter-only typography at weight 800 for headings, vs. the current warm-paper `#F5F3EE` + Manrope-headings theme). This design introduces its own visual system; it does not need to be reconciled with `.site-light` since it's replacing the page(s) that used it, not living alongside them.
- `src/components/site/hooks.ts` and `shared.tsx` should be checked for reusable utilities (beyond `useReveal`) before writing new ones from scratch.

## 7. Assets

Only 5 raster images are referenced anywhere in the design (verified by reading every section's markup — all other imagery is inline hand-drawn SVG): the Feature Showcase product screenshots, defined in `FEATURE_META`:

| Feature | Source path (in Design project `uploads/`) |
|---|---|
| Unified Dashboard | `uploads/ChatGPT Image Jul 15, 2026, 03_45_17 PM-a1bda2fc.png` |
| AI Screener | `uploads/ChatGPT Image Jul 15, 2026, 03_45_20 PM-e9a413bf.png` |
| Public Screens | `uploads/ChatGPT Image Jul 15, 2026, 03_45_24 PM-2656e800.png` |
| Analytics | `uploads/ChatGPT Image Jul 15, 2026, 03_45_41 PM (2)-896ec06b.png` |
| News Intelligence | `uploads/ChatGPT Image Jul 15, 2026, 03_45_58 PM-de62a8e9.png` |

These need downloading from the Design project and placing under the repo's public/asset directory during implementation. Other files listed in the project's `uploads/` (additional "ChatGPT Image..." files, two GUID-named PNGs, a "pasted-..." image) are unreferenced drafts and can be ignored.

## 8. Responsiveness

The source is a fixed desktop-only layout (`min-width: 1560px` container, absolute-positioned diagrams, no media queries). User confirmed: **build a real responsive version**, adapting the visual language to this site's existing breakpoint patterns rather than shipping desktop-only or a stripped-down fallback. This is the highest-effort open item for the implementation plan — in particular the canvas prism's scroll-anchor travel math and the Feature Showcase hover-shelf both assume desktop mouse/scroll behavior and will need real mobile-equivalent interactions (e.g., tap-to-expand instead of hover, a simplified or resized prism animation) rather than literal translation. Concrete mobile interaction design is deferred to the implementation plan, not fully specified here.
