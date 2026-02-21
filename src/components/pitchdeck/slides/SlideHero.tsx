import { DeckSlide } from '../DeckSlide';
import { heroStats } from '../../../data/pitchDeckData';

export function SlideHero() {
  return (
    <DeckSlide id="hero" number={1}>
      <div className="flex flex-col items-center text-center gap-8">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="CryptoPrism" className="w-10 h-10 md:w-12 md:h-12" style={{ filter: 'drop-shadow(0 0 8px rgba(14,203,129,0.5))' }} />
          <span className="font-display text-xl md:text-2xl font-extrabold tracking-tighter text-white uppercase">
            Crypto Prism
          </span>
        </div>

        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Ask markets questions.
          <br />
          Get <span className="text-[#047857]">quant-grade</span> answers.
        </h1>

        <p className="text-gray-400 text-base md:text-lg max-w-2xl">
          The AI quant copilot for crypto.
          <br />
          Natural language terminal, strategy library, dynamic watchlists,
          <br className="hidden md:block" />
          and news intelligence — powered by a real-time data pipeline.
        </p>

        <div className="flex items-center gap-6 mt-4">
          {heroStats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-6">
              {i > 0 && <div className="w-px h-12 bg-gray-700" />}
              <div className="flex flex-col items-center">
                <span className="font-mono text-[#047857] text-2xl md:text-3xl font-bold">{stat.value}</span>
                <span className="text-gray-500 text-xs mt-1">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DeckSlide>
  );
}
