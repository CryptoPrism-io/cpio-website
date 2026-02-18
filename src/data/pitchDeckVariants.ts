// ── Pitch Deck Variant Data — India Angle Options B, C, F, G ────────────
import type { SlideData } from './pitchDeckData';

// ── Variant B: India Market Opportunity (dedicated India slide) ─────────

export const slidesBVariant: readonly SlideData[] = [
  { id: 'hero',     number: 1,  headline: 'Ask markets questions. Get quant-grade answers.' },
  { id: 'problem',  number: 2,  headline: 'Where the money disappears' },
  { id: 'product',  number: 3,  headline: 'One platform. Four intelligence layers.' },
  { id: 'engine',   number: 4,  headline: 'What powers the answers' },
  { id: 'autopsy',  number: 5,  headline: 'One crash. Two outcomes.' },
  { id: 'india',    number: 6,  headline: 'India: #1 in adoption. Last in tooling.' },
  { id: 'traction', number: 7,  headline: "What's already running" },
  { id: 'business', number: 8,  headline: 'SaaS + DaaS. Two revenue engines.' },
  { id: 'moat',     number: 9,  headline: 'Why this compounds' },
  { id: 'cta',      number: 10, headline: 'See the next signal first.' },
] as const;

// ── Variant C: India-First GTM (India woven throughout) ─────────────────

export const slidesCVariant: readonly SlideData[] = [
  { id: 'hero',     number: 1,  headline: '119M of 580M global crypto traders are in India. Zero quant-grade tools.' },
  { id: 'problem',  number: 2,  headline: 'Where the money disappears' },
  { id: 'product',  number: 3,  headline: 'One platform. Four intelligence layers.' },
  { id: 'engine',   number: 4,  headline: 'What powers the answers' },
  { id: 'autopsy',  number: 5,  headline: 'One crash. Two outcomes.' },
  { id: 'personas', number: 6,  headline: 'Built for three types of Indian users' },
  { id: 'traction', number: 7,  headline: "What's already running" },
  { id: 'business', number: 8,  headline: 'SaaS + DaaS. Two revenue engines.' },
  { id: 'moat',     number: 9,  headline: 'Why this compounds' },
  { id: 'cta',      number: 10, headline: "India's #1 crypto market deserves better." },
] as const;

// ── Variant F: Where Crypto Actually Lives ──────────────────────────────

export const slidesFVariant: readonly SlideData[] = [
  { id: 'hero',       number: 1,  headline: 'Ask markets questions. Get quant-grade answers.' },
  { id: 'problem',    number: 2,  headline: 'Where the money disappears' },
  { id: 'product',    number: 3,  headline: 'One platform. Four intelligence layers.' },
  { id: 'engine',     number: 4,  headline: 'What powers the answers' },
  { id: 'autopsy',    number: 5,  headline: 'One crash. Two outcomes.' },
  { id: 'wherecrypto', number: 6, headline: 'Where crypto actually lives' },
  { id: 'traction',   number: 7,  headline: "What's already running" },
  { id: 'business',   number: 8,  headline: 'SaaS + DaaS. Two revenue engines.' },
  { id: 'moat',       number: 9,  headline: 'Why this compounds' },
  { id: 'cta',        number: 10, headline: 'See the next signal first.' },
] as const;

// ── Variant G: Five Markets, One Problem ────────────────────────────────

export const slidesGVariant: readonly SlideData[] = [
  { id: 'hero',        number: 1,  headline: 'Ask markets questions. Get quant-grade answers.' },
  { id: 'problem',     number: 2,  headline: 'Where the money disappears' },
  { id: 'product',     number: 3,  headline: 'One platform. Four intelligence layers.' },
  { id: 'engine',      number: 4,  headline: 'What powers the answers' },
  { id: 'autopsy',     number: 5,  headline: 'One crash. Two outcomes.' },
  { id: 'fivemarkets', number: 6,  headline: 'Five markets. One problem.' },
  { id: 'traction',    number: 7,  headline: "What's already running" },
  { id: 'business',    number: 8,  headline: 'SaaS + DaaS. Two revenue engines.' },
  { id: 'moat',        number: 9,  headline: 'Why this compounds' },
  { id: 'cta',         number: 10, headline: 'See the next signal first.' },
] as const;

