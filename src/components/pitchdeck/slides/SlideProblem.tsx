import { DeckSlide } from '../DeckSlide';
import { bleedScenarios } from '../../../data/pitchDeckData';

export function SlideProblem() {
  return (
    <DeckSlide id="problem" number={2}>
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

        <p className="text-gray-500 text-sm text-justify max-w-lg">
          These aren't edge cases. They happen across every asset, every market cycle.
          The common factor: <span className="text-gray-300">traders lack the tools to detect shifts in time.</span>
        </p>

        <div className="glass-card rounded-lg px-5 py-3 max-w-lg text-center">
          <span className="text-gray-500 text-xs">Yet traders <span className="text-[#047857] font-bold">do pay</span> for better tools — </span>
          <span className="text-white text-xs font-bold">TradingView: $172M ARR</span>
          <span className="text-gray-500 text-xs"> &middot; </span>
          <span className="text-white text-xs font-bold">Nansen: $75M raised</span>
          <span className="text-gray-500 text-xs"> &middot; </span>
          <span className="text-white text-xs font-bold">Glassnode: profitable</span>
          <br />
          <span className="text-gray-600 text-[10px] font-mono">The market for paid intelligence is proven. The gap is accessibility.</span>
        </div>
      </div>
    </DeckSlide>
  );
}
