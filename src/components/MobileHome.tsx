/**
 * MobileHome — mobile-only pitch-deck-style full-page layout.
 * One swipe = one page. No scrolling within slides.
 * Story arc: Hook → Problem → Solution → Who → Strategies → CTA → Footer
 * Alternating dark / light slides for visual rhythm.
 * Reuses .deck-container / .deck-slide CSS for snap behavior.
 * Visible only below md breakpoint.
 */

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const HERO_TAGLINES = [
  'Trade Like a Quant.',
  'Trade Like a Machine.',
  'Execute Like a Pro.',
  'Analyze Like an Institution.',
];

const FEATURE_TABS = [
  { icon: 'bar_chart', label: 'Live Crypto Data' },
  { icon: 'trending_up', label: 'Live Analytics' },
  { icon: 'grid_view', label: 'Quant Models' },
  { icon: 'bolt', label: 'Real-time Compute' },
];

/* ── Data ──────────────────────────────────────────────────────── */

const PAIN_STATS = [
  { value: '73–81%', label: 'of retail crypto investors lose money', source: 'BIS Working Paper 1049' },
  { value: '84%', label: 'rely on social media for crypto decisions', source: 'CoinGecko 2024' },
  { value: '49%', label: 'of Indian traders ended FY25 in net losses', source: 'KoinX Tax Report' },
];

const FOUR_PILLARS = [
  { icon: 'terminal', title: 'NL Terminal', desc: 'Ask in plain English, get quant-grade analysis' },
  { icon: 'bolt', title: 'Strategy Library', desc: 'Clone strategies from veteran quant traders' },
  { icon: 'auto_awesome', title: 'Dynamic Watchlists', desc: 'Auto-filtering lists that kick out underperformers' },
  { icon: 'article', title: 'News Intelligence', desc: 'AI-quantified sentiment from 44+ sources, hourly' },
];

const PERSONAS = [
  {
    icon: 'candlestick_chart', title: 'Trader', desc: 'Execution-focused. Real-time signals & smart alerts.',
    tools: ['Charts', 'Screener', 'Trade', 'Risk Mgmt'],
  },
  {
    icon: 'query_stats', title: 'Analyst', desc: 'Deep research & quantitative edge.',
    tools: ['Analytics', 'Scanner', 'Portfolio', 'On-Chain'],
  },
  {
    icon: 'terminal', title: 'Developer', desc: 'Build, automate & integrate via API.',
    tools: ['API', 'Bots', 'SDK', 'CLI'],
  },
];

const STRATEGIES = [
  {
    badge: 'FUNDAMENTAL',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    title: 'Balanced Trio: Quality-Value-Momentum',
    desc: 'Rank all assets on value, quality and momentum — composite index.',
    perf: '+42.8%',
    assets: 4,
  },
  {
    badge: 'ON-CHAIN',
    badgeColor: 'bg-blue-100 text-blue-700',
    title: 'Whale Accumulation vs Exchange Outflow',
    desc: 'Detect pre-breakout patterns from whale wallets & exchange reserves.',
    perf: '+28.6%',
    assets: 3,
  },
];

const CTA_STATS = [
  { value: '1,000+', label: 'Coins tracked' },
  { value: '130+', label: 'Indicators' },
  { value: '44', label: 'News sources' },
  { value: '17', label: 'Production repos' },
];

/* ── Slide Indicator ───────────────────────────────────────────── */

const SLIDE_COUNT = 7;

/* Dot colors adapt to slide bg — dark dots on light slides */
const DOT_THEMES: Array<{ active: string; inactive: string }> = [
  { active: 'bg-neon-green', inactive: 'bg-white/20' },       // 1 dark
  { active: 'bg-emerald-600', inactive: 'bg-gray-300' },      // 2 light
  { active: 'bg-neon-green', inactive: 'bg-white/20' },       // 3 dark
  { active: 'bg-emerald-600', inactive: 'bg-gray-300' },      // 4 light
  { active: 'bg-neon-green', inactive: 'bg-white/20' },       // 5 dark
  { active: 'bg-emerald-600', inactive: 'bg-gray-300' },      // 6 light
  { active: 'bg-neon-green', inactive: 'bg-white/20' },       // 7 dark
];

