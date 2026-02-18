/**
 * MobileHome — mobile-only pitch-deck-style full-page layout.
 *
 * Design system: Single dark universe with surface-depth modulation.
 * No theme switching. Luminance steps create visual rhythm.
 *
 * Color architecture:
 *   Base (#0B1412)  → hero, CTA, footer
 *   S1   (#0F1C19)  → elevated section backgrounds
 *   S2   (#132621)  → card surfaces
 *   S3   (#18332C)  → hover / active states
 *   Accent (#19C37D) → interactive elements ONLY
 *   Text: #E6F2EE / #9FB7AF / #6B8A82 / #3E5751
 *   PnL:  #22E3A0 (pos) / #FF5A6B (neg) — never reuse accent
 *   Borders: rgba(255,255,255,0.06) — no shadows
 */

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const HERO_TAGLINES = [
  'Trade Like a Quant.',
  'Trade Like a Machine.',
  'Execute Like a Pro.',
  'Analyze Like an Institution.',
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
    title: 'Balanced Trio: Quality-Value-Momentum',
    desc: 'Rank all assets on value, quality and momentum — composite index.',
    perf: '+42.8%',
    assets: 4,
  },
  {
    badge: 'ON-CHAIN',
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

const DotNav: React.FC<{ active: number; onNavigate: (i: number) => void }> = ({ active, onNavigate }) => (
  <div className={`fixed right-2 top-1/2 -translate-y-1/2 z-[70] flex flex-col gap-2 transition-opacity duration-500 ${active === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
    {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
      <button
        key={i}
        onClick={() => onNavigate(i)}
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          i === active ? 'bg-m-accent scale-125' : 'bg-m-text4'
        }`}
        aria-label={`Go to slide ${i + 1}`}
      />
    ))}
  </div>
);

