import { DeckSlide } from '../DeckSlide';
import { beforeAfterCases } from '../../../data/pitchDeckData';

export function SlideScaling() {
  return (
    <DeckSlide id="shift" number={7}>
      <div className="flex flex-col items-center gap-8">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-center">
          What changes for the <span className="text-[#0ecb81]">trader</span>
        </h2>

        <div className="w-full max-w-5xl space-y-4">
          {beforeAfterCases.map((c) => (
            <div key={c.scenario} className="glass-card rounded-xl p-5">
              <div className="font-mono text-white text-sm font-bold mb-3">
                {c.scenario}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Before */}
                <div className="rounded-lg border border-[rgba(255,77,77,0.2)] bg-[rgba(255,77,77,0.03)] p-4">
                  <div className="font-mono text-[#ff4d4d] text-xs mb-2 uppercase tracking-wider">Without system</div>
                  <p className="text-gray-400 text-sm">{c.before}</p>
                  <div className="font-mono text-[#ff4d4d] text-lg font-bold mt-2">{c.beforeResult}</div>
                </div>
                {/* After */}
                <div className="rounded-lg border border-[rgba(14,203,129,0.2)] bg-[rgba(14,203,129,0.03)] p-4">
                  <div className="font-mono text-[#0ecb81] text-xs mb-2 uppercase tracking-wider">With CryptoPrism</div>
                  <p className="text-gray-400 text-sm">{c.after}</p>
                  <div className="font-mono text-[#0ecb81] text-lg font-bold mt-2">{c.afterResult}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DeckSlide>
  );
}
