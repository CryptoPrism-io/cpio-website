// Mobile Home — wrapper shell, nav, and reveal-on-scroll observer.
//
// Ported from docs/superpowers/specs/reference/2026-07-18-mobile-design-v1.html:
// nav (lines 26-35), reveal IntersectionObserver (lines 448-451).
// Section bodies (Hero/Problem/BiasLedger/Product/Enterprise/FinalCta) are
// placeholders here; they land in Tasks 2-5 as their own components under
// ./sections/ and replace the placeholders below in render order.
//
// Layout deviation (sanctioned by the plan): the reference wrapper is fixed
// `width: 390px`; here it's `width: 100%; max-width: 390px` so phones
// narrower than 390px (e.g. 360px) don't overflow horizontally.

import { useEffect, useRef } from 'react';
import { MobileHero } from './sections/MobileHero';
import { MobileProblem } from './sections/MobileProblem';
import { MobileBiasLedger } from './sections/MobileBiasLedger';

function PlaceholderSection({ label }: { label: string }) {
  return (
    <section style={{ padding: 40, textAlign: 'center', color: '#98A2B3', fontSize: 13 }}>
      {label} — coming
    </section>
  );
}

export function PrismMobileHome() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Reveal-on-scroll — reference lines 448-451: an IntersectionObserver over
  // every [data-reveal] element, revealing (opacity 1 / transform none) and
  // unobserving once each crosses the 0.12 threshold. Scoped to this
  // wrapper (not document-wide) so it never touches desktop-tree elements.
  // Includes the site's 4s safety-net fallback (src/components/site/hooks.ts
  // useRevealClass) since IntersectionObserver occasionally never fires.
  useEffect(() => {
    const root = wrapperRef.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (targets.length === 0) return;

    const reveal = (el: HTMLElement) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    };

    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target as HTMLElement);
          io.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    targets.forEach((el) => io.observe(el));

    const fallback = setTimeout(() => targets.forEach(reveal), 4000);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        width: '100%', maxWidth: 390, margin: '0 auto', background: '#FAFAF8', position: 'relative', overflow: 'clip',
        // Reference body CSS (line 17) sets this globally; this wrapper isn't
        // inside the desktop tree's `.prism-home` class (which sets the same
        // ink color), and without it text inherits the app shell's dark-theme
        // `body { color: var(--text-primary) }` (white), rendering invisible
        // on this section's light background.
        //
        // `overflow: 'clip'` (not 'hidden'): the Bias Ledger section (Task 3)
        // relies on `position: sticky` rows to produce a stacking-cards scroll
        // effect. `overflow: hidden` on any ancestor makes that ancestor a
        // CSS scroll container, which becomes the sticky containing block —
        // since this wrapper never scrolls independently, its descendants'
        // sticky offsets are computed against a scrollport that never moves,
        // so the cards silently never stick (confirmed empirically: verified
        // with 'hidden' the cards translate 1:1 with page scroll and never
        // pin at their `top` offset). `clip` still clips horizontal overflow
        // at narrow (360px) viewports exactly like `hidden` did, but per the
        // CSS Overflow spec does not establish a scroll container, so sticky
        // descendants correctly resolve against the page's real scrolling
        // ancestor instead.
        color: '#0B1220',
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      <nav
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60,
          padding: '0 18px', background: '#FFFFFF', borderBottom: '1px solid #E7E9EC',
          position: 'relative', zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width={24} height={24} viewBox="0 0 30 30" fill="none" aria-hidden="true">
            <path d="M15 2.5 25.8 8.75v12.5L15 27.5 4.2 21.25V8.75Z" stroke="#0FAE72" strokeWidth={1.8} strokeLinejoin="round" />
            <path d="M15 10.5 19 17h-8Z" stroke="#0B8D84" strokeWidth={1.5} strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em' }}>
            CryptoPrism<span style={{ color: '#0FAE72' }}>.</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button
            type="button"
            className="cta-early-access-trigger"
            style={{
              fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, color: '#FFFFFF',
              background: 'linear-gradient(135deg, #0FAE72, #0B8D84)', border: 'none',
              borderRadius: 12, padding: '9px 15px', cursor: 'pointer',
            }}
          >
            Request Demo
          </button>
          {/* Decorative — the mobile design has no menu behind this icon. */}
          <svg width={20} height={20} viewBox="0 0 20 20" fill="none" stroke="#0B1220" strokeWidth={1.6} strokeLinecap="round" aria-hidden="true">
            <path d="M3 5.5h14 M3 10h14 M3 14.5h14" />
          </svg>
        </div>
      </nav>

      <MobileHero />
      <MobileProblem />
      <MobileBiasLedger />
      <PlaceholderSection label="Product" />
      <PlaceholderSection label="Enterprise" />
      <PlaceholderSection label="Final CTA" />
    </div>
  );
}

export default PrismMobileHome;
