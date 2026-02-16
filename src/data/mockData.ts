export interface NavLink {
  readonly label: string;
  readonly href: string;
}

export interface QueryPrompt {
  readonly level: string;
  readonly levelLabel: string;
  readonly text: string;
}

export interface AssetSignal {
  readonly active: boolean;
}

export interface CryptoAsset {
  readonly symbol: string;
  readonly name: string;
  readonly tag: string;
  readonly color: string;
  readonly price: string;
  readonly change24h: string;
  readonly changePositive: boolean;
  readonly delta: string;
  readonly sparklinePath: string;
  readonly signals: readonly AssetSignal[];
}

export const navLinks: readonly NavLink[] = [
  { label: "Terminal", href: "#" },
  { label: "Nodes", href: "#" },
  { label: "Vault", href: "#" },
];

export const heroTitle = {
  prefix: "Tired of ",
  highlight1: "cluttered DEXs",
  connector: " and ",
  highlight2: "lagging charts?",
};

export const heroSubtitle =
  "Execute complex queries in natural language. Experience the next evolution of ";
export const heroSubtitleHighlight = "high-fidelity crypto intelligence.";

export const queryPrompts: readonly QueryPrompt[] = [
  {
    level: "01",
    levelLabel: "Basic",
    text: "Find coins near 52W High with RSI divergence.",
  },
  {
    level: "02",
    levelLabel: "Medium",
    text: "Show projects with consistent TVL growth above 15% for 3 months.",
  },
  {
    level: "03",
    levelLabel: "Advanced",
    text: "Filter coins where whale holding increased while exchange reserves decreased in last 48 hours.",
  },
];

// ── Basic Viz Data ──────────────────────────────────────────────
export interface CoinCard {
  readonly symbol: string;
  readonly name: string;
  readonly color: string;
  readonly price: string;
  readonly pctOf52W: number;
  readonly rsiValue: number;
  readonly rsiLabel: string;
  readonly volume24h: string;
  readonly marketCap: string;
  readonly momentum: number;
}

export const basicVizData: readonly (readonly CoinCard[])[] = [
  // Example 0: coins near 52W high with RSI divergence
  [
    { symbol: "B", name: "Bitcoin", color: "#F7931A", price: "$64,925", pctOf52W: 94, rsiValue: 42, rsiLabel: "Bearish Div", volume24h: "$38.2B", marketCap: "$1.27T", momentum: 72 },
    { symbol: "S", name: "Solana", color: "#14F195", price: "$177.45", pctOf52W: 88, rsiValue: 38, rsiLabel: "Bearish Div", volume24h: "$4.1B", marketCap: "$78.5B", momentum: 65 },
    { symbol: "A", name: "Avalanche", color: "#E84142", price: "$41.20", pctOf52W: 91, rsiValue: 35, rsiLabel: "Bearish Div", volume24h: "$820M", marketCap: "$15.2B", momentum: 58 },
    { symbol: "I", name: "Injective", color: "#00F2FE", price: "$38.60", pctOf52W: 96, rsiValue: 40, rsiLabel: "Bearish Div", volume24h: "$310M", marketCap: "$3.6B", momentum: 80 },
  ],
  // Example 1: top tokens by 24h volume
  [
    { symbol: "B", name: "Bitcoin", color: "#F7931A", price: "$64,925", pctOf52W: 94, rsiValue: 55, rsiLabel: "Neutral", volume24h: "$38.2B", marketCap: "$1.27T", momentum: 72 },
    { symbol: "E", name: "Ethereum", color: "#627EEA", price: "$3,702", pctOf52W: 78, rsiValue: 52, rsiLabel: "Neutral", volume24h: "$18.7B", marketCap: "$445B", momentum: 60 },
    { symbol: "U", name: "USDT", color: "#26A17B", price: "$1.00", pctOf52W: 100, rsiValue: 50, rsiLabel: "Stable", volume24h: "$52.1B", marketCap: "$95B", momentum: 50 },
    { symbol: "S", name: "Solana", color: "#14F195", price: "$177.45", pctOf52W: 88, rsiValue: 61, rsiLabel: "Bullish", volume24h: "$4.1B", marketCap: "$78.5B", momentum: 65 },
  ],
  // Example 2: sub-$50M market cap + positive momentum
  [
    { symbol: "R", name: "Render", color: "#E34BF0", price: "$7.82", pctOf52W: 62, rsiValue: 64, rsiLabel: "Bullish", volume24h: "$185M", marketCap: "$42M", momentum: 85 },
    { symbol: "K", name: "Kaspa", color: "#49EACB", price: "$0.14", pctOf52W: 55, rsiValue: 68, rsiLabel: "Bullish", volume24h: "$92M", marketCap: "$34M", momentum: 90 },
    { symbol: "P", name: "Pyth", color: "#7B61FF", price: "$0.42", pctOf52W: 48, rsiValue: 71, rsiLabel: "Strong", volume24h: "$63M", marketCap: "$18M", momentum: 92 },
    { symbol: "Z", name: "Zeus", color: "#FFD700", price: "$1.85", pctOf52W: 72, rsiValue: 59, rsiLabel: "Bullish", volume24h: "$44M", marketCap: "$47M", momentum: 78 },
  ],
];

