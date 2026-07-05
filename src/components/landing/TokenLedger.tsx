import React, { useEffect, useState } from 'react';
import { fmt } from './hooks';

interface TokenRow {
  readonly sym: string;
  readonly name: string;
  readonly p: number;
  readonly ch: number;
  readonly score: number;
  readonly sig: 'BULL' | 'WATCH' | 'NEUTR';
  readonly spark: readonly number[];
}

const TOKENS_SEED: readonly TokenRow[] = [
  { sym: 'BTC', name: 'Bitcoin', p: 84250, ch: 2.4, score: 76, sig: 'BULL', spark: [40, 42, 41, 46, 52, 49, 55, 62, 58, 65, 72, 78] },
  { sym: 'ETH', name: 'Ethereum', p: 4160.8, ch: 1.2, score: 68, sig: 'BULL', spark: [50, 48, 52, 49, 55, 53, 57, 60, 58, 62, 66, 68] },
  { sym: 'SOL', name: 'Solana', p: 218.46, ch: -0.8, score: 71, sig: 'NEUTR', spark: [60, 64, 62, 66, 70, 68, 65, 63, 67, 64, 62, 60] },
  { sym: 'AVAX', name: 'Avalanche', p: 38.92, ch: 5.6, score: 62, sig: 'BULL', spark: [35, 38, 36, 41, 44, 42, 48, 52, 55, 58, 62, 66] },
  { sym: 'ARB', name: 'Arbitrum', p: 1.84, ch: -1.4, score: 54, sig: 'WATCH', spark: [70, 68, 66, 64, 62, 58, 60, 57, 55, 52, 50, 48] },
];

const Spark: React.FC<{ readonly data: readonly number[]; readonly color?: string; readonly w?: number; readonly h?: number }> = ({
  data, color = '#0A8F5A', w = 80, h = 22,
}) => {
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * h;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const sigCol = (s: TokenRow['sig']) => (s === 'BULL' ? '#0A8F5A' : s === 'WATCH' ? '#B45309' : '#7A8590');

/** Illustrative live-product demo screener — ticks locally for visual effect, not a real feed. */
export const TokenLedger: React.FC = () => {
  const [rows, setRows] = useState<readonly TokenRow[]>(TOKENS_SEED);
  useEffect(() => {
    const id = setInterval(() => {
      setRows((rs) => rs.map((r) => {
        const drift = (Math.random() - 0.48) * 0.002;
        const np = r.p * (1 + drift);
        const nch = r.ch + (Math.random() - 0.5) * 0.15;
        return { ...r, p: np, ch: Math.max(-9.9, Math.min(9.9, nch)) };
      }));
    }, 1100);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="glass" style={{ padding: 0, overflow: 'hidden', background: 'var(--panel-bg)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: '1px solid rgba(120,110,80,.18)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="ndot" style={{ animation: 'landing-pulse-soft 2s infinite' }} />
          <span className="label">SCREENER &middot; TOP MOVERS &middot; 1H</span>
        </div>
        <span className="mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>DEMO DATA</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr .9fr .7fr 1.2fr .8fr .8fr', padding: '8px 18px', borderBottom: '1px solid rgba(120,110,80,.14)', fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 600 }}>
        <span>Asset</span><span style={{ textAlign: 'right' }}>Price</span><span style={{ textAlign: 'right' }}>1h</span><span style={{ textAlign: 'center' }}>Trend</span><span style={{ textAlign: 'center' }}>Score</span><span style={{ textAlign: 'right' }}>Signal</span>
      </div>
      {rows.map((r, i) => (
        <div key={r.sym} className="ledger-row" style={{
          display: 'grid', gridTemplateColumns: '1.4fr .9fr .7fr 1.2fr .8fr .8fr',
          alignItems: 'center', padding: '12px 18px',
          borderBottom: i < rows.length - 1 ? '1px solid rgba(120,110,80,.10)' : 'none',
          transition: 'background .2s',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 26, height: 26, borderRadius: 6, background: 'rgba(10,143,90,.08)', border: '1px solid rgba(10,143,90,.2)', display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 700, color: 'var(--emerald)' }}>{r.sym.slice(0, 2)}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{r.sym}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{r.name}</div>
            </div>
          </div>
          <div className="mono" style={{ textAlign: 'right', fontSize: 13, fontVariantNumeric: 'tabular-nums' }}>${fmt(r.p, r.p > 100 ? 2 : 3)}</div>
          <div className="mono" style={{ textAlign: 'right', fontSize: 12, color: r.ch >= 0 ? 'var(--emerald)' : 'var(--rose)' }}>
            {r.ch >= 0 ? '+' : ''}{r.ch.toFixed(2)}%
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spark data={r.spark} color={r.ch >= 0 ? '#0A8F5A' : '#C2410C'} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: r.score >= 70 ? '#0A8F5A' : r.score >= 60 ? '#B45309' : '#7A8590' }}>{r.score}</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="mono" style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 4, background: `${sigCol(r.sig)}15`, color: sigCol(r.sig), letterSpacing: '0.1em' }}>{r.sig}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TokenLedger;