const DotNav: React.FC<{ active: number; onNavigate: (i: number) => void }> = ({ active, onNavigate }) => (
  <div className="fixed right-2 top-1/2 -translate-y-1/2 z-[70] flex flex-col gap-2">
    {Array.from({ length: SLIDE_COUNT }).map((_, i) => {
      const theme = DOT_THEMES[active] || DOT_THEMES[0];
      return (
        <button
          key={i}
          onClick={() => onNavigate(i)}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            i === active ? `${theme.active} scale-125` : theme.inactive
          }`}
          aria-label={`Go to slide ${i + 1}`}
        />
      );
    })}
  </div>
);

/* ── Component ─────────────────────────────────────────────────── */

export const MobileHome: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  // Tagline vertical flip — rotate every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIdx((prev) => (prev + 1) % HERO_TAGLINES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate feature tabs every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % FEATURE_TABS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Track active slide via IntersectionObserver (same as pitch deck)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const slides = container.querySelectorAll('.deck-slide');
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Array.from(slides).indexOf(entry.target as Element);
            if (idx !== -1) setActiveSlide(idx);
          }
        }
      },
      { root: container, threshold: 0.5 },
    );

    slides.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const navigateTo = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const slides = container.querySelectorAll('.deck-slide');
    slides[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      className="md:hidden fixed inset-0 z-[60] deck-container h-[100dvh] overflow-y-auto"
    >
      <DotNav active={activeSlide} onNavigate={navigateTo} />

      {/* ── Page 1: Hero (DARK) ─────────────────────────────────── */}
      <section className="deck-slide h-[100dvh] overflow-hidden flex flex-col mobile-dark-slide px-6 pt-16 pb-8">
        {/* Top spacer with subtle label */}
        <div className="text-center">
          <span className="text-[10px] font-mono text-neon-green/40 tracking-[0.3em] uppercase">CryptoPrism</span>
        </div>

        {/* Main content — centered with flex-1 */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-extrabold tracking-tight leading-[1.05] mb-1">
            <span className="block mb-1 text-white">Think Like You.</span>
            <span className="relative block overflow-hidden h-[1.15em]">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={taglineIdx}
                  className="block text-neon-green"
                  initial={{ y: '80%', opacity: 0, filter: 'blur(8px)' }}
                  animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: '-80%', opacity: 0, filter: 'blur(8px)' }}
                  transition={{ duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
                >
                  {HERO_TAGLINES[taglineIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <p className="text-base text-gray-400 mt-5 mb-6 leading-relaxed max-w-xs mx-auto">
            Ask in plain <span className="text-white font-semibold">English</span>. Get quant-grade analysis on <span className="text-white font-semibold">Crypto markets</span>—instantly.
          </p>

          <button
            className="hero-cta-primary w-full py-4 text-base font-bold justify-center rounded-lg shadow-lg shadow-green-900/20"
            id="mobile-cta-apply"
          >
            Apply for early access
            <span className="ml-2">→</span>
          </button>
        </div>

        {/* Bottom — Feature tabs */}
        <div className="flex flex-wrap justify-center gap-2 pb-2">
          {FEATURE_TABS.map((tab, idx) => (
            <div
              key={tab.label}
              className={`hero-feature-tab group relative ${
                idx === activeTab ? 'hero-feature-tab-active' : 'opacity-70'
              }`}
            >
              <span
                className={`material-symbols-outlined mr-1.5 text-[18px] transition-colors ${
                  idx === activeTab ? 'text-neon-green' : 'text-gray-400'
                }`}
              >
                {tab.icon}
              </span>
              <span className="text-xs font-semibold tracking-wide whitespace-nowrap">
                {tab.label}
              </span>
              {idx === activeTab && (
                <motion.div
                  className="ml-2 w-1.5 h-1.5 rounded-full bg-neon-green"
                  layoutId="mobile-hero-tab-dot"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Page 2: The Problem (LIGHT) ────────────────────────── */}
      <section className="deck-slide h-[100dvh] overflow-hidden flex flex-col bg-[#f5f5f0] px-6 pt-14 pb-8">
        {/* Top — section label + headline */}
        <div className="mb-auto">
          <span className="text-[10px] font-mono text-emerald-600/70 tracking-widest uppercase mb-3 block">The Problem</span>
          <h2 className="text-[24px] font-bold leading-tight text-gray-900 mb-3">
            119M crypto traders in India.
            <br />
            <span className="text-emerald-600">Zero quant-grade tools.</span>
          </h2>
          <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
            The world's #1 crypto market by adoption — trading on Telegram tips and YouTube calls.
          </p>
        </div>

        {/* Middle — Stats cards */}
        <div className="space-y-3 mb-auto">
          {PAIN_STATS.map((s) => (
            <div key={s.value} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
              <span className="text-emerald-600 font-bold text-xl min-w-[70px]">{s.value}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 leading-snug">{s.label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{s.source}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom — footnote */}
        <p className="text-[11px] text-gray-400 text-center max-w-[280px] mx-auto leading-relaxed">
          Yet traders <span className="text-gray-600 font-medium">do</span> pay for better tools — TradingView: $172M ARR. Nansen: $75M raised. The gap is <span className="text-emerald-600 font-medium">accessibility</span>.
        </p>
      </section>

      {/* ── Page 3: The Solution (DARK) ────────────────────────── */}
      <section className="deck-slide h-[100dvh] overflow-hidden flex flex-col mobile-dark-slide px-6 pt-14 pb-8">
        {/* Top — headline */}
        <div className="mb-auto">
          <span className="text-[10px] font-mono text-neon-green/60 tracking-widest uppercase mb-3 block">The Solution</span>
          <h2 className="text-[24px] font-bold leading-tight text-white">
            One platform.
            <br />
            <span className="text-neon-green">Four intelligence layers.</span>
          </h2>
        </div>

        {/* Middle — Pillar cards */}
        <div className="space-y-3 mb-auto">
          {FOUR_PILLARS.map((p) => (
            <div key={p.title} className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/[0.08]">
              <div className="shrink-0 w-10 h-10 bg-neon-green/10 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-neon-green text-xl">{p.icon}</span>
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">{p.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom — stats bar */}
        <p className="text-[10px] text-gray-500 text-center font-mono tracking-wider">
          130+ INDICATORS &bull; 1,000+ COINS &bull; 44 NEWS SOURCES &bull; &lt;200ms API
        </p>
      </section>

      {/* ── Page 4: Who It's For — Personas (LIGHT) ────────────── */}
      <section className="deck-slide h-[100dvh] overflow-hidden flex flex-col bg-[#f5f5f0] px-6 pt-14 pb-8">
        {/* Top — headline */}
        <div className="mb-auto">
          <span className="text-[10px] font-mono text-emerald-600/70 tracking-widest uppercase mb-3 block">Built For You</span>
          <h2 className="text-[24px] font-bold text-gray-900">
            Built for Every <span className="text-emerald-600">Crypto Native</span>
          </h2>
        </div>

        {/* Middle — Persona cards */}
        <div className="space-y-4 mb-auto">
          {PERSONAS.map((p) => (
            <div key={p.title} className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-emerald-600 text-lg">{p.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{p.title}</h3>
                  <p className="text-xs text-gray-500">{p.desc}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                {p.tools.map((t) => (
                  <span key={t} className="text-[10px] font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom — subtle indicator */}
        <p className="text-[10px] text-gray-400 text-center font-mono tracking-wider">
          SWIPE TO SEE STRATEGIES →
        </p>
      </section>

      {/* ── Page 5: Strategy Library (DARK) ─────────────────────── */}
      <section className="deck-slide h-[100dvh] overflow-hidden flex flex-col mobile-dark-slide px-6 pt-14 pb-8">
        {/* Top — headline */}
        <div className="mb-auto">
          <span className="text-[10px] font-mono text-neon-green/60 tracking-widest uppercase mb-3 block">Strategy Library</span>
          <h2 className="text-[24px] font-bold text-white leading-tight">
            Don't Start from Scratch.
            <br />
            <span className="text-neon-green">Clone the Alpha.</span>
          </h2>
          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            Every algorithm is transparent — understand the logic, optimize parameters, execute on live markets.
          </p>
        </div>

        {/* Middle — Strategy cards */}
        <div className="space-y-3 mb-auto">
          {STRATEGIES.map((s) => (
            <div key={s.title} className="bg-white/[0.04] backdrop-blur-sm p-4 rounded-xl border border-white/[0.08]">
              <div className="flex justify-between items-center mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${s.badgeColor}`}>
                  {s.badge}
                </span>
                <span className="text-[10px] text-gray-500">{s.assets} Assets Active</span>
              </div>
              <h4 className="font-bold text-sm mb-1 text-white">{s.title}</h4>
              <p className="text-xs text-gray-400 mb-3">{s.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-neon-green font-bold text-lg">{s.perf}</span>
                <button className="bg-neon-green text-black text-xs font-bold px-4 py-1.5 rounded-lg cta-early-access-trigger">
                  Clone
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom — browse button */}
        <button className="w-full bg-white/5 border border-white/10 h-10 rounded-xl text-xs font-bold text-white cta-early-access-trigger">
          Browse Entire Library
        </button>
      </section>

      {/* ── Page 6: CTA (LIGHT) ────────────────────────────────── */}
      <section className="deck-slide h-[100dvh] overflow-hidden flex flex-col bg-[#f5f5f0] px-6 pt-14 pb-8">
        {/* Top — headline */}
        <div className="text-center mb-auto">
          <span className="text-[10px] font-mono text-emerald-600/70 tracking-widest uppercase mb-4 block">Early Access</span>
          <h2 className="text-[28px] font-bold leading-tight text-gray-900 mb-3">
            See the next signal
            <br />
            <span className="text-emerald-600">first.</span>
          </h2>
          <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
            The pipeline already processes 24/7 — now accepting closed early beta.
          </p>
        </div>

        {/* Middle — Stats grid */}
        <div className="grid grid-cols-2 gap-3 mb-auto">
          {CTA_STATS.map((s) => (
            <div key={s.label} className="text-center p-3 rounded-xl bg-white border border-gray-200 shadow-sm">
              <div className="text-emerald-600 font-bold text-lg">{s.value}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Bottom — CTA button */}
        <div>
          <button
            className="bg-gray-900 text-white font-bold h-14 rounded-xl w-full text-sm shadow-lg"
            id="mobile-cta-apply-2"
          >
            Apply for early access
          </button>
          <p className="text-[10px] text-gray-400 text-center mt-4 font-mono tracking-wider">
            BUILT FROM INDIA &bull; BUILT FOR EVERY TRADER ON EARTH
          </p>
        </div>
      </section>

      {/* ── Page 7: Footer (DARK) ──────────────────────────────── */}
      <section className="deck-slide h-[100dvh] overflow-hidden flex flex-col mobile-dark-slide px-6 pt-14 pb-8">
        {/* Top — Logo + description */}
        <div className="mb-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-neon-green text-xl">filter_tilt_shift</span>
            <span className="text-base font-bold tracking-tight text-white">CryptoPrism</span>
          </div>
          <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
            Institutional-grade AI quant trading infrastructure for everyone. Leverage professional-grade analytics to stay ahead of the market.
          </p>
        </div>

        {/* Middle — Link columns */}
        <div className="grid grid-cols-3 gap-4 mb-auto">
          <div>
            <h5 className="text-[10px] font-bold mb-3 uppercase text-gray-400 tracking-widest">Product</h5>
            <ul className="space-y-2 text-xs text-gray-500">
              <li><a className="hover:text-neon-green transition-colors" href="#">Features</a></li>
              <li><a className="hover:text-neon-green transition-colors" href="#">API Docs</a></li>
              <li><a className="hover:text-neon-green transition-colors" href="#">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] font-bold mb-3 uppercase text-gray-400 tracking-widest">Company</h5>
            <ul className="space-y-2 text-xs text-gray-500">
              <li><a className="hover:text-neon-green transition-colors" href="#">About</a></li>
              <li><a className="hover:text-neon-green transition-colors" href="#">Careers</a></li>
              <li><a className="hover:text-neon-green transition-colors" href="#">Contact</a></li>
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

        {/* Bottom — Legal */}
        <div>
          <div className="border-t border-white/5 pt-4 mb-4">
            <p className="text-[10px] text-gray-500 mb-1">A product by <span className="text-gray-300">Trinetry Infotech Private Limited</span></p>
            <p className="text-[10px] text-gray-600">Established November 2025 &bull; India</p>
          </div>
          <div className="flex justify-between items-center text-[10px] text-gray-600">
            <p>&copy; 2026 CryptoPrism Inc.</p>
            <div className="flex gap-4">
              <a className="hover:text-gray-400" href="#">Privacy</a>
              <a className="hover:text-gray-400" href="#">Terms</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MobileHome;
