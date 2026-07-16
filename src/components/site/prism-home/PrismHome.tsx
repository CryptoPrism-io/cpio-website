import '../../../styles/prism-home.css';
import { useRef } from 'react';
import { Nav } from './Nav';
import { PrismCanvas } from './PrismCanvas';
import { Hero } from './sections/Hero';
import { TrustBar } from './sections/TrustBar';
import { ProblemSection } from './sections/Problem';
import { BiasTax } from './sections/BiasTax';
import { FeatureShowcase } from './sections/FeatureShowcase';

export function PrismHome() {
  const heroAnchor = useRef<HTMLDivElement>(null);
  const problemAnchor = useRef<HTMLDivElement>(null);
  const biasTaxAnchor = useRef<HTMLDivElement>(null);

  return (
    <div className="prism-home">
      <PrismCanvas heroAnchor={heroAnchor} problemAnchor={problemAnchor} biasTaxAnchor={biasTaxAnchor} />
      <Nav />
      <main>
        <Hero anchorRef={heroAnchor} />
        <TrustBar />
        <ProblemSection anchorRef={problemAnchor} />
        <BiasTax anchorRef={biasTaxAnchor} />
        <FeatureShowcase />
      </main>
    </div>
  );
}

export default PrismHome;
