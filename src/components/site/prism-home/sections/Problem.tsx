// v5 "The Problem" (CryptoPrism Hero.dc.html v5, lines 106-249).
// Full redesign vs v4: headline "Intelligence In. Optimal Decisions Out.",
// 8 icon+sparkline source cards flowing into the prism (sec2Anchor unchanged:
// 502/40, 468x572), an ACTIONABLE OUTPUTS signals card (5 rows), a 7-step
// pipeline strip with a system-status pill, and a 6-stat grid. Reveal is the
// v5 [data-reveal] mechanism (PrismHome.tsx runtime), not the old <Reveal>.
// The status timestamp "10:21:43 UTC" is design transcription, not live data.

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

// flow curves (design lines 115-134): 8 source rows converge into the prism,
// one output curve feeds the signals card
const FLOWS = [
  { y1: 88, y2: 250, dur: 8.6, begin: -0.7 },
  { y1: 156, y2: 271, dur: 9.3, begin: -1.9 },
  { y1: 224, y2: 292, dur: 8.2, begin: -3.1 },
  { y1: 292, y2: 313, dur: 9.7, begin: -4.3 },
  { y1: 360, y2: 334, dur: 8.9, begin: -5.5 },
  { y1: 428, y2: 355, dur: 9.5, begin: -6.7 },
  { y1: 496, y2: 376, dur: 8.4, begin: -7.9 },
  { y1: 564, y2: 397, dur: 9.1, begin: -9.1 },
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

const PIPELINE: { label: string; sub: string; icon: ReactNode }[] = [
  {
    label: 'Normalize', sub: 'Clean & unify',
    icon: (
      <>
        <ellipse cx="10" cy="5" rx="6.5" ry="2.5" />
        <path d="M3.5 5v10c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5V5 M3.5 10c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5" />
      </>
    ),
  },
  { label: 'Features', sub: '120+ factors', icon: <path d="M10 3v3 M10 14v3 M3 10h3 M14 10h3 M5.4 5.4l2 2 M12.6 12.6l2 2 M14.6 5.4l-2 2 M7.4 12.6l-2 2" /> },
  { label: 'Factor Models', sub: 'Cross-asset', icon: <path d="M4 16V9 M10 16V4 M16 16v-5" /> },
  { label: 'Regime', sub: 'Market state', icon: <path d="M2.5 12c2-5 4-5 6 0s4 5 6 0 3-3.5 3-3.5" /> },
  { label: 'Ensemble', sub: '32 AI models', icon: <path d="M10 3a4 4 0 0 1 4 4c1.7.4 3 1.9 3 3.8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4c0-1.9 1.3-3.4 3-3.8a4 4 0 0 1 4-4z M10 7v4 M8 9.5h4" /> },
  {
    label: 'Optimize', sub: 'Risk-aware',
    icon: (
      <>
        <circle cx="10" cy="10" r="7" />
        <circle cx="10" cy="10" r="3.5" />
        <circle cx="10" cy="10" r="0.8" fill="var(--accent-2)" />
      </>
    ),
  },
  { label: 'Explain', sub: 'Evidence chain', icon: <path d="M4 3.5h9l3 3v10H4z M13 3.5v3h3 M7 10h6 M7 13h4" /> },
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

export function ProblemSection({ anchorRef }: { anchorRef: RefObject<HTMLDivElement | null> }) {
  return (
    <section
      data-page=""
      style={{
        position: 'relative', padding: '56px 44px 48px',
        background: 'radial-gradient(1000px 640px at 50% 42%, rgba(15,174,114,0.045), rgba(250,250,248,0) 70%), #FAFAF8',
      }}
    >
      <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
        <div data-reveal="0" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(15,174,114,0.35)', background: '#FFFFFF', borderRadius: 999, padding: '7px 16px', fontSize: 11.5, fontWeight: 600, letterSpacing: '0.12em', color: 'var(--accent-2)', ...reveal }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
          THE PROBLEM
        </div>
        <h2 data-reveal="1" style={{ fontFamily: 'var(--font-heading)', margin: '26px 0 0', fontSize: 62, fontWeight: 800, lineHeight: 1.02, letterSpacing: '-0.02em', color: '#0B1220', ...reveal }}>
          Intelligence In.{' '}
          <span style={{ background: 'linear-gradient(120deg, var(--accent) 20%, var(--accent-2) 85%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Optimal Decisions Out.
          </span>
        </h2>
        <p data-reveal="2" style={{ margin: '20px auto 0', maxWidth: 680, fontSize: 20, fontWeight: 400, lineHeight: 1.5, color: '#475467', ...reveal }}>
          Institutional-grade research that continuously synthesizes macro, on-chain, derivatives and sentiment into explainable, risk-aware decisions.
        </p>
      </div>

      <div style={{ position: 'relative', width: 1472, height: 660, margin: '36px auto 0' }}>
        <svg data-reveal="6" width="1472" height="660" viewBox="0 0 1472 660" fill="none" style={{ position: 'absolute', inset: 0, ...reveal }}>
          {FLOWS.map((f) => (
            <path key={f.y1} d={`M254,${f.y1} C430,${f.y1} 450,${f.y2} 630,${f.y2}`} stroke="rgba(15,174,114,0.26)" strokeWidth="1" />
          ))}
          <path d="M882,355 C960,355 980,348 1056,348" stroke="rgba(15,174,114,0.35)" strokeWidth="1.2" />
          {FLOWS.map((f) => (
            <circle key={f.y1} cx="254" cy={f.y1} r="3" fill="var(--accent)" />
          ))}
          <circle cx="1056" cy="348" r="3.5" fill="var(--accent)" />
          {FLOWS.map((f) => (
            <circle key={`m${f.y1}`} r="2.4" fill="var(--accent)" opacity="0.9">
              <animateMotion dur={`${f.dur}s`} begin={`${f.begin}s`} repeatCount="indefinite" path={`M254,${f.y1} C430,${f.y1} 450,${f.y2} 630,${f.y2}`} />
            </circle>
          ))}
          <circle r="2.6" fill="var(--accent)" opacity="0.9">
            <animateMotion dur="5.5s" begin="-1.2s" repeatCount="indefinite" path="M882,355 C960,355 980,348 1056,348" />
          </circle>
        </svg>

        <div style={{ position: 'absolute', left: 0, top: 60, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {SOURCE_CARDS.map((s, i) => (
            <div key={s.label} data-reveal={i} style={{ display: 'flex', alignItems: 'center', gap: 11, width: 250, height: 56, boxSizing: 'border-box', padding: '0 14px', background: '#FFFFFF', border: '1px solid #E7E9EC', borderRadius: 14, boxShadow: '0 6px 18px rgba(11,18,32,0.05)', ...reveal }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 8, background: '#F3F6F4', flex: 'none' }}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke={s.iconStroke || 'var(--accent-2)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {s.icon}
                </svg>
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0B1220' }}>{s.label}</div>
                <div style={{ fontSize: 10, color: '#98A2B3' }}>{s.sub}</div>
              </div>
              <svg width="44" height="18" viewBox="0 0 44 18" fill="none">{s.spark}</svg>
            </div>
          ))}
        </div>

        <div ref={anchorRef} style={{ position: 'absolute', left: 502, top: 40, width: 468, height: 572 }} />

        <div data-reveal="8" style={{ position: 'absolute', left: 1062, top: 110, width: 410, boxSizing: 'border-box', background: '#FFFFFF', border: '1px solid #E7E9EC', borderRadius: 22, padding: '26px 28px', boxShadow: '0 16px 44px rgba(11,18,32,0.07)', ...reveal }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--accent-2)' }}>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="var(--accent-2)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2.5 4 11.5h5L8 17.5l7-9h-5z" /></svg>
            ACTIONABLE OUTPUTS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 4 }}>
            {SIGNAL_ROWS.map((row, i) => (
              <div key={row.key} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < SIGNAL_ROWS.length - 1 ? '1px solid #E7E9EC' : 'none' }}>
                {row.badge}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14.5, fontWeight: 700, color: '#0B1220' }}>{row.name}</span>
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', color: row.tagColor, background: row.tagBg, borderRadius: 5, padding: '3px 7px' }}>{row.tag}</span>
                  </div>
                  <div style={{ fontSize: 10.5, color: '#98A2B3', marginTop: 2 }}>{row.note}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: row.pctColor }}>{row.pct}</div>
                  <div style={{ fontSize: 9, color: '#98A2B3' }}>Confidence</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: 1, background: '#E7E9EC' }} />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent-2)', cursor: 'pointer' }}>View all signals &#8594;</span>
          </div>
        </div>
      </div>

      <div data-reveal="9" style={{ maxWidth: 900, margin: '6px auto 0', ...reveal }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          {PIPELINE.map((step, i) => (
            <div key={step.label} style={{ display: 'contents' }}>
              {i > 0 && (
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" style={{ flex: 'none', marginTop: -22 }}>
                  <path d="M1 5h11 M9 1.5 12.5 5 9 8.5" stroke="#D4D9DE" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, width: 96 }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 11, background: '#FFFFFF', border: '1px solid #E7E9EC' }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="var(--accent-2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {step.icon}
                  </svg>
                </span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#0B1220' }}>{step.label}</span>
                <span style={{ fontSize: 8.5, color: '#98A2B3', marginTop: -3 }}>{step.sub}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, marginTop: 14, padding: '9px 22px', background: '#FFFFFF', border: '1px solid #E7E9EC', borderRadius: 999, width: 'fit-content', marginLeft: 'auto', marginRight: 'auto', fontSize: 10.5, color: '#475467' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)' }} />
            <b style={{ color: '#0B1220' }}>System Status</b> All systems operational
          </span>
          <span style={{ color: '#D4D9DE' }}>|</span>
          <span>Last updated 10:21:43 UTC</span>
          <span style={{ color: '#D4D9DE' }}>|</span>
          <span style={{ color: 'var(--accent-2)', fontWeight: 600 }}>Updated every minute</span>
        </div>
      </div>

      <div data-reveal="10" style={{ maxWidth: 1472, margin: '30px auto 0', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14, ...reveal }}>
        {STATS.map((st) => (
          <div key={st.label} style={{ background: '#FFFFFF', border: '1px solid #E7E9EC', borderRadius: 16, padding: '16px 18px' }}>
            <div style={{ fontSize: 23, fontWeight: 800, color: st.accent ? 'var(--accent)' : '#0B1220', letterSpacing: '-0.02em' }}>{st.num}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#0B1220', marginTop: 3 }}>{st.label}</div>
            <div style={{ fontSize: 10.5, color: '#98A2B3' }}>{st.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