// ── Medium Viz Data ─────────────────────────────────────────────
export interface BarDataItem {
  readonly label: string;
  readonly value: number;
  readonly maxValue: number;
  readonly suffix: string;
  readonly color: string;
  readonly subLabel?: string;
  readonly flagged?: boolean;
}

export interface MediumVizDataSet {
  readonly title: string;
  readonly subtitle: string;
  readonly unit: string;
  readonly bars: readonly BarDataItem[];
}

export const mediumVizData: readonly MediumVizDataSet[] = [
  // Example 0: TVL growth
  {
    title: "TVL Growth Leaders",
    subtitle: "Consistent 3-month growth > 15%",
    unit: "% growth",
    bars: [
      { label: "Aave v3", value: 42, maxValue: 50, suffix: "%", color: "#0ECB81", subLabel: "$12.4B TVL" },
      { label: "Lido", value: 38, maxValue: 50, suffix: "%", color: "#0ECB81", subLabel: "$28.1B TVL" },
      { label: "Eigenlayer", value: 67, maxValue: 80, suffix: "%", color: "#00F2FE", subLabel: "$9.8B TVL" },
      { label: "Pendle", value: 55, maxValue: 80, suffix: "%", color: "#0ECB81", subLabel: "$4.2B TVL" },
      { label: "Jito", value: 31, maxValue: 50, suffix: "%", color: "#0ECB81", subLabel: "$1.8B TVL" },
      { label: "Morpho", value: 48, maxValue: 80, suffix: "%", color: "#00F2FE", subLabel: "$2.1B TVL" },
    ],
  },
  // Example 1: L2 gas fees
  {
    title: "L2 Gas Fee Comparison",
    subtitle: "7-day average transaction cost",
    unit: "$ avg",
    bars: [
      { label: "Arbitrum", value: 0.12, maxValue: 0.5, suffix: "", color: "#0ECB81", subLabel: "Optimistic" },
      { label: "Optimism", value: 0.08, maxValue: 0.5, suffix: "", color: "#0ECB81", subLabel: "Optimistic" },
      { label: "Base", value: 0.003, maxValue: 0.5, suffix: "", color: "#00F2FE", subLabel: "Optimistic", flagged: true },
      { label: "zkSync", value: 0.04, maxValue: 0.5, suffix: "", color: "#0ECB81", subLabel: "ZK Rollup" },
      { label: "Starknet", value: 0.006, maxValue: 0.5, suffix: "", color: "#00F2FE", subLabel: "ZK Rollup", flagged: true },
      { label: "Scroll", value: 0.02, maxValue: 0.5, suffix: "", color: "#0ECB81", subLabel: "ZK Rollup" },
    ],
  },
  // Example 2: Funding rates
  {
    title: "Funding Rate Flip Detection",
    subtitle: "Negative funding + price at support",
    unit: "rate",
    bars: [
      { label: "ETH", value: -0.015, maxValue: 0.05, suffix: "%", color: "#FF4D4D", subLabel: "Support: $3,580" },
      { label: "SOL", value: -0.028, maxValue: 0.05, suffix: "%", color: "#FF4D4D", subLabel: "Support: $168" },
      { label: "DOGE", value: -0.041, maxValue: 0.05, suffix: "%", color: "#FF4D4D", subLabel: "Support: $0.12" },
      { label: "AVAX", value: -0.008, maxValue: 0.05, suffix: "%", color: "#FF4D4D", subLabel: "Support: $38.50" },
      { label: "LINK", value: -0.019, maxValue: 0.05, suffix: "%", color: "#FF4D4D", subLabel: "Support: $14.20" },
      { label: "ARB", value: -0.035, maxValue: 0.05, suffix: "%", color: "#FF4D4D", subLabel: "Support: $1.15" },
    ],
  },
];

