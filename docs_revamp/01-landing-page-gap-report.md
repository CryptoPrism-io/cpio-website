# Landing Page vs. Institutional Deck — Gap Report

Reviewed the local build (Vite dev server, all 9 desktop snap-sections at 1440px + all 7 mobile slides at 390px via Playwright) against the 28-slide institutional pitch deck.

## Executive summary — the 4 gaps that matter most

1. **Positioning whiplash.** Deck cover: "AI-NATIVE CRYPTO INTELLIGENCE · FOR INSTITUTIONS," "The Bloomberg for Crypto." Site: retail trading-copilot tone — "Think Like You. Trade Like a Machine," "Tired of dropdown menus?", "Still Free, For Now :)", meme-coin examples (DOGE, APE). An investor who reads the deck then visits the site sees a different company.
2. **Zero evidence transfer.** Deck's credibility case — DMV AUC 0.896, ML Sharpe 7.69, 226 trades, "DEPLOY" verdict, 8/8 profitable coins, $30 vs $800 cost wedge — appears nowhere on site. Site cites generic counts (1,000+ coins, 130+ indicators, 44 sources) but never the performance evidence that's the actual moat.
3. **No monetization story.** Deck: 3-region tiered pricing + 5-stream ARR model (B2C + B2B API/DaaS/research/ads), ₹62 Cr Y3 target. Site: no pricing anywhere, explicit "Still Free, For Now :)" — undercuts the paid-SaaS narrative the raise is built on. B2B/DaaS story (hedge funds, terminals, exchanges licensing the data core) is completely absent.
4. **"Live" vs. "Early Access" contradiction.** Deck claims 9/12 products live. Site gates its CTA behind "Apply for Early Access" — reads as pre-launch, undermining the "built and validated, now selling" framing.

## Value-proposition gaps (deck → site)

| Deck claim | Site reality |
|---|---|
| Four-engine fusion (IP Data / DMV / ML Signals / Sentiment) as differentiated IP | Feature-level marketing ("Ask in plain English," strategy cloning, dynamic watchlists) — not framed as proprietary fused IP |
| DMV AUC 0.896 / Sharpe 7.69 / out-of-sample evidence | Not mentioned once |
| $30 vs $800 (96% cost wedge vs. Glassnode/Bloomberg) | Not mentioned once |
| Competitive frame: vs. Glassnode/Nansen/Bloomberg | Site's frame: vs. "regular screener" and "Generic LLM" — much smaller argument |
| B2B API / DaaS revenue stream | Not mentioned anywhere |
| Pricing (₹99–₹999/mo tiers, B2B ₹2L–5L/mo) | No pricing page/section found |
| Founder credibility (two-time founder, Barclays, 12 products/6 months) | Not surfaced (Footer has "About" link, unverified content) |

## UI/UX findings

**High severity**
- **Icon font renders as raw text on some loads.** Material Symbols ligature icons (`light_mode`, `warning`, `auto_awesome`, `candlestick_chart`, `terminal`) rendered as literal text instead of glyphs on Comparison/Persona sections in testing. Loaded via webfont + text-ligature class rather than inline SVG — any font-load hiccup shows raw icon names overlapping headings. (`desktop-04-retry.png`)
- **Fade-in sections can render invisible/ghosted.** Comparison and Persona sections use scroll-triggered opacity animation; captured before settling they show blank grey cards with no visible content. No `prefers-reduced-motion` fallback observed.
- **Inconsistent stats within the same mobile flow.** Mobile hero: "1,000+ coins / 130+ indicators / 44 news sources." Mobile "Get Started" slide (5 slides later, same session): "935+ coins / 122+ indicators / 41 news sources / <187ms latency." Same product, two different numbers.

**Medium severity**
- **Low information density per section.** Desktop snap-scroll shows one headline + one small demo mock per full viewport with large empty space below (e.g. the "Unleash the power of AI" CTA section). Institutional/technical readers coming from the evidence-dense deck may read this as thin.
- **CTA duplication/ambiguity.** "Launch App" and "Apply for Early Access" appear side-by-side on nearly every section — unclear primary action, and "early access" conflicts with "Launch App" implying the product is already open.

**Low severity**
- Tone shifts abruptly slide-to-slide on desktop ("Tired of dropdown menus" → "Built for Every Crypto Native" → "Unleash the power of AI x Trading") — reads as stitched-together pages rather than one narrative arc.

## Bottom line
The site is a competent consumer-trading-tool landing page. The deck pitches institutional research infrastructure with hard evidence and a B2B revenue engine. These currently read as two different products in two different voices, and the site carries none of the deck's proof points, pricing, or institutional framing.
