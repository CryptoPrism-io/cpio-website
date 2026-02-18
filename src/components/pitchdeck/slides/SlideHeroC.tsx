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

        {/* Hero headline — stacked for visual balance */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-display font-bold text-white leading-none">
            <span className="block text-[#0ecb81] font-mono text-6xl md:text-8xl lg:text-9xl tracking-tight">
              119M
            </span>
            <span className="block text-lg md:text-2xl lg:text-3xl text-gray-400 font-normal mt-2">
              of 659M global crypto traders are in India
            </span>
          </h1>
          <p className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-white mt-4">
            <span className="text-[#ff4d4d]">Zero</span> quant-grade tools.
          </p>
        </div>

        <p className="text-gray-400 text-sm md:text-base max-w-2xl text-justify">
          The world's #1 crypto market by adoption — for the third year running.
          Yet its traders make decisions from Telegram groups and YouTube videos.
          CryptoPrism gives them institutional-grade intelligence through plain English.
        </p>

        <div className="flex items-center gap-6 mt-2">
          {[
            { value: '#1', label: 'Chainalysis adoption, 3yr' },
            { value: '49%', label: 'ended FY25 with losses', red: true },
            { value: '84%', label: 'rely on social media', red: true },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-6">
              {i > 0 && <div className="w-px h-10 bg-gray-700" />}
              <div className="flex flex-col items-center">
                <span className={`font-mono text-xl md:text-2xl font-bold ${stat.red ? 'text-[#ff4d4d]' : 'text-[#0ecb81]'}`}>{stat.value}</span>
                <span className="text-gray-500 text-[10px] md:text-xs mt-1">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DeckSlide>
  );
}
