// V2 Slide 5: "Why existing tools don't solve this" — Competitor analysis
import { DeckSlide } from '../DeckSlide';
import { competitors } from '../../../data/pitchDeckVariants';

function Check() {
  return <span className="text-[#0ecb81] text-sm font-bold">&#10003;</span>;
}
function Cross() {
  return <span className="text-[#ff4d4d] text-sm font-bold">&times;</span>;
}

export function SlideCompetitors() {
  return (
    <DeckSlide id="competitors" number={5}>
      <div className="flex flex-col items-center gap-6">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-center">
          Why existing tools <span className="text-[#ff4d4d]">don't solve this</span>
        </h2>

        <p className="text-gray-500 text-sm text-center max-w-lg">
          Every major platform was built in SF, London, or Singapore — for Western quants.
          None combine indicators + news sentiment + strategy library + NL interface.
        </p>

        {/* Comparison table */}
        <div className="w-full max-w-5xl overflow-x-auto">
          {/* Header */}
          <div className="grid grid-cols-[140px_70px_80px_50px_50px_50px_50px_1fr] gap-2 px-3 py-2 text-[10px] font-mono text-gray-600 min-w-[700px]">
            <span>PLATFORM</span>
            <span>HQ</span>
            <span>PRICE</span>
            <span className="text-center">NL/AI</span>
            <span className="text-center">NEWS</span>
            <span className="text-center">STRAT</span>
            <span className="text-center">TA</span>
            <span>KEY LIMITATION</span>
          </div>

          {competitors.map((c) => (
            <div
              key={c.name}
              className="glass-card rounded-lg grid grid-cols-[140px_70px_80px_50px_50px_50px_50px_1fr] gap-2 px-3 py-3 mb-2 items-center min-w-[700px]"
            >
              <span className="font-mono text-white text-xs font-bold">{c.name}</span>
              <span className="text-gray-500 text-[10px]">{c.hq}</span>
              <span className="font-mono text-gray-400 text-[10px]">{c.pricing}</span>
              <span className="text-center">{c.hasNL ? <Check /> : <Cross />}</span>
              <span className="text-center">{c.hasNewsSentiment ? <Check /> : <Cross />}</span>
              <span className="text-center">{c.hasStrategyLib ? <Check /> : <Cross />}</span>
              <span className="text-center">{c.hasIndicators ? <Check /> : <Cross />}</span>
              <span className="text-gray-500 text-[10px]">{c.limitation}</span>
            </div>
          ))}

          {/* CryptoPrism row */}
          <div className="glass-card terminal-green rounded-lg grid grid-cols-[140px_70px_80px_50px_50px_50px_50px_1fr] gap-2 px-3 py-3 mb-2 items-center min-w-[700px] border border-[rgba(14,203,129,0.3)]">
            <span className="font-mono text-[#0ecb81] text-xs font-bold">CryptoPrism</span>
            <span className="text-[#0ecb81] text-[10px]">India</span>
            <span className="font-mono text-[#0ecb81] text-[10px]">$49-149/mo</span>
            <span className="text-center"><Check /></span>
            <span className="text-center"><Check /></span>
            <span className="text-center"><Check /></span>
            <span className="text-center"><Check /></span>
            <span className="text-[#0ecb81] text-[10px] font-bold">All four. One platform. 130+ indicators.</span>
          </div>
        </div>

        <div className="glass-card rounded-xl p-4 w-full max-w-3xl text-center">
          <p className="text-gray-300 text-sm">
            <span className="text-[#0ecb81] font-bold">No platform combines all four pillars.</span>
            <br />
            <span className="text-gray-500 text-xs">
              NL interface + news sentiment + strategy library + 130+ technical indicators.
              And none of them target the 400M+ traders in the world's fastest-growing markets.
            </span>
          </p>
        </div>
      </div>
    </DeckSlide>
  );
}
