import React, { useEffect, useState } from 'react';

/** Illustrative product demo of the Saarthi AI assistant — scripted sequence, not a live chat. */
export const SaarthiChat: React.FC = () => {
  const [phase, setPhase] = useState(0); // 0 typing, 1 reply line 1, 2 line 2, 3 citation

  useEffect(() => {
    const seq: readonly [number, number][] = [[0, 0], [1, 1100], [2, 2200], [3, 3000]];
    const ids = seq.map(([p, ms]) => setTimeout(() => setPhase(p), ms));
    const loop = setInterval(() => {
      setPhase(0);
      seq.forEach(([p, ms]) => setTimeout(() => setPhase(p), ms));
    }, 8000);
    return () => { ids.forEach(clearTimeout); clearInterval(loop); };
  }, []);

  return (
    <div className="glass" style={{ padding: 18, background: 'var(--panel-bg)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#6D28D9,#4338CA)', display: 'grid', placeItems: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2 L12 22 M2 12 L22 12 M5 5 L19 19 M19 5 L5 19" stroke="#fff" strokeWidth="1.6" /></svg>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Saarthi</div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Data-backed &middot; Cites sources</div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--emerald)' }} className="mono">&#9679; ONLINE</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        <div style={{ background: 'rgba(67,56,202,.10)', border: '1px solid rgba(67,56,202,.22)', padding: '10px 14px', borderRadius: '12px 12px 2px 12px', fontSize: 13, maxWidth: '85%' }}>
          Should I be worried about this BTC pullback?
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ width: 4, background: 'linear-gradient(to bottom,#6D28D9,transparent)', borderRadius: 2, alignSelf: 'stretch' }} />
        <div style={{ flex: 1, fontSize: 13, lineHeight: 1.55, color: 'var(--text-secondary)', minHeight: 110 }}>
          {phase === 0 && (
            <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>
              <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: '#6D28D9', animation: 'landing-type-dot 1.4s infinite' }} />
              <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: '#6D28D9', animation: 'landing-type-dot 1.4s infinite .2s' }} />
              <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: '#6D28D9', animation: 'landing-type-dot 1.4s infinite .4s' }} />
            </span>
          )}
          {phase >= 1 && (
            <div style={{ animation: 'landing-tick-up .4s ease-out' }}>
              Short answer: <span style={{ color: 'var(--text)' }}>not yet</span>. Whales accumulated <span className="mono" style={{ color: 'var(--emerald)' }}>+18.2K BTC</span> over the last 7 days while exchange reserves dropped to a 5-year low.
            </div>
          )}
          {phase >= 2 && (
            <div style={{ marginTop: 10, animation: 'landing-tick-up .4s ease-out' }}>
              Funding is neutral (<span className="mono">+0.008%</span>) and MVRV sits at <span className="mono">2.1</span> — well below the historical danger zone of 3.5+. Pullback reads as healthy.
            </div>
          )}
          {phase >= 3 && (
            <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 6, animation: 'landing-tick-up .4s ease-out' }}>
              {[
                { s: 'On-chain data', c: '#0E7490' },
                { s: 'Funding · exchange feeds', c: '#0A8F5A' },
                { s: 'MVRV · 7d series', c: '#B45309' },
              ].map((x) => (
                <span key={x.s} style={{ fontSize: 10, padding: '4px 8px', borderRadius: 4, border: `1px solid ${x.c}40`, background: `${x.c}10`, color: x.c, fontWeight: 600, letterSpacing: '.04em' }} className="mono">
                  {x.s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SaarthiChat;
