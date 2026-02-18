import React, { useMemo } from 'react';
import { motion } from 'motion/react';

/* ── Sentiment types ─────────────────────────────────────────────── */
type Sentiment = 'bearish' | 'bullish' | 'neutral';

interface NewsArticle {
  readonly id: string;
  readonly sentiment: Sentiment;
  readonly impact: string;
  readonly needleAngle: number;
  readonly category: string;
  readonly source: string;
  readonly timeAgo: string;
  readonly headline: string;
  readonly summary: string;
  readonly tags: readonly string[];
}

const SENTIMENT_STYLES: Record<
  Sentiment,
  { label: string; color: string; textClass: string; borderClass: string; bgClass: string }
> = {
  bearish: {
    label: 'Bearish',
    color: '#FF4D4D',
    textClass: 'text-red-500',
    borderClass: 'border-l-red-500',
    bgClass: 'bg-red-500/5',
  },
  bullish: {
    label: 'Bullish',
    color: '#0ECB81',
    textClass: 'text-neon-green',
    borderClass: 'border-l-neon-green',
    bgClass: 'bg-neon-green/5',
  },
  neutral: {
    label: 'Neutral',
    color: '#64748B',
    textClass: 'text-gray-400',
    borderClass: 'border-l-gray-600',
    bgClass: 'bg-gray-800/10',
  },
};

const NEWS_ARTICLES: readonly NewsArticle[] = [
  {
    id: 'congestion',
    sentiment: 'bearish',
    impact: 'Moderate',
    needleAngle: -60,
    category: 'Layer 1',
    source: 'Economic Times',
    timeAgo: '41d ago',
    headline: 'Network Congestion Spikes: Transaction Failures Reach All-Time Highs',
    summary:
      'Recent technical bottlenecks have caused a 13% decline in successful block production. Analysts suggest funding pressures may persist until the v2.4 upgrade is fully deployed next month.',
    tags: ['SOL', 'INFRA'],
  },
  {
    id: 'tvl-surge',
    sentiment: 'bullish',
    impact: 'High',
    needleAngle: 45,
    category: 'DeFi',
    source: 'The Block',
    timeAgo: '41d ago',
    headline: 'Protocol TVL Surges 18% Following Institutional Partnership Announcement',
    summary:
      'A major partnership with European fintech leaders has driven a 9% YoY growth in active wallets. Long-term holders are accumulating amid strong financial performance and ecosystem expansion.',
    tags: ['AAVE', 'MKR', 'INSTITUTIONAL'],
  },
  {
    id: 'g20-regulation',
    sentiment: 'neutral',
    impact: 'Low',
    needleAngle: 0,
    category: 'Policy',
    source: 'Reuters',
    timeAgo: '42d ago',
    headline: 'Global Regulatory Frameworks Under Discussion at G20 Summit',
    summary:
      'International leaders continue to debate the standard definition of digital assets. While progress is slow, the focus remains on AML compliance and cross-border settlement protocols.',
    tags: ['REGULATION', 'MACRO'],
  },
];

/* ── Feature items ───────────────────────────────────────────────── */
const SENTIMENT_FEATURES = [
  {
    icon: 'trending_up',
    title: 'Quantified Sentiment',
    description:
      'We don\'t just say "Good News." We score it with real-time volatility metrics (e.g., Bullish, Moderate Impact).',
  },
  {
    icon: 'psychology',
    title: 'AI Analysis',
    description:
      'Get a 2-sentence executive summary of why this matters for the stock price, removing clickbait fluff and filler.',
  },
  {
    icon: 'map',
    title: 'Sector Heatmap',
    description:
      'Visualize exactly which sectors (L1s, DeFi, AI, Gaming) are heating up based on news volume and aggregated sentiment.',
  },
] as const;

/* ── Gauge component ─────────────────────────────────────────────── */
const SentimentGauge: React.FC<{ sentiment: Sentiment; angle: number }> = ({
  sentiment,
  angle,
}) => {
  const style = SENTIMENT_STYLES[sentiment];
  const endX = 30 + 20 * Math.cos(((angle - 90) * Math.PI) / 180);
  const endY = 30 + 20 * Math.sin(((angle - 90) * Math.PI) / 180);

  return (
    <div className="sentiment-gauge-container">
      <svg
        width="60"
        height="34"
        viewBox="0 0 60 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background arc */}
        <path
          d="M6 30 A24 24 0 0 1 54 30"
          stroke="#1E293B"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        {/* Colored arc — animated draw */}
        <motion.path
          d="M6 30 A24 24 0 0 1 54 30"
          stroke={style.color}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
          strokeDasharray="75.4"
          initial={{ strokeDashoffset: 75.4 }}
          whileInView={{
            strokeDashoffset: sentiment === 'bearish' ? 50 : sentiment === 'bullish' ? 25 : 37,
          }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        />
        {/* Needle — animated rotation */}
        <motion.line
          x1="30"
          y1="30"
          x2={endX}
          y2={endY}
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.4 }}
        />
        {/* Center dot */}
        <circle cx="30" cy="30" r="3" fill="white" />
      </svg>
    </div>
  );
};

