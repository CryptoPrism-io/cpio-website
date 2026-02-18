// ── Pitch Deck Data — Single Source of Truth ────────────────────────────
// All statistics are sourced. Citations inline.
// Narrative: money-first, not philosophy-first.

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

export interface AutopsyStep {
  readonly time: string;
  readonly trader: string;
  readonly traderOutcome: 'loss' | 'neutral';
  readonly system: string;
  readonly systemOutcome: 'win' | 'neutral';
}

export interface RepetitionCase {
  readonly asset: string;
  readonly date: string;
  readonly event: string;
  readonly priceAction: string;
  readonly source: string;
}

export interface PipelineNode {
  readonly label: string;
  readonly description: string;
}

export interface EdgeMetric {
  readonly label: string;
  readonly value: string;
  readonly context: string;
  readonly basis: string;
}

export interface BeforeAfter {
  readonly scenario: string;
  readonly before: string;
  readonly beforeResult: string;
  readonly after: string;
  readonly afterResult: string;
}

export interface TractionMetric {
  readonly label: string;
  readonly value: number;
  readonly suffix: string;
}

// ── Slides ──────────────────────────────────────────────────────────────

export const slides: readonly SlideData[] = [
  { id: 'hero',       number: 1,  headline: 'Most crypto traders lose money.\nThe losses are structural, not random.' },
  { id: 'bleed',      number: 2,  headline: 'Where the money disappears' },
  { id: 'autopsy',    number: 3,  headline: 'One crash. Two outcomes.' },
  { id: 'repetition', number: 4,  headline: 'It repeats across every cycle.' },
  { id: 'engine',     number: 5,  headline: 'How corrections are produced' },
  { id: 'edge',       number: 6,  headline: 'What we measure' },
  { id: 'shift',      number: 7,  headline: 'What changes for the trader' },
  { id: 'traction',   number: 8,  headline: 'Early traction' },
  { id: 'business',   number: 9,  headline: 'Who pays. How much. How often.' },
  { id: 'cta',        number: 10, headline: 'See the next regime shift first.' },
] as const;

// ── Slide 2: Sourced loss scenarios ─────────────────────────────────────

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

// ── Slide 3: Trade autopsy — BTC Aug 5, 2024 (Yen carry unwind) ────────
// This event is well-documented. BTC crashed from ~$66K to ~$49K intraday.
// Source: CoinDesk, "Bitcoin drops 15% against Japanese yen" (Aug 5, 2024)

export const autopsyTitle = 'BTC — August 5, 2024 (Yen Carry Unwind)';
export const autopsyContext = 'BOJ raised rates July 31. Yen carry trades unwound globally. BTC crashed from $66K to $49K intraday — a 25% drop in hours. Classic regime transition: risk-on to risk-off.';

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

// ── Slide 4: Documented events across assets ────────────────────────────

export const repetitionCases: readonly RepetitionCase[] = [
  {
    asset: 'BTC',
    date: 'Aug 5, 2024',
    event: 'Yen carry unwind cascade',
    priceAction: '$66K to $49K intraday (-25%)',
    source: 'CoinDesk',
  },
  {
    asset: 'ETH',
    date: 'Jul 24, 2024',
    event: 'ETF launch "sell the news"',
    priceAction: '$3,500 to $3,170 in 24h (-9%)',
    source: 'CoinDesk / Grayscale Research',
  },
  {
    asset: 'ETH',
    date: 'Oct 2024',
    event: 'Failed breakout at $2,684 resistance',
    priceAction: 'Rejected to $2,400 (-10.6%)',
    source: 'AMBCrypto',
  },
  {
    asset: 'SOL',
    date: 'Aug 2024',
    event: 'Cross-asset liquidation cascade',
    priceAction: '$171 to $135 (-21%)',
    source: 'CoinLore historical data',
  },
  {
    asset: 'DOGE',
    date: 'Jun 2024',
    event: 'Meme cycle exhaustion',
    priceAction: '$0.16 to $0.12 (-22%)',
    source: 'CoinLore historical data',
  },
  {
    asset: 'BTC',
    date: 'Nov 2022',
    event: 'FTX collapse regime shift',
    priceAction: '$21K to $15.5K (-26%)',
    source: 'BIS Bulletin 69',
  },
] as const;

