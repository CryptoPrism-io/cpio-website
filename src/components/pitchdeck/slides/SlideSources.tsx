// Appendix A: Sources & Citations
import { DeckSlide } from '../DeckSlide';

const sources = [
  { claim: '119M Indian crypto users', source: 'Chainalysis, 2025 Geography of Cryptocurrency Report', url: 'chainalysis.com/blog/2025-global-crypto-adoption-index' },
  { claim: '#1 adoption, 3 consecutive years', source: 'Chainalysis Global Crypto Adoption Index 2023-2025', url: 'chainalysis.com/blog/2025-global-crypto-adoption-index' },
  { claim: '73-81% of retail traders lose money', source: 'BIS Working Paper No. 1049 (Auer et al., 2022)', url: 'bis.org/publ/work1049.htm' },
  { claim: '1.5x disposition effect', source: 'Odean, "Are Investors Reluctant to Realize Their Losses?" Journal of Finance, 1998', url: 'doi.org/10.1111/0022-1082.00072' },
  { claim: '~70% breakout failure rate', source: 'Bulkowski, Encyclopedia of Chart Patterns, 3rd ed. (Wiley, 2021)', url: 'thepatternsite.com/FailureRates.html' },
  { claim: '49% ended FY25 with net losses', source: 'KoinX, "India\'s Crypto Tax Story 2025"', url: 'businesstoday.in' },
  { claim: '84% use social media for crypto info', source: 'CoinGecko Post-Halving Sentiment Survey 2024', url: 'coingecko.com/research/publications/crypto-community-media-usage' },
  { claim: 'Rs 6,600 Cr GainBitcoin scam', source: 'CBI India (Feb 2025)', url: 'business-standard.com' },
  { claim: '73% / $6.1B offshore trading', source: 'KoinX, "India\'s Crypto Tax Story 2025"', url: 'decrypt.co/356450' },
  { claim: 'BTC Aug 5, 2024 crash — yen carry unwind', source: 'CoinDesk, BIS Bulletin No. 90', url: 'coindesk.com' },
  { claim: '659M global crypto owners (2024)', source: 'Crypto.com Market Sizing Report, December 2024; Triple-A Ownership Data', url: 'crypto.com/research' },
  { claim: '$4.41B crypto analytics market', source: 'GII Research, Crypto Compliance & Blockchain Analytics Market 2025-2030', url: 'giiresearch.com' },
] as const;

export function SlideSources() {
  return (
    <DeckSlide id="sources" number={17}>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0ecb81" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            <line x1="8" y1="7" x2="16" y2="7" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-white">
            Appendix A: <span className="text-[#0ecb81]">Sources</span>
          </h2>
        </div>

        <div className="w-full max-w-5xl space-y-1.5">
          {sources.map((s, i) => (
            <div
              key={i}
              className="glass-card rounded-lg px-4 py-2.5 grid grid-cols-[1fr_1.2fr_0.8fr] gap-3 items-center"
            >
              <span className="text-white text-xs font-medium">{s.claim}</span>
              <span className="text-gray-400 text-[11px]">{s.source}</span>
              <span className="font-mono text-[#0ecb81] text-[10px] truncate">{s.url}</span>
            </div>
          ))}
        </div>

        <p className="text-gray-600 text-[10px] font-mono text-center mt-2">
          All statistics verified as of February 2026. Full bibliography available on request.
        </p>
      </div>
    </DeckSlide>
  );
}
