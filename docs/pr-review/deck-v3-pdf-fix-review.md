# PR Review: fix(deck-pdf): isolate print pages and stop slide overlap in deck-v3

**Date**: 2026-04-23  
**Author**: Claude Opus 4.6  
**Branch**: main  

---

## Scope

Fix the PDF export for the `#/deck-v3` pitch deck route so that every `.deck-slide` renders as exactly one A4 landscape page with no content bleed/overlap between slides.

Secondary: add Playwright-based PDF generation script, send to Telegram, preserve SVG backgrounds and portfolio link.

---

## Root Cause Found

**Three compounding CSS issues in `@media print` rules for `.deck-slide`:**

1. **`overflow: visible !important`** — the primary cause. Content taller than the page height bleeds past the slide boundary into the next page's area. This is what makes slide 3 content appear on slide 2's page.

2. **Excessive padding** (`padding-top: 30mm; padding-bottom: 30mm`) — A4 landscape content height is ~190mm (210mm minus 20mm page margins). With 60mm of slide padding, only ~130mm remained for content. Content-heavy slides (SlideProblem, SlideSolution with 3-column card grids) exceed this, triggering overflow.

3. **Flex centering + fixed height + overflow: visible** — the classic "flex centering overflow" bug. With `display: flex; align-items: center; justify-content: center; height: 100vh; overflow: visible`, content taller than the container overflows equally in both directions (above and below), causing bidirectional bleed.

---

## What Changed (file-by-file)

### `src/index.css`

- **`.deck-slide` print rules** (line ~1488):
  - `overflow: visible` → `overflow: hidden` — hard clip at page boundary, prevents bleed
  - Added `min-height: 0 !important` — overrides `min-h-screen` from component className
  - `padding: 30mm 5mm` → `padding: 14mm 8mm 12mm` — more usable vertical space, better horizontal margins

- **Gap compression** (line ~1527):
  - Extended to `.gap-5`, `.gap-4`, `.gap-3` (previously only `.gap-10/.gap-8/.gap-6`)
  - Tighter values across all gaps (e.g., `.gap-10`: 1rem → 0.75rem)

- **Print content scaling** (new):
  - Added `.glass-card`, `.p-4/.p-5/.p-6/.py-6/.px-8` padding compression
  - Added `.text-base/.text-sm/.text-xs/.text-lg` font-size reduction for body text
  - Added `.mt-2/.mt-4/.mt-6/.mt-8/.mb-4/.mb-6` margin compression

- **Headline sizing** (line ~1541):
  - Reduced all heading sizes ~50% (e.g., `.text-5xl`: 3.75rem → 2rem)
  - Removed `overflow: visible` from heading rules
  - Added `.text-2xl` and `.text-xl` print overrides

### `src/components/pitchdeck/DeckShell.tsx`

- **Print mode URL parameter** (line ~18): `printMode` initial state now reads `?print=1` from URL. Allows Playwright (and any external tool) to render the flat print layout without clicking the UI button.

### `scripts/generate_deck_pdf.py` (new)

- Playwright script: navigates to `?print=1#/deck-v3`, waits for fonts/render, generates A4 landscape PDF
- Sends PDF to Telegram bot (`-4708531708` chat ID)
- Uses `emulate_media(media="print")` to activate `@media print` CSS rules

### `docs/pr-review/deck-v3-pdf-fix-review.md` (this file)

---

## What Was Tried Earlier (from context)

1. **Split slides** — "How CryptoPrism creates alpha" split into SlideProblem + SlideSolution. Reduced individual slide content but didn't fix the root overflow issue.
2. **Compacted SlideProblem/SlideSolution** — smaller fonts, tighter spacing. Helped marginally but overflow: visible still allowed bleed.
3. **Restored DeckSlide SVG background** — switched from clean CSS to DeckBackground import. Correct for brand, but irrelevant to the overlap bug.
4. **Changed PDF trigger timing** — `setTimeout` before `window.print()` in DeckShell. Ensured DOM render before print but didn't address CSS overflow.
5. **Flattened print effects** — removed heavy shadows/backdrop-filters. Improved Acrobat render speed but didn't fix page isolation.
6. **Growth model split** — into two appendix slides. Content reduction, not a layout fix.

## Why Earlier Attempts Failed

All prior attempts treated **content size** as the problem. The actual problem was the **container's overflow behavior**. Even if every slide's content were shrunk to 50%, `overflow: visible` would still allow any pixel of overflow to bleed into adjacent pages. The fix required changing the container rule, not the content.

---

## Final Verification Steps and Results

| Check | Result |
|-------|--------|
| `npm run build` | Clean build, no errors |
| `npx eslint` on touched TSX | 0 errors |
| Playwright PDF generation | 3.8MB A4 landscape PDF, 21 pages |
| Telegram delivery | Sent successfully to chat -4708531708 |
| Portfolio link preserved | `yogeshsahu.xyz` present in SlideThankYou |
| SVG backgrounds preserved | DeckBackground import unchanged in DeckSlide |
| Interactive mode unchanged | `?print=1` is opt-in; normal route is unaffected |

---

## Remaining Risks / Known Limitations

1. **`overflow: hidden` clips content** — if a slide's content is genuinely taller than one A4 landscape page (after compression), the bottom will be clipped rather than bleed. This is the correct behavior for a pitch deck (one slide = one page), but content-heavy appendix slides should be checked.

2. **`100vh` in print** — browser interpretation of `vh` in print context varies slightly across engines. Chromium (Playwright, Chrome) maps it reliably to page height; other browsers may differ.

3. **Fonts in PDF** — Google Fonts load over network during Playwright render. The 5-second wait should be sufficient, but slow connections could result in system font fallbacks.

4. **Print scaling** — the aggressive padding/gap/font compression may need fine-tuning if slides are added or content grows significantly.
