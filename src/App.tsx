import { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { HomePage } from './components/site/HomePage';
import { EarlyAccessModal } from './components/EarlyAccessModal';

const ProductPage = lazy(() => import('./components/site/ProductPage'));
const IntelligencePage = lazy(() => import('./components/site/IntelligencePage'));
const ComparePage = lazy(() => import('./components/site/ComparePage'));
const PricingPage = lazy(() => import('./components/site/PricingPage'));
const InstitutionalPage = lazy(() => import('./components/site/InstitutionalPage'));
const EvidencePage = lazy(() => import('./components/site/EvidencePage'));
const AboutPage = lazy(() => import('./components/site/AboutPage'));
const InvitePage = lazy(() => import('./components/site/InvitePage'));

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

  // Scroll to top on every site-page navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  // Wire up all "Request an Invite" / early-access buttons (by class), delegated on
  // document so it keeps working as routes mount different pages (and their buttons)
  // in and out of the DOM.
  useEffect(() => {
    const handler = (e: Event) => {
      if (!(e.target instanceof Element)) return;
      if (!e.target.closest('.cta-early-access-trigger')) return;
      e.preventDefault();
      openEarlyAccess();
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
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

  const siteFallback = <div style={{ minHeight: '100vh', background: '#F5F3EE' }} />;

  const siteRoutes: Record<string, React.LazyExoticComponent<() => React.JSX.Element>> = {
    '#/product': ProductPage,
    '#/intelligence': IntelligencePage,
    '#/compare': ComparePage,
    '#/pricing': PricingPage,
    '#/institutional': InstitutionalPage,
    '#/evidence': EvidencePage,
    '#/about': AboutPage,
    '#/invite': InvitePage,
  };

  const SiteComponent = siteRoutes[route];

  return (
    <div className="relative">
      {SiteComponent ? (
        <Suspense fallback={siteFallback}>
          <SiteComponent />
        </Suspense>
      ) : (
        <HomePage />
      )}
      <EarlyAccessModal open={earlyAccessOpen} onClose={() => setEarlyAccessOpen(false)} />
    </div>
  );
}

export default App;
