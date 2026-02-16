# Enhancement Plan: All Remaining Components

> Components 01 (HeroSection) and 02 (TerminalPanel suite) are already enhanced.
> This plan covers Components 03–10.

---

## Component 03: ComparisonSection
**File**: `src/components/ComparisonSection.tsx` (212 lines)
**Current state**: CSS-only transitions via `useTerminalReveal` hook. No Motion library.

### Enhancements
| # | Enhancement | Detail |
|---|-------------|--------|
| 1 | **Section whileInView entrance** | Heading + subtitle fade up on scroll into viewport |
| 2 | **Terminal cards stagger** | Left card slides in from left, right card from right, with 0.3s offset |
| 3 | **Replace CSS RevealLine with Motion** | Swap `transition-all duration-500` for `motion.div` with `initial/animate` controlled by `visibleCount` — smoother easing, spring physics |
| 4 | **Code block glow pulse** | Prism terminal code block gets a subtle infinite border-glow animation once revealed |
| 5 | **Tag badges pop-in** | Tags use `motion.span` with `scale: 0 → 1` spring entrance (staggered) |
| 6 | **Ambient orb parallax** | The two background blur orbs drift gently on scroll via `useScroll` + `useTransform` |

**Estimated complexity**: Medium — mostly swapping CSS transitions for Motion equivalents.

---

## Component 04: PersonaSection
**File**: `src/components/PersonaSection.tsx` (200 lines)
**Current state**: CSS transitions (`duration-700`), scale transforms, auto-play timer. No Motion library.

### Enhancements
| # | Enhancement | Detail |
|---|-------------|--------|
| 1 | **Section whileInView entrance** | Heading fades up on scroll |
| 2 | **AnimatePresence carousel** | Replace CSS transition classes with `AnimatePresence mode="wait"` for card swaps — smoother enter/exit with directional slide |
| 3 | **Active card spring scale** | Active card uses `motion.div` with `layoutId` for smooth size/position interpolation |
| 4 | **Tool grid stagger** | Tools in active card animate in with stagger (0.05s per item) |
| 5 | **Dot indicator layoutId** | Active dot pill uses `layoutId="persona-dot"` for sliding green indicator |
| 6 | **Hover lift on cards** | `whileHover={{ y: -5 }}` on adjacent cards |
| 7 | **Auto-play progress bar** | Thin green bar under active dot that fills over 4s showing auto-rotation timer |

**Estimated complexity**: High — carousel swap logic needs careful AnimatePresence integration.

---

## Component 05: StrategyLibrary
**File**: `src/components/StrategyLibrary.tsx` (317 lines)
**Current state**: CSS-only infinite ticker animation, hover scale on icons. No Motion library.

### Enhancements
| # | Enhancement | Detail |
|---|-------------|--------|
| 1 | **Section whileInView entrance** | Badge, headline, subtitle stagger in |
| 2 | **Feature cards stagger** | Right-side feature items animate in one by one with `whileInView` + stagger |
| 3 | **Feature icon spring** | Icons use `whileHover={{ scale: 1.15, rotate: 5 }}` with spring physics |
| 4 | **CTA button pulse glow** | "Browse Entire Library" button gets a subtle infinite shadow pulse |
| 5 | **Strategy card hover lift** | Cards in ticker get `whileHover={{ y: -4 }}` with shadow increase |
| 6 | **Table row highlight** | Highlighted row (score leader) gets a breathing green left-border glow |
| 7 | **Lock icon shake** | Locked strategy card lock icon does a subtle shake on hover (denied access feel) |

**Estimated complexity**: Medium — ticker stays CSS (infinite scroll), Motion added as overlay effects.

---

## Component 06: DynamicWatchlist
**File**: `src/components/DynamicWatchlist.tsx` (363 lines)
**Current state**: Static table, CSS sparklines, LED dots. No Motion library.

### Enhancements
| # | Enhancement | Detail |
|---|-------------|--------|
| 1 | **Section whileInView entrance** | Badge + headline + subtitle stagger |
| 2 | **Table rows stagger** | Rows animate in from bottom with 0.1s stagger delay |
| 3 | **LED dots spring pop** | Q/V/M/G LED dots use `motion.div` with `scale: 0 → 1` spring (like AdvancedViz) |
| 4 | **Sparkline draw animation** | Reuse the `sparkline-draw` CSS class from AdvancedViz for watchlist sparklines |
| 5 | **Feature cards whileInView** | Right-side feature cards slide in from right with stagger |
| 6 | **CTA line grow** | The vertical green line above CTA button animates its height from 0 |
| 7 | **Exchange labels fade** | Exchange names (COINBASE, BINANCE...) fade in one by one |
| 8 | **Toolbar button hover** | Toolbar buttons get `whileHover` scale spring |

**Estimated complexity**: Medium — mostly adding entrance animations to existing static elements.

---

## Component 07: NewsSentiment
**File**: `src/components/NewsSentiment.tsx` (300 lines)
**Current state**: Static SVG gauge, CSS hover transitions. No Motion library.

### Enhancements
| # | Enhancement | Detail |
|---|-------------|--------|
| 1 | **Section whileInView entrance** | Badge + headline + subtitle stagger |
| 2 | **Gauge needle animation** | Needle rotates from 0° to target angle with spring physics on whileInView |
| 3 | **Gauge arc draw** | Colored arc draws itself with `strokeDashoffset` animation (like sparklines) |
| 4 | **Article cards stagger** | News articles slide in from left one by one |
| 5 | **Tag badges pop-in** | Article tags use `motion.span` spring scale entrance |
| 6 | **Feature items whileInView** | Right-side features slide in from right with stagger |
| 7 | **Upgrade card entrance** | Premium card scales up from 0.95 with a glow pulse |
| 8 | **Headline hover color shift** | Article headline color transition on hover uses Motion instead of CSS |

