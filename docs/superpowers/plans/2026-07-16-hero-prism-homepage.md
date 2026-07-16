# Hero Prism Homepage Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current 9-page CryptoPrism marketing site with a single new homepage ported from the Claude Design import "CryptoPrism Hero.dc.html," with fabricated enterprise claims replaced by verified product facts.

**Architecture:** A new `src/components/site/prism-home/` component tree (its own visual system, `.prism-home` CSS scope, independent of the existing `.site-light` theme) replaces `HomePage.tsx`'s contents. `App.tsx` drops the 8 old page routes. The old page files (`ProductPage.tsx` etc.) and `site/shared.tsx`/`site/hooks.ts` are left untouched and orphaned, not deleted or modified in breaking ways, since orphaned pages still import from `shared.tsx`/`hooks.ts` and must keep compiling under `tsc -b`.

**Tech Stack:** React 19 + TypeScript + Vite, `motion/react` (already a dependency, used only if a task calls for it — most of this page uses CSS transitions/keyframes and raw Canvas2D, matching the source design), no new dependencies.

## Global Constraints

- **Source of truth for exact styling:** `docs/superpowers/specs/reference/2026-07-16-hero-prism-design-source.html` (861 lines, already committed). Every task below gives real, complete copy text, data values, and component logic — but for fine-grained one-off inline styling of decorative elements that carry over unchanged from the source (icon paths, exact px offsets, shadow values), match the cited line range in that file exactly rather than re-deriving values. Do not paraphrase copy or invent visual values not present in the source or explicitly corrected below.
- **Translation rules** (source `.dc.html` authoring format → real React):
  - `style="a: b; c: d"` → `style={{ a: 'b', c: 'd' }}` (camelCase props, e.g. `border-radius` → `borderRadius`).
  - `style-hover="a: b"` → a real CSS class in `prism-home.css` with a `:hover` rule (not inline, since HTML has no `style-hover` attribute).
  - `sc-if value="{{ x }}"` → `{x && (...)}` or a ternary.
  - `sc-for list="{{ items }}" as="i"` → `{items.map((i) => (...))}`.
  - `{{ expr }}` interpolation → a real JSX expression or prop value.
  - `ref="{{ x }}"` → a real `ref={x}` prop bound to a `useRef` in the parent.
  - `<x-import component-from-global-scope="image-slot" ... src="uploads/...">` → a plain `<img src={importedAsset} alt="..." />` once the asset is sourced into the repo (Task 8).
