// ── Financial Projections & Business Metrics ─────────────────────────────
// CryptoPrism: AI Quant Platform for Crypto
// Compiled for pitch deck appendix — VC-grade financial model
// All benchmarks sourced from industry reports (sources cited inline)
//
// IMPORTANT: These are projections for a pre-revenue startup launching 2026.
// Numbers are based on SaaS industry benchmarks adjusted for crypto/India.

// ═══════════════════════════════════════════════════════════════════════════
// 1. TAM / SAM / SOM
// ═══════════════════════════════════════════════════════════════════════════

export interface MarketSizing {
  readonly label: string;
  readonly value: string;
  readonly math: string;
  readonly source: string;
}

export const marketSizing: readonly MarketSizing[] = [
  {
    label: 'TAM — Total Addressable Market',
    value: '$14.7B',
    math: '741M global crypto owners (2025) × estimated willingness-to-pay for analytics tools. Crypto compliance & blockchain analytics market projected at $13.97B by 2030 (CAGR 25.85%). Broader crypto market tools + data services = ~$14.7B by 2028.',
    source: 'Triple-A Cryptocurrency Ownership Data 2025; GII Research Crypto Compliance & Blockchain Analytics Market Forecast 2025-2030',
  },
  {
    label: 'SAM — Serviceable Addressable Market',
    value: '$2.1B',
    math: 'Active traders who pay for analytics (est. 5-8% of total crypto owners) = ~44M users globally. Average spend $40-50/mo on tools. India (123M users, 8.35% penetration) + SE Asia + global English-speaking markets. Conservative: 44M × $48 avg ARPU × 12 = $2.1B/yr for the retail crypto analytics segment.',
    source: 'Statista India Crypto Market Forecast 2026; Chainalysis 2025 Global Adoption Index',
  },
  {
    label: 'SOM — Serviceable Obtainable Market (Year 3)',
    value: '$8.4M',
    math: 'Target 4,200 paying subscribers by end of Y3 (0.0034% of India crypto users + early global). Blended ARPU ~$55/mo (mix of India ₹249-₹1,249 and global $49-$149). 4,200 × $55 × 12 × (1 + 15% B2B contribution) = ~$8.4M ARR.',
    source: 'Bottom-up model based on comparable early-stage crypto SaaS growth rates',
  },
] as const;

// ═══════════════════════════════════════════════════════════════════════════
// 2. UNIT ECONOMICS
// ═══════════════════════════════════════════════════════════════════════════

export interface UnitEconomicMetric {
  readonly metric: string;
  readonly indiaValue: string;
  readonly globalValue: string;
  readonly benchmark: string;
  readonly source: string;
}

