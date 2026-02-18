// ── Pitch Deck Data — Single Source of Truth ────────────────────────────
// CryptoPrism: AI Quant Platform for Crypto
// All statistics sourced from production READMEs and published research.

export interface SlideData {
  readonly id: string;
  readonly number: number;
  readonly headline: string;
}

export interface BleedScenario {
  readonly label: string;
  readonly stat: string;
  readonly description: string;
  readonly source: string;
}

export interface ProductPillar {
  readonly title: string;
  readonly tagline: string;
  readonly icon: 'terminal' | 'strategy' | 'watchlist' | 'news';
}

export interface PipelineNode {
  readonly label: string;
  readonly description: string;
  readonly stat?: string;
}

export interface AutopsyStep {
  readonly time: string;
  readonly trader: string;
  readonly traderOutcome: 'loss' | 'neutral';
  readonly system: string;
  readonly systemOutcome: 'win' | 'neutral';
}

export interface Persona {
  readonly role: string;
  readonly type: 'trader' | 'analyst' | 'developer';
  readonly description: string;
  readonly tools: readonly string[];
}

export interface TractionMetric {
  readonly label: string;
  readonly value: number;
  readonly suffix: string;
}

export interface PricingTier {
  readonly tier: string;
  readonly price: string;
  readonly audience: string;
  readonly features: string;
  readonly highlighted?: boolean;
}

export interface MoatItem {
  readonly title: string;
  readonly description: string;
}

// ── Slides ──────────────────────────────────────────────────────────────

export const slides: readonly SlideData[] = [
  { id: 'hero',     number: 1,  headline: 'Ask markets questions. Get quant-grade answers.' },
  { id: 'problem',  number: 2,  headline: 'Where the money disappears' },
  { id: 'product',  number: 3,  headline: 'One platform. Four intelligence layers.' },
  { id: 'engine',   number: 4,  headline: 'What powers the answers' },
  { id: 'autopsy',  number: 5,  headline: 'One crash. Two outcomes.' },
  { id: 'personas', number: 6,  headline: 'Built for three types of users' },
  { id: 'traction', number: 7,  headline: "What's already running" },
  { id: 'business', number: 8,  headline: 'SaaS + DaaS. Two revenue engines.' },
  { id: 'moat',     number: 9,  headline: 'Why this compounds' },
  { id: 'cta',      number: 10, headline: 'See the next signal first.' },
] as const;

// ── Slide 1: Hero stats ─────────────────────────────────────────────────

export const heroStats = [
  { value: '1,000+', label: 'coins tracked' },
  { value: '130+', label: 'technical indicators' },
  { value: '44', label: 'news sources' },
] as const;

// ── Slide 2: Sourced loss scenarios (KEPT) ──────────────────────────────

export const bleedScenarios: readonly BleedScenario[] = [
  {
    label: '73-81% lose money',
    stat: '73-81%',
    description: 'of retail crypto investors lost money on Bitcoin between 2015-2022. Smaller investors bought as larger holders sold — a measurable wealth transfer.',
    source: 'BIS Working Paper 1049 (Auer et al., 2022)',
  },
  {
    label: 'Disposition effect',
    stat: '1.5x',
    description: 'more likely to sell winners than losers. Traders exit profitable trades too early and hold losing trades too long, surrendering 3.4% annual returns.',
    source: 'Odean, Journal of Finance, 1998',
  },
  {
    label: 'Breakout failures',
    stat: '~70%',
    description: 'of chart pattern breakouts fail to move 5%+ in the breakout direction. Traders enter on breakouts that reverse, compounding stop-loss damage.',
    source: 'Bulkowski, Encyclopedia of Chart Patterns, 3rd ed.',
  },
] as const;

// ── Slide 3: Product pillars ────────────────────────────────────────────

export const productPillars: readonly ProductPillar[] = [
  {
    title: 'Natural Language Terminal',
    tagline: 'Ask in plain English, get quant-grade analysis',
    icon: 'terminal',
  },
  {
    title: 'Strategy Library',
    tagline: 'Clone strategies from veteran quant traders',
    icon: 'strategy',
  },
  {
    title: 'Dynamic Watchlists',
    tagline: 'Auto-filtering watchlists that kick out underperformers',
    icon: 'watchlist',
  },
  {
    title: 'News Intelligence',
    tagline: 'AI-quantified sentiment from 44+ sources, hourly',
    icon: 'news',
  },
] as const;

