// Variant F: "Where Crypto Actually Lives" — flipping the competitive narrative
import { DeckSlide } from '../DeckSlide';
import { targetMarkets } from '../../../data/pitchDeckVariants';

export function SlideWhereCrypto() {
  return (
    <DeckSlide id="wherecrypto" number={6}>
      <div className="flex flex-col items-center gap-8">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-center">
          Where crypto <span className="text-[#047857]">actually lives</span>
        </h2>

        {/* The mismatch */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card rounded-xl p-5 border border-[rgba(255,77,77,0.15)]">
            <div className="font-mono text-[#ff4d4d] text-xs uppercase tracking-wider mb-4">Where products are built</div>
            <div className="space-y-3">
              {['San Francisco', 'London', 'Singapore'].map((city) => (
                <div key={city} className="flex items-center gap-3">
                  <span className="text-gray-600 text-sm">{city}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-gray-600 text-xs font-mono">
              Glassnode, Nansen, Messari, Dune — all built for Western quants
            </div>
          </div>

          <div className="glass-card rounded-xl p-5 border border-[rgba(14,203,129,0.2)]">
            <div className="font-mono text-[#047857] text-xs uppercase tracking-wider mb-4">Where traders actually are</div>
            <div className="space-y-3">
              {targetMarkets.slice(0, 3).map((m) => (
                <div key={m.country} className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded bg-[rgba(14,203,129,0.1)] border border-[rgba(14,203,129,0.2)] flex items-center justify-center font-mono text-[#047857] text-[10px] font-bold">{m.code}</span>
                  <span className="text-white text-sm font-medium">{m.country}</span>
                  <span className="font-mono text-[#047857] text-xs ml-auto">{m.users}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-gray-600 text-xs font-mono">
              210M+ users in top 3 alone. Zero quant-grade tools built for them.
            </div>
          </div>
        </div>

        {/* All 5 target markets */}
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {targetMarkets.map((m) => (
              <div key={m.country} className="glass-card terminal-green rounded-xl p-4 flex flex-col items-center text-center gap-2">
                <span className="w-9 h-9 rounded bg-[rgba(14,203,129,0.1)] border border-[rgba(14,203,129,0.2)] flex items-center justify-center font-mono text-[#047857] text-xs font-bold">{m.code}</span>
                <span className="font-mono text-[#047857] text-xs font-bold">{m.country}</span>
                <span className="font-mono text-white text-lg font-bold">{m.users}</span>
                <span className="text-gray-500 text-[10px]">{m.rank}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-xl p-4 w-full max-w-3xl text-center">
          <p className="text-gray-300 text-sm">
            <span className="font-mono text-[#047857] font-bold">400M+ traders</span> across five markets.
            <span className="font-mono text-[#ff4d4d] font-bold"> 84%</span> rely on social media.
            <br />
            <span className="text-gray-400">CryptoPrism is built for this trader. The one nobody else is building for.</span>
          </p>
        </div>
      </div>
    </DeckSlide>
  );
}
