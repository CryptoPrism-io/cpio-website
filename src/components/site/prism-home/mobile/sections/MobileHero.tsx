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

import { useLayoutEffect, useRef } from 'react';
import { MobilePrismCanvas } from '../MobilePrismCanvas';

// 2026-07-19 deviation from the verbatim port (user request): the headline's
// three lines are each fitted to the same width (measure at a base size, then
// scale each line's font-size so its natural width fills the container) with
// uniform gaps — instead of one 40px paragraph wrapping wherever it lands.
const HEADLINE_LINES = [
  { text: 'AI-Native', gradient: false },
  { text: 'Intelligence for', gradient: false },
  { text: 'Modern Markets.', gradient: true },
];
const FIT_BASE_PX = 40;

function FitHeadline() {
  const boxRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const fit = () => {
      const target = box.clientWidth;
      const lines = Array.from(box.children) as HTMLElement[];
      lines.forEach((line) => {
        // two passes: glyph rendering drifts ~1-2% across sizes, so measure,
        // scale, then correct once more at the landed size (converges <1px)
        let size = FIT_BASE_PX;
        line.style.fontSize = `${size}px`;
        for (let pass = 0; pass < 2; pass++) {
          const natural = line.getBoundingClientRect().width;
          if (!(natural > 0)) break;
          size = (size * target) / natural;
          line.style.fontSize = `${size}px`;
        }
      });
    };
    fit();
    // re-measure once fonts settle (Inter may swap in after first paint)
    if (document.fonts?.ready) document.fonts.ready.then(fit);
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  return (
    <h1
      ref={boxRef}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7,
        margin: '22px auto 0', maxWidth: 400, fontWeight: 800, letterSpacing: '-0.02em',
      }}
    >
      {HEADLINE_LINES.map(({ text, gradient }) => (
        <span
          key={text}
          style={{
            // a global `transition: all` rule would otherwise animate the
            // font-size writes and make the fit measure mid-transition values
            transition: 'none',
            display: 'inline-block', whiteSpace: 'nowrap', lineHeight: 1,
            // Solid accent, not a background-clip gradient fill: gate 2
            // permits gradients on backgrounds, never on text, in any genre.
            ...(gradient ? { color: '#0B8D84' } : {}),
          }}
        >
          {text}
        </span>
      ))}
    </h1>
  );
}

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

      <FitHeadline />

      <p style={{ margin: '16px auto 0', maxWidth: 310, fontSize: 15.5, lineHeight: 1.5, color: '#475467' }}>
        Fragmented market data in. One explainable decision out.
      </p>

      <div style={{ position: 'relative', width: 'min(390px, calc(100% + 44px))', height: 380, margin: '6px 0 0 -22px' }}>
        <MobilePrismCanvas />
        <div style={{ position: 'absolute', left: 10, top: 30, fontSize: 8, fontWeight: 700, letterSpacing: '0.14em', color: '#667085', textAlign: 'left' }}>
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
        {/* Was "Watch Demo" with a play glyph, wired to the early-access modal:
            it promised a video that does not exist and opened a form. It now
            does what it says and scrolls to the product tour further down this
            same page — the desktop hero got the identical correction. */}
        <button
          type="button"
          onClick={() => document.getElementById('mobile-product')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9,
            fontSize: 15, fontWeight: 600, color: '#0B1220', background: '#FFFFFF', border: '1px solid #E7E9EC',
            borderRadius: 14, padding: 15, cursor: 'pointer',
          }}
        >
          See the platform
          <svg width={16} height={14} viewBox="0 0 16 14" fill="none" aria-hidden="true">
            <path d="M8 1v11M3 7.5 8 12.5l5-5" stroke="#0B1220" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, margin: '18px 0 26px', fontSize: 11.5, fontWeight: 500, color: '#475467' }}>
        <span>Private beta access</span><span style={{ color: '#D4D9DE' }}>·</span><span>Onboarding select teams</span><span style={{ color: '#D4D9DE' }}>·</span><span>Every score source-cited</span>
      </div>
    </section>
  );
}

export default MobileHero;
