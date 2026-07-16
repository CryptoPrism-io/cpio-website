const CATEGORIES = ['Funds', 'Trading Firms', 'Fintechs', 'Research Teams', 'APIs'];

export function TrustBar() {
  return (
    <section style={{ padding: '36px 0', background: '#FFFFFF', borderBottom: '1px solid #E7E9EC' }}>
      <div className="prism-wrap">
        <div style={{ textAlign: 'center', fontSize: 13, fontWeight: 600, color: '#98A2B3', letterSpacing: '0.02em', marginBottom: 22 }}>
          Built for the builders shaping the future of finance
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${CATEGORIES.length}, 1fr)`, gap: 20 }} className="prism-hide-mobile">
          {CATEGORIES.map((c) => (
            <div key={c} style={{ textAlign: 'center', fontSize: 14.5, fontWeight: 600, color: '#475467' }}>{c}</div>
          ))}
        </div>
        <div className="prism-trustbar-mobile" style={{ flexWrap: 'wrap', justifyContent: 'center', gap: '10px 22px' }}>
          {CATEGORIES.map((c) => (
            <span key={c} style={{ fontSize: 13.5, fontWeight: 600, color: '#475467' }}>{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
