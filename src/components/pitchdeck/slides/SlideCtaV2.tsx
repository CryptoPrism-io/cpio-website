// V2 Slide 15: CTA combining India hook with global ambition
import { DeckSlide } from '../DeckSlide';

interface SlideCtaV2Props {
  onExport: () => void;
  onPdf: () => void;
}

export function SlideCtaV2({ onExport, onPdf }: SlideCtaV2Props) {
  return (
    <DeckSlide id="cta" number={14}>
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="CryptoPrism" className="w-10 h-10 md:w-12 md:h-12" style={{ filter: 'drop-shadow(0 0 8px rgba(14,203,129,0.5))' }} />
          <span className="font-display text-xl md:text-2xl font-extrabold tracking-tighter text-white uppercase">
            Crypto Prism
          </span>
        </div>

        <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-center">
          See the next signal <span className="text-[#0ecb81]">first.</span>
        </h2>

        <p className="text-gray-400 text-base text-justify max-w-lg">
          The platform is live. The pipeline processes 24/7.
          <br />
          1,000+ coins. 130+ indicators. 44 news sources.
          <br />
          Built from India. Built for every trader on Earth.
        </p>

        {/* Stats reminder */}
        <div className="flex items-center gap-6">
          {[
            { value: '400M+', label: 'target traders' },
            { value: '5', label: 'markets' },
            { value: '0', label: 'competitors with all 4 pillars' },
          ].map((s, i) => (
            <div key={s.label} className="flex items-center gap-6">
              {i > 0 && <div className="w-px h-10 bg-gray-700" />}
              <div className="flex flex-col items-center">
                <span className="font-mono text-[#0ecb81] text-xl font-bold">{s.value}</span>
                <span className="text-gray-500 text-[10px]">{s.label}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="hero-cta-primary text-base font-bold gap-2 cta-early-access-trigger">
          Apply for Early Access
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </button>

        <div className="flex items-center gap-6 text-gray-500 text-sm font-mono">
          <span>cryptoprism.io</span>
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
