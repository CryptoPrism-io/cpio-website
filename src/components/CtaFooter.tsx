import React from 'react';

/* ── Platform data ───────────────────────────────────────────────── */
interface Platform {
  readonly icon: string;
  readonly label: string;
  readonly soon: boolean;
}

const PLATFORMS: readonly Platform[] = [
  { icon: 'desktop_windows', label: 'Web', soon: false },
  { icon: 'smartphone', label: 'iOS', soon: true },
  { icon: 'phone_android', label: 'Android', soon: true },
] as const;

/* ── Component ───────────────────────────────────────────────────── */
interface CtaFooterProps {
  readonly className?: string;
}

export const CtaFooter: React.FC<CtaFooterProps> = ({ className = '' }) => {
  return (
    <section
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24 px-6 ${className}`}
      id="cta-footer"
    >
      {/* ── Background layers ──────────────────────────────────── */}
      <div className="absolute inset-0 cta-particle-field opacity-20 pointer-events-none" />
      <div className="absolute inset-0 cta-radial-glow pointer-events-none" />

      {/* Floating star particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute h-1 w-1 bg-white rounded-full top-[15%] left-[10%] animate-pulse" />
        <div className="absolute h-0.5 w-0.5 bg-white rounded-full top-[25%] right-[20%]" />
        <div className="absolute h-1 w-1 bg-neon-green rounded-full top-[45%] left-[25%] animate-ping opacity-20" />
        <div className="absolute h-0.5 w-0.5 bg-white rounded-full bottom-[30%] left-[15%]" />
        <div className="absolute h-1 w-1 bg-white rounded-full bottom-[20%] right-[30%] animate-pulse" />
        <div className="absolute h-0.5 w-0.5 bg-neon-green rounded-full top-[10%] right-[40%]" />
      </div>

      {/* ── Main content ───────────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl w-full text-center">
        {/* Headline */}
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight text-white">
          Unleash the power of{' '}
          <span className="text-neon-green cta-neon-glow-text">AI × Trading</span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Stop trading on gut feel. Start trading with an AI copilot that combines logic, signals,
          and automation at institutional speed.
        </p>

        {/* Icon + tagline */}
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="w-10 h-10 rounded-full cta-glass-morphism flex items-center justify-center">
            <span className="material-symbols-outlined text-neon-green text-xl">
              temp_preferences_custom
            </span>
          </div>
          <p className="text-neon-green font-medium cta-neon-glow-text tracking-wide">
            Still Free, For Now :)
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button
            className="cta-primary-button w-full sm:w-auto"
            id="cta-early-access"
          >
            Apply for Early Access
          </button>
          <button
            className="cta-outline-button w-full sm:w-auto"
            id="cta-watch-demo"
          >
            <span className="material-symbols-outlined fill-1">play_arrow</span>
            Watch Demo
          </button>
        </div>

        {/* Platform selector */}
        <div className="flex flex-col items-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6 font-semibold">
            Try Tradl on
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {PLATFORMS.map((platform) => (
              <button
                key={platform.label}
                className={`cta-glass-morphism px-6 py-3 rounded-xl flex items-center gap-3 ${
                  platform.soon
                    ? 'cta-platform-inactive'
                    : 'cta-platform-active hover:scale-105 transition-transform duration-300'
                }`}
                disabled={platform.soon}
              >
                <span
                  className={`material-symbols-outlined ${
                    platform.soon ? 'text-gray-400' : 'text-neon-green'
                  }`}
                >
                  {platform.icon}
                </span>
                <span
                  className={`text-sm font-semibold ${
                    platform.soon ? 'text-gray-300' : 'text-neon-green'
                  }`}
                >
                  {platform.label}
                  {platform.soon && (
                    <span className="text-[10px] text-gray-500 ml-1">(Soon)</span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer bar ─────────────────────────────────────────── */}
      <div className="absolute bottom-8 left-0 right-0 px-8 flex justify-between items-center text-[10px] tracking-widest text-gray-600 uppercase font-medium">
        <div className="flex gap-6">
          <a className="hover:text-neon-green transition-colors" href="#">
            Privacy
          </a>
          <a className="hover:text-neon-green transition-colors" href="#">
            Terms
          </a>
        </div>
        <div>© 2024 CRYPTO PRISM LABS</div>
        <div className="flex gap-4">
          <div className="w-1.5 h-1.5 rounded-full bg-neon-green/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-neon-green/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-neon-green/20" />
        </div>
      </div>
    </section>
  );
};

export default CtaFooter;
