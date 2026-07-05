import { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { LandingPage } from './components/landing/LandingPage';
import { EarlyAccessModal } from './components/EarlyAccessModal';

const PitchDeck = lazy(() => import('./components/pitchdeck/PitchDeck'));
const PitchDeckB = lazy(() => import('./components/pitchdeck/PitchDeckB'));
const PitchDeckC = lazy(() => import('./components/pitchdeck/PitchDeckC'));
const PitchDeckF = lazy(() => import('./components/pitchdeck/PitchDeckF'));
const PitchDeckG = lazy(() => import('./components/pitchdeck/PitchDeckG'));
const PitchDeckV2 = lazy(() => import('./components/pitchdeck/PitchDeckV2'));
const PitchDeckV3 = lazy(() => import('./components/pitchdeck/PitchDeckV3'));
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

  // Render pitch decks
  const deckFallback = (
    <div className="fixed inset-0 bg-[#020405] flex items-center justify-center z-[100]">
      <div className="font-mono text-[#0ecb81] text-sm animate-pulse">Loading deck...</div>
    </div>
  );

  const deckRoutes: Record<string, React.LazyExoticComponent<() => React.JSX.Element>> = {
    '#/deck': PitchDeck,
    '#/deck-b': PitchDeckB,
    '#/deck-c': PitchDeckC,
    '#/deck-f': PitchDeckF,
    '#/deck-g': PitchDeckG,
    '#/deck-v2': PitchDeckV2,
    '#/deck-v3': PitchDeckV3,
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
      <LandingPage />
      <EarlyAccessModal open={earlyAccessOpen} onClose={() => setEarlyAccessOpen(false)} />
    </div>
  );
}

export default App;
