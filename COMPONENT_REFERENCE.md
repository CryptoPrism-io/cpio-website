# 🗺️ Crypto Prism — Complete Component & Element Reference

> Auto-generated reference of every section, component, card, and UI element on the website.
> Page order: top → bottom.

---

## 1. `<Header />` — `src/components/Header.tsx`

| Element        | Description                                  |
| -------------- | -------------------------------------------- |
| **Logo**       | Diamond icon + "CRYPTO PRISM" mono text      |
| **Nav Links**  | Discovery, Terminal, Strategies, Market Buzz |
| **CTA Button** | "Establish Link" — outlined green pill       |

---

## 2. `<HeroSection />` — `src/components/HeroSection.tsx`

| Element                  | Description                                          |
| ------------------------ | ---------------------------------------------------- |
| **Headline**             | "See What the Market Can't. / Act Before It Reacts." |
| **Subtitle**             | AI infrastructure for quant-grade crypto analysis    |
| **Primary CTA**          | "Start Free Analysis" — solid green button           |
| **Secondary CTA**        | "Watch Demo" — outlined button                       |
| **Command Bar**          | Terminal-style input showing query prompts           |
| **Feature Tabs**         | 3 tabs: Screener, Strategies, Market Buzz            |
| **System Status Ticker** | Scrolling mono-font status line                      |

---

## 3. `<TerminalPanel />` — `src/components/TerminalPanel.tsx`

| Element             | Description                                            |
| ------------------- | ------------------------------------------------------ |
| **Terminal Window** | Glassmorphic panel with dot traffic lights             |
| **Command Line**    | `> prism.scan()` typed command                         |
| **Output Table**    | Token scan results (symbol, price, signal, confidence) |
| **Status Bar**      | Bottom bar with connection/latency info                |

---

## 4. `<ComparisonSection />` — `src/components/ComparisonSection.tsx`

| Element              | Description                                  |
| -------------------- | -------------------------------------------- |
| **Section Badge**    | "Why Prism?" pill                            |
| **Headline**         | Comparison section title                     |
| **Comparison Cards** | Side-by-side "Without Prism" vs "With Prism" |
| **Feature List**     | Checkmark items highlighting advantages      |

---

## 5. `<PersonaSection />` — `src/components/PersonaSection.tsx`

| Element           | Description                                                         |
| ----------------- | ------------------------------------------------------------------- |
| **Section Badge** | "Built For You" pill                                                |
| **Headline**      | Persona-targeted title                                              |
| **Persona Cards** | 3 cards targeting different user types (Trader, Analyst, Developer) |
| **Card Icon**     | Icon representing each persona                                      |
| **Card Features** | Feature bullet list per persona                                     |

---

## 6. `<StrategyLibrary />` — `src/components/StrategyLibrary.tsx`

| Element                             | Description                                                               |
| ----------------------------------- | ------------------------------------------------------------------------- |
| **Section Badge**                   | "✦ Strategy Vault" pill                                                   |
| **Headline**                        | "Pre-Built Strategies. / Backtested. Transparent. Ready." with green glow |
| **Subtitle**                        | Description of copy-and-deploy strategies                                 |
| **Vertical Ticker**                 | Auto-scrolling infinite loop of strategy cards (hover to pause)           |
| **Strategy Card: Balanced Trio**    | RSI + MACD + Volume — Win Rate 64%, Sharpe 1.8, 212 trades                |
| **Strategy Card: Support Bounce**   | Order Book Imbalance — Win Rate 71%, Sharpe 2.1, 89 trades                |
| **Strategy Card: Whale Divergence** | On-Chain Whale + Price — Win Rate 58%, Sharpe 1.5, 156 trades             |
| **Strategy Card: DeFi Yield**       | TVL Momentum + APY — Win Rate 67%, Sharpe 1.9, 134 trades                 |
| **Locked Teaser Card**              | Blurred card with lock icon (upsell)                                      |
| **Feature Items**                   | 3 features: AI-Generated, Risk-Adjusted, One-Click Deploy                 |
| **CTA Button**                      | "Explore All Strategies →" green pill                                     |
| **Fade Masks**                      | Top/bottom gradient overlays on ticker                                    |

---

## 7. `<DynamicWatchlist />` — `src/components/DynamicWatchlist.tsx`

