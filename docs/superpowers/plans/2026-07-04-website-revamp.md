# CryptoPrism Website Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the CryptoPrism landing page (desktop + mobile) around the "proven model, missing market" narrative, a 9-section information architecture with an alternating dark/light visual register, a single "Request an Invite" CTA, and fixes for the icon-rendering, stat-drift, and dual-CTA defects found in the earlier audit.

**Architecture:** React 19 + TypeScript function components, Tailwind v4 `@theme` tokens, Motion (Framer) for animation — all existing patterns in this codebase, unchanged. New sections are new files under `src/components/`; existing reused sections are edited in place; two components (`ComparisonSection`, `PersonaSection`) are deleted since neither appears in the new 9-section IA.

**Tech Stack:** React 19, TypeScript 5.9, Vite 7, Tailwind CSS v4, motion (Framer Motion) 12.

**Spec:** `docs/superpowers/specs/2026-07-04-website-revamp-design.md`

## Global Constraints

- No test framework exists in this repo (verified: no vitest/jest/testing-library in `package.json`, no `*.test.ts(x)` files under `src/`). Do not introduce one as part of this plan — that's a separate, unrequested infra decision. Verification for every task is: `npm run build` (runs `tsc -b && vite build`, catches type errors and build failures) plus a visual check in the running dev server.
- Visual checks use Playwright via the `playwright-skill` (already set up in this environment at `~/.claude/skills/playwright-skill`, Chromium installed). Pattern: write a throwaway script to a scratch temp directory, run via `node run.js <script>` from the skill directory, screenshot the affected section, and Read the resulting PNG to confirm it renders correctly (no raw `material-symbols-outlined` ligature text visible, no invisible/blank sections, correct copy).
- Follow existing code conventions exactly: `React.FC<XProps>` with `readonly className?: string`, Tailwind utility classes (no CSS-in-JS), data content lives in `src/data/mockData.ts` (or the new `src/data/stats.ts`) not inlined in components, `motion/react` for animation matching each section's existing easing curve `[0.25, 0.4, 0.25, 1]`.
- New Tailwind color tokens (`paper`, `navy-ink`, `ember`) are added to the `@theme` block in `src/index.css` and are distinct from the existing `html[data-theme="light"]` user-toggle system — do not conflate the two. The paper/navy-ink/ember tokens style specific *sections* regardless of the user's dark/light mode preference; they are not swapped by the theme toggle.
- Icon migration: replace every `<span className="material-symbols-outlined">name</span>` in a file this plan touches with `<Icon name="name" />` from the new shared component (Task 2). Do not touch icon usage in files outside this plan's scope (pitch deck slides, `BrandKit.tsx`, `QuerySidebar.tsx`).
- The product is invite-only. Every CTA in files this plan touches becomes a single "Request an Invite" action wired to `EarlyAccessModal`'s existing `cta-early-access-trigger` class/click-handler wiring in `App.tsx` (already present — do not rewire the event delegation in `App.tsx`, just make sure new/edited CTA elements carry the `cta-early-access-trigger` class or a matching `id` from the existing list `['hero-cta-apply', 'cta-early-access', 'mobile-cta-apply', 'mobile-cta-apply-2', 'hero-cta-demo']`).

---

### Task 1: Design tokens + stats single source of truth

**Files:**
- Modify: `src/index.css` (add to the `@theme` block starting at line 3)
- Create: `src/data/stats.ts`
- Test: manual (see Step 4)

**Interfaces:**
- Produces: `src/data/stats.ts` exports `PLATFORM_STATS: { coins: string; indicators: string; newsSources: string; latency: string }` — the single source every later task imports for coin/indicator/source/latency counts.
- Produces: new Tailwind utility classes `bg-paper`, `text-paper`, `bg-navy-ink`, `text-navy-ink`, `bg-ember`, `text-ember` (from the new `@theme` color tokens).

- [ ] **Step 1: Add the three new color tokens to `src/index.css`**

Open `src/index.css` and find the `@theme` block (starts at line 3, dark tokens listed through line 34). Add these three lines immediately after line 14 (`--color-prism-cyan: #00D4FF;`):

```css
  --color-paper: #F6F3EC;
  --color-navy-ink: #10182B;
  --color-ember: #D97D46;
```

- [ ] **Step 2: Create `src/data/stats.ts`**

```typescript
export interface PlatformStats {
  readonly coins: string;
  readonly indicators: string;
  readonly newsSources: string;
  readonly latency: string;
}

export const PLATFORM_STATS: PlatformStats = {
  coins: '1,000+',
  indicators: '130+',
  newsSources: '44',
  latency: '<200ms',
};
```

- [ ] **Step 3: Run the build to verify no errors**

Run: `npm run build`
Expected: builds successfully, no TypeScript or Vite errors. (No visual change yet — this task only adds unused-so-far tokens and a data file.)

- [ ] **Step 4: Commit**

```bash
git add src/index.css src/data/stats.ts
git commit -m "feat: add paper/navy-ink/ember design tokens and stats single source of truth"
```

---

### Task 2: Shared inline-SVG icon component

**Files:**
- Create: `src/components/icons/Icon.tsx`
- Test: manual (see Step 3)

**Interfaces:**
- Consumes: nothing (standalone).
- Produces: `Icon` component — `<Icon name="check_circle" className="text-neon-green text-xl" />`. Props: `{ readonly name: IconName; readonly className?: string; readonly size?: number }`. `size` sets `width`/`height` in px (default 20); `className` is applied to the `<svg>` element for color (`currentColor` fill/stroke) and additional sizing via Tailwind text-size classes.
- The `IconName` union type covers exactly the icon names this plan's later tasks need: `'close' | 'check_circle' | 'rocket_launch' | 'arrow_forward' | 'light_mode' | 'dark_mode' | 'terminal' | 'bolt' | 'auto_awesome' | 'article' | 'trending_up' | 'shield' | 'send'`. If a later task needs an icon not in this list, add it to both the union type and the `PATHS` map in the same task that needs it — do not pre-build icons nothing uses yet (YAGNI).

- [ ] **Step 1: Create the Icon component**

```typescript
import React from 'react';

export type IconName =
  | 'close'
  | 'check_circle'
  | 'rocket_launch'
  | 'arrow_forward'
  | 'light_mode'
  | 'dark_mode'
  | 'terminal'
  | 'bolt'
  | 'auto_awesome'
  | 'article'
  | 'trending_up'
  | 'shield'
  | 'send';

interface IconProps {
  readonly name: IconName;
  readonly className?: string;
  readonly size?: number;
}

// Each path is a 24x24 viewBox stroke-based glyph, matching Material Symbols
// visual weight so the swap is a drop-in replacement with no layout shift.
const PATHS: Record<IconName, React.ReactNode> = {
  close: <path d="M6 6l12 12M18 6L6 18" />,
  check_circle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-6" />
    </>
  ),
  rocket_launch: (
    <path d="M12 2c2.5 2 4 5.5 4 9 0 2-1 4-2 5l-2 2-2-2c-1-1-2-3-2-5 0-3.5 1.5-7 4-9zM9 16l-2 4M15 16l2 4M10 9a2 2 0 104 0 2 2 0 00-4 0z" />
  ),
  arrow_forward: <path d="M4 12h16M13 5l7 7-7 7" />,
  light_mode: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  dark_mode: <path d="M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z" />,
  terminal: <path d="M4 5h16v14H4V5zM7 9l3 3-3 3M13 15h4" />,
  bolt: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />,
  auto_awesome: <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3zM19 14l.7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14z" />,
  article: <path d="M6 3h9l3 3v15H6V3zM9 8h6M9 12h6M9 16h4" />,
  trending_up: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
  shield: <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z" />,
  send: <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />,
};

export const Icon: React.FC<IconProps> = ({ name, className = '', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {PATHS[name]}
  </svg>
);

export default Icon;
```

- [ ] **Step 2: Run the build to verify no errors**

Run: `npm run build`
Expected: builds successfully. This component isn't imported anywhere yet, so no visual change.

- [ ] **Step 3: Commit**

```bash
git add src/components/icons/Icon.tsx
git commit -m "feat: add shared inline-SVG Icon component to replace Material Symbols ligature text"
```

---

### Task 3: Extend `mockData.ts` with content for the four new sections

**Files:**
- Modify: `src/data/mockData.ts` (append new exports at end of file, after `footerLinks` at line 396)
- Test: manual (see Step 3)

**Interfaces:**
- Consumes: nothing new.
- Produces: `problemData`, `compsProofData`, `evidenceData`, `pricingData`, `trustData` — consumed by Tasks 4-8 respectively.

- [ ] **Step 1: Append the new data exports to `src/data/mockData.ts`**

