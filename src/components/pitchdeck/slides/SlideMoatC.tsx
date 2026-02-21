// Variant C: India-first moat — adds India-specific competitive advantages
import { DeckSlide } from '../DeckSlide';
import { moatItems } from '../../../data/pitchDeckData';
import { indiaMoatAdditions } from '../../../data/pitchDeckVariants';

export function SlideMoatC() {
  const allMoat = [...moatItems, ...indiaMoatAdditions];

  return (
    <DeckSlide id="moat" number={9}>
      <div className="flex flex-col items-center gap-10">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-center">
          Why this <span className="text-[#047857]">compounds</span>
        </h2>

        <p className="text-gray-500 text-sm text-justify max-w-lg">
          Every day the pipeline runs, the moat deepens.
          First mover in the world's #1 crypto adoption market — with full-stack ownership.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
          {allMoat.map((item) => (
            <div
              key={item.title}
              className="glass-card rounded-xl p-4 flex flex-col gap-2"
            >
              <span className="font-mono text-[#047857] text-xs font-bold tracking-wider">
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
