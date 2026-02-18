import { useContext, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { DeckPrintContext, DeckLightModeContext, DeckSlideIndexContext } from './DeckContext';

// Re-export for backwards compatibility
export { DeckPrintContext } from './DeckContext';

interface DeckSlideProps {
  id: string;
  number: number;
  children: React.ReactNode;
}

export function DeckSlide({ id, number, children }: DeckSlideProps) {
  const isPrint = useContext(DeckPrintContext);
  const light = useContext(DeckLightModeContext);
  const slideIndexMap = useContext(DeckSlideIndexContext);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  const show = isPrint || isInView;
  // Use context-based number (from DeckShell's slides array) or fall back to hardcoded prop
  const displayNumber = slideIndexMap[id] ?? number;

  return (
    <section
      id={`deck-slide-${id}`}
      data-slide={id}
      ref={ref}
      className="deck-slide min-h-screen snap-start flex items-center justify-center relative px-6 md:px-16 lg:px-24"
    >
      {/* Slide number badge */}
      <div className={`absolute top-6 left-6 font-mono text-xs select-none ${light ? 'text-gray-400' : 'text-gray-600'}`}>
        {String(displayNumber).padStart(2, '0')}
      </div>

      {isPrint ? (
        <div className="w-full max-w-6xl" style={{ opacity: 1 }}>
          {children}
        </div>
      ) : (
        <motion.div
          className="w-full max-w-6xl"
          initial={{ opacity: 0, y: 40 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {children}
        </motion.div>
      )}
    </section>
  );
}