```typescript
// ── Problem Section Data (§2) ───────────────────────────────────
export const problemData = {
  eyebrow: 'THE PROBLEM · THE BIAS TAX',
  headline: { line1: "Traders don't lose to the market.", line2: 'They lose to themselves.' },
  stats: [
    { value: '119M', label: 'Indian crypto traders — the largest base globally' },
    { value: '84%', label: 'trade on tips, not data' },
    { value: '49%', label: 'end the year in net loss' },
  ],
  closing: "Every tool shows more data. None mitigate the bias. The market doesn't lack data — it lacks judgment.",
};

// ── Comps Proof Section Data (§3) ────────────────────────────────
export interface CompCard {
  readonly name: string;
  readonly tag: string;
  readonly stat: string;
  readonly lesson: string;
}

export const compsProofData = {
  eyebrow: 'PROVEN MODEL, MISSING MARKET',
  headline: 'Scored research already works. Just not for crypto — yet.',
  cards: [
    {
      name: 'Trendlyne',
      tag: 'India · Equities',
      stat: '$2.64M raised · strategic stake from IIFL Finance',
      lesson: "An Indian scored-research app reached a strategic-investor stake on under $3M raised — and independently landed on a 'DVM' score almost identical to CryptoPrism's own.",
    },
    {
      name: 'Liquide',
      tag: 'India · Equities',
      stat: '1M+ downloads · SEBI-registered',
      lesson: 'Real distribution for AI-generated research calls — proof retail will install and use a scored-research app at scale.',
    },
    {
      name: 'altFINS',
      tag: 'Global · Crypto',
      stat: '100,000+ traders · bootstrapped, no VC',
      lesson: 'A crypto research subscription business can reach six-figure user counts without ever raising a Series A.',
    },
  ] as readonly CompCard[],
};

// ── Evidence Section Data (§6) ───────────────────────────────────
export const evidenceData = {
  eyebrow: 'OUT-OF-SAMPLE, AUDITED',
  headline: 'Not projections. Validated results.',
  metrics: [
    { label: 'DMV Scoring', value: 'AUC 0.896' },
    { label: 'ML Ensemble', value: 'Sharpe 7.69' },
    { label: 'Net Return', value: '+229.6%' },
    { label: 'Win Rate', value: '65%' },
  ],
  costWedge: { us: '$30/mo', them: '$800/mo', label: 'CryptoPrism vs. Glassnode on-chain data infra cost basis' },
  caption: '226 trades, out-of-sample backtest, fully automated via 10 GitHub Actions workflows.',
};

// ── Pricing Section Data (§7) ────────────────────────────────────
export interface PricingTier {
  readonly name: string;
  readonly price: string;
  readonly period: string;
  readonly description: string;
  readonly features: readonly string[];
  readonly highlighted?: boolean;
}

export const pricingData = {
  eyebrow: 'PRICING',
  headline: 'Three tiers, priced for India.',
  note: 'Regional pricing (US/EU/Emerging) available on request.',
  tiers: [
    { name: 'Lite', price: '₹99', period: '/mo', description: 'Get started with core signals.', features: ['Live market data', '20 coins tracked', 'Daily digest'] },
    { name: 'Pro', price: '₹499', period: '/mo', description: 'Full research terminal.', features: ['1,000+ coins', 'DMV scoring', 'Strategy library', 'Ask in plain English'], highlighted: true },
    { name: 'Inst-Lite', price: '₹999', period: '/mo', description: 'For serious desks.', features: ['Everything in Pro', 'API access', 'Priority support'] },
  ] as readonly PricingTier[],
};

// ── Trust Section Data (§8) ──────────────────────────────────────
export const trustData = {
  eyebrow: 'WHY TRUST THIS',
  headline: 'Two-time founder. Proven model. Real registration.',
  founderBullets: [
    'Yogesh Sahu — Founder & Managing Director',
    'Ex-Barclays (institutional finance + risk), MSc FinTech',
    '12 products shipped in 6 months, 9 live',
  ],
  callback: 'The same scored-research model already works — Trendlyne, Liquide, Messari.',
  registration: 'Trinetry Infotech Pvt Ltd · CIN U62099PN2025PTC247965',
};
```

- [ ] **Step 2: Run the build to verify no errors**

Run: `npm run build`
Expected: builds successfully with no type errors (all new interfaces are self-contained).

- [ ] **Step 3: Commit**

```bash
git add src/data/mockData.ts
git commit -m "feat: add content data for Problem, Comps Proof, Evidence, Pricing, Trust sections"
```

---

### Task 4: New `ProblemSection` component (§2)

**Files:**
- Create: `src/components/ProblemSection.tsx`
- Test: manual (see Step 3)

**Interfaces:**
- Consumes: `problemData` from `../data/mockData` (Task 3), `Icon` from `./icons/Icon` (Task 2, not needed here since this section has no icons — plain stat cards).
- Produces: `ProblemSection` — `React.FC<{ readonly className?: string }>` — imported and rendered by `App.tsx` in Task 19 as desktop section 2.

- [ ] **Step 1: Create the component**

```typescript
import React from 'react';
import { motion } from 'motion/react';
import { problemData } from '../data/mockData';

interface ProblemSectionProps {
  readonly className?: string;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ className = '' }) => {
  const { eyebrow, headline, stats, closing } = problemData;

  return (
    <section
      id="problem"
      className={`relative lg:h-[100dvh] flex flex-col justify-center py-10 lg:py-12 px-4 sm:px-6 lg:px-0 ${className}`}
    >
      <div className="text-center mb-8 md:mb-14 max-w-3xl mx-auto">
        <span className="text-xs font-mono font-bold tracking-[0.2em] text-neon-red uppercase mb-4 block">
          {eyebrow}
        </span>
        <motion.h2
          className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.1]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
        >
          <span className="text-white block">{headline.line1}</span>
          <span className="text-neon-red block">{headline.line2}</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto w-full">
        {stats.map((s, i) => (
          <motion.div
            key={s.value}
            className="glass-card rounded-xl md:rounded-2xl p-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
          >
            <div className="text-4xl md:text-5xl font-mono font-bold text-neon-red mb-2">{s.value}</div>
            <p className="text-sm text-gray-400 leading-snug">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-gray-400 mt-8 md:mt-12 max-w-2xl mx-auto text-sm md:text-base">
        {closing}
      </p>
    </section>
  );
};

export default ProblemSection;
```

- [ ] **Step 2: Run the build to verify no errors**

Run: `npm run build`
Expected: builds successfully. Component not imported into `App.tsx` yet, so no visual change until Task 19.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProblemSection.tsx
git commit -m "feat: add ProblemSection component (desktop §2)"
```

---

### Task 5: New `CompsProofSection` component (§3) with signature transition element

**Files:**
- Create: `src/components/CompsProofSection.tsx`
- Test: manual (see Step 3)

**Interfaces:**
- Consumes: `compsProofData` from `../data/mockData` (Task 3).
- Produces: `CompsProofSection` — `React.FC<{ readonly className?: string }>` — rendered by `App.tsx` (Task 19) as section 3. This component owns the signature transition element (the oversized prism mark resolving into the paper palette), since it's the entry point into the light register.

- [ ] **Step 1: Create the component**

```typescript
import React from 'react';
import { motion } from 'motion/react';
import { compsProofData } from '../data/mockData';

interface CompsProofSectionProps {
  readonly className?: string;
}

