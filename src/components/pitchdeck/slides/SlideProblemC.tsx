// Variant C: India-first problem slide — adds India-specific stats to the sourced loss data
import { DeckSlide } from '../DeckSlide';
import { bleedScenarios } from '../../../data/pitchDeckData';

export function SlideProblemC() {
  return (
    <DeckSlide id="problem" number={2}>
      <div className="flex flex-col items-center gap-8">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-center">
          Where the money <span className="text-[#b91c1c]">disappears</span>
        </h2>

        {/* Global sourced stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl">
          {bleedScenarios.map((scenario) => (
            <div
              key={scenario.label}
              className="glass-card terminal-red inner-glow-red rounded-xl p-5 flex flex-col gap-3"
            >
              <span className="font-mono text-[#b91c1c] text-xs font-bold tracking-wider uppercase">
                {scenario.label}
              </span>
              <div className="font-mono text-[#b91c1c] text-2xl font-bold">{scenario.stat}</div>
              <p className="text-gray-400 text-xs leading-relaxed">{scenario.description}</p>
              <span className="text-gray-600 text-[10px] font-mono mt-auto">{scenario.source}</span>
            </div>
          ))}
        </div>

        {/* India-specific amplifier */}
        <div className="glass-card rounded-xl p-5 w-full max-w-5xl border border-[rgba(255,77,77,0.2)]">
          <div className="font-mono text-[#b91c1c] text-xs uppercase tracking-wider mb-3">In India, it's worse</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '49%', label: 'of Indian traders ended FY25 in losses', source: 'Indian IT Dept data' },
              { value: '84%', label: 'rely on social media for trading decisions', source: 'CoinGecko survey' },
              { value: 'Rs 6,600 Cr', label: 'lost to GainBitcoin Ponzi alone', source: 'CBI, Feb 2025' },
              { value: '$6.1B', label: 'capital flight to offshore exchanges', source: 'Since 2022' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center gap-1">
                <span className="font-mono text-[#b91c1c] text-lg font-bold">{s.value}</span>
                <span className="text-gray-400 text-[10px]">{s.label}</span>
                <span className="text-gray-600 text-[9px] font-mono">{s.source}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DeckSlide>
  );
}
