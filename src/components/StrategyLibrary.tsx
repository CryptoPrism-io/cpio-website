import React from 'react';
import { motion } from 'motion/react';
import { CryptoIcon } from './CryptoIcon';

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
      { ticker: 'DOGE', name: 'DOGECOIN', tag: 'Meme Leader', score: '87.15', highlight: false },
      { ticker: 'APE', name: 'APECOIN', tag: 'NFT Alpha', score: '76.90', highlight: false },
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
      { ticker: 'UNI', name: 'UNISWAP', tag: 'DEX Leader', score: '88.40', highlight: false },
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

/* ── Flatten all strategy assets into ticker rows ────────────────── */
const ALL_STRATEGY_ROWS = STRATEGY_CARDS.flatMap((card) =>
  card.assets.map((asset) => ({ ...asset, strategy: card.title, badge: card.badge, badgeColor: card.badgeColor, locked: card.locked, lastSync: card.lastSync }))
);

/* ── Main component ──────────────────────────────────────────────── */
interface StrategyLibraryProps {
  readonly className?: string;
}

export const StrategyLibrary: React.FC<StrategyLibraryProps> = ({ className = '' }) => {
  const tickerRows = [...ALL_STRATEGY_ROWS, ...ALL_STRATEGY_ROWS];

  return (
    <section className={`relative lg:h-[100dvh] flex flex-col justify-center py-10 lg:py-8 px-4 sm:px-6 lg:px-0 ${className}`} id="strategy-library">
      {/* ── Section header ──────────────────────────────────────── */}
      <div className="text-center mb-10 md:mb-8">
        <motion.h2
          className="text-2xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4 md:mb-8 text-white"
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
          className="max-w-2xl mx-auto text-gray-400 hidden md:block text-lg leading-relaxed font-light"
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 w-full items-stretch">
        {/* LEFT: Strategy table panel */}
        <motion.div
          className="lg:col-span-8 watchlist-glass-panel watchlist-inner-glow rounded-xl overflow-hidden flex flex-col"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Toolbar */}
          <div className="flex items-center justify-between p-3 md:p-4 border-b border-neon-green/10">
            <div className="flex items-center gap-3">
              <span className="text-gray-200 font-medium text-sm flex items-center gap-2">
                Strategy Library
                <span className="material-symbols-outlined text-base opacity-50">expand_more</span>
              </span>
              <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-neon-green/10 border border-neon-green/20 text-[10px] text-neon-green font-mono uppercase">
                <span className="material-symbols-outlined text-[12px]">bolt</span>
                {STRATEGY_CARDS.length} strategies
              </div>
            </div>
            <div className="flex items-center gap-2">
              {['refresh', 'view_list', 'dashboard', 'more_vert'].map((icon) => (
                <motion.button
                  key={icon}
                  className={`p-1.5 rounded transition-colors ${
                    icon === 'view_list' ? 'bg-neon-green/10 text-neon-green' : 'hover:bg-white/5 text-gray-400'
                  }`}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <span className="material-symbols-outlined text-sm">{icon}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Column headers */}
          <div className="strategy-table-header text-[10px] uppercase tracking-wider text-gray-500 font-mono border-b border-white/5 min-w-[740px]">
            <span className="px-6 py-3 font-medium">Symbol</span>
            <span className="px-6 py-3 font-medium">Strategy</span>
            <span className="px-6 py-3 font-medium">Type</span>
            <span className="px-6 py-3 font-medium text-left">Score <span className="text-[8px]">↑↓</span></span>
            <span className="px-6 py-3 font-medium text-left">Sync</span>
          </div>

          {/* Scrolling rows */}
          <div className="strategy-ticker-viewport overflow-x-auto">
            <div className="strategy-ticker-strip min-w-[740px]">
              {tickerRows.map((row, idx) => (
                <div
                  key={`${row.ticker}-${row.strategy}-${idx}`}
                  className={`strategy-ticker-item strategy-table-row text-sm font-mono group transition-colors border-b border-white/5 ${
                    row.highlight ? 'bg-neon-green/5 hover:bg-neon-green/10' : 'hover:bg-neon-green/5'
                  } ${row.locked ? 'opacity-60' : ''}`}
                >
                  <div className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <CryptoIcon symbol={row.ticker} name={row.name} size={24} />
                      <div>
                        <span className="font-bold tracking-tight text-white">{row.name}</span>
                        <div className="text-[9px] text-gray-500 uppercase tracking-wider">{row.tag}</div>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-3">
                    <span className="text-xs text-gray-300 font-medium">{row.strategy}</span>
                  </div>
                  <div className="px-6 py-3">
                    <span className={`px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider ${BADGE_STYLES[row.badgeColor]}`}>
                      {row.badge}
                    </span>
                  </div>
                  <div className="px-6 py-3 text-left font-bold text-neon-green text-xs neon-text-green">
                    {row.locked ? (
                      <span className="flex items-center gap-1 text-gray-500">
                        <span className="material-symbols-outlined text-xs">lock</span>
                        ••••
                      </span>
                    ) : row.score}
                  </div>
                  <div className="px-6 py-3 text-left text-[10px] text-gray-500">{row.lastSync}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Features */}
        <div className="hidden lg:flex lg:col-span-4 flex-col justify-between space-y-6 lg:pl-4">
          <div className="space-y-4 md:space-y-5">
            {FEATURES.map((feature, i) => (
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
                <div className="shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-xl bg-neon-green/10 border border-neon-green/30 flex items-center justify-center text-neon-green">
                  <span className="material-symbols-outlined text-lg md:text-xl">{feature.icon}</span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm md:text-base font-bold text-white">{feature.title}</h4>
                  <p className="text-gray-400 text-xs leading-snug">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA card */}
          <motion.div
            className="p-3 md:p-4 rounded-xl bg-neon-green/5 border border-neon-green/30 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5, type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="relative z-10">
              <p className="text-white text-sm font-bold mb-2">Build Your Own Strategy</p>
              <motion.button
                className="sentiment-premium-button w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                APPLY FOR EARLY ACCESS
              </motion.button>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <span className="material-symbols-outlined text-6xl text-neon-green">science</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom divider line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-green/20 to-transparent" />
    </section>
  );
};

export default StrategyLibrary;
