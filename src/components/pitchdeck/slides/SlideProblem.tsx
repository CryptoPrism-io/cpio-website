import { DeckSlide } from '../DeckSlide';
import { bleedScenarios } from '../../../data/pitchDeckData';

const nodes = [
  {
    trigger: 'Forced selling / red candles',
    bias: 'Loss aversion',
    damage: 'Holds losers too long, cuts winners too early.',
    stat: '73-81% lose money',
    source: bleedScenarios[0].source,
  },
  {
    trigger: 'Breakout candle / social momentum',
    bias: 'FOMO + herding',
    damage: 'Chases late, buys top, gets trapped on reversal.',
    stat: '~70% breakout fail',
    source: bleedScenarios[2].source,
  },
  {
    trigger: 'Green run / unrealized gains',
    bias: 'Disposition effect',
    damage: 'Takes profit too early and misses trend continuation.',
    stat: '1.5x bias effect',
    source: bleedScenarios[1].source,
  },
] as const;

function TriggerIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M8 2l6 11H2L8 2z" />
    </svg>
  );
}

function BiasIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#b91c1c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1l1.5 4.5L14 7l-4.5 1.5L8 13l-1.5-4.5L2 7l4.5-1.5L8 1z" />
    </svg>
  );
}

function DamageIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10" />
      <path d="M8 3l5 5-5 5" />
    </svg>
  );
}

export function SlideProblem() {
  return (
    <DeckSlide id="problem" number={3}>
      <div className="flex flex-col items-center gap-4 md:gap-5">
        <div className="max-w-4xl text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-[0.95]">
            Where the money <span className="text-[#b91c1c]">disappears</span>
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-500 leading-relaxed">
            Same market setup. Same bias loop. Same capital damage.
          </p>
        </div>

        <div className="w-full max-w-7xl grid grid-cols-1 xl:grid-cols-3 gap-3">
          {nodes.map((n) => (
            <div key={n.bias} className="glass-card rounded-2xl p-4 md:p-5 border border-white/10 flex flex-col gap-3">
              <div className="glass-card rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.28em] text-gray-500">
                  <TriggerIcon />
                  Market trigger
                </div>
                <div className="mt-1.5 text-sm md:text-base font-semibold text-white tracking-tight">{n.trigger}</div>
              </div>

              <div className="glass-card terminal-red inner-glow-red rounded-xl p-3 border border-[#b91c1c]/15">
                <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.28em] text-[#b91c1c]">
                  <BiasIcon />
                  Bias
                </div>
                <div className="mt-1.5 text-lg font-semibold text-[#b91c1c] tracking-tight">{n.bias}</div>
              </div>

              <div className="glass-card rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.28em] text-gray-500">
                  <DamageIcon />
                  Damage
                </div>
                <div className="mt-1.5 text-sm md:text-base font-semibold text-white tracking-tight">{n.damage}</div>
              </div>

              <div className="rounded-xl border border-[#b91c1c]/20 bg-[#b91c1c]/[0.04] px-3 py-2">
                <div className="font-mono text-lg md:text-2xl text-[#b91c1c] font-bold tracking-tight">{n.stat}</div>
                <div className="mt-1 text-[10px] font-mono uppercase tracking-[0.14em] text-gray-600 leading-relaxed">{n.source}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full max-w-6xl glass-card rounded-2xl p-3.5 md:p-4 text-center">
          <div className="text-sm md:text-base font-semibold text-white">
            The benchmark trader reacts to the candle. Bias decides the trade.
          </div>
        </div>
      </div>
    </DeckSlide>
  );
}
