import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

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

/* ── Star particles ─────────────────────────────────────────────── */
const STARS = [
  { top: '15%', left: '10%', size: 4, delay: 0 },
  { top: '25%', right: '20%', size: 2, delay: 0.5 },
  { top: '45%', left: '25%', size: 4, delay: 1.2 },
  { bottom: '30%', left: '15%', size: 2, delay: 0.8 },
  { bottom: '20%', right: '30%', size: 4, delay: 0.3 },
  { top: '10%', right: '40%', size: 2, delay: 1.5 },
] as const;

/* ── Star particle component (hooks must be at component top level) */
const StarParticle: React.FC<{
  readonly star: (typeof STARS)[number];
  readonly index: number;
  readonly scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}> = ({ star, index, scrollYProgress }) => {
  const parallaxY = useTransform(scrollYProgress, [0, 1], [20 * (index % 3 - 1), -20 * (index % 3 - 1)]);
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        top: 'top' in star ? star.top : undefined,
        bottom: 'bottom' in star ? star.bottom : undefined,
        left: 'left' in star ? star.left : undefined,
        right: 'right' in star ? star.right : undefined,
        width: star.size,
        height: star.size,
        backgroundColor: index % 3 === 0 ? '#0ECB81' : '#ffffff',
        y: parallaxY,
      }}
      animate={{
        opacity: [0.3, 1, 0.3],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 3 + index * 0.5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: star.delay,
      }}
    />
  );
};

/* ── Component ───────────────────────────────────────────────────── */
interface CtaFooterProps {
  readonly className?: string;
}

export const CtaFooter: React.FC<CtaFooterProps> = ({ className = '' }) => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-[70vh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden py-10 md:py-24 px-4 md:px-6 ${className}`}
      id="cta-footer"
    >
      {/* ── Background layers ──────────────────────────────────── */}
      <div className="absolute inset-0 cta-particle-field opacity-20 pointer-events-none" />
      <div className="absolute inset-0 cta-radial-glow pointer-events-none" />

      {/* Floating star particles — hidden on mobile */}
      <div className="absolute inset-0 pointer-events-none opacity-40 hidden md:block">
        {STARS.map((star, i) => (
          <StarParticle key={i} star={star} index={i} scrollYProgress={scrollYProgress} />
        ))}
      </div>

      {/* ── Main content ───────────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl w-full text-center">
        {/* Headline */}
        <motion.h2
          className="text-2xl md:text-6xl font-bold tracking-tight mb-3 md:mb-6 leading-tight text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
        >
          Unleash the power of{' '}
          <span className="text-neon-green cta-neon-glow-text">AI × Trading</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="hidden md:block text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Stop trading on gut feel. Start trading with an AI copilot that combines logic, signals,
          and automation at institutional speed.
        </motion.p>

        {/* Icon + tagline */}
        <motion.div
          className="hidden md:flex flex-col items-center gap-4 mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
        >
          <motion.div
            className="w-10 h-10 rounded-full cta-glass-morphism flex items-center justify-center"
            animate={{
              boxShadow: [
                '0 0 10px rgba(14, 203, 129, 0.1)',
                '0 0 20px rgba(14, 203, 129, 0.3)',
                '0 0 10px rgba(14, 203, 129, 0.1)',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="material-symbols-outlined text-neon-green text-xl">
              temp_preferences_custom
            </span>
          </motion.div>
          <p className="text-neon-green font-medium cta-neon-glow-text tracking-wide">
            Still Free, For Now :)
          </p>
        </motion.div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-10 md:mb-20">
          <motion.button
            className="cta-primary-button w-full sm:w-auto"
            id="cta-early-access"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply for Early Access
          </motion.button>
          <motion.button
            className="cta-outline-button w-full sm:w-auto"
            id="cta-watch-demo"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="material-symbols-outlined fill-1">play_arrow</span>
            Watch Demo
          </motion.button>
        </div>

        {/* Platform selector */}
        <div className="hidden md:flex flex-col items-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6 font-semibold">
            Try Crypto Prism on
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {PLATFORMS.map((platform, i) => (
              <motion.button
                key={platform.label}
                className={`cta-glass-morphism px-6 py-3 rounded-xl flex items-center gap-3 ${platform.soon
                  ? 'cta-platform-inactive'
                  : 'cta-platform-active'
                  }`}
                disabled={platform.soon}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: platform.soon ? 0.5 : 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.1, type: 'spring', stiffness: 300, damping: 20 }}
                whileHover={!platform.soon ? { scale: 1.05 } : undefined}
                whileTap={!platform.soon ? { scale: 0.95 } : undefined}
              >
                <span
                  className={`material-symbols-outlined ${platform.soon ? 'text-gray-400' : 'text-neon-green'
                    }`}
                >
                  {platform.icon}
                </span>
                <span
                  className={`text-sm font-semibold ${platform.soon ? 'text-gray-300' : 'text-neon-green'
                    }`}
                >
                  {platform.label}
                  {platform.soon && (
                    <span className="text-[10px] text-gray-500 ml-1">(Soon)</span>
                  )}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer bar ─────────────────────────────────────────── */}
      <div className="absolute bottom-8 left-0 right-0 px-8 hidden md:flex justify-between items-center text-[10px] tracking-widest text-gray-600 uppercase font-medium">
        <div className="flex gap-6">
          <a className="hover:text-neon-green transition-colors" href="#">
            Privacy
          </a>
          <a className="hover:text-neon-green transition-colors" href="#">
            Terms
          </a>
        </div>
        <div>© 2026 CRYPTO PRISM LABS</div>
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
