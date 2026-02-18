// Appendix B: Financial Projections & Unit Economics
import { DeckSlide } from '../DeckSlide';
import {
  marketSizing,
  unitEconomics,
  comparables,
} from '../../../data/financialProjections';

export function SlideFinancials() {
  return (
    <DeckSlide id="financials" number={18}>
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0ecb81" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-white">
            Appendix B: <span className="text-[#0ecb81]">Financials</span>
          </h2>
        </div>

        {/* TAM / SAM / SOM */}
        <div className="w-full max-w-5xl">
          <div className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-2">
            Market Sizing
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {marketSizing.map((m) => (
              <div key={m.label} className="glass-card rounded-xl p-4 flex flex-col gap-2">
                <span className="font-mono text-[#0ecb81] text-2xl font-bold">{m.value}</span>
                <span className="text-white text-xs font-bold">{m.label}</span>
                <p className="text-gray-500 text-[10px] leading-relaxed">{m.math}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Unit Economics — key metrics only */}
        <div className="w-full max-w-5xl">
          <div className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-2">
            Unit Economics
          </div>
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr] gap-px bg-gray-800">
              <div className="bg-[#0a0f1a] px-3 py-2 font-mono text-[10px] text-gray-500 uppercase">Metric</div>
              <div className="bg-[#0a0f1a] px-3 py-2 font-mono text-[10px] text-gray-500 uppercase">India</div>
              <div className="bg-[#0a0f1a] px-3 py-2 font-mono text-[10px] text-gray-500 uppercase">Global</div>
              {unitEconomics.slice(0, 7).map((u) => (
                <>
                  <div key={`${u.metric}-m`} className="bg-[#0d1320] px-3 py-1.5 text-white text-[11px]">{u.metric}</div>
                  <div key={`${u.metric}-i`} className="bg-[#0d1320] px-3 py-1.5 font-mono text-[#0ecb81] text-[11px]">{u.indiaValue}</div>
                  <div key={`${u.metric}-g`} className="bg-[#0d1320] px-3 py-1.5 font-mono text-[#0ecb81] text-[11px]">{u.globalValue}</div>
                </>
              ))}
            </div>
          </div>
        </div>

        {/* Comparable Companies */}
        <div className="w-full max-w-5xl">
          <div className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-2">
            Comparable Companies
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            {comparables.map((c) => (
              <div key={c.company} className="glass-card rounded-lg p-3 flex flex-col gap-1.5">
                <span className="font-mono text-white text-xs font-bold">{c.company}</span>
                <span className="text-[#0ecb81] text-[10px] font-mono">{c.revenue}</span>
                <span className="text-gray-400 text-[10px]">{c.valuation} valuation</span>
                <span className="text-gray-500 text-[9px]">{c.pricing}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DeckSlide>
  );
}
