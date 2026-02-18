/**
 * MobileHome — mobile-only consumer landing page.
 *
 * Layer stack: Void → Energy Field → Grid → Grain → UI
 * Glassmorphism cards, heading glow, consumer tone.
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

const FEATURES = [
  { icon: 'terminal', title: 'Ask in Plain English', desc: 'Type what you want to know. Get quant-grade answers instantly — no code, no complex filters.' },
  { icon: 'bolt', title: 'Clone Proven Strategies', desc: 'Browse strategies built by veteran quants. Fork, tweak, or run them as-is on live markets.' },
  { icon: 'auto_awesome', title: 'Smart Watchlists', desc: 'Lists that think. They auto-add qualifiers and drop underperformers while you sleep.' },
  { icon: 'article', title: 'News with Numbers', desc: 'Every headline scored for impact. 44 sources, updated hourly. No fluff, pure signal.' },
];

const PERSONAS = [
  {
    icon: 'candlestick_chart', title: 'Traders', desc: 'Real-time signals, smart alerts, and execution tools that match your speed.',
    tools: ['Charts', 'Screener', 'Alerts', 'Risk'],
  },
  {
    icon: 'query_stats', title: 'Analysts', desc: 'On-chain data, sentiment scoring, and multi-factor screens for deep research.',
    tools: ['Analytics', 'Scanner', 'Portfolio', 'On-Chain'],
  },
  {
    icon: 'terminal', title: 'Developers', desc: 'REST & WebSocket APIs, strategy SDK, and webhook integrations.',
    tools: ['API', 'Bots', 'SDK', 'CLI'],
  },
];

const STRATEGIES = [
  {
    badge: 'FUNDAMENTAL',
    title: 'Balanced Trio: Quality-Value-Momentum',
    desc: 'Composite ranking across value, quality, and momentum factors.',
    roi: '+42.8%',
    sharpe: '1.84',
    maxDD: '-12.3%',
    winRate: '68%',
    assets: 4,
  },
  {
    badge: 'MOMENTUM',
    title: 'Support Bounce + Volume Confirmation',
    desc: 'Assets testing 20-day support with 2x volume spike on the bounce.',
    roi: '+36.1%',
    sharpe: '1.67',
    maxDD: '-15.2%',
    winRate: '64%',
    assets: 6,
  },
  {
    badge: 'ON-CHAIN',
    title: 'Whale Accumulation vs Exchange Outflow',
    desc: 'Detects pre-breakout patterns from whale wallets & exchange reserves.',
    roi: '+28.6%',
    sharpe: '1.52',
    maxDD: '-18.7%',
    winRate: '61%',
    assets: 3,
  },
];

const SOCIAL_PROOF = [
  { value: '1,000+', label: 'Coins' },
  { value: '130+', label: 'Indicators' },
  { value: '44', label: 'News sources' },
  { value: '<200ms', label: 'Latency' },
];

/* ── Strategy Slide (horizontal swipe, stacked cards) ────────── */

