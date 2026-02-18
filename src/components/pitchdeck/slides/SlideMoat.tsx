import { DeckSlide } from '../DeckSlide';
import { moatItems } from '../../../data/pitchDeckData';

export function SlideMoat() {
  return (
    <DeckSlide id="moat" number={9}>
      <div className="flex flex-col items-center gap-10">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-center">
          Why this <span className="text-[#0ecb81]">compounds</span>
        </h2>

        <p className="text-gray-500 text-sm text-center max-w-lg">
          Every day the pipeline runs, the moat deepens.
          More data, more indicators, more coverage — harder to replicate.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
          {moatItems.map((item) => (
            <div
              key={item.title}
              className="glass-card rounded-xl p-5 flex flex-col gap-3"
            >
              <span className="font-mono text-[#0ecb81] text-sm font-bold tracking-wider">
                {item.title}
              </span>
              <p className="text-gray-400 text-xs leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </DeckSlide>
  );
}
