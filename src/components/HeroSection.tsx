import React, { useState, useEffect, useRef } from 'react';

const FEATURE_TABS = [
  { icon: 'bar_chart', label: 'Live Crypto Data', active: true },
  { icon: 'trending_up', label: 'Live Analytics', active: false },
  { icon: 'grid_view', label: 'Quant Models', active: false },
  { icon: 'bolt', label: 'Real-time Compute', active: false },
] as const;

const PLACEHOLDER_QUERIES = [
  'Backtest momentum strategy: 52-week high breakout',
  'Find coins near 52W High with RSI divergence',
  'Show whale accumulation vs exchange reserve drops',
  'Scan DeFi protocols with TVL growth > 25% MoM',
];

interface HeroSectionProps {
  readonly className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Typewriter effect for the search placeholder
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

  return (
    <section className={`relative flex flex-col items-center text-center pt-12 md:pt-20 pb-8 ${className}`}>
      {/* Decorative data lines */}
      <div className="hero-data-line hero-line-1" />
      <div className="hero-data-line hero-line-2" />
      <div className="hero-data-line hero-line-3" />

      {/* Glow overlay behind hero */}
      <div className="absolute inset-0 hero-glow-overlay pointer-events-none" />

      {/* Main headline */}
      <h1 className="relative z-10 text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
        <span className="block mb-2 text-white">Think Like You.</span>
        <span className="text-neon-green hero-neon-glow">Trade Like a Quant.</span>
      </h1>

      {/* Subtitle */}
      <p className="relative z-10 text-lg md:text-xl text-gray-400 max-w-2xl mb-12 font-medium leading-relaxed">
        Ask in plain{' '}
        <span className="text-white font-semibold">English</span>.
        Get quant-grade analysis on{' '}
        <span className="text-white font-semibold">Crypto—instantly</span>.
        No code/complex filters. Just the{' '}
        <span className="text-white font-semibold underline decoration-neon-green/40 underline-offset-4">
          market edge
        </span>{' '}
        you've been missing.
      </p>

      {/* CTA Buttons */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 mb-16">
        <button className="hero-cta-primary group" id="hero-cta-apply">
          Apply for early access
          <span className="material-symbols-outlined ml-2 text-[20px] transition-transform group-hover:translate-x-0.5">
            arrow_forward
          </span>
        </button>
        <button className="hero-cta-outline group" id="hero-cta-demo">
          Watch Demo
          <span className="material-symbols-outlined ml-2 text-[20px]">
            play_arrow
          </span>
        </button>
      </div>

      {/* Command bar / Search */}
      <div className="relative z-10 w-full max-w-3xl hero-command-bar mb-16">
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
      </div>

      {/* Feature Tab Pills */}
      <div className="relative z-10 w-full flex flex-wrap justify-center gap-2 md:gap-4 pb-4">
        {FEATURE_TABS.map((tab, idx) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(idx)}
            className={`hero-feature-tab group ${
              idx === activeTab ? 'hero-feature-tab-active' : 'opacity-70 hover:opacity-100'
            }`}
            id={`hero-tab-${tab.label.toLowerCase().replace(/\s+/g, '-')}`}
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
              <div className="ml-3 w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* System status ticker */}
      <div className="relative z-10 mt-10 text-[10px] font-mono tracking-widest text-neon-green/20 uppercase pointer-events-none select-none">
        System Status: Operational // Latency: 4ms // Nodes: Active
      </div>
    </section>
  );
};

export default HeroSection;
