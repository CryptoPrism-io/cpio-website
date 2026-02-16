/**
 * MobileHome — compact mobile-only layout inspired by Stitch screens.
 * Screen 1: search bar + 2×2 feature grid
 * Screen 2: 2×2 quant terminal grid with live asset data
 * Visible only below md breakpoint.
 */

interface FeatureCard {
  icon: string;
  label: string;
  badge: string;
  badgeColor: string;
  visual: 'sparkline' | 'bars' | 'dots' | 'progress';
}

const FEATURES: FeatureCard[] = [
  { icon: 'trending_up', label: 'Crypto Tickers', badge: '+2.4%', badgeColor: 'text-neon-green bg-neon-green/10', visual: 'sparkline' },
  { icon: 'bar_chart_4_bars', label: 'Live Analytics', badge: 'LIVE', badgeColor: 'text-blue-400 bg-blue-400/10', visual: 'bars' },
  { icon: 'precision_manufacturing', label: 'Quant Models', badge: '', badgeColor: '', visual: 'dots' },
  { icon: 'bolt', label: 'Real-time Compute', badge: '0.4ms', badgeColor: 'text-neon-green bg-neon-green/10', visual: 'progress' },
];

interface AssetWidget {
  symbol: string;
  price: string;
  prox: number;
  rsi: number;
  rsiFlag: string;
  volatility: string;
  liquidity: number; // out of 5
  icon: string;
}

interface AssetNode {
  name: string;
  symbol: string;
  price: string;
  whaleDelta: string;
  whaleDeltaUp: boolean;
  exchRsv: string;
  volatilityLabel: string;
  coreScore: number; // out of 3
  coreValue: string;
  color: string; // tailwind color for avatar
  sparkPath: string;
}

const ASSETS: AssetWidget[] = [
  { symbol: 'BTC/USD', price: '$64,925', prox: 94, rsi: 42, rsiFlag: 'DIV', volatility: '1.4%', liquidity: 3, icon: 'monitoring' },
  { symbol: 'SOL/USD', price: '$177.45', prox: 88, rsi: 38, rsiFlag: 'DIV', volatility: '4.2%', liquidity: 2, icon: 'bolt' },
  { symbol: 'AVAX/USD', price: '$41.28', prox: 91, rsi: 35, rsiFlag: 'DIV', volatility: '2.8%', liquidity: 4, icon: 'layers' },
  { symbol: 'INJ/USD', price: '$38.68', prox: 96, rsi: 48, rsiFlag: 'DIV', volatility: '3.1%', liquidity: 2, icon: 'hub' },
];

const ASSET_NODES: AssetNode[] = [
  { name: 'Bitcoin', symbol: 'B', price: '$64,925', whaleDelta: '+2.4%', whaleDeltaUp: true, exchRsv: '-1.8%', volatilityLabel: 'Low', coreScore: 3, coreValue: '0.98', color: 'orange', sparkPath: 'M0,25 Q10,5 20,20 T40,15 T60,10 T80,22 T100,5' },
  { name: 'Ethereum', symbol: 'E', price: '$3,702', whaleDelta: '+3.1%', whaleDeltaUp: true, exchRsv: '-2.5%', volatilityLabel: 'Med', coreScore: 2, coreValue: '0.72', color: 'indigo', sparkPath: 'M0,20 Q15,25 30,10 T60,15 T90,5 L100,12' },
  { name: 'Solana', symbol: 'S', price: '$145.20', whaleDelta: '-0.8%', whaleDeltaUp: false, exchRsv: '-4.2%', volatilityLabel: 'High', coreScore: 1, coreValue: '0.45', color: 'teal', sparkPath: 'M0,5 L20,15 L40,10 L60,25 L80,15 L100,28' },
  { name: 'Pepe', symbol: 'P', price: '$0.00001', whaleDelta: '+12.5%', whaleDeltaUp: true, exchRsv: '-0.5%', volatilityLabel: 'Extreme', coreScore: 2, coreValue: '0.61', color: 'green', sparkPath: 'M0,28 L20,25 L40,5 L60,8 L80,2 L100,5' },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  orange: { bg: 'bg-orange-500/20', text: 'text-orange-500', border: 'border-orange-500/30' },
  indigo: { bg: 'bg-indigo-500/20', text: 'text-indigo-500', border: 'border-indigo-500/30' },
  teal: { bg: 'bg-teal-500/20', text: 'text-teal-500', border: 'border-teal-500/30' },
  green: { bg: 'bg-green-500/20', text: 'text-green-500', border: 'border-green-500/30' },
};

