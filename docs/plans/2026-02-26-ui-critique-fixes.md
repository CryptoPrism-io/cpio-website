# UI Critique Fixes — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix 10 UX/design issues identified in the senior dev critique of cryptoprism.io, in order of severity.

**Architecture:** Each fix is scoped to one or two files. No architectural changes — purely UI/CSS/copy fixes. Work sequentially; each task is independent but later tasks (colour hierarchy) build on earlier ones.

**Tech Stack:** React 19 + TypeScript + Tailwind CSS v4 + Motion (Framer) + `src/index.css` for global styles

---

## Task 1: Remove internal deck links from public nav

**Problem:** "Brand Kit", "Cloud Infra", "Pitch Deck" are exposed in the public marketing nav. Visitors click them expecting features, get pitch decks instead.

**Files:**
- Modify: `src/data/mockData.ts` lines 29–36

**Step 1: Edit navLinks — remove the 3 internal links**

In `src/data/mockData.ts`, change the `navLinks` array from:
```ts
export const navLinks: readonly NavLink[] = [
  { label: "Features",   href: "#comparison" },
  { label: "Strategies", href: "#strategy-library" },
  { label: "Watchlist",  href: "#watchlist" },
  { label: "Brand Kit",  href: "#/brandkit" },
  { label: "Cloud Infra",href: "#/deck-infra" },
  { label: "Pitch Deck", href: "#/deck-v3" },
];
```
To:
```ts
export const navLinks: readonly NavLink[] = [
  { label: "Features",   href: "#comparison" },
  { label: "Strategies", href: "#strategy-library" },
  { label: "Watchlist",  href: "#watchlist" },
];
```

**Step 2: Build and verify**

Run: `npm run build`
Expected: No TypeScript errors. Nav should show only 3 links + Early Access button.

**Step 3: Visual check**
Open browser → nav shows: Features | Strategies | Watchlist | [Early Access button]

**Step 4: Commit**
```bash
git add src/data/mockData.ts
git commit -m "fix(nav): remove internal deck links from public navigation"
```

---

## Task 2: Fix "market edge" random purple underline

**Problem:** In the hero subtitle, `market edge` has `decoration-[#8B5CF6]/50` — a violet underline that matches nothing around it and confuses users into thinking it's a broken link.

**Files:**
- Modify: `src/components/HeroSection.tsx` line ~565

**Step 1: Find and fix the decoration**

In `HeroSection.tsx`, find:
```tsx
<span className="text-white font-semibold underline decoration-[#8B5CF6]/50 underline-offset-4">market edge</span>
```

