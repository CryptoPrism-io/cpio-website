// Slide 06: "This is the product — ask it anything."
// Static mockup — adapts colours for dark (screen) and light (print/light-mode).
import { useContext } from 'react';
import { DeckSlide } from '../DeckSlide';
import { DeckPrintContext, DeckLightModeContext } from '../DeckContext';

const queries = [
  { level: '01', label: 'Basic',    text: 'Find coins near 52W High with RSI divergence.',                                                          active: true  },
  { level: '02', label: 'Medium',   text: 'Show projects with consistent TVL growth above 15% for 3 months.',                                       active: false },
  { level: '03', label: 'Advanced', text: 'Filter coins where whale holding increased while exchange reserves decreased in last 48 hours.',          active: false },
];

const results = [
  { symbol: 'BTC',  name: 'Bitcoin',   price: '$97,420', pct52w: 94, rsiLabel: 'Bullish Div', vol: '$38.2B' },
  { symbol: 'SOL',  name: 'Solana',    price: '$198.40', pct52w: 91, rsiLabel: 'Bullish Div', vol: '$4.1B'  },
  { symbol: 'AVAX', name: 'Avalanche', price: '$38.60',  pct52w: 88, rsiLabel: 'Bullish Div', vol: '$612M'  },
];

export function SlideProductDemo() {
  const isPrint = useContext(DeckPrintContext);
  const isLight = useContext(DeckLightModeContext);
  const lite = isPrint || isLight;

  // Colour tokens — dark vs light
  const tk = {
    outerBorder:    lite ? 'border-[rgba(14,203,129,0.4)]'   : 'border-[rgba(14,203,129,0.2)]',
    toolbarBg:      lite ? 'bg-gray-100'                      : 'bg-black/60',
    toolbarBorder:  lite ? 'border-gray-200'                  : 'border-white/5',
    toolbarMeta:    lite ? 'text-gray-500'                    : 'text-gray-600',
    bodyBg:         lite ? 'bg-white'                         : 'bg-black/40',
    sidebarBg:      lite ? 'bg-gray-50'                       : 'bg-black/30',
    sidebarBorder:  lite ? 'border-gray-200'                  : 'border-white/5',
    inactiveLvl:    lite ? 'text-gray-400 border-gray-300'    : 'text-gray-600 border-white/10',
    activeCard:     lite ? 'bg-[rgba(14,203,129,0.06)] border border-[rgba(14,203,129,0.3)] text-gray-900 font-medium'
                         : 'bg-[rgba(14,203,129,0.07)] border border-[rgba(14,203,129,0.2)] text-white font-medium',
    inactiveCard:   lite ? 'bg-white border border-gray-200 text-gray-500'
                         : 'bg-white/[0.02] border border-white/5 text-gray-500',
    resultsMeta:    lite ? 'text-gray-500'                    : 'text-gray-500',
    resultsTs:      lite ? 'text-gray-400'                    : 'text-gray-700',
    colHead:        lite ? 'text-gray-400'                    : 'text-gray-600',
    rowBg:          lite ? 'bg-gray-50 border-gray-200'       : 'bg-white/[0.03] border-white/5',
    assetName:      lite ? 'text-gray-900'                    : 'text-white',
    assetSub:       lite ? 'text-gray-400'                    : 'text-gray-600',
    price:          lite ? 'text-gray-900'                    : 'text-white',
    barTrack:       lite ? 'bg-gray-200'                      : 'bg-white/10',
    barPct:         lite ? 'text-gray-500'                    : 'text-gray-400',
    vol:            lite ? 'text-gray-500'                    : 'text-gray-400',
    headline:       lite ? 'text-gray-900'                    : 'text-white',
    subtitle:       lite ? 'text-gray-500'                    : 'text-gray-500',
    proofText:      lite ? 'text-gray-500'                    : 'text-gray-600',
  };

  return (
    <DeckSlide id="product-demo" number={6}>
      <div className="flex flex-col gap-4">

        {/* Headline */}
        <div className="text-center">
          <h2 className={`font-display text-3xl md:text-4xl font-bold ${tk.headline}`}>
            This is <span className="text-[#047857]">the product</span> — ask it anything.
          </h2>
          <p className={`text-sm mt-1 ${tk.subtitle}`}>
            Natural language queries. Quant-grade results. No SQL, no code.
          </p>
        </div>

        {/* Terminal mockup */}
        <div className={`w-full rounded-xl overflow-hidden border ${tk.outerBorder} shadow-[0_0_40px_rgba(14,203,129,0.06)]`}>

          {/* Toolbar */}
          <div className={`flex items-center justify-between px-4 py-2 ${tk.toolbarBg} border-b ${tk.toolbarBorder}`}>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#047857]" />
              <span className="text-[#047857] text-[10px] font-mono font-bold uppercase tracking-widest">
                System Online
              </span>
            </div>
            <div className={`flex items-center gap-3 text-[9px] font-mono ${tk.toolbarMeta}`}>
              <span>130+ indicators</span>
              <span>·</span>
              <span>108K+ OHLCV/day</span>
              <span>·</span>
              <span>REST API &lt;200ms</span>
            </div>
          </div>

          {/* Body */}
          <div className={`flex flex-col lg:flex-row ${tk.bodyBg} min-h-[220px]`}>

            {/* Left: Query sidebar */}
            <div className={`w-full lg:w-72 border-b lg:border-b-0 lg:border-r ${tk.sidebarBorder} ${tk.sidebarBg} p-4`}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#047857] text-xs font-mono">▸</span>
                <span className="text-[10px] font-mono font-bold text-[#047857] uppercase tracking-widest">
                  Ask Prism
                </span>
              </div>
              <div className="space-y-3">
                {queries.map((q) => (
                  <div key={q.level}>
                    <span className={`inline-block text-[8px] font-bold border px-1.5 py-0.5 rounded mb-1.5 uppercase tracking-widest font-mono ${
                      q.active ? 'text-[#047857] border-[rgba(14,203,129,0.3)]' : tk.inactiveLvl
                    }`}>
                      Lvl {q.level}: {q.label}
                    </span>
                    <div className={`rounded p-2.5 text-[11px] leading-relaxed ${q.active ? tk.activeCard : tk.inactiveCard}`}>
                      {q.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Results panel */}
            <div className="flex-1 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-mono uppercase tracking-wider ${tk.resultsMeta}`}>
                  Results — 3 coins near 52W High with RSI divergence
                </span>
                <span className={`text-[9px] font-mono ${tk.resultsTs}`}>
                  Updated 2m ago
                </span>
              </div>

              {/* Column headers */}
              <div className="grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr] gap-2 mb-2 px-3">
                {['Asset', 'Price', '% of 52W H', 'RSI Signal', 'Vol 24h'].map((h) => (
                  <span key={h} className={`text-[9px] font-mono uppercase tracking-wider ${tk.colHead}`}>
                    {h}
                  </span>
                ))}
              </div>

              {/* Result rows */}
              <div className="space-y-2">
                {results.map((r) => (
                  <div
                    key={r.symbol}
                    className={`grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr] gap-2 items-center border rounded-lg px-3 py-2 ${tk.rowBg}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[rgba(14,203,129,0.15)] flex items-center justify-center">
                        <span className="text-[8px] font-bold text-[#047857]">{r.symbol[0]}</span>
                      </div>
                      <div>
                        <span className={`text-xs font-bold ${tk.assetName}`}>{r.symbol}</span>
                        <span className={`text-[9px] ml-1 ${tk.assetSub}`}>{r.name}</span>
                      </div>
                    </div>
                    <span className={`text-xs font-mono ${tk.price}`}>{r.price}</span>
                    <div className="flex items-center gap-1.5">
                      <div className={`flex-1 h-1 rounded-full overflow-hidden ${tk.barTrack}`}>
                        <div className="h-full bg-[#047857] rounded-full" style={{ width: `${r.pct52w}%` }} />
                      </div>
                      <span className={`text-[10px] font-mono ${tk.barPct}`}>{r.pct52w}%</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#047857] bg-[rgba(14,203,129,0.1)] px-1.5 py-0.5 rounded">
                      {r.rsiLabel}
                    </span>
                    <span className={`text-[10px] font-mono ${tk.vol}`}>{r.vol}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Proof row */}
        <div className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] font-mono ${tk.proofText}`}>
          <span className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-[#047857] rounded-full" />
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
