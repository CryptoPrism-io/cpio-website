import '../../styles/site.css';
import { NavBar, Footer } from './shared';

type CellValue = boolean | string;

function Cell({ v, us }: { v: CellValue; us?: boolean }) {
  if (v === true) return <svg width="15" height="15" viewBox="0 0 16 16"><path d="M3 8.5l3.2 3L13 4.5" stroke={us ? 'var(--emerald)' : 'var(--text-muted)'} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (v === false) return <span style={{ color: 'var(--text-muted)', opacity: .5 }}>—</span>;
  return <span className="mono" style={{ fontSize: 12, fontWeight: us ? 700 : 500, color: us ? 'var(--emerald)' : 'var(--text-secondary)' }}>{v}</span>;
}

export function ComparePage() {
  const pts = [
    { name: 'Glassnode', x: .24, y: .78, sub: 'On-chain only · $800/mo', col: '#0E7490' },
    { name: 'Nansen', x: .34, y: .68, sub: 'Wallet labels · single layer', col: '#6D28D9' },
    { name: 'Kaiko', x: .30, y: .34, sub: 'Market data · institutional', col: '#B45309' },
    { name: 'Bloomberg', x: .52, y: .16, sub: 'TradFi terminal · ~$2,000/mo', col: '#7A8590' },
    { name: 'CryptoPrism', x: .84, y: .86, sub: 'Four engines · from $29/mo', col: '#0A8F5A', us: true },
  ];
  const rows: [string, ...CellValue[]][] = [
    ['Crypto-native', true, true, true, false, true],
    ['Four-engine fusion', false, false, false, false, true],
    ['Natural-language query', false, false, false, false, true],
    ['Price', '$800/mo', '—', '—', '~$2,000/mo', 'from $29/mo'],
  ];
  const cols = ['Glassnode', 'Nansen', 'Kaiko', 'Bloomberg', 'CryptoPrism'];
  return (
    <div className="site-light">
      <NavBar active="compare" />
      <main style={{ paddingTop: 64 }}>
        <section style={{ padding: '86px 0 40px' }}>
          <div className="wrap">
            <span className="label" style={{ color: 'var(--emerald)' }}>COMPARE</span>
            <h1 className="display" style={{ fontSize: 'clamp(42px,6vw,80px)', margin: '16px 0 20px', maxWidth: 880 }}>
              <span className="line-mask"><span className="line-in" style={{ animationDelay: '.1s' }}>Everyone owns one layer.</span></span>
              <span className="line-mask"><span className="line-in grad-text" style={{ animationDelay: '.26s' }}>We fuse four.</span></span>
            </h1>
          </div>
        </section>

        <section style={{ padding: '20px 0 50px' }}>
          <div className="wrap">
            <div className="card" style={{ padding: 30 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
                <span className="label">POSITIONING · 2×2</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>The top-right corner is empty — except us.</span>
              </div>
              <svg viewBox="0 0 800 480" style={{ width: '100%', height: 'auto' }}>
                {[1, 2, 3, 4].map((i) => <line key={'x' + i} x1={i * 160} y1="16" x2={i * 160} y2="440" stroke="rgba(120,110,80,.16)" strokeWidth="1" />)}
                {[1, 2, 3].map((i) => <line key={'y' + i} x1="40" y1={i * 106 + 16} x2="784" y2={i * 106 + 16} stroke="rgba(120,110,80,.16)" strokeWidth="1" />)}
                <line x1="40" y1="440" x2="784" y2="440" stroke="rgba(80,70,50,.45)" strokeWidth="1.2" />
                <line x1="40" y1="16" x2="40" y2="440" stroke="rgba(80,70,50,.45)" strokeWidth="1.2" />
                <text x="40" y="468" fill="#7A8590" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="2">SINGLE LAYER →</text>
                <text x="784" y="468" fill="#7A8590" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="2" textAnchor="end">FOUR-ENGINE FUSION</text>
                <text x="24" y="16" fill="#7A8590" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="2" transform="rotate(-90 24 16)" textAnchor="end">TRADFI</text>
                <text x="24" y="440" fill="#7A8590" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="2" transform="rotate(-90 24 440)">CRYPTO-NATIVE →</text>
                <rect x="470" y="30" width="300" height="170" fill="rgba(10,143,90,.06)" stroke="rgba(10,143,90,.3)" strokeDasharray="4 4" />
                <text x="620" y="120" fill="#0A8F5A" fontSize="13" fontFamily="Manrope" fontWeight="700" textAnchor="middle">THE EMPTY CORNER</text>
                {pts.map((c) => {
                  const cx = 40 + c.x * 744, cy = 440 - c.y * 424;
                  return (
                    <g key={c.name}>
                      {c.us ? <circle cx={cx} cy={cy} r="24" fill={c.col} opacity=".12"><animate attributeName="r" values="18;30;18" dur="2.6s" repeatCount="indefinite" /></circle> : null}
                      <circle cx={cx} cy={cy} r={c.us ? 9 : 6} fill={c.col} stroke={c.us ? '#FFFDF7' : 'none'} strokeWidth={c.us ? 2 : 0} />
                      <text x={cx + 14} y={cy - 3} fill="#0F1419" fontSize={c.us ? 14 : 12} fontFamily="Manrope" fontWeight={c.us ? 800 : 600}>{c.name}</text>
                      <text x={cx + 14} y={cy + 13} fill="#7A8590" fontSize="10" fontFamily="JetBrains Mono">{c.sub}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </section>

        <section style={{ padding: '30px 0 60px' }}>
          <div className="wrap">
            <div className="card" style={{ padding: 0, overflow: 'auto' }}>
              <table className="tbl" style={{ minWidth: 720 }}>
                <thead>
                  <tr>
                    <th></th>
                    {cols.map((c) => <th key={c} style={{ textAlign: 'center', color: c === 'CryptoPrism' ? 'var(--emerald)' : undefined }}>{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(([label, ...vals]) => (
                    <tr key={label as string}>
                      <td style={{ fontWeight: 700, color: 'var(--text)' }}>{label}</td>
                      {vals.map((v, i) => (
                        <td key={i} style={{ textAlign: 'center', background: i === 4 ? 'rgba(10,143,90,.06)' : 'transparent' }}>
                          <Cell v={v} us={i === 4} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default ComparePage;
