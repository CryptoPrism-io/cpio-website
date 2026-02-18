// Variant G: "Five Markets, One Problem" — the wedge cluster
import { DeckSlide } from '../DeckSlide';
import { targetMarkets } from '../../../data/pitchDeckVariants';

export function SlideFiveMarkets() {
  return (
    <DeckSlide id="fivemarkets" number={6}>
      <div className="flex flex-col items-center gap-8">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-center">
          Five markets. <span className="text-[#0ecb81]">One problem.</span>
        </h2>

        <p className="text-gray-500 text-sm text-justify max-w-lg">
          The world's fastest-growing crypto markets share the same structural gap:
          massive adoption, zero professional tooling.
        </p>

        {/* Market table */}
        <div className="w-full max-w-5xl space-y-3">
          {/* Header */}
          <div className="grid grid-cols-[40px_1fr_80px_80px_1fr] gap-3 px-4 text-xs font-mono text-gray-600">
            <span></span>
            <span>MARKET</span>
            <span>USERS</span>
            <span>RANK</span>
            <span>KEY PROBLEM</span>
          </div>

          {targetMarkets.map((m) => (
            <div
              key={m.country}
              className="glass-card terminal-green rounded-lg grid grid-cols-[40px_1fr_80px_80px_1fr] gap-3 px-4 py-4 items-center"
            >
              <span className="w-8 h-8 rounded bg-[rgba(14,203,129,0.1)] border border-[rgba(14,203,129,0.2)] flex items-center justify-center font-mono text-[#0ecb81] text-[10px] font-bold">{m.code}</span>
              <span className="font-mono text-white text-sm font-bold">{m.country}</span>
              <span className="font-mono text-[#0ecb81] text-sm font-bold">{m.users}</span>
              <span className="font-mono text-gray-400 text-xs">{m.rank}</span>
              <span className="text-gray-400 text-xs leading-relaxed">{m.problem}</span>
            </div>
          ))}
        </div>

        {/* Punchline */}
        <div className="glass-card rounded-xl p-5 w-full max-w-3xl text-center">
          <p className="font-mono text-[#0ecb81] text-lg font-bold mb-2">
            400M+ traders across five markets.
          </p>
          <p className="text-gray-400 text-sm">
            Same data infrastructure. Same NL interface. One pipeline serves all of them.
            <br />
            <span className="text-gray-500 text-xs">No localization needed — the intelligence is universal.</span>
          </p>
        </div>
      </div>
    </DeckSlide>
  );
}