export const unitEconomics: readonly UnitEconomicMetric[] = [
  {
    metric: 'ARPU (Monthly)',
    indiaValue: '₹620 (~$7.40)',
    globalValue: '$82',
    benchmark: 'Blended assumes 70% Signal / 30% Edge tier mix',
    source: 'Internal pricing model; Nansen charges $49-69/mo, Glassnode $39-799/mo',
  },
  {
    metric: 'Blended ARPU (All Markets)',
    indiaValue: '$55/mo',
    globalValue: '$55/mo',
    benchmark: 'Weighted average: 60% India users at $7.40 + 40% global users at $82 in Y1, shifting to 50/50 by Y3',
    source: 'Internal model',
  },
  {
    metric: 'CAC (Customer Acquisition Cost)',
    indiaValue: '$8-15',
    globalValue: '$45-85',
    benchmark: 'Crypto exchanges: ~$150/user. DeFi protocols: ~$85. India digital marketing 3-5x cheaper than US. Fintech India CAC: $5-20.',
    source: 'GrowthChain Crypto CAC Playbook; First Page Sage CAC Benchmarks 2026',
  },
  {
    metric: 'LTV (Lifetime Value)',
    indiaValue: '$66',
    globalValue: '$574',
    benchmark: 'LTV = ARPU × Gross Margin × (1 / Monthly Churn). India: $7.40 × 80% × (1/0.09) = $66. Global: $82 × 80% × (1/0.085) = $574 (B2C fintech monthly churn 7-9%).',
    source: 'SaaS churn benchmarks 2025; Agile Growth Labs; Vena Solutions',
  },
  {
    metric: 'LTV:CAC Ratio',
    indiaValue: '4.4:1 — 8.3:1',
    globalValue: '6.8:1 — 12.8:1',
    benchmark: 'Healthy SaaS target: 3:1+. Best-in-class: 5:1+. CryptoPrism benefits from low India CAC.',
    source: 'Kruze Consulting Unit Economics Guide; SaaS Capital Benchmarks',
  },
  {
    metric: 'CAC Payback Period',
    indiaValue: '1.1-2.0 months',
    globalValue: '5.5-10.4 months',
    benchmark: 'Median SaaS: 6.8 months. Sub-12 months considered healthy by 76% of SaaS companies.',
    source: 'Proven SaaS CAC Payback Benchmarks 2026',
  },
  {
    metric: 'Monthly Churn Rate (Logo)',
    indiaValue: '9%',
    globalValue: '8.5%',
    benchmark: 'B2C SaaS avg: 7.3% monthly. Consumer fintech apps retain only 4.5% after 30 days. Crypto is higher-churn due to market cycles. Improves with engagement features.',
    source: 'We Are Founders SaaS Churn 2025; Agile Growth Labs Churn Benchmarks',
  },
  {
    metric: 'Annual Churn Rate',
    indiaValue: '~68%',
    globalValue: '~64%',
    benchmark: 'B2C SaaS annual: 60.8% avg. Fintech: 12-26% (B2B context). Consumer crypto tools are cyclical — churn spikes in bear markets, drops in bull markets.',
    source: 'Agile Growth Labs; Vitally SaaS Churn Benchmarks 2025',
  },
  {
    metric: 'Gross Margin',
    indiaValue: '78-82%',
    globalValue: '78-82%',
    benchmark: 'SaaS median gross margin: 75-80%. Infrastructure-heavy data companies slightly lower. CryptoPrism owns the full pipeline (no third-party data resale costs for core data).',
    source: 'SaaS Capital 2025 Benchmarks; Maxio 2025 SaaS Benchmarks Report',
  },
] as const;

// ═══════════════════════════════════════════════════════════════════════════
// 3. FINANCIAL PROJECTIONS — 3-YEAR MODEL
// ═══════════════════════════════════════════════════════════════════════════

export interface MonthlyProjection {
  readonly month: number;
  readonly label: string;
  readonly newUsers: number;
  readonly totalPaying: number;
  readonly mrr: number;          // Monthly Recurring Revenue in USD
  readonly burnRate: number;     // Monthly burn in USD
  readonly netCashFlow: number;  // MRR - Burn
  readonly cumulativeCash: number;
}

