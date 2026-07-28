// Mobile Home — typed mock-data module.
//
// Ported verbatim from the design-tool export at
// docs/superpowers/specs/reference/2026-07-18-mobile-design-v1.html
// (renderVals(): lines 337-444). Runtime-state fields that the reference's
// class component derives per-render (open/mark/toggle/go/ink/bg/border/scrN)
// are stripped here — those are implemented as component state in the
// section components that consume this data, not stored as static data.
//
// `var(--accent)` / `var(--accent-2)` (the `ac`/`ac2` locals in the
// reference) resolve to their default hex values '#0FAE72' / '#0B8D84'
// per the plan's Global Constraints (theming props are not ported).
//
// Literal `\uXXXX` escape artifacts in the reference source decode to their
// real characters below (e.g. ’ -> '’', · -> '·').

export interface Source {
  name: string;
  icon: string;
}

export interface LedgerRow {
  num: string;
  top: string;
  tag: string;
  bias: string;
  to: string;
  desc: string;
  bg: string;
  border: string;
  numInk: string;
  ink: string;
  sub: string;
  biasInk: string;
  arrow: string;
  tagInk: string;
  tagBorder: string;
}

export interface PulseRow {
  sym: string;
  chg: string;
  price: string;
  wk: string;
  cs: number;
}

export interface FeedRow {
  ic: string;
  iconBg: string;
  name: string;
  sub: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  tagBorder: string;
}

export interface ScreenerRow {
  rank: string;
  name: string;
  why: string;
  cs: number;
}

export interface PubScreen {
  name: string;
  ret: string;
  sub: string;
  n: number;
}

export interface NewsRow {
  h: string;
  src: string;
  ago: string;
  impact: string;
  impactColor: string;
  impactBorder: string;
  ai: string;
}

export interface CalRow {
  day: string;
  time: string;
  name: string;
  note: string;
  imp: string;
  impColor: string;
  impBg: string;
}