| Element                                | Description                                                                                        |
| -------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Section Badge**                      | "✦ Playground" pill                                                                                |
| **Headline**                           | "Static Watchlists are Dead. Go Dynamic." with green glow                                          |
| **Subtitle**                           | Description of auto-add/drop criteria                                                              |
| **Data Table Panel** (left, 8/12)      | Glassmorphic panel with inner glow border                                                          |
| **Toolbar**                            | Watchlist name "Bollinger Upper Band Breakout" + "20 Tokens" badge + view mode buttons             |
| **Table Header**                       | Symbol, Featured In, Price, Q/V/M/G, 1D, % Returns Since Added, Volume                             |
| **Token Row: BTCUSDT**                 | Orange "B" badge, 4 screens, $67,234, green LED dots, +2.4% sparkline, +12.8% returns, $2.1B vol   |
| **Token Row: ETHUSDT**                 | Blue "E" badge, 3 screens, $3,456, mixed LED dots, -1.2% sparkline, +8.3% returns, $890M vol       |
| **Token Row: SOLUSDT**                 | Purple "S" badge, 6 screens, $178.90, green LED dots, +5.7% sparkline, +24.1% returns, $456M vol   |
| **Token Row: PEPEUSDT**                | Green "P" badge, 2 screens, $0.00001234, mixed LED dots, -3.8% sparkline, -5.2% returns, $123M vol |
| **LED Dots**                           | Q/V/M/G quality indicators — green (good), orange (moderate), red (poor)                           |
| **SVG Sparklines**                     | 1-day trend lines with green glow (up) or red glow (down)                                          |
| **Feature Card: Auto-Filtering**       | Funnel icon + description                                                                          |
| **Feature Card: "Featured In" Signal** | Star icon + description                                                                            |
| **Feature Card: Smart Tables**         | Table icon + description                                                                           |
| **Gradient Divider**                   | Green-to-transparent horizontal line                                                               |
| **CTA Button**                         | "Start Monitoring Now →" green pill                                                                |
| **Exchange Labels**                    | COINBASE · BINANCE · KRAKEN · OKX (faded mono)                                                     |

---

## 8. `<NewsSentiment />` — `src/components/NewsSentiment.tsx`

| Element                           | Description                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------------- |
| **Section Badge**                 | "📰 Market Buzz" pill                                                                 |
| **Headline**                      | "News Without the Noise. / Signals Without the Bias." with green glow                 |
| **Subtitle**                      | AI reads, interprets, and quantifies news impact                                      |
| **News Feed Panel** (left, 8/12)  | Scrollable glassmorphic container                                                     |
| **Article 1: Network Congestion** | 🔴 Bearish gauge (-60°), Moderate impact, Layer 1, Economic Times, tags: SOL, INFRA   |
| **Article 2: TVL Surge**          | 🟢 Bullish gauge (+45°), High impact, DeFi, The Block, tags: AAVE, MKR, INSTITUTIONAL |
| **Article 3: G20 Regulation**     | ⚪ Neutral gauge (0°), Low impact, Policy, Reuters, tags: REGULATION, MACRO           |
| **SVG Sentiment Gauge**           | Half-circle arc with colored fill + rotating needle + center dot                      |
| **Impact Badge**                  | "Moderate" / "High" / "Low" text below gauge                                          |
| **Category Badges**               | Layer 1, DeFi, Policy (gray pills)                                                    |
| **Ticker Tags**                   | Mono-font pills: SOL, INFRA, AAVE, etc.                                               |
| **Feature: Quantified Sentiment** | Trending up icon + volatility scoring description                                     |
| **Feature: AI Analysis**          | Psychology icon + executive summary description                                       |
| **Feature: Sector Heatmap**       | Map icon + sector visualization description                                           |
| **Upgrade Card**                  | Dashed border glassmorphic card                                                       |
| **Upgrade Text**                  | "Upgrade to Pro for 0ms Latency"                                                      |
| **GO PREMIUM Button**             | Solid green button with neon shadow                                                   |
| **Decorative Bolt**               | Faded bolt icon in bottom-right corner                                                |

---

## 9. `<CtaFooter />` — `src/components/CtaFooter.tsx`

