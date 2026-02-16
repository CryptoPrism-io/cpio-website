import React from 'react';
import { motion } from 'motion/react';

/* ── Watchlist token data ────────────────────────────────────────── */
type LedColor = 'green' | 'orange' | 'red';

interface WatchlistToken {
  readonly symbol: string;
  readonly pair: string;
  readonly initial: string;
  readonly initialColor: string;
  readonly initialBg: string;
  readonly featuredIn: string;
  readonly price: string;
  readonly qvmg: readonly LedColor[];
  readonly change1d: string;
  readonly change1dPositive: boolean;
  readonly sparklinePath: string;
  readonly returnsSinceAdded: string;
  readonly returnsPositive: boolean;
  readonly addedDate: string;
  readonly volume: string;
}

const WATCHLIST_TOKENS: readonly WatchlistToken[] = [
  {
    symbol: 'BTC',
    pair: 'BTCUSDT',
    initial: 'B',
    initialColor: 'text-orange-500',
    initialBg: 'bg-orange-500/10 border-orange-500/30',
    featuredIn: '5 screens',
    price: '$64,281.00',
    qvmg: ['green', 'orange', 'red', 'green'],
    change1d: '+2.45%',
    change1dPositive: true,
    sparklinePath: 'M0,15 Q25,18 50,10 T100,2',
    returnsSinceAdded: '-1.20%',
    returnsPositive: false,
    addedDate: "12 Feb '24",
    volume: '45.2B',
  },
  {
    symbol: 'ETH',
    pair: 'ETHUSDT',
    initial: 'E',
    initialColor: 'text-blue-400',
    initialBg: 'bg-blue-500/10 border-blue-500/30',
    featuredIn: '3 screens',
    price: '$3,452.12',
    qvmg: ['orange', 'green', 'green', 'red'],
    change1d: '-0.82%',
    change1dPositive: false,
    sparklinePath: 'M0,5 Q25,2 50,12 T100,18',
    returnsSinceAdded: '+14.6%',
    returnsPositive: true,
    addedDate: "08 Feb '24",
    volume: '18.7B',
  },
  {
    symbol: 'SOL',
    pair: 'SOLUSDT',
    initial: 'S',
    initialColor: 'text-purple-400',
    initialBg: 'bg-purple-500/10 border-purple-500/30',
    featuredIn: '8 screens',
    price: '$142.65',
    qvmg: ['green', 'green', 'green', 'green'],
    change1d: '+6.12%',
    change1dPositive: true,
    sparklinePath: 'M0,18 Q30,15 60,5 T100,2',
    returnsSinceAdded: '+32.1%',
    returnsPositive: true,
    addedDate: "15 Jan '24",
    volume: '8.2B',
  },
  {
    symbol: 'PEPE',
    pair: 'PEPEUSDT',
    initial: 'P',
    initialColor: 'text-green-500',
    initialBg: 'bg-green-500/10 border-green-500/30',
    featuredIn: '2 screens',
    price: '$0.00000842',
    qvmg: ['red', 'red', 'orange', 'red'],
    change1d: '-12.4%',
    change1dPositive: false,
    sparklinePath: 'M0,2 Q20,5 50,15 T100,18',
    returnsSinceAdded: '-5.2%',
    returnsPositive: false,
    addedDate: "22 Feb '24",
    volume: '1.4B',
  },
] as const;

/* ── Feature cards data ──────────────────────────────────────────── */
const WATCHLIST_FEATURES = [
  {
    icon: 'filter_alt',
    title: 'Auto-Filtering',
    description:
      'Write your rules. Crypto Prism automatically populates the list with qualifiers and kicks out underperformers.',
  },
  {
    icon: 'track_changes',
    title: 'The "Featured In" Signal',
    description:
      'Instantly see if a token appears in multiple stock screens (e.g., "Featured in 5 screens"), validating your conviction.',
  },
  {
    icon: 'grid_view',
    title: 'Smart Tables',
    description:
      'Customise and track all relevant metrics (eg. Quality score, PE ratio) for your stock list at one place.',
  },
] as const;

const LED_COLORS: Record<LedColor, string> = {
  green: 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
};

const EXCHANGES = ['COINBASE', 'BINANCE', 'KRAKEN', 'OKX'] as const;

/* ── Component ───────────────────────────────────────────────────── */
interface DynamicWatchlistProps {
  readonly className?: string;
}

