// V2 Slide 3: "In India, it's worse" — India-specific problem amplifier
import { DeckSlide } from '../DeckSlide';
import { indiaStats } from '../../../data/pitchDeckVariants';

export function SlideIndiaAmplifier() {
  return (
    <DeckSlide id="india" number={3}>
      <div className="flex flex-col items-center gap-8">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-center">
          In India, it's <span className="text-[#ff4d4d]">worse</span>
        </h2>

        <p className="text-gray-500 text-sm text-center max-w-lg">
          The world's #1 crypto market by adoption — for the third year running.
          <br />
          119 million traders. And almost half of them lost money last year.
        </p>

        {/* Key India stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl">
          {[
            { value: indiaStats.users, label: 'Crypto users in India', sub: '#1 globally — more than US (65M)', red: false },
            { value: indiaStats.losers, label: 'Ended FY25 with net losses', sub: 'Indian Income Tax Dept data', red: true },
            { value: indiaStats.socialReliance, label: 'Trade on social media signals', sub: 'CoinGecko survey — Telegram, YouTube, X', red: true },
            { value: indiaStats.scamLosses, label: 'Lost to GainBitcoin Ponzi alone', sub: 'CBI, Feb 2025', red: true },
          ].map((stat) => (
            <div key={stat.label} className={`glass-card ${stat.red ? 'terminal-red' : 'terminal-green'} rounded-xl p-5 flex flex-col items-center text-center gap-2`}>
              <span className={`font-mono text-2xl md:text-3xl font-bold ${stat.red ? 'text-[#ff4d4d]' : 'text-[#0ecb81]'}`}>{stat.value}{stat.value === indiaStats.losers || stat.value === indiaStats.socialReliance ? '%' : ''}</span>
              <span className="text-gray-400 text-xs">{stat.label}</span>
              <span className="text-gray-600 text-[10px] font-mono">{stat.sub}</span>
            </div>
          ))}
        </div>

        {/* What they use vs what they need */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card rounded-xl p-5 border border-[rgba(255,77,77,0.2)]">
            <div className="font-mono text-[#ff4d4d] text-xs uppercase tracking-wider mb-3">What Indian traders use today</div>
            <div className="space-y-2 text-gray-400 text-sm">
              <div className="flex items-center gap-2"><span className="text-[#ff4d4d]">&times;</span> Telegram signal groups (often pump-and-dump fronts)</div>
              <div className="flex items-center gap-2"><span className="text-[#ff4d4d]">&times;</span> YouTube influencer calls</div>
              <div className="flex items-center gap-2"><span className="text-[#ff4d4d]">&times;</span> WhatsApp rumors and "insider tips"</div>
              <div className="flex items-center gap-2"><span className="text-[#ff4d4d]">&times;</span> Basic exchange charts — no analysis layer</div>
            </div>
          </div>
          <div className="glass-card rounded-xl p-5 border border-[rgba(14,203,129,0.2)]">
            <div className="font-mono text-[#0ecb81] text-xs uppercase tracking-wider mb-3">What they actually need</div>
            <div className="space-y-2 text-gray-400 text-sm">
              <div className="flex items-center gap-2"><span className="text-[#0ecb81]">&bull;</span> Pipeline-verified intelligence — not opinions</div>
              <div className="flex items-center gap-2"><span className="text-[#0ecb81]">&bull;</span> AI sentiment from verified news sources</div>
              <div className="flex items-center gap-2"><span className="text-[#0ecb81]">&bull;</span> Natural language interface — no learning curve</div>
              <div className="flex items-center gap-2"><span className="text-[#0ecb81]">&bull;</span> Quant strategies — not guesswork</div>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-[10px] font-mono text-center">
          Sources: Chainalysis 2025 Global Adoption Index, BIS Working Paper 1049, CoinGecko Research, CBI India
        </p>
      </div>
    </DeckSlide>
  );
}
