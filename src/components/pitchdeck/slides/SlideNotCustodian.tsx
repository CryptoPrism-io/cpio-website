// V2 Slide 14: "What we are NOT" — positioning clarity & trust
import { DeckSlide } from '../DeckSlide';

// ── SVG Icons ────────────────────────────────────────────────────────────

function IconShieldOff() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l7 4v5c0 5.25-3.5 9.74-7 11-3.5-1.26-7-5.75-7-11V6l7-4z" />
      <path d="M9.5 9.5l5 5M14.5 9.5l-5 5" />
    </svg>
  );
}

function IconBanExchange() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M4.93 4.93l14.14 14.14" />
      <path d="M8 10h3l2 4h3" />
    </svg>
  );
}

function IconBuild() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" />
    </svg>
  );
}

function IconCustomize() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

function IconBacktest() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 15" />
      <path d="M3 12a9 9 0 0 1 3.36-7" />
      <path d="M6.36 5L3 3.5V8" />
    </svg>
  );
}

function IconDeploy() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v13" />
      <path d="M8 11l4 4 4-4" />
      <path d="M20 17v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2" />
    </svg>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────

const weAreNot = [
  {
    Icon: IconShieldOff,
    title: 'Not a Custodian',
    description: 'We never hold, store, or touch user tokens. Your assets stay on your exchange, in your wallet — always.',
  },
  {
    Icon: IconBanExchange,
    title: 'Not an Exchange',
    description: 'We don\'t match orders, facilitate trades, or act as a counterparty. We never sit between you and your money.',
  },
] as const;

const weAre = [
  {
    Icon: IconBuild,
    title: 'Build',
    description: 'Create strategies from 130+ indicators, AI sentiment, and regime signals — or start from the strategy library.',
  },
  {
    Icon: IconCustomize,
    title: 'Customize',
    description: 'Tune thresholds, combine indicators, set risk parameters — make any strategy yours.',
  },
  {
    Icon: IconBacktest,
    title: 'Backtest',
    description: 'Run strategies against historical data across 1,000+ coins. See exactly how they would have performed.',
  },
  {
    Icon: IconDeploy,
    title: 'Deploy',
    description: 'Push strategies to your own trading platform — Binance, OKX, Bybit, or any exchange you already use.',
  },
] as const;

// ── Component ────────────────────────────────────────────────────────────

export function SlideNotCustodian() {
  return (
    <DeckSlide id="notcustodian" number={14}>
      <div className="flex flex-col items-center gap-8">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-center">
          What we are <span className="text-[#b91c1c]">not</span>
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
              <item.Icon />
              <span className="font-mono text-[#b91c1c] text-xs font-bold tracking-wider uppercase">
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
          <div className="font-mono text-[#047857] text-xs uppercase tracking-wider mb-3 text-center">
            What users do on CryptoPrism
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {weAre.map((item) => (
              <div
                key={item.title}
                className="glass-card terminal-green rounded-xl p-4 flex flex-col items-center text-center gap-2"
              >
                <item.Icon />
                <span className="font-mono text-[#047857] text-sm font-bold">{item.title}</span>
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
