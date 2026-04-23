import { DeckSlide } from '../DeckSlide';

const nodes = [
  {
    trigger: 'Forced selling / red candles',
    signal: 'Regime alerts + risk-off rules',
    decision: 'Cut downside sooner, protect deployable capital.',
    alpha: 'Earlier loss control vs benchmark hold-and-hope.',
  },
  {
    trigger: 'Breakout candle / social momentum',
    signal: 'News sentiment + on-chain confirmation',
    decision: 'Enter only after confirmation, skip fake momentum.',
    alpha: 'Higher entry quality vs benchmark late chase.',
  },
  {
    trigger: 'Green run / unrealized gains',
    signal: 'Strategy library + trailing rules',
    decision: 'Hold winners with rules instead of emotional exits.',
    alpha: 'More trend capture vs benchmark early profit-taking.',
  },
] as const;

function MarketIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M8 2l6 11H2L8 2z" />
    </svg>
  );
}

function SignalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="5.2" />
      <path d="M8 4.8v3.2l2.2 1.2" />
    </svg>
  );
}

function DecisionIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10" />
      <path d="M8 3l5 5-5 5" />
    </svg>
  );
}

export function SlideSolution() {
  return (
    <DeckSlide id="solution" number={4}>
      <div className="flex flex-col items-center gap-4 md:gap-5">
        <div className="max-w-4xl text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-[0.95]">
            How CryptoPrism <span className="text-[#047857]">creates alpha</span>
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-500 leading-relaxed">
            The system inserts confirmation between price action and execution.
          </p>
        </div>

        <div className="w-full max-w-7xl grid grid-cols-1 xl:grid-cols-3 gap-3">
          {nodes.map((n) => (
            <div key={n.signal} className="glass-card rounded-2xl p-4 md:p-5 border border-white/10 flex flex-col gap-3">
              <div className="glass-card rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.28em] text-gray-500">
                  <MarketIcon />
                  Market trigger
                </div>
                <div className="mt-1.5 text-sm md:text-base font-semibold text-white tracking-tight">{n.trigger}</div>
              </div>

              <div className="glass-card terminal-green rounded-xl p-3 border border-[#047857]/15">
                <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.28em] text-[#047857]">
                  <SignalIcon />
                  CryptoPrism signal
                </div>
                <div className="mt-1.5 text-sm md:text-base font-semibold text-white tracking-tight">{n.signal}</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {['Regime', 'Sentiment', 'On-chain'].map((chip) => (
                    <span key={chip} className="rounded-full border border-[#047857]/20 bg-[#047857]/6 px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.12em] text-[#047857]">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.28em] text-gray-500">
                  <DecisionIcon />
                  Decision
                </div>
                <div className="mt-1.5 text-sm md:text-base font-semibold text-white tracking-tight">{n.decision}</div>
              </div>

              <div className="rounded-xl border border-[#047857]/20 bg-[#047857]/[0.05] px-3 py-2">
                <div className="text-sm md:text-base font-semibold text-white tracking-tight">{n.alpha}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full max-w-6xl glass-card terminal-green rounded-2xl p-3.5 md:p-4 border border-[#047857]/15">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
            {['Fewer fake breakouts', 'Earlier loss control', 'Better trend capture', 'Higher alpha vs benchmark'].map((item) => (
              <div key={item} className="rounded-full border border-[#047857]/20 bg-[#047857]/6 px-2.5 py-2 text-[10px] md:text-xs font-mono text-[#047857]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DeckSlide>
  );
}
