// Mobile Home — The Problem section.
//
// Ported verbatim from docs/superpowers/specs/reference/2026-07-18-mobile-design-v1.html
// lines 59-87: header block, 8 SOURCES chips, down arrow, the "One
// Explainable Decision" card (97% Confidence), closing tagline.
//
// Every `data-reveal` element keeps its inline initial opacity/transform/
// transition styles verbatim (including the reference's non-sequential
// per-element delays: header 0s, chips 0.1s, arrow 0.2s, card 0.3s, closing
// tagline 0.15s) — the shell's IntersectionObserver (PrismMobileHome.tsx)
// flips opacity to 1 / transform to none on scroll into view.

import { SOURCES } from '../data';

export function MobileProblem() {
  return (
    <section
      style={{
        padding: '48px 22px', background: '#FFFFFF',
        borderTop: '1px solid #E7E9EC', borderBottom: '1px solid #E7E9EC',
      }}
    >
      <div
        data-reveal
        style={{
          textAlign: 'center', opacity: 0, transform: 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', color: '#0B8D84' }}>
          THE PROBLEM
        </div>
        <h2 style={{ margin: '12px 0 0', fontSize: 28, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Every decision begins in chaos.
        </h2>
        <p style={{ margin: '12px auto 0', maxWidth: 300, fontSize: 14, lineHeight: 1.55, color: '#475467' }}>
          Too many signals. Too little <span style={{ color: '#0FAE72', fontWeight: 700 }}>conviction.</span>
        </p>
      </div>

      <div
        data-reveal
        style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginTop: 24,
          opacity: 0, transform: 'translateY(20px)',
          transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
        }}
      >
        {SOURCES.map((s) => (
          <span
            key={s.name}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 600,
              color: '#0B1220', background: '#FAFAF8', border: '1px solid #E7E9EC', borderRadius: 999,
              padding: '7px 13px',
            }}
          >
            <svg width={12} height={12} viewBox="0 0 20 20" fill="none" stroke="#475467" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d={s.icon} />
            </svg>
            {s.name}
          </span>
        ))}
      </div>

      <div
        data-reveal
        style={{
          display: 'flex', justifyContent: 'center', marginTop: 18,
          opacity: 0, transform: 'translateY(20px)',
          transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
        }}
      >
        <svg width={14} height={30} viewBox="0 0 14 30" fill="none">
          <path d="M7 0v26 M2 22l5 5.5 5-5.5" stroke="#0FAE72" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div
        data-reveal
        style={{
          margin: '14px auto 0', maxWidth: 330, background: '#FFFFFF', border: '1px solid #E7E9EC',
          borderRadius: 18, padding: '18px 20px', boxShadow: '0 14px 34px rgba(11,18,32,0.07)',
          opacity: 0, transform: 'translateY(20px)',
          transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width={26} height={26} viewBox="0 0 30 30" fill="none">
            <path d="M15 2.5 25.8 8.75v12.5L15 27.5 4.2 21.25V8.75Z" stroke="#0FAE72" strokeWidth={1.8} strokeLinejoin="round" />
            <path d="M15 10.5 19 17h-8Z" stroke="#0B8D84" strokeWidth={1.5} strokeLinejoin="round" />
          </svg>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 13.5, fontWeight: 700 }}>One Explainable Decision</div>
            <div style={{ fontSize: 11, color: '#475467' }}>Evidence · Probability · Reasoning</div>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#0FAE72' }}>97%</div>
            <div style={{ fontSize: 9.5, color: '#98A2B3' }}>Confidence</div>
          </div>
        </div>
      </div>

      <p
        data-reveal
        style={{
          margin: '26px auto 0', maxWidth: 300, textAlign: 'center', fontSize: 17, fontWeight: 700,
          lineHeight: 1.35, letterSpacing: '-0.01em',
          opacity: 0, transform: 'translateY(20px)',
          transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
        }}
      >
        Markets don’t lack information.{' '}
        <span
          style={{
            background: 'linear-gradient(120deg, #0FAE72 20%, #0B8D84 85%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}
        >
          They lack understanding.
        </span>
      </p>
    </section>
  );
}

export default MobileProblem;