/* ── Tiny sub-components ────────────────────────────────────────── */

const Sparkline = () => (
  <svg className="w-full h-[20px]" viewBox="0 0 100 20" fill="none">
    <path
      d="M0,15 L10,12 L20,16 L30,10 L40,14 L50,8 L60,11 L70,5 L80,9 L90,4 L100,7"
      stroke="rgba(14,203,129,0.5)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const BarChart = () => (
  <div className="w-full flex items-end gap-[2px] h-[20px]">
    {[40, 70, 50, 90, 60, 30].map((h, i) => (
      <div
        key={i}
        className={`flex-1 rounded-t-sm ${i === 2 || i === 4 ? 'bg-neon-green' : 'bg-white/15'}`}
        style={{ height: `${h}%` }}
      />
    ))}
  </div>
);

const DotsViz = () => (
  <div className="w-full h-[20px] flex items-center">
    <div className="w-full h-[1px] bg-white/10 relative">
      <div className="absolute top-[-4px] left-[30%] w-2 h-2 rounded-full border border-neon-green bg-[#050505]" />
      <div className="absolute top-[-4px] left-[60%] w-2 h-2 rounded-full border border-gray-500 bg-[#050505]" />
    </div>
  </div>
);

const ProgressViz = () => (
  <div className="w-full space-y-1">
    <div className="flex justify-between text-[8px] font-mono text-gray-500">
      <span>LATENCY</span>
      <span className="text-neon-green">0.4ms</span>
    </div>
    <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
      <div className="bg-neon-green/40 h-full w-[85%]" />
    </div>
  </div>
);

const vizMap = { sparkline: Sparkline, bars: BarChart, dots: DotsViz, progress: ProgressViz };

const CoreDots = ({ filled }: { filled: number }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className={`w-2 h-2 rounded-full ${i <= filled ? 'bg-neon-green' : 'border border-neon-green/50'
          }`}
      />
    ))}
  </div>
);

const LiquidityBar = ({ score }: { score: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className={`h-1 flex-1 ${i <= score ? 'bg-neon-green' : 'bg-neon-green/20'}`} />
    ))}
  </div>
);

/* ── Main component ─────────────────────────────────────────────── */

