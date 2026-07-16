import type { RefObject } from 'react';
import { useIsMobile } from '../hooks';

const SOURCE_BADGES = [
  { label: 'News', d: 'M5 2.5h7l3.5 3.5v11.5H5z M12 2.5V6h3.5 M7.5 10h5 M7.5 13h5' },
  { label: 'On-chain Data', d: 'M10 2.5 16 6v8l-6 3.5L4 14V6z M10 9.8V17.5 M4 6l6 3.8 6-3.8' },
  { label: 'Macro', d: 'M10 10a7.5 7.5 0 1 1 0 0Z M2.5 10h15 M10 2.5c-2.5 2.2-2.5 12.8 0 15 M10 2.5c2.5 2.2 2.5 12.8 0 15' },
  { label: 'Sentiment', d: 'M10 10a7.5 7.5 0 1 1 0 0Z M7 8h.01 M13 8h.01 M6.8 12c.9 1.1 2 1.7 3.2 1.7s2.3-.6 3.2-1.7' },
  { label: 'Exchange Data', d: 'M4 16.5V10 M8 16.5V6 M12 16.5V8.5 M16 16.5V4' },
  { label: 'Developer Activity', d: 'M7 6.5 3.5 10 7 13.5 M13 6.5 16.5 10 13 13.5' },
  { label: 'ETF Flows', d: 'M10 2.5a7.5 7.5 0 1 0 7.5 7.5H10z M12.5 2.9a7.5 7.5 0 0 1 4.6 4.6h-4.6z' },
  { label: 'Economic Calendar', d: 'M2.5 4.5h15v13h-15z M6.5 2.5v4 M13.5 2.5v4 M2.5 9h15' },
];

// per-badge curve endpoints and animation timings — reference lines 71-89
const FLOW_PATHS = [
  { y1: 43, y2: 232, dur: 8.5, begin: -0.4 },
  { y1: 99, y2: 246, dur: 9.2, begin: -1.6 },
  { y1: 155, y2: 260, dur: 8.1, begin: -2.9 },
  { y1: 211, y2: 274, dur: 9.6, begin: -4.1 },
  { y1: 267, y2: 288, dur: 8.8, begin: -5.3 },
  { y1: 323, y2: 302, dur: 9.4, begin: -6.5 },
  { y1: 379, y2: 316, dur: 8.3, begin: -7.7 },
  { y1: 435, y2: 330, dur: 9.0, begin: -8.9 },
];

const TRUST_ROW = ['No credit card', 'Private Beta', 'Enterprise Ready'];

