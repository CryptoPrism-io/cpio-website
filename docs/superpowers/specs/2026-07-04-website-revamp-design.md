# CryptoPrism Website Revamp — Design Spec

**Date:** 2026-07-04
**Status:** Draft, pending user review
**Research inputs:** `docs_revamp/01-landing-page-gap-report.md`, `docs_revamp/02-market-primer-notes.md`, `docs_revamp/03-competitor-sites-to-review.md`, mockups in `docs_revamp/mockups/`

## 1. Problem statement

The current landing page (`cpio_website`, live build in `src/components/`) reads as a generic consumer trading-tool. It carries none of the evidence, pricing, or trust signals that the institutional pitch deck and market primer establish, and audits found concrete UI/UX defects (icon-font fallback risk, invisible fade-in sections, inconsistent stats between mobile slides, ambiguous dual-CTA pattern). This spec covers a full rebuild of the primary landing flow (desktop + mobile home) around a new narrative, information architecture, and visual system. Pitch-deck routes (`#/deck-*`) and the brand kit route are out of scope.

## 2. Narrative angle: "Proven model, missing market"

The site does not lead with "trust us, we're institutional" (too aspirational, unearned) or "here's a trading app" (undersells the research thesis). It leads with a provable claim: **scored, subscription research already works for Indian retail investors — Trendlyne (DVM Score) and Liquide prove it for equities — crypto is the one major asset class that still doesn't have it.** CryptoPrism is positioned as filling a demonstrated gap, not inventing a new behavior. This single narrative serves both audiences at once (retail visitors see "this is a proven, trustworthy category"; investors see "this is a validated market gap with real comps") without needing a split site.

Two-track wayfinding, not two sites: a sticky "For Traders / For Investors" toggle (see §4) lets each audience jump to the section cluster it cares about most, but everyone reads the same underlying page.

## 3. Information architecture

One continuous scroll, nine sections, alternating visual register (see §5) by content type:

| # | Section | Register | Track anchor | Status |
|---|---|---|---|---|
| 1 | Hero — thesis stated directly | Dark/terminal | — | New copy, existing `HeroSection` restyled |
| 2 | Problem — retail loses money (84%/49% stats) | Dark/terminal | — | Restyled from current problem framing |
| 3 | Comps proof — Trendlyne/Liquide/altFINS: "this already works" | **Light/paper** | — | New component: `CompsProofSection` |
| 4 | Product — four engines, live terminal demo | Dark/terminal | Trader | Reused `TerminalPanel`, recopied |
| 5 | Strategies + Watchlist | Dark/terminal | Trader | Reused `StrategyLibrary`, `DynamicWatchlist` |
| 6 | Evidence — DMV AUC, Sharpe, cost wedge, backtest | **Light/paper** | Investor | New component: `EvidenceSection` |
| 7 | Pricing — Lite/Pro/Inst-Lite tiers | **Light/paper** | Investor | New component: `PricingSection` |
| 8 | Trust — founder credibility, comps callback, CIN | **Light/paper** | Investor | New component: `TrustSection` |
| 9 | FAQ / Footer | Dark/terminal | — | Existing `FaqFooter`, `Footer` |

The register alternates three times across the page (dark §1-2 → light §3 → dark §4-5 → light §6-8 → dark §9). Each of those cuts is a plain, undecorated boundary except one: the **signature transition** described in §5 is reserved specifically for the §2→§3 pivot, where the argument shifts from "here's the pain" (Problem) to "here's the proof this is solvable" (Comps Proof) — the narratively significant moment, not simply the first or the midpoint transition. The later cuts (§5→§6, §8→§9) are ordinary section boundaries with no special treatment.

**"For Traders / For Investors" toggle:** sticky, positioned near the header, styled after the existing `PersonaSection` Trader/Analyst/Developer card pattern. Clicking a pill smooth-scrolls to and visually emphasizes its anchor section cluster (Trader → §4-5, Investor → §6-8). It is a shortcut, never a gate — no content is hidden from either audience.