/* ── Component ─────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: 'Features', slide: 2 },
  { label: 'Who It\'s For', slide: 3 },
  { label: 'Strategies', slide: 4 },
  { label: 'Early Access', slide: 5 },
];

export const MobileHome: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Tagline rotation — 2s
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIdx((prev) => (prev + 1) % HERO_TAGLINES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Track active slide via IntersectionObserver
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

      {/* ── Burger Button (top-right) ─────────────────────────────── */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-4 right-4 z-[80] w-10 h-10 flex items-center justify-center rounded-lg bg-[#050807]/60 backdrop-blur-md border border-m-border"
        aria-label="Toggle menu"
      >
        <span className="material-symbols-outlined text-m-text1 text-xl">
          {menuOpen ? 'close' : 'menu'}
        </span>
      </button>

      {/* ── Nav Overlay ────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[75] bg-[#050807]/95 backdrop-blur-lg flex flex-col items-center justify-center gap-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <img src="/logo.svg" alt="CryptoPrism" className="w-7 h-7" />
              <span className="text-lg font-bold tracking-tight text-m-text1">CryptoPrism</span>
            </div>
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => { setMenuOpen(false); navigateTo(link.slide); }}
                className="text-lg font-semibold text-m-text2 hover:text-m-accent transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="mt-4">
              <button
                onClick={() => { setMenuOpen(false); navigateTo(5); }}
                className="px-8 py-3 rounded-lg bg-m-accent text-m-base text-sm font-bold"
              >
                Request Early Access
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Page 1: Hero (Base) ──────────────────────────────────── */}
      <section className="deck-slide h-[100dvh] overflow-hidden mobile-slide-base px-6 pt-14 pb-8 flex flex-col">
        <div className="mb-auto">
          <h1 className="text-[28px] font-bold leading-tight text-m-text1 mb-1">
            Think Like You.
          </h1>
          <span className="relative block overflow-hidden h-[32px] mb-4">
            <AnimatePresence mode="wait">
              <motion.span
                key={taglineIdx}
                className="block text-[22px] leading-[32px] font-bold text-m-accent whitespace-nowrap"
                initial={{ y: 32, opacity: 0, filter: 'blur(6px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -32, opacity: 0, filter: 'blur(6px)' }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {HERO_TAGLINES[taglineIdx]}
              </motion.span>
            </AnimatePresence>
          </span>
          <p className="text-sm text-m-text3 max-w-xs leading-relaxed">
            Quant-grade crypto analysis for every trader. Plain English in, institutional-grade signals out.
          </p>
        </div>

        {/* Mini viz — live pulse metrics */}
        <div className="space-y-2 mb-auto">
          {[
            { icon: 'monitoring', label: '1,000+ coins tracked', value: 'Live' },
            { icon: 'neurology', label: '130+ quant indicators', value: 'Real-time' },
            { icon: 'newspaper', label: '44 news sources scored', value: 'Hourly' },
          ].map((m) => (
            <div key={m.label} className="flex items-center gap-3 p-3 rounded-lg bg-m-surface2 border border-m-border">
              <div className="w-8 h-8 bg-m-surface3 rounded-lg flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-m-accent text-base">{m.icon}</span>
              </div>
              <p className="text-xs text-m-text2 flex-1">{m.label}</p>
              <span className="text-[10px] font-mono text-m-accent">{m.value}</span>
            </div>
          ))}
        </div>

        <button
          className="w-full py-4 rounded-lg bg-m-accent text-m-base text-[15px] font-semibold tracking-wide"
          id="mobile-cta-apply"
        >
          Request early access
        </button>
      </section>

      {/* ── Page 2: The Problem (Surface 1) ──────────────────────── */}
      <section className="deck-slide h-[100dvh] overflow-hidden flex flex-col mobile-slide-s1 px-6 pt-16 pb-8">
        <div className="mobile-blur-veil" />
        <div className="mb-auto">
          <span className="text-[10px] font-mono text-m-text4 tracking-widest uppercase mb-3 block">The Problem</span>
          <h2 className="text-[24px] font-bold leading-tight text-m-text1 mb-3">
            119M crypto traders in India.
            <br />
            <span className="text-m-accent">Zero quant-grade tools.</span>
          </h2>
          <p className="text-sm text-m-text3 max-w-xs leading-relaxed">
            The world's #1 crypto market by adoption — trading on Telegram tips and YouTube calls.
          </p>
        </div>

        <div className="space-y-3 mb-auto">
          {PAIN_STATS.map((s) => (
            <div key={s.value} className="flex items-center gap-4 p-4 rounded-lg bg-m-surface2 border border-m-border">
              <span className="text-m-pnl-neg font-bold text-xl min-w-[70px]">{s.value}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-m-text2 leading-snug">{s.label}</p>
                <p className="text-[10px] text-m-text4 mt-0.5">{s.source}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-m-text4 text-center max-w-[280px] mx-auto leading-relaxed">
          Yet traders do pay for better tools — TradingView: $172M ARR. Nansen: $75M raised. The gap is accessibility.
        </p>
      </section>

      {/* ── Page 3: The Solution (Base) ──────────────────────────── */}
      <section className="deck-slide h-[100dvh] overflow-hidden flex flex-col mobile-slide-base px-6 pt-16 pb-8">
        <div className="mobile-blur-veil" />
        <div className="mb-auto">
          <span className="text-[10px] font-mono text-m-text4 tracking-widest uppercase mb-3 block">The Solution</span>
          <h2 className="text-[24px] font-bold leading-tight text-m-text1">
            One platform.
            <br />
            <span className="text-m-accent">Four intelligence layers.</span>
          </h2>
        </div>

        <div className="space-y-3 mb-auto">
          {FOUR_PILLARS.map((p) => (
            <div key={p.title} className="flex gap-3 p-4 rounded-lg bg-m-surface2 border border-m-border">
              <div className="shrink-0 w-10 h-10 bg-m-surface3 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-m-accent text-xl">{p.icon}</span>
              </div>
              <div>
                <h3 className="font-bold text-m-text1 text-sm">{p.title}</h3>
                <p className="text-xs text-m-text3 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-m-text4 text-center font-mono tracking-wider">
          130+ INDICATORS &bull; 1,000+ COINS &bull; 44 NEWS SOURCES &bull; &lt;200ms API
        </p>
      </section>

      {/* ── Page 4: Personas (Surface 1) ─────────────────────────── */}
      <section className="deck-slide h-[100dvh] overflow-hidden flex flex-col mobile-slide-s1 px-6 pt-16 pb-8">
        <div className="mobile-blur-veil" />
        <div className="mb-auto">
          <span className="text-[10px] font-mono text-m-text4 tracking-widest uppercase mb-3 block">Built For You</span>
          <h2 className="text-[24px] font-bold text-m-text1">
            Built for Every Crypto Native
          </h2>
        </div>

        <div className="space-y-4 mb-auto">
          {PERSONAS.map((p) => (
            <div key={p.title} className="p-4 rounded-lg bg-m-surface2 border border-m-border">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 bg-m-surface3 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-m-accent text-lg">{p.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-m-text1 text-sm">{p.title}</h3>
                  <p className="text-xs text-m-text3">{p.desc}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                {p.tools.map((t) => (
                  <span key={t} className="text-[10px] font-mono bg-m-surface3 text-m-text3 px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-m-text4 text-center font-mono tracking-wider">
          SWIPE TO SEE STRATEGIES &rarr;
        </p>
      </section>

      {/* ── Page 5: Strategy Library (Base) ───────────────────────── */}
      <section className="deck-slide h-[100dvh] overflow-hidden flex flex-col mobile-slide-base px-6 pt-16 pb-8">
        <div className="mobile-blur-veil" />
        <div className="mb-auto">
          <span className="text-[10px] font-mono text-m-text4 tracking-widest uppercase mb-3 block">Strategy Library</span>
          <h2 className="text-[24px] font-bold text-m-text1 leading-tight">
            Don't Start from Scratch.
            <br />
            <span className="text-m-accent">Clone the Alpha.</span>
          </h2>
          <p className="text-xs text-m-text3 mt-2 leading-relaxed">
            Every algorithm is transparent — understand the logic, optimize parameters, execute on live markets.
          </p>
        </div>

        <div className="space-y-3 mb-auto">
          {STRATEGIES.map((s) => (
            <div key={s.title} className="p-4 rounded-lg bg-m-surface2 border border-m-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-m-surface3 text-m-text2">
                  {s.badge}
                </span>
                <span className="text-[10px] text-m-text4">{s.assets} Assets Active</span>
              </div>
              <h4 className="font-bold text-sm mb-1 text-m-text1">{s.title}</h4>
              <p className="text-xs text-m-text3 mb-3">{s.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-m-pnl-pos font-bold text-lg">{s.perf}</span>
                <button className="bg-m-accent text-m-base text-xs font-bold px-4 py-1.5 rounded-lg cta-early-access-trigger">
                  Clone
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full border border-m-border h-10 rounded-lg text-xs font-bold text-m-text2 cta-early-access-trigger">
          Browse Entire Library
        </button>
      </section>

      {/* ── Page 6: CTA (Surface 1) ──────────────────────────────── */}
      <section className="deck-slide h-[100dvh] overflow-hidden flex flex-col mobile-slide-s1 px-6 pt-16 pb-8">
        <div className="mobile-blur-veil" />
        <div className="text-center mb-auto">
          <span className="text-[10px] font-mono text-m-text4 tracking-widest uppercase mb-4 block">Early Access</span>
          <h2 className="text-[28px] font-bold leading-tight text-m-text1 mb-3">
            See the next signal
            <br />
            <span className="text-m-accent">first.</span>
          </h2>
          <p className="text-sm text-m-text3 max-w-xs mx-auto leading-relaxed">
            The pipeline already processes 24/7 — now accepting closed early beta.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-auto">
          {CTA_STATS.map((s) => (
            <div key={s.label} className="text-center p-3 rounded-lg bg-m-surface2 border border-m-border">
              <div className="text-m-text1 font-bold text-lg">{s.value}</div>
              <div className="text-[10px] text-m-text4 uppercase tracking-wider mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <div>
          <button
            className="bg-m-accent text-m-base font-bold h-14 rounded-lg w-full text-sm"
            id="mobile-cta-apply-2"
          >
            Apply for early access
          </button>
          <p className="text-[10px] text-m-text4 text-center mt-4 font-mono tracking-wider">
            BUILT FROM INDIA &bull; BUILT FOR EVERY TRADER ON EARTH
          </p>
        </div>
      </section>

      {/* ── Page 7: Footer (Base) ────────────────────────────────── */}
      <section className="deck-slide h-[100dvh] overflow-hidden flex flex-col mobile-slide-base px-6 pt-16 pb-8">
        <div className="mobile-blur-veil" />
        <div className="mb-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-m-accent text-xl">filter_tilt_shift</span>
            <span className="text-base font-bold tracking-tight text-m-text1">CryptoPrism</span>
          </div>
          <p className="text-xs text-m-text3 max-w-xs leading-relaxed">
            Institutional-grade AI quant trading infrastructure for everyone. Leverage professional-grade analytics to stay ahead of the market.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-auto">
          <div>
            <h5 className="text-[10px] font-bold mb-3 uppercase text-m-text4 tracking-widest">Product</h5>
            <ul className="space-y-2 text-xs text-m-text3">
              <li><a className="hover:text-m-accent transition-colors" href="#">Features</a></li>
              <li><a className="hover:text-m-accent transition-colors" href="#">API Docs</a></li>
              <li><a className="hover:text-m-accent transition-colors" href="#">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] font-bold mb-3 uppercase text-m-text4 tracking-widest">Company</h5>
            <ul className="space-y-2 text-xs text-m-text3">
              <li><a className="hover:text-m-accent transition-colors" href="#">About</a></li>
              <li><a className="hover:text-m-accent transition-colors" href="#">Careers</a></li>
              <li><a className="hover:text-m-accent transition-colors" href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] font-bold mb-3 uppercase text-m-text4 tracking-widest">Connect</h5>
            <ul className="space-y-2 text-xs text-m-text3">
              <li><a className="hover:text-m-accent transition-colors" href="#">Discord</a></li>
              <li><a className="hover:text-m-accent transition-colors" href="#">X / Twitter</a></li>
              <li><a className="hover:text-m-accent transition-colors" href="#">Telegram</a></li>
            </ul>
          </div>
        </div>

        <div>
          <div className="border-t border-m-border pt-4 mb-4">
            <p className="text-[10px] text-m-text4 mb-1">A product by <span className="text-m-text2">Trinetry Infotech Private Limited</span></p>
            <p className="text-[10px] text-m-text4">Established November 2025 &bull; India</p>
          </div>
          <div className="flex justify-between items-center text-[10px] text-m-text4">
            <p>&copy; 2026 CryptoPrism Inc.</p>
            <div className="flex gap-4">
              <a className="hover:text-m-text3" href="#">Privacy</a>
              <a className="hover:text-m-text3" href="#">Terms</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MobileHome;
