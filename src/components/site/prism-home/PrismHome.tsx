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
