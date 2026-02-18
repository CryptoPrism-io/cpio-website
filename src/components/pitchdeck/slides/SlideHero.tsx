import { DeckSlide } from '../DeckSlide';

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
          Traders systematically lose money
          <br />
          in <span className="text-[#ff4d4d]">predictable</span> situations.
        </h1>

        <p className="text-gray-400 text-base md:text-lg max-w-2xl">
          Regime shifts. False breakouts. Late exits.
          <br />
          These aren't random — they're structural.
          <br className="hidden md:block" />
          We built a system that detects and corrects them.
        </p>

        <div className="flex items-center gap-6 mt-4">
          <div className="flex flex-col items-center">
            <span className="font-mono text-[#ff4d4d] text-2xl md:text-3xl font-bold">73-81%</span>
            <span className="text-gray-500 text-xs mt-1">of retail crypto investors<br />lost money (BIS, 2022)</span>
          </div>
          <div className="w-px h-12 bg-gray-700" />
          <div className="flex flex-col items-center">
            <span className="font-mono text-[#ff4d4d] text-2xl md:text-3xl font-bold">1.5x</span>
            <span className="text-gray-500 text-xs mt-1">more likely to sell winners<br />than losers (Odean, 1998)</span>
          </div>
          <div className="w-px h-12 bg-gray-700" />
          <div className="flex flex-col items-center">
            <span className="font-mono text-[#ff4d4d] text-2xl md:text-3xl font-bold">~70%</span>
            <span className="text-gray-500 text-xs mt-1">of breakouts fail to<br />sustain (Bulkowski)</span>
          </div>
        </div>
      </div>
    </DeckSlide>
  );
}
