import { Fragment } from 'react';
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

function QuarterCard({
  q,
}: {
  q: (typeof year2Quarterly)[number] | (typeof year3Quarterly)[number];
}) {
  return (
    <div className="glass-card rounded-2xl px-4 py-3 flex items-center justify-between gap-3">
      <div>
        <span className="text-gray-300 text-[10px]">{q.quarter.split('(')[0]}</span>
        <div className="mt-1 text-[10px] text-gray-500">
          {q.totalPaying.toLocaleString()} users
        </div>
      </div>
      <div className="text-right">
        <span className="block font-mono text-[#047857] text-xs font-bold">{formatK(q.arr)} ARR</span>
        <span className="block mt-1 text-[10px] text-gray-500">
          API + Ads {formatK(q.b2bRevenue + q.adsRevenue)}/mo
        </span>
      </div>
    </div>
  );
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

        <div className="w-full max-w-6xl">
          <div className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-2">
            Year 1 and Year 2 ramp
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.2fr_0.95fr]">
            <div className="glass-card rounded-3xl p-4 md:p-5">
              <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-2">
                Year 1 - Monthly milestones
              </div>
              <div className="overflow-hidden rounded-2xl">
                <div className="grid grid-cols-[0.8fr_0.6fr_0.7fr_0.7fr_0.7fr] gap-px bg-gray-800">
                  <div className="bg-[#0a0f1a] px-3 py-2 font-mono text-[10px] text-gray-500 uppercase">Month</div>
                  <div className="bg-[#0a0f1a] px-3 py-2 font-mono text-[10px] text-gray-500 uppercase">Users</div>
                  <div className="bg-[#0a0f1a] px-3 py-2 font-mono text-[10px] text-gray-500 uppercase">MRR</div>
                  <div className="bg-[#0a0f1a] px-3 py-2 font-mono text-[10px] text-gray-500 uppercase">Burn</div>
                  <div className="bg-[#0a0f1a] px-3 py-2 font-mono text-[10px] text-gray-500 uppercase">Net</div>
                  {year1Monthly.filter((_, i) => [0, 2, 5, 8, 11].includes(i)).map((m) => (
                    <Fragment key={m.month}>
                      <div className="bg-[#0d1320] px-3 py-1.5 text-white text-[11px]">{m.label}</div>
                      <div className="bg-[#0d1320] px-3 py-1.5 font-mono text-gray-300 text-[11px]">{m.totalPaying.toLocaleString()}</div>
                      <div className="bg-[#0d1320] px-3 py-1.5 font-mono text-[#047857] text-[11px]">{formatK(m.mrr)}</div>
                      <div className="bg-[#0d1320] px-3 py-1.5 font-mono text-gray-400 text-[11px]">{formatK(m.burnRate)}</div>
                      <div
                        className={`bg-[#0d1320] px-3 py-1.5 font-mono text-[11px] ${
                          m.netCashFlow >= 0 ? 'text-[#047857]' : 'text-[#b91c1c]'
                        }`}
                      >
                        {formatK(m.netCashFlow)}
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
              <div className="mt-2 text-gray-600 text-[10px] font-mono">
                Break-even at Month 9 (MRR &gt; burn). {burnSummary.seedRunwayNeeded}.
              </div>
            </div>

            <div className="space-y-3">
              <div className="glass-card rounded-3xl p-4 md:p-5">
                <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-2">
                  Year 2 - Quarterly monetization
                </div>
                <div className="mb-3 text-[10px] text-gray-500 leading-relaxed">
                  SaaS stays the base, API becomes the B2B layer, and ad / sponsorship inventory starts to matter.
                </div>
                <div className="space-y-2">
                  {year2Quarterly.map((q) => <QuarterCard key={q.quarter} q={q} />)}
                </div>
              </div>

              <div className="glass-card terminal-green rounded-2xl p-4 md:p-5 border border-[#047857]/15">
                <div className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.28em] text-gray-500">
                  Monetization stack
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['SaaS subscriptions', 'API access', 'Ads / sponsorships', 'Premium research'].map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-[#047857]/20 bg-[#047857]/6 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.14em] text-[#047857]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DeckSlide>
  );
}

export function SlideGrowthModelB() {
  return (
    <DeckSlide id="growthmodel2" number={20}>
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-white">
            Appendix C.2: <span className="text-[#047857]">Scenarios & roadmap</span>
          </h2>
        </div>

        <div className="w-full max-w-6xl grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="glass-card rounded-3xl p-4 md:p-5">
            <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-2">
              Year 3 - Quarterly
            </div>
            <div className="space-y-2">
              {year3Quarterly.map((q) => <QuarterCard key={q.quarter} q={q} />)}
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass-card rounded-3xl p-4 md:p-5">
              <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-2">
                Sensitivity analysis
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {scenarios.map((s) => (
                  <div
                    key={s.name}
                    className={`glass-card rounded-xl p-4 flex flex-col gap-2 ${
                      s.name === 'Base Case' ? 'terminal-green' : ''
                    }`}
                  >
                    <span
                      className={`font-mono text-xs font-bold uppercase tracking-wider ${
                        s.name === 'Bear Case'
                          ? 'text-[#b91c1c]'
                          : s.name === 'Bull Case'
                            ? 'text-[#b45309]'
                            : 'text-[#047857]'
                      }`}
                    >
                      {s.name}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-white text-lg font-bold">{s.y3ARR}</span>
                      <span className="text-gray-500 text-[10px]">ARR (Y3)</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-gray-300 text-sm">{s.y3Users.toLocaleString()}</span>
                      <span className="text-gray-500 text-[10px]">paying users</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-gray-300 text-sm">+ ads / API</span>
                      <span className="text-gray-500 text-[10px]">mixed monetization</span>
                    </div>
                    <p className="text-gray-500 text-[10px] leading-relaxed">{s.assumptions}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-3xl p-4 md:p-5">
              <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-2">
                Funding roadmap
              </div>
              <div className="grid grid-cols-1 gap-3">
                {fundingRoadmap.map((f) => (
                  <div key={f.stage} className="glass-card rounded-xl p-4 flex flex-col gap-2">
                    <span className="font-mono text-[#047857] text-xs font-bold uppercase">{f.stage}</span>
                    <span className="text-white text-sm font-bold">{f.amount}</span>
                    <span className="text-gray-500 text-[10px]">
                      {f.timing} - {f.valuation}
                    </span>
                    <p className="text-gray-400 text-[10px] leading-relaxed">{f.keyMilestones}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DeckSlide>
  );
}
