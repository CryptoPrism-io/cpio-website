import { motion } from 'motion/react';
import { advancedVizData } from '../data/mockData';
import { CryptoIcon } from './CryptoIcon';

interface AdvancedVizProps {
  readonly className?: string;
}

export const AdvancedViz: React.FC<AdvancedVizProps> = ({ className = '' }) => {
  const assets = advancedVizData[0];

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-left">
        <thead>
          <tr className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-mono">
            <th className="pb-6 font-semibold">Asset Node</th>
            <th className="pb-6 font-semibold">Price Index</th>
            <th className="pb-6 font-semibold">{assets[0]?.metric1Label}</th>
            <th className="pb-6 font-semibold">{assets[0]?.metric2Label}</th>
            <th className="pb-6 font-semibold">Trend</th>
            <th className="pb-6 font-semibold text-right">Core Signals</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {assets.map((asset, rowIdx) => (
            <motion.tr
              key={asset.symbol + asset.name}
              className="table-row-hover group border-l-2 border-transparent"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: rowIdx * 0.12,
                duration: 0.4,
                ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
              }}
            >
              <td className="py-5 pl-4">
                <div className="flex items-center gap-3">
                  <CryptoIcon symbol={asset.symbol} name={asset.name} color={asset.color} size={36} />
                  <div className="text-sm font-bold text-white">{asset.name}</div>
                </div>
              </td>
              <td className="py-5">
                <span className="font-mono text-sm text-white">{asset.price}</span>
              </td>
              <td className="py-5">
                <span className={`text-xs font-mono font-bold ${
                  asset.metric1Positive ? 'text-neon-green' : 'text-neon-red'
                }`}>
                  {asset.metric1Value}
                </span>
              </td>
              <td className="py-5">
                <span className={`text-xs font-mono font-bold ${
                  asset.metric2Positive ? 'text-neon-green' : 'text-neon-red'
                }`}>
                  {asset.metric2Value}
                </span>
              </td>
              <td className="py-5">
                <svg
                  className={`sparkline-draw ${asset.metric1Positive ? 'neon-glow-green' : 'neon-glow-red'}`}
                  height="20"
                  viewBox="0 0 40 20"
                  width="40"
                  style={{ '--sparkline-delay': `${0.3 + rowIdx * 0.15}s` } as React.CSSProperties}
                >
                  <path
                    d={asset.sparklinePath}
                    fill="none"
                    stroke={asset.metric1Positive ? '#0ECB81' : '#FF4D4D'}
                    strokeWidth="2"
                  />
                </svg>
              </td>
              <td className="py-5 pr-4">
                <div className="flex items-center justify-end gap-3">
                  {asset.signals.map((signal, i) => (
                    <motion.span
                      key={i}
                      className={`led-orb ${signal.active ? 'text-neon-green' : 'text-gray-700'}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.4 + rowIdx * 0.12 + i * 0.08,
                        type: 'spring',
                        stiffness: 500,
                        damping: 12,
                      }}
                    />
                  ))}
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdvancedViz;
