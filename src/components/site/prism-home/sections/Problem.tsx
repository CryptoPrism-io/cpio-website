import type { RefObject } from 'react';
import { Reveal } from '../../shared';
import { useIsMobile } from '../hooks';

const SOURCES = [
  { label: 'News', trend: 'flat' as const },
  { label: 'On-chain', trend: 'up' as const },
  { label: 'Macro', trend: 'up' as const },
  { label: 'ETF Flows', trend: 'up' as const },
  { label: 'Derivatives', trend: 'up' as const },
  { label: 'Research PDFs', trend: 'flat' as const },
  { label: 'Developer Activity', trend: 'up' as const },
  { label: 'Sentiment', trend: 'mixed' as const },
];

const RESULT_REASONS = ['ETF inflows accelerating', 'Macro supportive', 'Stablecoin accumulation', 'Developer momentum improving', 'Funding remains healthy'];
const RESULT_SOURCES = ['News', 'Macro', 'On-chain', 'ETF', 'Dev Activity', 'Research'];

function ResultCard() {
  return (
    <div className="prism-card" style={{ padding: '26px 28px', maxWidth: 410, boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <svg width="34" height="34" viewBox="0 0 30 30" fill="none"><path d="M15 2.5 25.8 8.75v12.5L15 27.5 4.2 21.25V8.75Z" stroke="#0FAE72" strokeWidth="1.8" strokeLinejoin="round" /><path d="M15 10.5 19 17h-8Z" stroke="#0B8D84" strokeWidth="1.5" strokeLinejoin="round" /></svg>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', color: '#0B1220', lineHeight: 1.25 }}>CryptoPrism<br />Intelligence Workspace</div>
          <div style={{ fontSize: 13.5, color: '#475467', marginTop: 5 }}>One Explainable Decision.</div>
        </div>
      </div>
      <div style={{ height: 1, background: '#E7E9EC', margin: '20px 0' }} />
      <div style={{ display: 'flex', gap: 22 }}>
        <div style={{ flex: 'none', paddingRight: 22, borderRight: '1px solid #E7E9EC' }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#475467' }}>Confidence</div>
          <div style={{ fontSize: 38, fontWeight: 800, color: '#0FAE72', letterSpacing: '-0.02em', marginTop: 6 }}>97%</div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#475467', marginBottom: 9 }}>Reasoning</div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 7, fontSize: 12.5, color: '#475467' }}>
            {RESULT_REASONS.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </div>
      </div>
      <div style={{ height: 1, background: '#E7E9EC', margin: '20px 0 16px' }} />
      <div style={{ fontSize: 12, fontWeight: 500, color: '#475467' }}>Sources</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 9 }}>
        {RESULT_SOURCES.map((s) => (
          <span key={s} style={{ fontSize: 11, fontWeight: 500, color: '#475467', border: '1px solid #E7E9EC', borderRadius: 7, padding: '4px 9px' }}>{s}</span>
        ))}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: '#0B1220', lineHeight: 1.5, marginTop: 20 }}>
        Not another dashboard.<br /><span style={{ color: '#0B8D84' }}>An intelligence engine.</span>
      </div>
    </div>
  );
}

export function ProblemSection({ anchorRef }: { anchorRef: RefObject<HTMLDivElement | null> }) {
  const isMobile = useIsMobile();

  return (
    <section data-page="" style={{ position: 'relative', padding: '56px 0 48px', background: 'radial-gradient(1000px 640px at 50% 42%, rgba(15,174,114,0.045), rgba(250,250,248,0) 70%), #FAFAF8' }}>
      <div className="prism-wrap">
        <Reveal>
          <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
            <div className="prism-pill"><span className="prism-pill__dot" />THE PROBLEM</div>
            <h2 style={{ margin: '26px 0 0', fontSize: isMobile ? 36 : 62, lineHeight: 1.02, color: '#0B1220' }}>Every investment decision begins in chaos.</h2>
            <p style={{ margin: '20px 0 0', fontSize: 25, fontWeight: 500, color: '#475467' }}>Too many signals. Too little <span style={{ color: '#0FAE72', fontWeight: 700 }}>conviction.</span></p>
            <p style={{ margin: '26px auto 0', maxWidth: 660, fontSize: 16.5, lineHeight: 1.6, color: '#475467' }}>
              Every day, investors jump between news, on-chain analytics, macro reports, derivatives, research PDFs, social sentiment, GitHub activity, ETF flows, and spreadsheets.
            </p>
            <p style={{ margin: '14px auto 0', maxWidth: 620, fontSize: 16.5, lineHeight: 1.6, color: '#475467' }}>
              Every new source adds information&mdash;but removes context.<br />By the time a decision is made, conviction has already disappeared.
            </p>
          </div>
        </Reveal>

        {!isMobile ? (
          <div style={{ position: 'relative', width: '100%', maxWidth: 1472, height: 660, margin: '36px auto 0' }}>
            <div style={{ position: 'absolute', left: 0, top: 60, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {SOURCES.map((s) => <Reveal key={s.label}><SourceRow label={s.label} /></Reveal>)}
            </div>
            <div ref={anchorRef} style={{ position: 'absolute', left: 502, top: 40, width: 468, height: 572 }} />
            <div style={{ position: 'absolute', left: 1062, top: 110 }}>
              <Reveal><ResultCard /></Reveal>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 36 }}>
            {SOURCES.map((s) => <SourceRow key={s.label} label={s.label} />)}
            <div ref={anchorRef} style={{ width: '100%', height: 1 }} />
            <ResultCard />
          </div>
        )}

        <Reveal>
          <div style={{ maxWidth: 760, margin: '60px auto 0', textAlign: 'center' }}>
            <h3 style={{ margin: 0, fontSize: isMobile ? 28 : 44, lineHeight: 1.1, color: '#0B1220' }}>
              Markets don&rsquo;t lack information.<br /><span className="prism-grad-text">They lack understanding.</span>
            </h3>
            <p style={{ margin: '20px auto 0', maxWidth: 480, fontSize: 16.5, lineHeight: 1.6, color: '#475467' }}>
              CryptoPrism transforms fragmented market signals into explainable investment intelligence.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SourceRow({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, width: 250, height: 56, boxSizing: 'border-box', padding: '0 14px', background: '#FFFFFF', border: '1px solid #E7E9EC', borderRadius: 14, boxShadow: '0 6px 18px rgba(11,18,32,0.05)' }}>
      <span style={{ fontSize: 13.5, fontWeight: 600, color: '#0B1220', flex: 1 }}>{label}</span>
    </div>
  );
}
