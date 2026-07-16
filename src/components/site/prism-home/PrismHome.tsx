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

export function PrismHome() {
  const heroAnchor = useRef<HTMLDivElement>(null);
  const problemAnchor = useRef<HTMLDivElement>(null);
  const biasTaxAnchor = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    document.documentElement.classList.add('prism-snap');
    return () => document.documentElement.classList.remove('prism-snap');
  }, []);

  return (
    <div className="prism-home">
      {!isMobile && (
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
