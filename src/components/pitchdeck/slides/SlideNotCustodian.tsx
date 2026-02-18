// V2 Slide 14: "What we are NOT" — positioning clarity & trust
import { DeckSlide } from '../DeckSlide';

const weAreNot = [
  {
    icon: '🔒',
    title: 'Not a Custodian',
    description: 'We never hold, store, or touch user tokens. Your assets stay on your exchange, in your wallet — always.',
  },
  {
    icon: '🚫',
    title: 'Not an Exchange',
    description: 'We don\'t match orders, facilitate trades, or act as a counterparty. We never sit between you and your money.',
  },
] as const;

const weAre = [
  {
    icon: '🧠',
    title: 'Build',
    description: 'Create strategies from 130+ indicators, AI sentiment, and regime signals — or start from the strategy library.',
  },
  {
    icon: '⚙️',
    title: 'Customize',
    description: 'Tune thresholds, combine indicators, set risk parameters — make any strategy yours.',
  },
  {
    icon: '🔁',
    title: 'Backtest',
    description: 'Run strategies against historical data across 1,000+ coins. See exactly how they would have performed.',
  },
  {
    icon: '🚀',
    title: 'Deploy',
    description: 'Push strategies to your own trading platform — Binance, OKX, Bybit, or any exchange you already use.',
  },
] as const;

export function SlideNotCustodian() {
  return (
    <DeckSlide id="notcustodian" number={14}>
      <div className="flex flex-col items-center gap-8">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-center">
          What we are <span className="text-[#ff4d4d]">not</span>
        </h2>

        <p className="text-gray-500 text-sm text-justify max-w-lg">
          CryptoPrism is a strategy platform — we give users the tools to build, customize, backtest,
          and deploy strategies on their own trading platform. We are never into holding anybody's tokens.
        </p>

        {/* What we are NOT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
          {weAreNot.map((item) => (
            <div
              key={item.title}
              className="glass-card rounded-xl p-5 flex flex-col gap-3 border border-[rgba(255,77,77,0.15)]"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-mono text-[#ff4d4d] text-xs font-bold tracking-wider uppercase">
                {item.title}
              </span>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* What we ARE — the 4 things users do on our platform */}
        <div className="w-full max-w-5xl">
          <div className="font-mono text-[#0ecb81] text-xs uppercase tracking-wider mb-3 text-center">
            What users do on CryptoPrism
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {weAre.map((item) => (
              <div
                key={item.title}
                className="glass-card terminal-green rounded-xl p-4 flex flex-col items-center text-center gap-2"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-mono text-[#0ecb81] text-sm font-bold">{item.title}</span>
                <p className="text-gray-400 text-[11px] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-gray-600 text-xs font-mono text-center">
          Your exchange. Your wallet. Your keys. We just make you smarter.
        </p>
      </div>
    </DeckSlide>
  );
}
