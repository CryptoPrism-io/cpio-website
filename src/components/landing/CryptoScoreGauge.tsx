import React, { useEffect, useState } from 'react';

interface RingProps {
  readonly r: number;
  readonly val: number;
  readonly color: string;
  readonly ease: number;
}

const Ring: React.FC<RingProps> = ({ r, val, color, ease }) => {
  const C = 2 * Math.PI * r;
  const off = C - (val / 100) * C * ease;
  return (
    <g>
      <circle cx="120" cy="120" r={r} fill="none" stroke="rgba(255,255,255,.04)" strokeWidth="8" />
      <circle
        cx="120" cy="120" r={r} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
        strokeDasharray={C} strokeDashoffset={off}
        transform="rotate(-90 120 120)"
        style={{ filter: `drop-shadow(0 0 8px ${color})` }}
      />
    </g>
  );
};

/**
 * Illustrative live-product demo of the DMV Score — CryptoPrism's real, validated
 * Direction/Magnitude/Volatility conviction framework (AUC 0.896 out-of-sample).
 * The ring fill values below are a demo animation, not a live feed.
 */
export const CryptoScoreGauge: React.FC = () => {
  const [t, setT] = useState(0);
  useEffect(() => {
    const startTs = Date.now();
    const id = setInterval(() => {
      const elapsed = (Date.now() - startTs) / 1000;
      const next = Math.min(elapsed / 2.4, 1);
      setT(next);
      if (next >= 1) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, []);

  const ease = 1 - Math.pow(1 - t, 3);

  const direction = 82, magnitude = 64, volatility = 76;
  const composite = Math.round((direction + magnitude + volatility) / 3);
  const display = Math.round(composite * ease);

  return (
    <div className="glass gradient-border" style={{
      position: 'relative', padding: 28, width: '100%', maxWidth: 420,
      background: 'var(--gauge-bg)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <span className="label">DMV SCORE &middot; BTC</span>
        <span className="mono" style={{ fontSize: 11, color: 'var(--emerald)' }}>AUC 0.896</span>
      </div>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', margin: '6px 0 4px' }}>
        <svg width="240" height="240" viewBox="0 0 240 240">
          <Ring r={102} val={direction} color="var(--ring-1)" ease={ease} />
          <Ring r={86} val={magnitude} color="var(--ring-2)" ease={ease} />
          <Ring r={70} val={volatility} color="var(--ring-3)" ease={ease} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span className="display text-glow" style={{ fontSize: 64, color: 'var(--gauge-num)', lineHeight: 1 }}>{display}</span>
          <span className="label" style={{ marginTop: 6 }}>CONVICTION / 100</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 14 }}>
        {[
          { l: 'Direction', v: direction, c: '#0E7490' },
          { l: 'Magnitude', v: magnitude, c: '#B45309' },
          { l: 'Volatility', v: volatility, c: '#4338CA' },
        ].map((x) => (
          <div key={x.l} style={{ borderTop: `2px solid ${x.c}`, paddingTop: 8 }}>
            <div className="label" style={{ fontSize: 9 }}>{x.l}</div>
            <div className="mono" style={{ fontSize: 18, fontWeight: 600, color: x.c, marginTop: 2 }}>
              {Math.round(x.v * ease)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoScoreGauge;
