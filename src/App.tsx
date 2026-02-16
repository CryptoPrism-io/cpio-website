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

function App() {
  return (
    <div className="relative">
      <div className="fixed inset-0 grid-overlay pointer-events-none z-0 opacity-40" />
      <Header />
      <main className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
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
    </div>
  );
}

export default App;
