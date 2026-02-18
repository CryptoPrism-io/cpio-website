// Variant C: India-first CTA
import { DeckSlide } from '../DeckSlide';

interface SlideCtaCProps {
  onExport: () => void;
  onPdf: () => void;
}

export function SlideCtaC({ onExport, onPdf }: SlideCtaCProps) {
  return (
    <DeckSlide id="cta" number={10}>
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="CryptoPrism" className="w-10 h-10 md:w-12 md:h-12" style={{ filter: 'drop-shadow(0 0 8px rgba(14,203,129,0.5))' }} />
          <span className="font-display text-xl md:text-2xl font-extrabold tracking-tighter text-white uppercase">
            Crypto Prism
          </span>
        </div>

        <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-center">
          The world's <span className="text-[#0ecb81]">#1 crypto market</span>
          <br />deserves better tools.
        </h2>

        <p className="text-gray-400 text-base text-justify max-w-lg">
          119 million traders. Zero quant-grade platforms.
          <br />
          CryptoPrism is accepting closed early beta — 1,000+ coins, 130+ indicators, 44 news sources.
          <br />
          Built for India. Ready for the world.
        </p>

        <button className="hero-cta-primary text-base font-bold gap-2 cta-early-access-trigger">
          Apply for Early Access
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </button>

        <div className="flex items-center gap-6 text-gray-500 text-sm font-mono">
          <span>cryptoprism-io.web.app</span>
          <span className="text-gray-700">|</span>
          <span>@cryptoprism_io</span>
        </div>

        <div className="deck-print-hide flex items-center gap-4 mt-2">
          <button onClick={onPdf} className="hero-cta-outline text-xs gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="1" width="10" height="12" rx="1" />
              <path d="M5 5h4M5 7.5h4M5 10h2" />
            </svg>
            Save as PDF
          </button>
          <button onClick={onExport} className="hero-cta-outline text-xs gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 1v9M3 7l4 4 4-4M2 12h10" />
            </svg>
            Download PPT
          </button>
        </div>
      </div>
    </DeckSlide>
  );
}