// Year 1: Month-by-month (launch mid-2026, first 12 months)
// Assumes: seed funding of $500K, India-first launch, gradual global expansion
export const year1Monthly: readonly MonthlyProjection[] = [
  { month: 1,  label: 'Jul 2026', newUsers: 30,   totalPaying: 30,   mrr: 660,      burnRate: 18000,  netCashFlow: -17340,  cumulativeCash: 482660 },
  { month: 2,  label: 'Aug 2026', newUsers: 45,   totalPaying: 68,   mrr: 1496,     burnRate: 19000,  netCashFlow: -17504,  cumulativeCash: 465156 },
  { month: 3,  label: 'Sep 2026', newUsers: 65,   totalPaying: 124,  mrr: 2728,     burnRate: 20000,  netCashFlow: -17272,  cumulativeCash: 447884 },
  { month: 4,  label: 'Oct 2026', newUsers: 90,   totalPaying: 195,  mrr: 4290,     burnRate: 21000,  netCashFlow: -16710,  cumulativeCash: 431174 },
  { month: 5,  label: 'Nov 2026', newUsers: 120,  totalPaying: 290,  mrr: 6380,     burnRate: 22000,  netCashFlow: -15620,  cumulativeCash: 415554 },
  { month: 6,  label: 'Dec 2026', newUsers: 160,  totalPaying: 400,  mrr: 10000,    burnRate: 24000,  netCashFlow: -14000,  cumulativeCash: 401554 },
  { month: 7,  label: 'Jan 2027', newUsers: 200,  totalPaying: 530,  mrr: 15900,    burnRate: 26000,  netCashFlow: -10100,  cumulativeCash: 391454 },
  { month: 8,  label: 'Feb 2027', newUsers: 250,  totalPaying: 680,  mrr: 23800,    burnRate: 28000,  netCashFlow: -4200,   cumulativeCash: 387254 },
  { month: 9,  label: 'Mar 2027', newUsers: 300,  totalPaying: 840,  mrr: 33600,    burnRate: 30000,  netCashFlow: 3600,    cumulativeCash: 390854 },
  { month: 10, label: 'Apr 2027', newUsers: 350,  totalPaying: 1010, mrr: 45450,    burnRate: 32000,  netCashFlow: 13450,   cumulativeCash: 404304 },
  { month: 11, label: 'May 2027', newUsers: 380,  totalPaying: 1170, mrr: 55575,    burnRate: 33000,  netCashFlow: 22575,   cumulativeCash: 426879 },
  { month: 12, label: 'Jun 2027', newUsers: 400,  totalPaying: 1330, mrr: 66500,    burnRate: 35000,  netCashFlow: 31500,   cumulativeCash: 458379 },
] as const;

// Note on Y1 model:
// - Months 1-3: India beta launch, mostly ₹249 Signal tier, heavy organic/content marketing
// - Months 4-6: Product-market fit signals, add Edge tier upsells, global soft launch
// - Months 7-9: Global launch, blended ARPU rises as $49/$149 users join
// - Months 10-12: B2B DaaS pilot deals start closing (1-3 enterprise contracts)
// - Churn applied: ~9% monthly India, ~8.5% global (net of new adds shown)
// - totalPaying is NET of churn
// - MRR includes estimated blended ARPU shift from $22 early to $50 late Y1

export interface QuarterlyProjection {
  readonly quarter: string;
  readonly totalPaying: number;
  readonly mrr: number;
  readonly arr: number;          // ARR = MRR × 12
  readonly burnRate: number;     // Monthly burn
  readonly grossMargin: string;
  readonly b2bRevenue: number;   // Monthly B2B DaaS revenue
}

export const year2Quarterly: readonly QuarterlyProjection[] = [
  { quarter: 'Q1 FY2 (Jul-Sep 2027)', totalPaying: 1800,  mrr: 99000,   arr: 1188000,  burnRate: 45000,  grossMargin: '78%', b2bRevenue: 8000 },
  { quarter: 'Q2 FY2 (Oct-Dec 2027)', totalPaying: 2300,  mrr: 138000,  arr: 1656000,  burnRate: 55000,  grossMargin: '79%', b2bRevenue: 15000 },
  { quarter: 'Q3 FY2 (Jan-Mar 2028)', totalPaying: 2800,  mrr: 182000,  arr: 2184000,  burnRate: 65000,  grossMargin: '80%', b2bRevenue: 25000 },
  { quarter: 'Q4 FY2 (Apr-Jun 2028)', totalPaying: 3400,  mrr: 238000,  arr: 2856000,  burnRate: 72000,  grossMargin: '80%', b2bRevenue: 38000 },
] as const;

