import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { personas, personaData } from '../data/mockData';

interface PersonaSectionProps {
  readonly className?: string;
}

const AUTOPLAY_MS = 5000;

/* ── Single persona card ─────────────────────────────────────────── */
const PersonaCard: React.FC<{
  readonly persona: (typeof personas)[number];
  readonly direction: number;
}> = ({ persona, direction }) => (
  <motion.div
    key={persona.name}
    className="w-full max-w-lg mx-auto glass-card-active persona-inner-glow persona-active-glow rounded-3xl p-8 md:p-10 relative overflow-hidden"
    initial={{ opacity: 0, x: direction > 0 ? 120 : -120, scale: 0.92 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    exit={{ opacity: 0, x: direction > 0 ? -120 : 120, scale: 0.92 }}
    transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
  >
    {/* Background icon watermark */}
    <div className="absolute -right-6 -top-6 opacity-[0.04] pointer-events-none">
      <span
        className="material-symbols-outlined"
        style={{ fontSize: 180, color: persona.iconColor }}
      >
        {persona.icon}
      </span>
    </div>

    {/* Header: icon + name */}
    <div className="relative z-10 flex items-center gap-5 mb-8">
      <motion.div
        className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
        style={{
          backgroundColor: `${persona.iconColor}15`,
          border: `1px solid ${persona.iconColor}30`,
        }}
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 400, damping: 18 }}
      >
        <span
          className="material-symbols-outlined text-4xl"
          style={{ color: persona.iconColor }}
        >
          {persona.icon}
        </span>
      </motion.div>
      <div>
        <motion.h3
          className="text-2xl md:text-3xl font-bold text-white"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
        >
          {persona.name}
        </motion.h3>
        <motion.p
          className="text-sm text-gray-400 mt-1"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.35 }}
        >
          {persona.subtitle}
        </motion.p>
      </div>
    </div>

    {/* Feature bullet list */}
    <div className="relative z-10 space-y-3 mb-8">
      {persona.features.map((feat, i) => (
        <motion.div
          key={feat.label}
          className="flex items-center gap-3 py-2.5 px-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.3 + i * 0.07,
            duration: 0.35,
            ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
          }}
        >
          <span
            className="material-symbols-outlined text-lg shrink-0"
            style={{ color: persona.iconColor }}
          >
            {feat.icon}
          </span>
          <span className="text-sm text-gray-300 font-medium">{feat.label}</span>
        </motion.div>
      ))}
    </div>

    {/* Tools grid */}
    <div className="relative z-10">
      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-3 border-t border-white/5 pt-5">
        Prism Tools
      </p>
      <div className="grid grid-cols-4 gap-2">
        {persona.tools.map((tool, i) => (
          <motion.div
            key={tool.label}
            className="bg-white/5 border border-white/10 p-2.5 rounded-xl flex flex-col items-center gap-1.5 text-[10px] font-medium hover:border-white/20 transition-colors cursor-pointer group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.55 + i * 0.06,
              type: 'spring',
              stiffness: 400,
              damping: 20,
            }}
          >
            <span
              className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform"
              style={{ color: persona.iconColor }}
            >
              {tool.icon}
            </span>
            <span className="text-gray-400">{tool.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

/* ── Thumbnail card (inactive) ───────────────────────────────────── */
const ThumbCard: React.FC<{
  readonly persona: (typeof personas)[number];
  readonly isActive: boolean;
  readonly onClick: () => void;
  readonly progress: number;
}> = ({ persona, isActive, onClick, progress }) => (
  <motion.button
    className={`relative flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-300 w-full text-left ${
      isActive
        ? 'bg-white/[0.06] border-white/15 shadow-lg'
        : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/10'
    }`}
    onClick={onClick}
    whileHover={!isActive ? { scale: 1.02 } : undefined}
    whileTap={!isActive ? { scale: 0.98 } : undefined}
  >
    {/* Progress bar underneath for active */}
    {isActive && (
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] rounded-full"
        style={{
          backgroundColor: persona.iconColor,
          width: `${progress}%`,
          boxShadow: `0 0 8px ${persona.iconColor}60`,
        }}
      />
    )}

    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
      style={{
        backgroundColor: isActive ? `${persona.iconColor}20` : 'rgba(255,255,255,0.05)',
        border: `1px solid ${isActive ? `${persona.iconColor}40` : 'rgba(255,255,255,0.08)'}`,
      }}
    >
      <span
        className="material-symbols-outlined text-xl"
        style={{ color: isActive ? persona.iconColor : '#6B7280' }}
      >
        {persona.icon}
      </span>
    </div>
    <div>
      <p className={`text-sm font-bold ${isActive ? 'text-white' : 'text-gray-400'}`}>
        {persona.name}
      </p>
      <p className="text-[11px] text-gray-500 leading-snug">{persona.subtitle}</p>
    </div>
  </motion.button>
);

/* ── Main section ────────────────────────────────────────────────── */
export const PersonaSection: React.FC<PersonaSectionProps> = ({ className = '' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const progressRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const { headline, subtitle } = personaData;

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(0);

    const startTime = Date.now();
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min((elapsed / AUTOPLAY_MS) * 100, 100));
    }, 50);

    timerRef.current = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % personas.length);
      setProgress(0);
    }, AUTOPLAY_MS);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
      resetTimer();
    },
    [activeIndex, resetTimer],
  );

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [resetTimer]);

  return (
    <section className={`relative py-20 lg:py-28 ${className}`} id="personas">
      {/* ── Heading ─────────────────────────────────────────────── */}
      <div className="text-center mb-16 max-w-3xl mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
          }}
        >
          {headline.prefix}
          <span className="text-neon-green drop-shadow-[0_0_15px_rgba(14,203,129,0.4)]">
            {headline.highlight}
          </span>
        </motion.h2>
        <motion.p
          className="text-lg text-gray-400 font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{
            duration: 0.6,
            delay: 0.15,
            ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
          }}
        >
          {subtitle.before}
          <span className="text-gray-100 font-medium">{subtitle.bold1}</span>
          {subtitle.mid}
          <span className="text-gray-100 font-medium">{subtitle.bold2}</span>
          {subtitle.after}
        </motion.p>
      </div>

      {/* ── Two-column layout: thumbs + active card ────────────── */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: thumbnail selector */}
        <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {personas.map((persona, i) => (
            <motion.div
              key={persona.name}
              className="min-w-[220px] lg:min-w-0"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                delay: i * 0.1,
                duration: 0.4,
                ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
              }}
            >
              <ThumbCard
                persona={persona}
                isActive={i === activeIndex}
                onClick={() => goTo(i)}
                progress={i === activeIndex ? progress : 0}
              />
            </motion.div>
          ))}
        </div>

        {/* Right: active persona card */}
        <div className="lg:col-span-8 relative min-h-[520px] flex items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <PersonaCard
              key={personas[activeIndex].name}
              persona={personas[activeIndex]}
              direction={direction}
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PersonaSection;
