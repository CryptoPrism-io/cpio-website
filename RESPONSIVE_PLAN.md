# Plan: Make CryptoPrism Website 16:9 Full-Width & Fully Responsive

## Context
The site currently wraps all content in `max-w-7xl mx-auto px-6` (1280px cap), making it feel 4:3/boxy on modern widescreen displays. Each section also has inner width constraints (`max-w-6xl`, `max-w-2xl`). No section uses viewport-height sizing. The goal is to make each section fill the viewport in a 16:9 manner on desktop, while being fully responsive on iPad and mobile.

## Current Layout Issues
- **App.tsx:14** — `max-w-7xl` caps everything at 1280px
- **HeroSection** — No `min-h-screen`, text-centered column at `max-w-2xl`/`max-w-3xl`
- **TerminalPanel** — Capped at `max-w-6xl`, fixed `min-h-[650px]`
- **ComparisonSection** — Grid capped at `max-w-6xl`, terminal cards at fixed `h-[500px]`
- **PersonaSection** — Carousel `max-w-[1600px]` (ok), but cards have fixed pixel sizes
- **StrategyLibrary** — Ticker viewport fixed at `620px` height
- **Header** — `max-w-7xl` (should span full width on desktop)
- **No mobile hamburger menu** — nav links `hidden md:flex` with no mobile alternative

---

## Implementation Plan

### 1. App.tsx — Remove global width cap
**File**: `src/App.tsx`

- Remove `max-w-7xl` from `<main>` — let sections control their own widths
- Each section becomes full-width with its own internal padding/max-width for text content
- Change to: `<main className="relative z-10">`

### 2. Header — Full-width with inner constraint
**File**: `src/components/Header.tsx`

- Change to full-width container: `w-full px-6 lg:px-12 xl:px-20`
- Add mobile hamburger menu (visible below `md`)
- Keep nav items `hidden md:flex`

### 3. HeroSection — Full viewport height
**File**: `src/components/HeroSection.tsx`

- Add `min-h-screen` to make hero fill the viewport
- Add `justify-center` to vertically center content
- Keep text content constrained with `max-w-4xl mx-auto` for readability
- Scale typography: `text-5xl md:text-7xl lg:text-8xl`
- Command bar: `max-w-3xl lg:max-w-4xl`
- Feature tabs: responsive wrap with proper mobile sizing
- Mobile: stack CTAs vertically, reduce padding

### 4. TerminalPanel — Responsive height
**File**: `src/components/TerminalPanel.tsx`

- Remove `max-w-6xl`, use `w-full px-6 lg:px-12 xl:px-20`
- Change `min-h-[650px]` to `min-h-[60vh] lg:min-h-[70vh]`
- Add section wrapper with padding: `py-16 lg:py-24`
- Mobile: stack sidebar above results panel (already has `flex-col lg:flex-row`)

### 5. ComparisonSection — Full-width with viewport height
**File**: `src/components/ComparisonSection.tsx`

- Add `min-h-screen flex flex-col justify-center`
- Remove `max-w-6xl` from grid, use `w-full px-6 lg:px-12 xl:px-20`
- Terminal cards: change `h-[500px]` to `h-auto min-h-[400px] lg:min-h-[500px]`
- Mobile: single column (already `grid-cols-1 lg:grid-cols-2`)
- Heading: scale up `max-w-4xl` → responsive

### 6. PersonaSection — Full viewport
**File**: `src/components/PersonaSection.tsx`

- Add `min-h-screen flex flex-col justify-center`
- Card sizes: use responsive classes instead of fixed pixels
  - Active: `w-[85vw] md:w-80 lg:w-[360px]`
  - Adjacent: responsive hide/show already in place
- Mobile: show only active card, swipe/tap navigation
- Heading: `max-w-2xl` → `max-w-3xl`

### 7. StrategyLibrary — Full-width responsive
**File**: `src/components/StrategyLibrary.tsx`

- Add `min-h-screen` to section
- Grid: `w-full px-6 lg:px-12 xl:px-20` instead of relying on parent constraint
- Ticker viewport: `h-[60vh] lg:h-[620px]`
- Mobile: stack to single column (grid already handles `lg:grid-cols-12`)
- Feature cards on mobile: horizontal scroll or stacked

### 8. Footer — Full-width
**File**: `src/components/Footer.tsx`

- Match header pattern: full-width with inner padding

### 9. Global CSS updates
**File**: `src/index.css`

- Add smooth scroll: `html { scroll-behavior: smooth; }`
- Add section snap (optional): `scroll-snap-type: y proximity`
- Responsive typography with `clamp()`:
  ```css
  h1 { font-size: clamp(2.5rem, 5vw, 5rem); }
  h2 { font-size: clamp(2rem, 4vw, 4rem); }
  ```

---

## Breakpoint Strategy

| Breakpoint | Device | Layout |
|------------|--------|--------|
| `< 640px` (sm) | Mobile | Single column, stacked, full-width cards |
| `640-768px` (md) | Large phone / Small tablet | Show nav, 2-col where possible |
| `768-1024px` (lg) | iPad | Side-by-side panels, show carousel neighbors |
| `1024-1280px` (xl) | Small desktop | Full layout, wider padding |
| `> 1280px` (2xl) | Widescreen | Max content widths for readability, full-bleed sections |

---

## Files to Modify
1. `src/App.tsx` — Remove global width constraint
2. `src/components/Header.tsx` — Full-width + mobile menu
3. `src/components/HeroSection.tsx` — `min-h-screen`, responsive type
4. `src/components/TerminalPanel.tsx` — Viewport-relative height
5. `src/components/ComparisonSection.tsx` — `min-h-screen`, responsive cards
6. `src/components/PersonaSection.tsx` — `min-h-screen`, responsive cards
7. `src/components/StrategyLibrary.tsx` — `min-h-screen`, responsive grid
8. `src/components/Footer.tsx` — Full-width
9. `src/index.css` — Smooth scroll, responsive typography

---

## Verification
1. `npm run build` — verify no TS/build errors
2. `npm run dev` — check locally at localhost:5173
3. Test at these viewports:
   - **Mobile**: 375x812 (iPhone), 390x844 (iPhone Pro)
   - **iPad**: 768x1024, 1024x1366 (iPad Pro)
   - **Desktop**: 1440x900, 1920x1080, 2560x1440
4. Each section should fill ~100vh on desktop
5. No horizontal scrollbar at any viewport
6. Deploy to Firebase and verify on cryptoprism-io.web.app
