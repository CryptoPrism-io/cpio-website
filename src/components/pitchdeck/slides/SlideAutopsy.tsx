import { DeckSlide } from '../DeckSlide';
import { autopsyTitle, autopsyContext, autopsySteps, autopsySummary } from '../../../data/pitchDeckData';

export function SlideAutopsy() {
  return (
    <DeckSlide id="autopsy" number={5}>
      <div className="flex flex-col items-center gap-6">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-center">
          One crash. <span className="text-[#047857]">Two outcomes.</span>
        </h2>

        <div className="text-center">
          <span className="font-mono text-[#047857] text-sm">{autopsyTitle}</span>
          <p className="text-gray-500 text-xs mt-1 max-w-lg mx-auto">{autopsyContext}</p>
        </div>

        {/* Timeline */}
        <div className="w-full max-w-5xl space-y-3">
          {/* Header */}
          <div className="grid grid-cols-[100px_1fr_1fr] md:grid-cols-[120px_1fr_1fr] gap-3 px-3">
            <span className="font-mono text-gray-600 text-xs">TIME</span>
            <span className="font-mono text-[#b91c1c] text-xs">TRADER</span>
            <span className="font-mono text-[#047857] text-xs">CRYPTOPRISM</span>
          </div>

          {autopsySteps.map((step, i) => (
            <div
              key={i}
              className="grid grid-cols-[100px_1fr_1fr] md:grid-cols-[120px_1fr_1fr] gap-3 items-start"
            >
              <span className="font-mono text-gray-500 text-xs pt-3 pl-3">
                {step.time.split(', ')[1]}
              </span>
              <div className={`rounded-lg p-3 text-xs leading-relaxed ${
                step.traderOutcome === 'loss'
                  ? 'glass-card terminal-red text-[#b91c1c]'
                  : 'glass-card text-gray-400'
              }`}>
                {step.trader}
              </div>
              <div className={`rounded-lg p-3 text-xs leading-relaxed ${
                step.systemOutcome === 'win'
                  ? 'glass-card terminal-green text-[#047857]'
                  : 'glass-card text-gray-400'
              }`}>
                {step.system}
              </div>
            </div>
          ))}

          {/* Summary */}
          <div className="grid grid-cols-[100px_1fr_1fr] md:grid-cols-[120px_1fr_1fr] gap-3 pt-2">
            <span className="font-mono text-gray-600 text-xs pl-3">RESULT</span>
            <div className="font-mono text-[#b91c1c] text-lg font-bold pl-3">
              {autopsySummary.traderResult}
            </div>
            <div className="font-mono text-[#047857] text-lg font-bold pl-3">
              {autopsySummary.systemResult}
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-[10px] font-mono text-center max-w-2xl italic">
          Illustrative backtest on historical data — not a performance guarantee.
          Our thesis: better information leads to better risk management, not guaranteed returns.
        </p>
      </div>
    </DeckSlide>
  );
}
