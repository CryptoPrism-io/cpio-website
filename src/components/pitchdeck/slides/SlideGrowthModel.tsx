// Appendix C: 3-Year Growth Model & Scenarios
import { DeckSlide } from '../DeckSlide';
import {
  year1Monthly,
  year2Quarterly,
  year3Quarterly,
  scenarios,
  fundingRoadmap,
  burnSummary,
} from '../../../data/financialProjections';

function formatK(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
  return `$${n}`;
}

export function SlideGrowthModel() {
  return (
    <DeckSlide id="growthmodel" number={19}>
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-white">
            Appendix C: <span className="text-[#047857]">Growth Model</span>
          </h2>
        </div>

        {/* Y1 monthly — show key months */}
        <div className="w-full max-w-5xl">
          <div className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-2">
            Year 1 — Monthly (Key Milestones)
          </div>
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="grid grid-cols-[0.8fr_0.6fr_0.7fr_0.7fr_0.7fr] gap-px bg-gray-800">
              <div className="bg-[#0a0f1a] px-3 py-2 font-mono text-[10px] text-gray-500 uppercase">Month</div>
              <div className="bg-[#0a0f1a] px-3 py-2 font-mono text-[10px] text-gray-500 uppercase">Users</div>
              <div className="bg-[#0a0f1a] px-3 py-2 font-mono text-[10px] text-gray-500 uppercase">MRR</div>
              <div className="bg-[#0a0f1a] px-3 py-2 font-mono text-[10px] text-gray-500 uppercase">Burn</div>
              <div className="bg-[#0a0f1a] px-3 py-2 font-mono text-[10px] text-gray-500 uppercase">Net</div>
              {[year1Monthly[0], year1Monthly[2], year1Monthly[5], year1Monthly[8], year1Monthly[11]].map((m) => (
                <>
                  <div key={`${m.month}-l`} className="bg-[#0d1320] px-3 py-1.5 text-white text-[11px]">{m.label}</div>
                  <div key={`${m.month}-u`} className="bg-[#0d1320] px-3 py-1.5 font-mono text-gray-300 text-[11px]">{m.totalPaying.toLocaleString()}</div>
                  <div key={`${m.month}-m`} className="bg-[#0d1320] px-3 py-1.5 font-mono text-[#047857] text-[11px]">{formatK(m.mrr)}</div>
                  <div key={`${m.month}-b`} className="bg-[#0d1320] px-3 py-1.5 font-mono text-gray-400 text-[11px]">{formatK(m.burnRate)}</div>
                  <div key={`${m.month}-n`} className={`bg-[#0d1320] px-3 py-1.5 font-mono text-[11px] ${m.netCashFlow >= 0 ? 'text-[#047857]' : 'text-[#b91c1c]'}`}>{formatK(m.netCashFlow)}</div>
                </>
              ))}
            </div>
          </div>
          <div className="mt-1 text-gray-600 text-[10px] font-mono">
            Break-even at Month 9 (MRR &gt; burn). {burnSummary.seedRunwayNeeded}.
          </div>
        </div>

        {/* Y2 + Y3 Quarterly */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <div className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-2">Year 2 — Quarterly</div>
            <div className="space-y-1.5">
              {year2Quarterly.map((q) => (
                <div key={q.quarter} className="glass-card rounded-lg px-3 py-2 flex items-center justify-between">
                  <span className="text-gray-300 text-[10px]">{q.quarter.split('(')[0]}</span>
                  <span className="font-mono text-[#047857] text-xs font-bold">{formatK(q.arr)} ARR</span>
                  <span className="text-gray-500 text-[10px]">{q.totalPaying.toLocaleString()} users</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-2">Year 3 — Quarterly</div>
            <div className="space-y-1.5">
              {year3Quarterly.map((q) => (
                <div key={q.quarter} className="glass-card rounded-lg px-3 py-2 flex items-center justify-between">
                  <span className="text-gray-300 text-[10px]">{q.quarter.split('(')[0]}</span>
                  <span className="font-mono text-[#047857] text-xs font-bold">{formatK(q.arr)} ARR</span>
                  <span className="text-gray-500 text-[10px]">{q.totalPaying.toLocaleString()} users</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scenarios */}
        <div className="w-full max-w-5xl">
          <div className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-2">
            Sensitivity Analysis — 3 Scenarios
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {scenarios.map((s) => (
              <div
                key={s.name}
                className={`glass-card rounded-xl p-4 flex flex-col gap-2 ${s.name === 'Base Case' ? 'terminal-green' : ''}`}
              >
                <span className={`font-mono text-xs font-bold uppercase tracking-wider ${
                  s.name === 'Bear Case' ? 'text-[#b91c1c]' : s.name === 'Bull Case' ? 'text-[#b45309]' : 'text-[#047857]'
                }`}>{s.name}</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-white text-lg font-bold">{s.y3ARR}</span>
                  <span className="text-gray-500 text-[10px]">ARR (Y3)</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-gray-300 text-sm">{s.y3Users.toLocaleString()}</span>
                  <span className="text-gray-500 text-[10px]">paying users</span>
                </div>
                <p className="text-gray-500 text-[10px] leading-relaxed">{s.assumptions}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Funding Roadmap */}
        <div className="w-full max-w-5xl">
          <div className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-2">
            Funding Roadmap
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {fundingRoadmap.map((f) => (
              <div key={f.stage} className="glass-card rounded-xl p-4 flex flex-col gap-2">
                <span className="font-mono text-[#047857] text-xs font-bold uppercase">{f.stage}</span>
                <span className="text-white text-sm font-bold">{f.amount}</span>
                <span className="text-gray-500 text-[10px]">{f.timing} · {f.valuation}</span>
                <p className="text-gray-400 text-[10px] leading-relaxed">{f.keyMilestones}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DeckSlide>
  );
}
