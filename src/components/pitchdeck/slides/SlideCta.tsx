import { DeckSlide } from '../DeckSlide';
import { businessModel } from '../../../data/pitchDeckData';

export function SlideCta() {
  return (
    <DeckSlide id="business" number={9}>
      <div className="flex flex-col items-center gap-8">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-center">
          Who pays. How much. <span className="text-[#0ecb81]">How often.</span>
        </h2>

        {/* ICP */}
        <div className="glass-card rounded-xl p-6 w-full max-w-4xl text-center">
          <div className="font-mono text-[#0ecb81] text-xs uppercase tracking-wider mb-2">Target customer</div>
          <p className="text-gray-300 text-sm">{businessModel.icp}</p>
        </div>

        {/* Pricing tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
          {businessModel.pricing.map((tier) => (
            <div
              key={tier.tier}
              className={`glass-card rounded-xl p-6 flex flex-col gap-3 ${
                tier.tier === 'Edge' ? 'terminal-green' : ''
              }`}
            >
              <div className="font-mono text-white text-sm font-bold">{tier.tier}</div>
              <div className="font-mono text-[#0ecb81] text-2xl font-bold">{tier.price}</div>
              <p className="text-gray-400 text-xs">{tier.features}</p>
            </div>
          ))}
        </div>

        {/* Usage + TAM */}
        <div className="flex flex-col md:flex-row items-center gap-6 text-center">
          <div>
            <span className="text-gray-400 text-xs block">Usage pattern</span>
            <span className="text-gray-300 text-sm">{businessModel.frequency}</span>
          </div>
          <div className="w-px h-8 bg-gray-700 hidden md:block" />
          <div>
            <span className="text-gray-400 text-xs block">Addressable market</span>
            <span className="font-mono text-[#0ecb81] text-sm font-bold">{businessModel.tam}</span>
          </div>
        </div>
      </div>
    </DeckSlide>
  );
}
