import React from 'react';
import { comparisonData } from '../data/mockData';
import { useTerminalReveal } from '../hooks/useTerminalReveal';

interface ComparisonSectionProps {
  readonly className?: string;
}

interface RevealLineProps {
  readonly visible: boolean;
  readonly children: React.ReactNode;
  readonly className?: string;
}

const RevealLine: React.FC<RevealLineProps> = ({ visible, children, className = '' }) => (
  <div
    className={`transition-all duration-500 ease-out ${
      visible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-2'
    } ${className}`}
  >
    {children}
  </div>
);

const GenericTerminal: React.FC = () => {
  const { generic } = comparisonData;
  // 2 command lines + 2 body paragraphs + 3 tags = 7 items
  const totalLines = generic.lines.length + generic.body.length + generic.tags.length;
  const { ref, visibleCount } = useTerminalReveal(totalLines, 500, 400);

  let idx = 0;

  return (
    <div ref={ref} className="glass-card terminal-red p-1 rounded-2xl flex flex-col h-[500px]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-neon-red/20">
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
      <div className="flex-grow p-6 font-mono text-sm overflow-hidden inner-glow-red">
        <div className="space-y-3 opacity-40">
          {generic.lines.map((line, i) => {
            const lineIdx = idx++;
            return (
              <RevealLine key={i} visible={visibleCount > lineIdx}>
                <p className="text-gray-400 flex items-center gap-2">
                  <span className="text-xs">&gt;</span> {line.replace('> ', '')}
                </p>
              </RevealLine>
            );
          })}
          {generic.body.map((paragraph, i) => {
            const lineIdx = idx++;
            return (
              <RevealLine key={`body-${i}`} visible={visibleCount > lineIdx}>
                <p className={`text-gray-500 leading-relaxed ${i === 0 ? 'mt-6' : ''}`}>
                  {paragraph}
                </p>
              </RevealLine>
            );
          })}
        </div>
      </div>

      {/* Footer tags */}
      <div className="p-5 border-t border-neon-red/10 flex flex-wrap gap-2">
        {generic.tags.map((tag) => {
          const lineIdx = idx++;
          return (
            <RevealLine key={tag} visible={visibleCount > lineIdx} className="inline-block">
              <span className="px-3 py-1 bg-neon-red/10 text-neon-red text-[10px] font-mono rounded-full border border-neon-red/20">
                {tag}
              </span>
            </RevealLine>
          );
        })}
      </div>
    </div>
  );
};

const PrismTerminal: React.FC = () => {
  const { prism } = comparisonData;
  // 2 command lines + 1 code block + 1 result line + 3 tags = 7 items
  const totalLines = prism.lines.length + 1 + 1 + prism.tags.length;
  const { ref, visibleCount } = useTerminalReveal(totalLines, 500, 600);

  let idx = 0;

  return (
    <div ref={ref} className="glass-card terminal-green p-1 rounded-2xl flex flex-col h-[500px]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-neon-green/20">
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
      <div className="flex-grow p-6 font-mono text-sm overflow-hidden inner-glow-green">
        <div className="space-y-4">
          <div className="space-y-1">
            {prism.lines.map((line, i) => {
              const lineIdx = idx++;
              return (
                <RevealLine key={i} visible={visibleCount > lineIdx}>
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
              <RevealLine visible={visibleCount > lineIdx}>
                <div className="mt-6 p-4 rounded-lg bg-black/40 border border-neon-green/10">
                  <pre className="text-neon-green whitespace-pre-wrap text-xs leading-relaxed">
                    <code>{prism.code}</code>
                  </pre>
                </div>
              </RevealLine>
            );
          })()}

          {(() => {
            const lineIdx = idx++;
            return (
              <RevealLine visible={visibleCount > lineIdx}>
                <p className="text-neon-green flex items-center gap-2 mt-4 typewriter-cursor">
                  <span className="text-xs">&gt;</span> {prism.result.replace('> ', '')}
                </p>
              </RevealLine>
            );
          })()}
        </div>
      </div>

      {/* Footer tags */}
      <div className="p-5 border-t border-neon-green/10 flex flex-wrap gap-2">
        {prism.tags.map((tag) => {
          const lineIdx = idx++;
          return (
            <RevealLine key={tag} visible={visibleCount > lineIdx} className="inline-block">
              <span className="px-3 py-1 bg-neon-green/10 text-neon-green text-[10px] font-mono rounded-full border border-neon-green/20">
                {tag}
              </span>
            </RevealLine>
          );
        })}
      </div>
    </div>
  );
};

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ className = '' }) => {
  const { headline, subtitle } = comparisonData;

  return (
    <section className={`relative py-20 star-dust ${className}`}>
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-neon-green/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      {/* Heading */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight mb-4">
          <span className="text-white">{headline.line1}</span>
          <br />
          <span className="neon-text-green">{headline.line2}</span>
        </h2>
        <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          {subtitle.split('PRISM')[0]}
          <span className="text-neon-green font-semibold">PRISM</span>
          {subtitle.split('PRISM')[1]}
        </p>
      </div>

      {/* Terminal comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
        <GenericTerminal />
        <PrismTerminal />
      </div>
    </section>
  );
};

export default ComparisonSection;
