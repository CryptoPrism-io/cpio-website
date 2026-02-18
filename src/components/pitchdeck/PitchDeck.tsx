import { useEffect, useRef, useState, useCallback } from 'react';
import { slides } from '../../data/pitchDeckData';
import { exportPptx } from '../../utils/exportPptx';
import { DeckNav } from './DeckNav';
import { DeckPrintContext, DeckLightModeContext } from './DeckContext';
import { SlideHero } from './slides/SlideHero';
import { SlideProblem } from './slides/SlideProblem';
import { SlideCognitiveShift } from './slides/SlideCognitiveShift';
import { SlidePipeline } from './slides/SlidePipeline';
import { SlideHeuristics } from './slides/SlideHeuristics';
import { SlideUseCases } from './slides/SlideUseCases';
import { SlideScaling } from './slides/SlideScaling';
import { SlideMetrics } from './slides/SlideMetrics';
import { SlideCta } from './slides/SlideCta';
import { SlideTeam } from './slides/SlideTeam';

export default function PitchDeck() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [printMode, setPrintMode] = useState(false);
  const [lightMode, setLightMode] = useState(false);

  // IntersectionObserver to track active slide
  useEffect(() => {
    if (printMode) return;
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll<HTMLElement>('[data-slide]');
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const slideId = entry.target.getAttribute('data-slide');
            const idx = slides.findIndex((s) => s.id === slideId);
            if (idx !== -1) setActiveIndex(idx);
          }
        }
      },
      { root: container, threshold: 0.5 }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [printMode]);

  // Navigate to specific slide
  const navigateTo = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const target = container.querySelector(`[data-slide="${slides[index].id}"]`);
    target?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        setActiveIndex((prev) => {
          const next = Math.min(prev + 1, slides.length - 1);
          navigateTo(next);
          return next;
        });
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setActiveIndex((prev) => {
          const next = Math.max(prev - 1, 0);
          navigateTo(next);
          return next;
        });
      } else if (e.key === 'Escape') {
        window.location.hash = '';
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigateTo]);

  // Listen for afterprint to restore normal mode
  useEffect(() => {
    const restore = () => setPrintMode(false);
    window.addEventListener('afterprint', restore);
    return () => window.removeEventListener('afterprint', restore);
  }, []);

  const handleExit = useCallback(() => {
    window.location.hash = '';
  }, []);

  const handleExport = useCallback(async () => {
    try {
      await exportPptx();
    } catch (err) {
      console.error('PPT export failed:', err);
    }
  }, []);

  const handlePdf = useCallback(() => {
    setPrintMode(true);
  }, []);

  // Trigger print after printMode renders
  useEffect(() => {
    if (!printMode) return;
    const id = setTimeout(() => window.print(), 100);
    return () => clearTimeout(id);
  }, [printMode]);

  const slideContent = (
    <>
      <SlideHero />
      <SlideProblem />
      <SlideCognitiveShift />
      <SlidePipeline />
      <SlideHeuristics />
      <SlideUseCases />
      <SlideScaling />
      <SlideMetrics />
      <SlideCta />
      <SlideTeam onExport={handleExport} onPdf={handlePdf} />
    </>
  );

  const bgDark = 'bg-[#020405]';
  const bgLight = 'bg-[#f5f7fa]';

  // Print mode: flat layout, no fixed/overflow/snap, all slides forced visible
  if (printMode) {
    return (
      <DeckPrintContext.Provider value={true}>
        <DeckLightModeContext.Provider value={lightMode}>
          <div className={`deck-root ${lightMode ? bgLight : bgDark} ${lightMode ? 'deck-light' : ''}`}>
            <div ref={containerRef} className="deck-container">
              {slideContent}
            </div>
          </div>
        </DeckLightModeContext.Provider>
      </DeckPrintContext.Provider>
    );
  }

  // Normal interactive mode
  return (
    <DeckLightModeContext.Provider value={lightMode}>
      <div className={`deck-root fixed inset-0 z-[100] ${lightMode ? bgLight : bgDark} ${lightMode ? 'deck-light' : ''}`}>
        {/* Background layers — matching main site terminal aesthetic */}
        <div className="deck-bg-layer absolute inset-0 pointer-events-none">
          {/* Layer 1: radial gradient */}
          <div className={`absolute inset-0 ${
            lightMode
              ? 'bg-[radial-gradient(circle_at_50%_35%,rgba(14,203,129,0.06)_0%,transparent_60%)]'
              : 'bg-[radial-gradient(circle_at_50%_35%,rgba(14,203,129,0.07)_0%,rgba(14,203,129,0.03)_25%,transparent_60%)]'
          }`} />

          {/* Layer 2: grid */}
          <div className="absolute inset-0 deck-grid-layer" style={{
            backgroundImage: lightMode
              ? 'linear-gradient(rgba(14,203,129,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(14,203,129,0.06) 1px, transparent 1px)'
              : 'linear-gradient(rgba(14,203,129,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(14,203,129,0.04) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            opacity: lightMode ? 0.5 : 0.3,
          }} />

          {/* Layer 3: scanlines */}
          <div className="absolute inset-0" style={{
            background: lightMode
              ? 'repeating-linear-gradient(to bottom, rgba(14,203,129,0.03) 0px, rgba(14,203,129,0.03) 1px, transparent 2px, transparent 6px)'
              : 'repeating-linear-gradient(to bottom, rgba(14,203,129,0.03) 0px, rgba(14,203,129,0.03) 1px, transparent 2px, transparent 6px)',
            opacity: lightMode ? 0.4 : 1,
          }} />

          {/* Layer 4: atmospheric glow */}
          <div className="absolute inset-0 deck-glow-layer" style={{
            background: lightMode
              ? 'radial-gradient(circle at 50% 38%, rgba(14,203,129,0.08) 0%, rgba(14,203,129,0.03) 18%, transparent 55%)'
              : 'radial-gradient(circle at 50% 38%, rgba(14,203,129,0.14) 0%, rgba(14,203,129,0.06) 18%, rgba(14,203,129,0.02) 35%, transparent 55%)',
          }} />

          {/* Layer 5: vignette */}
          {!lightMode && (
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.3) 100%)',
            }} />
          )}
        </div>

        {/* Scroll container */}
        <div
          ref={containerRef}
          className="deck-container h-screen overflow-y-auto snap-y snap-mandatory relative z-10"
        >
          {slideContent}
        </div>

        {/* Navigation */}
        <DeckNav
          activeIndex={activeIndex}
          onNavigate={navigateTo}
          onExit={handleExit}
          onExport={handleExport}
          onPdf={handlePdf}
          lightMode={lightMode}
          onToggleLight={() => setLightMode((v) => !v)}
        />
      </div>
    </DeckLightModeContext.Provider>
  );
}
