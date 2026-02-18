import { DeckSlide } from '../DeckSlide';
import { repetitionCases } from '../../../data/pitchDeckData';

export function SlidePipeline() {
  return (
    <DeckSlide id="repetition" number={4}>
      <div className="flex flex-col items-center gap-8">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-center">
          Not one trade. <span className="text-[#0ecb81]">Every regime shift.</span>
        </h2>

        <p className="text-gray-500 text-sm text-center max-w-lg">
          Documented crashes across assets and cycles.
          The pattern is structural, not random.
        </p>

        {/* Table */}
        <div className="w-full max-w-5xl">
          {/* Header */}
          <div className="grid grid-cols-[60px_90px_1fr_1fr_100px] gap-3 px-4 py-2 text-xs font-mono text-gray-600">
            <span>ASSET</span>
            <span>DATE</span>
            <span>EVENT</span>
            <span>PRICE ACTION</span>
            <span>SOURCE</span>
          </div>

          {repetitionCases.map((c, i) => (
            <div
              key={i}
              className="glass-card rounded-lg grid grid-cols-[60px_90px_1fr_1fr_100px] gap-3 px-4 py-3 mb-2 items-center text-sm"
            >
              <span className="font-mono text-white font-bold text-xs">{c.asset}</span>
              <span className="font-mono text-gray-500 text-xs">{c.date}</span>
              <span className="text-gray-400 text-xs">{c.event}</span>
              <span className="font-mono text-[#ff4d4d] text-xs font-bold">{c.priceAction}</span>
              <span className="text-gray-600 text-[10px]">{c.source}</span>
            </div>
          ))}
        </div>

        <p className="text-gray-500 text-xs font-mono text-center">
          6 documented events. Same structural pattern across assets and timeframes.
        </p>
      </div>
    </DeckSlide>
  );
}
