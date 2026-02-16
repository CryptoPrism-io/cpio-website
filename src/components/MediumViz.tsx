import React from 'react';
import { mediumVizData } from '../data/mockData';

interface MediumVizProps {
  readonly className?: string;
}

export const MediumViz: React.FC<MediumVizProps> = ({ className = '' }) => {
  const data = mediumVizData[0];

  return (
    <div className={className}>
      <div className="mb-6 pb-4 border-b border-white/5">
        <div className="text-sm font-bold text-white mb-1">{data.title}</div>
        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
          {data.subtitle}
        </div>
      </div>

      <div className="space-y-5">
        {data.bars.map((bar) => {
          const widthPct = (bar.value / bar.maxValue) * 100;

          return (
            <div key={bar.label} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-white w-24">{bar.label}</span>
                  {bar.subLabel && (
                    <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">
                      {bar.subLabel}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {bar.flagged && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-400/10 text-cyan-400 font-mono font-bold uppercase tracking-wider">
                      Flagged
                    </span>
                  )}
                  <span className="text-xs font-mono font-bold text-neon-green">
                    {bar.value}{bar.suffix}
                  </span>
                </div>
              </div>
              <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${Math.min(widthPct, 100)}%`,
                    backgroundColor: bar.color,
                    boxShadow: `0 0 10px ${bar.color}66`,
                  }}
                />
                <div
                  className="absolute top-0 h-full w-px opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    left: `${Math.min(widthPct, 100)}%`,
                    backgroundColor: bar.color,
                    boxShadow: `0 0 6px ${bar.color}`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
        <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
          {data.bars.length} protocols analyzed
        </span>
        {data.bars.some((b) => b.flagged) && (
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00F2FE]" />
            {data.bars.filter((b) => b.flagged).length} flagged
          </span>
        )}
      </div>
    </div>
  );
};

export default MediumViz;
