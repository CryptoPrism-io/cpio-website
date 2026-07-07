import '../../styles/site.css';
import { NavBar, AskPrism, ScreenerDemo, Footer, SectionHead } from './shared';

export function ProductPage() {
  const engines = [
    { n: 'IP Data', c: '#0E7490', d: '17 automated pipelines ingest 1B+ datapoints a day across 6 chains — prices, order flow, on-chain state, derivatives.', out: 'Output: a clean, queryable data core.' },
    { n: 'DMV Scoring', c: '#0A8F5A', d: 'Direction, Magnitude, and Volatility are scored independently per coin, then fused into a single conviction read. AUC 0.896 out-of-sample.', out: 'Output: one number you can defend.' },
    { n: 'ML Signals', c: '#4338CA', d: 'A 6-model ensemble votes on setups, validated out-of-sample against 226 automated trades. Sharpe 7.69.', out: 'Output: ranked, time-stamped signals.' },
    { n: 'Sentiment', c: '#6D28D9', d: 'FinBERT reads 44 news and social sources continuously and tags every claim to its origin.', out: 'Output: sentiment you can audit.' },
  ];
  const queries = [
    'which L1s show whale accumulation with negative funding?',
    'rank my watchlist by DMV, flag anything above 75',
    'what moved SOL in the last 6 hours — with sources',
  ];
  const features = [
    { n: 'Composite Screener', d: 'Filter 1,000+ coins by DMV score, on-chain flows, and funding regime. Save and alert on any view.', c: '#0E7490' },
    { n: 'Cross-Chain Coverage', d: '6 chains · 130+ indicators, unified under one schema — no per-chain tab juggling.', c: '#0A8F5A' },
    { n: 'Composite Alerts', d: '"OI spike + whale outflow + funding inversion" — multi-condition alerts as one trigger.', c: '#B45309' },
    { n: 'Token Detail Pages', d: 'Every coin gets a full desk view: derivatives, on-chain, holder cohorts, cited news.', c: '#6D28D9' },
    { n: 'API & Sheets Plug-in', d: 'Pull DMV scores and the full indicator set into spreadsheets, notebooks, or bots.', c: '#C2410C' },
    { n: 'Mobile-First', d: 'Quick-glance conviction scores and alerts, built for how traders actually check markets.', c: '#4338CA' },
  ];
  return (
    <div className="site-light">
      <NavBar active="product" />
      <main style={{ paddingTop: 64 }}>
        <section style={{ padding: '86px 0 40px' }}>
          <div className="wrap">
            <span className="label" style={{ color: 'var(--emerald)' }}>PRODUCT</span>
            <h1 className="display" style={{ fontSize: 'clamp(42px,6vw,80px)', margin: '16px 0 20px', maxWidth: 860 }}>
              <span className="line-mask"><span className="line-in" style={{ animationDelay: '.1s' }}>Four engines. One terminal.</span></span>
              <span className="line-mask"><span className="line-in grad-text" style={{ animationDelay: '.26s' }}>Ask in English.</span></span>
            </h1>
            <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 620, lineHeight: 1.55, margin: 0 }}>
              On-chain data, DMV scoring, ML signals, and sentiment — fused into one surface you query in plain English.
            </p>
          </div>
        </section>

        <section style={{ padding: '30px 0 60px' }}>
          <div className="wrap">
            <div className="g2">
              {engines.map((e, i) => (
                <div key={e.n} className="card tile" style={{ padding: 30, borderTop: `2px solid ${e.c}` }}>
                  <div className="mono" style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '.18em', marginBottom: 10 }}>ENGINE 0{i + 1}</div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>{e.n}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 12px' }}>{e.d}</p>
                  <span className="mono" style={{ fontSize: 11, fontWeight: 600, color: e.c }}>{e.out}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '30px 0 60px' }}>
          <div className="wrap">
            <SectionHead eyebrow="INSIDE THE TERMINAL · WHAT YOU GET" title="One surface."
              sub="Each capability would be a standalone product elsewhere." />
            <div className="g3">
              {features.map((f) => (
                <div key={f.n} className="card tile" style={{ padding: 26, borderTop: `2px solid ${f.c}` }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{f.n}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '60px 0', background: 'rgba(232,227,214,.45)' }}>
          <div className="wrap">
            <SectionHead eyebrow="ASK PRISM · THE AI ANALYST" title="AI that cites its work."
              sub="A conversational analyst trained on on-chain metrics, derivatives flows, and historical regimes. Every claim ships with a source." />
            <div className="two-col" style={{ gridTemplateColumns: '.8fr 1.2fr' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span className="label">TRY QUERIES LIKE</span>
                {queries.map((q) => (
                  <div key={q} className="card" style={{ padding: '13px 16px', display: 'flex', gap: 10, alignItems: 'baseline' }}>
                    <span className="mono" style={{ color: 'var(--emerald)', fontSize: 13 }}>❯</span>
                    <span className="mono" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{q}</span>
                  </div>
                ))}
              </div>
              <AskPrism />
            </div>
          </div>
        </section>

        <section style={{ padding: '56px 0 0' }}>
          <div className="wrap">
            <a href="#/intelligence" className="gradient-border tile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, padding: '22px 30px', flexWrap: 'wrap' }}>
              <span className="mono" style={{ fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ color: 'var(--text)', fontWeight: 700 }}>Score</span>
                <span style={{ color: 'var(--text-muted)' }}>=</span>
                <span style={{ padding: '3px 10px', borderRadius: 6, background: 'rgba(10,143,90,.1)', border: '1px solid rgba(10,143,90,.3)', color: 'var(--emerald)' }}>Direction</span>
                <span style={{ color: 'var(--text-muted)' }}>+</span>
                <span style={{ padding: '3px 10px', borderRadius: 6, background: 'rgba(14,116,144,.1)', border: '1px solid rgba(14,116,144,.3)', color: 'var(--cyan)' }}>Magnitude</span>
                <span style={{ color: 'var(--text-muted)' }}>+</span>
                <span style={{ padding: '3px 10px', borderRadius: 6, background: 'rgba(109,40,217,.08)', border: '1px solid rgba(109,40,217,.28)', color: 'var(--violet)' }}>Volatility</span>
              </span>
              <span className="mono" style={{ fontSize: 12, color: 'var(--emerald)', fontWeight: 600 }}>How it's scored →</span>
            </a>
          </div>
        </section>

        <section style={{ padding: '56px 0 20px' }}>
          <div className="wrap">
            <SectionHead center eyebrow="LIVE SCREENER" title="Top movers, scored." />
            <ScreenerDemo />
          </div>
        </section>

        <section style={{ padding: '80px 0 30px', textAlign: 'center' }}>
          <div className="wrap" style={{ maxWidth: 620 }}>
            <h2 className="display" style={{ fontSize: 'clamp(32px,4.4vw,54px)', marginBottom: 24 }}>See it with your own coins.</h2>
            <a href="#" className="btn-primary cta-early-access-trigger" style={{ padding: '15px 28px', fontSize: 15 }}>Request an Invite →</a>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 18 }}>
              Running a desk? <a href="#/institutional" style={{ color: 'var(--emerald)', fontWeight: 600 }}>See the API →</a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default ProductPage;
