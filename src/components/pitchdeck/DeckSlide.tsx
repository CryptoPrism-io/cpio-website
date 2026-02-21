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
      {/* Neumorphic background — dark screen mode only */}
      {!isPrint && !light && <DeckBackground variant={bgVariant} />}

      {/* Slide number badge — hidden in print, shown in interactive mode */}
      <div className={`deck-slide-number absolute top-6 left-6 font-mono text-xs select-none z-10 ${light ? 'text-gray-400' : 'text-gray-600'}`}>
        {String(displayNumber).padStart(2, '0')}
      </div>

      {isPrint ? (
        <>
          {/* Print header: top-left logo+name, top-right URL link */}
          <div style={{
            position: 'absolute',
            top: '-7mm',
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
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
            <a
              href="https://cryptoprism.io"
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: '6pt',
                color: 'rgba(14,203,129,0.6)',
                letterSpacing: '0.3px',
                textDecoration: 'none',
              }}
            >
              cryptoprism.io
            </a>
          </div>

          {/* Content — same width/max-width as interactive mode, no extra padding */}
          <div className="w-full max-w-6xl relative z-10" style={{ opacity: 1 }}>
            {children}
          </div>

          {/* Print footer: bottom-left company name, bottom-right page number */}
          <div style={{
            position: 'absolute',
            bottom: '-7mm',
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span style={{
              fontFamily: "'Courier New', monospace",
              fontSize: '6pt',
              color: 'rgba(14,203,129,0.3)',
              letterSpacing: '0.3px',
            }}>
              Trinetry Infotech Pvt. Ltd. · Confidential
            </span>
            <span style={{
              fontFamily: "'Courier New', monospace",
              fontSize: '7pt',
              color: 'rgba(14,203,129,0.7)',
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