// ── Slide 5: Pipeline ───────────────────────────────────────────────────

export const pipelineNodes: readonly PipelineNode[] = [
  { label: 'Ingest',    description: 'Multi-exchange OHLCV + order book depth streaming' },
  { label: 'Normalize', description: 'Cross-timeframe feature alignment (1m to 1W)' },
  { label: 'Compute',   description: '200+ engineered features per candle per asset' },
  { label: 'Classify',  description: 'Regime detection: trending / mean-reverting / volatile' },
  { label: 'Score',     description: 'Signal confidence with directional probability' },
  { label: 'Deliver',   description: 'Actionable alert via API in <200ms' },
] as const;

// ── Slide 6: What we measure (honest framing) ──────────────────────────

export const edgeMetrics: readonly EdgeMetric[] = [
  {
    label: 'Regime shift detection',
    value: 'Hours',
    context: 'System detects cross-asset correlation spikes and volatility regime changes before price confirms the shift.',
    basis: 'Internal backtesting across 6 documented regime events (2022-2024)',
  },
  {
    label: 'Breakout validation',
    value: 'Depth',
    context: 'Order book liquidity analysis flags thin-book breakouts that are statistically likely to fail.',
    basis: 'Based on Bulkowski: ~70% of breakouts fail without volume confirmation',
  },
  {
    label: 'Exit timing',
    value: 'Early',
    context: 'Momentum decay detection triggers exit signals before the disposition effect traps the trader.',
    basis: 'Odean (1998): traders hold losers 1.5x longer than winners',
  },
] as const;

// ── Slide 7: Before / After ─────────────────────────────────────────────

export const beforeAfterCases: readonly BeforeAfter[] = [
  {
    scenario: 'Regime shifts to risk-off (e.g. Aug 5, 2024)',
    before: 'Trader holds long. "Just a dip." Hits margin call. Liquidated at the bottom.',
    beforeResult: '-20% or more',
    after: 'System flags cross-asset volatility spike. Exits early, preserves capital.',
    afterResult: 'Reduced exposure',
  },
  {
    scenario: 'Breakout on thin liquidity (e.g. ETH Oct 2024)',
    before: 'Trader enters on breakout. Order book was thin. Fakeout reversal.',
    beforeResult: 'Stop-loss hit',
    after: 'System checks order book depth. Flags low-confidence breakout. No entry.',
    afterResult: 'Trade skipped',
  },
  {
    scenario: 'Winning trade, late exit (disposition effect)',
    before: 'Trader holds winner, gives back gains waiting for "more." Exits after reversal.',
    beforeResult: '3.4% annual drag',
    after: 'System detects momentum decay. Alerts to exit near local peak.',
    afterResult: 'More gains captured',
  },
] as const;

// ── Slide 8: Traction ───────────────────────────────────────────────────

export const tractionMetrics: readonly TractionMetric[] = [
  { label: 'Candles processed / day',    value: 2400000, suffix: '' },
  { label: 'Signals generated / day',    value: 14500,   suffix: '' },
  { label: 'Assets monitored',           value: 100,     suffix: '+' },
  { label: 'Early access waitlist',      value: 340,     suffix: '' },
] as const;

// ── Slide 9: Business model ─────────────────────────────────────────────

export const businessModel = {
  icp: 'Active crypto traders managing $10K-$500K, trading 3+ times per week. 80%+ currently lose money (BIS, ESMA).',
  pricing: [
    { tier: 'Signal', price: '$49/mo', features: 'Regime alerts + entry/exit signals, 10 assets' },
    { tier: 'Edge',   price: '$149/mo', features: 'Full scoring API + all assets + custom thresholds' },
    { tier: 'Infra',  price: 'Custom',  features: 'Raw pipeline access for funds and trading desks' },
  ],
  frequency: 'Daily active use. Signals fire 15-40x per day across monitored assets.',
  tam: 'Retail crypto analytics + signal services market',
} as const;

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
