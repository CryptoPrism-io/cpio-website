import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { CryptoIcon } from './CryptoIcon';

/* ── Constants ──────────────────────────────────────────────────── */
const HERO_TAGLINES = [
  'Trade Like a Quant.',
  'Trade Like a Machine.',
  'Execute Like a Pro.',
  'Analyze Like an Institution.',
];

const PRODUCT_SCREENS = [
  { id: 'live',      label: 'Live Data',  icon: 'monitor_heart' },
  { id: 'analytics', label: 'Analytics',  icon: 'query_stats' },
  { id: 'ai',        label: 'AI Ask',     icon: 'auto_awesome' },
  { id: 'viz',       label: 'Visualize',  icon: 'bar_chart_4_bars' },
] as const;

type ScreenId = typeof PRODUCT_SCREENS[number]['id'];

/* ── Sparkline SVG ──────────────────────────────────────────────── */
const Sparkline: React.FC<{ data: number[]; color: string; w?: number; h?: number }> = ({
  data, color, w = 72, h = 22,
}) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 3) - 1;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  const last = pts.split(' ').at(-1)!.split(',').map(Number);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
      <circle cx={last[0]} cy={last[1]} r="2" fill={color} />
    </svg>
  );
};

/* ── Screen 1: Live Data ────────────────────────────────────────── */
const LIVE_ROWS = [
  { sym: 'BTC', name: 'Bitcoin',  price: '$64,281', chg: '+2.4%', exch: '↓ -1.8%', sig: 'BULLISH', sc: '#0ECB81', data: [62.1,63.5,63.1,64,63.8,64.5,64.2,64.8,64.3,64.9,64.28] },
  { sym: 'ETH', name: 'Ethereum', price: '$3,452',  chg: '+3.1%', exch: '↓ -2.5%', sig: 'BULLISH', sc: '#0ECB81', data: [3.40,3.42,3.39,3.45,3.43,3.46,3.44,3.47,3.45,3.48,3.452] },
  { sym: 'SOL', name: 'Solana',   price: '$142.65', chg: '+5.7%', exch: '↓ -4.2%', sig: 'WATCH',   sc: '#00D4FF', data: [138,139,141,140,142,143,141,143,144,142,142.65] },
];

const LiveDataScreen: React.FC = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => (t + 1) % LIVE_ROWS.length), 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex flex-col h-full">
      {/* column headers */}
      <div className="grid grid-cols-[1fr_76px_52px_56px_64px] px-4 py-2 border-b border-white/[0.06]">
        {['Asset','Price','Trend','Exch Rsv','Signal'].map(h => (
          <span key={h} className="font-mono text-[10px] text-white/50 tracking-wide uppercase text-right first:text-left">{h}</span>
        ))}
      </div>
      {/* rows */}
      {LIVE_ROWS.map((row, i) => (
        <div key={row.sym}
          className={`grid grid-cols-[1fr_76px_52px_56px_64px] items-center px-4 py-2.5 border-b border-white/[0.03] transition-colors duration-500 ${tick === i ? 'bg-[#0ECB81]/[0.03]' : ''}`}>
          <div className="flex items-center gap-2 min-w-0">
            <CryptoIcon symbol={row.sym} name={row.name} size={22} />
            <div>
              <div className="font-mono text-[12px] text-white/85 font-semibold leading-tight">{row.sym}</div>
              <div className="font-mono text-[10px] text-white/60 leading-tight">{row.name}</div>
            </div>
          </div>
          <div className="text-right">
            <div className={`font-mono text-[12px] font-semibold leading-tight transition-colors duration-700 ${tick === i ? 'text-white' : 'text-white/70'}`}>{row.price}</div>
            <div className="font-mono text-[10px] text-[#0ECB81] leading-tight">{row.chg}</div>
          </div>
          <div className="flex justify-end items-center">
            <Sparkline data={row.data} color={row.sc} w={48} h={18} />
          </div>
          <div className="text-right">
            <span className="font-mono text-[10px] text-[#EF4444]/75">{row.exch}</span>
          </div>
          <div className="flex justify-end">
            <span className="font-mono text-[11px] font-semibold tracking-wide px-2 py-0.5 rounded border"
              style={{ color: row.sc, background: `${row.sc}15`, borderColor: `${row.sc}30` }}>
              {row.sig}
            </span>
          </div>
        </div>
      ))}
      {/* footer */}
      <div className="mt-auto px-4 py-2 flex items-center justify-between border-t border-white/[0.03]">
        <div className="flex items-center gap-3">
          {['Coinbase','Binance','Kraken'].map(ex => (
            <span key={ex} className="font-mono text-[10px] text-white/55 uppercase tracking-wide">{ex}</span>
          ))}
        </div>
        <span className="font-mono text-[10px] text-[#0ECB81]/60 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0ECB81] animate-pulse inline-block" />
          Live · 4ms
        </span>
      </div>
    </div>
  );
};