// ── Slide 4: Pipeline / Engine ──────────────────────────────────────────

export const pipelineNodes: readonly PipelineNode[] = [
  { label: 'Ingest',  description: '1,000+ coins from CoinMarketCap + crypto exchanges', stat: '108K+ OHLCV/run' },
  { label: 'Compute', description: '130+ technical indicators across 7 categories',      stat: '7 categories' },
  { label: 'Score',   description: 'Proprietary DMV framework (Durability/Momentum/Valuation)', stat: 'Multi-timeframe' },
  { label: 'News',    description: '44 sources, sentiment scored, 182+ topic categories', stat: '500+ articles/hr' },
  { label: 'Deliver', description: 'REST API with sub-200ms response times',             stat: '<200ms' },
] as const;

// ── Slide 5: Trade autopsy — BTC Aug 5, 2024 (Yen carry unwind) ────────

export const autopsyTitle = 'BTC — August 5, 2024 (Yen Carry Unwind)';
export const autopsyContext = 'BOJ raised rates July 31. Yen carry trades unwound globally. BTC crashed from $66K to $49K intraday — a 25% drop in hours. This is one of many scenarios CryptoPrism detects across its four intelligence layers.';

export const autopsySteps: readonly AutopsyStep[] = [
  {
    time: 'Aug 4, 22:00',
    trader: 'BTC at $62K. "Just a dip." Still holding leveraged long from $65K.',
    traderOutcome: 'neutral',
    system: 'Volatility regime classifier triggers. Cross-asset correlation spike detected (Nikkei, EUR/JPY, BTC moving together).',
    systemOutcome: 'win',
  },
  {
    time: 'Aug 5, 02:00',
    trader: 'BTC drops to $57K. Margin call warning. "It\'ll bounce at support."',
    traderOutcome: 'loss',
    system: 'Risk flag escalated. Exit signal generated at $58.5K. Liquidity thinning on all major pairs.',
    systemOutcome: 'win',
  },
  {
    time: 'Aug 5, 08:00',
    trader: 'Cascade liquidation. BTC hits $49K intraday. Position liquidated at $52K. -20% realized.',
    traderOutcome: 'loss',
    system: 'Already flat since $58.5K. No exposure during the cascade.',
    systemOutcome: 'win',
  },
  {
    time: 'Aug 5, 18:00',
    trader: 'BTC recovers to $54K. Account down 20%. Emotional, no further trades.',
    traderOutcome: 'loss',
    system: 'Regime still risk-off. No re-entry signal. Capital preserved for the actual recovery days later.',
    systemOutcome: 'win',
  },
] as const;

export const autopsySummary = {
  traderResult: '-20% (liquidated)',
  systemResult: '-5.2% (early exit at $58.5K)',
};

// ── Slide 6: Personas ───────────────────────────────────────────────────

export const personas: readonly Persona[] = [
  {
    role: 'Trader',
    type: 'trader',
    description: 'Execution-focused. Needs real-time signals and smart alerts.',
    tools: ['Real-time signals', 'Multi-exchange execution', 'Smart alerts', 'Sub-second data'],
  },
  {
    role: 'Analyst',
    type: 'analyst',
    description: 'Research-focused. Needs deep analytics and multi-factor screening.',
    tools: ['On-chain analytics', 'AI sentiment scoring', 'Whale tracking', 'Multi-factor screening'],
  },
  {
    role: 'Developer',
    type: 'developer',
    description: 'Integration-focused. Needs raw API and SDK access.',
    tools: ['REST / WebSocket API', 'Strategy SDK', 'Webhooks', 'On-chain indexing pipeline'],
  },
] as const;

// ── Slide 7: Traction (real repo metrics) ───────────────────────────────

export const tractionMetrics: readonly TractionMetric[] = [
  { label: 'Cryptocurrencies tracked',     value: 1000, suffix: '+' },
  { label: 'Technical indicators',         value: 130,  suffix: '+' },
  { label: 'News articles / hour',         value: 500,  suffix: '+' },
  { label: 'News sources',                 value: 44,   suffix: '+' },
  { label: 'Production repositories',      value: 17,   suffix: '' },
  { label: 'Pipeline uptime',              value: 99.9, suffix: '%' },
  { label: 'PostgreSQL databases',         value: 3,    suffix: '' },
  { label: 'OHLCV records / daily run',    value: 108000, suffix: '+' },
] as const;

