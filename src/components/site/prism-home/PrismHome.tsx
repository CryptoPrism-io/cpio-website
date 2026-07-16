import '../../../styles/prism-home.css';
import { useRef } from 'react';
import { Nav } from './Nav';
import { PrismCanvas } from './PrismCanvas';
import { Hero } from './sections/Hero';

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
      </main>
    </div>
  );
}

export default PrismHome;
