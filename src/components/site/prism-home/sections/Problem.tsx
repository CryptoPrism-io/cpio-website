// v5 "The Problem" (CryptoPrism Hero.dc.html v5, lines 106-249).
// Full redesign vs v4: headline "Intelligence In. Optimal Decisions Out.",
// 8 icon+sparkline source cards flowing into the prism (sec2Anchor unchanged:
// 502/40, 468x572), an ACTIONABLE OUTPUTS signals card (5 rows), a 7-step
// pipeline strip with a system-status pill, and a 6-stat grid. Reveal is the
// v5 [data-reveal] mechanism (PrismHome.tsx runtime), not the old <Reveal>.
// The status timestamp "10:21:43 UTC" is design transcription, not live data.

import { useEffect, useState } from 'react';
import type { ReactNode, RefObject } from 'react';

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

type SignalRow = {
  key: string;
  badge: ReactNode;
  name: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  note: string;
  pct: string;
  pctColor: string;
};

const SIGNAL_ROWS: SignalRow[] = [
  {
    key: 'BTC',
    badge: <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', background: '#F7931A', fontSize: 14, fontWeight: 800, color: '#FFFFFF', flex: 'none' }}>&#8383;</span>,
    name: 'BTC', tag: 'OVERWEIGHT', tagColor: 'var(--accent-2)', tagBg: 'rgba(15,174,114,0.1)', note: 'Strong momentum', pct: '97%', pctColor: 'var(--accent)',
  },
  {
    key: 'ETH',
    badge: <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', background: '#8A93B2', fontSize: 14, fontWeight: 800, color: '#FFFFFF', flex: 'none' }}>&#926;</span>,
    name: 'ETH', tag: 'REDUCE EXPOSURE', tagColor: '#DC2626', tagBg: 'rgba(220,38,38,0.08)', note: 'Risk / reward deteriorating', pct: '92%', pctColor: '#DC2626',
  },
  {
    key: 'SOL',
    badge: <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', background: '#0B1220', fontSize: 13, fontWeight: 800, color: '#FFFFFF', flex: 'none' }}>S</span>,
    name: 'SOL', tag: 'ACCUMULATE', tagColor: 'var(--accent-2)', tagBg: 'rgba(15,174,114,0.1)', note: 'Breakout setup', pct: '81%', pctColor: 'var(--accent)',
  },
  {
    key: 'ROTATE',
    badge: (
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', background: '#F3F6F4', flex: 'none' }}>
        <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#0B1220" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h9l-2.5-2.5 M16 13H7l2.5 2.5" /></svg>
      </span>
    ),
    name: 'ROTATE', tag: 'ETH → SOL', tagColor: '#2563EB', tagBg: 'rgba(37,99,235,0.08)', note: 'Improve risk-adjusted return', pct: '76%', pctColor: '#2563EB',
  },
  {
    key: 'RISK',
    badge: (
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', background: '#F3F6F4', flex: 'none' }}>
        <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#0B1220" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2.5 16 5v5c0 3.8-2.6 6.5-6 7.5-3.4-1-6-3.7-6-7.5V5z" /></svg>
      </span>
    ),
    name: 'RISK', tag: 'MARKET NEUTRAL', tagColor: '#D97706', tagBg: 'rgba(217,119,6,0.09)', note: 'Volatility regime rising', pct: '71%', pctColor: '#D97706',
  },
];

const STATS = [
  { num: '14+', label: 'Data Sources', sub: 'Live & streaming' },
  { num: '32', label: 'AI Models', sub: 'Ensemble engine' },
  { num: '120+', label: 'Indicators', sub: 'Quant & on-chain' },
  { num: '1.2M+', label: 'Data Points / Min', sub: 'Processed real-time' },
  { num: '97%', label: 'Explainability', sub: 'Evidence coverage', accent: true },
  { num: '< 10s', label: 'Decision Latency', sub: 'End-to-end' },
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
      <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
        <div data-reveal="0" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(15,174,114,0.35)', background: '#FFFFFF', borderRadius: 999, padding: '7px 16px', fontSize: 11.5, fontWeight: 600, letterSpacing: '0.12em', color: 'var(--accent-2)', ...reveal }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
          THE PROBLEM
        </div>
        <h2 data-reveal="1" style={{ fontFamily: 'var(--font-heading)', margin: '18px 0 0', fontSize: 62, fontWeight: 800, lineHeight: 1.02, letterSpacing: '-0.02em', color: '#0B1220', ...reveal }}>
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
            {SIGNAL_ROWS.map((row, i) => {
              const lead = i === 0;
              return (
                <div key={row.key} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: lead ? '15px 15px' : '12px 15px', margin: lead ? '2px -15px 5px' : '0 -15px', borderRadius: lead ? 14 : 0, background: lead ? 'rgba(15,174,114,0.06)' : 'transparent', border: lead ? '1px solid rgba(15,174,114,0.25)' : 'none', borderBottom: !lead && i < SIGNAL_ROWS.length - 1 ? '1px solid #E7E9EC' : (lead ? '1px solid rgba(15,174,114,0.25)' : 'none') }}>
                  <div style={{ transform: lead ? 'scale(1.3)' : 'none', transformOrigin: 'center', flex: 'none' }}>{row.badge}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: lead ? 22 : 16, fontWeight: lead ? 800 : 700, color: '#0B1220' }}>{row.name}</span>
                      <span style={{ fontSize: lead ? 11 : 10, fontWeight: 700, letterSpacing: '0.06em', color: row.tagColor, background: row.tagBg, borderRadius: 5, padding: lead ? '4px 10px' : '3px 8px' }}>{row.tag}</span>
                    </div>
                    <div style={{ fontSize: lead ? 13 : 12, color: '#98A2B3', marginTop: 3 }}>{row.note}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: lead ? 32 : 18, fontWeight: 800, color: row.pctColor, letterSpacing: '-0.02em', lineHeight: 1 }}>{row.pct}</div>
                    <div style={{ fontSize: 10, color: '#98A2B3', marginTop: 3 }}>Confidence</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent-2)', cursor: 'pointer' }}>View all signals &#8594;</span>
          </div>
        </div>
      </div>

      {/* The 7-step pipeline strip + status pill were removed (2026-07-20): too
          much tiny jargon. Cutting them shortens the section so the fit-page
          zoom rises and all remaining text renders larger. */}

      <div data-reveal="9" style={{ width: '100%', margin: '30px auto 0', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16, ...reveal }}>
        {STATS.map((st) => (
          <div key={st.label} style={{ background: '#FFFFFF', border: '1px solid #E7E9EC', borderRadius: 16, padding: '22px 24px' }}>
            <div style={{ fontSize: 40, fontWeight: 800, color: st.accent ? 'var(--accent)' : '#0B1220', letterSpacing: '-0.025em', lineHeight: 1 }}>{st.num}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#0B1220', marginTop: 10 }}>{st.label}</div>
            <div style={{ fontSize: 12.5, color: '#98A2B3', marginTop: 2 }}>{st.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
