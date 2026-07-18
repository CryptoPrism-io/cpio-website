// Mobile Home — Enterprise section.
//
// Ported verbatim from docs/superpowers/specs/reference/2026-07-18-mobile-design-v1.html
// lines 285-299: dark grid-texture section (two linear-gradients + 39px
// background-size over #050B14), data-reveal header, data-reveal 2-col
// TRUST.map grid.

import { TRUST } from '../data';

export function MobileEnterprise() {
  return (
    <section
      style={{
        position: 'relative', padding: '48px 22px',
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
        backgroundSize: '39px 39px', backgroundColor: '#050B14',
      }}
    >
      <div
        data-reveal
        style={{
          textAlign: 'center', opacity: 0, transform: 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', color: '#0FAE72' }}>
          ENTERPRISE
        </div>
        <h2 style={{ margin: '12px 0 0', fontSize: 28, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
          Built for institutions.
        </h2>
        <p style={{ margin: '12px auto 0', maxWidth: 300, fontSize: 13.5, lineHeight: 1.55, color: '#98A2B3' }}>
          One intelligence layer for funds, research teams, and fintechs.
        </p>
      </div>

      <div
        data-reveal
        style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, marginTop: 24,
          opacity: 0, transform: 'translateY(20px)',
          transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
        }}
      >
        {TRUST.map((t) => (
          <div
            key={t.name}
            style={{
              display: 'flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '13px 12px',
            }}
          >
            <svg width={15} height={15} viewBox="0 0 20 20" fill="none" stroke="#0FAE72" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}>
              <path d={t.icon} />
            </svg>
            <span style={{ fontSize: 11.5, fontWeight: 600, color: '#E7E9EC' }}>{t.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MobileEnterprise;
