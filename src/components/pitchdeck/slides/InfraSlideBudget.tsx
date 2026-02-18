import { DeckSlide } from '../DeckSlide';
import { budgetBreakdown } from '../../../data/infraDeckData';

export function InfraSlideBudget() {
  const total = budgetBreakdown.reduce((sum, b) => sum + b.monthlyCost, 0);

  return (
    <DeckSlide id="infra-budget" number={11}>
      <div className="flex flex-col items-center gap-5">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-white text-center">
          <span className="text-[#0ecb81]">$1,000/mo</span> — every dollar mapped.
        </h2>

        <p className="text-gray-500 text-sm text-justify max-w-lg">
          Beta-launch infrastructure budget. Free tier maximized, spot instances for training,
          serverless where possible. 27% buffer for AWS overages and burst traffic.
        </p>

        {/* Budget table */}
        <div className="w-full max-w-4xl glass-card rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1.2fr_1.5fr_0.6fr_0.5fr] gap-px bg-gray-800">
            <div className="bg-[#0a0f1a] px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase">Category</div>
            <div className="bg-[#0a0f1a] px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase">AWS Services</div>
            <div className="bg-[#0a0f1a] px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase text-right">Cost</div>
            <div className="bg-[#0a0f1a] px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase text-right">Share</div>

            {budgetBreakdown.map((b) => (
              <>
                <div key={`${b.category}-c`} className="bg-[#0d1320] px-4 py-2.5 text-white text-xs font-medium">{b.category}</div>
                <div key={`${b.category}-s`} className="bg-[#0d1320] px-4 py-2.5 text-gray-400 text-[10px]">{b.services}</div>
                <div key={`${b.category}-m`} className="bg-[#0d1320] px-4 py-2.5 font-mono text-[#ff9900] text-xs text-right font-bold">${b.monthlyCost}</div>
                <div key={`${b.category}-p`} className="bg-[#0d1320] px-4 py-2.5 font-mono text-gray-500 text-[10px] text-right">{b.percentOfBudget}</div>
              </>
            ))}

            {/* Total row */}
            <div className="bg-[#111827] px-4 py-3 font-mono text-[#0ecb81] text-xs font-bold">TOTAL</div>
            <div className="bg-[#111827] px-4 py-3" />
            <div className="bg-[#111827] px-4 py-3 font-mono text-[#0ecb81] text-sm text-right font-bold">${total}</div>
            <div className="bg-[#111827] px-4 py-3 font-mono text-[#0ecb81] text-xs text-right font-bold">100%</div>
          </div>
        </div>

        {/* Cost optimization tips */}
        <div className="w-full max-w-4xl">
          <div className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-2">Cost Optimization Levers</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { lever: 'RDS Free Tier', saving: 'Save ~$30/mo Y1', detail: 'db.t4g.micro 750 hrs/mo free' },
              { lever: 'EC2 Spot', saving: 'Save ~$90/mo', detail: '90% off on-demand for ML training' },
              { lever: 'Lambda Free Tier', saving: 'Save ~$15/mo', detail: '1M requests + 400K GB-s free' },
              { lever: 'Savings Plans', saving: 'Save 20-40% Y2+', detail: '1-year Fargate commitment' },
            ].map((tip) => (
              <div key={tip.lever} className="glass-card rounded-lg p-3 flex flex-col gap-1">
                <span className="font-mono text-[#0ecb81] text-[10px] font-bold">{tip.lever}</span>
                <span className="text-[#ff9900] text-[10px] font-mono">{tip.saving}</span>
                <span className="text-gray-500 text-[9px]">{tip.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DeckSlide>
  );
}