export const MobileHome: React.FC = () => {
  return (
    <div className="md:hidden">
      {/* ── Search bar — mt-16 from hero like Stitch ─────────── */}
      <section className="px-6 mt-16">
        <div className="flex items-center bg-[rgba(20,20,20,0.7)] border border-white/10 rounded-xl overflow-hidden">
          <div className="pl-4 text-neon-green">
            <span className="material-symbols-outlined text-2xl">search</span>
          </div>
          <input
            className="w-full bg-transparent border-none text-base text-white focus:ring-0 focus:outline-none py-5 px-4 placeholder:text-gray-600"
            placeholder="Search tokens or ask a question..."
            type="text"
            readOnly
          />
        </div>
      </section>

      {/* ── 2×2 Feature grid — mt-12 from search like Stitch ──── */}
      <section className="px-6 mt-12">
        <div className="grid grid-cols-2 gap-3">
          {FEATURES.map((f) => {
            const Viz = vizMap[f.visual];
            const isHighlight = f.visual === 'dots';
            return (
              <div
                key={f.label}
                className={`p-4 rounded-xl flex flex-col items-center gap-2 ${isHighlight
                    ? 'bg-neon-green/10 border border-neon-green/50 ring-1 ring-neon-green/20 relative overflow-hidden'
                    : 'bg-[rgba(20,20,20,0.7)] border border-white/5'
                  }`}
              >
                {isHighlight && (
                  <div className="absolute top-2 right-2">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-neon-green" />
                    </span>
                  </div>
                )}
                <span className={`material-symbols-outlined text-xl ${isHighlight ? 'text-neon-green' : 'text-gray-500'}`}>
                  {f.icon}
                </span>
                <Viz />
                <span className={`text-xs font-medium ${isHighlight ? 'text-white font-bold' : 'text-gray-300'}`}>
                  {f.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Quant Terminal Grid (Screen 2) ────────────────────── */}
      <section className="px-6 mt-16">
        {/* Terminal header bar */}
        <div className="flex justify-between items-center mb-2 px-1">
          <div className="flex gap-4">
            <div className="flex flex-col">
              <span className="text-[7px] text-white/40 uppercase font-mono">Assets</span>
              <span className="text-[10px] font-bold font-mono">04 ACTIVE</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[7px] text-white/40 uppercase font-mono">Volatility</span>
              <span className="text-[10px] font-bold text-neon-green font-mono">LOW</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[13px] text-neon-green">query_stats</span>
            <span className="text-[8px] font-bold text-white/60 font-mono uppercase">Scan: Real-Time</span>
          </div>
        </div>

        {/* 2×2 asset widgets */}
        <div className="grid grid-cols-2 gap-[1px] bg-white/[0.06] border border-white/[0.06] rounded-lg overflow-hidden">
          {ASSETS.map((a) => (
            <div key={a.symbol} className="bg-[#050505] p-3 flex flex-col justify-between relative overflow-hidden">
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-neon-green" />

              {/* Symbol + price */}
              <div className="flex justify-between items-start mb-2.5">
                <div>
                  <h3 className="text-[11px] font-black text-white leading-none">{a.symbol}</h3>
                  <p className="text-[9px] font-mono text-neon-green mt-0.5">{a.price}</p>
                </div>
                <span className="material-symbols-outlined text-[11px] text-white/20">{a.icon}</span>
              </div>

              {/* 52W proximity */}
              <div className="mb-2">
                <div className="flex justify-between items-center">
                  <span className="text-[7px] font-bold text-white/40 uppercase tracking-tight">52W Prox</span>
                  <span className="text-[8px] font-bold">{a.prox}%</span>
                </div>
                <div className="h-[2px] w-full bg-white/10 rounded-full mt-0.5 overflow-hidden">
                  <div className="h-full bg-neon-green" style={{ width: `${a.prox}%` }} />
                </div>
              </div>

              {/* RSI + Volatility */}
              <div className="grid grid-cols-2 gap-1.5 mb-2">
                <div>
                  <span className="text-[7px] font-bold text-white/40 uppercase tracking-tight">RSI (14)</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold text-white">{a.rsi}</span>
                    <span className="text-[6px] text-red-500 font-bold">{a.rsiFlag}</span>
                  </div>
                </div>
                <div>
                  <span className="text-[7px] font-bold text-white/40 uppercase tracking-tight">Volatility</span>
                  <span className="text-[10px] font-bold text-white block">{a.volatility}</span>
                </div>
              </div>

              {/* Liquidity */}
              <div className="pt-1 border-t border-white/5">
                <span className="text-[7px] font-bold text-white/40 uppercase tracking-tight block mb-0.5">Liquidity Score</span>
                <LiquidityBar score={a.liquidity} />
              </div>
            </div>
          ))}
        </div>

        {/* Command input */}
        <div className="mt-3 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-neon-green text-sm">terminal</span>
          </div>
          <input
            className="w-full bg-[rgba(13,13,13,0.8)] border border-white/[0.06] rounded text-[10px] py-2.5 pl-8 pr-10 text-white placeholder-white/20 font-mono focus:ring-1 focus:ring-neon-green/50 focus:border-neon-green/40 focus:outline-none"
            placeholder="EXECUTE COMMAND OR QUERY..."
            type="text"
            readOnly
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <span className="w-1 h-3 bg-neon-green animate-pulse" />
          </div>
        </div>
      </section>

      {/* ── Full Spectrum Intelligence (Screen 3) ─────────────── */}
      <section className="px-6 mt-16">
        {/* Section header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-neon-green text-base">terminal</span>
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/70">Intelligence Mode</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            <span className="text-[10px] font-bold text-neon-green uppercase tracking-tight">Full Spectrum</span>
          </div>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-neon-green/5 border border-white/[0.08] rounded-xl p-4">
            <p className="text-[8px] font-bold text-neon-green/60 uppercase tracking-widest mb-1">Global Whale Delta</p>
            <div className="flex items-end gap-1.5">
              <span className="text-xl font-bold text-white">+4.2%</span>
              <span className="material-symbols-outlined text-emerald-500 text-sm mb-0.5">trending_up</span>
            </div>
          </div>
          <div className="bg-neon-green/5 border border-white/[0.08] rounded-xl p-4">
            <p className="text-[8px] font-bold text-neon-green/60 uppercase tracking-widest mb-1">Avg Exch RSV</p>
            <div className="flex items-end gap-1.5">
              <span className="text-xl font-bold text-white">-2.8%</span>
              <span className="material-symbols-outlined text-red-500 text-sm mb-0.5">trending_down</span>
            </div>
          </div>
        </div>

        {/* Asset Nodes header */}
        <div className="flex items-center justify-between py-3">
          <span className="text-[11px] font-bold uppercase text-white/50 tracking-tight">Asset Nodes</span>
          <span className="text-[9px] font-mono text-white/30">REAL-TIME FEED: ACTIVE</span>
        </div>

        {/* Asset node cards */}
        <div className="space-y-3">
          {ASSET_NODES.map((node) => {
            const c = colorMap[node.color];
            return (
              <div key={node.name} className="border border-white/[0.08] rounded-xl p-4 bg-[rgba(15,15,15,0.4)]">
                {/* Top row: avatar + name + price */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center ${c.text} font-bold text-sm border ${c.border}`}>
                      {node.symbol}
                    </div>
                    <div>
                      <h3 className="font-bold text-[14px] text-white leading-none">{node.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <CoreDots filled={node.coreScore} />
                        <span className="text-[9px] font-mono text-white/40 ml-0.5">CORE: {node.coreValue}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[16px] font-bold text-white tabular-nums">{node.price}</p>
                    <p className={`text-[9px] font-mono font-bold uppercase ${node.whaleDeltaUp ? 'text-emerald-500' : 'text-red-400'}`}>
                      Whale Delta: {node.whaleDelta}
                    </p>
                  </div>
                </div>
                {/* Bottom row: sparkline + exchange reserve */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 h-7">
                    <svg className="w-full h-full" viewBox="0 0 100 30" fill="none">
                      <path d={node.sparkPath} stroke="#0ecb81" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[9px] font-mono text-red-500 font-bold uppercase">EXCH RSV: {node.exchRsv}</p>
                    <p className="text-[8px] text-white/30 uppercase tracking-tight">Volatility: {node.volatilityLabel}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep dive search */}
        <div className="mt-3 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-neon-green text-base">keyboard_command_key</span>
          </div>
          <input
            className="w-full bg-[rgba(13,13,13,0.8)] border border-white/[0.06] rounded-lg text-[11px] py-3 pl-9 pr-10 text-white placeholder-white/30 font-medium focus:ring-1 focus:ring-neon-green/50 focus:border-neon-green/40 focus:outline-none"
            placeholder="Deep dive into any node or metric..."
            type="text"
            readOnly
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <span className="text-[9px] font-bold bg-white/10 px-1.5 py-0.5 rounded text-white/40">⌘K</span>
          </div>
        </div>
      </section>

      {/* ── Strategy Library (Screen 5) ─────────────────────── */}
      <section className="px-6 pt-12 pb-10">
        <div className="inline-flex items-center gap-2 bg-neon-green/10 border border-neon-green/20 px-3 py-1 rounded-full mb-6">
          <span className="material-symbols-outlined text-neon-green text-sm">bolt</span>
          <span className="text-[10px] font-extrabold text-neon-green uppercase tracking-[0.2em]">Strategy Library</span>
        </div>
        <h2 className="text-3xl font-black leading-[1.1] tracking-tight mb-4 text-white">
          Don't Start from Scratch.{' '}
          <span className="text-neon-green hero-neon-glow">Clone the Alpha.</span>
        </h2>
        <p className="text-gray-400 text-base leading-relaxed max-w-xs">
          Access a curated library of high-performance strategies built by institutional quants and veteran degens.
        </p>
      </section>

      {/* Strategy filter pills */}
      <div className="px-6 mb-8 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <button className="shrink-0 bg-neon-green text-black px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider">All</button>
        <button className="shrink-0 bg-white/[0.06] border border-white/10 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-gray-400">Momentum</button>
        <button className="shrink-0 bg-white/[0.06] border border-white/10 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-gray-400">Mean Reversion</button>
        <button className="shrink-0 bg-white/[0.06] border border-white/10 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-gray-400">Arbitrage</button>
      </div>

      {/* Strategy cards */}
      <section className="px-6 space-y-4 mb-12">
        {/* Premium strategy card */}
        <div className="relative bg-[rgba(20,20,20,0.7)] border border-white/[0.08] rounded-xl p-5 overflow-hidden">
          <div className="absolute top-0 right-0 p-3">
            <span className="material-symbols-outlined text-neon-green text-xl">lock</span>
          </div>
          <div className="flex gap-2 mb-3">
            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">Momentum</span>
            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">Technical</span>
          </div>
          <h3 className="text-lg font-bold leading-tight mb-4 text-white pr-8">Support Bounce with Volume Confirmation</h3>
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.06]">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-orange-500 border-2 border-[#050505] flex items-center justify-center text-[10px] font-bold">&#8383;</div>
              <div className="w-6 h-6 rounded-full bg-indigo-500 border-2 border-[#050505] flex items-center justify-center text-[10px] font-bold">&Xi;</div>
              <div className="w-6 h-6 rounded-full bg-white/10 border-2 border-[#050505] flex items-center justify-center text-[10px] font-bold text-gray-400">+40</div>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <span className="material-symbols-outlined text-sm">sync</span>
              <span className="text-[10px] font-medium uppercase tracking-tighter">Synced 2m ago</span>
            </div>
          </div>
          <div className="mt-4 bg-neon-green/5 rounded-lg p-3 border border-neon-green/10 flex items-center justify-center">
            <span className="text-[10px] font-black text-neon-green uppercase tracking-[0.1em]">Unlock Full Metrics</span>
          </div>
        </div>

        {/* Live strategy card */}
        <div className="bg-[rgba(20,20,20,0.7)] border border-white/[0.08] rounded-xl p-5">
          <div className="flex gap-2 mb-3">
            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neon-green/10 text-neon-green border border-neon-green/20">Live</span>
          </div>
          <h3 className="text-lg font-bold leading-tight mb-4 text-white">RSI Oversold Scalper V3</h3>
          <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
            <span className="text-xs font-bold text-gray-500 uppercase">12 Assets</span>
            <div className="flex items-center gap-1.5 text-gray-400">
              <span className="material-symbols-outlined text-sm text-neon-green">check_circle</span>
              <span className="text-[10px] font-medium uppercase tracking-tighter">Active Now</span>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy features */}
      <section className="bg-white/[0.02] py-12 px-6 border-y border-white/[0.06]">
        <h4 className="text-xs font-black text-neon-green uppercase tracking-[0.2em] mb-8 text-center">Built for Dominance</h4>
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 shrink-0 bg-neon-green/20 rounded-lg flex items-center justify-center border border-neon-green/30">
              <span className="material-symbols-outlined text-neon-green">verified</span>
            </div>
            <div>
              <h5 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Proven Strategies</h5>
              <p className="text-xs text-gray-500 leading-normal">Backtested and battle-hardened across multiple market cycles.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 shrink-0 bg-neon-green/20 rounded-lg flex items-center justify-center border border-neon-green/30">
              <span className="material-symbols-outlined text-neon-green">query_stats</span>
            </div>
            <div>
              <h5 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Live Data Engine</h5>
              <p className="text-xs text-gray-500 leading-normal">Real-time execution feeds directly from global liquidity pools.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 shrink-0 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
              <span className="material-symbols-outlined text-blue-500">settings_input_component</span>
            </div>
            <div>
              <h5 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Customize or Use As-Is</h5>
              <p className="text-xs text-gray-500 leading-normal">Tweak parameters in our visual editor or run the defaults.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 shrink-0 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
              <span className="material-symbols-outlined text-purple-500">monitoring</span>
            </div>
            <div>
              <h5 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Track in Real-Time</h5>
              <p className="text-xs text-gray-500 leading-normal">Integrated dashboard for monitoring PnL, slippage, and fees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore all CTA */}
      <section className="px-6 py-16 text-center">
        <button className="w-full bg-neon-green text-black font-black py-4 rounded-xl shadow-lg shadow-green-900/20 uppercase tracking-widest text-sm mb-4">
          Explore All Strategies
        </button>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest">Limited access for free accounts</p>
      </section>

      {/* ── Minimal CTA ──────────────────────────────────────── */}
      <section className="px-6 pt-16 pb-8 text-center">
        <button
          className="w-full bg-neon-green text-black text-[14px] font-bold py-4 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-green-900/20"
          id="mobile-cta-apply"
        >
          Apply for early access
          <span className="material-symbols-outlined text-lg">arrow_right_alt</span>
        </button>
      </section>

      {/* ── Minimal footer ───────────────────────────────────── */}
      <footer className="px-6 py-8 text-center border-t border-white/[0.05]">
        <div className="flex justify-center gap-6 mb-3">
          <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">API</span>
          <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">Status</span>
          <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">Docs</span>
        </div>
        <p className="text-gray-600 text-[9px] uppercase tracking-[0.2em] font-medium">
          &copy; 2026 CryptoPrism Labs
        </p>
      </footer>
    </div>
  );
};

export default MobileHome;
