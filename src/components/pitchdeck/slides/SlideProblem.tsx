import { DeckSlide } from '../DeckSlide';
import { bleedScenarios } from '../../../data/pitchDeckData';

export function SlideProblem() {
  return (
    <DeckSlide id="bleed" number={2}>
      <div className="flex flex-col items-center gap-10">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-center">
          Where the money <span className="text-[#ff4d4d]">disappears</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {bleedScenarios.map((scenario) => (
            <div
              key={scenario.label}
              className="glass-card terminal-red inner-glow-red rounded-xl p-6 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[#ff4d4d] text-sm font-bold tracking-wider uppercase">
                  {scenario.label}
                </span>
              </div>
              <div className="font-mono text-[#ff4d4d] text-2xl font-bold">
                {scenario.stat}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {scenario.description}
              </p>
              <span className="text-gray-600 text-[10px] font-mono mt-auto">
                {scenario.source}
              </span>
            </div>
          ))}
        </div>

        <p className="text-gray-500 text-sm text-center max-w-lg">
          These aren't edge cases. They happen across every asset, every market cycle.
          <br />
          The common factor: <span className="text-gray-300">the trader detected the shift too late.</span>
        </p>
      </div>
    </DeckSlide>
  );
}
