import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const FEATURE_TABS = [
  { icon: 'bar_chart', label: 'Live Crypto Data', active: true },
  { icon: 'trending_up', label: 'Live Analytics', active: false },
  { icon: 'grid_view', label: 'Quant Models', active: false },
  { icon: 'bolt', label: 'Real-time Compute', active: false },
] as const;

const HERO_TAGLINES = [
  'Trade Like a Quant.',
  'Trade Like a Machine.',
  'Execute Like a Pro.',
  'Analyze Like an Institution.',
];

const PLACEHOLDER_QUERIES = [
  'Backtest momentum strategy: 52-week high breakout',
  'Find coins near 52W High with RSI divergence',
  'Show whale accumulation vs exchange reserve drops',
  'Scan DeFi protocols with TVL growth > 25% MoM',
];

/* ── Stagger animation helpers ────────────────────────────────────── */
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number], delay } },
});


interface HeroSectionProps {
  readonly className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Tagline typewriter
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [taglineText, setTaglineText] = useState(HERO_TAGLINES[0]);
  const [taglineDeleting, setTaglineDeleting] = useState(false);
  const taglineRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Parallax scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const commandBarY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  // particleOpacity removed — tsparticles replaced with CSS-only dots
  // Typewriter effect
  useEffect(() => {
    const currentQuery = PLACEHOLDER_QUERIES[placeholderIdx];

    if (!isDeleting && displayText.length < currentQuery.length) {
      typingRef.current = setTimeout(() => {
        setDisplayText(currentQuery.slice(0, displayText.length + 1));
      }, 40);
    } else if (!isDeleting && displayText.length === currentQuery.length) {
      typingRef.current = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText.length > 0) {
      typingRef.current = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, 25);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setPlaceholderIdx((prev) => (prev + 1) % PLACEHOLDER_QUERIES.length);
    }

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [displayText, isDeleting, placeholderIdx]);

  // Tagline typewriter effect
  useEffect(() => {
    const currentTagline = HERO_TAGLINES[taglineIdx];

    if (!taglineDeleting && taglineText.length < currentTagline.length) {
      taglineRef.current = setTimeout(() => {
        setTaglineText(currentTagline.slice(0, taglineText.length + 1));
      }, 60);
    } else if (!taglineDeleting && taglineText.length === currentTagline.length) {
      taglineRef.current = setTimeout(() => setTaglineDeleting(true), 2500);
    } else if (taglineDeleting && taglineText.length > 0) {
      taglineRef.current = setTimeout(() => {
        setTaglineText(taglineText.slice(0, -1));
      }, 35);
    } else if (taglineDeleting && taglineText.length === 0) {
      setTaglineDeleting(false);
      setTaglineIdx((prev) => (prev + 1) % HERO_TAGLINES.length);
    }

    return () => {
      if (taglineRef.current) clearTimeout(taglineRef.current);
    };
  }, [taglineText, taglineDeleting, taglineIdx]);

