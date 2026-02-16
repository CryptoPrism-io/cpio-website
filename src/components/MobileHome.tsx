/**
 * MobileHome — mobile-only layout matching the Stitch CryptoPrism Mobile Landing design.
 * Sections: Hero, Value Prop, Personas, Strategy Library, News/Signals, Final CTA, Footer.
 * Visible only below md breakpoint.
 */

/* ── Data ──────────────────────────────────────────────────────── */

const PERSONAS = [
  { icon: 'trending_up', title: 'Trader', desc: 'Execute with precision using AI signals.' },
  { icon: 'monitoring', title: 'Analyst', desc: 'Deep dive into on-chain metrics effortlessly.' },
  { icon: 'code', title: 'Developer', desc: 'Build and ship with our robust API.' },
];

const STRATEGIES = [
  {
    badge: 'HIGH ALPHA',
    badgeColor: 'bg-neon-green/20 text-neon-green',
    title: 'Meme-Coin Momentum',
    desc: 'Social sentiment + Volatility index strategy.',
    perf: '+42.8%',
  },
  {
    badge: 'STABLE',
    badgeColor: 'bg-blue-500/20 text-blue-400',
    title: 'L1 Liquidity Flow',
    desc: 'Institutional bridge volume tracking.',
    perf: '+12.4%',
  },
];

const NEWS = [
  {
    icon: 'news',
    iconBg: 'bg-neon-green/20',
    iconColor: 'text-neon-green',
    sentiment: 'Bullish',
    sentimentColor: 'text-neon-green',
    confidence: '92% Confidence',
    time: '2m ago',
    headline: 'Fed rates pause sparks institutional buy pressure on BTC.',
    summary: 'Analysis shows massive accumulation at $64.2k support levels.',
  },
  {
    icon: 'warning',
    iconBg: 'bg-yellow-500/20',
    iconColor: 'text-yellow-500',
    sentiment: 'Neutral',
    sentimentColor: 'text-yellow-500',
    confidence: 'Volatility Alert',
    time: '14m ago',
    headline: 'Ethereum Mainnet upgrade scheduled for 04:00 UTC.',
    summary: 'Expect brief withdrawal delays and gas price spikes across L2s.',
  },
];

/* ── Component ─────────────────────────────────────────────────── */

