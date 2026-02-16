import { useEffect, useState, useCallback } from 'react';
import Lenis from 'lenis';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MobileHome } from './components/MobileHome';
import { TerminalPanel } from './components/TerminalPanel';
import { ComparisonSection } from './components/ComparisonSection';
import { PersonaSection } from './components/PersonaSection';
import { StrategyLibrary } from './components/StrategyLibrary';
import { DynamicWatchlist } from './components/DynamicWatchlist';
import { NewsSentiment } from './components/NewsSentiment';
import { CtaFooter } from './components/CtaFooter';
import { FaqFooter } from './components/FaqFooter';
import { EarlyAccessModal } from './components/EarlyAccessModal';

function App() {
  const [earlyAccessOpen, setEarlyAccessOpen] = useState(false);
  const openEarlyAccess = useCallback(() => setEarlyAccessOpen(true), []);

  // Wire up all "Apply for early access" buttons
  useEffect(() => {
    const ids = ['hero-cta-apply', 'cta-early-access', 'mobile-cta-apply'];
    const handler = (e: Event) => {
      e.preventDefault();
      openEarlyAccess();
    };
    ids.forEach((id) => document.getElementById(id)?.addEventListener('click', handler));
    return () => ids.forEach((id) => document.getElementById(id)?.removeEventListener('click', handler));
  }, [openEarlyAccess]);

  // Lenis smooth scrolling (desktop only)
  useEffect(() => {
    if (window.innerWidth < 768) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
  return (
    <div className="relative">
      {/* Procedural terminal background layers */}
      <div className="terminal-scanlines" />
      <div className="terminal-glow" />
      <div className="terminal-noise">
        <svg xmlns="http://www.w3.org/2000/svg">
          <filter id="terminal-noise-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#terminal-noise-filter)" />
        </svg>
      </div>
      <div className="terminal-vignette" />
      <Header />
      <main className="relative z-10">
        <HeroSection />
        {/* Mobile-only compact layout (Stitch-inspired) */}
        <MobileHome />
        {/* Desktop-only full sections */}
        <div className="hidden md:block">
          <TerminalPanel />
          <ComparisonSection />
          <PersonaSection />
          <StrategyLibrary />
          <DynamicWatchlist />
          <NewsSentiment />
        </div>
      </main>
      <div className="hidden md:block">
        <CtaFooter />
        <FaqFooter />
      </div>
      <EarlyAccessModal open={earlyAccessOpen} onClose={() => setEarlyAccessOpen(false)} />
    </div>
  );
}

export default App;
