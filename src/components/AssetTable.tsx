import React from 'react';
import { cryptoAssets } from '../data/mockData';
import type { CryptoAsset } from '../data/mockData';

interface AssetTableProps {
  readonly className?: string;
}

const SparklineChart: React.FC<{
  readonly path: string;
  readonly positive: boolean;
}> = ({ path, positive }) => {
  const color = positive ? '#0ECB81' : '#FF4D4D';
  const glowClass = positive ? 'neon-glow-green' : 'neon-glow-red';

  return (
    <svg className={glowClass} height="20" viewBox="0 0 40 20" width="40">
      <path d={path} fill="none" stroke={color} strokeWidth="2" />
    </svg>
  );
};

const AssetRow: React.FC<{ readonly asset: CryptoAsset }> = ({ asset }) => {
  return (
    <tr className="table-row-hover group border-l-2 border-transparent">
      <td className="py-6 pl-4">
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded border flex items-center justify-center font-mono font-bold text-lg"
            style={{
              borderColor: `${asset.color}66`,
              color: asset.color,
              backgroundColor: `${asset.color}1a`,
            }}
          >
            {asset.symbol}
          </div>
          <div>
            <div className="text-[9px] text-neon-green font-bold uppercase tracking-widest mb-1">
              {asset.tag}
            </div>
            <div className="text-sm font-bold text-white">{asset.name}</div>
          </div>
        </div>
      </td>
      <td className="py-6">
        <span className="font-mono text-sm text-white">{asset.price}</span>
      </td>
      <td className="py-6">
        <div className="flex items-center gap-3">
          <span
            className={`text-xs font-bold ${
              asset.changePositive ? 'text-neon-green' : 'text-neon-red'
            }`}
          >
            {asset.change24h}
          </span>
          <SparklineChart path={asset.sparklinePath} positive={asset.changePositive} />
        </div>
      </td>
      <td className="py-6">
        <span className="text-xs font-mono font-bold text-neon-green">{asset.delta}</span>
      </td>
      <td className="py-6 pr-4">
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
  );
};

export const AssetTable: React.FC<AssetTableProps> = ({ className = '' }) => {
  return (
    <div className={`flex-1 p-8 ${className}`}>
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
            Registry / Results
          </span>
          <span className="text-sm font-bold text-white bg-white/5 px-3 py-1 rounded">
            {cryptoAssets.length} Assets identified
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse-slow shadow-[0_0_10px_#0ECB81]" />
          <span className="text-[10px] font-mono font-bold text-neon-green uppercase tracking-[0.25em]">
            Live Data Stream
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-mono">
              <th className="pb-6 font-semibold">Asset Node</th>
              <th className="pb-6 font-semibold">Price Index</th>
              <th className="pb-6 font-semibold">24H Flux</th>
              <th className="pb-6 font-semibold">Delta</th>
              <th className="pb-6 font-semibold text-right">Core Signals</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {cryptoAssets.map((asset) => (
              <AssetRow key={asset.symbol} asset={asset} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetTable;
