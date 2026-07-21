// v5 "The Problem" (CryptoPrism Hero.dc.html v5, lines 106-249).
// Full redesign vs v4: headline "Intelligence In. Optimal Decisions Out.",
// 8 icon+sparkline source cards flowing into the prism (sec2Anchor unchanged:
// 502/40, 468x572), an ACTIONABLE OUTPUTS signals card (5 rows), a 7-step
// pipeline strip with a system-status pill, and a 6-stat grid. Reveal is the
// v5 [data-reveal] mechanism (PrismHome.tsx runtime), not the old <Reveal>.
// The status timestamp "10:21:43 UTC" is design transcription, not live data.

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode, RefObject } from 'react';
import { animate } from 'animejs';
import { prefersReducedMotion } from '../motion';

type SourceCard = {
  label: string;
  sub: string;
  iconStroke?: string;
  icon: ReactNode;
  spark: ReactNode;
};

const SOURCE_CARDS: SourceCard[] = [
  {
    label: 'News & Events', sub: 'Real-time headlines',
    icon: <path d="M5 2.5h7l3.5 3.5v11.5H5z M12 2.5V6h3.5 M7.5 10h5 M7.5 13h5" />,
    spark: <path d="M2 12 8 8l6 5 7-8 6 4 7-6 8 5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    label: 'On-Chain Data', sub: 'Wallets, flows, TVL',
    icon: <path d="M10 2.5 16 6v8l-6 3.5L4 14V6z M10 9.8V17.5 M4 6l6 3.8 6-3.8" />,
    spark: <path d="M2 14 12 8l8 4 9-7 11 5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    label: 'Macro Data', sub: 'Rates, CPI, GDP, PMI',
    icon: (
      <>
        <circle cx="10" cy="10" r="7.5" />
        <path d="M2.5 10h15 M10 2.5c-2.5 2.2-2.5 12.8 0 15 M10 2.5c2.5 2.2 2.5 12.8 0 15" />
      </>
    ),
    spark: <path d="M2 12c6-8 10-8 15-3s9 6 14 1 8-5 11-3" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />,
  },
  {
    label: 'ETF Flows', sub: 'Inflow / outflow data',
    icon: <path d="M10 2.5a7.5 7.5 0 1 0 7.5 7.5H10z M12.5 2.9a7.5 7.5 0 0 1 4.6 4.6h-4.6z" />,
    spark: <path d="M3 16V11 M10 16V8 M17 16V12 M24 16V5 M31 16V9 M38 16V3" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />,
  },
  {
    label: 'Funding & OI', sub: 'Futures, perps, OI',
    icon: <path d="M2.5 10c2-3.5 3.5-3.5 5 0s3.5 3.5 5 0 3.5-3.5 5 0" />,
    spark: <path d="M2 13C8 5 14 15 22 9s14-4 20 2" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />,
  },
  {
    label: 'Liquidations', sub: 'Long / short liquidations', iconStroke: '#C2410C',
    icon: <path d="M5 2.5h7l3.5 3.5v11.5H5z M12 2.5V6h3.5 M7.5 10.5h5 M7.5 13.5h3.5" />,
    spark: <path d="M3 16V13 M10 16V6 M17 16V10 M24 16V3 M31 16V12 M38 16V8" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />,
  },
  {
    label: 'Developer Activity', sub: 'GitHub, commits, releases', iconStroke: '#0B1220',
    icon: <path d="M7 6.5 3.5 10 7 13.5 M13 6.5 16.5 10 13 13.5" />,
    spark: <path d="M2 16v-4 M7 16V7 M12 16v-6 M17 16V4 M22 16v-9 M27 16v-5 M32 16V6 M37 16v-8 M42 16V9" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />,
  },
  {
    label: 'Sentiment', sub: 'Social & market sentiment',
    icon: (
      <>
        <path d="M3 4.5h14a0 0 0 0 1 0 0v8a1.5 1.5 0 0 1-1.5 1.5H8l-3.5 3v-3H4.5A1.5 1.5 0 0 1 3 12.5z" />
        <path d="M6.5 8h7 M6.5 10.8h4.5" />
      </>
    ),
    spark: <path d="M2 10c5-6 9 4 14-2s9 5 13-1 8 2 13-3" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />,
  },
];

