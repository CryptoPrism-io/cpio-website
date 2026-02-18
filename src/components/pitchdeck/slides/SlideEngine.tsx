import { DeckSlide } from '../DeckSlide';

const dataSources = [
  {
    label: 'OHLCV',
    description: 'Price, volume, and candlestick data across 1,000+ coins from multiple exchanges',
    stat: '108K+ records/run',
    color: 'text-[#0ecb81]',
  },
  {
    label: 'On-Chain',
    description: 'Wallet flows, whale movements, exchange inflows/outflows, active addresses',
    stat: 'Real-time',
    color: 'text-[#0ecb81]',
  },
  {
    label: 'News & Sentiment',
    description: '44 verified sources, AI-scored sentiment, 182+ topic categories',
    stat: '500+ articles/hr',
    color: 'text-[#0ecb81]',
  },
  {
    label: 'Security Scores',
    description: 'Smart contract audits, rug-pull risk, team credibility, code quality metrics',
    stat: 'Per-token scoring',
    color: 'text-[#0ecb81]',
  },
  {
    label: 'Token Metadata',
    description: 'Market cap, supply mechanics, exchange listings, social metrics, project activity',
    stat: '1,000+ tokens',
    color: 'text-[#0ecb81]',
  },
  {
    label: 'Whitepapers',
    description: 'Tokenomics extraction, roadmap parsing, claim verification against on-chain reality',
    stat: 'AI-parsed',
    color: 'text-[#0ecb81]',
  },
] as const;

const processingLayers = [
  { label: 'Compute', description: '130+ indicators in 7 categories' },
  { label: 'Score', description: 'Proprietary DMV framework' },
  { label: 'Classify', description: 'Regime detection & risk flags' },
  { label: 'Deliver', description: 'REST API, <200ms response' },
] as const;

export function SlideEngine() {
  return (
    <DeckSlide id="engine" number={4}>
      <div className="flex flex-col items-center gap-6">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-center">
          What powers the <span className="text-[#0ecb81]">answers</span>
        </h2>

        <p className="text-gray-500 text-sm text-justify max-w-lg">
          Not just price data. Six distinct data streams feed into a multi-stage processing engine
          built across 17 production repositories and 3 databases.
        </p>

        {/* Data Sources — 6 input streams */}
        <div className="w-full max-w-5xl">
          <div className="font-mono text-gray-600 text-[10px] uppercase tracking-widest mb-2 ml-1">
            Data Sources
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {dataSources.map((src) => (
              <div
                key={src.label}
                className="glass-card rounded-lg p-3 flex flex-col gap-1 border-l-2 border-[rgba(14,203,129,0.4)]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[#0ecb81] text-xs font-bold">{src.label}</span>
                  <span className="font-mono text-[#0ecb81] text-[9px] opacity-70">{src.stat}</span>
                </div>
                <p className="text-gray-500 text-[10px] leading-relaxed">{src.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow down */}
        <div className="flex flex-col items-center gap-0 text-[#0ecb81]">
          <div className="w-px h-4 bg-[#0ecb81] opacity-40" />
          <svg width="12" height="8" viewBox="0 0 12 8" fill="currentColor"><path d="M6 8L0 0h12z" /></svg>
        </div>

        {/* Processing Pipeline — horizontal */}
        <div className="w-full max-w-5xl">
          <div className="font-mono text-gray-600 text-[10px] uppercase tracking-widest mb-2 ml-1">
            Processing Engine
          </div>
          <div className="flex items-center gap-1">
            {processingLayers.map((layer, i) => (
              <div key={layer.label} className="flex items-center gap-1 flex-1">
                <div className="glass-card terminal-green rounded-lg p-3 flex flex-col items-center text-center gap-1 w-full">
                  <span className="font-mono text-[#0ecb81] font-bold text-xs tracking-wider">
                    {layer.label}
                  </span>
                  <span className="text-gray-500 text-[10px]">{layer.description}</span>
                </div>
                {i < processingLayers.length - 1 && (
                  <span className="text-[#0ecb81] text-sm font-bold shrink-0 hidden md:block">&rarr;</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div className="flex items-center gap-6">
          {[
            { value: '99.9%', label: 'uptime' },
            { value: '17', label: 'repos' },
            { value: '3', label: 'databases' },
            { value: '8.5s', label: 'news pipeline' },
            { value: '24/7', label: 'continuous' },
          ].map((s, i) => (
            <div key={s.label} className="flex items-center gap-6">
              {i > 0 && <div className="w-px h-6 bg-gray-700" />}
              <div className="text-center">
                <span className="font-mono text-[#0ecb81] text-sm font-bold">{s.value}</span>
                <span className="text-gray-600 text-[9px] block">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DeckSlide>
  );
}