/* ── Main component ──────────────────────────────────────────────── */
interface NewsSentimentProps {
  readonly className?: string;
}

export const NewsSentiment: React.FC<NewsSentimentProps> = ({ className = '' }) => {
  const tickerArticles = useMemo(() => [...NEWS_ARTICLES, ...NEWS_ARTICLES], []);

  return (
    <section className={`relative lg:h-[100dvh] flex flex-col justify-center py-10 lg:py-8 px-4 sm:px-6 lg:px-0 ${className}`} id="news-sentiment">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="text-center mb-8 md:mb-8">
        {/* Headline */}
        <motion.h2
          className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight mb-3 md:mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
        >
          News Without the <span className="text-white">Noise.</span>
          <br />
          <span className="text-neon-green hero-neon-glow">Signals Without the Bias.</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="max-w-2xl mx-auto text-gray-400 hidden md:block text-sm font-medium leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          AI reads, interprets, and quantifies news impact in real-time,
          <br className="hidden md:block" />
          giving you pure signals for smarter trading decisions.
        </motion.p>
      </div>

      {/* ── Grid ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-stretch">
        {/* LEFT: News feed — vertical auto-scroll ticker on desktop */}
        <div className="lg:col-span-8 sentiment-glass-panel rounded-3xl p-1 overflow-hidden">
          <div className="news-ticker-viewport">
            <div className="news-ticker-strip">
              {tickerArticles.map((article, articleIdx) => {
                const style = SENTIMENT_STYLES[article.sentiment];
                return (
                  <div
                    key={`${article.id}-${articleIdx}`}
                    className={`news-ticker-item group flex bg-gray-900/40 hover:bg-gray-900/60 transition-all duration-300 border-l-4 ${style.borderClass}`}
                  >
                    {/* Gauge sidebar */}
                    <div
                      className={`hidden md:flex w-24 shrink-0 flex-col items-center justify-center py-4 border-r border-white/5 ${style.bgClass}`}
                    >
                      <SentimentGauge
                        sentiment={article.sentiment}
                        angle={article.needleAngle}
                      />
                      <span
                        className={`${style.textClass} font-bold text-[10px] uppercase tracking-widest mt-1`}
                      >
                        {style.label}
                      </span>
                      <div className="mt-2 text-center">
                        <p className="text-[9px] text-gray-500 uppercase font-bold tracking-tighter">
                          Impact
                        </p>
                        <p className="text-[10px] text-gray-300 font-medium">{article.impact}</p>
                      </div>
                    </div>

                    {/* Article content */}
                    <div className="flex-1 p-3 md:p-4 space-y-1.5 md:space-y-2">
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="bg-gray-800 text-gray-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                          {article.category}
                        </span>
                        <span className="text-gray-500 font-medium">
                          {article.source} • {article.timeAgo}
                        </span>
                      </div>
                      <h3 className="text-sm md:text-base font-bold text-white group-hover:text-neon-green transition-colors leading-snug">
                        {article.headline}
                      </h3>
                      <p className="text-gray-400 text-xs md:text-xs leading-snug md:leading-relaxed">{article.summary}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-[9px] font-mono text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT: Features + Upgrade CTA */}
        <div className="hidden lg:flex lg:col-span-4 flex-col justify-between space-y-6 lg:pl-4">
          {/* Feature items */}
          <div className="space-y-4 md:space-y-5">
            {SENTIMENT_FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="flex items-start gap-3 group"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.5,
                  ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
                }}
              >
                <div className="shrink-0 w-9 h-9 md:w-10 md:h-10 sentiment-glass-panel rounded-xl flex items-center justify-center group-hover:bg-neon-green/10 transition-colors duration-500">
                  <span className="material-symbols-outlined text-lg md:text-xl text-neon-green sentiment-icon-glow">
                    {feature.icon}
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm md:text-base font-bold text-white">{feature.title}</h4>
                  <p className="text-gray-400 text-xs leading-snug">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Upgrade card */}
          <motion.div
            className="p-3 md:p-4 sentiment-glass-panel rounded-xl border-dashed border-neon-green/30 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5, type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="relative z-10">
              <p className="text-white text-sm font-bold mb-2">Upgrade to Pro for 0ms Latency</p>
              <motion.button
                className="sentiment-premium-button w-full"
                id="sentiment-go-premium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                GO PREMIUM
              </motion.button>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <span className="material-symbols-outlined text-6xl text-neon-green">bolt</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsSentiment;
