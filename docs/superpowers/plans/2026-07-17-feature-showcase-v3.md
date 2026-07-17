# Feature Showcase v3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 5-card static-PNG hover shelf in the homepage Feature Showcase with the v3 design's 6-tab auto-playing carousel (Dashboard, AI Screener, Public Screens, Analytics, Economic Calendar, News Intelligence) rendering live mock data, with 5 real Chart.js charts on the Analytics tab.

**Architecture:** One shell component (`FeatureShowcase.tsx`, path unchanged so `PrismHome.tsx` needs no import change) owns the tab rail, 6-second autoplay with pause-on-hover, the app-window chrome + sidebar, floating caption cards, and the per-screen closing/CTA row. Six screen components under `feature-showcase/screens/` each render one tab's content pane from typed mock-data objects in `feature-showcase/data.tsx`. All markup and data are transcribed from the committed design reference — nothing is invented.

**Tech Stack:** React 19 function components + hooks, TypeScript, inline-style TSX (site convention — no Tailwind on this page), Chart.js (new npm dependency), CSS additions in `src/styles/prism-home.css`.

## Global Constraints

- **Source of truth:** `docs/superpowers/specs/reference/2026-07-17-hero-design-v3.html`. All copy, data values, colors, sizes, and structure come from this file, byte-exact. Never invent, "improve," or paraphrase content. (The mock data in that file is the approved design's data — transcribing it verbatim is required, not optional.)
- **Template→TSX conversion rules** (apply everywhere):
  - `sc-if value="{{ x }}"` → `{x && (…)}`; `sc-for list="{{ xs }}" as="x"` → `{xs.map((x, i) => …)}` with a `key`.
  - `{{ expr }}` → `{expr}` JSX expressions.
  - `var(--accent)` → `'#0FAE72'`; `var(--accent-2)` → `'#0B8D84'`; `var(--font-heading)` → omit (page already sets Inter via `.prism-home`).
  - Inline HTML `style="…"` strings → JSX style objects; use numbers for px values.
  - HTML entities: `&#8230;` → `…`, `&gt;` → `>` (as JSX text: `{'>'}` where needed), `&amp;` → `&`.
- **Do NOT port:** the design's `accentColor`/`typography` props theming, `FEATURE_META` (legacy static-image array), `data-reveal`/IntersectionObserver wiring, the FAQ block, the Chart.js CDN `<script>` (we use the npm package), the `window.Chart` retry loop (`_chartRetry`).
- **CTA convention:** every closing-row CTA button gets the `cta-early-access-trigger` class (opens the real `EarlyAccessModal`, wired globally).
- **Desktop-first parity; mobile = defined adaptations only** (Task 2): ≤900px the tab rail scrolls horizontally, the sidebar is hidden, captions are hidden below 1520px. No other mobile redesign in this plan.
- **Autoplay parity:** 6000ms interval, pause on `mouseenter` of the carousel wrapper, resume on `mouseleave`, progress bar via `barFill` CSS animation with `animationPlayState`. The design's known quirk (progress bar resumes mid-animation while the JS timer restarts at a full 6s after hover) is **intentional parity — do not fix it**.
- **Verification gate per task:** `npm run build` must pass (runs `tsc -b && vite build`). Visual tasks additionally verify via a Playwright screenshot against the local dev server (detect the port — it drifts between 5173/5174; use the playwright-skill's `detectDevServers()`).
- **Never run `git add -A` / `git add .`** — the working tree contains unrelated untracked files. Stage only the files your task touches.

## File Structure

```
src/components/site/prism-home/sections/
  FeatureShowcase.tsx                     ← REWRITTEN: shell (tab rail, autoplay, window chrome, sidebar, captions, closing/CTAs)
  feature-showcase/
    data.tsx                              ← NEW: types + SCREENS mock data + NAV_LABELS + derived-color helpers (+ Sparkline helper)
    screens/
      DashboardScreen.tsx                 ← NEW (Task 4)
      ScreenerScreen.tsx                  ← NEW (Task 5)
      ScreensScreen.tsx                   ← NEW (Task 3)
      AnalyticsScreen.tsx                 ← NEW (Task 8, Chart.js)
      CalendarScreen.tsx                  ← NEW (Task 7)
      NewsScreen.tsx                      ← NEW (Task 6)
src/styles/prism-home.css                 ← MODIFIED: add barFill keyframe + showcase classes; remove old .prism-shelf* rules (Task 9)
src/assets/prism-feature-*.png            ← DELETED in Task 9 (5 files, only FeatureShowcase.tsx uses them)
package.json                              ← MODIFIED: add chart.js (Task 1)
```

Reference line map (in `docs/superpowers/specs/reference/2026-07-17-hero-design-v3.html`):

| What | Lines |
|---|---|
| Section header (pill, dynamic h2/sub) | 425–430 |
| Autoplay wrapper + tab rail (icons, labels, progress bar) | 432–452 |
| Window card, chrome dots, search bar | 454–459 |
| Sidebar (logo, Ask AI, navItems, user footer) | 460–473 |
| Dashboard content pane | 476–528 |
| Screener content pane | 529–564 |
| Screens content pane | 565–595 |
| Analytics content pane (5 canvases) | 596–651 |
| Calendar content pane | 652–702 |
| News content pane | 703–751 |
| Floating captions (icon variants, connector line) | 756–773 |
| Closing line + 2 CTA buttons | 776–782 |
| `NAV_LABELS` + `buildNav` | 953–959 |
| `SCREENS` data: dashboard | 963–994 |
| `SCREENS` data: screener | 995–1018 |
| `SCREENS` data: screens | 1019–1040 |
| `SCREENS` data: analytics | 1041–1064 |
| `SCREENS` data: calendar | 1065–1097 |
| `SCREENS` data: news | 1098–1125 |
| Derived-color mappings (impact/tag/weekday/affected/connections/tabs2/metricCards/screenCards/captions POS) | 1153–1195 |
| Chart.js configs (`NO` options, `walk`, `grad`, 5 `mk(…)` calls) | 1218–1242 |
| Autoplay mechanics (`scheduleNext`/`goTo`/`pause`/`resume`) | 1243–1249 |
| `barFill` keyframe | 22 |

---

### Task 1: chart.js dependency + data module

**Files:**
- Modify: `package.json` (via `npm install`)
- Create: `src/components/site/prism-home/sections/feature-showcase/data.tsx`

**Interfaces:**
- Consumes: reference file lines 953–959, 963–1126, 1153–1195.
- Produces (later tasks import all of these from `./feature-showcase/data` / `../data`):
  - `type ScreenKey = 'dashboard' | 'screener' | 'screens' | 'analytics' | 'calendar' | 'news'`
  - `interface ScreenBase { key: ScreenKey; tabLabel: string; navActive: string; headlineA: string; headlineB: string; sub: string; captions: Caption[]; closing: string; ctaPrimary: string; ctaSecondary: string; }`
  - `interface Caption { icon: 'spark' | 'antenna' | 'shield' | 'target' | 'grid' | 'message' | 'chart'; title: string; desc: string; num: string; }`
  - Per-screen interfaces extending `ScreenBase`: `DashboardData`, `ScreenerData`, `ScreensData`, `AnalyticsData`, `CalendarData`, `NewsData` — field names and shapes exactly matching the reference data blocks (e.g. `DashboardData` has `ticker: {sym; price; chg}[]`, `priceCards: {name; sym; price; chg; sparkPath}[]`, `overview`, `dailyRecap`, `newsList`; `CalendarData` has `weekDays: {d; n; count; active?}[]`, `events`, plus the detail-panel fields; read the reference block for each screen and type every field you find — no `any`).
  - `type ScreenData = DashboardData | ScreenerData | ScreensData | AnalyticsData | CalendarData | NewsData`
  - `const SCREENS: ScreenData[]` — the 6 entries transcribed **verbatim** from reference lines 963–1125, in source order (dashboard, screener, screens, analytics, calendar, news).
  - `const NAV_LABELS: string[]` — 12 labels from line 953, verbatim.
  - `function buildNav(activeLabel: string): { label: string; weight: number; color: string; bg: string }[]` — port of lines 954–959 (`weight: 700/500`, `color: '#0B8D84'/'#475467'`, `bg: '#F2FAF6'/'transparent'`).
  - Derived-color helpers (pure functions, ported from lines 1153–1195): `impactColors(impact: string): { color: string; bg: string }` (HIGH `#DC2626`/`#FEF2F2`, MEDIUM `#B45309`/`#FFFBEB`, else `#475467`/`#F5F6F7`), `headlineTagColors(tag: string)` (same palette), `screenCardTagColors(tag: string)` (Neutral `#D97706`/`#FFFBEB`, else `#16A34A`/`#F0FDF4`), `affectedColors(s: string)` (Bearish `#DC2626`/`#FEF2F2`, else `#475467`/`#F5F6F7`), `connectionColors(warm: boolean)` (warm `#B45309`/`#FFFBEB`, else `#DC2626`/`#FEF2F2`).
  - `function Sparkline({ path, stroke, width, height }: { path: string; stroke: string; width: number; height: number })` — renders `<svg width={width} height={height} viewBox="0 0 {width} {height}" fill="none"><path d={path} stroke={stroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></svg>`. Check the reference's actual sparkline `<svg>` usages while porting screens and match their viewBox/strokeWidth conventions; adjust this helper's signature in this task if the reference uses per-usage viewBoxes (it does — pass `viewBox` as a prop, default `0 0 ${width} ${height}`).

- [ ] **Step 1: Install chart.js**

```bash
npm install chart.js
```

Expected: `package.json` gains `"chart.js": "^4.x.x"` under dependencies; lockfile updated. (The design pins 4.4.3 via CDN; any 4.x from npm is acceptable — the APIs used are stable across 4.x.)

- [ ] **Step 2: Read the reference data blocks**

Read `docs/superpowers/specs/reference/2026-07-17-hero-design-v3.html` lines 953–1126 (NAV_LABELS + all six SCREENS entries) and 1153–1195 (derived mappings). List every field each screen entry uses — your interfaces must cover all of them.

- [ ] **Step 3: Write `data.tsx`**

Create `src/components/site/prism-home/sections/feature-showcase/data.tsx` containing everything in the Produces block above. Transcribe all string/number values byte-exact from the reference (headlines, prices, percentages, sparkline path strings, event names, AI-summary copy — everything). Use `JSX.Element`-free pure data (the `Sparkline` helper is the only component in this file, hence `.tsx`).

- [ ] **Step 4: Typecheck**

Run: `npm run build`
Expected: PASS (new module compiles; nothing imports it yet).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/components/site/prism-home/sections/feature-showcase/data.tsx
git commit -m "feat(showcase-v3): add chart.js dependency and typed SCREENS mock-data module"
```

---

### Task 2: Shell — tab rail, autoplay, window chrome, sidebar, captions, closing/CTAs

**Files:**
- Rewrite: `src/components/site/prism-home/sections/FeatureShowcase.tsx` (full replacement of current contents)
- Modify: `src/styles/prism-home.css` (add new rules; do NOT remove `.prism-shelf*` yet — that's Task 9)

**Interfaces:**
- Consumes: `SCREENS`, `ScreenData`, `ScreenKey`, `buildNav`, `Caption` from `./feature-showcase/data`; reference lines 425–475, 756–782, 1142–1151, 1243–1249, line 22.
- Produces: the shell renders, for the active screen, a content pane via a `renderScreen(screen: ScreenData)` switch on `screen.key`. Until Tasks 3–8 land, every case returns the fallback `<div style={{ fontSize: 13, color: '#98A2B3', padding: 20 }}>{screen.tabLabel} — coming in a later task</div>`. Each subsequent screen task replaces exactly one case with `<XScreen screen={screen} />`. Screen components receive the **narrowed** type (e.g. `case 'dashboard': return <DashboardScreen screen={screen} />` where the switch narrows `screen` to `DashboardData`).

- [ ] **Step 1: Add CSS**

In `src/styles/prism-home.css`, replace the comment line `/* feature showcase shelf */` header area — leave existing `.prism-shelf*` rules in place — and append after them:

```css
/* feature showcase v3 — tab carousel */
@keyframes prism-barfill { from { width: 0%; } to { width: 100%; } }
.prism-showcase-tabs { display: flex; border-bottom: 1px solid #E7E9EC; }
.prism-showcase-tab { flex: 1; text-align: center; padding: 12px 8px 14px; cursor: pointer; position: relative; }
.prism-showcase-caption { position: absolute; width: 208px; border: 1px solid #E7E9EC; border-radius: 18px; padding: 18px; background: #FFFFFF; box-shadow: 0 10px 26px rgba(11,18,32,0.05); }
@media (max-width: 1520px) { .prism-showcase-caption { display: none; } }
@media (max-width: 900px) {
  .prism-showcase-tabs { overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
  .prism-showcase-tabs::-webkit-scrollbar { display: none; }
  .prism-showcase-tab { flex: 0 0 auto; min-width: 112px; }
  .prism-showcase-sidebar { display: none; }
}
```

(Note the keyframe is named `prism-barfill`, not `barFill`, to keep this page's keyframes prefixed like `prism-rv-*`. The reduced-motion rule already in this file kills it automatically — the progress track then stays empty, which is acceptable.)

- [ ] **Step 2: Rewrite `FeatureShowcase.tsx`**

Full new contents — the autoplay/tab/shell logic below is complete; the JSX marked "port from reference lines N–M" is a transcription task under the Global Constraints conversion rules:

```tsx
import { useEffect, useState } from 'react';
import { SCREENS, buildNav, type ScreenData } from './feature-showcase/data';

const ACCENT = '#0FAE72';
const ACCENT2 = '#0B8D84';
const AUTOPLAY_MS = 6000;

// Tab icons keyed by screen key — port the 6 <svg> elements from reference lines 437–442
// verbatim (19x19, viewBox 0 0 20 20, strokeWidth 1.5); stroke is passed in.
function TabIcon({ k, stroke }: { k: ScreenData['key']; stroke: string }) {
  /* switch (k) { case 'dashboard': return (<svg …>…</svg>); … } */
}

// Caption icon variants — port the 7 <svg> elements from reference lines 761–767 (17x17, stroke #0B8D84).
function CaptionIcon({ icon }: { icon: string }) { /* switch on icon */ }

// Caption position table — port from reference lines 1180–1183:
const CAPTION_POS = [
  { top: 60, left: true },
  { top: 50, left: false },
  { top: 270, left: false },
  { top: 270, left: true },
];

export function FeatureShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % SCREENS.length), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [active, paused]);

  const screen = SCREENS[active];
  const navItems = buildNav(screen.navActive);

  return (
    <section id="prism-platform" style={{ position: 'relative', padding: '70px 0 80px', background: '#FAFAF8' }}>
      <div className="prism-wrap">
        {/* Header — port reference lines 426–430: pill "THE PLATFORM" (use existing .prism-pill classes
            like the current file does), h2 = {screen.headlineA} + gradient span {screen.headlineB}
            (use className="prism-grad-text"), p = {screen.sub}. */}

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{ maxWidth: 1560, margin: '34px auto 0' }}
        >
          {/* Tab rail — port reference lines 433–452 */}
          <div className="prism-showcase-tabs">
            {SCREENS.map((s, i) => {
              const isActive = i === active;
              const color = isActive ? ACCENT2 : '#98A2B3';
              return (
                <div key={s.key} className="prism-showcase-tab" onClick={() => setActive(i)}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <TabIcon k={s.key} stroke={color} />
                    <span style={{ fontSize: 12, fontWeight: 700, color, whiteSpace: 'nowrap' }}>{s.tabLabel}</span>
                  </div>
                  <div style={{ position: 'absolute', left: 6, right: 6, bottom: -1, height: 2, background: '#E7E9EC', overflow: 'hidden' }}>
                    {isActive && (
                      <div
                        key={active}
                        style={{
                          height: '100%',
                          background: ACCENT,
                          width: '0%',
                          animation: `prism-barfill ${AUTOPLAY_MS}ms linear forwards`,
                          animationPlayState: paused ? 'paused' : 'running',
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Window card + captions container — port reference lines 454–473 for the card/chrome/sidebar;
              sidebar root div gets className="prism-showcase-sidebar" in addition to its inline styles.
              Sidebar renders navItems.map(…) per line 466, logo + "+ Ask AI" box per 462–463,
              user footer "Yogesh Sahu / Enterprise Plan" with the YS avatar per 469–472. */}
          <div style={{ position: 'relative', maxWidth: 1000, margin: '30px auto 0' }}>
            {/* window card … content pane wraps: */}
            {/*   <div style={{ flex: 1, minWidth: 0, padding: '18px 22px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}> */}
            {/*     {renderScreen(screen)} */}
            {/*   </div> */}

            {/* Captions — port reference lines 756–773. For caption i, use CAPTION_POS[i % 4]:
                className="prism-showcase-caption"; style left/right from pos.left (left ? { left: -250 } : { right: -250 }),
                top: pos.top; dashed connector line + accent dot per lines 758–759 (side flips with pos.left);
                icon via <CaptionIcon icon={cap.icon} />; title/desc/ghost num per 769–771. */}
            {screen.captions.map((cap, i) => { /* … */ })}
          </div>

          {/* Closing + CTAs — port reference lines 776–782. Both <button>s get className="cta-early-access-trigger";
              labels are {screen.closing}, {screen.ctaPrimary}, {screen.ctaSecondary}. */}
        </div>
      </div>
    </section>
  );
}

function renderScreen(screen: ScreenData) {
  switch (screen.key) {
    case 'dashboard': return fallback(screen);
    case 'screener': return fallback(screen);
    case 'screens': return fallback(screen);
    case 'analytics': return fallback(screen);
    case 'calendar': return fallback(screen);
    case 'news': return fallback(screen);
  }
}

function fallback(screen: ScreenData) {
  return <div style={{ fontSize: 13, color: '#98A2B3', padding: 20 }}>{screen.tabLabel} — coming in a later task</div>;
}
```

Delete the old imports (5 PNG assets, `useIsMobile`, `FEATURES`, `DEFAULT_ACTIVE`) — the old mobile accordion goes away with them (mobile behavior is now the scrollable tab rail per the CSS in Step 1). Keep `id="prism-platform"` on the section (scroll-snap + nav anchors depend on it).

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Visual check (Playwright)**

With the dev server running (detect port), screenshot the `#prism-platform` section. Verify: 6 tabs render with icons/labels; active tab is teal with a green progress bar animating; tabs auto-advance after 6s (take two screenshots ~7s apart and confirm the active tab changed); hover pauses (progress bar freezes); window chrome + sidebar render with 12 nav items and the "Yogesh Sahu / Enterprise Plan" footer; content pane shows the fallback text; the closing line + 2 CTA buttons render and change when the tab changes.

- [ ] **Step 5: Commit**

```bash
git add src/components/site/prism-home/sections/FeatureShowcase.tsx src/styles/prism-home.css
git commit -m "feat(showcase-v3): rebuild shell as 6-tab autoplay carousel with window chrome and captions"
```

---

### Task 3: Public Screens screen

**Files:**
- Create: `src/components/site/prism-home/sections/feature-showcase/screens/ScreensScreen.tsx`
- Modify: `src/components/site/prism-home/sections/FeatureShowcase.tsx` (one line: `case 'screens': return <ScreensScreen screen={screen} />;` + import)

**Interfaces:**
- Consumes: `ScreensData`, `screenCardTagColors`, `Sparkline` from `../data`.
- Produces: `export function ScreensScreen({ screen }: { screen: ScreensData })`.

- [ ] **Step 1: Read reference lines 565–595 (markup) and 1019–1040 (data)**

- [ ] **Step 2: Write `ScreensScreen.tsx`**

Port the markup block verbatim under the Global Constraints conversion rules: header row (title "Public Screens" + sub + "My Screens 0" / "Create Screen" buttons), category chip row (6 chips, active styling from the data) + sentiment legend, the 3×2 grid of screen cards (title, sentiment tag via `screenCardTagColors(c.tag)`, description, token-logo dot stack with `+N` overflow, sparkline via `Sparkline`, "Updated …" meta, "Ask AI" pill), footer "Showing 1 to 6 of 48 screens" / "Load more". Interactive-looking elements inside the pane (chips, Ask AI, Load more) are non-functional decoration — render them as styled `<div>`/`<span>`, not `<button>`.

- [ ] **Step 3: Build + visual check**

Run: `npm run build` → PASS. Playwright: click the "Public Screens" tab, screenshot, verify the 6-card grid renders with sparklines and tags (compare against reference data values — e.g. card titles match lines 1019–1040 exactly).

- [ ] **Step 4: Commit**

```bash
git add src/components/site/prism-home/sections/feature-showcase/screens/ScreensScreen.tsx src/components/site/prism-home/sections/FeatureShowcase.tsx
git commit -m "feat(showcase-v3): live Public Screens tab"
```

---

### Task 4: Dashboard screen

**Files:**
- Create: `src/components/site/prism-home/sections/feature-showcase/screens/DashboardScreen.tsx`
- Modify: `FeatureShowcase.tsx` (`case 'dashboard'` + import)

**Interfaces:**
- Consumes: `DashboardData`, `Sparkline` from `../data`.
- Produces: `export function DashboardScreen({ screen }: { screen: DashboardData })`.

- [ ] **Step 1: Read reference lines 476–528 (markup) and 963–994 (data)**

- [ ] **Step 2: Write `DashboardScreen.tsx`**

Port verbatim: ticker row (7 symbols with bold sym + price + green chg, "View all >" right-aligned), 5 price cards with per-asset `sparkPath` sparklines, Market Overview panel (Total Market Cap $2.30T, 24H Volume $76.80B, the 3-segment dominance bar at 56.3/9.8/33.9, the Fear & Greed dot-gauge SVG at 34/"Fear"), Daily Recap panel (3 bullets + inline watchlist line + "Powered by Saarthi"), News panel (3 items). Layout is 2-column at the bottom per the reference — no third column, no watchlist table (those were the stale-PNG extras this task removes from the site).

- [ ] **Step 3: Build + visual check**

`npm run build` → PASS. Playwright: click "Unified Dashboard" tab, screenshot, verify ticker/price cards/dominance bar/gauge/recap/news all render with reference values.

- [ ] **Step 4: Commit**

```bash
git add src/components/site/prism-home/sections/feature-showcase/screens/DashboardScreen.tsx src/components/site/prism-home/sections/FeatureShowcase.tsx
git commit -m "feat(showcase-v3): live Unified Dashboard tab"
```

---

### Task 5: AI Screener screen

**Files:**
- Create: `src/components/site/prism-home/sections/feature-showcase/screens/ScreenerScreen.tsx`
- Modify: `FeatureShowcase.tsx` (`case 'screener'` + import)

**Interfaces:**
- Consumes: `ScreenerData`, `Sparkline` from `../data`.
- Produces: `export function ScreenerScreen({ screen }: { screen: ScreenerData })`.

- [ ] **Step 1: Read reference lines 529–564 (markup) and 995–1018 (data)**

- [ ] **Step 2: Write `ScreenerScreen.tsx`**

Port verbatim: title "AI Screener" + Beta badge + sub, the prompt box with sparkle icon and the example prompt text, the green "✦ Build Screen" button, 3 example chips, results meta ("Screen results · 34 tokens matched"), 4 filter chips, the 7-column results table (TOKEN / SCORE / PRICE / 24H / 7D / ON-CHAIN sparkline / ETF FLOWS) with 5 rows (BTC/ETH/SOL/LINK/AVAX), footer "Showing 1 to 5 of 34 results" / "View more results". This pane is lean — no app chrome of its own (the shell provides the window).

- [ ] **Step 3: Build + visual check**

`npm run build` → PASS. Playwright: click "AI Screener" tab, screenshot, verify prompt box + table with reference values.

- [ ] **Step 4: Commit**

```bash
git add src/components/site/prism-home/sections/feature-showcase/screens/ScreenerScreen.tsx src/components/site/prism-home/sections/FeatureShowcase.tsx
git commit -m "feat(showcase-v3): live AI Screener tab"
```

---

### Task 6: News Intelligence screen

**Files:**
- Create: `src/components/site/prism-home/sections/feature-showcase/screens/NewsScreen.tsx`
- Modify: `FeatureShowcase.tsx` (`case 'news'` + import)

**Interfaces:**
- Consumes: `NewsData`, `headlineTagColors`, `affectedColors`, `Sparkline` from `../data`.
- Produces: `export function NewsScreen({ screen }: { screen: NewsData })`.

- [ ] **Step 1: Read reference lines 703–751 (markup) and 1098–1125 (data)**

- [ ] **Step 2: Write `NewsScreen.tsx`**

Port verbatim: the headline list (4 items; the active one gets `bg: '#F9FAFA'`, tags colored via `headlineTagColors(h.tag)`), the selected-article panel (title, "AI Summary (Beta)" block, 3 Key Takeaways bullets), the Impact Score panel (84/100, "High Impact" badge, the bearish→bullish gradient bar, affected assets via `affectedColors(a.s)` — exactly the 4 in the data: BTC/MSTR/COIN/MARA — and the 24H sentiment sparkline). Note: the current live site's PNG shows 5 assets/4 takeaways/an extra "Market Impact" line — those are stale; the reference data is authoritative.

- [ ] **Step 3: Build + visual check**

`npm run build` → PASS. Playwright: click "News Intelligence" tab, screenshot, verify headlines + article panel + impact panel with reference values.

- [ ] **Step 4: Commit**

```bash
git add src/components/site/prism-home/sections/feature-showcase/screens/NewsScreen.tsx src/components/site/prism-home/sections/FeatureShowcase.tsx
git commit -m "feat(showcase-v3): live News Intelligence tab"
```

---

### Task 7: Economic Calendar screen

**Files:**
- Create: `src/components/site/prism-home/sections/feature-showcase/screens/CalendarScreen.tsx`
- Modify: `FeatureShowcase.tsx` (`case 'calendar'` + import)

**Interfaces:**
- Consumes: `CalendarData`, `impactColors`, `Sparkline` from `../data`.
- Produces: `export function CalendarScreen({ screen }: { screen: CalendarData })`.

- [ ] **Step 1: Read reference lines 652–702 (markup) and 1065–1097 (data)**

- [ ] **Step 2: Write `CalendarScreen.tsx`**

Port verbatim: header (title + sub + "This Week"/"Filters" pills), the 7-day week strip (active day border `#0FAE72` + bg `#F2FAF6`, others `#E7E9EC`/white — per the weekDays mapping at reference line 1160), IMPACT chips (All/High/Medium/Low) + COUNTRY chip + "137 events" counter, the events table (TIME/EVENT/COUNTRY/IMPACT/ACTUAL/FORECAST/PREVIOUS, 6 rows, impact pills via `impactColors(ev.impact)`), footer "Showing 1 to 6 of 137 events" / "Load more", and the event-detail panel (badges, timestamp, the "Starts in 02 HRS 45 MINS 18 SECS" countdown — render the static values from the data; do NOT implement a live ticking countdown, the design is a static mock —, "AI IMPACT ANALYSIS (Beta)" text, MARKET CONNECTIONS list via `connectionColors(c.warm)`, "HISTORICAL SURPRISE 0.18%" + sparkline).

- [ ] **Step 3: Build + visual check**

`npm run build` → PASS. Playwright: click "Economic Calendar" tab, screenshot, verify week strip + events table + detail panel with reference values.

- [ ] **Step 4: Commit**

```bash
git add src/components/site/prism-home/sections/feature-showcase/screens/CalendarScreen.tsx src/components/site/prism-home/sections/FeatureShowcase.tsx
git commit -m "feat(showcase-v3): live Economic Calendar tab (net-new screen)"
```

---

### Task 8: Analytics screen (Chart.js)

**Files:**
- Create: `src/components/site/prism-home/sections/feature-showcase/screens/AnalyticsScreen.tsx`
- Modify: `FeatureShowcase.tsx` (`case 'analytics'` + import)

**Interfaces:**
- Consumes: `AnalyticsData`, `Sparkline` from `../data`; `Chart` from `'chart.js/auto'`.
- Produces: `export function AnalyticsScreen({ screen }: { screen: AnalyticsData })`.

- [ ] **Step 1: Read reference lines 596–651 (markup), 1041–1064 (data), 1218–1242 (chart configs)**

- [ ] **Step 2: Write `AnalyticsScreen.tsx`**

Static markup ported verbatim: ticker strip, header controls (date range / Compare / Export), the 8 sub-tabs (Overview active — colors via the tabs2 mapping at reference line 1168: active `#0B8D84` text + `#0FAE72` underline, others `#98A2B3`/transparent), 5 metric cards (4 sparkline cards + the Fear & Greed card with red value per the metricCards mapping at lines 1169–1173), the 5 chart panels with their titles/values/deltas, and the Top Gainers list (PENDLE/ARB/LDO).

Chart lifecycle — complete implementation (replaces the design's `componentDidUpdate` + `window.Chart` retry dance; mount/unmount is the React-idiomatic equivalent since the screen unmounts on tab switch):

```tsx
import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import type { AnalyticsData } from '../data';

export function AnalyticsScreen({ screen }: { screen: AnalyticsData }) {
  const tmcRef = useRef<HTMLCanvasElement>(null);
  const flowsRef = useRef<HTMLCanvasElement>(null);
  const stblRef = useRef<HTMLCanvasElement>(null);
  const oiRef = useRef<HTMLCanvasElement>(null);
  const liqRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const charts: Chart[] = [];
    const NO = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true, displayColors: false, backgroundColor: '#0B1220', titleFont: { size: 9 }, bodyFont: { size: 9 }, padding: 6 },
      },
      animation: { duration: 700 },
    } as const;
    const days = Array.from({ length: 30 }, (_, i) => `Jun ${15 + i <= 30 ? 15 + i : i - 15}`);
    const walk = (start: number, drift: number, vol: number) => {
      let v = start;
      return Array.from({ length: 30 }, (_, i) => {
        v += drift + Math.sin(i * 1.7) * vol + Math.cos(i * 0.9) * vol * 0.6;
        return +v.toFixed(2);
      });
    };
    const grad = (ctx: CanvasRenderingContext2D, hex: string) => {
      const g = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height || 80);
      g.addColorStop(0, hex + '33');
      g.addColorStop(1, hex + '00');
      return g;
    };
    const mk = (el: HTMLCanvasElement | null, cfg: ConstructorParameters<typeof Chart>[1]) => {
      if (el) charts.push(new Chart(el, cfg));
    };
    const hidden = { scales: { x: { display: false }, y: { display: false } } };

    const tctx = tmcRef.current?.getContext('2d');
    mk(tmcRef.current, { type: 'line', data: { labels: days, datasets: [{ data: walk(2.05, 0.009, 0.03), borderColor: '#16A34A', backgroundColor: tctx ? grad(tctx, '#16A34A') : 'transparent', fill: true, tension: 0.4, pointRadius: 0, pointHitRadius: 8, borderWidth: 1.6 }] }, options: { ...NO, ...hidden } });
    const flowVals = Array.from({ length: 26 }, (_, i) => +(Math.sin(i * 1.3) * 0.9 + Math.cos(i * 0.7) * 0.7).toFixed(2));
    mk(flowsRef.current, { type: 'bar', data: { labels: days.slice(0, 26), datasets: [{ data: flowVals, backgroundColor: flowVals.map((v) => (v >= 0 ? '#16A34A' : '#DC2626')), borderRadius: 1.5, barPercentage: 0.7 }] }, options: { ...NO, ...hidden } });
    const sctx = stblRef.current?.getContext('2d');
    mk(stblRef.current, { type: 'line', data: { labels: days, datasets: [{ data: walk(160, 0.32, 0.9), borderColor: '#7C3AED', backgroundColor: sctx ? grad(sctx, '#7C3AED') : 'transparent', fill: true, tension: 0.4, pointRadius: 0, pointHitRadius: 8, borderWidth: 1.6 }] }, options: { ...NO, ...hidden } });
    const octx = oiRef.current?.getContext('2d');
    mk(oiRef.current, { type: 'line', data: { labels: days, datasets: [{ data: walk(21, 0.09, 0.35), borderColor: '#2563EB', backgroundColor: octx ? grad(octx, '#2563EB') : 'transparent', fill: true, tension: 0.4, pointRadius: 0, pointHitRadius: 8, borderWidth: 1.5 }] }, options: { ...NO, ...hidden } });
    mk(liqRef.current, { type: 'doughnut', data: { labels: ['Long', 'Short'], datasets: [{ data: [82.6, 29.8], backgroundColor: ['#16A34A', '#DC2626'], borderWidth: 0 }] }, options: { ...NO, cutout: '68%' } });

    return () => charts.forEach((c) => { try { c.destroy(); } catch { /* canvas already gone */ } });
  }, []);

  return (/* ported markup; each chart container per reference lines 622–647:
    <div style={{ flex: 1, minHeight: 40, position: 'relative', marginTop: 4 }}>
      <canvas ref={tmcRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
    </div> — exact minHeights per canvas from the reference (40 / 36 / 36 / 26 / 52x52 doughnut) */);
}
```

(If `ConstructorParameters<typeof Chart>[1]` fights the compiler on the mixed configs, type `cfg` as `any` at the `mk` boundary with a one-line comment — the configs are transcriptions, not API surface.)

- [ ] **Step 3: Build + visual check**

`npm run build` → PASS. Playwright: click "Analytics" tab, wait 1s for chart animation, screenshot. Verify: 5 charts actually painted (green area line, red/green bars, purple area line, blue area line, green/red doughnut), sub-tabs + metric cards + Top Gainers render. Then switch to another tab and back — charts must re-render without console errors (checks the destroy/re-create cycle).

- [ ] **Step 4: Commit**

```bash
git add src/components/site/prism-home/sections/feature-showcase/screens/AnalyticsScreen.tsx src/components/site/prism-home/sections/FeatureShowcase.tsx
git commit -m "feat(showcase-v3): live Analytics tab with 5 Chart.js charts"
```

---

### Task 9: Cleanup + full verification

**Files:**
- Delete: `src/assets/prism-feature-dashboard.png`, `prism-feature-screener.png`, `prism-feature-screens.png`, `prism-feature-analytics.png`, `prism-feature-news.png`
- Modify: `src/styles/prism-home.css` (remove dead `.prism-shelf*` rules)

- [ ] **Step 1: Confirm the PNGs and shelf classes are orphaned**

```bash
grep -rn "prism-feature" src/ --include="*.tsx" --include="*.ts"
grep -rn "prism-shelf" src/ --include="*.tsx" --include="*.ts" --include="*.css"
```

Expected: `prism-feature` → no hits (Task 2 removed the imports). `prism-shelf` → hits only inside `prism-home.css` itself.

- [ ] **Step 2: Delete the 5 PNGs and remove the `.prism-shelf`, `.prism-shelf__card`, `.prism-shelf__card--active`, `.prism-shelf__card--collapsed`, `.prism-shelf__title-vertical`, `.prism-shelf-mobile__card`, `.prism-shelf-mobile__header` rules (and the `/* feature showcase shelf */` comment) from `prism-home.css`**

- [ ] **Step 3: Full build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Full-page Playwright verification, desktop + mobile**

Desktop (1600×1000): screenshot the full homepage top-to-bottom (the showcase section plus its neighbors — confirm no layout bleed into Problem/EnterpriseArchitecture sections); cycle through all 6 tabs by clicking each and screenshotting. Wide desktop (1720×1000): confirm the floating captions appear beside the window card. Mobile (390×844, `isMobile: true, hasTouch: true`): confirm the tab rail scrolls horizontally, the sidebar is hidden, the content pane is usable, and no horizontal page overflow exists (`document.documentElement.scrollWidth <= window.innerWidth`).

- [ ] **Step 5: Commit**

```bash
git add -u src/assets src/styles/prism-home.css
git commit -m "chore(showcase-v3): remove orphaned static-PNG shelf assets and styles"
```

---

## Self-Review Notes

- **Spec coverage:** all six screens (Tasks 3–8), shell/autoplay/progress/captions/closing (Task 2), data + dependency (Task 1), stale-asset removal (Task 9). The gap report's per-screen findings are each addressed by their screen's task; the "wrong sub-tab" Analytics PNG and the Dashboard extra-column both disappear by construction (reference data is the only source).
- **Type consistency:** `ScreenData` union + narrowing switch defined in Task 1/2 and consumed identically in Tasks 3–8; helper names (`impactColors`, `headlineTagColors`, `screenCardTagColors`, `affectedColors`, `connectionColors`, `buildNav`, `Sparkline`) are declared once in Task 1 and referenced with the same names throughout.
- **Known intentional deviations from the reference (do not "fix" in review):** npm chart.js instead of CDN; mount/unmount chart lifecycle instead of `componentDidUpdate` + retry; keyframe renamed `prism-barfill`; no accentColor/typography theming; static countdown text in Calendar; CTA buttons wired to `cta-early-access-trigger`; captions hidden <1520px and sidebar hidden ≤900px (the design has no responsive spec).