export const DynamicWatchlist: React.FC<DynamicWatchlistProps> = ({ className = '' }) => {
  return (
    <section
      className={`relative lg:min-h-screen py-16 lg:py-32 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-20 ${className}`}
      id="dynamic-watchlist"
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="text-center mb-16 max-w-4xl">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-cyber-forest border border-neon-green/20 text-neon-green text-xs font-mono tracking-widest uppercase"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="material-symbols-outlined text-sm">auto_awesome</span>
          Playground
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
        >
          Static Watchlists{' '}
          <span className="text-gray-400">are Dead.</span>
          <br />
          <span className="text-neon-green hero-neon-glow">Go Dynamic.</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Dynamic Watchlists auto-add or drop coins based on your criteria—updating in real-time.
        </motion.p>
      </div>

      {/* ── Main grid ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-stretch">
        {/* LEFT: Data table */}
        <motion.div
          className="lg:col-span-8 watchlist-glass-panel watchlist-inner-glow rounded-xl overflow-hidden flex flex-col"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Toolbar */}
          <div className="flex items-center justify-between p-4 border-b border-neon-green/10">
            <div className="flex items-center gap-3">
              <span className="text-gray-200 font-medium text-sm flex items-center gap-2">
                Bollinger Upper Band Breakout
                <span className="material-symbols-outlined text-base opacity-50">
                  expand_more
                </span>
              </span>
              <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-neon-green/10 border border-neon-green/20 text-[10px] text-neon-green font-mono uppercase">
                <span className="material-symbols-outlined text-[12px]">grid_view</span>
                20 tokens
              </div>
            </div>
            <div className="flex items-center gap-2">
              {['refresh', 'view_list', 'dashboard', 'more_vert'].map((icon, i) => (
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
                  {i === 0 && <span className="sr-only">Divider</span>}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto flex-1">
            <table className="w-full min-w-[800px] text-left border-collapse">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-gray-500 font-mono border-b border-white/5">
                  <th className="px-6 py-3 font-medium">
                    Symbol <span className="text-[8px]">↑↓</span>
                  </th>
                  <th className="px-6 py-3 font-medium">
                    Featured In <span className="text-[8px]">↑↓</span>
                  </th>
                  <th className="px-6 py-3 font-medium">
                    Price <span className="text-[8px]">↑↓</span>
                  </th>
                  <th className="px-6 py-3 font-medium">Q/V/M/G</th>
                  <th className="px-6 py-3 font-medium">
                    1D <span className="text-[8px]">↑↓</span>
                  </th>
                  <th className="px-6 py-3 font-medium">
                    % Returns Since Added <span className="text-[8px]">↑↓</span>
                  </th>
                  <th className="px-6 py-3 font-medium">
                    Volume <span className="text-[8px]">↑↓</span>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-mono">
                {WATCHLIST_TOKENS.map((token, idx) => (
                  <motion.tr
                    key={token.symbol}
                    className={`group hover:bg-neon-green/5 transition-colors ${
                      idx < WATCHLIST_TOKENS.length - 1 ? 'border-b border-white/5' : ''
                    }`}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + idx * 0.1, duration: 0.4 }}
                  >
                    {/* Symbol */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded flex items-center justify-center border ${token.initialBg}`}
                        >
                          <span className={`text-[10px] font-bold ${token.initialColor}`}>
                            {token.initial}
                          </span>
                        </div>
                        <span className="font-bold tracking-tight">{token.pair}</span>
                      </div>
                    </td>

                    {/* Featured In */}
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-sm bg-neon-green/10 border border-neon-green/20 text-neon-green text-[10px]">
                        {token.featuredIn}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 text-gray-300">{token.price}</td>

                    {/* Q/V/M/G LED dots */}
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5">
                        {token.qvmg.map((color, i) => (
                          <motion.div
                            key={`${token.symbol}-led-${i}`}
                            className={`watchlist-led-dot ${LED_COLORS[color]}`}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              delay: 0.4 + idx * 0.1 + i * 0.06,
                              type: 'spring',
                              stiffness: 500,
                              damping: 12,
                            }}
                          />
                        ))}
                      </div>
                    </td>

                    {/* 1D change + sparkline */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span
                          className={`text-[11px] ${
                            token.change1dPositive ? 'text-neon-green' : 'text-red-500'
                          }`}
                        >
                          {token.change1d}
                        </span>
                        <svg
                          className={`sparkline-draw w-12 h-4 ${
                            token.change1dPositive
                              ? 'text-neon-green watchlist-sparkline-up'
                              : 'text-red-500 watchlist-sparkline-down'
                          }`}
                          viewBox="0 0 100 20"
                          style={{ '--sparkline-delay': `${0.5 + idx * 0.15}s` } as React.CSSProperties}
                        >
                          <path
                            d={token.sparklinePath}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </td>

                    {/* Returns since added */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span
                          className={`text-[11px] ${
                            token.returnsPositive ? 'text-neon-green' : 'text-red-500'
                          }`}
                        >
                          {token.returnsSinceAdded}
                        </span>
                        <span className="text-[9px] text-gray-500">{token.addedDate}</span>
                      </div>
                    </td>

                    {/* Volume */}
                    <td className="px-6 py-4 text-gray-400">{token.volume}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* RIGHT: Feature cards */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {WATCHLIST_FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="group watchlist-glass-panel watchlist-inner-glow p-6 rounded-xl hover:bg-neon-green/10 transition-all duration-300 flex-1 flex flex-col justify-center"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                delay: i * 0.12,
                duration: 0.5,
                ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
              }}
            >
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-neon-green/10 border border-neon-green/30 flex items-center justify-center text-neon-green group-hover:shadow-[0_0_15px_rgba(14,203,129,0.3)] transition-all">
                  <span className="material-symbols-outlined">{feature.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-gray-200">{feature.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Bottom CTA ─────────────────────────────────────────── */}
      <div className="mt-20 flex flex-col items-center gap-4">
        <motion.div
          className="w-px bg-gradient-to-b from-neon-green/50 to-transparent"
          initial={{ height: 0 }}
          whileInView={{ height: 64 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        <motion.button
          className="watchlist-cta-button"
          id="watchlist-cta-monitor"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="material-symbols-outlined text-sm">auto_graph</span>
          Start Monitoring Now
        </motion.button>

        {/* Exchange labels */}
        <div className="flex items-center gap-6 mt-6 opacity-30">
          {EXCHANGES.map((exchange, i) => (
            <motion.span
              key={exchange}
              className="text-xs font-mono tracking-widest text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
            >
              {exchange}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicWatchlist;