export interface TrustItem {
  name: string;
  icon: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface ToolTab {
  icon: string;
  name: string;
}

// lines 351-360
export const SOURCES: Source[] = [
  { name: 'News', icon: 'M4 4h12v13H4z M7 8h6 M7 11h6 M7 14h4' },
  { name: 'On-chain', icon: 'M6 6h4v4H6z M10 10h4v4h-4z M8 10v2h2' },
  { name: 'Macro', icon: 'M10 2.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15z M2.5 10h15 M10 2.5c-4.5 4.5-4.5 10.5 0 15 M10 2.5c4.5 4.5 4.5 10.5 0 15' },
  { name: 'Sentiment', icon: 'M3 16.5v-3l4-4 3 3 7-8 M13 4.5h4v4' },
  { name: 'ETF Flows', icon: 'M3 6h14 M3 10h14 M3 14h9 M15 12.5l2.5 1.5-2.5 1.5' },
  { name: 'Derivatives', icon: 'M4 16V9 M8 16V5 M12 16v-6 M16 16V7' },
  { name: 'Research', icon: 'M8.5 3a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z M12.5 12.5 17 17' },
  { name: 'Dev Activity', icon: 'M7 6 3.5 10 7 14 M13 6l3.5 4L13 14' },
];

// lines 361-368 — the design has exactly 3 rows (its own intro copy says
// "four most expensive instincts" — a discrepancy in the source design,
// transcribed as-is, not "fixed").
export const LEDGER: LedgerRow[] = [
  {
    num: '01', top: '80px', tag: 'BIAS 01', bias: 'Recency bias', to: 'Evidence',
    desc: 'Yesterday’s candle isn’t a thesis. Every signal is weighed against the full historical record.',
    bg: '#FFFFFF', border: '#E7E9EC', numInk: 'rgba(11,18,32,0.05)', ink: '#0B1220', sub: '#475467',
    biasInk: '#667085', arrow: '#0FAE72', tagInk: '#0B8D84', tagBorder: 'rgba(15,174,114,0.35)',
  },
  {
    num: '02', top: '96px', tag: 'BIAS 02', bias: 'Confirmation bias', to: 'Probability',
    desc: 'Prism argues both sides of every trade, then assigns odds — not opinions.',
    bg: 'linear-gradient(160deg, #101B2E, #050B14)', border: 'rgba(255,255,255,0.1)', numInk: 'rgba(255,255,255,0.05)',
    ink: '#FFFFFF', sub: '#98A2B3', biasInk: '#5D6B80', arrow: '#0FAE72', tagInk: '#0FAE72', tagBorder: 'rgba(15,174,114,0.4)',
  },
  {
    num: '03', top: '112px', tag: 'BIAS 03', bias: 'Loss aversion', to: 'Confidence',
    desc: 'A scored conviction level on every call, so fear doesn’t set your position size.',
    bg: 'linear-gradient(160deg, #0B8D84, #0FAE72)', border: 'rgba(255,255,255,0.2)', numInk: 'rgba(255,255,255,0.12)',
    ink: '#FFFFFF', sub: 'rgba(255,255,255,0.85)', biasInk: 'rgba(255,255,255,0.55)', arrow: '#FFFFFF', tagInk: '#FFFFFF',
    tagBorder: 'rgba(255,255,255,0.45)',
  },
];

// lines 377-381
export const PULSE: PulseRow[] = [
  { sym: 'BTC / USD', chg: '+3.2%', price: '$64,695', wk: '+8.1%', cs: 74 },
  { sym: 'ETH / USD', chg: '+5.2%', price: '$1,877', wk: '+6.4%', cs: 68 },
  { sym: 'SOL / USD', chg: '+3.0%', price: '$77.44', wk: '+11.2%', cs: 71 },
];

// lines 382-386
export const FEED: FeedRow[] = [
  { ic: '₿', iconBg: '#F7931A', name: 'Bitcoin', sub: 'CS 74 · ETF inflows accelerating', tag: 'accumulation', tagColor: '#0ECB81', tagBg: 'rgba(14,203,129,0.15)', tagBorder: 'rgba(14,203,129,0.3)' },
  { ic: 'Ξ', iconBg: '#8A93B2', name: 'Ethereum', sub: 'CS 68 · L2 activity at highs', tag: 'breakout', tagColor: '#22D3EE', tagBg: 'rgba(34,211,238,0.15)', tagBorder: 'rgba(34,211,238,0.3)' },
  { ic: 'S', iconBg: '#9945FF', name: 'Solana', sub: 'CS 71 · DEX volume climbing', tag: 'momentum', tagColor: '#C4B5FD', tagBg: 'rgba(139,92,246,0.15)', tagBorder: 'rgba(139,92,246,0.3)' },
];

// lines 388-395 — go/ink/bg/border (lines 396-398) are runtime-derived
// active-tab state, stripped; icon + name only survive as static data.
export const TOOL_TABS: ToolTab[] = [
  { icon: 'M3 3.5h14v11H3z M3 7h14 M6.5 14.5v2h7v-2 M6 10.5l2-2 2 1.5 3-3', name: 'Dashboard' },
  { icon: 'M8.5 3a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z M12.5 12.5 17 17 M6.5 8.5h4 M8.5 6.5v4', name: 'Screener' },
  { icon: 'M4 4h5v5H4z M11 4h5v5h-5z M4 11h5v5H4z M11 11h5v5h-5z', name: 'Screens' },
  { icon: 'M3 17h14 M5 13.5 8 9l3 2.5 4-6', name: 'Analytics' },
  { icon: 'M4 3.5h9l3 3v10H4z M13 3.5v3h3 M7 9h6 M7 12h6', name: 'News' },
  { icon: 'M4 5h12v11H4z M4 8.5h12 M7 3.5v3 M13 3.5v3 M7 12h2 M11 12h2', name: 'Macro' },
];

// lines 402-409 — indexed by toolIdx in the reference; kept as a plain
// array here, indexed the same way by the consuming component.
export const PHONE_CAPTIONS: string[] = [
  'The CryptoPrism dashboard, in your pocket.',
  'Ask in plain language. Get ranked assets.',
  'Research strategies, curated and explained.',
  'Market structure, read for you.',
  'Every headline, scored for impact.',
  'Macro events with AI impact analysis.',
];

// lines 410-414
export const SCREENER_ROWS: ScreenerRow[] = [
  { rank: '1', name: 'Bitcoin', why: 'Active addresses +14% · 30d', cs: 92 },
  { rank: '2', name: 'Ethereum', why: 'L2 settlement at all-time highs', cs: 87 },
  { rank: '3', name: 'Chainlink', why: 'New CCIP integrations · TVL up', cs: 81 },
];

// lines 415-419
export const PUB_SCREENS: PubScreen[] = [
  { name: 'Whale Accumulation', ret: '+18.4%', sub: 'Assets with rising >$1M wallet cohorts', n: 12 },
  { name: 'DeFi Momentum', ret: '+12.1%', sub: 'Protocols with accelerating fee revenue', n: 9 },
  { name: 'L2 Capital Flows', ret: '+9.7%', sub: 'Bridges showing sustained net inflows', n: 7 },
];

// lines 420-424
export const NEWS_ROWS: NewsRow[] = [
  { h: 'Spot ETF inflows hit 6-month high', src: 'Bloomberg', ago: '32m', impact: 'HIGH', impactColor: '#0ECB81', impactBorder: 'rgba(14,203,129,0.4)', ai: 'Sustained institutional bid; supports accumulation thesis.' },
  { h: 'Fed minutes signal patience on cuts', src: 'Reuters', ago: '1h', impact: 'MED', impactColor: '#F0B90B', impactBorder: 'rgba(240,185,11,0.4)', ai: 'Neutral for risk assets near-term; watch DXY.' },
  { h: 'Major exchange expands EU licensing', src: 'CoinDesk', ago: '3h', impact: 'LOW', impactColor: '#7A8BA0', impactBorder: '#2A3B55', ai: 'Structural positive, priced in.' },
];

// lines 425-430
export const CAL_ROWS: CalRow[] = [
  { day: 'TUE', time: '08:30', name: 'US CPI (Jun)', note: 'Consensus 2.6% y/y', imp: 'HIGH', impColor: '#060B14', impBg: '#F6465D' },
  { day: 'WED', time: '14:00', name: 'FOMC Minutes', note: 'Rate-path language in focus', imp: 'HIGH', impColor: '#060B14', impBg: '#F6465D' },
  { day: 'THU', time: '08:30', name: 'Initial Jobless Claims', note: 'Labor softening watch', imp: 'MED', impColor: '#060B14', impBg: '#F0B90B' },
  { day: 'FRI', time: '10:00', name: 'Consumer Sentiment', note: 'UMich preliminary', imp: 'LOW', impColor: '#E7E9EC', impBg: '#2A3B55' },
];

// lines 432-439
export const TRUST: TrustItem[] = [
  { name: 'Explainable AI', icon: 'M10 3.5c-3 0-5.5 2.3-5.5 5.2 0 1.8 1 3.4 2.5 4.3v2h6v-2c1.5-.9 2.5-2.5 2.5-4.3 0-2.9-2.5-5.2-5.5-5.2z M8 17.5h4' },
  { name: 'Enterprise Security', icon: 'M10 2.5 16 5v5c0 3.8-2.6 6.5-6 7.5-3.4-1-6-3.7-6-7.5V5z M7.5 10l1.8 1.8 3.4-3.6' },
  { name: 'API Infrastructure', icon: 'M7 6 3.5 10 7 14 M13 6l3.5 4L13 14' },
  { name: 'Audit Trail', icon: 'M10 5v5l3.5 2 M10 2.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15z' },
  { name: 'Private Deployment', icon: 'M5 9V6.5a5 5 0 0 1 10 0V9 M4 9h12v8H4z M10 12.5v2' },
  { name: 'Continuous Learning', icon: 'M16.5 10a6.5 6.5 0 1 1-1.9-4.6 M16.5 2.5v3h-3' },
];

// lines 337-342 — open/mark/toggle (lines 440-443) are runtime accordion
// state, stripped; q + a only survive as static data.
export const FAQS: Faq[] = [
  { q: 'What is CryptoPrism?', a: 'An AI-native intelligence platform that turns fragmented market data into explainable investment decisions.' },
  { q: 'Is it financial advice?', a: 'No. CryptoPrism provides research intelligence with transparent reasoning. Decisions remain yours.' },
  { q: 'Which markets are covered?', a: 'Digital assets today, expanding across global financial markets.' },
  { q: 'How do I get access?', a: 'Request access to the private beta. Enterprise deployments are available on request.' },
];
