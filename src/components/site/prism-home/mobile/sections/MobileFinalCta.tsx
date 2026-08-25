// Mobile Home — Final CTA / FAQ / footer section.
//
// Ported verbatim from docs/superpowers/specs/reference/2026-07-18-mobile-design-v1.html
// lines 301-322: prism mark svg, gradient h2 (note the gradient's second
// stop here is #7FD8B4, distinct from the usual accent-2 #0B8D84 used
// elsewhere), stacked CTAs, FAQS accordion (state = { openFaq: 0 } per
// reference line 334; mark is the real minus sign '−' when open, per
// the faqs.map at lines 440-443), and the mini footer line (entities
// decoded: &#169; -> ©, &#183; -> ·).

import { useState } from 'react';
import { FAQS } from '../data';

export function MobileFinalCta() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section
      style={{
        padding: '54px 22px 30px', background: '#050B14',
        borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center',
      }}
    >
      <svg width={44} height={44} viewBox="0 0 30 30" fill="none" style={{ margin: '0 auto' }}>
        <path d="M15 2.5 25.8 8.75v12.5L15 27.5 4.2 21.25V8.75Z" stroke="#0FAE72" strokeWidth={1.5} strokeLinejoin="round" />
        <path d="M15 10.5 19 17h-8Z" stroke="#0B8D84" strokeWidth={1.2} strokeLinejoin="round" />
      </svg>

      <h2 style={{ margin: '20px 0 0', fontSize: 30, fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
        Turn fragmented markets into{' '}
        {/* Solid, not a background-clip gradient (gate 2 — no genre allows
            gradient text). This one also introduced #7FD8B4, a stop that
            appears nowhere else in the product. */}
        <span style={{ color: '#34D399' }}>
          explainable intelligence.
        </span>
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 26 }}>
        <button
          type="button"
          className="cta-early-access-trigger"
          style={{
            fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: '#050B14',
            background: '#FFFFFF', border: 'none', borderRadius: 14, padding: 16, cursor: 'pointer',
          }}
        >
          Launch Beta
        </button>
        <button
          type="button"
          className="cta-early-access-trigger"
          style={{
            fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: '#FFFFFF',
            background: 'transparent', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 14,
            padding: 15, cursor: 'pointer',
          }}
        >
          Request Demo
        </button>
      </div>

      {/* Each row was a <div onClick> — no role, no tabIndex, no key handler,
          so the whole FAQ was unreachable by keyboard and invisible to
          assistive tech. Now a real <button> with aria-expanded/aria-controls,
          which also gives it a focus ring and a 44px tap target for free.
          Kept as button+region rather than <details> because this section
          scrolls normally (unlike the desktop snap page), so leaving several
          open costs nothing and the existing single-open behaviour is
          preserved by the same openFaq state. */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 40, textAlign: 'left' }}>
        {FAQS.map((faq, i) => {
          const isOpen = openFaq === i;
          const panelId = `mfaq-panel-${i}`;
          return (
            <div key={faq.q} style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenFaq(isOpen ? -1 : i)}
                style={{
                  fontFamily: 'inherit', width: '100%', textAlign: 'left',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                  padding: '16px 2px', minHeight: 44, background: 'transparent', border: 0, cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: 13.5, fontWeight: 600, color: '#FFFFFF' }}>{faq.q}</span>
                <span aria-hidden="true" style={{ fontSize: 16, color: '#0FAE72', flex: 'none' }}>{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div id={panelId} style={{ fontSize: 12.5, lineHeight: 1.6, color: '#98A2B3', padding: '0 2px 16px' }}>
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 8, padding: '22px 0 8px', fontSize: 11, color: '#667085' }}>
        © 2026 CryptoPrism · Privacy · Terms
      </div>
    </section>
  );
}

export default MobileFinalCta;
