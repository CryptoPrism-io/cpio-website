import React from 'react';
import { BasicViz } from './BasicViz';
import { MediumViz } from './MediumViz';
import { AdvancedViz } from './AdvancedViz';

interface ResultsPanelProps {
  readonly activeLevel: number;
  readonly className?: string;
}

const levelLabels = [
  { tag: "Scan Mode", label: "Quick Scan", count: "4 Assets" },
  { tag: "Analysis Mode", label: "Deep Analysis", count: "6 Protocols" },
  { tag: "Intelligence Mode", label: "Full Spectrum", count: "4 Assets" },
] as const;

export const ResultsPanel: React.FC<ResultsPanelProps> = ({
  activeLevel,
  className = '',
}) => {
  const current = levelLabels[activeLevel];

  return (
    <div className={`flex-1 p-8 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
            Registry / Results
          </span>
          <span className="text-sm font-bold text-white bg-white/5 px-3 py-1 rounded">
            {current.count} identified
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse-slow shadow-[0_0_10px_#0ECB81]" />
          <span className="text-[10px] font-mono font-bold text-neon-green uppercase tracking-[0.25em]">
            Live Data Stream
          </span>
        </div>
      </div>

      {/* Mode indicator */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[9px] font-mono font-bold text-neon-green border border-neon-green/20 bg-neon-green/5 px-2 py-0.5 rounded uppercase tracking-widest">
          {current.tag}
        </span>
        <span className="text-xs text-gray-500 font-mono">{current.label}</span>
        <div className="flex-1" />
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === activeLevel
                  ? 'bg-neon-green shadow-[0_0_6px_#0ECB81]'
                  : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Visualization */}
      <div className="transition-opacity duration-300">
        {activeLevel === 0 && <BasicViz />}
        {activeLevel === 1 && <MediumViz />}
        {activeLevel === 2 && <AdvancedViz />}
      </div>
    </div>
  );
};

export default ResultsPanel;
