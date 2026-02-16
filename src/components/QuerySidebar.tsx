import React from 'react';
import { queryPrompts } from '../data/mockData';

interface QuerySidebarProps {
  readonly activeLevel: number;
  readonly onLevelClick: (index: number) => void;
  readonly className?: string;
}

interface QueryCardProps {
  readonly level: string;
  readonly levelLabel: string;
  readonly text: string;
  readonly isActive: boolean;
  readonly onClick: () => void;
}

const QueryCard: React.FC<QueryCardProps> = ({ level, levelLabel, text, isActive, onClick }) => {
  if (isActive) {
    return (
      <div onClick={onClick} className="cursor-pointer">
        <span className="inline-block text-[9px] font-bold text-neon-green border border-neon-green/20 px-2 py-0.5 rounded mb-3 uppercase tracking-widest font-mono">
          Lvl {level}: {levelLabel}
        </span>
        <div className="p-5 bg-neon-green/5 border border-neon-green/20 rounded advanced-card-glow group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-sm text-white font-medium relative z-10 leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div onClick={onClick} className="cursor-pointer">
      <span className="inline-block text-[9px] font-bold text-gray-500 border border-white/10 px-2 py-0.5 rounded mb-3 uppercase tracking-widest font-mono">
        Lvl {level}: {levelLabel}
      </span>
      <div className="p-4 bg-white/[0.02] border border-white/5 rounded hover:border-neon-green/30 transition-all group">
        <p className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
};

export const QuerySidebar: React.FC<QuerySidebarProps> = ({
  activeLevel,
  onLevelClick,
  className = '',
}) => {
  return (
    <aside className={`w-full lg:w-80 border-r border-white/5 bg-black/30 p-8 ${className}`}>
      <div className="flex items-center gap-2 mb-10">
        <span className="material-symbols-outlined text-neon-green text-sm">terminal</span>
        <span className="text-xs font-mono font-bold text-neon-green uppercase tracking-widest">
          Ask Prism
        </span>
      </div>
      <div className="space-y-8">
        {queryPrompts.map((prompt, i) => (
          <QueryCard
            key={prompt.level}
            level={prompt.level}
            levelLabel={prompt.levelLabel}
            text={prompt.text}
            isActive={i === activeLevel}
            onClick={() => onLevelClick(i)}
          />
        ))}
      </div>
    </aside>
  );
};

export default QuerySidebar;