// 4 flip-card slots (bigger, readable) — each cycles between two of the 8
// sources so all 8 are still shown, 4 at a time, with a staggered flip. The
// 4 curve start points (card centers) converge into the crystal's left face.
const PAIRS: [number, number][] = [
  [0, 4], // News & Events  ↔  Funding & OI
  [1, 5], // On-Chain Data  ↔  Liquidations
  [2, 6], // Macro Data     ↔  Developer Activity
  [3, 7], // ETF Flows      ↔  Sentiment
];
const FLOWS = [
  { y1: 156, y2: 268, dur: 8.6, begin: -0.7 },
  { y1: 268, y2: 290, dur: 9.3, begin: -1.9 },
  { y1: 380, y2: 312, dur: 8.2, begin: -3.1 },
  { y1: 492, y2: 334, dur: 9.7, begin: -4.3 },
];

type OutItem = {
  key: string;
  badge: ReactNode;
  name: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  note: string;
  metric: string;
  metricColor: string;
  metricLabel: string;
};

// ILLUSTRATIVE example outputs (marketing showcase — same nature as the coin
// signals in the original card, NOT live DB values). The card renders one slot
// per category; each slot cycles through its own examples (anime.js fade-swap),
// so the card reads as a live rolling feed of the six actionable-output types
// CryptoPrism produces: signals, backtests, saved screeners, fast execution,
// early calls, ML sentiment. Wire to the real pipeline (bot.signal_log / DMV
// score) later.
const coinBadge = (ch: string, bg: string): ReactNode => (
  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', background: bg, fontSize: 14, fontWeight: 800, color: '#FFFFFF', flex: 'none' }}>{ch}</span>
);
const iconBadge = (icon: ReactNode, bg: string, stroke: string): ReactNode => (
  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', background: bg, flex: 'none' }}>
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
  </span>
);

const GREEN = 'var(--accent)', GREEN2 = 'var(--accent-2)', GREENBG = 'rgba(15,174,114,0.1)';
const VIOLET = '#7C3AED', VIOLETBG = 'rgba(124,58,237,0.08)';
const BLUE = '#2563EB', BLUEBG = 'rgba(37,99,235,0.08)';
const ICON_BARS = <path d="M3 16V9 M8 16V4 M13 16v-6 M17 16V8" />;
const ICON_FUNNEL = <path d="M3 4h14l-5.4 7v5l-3.2 1.6V11z" />;
const ICON_BOLT = <path d="M11 2.5 4 11.5h5L8 17.5l7-9h-5z" />;
const ICON_SPARK = <><path d="M10 3v4 M10 13v4 M3 10h4 M13 10h4" /><path d="M6.2 6.2 8 8 M13.8 6.2 12 8" /></>;

