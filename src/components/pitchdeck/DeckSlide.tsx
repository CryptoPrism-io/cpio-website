import { useContext, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { DeckPrintContext, DeckLightModeContext, DeckSlideIndexContext } from './DeckContext';
import { DeckBackground, type DeckBgVariant } from './DeckBackground';

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
  const displayNumber = slideIndexMap[id] ?? number;
  const totalSlides = Object.keys(slideIndexMap).length || 0;

  const bgVariant = ((displayNumber - 1) % 4) as DeckBgVariant;

  return (
    <section
      id={`deck-slide-${id}`}
      data-slide={id}
      ref={ref}
      className="deck-slide min-h-screen snap-start flex items-center justify-center relative px-6 md:px-16 lg:px-24"
    >
      {/* Neumorphic background — screen: full variant; print: corner-decoration variant */}
      {isPrint
        ? <DeckBackground variant={bgVariant} print />
        : <DeckBackground variant={bgVariant} light={light} />
      }

      {/* Slide number badge — hidden in print, shown in interactive mode */}
      <div className={`deck-slide-number absolute top-6 left-6 font-mono text-xs select-none z-10 ${light ? 'text-gray-400' : 'text-gray-600'}`}>
        {String(displayNumber).padStart(2, '0')}
      </div>

      {isPrint ? (
        <>
          {/* Print header: top-left logo+name only */}
          <div style={{
            position: 'absolute',
            top: '-7mm',
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <img
                src="/logo.svg"
                alt=""
                style={{ width: 13, height: 13, filter: 'drop-shadow(0 0 2px rgba(14,203,129,0.7))' }}
              />
              <span style={{
                fontFamily: "'Courier New', monospace",
                fontSize: '7pt',
                color: 'rgba(14,203,129,0.9)',
                letterSpacing: '2px',
                fontWeight: 'bold',
              }}>
                CRYPTOPRISM
              </span>
            </div>
          </div>

          {/* Content — same width/max-width as interactive mode, no extra padding */}
          <div className="w-full max-w-6xl relative z-10" style={{ opacity: 1 }}>
            {children}
          </div>

          {/* Print footer: centered logo link, page number pinned right */}
          <div style={{
            position: 'absolute',
            bottom: '-7mm',
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <a
              href="https://cryptoprism.io"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
            >
              <img
                src="/logo.svg"
                alt=""
                style={{ width: 14, height: 14, filter: 'drop-shadow(0 0 6px rgba(4,120,87,0.65))' }}
              />
              <span style={{
                fontFamily: "'Courier New', monospace",
                fontSize: '7pt',
                color: '#047857',
                letterSpacing: '2px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}>
                CryptoPrism.io
              </span>
            </a>
            {/* Page number — absolute right so it doesn't shift the centered logo */}
            <span style={{
              position: 'absolute',
              right: 0,
              fontFamily: "'Courier New', monospace",
              fontSize: '7pt',
              color: 'rgba(4,120,87,0.6)',
              letterSpacing: '1px',
            }}>
              {String(displayNumber).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
            </span>
          </div>
        </>
      ) : (
        <motion.div
          className="w-full max-w-6xl relative z-10"
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
