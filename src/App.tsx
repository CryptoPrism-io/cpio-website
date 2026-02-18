import { useEffect, useState, useCallback, useRef, lazy, Suspense } from 'react';
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
const PitchDeckV2 = lazy(() => import('./components/pitchdeck/PitchDeckV2'));
const PitchDeckInfra = lazy(() => import('./components/pitchdeck/PitchDeckInfra'));
const BrandKit = lazy(() => import('./components/BrandKit'));

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
    const ids = ['hero-cta-apply', 'cta-early-access', 'mobile-cta-apply', 'mobile-cta-apply-2', 'hero-cta-demo'];
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

  // IntersectionObserver for desktop snap-section fade-in transitions
  const snapContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.innerWidth < 768) return;
    if (route.startsWith('#/deck')) return;

    const sections = document.querySelectorAll('.desktop-snap-section');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          } else {
            entry.target.classList.remove('in-view');
          }
        });
      },
      { threshold: 0.3, root: snapContainerRef.current }
    );

    sections.forEach((s) => observer.observe(s));
    // Mark first section as visible immediately
    sections[0]?.classList.add('in-view');

    return () => observer.disconnect();
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
    '#/deck-v2': PitchDeckV2,
    '#/deck-infra': PitchDeckInfra,
  };

  if (route === '#/brandkit') {
    return (
      <Suspense fallback={deckFallback}>
        <BrandKit />
      </Suspense>
    );
  }

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
      {/* Desktop fixed energy field background */}
      <div className="desktop-bg-fixed hidden md:block" aria-hidden="true">
        <div className="desktop-bg-energy" />
        <div className="desktop-bg-dark-overlay" />
        <div className="desktop-bg-grid" />
        <div className="desktop-grain" />
      </div>

      <Header />

      {/* Mobile-only snap-scroll layout */}
      <MobileHome />

      {/* Desktop snap-scroll container */}
      <div ref={snapContainerRef} className="hidden md:block desktop-snap-container">
        <div className="desktop-snap-section">
          <div className="snap-content h-full">
            <HeroSection />
          </div>
        </div>
        <div className="desktop-snap-section">
          <div className="snap-content h-full">
            <TerminalPanel />
          </div>
        </div>
        <div className="desktop-snap-section">
          <div className="snap-content h-full">
            <ComparisonSection />
          </div>
        </div>
        <div className="desktop-snap-section">
          <div className="snap-content h-full">
            <PersonaSection />
          </div>
        </div>
        <div className="desktop-snap-section">
          <div className="snap-content h-full">
            <StrategyLibrary />
          </div>
        </div>
        <div className="desktop-snap-section">
          <div className="snap-content h-full">
            <DynamicWatchlist />
          </div>
        </div>
        <div className="desktop-snap-section">
          <div className="snap-content h-full">
            <NewsSentiment />
          </div>
        </div>
        <div className="desktop-snap-section">
          <div className="snap-content h-full">
            <CtaFooter />
          </div>
        </div>
        <div className="desktop-snap-section">
          <div className="snap-content h-full">
            <FaqFooter />
          </div>
        </div>
      </div>

      <EarlyAccessModal open={earlyAccessOpen} onClose={() => setEarlyAccessOpen(false)} />
    </div>
  );
}

export default App;