/* ── Screen 2: L1 Ecosystem On-Chain Stacked Bar Chart ─────────── */
const ONCHAIN_SEGMENTS = [
  { key: 'tvl',     label: 'TVL',       color: '#0ECB81' },
  { key: 'dex',     label: 'DEX Vol',   color: '#3B82F6' },
  { key: 'staking', label: 'Staking',   color: '#8B5CF6' },
  { key: 'bridged', label: 'Bridged',   color: '#00D4FF' },
] as const;

const L1_CHAINS = [
  { sym: 'ETH',  tvl: 62, dex: 38, staking: 48, bridged: 22, label: 'Ethereum' },
  { sym: 'SOL',  tvl: 24, dex: 44, staking: 28, bridged: 12, label: 'Solana'   },
  { sym: 'BTC',  tvl: 18, dex:  6, staking: 88, bridged: 14, label: 'Bitcoin'  },
  { sym: 'AVAX', tvl: 28, dex: 22, staking: 18, bridged: 10, label: 'Avalanche'},
  { sym: 'SUI',  tvl: 14, dex: 32, staking: 10, bridged:  6, label: 'Sui'      },
];

const AnalyticsScreen: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  const maxTotal = Math.max(...L1_CHAINS.map(c => c.tvl + c.dex + c.staking + c.bridged));
  const BAR_H = 108; // px — available bar height

  return (
    <div className="flex flex-col h-full">
      {/* header */}
      <div className="px-4 pt-2.5 pb-1.5 flex items-center justify-between border-b border-white/[0.04]">
        <span className="font-mono text-[10px] text-white/60 uppercase tracking-wide">L1 Ecosystem · On-Chain Comparison</span>
        <div className="flex items-center gap-3">
          {ONCHAIN_SEGMENTS.map(s => (
            <div key={s.key} className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-sm inline-block" style={{ background: s.color + 'CC' }} />
              <span className="font-mono text-[11px] text-white/65">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* chart area */}
      <div className="flex-1 px-4 pt-2 pb-0 flex items-end gap-2 min-h-0">
        {L1_CHAINS.map((chain) => {
          const total = chain.tvl + chain.dex + chain.staking + chain.bridged;
          const barHeight = (total / maxTotal) * BAR_H;
          const segs = ONCHAIN_SEGMENTS.map(s => ({ ...s, val: chain[s.key as keyof typeof chain] as number }));

          return (
            <div key={chain.sym} className="flex-1 flex flex-col items-center gap-1 min-w-0">
              {/* total label */}
              <span className="font-mono text-[11px] text-white/55 mb-0.5">{total}B</span>
              {/* stacked bar */}
              <div className="w-full flex flex-col-reverse rounded-sm overflow-hidden"
                style={{ height: mounted ? barHeight : 0, transition: 'height 0.7s cubic-bezier(0.25,0.4,0.25,1)' }}>
                {segs.map((seg, si) => {
                  const segPct = (seg.val / total) * 100;
                  const alpha = ['CC','AA','88','66'][si];
                  return (
                    <div
                      key={seg.key}
                      title={`${seg.label}: ${seg.val}B`}
                      style={{
                        height: `${segPct}%`,
                        background: seg.color + alpha,
                        opacity: mounted ? 1 : 0,
                        transition: `opacity 0.4s ease ${0.1 + si * 0.06}s`,
                      }}
                    />
                  );
                })}
              </div>
              {/* chain label */}
              <span className="font-mono text-[10px] font-semibold text-white/55 mt-1">{chain.sym}</span>
            </div>
          );
        })}
      </div>

      {/* footer totals row */}
      <div className="px-4 py-2 border-t border-white/[0.04] flex items-center justify-between mt-auto">
        <div className="flex items-center gap-4">
          {[
            { label: 'Total TVL', val: '$186B', c: '#0ECB81' },
            { label: 'DEX 24h', val: '$28B', c: '#3B82F6' },
            { label: 'Staked', val: '$412B', c: '#8B5CF6' },
          ].map(m => (
            <div key={m.label} className="flex items-center gap-1.5">
              <span className="font-mono text-[11px] text-white/55">{m.label}</span>
              <span className="font-mono text-[11px] font-bold" style={{ color: m.c }}>{m.val}</span>
            </div>
          ))}
        </div>
        <span className="font-mono text-[11px] text-white/45 uppercase tracking-wide">30d window</span>
      </div>
    </div>
  );
};

/* ── Screen 3: AI Ask (Ask Prism panel) ─────────────────────────── */
const AI_LEVELS = [
  {
    level: 'Lvl 01', label: 'Basic',
    q: 'Find coins near 52W High with RSI divergence.',
    result: {
      title: 'RSI Divergence Detected', subtitle: '4 assets · near highs', mode: 'Intelligence Mode',
      items: [
        { name: 'Bitcoin',   sub: 'BTC',  pct: 92, color: '#0ECB81' },
        { name: 'Ethereum',  sub: 'ETH',  pct: 78, color: '#0ECB81' },
        { name: 'Solana',    sub: 'SOL',  pct: 71, color: '#00D4FF' },
        { name: 'Chainlink', sub: 'LINK', pct: 65, color: '#0ECB81' },
      ],
    },
  },
  {
    level: 'Lvl 02', label: 'Medium',
    q: 'Show projects with TVL growth >15% for 3 months.',
    result: {
      title: 'TVL Growth Leaders', subtitle: 'Consistent 3-month growth > 15%', mode: 'Deep Analysis',
      items: [
        { name: 'Aave v3',    sub: '$12.4B TVL', pct: 84, color: '#0ECB81' },
        { name: 'Lido',       sub: '$28.1B TVL', pct: 76, color: '#0ECB81' },
        { name: 'Eigenlayer', sub: '$9.8B TVL',  pct: 84, color: '#00D4FF' },
        { name: 'Uniswap',   sub: '$4.2B TVL',  pct: 69, color: '#0ECB81' },
      ],
    },
  },
  {
    level: 'Lvl 03', label: 'Advanced',
    q: 'Filter where whale holdings ↑ and exchange reserves ↓ last 48h.',
    result: {
      title: 'Whale Accumulation Signal', subtitle: 'Whale ↑ & Exch Rsv ↓ · 48h', mode: 'Quant Mode',
      items: [
        { name: 'Bitcoin',  sub: 'Whale: +3.2%', pct: 95, color: '#0ECB81' },
        { name: 'Ethereum', sub: 'Whale: +2.1%', pct: 82, color: '#8B5CF6' },
        { name: 'Solana',   sub: 'Whale: +5.7%', pct: 74, color: '#00D4FF' },
      ],
    },
  },
] as const;

const AIAskScreen: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState(1);

  useEffect(() => {
    const id = setInterval(() => setActiveLevel(prev => (prev + 1) % AI_LEVELS.length), 4200);
    return () => clearInterval(id);
  }, []);

  const level = AI_LEVELS[activeLevel];
  const result = level.result;

  return (
    <div className="flex h-full">
      {/* Left sidebar – query levels */}
      <div className="w-[148px] shrink-0 border-r border-white/[0.04] bg-black/20 px-3 py-3 flex flex-col gap-1">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="material-symbols-outlined text-[12px]" style={{ color: '#0ECB81' }}>terminal</span>
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest" style={{ color: '#0ECB81' }}>Ask Prism</span>
        </div>
        {AI_LEVELS.map((l, i) => (
          <button
            key={l.level}
            onClick={() => setActiveLevel(i)}
            className={`text-left rounded px-2 py-2 transition-all duration-300 ${activeLevel === i ? 'bg-white/[0.04] border border-white/[0.06]' : 'hover:bg-white/[0.02] border border-transparent'}`}
          >
            <span className={`font-mono text-[11px] font-bold uppercase tracking-wide border px-1.5 py-px rounded mb-1 block w-fit transition-colors duration-300 ${activeLevel === i ? 'text-[#0ECB81] border-[#0ECB81]/30' : 'text-white/50 border-white/15'}`}>
              {l.level}: {l.label}
            </span>
            <p className={`font-mono text-[10px] leading-snug transition-colors duration-300 ${activeLevel === i ? 'text-white/65' : 'text-white/45'}`}>
              {l.q}
            </p>
          </button>
        ))}
      </div>

      {/* Right panel – results */}
      <div className="flex-1 px-4 py-3 flex flex-col gap-2 min-w-0">
        {/* header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-white/55 uppercase tracking-widest">Registry / Results</span>
            <span className="font-mono text-[11px] font-semibold text-white bg-white/5 px-2 py-0.5 rounded">
              {result.items.length} identified
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-[#0ECB81]/20 bg-[#0ECB81]/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0ECB81] animate-pulse" style={{ boxShadow: '0 0 6px #0ECB81' }} />
            <span className="font-mono text-[11px] text-[#0ECB81] uppercase tracking-wider">System Online</span>
          </div>
        </div>

        {/* mode + subtitle */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-semibold border px-2 py-0.5 rounded uppercase tracking-wider"
            style={{ color: '#0ECB81', borderColor: 'rgba(14,203,129,0.2)', background: 'rgba(14,203,129,0.05)' }}>
            {result.mode}
          </span>
          <span className="font-mono text-[11px] text-white/60 truncate">{result.subtitle}</span>
        </div>

        {/* result items — crossfade only, no y shift */}
        <AnimatePresence mode="sync">
          <motion.div key={activeLevel}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-2">
            <div className="font-mono text-[11px] font-semibold text-white">{result.title}</div>
            {result.items.map((item, i) => (
              <div key={item.name} className="flex items-center gap-3">
                <div className="w-[72px] shrink-0">
                  <div className="font-mono text-[10px] text-white/75 font-medium truncate leading-tight">{item.name}</div>
                  <div className="font-mono text-[10px] text-white/60 leading-tight">{item.sub}</div>
                </div>
                <div className="flex-1 flex items-center gap-2 min-w-0">
                  <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full"
                      style={{ background: item.color, boxShadow: `0 0 8px ${item.color}55` }}
                      initial={{ width: '0%' }}
                      animate={{ width: `${item.pct}%` }}
                      transition={{ duration: 0.6, delay: i * 0.06, ease: [0.25, 0.4, 0.25, 1] }}
                    />
                  </div>
                  <span className="font-mono text-[11px] font-bold shrink-0 w-7 text-right" style={{ color: item.color }}>
                    {item.pct}%
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-auto pt-2 border-t border-white/[0.04] flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[0,1,2].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{ background: activeLevel === i ? '#0ECB81' : 'rgba(255,255,255,0.08)', boxShadow: activeLevel === i ? '0 0 6px #0ECB81' : 'none' }} />
            ))}
          </div>
          <span className="font-mono text-[11px] text-white/50 uppercase tracking-widest">Live Data Stream</span>
        </div>
      </div>
    </div>
  );
};

