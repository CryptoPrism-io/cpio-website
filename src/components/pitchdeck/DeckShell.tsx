import { useEffect, useRef, useState, useCallback, useMemo, type ReactNode } from 'react';
import { exportPptx } from '../../utils/exportPptx';
import { DeckNav } from './DeckNav';
import { DeckPrintContext, DeckLightModeContext, DeckSlideIndexContext } from './DeckContext';
import type { SlideData } from '../../data/pitchDeckData';

interface DeckShellProps {
  slides: readonly SlideData[];
  /** Custom PPT export function. Defaults to the 10-slide export. */
  exportFn?: () => Promise<void>;
  children: (props: { onExport: () => void; onPdf: () => void }) => ReactNode;
}

export function DeckShell({ slides, exportFn, children }: DeckShellProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [printMode, setPrintMode] = useState(false);
  const [lightMode, setLightMode] = useState(true);

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
  }, [printMode, slides]);

  // Navigate to specific slide
  const navigateTo = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const target = container.querySelector(`[data-slide="${slides[index].id}"]`);
    target?.scrollIntoView({ behavior: 'smooth' });
  }, [slides]);

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
  }, [navigateTo, slides.length]);

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
      await (exportFn ?? exportPptx)();
    } catch (err) {
      console.error('PPT export failed:', err);
    }
  }, [exportFn]);

  const handlePdf = useCallback(() => {
    setPrintMode(true);
  }, []);

  // Trigger print after printMode renders
  useEffect(() => {
    if (!printMode) return;
    const id = setTimeout(() => window.print(), 100);
    return () => clearTimeout(id);
  }, [printMode]);

  const slideContent = children({ onExport: handleExport, onPdf: handlePdf });

  // Build slide id → 1-based number map so DeckSlide can auto-number
  const slideIndexMap = useMemo(
    () => Object.fromEntries(slides.map((s, i) => [s.id, i + 1])),
    [slides],
  );

  const bgDark = 'bg-[#020405]';
  const bgLight = 'bg-[#f5f7fa]';

  // Print mode: flat layout
  if (printMode) {
    return (
      <DeckPrintContext.Provider value={true}>
        <DeckLightModeContext.Provider value={lightMode}>
          <DeckSlideIndexContext.Provider value={slideIndexMap}>
            <div className={`deck-root ${lightMode ? bgLight : bgDark} ${lightMode ? 'deck-light' : ''}`}>
              <div ref={containerRef} className="deck-container">
                {slideContent}
              </div>
            </div>
          </DeckSlideIndexContext.Provider>
        </DeckLightModeContext.Provider>
      </DeckPrintContext.Provider>
    );
  }

  // Normal interactive mode
  return (
    <DeckLightModeContext.Provider value={lightMode}>
      <DeckSlideIndexContext.Provider value={slideIndexMap}>
      <div className={`deck-root fixed inset-0 z-[100] ${lightMode ? bgLight : bgDark} ${lightMode ? 'deck-light' : ''}`}>
        <div className="deck-bg-layer absolute inset-0 pointer-events-none">
          <div className={`absolute inset-0 ${
            lightMode
              ? 'bg-[radial-gradient(circle_at_50%_35%,rgba(14,203,129,0.06)_0%,transparent_60%)]'
              : 'bg-[radial-gradient(circle_at_50%_35%,rgba(14,203,129,0.07)_0%,rgba(14,203,129,0.03)_25%,transparent_60%)]'
          }`} />
          <div className="absolute inset-0 deck-grid-layer" style={{
            backgroundImage: lightMode
              ? 'linear-gradient(rgba(14,203,129,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(14,203,129,0.06) 1px, transparent 1px)'
              : 'linear-gradient(rgba(14,203,129,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(14,203,129,0.04) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            opacity: lightMode ? 0.5 : 0.3,
          }} />
          <div className="absolute inset-0" style={{
            background: 'repeating-linear-gradient(to bottom, rgba(14,203,129,0.03) 0px, rgba(14,203,129,0.03) 1px, transparent 2px, transparent 6px)',
            opacity: lightMode ? 0.4 : 1,
          }} />
          <div className="absolute inset-0 deck-glow-layer" style={{
            background: lightMode
              ? 'radial-gradient(circle at 50% 38%, rgba(14,203,129,0.08) 0%, rgba(14,203,129,0.03) 18%, transparent 55%)'
              : 'radial-gradient(circle at 50% 38%, rgba(14,203,129,0.14) 0%, rgba(14,203,129,0.06) 18%, rgba(14,203,129,0.02) 35%, transparent 55%)',
          }} />
          {!lightMode && (
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.3) 100%)',
            }} />
          )}
        </div>

        <div
          ref={containerRef}
          className="deck-container h-screen overflow-y-auto snap-y snap-mandatory relative z-10"
        >
          {slideContent}
        </div>

        <DeckNav
          slides={slides}
          activeIndex={activeIndex}
          onNavigate={navigateTo}
          onExit={handleExit}
          onExport={handleExport}
          onPdf={handlePdf}
          lightMode={lightMode}
          onToggleLight={() => setLightMode((v) => !v)}
        />
      </div>
      </DeckSlideIndexContext.Provider>
    </DeckLightModeContext.Provider>
  );
}