// ── India market data (shared across variants) ─────────────────────────

export const indiaStats = {
  users: '119M',
  rank: '#1',
  rankYears: '3 years running',
  yoyGrowth: '69%',
  txVolume: '$2.36T',
  losers: '49%',
  socialReliance: '84%',
  scamLosses: 'Rs 6,600 Cr',
  capitalFlight: '$6.1B',
  offshoreShare: '73%',
} as const;

export const targetMarkets = [
  {
    country: 'India',
    flag: '🇮🇳',
    users: '119M',
    rank: '#1 globally',
    problem: '84% trade on social media signals. 49% end the year in losses.',
  },
  {
    country: 'United States',
    flag: '🇺🇸',
    users: '65M',
    rank: '#2 globally',
    problem: 'Retail crushed by institutional information edge. ETF era widening the gap.',
  },
  {
    country: 'Pakistan',
    flag: '🇵🇰',
    users: '26M+',
    rank: '#3 globally',
    problem: 'Scam-heavy ecosystem. No professional tooling. Telegram-driven decisions.',
  },
  {
    country: 'Turkey',
    flag: '🇹🇷',
    users: '16M+',
    rank: '#12 globally',
    problem: 'Lira devaluation drives speculative FOMO trading. High losses.',
  },
  {
    country: 'Saudi / UAE',
    flag: '🇸🇦',
    users: 'Fast-growing',
    rank: 'Top MENA',
    problem: 'Institutional demand building. No local analytics layer for the region.',
  },
] as const;

// ── India-specific persona data (for variant C) ────────────────────────

export const indiaPersonas = [
  {
    role: 'Indian Retail Trader',
    type: 'trader' as const,
    description: 'Currently relying on Telegram groups and YouTube for signals. Losing money to pump-and-dumps and FOMO.',
    tools: ['AI-verified signals (not Telegram noise)', 'Plain English queries in terminal', 'Smart alerts that cut through hype', 'Tax-aware P&L tracking'],
  },
  {
    role: 'Indian Market Analyst',
    type: 'analyst' as const,
    description: 'Covering crypto for research firms or media. Needs data, not opinions.',
    tools: ['130+ indicators across 1,000+ coins', 'AI sentiment from 44 news sources', 'Cross-market correlation analysis', 'Exportable research reports'],
  },
  {
    role: 'Developer / Fund',
    type: 'developer' as const,
    description: 'Building trading bots, analytics products, or managing fund strategies.',
    tools: ['REST / WebSocket API', 'Strategy SDK', 'Webhooks for pipeline events', 'Raw data access (DaaS tier)'],
  },
] as const;

// ── India-specific moat additions (for variant C) ──────────────────────

export const indiaMoatAdditions = [
  {
    title: 'First Mover in #1 Market',
    description: 'No quant-grade platform exists for the world\'s largest crypto user base (119M). First professional tool built for this trader.',
  },
  {
    title: 'Misinformation Antidote',
    description: '84% of Indian traders rely on social media. CryptoPrism replaces Telegram noise with pipeline-verified intelligence.',
  },
] as const;

// ── V2: Combined Story Deck (14 slides) ─────────────────────────────────

