import { motion } from 'motion/react';
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
        {data.bars.map((bar, barIdx) => {
          const widthPct = (bar.value / bar.maxValue) * 100;

          return (
            <motion.div
              key={bar.label}
              className="group"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: barIdx * 0.1,
                duration: 0.4,
                ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
              }}
            >
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
                    <motion.span
                      className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-400/10 text-cyan-400 font-mono font-bold uppercase tracking-wider"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.3 + barIdx * 0.1,
                        type: 'spring',
                        stiffness: 500,
                        damping: 15,
                      }}
                    >
                      Flagged
                    </motion.span>
                  )}
                  <span className="text-xs font-mono font-bold text-neon-green">
                    {bar.value}{bar.suffix}
                  </span>
                </div>
              </div>
              <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(widthPct, 100)}%` }}
                  transition={{
                    delay: 0.2 + barIdx * 0.1,
                    duration: 0.8,
                    ease: 'easeOut',
                  }}
                  style={{
                    backgroundColor: bar.color,
                    boxShadow: `0 0 10px ${bar.color}66`,
                  }}
                />
                <motion.div
                  className="absolute top-0 h-full w-px opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    left: `${Math.min(widthPct, 100)}%`,
                    backgroundColor: bar.color,
                    boxShadow: `0 0 6px ${bar.color}`,
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 + data.bars.length * 0.1, duration: 0.5 }}
      >
        <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
          {data.bars.length} protocols analyzed
        </span>
        {data.bars.some((b) => b.flagged) && (
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00F2FE]" />
            {data.bars.filter((b) => b.flagged).length} flagged
          </span>
        )}
      </motion.div>
    </div>
  );
};

export default MediumViz;
