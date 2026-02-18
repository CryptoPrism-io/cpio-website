import { DeckSlide } from '../DeckSlide';
import { businessTiersIndia, businessTiersGlobal, businessModel } from '../../../data/pitchDeckData';
import type { PricingTier } from '../../../data/pitchDeckData';

function TierCard({ tier }: { tier: PricingTier }) {
  return (
    <div className={`glass-card rounded-xl p-5 flex flex-col gap-3 ${tier.highlighted ? 'terminal-green' : ''}`}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-white text-sm font-bold">{tier.tier}</span>
        <span className="text-gray-600 text-[10px] font-mono">{tier.audience}</span>
      </div>
      <div className="font-mono text-[#0ecb81] text-2xl font-bold">{tier.price}</div>
      <p className="text-gray-400 text-xs">{tier.features}</p>
    </div>
  );
}

export function SlideCta() {
  return (
    <DeckSlide id="business" number={8}>
      <div className="flex flex-col items-center gap-6">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-center">
          SaaS + DaaS. <span className="text-[#0ecb81]">Two revenue engines.</span>
        </h2>

        {/* Dual model labels */}
        <div className="flex flex-col md:flex-row items-center gap-6 w-full max-w-4xl">
          <div className="glass-card rounded-xl p-4 flex-1 text-center">
            <div className="font-mono text-[#0ecb81] text-xs uppercase tracking-wider mb-1">{businessModel.saasLabel}</div>
            <p className="text-gray-400 text-sm">{businessModel.saasDesc}</p>
          </div>
          <div className="glass-card rounded-xl p-4 flex-1 text-center">
            <div className="font-mono text-[#0ecb81] text-xs uppercase tracking-wider mb-1">{businessModel.daasLabel}</div>
            <p className="text-gray-400 text-sm">{businessModel.daasDesc}</p>
          </div>
        </div>

        {/* India pricing */}
        <div className="w-full max-w-5xl">
          <div className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><path d="M2 12h20" /></svg>
            India (INR)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {businessTiersIndia.map((tier) => <TierCard key={tier.tier} tier={tier} />)}
          </div>
        </div>

        {/* Global pricing */}
        <div className="w-full max-w-5xl">
          <div className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><path d="M2 12h20" /></svg>
            US / Europe / Middle East (USD)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {businessTiersGlobal.map((tier) => <TierCard key={tier.tier} tier={tier} />)}
          </div>
        </div>
      </div>
    </DeckSlide>
  );
}
