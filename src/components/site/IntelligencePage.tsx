import '../../styles/site.css';
import { NavBar, DMVGauge, Footer, SectionHead } from './shared';

export function IntelligencePage() {
  const axes = [
    { n: 'Direction', c: '#0A8F5A', d: 'Which way is this coin likely to move? Trend, flow, and positioning reads fused into a directional probability.' },
    { n: 'Magnitude', c: '#0E7490', d: 'How far could it run? Expected-move sizing from volatility structure and historical analogs.' },
    { n: 'Volatility', c: '#6D28D9', d: 'How violent is the path? Risk context that tells you position size before you enter.' },
  ];
  return (
    <div className="site-light">
      <NavBar active="intelligence" />
      <main style={{ paddingTop: 64 }}>
        <section style={{ padding: '86px 0 50px' }}>
          <div className="wrap">
            <div className="two-col" style={{ alignItems: 'center' }}>
              <div>
                <span className="label" style={{ color: 'var(--emerald)' }}>INTELLIGENCE · THE DMV SCORE</span>
                <h1 className="display" style={{ fontSize: 'clamp(42px,6vw,80px)', margin: '16px 0 20px' }}>
                  <span className="line-mask"><span className="line-in" style={{ animationDelay: '.1s' }}>One score.</span></span>
                  <span className="line-mask"><span className="line-in grad-text" style={{ animationDelay: '.26s' }}>Three convictions.</span></span>
                </h1>
                <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 480, lineHeight: 1.55, marginBottom: 26 }}>
                  DMV compresses everything the four engines know about a coin into a single 0–100 conviction read — scored out-of-sample at AUC 0.896.
                </p>
                <a href="#/evidence" className="btn-ghost">Read the methodology →</a>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}><DMVGauge /></div>
            </div>
          </div>
        </section>

        <section style={{ padding: '60px 0', background: 'rgba(232,227,214,.45)' }}>
          <div className="wrap">
            <SectionHead eyebrow="THE THREE AXES" title="D · M · V, unpacked." />
            <div className="g3">
              {axes.map((a) => (
                <div key={a.n} className="card tile" style={{ padding: 28, borderTop: `2px solid ${a.c}` }}>
                  <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>{a.n}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{a.d}</p>
                </div>
              ))}
            </div>
            <div className="gradient-border" style={{ marginTop: 26, padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <span style={{ fontSize: 15, color: 'var(--text-secondary)' }}>
                <span className="mono" style={{ color: 'var(--emerald)', fontWeight: 700 }}>AUC 0.896</span> — ranks a winner above a loser ~90% of the time.
              </span>
              <a href="#/evidence" className="mono" style={{ fontSize: 12, color: 'var(--emerald)', fontWeight: 600 }}>Every number, traceable →</a>
            </div>
          </div>
        </section>

        <section style={{ padding: '80px 0 30px', textAlign: 'center' }}>
          <div className="wrap" style={{ maxWidth: 620 }}>
            <h2 className="display" style={{ fontSize: 'clamp(32px,4.4vw,54px)', marginBottom: 24 }}>Trade with a score you can defend.</h2>
            <a href="#" className="btn-primary cta-early-access-trigger" style={{ padding: '15px 28px', fontSize: 15 }}>Request an Invite →</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default IntelligencePage;
