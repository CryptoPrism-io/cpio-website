import { motion } from 'motion/react';
import { QuerySidebar } from './QuerySidebar';
import { ResultsPanel } from './ResultsPanel';
import { useQueryCycle } from '../hooks/useQueryCycle';

interface TerminalPanelProps {
  readonly className?: string;
}

const trafficDots = [
  { color: 'bg-neon-red/40', border: 'border-neon-red/20' },
  { color: 'bg-yellow-500/40', border: 'border-yellow-500/20' },
  { color: 'bg-neon-green/40', border: 'border-neon-green/20' },
];

export const TerminalPanel: React.FC<TerminalPanelProps> = ({ className = '' }) => {
  const { activeLevel, handleClick } = useQueryCycle();

  return (
    <section className={`min-h-screen flex flex-col justify-center px-6 lg:px-12 xl:px-20 py-16 lg:py-24 ${className}`}>
    <motion.div
      className="glass-panel rounded-xl shadow-2xl overflow-hidden w-full"
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
    >
      <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-white/5">
        <div className="flex gap-2">
          {trafficDots.map((dot, i) => (
            <motion.div
              key={i}
              className={`w-2.5 h-2.5 rounded-full ${dot.color} border ${dot.border}`}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.6 + i * 0.2,
                type: 'spring',
                stiffness: 500,
                damping: 15,
              }}
            />
          ))}
        </div>
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="flex items-center gap-2 px-3 py-1 bg-neon-green/5 border border-neon-green/10 rounded">
            <div className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse shadow-[0_0_8px_#0ECB81]" />
            <span className="text-[10px] font-mono font-bold text-neon-green tracking-[0.2em] uppercase">
              System: Online
            </span>
          </div>
        </motion.div>
      </div>
      <div className="flex flex-col lg:flex-row min-h-[60vh] lg:min-h-[70vh]">
        <QuerySidebar activeLevel={activeLevel} onLevelClick={handleClick} />
        <ResultsPanel activeLevel={activeLevel} />
      </div>
    </motion.div>
    </section>
  );
};

export default TerminalPanel;