## 4. Primary CTA: "Request an Invite"

The product is invite-only. Every CTA across the site — hero, sticky nav, pricing, footer — is a single, consistent **"Request an Invite"** action, replacing the current "Launch App" / "Apply for Early Access" pairing. This resolves the dual-CTA ambiguity and the "live vs. gated" contradiction found in the earlier audit: invite-only reads as curated/exclusive, not "not ready yet." Implementation-wise this reuses the existing `EarlyAccessModal` component with updated copy, not a new modal.

## 5. Visual system

**Two registers, chosen by content type, not alternated for variety:**

- **Dark/terminal register** (sections 1, 2, 4, 5, 9): existing brand direction, validated against Nansen's live comp — near-black base, neon-green primary accent, violet/cyan secondary accents, full-bleed terminal chrome, ambient glow blooms. This is real brand equity, not a fresh choice, and testing confirmed it's on-trend for the category rather than a liability.
- **Light/paper register** (sections 3, 6, 7, 8): a deliberate departure for credibility content, styled after Glassnode's restraint (not Messari's — Messari's own hero is dark-navy; the "light" comparison in earlier discussion was a misattribution, corrected here) plus the market primer's own report-style palette. Bordered data cards, hairline dividers, no terminal chrome, no shadows.

**Color tokens** (6 named values spanning both registers):
| Token | Hex | Register | Usage |
|---|---|---|---|
| `--ink-black` | `#060810` | Dark | Base background (existing) |
| `--prism-green` | `#0ECB81` | Dark | Primary accent (existing) |
| `--prism-violet` | `#8B5CF6` | Dark | Secondary accent (existing) |
| `--prism-cyan` | `#00D4FF` | Dark | Secondary accent (existing) |
| `--paper` | `#F6F3EC` | Light | Base background (new) |
| `--navy-ink` | `#10182B` | Light | Text (new) |
| `--ember` | `#D97D46` | Light | Sparing accent, one highlight per card max (new) |

**Typography:** Plus Jakarta Sans (display), Inter (body), JetBrains Mono (all numeric/data content) — unchanged across both registers. This consistency is what makes the register switch read as intentional mood-shift within one product, not two products stitched together. Dark sections keep bold/black display weights; light sections drop to medium/semibold at a smaller scale with tighter tracking.

**Signature transition element:** at the single pivot point (end of §2 Problem, start of §3 Comps Proof), the existing prism-triangle logomark renders oversized, with its four light-beams (green/blue/violet/cyan) visually resolving into the paper/ember palette — "the prism's output becomes the evidence." Used exactly once, not repeated as a recurring motif elsewhere on the page.

**Base layout reference:** two representative screens were generated via Stitch to validate this system before implementation — `docs_revamp/mockups/stitch-hero.png` (dark register, hero) and `docs_revamp/mockups/stitch-evidence.png` (light register, evidence section pivot). Stitch project: `1938492422737082652`. These are directional references for tone/spacing/contrast, not literal specs to clone pixel-for-pixel — the actual component build follows the existing codebase's component patterns (Tailwind v4 `@theme` tokens in `src/index.css`).

## 6. Content specifics for new sections

**Comps Proof (§3).** Cards for Trendlyne, Liquide, and altFINS (Tradl.ai as an optional fourth). Lead card is Trendlyne: *"An Indian scored-research app reached a strategic-investor stake on under $3M raised — and independently landed on a 'DVM' score almost identical to CryptoPrism's own."* Each card: logo/name, one stat, one "lesson" line (content drawn from `docs_revamp/02-market-primer-notes.md`).

**Evidence (§6).** DMV Scoring AUC 0.896, ML Ensemble Sharpe 7.69, Net Return +229.6%, Win Rate 65%, from the deck's out-of-sample backtest (226 trades). Cost wedge ($30 vs. $800 vs. Glassnode) included as a secondary card or callout. This section currently doesn't exist on the site at all — highest-impact single addition identified in the gap report.

