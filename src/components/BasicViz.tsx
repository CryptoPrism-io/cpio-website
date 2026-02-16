import React from 'react';
import { basicVizData } from '../data/mockData';

interface BasicVizProps {
  readonly className?: string;
}

export const BasicViz: React.FC<BasicVizProps> = ({ className = '' }) => {
  const cards = basicVizData[0];

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${className}`}>
      {cards.map((coin) => (
        <div
          key={coin.symbol + coin.name}
          className="p-5 rounded-lg border border-white/5 bg-white/[0.02] hover:border-neon-green/20 transition-all group"
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-9 h-9 rounded border flex items-center justify-center font-mono font-bold text-base"
              style={{
                borderColor: `${coin.color}66`,
                color: coin.color,
                backgroundColor: `${coin.color}1a`,
              }}
            >
              {coin.symbol}
            </div>
            <div>
              <div className="text-sm font-bold text-white">{coin.name}</div>
              <div className="text-xs font-mono text-gray-500">{coin.price}</div>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex justify-between text-[10px] font-mono mb-1">
              <span className="text-gray-500 uppercase tracking-widest">52W Proximity</span>
              <span className="text-white font-bold">{coin.pctOf52W}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${coin.pctOf52W}%`,
                  backgroundColor: coin.pctOf52W > 85 ? '#0ECB81' : '#627EEA',
                  boxShadow: `0 0 8px ${coin.pctOf52W > 85 ? 'rgba(14,203,129,0.5)' : 'rgba(98,126,234,0.5)'}`,
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">RSI</span>
              <span className="text-xs font-mono font-bold text-white">{coin.rsiValue}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider ${
                coin.rsiLabel === 'Bearish Div' ? 'bg-neon-red/10 text-neon-red' :
                coin.rsiLabel === 'Bullish' || coin.rsiLabel === 'Strong' ? 'bg-neon-green/10 text-neon-green' :
                'bg-white/5 text-gray-400'
              }`}>
                {coin.rsiLabel}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full transition-all duration-500"
                  style={{
                    height: `${8 + (i < Math.round(coin.momentum / 20) ? (i + 1) * 3 : 0)}px`,
                    backgroundColor: i < Math.round(coin.momentum / 20) ? '#0ECB81' : 'rgba(255,255,255,0.08)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BasicViz;
