import '../../styles/site.css';
import { NavBar, Footer, SectionHead } from './shared';

export function InstitutionalPage() {
  const who = [
    { t: 'Hedge funds & prop desks', d: 'DMV signal feeds and ML ensemble outputs, delivered raw for your own execution stack.', c: '#0ECB81' },
    { t: 'Terminals & data vendors', d: 'License the scored dataset — 1,000+ coins, 130+ indicators — as a drop-in intelligence layer.', c: '#22D3EE' },
    { t: 'Exchanges & fintechs', d: 'White-label the terminal or embed conviction scores directly in your product.', c: '#8B5CF6' },
  ];
  const get: [string, string][] = [
    ['1,000+', 'Coins covered'], ['130+', 'Indicators'], ['DMV', 'Scoring engine'],
    ['FinBERT', 'Sentiment layer'], ['<50ms', 'p99 read latency'], ['REST', 'API delivery'],
  ];
  const moat = [
    { t: 'DMV Scoring IP', d: 'Direction · Magnitude · Volatility fusion — patent planned. AUC 0.896 out-of-sample.' },
    { t: 'Four-engine fusion', d: 'On-chain + derivatives + ML + sentiment in one coherent data core. Nobody else fuses all four.' },
    { t: 'Automated economics', d: '17 automated pipelines run the whole core — margins compound as partners scale.' },
  ];
  return (
    <div className="site-light">
      <NavBar active="institutional" cta="api" />
      <main style={{ paddingTop: 64 }}>
        <section style={{ position: 'relative', padding: '86px 0 60px', overflow: 'hidden' }}>
          <div className="orb" style={{ width: 560, height: 440, top: -140, right: '-4%', background: 'rgba(14,116,144,.14)' }} />
          <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
            <span className="label" style={{ color: 'var(--emerald)' }}>FOR DESKS &amp; FUNDS · B2B API</span>
            <h1 className="display" style={{ fontSize: 'clamp(44px,6.4vw,88px)', margin: '16px 0 22px', maxWidth: 820 }}>
              <span className="line-mask"><span className="line-in" style={{ animationDelay: '.1s' }}>One data core, <span className="grad-text">sold twice.</span></span></span>
            </h1>
            <p style={{ fontSize: 19, color: 'var(--text-secondary)', maxWidth: 560, lineHeight: 1.55, marginBottom: 34 }}>
              The same engine that powers our terminal, delivered as a REST API for funds, exchanges, and research desks.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href="#" className="btn-primary cta-early-access-trigger" style={{ padding: '1rem 1.8rem', fontSize: 15 }}>Get API access →</a>
              <a href="#" className="btn-ghost cta-early-access-trigger" style={{ padding: '1rem 1.5rem', fontSize: 15 }}>Book a call</a>
            </div>
          </div>
        </section>

        <section style={{ padding: '56px 0' }}>
          <div className="wrap">
            <SectionHead eyebrow="WHO IT'S FOR" title="Three ways desks plug in." />
            <div className="g3">
              {who.map((w) => (
                <div key={w.t} className="dark-panel tile" style={{ padding: 28 }}>
                  <span style={{ display: 'block', width: 34, height: 3, borderRadius: 2, background: w.c, marginBottom: 18 }} />
                  <h3 style={{ fontSize: 19, fontWeight: 800, color: '#fff', marginBottom: 10 }}>{w.t}</h3>
                  <p style={{ fontSize: 13, color: 'var(--dk-secondary)', lineHeight: 1.6, margin: 0 }}>{w.d}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic', marginTop: 16 }}>
              Logos illustrate ideal customer profiles — not current customers or endorsements.
            </p>
          </div>
        </section>

        <section style={{ padding: '56px 0', background: 'rgba(232,227,214,.45)' }}>
          <div className="wrap">
            <SectionHead eyebrow="WHAT YOU GET" title="The full scored dataset, over the wire." />
            <div className="g3" style={{ gridTemplateColumns: 'repeat(6,1fr)', maxWidth: 1080 }}>
              {get.map(([v, l]) => (
                <a key={l} href="#/evidence" className="stat-link">
                  <span className="stat-v display mono" style={{ fontSize: 24, display: 'block' }}>{v}</span>
                  <span className="label" style={{ fontSize: 9, marginTop: 5, display: 'block' }}>{l}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '70px 0' }}>
          <div className="wrap">
            <SectionHead eyebrow="WHY US" title="The moat is the fusion." />
            <div className="g3">
              {moat.map((m, i) => (
                <div key={m.t} className="card" style={{ padding: 26, borderTop: '2px solid var(--emerald)' }}>
                  <div className="mono" style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '.18em', marginBottom: 10 }}>0{i + 1}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{m.t}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{m.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '56px 0', background: 'rgba(232,227,214,.45)' }}>
          <div className="wrap">
            <div className="two-col" style={{ alignItems: 'stretch' }}>
              <div className="dark-panel" style={{ padding: 32 }}>
                <span className="label" style={{ color: '#0ECB81' }}>B2B API PRICING</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, margin: '14px 0 6px' }}>
                  <span className="display mono" style={{ fontSize: 44, color: '#fff' }}>₹2L–₹5L</span>
                  <span style={{ color: 'var(--dk-muted)', fontSize: 14 }}>/mo per partner</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--dk-secondary)', margin: '0 0 18px' }}>+ usage. Volume terms at contract.</p>
                <span className="mono" style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '.08em', color: '#0ECB81', border: '1px solid rgba(14,203,129,.35)', background: 'rgba(14,203,129,.08)', padding: '6px 12px', borderRadius: 6 }}>
                  DESIGN-PARTNER PILOTS OPEN NOW
                </span>
              </div>
              <div className="card" style={{ padding: 32 }}>
                <span className="label">TRUST &amp; POSTURE</span>
                <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    'DPDP-ready architecture',
                    'SOC2 readiness in progress',
                    'Source-cited — never advice, never price prediction',
                  ].map((t) => (
                    <li key={t} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--text-secondary)' }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0, marginTop: 2 }}><path d="M3 8.5l3.2 3L13 4.5" stroke="var(--emerald)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: '86px 0 30px', textAlign: 'center' }}>
          <div className="wrap" style={{ maxWidth: 640 }}>
            <h2 className="display" style={{ fontSize: 'clamp(34px,4.6vw,58px)', marginBottom: 24 }}>Put the core behind <span className="grad-text">your desk.</span></h2>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#" className="btn-primary cta-early-access-trigger" style={{ padding: '15px 28px', fontSize: 15 }}>Get API access →</a>
              <a href="#" className="btn-ghost cta-early-access-trigger" style={{ padding: '15px 26px', fontSize: 15 }}>Book a call</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default InstitutionalPage;
