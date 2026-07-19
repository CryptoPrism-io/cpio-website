// Mobile Home — Hero section.
//
// Ported verbatim from docs/superpowers/specs/reference/2026-07-18-mobile-design-v1.html
// lines 37-57: grid-mask backdrop, pill, h1, sub, the 390x380 canvas block
// with RAW DATA / INTELLIGENCE labels, stacked CTAs, trust line.
//
// The reference's `data-screen-label` attribute (line 37) is the design
// tool's own screen-labeling metadata, not part of the rendered design —
// dropped, same as the tool-specific `x-dc`/`helmet`/`ref={{ prismRef }}`
// scaffolding already stripped by PrismMobileHome.tsx. This section has no
// `data-reveal` wrappers in the reference (unlike Problem/BiasLedger) —
// ported exactly as-is, none added.

import { MobilePrismCanvas } from '../MobilePrismCanvas';

export function MobileHero() {
  return (
    <section
      style={{
        position: 'relative', padding: '40px 22px 10px', textAlign: 'center',
        background: 'radial-gradient(500px 420px at 50% 36%, rgba(15,174,114,0.06), rgba(250,250,248,0) 70%), #FAFAF8',
      }}
    >
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(11,18,32,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(11,18,32,0.05) 1px, transparent 1px)',
          backgroundSize: '39px 39px',
          WebkitMaskImage: 'radial-gradient(400px 460px at 50% 42%, rgba(0,0,0,0.9), transparent 78%)',
          maskImage: 'radial-gradient(400px 460px at 50% 42%, rgba(0,0,0,0.9), transparent 78%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 7, border: '1px solid rgba(15,174,114,0.35)',
          background: '#FFFFFF', borderRadius: 999, padding: '6px 14px', fontSize: 11.5, fontWeight: 500, color: '#0B8D84',
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0FAE72', display: 'inline-block' }} />
        Now in Private Beta
      </div>

      <h1 style={{ margin: '20px 0 0', fontSize: 40, fontWeight: 800, lineHeight: 1.02, letterSpacing: '-0.02em' }}>
        AI-Native Intelligence for{' '}
        <span
          style={{
            background: 'linear-gradient(120deg, #0FAE72 20%, #0B8D84 85%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}
        >
          Modern Markets.
        </span>
      </h1>

      <p style={{ margin: '16px auto 0', maxWidth: 310, fontSize: 15.5, lineHeight: 1.5, color: '#475467' }}>
        Fragmented market data in. One explainable decision out.
      </p>

      <div style={{ position: 'relative', width: 390, height: 380, margin: '6px 0 0 -22px' }}>
        <MobilePrismCanvas />
        <div style={{ position: 'absolute', left: 10, top: 30, fontSize: 8, fontWeight: 700, letterSpacing: '0.14em', color: '#98A2B3', textAlign: 'left' }}>
          RAW DATA
        </div>
        <div style={{ position: 'absolute', right: 10, top: 46, fontSize: 8, fontWeight: 700, letterSpacing: '0.14em', color: '#0B8D84', textAlign: 'right' }}>
          INTELLIGENCE
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 2 }}>
        <button
          type="button"
          className="cta-early-access-trigger"
          style={{
            fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            fontSize: 15, fontWeight: 600, color: '#FFFFFF', background: '#0B1220', border: 'none', borderRadius: 14,
            padding: 16, cursor: 'pointer', boxShadow: '0 12px 28px rgba(11,18,32,0.16)',
          }}
        >
          Launch Beta
          <svg width={15} height={13} viewBox="0 0 16 14" fill="none">
            <path d="M1 7h13M9.5 1.8 14.7 7l-5.2 5.2" stroke="#FFFFFF" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          className="cta-early-access-trigger"
          style={{
            fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9,
            fontSize: 15, fontWeight: 600, color: '#0B1220', background: '#FFFFFF', border: '1px solid #E7E9EC',
            borderRadius: 14, padding: 15, cursor: 'pointer',
          }}
        >
          <svg width={18} height={18} viewBox="0 0 20 20" fill="none">
            <circle cx={10} cy={10} r={8.5} stroke="#0B1220" strokeWidth={1.5} />
            <path d="M8.3 7.2v5.6L12.8 10Z" fill="#0B1220" />
          </svg>
          Watch Demo
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, margin: '18px 0 26px', fontSize: 11.5, fontWeight: 500, color: '#475467' }}>
        <span>No credit card</span><span style={{ color: '#D4D9DE' }}>·</span><span>Private Beta</span><span style={{ color: '#D4D9DE' }}>·</span><span>Enterprise Ready</span>
      </div>
    </section>
  );
}

export default MobileHero;
