import { DeckSlide } from '../DeckSlide';
import { businessTiers, businessModel } from '../../../data/pitchDeckData';

export function SlideCta() {
  return (
    <DeckSlide id="business" number={8}>
      <div className="flex flex-col items-center gap-8">
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

        {/* Pricing tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
          {businessTiers.map((tier) => (
            <div
              key={tier.tier}
              className={`glass-card rounded-xl p-6 flex flex-col gap-3 ${
                tier.highlighted ? 'terminal-green' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-white text-sm font-bold">{tier.tier}</span>
                <span className="text-gray-600 text-[10px] font-mono">{tier.audience}</span>
              </div>
              <div className="font-mono text-[#0ecb81] text-2xl font-bold">{tier.price}</div>
              <p className="text-gray-400 text-xs">{tier.features}</p>
            </div>
          ))}
        </div>
      </div>
    </DeckSlide>
  );
}
