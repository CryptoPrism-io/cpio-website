import { motion } from 'motion/react';
import { QuerySidebar } from './QuerySidebar';
import { ResultsPanel } from './ResultsPanel';
import { useQueryCycle } from '../hooks/useQueryCycle';

interface TerminalPanelProps {
  readonly className?: string;
}

export const TerminalPanel: React.FC<TerminalPanelProps> = ({ className = '' }) => {
  const { activeLevel, handleClick } = useQueryCycle();

  return (
    <section className={`lg:h-[100dvh] flex flex-col justify-center px-4 sm:px-6 lg:px-0 py-10 lg:py-12 ${className}`}>
      {/* Section heading */}
      <div className="text-center mb-8 md:mb-16 max-w-4xl mx-auto">
        <motion.h2
          className="text-2xl md:text-4xl font-display font-extrabold tracking-tight mb-2 md:mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
        >
          <span className="text-white">Tired of dropdown menus</span>
          <br />
          <span className="text-white">and </span>
          <span className="neon-text-green">complex filters?</span>
        </motion.h2>
        <motion.p
          className="text-gray-400 hidden md:block text-sm font-medium leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
        >
          Just ask <span className="text-neon-green font-semibold">PRISM</span> in plain English. Get transparent and ultra-precise code-powered results instantly.
        </motion.p>
      </div>

      <motion.div
        className="watchlist-glass-panel watchlist-inner-glow rounded-xl overflow-hidden w-full"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
      >
        {/* Toolbar */}
        <div className="flex items-center justify-between p-3 md:p-4 border-b border-neon-green/10">
          <div className="flex items-center gap-3">
            <span className="text-gray-200 font-medium text-sm flex items-center gap-2">
              Ask Prism
              <span className="material-symbols-outlined text-base opacity-50">expand_more</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-neon-green/10 border border-neon-green/20 text-[10px] text-neon-green font-mono uppercase">
              <div className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse shadow-[0_0_8px_#0ECB81]" />
              System Online
            </div>
            {['refresh', 'tune', 'more_vert'].map((icon) => (
              <motion.button
                key={icon}
                className="p-1.5 rounded hover:bg-white/5 text-gray-400 transition-colors"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <span className="material-symbols-outlined text-sm">{icon}</span>
              </motion.button>
            ))}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row min-h-[40vh] lg:min-h-0 lg:max-h-[60vh] lg:overflow-auto">
          <QuerySidebar activeLevel={activeLevel} onLevelClick={handleClick} />
          <ResultsPanel activeLevel={activeLevel} />
        </div>
      </motion.div>
    </section>
  );
};

export default TerminalPanel;