  return (
    <section
      ref={sectionRef}
      className={`relative flex flex-col items-center justify-center text-center min-h-screen px-4 sm:px-6 pt-24 sm:pt-0 ${className}`}
    >
      {/* CSS-only particle dots */}
      <div className="absolute inset-0 z-0 pointer-events-none hero-css-particles" />

      {/* Decorative data lines */}
      <div className="hero-data-line hero-line-1" />
      <div className="hero-data-line hero-line-2" />
      <div className="hero-data-line hero-line-3" />

      {/* Glow overlay behind hero */}
      <div className="absolute inset-0 hero-glow-overlay pointer-events-none" />

      {/* Main headline — parallax + staggered entrance */}
      <motion.h1
        className="relative z-10 text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight mb-6"
        style={{ y: headlineY }}
      >
        <motion.span className="block mb-2 text-white" {...fadeUp(0.1)}>
          Think Like You.
        </motion.span>
        <motion.span className="text-neon-green hero-neon-glow" {...fadeUp(0.25)}>
          {taglineText}
          <span className="inline-block w-[3px] h-[0.85em] bg-neon-green ml-1 align-middle animate-pulse" />
        </motion.span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="relative z-10 text-lg md:text-xl text-gray-400 max-w-2xl mb-12 font-medium leading-relaxed"
        {...fadeUp(0.4)}
      >
        Ask in plain{' '}
        <span className="text-white font-semibold">English</span>.
        Get quant-grade analysis on{' '}
        <span className="text-white font-semibold">Crypto—instantly</span>.
        No code/complex filters. Just the{' '}
        <span className="text-white font-semibold underline decoration-neon-green/40 underline-offset-4">
          market edge
        </span>{' '}
        you've been missing.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="relative z-10 flex flex-col sm:flex-row items-center gap-4 mb-16"
        {...fadeUp(0.55)}
      >
        <motion.button
          className="hero-cta-primary group"
          id="hero-cta-apply"
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(14, 203, 129, 0.4)' }}
          whileTap={{ scale: 0.97 }}
        >
          Apply for early access
          <span className="material-symbols-outlined ml-2 text-[20px] transition-transform group-hover:translate-x-0.5">
            arrow_forward
          </span>
        </motion.button>
        <motion.button
          className="hero-cta-outline group"
          id="hero-cta-demo"
          whileHover={{ scale: 1.05, borderColor: '#0ecb81' }}
          whileTap={{ scale: 0.97 }}
        >
          Watch Demo
          <span className="material-symbols-outlined ml-2 text-[20px]">
            play_arrow
          </span>
        </motion.button>
      </motion.div>

      {/* Command bar / Search — entrance + breathing glow + parallax */}
      <motion.div
        className="relative z-10 w-full max-w-3xl lg:max-w-4xl hero-command-bar mb-16"
        style={{ y: commandBarY }}
        initial={{ opacity: 0, y: 30 }}
        animate={{
          opacity: 1,
          y: 0,
          boxShadow: [
            '0 0 20px rgba(14, 203, 129, 0.05)',
            '0 0 40px rgba(14, 203, 129, 0.12)',
            '0 0 20px rgba(14, 203, 129, 0.05)',
          ],
        }}
        transition={{
          opacity: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number], delay: 0.7 },
          y: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number], delay: 0.7 },
          boxShadow: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.4 },
        }}
      >
        <div className="flex items-center px-4 py-3">
          <div className="bg-neon-green p-2 rounded mr-4 shrink-0">
            <span className="material-symbols-outlined text-cyber-black text-[22px] font-bold">
              search
            </span>
          </div>
          <div className="flex-1 text-left text-lg font-medium text-gray-400 truncate select-none">
            {displayText}
            <span className="inline-block w-[2px] h-5 bg-neon-green ml-0.5 align-middle animate-pulse" />
          </div>
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-1 rounded ml-4 font-mono text-sm text-gray-400 shrink-0">
            <span className="material-symbols-outlined text-[14px]">
              keyboard_command_key
            </span>
            <span>K</span>
          </div>
        </div>
      </motion.div>

      {/* Feature Tab Pills — staggered entrance + animated active indicator */}
      <motion.div
        className="relative z-10 w-full flex flex-wrap justify-center gap-2 md:gap-4 pb-4"
        {...fadeUp(0.85)}
      >
        {FEATURE_TABS.map((tab, idx) => (
          <motion.button
            key={tab.label}
            onClick={() => setActiveTab(idx)}
            className={`hero-feature-tab group relative ${
              idx === activeTab ? 'hero-feature-tab-active' : 'opacity-70 hover:opacity-100'
            }`}
            id={`hero-tab-${tab.label.toLowerCase().replace(/\s+/g, '-')}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span
              className={`material-symbols-outlined mr-3 text-[22px] transition-colors ${
                idx === activeTab ? 'text-neon-green' : 'text-gray-400 group-hover:text-neon-green'
              }`}
            >
              {tab.icon}
            </span>
            <span className="text-sm font-semibold tracking-wide whitespace-nowrap">
              {tab.label}
            </span>
            {idx === activeTab && (
              <motion.div
                className="ml-3 w-1.5 h-1.5 rounded-full bg-neon-green"
                layoutId="hero-tab-dot"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* System status ticker */}
      <motion.div
        className="relative z-10 mt-10 text-[10px] font-mono tracking-widest text-neon-green/20 uppercase pointer-events-none select-none"
        {...fadeUp(1.0)}
      >
        System Status: Operational // Latency: 4ms // Nodes: Active
      </motion.div>
    </section>
  );
};

export default HeroSection;
