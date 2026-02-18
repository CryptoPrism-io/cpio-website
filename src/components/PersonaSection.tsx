import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { personas, personaData } from '../data/mockData';

interface PersonaSectionProps {
  readonly className?: string;
}

const AUTOPLAY_MS = 5000;

/* ── Single persona card ─────────────────────────────────────────── */
const PersonaCard: React.FC<{
  readonly persona: (typeof personas)[number];
  readonly isActive: boolean;
  readonly onClick: () => void;
  readonly index: number;
}> = ({ persona, isActive, onClick, index }) => (
  <motion.div
    className={`relative flex-1 w-[200px] md:w-auto min-w-[200px] md:min-w-0 rounded-xl md:rounded-3xl p-3 md:p-8 cursor-pointer transition-all duration-500 overflow-hidden border ${
      isActive
        ? 'glass-card-active persona-inner-glow persona-active-glow border-white/15 shadow-2xl'
        : 'glass-card persona-inner-glow border-white/[0.06] opacity-60 hover:opacity-80'
    }`}
    onClick={onClick}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: isActive ? 1 : 0.6, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{
      delay: index * 0.12,
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    }}
    whileHover={{ y: -6, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    {/* Background icon watermark */}
    <div className="absolute -right-4 -top-4 opacity-[0.04] pointer-events-none">
      <span
        className="material-symbols-outlined"
        style={{ fontSize: 140, color: persona.iconColor }}
      >
        {persona.icon}
      </span>
    </div>

    {/* Active indicator bar */}
    {isActive && (
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl"
        style={{
          backgroundColor: persona.iconColor,
          boxShadow: `0 0 12px ${persona.iconColor}60`,
        }}
        layoutId="persona-active-bar"
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
    )}

    {/* Icon + name header */}
    <div className="relative z-10 flex items-center gap-3 md:gap-4 mb-3 md:mb-6">
      <div
        className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500"
        style={{
          backgroundColor: isActive ? `${persona.iconColor}18` : 'rgba(255,255,255,0.04)',
          border: `1px solid ${isActive ? `${persona.iconColor}35` : 'rgba(255,255,255,0.08)'}`,
        }}
      >
        <span
          className="material-symbols-outlined text-2xl md:text-3xl transition-colors duration-500"
          style={{ color: isActive ? persona.iconColor : '#6B7280' }}
        >
          {persona.icon}
        </span>
      </div>
      <div>
        <h3 className="text-base md:text-2xl font-bold text-white">{persona.name}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{persona.subtitle}</p>
      </div>
    </div>

    {/* Feature bullet list — hidden on mobile */}
    <div className="relative z-10 hidden md:block space-y-2.5 mb-7">
      {persona.features.map((feat, i) => (
        <motion.div
          key={feat.label}
          className={`flex items-center gap-2 md:gap-3 py-1.5 px-2 md:py-2 md:px-3 rounded-lg transition-colors duration-300 ${
            isActive
              ? 'bg-white/[0.03] border border-white/[0.06]'
              : 'border border-transparent'
          }`}
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.3 + index * 0.12 + i * 0.05,
            duration: 0.3,
            ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
          }}
        >
          <span
            className="material-symbols-outlined text-base shrink-0 transition-colors duration-500"
            style={{ color: isActive ? persona.iconColor : '#4B5563' }}
          >
            {feat.icon}
          </span>
          <span
            className={`text-sm font-medium transition-colors duration-500 ${
              isActive ? 'text-gray-300' : 'text-gray-500'
            }`}
          >
            {feat.label}
          </span>
        </motion.div>
      ))}
    </div>

    {/* Tools row — hidden on mobile */}
    <div className="relative z-10 hidden md:block border-t border-white/5 pt-5">
      <p className="text-[9px] text-gray-600 uppercase tracking-widest font-bold mb-3">
        Prism Tools
      </p>
      <div className="grid grid-cols-4 gap-1.5">
        {persona.tools.map((tool) => (
          <div
            key={tool.label}
            className={`flex flex-col items-center gap-1 py-2 rounded-lg text-[10px] font-medium transition-colors duration-500 ${
              isActive ? 'bg-white/[0.04]' : ''
            }`}
          >
            <span
              className="material-symbols-outlined text-base transition-colors duration-500"
              style={{ color: isActive ? persona.iconColor : '#4B5563' }}
            >
              {tool.icon}
            </span>
            <span className={isActive ? 'text-gray-400' : 'text-gray-600'}>
              {tool.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

/* ── Main section ────────────────────────────────────────────────── */
export const PersonaSection: React.FC<PersonaSectionProps> = ({ className = '' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
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
      setActiveIndex((prev) => (prev + 1) % personas.length);
      setProgress(0);
    }, AUTOPLAY_MS);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(index);
      resetTimer();
    },
    [resetTimer],
  );

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [resetTimer]);

  return (
    <section className={`relative lg:h-[100dvh] flex flex-col justify-center py-10 lg:py-12 px-4 sm:px-6 lg:px-0 ${className}`} id="personas">
      {/* ── Heading ─────────────────────────────────────────────── */}
      <div className="text-center mb-8 md:mb-16 max-w-3xl mx-auto px-4 md:px-6">
        <motion.h2
          className="text-2xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 md:mb-5"
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
          className="hidden md:block text-lg text-gray-400 font-light leading-relaxed"
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

      {/* ── Horizontal 3-card row ──────────────────────────────── */}
      <div className="w-full overflow-x-auto md:overflow-visible">
        <div className="flex flex-row gap-3 md:gap-5 items-stretch md:items-stretch min-w-max md:min-w-0">
          {personas.map((persona, i) => (
            <PersonaCard
              key={persona.name}
              persona={persona}
              isActive={i === activeIndex}
              onClick={() => goTo(i)}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* ── Progress dots ──────────────────────────────────────── */}
      <div className="mt-6 md:mt-10 flex items-center justify-center gap-2">
        {personas.map((persona, i) => (
          <button
            key={persona.name}
            onClick={() => goTo(i)}
            className="relative rounded-full overflow-hidden transition-all duration-500"
            style={{
              width: i === activeIndex ? 32 : 6,
              height: 6,
              backgroundColor: i === activeIndex ? 'transparent' : 'rgb(31, 41, 55)',
            }}
          >
            {i === activeIndex ? (
              <>
                <div
                  className="absolute inset-0 rounded-full opacity-30"
                  style={{ backgroundColor: persona.iconColor }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full origin-left"
                  style={{
                    backgroundColor: persona.iconColor,
                    scaleX: progress / 100,
                    transformOrigin: 'left',
                    boxShadow: `0 0 8px ${persona.iconColor}60`,
                  }}
                />
              </>
            ) : (
              <div className="w-full h-full rounded-full hover:bg-gray-700 transition-colors" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
};

export default PersonaSection;