export const slidesV2: readonly SlideData[] = [
  { id: 'hero',        number: 1,  headline: '119M of 580M global crypto traders are in India. Zero quant-grade tools.' },
  { id: 'problem',     number: 2,  headline: 'Where the money disappears' },
  { id: 'india',       number: 3,  headline: 'In India, it\'s worse' },
  { id: 'wherecrypto', number: 4,  headline: 'Where crypto actually lives' },
  { id: 'competitors', number: 5,  headline: 'Why existing tools don\'t solve this' },
  { id: 'product',     number: 6,  headline: 'One platform. Four intelligence layers.' },
  { id: 'engine',      number: 7,  headline: 'What powers the answers' },
  { id: 'autopsy',     number: 8,  headline: 'One crash. Two outcomes.' },
  { id: 'fivemarkets', number: 9,  headline: 'Five markets. One problem.' },
  { id: 'personas',    number: 10, headline: 'Built for three types of users' },
  { id: 'traction',    number: 11, headline: 'What\'s already running' },
  { id: 'business',    number: 12, headline: 'SaaS + DaaS. Two revenue engines.' },
  { id: 'moat',          number: 13, headline: 'Why this compounds' },
  { id: 'notcustodian',  number: 14, headline: 'What we are not' },
  { id: 'cta',           number: 15, headline: 'See the next signal first.' },
] as const;

// ── Competitor data ─────────────────────────────────────────────────────

export interface Competitor {
  readonly name: string;
  readonly hq: string;
  readonly pricing: string;
  readonly focus: string;
  readonly hasNL: boolean;
  readonly hasNewsSentiment: boolean;
  readonly hasStrategyLib: boolean;
  readonly hasIndicators: boolean;
  readonly indicatorCount: string;
  readonly limitation: string;
}

export const competitors: readonly Competitor[] = [
  {
    name: 'TradingView',
    hq: 'USA',
    pricing: '$15-60/mo',
    focus: 'Charting & community',
    hasNL: false,
    hasNewsSentiment: false,
    hasStrategyLib: true,
    hasIndicators: true,
    indicatorCount: '100+',
    limitation: 'No AI, no news sentiment, Pine Script lock-in',
  },
  {
    name: 'Nansen',
    hq: 'Singapore',
    pricing: '$49/mo+',
    focus: 'On-chain / wallet tracking',
    hasNL: true,
    hasNewsSentiment: false,
    hasStrategyLib: false,
    hasIndicators: false,
    indicatorCount: 'N/A',
    limitation: 'On-chain only, no technical indicators, complex UI',
  },
  {
    name: 'Glassnode',
    hq: 'Switzerland',
    pricing: '$26-custom',
    focus: 'On-chain metrics',
    hasNL: false,
    hasNewsSentiment: false,
    hasStrategyLib: false,
    hasIndicators: true,
    indicatorCount: '900+',
    limitation: 'BTC/ETH heavy, not beginner-friendly, no NL',
  },
  {
    name: 'Messari',
    hq: 'USA',
    pricing: 'Enterprise only',
    focus: 'Institutional research',
    hasNL: false,
    hasNewsSentiment: true,
    hasStrategyLib: false,
    hasIndicators: false,
    indicatorCount: 'N/A',
    limitation: 'Enterprise-only pricing, no retail access',
  },
  {
    name: 'Dune',
    hq: 'Norway',
    pricing: '$0-399/mo',
    focus: 'SQL-based dashboards',
    hasNL: false,
    hasNewsSentiment: false,
    hasStrategyLib: false,
    hasIndicators: false,
    indicatorCount: 'N/A',
    limitation: 'Requires SQL knowledge, developer-only',
  },
] as const;

// ── V2 Enhanced moat (original + India first-mover + built-from-India advantage) ──

export const moatItemsV2 = [
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
    description: 'Ask questions in plain English vs. navigating complex UIs. No SQL, no Pine Script, no learning curve',
  },
  {
    title: 'Full-Stack Ownership',
    description: '17 production repos, 3 databases, zero vendor dependency. Complete control of the pipeline',
  },
  {
    title: 'First Mover in #1 Market',
    description: 'World\'s largest crypto user base (119M) has zero quant-grade tools. First professional platform built for this trader',
  },
  {
    title: 'Built from India, Built for the World',
    description: 'India\'s tech talent at global quality, fraction of SF cost. Natural expansion path: India → Pakistan → Turkey → Saudi → US. Like UPI for crypto intelligence',
  },
] as const;