- **No fabricated claims:** every content fix from `docs/superpowers/specs/2026-07-16-hero-prism-homepage-design.md` §2 is mandatory and given verbatim in the relevant task below — do not restore the source's original SOC 2 / VPC / air-gap / SLA / 99.9%-uptime / "trusted by [clients]" wording anywhere.
- **CTA convention:** every CTA button gets `className="... cta-early-access-trigger"` (no `onClick` needed — `App.tsx` already delegates clicks on that class to open `EarlyAccessModal`, verified at `src/App.tsx:44-53`). Do not wire any new modal or state.
- **No test framework exists in this repo** (marketing site; zero test files anywhere, verified via repo inspection) — introducing one is out of scope for this feature. Each task's verification step is a concrete manual check: `npm run build` (typecheck + build) and a specific dev-server browser check. The final task runs full cross-viewport interaction QA before the branch is pushed.
- **Responsive strategy (900px breakpoint, `useIsMobile` hook from Task 2):** sections whose desktop layout is decorative absolute-positioned diagrams that cannot reflow (Hero's data-flow diagram, Problem's source-card cluster, BiasTax's comparison canvas) render a **different, simplified stacked JSX branch on mobile**, not a CSS reflow of the same markup. Sections that are plain CSS grids (EnterpriseArchitecture, InstitutionalTrust, FinalCtaFaq) just get a media-query column-count change. This is spelled out per-task below.
- **Old page files are not modified.** Do not edit `src/components/site/shared.tsx`, `src/components/site/hooks.ts`, or any of `ProductPage.tsx`/`IntelligencePage.tsx`/`ComparePage.tsx`/`PricingPage.tsx`/`InstitutionalPage.tsx`/`EvidencePage.tsx`/`AboutPage.tsx`/`InvitePage.tsx` — they must keep compiling standalone under `tsc -b` even though nothing imports them after Task 3.

---

## Task 1: Global styles and fonts scaffold

**Files:**
- Modify: `index.html`
- Create: `src/styles/prism-home.css`

**Interfaces:**
- Produces: CSS custom properties and classes under the `.prism-home` scope (`--prism-*` tokens, `.prism-wrap`, `.prism-pill`, `.prism-btn-primary`, `.prism-btn-ghost`, `.prism-btn-gradient`, `.prism-btn-dark-outline`, `.prism-card`, `.prism-grad-text`, `.prism-nav*`, `prism-card-float` keyframe) that every later task's components rely on by class name.

- [ ] **Step 1: Add Inter weight 800 to the Google Fonts link and update page metadata**

In `index.html`, the design headlines need Inter at weight 800, which isn't currently loaded (only 400–700 are). Replace the Inter font link (currently `Inter:wght@400;500;600;700`) and the title/meta description/og tags to describe the new homepage instead of the old "One Terminal, Every Signal" copy:

```html
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800;900&family=Manrope:wght@600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap"
    rel="stylesheet" />
```

And update these existing tags:

```html
  <meta name="theme-color" content="#FAFAF8" />
  <meta name="description"
    content="CryptoPrism transforms fragmented financial data into explainable investment intelligence using AI-powered reasoning, quantitative models, and autonomous research agents. Now in private beta." />
  <title>CryptoPrism — AI-Native Financial Intelligence for Modern Markets</title>
  <meta property="og:title" content="CryptoPrism — AI-Native Financial Intelligence for Modern Markets" />
  <meta property="og:description"
    content="CryptoPrism transforms fragmented financial data into explainable investment intelligence using AI-powered reasoning, quantitative models, and autonomous research agents." />
```

Leave the `Material Symbols` font link, `og:url`, `og:image`/`twitter:image`, and `canonical` tags untouched.

- [ ] **Step 2: Create `src/styles/prism-home.css`**

```css
/* Prism Home — homepage rebuilt from the Claude Design import "CryptoPrism Hero.dc.html".
   Independent visual system from .site-light (see docs/superpowers/specs/2026-07-16-hero-prism-homepage-design.md §6) —
   not merged with the old theme tokens since this page replaces the pages that used them. */
.prism-home {
  --prism-bg: #FAFAF8;
  --prism-green: #0FAE72;
  --prism-teal: #0B8D84;
  --prism-ink: #0B1220;
  --prism-text: #475467;
  --prism-text-dim: #98A2B3;
  --prism-border: #E7E9EC;
  --prism-dark-bg: #0B1220;
  --prism-darker-bg: #050B14;
  --prism-dark-text-dim: #8B96A5;
  --prism-dark-text-dimmer: #9AA5B1;
  --prism-mint: #7FE0BE;
  --prism-emerald-mint: #34D399;

  background: var(--prism-bg);
  color: var(--prism-ink);
  font-family: 'Inter', -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  position: relative;
  overflow-x: hidden;
}
.prism-home h1, .prism-home h2, .prism-home h3 { font-family: 'Inter', sans-serif; font-weight: 800; letter-spacing: -0.02em; margin: 0; }
.prism-home a { color: inherit; text-decoration: none; }
.prism-home button { font-family: inherit; }

.prism-wrap { max-width: 1560px; margin: 0 auto; padding: 0 44px; box-sizing: border-box; }
@media (max-width: 900px) { .prism-wrap { padding: 0 20px; } }

.prism-grad-text {
  background: linear-gradient(120deg, var(--prism-green) 20%, var(--prism-teal) 85%);
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
}

.prism-pill { display: inline-flex; align-items: center; gap: 8px; border: 1px solid rgba(15,174,114,0.35); background: #FFFFFF; border-radius: 999px; padding: 7px 16px; font-size: 11.5px; font-weight: 600; letter-spacing: 0.12em; color: var(--prism-teal); }
.prism-pill__dot { width: 7px; height: 7px; border-radius: 50%; background: var(--prism-green); display: inline-block; flex: none; }

.prism-btn-primary { display: inline-flex; align-items: center; gap: 10px; font-family: inherit; font-size: 15px; font-weight: 600; color: #FFFFFF; background: #0B1220; border: none; border-radius: 16px; padding: 16px 28px; cursor: pointer; box-shadow: 0 14px 34px rgba(11,18,32,0.16); transition: all 0.25s ease; }
.prism-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 20px 40px rgba(11,18,32,0.22); }
.prism-btn-ghost { display: inline-flex; align-items: center; gap: 11px; font-family: inherit; font-size: 15px; font-weight: 600; color: var(--prism-ink); background: #FFFFFF; border: 1px solid var(--prism-border); border-radius: 16px; padding: 15px 24px; cursor: pointer; box-shadow: 0 6px 18px rgba(11,18,32,0.05); transition: all 0.25s ease; }
.prism-btn-ghost:hover { transform: translateY(-2px); box-shadow: 0 12px 26px rgba(11,18,32,0.09); }
.prism-btn-gradient { display: inline-flex; align-items: center; gap: 10px; font-family: inherit; font-size: 15.5px; font-weight: 600; color: #FFFFFF; background: linear-gradient(135deg, #0FAE72, #0B8D84); border: none; border-radius: 14px; padding: 14px 26px; cursor: pointer; }
.prism-btn-dark-outline { display: inline-flex; align-items: center; gap: 10px; font-family: inherit; font-size: 15.5px; font-weight: 600; color: #FFFFFF; background: transparent; border: 1px solid rgba(255,255,255,0.22); border-radius: 14px; padding: 13px 24px; cursor: pointer; white-space: nowrap; }
.prism-btn-dark-outline:hover, .prism-btn-primary-sm:hover { opacity: 0.9; }

.prism-card { background: #FFFFFF; border: 1px solid var(--prism-border); border-radius: 22px; box-shadow: 0 10px 30px rgba(11,18,32,0.05); }

@keyframes prism-card-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
@media (prefers-reduced-motion: reduce) { .prism-home *, .prism-home *::before, .prism-home *::after { animation: none !important; } }

/* nav */
.prism-nav { display: flex; align-items: center; justify-content: space-between; height: 76px; padding: 0 44px; background: #FFFFFF; border-bottom: 1px solid var(--prism-border); position: sticky; top: 0; z-index: 10; }
.prism-nav__brand { display: flex; align-items: center; gap: 10px; }
.prism-nav__wordmark { font-size: 19px; font-weight: 800; letter-spacing: -0.02em; }
.prism-nav__links { display: flex; align-items: center; gap: 34px; font-size: 14.5px; font-weight: 500; color: var(--prism-text); }
.prism-nav__links a { transition: color 0.2s; cursor: pointer; }
.prism-nav__links a:hover { color: var(--prism-ink); }
.prism-nav .prism-btn-primary { padding: 11px 22px; font-size: 14.5px; border-radius: 16px; background: linear-gradient(135deg, #0FAE72, #0B8D84); box-shadow: 0 8px 24px rgba(15,174,114,0.22); }
@media (max-width: 768px) {
  .prism-nav { padding: 0 20px; }
  .prism-nav__links { display: none; }
}

/* shared responsive grid helpers used by later sections */
.prism-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
.prism-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media (max-width: 900px) {
  .prism-grid-3 { grid-template-columns: 1fr !important; }
  .prism-grid-2 { grid-template-columns: 1fr !important; }
  .prism-hide-mobile { display: none !important; }
}
.prism-show-mobile { display: none; }
@media (max-width: 900px) { .prism-show-mobile { display: block; } }
```

- [ ] **Step 3: Verify**

Run `npm run build`. Expected: succeeds (this step only adds a stylesheet nothing imports yet and edits `index.html` text, so there's nothing to visually check beyond the build passing).

- [ ] **Step 4: Commit**

```bash
git add index.html src/styles/prism-home.css
git commit -m "feat: add prism-home stylesheet scaffold and update site metadata"
```

---

## Task 2: `useIsMobile` hook

**Files:**
- Create: `src/components/site/prism-home/hooks.ts`

**Interfaces:**
- Produces: `useIsMobile(breakpoint = 900): boolean` — used by Hero, Problem, BiasTax, FeatureShowcase (Tasks 4, 6, 7, 9) to branch between desktop absolute-diagram layouts and simplified mobile layouts.

- [ ] **Step 1: Write the hook**

```ts
import { useEffect, useState } from 'react';

/** True at or below the mobile breakpoint used throughout the prism-home page.
 * Sections with absolutely-positioned decorative diagrams that can't reflow
 * (Hero's data-flow diagram, Problem's source cards, BiasTax's comparison
 * canvas) branch to a simplified stacked layout below this width instead of
 * trying to CSS-reflow fixed pixel coordinates. */
export function useIsMobile(breakpoint = 900): boolean {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= breakpoint,
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [breakpoint]);
  return isMobile;
}
```

- [ ] **Step 2: Verify**

Run `npm run build`. Expected: succeeds. (This hook has no visual output by itself — it's exercised for real in Task 4 when Hero consumes it; that task's verification includes resizing the browser below 900px.)

- [ ] **Step 3: Commit**

```bash
git add src/components/site/prism-home/hooks.ts
git commit -m "feat: add useIsMobile hook for prism-home responsive sections"
```

---

## Task 3: Replace HomePage with the Prism Home scaffold, cut over routing

**Files:**
- Create: `src/components/site/prism-home/PrismHome.tsx`
- Create: `src/components/site/prism-home/Nav.tsx`
- Modify: `src/components/site/HomePage.tsx` (replace entire content)
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `scrollToId` from `../hooks` (`src/components/site/hooks.ts:77-79`, already exists — used for in-page anchor scrolling).
- Produces: `PrismHome()` component and default export, mounted as `HomePage` for every non-deck/non-brandkit route. Later tasks import from `./PrismHome` and edit it to add sections.

- [ ] **Step 1: Write `Nav.tsx`**

Minimal nav per spec §3: logo + 3 in-page anchor links to sections that exist on this page + one CTA. No Products dropdown / Enterprise-as-nav-item / Research / Blog / Sign In (none map to anything real post-collapse).

```tsx
import { scrollToId } from '../hooks';

export function Nav() {
  return (
    <nav className="prism-nav">
      <div className="prism-nav__brand">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
          <path d="M15 2.5 25.8 8.75v12.5L15 27.5 4.2 21.25V8.75Z" stroke="#0FAE72" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M15 10.5 19 17h-8Z" stroke="#0B8D84" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        <span className="prism-nav__wordmark">CryptoPrism<span style={{ color: '#0FAE72' }}>.</span></span>
      </div>
      <div className="prism-nav__links">
        <a onClick={() => scrollToId('prism-platform')}>Platform</a>
        <a onClick={() => scrollToId('prism-enterprise')}>Enterprise</a>
        <a onClick={() => scrollToId('prism-faq')}>FAQ</a>
      </div>
      <a href="#" className="prism-btn-primary cta-early-access-trigger">Request Early Access</a>
    </nav>
  );
}
```

(`prism-platform` is the id Task 9's `FeatureShowcase` section root will carry, `prism-enterprise` is Task 10's `EnterpriseArchitecture` section root, `prism-faq` is Task 12's `FinalCtaFaq` section root — added when those tasks create those sections.)

- [ ] **Step 2: Write the initial `PrismHome.tsx` scaffold**

```tsx
import '../../../styles/prism-home.css';
import { Nav } from './Nav';

export function PrismHome() {
  return (
    <div className="prism-home">
      <Nav />
      <main />
    </div>
  );
}

export default PrismHome;
```

- [ ] **Step 3: Replace `HomePage.tsx`**

```tsx
export { PrismHome as HomePage, PrismHome as default } from './prism-home/PrismHome';
```

- [ ] **Step 4: Simplify `App.tsx` routing**

In `src/App.tsx`, remove the 8 lazy site-page imports (currently lines 5-12: `ProductPage` through `InvitePage`) — leave the pitch-deck and `BrandKit` lazy imports untouched. Remove the `siteFallback`, `siteRoutes` map, and `SiteComponent` lookup, and simplify the final render to always mount `HomePage` for any route that isn't a deck route or `#/brandkit`:

```tsx
  return (
    <div className="relative">
      <HomePage />
      <EarlyAccessModal open={earlyAccessOpen} onClose={() => setEarlyAccessOpen(false)} />
    </div>
  );
```

The `Suspense` import stays (still used by the deck/brandkit routes above this block). Old URLs like `#/product` or `#/pricing` now simply render the new homepage instead of 404ing — this is the intended "collapse to one page" behavior per the approved spec; the page files themselves are untouched on disk.

- [ ] **Step 5: Verify**

Run `npm run build` — expected: succeeds, including the now-unimported `ProductPage.tsx`/etc. still type-checking cleanly on their own (confirms Step 4 didn't touch `shared.tsx`/`hooks.ts` in a breaking way).

Run `npm run dev`, open `http://localhost:5173/#/`. Expected: white nav bar with the prism logo, "CryptoPrism." wordmark, "Platform / Enterprise / FAQ" links (they won't scroll anywhere yet — that's fine, their targets don't exist until later tasks), and a "Request Early Access" button that opens the early-access modal when clicked. Below the nav, the page is blank (empty `<main>`) — expected at this stage. Visit `http://localhost:5173/#/product` and confirm it now renders the same nav + blank homepage rather than the old Product page.

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx src/components/site/HomePage.tsx src/components/site/prism-home/PrismHome.tsx src/components/site/prism-home/Nav.tsx
git commit -m "feat: cut homepage over to the new prism-home scaffold, drop old page routes"
```

---

## Task 4: Hero section and the 3D canvas prism

**Files:**
- Create: `src/components/site/prism-home/PrismCanvas.tsx`
- Create: `src/components/site/prism-home/sections/Hero.tsx`
- Modify: `src/components/site/prism-home/PrismHome.tsx`
- Modify: `src/styles/prism-home.css` (append)

**Interfaces:**
- Consumes: `useIsMobile` from `../hooks` (Task 2).
- Produces: `PrismCanvas({ heroAnchor, problemAnchor, biasTaxAnchor, rotationSpeed?, particleDensity? })` — a positioned `<canvas>` that renders a rotating pseudo-3D crystal and (once `problemAnchor`/`biasTaxAnchor` resolve to real elements in later tasks) travels between the three anchor points on scroll. `Hero({ heroAnchorRef })` — renders the hero section including the anchor div `PrismCanvas` measures against.

This is a direct, careful port of the source's `componentDidMount`/`measure`/`draw`/`renderPrism` logic (reference lines 659-857) from the source's class-component style into React hooks — this codebase has no class components anywhere, so this keeps it consistent. One documented fix: the source's `draw()` computes a `shatter` value and passes it as an 8th argument to `renderPrism(ctx, t, speed, CX0, CY0, S, nMax)`, whose signature only declares 7 parameters — `shatter` was never actually read inside `renderPrism`, so it's dropped here rather than ported as dead code (flagged in the design spec §5).

- [ ] **Step 1: Write `PrismCanvas.tsx`**

```tsx
import { useEffect, useRef, type RefObject } from 'react';

type Anchor = { left: number; top: number; w: number; h: number };
type Particle = { off: number; a0: number; av: number; vy: number; rf: number; s: number; em: boolean; tw: number };
type Face = { v: [number, number, number][]; a: number; p: [number, number, number][]; z: number; cross: number; shade: number };

function makeParticles(n: number): Particle[] {
  const pts: Particle[] = [];
  for (let i = 0; i < n; i++) {
    pts.push({
      off: Math.random() * 1.95,
      a0: Math.random() * Math.PI * 2,
      av: 0.15 + Math.random() * 0.5,
      vy: 0.5 + Math.random() * 1.1,
      rf: Math.pow(Math.random(), 1.6),
      s: 0.8 + Math.random() * 1.2,
      em: Math.random() < 0.14,
      tw: Math.random() * Math.PI * 2,
    });
  }
  return pts;
}

function renderPrism(ctx: CanvasRenderingContext2D, t: number, speed: number, CX0: number, CY0: number, S: number, pts: Particle[]) {
  const k = S / 112;
  const rot = t * 0.12 * speed;
  const bob = Math.sin(t * 0.45) * 4 * k;
  const tilt = -0.16, CX = CX0, CY = CY0 + bob, F = 4.2;
  const cr = Math.cos(rot), sr = Math.sin(rot), ct = Math.cos(tilt), st = Math.sin(tilt);
  const proj = (x: number, y: number, z: number): [number, number, number] => {
    const X = x * cr + z * sr, Z0 = -x * sr + z * cr;
    const Y = y * ct - Z0 * st, Z = y * st + Z0 * ct;
    const kk = F / (F + Z);
    return [CX + X * kk * S, CY + Y * kk * S, Z];
  };

  const apex: [number, number, number] = [0, -1.52, 0];
  const bot: [number, number, number] = [0, 0.92, 0];
  const ring: [number, number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const a = i * Math.PI / 3;
    ring.push([Math.cos(a), 0.52, Math.sin(a)]);
  }
  const faces: Face[] = [];
  for (let i = 0; i < 6; i++) {
    const r1 = ring[i], r2 = ring[(i + 1) % 6];
    faces.push({ v: [apex, r1, r2], a: i * Math.PI / 3 } as Face);
    faces.push({ v: [bot, r2, r1], a: i * Math.PI / 3 } as Face);
  }
  for (const f of faces) {
    f.p = f.v.map((v) => proj(v[0], v[1], v[2]));
    f.z = (f.p[0][2] + f.p[1][2] + f.p[2][2]) / 3;
    const [p0, p1, p2] = f.p;
    f.cross = (p1[0] - p0[0]) * (p2[1] - p0[1]) - (p1[1] - p0[1]) * (p2[0] - p0[0]);
    f.shade = 0.5 + 0.5 * Math.sin(f.a + rot + 1.2);
  }
  faces.sort((a, b) => b.z - a.z);
  const backF = faces.filter((f) => f.cross >= 0), frontF = faces.filter((f) => f.cross < 0);

  const groundY = CY0 + 0.92 * ct * S + 24 * k;
  ctx.save();
  ctx.translate(CX, groundY);
  ctx.scale(1, 0.16);
  let g = ctx.createRadialGradient(0, 0, 8 * k, 0, 0, 130 * k);
  g.addColorStop(0, 'rgba(11,18,32,0.13)');
  g.addColorStop(1, 'rgba(11,18,32,0)');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(0, 0, 130 * k, 0, Math.PI * 2); ctx.fill();
  g = ctx.createRadialGradient(0, 0, 4 * k, 0, 0, 75 * k);
  g.addColorStop(0, 'rgba(15,174,114,0.22)');
  g.addColorStop(1, 'rgba(15,174,114,0)');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(0, 0, 75 * k, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  const drawFace = (f: Face, front: boolean) => {
    ctx.beginPath();
    ctx.moveTo(f.p[0][0], f.p[0][1]);
    ctx.lineTo(f.p[1][0], f.p[1][1]);
    ctx.lineTo(f.p[2][0], f.p[2][1]);
    ctx.closePath();
    const mx = (f.p[1][0] + f.p[2][0]) / 2, my = (f.p[1][1] + f.p[2][1]) / 2;
    const gr = ctx.createLinearGradient(f.p[0][0], f.p[0][1], mx, my);
    gr.addColorStop(0, `rgba(255,255,255,${front ? 0.30 : 0.10})`);
    gr.addColorStop(1, `rgba(15,174,114,${(front ? 0.15 : 0.05) * f.shade + 0.03})`);
    ctx.fillStyle = gr;
    ctx.fill();
    ctx.strokeStyle = front ? `rgba(158,214,196,${0.55 + 0.35 * f.shade})` : 'rgba(160,205,195,0.30)';
    ctx.lineWidth = 1;
    ctx.stroke();
  };
  backF.forEach((f) => drawFace(f, false));

  g = ctx.createRadialGradient(CX, CY + 12 * k, 4 * k, CX, CY + 12 * k, 95 * k);
  g.addColorStop(0, 'rgba(70,220,165,0.32)');
  g.addColorStop(0.5, 'rgba(15,174,114,0.13)');
  g.addColorStop(1, 'rgba(15,174,114,0)');
  ctx.fillStyle = g;
  ctx.fillRect(CX - 100 * k, CY - 90 * k, 200 * k, 210 * k);

  for (const p of pts) {
    const y = 0.5 - ((p.off + t * 0.045 * p.vy) % 1.95);
    const maxR = Math.max(0, (y + 1.52) / 2.04) * 0.92;
    const ang = p.a0 + t * p.av * 0.35 * (speed * 0.6 + 0.4);
    const r = p.rf * maxR;
    const [sx, sy, zz] = proj(Math.cos(ang) * r, y, Math.sin(ang) * r);
    const al = (0.22 + 0.5 * Math.abs(Math.sin(t * 0.4 + p.tw))) * (zz > 0 ? 0.5 : 1);
    ctx.fillStyle = p.em ? `rgba(80,225,170,${al})` : `rgba(255,255,255,${al})`;
    const ps = Math.max(0.7, p.s * k);
    ctx.fillRect(sx, sy, ps, ps);
  }

  frontF.forEach((f) => drawFace(f, true));

  const ap = proj(0, -1.52, 0);
  g = ctx.createRadialGradient(ap[0], ap[1], 0, ap[0], ap[1], 16 * k);
  g.addColorStop(0, 'rgba(255,255,255,0.85)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(ap[0] - 16 * k, ap[1] - 16 * k, 32 * k, 32 * k);
}

export function PrismCanvas({
  heroAnchor, problemAnchor, biasTaxAnchor, rotationSpeed = 1, particleDensity = 700,
}: {
  heroAnchor: RefObject<HTMLDivElement | null>;
  problemAnchor: RefObject<HTMLDivElement | null>;
  biasTaxAnchor: RefObject<HTMLDivElement | null>;
  rotationSpeed?: number;
  particleDensity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = 360, H = 440, bs = dpr * 1.3;
    cv.width = W * bs; cv.height = H * bs;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    let pts = makeParticles(particleDensity);
    const t0 = performance.now();
    let frame = 0;
    let raf = 0;

    const rectOf = (el: HTMLElement): Anchor => {
      const r = el.getBoundingClientRect();
      return { left: r.left + window.scrollX, top: r.top + window.scrollY, w: r.width, h: r.height };
    };

    let rA: Anchor | null = null, rB: Anchor | null = null, rC: Anchor | null = null;
    const measure = () => {
      if (heroAnchor.current) rA = rectOf(heroAnchor.current);
      if (problemAnchor.current) rB = rectOf(problemAnchor.current);
      if (biasTaxAnchor.current) rC = rectOf(biasTaxAnchor.current);
    };
    measure();
    window.addEventListener('resize', measure);

    const draw = () => {
      if (pts.length !== Math.round(particleDensity)) pts = makeParticles(Math.round(particleDensity));
      const t = (performance.now() - t0) / 1000;

      if (frame++ % 45 === 0) measure();
      if (rA && rB) {
        const vh = window.innerHeight, sy = window.scrollY;
        const legs: [Anchor, Anchor][] = rC ? [[rA, rB], [rB, rC]] : [[rA, rB]];
        const bounds = legs.map(([p, q]) => ({
          start: p.top + p.h / 2 - vh * 0.55,
          end: q.top + q.h / 2 - vh * 0.52,
        }));
        let legIdx = bounds.length - 1;
        for (let i = 0; i < bounds.length; i++) { if (sy < bounds[i].end) { legIdx = i; break; } }
        const [pA, pB] = legs[legIdx], b = bounds[legIdx];
        const p = Math.max(0, Math.min(1, (sy - b.start) / Math.max(1, b.end - b.start)));
        const e2 = p * p * (3 - 2 * p);
        const scA = pA.w / W, scB = pB.w / W;
        const sc = scA + (scB - scA) * e2;
        const cxA = pA.left + pA.w / 2, cyA = pA.top + pA.h / 2;
        const cxB = pB.left + pB.w / 2, cyB = pB.top + pB.h / 2;
        const cx = cxA + (cxB - cxA) * e2, cy = cyA + (cyB - cyA) * e2;
        cv.style.left = (cx - W * sc / 2) + 'px';
        cv.style.top = (cy - H * sc / 2) + 'px';
        cv.style.width = (W * sc) + 'px';
        cv.style.height = (H * sc) + 'px';
      }

      ctx.setTransform(bs, 0, 0, bs, 0, 0);
      ctx.clearRect(0, 0, W, H);
      renderPrism(ctx, t, rotationSpeed, 180, 242, 112, pts);
    };

    if (reduce) {
      draw();
    } else {
      const loop = () => { draw(); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
    };
  }, [heroAnchor, problemAnchor, biasTaxAnchor, rotationSpeed, particleDensity]);

  return (
    <canvas
      ref={canvasRef}
      width={720}
      height={880}
      style={{ position: 'absolute', left: 0, top: 0, width: 360, height: 440, zIndex: 3, pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
```

- [ ] **Step 2: Write `sections/Hero.tsx`**

Full copy verbatim from reference lines 44-145, with the two CTAs relabeled per spec §3 and both wired to the modal, and the elaborate data-flow diagram + engine label hidden on mobile (`useIsMobile`) since it's an absolutely-positioned decorative SVG that can't reflow.

```tsx
import type { RefObject } from 'react';
import { useIsMobile } from '../hooks';

const SOURCE_BADGES = [
  { label: 'News', d: 'M5 2.5h7l3.5 3.5v11.5H5z M12 2.5V6h3.5 M7.5 10h5 M7.5 13h5' },
  { label: 'On-chain Data', d: 'M10 2.5 16 6v8l-6 3.5L4 14V6z M10 9.8V17.5 M4 6l6 3.8 6-3.8' },
  { label: 'Macro', d: 'M10 10a7.5 7.5 0 1 1 0 0Z M2.5 10h15 M10 2.5c-2.5 2.2-2.5 12.8 0 15 M10 2.5c2.5 2.2 2.5 12.8 0 15' },
  { label: 'Sentiment', d: 'M10 10a7.5 7.5 0 1 1 0 0Z M7 8h.01 M13 8h.01 M6.8 12c.9 1.1 2 1.7 3.2 1.7s2.3-.6 3.2-1.7' },
  { label: 'Exchange Data', d: 'M4 16.5V10 M8 16.5V6 M12 16.5V8.5 M16 16.5V4' },
  { label: 'Developer Activity', d: 'M7 6.5 3.5 10 7 13.5 M13 6.5 16.5 10 13 13.5' },
  { label: 'ETF Flows', d: 'M10 2.5a7.5 7.5 0 1 0 7.5 7.5H10z M12.5 2.9a7.5 7.5 0 0 1 4.6 4.6h-4.6z' },
  { label: 'Economic Calendar', d: 'M2.5 4.5h15v13h-15z M6.5 2.5v4 M13.5 2.5v4 M2.5 9h15' },
];

// per-badge curve endpoints and animation timings — reference lines 71-89
const FLOW_PATHS = [
  { y1: 43, y2: 232, dur: 8.5, begin: -0.4 },
  { y1: 99, y2: 246, dur: 9.2, begin: -1.6 },
  { y1: 155, y2: 260, dur: 8.1, begin: -2.9 },
  { y1: 211, y2: 274, dur: 9.6, begin: -4.1 },
  { y1: 267, y2: 288, dur: 8.8, begin: -5.3 },
  { y1: 323, y2: 302, dur: 9.4, begin: -6.5 },
  { y1: 379, y2: 316, dur: 8.3, begin: -7.7 },
  { y1: 435, y2: 330, dur: 9.0, begin: -8.9 },
];

const TRUST_ROW = ['No credit card', 'Private Beta', 'Enterprise Ready'];

const RESULT_CARDS = [
  {
    color: '#0FAE72', title: 'High Conviction Signal', delay: '0s', duration: '9s',
    body: (
      <>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 14 }}>
          <span style={{ fontSize: 19, fontWeight: 700, color: '#0B1220' }}>Bitcoin</span>
          <span style={{ fontSize: 24, fontWeight: 800, color: '#0FAE72' }}>97%</span>
        </div>
        <div style={{ fontSize: 12, color: '#98A2B3', marginTop: 2 }}>Confidence</div>
        <ul style={{ listStyle: 'none', margin: '14px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 7, fontSize: 13, color: '#475467' }}>
          <li>Strong ETF inflows</li>
          <li>Positive macro</li>
          <li>Developer momentum</li>
        </ul>
      </>
    ),
  },
  {
    color: '#D97706', title: 'Risk Alert', delay: '1.8s', duration: '11s',
    body: (
      <>
        <div style={{ fontSize: 19, fontWeight: 700, color: '#0B1220', marginTop: 14 }}>ETH</div>
        <ul style={{ listStyle: 'none', margin: '16px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 7, fontSize: 13, color: '#475467' }}>
          <li>Funding elevated</li>
          <li>Volatility increasing</li>
        </ul>
      </>
    ),
  },
  {
    color: '#7C3AED', title: 'Research Summary', delay: '3.5s', duration: '10s',
    body: (
      <ul style={{ listStyle: 'none', margin: '16px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 7, fontSize: 13, color: '#475467' }}>
        <li>Generated in 8 seconds</li>
        <li>Explainable</li>
        <li>Sources verified</li>
      </ul>
    ),
  },
];

export function Hero({ anchorRef }: { anchorRef: RefObject<HTMLDivElement | null> }) {
  const isMobile = useIsMobile();

  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'radial-gradient(1100px 700px at 68% 30%, rgba(15,174,114,0.05), rgba(250,250,248,0) 70%), #FAFAF8' }}>
      <div className="prism-wrap" style={{ position: 'relative', padding: '72px 0 56px', display: 'flex', gap: 56, alignItems: 'center', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
        <div style={{ flex: isMobile ? '1 1 100%' : '0 0 44%', maxWidth: isMobile ? '100%' : 640 }}>
          <div className="prism-pill"><span className="prism-pill__dot" />Now in Private Beta</div>
          <h1 style={{ margin: '28px 0 0', fontSize: isMobile ? 44 : 78, fontWeight: 800, lineHeight: 0.98, letterSpacing: '-0.02em', color: '#0B1220' }}>
            AI-Native Financial Intelligence for <span className="prism-grad-text">Modern Markets.</span>
          </h1>
          <p style={{ margin: '30px 0 0', fontSize: 22, fontWeight: 400, lineHeight: 1.45, color: '#475467' }}>
            Starting with digital assets.<br />Expanding across global financial markets.
          </p>
          <p style={{ margin: '22px 0 0', maxWidth: 560, fontSize: 16.5, lineHeight: 1.6, color: '#475467' }}>
            CryptoPrism transforms fragmented financial data into explainable investment intelligence using AI-powered reasoning, quantitative models, and autonomous research agents.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 28, marginTop: 26 }}>
            {TRUST_ROW.map((label) => (
              <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 500, color: '#475467' }}>
                <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke="#0FAE72" strokeWidth="1.5" /><path d="M6.8 10.2l2.1 2.1 4.3-4.5" stroke="#0FAE72" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                {label}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, marginTop: 34 }}>
            <button className="prism-btn-primary cta-early-access-trigger">
              Request Early Access
              <svg width="16" height="14" viewBox="0 0 16 14" fill="none"><path d="M1 7h13M9.5 1.8 14.7 7l-5.2 5.2" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button className="prism-btn-ghost cta-early-access-trigger">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8.5" stroke="#0B1220" strokeWidth="1.5" /><path d="M8.3 7.2v5.6L12.8 10Z" fill="#0B1220" /></svg>
              Request a Demo
            </button>
          </div>
        </div>

        {!isMobile && (
          <div style={{ flex: 1, minWidth: 790 }}>
            <div style={{ position: 'relative', width: 790, height: 505 }}>
              <svg width="790" height="505" viewBox="0 0 790 505" fill="none" style={{ position: 'absolute', inset: 0 }}>
                {FLOW_PATHS.map((p, i) => (
                  <g key={i}>
                    <path d={`M180,${p.y1} C310,${p.y1} 300,${p.y2} 404,${p.y2}`} stroke="rgba(15,174,114,0.26)" strokeWidth={1} />
                    <circle cx={180} cy={p.y1} r={3} fill="#0FAE72" />
                    <circle r={2.4} fill="#0FAE72" opacity={0.9}>
                      <animateMotion dur={`${p.dur}s`} begin={`${p.begin}s`} repeatCount="indefinite" path={`M180,${p.y1} C310,${p.y1} 300,${p.y2} 404,${p.y2}`} />
                    </circle>
                  </g>
                ))}
              </svg>

              <div style={{ position: 'absolute', left: 0, top: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {SOURCE_BADGES.map((b) => (
                  <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 10, width: 176, height: 46, boxSizing: 'border-box', padding: '0 14px', background: '#FFFFFF', border: '1px solid #E7E9EC', borderRadius: 12, boxShadow: '0 4px 14px rgba(11,18,32,0.04)', fontSize: 13, fontWeight: 500, color: '#0B1220' }}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#475467" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={b.d} /></svg>
                    {b.label}
                  </div>
                ))}
              </div>

              <div ref={anchorRef} style={{ position: 'absolute', left: 250, top: 30, width: 360, height: 440 }} />

              <div style={{ position: 'absolute', left: 622, top: 215, width: 168 }}>
                <div style={{ fontSize: 21, fontWeight: 700, letterSpacing: '-0.015em', color: '#0B1220', lineHeight: 1.25 }}>CryptoPrism<br />Intelligence Engine</div>
                <div style={{ width: 40, height: 1, background: '#E7E9EC', margin: '14px 0' }} />
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', color: '#98A2B3', fontFamily: "'SF Mono', 'Menlo', monospace" }}>AI MODELS &middot; AGENTS &middot; REASONING</div>
              </div>
            </div>
          </div>
        )}

        {isMobile && <div ref={anchorRef} style={{ position: 'absolute', left: '50%', top: 0, width: 200, height: 240, transform: 'translateX(-50%)', pointerEvents: 'none' }} />}

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: 20, marginTop: 10, width: '100%' }}>
          {RESULT_CARDS.map((c) => (
            <div key={c.title} className="prism-card" style={{ padding: '22px 24px', animation: `prism-card-float ${c.duration} ease-in-out ${c.delay} infinite` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 14, fontWeight: 600, color: c.color }}>{c.title}</div>
              {c.body}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

(The `<div ref={anchorRef}>` mobile fallback keeps `PrismCanvas`'s `heroAnchor` measurement pointing at a stable, harmless off-flow spot — it's `pointerEvents: 'none'` and produces no visible box; the canvas itself still renders behind the hero copy on mobile since `zIndex: 3` and `pointerEvents: 'none'` make it non-obstructive. This is a deliberate simplification, not a bug: the elaborate desktop data-flow diagram is decorative and not reproduced on mobile.)

- [ ] **Step 3: Wire both into `PrismHome.tsx`**

```tsx
import '../../../styles/prism-home.css';
import { useRef } from 'react';
import { Nav } from './Nav';
import { PrismCanvas } from './PrismCanvas';
import { Hero } from './sections/Hero';

export function PrismHome() {
  const heroAnchor = useRef<HTMLDivElement>(null);
  const problemAnchor = useRef<HTMLDivElement>(null);
  const biasTaxAnchor = useRef<HTMLDivElement>(null);

  return (
    <div className="prism-home">
      <PrismCanvas heroAnchor={heroAnchor} problemAnchor={problemAnchor} biasTaxAnchor={biasTaxAnchor} />
      <Nav />
      <main>
        <Hero anchorRef={heroAnchor} />
      </main>
    </div>
  );
}

export default PrismHome;
```

- [ ] **Step 4: Verify**

Run `npm run build` — expected: succeeds. Run `npm run dev`, open `http://localhost:5173/#/`. Expected: hero renders with headline/subhead/body copy, trust row, both CTAs (clicking either opens the early-access modal), the data-flow diagram with 8 labeled source badges and moving dots, and a rotating faceted crystal positioned inside the diagram roughly where the anchor div sits. Resize the window below 900px width: the data-flow diagram and engine label disappear, the layout stacks to one column, headline shrinks, and the 3 result cards stack vertically — the crystal should still render somewhere on the page without throwing console errors (it may sit off to the side; full mobile prism placement isn't the target, not obstructing content is). Enable "prefers reduced motion" in OS/browser settings and reload: the crystal should render once, statically, without animating.

- [ ] **Step 5: Commit**

```bash
git add src/components/site/prism-home/PrismCanvas.tsx src/components/site/prism-home/sections/Hero.tsx src/components/site/prism-home/PrismHome.tsx
git commit -m "feat: add hero section and the animated canvas prism"
```

---

## Task 5: Trust Bar section (reworded)

**Files:**
- Create: `src/components/site/prism-home/sections/TrustBar.tsx`
- Modify: `src/components/site/prism-home/PrismHome.tsx`

**Interfaces:**
- Produces: `TrustBar()` — no props.

- [ ] **Step 1: Write `TrustBar.tsx`**

Reference lines 146-162, with the heading reworded per spec §2 ("Trusted by builders..." implies existing clients that don't exist at private-beta stage → "Built for..."):

```tsx
const CATEGORIES = ['Funds', 'Trading Firms', 'Fintechs', 'Research Teams', 'APIs'];

export function TrustBar() {
  return (
    <section style={{ padding: '36px 0', background: '#FFFFFF', borderBottom: '1px solid #E7E9EC' }}>
      <div className="prism-wrap">
        <div style={{ textAlign: 'center', fontSize: 13, fontWeight: 600, color: '#98A2B3', letterSpacing: '0.02em', marginBottom: 22 }}>
          Built for the builders shaping the future of finance
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${CATEGORIES.length}, 1fr)`, gap: 20 }} className="prism-hide-mobile">
          {CATEGORIES.map((c) => (
            <div key={c} style={{ textAlign: 'center', fontSize: 14.5, fontWeight: 600, color: '#475467' }}>{c}</div>
          ))}
        </div>
        <div className="prism-show-mobile" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px 22px' }}>
          {CATEGORIES.map((c) => (
            <span key={c} style={{ fontSize: 13.5, fontWeight: 600, color: '#475467' }}>{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to `PrismHome.tsx`**

Import `TrustBar` and render it after `<Hero anchorRef={heroAnchor} />`.

- [ ] **Step 3: Verify**

Run `npm run build`; run `npm run dev` and confirm the trust bar renders below the hero with the 5 category labels in a row (or wrapped list on mobile width), and "Built for the builders..." heading (not "Trusted by").

- [ ] **Step 4: Commit**

```bash
git add src/components/site/prism-home/sections/TrustBar.tsx src/components/site/prism-home/PrismHome.tsx
git commit -m "feat: add trust bar section"
```

---

## Task 6: The Problem section

**Files:**
- Create: `src/components/site/prism-home/sections/Problem.tsx`
- Modify: `src/components/site/prism-home/PrismHome.tsx`

**Interfaces:**
- Consumes: `Reveal` from `../shared` (`src/components/site/shared.tsx:436-440` — existing scroll-reveal wrapper, reused per spec §5 instead of porting the source's own `data-reveal`/`IntersectionObserver` system), `useIsMobile` from `../hooks`.
- Produces: `ProblemSection({ anchorRef })`.

- [ ] **Step 1: Write `sections/Problem.tsx`**

Copy verbatim from reference lines 163-284 (pill/H2/subhead/body copy, 8 source rows converging toward the anchor, the "97% confidence" result card, closing statement) — no fabricated claims here, carries over as designed. Desktop keeps the absolute-positioned source-card cluster + connector SVG; mobile drops the connector SVG and stacks the 8 source cards and the result card in normal flow (same simplification rule as Hero).

```tsx
import type { RefObject } from 'react';
import { Reveal } from '../../shared';
import { useIsMobile } from '../hooks';

const SOURCES = [
  { label: 'News', trend: 'flat' as const },
  { label: 'On-chain', trend: 'up' as const },
  { label: 'Macro', trend: 'up' as const },
  { label: 'ETF Flows', trend: 'up' as const },
  { label: 'Derivatives', trend: 'up' as const },
  { label: 'Research PDFs', trend: 'flat' as const },
  { label: 'Developer Activity', trend: 'up' as const },
  { label: 'Sentiment', trend: 'mixed' as const },
];

const RESULT_REASONS = ['ETF inflows accelerating', 'Macro supportive', 'Stablecoin accumulation', 'Developer momentum improving', 'Funding remains healthy'];
const RESULT_SOURCES = ['News', 'Macro', 'On-chain', 'ETF', 'Dev Activity', 'Research'];

function ResultCard() {
  return (
    <div className="prism-card" style={{ padding: '26px 28px', maxWidth: 410, boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <svg width="34" height="34" viewBox="0 0 30 30" fill="none"><path d="M15 2.5 25.8 8.75v12.5L15 27.5 4.2 21.25V8.75Z" stroke="#0FAE72" strokeWidth="1.8" strokeLinejoin="round" /><path d="M15 10.5 19 17h-8Z" stroke="#0B8D84" strokeWidth="1.5" strokeLinejoin="round" /></svg>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', color: '#0B1220', lineHeight: 1.25 }}>CryptoPrism<br />Intelligence Workspace</div>
          <div style={{ fontSize: 13.5, color: '#475467', marginTop: 5 }}>One Explainable Decision.</div>
        </div>
      </div>
      <div style={{ height: 1, background: '#E7E9EC', margin: '20px 0' }} />
      <div style={{ display: 'flex', gap: 22 }}>
        <div style={{ flex: 'none', paddingRight: 22, borderRight: '1px solid #E7E9EC' }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#475467' }}>Confidence</div>
          <div style={{ fontSize: 38, fontWeight: 800, color: '#0FAE72', letterSpacing: '-0.02em', marginTop: 6 }}>97%</div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#475467', marginBottom: 9 }}>Reasoning</div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 7, fontSize: 12.5, color: '#475467' }}>
            {RESULT_REASONS.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </div>
      </div>
      <div style={{ height: 1, background: '#E7E9EC', margin: '20px 0 16px' }} />
      <div style={{ fontSize: 12, fontWeight: 500, color: '#475467' }}>Sources</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 9 }}>
        {RESULT_SOURCES.map((s) => (
          <span key={s} style={{ fontSize: 11, fontWeight: 500, color: '#475467', border: '1px solid #E7E9EC', borderRadius: 7, padding: '4px 9px' }}>{s}</span>
        ))}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: '#0B1220', lineHeight: 1.5, marginTop: 20 }}>
        Not another dashboard.<br /><span style={{ color: '#0B8D84' }}>An intelligence engine.</span>
      </div>
    </div>
  );
}

export function ProblemSection({ anchorRef }: { anchorRef: RefObject<HTMLDivElement | null> }) {
  const isMobile = useIsMobile();

  return (
    <section style={{ position: 'relative', padding: '90px 0', background: 'radial-gradient(1000px 640px at 50% 42%, rgba(15,174,114,0.045), rgba(250,250,248,0) 70%), #FAFAF8' }}>
      <div className="prism-wrap">
        <Reveal>
          <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
            <div className="prism-pill"><span className="prism-pill__dot" />THE PROBLEM</div>
            <h2 style={{ margin: '26px 0 0', fontSize: isMobile ? 36 : 62, lineHeight: 1.02, color: '#0B1220' }}>Every investment decision begins in chaos.</h2>
            <p style={{ margin: '20px 0 0', fontSize: 25, fontWeight: 500, color: '#475467' }}>Too many signals. Too little <span style={{ color: '#0FAE72', fontWeight: 700 }}>conviction.</span></p>
            <p style={{ margin: '26px auto 0', maxWidth: 660, fontSize: 16.5, lineHeight: 1.6, color: '#475467' }}>
              Every day, investors jump between news, on-chain analytics, macro reports, derivatives, research PDFs, social sentiment, GitHub activity, ETF flows, and spreadsheets.
            </p>
            <p style={{ margin: '14px auto 0', maxWidth: 620, fontSize: 16.5, lineHeight: 1.6, color: '#475467' }}>
              Every new source adds information&mdash;but removes context.<br />By the time a decision is made, conviction has already disappeared.
            </p>
          </div>
        </Reveal>

        {!isMobile ? (
          <div style={{ position: 'relative', width: '100%', maxWidth: 1472, height: 660, margin: '36px auto 0' }}>
            <div style={{ position: 'absolute', left: 0, top: 60, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {SOURCES.map((s) => <Reveal key={s.label}><SourceRow label={s.label} /></Reveal>)}
            </div>
            <div ref={anchorRef} style={{ position: 'absolute', left: 502, top: 40, width: 468, height: 572 }} />
            <div style={{ position: 'absolute', left: 1062, top: 110 }}>
              <Reveal><ResultCard /></Reveal>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 36 }}>
            {SOURCES.map((s) => <SourceRow key={s.label} label={s.label} />)}
            <div ref={anchorRef} style={{ width: '100%', height: 1 }} />
            <ResultCard />
          </div>
        )}

        <Reveal>
          <div style={{ maxWidth: 760, margin: '60px auto 0', textAlign: 'center' }}>
            <h3 style={{ margin: 0, fontSize: isMobile ? 28 : 44, lineHeight: 1.1, color: '#0B1220' }}>
              Markets don&rsquo;t lack information.<br /><span className="prism-grad-text">They lack understanding.</span>
            </h3>
            <p style={{ margin: '20px auto 0', maxWidth: 480, fontSize: 16.5, lineHeight: 1.6, color: '#475467' }}>
              CryptoPrism transforms fragmented market signals into explainable investment intelligence.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SourceRow({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, width: 250, height: 56, boxSizing: 'border-box', padding: '0 14px', background: '#FFFFFF', border: '1px solid #E7E9EC', borderRadius: 14, boxShadow: '0 6px 18px rgba(11,18,32,0.05)' }}>
      <span style={{ fontSize: 13.5, fontWeight: 600, color: '#0B1220', flex: 1 }}>{label}</span>
    </div>
  );
}
```

(The mobile branch keeps the anchor div in-flow as a zero-height marker rather than an off-screen absolute box, so `PrismCanvas`'s `problemAnchor` measurement still resolves to a sensible position between the stacked source rows and the result card.)

- [ ] **Step 2: Add to `PrismHome.tsx`** — import and render `<ProblemSection anchorRef={problemAnchor} />` after `TrustBar`.

- [ ] **Step 3: Verify**

Run `npm run build`; run `npm run dev`, scroll from the hero into the Problem section. Expected: the 8 source cards, headline, and result card render; **the canvas crystal now visibly travels** from its hero position down toward the Problem section's anchor as you scroll (this is the first point where `PrismCanvas` has two real anchors to interpolate between — confirms Task 4's travel logic works). Resize below 900px and confirm the mobile stacked variant renders without the connector SVG.

- [ ] **Step 4: Commit**

```bash
git add src/components/site/prism-home/sections/Problem.tsx src/components/site/prism-home/PrismHome.tsx
git commit -m "feat: add the problem section, verify canvas scroll travel"
```

---

## Task 7: The Bias Tax section

**Files:**
- Create: `src/components/site/prism-home/sections/BiasTax.tsx`
- Modify: `src/components/site/prism-home/PrismHome.tsx`

**Interfaces:**
- Consumes: `Reveal` from `../shared`, `useIsMobile` from `../hooks`.
- Produces: `BiasTax({ anchorRef })`.

- [ ] **Step 1: Write `sections/BiasTax.tsx`**

Copy verbatim from reference lines 286-421 (intro copy, 3 supporting rows, Human-vs-Machine comparison around the anchor, 6 bias cards, Prism Reasoning Engine card, closing quote) — no fabricated claims, carries over as designed. Desktop keeps the absolute-positioned 1472×930 layout; mobile stacks everything (comparison becomes two cards with no connecting arrows, bias cards become a single column, reasoning engine card and closing quote stack below).

```tsx
import type { RefObject } from 'react';
import { Reveal } from '../../shared';
import { useIsMobile } from '../hooks';

const INTRO_ROWS = [
  { title: 'Markets generate endless information.', color: '#0B1220', body: 'Every day brings more data, more opinions, and more noise.' },
  { title: 'Humans generate endless bias.', color: '#0FAE72', body: 'Emotions distort our interpretation, destroy our timing, and cloud our judgment.' },
  { title: 'CryptoPrism replaces emotional reactions with explainable reasoning.', color: '#0B1220', body: 'Turning signals into structured intelligence.' },
];

const HUMAN_TRAITS = [['Emotional', 'Reactive'], ['Inconsistent', 'Biased'], ['Unreliable', 'Under pressure']];
const MACHINE_TRAITS = [['Evidence-based', 'Objective'], ['Consistent', 'Rule-driven'], ['Reliable', 'Always on']];

const BIAS_CARDS = [
  { title: 'Recency Bias', body: 'We overweight the latest events and ignore the bigger picture.' },
  { title: 'Confirmation Bias', body: 'We seek information that confirms our beliefs and ignore the rest.' },
  { title: 'Loss Aversion', body: 'We feel losses twice as strongly as we feel gains.' },
  { title: 'Overconfidence', body: 'We overestimate our knowledge and our ability to predict.' },
  { title: 'Anchoring', body: 'We rely too heavily on the first piece of information we see.' },
  { title: 'Availability Bias', body: 'We focus on what&rsquo;s easy to recall, not what&rsquo;s actually true.' },
];

const REASONING_TRAITS = [
  { title: 'Evidence', body: 'Grounded in verifiable data' },
  { title: 'Probability', body: 'Quantified, not guessed' },
  { title: 'Confidence', body: 'Measured, not assumed' },
  { title: 'Reasoning', body: 'Transparent and reproducible' },
];

function TraitCard({ heading, headingColor, bg, border, traits }: { heading: string; headingColor: string; bg: string; border: string; traits: string[][] }) {
  return (
    <div style={{ width: 180, boxSizing: 'border-box', background: bg, border: `1px solid ${border}`, borderRadius: 16, padding: '18px 20px' }}>
      <div style={{ fontSize: 14.5, fontWeight: 700, color: headingColor }}>{heading}</div>
      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {traits.map(([a, b]) => (
          <div key={a}><div style={{ fontSize: 13, fontWeight: 600, color: '#0B1220' }}>{a}</div><div style={{ fontSize: 11.5, color: '#98A2B3' }}>{b}</div></div>
        ))}
      </div>
    </div>
  );
}

function ReasoningEngineCard() {
  return (
    <div className="prism-card" style={{ padding: 26, width: '100%', maxWidth: 292, boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <svg width="32" height="32" viewBox="0 0 30 30" fill="none"><path d="M15 2.5 25.8 8.75v12.5L15 27.5 4.2 21.25V8.75Z" stroke="#0FAE72" strokeWidth="1.8" strokeLinejoin="round" /><circle cx="15" cy="15" r="3" stroke="#0B8D84" strokeWidth="1.5" /></svg>
        <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', color: '#0B1220', lineHeight: 1.25 }}>Prism<br />Reasoning Engine</div>
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.5, color: '#475467', marginTop: 14 }}>Replacing bias with explainable intelligence.</div>
      <div style={{ height: 1, background: '#E7E9EC', margin: '18px 0' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {REASONING_TRAITS.map((r) => (
          <div key={r.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ width: 34, height: 34, borderRadius: 9, background: '#F2FAF6', flex: 'none' }} />
            <div><div style={{ fontSize: 13.5, fontWeight: 700, color: '#0FAE72' }}>{r.title}</div><div style={{ fontSize: 12, color: '#475467', marginTop: 2 }}>{r.body}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BiasTax({ anchorRef }: { anchorRef: RefObject<HTMLDivElement | null> }) {
  const isMobile = useIsMobile();

  const intro = (
    <>
      <div className="prism-pill"><span className="prism-pill__dot" />THE BIAS TAX</div>
      <h2 style={{ margin: '26px 0 0', fontSize: isMobile ? 32 : 54, lineHeight: 1.04, color: '#0B1220' }}>
        Your biggest competitor isn&rsquo;t the market.<br /><span className="prism-grad-text">It&rsquo;s human judgment.</span>
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 26, marginTop: 40 }}>
        {INTRO_ROWS.map((r) => (
          <div key={r.title} style={{ fontSize: 15, lineHeight: 1.55, color: '#475467' }}>
            <span style={{ fontWeight: 700, color: r.color }}>{r.title}</span><br />{r.body}
          </div>
        ))}
      </div>
    </>
  );

  const comparison = (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: isMobile ? 'flex-start' : 'center', gap: 18 }}>
      <TraitCard heading="Human Thinking" headingColor="#B42318" bg="#FDF4F2" border="#F2DEDA" traits={HUMAN_TRAITS} />
      <div style={{ textAlign: 'center', flex: 'none' }}>
        <div ref={anchorRef} style={{ width: isMobile ? 60 : 150, height: isMobile ? 60 : 190 }} />
        <div style={{ fontSize: 13, fontWeight: 600, color: '#0B1220', marginTop: 2 }}>CryptoPrism</div>
      </div>
      <TraitCard heading="Machine Reasoning" headingColor="#0B8D84" bg="#F2FAF6" border="#D7EEE3" traits={MACHINE_TRAITS} />
    </div>
  );

  const biasCards = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {BIAS_CARDS.map((b) => (
        <Reveal key={b.title}>
          <div className="prism-card" style={{ display: 'flex', gap: 14, alignItems: 'flex-start', width: isMobile ? '100%' : 304, boxSizing: 'border-box', padding: 18 }}>
            <span style={{ width: 38, height: 38, border: '1px solid #E7E9EC', borderRadius: 10, flex: 'none' }} />
            <div><div style={{ fontSize: 14.5, fontWeight: 700, color: '#0B1220' }}>{b.title}</div><div style={{ fontSize: 12.5, lineHeight: 1.45, color: '#475467', marginTop: 4 }}>{b.body}</div></div>
          </div>
        </Reveal>
      ))}
    </div>
  );

  const closingQuote = (
    <div style={{ maxWidth: 860, margin: '40px auto 0', textAlign: 'center' }}>
      <div style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, letterSpacing: '-0.015em', color: '#0B1220' }}>The market can be unpredictable.</div>
      <div style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, letterSpacing: '-0.015em', marginTop: 4 }}><span className="prism-grad-text">Human biases are predictable.</span></div>
    </div>
  );

  if (isMobile) {
    return (
      <section style={{ padding: '80px 0', background: '#FAFAF8' }}>
        <div className="prism-wrap" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <Reveal>{intro}</Reveal>
          <Reveal>{comparison}</Reveal>
          {biasCards}
          <Reveal><ReasoningEngineCard /></Reveal>
          <Reveal>{closingQuote}</Reveal>
        </div>
      </section>
    );
  }

  return (
    <section style={{ position: 'relative', padding: '120px 0 100px', background: '#FAFAF8' }}>
      <div className="prism-wrap">
        <div style={{ position: 'relative', width: '100%', maxWidth: 1472, height: 930, margin: '0 auto' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, width: 600 }}>
            <Reveal>{intro}</Reveal>
            <div style={{ marginTop: 52 }}>{comparison}</div>
          </div>
          <div style={{ position: 'absolute', left: 660, top: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>{biasCards}</div>
          <div style={{ position: 'absolute', left: 1180, top: 110 }}><Reveal><ReasoningEngineCard /></Reveal></div>
        </div>
        <Reveal>{closingQuote}</Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to `PrismHome.tsx`** — import and render `<BiasTax anchorRef={biasTaxAnchor} />` after `ProblemSection`.

- [ ] **Step 3: Verify**

Run `npm run build`; run `npm run dev`, scroll all the way from hero through Problem into Bias Tax. Expected: the canvas crystal now travels through **both** legs (hero→Problem, then Problem→BiasTax), docking near "CryptoPrism" between the Human Thinking / Machine Reasoning cards at the end of the scroll range. Resize below 900px: confirm the stacked mobile variant renders (comparison cards, 6 bias cards in one column, reasoning engine card, closing quote) without the absolute-position desktop layout.

- [ ] **Step 4: Commit**

```bash
git add src/components/site/prism-home/sections/BiasTax.tsx src/components/site/prism-home/PrismHome.tsx
git commit -m "feat: add the bias tax section, complete canvas scroll-anchor travel"
```

---

## Task 8: Source the Feature Showcase screenshots

**Files:**
- Create: `src/assets/prism-feature-dashboard.png`
- Create: `src/assets/prism-feature-screener.png`
- Create: `src/assets/prism-feature-screens.png`
- Create: `src/assets/prism-feature-analytics.png`
- Create: `src/assets/prism-feature-news.png`

**Interfaces:**
- Produces: 5 image files under `src/assets/` for Task 9's `FeatureShowcase.tsx` to `import`.

- [ ] **Step 1: Fetch each image from the Claude Design project via the `DesignSync` MCP tool**

Project ID: `72004fbc-4c9e-4634-9111-8b486a2f5caa` (from the source project URL). For each of the 5 paths below, call `DesignSync` with `method: "get_file"`, `projectId: "72004fbc-4c9e-4634-9111-8b486a2f5caa"`, and `path` set to the exact upload path (from `FEATURE_META` in the reference file, lines 628-632):

| Save as | `path` argument |
|---|---|
| `src/assets/prism-feature-dashboard.png` | `uploads/ChatGPT Image Jul 15, 2026, 03_45_17 PM-a1bda2fc.png` |
| `src/assets/prism-feature-screener.png` | `uploads/ChatGPT Image Jul 15, 2026, 03_45_20 PM-e9a413bf.png` |
| `src/assets/prism-feature-screens.png` | `uploads/ChatGPT Image Jul 15, 2026, 03_45_24 PM-2656e800.png` |
| `src/assets/prism-feature-analytics.png` | `uploads/ChatGPT Image Jul 15, 2026, 03_45_41 PM (2)-896ec06b.png` |
| `src/assets/prism-feature-news.png` | `uploads/ChatGPT Image Jul 15, 2026, 03_45_58 PM-de62a8e9.png` |

Decode the returned content (base64 for binary image data) and write it to the corresponding path with the Write tool.

**Known constraint:** `get_file` is capped at 256 KiB per the tool's own description. If any image's response is reported as truncated or too large, **stop and tell the user** that MCP can't pull that asset directly — ask them to export/upload the image(s) from the Design project manually rather than substituting a placeholder image (per the "no dummy data" rule, a fake placeholder must never silently stand in for the real product screenshot).

- [ ] **Step 2: Verify**

Run `ls src/assets/prism-feature-*.png` (or equivalent) and confirm all 5 files exist and are non-trivial in size (i.e., not a 0-byte or error-page file). Open each in an image viewer or via the Read tool to confirm it's a real rendered UI screenshot, not corrupted data.

- [ ] **Step 3: Commit**

```bash
git add src/assets/prism-feature-dashboard.png src/assets/prism-feature-screener.png src/assets/prism-feature-screens.png src/assets/prism-feature-analytics.png src/assets/prism-feature-news.png
git commit -m "feat: source feature showcase screenshots from the design project"
```

---

## Task 9: Feature Showcase section (hover-expand shelf)

**Files:**
- Create: `src/components/site/prism-home/sections/FeatureShowcase.tsx`
- Modify: `src/components/site/prism-home/PrismHome.tsx`
- Modify: `src/styles/prism-home.css` (append)

**Interfaces:**
- Consumes: the 5 assets from Task 8.
- Produces: `FeatureShowcase()`. Section root carries `id="prism-platform"` (Task 3's `Nav.tsx` "Platform" link scrolls here).

Desktop keeps the source's hover-to-expand shelf (reference lines 423-455, `FEATURE_META` array at lines 627-633). Mobile switches the *interaction* from hover to tap (an accordion, same single-open-index state shape as Task 12's FAQ) and stacks the cards vertically instead of a horizontal flex row — hover has no mobile equivalent.

- [ ] **Step 1: Append shelf CSS to `prism-home.css`**

```css
.prism-shelf { display: flex; width: 100%; max-width: 1472px; height: 640px; margin: 36px auto 0; border: 1px solid #E7E9EC; overflow: hidden; }
.prism-shelf__card { min-width: 0; height: 100%; box-sizing: border-box; border-right: 1px solid #E7E9EC; background: #FFFFFF; padding: 30px 22px; display: flex; flex-direction: column; align-items: center; overflow: hidden; cursor: pointer; transition: flex 0.55s cubic-bezier(0.22,1,0.36,1); }
.prism-shelf__card--active { flex: 1 1 auto; }
.prism-shelf__card--collapsed { flex: 0 0 72px; }
.prism-shelf__title-vertical { writing-mode: vertical-rl; transform: rotate(180deg); font-size: 15px; font-weight: 700; color: #0B1220; letter-spacing: 0.02em; margin-top: 20px; }
.prism-shelf-mobile__card { border: 1px solid #E7E9EC; border-radius: 16px; background: #FFFFFF; margin-bottom: 12px; overflow: hidden; }
.prism-shelf-mobile__header { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; cursor: pointer; font-weight: 700; color: #0B1220; }
```

- [ ] **Step 2: Write `sections/FeatureShowcase.tsx`**

```tsx
import { useState } from 'react';
import { useIsMobile } from '../hooks';
import dashboardImg from '../../../../assets/prism-feature-dashboard.png';
import screenerImg from '../../../../assets/prism-feature-screener.png';
import screensImg from '../../../../assets/prism-feature-screens.png';
import analyticsImg from '../../../../assets/prism-feature-analytics.png';
import newsImg from '../../../../assets/prism-feature-news.png';

const FEATURES = [
  { key: 'dashboard', title: 'Unified Dashboard', desc: 'Every market signal, one workspace.', src: dashboardImg },
  { key: 'screener', title: 'AI Screener', desc: 'Describe it in plain English. AI finds it.', src: screenerImg },
  { key: 'screens', title: 'Public Screens', desc: 'Curated research, ready to act on.', src: screensImg },
  { key: 'analytics', title: 'Analytics', desc: 'Institutional-grade market depth.', src: analyticsImg },
  { key: 'news', title: 'News Intelligence', desc: 'Every headline, explained.', src: newsImg },
];

const DEFAULT_ACTIVE = 2; // "Public Screens" — matches the source's default shelfActive

export function FeatureShowcase() {
  const isMobile = useIsMobile();
  const [active, setActive] = useState(DEFAULT_ACTIVE);

  return (
    <section id="prism-platform" style={{ position: 'relative', padding: '70px 0 80px', background: '#FAFAF8' }}>
      <div className="prism-wrap">
        <div style={{ textAlign: 'center' }}>
          <div className="prism-pill" style={{ display: 'inline-flex' }}><span className="prism-pill__dot" />FEATURE SHOWCASE</div>
          <h2 style={{ margin: '18px 0 0', fontSize: isMobile ? 28 : 38, lineHeight: 1.08, color: '#0B1220' }}>
            Every Capability. <span className="prism-grad-text">Explored in Depth.</span>
          </h2>
        </div>

        {!isMobile ? (
          <div className="prism-shelf" onMouseLeave={() => setActive(DEFAULT_ACTIVE)}>
            {FEATURES.map((f, i) => (
              <div
                key={f.key}
                className={`prism-shelf__card ${i === active ? 'prism-shelf__card--active' : 'prism-shelf__card--collapsed'}`}
                onMouseEnter={() => setActive(i)}
              >
                {i === active ? (
                  <div style={{ width: '100%', marginTop: 18, flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: '#0B1220', whiteSpace: 'nowrap' }}>{f.title}</div>
                    <div style={{ fontSize: 13.5, lineHeight: 1.55, color: '#475467', marginTop: 8, maxWidth: 340 }}>{f.desc}</div>
                    <div style={{ width: '100%', flex: 1, minHeight: 0, position: 'relative', marginTop: 14 }}>
                      <img src={f.src} alt={f.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                  </div>
                ) : (
                  <div className="prism-shelf__title-vertical">{f.title}</div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ marginTop: 28 }}>
            {FEATURES.map((f, i) => {
              const open = i === active;
              return (
                <div key={f.key} className="prism-shelf-mobile__card">
                  <div className="prism-shelf-mobile__header" onClick={() => setActive(open ? -1 : i)}>
                    <span>{f.title}</span>
                    <span style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}>&#9660;</span>
                  </div>
                  {open && (
                    <div style={{ padding: '0 20px 20px' }}>
                      <div style={{ fontSize: 13.5, color: '#475467', marginBottom: 12 }}>{f.desc}</div>
                      <img src={f.src} alt={f.title} style={{ width: '100%', borderRadius: 10, display: 'block' }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add to `PrismHome.tsx`** — import and render `<FeatureShowcase />` after `BiasTax`.

- [ ] **Step 4: Verify**

Run `npm run build`; run `npm run dev`. Expected: 5-card shelf renders with "Public Screens" expanded by default, hovering another card expands it and collapses the rest (each collapsed card shows only its vertical rotated title), the real screenshots load in the expanded card, and moving the mouse off the shelf resets to "Public Screens." Click the "Platform" nav link and confirm it scrolls to this section. Resize below 900px: confirm the shelf becomes a tap-to-expand accordion with cards stacked vertically.

- [ ] **Step 5: Commit**

```bash
git add src/components/site/prism-home/sections/FeatureShowcase.tsx src/components/site/prism-home/PrismHome.tsx src/styles/prism-home.css
git commit -m "feat: add feature showcase hover-expand shelf"
```

---

## Task 10: Enterprise Architecture section

**Files:**
- Create: `src/components/site/prism-home/sections/EnterpriseArchitecture.tsx`
- Modify: `src/components/site/prism-home/PrismHome.tsx`
- Modify: `src/styles/prism-home.css` (append)

**Interfaces:**
- Produces: `EnterpriseArchitecture()`. Section root carries `id="prism-enterprise"` (Task 3's `Nav.tsx` "Enterprise" link scrolls here). Both closing CTAs get `cta-early-access-trigger`.

Content matches reference lines 457-526 verbatim — this section describes product architecture/intent (who it's for, the intelligence-layer diagram, the unified data foundation), not a claim about existing enterprise clients or compliance certifications, so it needs no content correction. On mobile, the two side info-card columns (currently absolute-positioned outside the central diagram card) stack above/below it instead, and the internal 6/4/6-column grids drop to 2 columns.

- [ ] **Step 1: Append responsive CSS**

```css
.prism-arch-grid-6 { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; }
.prism-arch-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
@media (max-width: 900px) {
  .prism-arch-grid-6 { grid-template-columns: repeat(2, 1fr) !important; }
  .prism-arch-grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
}
```

- [ ] **Step 2: Write `sections/EnterpriseArchitecture.tsx`**

```tsx
import { useIsMobile } from '../hooks';

const SIDE_CARDS_LEFT = [
  { title: 'Secure by Design', body: 'Enterprise-grade security, encryption and access controls at every layer.' },
  { title: 'Unified Data Layer', body: 'All critical data sources normalized, validated and continuously updated.' },
];
const SIDE_CARDS_RIGHT = [
  { title: 'Built for Integration', body: 'APIs, webhooks and streams that plug into your existing infrastructure.' },
  { title: 'Enterprise Ready', body: 'Scalable, reliable and built to meet the standards of the most demanding teams.' },
];
const WHO_ITS_FOR = ['Hedge Funds', 'Asset Managers', 'Fintech Platforms', 'Exchanges', 'Research Teams', 'Family Offices'];
const INTELLIGENCE_ENGINES = [
  { title: 'Market Intelligence Engine', body: 'Prices, volume, liquidity, market structure' },
  { title: 'On-Chain Intelligence Engine', body: 'Wallets, flows, network health' },
  { title: 'Sentiment Intelligence Engine', body: 'News, social, NLP, sentiment scoring' },
  { title: 'Macro & Economic Engine', body: 'Macro data, events, policy, indicators' },
];
const DATA_FOUNDATION = [
  { title: 'Market Data', body: 'Exchanges, order books' },
  { title: 'On-Chain Data', body: 'Chains, contracts, wallets' },
  { title: 'News & Social', body: 'Newswires, blogs, X' },
  { title: 'Macro Data', body: 'Rates, FX, commodities' },
  { title: 'Alternative Data', body: 'Satellite, web signals' },
  { title: 'Partner Data', body: 'APIs, premium datasets' },
];

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="prism-card" style={{ padding: 18, marginBottom: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#0B1220', marginTop: 12 }}>{title}</div>
      <div style={{ fontSize: 12, lineHeight: 1.5, color: '#475467', marginTop: 5 }}>{body}</div>
    </div>
  );
}

export function EnterpriseArchitecture() {
  const isMobile = useIsMobile();

  return (
    <section id="prism-enterprise" style={{ position: 'relative', padding: '110px 0 100px', background: '#FAFAF8' }}>
      <div className="prism-wrap">
        <div style={{ textAlign: 'center' }}>
          <div className="prism-pill" style={{ display: 'inline-flex' }}><span className="prism-pill__dot" />THE PLATFORM</div>
          <h2 style={{ margin: '26px 0 0', fontSize: isMobile ? 30 : 46, lineHeight: 1.06, color: '#0B1220' }}>
            Enterprise Infrastructure.<br /><span className="prism-grad-text">Built for the Real World.</span>
          </h2>
          <p style={{ margin: '18px auto 0', maxWidth: 620, fontSize: 16.5, lineHeight: 1.55, color: '#475467' }}>
            CryptoPrism unifies fragmented data, AI engines, and enterprise workflows into a secure, scalable intelligence infrastructure.
          </p>
        </div>

        <div style={{ display: isMobile ? 'block' : 'flex', gap: 24, maxWidth: 1120, margin: '56px auto 0', alignItems: 'flex-start' }}>
          {!isMobile && <div style={{ width: 210, flex: 'none' }}>{SIDE_CARDS_LEFT.map((c) => <InfoCard key={c.title} {...c} />)}</div>}

          <div className="prism-card" style={{ flex: 1, borderRadius: 22, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '12px 16px', borderBottom: '1px solid #E7E9EC' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ED6A5E' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F4BF4F' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#61C554' }} />
            </div>
            <div style={{ padding: '28px 30px', boxSizing: 'border-box' }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#0B1220' }}>The CryptoPrism Enterprise Architecture</div>
              <div style={{ fontSize: 12.5, color: '#475467', marginTop: 3 }}>One intelligence layer. Infinite possibilities.</div>

              <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', color: '#98A2B3', marginTop: 22 }}>WHO IT&rsquo;S FOR</div>
              <div className="prism-arch-grid-6" style={{ marginTop: 10 }}>
                {WHO_ITS_FOR.map((w) => (
                  <div key={w} style={{ border: '1px solid #E7E9EC', borderRadius: 12, padding: '14px 8px', textAlign: 'center', fontSize: 11, fontWeight: 600, color: '#0B1220' }}>{w}</div>
                ))}
              </div>

              <div style={{ background: '#0B1220', borderRadius: 16, padding: 18, marginTop: 16 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', color: '#7FE0BE' }}>CRYPTOPRISM INTELLIGENCE LAYER</div>
                <div className="prism-arch-grid-4" style={{ marginTop: 10 }}>
                  {INTELLIGENCE_ENGINES.map((e) => (
                    <div key={e.title} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 14 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: '#FFFFFF' }}>{e.title}</div>
                      <div style={{ fontSize: 11, color: '#8B96A5', marginTop: 4 }}>{e.body}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 10, background: 'rgba(15,174,114,0.12)', border: '1px solid rgba(15,174,114,0.3)', borderRadius: 10, padding: '10px 14px', fontSize: 12, fontWeight: 600, color: '#7FE0BE', textAlign: 'center' }}>
                  Knowledge Graph + Entity Resolution + Cross-Source Correlation
                </div>
              </div>

              <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', color: '#98A2B3', marginTop: 16 }}>UNIFIED DATA FOUNDATION</div>
              <div className="prism-arch-grid-6" style={{ marginTop: 10 }}>
                {DATA_FOUNDATION.map((d) => (
                  <div key={d.title} style={{ border: '1px solid #E7E9EC', borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#0B1220' }}>{d.title}</div>
                    <div style={{ fontSize: 9.5, color: '#98A2B3', marginTop: 4, lineHeight: 1.4 }}>{d.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {!isMobile && <div style={{ width: 210, flex: 'none' }}>{SIDE_CARDS_RIGHT.map((c) => <InfoCard key={c.title} {...c} />)}</div>}
        </div>
        {isMobile && (
          <div style={{ marginTop: 20 }}>
            {[...SIDE_CARDS_LEFT, ...SIDE_CARDS_RIGHT].map((c) => <InfoCard key={c.title} {...c} />)}
          </div>
        )}

        <div style={{ maxWidth: 700, margin: '50px auto 0', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#0B1220' }}>Institutional-grade infrastructure powering institutional decisions.</div>
          <p style={{ margin: '12px 0 0', fontSize: 15, lineHeight: 1.55, color: '#475467' }}>
            From raw data to real-world actions&mdash;CryptoPrism provides the foundation enterprises build their edge on.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 26 }}>
            <button className="prism-btn-primary cta-early-access-trigger">Explore Enterprise Solutions</button>
            <button className="prism-btn-ghost cta-early-access-trigger">Talk to Our Team</button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add to `PrismHome.tsx`** — import and render `<EnterpriseArchitecture />` after `FeatureShowcase`.

- [ ] **Step 4: Verify**

Run `npm run build`; run `npm run dev`. Expected: the architecture diagram card renders with the "who it's for" grid, dark intelligence-layer panel, and data-foundation grid; both closing buttons open the early-access modal. Click "Enterprise" in the nav and confirm it scrolls here. Resize below 900px: side info cards stack below the diagram, internal grids drop to 2 columns.

- [ ] **Step 5: Commit**

```bash
git add src/components/site/prism-home/sections/EnterpriseArchitecture.tsx src/components/site/prism-home/PrismHome.tsx src/styles/prism-home.css
git commit -m "feat: add enterprise architecture section"
```

---

## Task 11: Institutional Trust section (corrected copy)

**Files:**
- Create: `src/components/site/prism-home/sections/InstitutionalTrust.tsx`
- Modify: `src/components/site/prism-home/PrismHome.tsx`

**Interfaces:**
- Produces: `InstitutionalTrust()`.

This is the section with the mandatory content fixes from spec §2. **Do not use the source's original stats (99.9% uptime, 256-bit encryption, 50B+ data points, 100+ countries, "Institutional Grade") or the "SOC 2 Type II aligned" / "VPC / on-prem ready" / "Air-gapped options" / "SLA-backed uptime" bullets** — replaced below with verified facts and generic-true security bullets.

- [ ] **Step 1: Write `sections/InstitutionalTrust.tsx`**

```tsx
const CAPABILITY_CARDS = [
  {
    n: '01', title: 'Explainable AI', desc: 'Every insight is traceable. Every recommendation is explainable.',
    bullets: ['Transparent models', 'Rationale for every output', 'Human-in-the-loop'],
  },
  {
    // Corrected: desc softened ("bank-grade ... compliance" implied certifications we don't hold);
    // "SOC 2 Type II aligned" bullet dropped (unverifiable), replaced with a real, generic-true one.
    n: '02', title: 'Enterprise Security', desc: 'Security built in from day one.',
    bullets: ['End-to-end encryption', 'Role-based access control', 'Secure credential handling'],
  },
  {
    n: '03', title: 'APIs & Integrations', desc: 'Seamlessly integrate with your existing stack and workflows.',
    bullets: ['REST & WebSocket APIs', 'Real-time data streams', 'Plug-and-play SDKs'],
  },
  {
    n: '04', title: 'Audit Trail', desc: 'Complete provenance. Every data point. Every model output.',
    bullets: ['Immutable logs', 'Versioned data lineage', 'Full audit transparency'],
  },
  {
    // Corrected: dropped "VPC / on-prem ready", "Air-gapped options", "SLA-backed uptime" —
    // all implied infrastructure/contracts that don't exist at private-beta stage.
    n: '05', title: 'Private Deployment', desc: 'Flexible deployment to fit your environment. Your data stays yours.',
    bullets: ['Cloud, hybrid, or on-prem options', 'Data isolation by design', 'Built to scale with you'],
  },
  {
    n: '06', title: 'Continuous Learning', desc: 'Models that evolve with the market. Intelligence that compounds.',
    bullets: ['Adaptive models', 'Feedback loop', 'Always improving'],
  },
];

// Corrected: replaces the source's fabricated 99.9%-uptime / 256-bit / 50B+ / 100+-countries /
// "Institutional Grade" stats with CryptoPrism's real, verified metrics
// (docs_revamp/02-market-primer-notes.md).
const REAL_STATS = [
  { v: '130+', l: 'Indicators Tracked', s: 'Technical, on-chain & sentiment signals' },
  { v: '1,000+', l: 'Coins Covered', s: 'Across major digital assets' },
  { v: '6', l: 'Blockchains Unified', s: 'Cross-chain on-chain intelligence' },
  { v: '44', l: 'News & Social Sources', s: 'Aggregated & sentiment-scored' },
  { v: '0.896 AUC', l: 'DMV Score Model', s: 'Direction · Magnitude · Volatility' },
];

// Corrected: "Trusted by teams at [industries]" implied existing paying clients — reframed as
// target audience, matching the Trust Bar section's same fix.
const BUILT_FOR = ['Hedge Funds', 'Fintechs', 'Exchanges', 'Family Offices', 'Research Firms', 'Asset Managers'];

export function InstitutionalTrust() {
  return (
    <section style={{ position: 'relative', padding: '110px 0 0', background: '#FAFAF8' }}>
      <div className="prism-wrap">
        <div style={{ textAlign: 'center' }}>
          <div className="prism-pill" style={{ display: 'inline-flex' }}><span className="prism-pill__dot" />THE PLATFORM</div>
          <h2 style={{ margin: '26px 0 0', fontSize: 46, lineHeight: 1.06, color: '#0B1220' }}>
            Why Institutions Choose <span className="prism-grad-text">CryptoPrism.</span>
          </h2>
          <p style={{ margin: '18px auto 0', maxWidth: 640, fontSize: 16.5, lineHeight: 1.55, color: '#475467' }}>
            Purpose-built for the highest standards of intelligence, security, and performance &mdash; designed for funds, fintechs, and research teams worldwide.
          </p>
        </div>

        <div className="prism-grid-3" style={{ maxWidth: 1472, margin: '52px auto 0' }}>
          {CAPABILITY_CARDS.map((c) => (
            <div key={c.n} className="prism-card" style={{ padding: 26 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0FAE72' }}>{c.n}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#0B1220', marginTop: 16 }}>{c.title}</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.55, color: '#475467', marginTop: 8 }}>{c.desc}</div>
              <div style={{ height: 1, background: '#E7E9EC', margin: '18px 0 14px' }} />
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12.5, color: '#475467' }}>
                {c.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ maxWidth: 1472, margin: '60px auto 0', background: '#0B1220', borderRadius: 24, padding: '40px 44px', boxSizing: 'border-box' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF' }}>Built on Real Data. Backed by Validated Performance.</div>
          <div style={{ fontSize: 13.5, color: '#8B96A5', margin: '10px 0 26px' }}>Model-validated performance. Verified data coverage.</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr) auto', gap: 28, alignItems: 'start' }} className="prism-stats-grid">
            {REAL_STATS.map((s) => (
              <div key={s.l}>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#FFFFFF' }}>{s.v}</div>
                <div style={{ fontSize: 12, color: '#8B96A5', marginTop: 2 }}>{s.l}</div>
                <div style={{ fontSize: 10.5, color: '#5B6672', marginTop: 2 }}>{s.s}</div>
              </div>
            ))}
            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: 28 }}>
              <div style={{ fontSize: 12, color: '#8B96A5', marginBottom: 12 }}>Built for teams at</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px', fontSize: 11.5, fontWeight: 600, color: '#C7CDD6', whiteSpace: 'nowrap' }}>
                {BUILT_FOR.map((b) => <span key={b}>{b}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Append to `prism-home.css`**

```css
.prism-stats-grid { grid-template-columns: repeat(5, 1fr) auto; }
@media (max-width: 900px) { .prism-stats-grid { grid-template-columns: 1fr 1fr !important; } }
```

- [ ] **Step 3: Add to `PrismHome.tsx`** — import and render `<InstitutionalTrust />` after `EnterpriseArchitecture`.

- [ ] **Step 4: Verify**

Run `npm run build`; run `npm run dev`. Expected: 6 capability cards render with the corrected Enterprise Security and Private Deployment bullets (no "SOC 2", "VPC", "air-gapped", or "SLA-backed" text anywhere on the page — grep the rendered HTML or search visually), and the dark stats bar shows **130+ / 1,000+ / 6 / 44 / 0.896 AUC** (not 99.9% / 256-bit / 50B+ / 100+ / "Institutional Grade"), with "Built for teams at" (not "Trusted by teams at").

- [ ] **Step 5: Commit**

```bash
git add src/components/site/prism-home/sections/InstitutionalTrust.tsx src/components/site/prism-home/PrismHome.tsx src/styles/prism-home.css
git commit -m "feat: add institutional trust section with verified stats"
```

---

## Task 12: Final CTA + FAQ section, and the minimal footer

**Files:**
- Create: `src/components/site/prism-home/sections/FinalCtaFaq.tsx`
- Create: `src/components/site/prism-home/Footer.tsx`
- Modify: `src/components/site/prism-home/PrismHome.tsx`

**Interfaces:**
- Produces: `FinalCtaFaq()` (section root `id="prism-faq"`, matching Task 3's Nav "FAQ" link) and `Footer()`.

FAQ item #6's answer gets the same "drop unverifiable SOC 2 claim" fix as Task 11. CTAs relabeled per spec §3 ("Launch Beta" → "Request Early Access"; "Request Demo" stays).

- [ ] **Step 1: Write `sections/FinalCtaFaq.tsx`**

```tsx
import { useState } from 'react';

const TRUST_BADGES = ['Private Beta', 'Enterprise Ready', 'AI Native', 'Explainable'];

const FAQ_ITEMS = [
  { q: 'What data does CryptoPrism use?', a: 'We aggregate and normalize thousands of sources—including market data, on-chain metrics, news, social, and macroeconomic data—to deliver a comprehensive and high-quality view of the markets.' },
  { q: 'Is CryptoPrism for retail or institutions?', a: 'CryptoPrism is built for institutions, teams, and serious investors. Our infrastructure, security, and features are designed to meet enterprise-grade requirements.' },
  { q: 'Can I connect CryptoPrism via APIs?', a: 'Yes. We offer REST and WebSocket APIs, real-time data streams, and SDKs so you can integrate CryptoPrism into your existing workflows and products.' },
  { q: 'Is the AI explainable?', a: 'Absolutely. Every insight, score, and recommendation comes with clear rationale, source attribution, and impact analysis—so you always know why something matters.' },
  { q: 'When is the beta available?', a: "We're onboarding select teams now. Request early access to join our private beta and shape the future of crypto intelligence." },
  // Corrected: dropped "SOC 2 Type II-aligned security practices" (unverifiable compliance claim).
  { q: 'How is my data secured?', a: 'We use enterprise-grade encryption and strict access controls to protect your data at every layer.' },
];

export function FinalCtaFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="prism-faq" style={{ position: 'relative', background: '#050B14', padding: '100px 0 0', marginTop: 90, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(900px 600px at 78% 20%, rgba(15,174,114,0.14), rgba(5,11,20,0) 70%)' }} />
      <div className="prism-wrap" style={{ position: 'relative', paddingBottom: 90 }}>
        <div style={{ maxWidth: 640 }}>
          <h2 style={{ margin: 0, fontSize: 44, lineHeight: 1.06, color: '#FFFFFF' }}>
            Turn Fragmented Markets Into <span style={{ color: '#34D399' }}>Explainable Intelligence.</span>
          </h2>
          <p style={{ margin: '20px 0 0', fontSize: 16.5, lineHeight: 1.6, color: '#9AA5B1' }}>
            CryptoPrism is the AI-native intelligence layer that transforms complexity into clarity&mdash;so you can see more, understand deeper, and act with conviction.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, marginTop: 30 }}>
            <button className="prism-btn-gradient cta-early-access-trigger">Request Early Access</button>
            <button className="prism-btn-dark-outline cta-early-access-trigger">Request Demo</button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 34, marginTop: 38 }}>
            {TRUST_BADGES.map((b) => (
              <span key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#9AA5B1' }}>{b}</span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 80 }}>
          <div style={{ textAlign: 'center' }}>
            <div className="prism-pill" style={{ display: 'inline-flex', background: 'rgba(15,174,114,0.08)', color: '#34D399' }}><span className="prism-pill__dot" style={{ background: '#34D399' }} />FAQ</div>
            <h3 style={{ margin: '20px 0 0', fontSize: 36, letterSpacing: '-0.02em', color: '#FFFFFF' }}>Frequently Asked <span style={{ color: '#34D399' }}>Questions.</span></h3>
            <p style={{ margin: '12px 0 0', fontSize: 15, color: '#9AA5B1' }}>Everything you need to know about CryptoPrism.</p>
          </div>

          <div className="prism-grid-2" style={{ maxWidth: 1180, margin: '44px auto 0' }}>
            {FAQ_ITEMS.map((f, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={f.q}
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '20px 22px', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: '#FFFFFF' }}>{f.q}</span>
                    <span style={{ color: '#9AA5B1', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s ease', flex: 'none' }}>&#9660;</span>
                  </div>
                  {isOpen && <div style={{ fontSize: 13.5, lineHeight: 1.6, color: '#9AA5B1', marginTop: 12 }}>{f.a}</div>}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20, maxWidth: 1180, margin: '40px auto 0', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: '22px 28px' }}>
            <span style={{ fontSize: 15.5, fontWeight: 600, color: '#FFFFFF' }}>Ready to see the future of crypto intelligence?</span>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="prism-btn-gradient cta-early-access-trigger" style={{ fontSize: 14, padding: '11px 20px' }}>Request Early Access</button>
              <button className="prism-btn-dark-outline cta-early-access-trigger" style={{ fontSize: 14, padding: '10px 18px' }}>Request Demo</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Write the minimal `Footer.tsx`**

Per the resolved footer question: this design has no footer at all, unlike every other page on the site, which all carry the same legal line. Add a small dark bar matching the section above it, reusing the exact legal copy from `src/components/site/shared.tsx:398-399`.

```tsx
export function Footer() {
  return (
    <footer style={{ background: '#050B14', padding: '22px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="prism-wrap" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 11, color: '#8B96A5' }}>
          Trinetry Infotech Pvt Ltd &middot; CIN U62099PN2025PTC247965 &middot; Pune, India
        </span>
        <span style={{ fontSize: 11, color: '#8B96A5', fontStyle: 'italic' }}>
          Source-cited research infrastructure. Not investment advice. No price predictions.
        </span>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Add both to `PrismHome.tsx`** — import and render `<FinalCtaFaq />` then `<Footer />` (outside `<main>`, as the page's closing element) after `InstitutionalTrust`.

- [ ] **Step 4: Verify**

Run `npm run build`; run `npm run dev`, scroll to the bottom. Expected: dark closing CTA section with "Request Early Access"/"Request Demo" buttons (both open the modal), 4 trust badges, a 6-item FAQ accordion where clicking a question opens it and closes any other open one (single-open-at-a-time), FAQ #6's answer contains no "SOC 2" text, a closing banner with two more CTA buttons, and finally the dark footer bar with the CIN line. Click "FAQ" in the nav and confirm it scrolls to this section.

- [ ] **Step 5: Commit**

```bash
git add src/components/site/prism-home/sections/FinalCtaFaq.tsx src/components/site/prism-home/Footer.tsx src/components/site/prism-home/PrismHome.tsx
git commit -m "feat: add final CTA/FAQ section and minimal legal footer"
```

---

## Task 13: Full cross-viewport QA, then push and open a PR

**Files:** none (verification and git/GitHub operations only).

- [ ] **Step 1: Full build check**

Run `npm run build`. Expected: zero TypeScript errors, zero build errors — including the orphaned `src/components/site/{Product,Intelligence,Compare,Pricing,Institutional,Evidence,About,Invite}Page.tsx` files, which must still compile even though nothing imports them anymore.

- [ ] **Step 2: Desktop interaction QA (≥1600px viewport)**

Using the Playwright/`claude-in-chrome` browser tooling against `npm run dev`, verify on a desktop-width viewport:
- Nav "Platform" / "Enterprise" / "FAQ" links each scroll to their section.
- Every CTA button on the page (hero ×2, nav, enterprise architecture ×2, final CTA ×2, closing banner ×2) opens `EarlyAccessModal`, and it closes on Escape / backdrop click / the modal's own close control.
- Scrolling from Hero through Problem through BiasTax visibly moves and rescales the canvas crystal between the three anchor points, with no console errors.
- Feature Showcase: hovering each of the 5 shelf cards expands it and shows its real screenshot; moving the mouse off the shelf returns to "Public Screens."
- FAQ: clicking a question opens it; clicking another closes the first and opens the new one.
- Reveal-on-scroll: Problem/BiasTax content blocks fade/rise in as they enter the viewport (the existing `Reveal`/`useRevealClass` behavior), and nothing stays permanently invisible if scrolled past quickly.

- [ ] **Step 3: Mobile interaction QA (~390px viewport)**

Resize (or emulate) to ~390px width and repeat the relevant checks:
- Hero, Problem, BiasTax render their simplified stacked mobile layouts (no absolute-position decorative diagrams), nav collapses to logo + CTA only.
- Feature Showcase renders as a tap-to-expand accordion, stacked vertically.
- No horizontal scrollbar/overflow anywhere on the page.
- All CTAs still open the modal.

- [ ] **Step 4: Content audit**

Search the rendered page (via browser dev tools or `get_page_text`) for any of the removed claims to confirm none leaked back in: `SOC 2`, `256-bit`, `99.9%`, `50B+`, `air-gapped`, `VPC`, `SLA-backed`. Expected: zero matches.

- [ ] **Step 5: Fast-forward `feature/design-home-sync`, push, and open a PR (not a direct merge)**

Implementation happened in an isolated worktree on `feature/hero-prism-build` (branched off `feature/design-home-sync` since that branch was already checked out in the main working copy). Before pushing, fast-forward the original branch to match it, in the main checkout (not the worktree):

```bash
git -C "C:/cpio_db/cpio_website" merge --ff-only feature/hero-prism-build
```

Expected: fast-forwards cleanly (the worktree branch is a linear continuation with no divergent commits on `feature/design-home-sync` in the meantime). If it doesn't fast-forward, stop and report to the user rather than force-merging.

Per the user's standing GitHub-push preference ("use option B — push current branch, create PR"), push `feature/design-home-sync` and open a PR against `main` rather than merging directly:

```bash
git push -u origin feature/design-home-sync
gh pr create --title "Rebuild homepage from the CryptoPrism Hero Prism design" --body "$(cat <<'EOF'
## Summary
- Replaces the 9-page marketing site with a single new homepage ported from the Claude Design import "CryptoPrism Hero.dc.html"
- Fabricated enterprise stats/claims (99.9% uptime, 256-bit encryption, 50B+ data points, SOC 2, VPC/air-gapped, "trusted by" client claims) replaced with verified product facts (130+ indicators, 1,000+ coins, 6 chains, 44 sources, 0.896 DMV AUC)
- Old page routes removed from App.tsx; old page files left on disk, orphaned (matching prior repo precedent)
- New responsive breakpoint (900px) with simplified mobile layouts for the sections that use absolutely-positioned decorative diagrams

## Test plan
- [x] `npm run build` passes
- [x] Desktop and mobile interaction QA (nav, CTAs, canvas scroll-travel, feature shelf, FAQ accordion, reveal-on-scroll)
- [x] Content audit confirms no fabricated claims remain

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_01Y3hWqBikVuidqo1YbcMjSY
EOF
)"
```

Report the PR URL to the user. **Do not merge the PR** — leave that action to the user or their review process, consistent with the standing "push + PR" convention rather than the "merge with main" wording the user used loosely when approving this work.

- [ ] **Step 6: Report completion**

Summarize to the user: build status, QA results, PR URL, and a reminder that merging is still their call.

---

## Self-Review Notes

- **Spec coverage:** every §2 content fix (institutional stats, security bullets, FAQ #6, trust-bar/subhead rewording) is in Task 11/12; §3 (nav, CTAs, old routes) is in Task 3; §4 (all 8 sections + nav) is Tasks 3–12; §5 (canvas, shelf, FAQ, reveal reuse) is Tasks 4/9/12/6; §7 (assets) is Task 8; §8 (responsiveness) is threaded through Tasks 4/6/7/9 via `useIsMobile`. The footer gap found during planning is covered in Task 12 per the user's follow-up answer.
- **Placeholder scan:** no TBD/TODO markers; every task has literal code or exact copy, not descriptions of what to write.
- **Type consistency:** `RefObject<HTMLDivElement | null>` is used consistently for all three anchors across `PrismCanvas`, `Hero`, `Problem`, `BiasTax`, and `PrismHome`; `useIsMobile()` signature is identical everywhere it's consumed; `cta-early-access-trigger` is the only class name used for modal-opening buttons, matching `src/App.tsx:44-53` exactly.