export const CompsProofSection: React.FC<CompsProofSectionProps> = ({ className = '' }) => {
  const { eyebrow, headline, cards } = compsProofData;

  return (
    <section
      id="comps-proof"
      className={`relative bg-paper text-navy-ink py-16 md:py-24 px-4 sm:px-6 lg:px-0 ${className}`}
    >
      {/* Signature transition: oversized prism mark resolving dark accents into the paper palette */}
      <div className="flex justify-center mb-10 md:mb-16" aria-hidden="true">
        <svg width="72" height="72" viewBox="0 0 100 100" className="opacity-90">
          <polygon points="50,10 90,85 10,85" fill="none" stroke="#10182B" strokeWidth="2" />
          <line x1="50" y1="10" x2="50" y2="85" stroke="#D97D46" strokeWidth="1.5" opacity="0.6" />
        </svg>
      </div>

      <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
        <span className="text-xs font-mono font-bold tracking-[0.2em] text-ember uppercase mb-4 block">
          {eyebrow}
        </span>
        <motion.h2
          className="text-3xl md:text-5xl font-display font-semibold tracking-tight leading-[1.15] text-navy-ink"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
        >
          {headline}
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
        {cards.map((c, i) => (
          <motion.div
            key={c.name}
            className="border border-navy-ink/15 p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
          >
            <div className="flex items-baseline justify-between mb-3 border-b border-navy-ink/10 pb-3">
              <h3 className="text-lg font-semibold text-navy-ink">{c.name}</h3>
              <span className="text-[11px] font-mono text-navy-ink/50 uppercase tracking-wide">{c.tag}</span>
            </div>
            <p className="font-mono text-sm text-ember mb-3">{c.stat}</p>
            <p className="text-sm text-navy-ink/70 leading-relaxed">{c.lesson}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CompsProofSection;
```

- [ ] **Step 2: Run the build to verify no errors**

Run: `npm run build`
Expected: builds successfully.

- [ ] **Step 3: Commit**

```bash
git add src/components/CompsProofSection.tsx
git commit -m "feat: add CompsProofSection component with signature register transition (§3)"
```

---

### Task 6: New `EvidenceSection` component (§6)

**Files:**
- Create: `src/components/EvidenceSection.tsx`
- Test: manual (see Step 3)

**Interfaces:**
- Consumes: `evidenceData` from `../data/mockData` (Task 3).
- Produces: `EvidenceSection` — `React.FC<{ readonly className?: string }>` — rendered by `App.tsx` (Task 19) as section 6, the highest-impact single addition per the gap report (no evidence numbers currently exist anywhere on the site).

- [ ] **Step 1: Create the component**

```typescript
import React from 'react';
import { motion } from 'motion/react';
import { evidenceData } from '../data/mockData';

interface EvidenceSectionProps {
  readonly className?: string;
}

export const EvidenceSection: React.FC<EvidenceSectionProps> = ({ className = '' }) => {
  const { eyebrow, headline, metrics, costWedge, caption } = evidenceData;

  return (
    <section
      id="evidence"
      className={`relative bg-paper text-navy-ink py-16 md:py-24 px-4 sm:px-6 lg:px-0 ${className}`}
    >
      <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
        <span className="text-xs font-mono font-bold tracking-[0.2em] text-ember uppercase mb-4 block">
          {eyebrow}
        </span>
        <motion.h2
          className="text-3xl md:text-5xl font-display font-semibold tracking-tight leading-[1.15] text-navy-ink"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
        >
          {headline}
        </motion.h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-navy-ink/10 max-w-4xl mx-auto mb-10 md:mb-14">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            className="bg-paper p-5 md:p-7 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <p className="text-[11px] font-mono uppercase tracking-wide text-navy-ink/50 mb-2">{m.label}</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-navy-ink">{m.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="max-w-xl mx-auto border border-navy-ink/15 p-6 text-center mb-6">
        <p className="text-xs font-mono uppercase tracking-wide text-navy-ink/50 mb-2">{costWedge.label}</p>
        <div className="flex items-center justify-center gap-4 font-mono text-lg">
          <span className="text-ember font-bold">{costWedge.us}</span>
          <span className="text-navy-ink/40">vs.</span>
          <span className="text-navy-ink/60">{costWedge.them}</span>
        </div>
      </div>

      <p className="text-center text-navy-ink/60 text-xs font-mono max-w-lg mx-auto">{caption}</p>
    </section>
  );
};

export default EvidenceSection;
```

- [ ] **Step 2: Run the build to verify no errors**

Run: `npm run build`
Expected: builds successfully.

- [ ] **Step 3: Commit**

```bash
git add src/components/EvidenceSection.tsx
git commit -m "feat: add EvidenceSection component (§6) — closes the biggest gap-report finding"
```

---

### Task 7: New `PricingSection` component (§7)

**Files:**
- Create: `src/components/PricingSection.tsx`
- Test: manual (see Step 3)

**Interfaces:**
- Consumes: `pricingData` from `../data/mockData` (Task 3), `Icon` from `./icons/Icon` (Task 2) for the checkmark on each feature line.
- Produces: `PricingSection` — `React.FC<{ readonly className?: string }>` — rendered by `App.tsx` (Task 19) as section 7. Its CTA buttons carry the `cta-early-access-trigger` class per the Global Constraints CTA wiring rule.

- [ ] **Step 1: Create the component**

```typescript
import React from 'react';
import { motion } from 'motion/react';
import { pricingData } from '../data/mockData';
import { Icon } from './icons/Icon';

interface PricingSectionProps {
  readonly className?: string;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ className = '' }) => {
  const { eyebrow, headline, note, tiers } = pricingData;

  return (
    <section
      id="pricing"
      className={`relative bg-paper text-navy-ink py-16 md:py-24 px-4 sm:px-6 lg:px-0 ${className}`}
    >
      <div className="text-center mb-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono font-bold tracking-[0.2em] text-ember uppercase mb-4 block">
          {eyebrow}
        </span>
        <motion.h2
          className="text-3xl md:text-5xl font-display font-semibold tracking-tight leading-[1.15] text-navy-ink"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
        >
          {headline}
        </motion.h2>
      </div>
      <p className="text-center text-navy-ink/50 text-xs font-mono mb-10 md:mb-14">{note}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
        {tiers.map((t, i) => (
          <motion.div
            key={t.name}
            className={`border p-6 flex flex-col ${t.highlighted ? 'border-ember/50 border-2' : 'border-navy-ink/15'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
          >
            <h3 className="text-lg font-semibold text-navy-ink mb-1">{t.name}</h3>
            <p className="text-xs text-navy-ink/50 mb-4">{t.description}</p>
            <div className="font-mono mb-5">
              <span className="text-3xl font-bold text-navy-ink">{t.price}</span>
              <span className="text-sm text-navy-ink/50">{t.period}</span>
            </div>
            <ul className="space-y-2 mb-6 flex-1">
              {t.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-navy-ink/70">
                  <Icon name="check_circle" className="text-ember shrink-0" size={16} />
                  {f}
                </li>
              ))}
            </ul>
            <button
              className={`cta-early-access-trigger w-full py-2.5 rounded text-sm font-bold ${
                t.highlighted ? 'bg-ember text-paper' : 'border border-navy-ink/20 text-navy-ink'
              }`}
            >
              Request an Invite
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
```

- [ ] **Step 2: Run the build to verify no errors**

Run: `npm run build`
Expected: builds successfully.

- [ ] **Step 3: Commit**

```bash
git add src/components/PricingSection.tsx
git commit -m "feat: add PricingSection component (§7), replaces 'Still Free, For Now' messaging"
```

---

### Task 8: New `TrustSection` component (§8)

**Files:**
- Create: `src/components/TrustSection.tsx`
- Test: manual (see Step 3)

**Interfaces:**
- Consumes: `trustData` from `../data/mockData` (Task 3), `Icon` from `./icons/Icon` (Task 2).
- Produces: `TrustSection` — `React.FC<{ readonly className?: string }>` — rendered by `App.tsx` (Task 19) as section 8, the last light-register section before the dark §9 footer.

- [ ] **Step 1: Create the component**

```typescript
import React from 'react';
import { motion } from 'motion/react';
import { trustData } from '../data/mockData';
import { Icon } from './icons/Icon';

interface TrustSectionProps {
  readonly className?: string;
}

export const TrustSection: React.FC<TrustSectionProps> = ({ className = '' }) => {
  const { eyebrow, headline, founderBullets, callback, registration } = trustData;

  return (
    <section
      id="trust"
      className={`relative bg-paper text-navy-ink py-16 md:py-24 px-4 sm:px-6 lg:px-0 ${className}`}
    >
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
        <span className="text-xs font-mono font-bold tracking-[0.2em] text-ember uppercase mb-4 block">
          {eyebrow}
        </span>
        <motion.h2
          className="text-3xl md:text-5xl font-display font-semibold tracking-tight leading-[1.15] text-navy-ink"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
        >
          {headline}
        </motion.h2>
      </div>

      <div className="max-w-2xl mx-auto border border-navy-ink/15 p-6 md:p-8 mb-8">
        <ul className="space-y-3 mb-6">
          {founderBullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm text-navy-ink/80">
              <Icon name="shield" className="text-ember shrink-0 mt-0.5" size={16} />
              {b}
            </li>
          ))}
        </ul>
        <p className="text-sm text-ember font-medium border-t border-navy-ink/10 pt-4">{callback}</p>
      </div>

      <p className="text-center text-navy-ink/50 text-xs font-mono">{registration}</p>
    </section>
  );
};

export default TrustSection;
```

- [ ] **Step 2: Run the build to verify no errors**

Run: `npm run build`
Expected: builds successfully.

- [ ] **Step 3: Commit**

```bash
git add src/components/TrustSection.tsx
git commit -m "feat: add TrustSection component (§8)"
```

---

### Task 9: New `InviteToggle` component (sticky Trader/Investor wayfinding)

**Files:**
- Create: `src/components/InviteToggle.tsx`
- Test: manual (see Step 3)

**Interfaces:**
- Consumes: nothing external — takes two callback props.
- Produces: `InviteToggle` — `React.FC<{ readonly onTraderClick: () => void; readonly onInvestorClick: () => void; readonly className?: string }>`. Wired into `Header.tsx` in Task 11, which supplies the two scroll-to-anchor callbacks (`document.getElementById('terminal-panel')?.scrollIntoView(...)` for Trader → §4, `document.getElementById('evidence')?.scrollIntoView(...)` for Investor → §6).

- [ ] **Step 1: Create the component**

```typescript
import React, { useState } from 'react';

interface InviteToggleProps {
  readonly onTraderClick: () => void;
  readonly onInvestorClick: () => void;
  readonly className?: string;
}

export const InviteToggle: React.FC<InviteToggleProps> = ({ onTraderClick, onInvestorClick, className = '' }) => {
  const [active, setActive] = useState<'trader' | 'investor' | null>(null);

  const handle = (which: 'trader' | 'investor') => {
    setActive(which);
    if (which === 'trader') onTraderClick();
    else onInvestorClick();
  };

  return (
    <div className={`flex items-center gap-1 p-1 rounded-full border border-white/10 bg-white/[0.03] ${className}`}>
      <button
        onClick={() => handle('trader')}
        className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide transition-colors ${
          active === 'trader' ? 'bg-neon-green text-cyber-black' : 'text-gray-400 hover:text-white'
        }`}
      >
        For Traders
      </button>
      <button
        onClick={() => handle('investor')}
        className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide transition-colors ${
          active === 'investor' ? 'bg-neon-green text-cyber-black' : 'text-gray-400 hover:text-white'
        }`}
      >
        For Investors
      </button>
    </div>
  );
};

export default InviteToggle;
```

- [ ] **Step 2: Run the build to verify no errors**

Run: `npm run build`
Expected: builds successfully.

- [ ] **Step 3: Commit**

```bash
git add src/components/InviteToggle.tsx
git commit -m "feat: add InviteToggle sticky Trader/Investor wayfinding component"
```

---

### Task 10: `EarlyAccessModal` — invite-only copy + SVG icons

**Files:**
- Modify: `src/components/EarlyAccessModal.tsx`
- Test: manual (see Step 3)

**Interfaces:**
- Consumes: `Icon` from `./icons/Icon` (Task 2).
- No signature changes — `EarlyAccessModalProps` (`{ open, onClose }`) stays identical since `App.tsx` already wires it.

- [ ] **Step 1: Replace ligature icons and update copy for invite-only framing**

In `src/components/EarlyAccessModal.tsx`, add the import at the top (after line 2):

```typescript
import { Icon } from './icons/Icon';
```

Replace line 93 (`<span className="material-symbols-outlined text-xl">close</span>`) with:

```typescript
<Icon name="close" size={20} />
```

Replace lines 106-109:
```typescript
                      <div className="w-10 h-10 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-neon-green">rocket_launch</span>
                      </div>
                      <h3 id="early-access-title" className="text-xl font-bold text-white">Early Access</h3>
```
with:
```typescript
                      <div className="w-10 h-10 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center">
                        <Icon name="rocket_launch" className="text-neon-green" size={22} />
                      </div>
                      <h3 id="early-access-title" className="text-xl font-bold text-white">Request an Invite</h3>
```

Replace line 111-112 (the subtitle paragraph):
```typescript
                    <p className="text-xs md:text-sm text-gray-400 mb-5 md:mb-8">
                      Be among the first to experience Crypto Prism. We'll reach out when your spot is ready.
                    </p>
```
with:
```typescript
                    <p className="text-xs md:text-sm text-gray-400 mb-5 md:mb-8">
                      CryptoPrism is invite-only. Tell us about you, and we'll reach out when your invite is ready.
                    </p>
```

Replace lines 180-184 (the submit button icon/label):
```typescript
                          <>
                            Reserve My Spot
                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                          </>
```
with:
```typescript
                          <>
                            Request My Invite
                            <Icon name="arrow_forward" size={18} />
                          </>
```

Replace line 211 (success icon):
```typescript
                      <span className="material-symbols-outlined text-neon-green text-3xl">check_circle</span>
```
with:
```typescript
                      <Icon name="check_circle" className="text-neon-green" size={32} />
```

Replace lines 213-216 (success copy):
```typescript
                    <h3 className="text-xl font-bold text-white mb-2">You're on the list!</h3>
                    <p className="text-sm text-gray-400">
                      We'll reach out to <span className="text-white font-medium">{name}</span> as soon as your early access is ready.
                    </p>
```
with:
```typescript
                    <h3 className="text-xl font-bold text-white mb-2">You're on the list!</h3>
                    <p className="text-sm text-gray-400">
                      We'll reach out to <span className="text-white font-medium">{name}</span> as soon as your invite is ready.
                    </p>
```

- [ ] **Step 2: Verify visually**

Start the dev server (`npm run dev`), open the site, click any "Request an Invite" trigger to open the modal, and confirm: the close icon (X) renders as a glyph (not the text "close"), the rocket icon renders as a glyph, the header reads "Request an Invite," and after submitting a test entry the success icon renders as a checkmark glyph.

- [ ] **Step 3: Commit**

```bash
git add src/components/EarlyAccessModal.tsx
git commit -m "feat: reframe EarlyAccessModal as invite-only, migrate icons to SVG"
```

---

### Task 11: `Header` — SVG icon, single CTA, integrate `InviteToggle`

**Files:**
- Modify: `src/components/Header.tsx`
- Test: manual (see Step 3)

**Interfaces:**
- Consumes: `Icon` from `./icons/Icon` (Task 2), `InviteToggle` from `./InviteToggle` (Task 9).
- `HeaderProps` unchanged (`{ className?, theme?, onToggleTheme? }`).

- [ ] **Step 1: Add imports**

At the top of `src/components/Header.tsx`, after line 3 (`import { navLinks, APP_URL } from '../data/mockData';`), add:

```typescript
import { Icon } from './icons/Icon';
import { InviteToggle } from './InviteToggle';
```

- [ ] **Step 2: Replace the theme-toggle ligature icon**

Replace lines 83-85:
```typescript
              <span className="material-symbols-outlined text-[18px]">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
```
with:
```typescript
              <Icon name={theme === 'dark' ? 'light_mode' : 'dark_mode'} size={18} />
```

- [ ] **Step 3: Consolidate the two desktop CTAs into one, and add the InviteToggle**

Replace lines 88-111 (the "Launch App" `motion.a` and the "Early Access" `motion.button`):
```typescript
          <motion.a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-neon-green text-[#020405] font-bold rounded hover:bg-neon-green/90 transition-all focus-visible:outline-2 focus-visible:outline-neon-green focus-visible:outline-offset-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, type: 'spring', stiffness: 400, damping: 20 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(14, 203, 129, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            Launch App →
          </motion.a>
          <motion.button
            className="cta-early-access-trigger px-6 py-2 bg-neon-green/5 border border-neon-green/20 rounded text-neon-green hover:bg-neon-green/10 transition-all focus-visible:outline-2 focus-visible:outline-neon-green focus-visible:outline-offset-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 400, damping: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Sign up for early access"
          >
            Early Access
          </motion.button>
```
with:
```typescript
          <InviteToggle
            className="mx-2"
            onTraderClick={() => document.getElementById('terminal-panel')?.scrollIntoView({ behavior: 'smooth' })}
            onInvestorClick={() => document.getElementById('evidence')?.scrollIntoView({ behavior: 'smooth' })}
          />
          <motion.button
            className="cta-early-access-trigger px-6 py-2 bg-neon-green text-[#020405] font-bold rounded hover:bg-neon-green/90 transition-all focus-visible:outline-2 focus-visible:outline-neon-green focus-visible:outline-offset-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, type: 'spring', stiffness: 400, damping: 20 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(14, 203, 129, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            aria-label="Request an invite"
          >
            Request an Invite
          </motion.button>
```

Note: `APP_URL` import at line 3 becomes unused after this edit if nothing else in the file references it — check with `grep -n "APP_URL" src/components/Header.tsx` after this step; if it has no other usages in this file, remove it from the import on line 3 to avoid an unused-import lint/build warning.

- [ ] **Step 4: Consolidate the mobile menu panel CTAs the same way**

Replace lines 165-185 (the mobile "Launch App" link + "Early Access" button):
```typescript
              <motion.a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 px-4 py-2 bg-neon-green text-[#020405] rounded text-xs font-bold tracking-widest uppercase text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                onClick={() => setMobileOpen(false)}
              >
                Launch App →
              </motion.a>
              <motion.button
                className="cta-early-access-trigger px-4 py-2 bg-neon-green/5 border border-neon-green/20 rounded text-neon-green text-xs font-bold tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                onClick={() => setMobileOpen(false)}
              >
                Early Access
              </motion.button>
```
with:
```typescript
              <motion.button
                className="cta-early-access-trigger mt-1 px-4 py-2 bg-neon-green text-[#020405] rounded text-xs font-bold tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                onClick={() => setMobileOpen(false)}
              >
                Request an Invite
              </motion.button>
```

- [ ] **Step 5: Verify visually**

Run:
```bash
mkdir -p /tmp/pw-scratch
cat > /tmp/pw-scratch/header-check.js << 'EOF'
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 300 } });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.screenshot({ path: '/tmp/pw-scratch/header.png' });
  await browser.close();
})();
EOF
cd ~/.claude/skills/playwright-skill && node run.js /tmp/pw-scratch/header-check.js
```
Then Read `/tmp/pw-scratch/header.png` and confirm: one "Request an Invite" button (not two CTAs), the "For Traders / For Investors" toggle pill renders between the nav links and the CTA, and the theme-toggle icon renders as a sun/moon glyph, not text.

- [ ] **Step 6: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat: consolidate Header to single Request-an-Invite CTA, add InviteToggle, migrate icons"
```

---

### Task 12: `HeroSection` — new narrative copy, stats.ts, single CTA, SVG icons

**Files:**
- Modify: `src/components/HeroSection.tsx`
- Test: manual (see Step 4)

**Interfaces:**
- Consumes: `PLATFORM_STATS` from `../data/stats` (Task 1), `Icon` from `./icons/Icon` (Task 2).
- `HeroSectionProps` unchanged (`{ className? }`).

- [ ] **Step 1: Update the hero taglines to the "proven model, missing market" narrative**

Replace lines 7-12:
```typescript
const HERO_TAGLINES = [
  'Trade Like a Quant.',
  'Trade Like a Machine.',
  'Execute Like a Pro.',
  'Analyze Like an Institution.',
];
```
with:
```typescript
const HERO_TAGLINES = [
  'The Research Layer Crypto Never Had.',
  'Scored Research. Finally, for Crypto.',
  'Proven for Stocks. Now Built for Crypto.',
];
```

- [ ] **Step 2: Replace the "Think Like You." fixed line and subtitle copy**

Replace line 546 (`Think Like You.`) with:
```typescript
          Scored Research Works.
```

Replace lines 565-576 (both the desktop and mobile subtitle paragraphs):
```typescript
      <motion.p className="relative z-10 hidden md:block text-xl text-gray-400 max-w-2xl mb-6 font-medium leading-relaxed" {...fadeUp(0.4)}>
        Ask in plain <span className="text-white font-semibold">English</span>.
        Get quant-grade analysis on <span className="text-white font-semibold">Crypto—instantly</span>.
        No code. No complex filters. Just the{' '}
        <span className="text-white font-semibold">market edge</span>{' '}
        you've been missing.
      </motion.p>
      <p className="relative z-10 md:hidden text-base text-gray-400 mt-6 mb-2 leading-relaxed">
        Ask in plain <span className="text-white font-semibold">English</span>. Get quant-grade analysis on{' '}
        <span className="text-white font-semibold">Crypto</span>—instantly. Just the{' '}
        <span className="text-neon-green">market edge</span> you need.
      </p>
```
with:
```typescript
      <motion.p className="relative z-10 hidden md:block text-xl text-gray-400 max-w-2xl mb-6 font-medium leading-relaxed" {...fadeUp(0.4)}>
        Scored, subscription research already works for Indian retail investors — just not for crypto, until now.
        Natural-language queries return{' '}
        <span className="text-white font-semibold">quant-grade signals</span>{' '}
        from on-chain data, ML models, and sentiment, fused into one score.
      </motion.p>
      <p className="relative z-10 md:hidden text-base text-gray-400 mt-6 mb-2 leading-relaxed">
        Scored research already works for stocks in India.{' '}
        <span className="text-neon-green">Crypto never had it — until now.</span>
      </p>
```

- [ ] **Step 3: Replace the dual CTA with a single "Request an Invite" button**

Replace lines 579-598:
```typescript
      <motion.div className="relative z-10 flex flex-col items-stretch w-full md:w-auto md:flex-row gap-4 pt-4 md:pt-0 mb-4 md:mb-6" {...fadeUp(0.55)}>
        <motion.a
          href={APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-animated-btn cta-animated-btn-solid group w-full md:w-auto py-4 md:py-3 text-base font-bold justify-center rounded-lg flex items-center no-underline"
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(14, 203, 129, 0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          Launch App <span className="ml-2">→</span>
        </motion.a>
        <motion.button
          className="group w-full md:w-auto py-4 md:py-3 px-8 text-base font-bold justify-center rounded-lg flex items-center bg-white/5 border border-white/10 text-white hover:border-neon-green/30 hover:text-neon-green transition-all"
          id="hero-cta-apply"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Apply for early access
        </motion.button>
      </motion.div>
```
with:
```typescript
      <motion.div className="relative z-10 flex flex-col items-stretch w-full md:w-auto md:flex-row gap-4 pt-4 md:pt-0 mb-4 md:mb-6" {...fadeUp(0.55)}>
        <motion.button
          className="cta-early-access-trigger cta-animated-btn cta-animated-btn-solid group w-full md:w-auto py-4 md:py-3 px-8 text-base font-bold justify-center rounded-lg flex items-center"
          id="hero-cta-apply"
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(14, 203, 129, 0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          Request an Invite <span className="ml-2">→</span>
        </motion.button>
      </motion.div>
```

Note: `APP_URL` import at line 4 becomes unused if nothing else in this file references it after this edit — check with `grep -n "APP_URL" src/components/HeroSection.tsx`; the `PRODUCT_SCREENS`/tab UI doesn't use it, so remove the import if the grep confirms no remaining usage.

- [ ] **Step 4: Replace the four `material-symbols-outlined` icons in `PRODUCT_SCREENS` and wire in `PLATFORM_STATS`**

Add the imports at the top (after line 4):
```typescript
import { Icon, type IconName } from './icons/Icon';
import { PLATFORM_STATS } from '../data/stats';
```

Replace lines 14-19:
```typescript
const PRODUCT_SCREENS = [
  { id: 'live',      label: 'Live Data',  icon: 'monitor_heart' },
  { id: 'analytics', label: 'Analytics',  icon: 'query_stats' },
  { id: 'ai',        label: 'AI Ask',     icon: 'auto_awesome' },
  { id: 'viz',       label: 'Visualize',  icon: 'bar_chart_4_bars' },
] as const;
```
with:
```typescript
const PRODUCT_SCREENS: { readonly id: string; readonly label: string; readonly icon: IconName }[] = [
  { id: 'live',      label: 'Live Data',  icon: 'trending_up' },
  { id: 'analytics', label: 'Analytics',  icon: 'terminal' },
  { id: 'ai',        label: 'AI Ask',     icon: 'auto_awesome' },
  { id: 'viz',       label: 'Visualize',  icon: 'bolt' },
] as const;
```

Replace line 265 (`<span className="material-symbols-outlined text-[12px]" style={{ color: '#0ECB81' }}>terminal</span>`) with:
```typescript
<Icon name="terminal" className="text-[#0ECB81]" size={13} />
```

Replace line 468 (`<span className="material-symbols-outlined text-[11px]">{s.icon}</span>`) with:
```typescript
<Icon name={s.icon} size={12} />
```

Below the subtitle paragraph edited in Step 2, and above the CTA block edited in Step 3, add a stats row using `PLATFORM_STATS` (insert immediately after the closing `</p>` of the mobile subtitle, before the `{/* CTA */}` comment on line 578):
```typescript
      <div className="relative z-10 flex items-center gap-6 text-xs font-mono text-gray-500 mb-2">
        <span>{PLATFORM_STATS.coins} coins</span>
        <span>{PLATFORM_STATS.indicators} indicators</span>
        <span>{PLATFORM_STATS.newsSources} news sources</span>
      </div>
```

- [ ] **Step 5: Verify visually**

Run:
```bash
cat > /tmp/pw-scratch/hero-check.js << 'EOF'
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/pw-scratch/hero.png' });
  await browser.close();
})();
EOF
cd ~/.claude/skills/playwright-skill && node run.js /tmp/pw-scratch/hero-check.js
```
Read `/tmp/pw-scratch/hero.png` and confirm: headline reads the new "proven model" narrative (not "Trade Like a Machine"), exactly one CTA button ("Request an Invite"), stats row shows 1,000+/130+/44, and the product-card tab icons render as glyphs not text.

- [ ] **Step 6: Commit**

```bash
git add src/components/HeroSection.tsx
git commit -m "feat: rewrite HeroSection copy for 'proven model, missing market' narrative, single CTA, SVG icons, stats.ts"
```

---

### Task 13: `TerminalPanel` — recopy for §4, SVG icons

**Files:**
- Modify: `src/components/TerminalPanel.tsx`
- Test: manual (see Step 3)

**Interfaces:**
- Consumes: `Icon` from `./icons/Icon` (Task 2).
- `TerminalPanelProps` unchanged.

- [ ] **Step 1: Find and replace every `material-symbols-outlined` usage in this file**

Run: `grep -n "material-symbols-outlined" src/components/TerminalPanel.tsx`

For each match, replace `<span className="material-symbols-outlined {existing-classes}">{icon_name}</span>` with `<Icon name="{icon_name}" className="{existing-classes-minus-any-font-size-utility}" size={N} />`, choosing `N` in px equivalent to whatever text-size class was removed (e.g. `text-sm` → `size={14}`, `text-base` → `size={16}`, `text-xl` → `size={20}`). If any icon name isn't already in the `IconName` union from Task 2, add it there and to the `PATHS` map with a simple matching glyph (follow the existing path style: 24x24 viewBox, 2-4 path commands).

Add the import at the top of the file:
```typescript
import { Icon } from './icons/Icon';
```

- [ ] **Step 2: Update the section heading copy to the §4 "Product" framing**

Find the section's headline text (the h2/heading element) and its id attribute. Ensure the section root element has `id="terminal-panel"` (this is the anchor target `InviteToggle`'s "For Traders" pill scrolls to, wired in Task 11 Step 3). If the headline currently reads generically, update it to lead with the four-engine framing, e.g.: `"Four engines. One terminal. Ask in English."` (matching the deck's own framing verified in the earlier gap-report research) as the h2 text, replacing whatever generic copy is currently there.

- [ ] **Step 3: Verify visually**

Run the same Playwright pattern as Task 11 Step 5, screenshotting this section specifically (use `page.locator('#terminal-panel').screenshot(...)` instead of full-page). Confirm all icons render as glyphs and the headline matches the new copy.

- [ ] **Step 4: Commit**

```bash
git add src/components/TerminalPanel.tsx
git commit -m "feat: recopy TerminalPanel for §4 Product framing, migrate icons to SVG"
```

---

### Task 14: `StrategyLibrary` — recopy for §5, SVG icons

**Files:**
- Modify: `src/components/StrategyLibrary.tsx`
- Test: manual (see Step 3)

**Interfaces:**
- Consumes: `Icon` from `./icons/Icon` (Task 2).
- `StrategyLibraryProps` unchanged.

- [ ] **Step 1: Find and replace every `material-symbols-outlined` usage in this file**

Run: `grep -n "material-symbols-outlined" src/components/StrategyLibrary.tsx` to list every match. Add this import at the top of the file:
```typescript
import { Icon } from './icons/Icon';
```
For each matched line of the form `<span className="material-symbols-outlined {classes}">{icon_name}</span>`, replace it with `<Icon name="{icon_name}" className="{classes with any text-size utility removed}" size={N} />`, converting the removed text-size class to a pixel `size` prop: `text-xs`→12, `text-sm`→14, `text-base`→16, `text-lg`→18, `text-xl`→20, `text-2xl`→24, `text-3xl`→30. Keep all non-size classes (color, opacity, etc.) in `className`. If `{icon_name}` is not already one of the values in the `IconName` union in `src/components/icons/Icon.tsx` (Task 2), add it there and add a matching entry to the `PATHS` map in that same file, following the existing 24×24-viewBox, 2-4-path-command style already used by the other icons.

- [ ] **Step 2: Verify visually**

Same Playwright screenshot pattern as prior tasks, targeting this section's root element by its existing `id` attribute (check the file for its current `id`, e.g. `id="strategy-library"` — this matches `navLinks` in `mockData.ts` line 31 which already points to `#strategy-library`, so do not change this id).

- [ ] **Step 3: Commit**

```bash
git add src/components/StrategyLibrary.tsx
git commit -m "feat: migrate StrategyLibrary icons to SVG"
```

---

### Task 15: `DynamicWatchlist` — recopy for §5, SVG icons

**Files:**
- Modify: `src/components/DynamicWatchlist.tsx`
- Test: manual (see Step 3)

**Interfaces:**
- Consumes: `Icon` from `./icons/Icon` (Task 2).
- `DynamicWatchlistProps` unchanged.

- [ ] **Step 1: Find and replace every `material-symbols-outlined` usage in this file**

Run: `grep -n "material-symbols-outlined" src/components/DynamicWatchlist.tsx` to list every match. Add this import at the top of the file:
```typescript
import { Icon } from './icons/Icon';
```
For each matched line of the form `<span className="material-symbols-outlined {classes}">{icon_name}</span>`, replace it with `<Icon name="{icon_name}" className="{classes with any text-size utility removed}" size={N} />`, converting the removed text-size class to a pixel `size` prop: `text-xs`→12, `text-sm`→14, `text-base`→16, `text-lg`→18, `text-xl`→20, `text-2xl`→24, `text-3xl`→30. Keep all non-size classes (color, opacity, etc.) in `className`. If `{icon_name}` is not already one of the values in the `IconName` union in `src/components/icons/Icon.tsx` (Task 2), add it there and add a matching entry to the `PATHS` map in that same file, following the existing 24×24-viewBox, 2-4-path-command style already used by the other icons.

- [ ] **Step 2: Verify visually**

Same Playwright screenshot pattern, targeting this section's existing `id` (matches `navLinks` line 32, `#watchlist` — do not change this id).

- [ ] **Step 3: Commit**

```bash
git add src/components/DynamicWatchlist.tsx
git commit -m "feat: migrate DynamicWatchlist icons to SVG"
```

---

### Task 16: `FaqFooter` — copy alignment, SVG icons, single CTA

**Files:**
- Modify: `src/components/FaqFooter.tsx`
- Test: manual (see Step 3)

**Interfaces:**
- Consumes: `Icon` from `./icons/Icon` (Task 2).
- `FaqFooterProps` unchanged.

- [ ] **Step 1: Find and replace every `material-symbols-outlined` usage in this file**

Run: `grep -n "material-symbols-outlined" src/components/FaqFooter.tsx` to list every match. Add this import at the top of the file:
```typescript
import { Icon } from './icons/Icon';
```
For each matched line of the form `<span className="material-symbols-outlined {classes}">{icon_name}</span>`, replace it with `<Icon name="{icon_name}" className="{classes with any text-size utility removed}" size={N} />`, converting the removed text-size class to a pixel `size` prop: `text-xs`→12, `text-sm`→14, `text-base`→16, `text-lg`→18, `text-xl`→20, `text-2xl`→24, `text-3xl`→30. Keep all non-size classes (color, opacity, etc.) in `className`. If `{icon_name}` is not already one of the values in the `IconName` union in `src/components/icons/Icon.tsx` (Task 2), add it there and add a matching entry to the `PATHS` map in that same file, following the existing 24×24-viewBox, 2-4-path-command style already used by the other icons.

- [ ] **Step 2: Consolidate any "Launch App" / "Early Access" CTA pairing in the footer to a single "Request an Invite" button**

Run: `grep -n "Launch App\|Early Access\|Apply for early access" src/components/FaqFooter.tsx`. For each match, apply the same consolidation pattern as Task 11 Steps 3-4: remove the separate "Launch App" link entirely, keep one button reading "Request an Invite" with the `cta-early-access-trigger` class.

- [ ] **Step 3: Verify visually**

Same Playwright screenshot pattern, full page footer region (`page.locator('footer, #faq').screenshot(...)` — check the actual root element/id in the file and use it).

- [ ] **Step 4: Commit**

```bash
git add src/components/FaqFooter.tsx
git commit -m "feat: consolidate FaqFooter CTA to single Request-an-Invite button, migrate icons to SVG"
```

---

### Task 17: `MobileHome` — extend to 9-section IA, stats.ts, SVG icons, single CTA

**Files:**
- Modify: `src/components/MobileHome.tsx`
- Test: manual (see Step 5)

**Interfaces:**
- Consumes: `PLATFORM_STATS` from `../data/stats` (Task 1), `Icon` from `./icons/Icon` (Task 2), `problemData`, `compsProofData`, `evidenceData`, `pricingData`, `trustData` from `../data/mockData` (Task 3).
- `SLIDE_COUNT` constant (currently `7` at line 220) must be updated to match the new total slide count once new slides are added.

- [ ] **Step 1: Add imports**

At the top of `src/components/MobileHome.tsx`, after line 11 (`import { APP_URL } from '../data/mockData';`), add:
```typescript
import { Icon } from './icons/Icon';
import { PLATFORM_STATS } from '../data/stats';
import { problemData, compsProofData, evidenceData, pricingData, trustData } from '../data/mockData';
```

- [ ] **Step 2: Fix the `SOCIAL_PROOF` stat-drift bug — consume `PLATFORM_STATS` instead of hardcoded values**

Replace lines 77-82:
```typescript
const SOCIAL_PROOF = [
  { value: '1,000+', label: 'Coins' },
  { value: '130+', label: 'Indicators' },
  { value: '44', label: 'News sources' },
  { value: '<200ms', label: 'Latency' },
];
```
with:
```typescript
const SOCIAL_PROOF = [
  { value: PLATFORM_STATS.coins, label: 'Coins' },
  { value: PLATFORM_STATS.indicators, label: 'Indicators' },
  { value: PLATFORM_STATS.newsSources, label: 'News sources' },
  { value: PLATFORM_STATS.latency, label: 'Latency' },
];
```

Also fix the hero slide's stat row (lines 439-442), which currently hardcodes the same numbers independently — this is the exact drift the audit found. Replace:
```typescript
            { icon: 'monitoring', label: '1,000+ coins tracked', value: 'Live' },
            { icon: 'neurology', label: '130+ quant indicators', value: 'Real-time' },
            { icon: 'newspaper', label: '44 news sources scored', value: 'Hourly' },
```
with:
```typescript
            { icon: 'trending_up' as const, label: `${PLATFORM_STATS.coins} coins tracked`, value: 'Live' },
            { icon: 'auto_awesome' as const, label: `${PLATFORM_STATS.indicators} quant indicators`, value: 'Real-time' },
            { icon: 'article' as const, label: `${PLATFORM_STATS.newsSources} news sources scored`, value: 'Hourly' },
```

Also fix line 533 (`130+ INDICATORS &bull; 1,000+ COINS &bull; 44 NEWS SOURCES`) to:
```typescript
{`${PLATFORM_STATS.indicators} INDICATORS • ${PLATFORM_STATS.coins} COINS • ${PLATFORM_STATS.newsSources} NEWS SOURCES`}
```

- [ ] **Step 3: Replace every remaining `material-symbols-outlined` usage in this file with `Icon`**

Run: `grep -n "material-symbols-outlined" src/components/MobileHome.tsx` to list every match (expect matches in the theme-toggle button, burger button, nav overlay, feature icons, persona icons, and `StrategySlide`'s `swipe`/`visibility` icons — exact line numbers will have shifted after Steps 1-2's edits, so re-run the grep after those steps rather than trusting line numbers from before this task). For each matched line, apply the conversion: replace `<span className="material-symbols-outlined {classes}">{value}</span>` with `<Icon name={value} className="{classes with any text-size utility removed}" size={N} />`, converting the removed text-size class to a pixel `size` prop: `text-xs`→12, `text-sm`→14, `text-base`→16, `text-lg`→18, `text-xl`→20, `text-2xl`→24, `text-3xl`→30. Where `{value}` is a dynamic expression (e.g. `{theme === 'dark' ? 'light_mode' : 'dark_mode'}` or `{p.icon}` from the `FEATURES`/`PERSONAS` arrays), pass that same expression as the `name` prop: `<Icon name={theme === 'dark' ? 'light_mode' : 'dark_mode'} size={18} />`. Where the icon name is a plain string literal already in the `IconName` union (`terminal`, `bolt`, `auto_awesome`, `article`, `light_mode`, `dark_mode`, `check_circle`), no union changes needed; for any not yet covered (e.g. `close`, `menu`, `swipe`, `visibility`, `monitoring`, `neurology`, `newspaper`), add them to the `IconName` union and `PATHS` map in `src/components/icons/Icon.tsx` in this same task (simple glyphs, matching the existing 24×24-viewBox style — e.g. `menu: <path d="M4 7h16M4 12h16M4 17h16" />`, `swipe: <path d="M8 12h13M17 8l4 4-4 4M4 6v12" />`, `visibility: <><circle cx="12" cy="12" r="3" /><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" /></>`). Note: the FEATURES/PERSONAS data arrays (lines 22-42) currently use icon name strings that don't all match the `IconName` union (`article`, `candlestick_chart`, `query_stats`) — update those string values in the arrays themselves to the closest available `IconName` (`candlestick_chart`→`trending_up`, `query_stats`→`terminal`) rather than adding narrow one-off icons for names only used once.

- [ ] **Step 4: Replace the dual CTA pattern on all three slides that have it (Hero, and "Get Started")**

Run: `grep -n "Launch App\|Apply for early access" src/components/MobileHome.tsx`. This will match: the Hero slide's `<a>`+`<button>` pair (around lines 454-467), the nav overlay's `<a>`+`<button>` pair (around lines 387-402), and the "Get Started" slide's pair (around lines 608-621). For each pair, replace both elements with a single button:
```typescript
<button
  className="cta-early-access-trigger cta-animated-btn cta-animated-btn-solid w-full py-2.5 rounded-lg text-xs font-semibold tracking-wide text-center"
>
  Request an Invite →
</button>
```
(adjust the exact className to match whatever sizing classes were on the removed `<a>` at each specific location, keeping visual sizing consistent with the slide it's in). Remove the now-unused `id="mobile-cta-apply"` / `id="mobile-cta-apply-2"` attributes and the `href`/`target`/`rel` attributes from the merged buttons — the `cta-early-access-trigger` class alone is sufficient for the click wiring already set up in `App.tsx`. After this step, check whether `APP_URL` still has any remaining usage in this file (`grep -n "APP_URL" src/components/MobileHome.tsx`); if none remain, remove the import.

- [ ] **Step 5: Add four new slides matching the desktop §2, §3, §6, §7, §8 sections, and update `SLIDE_COUNT`**

Insert a new slide immediately after the "Page 1: Hero" section closes (after line ~468's `</section>`, before the "Page 2: Why CryptoPrism" comment) is not needed — Page 2 already covers the Problem framing content (lines 471-504), just needs its copy checked against `problemData` for consistency; leave Page 2 as-is since it already matches §2's intent, but update its three stat cards (lines 487-489) to use `problemData.stats` instead of the separately-hardcoded array, for single-source-of-truth consistency:

Replace lines 487-489 (`{ stat: '81%', ... }, { stat: '84%', ... }, { stat: '49%', ... }`) — first add `problemData` import (done in Step 1) — with:
```typescript
          {problemData.stats.map((s) => ({ stat: s.value, text: s.label, src: '' })).map((s) => (
```
Actually, keep the existing map structure but source from `problemData.stats` directly — replace the whole inline array (lines 486-490) with:
```typescript
          {problemData.stats.map((s) => (
            <div key={s.value} className="flex items-center gap-4 p-4 rounded-xl m-glass">
              <span className="text-m-pnl-neg font-bold text-xl min-w-[70px]">{s.value}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-m-text2 leading-snug">{s.label}</p>
              </div>
            </div>
          ))}
```

Now insert three new slides after Page 4 ("Built for You", ends around line 575) and before `<StrategySlide />` (line 578) — a Comps Proof slide:
```typescript
      {/* ── Page: Comps Proof ──────────────────────────────────────── */}
      <section className="deck-slide h-[100dvh] overflow-hidden flex flex-col mobile-slide-base px-6 pt-14 pb-8">
        <div className="mobile-blur-veil" />
        <div className="mb-6">
          <span className="text-[10px] font-mono text-m-accent/[0.67] tracking-widest uppercase mb-3 block">{compsProofData.eyebrow}</span>
          <h2 className="text-[22px] font-bold leading-tight text-m-text1 m-heading-glow">{compsProofData.headline}</h2>
        </div>
        <div className="space-y-3 flex-1 overflow-y-auto">
          {compsProofData.cards.map((c) => (
            <div key={c.name} className="p-4 rounded-xl m-glass">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-bold text-m-text1 text-sm">{c.name}</h3>
                <span className="text-[10px] text-m-text4">{c.tag}</span>
              </div>
              <p className="font-mono text-xs text-m-accent mb-1">{c.stat}</p>
              <p className="text-xs text-m-text3 leading-relaxed">{c.lesson}</p>
            </div>
          ))}
        </div>
      </section>
```

Then after `<StrategySlide />` (line 578) and before "Page 6: Get Started" (line ~582), insert an Evidence slide and a Pricing slide:
```typescript
      {/* ── Page: Evidence ─────────────────────────────────────────── */}
      <section className="deck-slide h-[100dvh] overflow-hidden flex flex-col mobile-slide-s1 px-6 pt-14 pb-8">
        <div className="mobile-blur-veil" />
        <div className="mb-6">
          <span className="text-[10px] font-mono text-m-accent/[0.67] tracking-widest uppercase mb-3 block">{evidenceData.eyebrow}</span>
          <h2 className="text-[22px] font-bold leading-tight text-m-text1 m-heading-glow">{evidenceData.headline}</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {evidenceData.metrics.map((m) => (
            <div key={m.label} className="p-3 rounded-xl m-glass text-center">
              <p className="text-[10px] text-m-text4 uppercase tracking-wider mb-1">{m.label}</p>
              <p className="text-lg font-mono font-bold text-m-text1">{m.value}</p>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-m-text4 text-center leading-relaxed">{evidenceData.caption}</p>
      </section>

      {/* ── Page: Pricing ──────────────────────────────────────────── */}
      <section className="deck-slide h-[100dvh] overflow-hidden flex flex-col mobile-slide-base px-6 pt-14 pb-8">
        <div className="mobile-blur-veil" />
        <div className="mb-6">
          <span className="text-[10px] font-mono text-m-accent/[0.67] tracking-widest uppercase mb-3 block">{pricingData.eyebrow}</span>
          <h2 className="text-[22px] font-bold leading-tight text-m-text1 m-heading-glow">{pricingData.headline}</h2>
        </div>
        <div className="space-y-3 flex-1 overflow-y-auto">
          {pricingData.tiers.map((t) => (
            <div key={t.name} className={`p-4 rounded-xl m-glass ${t.highlighted ? 'border border-m-accent/40' : ''}`}>
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-bold text-m-text1 text-sm">{t.name}</h3>
                <span className="font-mono text-m-text1 text-sm">{t.price}{t.period}</span>
              </div>
              <p className="text-xs text-m-text3">{t.description}</p>
            </div>
          ))}
        </div>
      </section>
```

Then insert a Trust slide after "Page 6: Get Started" (line ~626) and before "Page 7: Footer":
```typescript
      {/* ── Page: Trust ────────────────────────────────────────────── */}
      <section className="deck-slide h-[100dvh] overflow-hidden flex flex-col mobile-slide-s1 px-6 pt-14 pb-8">
        <div className="mobile-blur-veil" />
        <div className="mb-6">
          <span className="text-[10px] font-mono text-m-accent/[0.67] tracking-widest uppercase mb-3 block">{trustData.eyebrow}</span>
          <h2 className="text-[22px] font-bold leading-tight text-m-text1 m-heading-glow">{trustData.headline}</h2>
        </div>
        <div className="space-y-2 mb-6">
          {trustData.founderBullets.map((b) => (
            <div key={b} className="flex items-start gap-3 p-3 rounded-xl m-glass">
              <Icon name="shield" className="text-m-accent shrink-0 mt-0.5" size={14} />
              <p className="text-xs text-m-text2 leading-snug">{b}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-m-accent font-medium mb-4">{trustData.callback}</p>
        <p className="text-[10px] text-m-text4 text-center mt-auto">{trustData.registration}</p>
      </section>
```

Finally, update `SLIDE_COUNT` at line 220 from `7` to `12` (7 original + 1 Comps Proof + 1 Evidence + 1 Pricing + 1 Trust = 11 — recount exactly against the final file once all insertions are made, since `StrategySlide` counts as one slide already included in the original 7).

- [ ] **Step 6: Verify visually**

Run:
```bash
cat > /tmp/pw-scratch/mobile-check.js << 'EOF'
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const slides = await page.$$('.deck-slide');
  console.log('slide count:', slides.length);
  for (let i = 0; i < slides.length; i++) {
    await slides[i].scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await slides[i].screenshot({ path: `/tmp/pw-scratch/mobile-${i + 1}.png` });
  }
  await browser.close();
})();
EOF
cd ~/.claude/skills/playwright-skill && node run.js /tmp/pw-scratch/mobile-check.js
```
Read each `/tmp/pw-scratch/mobile-N.png` and confirm: the printed slide count matches `SLIDE_COUNT`, all new slides render with real content (no `undefined` text), no raw ligature icon text visible anywhere, and there's exactly one CTA button per slide that has one (no duplicate Launch App / Early Access pairs).

- [ ] **Step 7: Commit**

```bash
git add src/components/MobileHome.tsx src/components/icons/Icon.tsx
git commit -m "feat: extend MobileHome to full 9-section IA, fix stat drift, migrate icons, consolidate CTAs"
```

---

### Task 18: Delete `ComparisonSection` and `PersonaSection`

**Files:**
- Delete: `src/components/ComparisonSection.tsx`
- Delete: `src/components/PersonaSection.tsx`
- Test: manual (see Step 3, combined with Task 19's App.tsx wiring since deleting these two files while they're still imported in `App.tsx` would break the build — this task's deletion and Task 19's `App.tsx` edit must land together or in immediate sequence)

**Interfaces:**
- No consumers remain after Task 19 removes the imports in `App.tsx` — verified via grep in this plan's research phase that `App.tsx` is the only importer of both.

- [ ] **Step 1: Confirm no other importers exist before deleting**

Run: `grep -rn "PersonaSection\|ComparisonSection" src --include="*.tsx" --include="*.ts"`
Expected: only matches inside `src/App.tsx` (the imports/JSX usage) and inside the two files themselves. If any other file matches, stop and investigate before deleting.

- [ ] **Step 2: Delete both files**

```bash
git rm src/components/ComparisonSection.tsx src/components/PersonaSection.tsx
```

- [ ] **Step 3: Do not run the build yet**

`npm run build` will fail at this point because `App.tsx` still imports both deleted files — that's expected and resolved in Task 19, which must be executed immediately after this task (do not commit this task in isolation; combine the `git rm` staging with Task 19's `App.tsx` changes in Task 19's commit instead of committing here).

---

### Task 19: `App.tsx` — reorder to the 9-section IA, wire new sections, remove retired ones

**Files:**
- Modify: `src/App.tsx`
- Test: manual (see Step 3)

**Interfaces:**
- Consumes: `ProblemSection` (Task 4), `CompsProofSection` (Task 5), `EvidenceSection` (Task 6), `PricingSection` (Task 7), `TrustSection` (Task 8) — all new default exports matching the existing `React.FC<{ className? }>` pattern already used by every section in this file.
- This task also finalizes Task 18's file deletion by removing the now-dangling imports.

- [ ] **Step 1: Update imports**

Replace lines 6-13:
```typescript
import { HeroSection } from './components/HeroSection';
import { MobileHome } from './components/MobileHome';
import { TerminalPanel } from './components/TerminalPanel';
import { ComparisonSection } from './components/ComparisonSection';
import { PersonaSection } from './components/PersonaSection';
import { StrategyLibrary } from './components/StrategyLibrary';
import { DynamicWatchlist } from './components/DynamicWatchlist';
import { NewsSentiment } from './components/NewsSentiment';
```
with:
```typescript
import { HeroSection } from './components/HeroSection';
import { MobileHome } from './components/MobileHome';
import { ProblemSection } from './components/ProblemSection';
import { CompsProofSection } from './components/CompsProofSection';
import { TerminalPanel } from './components/TerminalPanel';
import { StrategyLibrary } from './components/StrategyLibrary';
import { DynamicWatchlist } from './components/DynamicWatchlist';
import { EvidenceSection } from './components/EvidenceSection';
import { PricingSection } from './components/PricingSection';
import { TrustSection } from './components/TrustSection';
```

Note: `NewsSentiment` is dropped from the IA (not one of the 9 sections in the approved spec) — this component's file itself is not deleted by this plan (out of scope; if it's confirmed unused elsewhere it can be removed in a follow-up, not this plan, to keep this task's blast radius limited to the IA wiring).

- [ ] **Step 2: Replace the desktop snap-section list**

Replace lines 136-182 (the entire `<div ref={snapContainerRef} className="hidden md:block desktop-snap-container">...</div>` block) with:
```typescript
      <div ref={snapContainerRef} className="hidden md:block desktop-snap-container">
        <div className="desktop-snap-section">
          <div className="snap-content h-full">
            <HeroSection />
          </div>
        </div>
        <div className="desktop-snap-section">
          <div className="snap-content h-full">
            <ProblemSection />
          </div>
        </div>
        <div className="desktop-snap-section">
          <div className="snap-content h-full">
            <CompsProofSection />
          </div>
        </div>
        <div className="desktop-snap-section">
          <div className="snap-content h-full">
            <TerminalPanel />
          </div>
        </div>
        <div className="desktop-snap-section">
          <div className="snap-content h-full">
            <StrategyLibrary />
          </div>
        </div>
        <div className="desktop-snap-section">
          <div className="snap-content h-full">
            <DynamicWatchlist />
          </div>
        </div>
        <div className="desktop-snap-section">
          <div className="snap-content h-full">
            <EvidenceSection />
          </div>
        </div>
        <div className="desktop-snap-section">
          <div className="snap-content h-full">
            <PricingSection />
          </div>
        </div>
        <div className="desktop-snap-section">
          <div className="snap-content h-full">
            <TrustSection />
          </div>
        </div>
        <div className="desktop-snap-section">
          <div className="snap-content h-full">
            <FaqFooter />
          </div>
        </div>
      </div>
```

Note: this list has 10 `desktop-snap-section` wrappers, not 9 — the spec's 9-section IA (§1 Hero, §2 Problem, §3 CompsProof, §4 Product, §5 Strategies+Watchlist, §6 Evidence, §7 Pricing, §8 Trust, §9 FAQ/Footer) maps §5 to *two* components (`StrategyLibrary` + `DynamicWatchlist`) each kept in their own snap section (matching how they were already separate snap-sections before this plan), and `CtaFooter` from the original list is dropped since its job (a dedicated CTA section) is now redundant with the consistent "Request an Invite" CTA appearing throughout §1-§8 — do not render `CtaFooter` in the new list. If `CtaFooter.tsx` is confirmed unused elsewhere, it can be removed in a follow-up, not this plan.

- [ ] **Step 3: Verify the full page builds and renders end-to-end**

Run: `npm run build`
Expected: succeeds with no errors (confirms Task 18's deletions and this task's rewiring are consistent).

Then run:
```bash
npm run dev &
sleep 2
cat > /tmp/pw-scratch/full-page-check.js << 'EOF'
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const sections = await page.$$('.desktop-snap-section');
  console.log('desktop section count:', sections.length);
  for (let i = 0; i < sections.length; i++) {
    await sections[i].scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    await sections[i].screenshot({ path: `/tmp/pw-scratch/full-${i + 1}.png` });
  }
  await browser.close();
})();
EOF
cd ~/.claude/skills/playwright-skill && node run.js /tmp/pw-scratch/full-page-check.js
```
Read each `/tmp/pw-scratch/full-N.png` in order and confirm: section count is 10, the sequence matches Hero → Problem → CompsProof (light register, visible prism transition mark) → Terminal → StrategyLibrary → DynamicWatchlist → Evidence (light register) → Pricing (light register) → Trust (light register) → FaqFooter (dark), no console errors were thrown (check via `page.on('console', ...)` if any screenshot looks visually broken), and no section is blank/invisible.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: rewire App.tsx to the new 9-section IA, remove ComparisonSection and PersonaSection"
```

---

### Task 20: Fix reintroduced fade-in-invisible risk in the five new sections

**Files:**
- Modify: `src/components/ProblemSection.tsx` (Task 4)
- Modify: `src/components/CompsProofSection.tsx` (Task 5)
- Modify: `src/components/EvidenceSection.tsx` (Task 6)
- Modify: `src/components/PricingSection.tsx` (Task 7)
- Modify: `src/components/TrustSection.tsx` (Task 8)
- Test: manual (see Step 3)

**Interfaces:**
- Consumes: `useReducedMotion` from `motion/react` (same package already imported elsewhere in this codebase as `from 'motion/react'`, e.g. `HeroSection.tsx` line 2).
- No prop signature changes to any of the five components.

**Context:** self-review of this plan found that Tasks 4-8 each use Framer Motion's `whileInView` with `initial={{ opacity: 0, y: ... }}` on headline/card content — the same class of scroll-gated opacity animation that caused the original audit's "fade-in sections render invisible/ghosted" finding (spec §7). The original bug's specific mechanism (a custom reveal hook in the now-deleted `ComparisonSection`) is gone, but this plan's own new components reintroduce the general risk: if `prefers-reduced-motion` is set, or if the `IntersectionObserver`-based `whileInView` trigger is slow/fails, content sits at `opacity: 0` indefinitely. This task closes that gap using Framer Motion's documented pattern: set `initial={false}` (skip the animated-from state entirely) when the user prefers reduced motion.

- [ ] **Step 1: Apply the reduced-motion-safe pattern to each of the five files**

In each of the five files listed above, add this import (alongside the existing `motion` import from `motion/react` — combine into one import statement, e.g. change `import { motion } from 'motion/react';` to `import { motion, useReducedMotion } from 'motion/react';`):

Then, inside each component function body (immediately after the props destructuring line, before the `return`), add:
```typescript
  const reduceMotion = useReducedMotion();
```

Then, for every `motion.div` or `motion.h2` element in that file that has both an `initial={{ opacity: 0, ... }}` prop and a `whileInView={{ opacity: 1, ... }}` prop, change `initial={{ opacity: 0, y: N }}` to `initial={reduceMotion ? false : { opacity: 0, y: N }}` (keep the same `y` value that was already there for each specific element — do not change the animation itself, only make the initial state conditional). For example, in `ProblemSection.tsx`'s headline block, change:
```typescript
          initial={{ opacity: 0, y: 30 }}
```
to:
```typescript
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
```
Apply this same transformation to every matching `initial={{ opacity: 0, ... }}` occurrence in all five files (there is one on the headline and one on each card/metric/tier grid item per file, per how Tasks 4-8 wrote them).

- [ ] **Step 2: Run the build to verify no errors**

Run: `npm run build`
Expected: builds successfully.

- [ ] **Step 3: Verify with a simulated reduced-motion preference**

Run:
```bash
cat > /tmp/pw-scratch/reduced-motion-check.js << 'EOF'
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  const sections = await page.$$('.desktop-snap-section');
  // Problem is section index 1, CompsProof is index 2, Evidence is index 6, Pricing is 7, Trust is 8 (0-indexed) per Task 19's final order
  for (const idx of [1, 2, 6, 7, 8]) {
    await sections[idx].scrollIntoViewIfNeeded();
    await page.waitForTimeout(100); // deliberately short — the point is content must already be visible, not animating in
    await sections[idx].screenshot({ path: `/tmp/pw-scratch/reduced-motion-${idx}.png` });
  }
  await browser.close();
})();
EOF
cd ~/.claude/skills/playwright-skill && node run.js /tmp/pw-scratch/reduced-motion-check.js
```
Read each `/tmp/pw-scratch/reduced-motion-N.png` and confirm all text and cards are fully visible immediately (opacity 1), with no blank/ghosted content, even with only a 100ms settle time and `reducedMotion: 'reduce'` set.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProblemSection.tsx src/components/CompsProofSection.tsx src/components/EvidenceSection.tsx src/components/PricingSection.tsx src/components/TrustSection.tsx
git commit -m "fix: honor prefers-reduced-motion in new sections, closing the fade-in-invisible risk flagged in spec §7"
```

---

## Post-plan follow-ups (explicitly out of scope for this plan, noted per spec §9 and discovered during planning)

- `CtaFooter.tsx` and `NewsSentiment.tsx` are dropped from the render but not deleted — confirm via grep whether anything else imports them, and remove in a small separate cleanup if truly dead.
- CSS rule at `src/index.css:1963` (`/* Progress dots on PersonaSection */`) references the now-deleted `PersonaSection` — harmless dead CSS, safe to remove in a follow-up cleanup pass, not blocking for this plan.
- Full 3-region pricing matrix, backend/API changes, and pitch-deck/brand-kit routes remain untouched per spec §9.
