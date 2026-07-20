import '../../../styles/prism-home.css';
import { useEffect, useRef } from 'react';
import { useIsMobile } from './hooks';
import { Nav } from './Nav';
import { PrismCanvas } from './PrismCanvas';
import { Hero } from './sections/Hero';
import { ProblemSection } from './sections/Problem';
import { FeatureShowcase } from './sections/FeatureShowcase';
import { InstitutionalTrust } from './sections/InstitutionalTrust';
import { FinalCtaFaq } from './sections/FinalCtaFaq';
import { Footer } from './Footer';
import { PrismMobileHome } from './mobile/PrismMobileHome';

export function PrismHome() {
  const heroAnchor = useRef<HTMLDivElement>(null);
  const problemAnchor = useRef<HTMLDivElement>(null);
  // Tree switch (mobile-home plan, Task 1): ≤640px renders the dedicated
  // mobile design (PrismMobileHome) in place of the whole desktop tree
  // below. 640, not the hook's default 900, because the desktop sections
  // below already have working tablet layouts at 641-900px.
  const isMobile = useIsMobile(640);
  // Pre-existing and independent of the switch above: the desktop tree's
  // own tablet behavior hides the fixed-position PrismCanvas diagram at
  // ≤900px (Hero/Problem/BiasTax reflow to a simplified stacked layout
  // instead — see ./hooks.ts) while still rendering the full desktop
  // section tree for 641-900px viewports.
  const isCanvasCollapsed = useIsMobile();

  // prism-snap (scroll-snap) is a desktop-only affordance — the mobile
  // design scrolls normally. Only applied when NOT mobile; cleaned up on
  // unmount and whenever a resize crosses the 640px breakpoint (the effect
  // re-runs on isMobile change and its cleanup always fires first), so the
  // class never gets stuck on <html>.
  useEffect(() => {
    if (isMobile) return;
    document.documentElement.classList.add('prism-snap');
    return () => document.documentElement.classList.remove('prism-snap');
  }, [isMobile]);

  // fitPages (v5 runtime, desktop only) — port of the design's fitPages +
  // revealCheck (CryptoPrism Hero.dc.html v5, script lines 1250-1308):
  // - Sections are measured at the 1560px design width (DW) and zoomed by
  //   min(pageHeight/natural, vw/DW). After zoom the section is stretched to
  //   span the full viewport width (width = vw/z in unzoomed coords) so v5
  //   sections whose inner content is width:100% fill edge-to-edge; content
  //   capped by max-width (hero, .prism-wrap sections) stays centered.
  // - data-page is a truthy FLAG (not a px offset): truthy (Hero's "76") means
  //   the in-flow nav is part of this page — target = vh minus the nav's
  //   measured height, and the section opts out of snap (the nav above it is
  //   its page's snap point). Bare data-page → full-vh page, snaps normally.
  // - The nav itself is width-locked to DW and zoomed by vw/DW.
  // - [data-reveal] elements fade in on first viewport entry with a staggered
  //   transition-delay of index*0.1s (data-reveal="0..n").
  // Runs on mount + 400/1500ms retriggers (fonts/charts settling) + resize;
  // reveal re-checks on scroll. Everything is torn down on cleanup so nothing
  // leaks across a mobile/desktop breakpoint switch or unmount.
  useEffect(() => {
    if (isMobile) return;
    const DW = 1560;
    const GUTTER = 50; // uniform side margin in FINAL (post-zoom) px, every section
    const revealed = new WeakSet<HTMLElement>();

    const revealCheck = () => {
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        if (revealed.has(el)) return;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          revealed.add(el);
          el.style.transitionDelay = `${parseInt(el.getAttribute('data-reveal') || '0', 10) * 0.1}s`;
          el.style.opacity = '1';
          el.style.transform = 'none';
        }
      });
    };

    const fitPages = () => {
      const vh = window.innerHeight;
      const vw = document.documentElement.clientWidth;
      const nav = document.querySelector<HTMLElement>('.prism-home nav');
      if (nav) {
        const nz = Math.min(1, vw / DW);
        nav.style.width = `${DW}px`;
        nav.style.boxSizing = 'border-box';
        nav.style.zoom = String(nz);
        nav.style.marginLeft = `${Math.max(0, (vw / nz - DW) / 2)}px`;
      }
      const navH = nav ? nav.getBoundingClientRect().height : 0;
      const sections = document.querySelectorAll<HTMLElement>('section[data-page]');
      sections.forEach((s) => {
        s.style.zoom = '';
        s.style.height = '';
        s.style.minHeight = '';
        s.style.marginLeft = '';
        s.style.paddingLeft = '';
        s.style.paddingRight = '';
        s.style.width = `${DW}px`;
        s.style.boxSizing = 'border-box';
        s.style.scrollSnapStop = 'always';
      });
      sections.forEach((s) => {
        const hasOffset = !!s.getAttribute('data-page');
        const target = vh - (hasOffset ? navH : 0);
        const natural = s.offsetHeight;
        const z = Math.min(target / natural, vw / DW);
        s.style.zoom = String(z);
        s.style.height = `${target / z}px`;
        // Stretch the section to the full viewport width (unzoomed coords) so
        // width:100% content fills after the zoom, then set a UNIFORM side
        // gutter: because everything is scaled by z, a raw padding would render
        // at padding*z (different on every section). Dividing GUTTER by z makes
        // the gutter render at exactly GUTTER px on every section, so the whole
        // site has consistent 50px margins regardless of each section's zoom.
        s.style.width = `${vw / z}px`;
        s.style.paddingLeft = `${GUTTER / z}px`;
        s.style.paddingRight = `${GUTTER / z}px`;
        s.style.marginLeft = '0px';
        s.style.display = 'flex';
        s.style.flexDirection = 'column';
        s.style.justifyContent = 'center';
        s.style.scrollSnapAlign = hasOffset ? 'none' : 'start';
      });
      revealCheck();
    };

    fitPages();
    const t400 = window.setTimeout(fitPages, 400);
    const t1500 = window.setTimeout(fitPages, 1500);
    const r500 = window.setTimeout(revealCheck, 500);
    const r1600 = window.setTimeout(revealCheck, 1600);
    window.addEventListener('resize', fitPages);
    window.addEventListener('scroll', revealCheck, { passive: true });

    return () => {
      window.clearTimeout(t400);
      window.clearTimeout(t1500);
      window.clearTimeout(r500);
      window.clearTimeout(r1600);
      window.removeEventListener('resize', fitPages);
      window.removeEventListener('scroll', revealCheck);
    };
  }, [isMobile]);

  if (isMobile) {
    return <PrismMobileHome />;
  }

  return (
    <div className="prism-home">
      {!isCanvasCollapsed && (
        <PrismCanvas heroAnchor={heroAnchor} problemAnchor={problemAnchor} />
      )}
      <Nav />
      <main>
        {/* v5: the trust bar lives INSIDE the Hero as a dark glass strip
            (design lines 88-102) — the old standalone <TrustBar /> is gone */}
        <Hero anchorRef={heroAnchor} />
        <ProblemSection anchorRef={problemAnchor} />
        {/* Bias Tax (Screen 3) removed 2026-07-20 (user: it added friction
            between Problem and the Platform showcase) — flow is now 1 → 2 → 4 */}
        <FeatureShowcase />
        {/* Enterprise Architecture (Screen 5) removed 2026-07-20 (user: not
            needed yet, didn't land visually). Component kept orphaned at
            sections/EnterpriseArchitecture.tsx; rebuild plan at
            docs/superpowers/plans/2026-07-20-enterprise-section-deferred.md */}
        <InstitutionalTrust />
        <FinalCtaFaq />
      </main>
      <Footer />
    </div>
  );
}

export default PrismHome;