**Estimated complexity**: Medium-High — SVG gauge animation needs careful spring tuning.

---

## Component 08: CtaFooter
**File**: `src/components/CtaFooter.tsx` (145 lines)
**Current state**: CSS `animate-pulse`/`animate-ping` on star particles. No Motion library.

### Enhancements
| # | Enhancement | Detail |
|---|-------------|--------|
| 1 | **Headline whileInView** | Main headline + subtitle fade up on scroll |
| 2 | **Star particles float** | Replace CSS `animate-pulse` with Motion `animate` using random y-drift + opacity keyframes |
| 3 | **CTA buttons stagger** | "Apply for Early Access" + "Watch Demo" buttons stagger in with spring |
| 4 | **Platform buttons cascade** | Web/iOS/Android buttons pop in one by one (0.15s stagger) |
| 5 | **Icon breathing glow** | Center icon (`temp_preferences_custom`) gets a slow-pulsing green glow |
| 6 | **Scroll-triggered parallax** | Star particles move at different scroll speeds via `useTransform` |

**Estimated complexity**: Low-Medium — mostly entrance animations on a relatively simple layout.

---

## Component 09: FaqFooter
**File**: `src/components/FaqFooter.tsx` (217 lines)
**Current state**: CSS `max-height` accordion, `rotate-180` on chevron. `useState` for open index.

### Enhancements
| # | Enhancement | Detail |
|---|-------------|--------|
| 1 | **Section whileInView entrance** | Heading fades up |
| 2 | **Accordion items stagger** | FAQ items animate in one by one on scroll |
| 3 | **AnimatePresence accordion** | Replace CSS `max-height` transition with Motion `AnimatePresence` + `motion.div` height animation — smoother open/close |
| 4 | **Chevron rotation** | Use `motion.span animate={{ rotate: isOpen ? 180 : 0 }}` with spring |
| 5 | **Footer columns stagger** | Footer link columns fade up with 0.1s stagger on whileInView |
| 6 | **Social icons hover** | `whileHover={{ scale: 1.2, y: -2 }}` with spring on social SVGs |

**Estimated complexity**: Low-Medium — accordion is the main piece, rest is simple entrance animations.

---

## Component 10: Header
**File**: `src/components/Header.tsx` (38 lines)
**Current state**: CSS hover transitions only. No Motion library. No mobile menu.

### Enhancements
| # | Enhancement | Detail |
|---|-------------|--------|
| 1 | **Initial entrance** | Logo + nav items cascade in from top (stagger 0.05s each) |
| 2 | **Scroll-aware backdrop** | On scroll > 50px, header gets `backdrop-blur` + subtle border-bottom + shadow (animated transition) |
| 3 | **Nav link hover underline** | Animated green underline that slides in from left on hover |
| 4 | **CTA button spring** | "Establish Link" button gets `whileHover`/`whileTap` spring |
| 5 | **Mobile hamburger menu** | Add hamburger icon below `md` breakpoint. AnimatePresence slide-down panel with nav links |
| 6 | **Logo pulse on load** | Diamond icon gets a one-time green glow pulse on mount |

**Estimated complexity**: Medium — mobile menu is the main new feature.

---

## Component 02b: MediumViz (missed in round 2)
**File**: `src/components/MediumViz.tsx` (85 lines)
**Current state**: CSS transition on progress bars (`duration-700`), hover indicator. No Motion library.

### Enhancements
| # | Enhancement | Detail |
|---|-------------|--------|
| 1 | **Bar stagger entrance** | Each bar row animates in with delay (like AdvancedViz rows) |
| 2 | **Progress bar animate** | Replace CSS `width` transition with `motion.div initial={{ width: 0 }} animate={{ width: target }}` |
| 3 | **Flagged badge pop** | "Flagged" badges use `motion.span` spring scale entrance |
| 4 | **Hover indicator spring** | The vertical position line springs in with opacity via Motion instead of CSS |
| 5 | **Count footer fade** | "X protocols analyzed" fades in after bars complete |

**Estimated complexity**: Low — mirrors BasicViz pattern.

---

## Implementation Order (Recommended)

| Priority | Component | Rationale |
|----------|-----------|-----------|
| 1 | **MediumViz** | Quick win, completes the TerminalPanel suite |
| 2 | **ComparisonSection** | Next in scroll order, high visual impact |
| 3 | **PersonaSection** | Carousel is a showpiece, high complexity but high reward |
| 4 | **Header** | Mobile menu is a UX necessity, scroll-aware header affects every page |
| 5 | **StrategyLibrary** | Adds polish to a data-heavy section |
| 6 | **DynamicWatchlist** | Similar patterns to StrategyLibrary, can reuse approaches |
| 7 | **NewsSentiment** | SVG gauge animation is a nice touch |
| 8 | **CtaFooter** | Simple but impactful — final CTA before user leaves |
| 9 | **FaqFooter** | Lowest priority, but accordion upgrade is clean |

---

## Shared Patterns Across All Components

These patterns are reused across components to keep the codebase consistent:

```typescript
// 1. Fade-up entrance (reused everywhere)
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay },
});

// 2. Spring hover (buttons, cards)
whileHover={{ scale: 1.03 }}
whileTap={{ scale: 0.97 }}
transition={{ type: 'spring', stiffness: 400, damping: 25 }}

// 3. Stagger children pattern
children.map((item, i) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.1 }}
  />
))

// 4. layoutId for sliding indicators
<motion.div layoutId="unique-id" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />
```

---

## Total Scope
- **8 components** to enhance + MediumViz
- **~55 individual enhancements**
- All use the Motion library (already installed)
- No new dependencies needed
- Iterative: one component at a time, build → test → commit → push