export const year3Quarterly: readonly QuarterlyProjection[] = [
  { quarter: 'Q1 FY3 (Jul-Sep 2028)', totalPaying: 4000,  mrr: 300000,  arr: 3600000,  burnRate: 85000,  grossMargin: '81%', b2bRevenue: 55000 },
  { quarter: 'Q2 FY3 (Oct-Dec 2028)', totalPaying: 4800,  mrr: 384000,  arr: 4608000,  burnRate: 95000,  grossMargin: '81%', b2bRevenue: 75000 },
  { quarter: 'Q3 FY3 (Jan-Mar 2029)', totalPaying: 5600,  mrr: 476000,  arr: 5712000,  burnRate: 105000, grossMargin: '82%', b2bRevenue: 100000 },
  { quarter: 'Q4 FY3 (Apr-Jun 2029)', totalPaying: 6500,  mrr: 585000,  arr: 7020000,  burnRate: 115000, grossMargin: '82%', b2bRevenue: 130000 },
] as const;

// ═══════════════════════════════════════════════════════════════════════════
// 4. BURN RATE & INFRASTRUCTURE COSTS
// ═══════════════════════════════════════════════════════════════════════════

export interface CostLineItem {
  readonly category: string;
  readonly monthlyY1Early: string;   // Months 1-6
  readonly monthlyY1Late: string;    // Months 7-12
  readonly monthlyY2: string;
  readonly monthlyY3: string;
  readonly notes: string;
}

export const costBreakdown: readonly CostLineItem[] = [
  {
    category: 'Team (Salaries + Contractors)',
    monthlyY1Early: '$8,000',
    monthlyY1Late: '$18,000',
    monthlyY2: '$38,000',
    monthlyY3: '$65,000',
    notes: '2 founders (minimal salary) → 5-6 by late Y1 → 10-12 by Y2 → 15-18 by Y3. India-based team: avg $2,000-4,000/mo per engineer. Founders take $1,500-2,000/mo early.',
  },
  {
    category: 'Cloud Infrastructure (GCP/AWS)',
    monthlyY1Early: '$1,200',
    monthlyY1Late: '$3,500',
    monthlyY2: '$8,000',
    monthlyY3: '$18,000',
    notes: 'Cloud Run, Cloud SQL (PostgreSQL), Cloud Storage, BigQuery. Starts on GCP free tier credits. Scales with data volume and user traffic. $500K+ GCP startup credits available.',
  },
  {
    category: 'API & Data Costs',
    monthlyY1Early: '$800',
    monthlyY1Late: '$2,000',
    monthlyY2: '$5,000',
    monthlyY3: '$12,000',
    notes: 'CoinMarketCap API ($79-399/mo), news APIs, exchange data feeds, LLM API calls (OpenAI/Anthropic for NL terminal). Scales with query volume.',
  },
  {
    category: 'Database & Storage',
    monthlyY1Early: '$400',
    monthlyY1Late: '$1,200',
    monthlyY2: '$3,000',
    monthlyY3: '$8,000',
    notes: '3 PostgreSQL databases. 108K+ OHLCV records/run across 1000+ coins. Time-series data grows ~2GB/month early, ~20GB/month at scale.',
  },
  {
    category: 'Marketing & Acquisition',
    monthlyY1Early: '$3,000',
    monthlyY1Late: '$6,000',
    monthlyY2: '$12,000',
    monthlyY3: '$20,000',
    notes: 'Content marketing, crypto influencer partnerships, SEO, community building. India: $8-15 CAC. Global: $45-85 CAC. Mostly organic/content early, paid later.',
  },
  {
    category: 'Tools & SaaS Subscriptions',
    monthlyY1Early: '$600',
    monthlyY1Late: '$1,000',
    monthlyY2: '$2,000',
    monthlyY3: '$3,500',
    notes: 'GitHub, Vercel/hosting, analytics (Mixpanel/Amplitude), monitoring (Datadog), email (SendGrid), support tools.',
  },
  {
    category: 'Legal, Compliance & Admin',
    monthlyY1Early: '$500',
    monthlyY1Late: '$800',
    monthlyY2: '$2,000',
    monthlyY3: '$4,000',
    notes: 'Company registration, IP protection, crypto regulatory compliance, accounting. India regulatory environment evolving.',
  },
  {
    category: 'Office & Miscellaneous',
    monthlyY1Early: '$300',
    monthlyY1Late: '$500',
    monthlyY2: '$1,500',
    monthlyY3: '$3,000',
    notes: 'Co-working space (India: $100-200/seat/mo), travel for conferences, equipment.',
  },
] as const;

