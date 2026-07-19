import '../../../styles/prism-home.css';
import { useEffect, useRef } from 'react';
import { useIsMobile } from './hooks';
import { Nav } from './Nav';
import { PrismCanvas } from './PrismCanvas';
import { Hero } from './sections/Hero';
import { TrustBar } from './sections/TrustBar';
import { ProblemSection } from './sections/Problem';
import { BiasTax } from './sections/BiasTax';
import { FeatureShowcase } from './sections/FeatureShowcase';
import { EnterpriseArchitecture } from './sections/EnterpriseArchitecture';
import { InstitutionalTrust } from './sections/InstitutionalTrust';
import { FinalCtaFaq } from './sections/FinalCtaFaq';
import { Footer } from './Footer';
import { PrismMobileHome } from './mobile/PrismMobileHome';

export function PrismHome() {
  const heroAnchor = useRef<HTMLDivElement>(null);
  const problemAnchor = useRef<HTMLDivElement>(null);
  const biasTaxAnchor = useRef<HTMLDivElement>(null);
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

  // fitPages (v4 fit-pages runtime, desktop only) — sizes every
  // `section[data-page]` to exactly one viewport page: zoom the section down
  // when its natural height overflows the target, otherwise stretch it to
  // the target with flex-centered content. Ported from
  // docs/superpowers/specs/reference/2026-07-18-hero-design-v4-fit-pages.html
  // lines 1264-1289. Sections don't carry data-page yet (a later task adds
  // it), so the selector currently matches nothing — this effect is a safe
  // no-op until then. Runs once on mount, then retriggers at 400ms and
  // 1500ms to catch late layout shifts (fonts/images/charts settling), and
  // again on every resize; all three triggers plus the resize listener are
  // torn down on cleanup so nothing leaks across a mobile/desktop breakpoint
  // switch or unmount.
  useEffect(() => {
    if (isMobile) return;

    const fitPages = () => {
      const vh = window.innerHeight;
      const sections = document.querySelectorAll<HTMLElement>('section[data-page]');
      sections.forEach((s) => {
        s.style.zoom = '';
        s.style.height = '';
        s.style.minHeight = '';
        s.style.boxSizing = 'border-box';
        s.style.scrollSnapAlign = 'start';
        s.style.scrollSnapStop = 'always';
      });
      sections.forEach((s) => {
        const offset = parseFloat(s.dataset.page || '') || 0;
        const target = vh - offset;
        const natural = s.offsetHeight;
        if (natural > target + 2) {
          s.style.zoom = String(target / natural);
          s.style.height = `${natural}px`;
        } else {
          s.style.minHeight = `${target}px`;
          s.style.display = 'flex';
          s.style.flexDirection = 'column';
          s.style.justifyContent = 'center';
        }
        if (offset) s.style.scrollSnapAlign = 'none';
      });
    };

    fitPages();
    const retrigger400 = window.setTimeout(fitPages, 400);
    const retrigger1500 = window.setTimeout(fitPages, 1500);
    window.addEventListener('resize', fitPages);

    return () => {
      window.clearTimeout(retrigger400);
      window.clearTimeout(retrigger1500);
      window.removeEventListener('resize', fitPages);
    };
  }, [isMobile]);

  if (isMobile) {
    return <PrismMobileHome />;
  }

  return (
    <div className="prism-home">
      {!isCanvasCollapsed && (
        <PrismCanvas heroAnchor={heroAnchor} problemAnchor={problemAnchor} biasTaxAnchor={biasTaxAnchor} />
      )}
      <Nav />
      <main>
        <Hero anchorRef={heroAnchor} />
        <TrustBar />
        <ProblemSection anchorRef={problemAnchor} />
        <BiasTax anchorRef={biasTaxAnchor} />
        <FeatureShowcase />
        <EnterpriseArchitecture />
        <InstitutionalTrust />
        <FinalCtaFaq />
      </main>
      <Footer />
    </div>
  );
}

export default PrismHome;
