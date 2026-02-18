// Variant C: India-first hero
import { DeckSlide } from '../DeckSlide';

export function SlideHeroC() {
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
          119 million crypto traders.
          <br />
          <span className="text-[#ff4d4d]">Zero</span> quant-grade tools.
        </h1>

        <p className="text-gray-400 text-base md:text-lg max-w-2xl">
          India is the #1 crypto market on Earth — for the third year running.
          <br />
          But its traders make decisions from Telegram groups and YouTube videos.
          <br className="hidden md:block" />
          CryptoPrism gives them institutional-grade intelligence through plain English.
        </p>

        <div className="flex items-center gap-6 mt-4">
          {[
            { value: '119M', label: 'crypto users in India' },
            { value: '#1', label: 'Chainalysis adoption, 3yr' },
            { value: '49%', label: 'ended FY25 with losses', red: true },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-6">
              {i > 0 && <div className="w-px h-12 bg-gray-700" />}
              <div className="flex flex-col items-center">
                <span className={`font-mono text-2xl md:text-3xl font-bold ${stat.red ? 'text-[#ff4d4d]' : 'text-[#0ecb81]'}`}>{stat.value}</span>
                <span className="text-gray-500 text-xs mt-1">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DeckSlide>
  );
}
