import React from 'react';
import { motion } from 'motion/react';

/* ── Strategy card data ──────────────────────────────────────────── */
interface StrategyAsset {
  readonly ticker: string;
  readonly name: string;
  readonly tag: string;
  readonly score: string;
  readonly highlight: boolean;
}

interface StrategyCard {
  readonly id: string;
  readonly badge: string;
  readonly badgeColor: 'green' | 'red' | 'cyan';
  readonly title: string;
  readonly description: string;
  readonly assetsActive: number;
  readonly lastSync: string;
  readonly assets: readonly StrategyAsset[];
  readonly locked: boolean;
}

const STRATEGY_CARDS: readonly StrategyCard[] = [
  {
    id: 'balanced-trio',
    badge: 'Fundamental Strategy',
    badgeColor: 'green',
    title: 'Balanced Trio: Quality-Value-Momentum',
    description:
      'Rank all assets separately on value, quality and momentum, average the three ranks into a composite index.',
    assetsActive: 4,
    lastSync: '2m ago',
    assets: [
      { ticker: 'BTC', name: 'BITCOIN', tag: 'Macro Leader', score: '98.24', highlight: true },
      { ticker: 'ETH', name: 'ETHEREUM', tag: 'Network Utility', score: '84.50', highlight: false },
      { ticker: 'SOL', name: 'SOLANA', tag: 'High Throughput', score: '72.18', highlight: false },
    ],
    locked: false,
  },
  {
    id: 'support-bounce',
    badge: 'Momentum & Technical',
    badgeColor: 'red',
    title: 'Support Bounce with Volume Confirmation',
    description:
      'Identify assets where price recently tested a 20-day support range and bounced with relative volume spike > 2x average.',
    assetsActive: 6,
    lastSync: '5m ago',
    assets: [
      { ticker: 'AVAX', name: 'AVALANCHE', tag: 'Subnet Arch.', score: '91.40', highlight: true },
      { ticker: 'LINK', name: 'CHAINLINK', tag: 'Oracle Layer', score: '78.65', highlight: false },
      { ticker: 'DOT', name: 'POLKADOT', tag: 'Parachain Hub', score: '65.30', highlight: false },
    ],
    locked: true,
  },
  {
    id: 'whale-divergence',
    badge: 'On-Chain Signal',
    badgeColor: 'cyan',
    title: 'Whale Accumulation vs Exchange Outflow',
    description:
      'Detect tokens where whale wallets are accumulating while exchange reserves decline — a classic pre-breakout pattern.',
    assetsActive: 3,
    lastSync: '1m ago',
    assets: [
      { ticker: 'SOL', name: 'SOLANA', tag: 'High Throughput', score: '94.80', highlight: true },
      { ticker: 'INJ', name: 'INJECTIVE', tag: 'DeFi Native', score: '87.15', highlight: false },
      { ticker: 'PEPE', name: 'PEPE', tag: 'Meme Alpha', score: '76.90', highlight: false },
    ],
    locked: false,
  },
  {
    id: 'defi-yield',
    badge: 'DeFi Strategy',
    badgeColor: 'green',
    title: 'TVL Growth with Sustainable APR Filter',
    description:
      'Screen DeFi protocols showing consistent TVL growth > 15% MoM while maintaining APR spreads within sustainable ranges.',
    assetsActive: 5,
    lastSync: '8m ago',
    assets: [
      { ticker: 'AAVE', name: 'AAVE', tag: 'Lending Proto.', score: '92.10', highlight: true },
      { ticker: 'MKR', name: 'MAKER', tag: 'Stablecoin', score: '81.75', highlight: false },
      { ticker: 'PENDLE', name: 'PENDLE', tag: 'Yield Layer', score: '88.40', highlight: false },
    ],
    locked: true,
  },
] as const;

const BADGE_STYLES = {
  green: 'text-neon-green bg-neon-green/10 border border-neon-green/20',
  red: 'text-red-400 bg-red-400/10',
  cyan: 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/20',
} as const;

/* ── Feature list data ───────────────────────────────────────────── */
const FEATURES = [
  {
    icon: 'verified',
    title: 'Proven Strategies',
    description:
      'Clone screens built by veteran quant traders. Eliminate guesswork and start your analysis with a mathematical edge.',
  },
  {
    icon: 'bolt',
    title: 'Live Data Engine',
    description:
      'Every strategy runs on real-time order books and on-chain metrics. Decisions powered by the most current data available.',
  },
  {
    icon: 'settings_input_component',
    title: 'Customize or Use As-Is',
    description:
      'Fork any library strategy and tweak the logic. Add custom filters or change asset pools to match your specific risk profile.',
  },
  {
    icon: 'insights',
    title: 'Track in Real-Time',
    description:
      'Monitor strategy rotations instantly. See which assets enter the signal zone as market conditions shift throughout the day.',
  },
] as const;