export const MobileHome: React.FC = () => {
  return (
    <div className="md:hidden">
      {/* ── Value Prop Section ──────────────────────────────────── */}
      <section className="px-6 py-24 border-y border-white/5">
        <div className="text-center mb-14">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Tired of dropdown menus and complex filters?
          </h2>
          <p className="text-sm text-gray-400 max-w-xs mx-auto leading-relaxed">
            PRISM Calculates logic handles the complexity so you can focus on the alpha. Clean, tech-focused insights at your fingertips.
          </p>
        </div>

        <div className="space-y-5">
          {/* Feature row: AI Logic Engine */}
          <div className="flex gap-4 p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="shrink-0 w-11 h-11 bg-neon-green/10 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-neon-green">psychology</span>
            </div>
            <div>
              <h3 className="font-bold text-white mb-0.5">AI Logic Engine</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Natural language processing turns complex queries into instant visual data.
              </p>
            </div>
          </div>

          {/* Feature row: Instant Execution */}
          <div className="flex gap-4 p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="shrink-0 w-11 h-11 bg-neon-green/10 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-neon-green">bolt</span>
            </div>
            <div>
              <h3 className="font-bold text-white mb-0.5">Instant Execution</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Zero-latency data processing from 50+ decentralized exchanges.
              </p>
            </div>
          </div>
        </div>

        {/* Terminal card */}
        <div className="mt-10 bg-[rgba(22,22,22,0.7)] backdrop-blur-sm p-5 rounded-2xl border border-neon-green/20">
          <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
            <span className="text-[10px] font-mono text-neon-green tracking-wider">PRISM_CALCULATOR_V2</span>
            <span className="material-symbols-outlined text-gray-500 text-sm">terminal</span>
          </div>
          <div className="space-y-2.5 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">&gt; Analyze Whale Accumulation</span>
              <span className="text-neon-green font-bold">OK</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">&gt; Detect Smart Money Entry</span>
              <span className="text-neon-green font-bold">TRUE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">&gt; Filter Liquidity Gaps</span>
              <span className="text-neon-green font-bold">98%</span>
            </div>
            <div className="mt-3 pt-3 border-t border-white/5">
              <div className="text-neon-green text-[11px] font-bold mb-2">
                RESULT: BULLISH DIVERGENCE CONFIRMED
              </div>
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                <div className="bg-neon-green h-full w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Personas Section ───────────────────────────────────── */}
      <section className="px-6 py-24">
        <h2 className="text-2xl font-bold mb-10 text-center text-white">
          Built for Every Crypto Native
        </h2>
        <div className="space-y-4">
          {PERSONAS.map((p) => (
            <div
              key={p.title}
              className="group flex items-center justify-between p-6 rounded-2xl bg-[rgba(22,22,22,0.5)] border border-white/5 active:border-neon-green/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-neon-green text-3xl">{p.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{p.title}</h3>
                  <p className="text-xs text-gray-400">{p.desc}</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-gray-600">chevron_right</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Strategy Library ───────────────────────────────────── */}
      <section className="px-6 py-24 bg-[rgba(22,22,22,0.3)]">
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-2 text-white">Clone the Alpha</h2>
          <p className="text-sm text-gray-400">Replicate top-performing strategies in one click.</p>
        </div>

        <div className="space-y-5">
          {STRATEGIES.map((s) => (
            <div
              key={s.title}
              className="bg-[rgba(22,22,22,0.7)] backdrop-blur-sm p-6 rounded-xl border border-white/10"
            >
              <div className="flex justify-between mb-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${s.badgeColor}`}>
                  {s.badge}
                </span>
                <span className="text-[10px] text-gray-500">7D Performance</span>
              </div>
              <h4 className="font-bold text-base mb-1 text-white">{s.title}</h4>
              <p className="text-xs text-gray-400 mb-5">{s.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-neon-green font-bold text-xl">{s.perf}</span>
                <button className="bg-neon-green text-black text-xs font-bold px-4 py-1.5 rounded-lg cta-early-access-trigger">
                  Clone
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-8 bg-white/5 border border-white/10 h-12 rounded-xl text-sm font-bold text-white cta-early-access-trigger">
          Browse Entire Library
        </button>
      </section>

      {/* ── News / Signals Section ─────────────────────────────── */}
      <section className="px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-2 text-white">News Without the Noise</h2>
          <p className="text-sm text-gray-400">
            AI-quantified sentiment and real-time market impact analysis.
          </p>
        </div>

        <div className="space-y-5">
          {NEWS.map((n) => (
            <div
              key={n.headline}
              className="flex gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.02]"
            >
              <div className={`w-11 h-11 rounded-full ${n.iconBg} flex items-center justify-center shrink-0`}>
                <span className={`material-symbols-outlined ${n.iconColor}`}>{n.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-[10px] font-bold uppercase ${n.sentimentColor}`}>
                    {n.sentiment} &bull; {n.confidence}
                  </span>
                  <span className="text-[10px] text-gray-500 shrink-0 ml-2">{n.time}</span>
                </div>
                <h4 className="font-bold text-sm leading-tight mb-1 text-white">{n.headline}</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">{n.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────── */}
      <section className="px-6 py-24">
        <div className="rounded-3xl p-10 text-center relative overflow-hidden bg-neon-green/10 border border-neon-green/20">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-neon-green/20 rounded-full blur-[60px]" />
          <h2 className="text-3xl font-bold mb-5 relative z-10 leading-tight text-white">
            Unleash the power of AI x Trading
          </h2>
          <p className="text-sm text-gray-400 mb-10 relative z-10">
            Join 15,000+ traders already utilizing CryptoPrism to stay ahead of the curve.
          </p>
          <button
            className="bg-neon-green text-black font-bold h-14 px-8 rounded-xl relative z-10 w-full text-sm"
            id="mobile-cta-apply"
          >
            Apply for early access
          </button>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="px-6 py-14 border-t border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-neon-green text-xl">filter_tilt_shift</span>
          <span className="text-base font-bold tracking-tight text-white">CryptoPrism</span>
        </div>
        <p className="text-xs text-gray-500 mb-8 max-w-xs">
          The ultimate analytics engine for the decentralized economy. Built for performance.
        </p>
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <h5 className="text-[10px] font-bold mb-3 uppercase text-gray-400 tracking-widest">Product</h5>
            <ul className="space-y-2 text-xs text-gray-500">
              <li><a className="hover:text-neon-green transition-colors" href="#">Features</a></li>
              <li><a className="hover:text-neon-green transition-colors" href="#">API Docs</a></li>
              <li><a className="hover:text-neon-green transition-colors" href="#">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] font-bold mb-3 uppercase text-gray-400 tracking-widest">Connect</h5>
            <ul className="space-y-2 text-xs text-gray-500">
              <li><a className="hover:text-neon-green transition-colors" href="#">Discord</a></li>
              <li><a className="hover:text-neon-green transition-colors" href="#">X / Twitter</a></li>
              <li><a className="hover:text-neon-green transition-colors" href="#">Telegram</a></li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between items-center pt-6 border-t border-white/5 text-[10px] text-gray-600">
          <p>&copy; 2026 CryptoPrism Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a className="hover:text-gray-400" href="#">Privacy</a>
            <a className="hover:text-gray-400" href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MobileHome;
