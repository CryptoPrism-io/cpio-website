import '../../styles/site.css';
import { NavBar, Footer, SectionHead, DMVGauge, StatLink, Reveal } from './shared';

function EquityCurve() {
  // stylized cumulative net PnL curve (endpoint labeled from deck; shape illustrative)
  const pts = [0, 2, 1, 4, 6, 5, 9, 12, 10, 14, 18, 16, 21, 25, 23, 28, 33, 30, 36, 42, 39, 46, 52, 49, 57, 64, 60, 68, 76, 72, 81, 90, 86, 95, 100];
  const W = 720, H = 200;
  const path = pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${(i / (pts.length - 1)) * W},${H - (v / 100) * (H - 20) - 8}`).join(' ');
  return (
    <div className="dark-panel" style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
        <span className="label">CUMULATIVE NET PNL · 226 TRADES · OUT-OF-SAMPLE</span>
        <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: '#0ECB81' }}>+$1,148 · +229.6%</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        <defs>
          <linearGradient id="eqfill" x1="0" y1="0" x2="0" y2="1">
            <stop offset={0} stopColor="rgba(14,203,129,.28)" />
            <stop offset={1} stopColor="rgba(14,203,129,0)" />
          </linearGradient>
        </defs>
        {[1, 2, 3].map((i) => <line key={i} x1="0" y1={i * H / 4} x2={W} y2={i * H / 4} stroke="rgba(160,177,197,.1)" strokeWidth="1" />)}
        <path d={`${path} L${W},${H} L0,${H} Z`} fill="url(#eqfill)" />
        <path d={path} fill="none" stroke="#0ECB81" strokeWidth="2" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 6px rgba(14,203,129,.5))' }} />
      </svg>
      <div style={{ fontSize: 10, color: 'var(--dk-muted)', marginTop: 10 }}>Curve shape illustrative · endpoints and verdict figures from validated backtest record.</div>
    </div>
  );
}

export function EvidencePage() {
  const verdict: [string, string][] = [
    ['Net PnL', '+$1,148'], ['Net return', '+229.6%'], ['Sharpe ratio', '7.69'],
    ['Win rate', '65%'], ['Profit factor', '2.16'], ['Max drawdown', '−3.0%'], ['Trades', '226'],
  ];
  const auc = [
    { l: 'Random baseline', v: 0.50, c: 'rgba(160,177,197,.5)' },
    { l: 'Typical published model', v: 0.70, c: 'var(--cyan)' },
    { l: 'DMV (out-of-sample)', v: 0.896, c: 'var(--emerald)', us: true },
  ];
  return (
    <div className="site-light">
      <NavBar active={null} />
      <main style={{ paddingTop: 64 }}>
        <section style={{ padding: '86px 0 50px' }}>
          <div className="wrap">
            <span className="label" style={{ color: 'var(--emerald)' }}>EVIDENCE · TRACEABILITY HUB</span>
            <h1 className="display" style={{ fontSize: 'clamp(44px,6.4vw,88px)', margin: '16px 0 20px' }}><span className="line-mask"><span className="line-in" style={{ animationDelay: '.1s' }}>Every number, <span className="grad-text">traceable.</span></span></span></h1>
            <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 620, lineHeight: 1.55 }}>
              Out-of-sample · founder portfolio case studies · fully automated. Every stat on this site resolves here.
            </p>
          </div>
        </section>

        <section style={{ padding: '40px 0' }}>
          <div className="wrap">
            <SectionHead eyebrow="PERFORMANCE EVIDENCE" title="The verdict table." />
            <div className="two-col" style={{ gridTemplateColumns: '.9fr 1.1fr', alignItems: 'stretch' }}>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table className="tbl">
                  <thead><tr><th>Metric</th><th style={{ textAlign: 'right' }}>Value</th></tr></thead>
                  <tbody>
                    {verdict.map(([m, v]) => (
                      <tr key={m}>
                        <td style={{ fontWeight: 600, color: 'var(--text)' }}>{m}</td>
                        <td className="mono" style={{ textAlign: 'right', fontWeight: 700, color: m === 'Max drawdown' ? 'var(--rose)' : 'var(--emerald)' }}>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ padding: '12px 14px', borderTop: '1px solid rgba(120,110,80,.2)', fontSize: 11, color: 'var(--text-muted)' }}>
                  Out-of-sample · founder portfolio case studies · 8 / 8 coins net profitable.
                </div>
              </div>
              <EquityCurve />
            </div>
          </div>
        </section>

        <section id="methodology" style={{ padding: '70px 0', background: 'rgba(232,227,214,.45)' }}>
          <div className="wrap">
            <SectionHead eyebrow="METHODOLOGY" title="What DMV means — and why 0.896 matters."
              sub="Direction (which way), Magnitude (how far), Volatility (how violently). Three independent reads fused into one conviction score per coin." />
            <div className="two-col" style={{ alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {auc.map((a) => (
                  <Reveal key={a.l}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: a.us ? 800 : 600, color: a.us ? 'var(--emerald)' : 'var(--text)' }}>{a.l}</span>
                      <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: a.us ? 'var(--emerald)' : 'var(--text-secondary)' }}>{a.v.toFixed(a.v === 0.896 ? 3 : 2)}</span>
                    </div>
                    <div style={{ height: a.us ? 18 : 13, borderRadius: 8, background: 'rgba(120,110,80,.14)', overflow: 'hidden' }}>
                      <div className="bar-fill rvh rvon" style={{ width: `${a.v * 100}%`, height: '100%', borderRadius: 8, background: a.c, boxShadow: a.us ? '0 0 16px rgba(10,143,90,.4)' : 'none' }} />
                    </div>
                  </Reveal>
                ))}
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: '8px 0 0', lineHeight: 1.6 }}>
                  AUC 0.896 means DMV ranks a winner above a loser <span style={{ color: 'var(--text)', fontWeight: 700 }}>~90% of the time.</span>
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}><DMVGauge compact /></div>
            </div>
          </div>
        </section>

        <section style={{ padding: '70px 0' }}>
          <div className="wrap">
            <div className="g2">
              <div className="card" style={{ padding: 30 }}>
                <span className="label">COST &amp; INFRASTRUCTURE</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18, marginTop: 20 }}>
                  <StatLink v="17" l="Pipelines" />
                  <StatLink v="6" l="Chains" />
                  <StatLink v="10" l="GH Actions workflows" />
                </div>
              </div>
              <div className="card" style={{ padding: 30 }}>
                <span className="label">BUILD RECORD</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18, marginTop: 20 }}>
                  <StatLink v="12" l="Products built" />
                  <StatLink v="9" l="Live today" />
                  <StatLink v="17" l="Public repos" />
                </div>
              </div>
            </div>
            <div className="gradient-border" style={{ marginTop: 26, padding: '22px 30px', textAlign: 'center' }}>
              <span style={{ fontSize: 16, fontStyle: 'italic', fontFamily: 'Georgia, serif', color: 'var(--text)' }}>
                "Transparency is the product. We hold ourselves to the same standard."
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default EvidencePage;