const POOL_SIGNAL: OutItem[] = [
  { key: 'sig-btc', badge: coinBadge('₿', '#F7931A'), name: 'BTC', tag: 'OVERWEIGHT', tagColor: GREEN2, tagBg: GREENBG, note: 'Strong momentum', metric: '97%', metricColor: GREEN, metricLabel: 'Confidence' },
  { key: 'sig-sol', badge: coinBadge('S', '#0B1220'), name: 'SOL', tag: 'ACCUMULATE', tagColor: GREEN2, tagBg: GREENBG, note: 'Breakout setup', metric: '89%', metricColor: GREEN, metricLabel: 'Confidence' },
  { key: 'sig-eth', badge: coinBadge('Ξ', '#8A93B2'), name: 'ETH', tag: 'REDUCE EXPOSURE', tagColor: '#DC2626', tagBg: 'rgba(220,38,38,0.08)', note: 'Risk / reward deteriorating', metric: '92%', metricColor: '#DC2626', metricLabel: 'Confidence' },
];
const POOL_BACKTEST: OutItem[] = [
  { key: 'bt-mom', badge: iconBadge(ICON_BARS, 'rgba(124,58,237,0.1)', VIOLET), name: 'Momentum v4', tag: 'BACKTEST', tagColor: VIOLET, tagBg: VIOLETBG, note: '3y out-of-sample', metric: '2.31', metricColor: '#0B1220', metricLabel: 'Sharpe' },
  { key: 'bt-mr', badge: iconBadge(ICON_BARS, 'rgba(124,58,237,0.1)', VIOLET), name: 'Mean-Revert v2', tag: 'BACKTEST', tagColor: VIOLET, tagBg: VIOLETBG, note: 'Walk-forward validated', metric: '+1.9%', metricColor: GREEN, metricLabel: 'Avg edge' },
  { key: 'bt-trend', badge: iconBadge(ICON_BARS, 'rgba(124,58,237,0.1)', VIOLET), name: 'Trend Basket', tag: 'BACKTEST', tagColor: VIOLET, tagBg: VIOLETBG, note: '512 trades', metric: '61%', metricColor: '#0B1220', metricLabel: 'Win rate' },
];
const POOL_SCREENER: OutItem[] = [
  { key: 'sc-brk', badge: iconBadge(ICON_FUNNEL, 'rgba(37,99,235,0.1)', BLUE), name: 'Breakout + Volume', tag: 'SCREENER', tagColor: BLUE, tagBg: BLUEBG, note: 'Saved · updated live', metric: '12', metricColor: '#0B1220', metricLabel: 'Hits' },
  { key: 'sc-fund', badge: iconBadge(ICON_FUNNEL, 'rgba(37,99,235,0.1)', BLUE), name: 'Funding Squeeze', tag: 'SCREENER', tagColor: BLUE, tagBg: BLUEBG, note: 'Perp funding elevated', metric: '5', metricColor: '#0B1220', metricLabel: 'Hits' },
  { key: 'sc-dmv', badge: iconBadge(ICON_FUNNEL, 'rgba(37,99,235,0.1)', BLUE), name: 'DMV Score > 80', tag: 'SCREENER', tagColor: BLUE, tagBg: BLUEBG, note: 'High-conviction set', metric: '23', metricColor: '#0B1220', metricLabel: 'Hits' },
];
const POOL_EXEC: OutItem[] = [
  { key: 'ex-sol', badge: iconBadge(ICON_BOLT, GREENBG, GREEN2), name: 'SOL market buy', tag: 'EXECUTED', tagColor: GREEN2, tagBg: GREENBG, note: 'Smart-routed', metric: '38ms', metricColor: GREEN, metricLabel: 'Fill time' },
  { key: 'ex-tia', badge: iconBadge(ICON_BOLT, 'rgba(124,58,237,0.1)', VIOLET), name: 'TIA accumulation', tag: 'EARLY CALL', tagColor: VIOLET, tagBg: VIOLETBG, note: 'Ahead of the move', metric: '+6h', metricColor: VIOLET, metricLabel: 'Lead time' },
  { key: 'ex-bskt', badge: iconBadge(ICON_BOLT, GREENBG, GREEN2), name: 'Basket rebalance', tag: 'EXECUTED', tagColor: GREEN2, tagBg: GREENBG, note: '8 legs routed', metric: '120ms', metricColor: GREEN, metricLabel: 'Fill time' },
];
const POOL_SENT: OutItem[] = [
  { key: 'ml-news', badge: iconBadge(ICON_SPARK, 'rgba(217,119,6,0.1)', '#D97706'), name: 'News NLP', tag: 'BULLISH', tagColor: GREEN2, tagBg: GREENBG, note: '44 sources scored', metric: '0.91', metricColor: GREEN, metricLabel: 'Sentiment' },
  { key: 'ml-soc', badge: iconBadge(ICON_SPARK, 'rgba(217,119,6,0.1)', '#D97706'), name: 'Social regime', tag: 'SHIFT', tagColor: BLUE, tagBg: BLUEBG, note: 'Bullish shift detected', metric: '0.86', metricColor: '#0B1220', metricLabel: 'Sentiment' },
  { key: 'ml-dmv', badge: iconBadge(ICON_SPARK, 'rgba(217,119,6,0.1)', '#D97706'), name: 'DMV sentiment', tag: 'RISK-ON', tagColor: GREEN2, tagBg: GREENBG, note: 'Regime model', metric: '0.88', metricColor: GREEN, metricLabel: 'Score' },
];