// ── Advanced Viz Data ───────────────────────────────────────────
export interface AdvancedAsset {
  readonly symbol: string;
  readonly name: string;
  readonly color: string;
  readonly price: string;
  readonly metric1Label: string;
  readonly metric1Value: string;
  readonly metric1Positive: boolean;
  readonly metric2Label: string;
  readonly metric2Value: string;
  readonly metric2Positive: boolean;
  readonly sparklinePath: string;
  readonly signals: readonly AssetSignal[];
}

export const advancedVizData: readonly (readonly AdvancedAsset[])[] = [
  // Example 0: whale holdings vs exchange reserves
  [
    { symbol: "B", name: "Bitcoin", color: "#F7931A", price: "$64,925", metric1Label: "Whale Δ", metric1Value: "+2.4%", metric1Positive: true, metric2Label: "Exch Rsv", metric2Value: "-1.8%", metric2Positive: false, sparklinePath: "M0 15 L10 12 L20 16 L30 8 L40 5", signals: [{ active: true }, { active: true }, { active: true }] },
    { symbol: "E", name: "Ethereum", color: "#627EEA", price: "$3,702", metric1Label: "Whale Δ", metric1Value: "+3.1%", metric1Positive: true, metric2Label: "Exch Rsv", metric2Value: "-2.5%", metric2Positive: false, sparklinePath: "M0 18 L10 14 L20 15 L30 5 L40 2", signals: [{ active: true }, { active: true }, { active: false }] },
    { symbol: "S", name: "Solana", color: "#14F195", price: "$177.45", metric1Label: "Whale Δ", metric1Value: "+5.7%", metric1Positive: true, metric2Label: "Exch Rsv", metric2Value: "-4.2%", metric2Positive: false, sparklinePath: "M0 16 L10 14 L20 10 L30 6 L40 4", signals: [{ active: true }, { active: true }, { active: true }] },
    { symbol: "P", name: "Pepe", color: "#00ff00", price: "$0.00001082", metric1Label: "Whale Δ", metric1Value: "+12.8%", metric1Positive: true, metric2Label: "Exch Rsv", metric2Value: "-8.1%", metric2Positive: false, sparklinePath: "M0 18 L5 15 L15 17 L25 8 L40 2", signals: [{ active: true }, { active: true }, { active: true }] },
  ],
  // Example 1: smart money accumulation
  [
    { symbol: "L", name: "Chainlink", color: "#2A5ADA", price: "$14.85", metric1Label: "Smart $", metric1Value: "+$42M", metric1Positive: true, metric2Label: "Price Δ", metric2Value: "-5.2%", metric2Positive: false, sparklinePath: "M0 5 L10 8 L20 12 L30 14 L40 16", signals: [{ active: true }, { active: true }, { active: true }] },
    { symbol: "D", name: "Polkadot", color: "#E6007A", price: "$7.42", metric1Label: "Smart $", metric1Value: "+$18M", metric1Positive: true, metric2Label: "Price Δ", metric2Value: "-3.8%", metric2Positive: false, sparklinePath: "M0 6 L10 9 L20 11 L30 15 L40 17", signals: [{ active: true }, { active: true }, { active: false }] },
    { symbol: "U", name: "Uniswap", color: "#FF007A", price: "$8.15", metric1Label: "Smart $", metric1Value: "+$28M", metric1Positive: true, metric2Label: "Price Δ", metric2Value: "-7.1%", metric2Positive: false, sparklinePath: "M0 4 L10 7 L20 10 L30 14 L40 18", signals: [{ active: true }, { active: true }, { active: true }] },
    { symbol: "A", name: "Aave", color: "#B6509E", price: "$98.20", metric1Label: "Smart $", metric1Value: "+$35M", metric1Positive: true, metric2Label: "Price Δ", metric2Value: "-2.4%", metric2Positive: false, sparklinePath: "M0 8 L10 10 L20 9 L30 13 L40 15", signals: [{ active: true }, { active: true }, { active: true }] },
  ],
  // Example 2: NFT + token correlation
  [
    { symbol: "A", name: "ApeCoin", color: "#0052FF", price: "$1.42", metric1Label: "Floor Δ", metric1Value: "-12%", metric1Positive: false, metric2Label: "Whale Exit", metric2Value: "3 txns", metric2Positive: false, sparklinePath: "M0 4 L10 8 L20 12 L30 15 L40 18", signals: [{ active: true }, { active: false }, { active: false }] },
    { symbol: "B", name: "Blur", color: "#FF6F00", price: "$0.38", metric1Label: "Floor Δ", metric1Value: "-8%", metric1Positive: false, metric2Label: "Whale Exit", metric2Value: "5 txns", metric2Positive: false, sparklinePath: "M0 5 L10 9 L20 14 L30 16 L40 17", signals: [{ active: true }, { active: false }, { active: false }] },
    { symbol: "P", name: "Pudgy", color: "#FFD6E8", price: "$12.50", metric1Label: "Floor Δ", metric1Value: "+4%", metric1Positive: true, metric2Label: "Whale Exit", metric2Value: "0 txns", metric2Positive: true, sparklinePath: "M0 16 L10 14 L20 10 L30 8 L40 5", signals: [{ active: true }, { active: true }, { active: true }] },
    { symbol: "M", name: "Magic Eden", color: "#E42575", price: "$2.85", metric1Label: "Floor Δ", metric1Value: "-3%", metric1Positive: false, metric2Label: "Whale Exit", metric2Value: "2 txns", metric2Positive: false, sparklinePath: "M0 8 L10 10 L20 13 L30 15 L40 16", signals: [{ active: true }, { active: true }, { active: false }] },
  ],
];

