// V2 Slide 13: Enhanced moat with India first-mover + built-from-India advantage
import { DeckSlide } from '../DeckSlide';
import { moatItemsV2 } from '../../../data/pitchDeckVariants';

export function SlideMoatV2() {
  return (
    <DeckSlide id="moat" number={13}>
      <div className="flex flex-col items-center gap-8">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-center">
          Why this <span className="text-[#0ecb81]">compounds</span>
        </h2>

        <p className="text-gray-500 text-sm text-center max-w-lg">
          Every day the pipeline runs, the moat deepens.
          First mover in the world's #1 crypto market — with full-stack ownership and a global expansion path.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-5xl">
          {moatItemsV2.map((item) => (
            <div
              key={item.title}
              className="glass-card rounded-xl p-4 flex flex-col gap-2"
            >
              <span className="font-mono text-[#0ecb81] text-xs font-bold tracking-wider">
                {item.title}
              </span>
              <p className="text-gray-400 text-[11px] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </DeckSlide>
  );
}
