import React from 'react';
import { useReveal, useStaggerReveal } from './hooks';
import { TokenLedger } from './TokenLedger';

type IconKind = 'screener' | 'cross' | 'alerts' | 'token' | 'api' | 'mobile';

const FeatureIcon: React.FC<{ readonly kind: IconKind; readonly color: string }> = ({ kind, color }) => {
  const s = { stroke: color, strokeWidth: 1.6, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (kind) {
    case 'screener': return <svg width="20" height="20" viewBox="0 0 24 24"><path d="M3 6h18M6 12h12M9 18h6" {...s} /></svg>;
    case 'cross': return <svg width="20" height="20" viewBox="0 0 24 24"><circle cx="6" cy="12" r="3" {...s} /><circle cx="18" cy="12" r="3" {...s} /><path d="M9 12h6M12 6l-3 6 3 6M12 6l3 6-3 6" {...s} /></svg>;
    case 'alerts': return <svg width="20" height="20" viewBox="0 0 24 24"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9z" {...s} /><path d="M10 21h4" {...s} /></svg>;
    case 'token': return <svg width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" {...s} /><path d="M12 7v10M9 9.5h4.5a2 2 0 0 1 0 4H9M9 13.5h5a2 2 0 0 1 0 4H9" {...s} /></svg>;
    case 'api': return <svg width="20" height="20" viewBox="0 0 24 24"><path d="M8 8 4 12l4 4M16 8l4 4-4 4M14 5l-4 14" {...s} /></svg>;
    case 'mobile': return <svg width="20" height="20" viewBox="0 0 24 24"><rect x="7" y="3" width="10" height="18" rx="2" {...s} /><path d="M11 18h2" {...s} /></svg>;
    default: return null;
  }
};

interface Feature {
  readonly icon: IconKind;
  readonly name: string;
  readonly body: string;
  readonly color: string;
}

const FEATURES: readonly Feature[] = [
  { icon: 'screener', name: 'Composite Screener', body: 'Filter 1,000+ coins by DMV score, on-chain flows, and funding regime. Save and alert on any view.', color: '#0E7490' },
  { icon: 'cross', name: 'Cross-Chain Coverage', body: 'Six chains indexed in real time, feeding 130+ indicators into one query-ready pipeline.', color: '#0A8F5A' },
  { icon: 'alerts', name: 'Composite Alerts', body: 'Multi-condition alerts no other tool offers: "OI spike + whale outflow + funding inversion."', color: '#B45309' },
  { icon: 'token', name: 'Token Detail Pages', body: 'Every token gets a research-grade page: derivatives, on-chain, holder cohorts, AI commentary.', color: '#6D28D9' },
  { icon: 'api', name: 'API & Sheets Plug-in', body: 'Pull the full DMV score stack into your spreadsheets, notebooks, or trading bots.', color: '#C2410C' },
  { icon: 'mobile', name: 'Mobile-First', body: 'CryptoPrism lives on phones. Push intelligence, quick-glance scores, native chat — built for it.', color: '#4338CA' },
];

export const FeatureGrid: React.FC = () => {
  const ref = useReveal<HTMLElement>();
  const gridRef = useStaggerReveal<HTMLDivElement>({
    opacity: [0, 1],
    translateY: [22, 0],
    scale: [0.95, 1],
    duration: 650,
    ease: 'outExpo',
  }, 80);
  return (
    <section ref={ref} className="reveal" id="intelligence" style={{ padding: '120px 0' }}>
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
          <div style={{ maxWidth: 580 }}>
            <span className="label">CHAPTER 03 &middot; THE WORKBENCH</span>
            <h2 className="display" style={{ fontSize: 'clamp(36px,5vw,60px)', marginTop: 16 }}>The full kit.</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 360 }}>
            Six modules, one surface. Each one would be a standalone product elsewhere.
          </p>
        </div>

        <div ref={gridRef} className="feat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {FEATURES.map((f, i) => (
            <div key={f.name} className="feature-tile glass" style={{ padding: 28, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: f.color, opacity: 0.6 }} />
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${f.color}15`, border: `1px solid ${f.color}40`, display: 'grid', placeItems: 'center', marginBottom: 18 }}>
                <FeatureIcon kind={f.icon} color={f.color} />
              </div>
              <div className="mono" style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '.18em', marginBottom: 8 }}>0{i + 1}</div>
              <h4 style={{ fontSize: 19, fontWeight: 700, marginBottom: 8 }}>{f.name}</h4>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{f.body}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 64 }}>
          <TokenLedger />
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
