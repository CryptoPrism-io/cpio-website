import { useEffect, useState, useCallback } from 'react';
import Lenis from 'lenis';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
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
    const ids = ['hero-cta-apply', 'cta-early-access'];
    const handler = (e: Event) => {
      e.preventDefault();
      openEarlyAccess();
    };
    ids.forEach((id) => document.getElementById(id)?.addEventListener('click', handler));
    return () => ids.forEach((id) => document.getElementById(id)?.removeEventListener('click', handler));
  }, [openEarlyAccess]);

  // Lenis smooth scrolling
  useEffect(() => {
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
      <div className="fixed inset-0 grid-overlay pointer-events-none z-0 opacity-40" />
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <TerminalPanel />
        <ComparisonSection />
        <PersonaSection />
        <StrategyLibrary />
        <DynamicWatchlist />
        <NewsSentiment />
      </main>
      <CtaFooter />
      <FaqFooter />
      <EarlyAccessModal open={earlyAccessOpen} onClose={() => setEarlyAccessOpen(false)} />
    </div>
  );
}

export default App;