Change to (remove underline entirely — it's not a link):
```tsx
<span className="text-white font-semibold">market edge</span>
```

**Step 2: Build and verify**

Run: `npm run build`
Expected: No errors.

**Step 3: Commit**
```bash
git add src/components/HeroSection.tsx
git commit -m "fix(hero): remove misleading purple underline from 'market edge' text"
```

---

## Task 3: Fix rotating tagline broken during scroll

**Problem:** During snap-scroll, the `headlineY` parallax transform on the `<h1>` shifts the element upward while the tagline container has `overflow-hidden`. This causes mid-scroll states to show two taglines simultaneously — the outgoing one clipped halfway through exit.

**Root cause:** The `<h1>` has `style={{ y: headlineY }}` (a Motion transform). The tagline line has `overflow-hidden` on a `<span>` with `h-[1.15em]`. When the parent `<h1>` is mid-scroll-transform, the overflow container shifts out of sync with the animation clip.

**Files:**
- Modify: `src/components/HeroSection.tsx` lines ~537–558

**Step 1: Wrap overflow-hidden container to be scroll-transform-safe**

Find the tagline rotating block (~line 544):
```tsx
<span className="relative block overflow-hidden h-[1.15em]">
  <AnimatePresence mode="popLayout">
    <motion.span
      key={taglineIdx}
      className="block text-neon-green hero-neon-glow"
      initial={{ y: '80%', opacity: 0, filter: 'blur(8px)' }}
      animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
      exit={{ y: '-80%', opacity: 0, filter: 'blur(8px)' }}
      transition={{ duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {HERO_TAGLINES[taglineIdx]}
    </motion.span>
  </AnimatePresence>
</span>
```

Change `mode="popLayout"` to `mode="wait"` so the exit animation fully completes before the entering tagline starts — this prevents overlap during snap transitions:
```tsx
<span className="relative block overflow-hidden h-[1.15em]">
  <AnimatePresence mode="wait">
    <motion.span
      key={taglineIdx}
      className="block text-neon-green hero-neon-glow"
      initial={{ y: '80%', opacity: 0, filter: 'blur(8px)' }}
      animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
      exit={{ y: '-80%', opacity: 0, filter: 'blur(8px)' }}
      transition={{ duration: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {HERO_TAGLINES[taglineIdx]}
    </motion.span>
  </AnimatePresence>
</span>
```

**Step 2: Build and verify**

Run: `npm run build`
Expected: No TypeScript errors.

**Step 3: Visual check**
Open browser → slowly scroll down → only one tagline should be visible at all times, no bleed-through.

**Step 4: Commit**
```bash
git add src/components/HeroSection.tsx
git commit -m "fix(hero): use AnimatePresence wait mode to prevent tagline overlap during scroll"
```

---

## Task 4: Fix hero product card contrast — lost in background

**Problem:** `.hero-product-card` background is `rgba(10, 26, 18, 0.4)` — a transparent dark green. It blends into the green circuit-board background texture, making it invisible as a distinct UI element.

**Fix:** Make the card background more opaque and shift it toward the blue-black base colour. Add a stronger shadow and a top-edge highlight to visually lift it off the background.

**Files:**
- Modify: `src/index.css` lines ~445–473

**Step 1: Update `.hero-product-card` styles**

Find in `src/index.css`:
```css
.hero-product-card {
  background: rgba(10, 26, 18, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(14, 203, 129, 0.15);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.8);
  overflow: hidden;
  position: relative;
}
```

Replace with:
```css
.hero-product-card {
  background: rgba(6, 10, 20, 0.82);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-radius: 16px;
  border: 1px solid rgba(14, 203, 129, 0.18);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 8px 48px 0 rgba(0, 0, 0, 0.9),
    0 2px 0 0 rgba(14, 203, 129, 0.12) inset;
  overflow: hidden;
  position: relative;
}
```

**Step 2: Build and visually verify**

Run: `npm run build`
Open browser → hero card should appear as a clearly distinct frosted-glass panel floating above the background. You should see a clear edge separation.

**Step 3: Commit**
```bash
git add src/index.css
git commit -m "fix(hero): increase card background opacity and shadow to separate from bg texture"
```

---

## Task 5: Fix product card readability — column headers and contrast

**Problem:**
- Column headers (`ASSET`, `PRICE`, `TREND`, `EXCH RSV`, `SIGNAL`) are `text-white/30` — 30% opacity on a dark background, failing contrast.
- `Exch Rsv` abbreviation is ambiguous.
- The `BULLISH` pill badge (`text-[10px]`) is too small.

**Files:**
- Modify: `src/components/HeroSection.tsx` lines ~59–64

**Step 1: Fix column header opacity and rename "Exch Rsv"**

Find in `HeroSection.tsx` inside `LiveDataScreen`:
```tsx
<div className="grid grid-cols-[1fr_76px_52px_52px_62px] px-4 py-2 border-b border-white/[0.04]">
  {['Asset','Price','Trend','Exch Rsv','Signal'].map(h => (
    <span key={h} className="font-mono text-[10px] text-white/30 tracking-wide uppercase text-right first:text-left">{h}</span>
  ))}
</div>
```

Change to:
```tsx
<div className="grid grid-cols-[1fr_76px_52px_56px_64px] px-4 py-2 border-b border-white/[0.06]">
  {['Asset','Price','Trend','Exch Rsv','Signal'].map(h => (
    <span key={h} className="font-mono text-[10px] text-white/50 tracking-wide uppercase text-right first:text-left">{h}</span>
  ))}
</div>
```

Key changes: `text-white/30` → `text-white/50` (readable contrast), `52px` → `56px` for Exch Rsv column (gives it breathing room).

**Step 2: Also fix the row grid to match new column widths**

Find the row div (~line 68):
```tsx
className={`grid grid-cols-[1fr_76px_52px_52px_62px] items-center px-4 py-2.5 ...`}
```

Change to match:
```tsx
className={`grid grid-cols-[1fr_76px_52px_56px_64px] items-center px-4 py-2.5 ...`}
```

**Step 3: Increase signal badge font size**

Find the signal badge (~line 87):
```tsx
<span className="font-mono text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded border"
```

Change `text-[10px]` to `text-[11px]`:
```tsx
<span className="font-mono text-[11px] font-semibold tracking-wide px-2 py-0.5 rounded border"
```

**Step 4: Build and verify**

Run: `npm run build`
Expected: No errors. Column headers should be clearly readable. Signal badges legible.

**Step 5: Commit**
```bash
git add src/components/HeroSection.tsx
git commit -m "fix(hero-card): improve column header contrast and signal badge readability"
```

---

## Task 6: Fix watchlist table — add scroll affordance for hidden columns

**Problem:** The table has `overflow-x-auto` but there's no visual cue that columns extend beyond the visible area. Users miss the Volume column entirely.

**Fix:** Add a right-edge fade gradient overlay on the table container that disappears after the user scrolls right. This is CSS-only, no JS.

**Files:**
- Modify: `src/components/DynamicWatchlist.tsx` lines ~209–210
- Modify: `src/index.css` (add `.watchlist-table-wrapper` style)

**Step 1: Wrap the table in a positioned container**

In `DynamicWatchlist.tsx`, find:
```tsx
<div className="overflow-x-auto overflow-y-auto flex-1 lg:max-h-[45vh]">
  <table className="w-full min-w-[800px] text-left border-collapse">
```

Change to:
```tsx
<div className="watchlist-table-wrapper overflow-x-auto overflow-y-auto flex-1 lg:max-h-[45vh]">
  <table className="w-full min-w-[800px] text-left border-collapse">
```

**Step 2: Add CSS for fade overlay**

In `src/index.css`, add after the `.watchlist-glass-panel` block (search for it):
```css
/* Scroll affordance — fades right edge to hint at hidden columns */
.watchlist-table-wrapper {
  position: relative;
}

.watchlist-table-wrapper::after {
  content: '';
  position: sticky;
  right: 0;
  top: 0;
  width: 48px;
  height: 100%;
  background: linear-gradient(to right, transparent, rgba(6, 8, 16, 0.85));
  pointer-events: none;
  display: block;
  float: right;
  margin-top: -100%;
  z-index: 2;
}
```

**Step 3: Build and verify**

Run: `npm run build`
Open browser → watchlist section. There should be a subtle right-edge fade visible, indicating more content is scrollable.

**Step 4: Commit**
```bash
git add src/components/DynamicWatchlist.tsx src/index.css
git commit -m "fix(watchlist): add right-edge fade gradient to signal horizontal scroll"
```

---

## Task 7: Fix mobile hero dead space

**Problem:** On the mobile hero, there's a large empty gap between the heading "Think Like You." and the 3 stats rows. Something was removed but the spacing wasn't adjusted.

**Files:**
- Modify: `src/components/MobileHome.tsx`

**Step 1: Read the hero section of MobileHome.tsx to find the gap**

Read lines 80–200 of `src/components/MobileHome.tsx` to identify what creates the gap (look for `pt-`, `mt-`, `mb-`, `gap-`, or an empty container).

**Step 2: Remove or reduce the spacer**

Look for an element like:
```tsx
<div className="h-32" /> {/* or similar */}
```
Or excessive padding such as `pt-32`, `mt-24`, etc. on the stats container.

Reduce vertical spacing to `pt-6` or `mt-6` max between the heading/subtitle and the stats rows. The hero should feel tight and intentional on mobile, not half-empty.

**Step 3: Build and verify**

Run: `npm run build`
Check at 390px width — heading → subtitle → stats should flow naturally with ~24px gaps. No cavernous empty space.

**Step 4: Commit**
```bash
git add src/components/MobileHome.tsx
git commit -m "fix(mobile): remove dead space between hero heading and stats rows"
```

---

## Task 8: Reduce "System Status" bar to hero section only

**Problem:** `System Status: Operational // Latency: 4ms // Nodes: Active` appears as a decorative footer on every single snap-scroll section. After the first section it becomes noise — the user's eye learns to ignore it, so it serves no purpose.

**Fix:** Keep it on the hero section only. Remove from all other sections.

**Files:**
- Modify: `src/components/HeroSection.tsx` (keep it here)
- Search for the status text in: `src/components/ComparisonSection.tsx`, `src/components/StrategyLibrary.tsx`, `src/components/DynamicWatchlist.tsx`, any other section components.

**Step 1: Find all occurrences of the status bar**

Run: `grep -r "System Status" src/components/`

Note all files that contain it (other than HeroSection.tsx).

**Step 2: Remove from non-hero sections**

In each non-hero file, find the status bar element:
```tsx
<div className="...">
  System Status: Operational // Latency: 4ms // Nodes: Active
</div>
```
Or similar. Delete the entire element.

**Step 3: Build and verify**

Run: `npm run build`
Open browser → only the hero section should show the status bar at the bottom. All other sections clean.

**Step 4: Commit**
```bash
git add src/components/
git commit -m "fix(ux): show system status bar only on hero, remove from all other sections"
```

---

## Task 9: Add visual differentiation between sections

**Problem:** Every section uses the identical dark green circuit-board background. There's zero rhythm — sections feel like repeated copies of the same slide.

**Fix:** Keep the base background but add per-section subtle tint overlays using `::before` pseudo-elements in CSS. Each section gets a faint directional gradient bloom in a different accent colour — no new components, pure CSS.

**Files:**
- Modify: `src/index.css`

**Step 1: Add per-section accent overlays**

In `src/index.css`, find the block that starts with `section:not(.hero-section)` (~line 1594) and add after it:

```css
/* ── Per-section ambient tints (subtle, not overwhelming) ────── */

/* Comparison: blue tint (data/analysis feel) */
#comparison::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 70% 50% at 30% 60%,
    rgba(59, 130, 246, 0.04) 0%,
    transparent 70%);
  pointer-events: none;
  z-index: 0;
}

/* Strategy Library: violet tint (algorithmic feel) */
#strategy-library::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 50% at 70% 40%,
    rgba(139, 92, 246, 0.05) 0%,
    transparent 70%);
  pointer-events: none;
  z-index: 0;
}

/* Watchlist: cyan tint (monitoring feel) */
#watchlist::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 50% at 40% 50%,
    rgba(0, 212, 255, 0.04) 0%,
    transparent 70%);
  pointer-events: none;
  z-index: 0;
}
```

Also ensure the section elements that get these pseudo-elements have `position: relative` (they likely do already, but verify).

**Step 2: Build and verify**

Run: `npm run build`
Open browser → scroll through sections. Each section should have an extremely subtle, almost subliminal colour shift. If the tints look too strong, reduce the opacity values (e.g., `0.04` → `0.025`).

**Step 3: Commit**
```bash
git add src/index.css
git commit -m "feat(design): add per-section ambient colour tints for visual pacing"
```

---

## Task 10: Reduce green overuse — add hierarchy to colour usage

**Problem:** Neon green `#0ECB81` is on: logo, CTA button, nav hover, accent text, signal badges, sparklines, live indicators, feature icons, section headings. Everything is equally green, so nothing is highlighted.

**Fix:** Reserve neon green strictly for: primary CTA, positive signals, live indicators. Use white for nav links on hover. Use `#3B82F6` (blue) for secondary accents like feature icons. This is not a full rebrand — just targeted swaps in 2-3 components.

**Files:**
- Modify: `src/components/Header.tsx` (nav hover colour)
- Modify: `src/components/StrategyLibrary.tsx` (feature list icons)
- Modify: `src/components/DynamicWatchlist.tsx` (feature list icons)

**Step 1: Nav hover — change from green to white**

In `Header.tsx`, find:
```tsx
className="relative hover:text-neon-green transition-colors group"
```
And:
```tsx
<span className="absolute -bottom-1 left-0 h-px w-0 bg-neon-green group-hover:w-full transition-all duration-300" />
```

Change to:
```tsx
className="relative hover:text-white transition-colors group"
```
And:
```tsx
<span className="absolute -bottom-1 left-0 h-px w-0 bg-white/40 group-hover:w-full transition-all duration-300" />
```

This reserves green for CTAs; nav is white. Cleaner hierarchy.

**Step 2: Feature list icons — use blue instead of green**

In `StrategyLibrary.tsx` and `DynamicWatchlist.tsx`, find the feature list items that use `text-neon-green` on the icon spans, e.g.:
```tsx
className="... text-neon-green ..."
```

Change icon colour from `text-neon-green` to `text-prism-blue` (maps to `#3B82F6`).
Leave the heading text as-is. Only the decorative icon element changes.

**Step 3: Build and verify**

Run: `npm run build`
Open browser → nav links should hover white. Feature icons should be blue. The CTA button, signal badges, and sparklines stay green. The green is now reserved for "things that make you money" — appropriate.

**Step 4: Commit**
```bash
git add src/components/Header.tsx src/components/StrategyLibrary.tsx src/components/DynamicWatchlist.tsx
git commit -m "fix(design): reduce green overuse — white nav hover, blue feature icons"
```

---

## Summary

| # | Task | Files | Severity |
|---|------|-------|----------|
| 1 | Remove internal deck links from nav | `mockData.ts` | 🔴 Critical |
| 2 | Fix "market edge" purple underline | `HeroSection.tsx` | 🟡 Medium |
| 3 | Fix rotating tagline broken mid-scroll | `HeroSection.tsx` | 🔴 Critical |
| 4 | Fix hero card contrast (lost in bg) | `index.css` | 🔴 Critical |
| 5 | Fix product card column readability | `HeroSection.tsx` | 🔴 Critical |
| 6 | Watchlist table scroll affordance | `DynamicWatchlist.tsx`, `index.css` | 🟠 High |
| 7 | Mobile hero dead space | `MobileHome.tsx` | 🟠 High |
| 8 | Status bar on hero only | Section components | 🟡 Medium |
| 9 | Per-section visual differentiation | `index.css` | 🟡 Medium |
| 10 | Reduce green overuse | `Header.tsx`, section components | 🟠 High |
