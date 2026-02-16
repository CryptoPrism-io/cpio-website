import React from 'react';
import { advancedVizData } from '../data/mockData';

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
          {assets.map((asset) => (
            <tr key={asset.symbol + asset.name} className="table-row-hover group border-l-2 border-transparent">
              <td className="py-5 pl-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded border flex items-center justify-center font-mono font-bold text-base"
                    style={{
                      borderColor: `${asset.color}66`,
                      color: asset.color,
                      backgroundColor: `${asset.color}1a`,
                    }}
                  >
                    {asset.symbol}
                  </div>
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
                <svg className={asset.metric1Positive ? 'neon-glow-green' : 'neon-glow-red'} height="20" viewBox="0 0 40 20" width="40">
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
                    <span
                      key={i}
                      className={`led-orb ${signal.active ? 'text-neon-green' : 'text-gray-700'}`}
                    />
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdvancedViz;