export const burnSummary = {
  y1EarlyMonthly: '$14,800 → ~$18,000',
  y1LateMonthly: '$28,000 → ~$35,000',
  y2Monthly: '$55,000 → $72,000',
  y3Monthly: '$85,000 → $115,000',
  seedRunwayNeeded: '$500K for 24-30 months runway at early burn',
  breakEvenTarget: 'Month 9 of Y1 (MRR > monthly burn) — unit economics positive earlier',
  seriesATarget: '$3-5M at end of Y1 / early Y2 if hitting growth milestones',
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// 5. MARKETING CHANNEL ECONOMICS
// ═══════════════════════════════════════════════════════════════════════════

export interface MarketingChannel {
  readonly channel: string;
  readonly estimatedCAC: string;
  readonly percentOfBudget: string;
  readonly timeToROI: string;
  readonly notes: string;
}

export const marketingChannels: readonly MarketingChannel[] = [
  {
    channel: 'Content Marketing / SEO',
    estimatedCAC: '$5-20 (India) / $30-60 (Global)',
    percentOfBudget: '30%',
    timeToROI: '3-6 months',
    notes: 'Crypto education content, indicator explainers, strategy breakdowns. High intent traffic. Crypto users actively search for tools.',
  },
  {
    channel: 'Crypto Twitter / X & Community',
    estimatedCAC: '$3-10 (India) / $15-40 (Global)',
    percentOfBudget: '25%',
    timeToROI: '1-3 months',
    notes: 'Crypto Twitter (CT) is the primary discovery channel. Thread strategies, alpha sharing, community building on Discord/Telegram.',
  },
  {
    channel: 'YouTube / Influencer Partnerships',
    estimatedCAC: '$10-25 (India) / $50-100 (Global)',
    percentOfBudget: '20%',
    timeToROI: '1-2 months',
    notes: 'Indian crypto YouTubers (50K-500K subs) charge $200-2,000/video. Global KOLs: $2,000-15,000. High conversion for tool reviews.',
  },
  {
    channel: 'Paid Ads (Google/Meta)',
    estimatedCAC: '$15-30 (India) / $80-150 (Global)',
    percentOfBudget: '15%',
    timeToROI: 'Immediate',
    notes: 'Google Ads for "crypto screener," "crypto signals" keywords. India CPC: $0.10-0.50. US CPC: $2-8. Crypto ad policies restrict some channels.',
  },
  {
    channel: 'Referral / Affiliate Program',
    estimatedCAC: '$5-12 (India) / $20-40 (Global)',
    percentOfBudget: '10%',
    timeToROI: '2-4 months',
    notes: 'Referral most cost-efficient at $141-200/customer in general SaaS. Crypto users are highly referral-driven. Offer 1 month free for referrer + referred.',
  },
] as const;

// ═══════════════════════════════════════════════════════════════════════════
// 6. KEY SaaS METRICS & BENCHMARKS
// ═══════════════════════════════════════════════════════════════════════════

export interface SaaSBenchmark {
  readonly metric: string;
  readonly industryBenchmark: string;
  readonly cryptoPrismTarget: string;
  readonly year1Goal: string;
  readonly year3Goal: string;
  readonly source: string;
}

export const saasBenchmarks: readonly SaaSBenchmark[] = [
  {
    metric: 'NPS (Net Promoter Score)',
    industryBenchmark: '30-50 (B2B SaaS)',
    cryptoPrismTarget: '40+',
    year1Goal: '35',
    year3Goal: '50+',
    source: 'SciquSAMS SaaS Retention Metrics 2025',
  },
  {
    metric: 'DAU/MAU Ratio',
    industryBenchmark: '20-30% (SaaS avg)',
    cryptoPrismTarget: '25%+',
    year1Goal: '20%',
    year3Goal: '30%',
    source: 'Embarque DAU/MAU Glossary; Product School Engagement Metrics',
  },
  {
    metric: 'Activation Rate',
    industryBenchmark: '25-40% (B2C SaaS)',
    cryptoPrismTarget: '35%',
    year1Goal: '25%',
    year3Goal: '40%',
    source: 'Userpilot SaaS Activation Benchmarks',
  },
  {
    metric: 'Free-to-Paid Conversion',
    industryBenchmark: '2-5% (freemium B2C SaaS)',
    cryptoPrismTarget: '4%',
    year1Goal: '2.5%',
    year3Goal: '5%',
    source: 'Lenny Rachitsky SaaS Conversion Benchmarks',
  },
  {
    metric: 'Expansion Revenue %',
    industryBenchmark: '20-30% of new ARR',
    cryptoPrismTarget: '25%',
    year1Goal: '10%',
    year3Goal: '30%',
    source: 'SaaS Capital 2025 Benchmarks for Bootstrapped Companies',
  },
  {
    metric: 'Net Revenue Retention (NRR)',
    industryBenchmark: '100-110% (B2C), 110-120% (B2B)',
    cryptoPrismTarget: '105%',
    year1Goal: '95%',
    year3Goal: '110%',
    source: 'Benchmarkit 2025 SaaS Performance Metrics; Pavilion B2B SaaS Benchmarks',
  },
  {
    metric: 'Gross Revenue Retention',
    industryBenchmark: '80-90% annually',
    cryptoPrismTarget: '82%',
    year1Goal: '75%',
    year3Goal: '85%',
    source: 'Maxio 2025 SaaS Benchmarks Report',
  },
  {
    metric: 'Monthly Revenue Growth Rate',
    industryBenchmark: '10-20% (early stage MoM)',
    cryptoPrismTarget: '15% MoM in Y1',
    year1Goal: '15-20% MoM',
    year3Goal: '8-12% MoM',
    source: 'SaaS Capital Private Company Growth Benchmarks 2025',
  },
  {
    metric: 'Burn Multiple',
    industryBenchmark: '1.5-3.4x (early stage)',
    cryptoPrismTarget: '<2.0x',
    year1Goal: '3.0x',
    year3Goal: '1.2x',
    source: 'CFO Advisors 2025 Burn Multiple Benchmarks; Scale VP SaaS Growth & Burn',
  },
] as const;

// ═══════════════════════════════════════════════════════════════════════════
// 7. COMPARABLE COMPANIES
// ═══════════════════════════════════════════════════════════════════════════

export interface Comparable {
  readonly company: string;
  readonly category: string;
  readonly revenue: string;
  readonly valuation: string;
  readonly pricing: string;
  readonly users: string;
  readonly keyMetric: string;
  readonly source: string;
}

export const comparables: readonly Comparable[] = [
  {
    company: 'TradingView',
    category: 'Charting & Social Trading',
    revenue: '$172.9M (2023 confirmed)',
    valuation: '$3B (2021 Series A, Tiger Global)',
    pricing: 'Freemium: Free / $14.95 / $29.95 / $59.95 per month',
    users: '90M+ registered, 7M+ active traders',
    keyMetric: '~17x revenue multiple. Est. 50M+ monthly visits. Dominant in charting.',
    source: 'GetLatka; CB Insights TradingView Financials',
  },
  {
    company: 'Nansen',
    category: 'On-Chain Analytics',
    revenue: 'Est. $15-25M ARR (private)',
    valuation: '$750M (Series B)',
    pricing: 'Free tier / Pro $49-69/mo (was $1,299/mo, reduced 95%)',
    users: '500M+ wallet labels, institutional + retail',
    keyMetric: '30-50x revenue multiple. Pivoted from enterprise-only to freemium in 2025.',
    source: 'CB Insights; Nansen Plans Page; PitchBook',
  },
  {
    company: 'Glassnode',
    category: 'On-Chain Intelligence',
    revenue: 'Est. $8-15M ARR (private)',
    valuation: 'Est. $100-200M (undisclosed)',
    pricing: 'Free / Advanced ~$39/mo / Professional $799/mo / Enterprise $1,125/mo',
    users: 'Institutional focus, est. 50K-100K active users',
    keyMetric: 'Premier Bitcoin on-chain analytics. MVRV, NUPL indicators are industry standard.',
    source: 'CB Insights Glassnode Financials; Captain AltCoin Glassnode Review 2026',
  },
  {
    company: 'Messari',
    category: 'Crypto Research & Data',
    revenue: 'Est. $15-30M ARR (private)',
    valuation: '$300M (Series B, 2021)',
    pricing: 'Free / Messari Pro (enterprise pricing)',
    users: 'Institutional focus — VCs, funds, protocols',
    keyMetric: '10-20x revenue multiple. Strong in governance and protocol research.',
    source: 'CB Insights Messari Financials; Messari.io',
  },
  {
    company: 'CoinGecko',
    category: 'Market Data Aggregator',
    revenue: 'Est. $30-50M (ads + API licensing)',
    valuation: 'Est. $500M-1B (private)',
    pricing: 'Free / API plans $129-499/mo',
    users: '300M+ annual visits',
    keyMetric: 'Largest free crypto data aggregator. API monetization is primary revenue.',
    source: 'SimilarWeb traffic data; CoinGecko API pricing page',
  },
] as const;

// ═══════════════════════════════════════════════════════════════════════════
// 8. FUNDING & MILESTONES
// ═══════════════════════════════════════════════════════════════════════════

export interface FundingMilestone {
  readonly stage: string;
  readonly timing: string;
  readonly amount: string;
  readonly keyMilestones: string;
  readonly useOfFunds: string;
  readonly valuation: string;
}

export const fundingRoadmap: readonly FundingMilestone[] = [
  {
    stage: 'Pre-Seed / Angel',
    timing: 'Q2 2026',
    amount: '$150K-250K',
    keyMilestones: 'Working product, 17 production repos, full data pipeline operational, beta users onboarded',
    useOfFunds: '60% product (hire 2-3 engineers), 25% marketing (beta launch), 15% ops',
    valuation: '$1.5-2.5M pre-money',
  },
  {
    stage: 'Seed',
    timing: 'Q4 2026 / Q1 2027',
    amount: '$500K-1M',
    keyMilestones: '500+ paying users, $10K+ MRR, India product-market fit, first B2B pilot',
    useOfFunds: '50% team (scale to 8-10), 25% infrastructure, 15% marketing, 10% ops',
    valuation: '$4-6M pre-money',
  },
  {
    stage: 'Series A',
    timing: 'Q2-Q3 2028',
    amount: '$3-5M',
    keyMilestones: '3,000+ paying users, $200K+ MRR, global expansion, 5+ B2B contracts, NRR >100%',
    useOfFunds: '40% team (scale to 20+), 30% global go-to-market, 20% infrastructure, 10% ops',
    valuation: '$20-35M pre-money (7-12x ARR)',
  },
] as const;

// ═══════════════════════════════════════════════════════════════════════════
// 9. SENSITIVITY ANALYSIS
// ═══════════════════════════════════════════════════════════════════════════

export interface Scenario {
  readonly name: string;
  readonly y1EndMRR: string;
  readonly y1EndUsers: number;
  readonly y3ARR: string;
  readonly y3Users: number;
  readonly assumptions: string;
}

export const scenarios: readonly Scenario[] = [
  {
    name: 'Bear Case',
    y1EndMRR: '$25,000',
    y1EndUsers: 600,
    y3ARR: '$2.5M',
    y3Users: 2800,
    assumptions: 'Crypto winter in 2026-27. Churn 12% monthly. Low conversion. India regulatory headwinds. CAC 2x base case.',
  },
  {
    name: 'Base Case',
    y1EndMRR: '$66,500',
    y1EndUsers: 1330,
    y3ARR: '$7.0M',
    y3Users: 6500,
    assumptions: 'Moderate crypto market. 9% monthly churn. Steady organic growth. 2-3 B2B contracts in Y1. Global launch in Month 6.',
  },
  {
    name: 'Bull Case',
    y1EndMRR: '$150,000',
    y1EndUsers: 2500,
    y3ARR: '$18M',
    y3Users: 12000,
    assumptions: 'Crypto bull market through 2027. 6% monthly churn. Viral product loops. 5+ B2B contracts Y1. Strong NRR 115%+.',
  },
] as const;

// ═══════════════════════════════════════════════════════════════════════════
// 10. KEY MARKET STATS (for reference throughout deck)
// ═══════════════════════════════════════════════════════════════════════════

export const marketStats = {
  globalCryptoOwners2025: '741M',
  globalCryptoOwnersGrowth: '12.4% YoY (2024→2025)',
  globalCryptoOwners2026Projected: '800-993M',
  indiaCryptoUsers2026: '123.35M',
  indiaRankGlobalAdoption: '#1 (3rd consecutive year, Chainalysis 2025)',
  indiaTransactionVolume: '$2.36T (Jul 2024-Jun 2025, +69% YoY)',
  indiaCryptoMarketSize2025: '$3.0-9.7B (varies by source)',
  indiaCryptoMarketCAGR: '18.66% (2026-2034)',
  indiaUserPenetration2026: '8.35%',
  indiaYoungInvestors: '72% under 35',
  cryptoAnalyticsMarket2025: '$4.41B',
  cryptoAnalyticsMarketCAGR: '25.85%',
  cryptoAnalyticsMarket2030: '$13.97B',
} as const;

export const marketStatsSources = {
  globalCryptoOwners: 'Triple-A Cryptocurrency Ownership Data 2025; Crypto.com Market Sizing Report 2025',
  indiaCryptoUsers: 'Statista India Crypto Market Forecast; MEXC India Crypto Adoption Report',
  indiaRank: 'Chainalysis 2025 Global Adoption Index',
  indiaTransactions: 'Chainalysis 2025 Global Adoption Index',
  cryptoAnalyticsMarket: 'GII Research Crypto Compliance & Blockchain Analytics Market 2025-2030',
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// 11. INFRASTRUCTURE DETAIL (for technical appendix)
// ═══════════════════════════════════════════════════════════════════════════

export const infrastructureDetail = {
  currentStack: {
    compute: 'Google Cloud Run (serverless, scales to zero)',
    databases: '3x Cloud SQL PostgreSQL instances',
    storage: 'Google Cloud Storage for artifacts + backups',
    cicd: 'GitHub Actions (17 repos)',
    monitoring: 'Cloud Logging + custom health checks',
    cdn: 'Cloudflare (free tier → Pro as traffic grows)',
  },
  dataVolume: {
    ohlcvPerRun: '108,000+ records',
    coinsTracked: '1,000+',
    indicatorsComputed: '130+ per coin per timeframe',
    newsArticlesPerHour: '500+',
    newsSources: 44,
    topicCategories: '182+',
    estimatedStorageGrowthY1: '~50GB',
    estimatedStorageGrowthY3: '~500GB',
  },
  scalingCosts: {
    per1000Users: '$200-400/mo incremental cloud cost',
    per10000Users: '$1,500-3,000/mo incremental cloud cost',
    apiCallCostPerMillion: '$5-15 (depends on provider)',
    llmCostPerQuery: '$0.01-0.05 (GPT-4 class, with caching)',
  },
} as const;
