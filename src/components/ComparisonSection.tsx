import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { comparisonData } from '../data/mockData';
import { useTerminalReveal } from '../hooks/useTerminalReveal';

interface ComparisonSectionProps {
  readonly className?: string;
}

interface RevealLineProps {
  readonly visible: boolean;
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly delay?: number;
}

const RevealLine: React.FC<RevealLineProps> = ({ visible, children, className = '', delay = 0 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 8 }}
    animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
    transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number], delay }}
  >
    {children}
  </motion.div>
);

const GenericTerminal: React.FC = () => {
  const { generic } = comparisonData;
  const totalLines = generic.lines.length + generic.body.length + generic.tags.length;
  const { ref, visibleCount } = useTerminalReveal(totalLines, 500, 400);

  let idx = 0;

  return (
    <motion.div
      ref={ref}
      className="glass-card terminal-red p-1 rounded-xl md:rounded-2xl flex flex-col h-auto min-h-[280px] lg:min-h-[380px]"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 md:px-5 md:py-3 border-b border-neon-red/20">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-neon-red text-sm">warning</span>
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-neon-red uppercase">
            {generic.label}
          </span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-700/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-gray-700/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-gray-700/50" />
        </div>
      </div>

      {/* Body */}
      <div className="flex-grow p-4 md:p-6 font-mono text-xs md:text-sm overflow-hidden inner-glow-red">
        <div className="space-y-3 opacity-40">
          {generic.lines.map((line, i) => {
            const lineIdx = idx++;
            return (
              <RevealLine key={i} visible={visibleCount > lineIdx} delay={lineIdx * 0.08}>
                <p className="text-gray-400 flex items-center gap-2">
                  <span className="text-xs">&gt;</span> {line.replace('> ', '')}
                </p>
              </RevealLine>
            );
          })}
          {generic.body.map((paragraph, i) => {
            const lineIdx = idx++;
            return (
              <RevealLine key={`body-${i}`} visible={visibleCount > lineIdx} delay={lineIdx * 0.08}>
                <p className={`text-gray-500 leading-relaxed ${i === 0 ? 'mt-6' : ''}`}>
                  {paragraph}
                </p>
              </RevealLine>
            );
          })}
        </div>
      </div>

      {/* Footer tags */}
      <div className="p-3 md:p-5 border-t border-neon-red/10 flex flex-wrap gap-1.5 md:gap-2">
        {generic.tags.map((tag) => {
          const lineIdx = idx++;
          return (
            <RevealLine key={tag} visible={visibleCount > lineIdx} className="inline-block">
              <motion.span
                className="px-3 py-1 bg-neon-red/10 text-neon-red text-[10px] font-mono rounded-full border border-neon-red/20 inline-block"
                initial={{ scale: 0 }}
                animate={visibleCount > lineIdx ? { scale: 1 } : { scale: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              >
                {tag}
              </motion.span>
            </RevealLine>
          );
        })}
      </div>
    </motion.div>
  );
};

const PrismTerminal: React.FC = () => {
  const { prism } = comparisonData;
  const totalLines = prism.lines.length + 1 + 1 + prism.tags.length;
  const { ref, visibleCount } = useTerminalReveal(totalLines, 500, 600);

  let idx = 0;

  return (
    <motion.div
      ref={ref}
      className="glass-card terminal-green p-1 rounded-xl md:rounded-2xl flex flex-col h-auto min-h-[280px] lg:min-h-[380px]"
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 md:px-5 md:py-3 border-b border-neon-green/20">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-neon-green text-sm">auto_awesome</span>
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-neon-green uppercase">
            {prism.label}
          </span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-neon-green/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-neon-green/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-neon-green/20" />
        </div>
      </div>

      {/* Body */}
      <div className="flex-grow p-4 md:p-6 font-mono text-xs md:text-sm overflow-hidden inner-glow-green">
        <div className="space-y-4">
          <div className="space-y-1">
            {prism.lines.map((line, i) => {
              const lineIdx = idx++;
              return (
                <RevealLine key={i} visible={visibleCount > lineIdx} delay={lineIdx * 0.08}>
                  <p className="text-neon-green/70 flex items-center gap-2">
                    <span className="text-xs">&gt;</span> {line.replace('> ', '')}
                  </p>
                </RevealLine>
              );
            })}
          </div>

          {(() => {
            const lineIdx = idx++;
            return (
              <RevealLine visible={visibleCount > lineIdx} delay={lineIdx * 0.08}>
                <motion.div
                  className="mt-6 p-4 rounded-lg bg-black/40 border border-neon-green/10"
                  animate={visibleCount > lineIdx ? {
                    boxShadow: [
                      '0 0 0px rgba(14, 203, 129, 0)',
                      '0 0 15px rgba(14, 203, 129, 0.15)',
                      '0 0 0px rgba(14, 203, 129, 0)',
                    ],
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <pre className="text-neon-green whitespace-pre-wrap text-xs leading-relaxed">
                    <code>{prism.code}</code>
                  </pre>
                </motion.div>
              </RevealLine>
            );
          })()}

          {(() => {
            const lineIdx = idx++;
            return (
              <RevealLine visible={visibleCount > lineIdx} delay={lineIdx * 0.08}>
                <p className="text-neon-green flex items-center gap-2 mt-4 typewriter-cursor">
                  <span className="text-xs">&gt;</span> {prism.result.replace('> ', '')}
                </p>
              </RevealLine>
            );
          })()}
        </div>
      </div>

      {/* Footer tags */}
      <div className="p-3 md:p-5 border-t border-neon-green/10 flex flex-wrap gap-1.5 md:gap-2">
        {prism.tags.map((tag) => {
          const lineIdx = idx++;
          return (
            <RevealLine key={tag} visible={visibleCount > lineIdx} className="inline-block">
              <motion.span
                className="px-3 py-1 bg-neon-green/10 text-neon-green text-[10px] font-mono rounded-full border border-neon-green/20 inline-block"
                initial={{ scale: 0 }}
                animate={visibleCount > lineIdx ? { scale: 1 } : { scale: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              >
                {tag}
              </motion.span>
            </RevealLine>
          );
        })}
      </div>
    </motion.div>
  );
};

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ className = '' }) => {
  const { headline, subtitle } = comparisonData;
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const orbY1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={sectionRef} id="comparison" className={`relative lg:h-[100dvh] flex flex-col justify-center py-10 lg:py-12 px-4 sm:px-6 lg:px-0 star-dust ${className}`}>
      {/* Ambient glow — parallax */}
      <motion.div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-neon-green/10 rounded-full blur-[120px] -z-10 pointer-events-none"
        style={{ y: orbY1 }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -z-10 pointer-events-none"
        style={{ y: orbY2 }}
      />

      {/* Heading */}
      <div className="text-center mb-8 md:mb-16 max-w-4xl mx-auto">
        <motion.h2
          className="text-2xl md:text-6xl font-display font-extrabold tracking-tight mb-2 md:mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
        >
          <span className="text-white">{headline.line1}</span>
          <br />
          <span className="neon-text-green">{headline.line2}</span>
        </motion.h2>
        <motion.p
          className="text-gray-400 hidden md:block text-xl leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
        >
          {subtitle.split('PRISM')[0]}
          <span className="text-neon-green font-semibold">PRISM</span>
          {subtitle.split('PRISM')[1]}
        </motion.p>
      </div>

      {/* Terminal comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 w-full">
        <GenericTerminal />
        <PrismTerminal />
      </div>
    </section>
  );
};

export default ComparisonSection;
