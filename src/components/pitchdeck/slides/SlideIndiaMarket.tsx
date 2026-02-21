// Variant B: Dedicated India market opportunity slide
import { DeckSlide } from '../DeckSlide';
import { indiaStats } from '../../../data/pitchDeckVariants';

export function SlideIndiaMarket() {
  return (
    <DeckSlide id="india" number={6}>
      <div className="flex flex-col items-center gap-8">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-center">
          India: <span className="text-[#047857]">#1 in adoption.</span> Last in tooling.
        </h2>

        <p className="text-gray-500 text-sm text-justify max-w-lg">
          The world's largest crypto market has zero professional-grade analytics tools.
          119 million traders making decisions based on Telegram groups and YouTube videos.
        </p>

        {/* Key stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl">
          {[
            { value: indiaStats.users, label: 'Crypto users in India', sub: 'More than the US (65M)' },
            { value: indiaStats.rank, label: 'Chainalysis Adoption Index', sub: indiaStats.rankYears },
            { value: indiaStats.losers + ' lost', label: 'Indian traders ended FY25 in losses', sub: 'BIS + Indian tax data' },
            { value: indiaStats.socialReliance + '%', label: 'Rely on social media for trading', sub: 'CoinGecko survey' },
          ].map((stat) => (
            <div key={stat.label} className="glass-card terminal-green rounded-xl p-5 flex flex-col items-center text-center gap-2">
              <span className="font-mono text-[#047857] text-2xl md:text-3xl font-bold">{stat.value}</span>
              <span className="text-gray-400 text-xs">{stat.label}</span>
              <span className="text-gray-600 text-[10px] font-mono">{stat.sub}</span>
            </div>
          ))}
        </div>

        {/* The gap */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card rounded-xl p-5 border border-[rgba(255,77,77,0.2)]">
            <div className="font-mono text-[#ff4d4d] text-xs uppercase tracking-wider mb-3">What Indian traders use today</div>
            <div className="space-y-2 text-gray-400 text-sm">
              <div className="flex items-center gap-2"><span className="text-[#ff4d4d]">&times;</span> Telegram signal groups (often pump-and-dump)</div>
              <div className="flex items-center gap-2"><span className="text-[#ff4d4d]">&times;</span> YouTube influencer calls</div>
              <div className="flex items-center gap-2"><span className="text-[#ff4d4d]">&times;</span> Basic exchange charts</div>
              <div className="flex items-center gap-2"><span className="text-[#ff4d4d]">&times;</span> WhatsApp group rumors</div>
            </div>
          </div>
          <div className="glass-card rounded-xl p-5 border border-[rgba(14,203,129,0.2)]">
            <div className="font-mono text-[#047857] text-xs uppercase tracking-wider mb-3">What CryptoPrism gives them</div>
            <div className="space-y-2 text-gray-400 text-sm">
              <div className="flex items-center gap-2"><span className="text-[#047857]">&bull;</span> Pipeline-verified intelligence (130+ indicators)</div>
              <div className="flex items-center gap-2"><span className="text-[#047857]">&bull;</span> AI sentiment from 44 verified news sources</div>
              <div className="flex items-center gap-2"><span className="text-[#047857]">&bull;</span> Natural language queries — no complexity</div>
              <div className="flex items-center gap-2"><span className="text-[#047857]">&bull;</span> Strategy library from veteran quants</div>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-[10px] font-mono text-justify max-w-lg">
          Sources: Chainalysis 2025 Global Adoption Index, BIS Working Paper 1049,
          CoinGecko Research, Indian Income Tax Dept FY25 data
        </p>
      </div>
    </DeckSlide>
  );
}
