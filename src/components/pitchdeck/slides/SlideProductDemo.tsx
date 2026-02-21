// Slide 06: "This is the product — ask it anything."
// Static mockup of the NL query interface — renders identically in screen + print.
import { DeckSlide } from '../DeckSlide';

const queries = [
  {
    level: '01',
    label: 'Basic',
    text: 'Find coins near 52W High with RSI divergence.',
    active: true,
  },
  {
    level: '02',
    label: 'Medium',
    text: 'Show projects with consistent TVL growth above 15% for 3 months.',
    active: false,
  },
  {
    level: '03',
    label: 'Advanced',
    text: 'Filter coins where whale holding increased while exchange reserves decreased in last 48 hours.',
    active: false,
  },
];

const results = [
  { symbol: 'BTC',  name: 'Bitcoin',  price: '$97,420', pct52w: 94, rsi: 68, rsiLabel: 'Bullish Div', vol: '$38.2B',  mc: '$1.92T',  pos: true },
  { symbol: 'SOL',  name: 'Solana',   price: '$198.40', pct52w: 91, rsi: 72, rsiLabel: 'Bullish Div', vol: '$4.1B',   mc: '$93.2B',  pos: true },
  { symbol: 'AVAX', name: 'Avalanche',price: '$38.60',  pct52w: 88, rsi: 65, rsiLabel: 'Bullish Div', vol: '$612M',  mc: '$16.1B',  pos: true },
];

export function SlideProductDemo() {
  return (
    <DeckSlide id="product-demo" number={6}>
      <div className="flex flex-col gap-4">
        {/* Headline */}
        <div className="text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            This is <span className="text-[#0ecb81]">the product</span> — ask it anything.
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Natural language queries. Quant-grade results. No SQL, no code.
          </p>
        </div>

        {/* Terminal mockup */}
        <div className="w-full rounded-xl overflow-hidden border border-[rgba(14,203,129,0.2)] shadow-[0_0_40px_rgba(14,203,129,0.06)]">

          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-2 bg-black/60 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0ecb81]" />
              <span className="text-[#0ecb81] text-[10px] font-mono font-bold uppercase tracking-widest">
                System Online
              </span>
            </div>
            <div className="flex items-center gap-3 text-[9px] font-mono text-gray-600">
              <span>130+ indicators</span>
              <span>·</span>
              <span>108K+ OHLCV/day</span>
              <span>·</span>
              <span>REST API &lt;200ms</span>
            </div>
          </div>

          {/* Body: sidebar + results */}
          <div className="flex flex-col lg:flex-row bg-black/40 min-h-[220px]">

            {/* Left: Query sidebar */}
            <div className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-white/5 bg-black/30 p-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#0ecb81] text-xs font-mono">▸</span>
                <span className="text-[10px] font-mono font-bold text-[#0ecb81] uppercase tracking-widest">
                  Ask Prism
                </span>
              </div>
              <div className="space-y-3">
                {queries.map((q) => (
                  <div key={q.level}>
                    <span
                      className={`inline-block text-[8px] font-bold border px-1.5 py-0.5 rounded mb-1.5 uppercase tracking-widest font-mono ${
                        q.active
                          ? 'text-[#0ecb81] border-[rgba(14,203,129,0.3)]'
                          : 'text-gray-600 border-white/10'
                      }`}
                    >
                      Lvl {q.level}: {q.label}
                    </span>
                    <div
                      className={`rounded p-2.5 text-[11px] leading-relaxed ${
                        q.active
                          ? 'bg-[rgba(14,203,129,0.07)] border border-[rgba(14,203,129,0.2)] text-white font-medium'
                          : 'bg-white/[0.02] border border-white/5 text-gray-500'
                      }`}
                    >
                      {q.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Results panel */}
            <div className="flex-1 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                  Results — 3 coins near 52W High with RSI divergence
                </span>
                <span className="text-[9px] font-mono text-gray-700">
                  Updated 2m ago
                </span>
              </div>

              {/* Column headers */}
              <div className="grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr] gap-2 mb-2 px-3">
                {['Asset', 'Price', '% of 52W H', 'RSI Signal', 'Vol 24h'].map((h) => (
                  <span key={h} className="text-[9px] font-mono text-gray-600 uppercase tracking-wider">
                    {h}
                  </span>
                ))}
              </div>

              {/* Result rows */}
              <div className="space-y-2">
                {results.map((r) => (
                  <div
                    key={r.symbol}
                    className="grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr] gap-2 items-center bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2"
                  >
                    {/* Asset */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[rgba(14,203,129,0.15)] flex items-center justify-center">
                        <span className="text-[8px] font-bold text-[#0ecb81]">{r.symbol[0]}</span>
                      </div>
                      <div>
                        <span className="text-white text-xs font-bold">{r.symbol}</span>
                        <span className="text-gray-600 text-[9px] ml-1">{r.name}</span>
                      </div>
                    </div>
                    {/* Price */}
                    <span className="text-white text-xs font-mono">{r.price}</span>
                    {/* % of 52W High — mini bar */}
                    <div className="flex items-center gap-1.5">
                      <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#0ecb81] rounded-full"
                          style={{ width: `${r.pct52w}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-gray-400">{r.pct52w}%</span>
                    </div>
                    {/* RSI Signal */}
                    <span className="text-[10px] font-mono text-[#0ecb81] bg-[rgba(14,203,129,0.08)] px-1.5 py-0.5 rounded">
                      {r.rsiLabel}
                    </span>
                    {/* Volume */}
                    <span className="text-gray-400 text-[10px] font-mono">{r.vol}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Proof row */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] font-mono text-gray-600">
          <span className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-[#0ecb81] rounded-full" />
            108K+ OHLCV records processed daily
          </span>
          <span>·</span>
          <span>130+ technical indicators</span>
          <span>·</span>
          <span>500+ news articles/hr</span>
          <span>·</span>
          <span>REST API &lt;200ms</span>
        </div>
      </div>
    </DeckSlide>
  );
}