| Element                        | Description                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------ |
| **Background: Particle Field** | Green dot grid with radial mask (20% opacity)                                                    |
| **Background: Radial Glow**    | Forest green → transparent radial gradient                                                       |
| **Floating Star Dots**         | 6 small dots (white + green, some pulsing/pinging)                                               |
| **Headline**                   | "Unleash the power of AI × Trading" with neon text shadow                                        |
| **Subtitle**                   | AI copilot combining logic, signals, automation                                                  |
| **Icon Circle**                | Glassmorphic circle with settings icon                                                           |
| **Tagline**                    | "Still Free, For Now :)" green neon glow text                                                    |
| **Primary CTA**                | "Apply for Early Access" — solid green, neon shadow                                              |
| **Outline CTA**                | "Watch Demo" — bordered green with play arrow icon                                               |
| **Platform Label**             | "Try Tradl on" uppercase tracking text                                                           |
| **Platform: Web**              | Active — green border + glow, desktop icon                                                       |
| **Platform: iOS**              | Inactive — dimmed, "(Soon)" label                                                                |
| **Platform: Android**          | Inactive — dimmed, "(Soon)" label                                                                |
| **Mini Footer Bar**            | Privacy + Terms links (left), © 2024 CRYPTO PRISM LABS (center), 3 decorative green dots (right) |

---

## 10. `<FaqFooter />` — `src/components/FaqFooter.tsx`

### FAQ Section

| Element                    | Description                                                                 |
| -------------------------- | --------------------------------------------------------------------------- |
| **Background**             | Radial gradient (forest green → dark) + cross-pattern SVG field             |
| **Headline**               | "Questions? We've got answers." — green accent                              |
| **FAQ Accordion Item 1**   | "How is this different from a regular screener?" — AI vs lagging indicators |
| **FAQ Accordion Item 2**   | "Do you execute trades for me?" — intelligence platform, not fund manager   |
| **FAQ Accordion Item 3**   | "What markets do you support?" — 200+ assets, Binance/OKX/Bybit             |
| **FAQ Accordion Item 4**   | "How accurate is the AI?" — 74% precision, full transparency                |
| **FAQ Accordion Item 5**   | "Is my data secure?" — AES-256, HSM, monthly audits                         |
| **Accordion Chevron**      | Green expand_more icon, rotates 180° when open                              |
| **Accordion Answer Panel** | Expandable with max-height animation, green-tinted background               |

### Detailed Footer

| Element               | Description                                                     |
| --------------------- | --------------------------------------------------------------- |
| **Footer Brand**      | Green token icon + "CRYPTO PRISM" mono bold + tagline paragraph |
| **Footer: Company**   | About, Careers, Contact                                         |
| **Footer: Resources** | Discovery, Playground, Market Buzz, Documentation               |
| **Footer: Legal**     | Privacy Policy, Terms of Use, Cookie Policy                     |
| **Copyright Bar**     | © 2026 Crypto Prism. All rights reserved.                       |
| **Social: LinkedIn**  | SVG icon, hover → green                                         |
| **Social: YouTube**   | SVG icon, hover → green                                         |
| **Social: Twitter/X** | SVG icon, hover → green                                         |

---

## 📁 Supporting Files

| File                                   | Purpose                                                                     |
| -------------------------------------- | --------------------------------------------------------------------------- |
| `src/index.css`                        | All custom CSS (glassmorphism, animations, neon glows, accordions, tickers) |
| `src/data/mockData.ts`                 | Shared mock data (nav links, hero text, footer links, etc.)                 |
| `src/assets/hero-screenshot.png`       | Stitch reference for Hero                                                   |
| `src/assets/strategy-screenshot.png`   | Stitch reference for Strategy Library                                       |
| `src/assets/watchlist-screenshot.png`  | Stitch reference for Dynamic Watchlist                                      |
| `src/assets/sentiment-screenshot.png`  | Stitch reference for News & Sentiment                                       |
| `src/assets/cta-footer-screenshot.png` | Stitch reference for CTA                                                    |
| `src/assets/faq-footer-screenshot.png` | Stitch reference for FAQ & Footer                                           |

---

## 🎨 Design System Constants

| Token                    | Value                                  |
| ------------------------ | -------------------------------------- |
| **Primary / Neon Green** | `#0ECB81`                              |
| **Background Dark**      | `#020405`                              |
| **Cyber Forest**         | `#0A1A12`                              |
| **Bearish Red**          | `#FF4D4D`                              |
| **Display Font**         | Plus Jakarta Sans                      |
| **Mono Font**            | JetBrains Mono                         |
| **Glass Panel BG**       | `rgba(10, 26, 18, 0.4)` + `blur(20px)` |
| **Glow Border**          | `rgba(14, 203, 129, 0.15)`             |
| **Neon Shadow**          | `0 0 20px rgba(14, 203, 129, 0.4)`     |
