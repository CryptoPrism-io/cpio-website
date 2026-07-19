// Mobile Home — "Bias to Discipline" sticky ledger section.
//
// Ported verbatim from docs/superpowers/specs/reference/2026-07-18-mobile-design-v1.html
// lines 89-114: header ("THE BIAS TAX"), LEDGER.map (3 rows, each a
// `position: sticky` wrapper at `row.top` producing the stacking-cards
// scroll effect — later cards scroll up and pin above/over earlier ones),
// closing tagline.
//
// The header copy says "four most expensive instincts" while LEDGER has
// exactly 3 rows — that mismatch is in the source design itself; transcribed
// as-is per the plan's Self-Review Notes, not "fixed".

import { LEDGER } from '../data';

export function MobileBiasLedger() {
  return (
    <section style={{ position: 'relative', padding: '52px 22px 56px', background: '#FAFAF8' }}>
      <div
        data-reveal
        style={{
          opacity: 0, transform: 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', color: '#0B8D84' }}>
          THE BIAS TAX
        </div>
        <h2 style={{ margin: '12px 0 0', fontSize: 30, fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.025em' }}>
          Every portfolio pays a tax on emotion.
        </h2>
        <p style={{ margin: '12px 0 0', maxWidth: 320, fontSize: 14, lineHeight: 1.55, color: '#475467' }}>
          Prism replaces the four most expensive instincts in investing with something better.
        </p>
      </div>

      <div style={{ marginTop: 26 }}>
        {LEDGER.map((row) => (
          <div key={row.num} style={{ position: 'sticky', top: row.top, marginBottom: 18 }}>
            <div
              style={{
                position: 'relative', overflow: 'hidden', borderRadius: 24, padding: '28px 24px 30px',
                minHeight: 240, boxSizing: 'border-box', background: row.bg, border: `1px solid ${row.border}`,
                boxShadow: '0 22px 50px rgba(11,18,32,0.16)',
              }}
            >
              <div
                style={{
                  position: 'absolute', right: -14, top: -30, fontSize: 150, fontWeight: 800,
                  letterSpacing: '-0.05em', lineHeight: 1, color: row.numInk, pointerEvents: 'none',
                }}
              >
                {row.num}
              </div>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 10.5, fontWeight: 600,
                    letterSpacing: '0.1em', color: row.tagInk, border: `1px solid ${row.tagBorder}`,
                    borderRadius: 999, padding: '5px 11px',
                  }}
                >
                  {row.tag}
                </div>
                <div style={{ marginTop: 44, fontSize: 14, fontWeight: 500, color: row.biasInk, textDecoration: 'line-through' }}>
                  {row.bias}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
                  <svg width={16} height={14} viewBox="0 0 16 14" fill="none" style={{ flex: 'none' }}>
                    <path d="M1 7h12 M9 2l5 5-5 5" stroke={row.arrow} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', color: row.ink }}>
                    {row.to}
                  </span>
                </div>
                <p style={{ margin: '12px 0 0', maxWidth: 280, fontSize: 13.5, lineHeight: 1.6, color: row.sub }}>
                  {row.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p
        data-reveal
        style={{
          margin: '24px 0 0', fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', color: '#0B1220',
          opacity: 0, transform: 'translateY(20px)',
          transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
        }}
      >
        The discipline of an institution, <span style={{ color: '#0B8D84' }}>built into every decision.</span>
      </p>
    </section>
  );
}

export default MobileBiasLedger;
