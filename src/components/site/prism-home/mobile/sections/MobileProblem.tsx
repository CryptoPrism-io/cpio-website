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
import type { Source } from '../data';

// 2026-07-19 layout deviation from the verbatim port (user request): the 8
// signal chips now SURROUND the decision card — four above, four below, with
// arrows converging into it from both sides — instead of one cluster above.
// Slight per-chip rotations give the clusters a "chaos" feel that the crisp,
// gradient-bordered card resolves.

const CHIP_TILT = [-2.5, 1.8, -1.2, 2.2];

function ChipCluster({ chips, delay }: { chips: Source[]; delay: number }) {
  return (
    <div
      data-reveal
      style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px 8px',
        opacity: 0, transform: 'translateY(20px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {chips.map((s, i) => (
        <span
          key={s.name}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 600,
            color: '#0B1220', background: '#FAFAF8', border: '1px solid #E7E9EC', borderRadius: 999,
            padding: '7px 13px', transform: `rotate(${CHIP_TILT[i % CHIP_TILT.length]}deg)`,
            boxShadow: '0 4px 12px rgba(11,18,32,0.04)',
          }}
        >
          <svg width={12} height={12} viewBox="0 0 20 20" fill="none" stroke="#475467" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
            <path d={s.icon} />
          </svg>
          {s.name}
        </span>
      ))}
    </div>
  );
}

function ConvergeArrow({ direction, delay }: { direction: 'down' | 'up'; delay: number }) {
  return (
    <div
      data-reveal
      style={{
        display: 'flex', justifyContent: 'center', margin: '14px 0',
        opacity: 0, transform: 'translateY(20px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      <svg width={14} height={26} viewBox="0 0 14 26" fill="none" style={direction === 'up' ? { transform: 'rotate(180deg)' } : undefined}>
        <path d="M7 0v22 M2 18l5 5.5 5-5.5" stroke="#0FAE72" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

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

      <div style={{ marginTop: 24 }}>
        <ChipCluster chips={SOURCES.slice(0, 4)} delay={0.1} />
      </div>

      <ConvergeArrow direction="down" delay={0.2} />

      <div
        data-reveal
        style={{
          margin: '0 auto', maxWidth: 330,
          background: 'linear-gradient(#FFFFFF, #FFFFFF) padding-box, linear-gradient(120deg, #0FAE72 20%, #0B8D84 85%) border-box',
          border: '1px solid transparent',
          borderRadius: 18, padding: '18px 20px',
          boxShadow: '0 18px 44px rgba(15,174,114,0.14), 0 6px 18px rgba(11,18,32,0.06)',
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
            <div style={{ fontSize: 9.5, color: '#667085' }}>Confidence</div>
          </div>
        </div>
      </div>

      <ConvergeArrow direction="up" delay={0.25} />

      <ChipCluster chips={SOURCES.slice(4)} delay={0.2} />

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
color: '#0B8D84',
          }}
        >
          They lack understanding.
        </span>
      </p>
    </section>
  );
}

export default MobileProblem;
