import { motion } from 'motion/react';
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
  return (
    <motion.div
      onClick={onClick}
      className="cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <span
        className={`inline-block text-[9px] font-bold border px-2 py-0.5 rounded mb-3 uppercase tracking-widest font-mono transition-colors duration-300 ${isActive
            ? 'text-neon-green border-neon-green/20'
            : 'text-gray-500 border-white/10'
          }`}
      >
        Lvl {level}: {levelLabel}
      </span>
      <div className="relative">
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded bg-neon-green/5 border border-neon-green/20 advanced-card-glow"
            layoutId="query-card-highlight"
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          />
        )}
        <div
          className={`relative p-3 md:p-5 rounded overflow-hidden transition-colors duration-300 ${isActive
              ? 'group'
              : 'bg-white/[0.02] border border-white/5 hover:border-neon-green/30'
            }`}
        >
          {isActive && (
            <div className="absolute inset-0 bg-gradient-to-br from-neon-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
          <p
            className={`text-sm relative z-10 leading-relaxed transition-colors duration-300 ${isActive ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-200'
              }`}
          >
            {text}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const QuerySidebar: React.FC<QuerySidebarProps> = ({
  activeLevel,
  onLevelClick,
  className = '',
}) => {
  return (
    <aside className={`w-full lg:w-80 border-r border-white/5 bg-black/30 p-4 md:p-8 ${className}`}>
      <div className="flex items-center gap-2 mb-4 md:mb-10">
        <span className="material-symbols-outlined text-neon-green text-sm">terminal</span>
        <span className="text-xs font-mono font-bold text-neon-green uppercase tracking-widest">
          Ask Prism
        </span>
      </div>
      <div className="space-y-4 md:space-y-8">
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