export const cryptoAssets: readonly CryptoAsset[] = [
  {
    symbol: "B",
    name: "Bitcoin",
    tag: "Layer 01",
    color: "#F7931A",
    price: "$64,925.80",
    change24h: "+0.68%",
    changePositive: true,
    delta: "+35.2%",
    sparklinePath: "M0 15 L10 12 L20 16 L30 8 L40 5",
    signals: [{ active: true }, { active: true }, { active: true }],
  },
  {
    symbol: "E",
    name: "Ethereum",
    tag: "Contract Hub",
    color: "#627EEA",
    price: "$3,702.85",
    change24h: "+1.25%",
    changePositive: true,
    delta: "+22.4%",
    sparklinePath: "M0 18 L10 14 L20 15 L30 5 L40 2",
    signals: [{ active: true }, { active: true }, { active: false }],
  },
  {
    symbol: "S",
    name: "Solana",
    tag: "High Speed",
    color: "#14F195",
    price: "$177.45",
    change24h: "-1.68%",
    changePositive: false,
    delta: "+42.3%",
    sparklinePath: "M0 5 L10 8 L20 4 L30 15 L40 18",
    signals: [{ active: true }, { active: true }, { active: true }],
  },
  {
    symbol: "P",
    name: "Pepe",
    tag: "Viral Node",
    color: "#00ff00",
    price: "$0.00001082",
    change24h: "+12.45%",
    changePositive: true,
    delta: "+148.9%",
    sparklinePath: "M0 18 L5 15 L15 17 L25 8 L40 2",
    signals: [{ active: true }, { active: true }, { active: true }],
  },
];

// ── Comparison Section Data ─────────────────────────────────────
export const comparisonData = {
  headline: {
    line1: "Generic LLM Guesses.",
    line2: "PRISM Calculates.",
  },
  subtitle:
    "Most AI returns walls of text from stale data. PRISM writes real code, hits real-time APIs, and gives you structured results you can actually use.",
  generic: {
    label: "Generic LLM",
    lines: [
      "> Searching the web...",
      "> Found 47 articles...",
    ],
    body: [
      "Based on common market sentiment and historical trends reported in late 2023, Solana has shown significant volatility. While some analysts suggest a potential upside due to ecosystem growth, others remain cautious about network stability. It is recommended to perform due diligence...",
      "In conclusion, the price might go up or down depending on global macroeconomic factors and Bitcoin\u2019s movement.",
    ],
    tags: ["Stale data", "Text walls", "Vague"],
  },
  prism: {
    label: "Prism AI",
    lines: [
      "> Fetching real-time Solana DEX data...",
      "> Analyzing Orderbook Depth (Raydium)",
    ],
    code: `import prism_sdk as ps
import pandas as pd
# Fetch live liquidity metrics
sol_data = ps.get_token_metrics("SOL")
whale_activity = ps.scan_recent_tx(min_val=50000)
if sol_data.rsi < 30:
    print("Strong Oversold Signal")
    ps.execute_trade("BUY", amount=10)`,
    result: '> Execution complete. Signal: BULLISH (92%)',
    tags: ["Real-time", "Structured", "Actionable"],
  },
};

export const footerLinks: readonly NavLink[] = [
  { label: "Manifesto", href: "#" },
  { label: "API_Key", href: "#" },
  { label: "Secure_Link", href: "#" },
];