const OUTPUT_POOLS: OutItem[][] = [POOL_SIGNAL, POOL_BACKTEST, POOL_SCREENER, POOL_EXEC, POOL_SENT];

const IC_DB = <path d="M10 3c3.3 0 6 .9 6 2.1S13.3 7.2 10 7.2 4 6.3 4 5.1 6.7 3 10 3Z M4 5.1v9.8c0 1.2 2.7 2.1 6 2.1s6-.9 6-2.1V5.1 M4 10c0 1.2 2.7 2.1 6 2.1s6-.9 6-2.1" />;
const IC_CHIP = <path d="M6.5 6.5h7v7h-7z M8.5 3.5v3 M11.5 3.5v3 M8.5 13.5v3 M11.5 13.5v3 M3.5 8.5h3 M3.5 11.5h3 M13.5 8.5h3 M13.5 11.5h3" />;
const IC_BARS2 = <path d="M4 16V10 M9.3 16V5 M14.6 16v-7" />;
const IC_PULSE = <path d="M2 10h3.5l2-5 3 10 2-5H17" />;
const IC_EYE = <><path d="M2 10s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5Z" /><circle cx="10" cy="10" r="2.2" /></>;
const IC_BOLT2 = <path d="M11 2.5 4 11.5h5L8 17.5l7-9h-5z" />;

const STATS: { num: string; label: string; sub: string; icon: ReactNode }[] = [
  { num: '14+', label: 'Data Sources', sub: 'Live & streaming', icon: IC_DB },
  { num: '32', label: 'AI Models', sub: 'Ensemble engine', icon: IC_CHIP },
  { num: '120+', label: 'Indicators', sub: 'Quant & on-chain', icon: IC_BARS2 },
  { num: '1.2M+', label: 'Data Points / Min', sub: 'Processed real-time', icon: IC_PULSE },
  { num: '97%', label: 'Explainability', sub: 'Evidence coverage', icon: IC_EYE },
  { num: '< 10s', label: 'Decision Latency', sub: 'End-to-end', icon: IC_BOLT2 },
];

// initial hidden state for [data-reveal] elements — the v5 runtime flips
// opacity/transform on first viewport entry with index*0.1s stagger
const reveal = {
  opacity: 0, transform: 'translateY(26px)',
  transition: 'opacity 0.8s ease, transform 0.8s ease',
} as const;

