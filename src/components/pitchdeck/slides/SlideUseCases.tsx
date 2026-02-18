import { DeckSlide } from '../DeckSlide';
import { edgeMetrics } from '../../../data/pitchDeckData';

export function SlideUseCases() {
  return (
    <DeckSlide id="edge" number={6}>
      <div className="flex flex-col items-center gap-10">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-center">
          Measured <span className="text-[#0ecb81]">edge</span>
        </h2>

        <p className="text-gray-500 text-sm text-center max-w-lg">
          Honest framing. Validated against documented market events.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {edgeMetrics.map((metric) => (
            <div
              key={metric.label}
              className="glass-card terminal-green rounded-xl p-8 flex flex-col items-center text-center gap-4"
            >
              <span className="font-mono text-[#0ecb81] text-4xl md:text-5xl font-bold">
                {metric.value}
              </span>
              <span className="text-white text-sm font-medium">
                {metric.label}
              </span>
              <span className="text-gray-500 text-xs leading-relaxed">
                {metric.context}
              </span>
              <span className="text-gray-600 text-[10px] font-mono mt-auto">
                {metric.basis}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DeckSlide>
  );
}
