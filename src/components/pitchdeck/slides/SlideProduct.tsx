import { DeckSlide } from '../DeckSlide';
import { productPillars } from '../../../data/pitchDeckData';

const icons: Record<string, JSX.Element> = {
  terminal: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#0ecb81" strokeWidth="2">
      <rect x="3" y="5" width="26" height="22" rx="3" />
      <path d="M8 13l4 4-4 4" />
      <path d="M16 21h8" />
    </svg>
  ),
  strategy: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#0ecb81" strokeWidth="2">
      <path d="M4 24l7-7 4 4 6-8 7-5" />
      <circle cx="28" cy="8" r="2" />
      <path d="M4 28h24" />
    </svg>
  ),
  watchlist: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#0ecb81" strokeWidth="2">
      <rect x="5" y="4" width="22" height="24" rx="2" />
      <path d="M10 11h12M10 16h12M10 21h8" />
      <path d="M24 11l-2 2-1.5-1.5" />
    </svg>
  ),
  news: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#0ecb81" strokeWidth="2">
      <rect x="4" y="5" width="24" height="22" rx="2" />
      <path d="M9 10h14M9 15h8M9 20h10" />
      <rect x="21" y="14" width="6" height="7" rx="1" />
    </svg>
  ),
};

export function SlideProduct() {
  return (
    <DeckSlide id="product" number={3}>
      <div className="flex flex-col items-center gap-10">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-center">
          One platform. <span className="text-[#0ecb81]">Four intelligence layers.</span>
        </h2>

        <p className="text-gray-500 text-sm text-justify max-w-lg">
          Not a dashboard. Not a chatbot. A complete AI quant system
          that covers every angle of crypto intelligence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {productPillars.map((pillar) => (
            <div
              key={pillar.title}
              className="glass-card terminal-green rounded-xl p-6 flex items-start gap-4"
            >
              <div className="shrink-0 mt-1">
                {icons[pillar.icon]}
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[#0ecb81] text-sm font-bold tracking-wider">
                  {pillar.title}
                </span>
                <span className="text-gray-400 text-sm leading-relaxed">
                  {pillar.tagline}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DeckSlide>
  );
}