// One face of a flip card — a large, readable source tile.
function SourceFace({ s, back }: { s: SourceCard; back?: boolean }) {
  return (
    <div
      style={{
        position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
        transform: back ? 'rotateX(180deg)' : undefined,
        display: 'flex', alignItems: 'center', gap: 13, padding: '0 18px', boxSizing: 'border-box',
        background: '#FFFFFF', border: '1px solid #E7E9EC', borderRadius: 18, boxShadow: '0 10px 26px rgba(11,18,32,0.06)',
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 12, background: '#F3F6F4', flex: 'none' }}>
        <svg width="23" height="23" viewBox="0 0 20 20" fill="none" stroke={s.iconStroke || 'var(--accent-2)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 16.5, fontWeight: 700, color: '#0B1220', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.label}</div>
        <div style={{ fontSize: 12.5, color: '#98A2B3', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.sub}</div>
      </div>
      <svg width="48" height="20" viewBox="0 0 44 18" fill="none" style={{ flex: 'none' }}>{s.spark}</svg>
    </div>
  );
}

// A flip card cycling between two sources; `flipped` toggles site-wide and the
// per-card `delay` staggers the cascade (first flips, then second, then third).
function FlipCard({ front, back, delay, flipped }: { front: SourceCard; back: SourceCard; delay: number; flipped: boolean }) {
  return (
    <div style={{ width: 356, height: 84, perspective: 1400 }}>
      <div
        style={{
          position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d',
          transition: `transform 0.75s cubic-bezier(.45,0,.15,1) ${delay}s`,
          transform: flipped ? 'rotateX(180deg)' : 'rotateX(0deg)',
        }}
      >
        <SourceFace s={front} />
        <SourceFace s={back} back />
      </div>
    </div>
  );
}

// One rolling output slot — cycles through the examples in its category with a
// vertical fade-swap (anime.js). Staggered start/interval per row so the slots
// update at different times and the card reads as a live feed rather than a
// synchronized flip. The featured (top) slot also carries a slow "live" pulse.
// Reduced-motion: no cycling, no pulse — the first example stays put.
function RollingRow({ pool, featured, startDelay, interval, last }: { pool: OutItem[]; featured: boolean; startDelay: number; interval: number; last: boolean }) {
  const [idx, setIdx] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = prefersReducedMotion();
    let pulse: ReturnType<typeof animate> | null = null;
    if (featured && !reduce && containerRef.current) {
      pulse = animate(containerRef.current, {
        boxShadow: ['0 0 0 0 rgba(15,174,114,0)', '0 0 22px 0 rgba(15,174,114,0.26)'],
        duration: 1600, loop: true, alternate: true, ease: 'inOutSine',
      });
    }
    let alive = true;
    let startId = 0;
    let iv = 0;
    if (!reduce && pool.length > 1) {
      const swap = () => {
        if (!alive || document.hidden) return;
        const el = contentRef.current;
        if (!el) return;
        // fade the current example up + out, swap content, then fade the next in
        animate(el, {
          opacity: [1, 0], translateY: [0, -12], duration: 260, ease: 'inQuad',
          onComplete: () => {
            if (!alive) return;
            setIdx((i) => (i + 1) % pool.length);
            requestAnimationFrame(() => {
              const e2 = contentRef.current;
              if (e2) animate(e2, { opacity: [0, 1], translateY: [12, 0], duration: 360, ease: 'outCubic' });
            });
          },
        });
      };
      startId = window.setTimeout(() => { swap(); iv = window.setInterval(swap, interval); }, startDelay);
    }
    return () => { alive = false; window.clearTimeout(startId); window.clearInterval(iv); pulse?.revert(); };
  }, [featured, pool, startDelay, interval]);

  const item = pool[idx];
  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex', alignItems: 'center', minHeight: featured ? 58 : 46, boxSizing: 'border-box',
        padding: featured ? '10px 15px' : '8px 15px', margin: featured ? '0 -15px 5px' : '0 -15px',
        borderRadius: featured ? 14 : 0,
        background: featured ? 'rgba(15,174,114,0.06)' : 'transparent',
        border: featured ? '1px solid rgba(15,174,114,0.25)' : 'none',
        borderBottom: featured ? '1px solid rgba(15,174,114,0.25)' : (last ? 'none' : '1px solid #E7E9EC'),
      }}
    >
      <div ref={contentRef} style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%' }}>
        <div style={{ transform: featured ? 'scale(1.25)' : 'none', transformOrigin: 'center', flex: 'none' }}>{item.badge}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: featured ? 21 : 15.5, fontWeight: featured ? 800 : 700, color: '#0B1220', whiteSpace: 'nowrap' }}>{item.name}</span>
            <span style={{ fontSize: featured ? 11 : 9.5, fontWeight: 700, letterSpacing: '0.05em', color: item.tagColor, background: item.tagBg, borderRadius: 5, padding: featured ? '4px 10px' : '3px 7px', whiteSpace: 'nowrap' }}>{item.tag}</span>
          </div>
          <div style={{ fontSize: featured ? 13 : 11.5, color: '#98A2B3', marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.note}</div>
        </div>
        <div style={{ textAlign: 'right', flex: 'none' }}>
          <div style={{ fontSize: featured ? 30 : 17, fontWeight: 800, color: item.metricColor, letterSpacing: '-0.02em', lineHeight: 1 }}>{item.metric}</div>
          <div style={{ fontSize: 10, color: '#98A2B3', marginTop: 3 }}>{item.metricLabel}</div>
        </div>
      </div>
    </div>
  );
}