/* ── Screen 4: Visualize ────────────────────────────────────────── */
const VIZ_STRATEGIES = [
  { name: 'Momentum (52W)', ret: 42.8, color: '#0ECB81', type: 'MOMENTUM' },
  { name: 'Quality-Value Trio', ret: 36.1, color: '#3B82F6', type: 'FUNDAMENTAL' },
  { name: 'Whale + Exchange', ret: 28.6, color: '#8B5CF6', type: 'ON-CHAIN' },
  { name: 'RSI Divergence', ret: 22.4, color: '#00D4FF', type: 'TECHNICAL' },
  { name: 'BTC Benchmark', ret: 18.4, color: '#6B7280', type: 'BENCHMARK' },
];

const VisualizeScreen: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);
  const max = Math.max(...VIZ_STRATEGIES.map(s => s.ret));

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <span className="font-mono text-[10px] text-white/60 uppercase tracking-wide">Strategy Performance · 90 days</span>
        <div className="flex gap-1">
          {['1M','3M','6M'].map((t, i) => (
            <span key={t} className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded cursor-default ${i === 1 ? 'bg-[#0ECB81]/15 text-[#0ECB81]' : 'text-white/50'}`}>{t}</span>
          ))}
        </div>
      </div>
      <div className="px-4 flex flex-col gap-2 flex-1">
        {VIZ_STRATEGIES.map((s, i) => (
          <div key={s.name} className="flex items-center gap-3">
            <div className="w-[84px] shrink-0">
              <div className="font-mono text-[10px] text-white/60 font-medium truncate leading-tight">{s.name}</div>
              <div className="font-mono text-[11px] text-white/55 leading-tight">{s.type}</div>
            </div>
            <div className="flex-1 flex items-center gap-2 min-w-0">
              <div className="flex-1 h-3 bg-white/[0.04] rounded-sm overflow-hidden">
                <motion.div className="h-full rounded-sm"
                  style={{ background: s.color + (s.type === 'BENCHMARK' ? '50' : 'CC') }}
                  initial={{ width: '0%' }}
                  animate={{ width: mounted ? `${(s.ret / max) * 100}%` : '0%' }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: [0.25, 0.4, 0.25, 1] }} />
              </div>
              <span className="font-mono text-[11px] font-bold shrink-0 w-11 text-right"
                style={{ color: s.type === 'BENCHMARK' ? '#6B7280' : s.color }}>
                +{s.ret}%
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-2.5 mt-auto border-t border-white/[0.04] flex items-center justify-between">
        <span className="font-mono text-[10px] text-white/55">vs. BTC: outperforming by +24.4%</span>
        <span className="font-mono text-[10px] text-[#0ECB81]/55">5 strategies · live data</span>
      </div>
    </div>
  );
};

/* ── Product Card (multi-screen) ────────────────────────────────── */
const SCREEN_QUERIES: Record<ScreenId, string> = {
  live:      'Live market · whale + exchange data',
  analytics: 'Technical analysis · RSI · MACD · volume',
  ai:        'AI query engine · natural language → signal',
  viz:       'Strategy visualization · 90-day performance',
};

const ProductCard: React.FC = () => {
  const [screen, setScreen] = useState<ScreenId>('live');
  const screenTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startRotation = () => {
    if (screenTimerRef.current) clearInterval(screenTimerRef.current);
    screenTimerRef.current = setInterval(() => {
      setScreen(prev => {
        const idx = PRODUCT_SCREENS.findIndex(s => s.id === prev);
        return PRODUCT_SCREENS[(idx + 1) % PRODUCT_SCREENS.length].id;
      });
    }, 5500);
  };

  useEffect(() => {
    startRotation();
    return () => { if (screenTimerRef.current) clearInterval(screenTimerRef.current); };
  }, []);

  const handleTab = (id: ScreenId) => {
    setScreen(id);
    startRotation();
  };

  return (
    <div className="hero-product-card w-full">
      {/* Window chrome */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          <span className="ml-3 font-mono text-[11px] text-white/55 tracking-normal hidden sm:block truncate max-w-[260px]">
            {SCREEN_QUERIES[screen]}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0ECB81] animate-pulse" />
          <span className="font-mono text-[11px] text-[#0ECB81]/60 tracking-widest uppercase">Live</span>
        </div>
      </div>

      {/* Screen tabs */}
      <div className="flex items-center gap-0 border-b border-white/[0.05] px-1">
        {PRODUCT_SCREENS.map((s) => (
          <button
            key={s.id}
            onClick={() => handleTab(s.id)}
            className={`flex items-center gap-1 px-2 py-1.5 text-[11px] font-mono transition-all duration-200 relative
              ${screen === s.id ? 'text-white/85' : 'text-white/50 hover:text-white/70'}`}
          >
            <span className="material-symbols-outlined text-[11px]">{s.icon}</span>
            <span className="hidden sm:inline tracking-wide">{s.label}</span>
            {screen === s.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #8B5CF6, #00D4FF, transparent)' }}
                layoutId="screen-underline"
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Screen content — fixed height, absolute crossfade, no layout shift */}
      <div className="relative" style={{ height: 212 }}>
        <AnimatePresence mode="sync">
          <motion.div
            key={screen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {screen === 'live'      && <LiveDataScreen />}
            {screen === 'analytics' && <AnalyticsScreen />}
            {screen === 'ai'        && <AIAskScreen />}
            {screen === 'viz'       && <VisualizeScreen />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ── Stagger helpers ────────────────────────────────────────────── */
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as [number,number,number,number], delay } },
});

/* ── HeroSection ────────────────────────────────────────────────── */
interface HeroSectionProps { readonly className?: string; }

export const HeroSection: React.FC<HeroSectionProps> = ({ className = '' }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [taglineIdx, setTaglineIdx] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const cardY     = useTransform(scrollYProgress, [0, 1], [0, -30]);

  useEffect(() => {
    const id = setInterval(() => setTaglineIdx(p => (p + 1) % HERO_TAGLINES.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`hero-section relative flex flex-col items-center justify-center text-center min-h-[auto] md:h-[100dvh] px-6 md:px-0 pb-0 ${className}`}
    >
      <div className="absolute inset-0 z-0 pointer-events-none hero-css-particles" />
      <div className="absolute inset-0 z-0 pointer-events-none hero-glow-overlay" />
      <div className="hero-data-line hero-line-1" />
      <div className="hero-data-line hero-line-2" />
      <div className="hero-data-line hero-line-3" />

      {/* Headline */}
      <motion.h1
        className="relative z-10 text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] pt-[0.08em] mb-0 md:mb-10"
        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', y: headlineY }}
      >
        <motion.span className="block mb-1 md:mb-2 text-white" {...fadeUp(0.1)}>
          Think Like You.
        </motion.span>
        <span className="relative block overflow-hidden h-[1.15em]">
          <AnimatePresence mode="wait">
            <motion.span
              key={taglineIdx}
              className="block text-neon-green hero-neon-glow"
              initial={{ y: '80%', opacity: 0, filter: 'blur(8px)' }}
              animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: '-80%', opacity: 0, filter: 'blur(8px)' }}
              transition={{ duration: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
            >
              {HERO_TAGLINES[taglineIdx]}
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p className="relative z-10 hidden md:block text-xl text-gray-400 max-w-2xl mb-12 font-medium leading-relaxed" {...fadeUp(0.4)}>
        Ask in plain <span className="text-white font-semibold">English</span>.
        Get quant-grade analysis on <span className="text-white font-semibold">Crypto—instantly</span>.
        No code. No complex filters. Just the{' '}
        <span className="text-white font-semibold">market edge</span>{' '}
        you've been missing.
      </motion.p>
      <p className="relative z-10 md:hidden text-base text-gray-400 mt-6 mb-2 leading-relaxed">
        Ask in plain <span className="text-white font-semibold">English</span>. Get quant-grade analysis on{' '}
        <span className="text-white font-semibold">Crypto</span>—instantly. Just the{' '}
        <span className="text-neon-green">market edge</span> you need.
      </p>

      {/* CTA */}
      <motion.div className="relative z-10 flex flex-col items-stretch w-full md:w-auto md:flex-row gap-4 pt-4 md:pt-0 mb-8 md:mb-12" {...fadeUp(0.55)}>
        <motion.button
          className="cta-animated-btn cta-animated-btn-solid group w-full md:w-auto py-4 md:py-3 text-base font-bold justify-center rounded-lg flex items-center"
          id="hero-cta-apply"
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(14, 203, 129, 0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          Apply for early access <span className="ml-2">→</span>
        </motion.button>
      </motion.div>

      {/* Multi-screen product card */}
      <motion.div
        className="relative z-10 w-full max-w-3xl lg:max-w-4xl mb-6 md:mb-8"
        style={{ y: cardY }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0.7 }}
      >
        <ProductCard />
      </motion.div>


      <motion.div
        className="relative z-10 hidden md:block mt-6 text-[10px] font-mono tracking-widest text-white/30 uppercase pointer-events-none select-none"
        {...fadeUp(1.0)}
      >
        System Status: Operational // Latency: 4ms // Nodes: Active
      </motion.div>
    </section>
  );
};

export default HeroSection;