const StrategySlide: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const touchStartX = useRef(0);

  const goTo = (dir: number) => {
    setActiveIdx((prev) => (prev + dir + STRATEGIES.length) % STRATEGIES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    if (deltaX > 50) goTo(1);       // swipe left → next
    else if (deltaX < -50) goTo(-1); // swipe right → prev
  };

  // Position helper: -1 = left peek, 0 = active, 1 = right peek
  const getOffset = (i: number) => {
    let diff = i - activeIdx;
    // Wrap for infinite loop
    if (diff > Math.floor(STRATEGIES.length / 2)) diff -= STRATEGIES.length;
    if (diff < -Math.floor(STRATEGIES.length / 2)) diff += STRATEGIES.length;
    return diff;
  };

  return (
    <section className="deck-slide h-[100dvh] overflow-hidden flex flex-col mobile-slide-base px-6 pt-14 pb-8">
      <div className="mobile-blur-veil" />
      <div className="mb-4">
        <span className="text-[10px] font-mono text-m-text4 tracking-widest uppercase mb-3 block">Strategy Library</span>
        <h2 className="text-[24px] font-bold text-m-text1 leading-tight m-heading-glow">
          Don't start from zero.
          <br />
          <span className="text-m-accent m-accent-glow">Clone what works.</span>
        </h2>
      </div>

      {/* Stacked cards — horizontal offset */}
      <div
        className="flex-1 relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {STRATEGIES.map((s, i) => {
          const offset = getOffset(i);
          const isActive = offset === 0;
          const visible = Math.abs(offset) <= 1;

          return (
            <div
              key={i}
              className="absolute p-5 rounded-xl m-glass flex flex-col"
              style={{
                width: 'calc(100% - 48px)',
                height: 300,
                top: 'calc(50% - 150px)',
                left: '50%',
                transform: `translateX(calc(-50% + ${offset * 85}%)) scale(${isActive ? 1 : 0.9})`,
                opacity: isActive ? 1 : 0.33,
                zIndex: isActive ? 10 : 5 - Math.abs(offset),
                transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                pointerEvents: isActive ? 'auto' : 'none',
                visibility: visible ? 'visible' : 'hidden',
              }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/[0.06] text-m-text2">
                  {s.badge}
                </span>
                <span className="text-[10px] text-m-text4">{s.assets} assets</span>
              </div>
              <h4 className="font-bold text-sm mb-1 text-m-text1">{s.title}</h4>
              <p className="text-xs text-m-text3 mb-4 leading-relaxed">{s.desc}</p>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="p-2 rounded-lg bg-white/[0.03]">
                  <p className="text-[9px] text-m-text4 uppercase tracking-wider">ROI</p>
                  <p className="text-sm font-bold text-m-pnl-pos">{s.roi}</p>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.03]">
                  <p className="text-[9px] text-m-text4 uppercase tracking-wider">Sharpe</p>
                  <p className="text-sm font-bold text-m-text1">{s.sharpe}</p>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.03]">
                  <p className="text-[9px] text-m-text4 uppercase tracking-wider">Max DD</p>
                  <p className="text-sm font-bold text-m-pnl-neg">{s.maxDD}</p>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.03]">
                  <p className="text-[9px] text-m-text4 uppercase tracking-wider">Win Rate</p>
                  <p className="text-sm font-bold text-m-text1">{s.winRate}</p>
                </div>
              </div>

              <div className="mt-auto flex items-center gap-3">
                <button className="flex-1 bg-m-accent text-m-base text-xs font-bold py-2.5 rounded-lg cta-early-access-trigger">
                  Clone Strategy
                </button>
                <button className="w-10 h-10 rounded-lg border border-m-border flex items-center justify-center cta-early-access-trigger">
                  <span className="material-symbols-outlined text-m-text3 text-base">visibility</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Swipe hint + Dots */}
      <div className="flex items-center justify-center gap-1 text-[10px] text-m-text4 mt-2 mb-1">
        <span className="material-symbols-outlined text-xs">swipe</span>
        <span>Swipe to explore</span>
      </div>
      <div className="flex items-center justify-center gap-1.5 mb-3">
        {STRATEGIES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === activeIdx ? 'w-5 bg-m-accent' : 'w-1.5 bg-m-text4'
            }`}
          />
        ))}
      </div>

      <button className="w-full border border-m-border h-10 rounded-xl text-xs font-bold text-m-text2 m-glass cta-early-access-trigger">
        Browse Entire Library
      </button>
    </section>
  );
};

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

/* ── Grain layer (single instance in fixed bg) ───────────────── */
const Grain = () => <div className="mobile-grain" />;

/* ── Animated counter for stats ──────────────────────────────── */
const AnimatedStat: React.FC<{ value: string; duration?: number }> = ({ value, duration = 1200 }) => {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          // Extract numeric part
          const match = value.match(/^([<>]?)(\d+[\d,.]*)(.*)/);
          if (!match) { setDisplay(value); return; }
          const [, prefix, numStr, suffix] = match;
          const target = parseFloat(numStr.replace(/,/g, ''));
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current = Math.round(target * eased);
            setDisplay(`${prefix}${current.toLocaleString()}${suffix}`);
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);

  return <div ref={ref}>{display}</div>;
};

/* ── Component ─────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: 'Features', slide: 2 },
  { label: 'Who It\'s For', slide: 3 },
  { label: 'Strategies', slide: 4 },
  { label: 'Get Started', slide: 5 },
];

export const MobileHome: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIdx((prev) => (prev + 1) % HERO_TAGLINES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
      {/* Single fixed background — shared by all slides */}
      <div className="mobile-bg-fixed">
        <div className="mobile-bg-energy" />
        <div className="mobile-bg-grid" />
        <Grain />
      </div>

      <DotNav active={activeSlide} onNavigate={navigateTo} />

      {/* ── Burger Button ──────────────────────────────────────────── */}
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
                Get Early Access
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Page 1: Hero ───────────────────────────────────────────── */}
      <section className="deck-slide h-[100dvh] overflow-hidden mobile-slide-base px-6 pt-14 pb-8 flex flex-col">
        <div className="mb-auto">
          <div className="flex items-center gap-2 mb-5">
            <img src="/logo.svg" alt="" className="w-6 h-6" />
            <span className="text-base font-display font-extrabold tracking-tighter uppercase text-white">
              Crypto<span className="text-[#0ecb81]">Prism</span>
            </span>
          </div>
          <h1 className="text-[28px] font-bold leading-tight text-m-text1 mb-1 m-heading-glow">
            Think Like You.
          </h1>
          <span className="relative block overflow-hidden h-[32px] mb-4">
            <AnimatePresence mode="wait">
              <motion.span
                key={taglineIdx}
                className="block text-[22px] leading-[32px] font-bold text-m-accent whitespace-nowrap m-accent-glow"
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
            Your AI-powered crypto copilot. Ask anything in plain English — get institutional-grade signals back.
          </p>
        </div>

        <div className="space-y-2 mb-auto">
          {[
            { icon: 'monitoring', label: '1,000+ coins tracked', value: 'Live' },
            { icon: 'neurology', label: '130+ quant indicators', value: 'Real-time' },
            { icon: 'newspaper', label: '44 news sources scored', value: 'Hourly' },
          ].map((m) => (
            <div key={m.label} className="flex items-center gap-3 p-3 rounded-xl m-glass">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-m-accent/10">
                <span className="material-symbols-outlined text-m-accent text-base">{m.icon}</span>
              </div>
              <p className="text-xs text-m-text2 flex-1">{m.label}</p>
              <span className="text-[10px] font-mono text-m-accent">{m.value}</span>
            </div>
          ))}
        </div>

        <button
          className="w-full py-4 rounded-xl bg-m-accent text-m-base text-[15px] font-semibold tracking-wide"
          id="mobile-cta-apply"
        >
          Get early access
        </button>
      </section>

      {/* ── Page 2: Why CryptoPrism ────────────────────────────────── */}
      <section className="deck-slide h-[100dvh] overflow-hidden flex flex-col mobile-slide-s1 px-6 pt-14 pb-8">
        <div className="mobile-blur-veil" />
        <div className="mb-auto">
          <span className="text-[10px] font-mono text-m-text4 tracking-widest uppercase mb-3 block">Why CryptoPrism</span>
          <h2 className="text-[24px] font-bold leading-tight text-m-text1 mb-3 m-heading-glow">
            Most traders lose because
            <br />
            <span className="text-m-accent m-accent-glow">they're flying blind.</span>
          </h2>
          <p className="text-sm text-m-text3 max-w-xs leading-relaxed">
            No real data. No quant tools. Just social media tips and gut feel. We built something better.
          </p>
        </div>

        <div className="space-y-3 mb-auto">
          {[
            { stat: '73–81%', text: 'of retail crypto investors lose money', src: 'BIS Working Paper' },
            { stat: '84%', text: 'rely on social media for trading decisions', src: 'CoinGecko 2024' },
            { stat: '49%', text: 'of Indian traders ended FY25 in net losses', src: 'KoinX Tax Report' },
          ].map((s) => (
            <div key={s.stat} className="flex items-center gap-4 p-4 rounded-xl m-glass">
              <span className="text-m-pnl-neg font-bold text-xl min-w-[70px]">{s.stat}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-m-text2 leading-snug">{s.text}</p>
                <p className="text-[10px] text-m-text4 mt-0.5">{s.src}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-m-text4 text-center max-w-[280px] mx-auto leading-relaxed">
          Traders pay for better tools — TradingView: $172M ARR. The gap is accessibility.
        </p>
      </section>

      {/* ── Page 3: What You Get ───────────────────────────────────── */}
      <section className="deck-slide h-[100dvh] overflow-hidden flex flex-col mobile-slide-base px-6 pt-14 pb-8">
        <div className="mobile-blur-veil" />
        <div className="mb-auto">
          <span className="text-[10px] font-mono text-m-text4 tracking-widest uppercase mb-3 block">What You Get</span>
          <h2 className="text-[24px] font-bold leading-tight text-m-text1 m-heading-glow">
            One platform.
            <br />
            <span className="text-m-accent m-accent-glow">Everything you need.</span>
          </h2>
        </div>

        <div className="space-y-3 mb-auto">
          {FEATURES.map((p) => (
            <div key={p.title} className="flex gap-3 p-4 rounded-xl m-glass">
              <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-m-accent/10">
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
          130+ INDICATORS &bull; 1,000+ COINS &bull; 44 NEWS SOURCES
        </p>
      </section>

      {/* ── Page 4: Built for You ──────────────────────────────────── */}
      <section className="deck-slide h-[100dvh] overflow-hidden flex flex-col mobile-slide-s1 px-6 pt-14 pb-8">
        <div className="mobile-blur-veil" />
        <div className="mb-auto">
          <span className="text-[10px] font-mono text-m-text4 tracking-widest uppercase mb-3 block">Built For You</span>
          <h2 className="text-[24px] font-bold text-m-text1 m-heading-glow">
            Whether you trade, analyze,
            <br />
            <span className="text-m-accent m-accent-glow">or build — we adapt.</span>
          </h2>
        </div>

        <div className="space-y-4 mb-auto">
          {PERSONAS.map((p) => (
            <div key={p.title} className="p-4 rounded-xl m-glass">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-m-accent/10">
                  <span className="material-symbols-outlined text-m-accent text-lg">{p.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-m-text1 text-sm">{p.title}</h3>
                  <p className="text-xs text-m-text3">{p.desc}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                {p.tools.map((t) => (
                  <span key={t} className="text-[10px] font-mono text-m-text3 px-2 py-0.5 rounded bg-white/[0.04]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-m-text4 text-center">
          Keep scrolling to see strategies &darr;
        </p>
      </section>

      {/* ── Page 5: Strategies (vertical auto-scroll) ──────────── */}
      <StrategySlide />


      {/* ── Page 6: Get Started ────────────────────────────────────── */}
      <section className="deck-slide h-[100dvh] overflow-hidden flex flex-col mobile-slide-s1 px-6 pt-14 pb-8">
        <div className="mobile-blur-veil" />
        <div className="text-center mb-auto">
          <span className="text-[10px] font-mono text-m-text4 tracking-widest uppercase mb-4 block">Get Started</span>
          <h2 className="text-[28px] font-bold leading-tight text-m-text1 mb-3 m-heading-glow">
            See the next signal
            <br />
            <span className="text-m-accent m-accent-glow">before everyone else.</span>
          </h2>
          <p className="text-sm text-m-text3 max-w-xs mx-auto leading-relaxed">
            The engine is already running 24/7. Join the closed beta and get your edge.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-auto">
          {SOCIAL_PROOF.map((s) => (
            <div key={s.label} className="text-center p-3 rounded-xl m-glass">
              <div className="text-m-text1 font-bold text-lg">
                <AnimatedStat value={s.value} />
              </div>
              <div className="text-[10px] text-m-text4 uppercase tracking-wider mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <div>
          <button
            className="bg-m-accent text-m-base font-bold h-14 rounded-xl w-full text-sm"
            id="mobile-cta-apply-2"
          >
            Get early access
          </button>
          <p className="text-[10px] text-m-text4 text-center mt-4">
            Built from India. Built for every trader on earth.
          </p>
        </div>
      </section>

      {/* ── Page 7: Footer ─────────────────────────────────────────── */}
      <section className="deck-slide h-[100dvh] overflow-hidden flex flex-col mobile-slide-base px-6 pt-14 pb-8">
        <div className="mobile-blur-veil" />
        <div className="mb-auto">
          <div className="flex items-center gap-2 mb-4">
            <img src="/logo.svg" alt="CryptoPrism" className="w-5 h-5" />
            <span className="text-base font-bold tracking-tight text-m-text1">CryptoPrism</span>
          </div>
          <p className="text-xs text-m-text3 max-w-xs leading-relaxed">
            AI-powered crypto intelligence for everyone. Professional-grade analytics, plain English interface.
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