// A single wide "vital stats" card that rotates through the six metrics in a
// random loop (anime.js fade-swap). Its own interval (2600ms) is deliberately
// off-beat from the input flip cards (3000ms) and the output rows (3600ms+) so
// the page never feels like it's pulsing in sync. Reduced-motion: static first.
// Compact stat pill with a SLIDING two-tone: the green bar (icon + number)
// glides side-to-side, alternating left/right each data point while the dark
// area fills the rest; the label hugs the opposite outer edge, so the two
// mirror. Colours are brand (accent green vs dark navy). Positions are driven
// imperatively by anime.js (never in React style, so re-renders don't fight
// the slide); alignment flips from `side` state. Reduced-motion: static, green
// left. (2026-07-21, per feedback — replaces the vertical fade-swap.)
function RotatingStat({ stats, interval }: { stats: typeof STATS; interval: number }) {
  const [idx, setIdx] = useState(0);
  const [side, setSide] = useState(0); // 0 = green left, 1 = green right
  const greenRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const sideRef = useRef(0);

  // initial positions before paint (green left) — left is imperative only
  useLayoutEffect(() => {
    if (greenRef.current) greenRef.current.style.left = '0%';
    if (labelRef.current) labelRef.current.style.left = '46%';
  }, []);

  useEffect(() => {
    if (prefersReducedMotion() || stats.length < 2) return;
    let alive = true;
    const nextRandom = (cur: number) => {
      let n = cur;
      while (n === cur) n = Math.floor(Math.random() * stats.length);
      return n;
    };
    const swap = () => {
      if (!alive || document.hidden) return;
      const ns = 1 - sideRef.current;
      sideRef.current = ns;
      setSide(ns);
      setIdx((i) => nextRandom(i));
      if (greenRef.current) animate(greenRef.current, { left: ns === 0 ? '0%' : '56%', duration: 720, ease: 'inOutQuad' });
      if (labelRef.current) animate(labelRef.current, { left: ns === 0 ? '46%' : '2%', duration: 720, ease: 'inOutQuad' });
    };
    const iv = window.setInterval(swap, interval);
    return () => { alive = false; window.clearInterval(iv); };
  }, [stats, interval]);

  const st = stats[idx];
  const greenLeft = side === 0;
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 600, margin: '0 auto', height: 72, borderRadius: 16, overflow: 'hidden', boxShadow: '0 12px 30px rgba(11,18,32,0.12)', background: '#0B1220', boxSizing: 'border-box' }}>
      {/* label sits on the dark area, opposite the green bar, hugging its edge */}
      <div ref={labelRef} style={{ position: 'absolute', top: 0, width: '52%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: greenLeft ? 'flex-end' : 'flex-start', textAlign: greenLeft ? 'right' : 'left', padding: '0 22px', boxSizing: 'border-box' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#F1F6F4', whiteSpace: 'nowrap' }}>{st.label}</div>
        <div style={{ fontSize: 12, color: '#8B96A5', marginTop: 2 }}>{st.sub}</div>
      </div>
      {/* the green bar (icon + number) slides between the two sides */}
      <div ref={greenRef} style={{ position: 'absolute', top: 0, width: '44%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: greenLeft ? 'flex-start' : 'flex-end', gap: 12, padding: '0 22px', boxSizing: 'border-box', background: 'linear-gradient(135deg, #34D399, var(--accent))' }}>
        <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="#04070E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', opacity: 0.82 }}>{st.icon}</svg>
        <span style={{ fontSize: 32, fontWeight: 800, color: '#04070E', letterSpacing: '-0.03em', lineHeight: 1, whiteSpace: 'nowrap' }}>{st.num}</span>
      </div>
    </div>
  );
}

export function ProblemSection({ anchorRef }: { anchorRef: RefObject<HTMLDivElement | null> }) {
  // flip the 4 input cards between their two sources every 3s (staggered)
  const [flipped, setFlipped] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      if (!document.hidden) setFlipped((f) => !f);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      data-page=""
      style={{
        position: 'relative', padding: '38px 44px 30px',
        background: 'radial-gradient(1100px 700px at 50% 46%, rgba(15,174,114,0.05), rgba(250,250,248,0) 70%), #FAFAF8',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto', textAlign: 'center' }}>
        <div data-reveal="0" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(15,174,114,0.35)', background: '#FFFFFF', borderRadius: 999, padding: '7px 16px', fontSize: 11.5, fontWeight: 600, letterSpacing: '0.12em', color: 'var(--accent-2)', ...reveal }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
          THE PROBLEM
        </div>
        <h2 data-reveal="1" style={{ fontFamily: 'var(--font-heading)', margin: '18px 0 0', fontSize: 56, fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.02em', color: '#0B1220', whiteSpace: 'nowrap', ...reveal }}>
          Intelligence In.{' '}
          <span style={{ background: 'linear-gradient(120deg, var(--accent) 20%, var(--accent-2) 85%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Optimal Decisions Out.
          </span>
        </h2>
        <p data-reveal="2" style={{ margin: '14px auto 0', maxWidth: 660, fontSize: 19, fontWeight: 400, lineHeight: 1.5, color: '#475467', ...reveal }}>
          Institutional-grade research that continuously synthesizes macro, on-chain, derivatives and sentiment into explainable, risk-aware decisions.
        </p>
        <div data-reveal="3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, margin: '22px auto 0', ...reveal }}>
          <button type="button" className="cta-early-access-trigger" style={{ fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 600, color: '#FFFFFF', background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', border: 'none', borderRadius: 14, padding: '14px 26px', cursor: 'pointer', boxShadow: '0 12px 30px rgba(15,174,114,0.25)' }}>
            Start Free
            <svg width="15" height="13" viewBox="0 0 16 14" fill="none"><path d="M1 7h13M9.5 1.8 14.7 7l-5.2 5.2" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" className="cta-early-access-trigger" style={{ fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 9, fontSize: 15, fontWeight: 600, color: '#0B1220', background: '#FFFFFF', border: '1px solid #E7E9EC', borderRadius: 14, padding: '13px 22px', cursor: 'pointer', boxShadow: '0 6px 18px rgba(11,18,32,0.05)' }}>
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8.5" stroke="#0B1220" strokeWidth="1.5" /><path d="M8.3 7.2v5.6L12.8 10Z" fill="#0B1220" /></svg>
            See Live Dashboard
          </button>
        </div>
      </div>

      {/* diagram band — the crystal (AI engine) is the dominant centerpiece;
          live inputs converge from the left, actionable outputs emerge on the
          right. Children positioned by % of the 1472x600 design band; the flow
          SVG stretches (preserveAspect none). */}
      <div style={{ position: 'relative', width: '100%', height: 600, margin: '22px auto 0' }}>
        <svg data-reveal="6" width="100%" height="600" viewBox="0 0 1472 600" fill="none" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, ...reveal }}>
          {FLOWS.map((f) => (
            <path key={f.y1} d={`M350,${f.y1} C480,${f.y1} 510,${f.y2} 620,${f.y2}`} stroke="rgba(15,174,114,0.4)" strokeWidth="1.5" />
          ))}
          <path d="M852,300 C930,300 970,300 1046,300" stroke="rgba(15,174,114,0.5)" strokeWidth="1.8" />
          {FLOWS.map((f) => (
            <circle key={f.y1} cx="350" cy={f.y1} r="3.4" fill="var(--accent)" />
          ))}
          <circle cx="1046" cy="300" r="4" fill="var(--accent)" />
          {FLOWS.map((f) => (
            <circle key={`m${f.y1}`} r="3" fill="var(--accent)">
              <animateMotion dur={`${f.dur}s`} begin={`${f.begin}s`} repeatCount="indefinite" path={`M350,${f.y1} C480,${f.y1} 510,${f.y2} 620,${f.y2}`} />
            </circle>
          ))}
          <circle r="3.4" fill="var(--accent)">
            <animateMotion dur="4.6s" begin="-1.2s" repeatCount="indefinite" path="M852,300 C930,300 970,300 1046,300" />
          </circle>
        </svg>

        {/* LIVE INPUTS — 4 flip cards cycling through the 8 sources */}
        <div data-reveal="4" style={{ position: 'absolute', left: 0, top: 0, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20, ...reveal }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', color: '#98A2B3', marginBottom: 2 }}>LIVE INPUTS</div>
          {PAIRS.map(([a, b], i) => (
            <FlipCard key={i} front={SOURCE_CARDS[a]} back={SOURCE_CARDS[b]} delay={i * 0.18} flipped={flipped} />
          ))}
        </div>

        {/* AI engine crystal — dominant centerpiece */}
        <div ref={anchorRef} style={{ position: 'absolute', left: 'calc(50% - 300px)', top: 20, width: 600, height: 560 }} />
        <div style={{ position: 'absolute', left: '50%', bottom: 4, transform: 'translateX(-50%)', textAlign: 'center', whiteSpace: 'nowrap' }}>
          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.01em', color: '#0B1220' }}>CryptoPrism AI Engine</div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', color: '#98A2B3', marginTop: 3 }}>ENSEMBLE · REASONING · EXPLAINABILITY</div>
        </div>

        {/* ACTIONABLE OUTPUTS card — BTC signal dominant */}
        <div data-reveal="8" style={{ position: 'absolute', left: '69%', right: 0, top: 34, boxSizing: 'border-box', background: '#FFFFFF', border: '1px solid #E7E9EC', borderRadius: 22, padding: '26px 28px', boxShadow: '0 18px 48px rgba(11,18,32,0.09)', ...reveal }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--accent-2)' }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="var(--accent-2)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2.5 4 11.5h5L8 17.5l7-9h-5z" /></svg>
            ACTIONABLE OUTPUTS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 8 }}>
            {OUTPUT_POOLS.map((pool, i) => (
              <RollingRow
                key={i}
                pool={pool}
                featured={i === 0}
                startDelay={900 + i * 850}
                interval={3600 + i * 450}
                last={i === OUTPUT_POOLS.length - 1}
              />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent-2)', cursor: 'pointer' }}>View all outputs &#8594;</span>
          </div>
        </div>
      </div>

      {/* The 7-step pipeline strip + status pill were removed (2026-07-20): too
          much tiny jargon. Cutting them shortens the section so the fit-page
          zoom rises and all remaining text renders larger. */}

      <div data-reveal="9" style={{ width: '100%', margin: '30px auto 0', ...reveal }}>
        <RotatingStat stats={STATS} interval={2600} />
      </div>
    </section>
  );
}
