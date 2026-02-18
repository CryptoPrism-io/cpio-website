import { useEffect, useState, useCallback, lazy, Suspense } from 'react';
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

const PitchDeck = lazy(() => import('./components/pitchdeck/PitchDeck'));
const PitchDeckB = lazy(() => import('./components/pitchdeck/PitchDeckB'));
const PitchDeckC = lazy(() => import('./components/pitchdeck/PitchDeckC'));
const PitchDeckF = lazy(() => import('./components/pitchdeck/PitchDeckF'));
const PitchDeckG = lazy(() => import('./components/pitchdeck/PitchDeckG'));

function App() {
  const [route, setRoute] = useState(window.location.hash);
  const [earlyAccessOpen, setEarlyAccessOpen] = useState(false);
  const openEarlyAccess = useCallback(() => setEarlyAccessOpen(true), []);

  // Hash route listener
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Wire up all "Apply for early access" buttons (by ID and class)
  useEffect(() => {
    const ids = ['hero-cta-apply', 'cta-early-access', 'mobile-cta-apply', 'hero-cta-demo'];
    const handler = (e: Event) => {
      e.preventDefault();
      openEarlyAccess();
    };
    ids.forEach((id) => document.getElementById(id)?.addEventListener('click', handler));
    // Also wire up any element with the trigger class
    const classEls = document.querySelectorAll('.cta-early-access-trigger');
    classEls.forEach((el) => el.addEventListener('click', handler));
    return () => {
      ids.forEach((id) => document.getElementById(id)?.removeEventListener('click', handler));
      classEls.forEach((el) => el.removeEventListener('click', handler));
    };
  }, [openEarlyAccess]);

  // Lenis smooth scrolling (desktop only, disabled on deck)
  useEffect(() => {
    if (window.innerWidth < 768) return;
    if (route.startsWith('#/deck')) return;
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
  }, [route]);

  // Render pitch decks
  const deckFallback = (
    <div className="fixed inset-0 bg-[#020405] flex items-center justify-center z-[100]">
      <div className="font-mono text-[#0ecb81] text-sm animate-pulse">Loading deck...</div>
    </div>
  );

  const deckRoutes: Record<string, React.LazyExoticComponent<() => JSX.Element>> = {
    '#/deck': PitchDeck,
    '#/deck-b': PitchDeckB,
    '#/deck-c': PitchDeckC,
    '#/deck-f': PitchDeckF,
    '#/deck-g': PitchDeckG,
  };

  const DeckComponent = deckRoutes[route];
  if (DeckComponent) {
    return (
      <Suspense fallback={deckFallback}>
        <DeckComponent />
      </Suspense>
    );
  }

  return (
    <div className="relative">
      {/* Procedural terminal background layers */}
      <div className="terminal-scanlines" aria-hidden="true" />
      <div className="terminal-glow" aria-hidden="true" />
      <div className="terminal-noise" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <filter id="terminal-noise-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#terminal-noise-filter)" />
        </svg>
      </div>
      <div className="terminal-vignette" aria-hidden="true" />
      <Header />
      <main id="main-content" className="relative z-10">
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
