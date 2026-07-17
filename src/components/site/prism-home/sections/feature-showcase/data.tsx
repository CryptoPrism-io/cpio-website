// Feature Showcase — typed mock-data module.
//
// Ported verbatim from the design-tool export at
// docs/superpowers/specs/reference/2026-07-17-hero-design-v3.html
// (NAV_LABELS/buildNav: lines 953-959; SCREENS: lines 961-1126;
// derived-color mappings: lines 1153-1195).
//
// Every string/number value below is transcribed byte-exact from that
// reference. `var(--accent)` / `var(--accent-2)` data values are
// substituted with their resolved hex equivalents '#0FAE72' / '#0B8D84'.

export type ScreenKey = 'dashboard' | 'screener' | 'screens' | 'analytics' | 'calendar' | 'news';

export interface Caption {
  icon: 'spark' | 'antenna' | 'shield' | 'target' | 'grid' | 'message' | 'chart';
  title: string;
  desc: string;
  num: string;
}

export interface ScreenBase {
  key: ScreenKey;
  tabLabel: string;
  navActive: string;
  headlineA: string;
  headlineB: string;
  sub: string;
  captions: Caption[];
  closing: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface DashboardData extends ScreenBase {
  key: 'dashboard';
  ticker: { sym: string; price: string; chg: string }[];
  priceCards: { name: string; price: string; chg: string; sparkPath: string }[];
  totalCap: string;
  totalCapChg: string;
  vol24h: string;
  fng: string;
  dailyRecap: string[];
  newsList: { cat: string; time: string; title: string }[];
  captionCols: number;
}

export interface ScreenerData extends ScreenBase {
  key: 'screener';
  prompt: string;
  examples: string[];
  resultsMeta: string;
  filters: string[];
  results: {
    sym: string;
    name: string;
    score: number;
    price: string;
    chg24: string;
    chg7: string;
    mcap: string;
    etf: string;
    iconBg: string;
    sparkPath: string;
  }[];
  captionCols: number;
}

export interface ScreensData extends ScreenBase {
  key: 'screens';
  categories: { label: string; color: string; bg: string }[];
  screenCards: {
    title: string;
    tag: string;
    desc: string;
    meta: string;
    plus: string;
    sparkPath: string;
    sparkColor: string;
  }[];
  captionCols: number;
}

export interface AnalyticsData extends ScreenBase {
  key: 'analytics';
  ticker: { sym: string; price: string; chg: string }[];
  tabs2: { label: string; active?: boolean }[];
  metricCards: {
    label: string;
    value: string;
    chg: string;
    sparkPath?: string;
    fng?: boolean;
  }[];
  gainers: { sym: string; price: string; chg: string; vol: string }[];
  liquidations: string;
  long: string;
  short: string;
  captionCols: number;
}

export interface CalendarData extends ScreenBase {
  key: 'calendar';
  weekDays: { d: string; n: string; c: string; active?: boolean }[];
  ticker: { sym: string; price: string; chg: string }[];
  events: {
    time: string;
    name: string;
    sub: string;
    country: string;
    impact: string;
    actual: string;
    actualColor: string;
    forecast: string;
    prev: string;
  }[];
  connections: { sym: string; level: string; warm: boolean }[];
  eventDetail: string;
  eventTime: string;
  countdown: string;
  eventImpactText: string;
  captionCols: number;
}

export interface NewsData extends ScreenBase {
  key: 'news';
  headlines: {
    tag: string;
    source: string;
    time: string;
    title: string;
    active?: boolean;
  }[];
  newsDetailTitle: string;
  aiSummary: string;
  takeaways: string[];
  impactScore: string;
  sentiment: string;
  affected: { sym: string; s: string }[];
  captionCols: number;
}

export type ScreenData = DashboardData | ScreenerData | ScreensData | AnalyticsData | CalendarData | NewsData;

export const NAV_LABELS: string[] = [
  'Dashboard',
  'Screener',
  'Screens',
  'Signals',
  'Research',
  'Newsdesk',
  'Economic Calendar',
  'Watchlist',
  'Alerts',
  'Analytics',
  'Models',
  'Settings',
];

export function buildNav(activeLabel: string): { label: string; weight: number; color: string; bg: string }[] {
  return NAV_LABELS.map((label) => ({
    label,
    weight: label === activeLabel ? 700 : 500,
    color: label === activeLabel ? '#0B8D84' : '#475467',
    bg: label === activeLabel ? '#F2FAF6' : 'transparent',
  }));
}

export const SCREENS: ScreenData[] = [
  {
    key: 'dashboard',
    tabLabel: 'Unified Dashboard',
    navActive: 'Dashboard',
    headlineA: 'One Workspace.',
    headlineB: 'Every Investment Decision.',
    sub: 'Open CryptoPrism and instantly understand what matters across the market. No scattered dashboards. No endless tabs.',
    ticker: [
      { sym: 'BTC', price: '$64,695.00', chg: '+3.27%' },
      { sym: 'ETH', price: '$1,877.12', chg: '+5.20%' },
      { sym: 'SOL', price: '$77.44', chg: '+3.03%' },
      { sym: 'BNB', price: '$577.13', chg: '+1.17%' },
      { sym: 'USDT', price: '$0.9992', chg: '+0.05%' },
      { sym: 'XRP', price: '$0.5241', chg: '+2.11%' },
      { sym: 'ADA', price: '$0.1636', chg: '+3.02%' },
    ],
    priceCards: [
      { name: 'Bitcoin', price: '$64,695.00', chg: '+3.27%', sparkPath: 'M2 24 L16 20 L28 22 L40 12 L52 16 L64 6 L68 8' },
      { name: 'Ethereum', price: '$1,877.12', chg: '+5.20%', sparkPath: 'M2 22 L16 18 L28 20 L40 10 L52 14 L64 4 L68 6' },
      { name: 'Solana', price: '$77.44', chg: '+3.03%', sparkPath: 'M2 20 L16 22 L28 16 L40 18 L52 10 L64 12 L68 8' },
      { name: 'BNB', price: '$577.13', chg: '+1.17%', sparkPath: 'M2 18 L16 16 L28 18 L40 14 L52 16 L64 12 L68 13' },
      { name: 'Tether', price: '$0.9992', chg: '+0.05%', sparkPath: 'M2 16 L16 16 L28 15 L40 16 L52 15 L64 16 L68 15' },
    ],
    totalCap: '$2.30T',
    totalCapChg: '+2.81%',
    vol24h: '$76.80B',
    fng: '34',
    dailyRecap: [
      'Risk-on regime active (confidence 0.64) but Fear & Greed at 34 (Fear).',
      'Breadth: 355 advancers vs 627 decliners — broad weakness.',
      'Signals consensus: 35.5% bullish vs 62.7% bearish.',
    ],
    newsList: [
      { cat: 'BTC', time: '3d ago', title: '‘Bitcoin Is Over’: Former Meta engineer warns of quantum and miner time bombs.' },
      { cat: 'Blockchain', time: '3d ago', title: 'Hedera oracle exploit drains $9M from Bonzo Lend.' },
      { cat: 'Business', time: '3d ago', title: 'Crypto IPO market stalls as capital rotates to AI.' },
    ],
    captionCols: 3,
    captions: [
      { icon: 'antenna', num: '01', title: 'Daily AI Briefing', desc: 'Markets summarized before your first coffee.' },
      { icon: 'antenna', num: '02', title: 'Live Market Intelligence', desc: 'News, macro, on-chain and sentiment updated continuously.' },
      { icon: 'shield', num: '03', title: 'Explainable Research', desc: 'Every signal backed by transparent reasoning.' },
    ],
    closing: 'Start every day with market intelligence—not information overload.',
    ctaPrimary: 'Explore the Dashboard',
    ctaSecondary: 'Watch Product Tour',
  },
  {
    key: 'screener',
    tabLabel: 'AI Screener',
    navActive: 'Screener',
    headlineA: 'Describe Opportunities.',
    headlineB: 'AI Finds Them Instantly.',
    sub: 'Turn plain English into powerful market screens. No filters. No SQL. Just natural language.',
    prompt: 'Large-cap tokens with rising on-chain activity, positive ETF flows, and improving developer momentum.',
    examples: [
      'Undervalued tokens with high revenue growth',
      'Top tokens by active addresses growth',
      'AI narrative tokens with strong social momentum',
    ],
    resultsMeta: 'Screen results · 34 tokens matched',
    filters: ['Market Cap: Large Cap', 'Prism Score: > 70', 'On-chain: Rising', 'ETF Flows: Positive'],
    results: [
      { sym: 'BTC', name: 'Bitcoin', score: 92, price: '$64,695', chg24: '+3.27%', chg7: '+8.91%', mcap: '$1.30T', etf: '+$1.38B', iconBg: '#F59E0B', sparkPath: 'M2 20 L16 18 L28 22 L40 12 L52 16 L64 8 L68 6' },
      { sym: 'ETH', name: 'Ethereum', score: 88, price: '$1,877.12', chg24: '+5.20%', chg7: '+12.43%', mcap: '$226.54B', etf: '+$743M', iconBg: '#627EEA', sparkPath: 'M2 22 L16 18 L28 20 L40 10 L52 14 L64 4 L68 6' },
      { sym: 'SOL', name: 'Solana', score: 84, price: '$77.44', chg24: '+3.03%', chg7: '+9.11%', mcap: '$34.56B', etf: '+$512M', iconBg: '#14B8A6', sparkPath: 'M2 20 L16 22 L28 16 L40 18 L52 10 L64 12 L68 8' },
      { sym: 'LINK', name: 'Chainlink', score: 82, price: '$8.39', chg24: '+5.59%', chg7: '+15.22%', mcap: '$5.12B', etf: '+$220M', iconBg: '#2563EB', sparkPath: 'M2 22 L16 20 L28 18 L40 14 L52 16 L64 10 L68 9' },
      { sym: 'AVAX', name: 'Avalanche', score: 78, price: '$28.16', chg24: '+2.41%', chg7: '+7.18%', mcap: '$11.32B', etf: '+$198M', iconBg: '#DC2626', sparkPath: 'M2 18 L16 16 L28 19 L40 14 L52 17 L64 12 L68 13' },
    ],
    captionCols: 3,
    captions: [
      { icon: 'message', num: '01', title: 'Natural Language', desc: 'Describe what you’re looking for in plain English.' },
      { icon: 'spark', num: '02', title: 'AI-Powered Screening', desc: 'AI understands context and applies hundreds of signals instantly.' },
      { icon: 'target', num: '03', title: 'Actionable Results', desc: 'See opportunities ranked by Prism Score and key alpha drivers.' },
    ],
    closing: 'From a sentence to a sophisticated screen—in seconds.',
    ctaPrimary: 'Try AI Screener',
    ctaSecondary: 'View Example Screens',
  },
  {
    key: 'screens',
    tabLabel: 'Public Screens',
    navActive: 'Screens',
    headlineA: 'Discover Research Ideas.',
    headlineB: 'Curated by AI.',
    sub: 'Explore AI-generated screens across every theme and market signal. Turn inspiration into actionable research.',
    categories: [
      { label: 'All Categories', color: '#FFFFFF', bg: '#0FAE72' },
      { label: 'Chart Patterns', color: '#475467', bg: '#F5F6F7' },
      { label: 'Momentum', color: '#475467', bg: '#F5F6F7' },
      { label: 'Multi-Factor', color: '#475467', bg: '#F5F6F7' },
      { label: 'On-Chain', color: '#475467', bg: '#F5F6F7' },
      { label: 'Value', color: '#475467', bg: '#F5F6F7' },
    ],
    screenCards: [
      { title: 'Whale Accumulation + Rising Addresses', tag: 'Bullish', desc: 'Large holders are accumulating while new addresses increase.', meta: 'Updated 2h ago · 1.2K', plus: '+4', sparkPath: 'M2 24 L14 20 L26 22 L38 14 L50 17 L62 8 L68 6', sparkColor: '#16A34A' },
      { title: 'DeFi TVL Momentum + Volume Spike', tag: 'Bullish', desc: 'DeFi protocols with accelerating TVL and unusual volume growth.', meta: 'Updated 3h ago · 892', plus: '+6', sparkPath: 'M2 22 L14 24 L26 18 L38 20 L50 12 L62 14 L68 8', sparkColor: '#16A34A' },
      { title: 'Oversold Bounce Candidates', tag: 'Bullish', desc: 'Assets showing extreme downside and early reversal signals.', meta: 'Updated 4h ago · 1.1K', plus: '+6', sparkPath: 'M2 26 L14 22 L26 24 L38 16 L50 18 L62 10 L68 7', sparkColor: '#16A34A' },
      { title: 'L2 Capital Inflows', tag: 'Bullish', desc: 'Layer 2 tokens with strong capital inflows and user growth.', meta: 'Updated 5h ago · 743', plus: '+5', sparkPath: 'M2 20 L14 22 L26 16 L38 18 L50 10 L62 13 L68 9', sparkColor: '#16A34A' },
      { title: 'High CryptoScore, Low Social Hype', tag: 'Bullish', desc: 'Strong fundamentals with low retail attention and weak buzz.', meta: 'Updated 6h ago · 612', plus: '+3', sparkPath: 'M2 24 L14 21 L26 23 L38 15 L50 17 L62 9 L68 8', sparkColor: '#16A34A' },
      { title: 'Meme Momentum Breakout', tag: 'Neutral', desc: 'Meme tokens breaking out with volume and social momentum.', meta: 'Updated 7h ago · 967', plus: '+7', sparkPath: 'M2 18 L14 22 L26 16 L38 21 L50 13 L62 17 L68 10', sparkColor: '#D97706' },
    ],
    captionCols: 3,
    captions: [
      { icon: 'spark', num: '01', title: 'AI-Crafted Screens', desc: 'Our AI analyzes millions of data points to surface high-potential ideas.' },
      { icon: 'grid', num: '02', title: 'Explore & Filter', desc: 'Browse by categories or sentiment to find screens that match your strategy.' },
      { icon: 'message', num: '03', title: 'Ask Anything', desc: 'Turn any screen into a conversation and go deeper with AI.' },
    ],
    closing: 'From inspiration to insight—one screen away.',
    ctaPrimary: 'Browse All Screens',
    ctaSecondary: 'Create Your Own Screen',
  },
  {
    key: 'analytics',
    tabLabel: 'Analytics',
    navActive: 'Analytics',
    headlineA: 'Understand What the',
    headlineB: 'Market Is Really Saying.',
    sub: 'Deep on-chain, market, and behavioral analytics—unified in one place. Institutional-grade insights, built for conviction.',
    ticker: [
      { sym: 'BTC', price: '$64,695.00', chg: '+3.27%' },
      { sym: 'ETH', price: '$1,877.12', chg: '+5.20%' },
      { sym: 'SOL', price: '$77.44', chg: '+3.03%' },
      { sym: 'BNB', price: '$577.13', chg: '+1.17%' },
      { sym: 'XRP', price: '$0.5241', chg: '+2.11%' },
      { sym: 'ADA', price: '$0.1636', chg: '+3.02%' },
      { sym: 'LINK', price: '$8.38', chg: '+5.53%' },
    ],
    tabs2: [
      { label: 'Overview', active: true },
      { label: 'On-Chain' },
      { label: 'Market' },
      { label: 'Derivatives' },
      { label: 'Flows' },
      { label: 'Sentiment' },
      { label: 'Macro' },
      { label: 'Custom Dashboards' },
    ],
    metricCards: [
      { label: 'Market Cap', value: '$2.30T', chg: '+2.81%', sparkPath: 'M2 24 L14 20 L26 23 L38 15 L50 18 L62 10 L68 8' },
      { label: '24H Volume', value: '$76.80B', chg: '+4.35%', sparkPath: 'M2 20 L14 24 L26 17 L38 21 L50 13 L62 16 L68 10' },
      { label: 'BTC Dominance', value: '56.3%', chg: '+1.29%', sparkPath: 'M2 22 L14 19 L26 21 L38 16 L50 18 L62 13 L68 12' },
      { label: 'ETH Dominance', value: '9.8%', chg: '+0.41%', sparkPath: 'M2 21 L14 23 L26 18 L38 20 L50 15 L62 17 L68 13' },
      { label: 'Fear & Greed Index', value: '34', chg: 'Fear', fng: true },
    ],
    gainers: [
      { sym: 'PENDLE', price: '$6.71', chg: '+18.32%', vol: '$412.6M' },
      { sym: 'ARB', price: '$0.0883', chg: '+13.70%', vol: '$321.4M' },
      { sym: 'LDO', price: '$2.18', chg: '+11.24%', vol: '$201.8M' },
    ],
    liquidations: '$112.4M',
    long: '$82.6M',
    short: '$29.8M',
    captionCols: 3,
    captions: [
      { icon: 'antenna', num: '01', title: 'Multi-Domain Analytics', desc: 'On-chain, market, derivatives, sentiment and macro—together.' },
      { icon: 'shield', num: '02', title: 'Institutional Accuracy', desc: 'Validated data pipelines and battle-tested methodologies.' },
      { icon: 'chart', num: '03', title: 'Actionable Visualizations', desc: 'Clarity in every metric. Context in every movement.' },
    ],
    closing: 'Institutional-grade on-chain intelligence—designed for conviction.',
    ctaPrimary: 'Explore Analytics',
    ctaSecondary: 'See All Analytics Modules',
  },
  {
    key: 'calendar',
    tabLabel: 'Economic Calendar',
    navActive: 'Economic Calendar',
    headlineA: 'Never Miss the Events',
    headlineB: 'Moving Markets.',
    sub: 'AI-powered macro calendar with impact analysis, market connections, and opportunity signals.',
    weekDays: [
      { d: 'MON', n: '13', c: '' },
      { d: 'TUE', n: '14', c: '3 Events' },
      { d: 'WED', n: '15', c: '5 Events', active: true },
      { d: 'THU', n: '16', c: '4 Events' },
      { d: 'FRI', n: '17', c: '6 Events' },
      { d: 'SAT', n: '18', c: '' },
      { d: 'SUN', n: '19', c: '2 Events' },
    ],
    ticker: [
      { sym: 'BTC', price: '$64,695.00', chg: '+3.27%' },
      { sym: 'ETH', price: '$1,877.12', chg: '+5.20%' },
      { sym: 'SOL', price: '$77.44', chg: '+3.03%' },
      { sym: 'BNB', price: '$577.13', chg: '+1.17%' },
      { sym: 'XRP', price: '$0.5241', chg: '+2.11%' },
      { sym: 'ADA', price: '$0.1636', chg: '+3.02%' },
      { sym: 'LINK', price: '$8.38', chg: '+5.53%' },
    ],
    events: [
      { time: '01:30', name: 'Core CPI m/m', sub: 'Consumer Price Index', country: '🇺🇸 USD', impact: 'HIGH', actual: '0.3%', actualColor: '#16A34A', forecast: '0.2%', prev: '0.2%' },
      { time: '02:00', name: 'FOMC Rate Decision', sub: 'Interest Rate Decision', country: '🇺🇸 USD', impact: 'HIGH', actual: '5.50%', actualColor: '#16A34A', forecast: '5.50%', prev: '5.50%' },
      { time: '02:30', name: 'FOMC Press Conference', sub: 'Fed Chair Press Conference', country: '🇺🇸 USD', impact: 'HIGH', actual: '—', actualColor: '#475467', forecast: '—', prev: '—' },
      { time: '08:30', name: 'Retail Sales m/m', sub: 'Retail Sales', country: '🇺🇸 USD', impact: 'MEDIUM', actual: '0.1%', actualColor: '#DC2626', forecast: '0.3%', prev: '0.1%' },
      { time: '10:00', name: 'Crude Oil Inventories', sub: 'EIA Weekly Report', country: '🇺🇸 USD', impact: 'MEDIUM', actual: '-1.2M', actualColor: '#DC2626', forecast: '-0.8M', prev: '3.4M' },
      { time: '22:45', name: 'BOJ Interest Rate Decision', sub: 'Interest Rate Decision', country: '🇯🇵 JPY', impact: 'LOW', actual: '-0.10%', actualColor: '#475467', forecast: '-0.10%', prev: '-0.10%' },
    ],
    connections: [
      { sym: 'BTC', level: 'Medium', warm: true },
      { sym: 'ETH', level: 'Medium', warm: true },
      { sym: 'US10Y', level: 'High', warm: false },
      { sym: 'DXY', level: 'High', warm: false },
    ],
    eventDetail: 'FOMC Rate Decision',
    eventTime: 'Wed, Jul 15, 2024 · 02:00 AM',
    countdown: '02:45:18',
    eventImpactText: 'Rate decision expected to maintain current levels. Focus on forward guidance for clues on September trajectory.',
    captionCols: 4,
    captions: [
      { icon: 'antenna', num: '01', title: 'AI Macro Intelligence', desc: 'We analyze 100K+ events to surface what truly matters.' },
      { icon: 'chart', num: '02', title: 'Impact Scoring', desc: 'Every event scored by potential market impact.' },
      { icon: 'target', num: '03', title: 'Market Connections', desc: 'See how events affect assets, sectors and on-chain signals.' },
      { icon: 'chart', num: '04', title: 'Actionable Insights', desc: 'Context, probabilities and opportunities—delivered in real time.' },
    ],
    closing: 'Macro events connected directly to market impact and opportunities.',
    ctaPrimary: 'Monitor Macro Events',
    ctaSecondary: 'View Full Calendar',
  },
  {
    key: 'news',
    tabLabel: 'News Intelligence',
    navActive: 'Newsdesk',
    headlineA: 'Thousands of Headlines.',
    headlineB: 'One Explainable Narrative.',
    sub: 'Crypto news, social, and macro—scanned, ranked, and explained by AI. Focus only on what truly moves the market.',
    headlines: [
      { tag: 'HIGH', source: 'bitcoin.com', time: '23m ago', title: '‘Bitcoin Is Over’: Former Meta engineer warns of quantum and miner time bombs.', active: true },
      { tag: 'HIGH', source: 'coindesk', time: '45m ago', title: 'Hedera oracle exploit drains $9M from Bonzo Lend.' },
      { tag: 'MEDIUM', source: 'coindesk', time: '1h ago', title: 'Crypto IPO market stalls as capital rotates to AI.' },
      { tag: 'NEUTRAL', source: 'coinotag', time: '1h ago', title: 'Ethereum Foundation AI agents uncover validator-crashing bug.' },
    ],
    newsDetailTitle: '‘Bitcoin Is Over’: Former Meta and Google Engineer Warns of Quantum and Miner Time Bombs Affecting BTC',
    aiSummary: 'Jameson Lopp warns that quantum computing advances and declining mining profitability could threaten Bitcoin’s long-term security.',
    takeaways: [
      'Quantum computers could break current Bitcoin cryptography within ~10 years.',
      'Miner margins at multi-year lows; capitulation risk increasing.',
      'Urgent need for quantum-resistant address migration strategy.',
    ],
    impactScore: '84',
    sentiment: 'Bearish',
    affected: [
      { sym: 'BTC', s: 'Bearish' },
      { sym: 'MSTR', s: 'Neutral' },
      { sym: 'COIN', s: 'Neutral' },
      { sym: 'MARA', s: 'Bearish' },
    ],
    captionCols: 4,
    captions: [
      { icon: 'antenna', num: '01', title: 'AI News Intelligence', desc: 'We scan thousands of sources and rank what really matters.' },
      { icon: 'shield', num: '02', title: 'Explainable Impact', desc: 'Every headline comes with an impact score, sentiment and affected assets.' },
      { icon: 'target', num: '03', title: 'Focus on Signal', desc: 'Filter by impact, sector, or watchlist to cut through the noise.' },
      { icon: 'chart', num: '04', title: 'Timeline & Context', desc: 'Track sentiment and narratives as they evolve over time.' },
    ],
    closing: 'Every headline ranked by impact. Every insight explained.',
    ctaPrimary: 'View News Intelligence',
    ctaSecondary: 'See Impact Methodology',
  },
];

export function impactColors(impact: string): { color: string; bg: string } {
  if (impact === 'HIGH') return { color: '#DC2626', bg: '#FEF2F2' };
  if (impact === 'MEDIUM') return { color: '#B45309', bg: '#FFFBEB' };
  return { color: '#475467', bg: '#F5F6F7' };
}

export function headlineTagColors(tag: string): { color: string; bg: string } {
  if (tag === 'HIGH') return { color: '#DC2626', bg: '#FEF2F2' };
  if (tag === 'MEDIUM') return { color: '#B45309', bg: '#FFFBEB' };
  return { color: '#475467', bg: '#F5F6F7' };
}

export function screenCardTagColors(tag: string): { color: string; bg: string } {
  if (tag === 'Neutral') return { color: '#D97706', bg: '#FFFBEB' };
  return { color: '#16A34A', bg: '#F0FDF4' };
}

export function affectedColors(s: string): { color: string; bg: string } {
  if (s === 'Bearish') return { color: '#DC2626', bg: '#FEF2F2' };
  return { color: '#475467', bg: '#F5F6F7' };
}

export function connectionColors(warm: boolean): { color: string; bg: string } {
  return warm ? { color: '#B45309', bg: '#FFFBEB' } : { color: '#DC2626', bg: '#FEF2F2' };
}

export function Sparkline({
  path,
  stroke,
  width,
  height,
  viewBox,
  strokeWidth,
  preserveAspectRatio,
}: {
  path: string;
  stroke: string;
  width: number;
  height: number;
  viewBox?: string;
  strokeWidth?: number;
  preserveAspectRatio?: string;
}) {
  return (
    <svg width={width} height={height} viewBox={viewBox ?? `0 0 ${width} ${height}`} preserveAspectRatio={preserveAspectRatio} fill="none">
      <path d={path} stroke={stroke} strokeWidth={strokeWidth ?? 1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
