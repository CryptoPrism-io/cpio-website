import React from 'react';
import { QuerySidebar } from './QuerySidebar';
import { ResultsPanel } from './ResultsPanel';
import { useQueryCycle } from '../hooks/useQueryCycle';

interface TerminalPanelProps {
  readonly className?: string;
}

export const TerminalPanel: React.FC<TerminalPanelProps> = ({ className = '' }) => {
  const { activeLevel, handleClick } = useQueryCycle();

  return (
    <div className={`glass-panel rounded-xl shadow-2xl overflow-hidden mx-auto max-w-6xl ${className}`}>
      <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-neon-red/40 border border-neon-red/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40 border border-yellow-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-neon-green/40 border border-neon-green/20" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-neon-green/5 border border-neon-green/10 rounded">
            <div className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse shadow-[0_0_8px_#0ECB81]" />
            <span className="text-[10px] font-mono font-bold text-neon-green tracking-[0.2em] uppercase">
              System: Online
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row min-h-[650px]">
        <QuerySidebar activeLevel={activeLevel} onLevelClick={handleClick} />
        <ResultsPanel activeLevel={activeLevel} />
      </div>
    </div>
  );
};

export default TerminalPanel;
