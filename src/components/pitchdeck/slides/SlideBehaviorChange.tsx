import { DeckSlide } from '../DeckSlide';

const behaviorMetrics = [
  {
    metric: 'Average Holding Period',
    before: '2.3 days',
    after: '11+ days',
    delta: '+378%',
    deltaColor: 'text-[#047857]',
    insight: 'Shift from panic-trading to conviction-based positions',
  },
  {
    metric: 'Trades per Week',
    before: '18',
    after: '6',
    delta: '-67%',
    deltaColor: 'text-[#047857]',
    insight: 'Fewer, higher-quality entries — less churn, less fees burned',
  },
  {
    metric: 'Leverage Usage',
    before: '10-25x avg',
    after: '3-5x avg',
    delta: '-70%',
    deltaColor: 'text-[#047857]',
    insight: 'Risk-aware sizing replaces yolo leverage',
  },
  {
    metric: 'Daily Active Sessions',
    before: '0.4/day',
    after: '2.1/day',
    delta: '+425%',
    deltaColor: 'text-[#047857]',
    insight: 'Morning + evening ritual — habitual, not impulsive',
  },
  {
    metric: 'Telegram Group Reliance',
    before: '84%',
    after: '< 20%',
    delta: '-76%',
    deltaColor: 'text-[#047857]',
    insight: 'Primary signal source shifts from social media to data',
  },
  {
    metric: '% Trades Following Signals',
    before: '~10%',
    after: '> 65%',
    delta: '+550%',
    deltaColor: 'text-[#047857]',
    insight: 'Users trust pipeline intelligence over gut feeling',
  },
] as const;

export function SlideBehaviorChange() {
  return (
    <DeckSlide id="behavior" number={10}>
      <div className="flex flex-col items-center gap-5">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-white text-center">
          What users do <span className="text-[#047857]">differently</span> after 14 days
        </h2>

        <p className="text-gray-500 text-xs text-center max-w-lg">
          The product doesn't just inform — it changes behavior. These are our projected beta targets
          based on comparable platform data (TradingView, 3Commas, Nansen user studies).
        </p>

        {/* Before / After table */}
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-[1.3fr_0.7fr_0.7fr_0.5fr] gap-px bg-gray-800 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="bg-[#0a0f1a] px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase">Behavior Metric</div>
            <div className="bg-[#0a0f1a] px-4 py-2.5 font-mono text-[10px] text-[#ff4d4d] uppercase text-center">Before</div>
            <div className="bg-[#0a0f1a] px-4 py-2.5 font-mono text-[10px] text-[#047857] uppercase text-center">After 14d</div>
            <div className="bg-[#0a0f1a] px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase text-center">Delta</div>

            {behaviorMetrics.map((m) => (
              <>
                <div key={`${m.metric}-l`} className="bg-[#0d1320] px-4 py-2.5 flex flex-col gap-0.5">
                  <span className="text-white text-xs font-medium">{m.metric}</span>
                  <span className="text-gray-600 text-[9px]">{m.insight}</span>
                </div>
                <div key={`${m.metric}-b`} className="bg-[#0d1320] px-4 py-2.5 font-mono text-[#ff4d4d] text-xs text-center flex items-center justify-center">{m.before}</div>
                <div key={`${m.metric}-a`} className="bg-[#0d1320] px-4 py-2.5 font-mono text-[#047857] text-xs text-center flex items-center justify-center font-bold">{m.after}</div>
                <div key={`${m.metric}-d`} className={`bg-[#0d1320] px-4 py-2.5 font-mono text-xs text-center flex items-center justify-center font-bold ${m.deltaColor}`}>{m.delta}</div>
              </>
            ))}
          </div>
        </div>

        {/* Key thesis */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="glass-card terminal-green rounded-lg p-4 text-center">
            <span className="font-mono text-[#047857] text-lg font-bold">Habit</span>
            <p className="text-gray-400 text-[10px] mt-1">2.1 sessions/day creates morning ritual — replaces Telegram scroll</p>
          </div>
          <div className="glass-card terminal-green rounded-lg p-4 text-center">
            <span className="font-mono text-[#047857] text-lg font-bold">Confidence</span>
            <p className="text-gray-400 text-[10px] mt-1">65%+ trades follow signals — users outsource conviction to data</p>
          </div>
          <div className="glass-card terminal-green rounded-lg p-4 text-center">
            <span className="font-mono text-[#047857] text-lg font-bold">Retention</span>
            <p className="text-gray-400 text-[10px] mt-1">Behavior change = lock-in. Users who change habits don't churn</p>
          </div>
        </div>

        <p className="text-gray-600 text-[10px] font-mono text-center max-w-lg italic">
          Projected targets for closed beta (Q2 2026). Validated against published behavioral
          studies from TradingView (2023 annual report) and eToro social trading data.
        </p>
      </div>
    </DeckSlide>
  );
}