// ── Slide 8: Business model ─────────────────────────────────────────────

export const businessTiers: readonly PricingTier[] = [
  {
    tier: 'Signal',
    price: '$49/mo',
    audience: 'B2C — Retail Traders',
    features: 'Regime alerts, entry/exit signals, 10 assets, basic watchlists',
  },
  {
    tier: 'Edge',
    price: '$149/mo',
    audience: 'B2C — Active Traders',
    features: 'Full scoring API, all assets, strategy library, news intelligence, custom thresholds',
    highlighted: true,
  },
  {
    tier: 'Infra',
    price: 'Custom',
    audience: 'B2B — Funds & Trading Desks',
    features: 'Raw pipeline API, SDK, webhooks, dedicated support, SLA',
  },
] as const;

export const businessModel = {
  saasLabel: 'SaaS (B2C)',
  saasDesc: 'Self-serve platform for retail and active traders',
  daasLabel: 'DaaS (B2B)',
  daasDesc: 'Raw pipeline API access for funds, desks, and platforms',
} as const;

// ── Slide 9: Competitive moat ───────────────────────────────────────────

export const moatItems: readonly MoatItem[] = [
  {
    title: 'Proprietary DMV Scoring',
    description: 'Durability / Momentum / Valuation framework — not available on any other platform',
  },
  {
    title: '130+ Indicators',
    description: 'More than TradingView (~100). Seven categories covering momentum, volatility, volume, trend, oscillators, support/resistance, and statistical',
  },
  {
    title: 'Multi-Timeframe',
    description: 'Hourly + daily pipelines, 1m to 1W candles. Most competitors only offer daily',
  },
  {
    title: 'News Sentiment Layer',
    description: '44 sources, 182+ topics, AI-scored sentiment. Not just price data — narrative intelligence',
  },
  {
    title: 'Natural Language Interface',
    description: 'Ask questions in plain English vs. navigating complex UIs. Quant-grade analysis without quant-grade complexity',
  },
  {
    title: 'Full-Stack Ownership',
    description: '17 production repos, 3 databases, zero vendor dependency. Complete control of the pipeline end-to-end',
  },
] as const;

// ── Sources (for reference / citation slide) ────────────────────────────

export const sources = [
  { key: 'BIS-1049',    citation: 'Auer et al., "Crypto trading and Bitcoin prices," BIS Working Paper 1049, Nov 2022', url: 'https://www.bis.org/publ/work1049.htm' },
  { key: 'BIS-69',      citation: 'BIS Bulletin No. 69, "Crypto shocks and retail losses," Nov 2022', url: 'https://www.bis.org/publ/bisbull69.htm' },
  { key: 'Odean-1998',  citation: 'Odean, "Are Investors Reluctant to Realize Their Losses?" Journal of Finance, 1998', url: 'https://faculty.haas.berkeley.edu/odean/papers%20current%20versions/areinvestorsreluctant.pdf' },
  { key: 'Barber-2000', citation: 'Barber & Odean, "Trading is Hazardous to Your Wealth," Journal of Finance, 2000', url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=219228' },
  { key: 'Bulkowski',   citation: 'Bulkowski, Encyclopedia of Chart Patterns, 3rd ed., Wiley, 2021', url: 'https://thepatternsite.com/studystudy.html' },
  { key: 'ESMA',        citation: 'ESMA Product Intervention: 74-89% of retail CFD accounts lose money, 2018', url: 'https://www.esma.europa.eu/press-news/esma-news/esma-agrees-prohibit-binary-options-and-restrict-cfds-protect-retail-investors' },
  { key: 'CoinDesk-Yen', citation: 'CoinDesk, "Bitcoin drops 15% against Japanese yen," Aug 5, 2024', url: 'https://www.coindesk.com/markets/2024/08/05/bitcoin-drops-15-against-japanese-yen-outpacing-declines-versus-usd-as-yen-carry-trades-unwind' },
  { key: 'CFTC-2024',   citation: 'CFTC, "Retail Traders in Futures Markets," 2024', url: 'https://www.cftc.gov/node/249641' },
] as const;