const RESULT_CARDS = [
  {
    color: '#0FAE72', title: 'High Conviction Signal', delay: '0s', duration: '9s',
    body: (
      <>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 14 }}>
          <span style={{ fontSize: 19, fontWeight: 700, color: '#0B1220' }}>Bitcoin</span>
          <span style={{ fontSize: 24, fontWeight: 800, color: '#0FAE72' }}>97%</span>
        </div>
        <div style={{ fontSize: 12, color: '#98A2B3', marginTop: 2 }}>Confidence</div>
        <ul style={{ listStyle: 'none', margin: '14px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 7, fontSize: 13, color: '#475467' }}>
          <li>Strong ETF inflows</li>
          <li>Positive macro</li>
          <li>Developer momentum</li>
        </ul>
      </>
    ),
  },
  {
    color: '#D97706', title: 'Risk Alert', delay: '1.8s', duration: '11s',
    body: (
      <>
        <div style={{ fontSize: 19, fontWeight: 700, color: '#0B1220', marginTop: 14 }}>ETH</div>
        <ul style={{ listStyle: 'none', margin: '16px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 7, fontSize: 13, color: '#475467' }}>
          <li>Funding elevated</li>
          <li>Volatility increasing</li>
        </ul>
      </>
    ),
  },
  {
    color: '#7C3AED', title: 'Research Summary', delay: '3.5s', duration: '10s',
    body: (
      <ul style={{ listStyle: 'none', margin: '16px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 7, fontSize: 13, color: '#475467' }}>
        <li>Generated in 8 seconds</li>
        <li>Explainable</li>
        <li>Sources verified</li>
      </ul>
    ),
  },
];

export function Hero({ anchorRef }: { anchorRef: RefObject<HTMLDivElement | null> }) {
  const isMobile = useIsMobile();

  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'radial-gradient(1100px 700px at 68% 30%, rgba(15,174,114,0.05), rgba(250,250,248,0) 70%), #FAFAF8' }}>
      <div className="prism-wrap" style={{ position: 'relative', padding: '72px 0 56px', display: 'flex', gap: 56, alignItems: 'center', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
        <div style={{ flex: isMobile ? '1 1 100%' : '0 0 44%', maxWidth: isMobile ? '100%' : 640 }}>
          <div className="prism-pill"><span className="prism-pill__dot" />Now in Private Beta</div>
          <h1 style={{ margin: '28px 0 0', fontSize: isMobile ? 44 : 78, fontWeight: 800, lineHeight: 0.98, letterSpacing: '-0.02em', color: '#0B1220' }}>
            AI-Native Financial Intelligence for <span className="prism-grad-text">Modern Markets.</span>
          </h1>
          <p style={{ margin: '30px 0 0', fontSize: 22, fontWeight: 400, lineHeight: 1.45, color: '#475467' }}>
            Starting with digital assets.<br />Expanding across global financial markets.
          </p>
          <p style={{ margin: '22px 0 0', maxWidth: 560, fontSize: 16.5, lineHeight: 1.6, color: '#475467' }}>
            CryptoPrism transforms fragmented financial data into explainable investment intelligence using AI-powered reasoning, quantitative models, and autonomous research agents.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 28, marginTop: 26 }}>
            {TRUST_ROW.map((label) => (
              <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 500, color: '#475467' }}>
                <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke="#0FAE72" strokeWidth="1.5" /><path d="M6.8 10.2l2.1 2.1 4.3-4.5" stroke="#0FAE72" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                {label}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, marginTop: 34 }}>
            <button className="prism-btn-primary cta-early-access-trigger">
              Request Early Access
              <svg width="16" height="14" viewBox="0 0 16 14" fill="none"><path d="M1 7h13M9.5 1.8 14.7 7l-5.2 5.2" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button className="prism-btn-ghost cta-early-access-trigger">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8.5" stroke="#0B1220" strokeWidth="1.5" /><path d="M8.3 7.2v5.6L12.8 10Z" fill="#0B1220" /></svg>
              Request a Demo
            </button>
          </div>
        </div>

        {!isMobile && (
          <div style={{ flex: 1, minWidth: 790 }}>
            <div style={{ position: 'relative', width: 790, height: 505 }}>
              <svg width="790" height="505" viewBox="0 0 790 505" fill="none" style={{ position: 'absolute', inset: 0 }}>
                {FLOW_PATHS.map((p, i) => (
                  <g key={i}>
                    <path d={`M180,${p.y1} C310,${p.y1} 300,${p.y2} 404,${p.y2}`} stroke="rgba(15,174,114,0.26)" strokeWidth={1} />
                    <circle cx={180} cy={p.y1} r={3} fill="#0FAE72" />
                    <circle r={2.4} fill="#0FAE72" opacity={0.9}>
                      <animateMotion dur={`${p.dur}s`} begin={`${p.begin}s`} repeatCount="indefinite" path={`M180,${p.y1} C310,${p.y1} 300,${p.y2} 404,${p.y2}`} />
                    </circle>
                  </g>
                ))}
              </svg>

              <div style={{ position: 'absolute', left: 0, top: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {SOURCE_BADGES.map((b) => (
                  <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 10, width: 176, height: 46, boxSizing: 'border-box', padding: '0 14px', background: '#FFFFFF', border: '1px solid #E7E9EC', borderRadius: 12, boxShadow: '0 4px 14px rgba(11,18,32,0.04)', fontSize: 13, fontWeight: 500, color: '#0B1220' }}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#475467" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={b.d} /></svg>
                    {b.label}
                  </div>
                ))}
              </div>

              <div ref={anchorRef} style={{ position: 'absolute', left: 250, top: 30, width: 360, height: 440 }} />

              <div style={{ position: 'absolute', left: 622, top: 215, width: 168 }}>
                <div style={{ fontSize: 21, fontWeight: 700, letterSpacing: '-0.015em', color: '#0B1220', lineHeight: 1.25 }}>CryptoPrism<br />Intelligence Engine</div>
                <div style={{ width: 40, height: 1, background: '#E7E9EC', margin: '14px 0' }} />
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', color: '#98A2B3', fontFamily: "'SF Mono', 'Menlo', monospace" }}>AI MODELS &middot; AGENTS &middot; REASONING</div>
              </div>
            </div>
          </div>
        )}

        {isMobile && <div ref={anchorRef} style={{ position: 'absolute', left: '50%', top: 0, width: 200, height: 240, transform: 'translateX(-50%)', pointerEvents: 'none' }} />}

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: 20, marginTop: 10, width: '100%' }}>
          {RESULT_CARDS.map((c) => (
            <div key={c.title} className="prism-card" style={{ padding: '22px 24px', animation: `prism-card-float ${c.duration} ease-in-out ${c.delay} infinite` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 14, fontWeight: 600, color: c.color }}>{c.title}</div>
              {c.body}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