/* ── Single strategy card renderer ───────────────────────────────── */
const StrategyCardItem: React.FC<{ card: StrategyCard }> = ({ card }) => (
  <motion.div
    className={`strategy-glass-card rounded-2xl shadow-2xl shrink-0 ${
      card.locked ? 'strategy-locked-overlay' : ''
    }`}
    whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
  >
    {/* Card header */}
    <div className="p-8 border-b border-white/5 bg-white/[0.01]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <span
            className={`text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-sm ${BADGE_STYLES[card.badgeColor]}`}
          >
            {card.badge}
          </span>
          <h3 className="text-2xl font-bold mt-4 text-white tracking-tight">{card.title}</h3>
        </div>
        <motion.button
          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 transition-colors border border-white/10"
          whileHover={card.locked ? {
            rotate: [0, -5, 5, -5, 5, 0],
            transition: { duration: 0.5 },
          } : { scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="material-symbols-outlined text-xl">
            {card.locked ? 'lock' : 'sync'}
          </span>
        </motion.button>
      </div>

      <p className="text-sm text-gray-400 mb-6 font-light leading-relaxed">{card.description}</p>

      <div className="flex items-center gap-6 text-xs font-medium">
        <span className="flex items-center gap-2 text-neon-green neon-text-green">
          <span className="material-symbols-outlined text-sm">dashboard</span>
          {card.assetsActive} Assets Active
        </span>
        <span className="flex items-center gap-2 text-gray-500">
          <span className="material-symbols-outlined text-sm">schedule</span>
          Last Sync: {card.lastSync}
        </span>
        {card.locked && (
          <span className="flex items-center gap-2 text-red-400/70">
            <span className="material-symbols-outlined text-sm">lock</span>
            Premium
          </span>
        )}
      </div>
    </div>

    {/* Table */}
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[10px] uppercase tracking-widest text-gray-500 bg-black/60">
            <th className="px-8 py-4 font-semibold">Symbol</th>
            <th className="px-8 py-4 font-semibold text-right">Momentum Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {card.assets.map((asset) => (
            <tr
              key={asset.ticker}
              className={`group transition-colors ${
                asset.highlight ? 'bg-neon-green/10 hover:bg-neon-green/[0.07]' : 'hover:bg-white/5'
              }`}
            >
              <td className="px-8 py-5">
                <div className="flex items-center gap-4">
                  <span
                    className={`material-symbols-outlined text-xl ${
                      asset.highlight ? 'text-neon-green neon-text-green' : 'text-gray-600'
                    }`}
                  >
                    trending_up
                  </span>
                  <div
                    className={`w-12 h-12 rounded-xl bg-black flex items-center justify-center font-mono font-bold text-sm ${
                      asset.highlight
                        ? 'border border-neon-green/30 text-neon-green shadow-[0_0_10px_rgba(14,203,129,0.1)]'
                        : 'border border-white/10 text-gray-400'
                    }`}
                  >
                    {asset.ticker}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white tracking-wide">{asset.name}</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                      {asset.tag}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-8 py-5 text-right font-mono font-bold text-neon-green text-lg neon-text-green">
                {card.locked ? '••••' : asset.score}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Card footer */}
    <div className="p-5 bg-black/60 text-center border-t border-white/5">
      <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-neon-green transition-all flex items-center justify-center gap-2 mx-auto">
        <span className="material-symbols-outlined text-sm">
          {card.locked ? 'lock_open' : 'visibility'}
        </span>
        {card.locked ? 'Unlock Strategy' : 'View Full Analysis'}
      </button>
    </div>
  </motion.div>
);

/* ── Main component ──────────────────────────────────────────────── */
interface StrategyLibraryProps {
  readonly className?: string;
}

export const StrategyLibrary: React.FC<StrategyLibraryProps> = ({ className = '' }) => {
  // Duplicate cards for seamless infinite loop
  const tickerCards = [...STRATEGY_CARDS, ...STRATEGY_CARDS];

  return (
    <section className={`relative lg:min-h-screen flex flex-col justify-center py-16 lg:py-32 px-4 sm:px-6 lg:px-12 xl:px-20 ${className}`} id="strategy-library">
      {/* ── Section header ──────────────────────────────────────── */}
      <div className="text-center mb-24">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyber-forest border border-neon-green/20 text-neon-green text-[10px] font-bold uppercase tracking-[0.2em] mb-8 strategy-badge-glow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="material-symbols-outlined text-sm">bolt</span>
          Strategy Library
        </motion.div>

        <motion.h2
          className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
        >
          Don't Start from Scratch.
          <br />
          <span className="text-neon-green hero-neon-glow">Clone the Alpha.</span>
        </motion.h2>

        <motion.p
          className="max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed font-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Access a curated library of high-performance strategies. Every algorithm is
          transparent—understand the logic, optimize parameters, and execute on live markets.
        </motion.p>
      </div>

      {/* ── Two-column layout ───────────────────────────────────── */}
      <div className="grid lg:grid-cols-12 gap-16 items-start">
        {/* LEFT: Vertical ticker */}
        <div className="lg:col-span-7">
          <div className="strategy-ticker-viewport">
            <div className="strategy-ticker-strip">
              {tickerCards.map((card, idx) => (
                <div key={`${card.id}-${idx}`} className="strategy-ticker-item">
                  <StrategyCardItem card={card} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Features + CTA */}
        <div className="lg:col-span-5 space-y-12 py-4">
          <div className="space-y-10">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="flex gap-6 group"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.5,
                  ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
                }}
              >
                <motion.div
                  className="shrink-0 w-14 h-14 rounded-2xl bg-neon-green/10 border border-neon-green/30 flex items-center justify-center text-neon-green strategy-badge-glow"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <span className="material-symbols-outlined text-2xl">{feature.icon}</span>
                </motion.div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2 tracking-tight">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400 leading-relaxed text-sm font-light">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="pt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.button
              className="strategy-cta-button w-full"
              id="strategy-browse-library"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={{
                boxShadow: [
                  '0 0 30px rgba(14, 203, 129, 0.4)',
                  '0 0 45px rgba(14, 203, 129, 0.6)',
                  '0 0 30px rgba(14, 203, 129, 0.4)',
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              Browse Entire Library
              <span className="material-symbols-outlined">chevron_right</span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Bottom divider line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-green/20 to-transparent" />
    </section>
  );
};

export default StrategyLibrary;