**Pricing (§7).** Three tiers (Lite / Pro / Inst-Lite) shown in India pricing by default, with a note that regional pricing (US/EU/Emerging) is available on request. Replaces "Still Free, For Now" messaging entirely.

**Trust (§8).** Founder credibility (two-time founder, Barclays, 12 products in 6 months), a callback line to §3 ("the same scored-research model already works — Trendlyne, Liquide, Messari"), and Trinetry Infotech Pvt Ltd's CIN as a legitimacy signal (the closest available equivalent to Liquide's SEBI-registration display, since crypto research has no equivalent registration).

## 7. UI/UX defects fixed by this rebuild

- **Icon rendering:** Material Symbols ligature-text icons (used in `ComparisonSection`, `PersonaSection`, etc.) replaced with inline SVG throughout — matches the pattern `MobileHome` already uses correctly, eliminating the raw-text-instead-of-glyph failure mode found in testing.
- **Fade-in-invisible sections:** scroll-triggered opacity animations must default to fully visible in the DOM; animation is a progressive enhancement only, respects `prefers-reduced-motion`, and content is never contingent on JS/IntersectionObserver firing correctly.
- **Stat drift:** a single source of truth (`src/data/stats.ts`) for coin/indicator/source/latency counts, imported by both desktop and mobile components — eliminates the 1,000+/130+/44 vs. 935+/122+/41 inconsistency found between mobile slides.
- **Dual-CTA ambiguity:** resolved by the single "Request an Invite" CTA (§4).

## 8. Technical approach

**Component inventory changes** (against `src/components/`):
- **Reused, restyled:** `TerminalPanel`, `StrategyLibrary`, `DynamicWatchlist` (copy/framing changes, structure mostly unchanged).
- **Reused, repurposed:** `PersonaSection`'s Trader/Analyst/Developer card interaction pattern becomes the template for the new sticky Trader/Investor toggle.
- **New:** `CompsProofSection`, `EvidenceSection`, `PricingSection`, `TrustSection`.
- **Retired:** `ComparisonSection` ("Generic LLM vs. PRISM AI") — its differentiation job is now carried by Comps Proof + Evidence with real evidence instead of a mocked demo comparison.
- **Modified:** `EarlyAccessModal` copy (early-access → invite-only framing); `App.tsx` section list reordered to the 9-section IA above; `Header.tsx` gains the sticky Trader/Investor toggle; icon usage migrated to inline SVG across surviving desktop components; new `src/data/stats.ts` constants file.

**Mobile:** `MobileHome`'s existing per-slide snap structure (already avoids the desktop fade-in-invisible bug) is kept, extended to 9 slides matching the new IA. The sticky toggle becomes a two-button row rather than a floating pill, for width constraints.

**Routing:** unchanged — single hash-routed home page (`/`). Deck routes (`#/deck-*`) and brand kit route are untouched, out of scope for this revamp.

## 9. Out of scope

- Pitch deck pages (`#/deck`, `#/deck-b` through `#/deck-infra`) and `#/brandkit` — unchanged.
- Full 3-region pricing matrix (India/US-EU/Emerging) on the public site — India pricing shown by default, others "on request" only.
- `app-dist/` (confirmed by the user to be an old/abandoned prototype, unrelated to this revamp) — not referenced anywhere in this design.
- Any backend/API work — this spec covers the marketing landing page only, not the product application.

## 10. Success criteria

- All four gaps selected for closure are addressed: evidence numbers visible, pricing visible, trust signals visible, the four specific UI/UX bugs fixed.
- A visitor arriving from the deck or market primer sees a consistent narrative (no positioning whiplash) rather than a different-sounding product.
- Stats are consistent across desktop and mobile (single source of truth).
- No Material Symbols ligature-text rendering as raw text anywhere in the rebuilt sections.
- Site builds and passes `npm run build` (TypeScript check + Vite build) with no new errors.
