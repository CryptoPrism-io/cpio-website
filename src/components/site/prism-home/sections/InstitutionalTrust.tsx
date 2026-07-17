const CAPABILITY_CARDS = [
  {
    n: '01', title: 'Explainable AI', desc: 'Every insight is traceable. Every recommendation is explainable.',
    bullets: ['Transparent models', 'Rationale for every output', 'Human-in-the-loop'],
  },
  {
    // Corrected: desc softened ("bank-grade ... compliance" implied certifications we don't hold);
    // "SOC 2 Type II aligned" bullet dropped (unverifiable), replaced with a real, generic-true one.
    n: '02', title: 'Enterprise Security', desc: 'Security built in from day one.',
    bullets: ['End-to-end encryption', 'Role-based access control', 'Secure credential handling'],
  },
  {
    n: '03', title: 'APIs & Integrations', desc: 'Seamlessly integrate with your existing stack and workflows.',
    bullets: ['REST & WebSocket APIs', 'Real-time data streams', 'Plug-and-play SDKs'],
  },
  {
    n: '04', title: 'Audit Trail', desc: 'Complete provenance. Every data point. Every model output.',
    bullets: ['Immutable logs', 'Versioned data lineage', 'Full audit transparency'],
  },
  {
    // Corrected: dropped "VPC / on-prem ready", "Air-gapped options", "SLA-backed uptime" —
    // all implied infrastructure/contracts that don't exist at private-beta stage.
    n: '05', title: 'Private Deployment', desc: 'Flexible deployment to fit your environment. Your data stays yours.',
    bullets: ['Cloud, hybrid, or on-prem options', 'Data isolation by design', 'Built to scale with you'],
  },
  {
    n: '06', title: 'Continuous Learning', desc: 'Models that evolve with the market. Intelligence that compounds.',
    bullets: ['Adaptive models', 'Feedback loop', 'Always improving'],
  },
];

// Corrected: replaces the source's fabricated 99.9%-uptime / 256-bit / 50B+ / 100+-countries /
// "Institutional Grade" stats with CryptoPrism's real, verified metrics
// (docs_revamp/02-market-primer-notes.md).
const REAL_STATS = [
  { v: '130+', l: 'Indicators Tracked', s: 'Technical, on-chain & sentiment signals' },
  { v: '1,000+', l: 'Coins Covered', s: 'Across major digital assets' },
  { v: '6', l: 'Blockchains Unified', s: 'Cross-chain on-chain intelligence' },
  { v: '44', l: 'News & Social Sources', s: 'Aggregated & sentiment-scored' },
  { v: '0.896 AUC', l: 'DMV Score Model', s: 'Direction · Magnitude · Volatility' },
];

// Corrected: "Trusted by teams at [industries]" implied existing paying clients — reframed as
// target audience, matching the Trust Bar section's same fix.
const BUILT_FOR = ['Hedge Funds', 'Fintechs', 'Exchanges', 'Family Offices', 'Research Firms', 'Asset Managers'];

export function InstitutionalTrust() {
  return (
    <section style={{ position: 'relative', padding: '110px 0 0', background: '#FAFAF8' }}>
      <div className="prism-wrap">
        <div style={{ textAlign: 'center' }}>
          <div className="prism-pill" style={{ display: 'inline-flex' }}><span className="prism-pill__dot" />THE PLATFORM</div>
          <h2 style={{ margin: '26px 0 0', fontSize: 46, lineHeight: 1.06, color: '#0B1220' }}>
            Why Institutions Choose <span className="prism-grad-text">CryptoPrism.</span>
          </h2>
          <p style={{ margin: '18px auto 0', maxWidth: 640, fontSize: 16.5, lineHeight: 1.55, color: '#475467' }}>
            Purpose-built for the highest standards of intelligence, security, and performance &mdash; designed for funds, fintechs, and research teams worldwide.
          </p>
        </div>

        <div className="prism-grid-3" style={{ maxWidth: 1472, margin: '52px auto 0' }}>
          {CAPABILITY_CARDS.map((c) => (
            <div key={c.n} className="prism-card" style={{ padding: 26 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0FAE72' }}>{c.n}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#0B1220', marginTop: 16 }}>{c.title}</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.55, color: '#475467', marginTop: 8 }}>{c.desc}</div>
              <div style={{ height: 1, background: '#E7E9EC', margin: '18px 0 14px' }} />
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12.5, color: '#475467' }}>
                {c.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ maxWidth: 1472, margin: '60px auto 0', background: '#0B1220', borderRadius: 24, padding: '40px 44px', boxSizing: 'border-box' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF' }}>Built on Real Data. Backed by Validated Performance.</div>
          <div style={{ fontSize: 13.5, color: '#8B96A5', margin: '10px 0 26px' }}>Model-validated performance. Verified data coverage.</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr) auto', gap: 28, alignItems: 'start' }} className="prism-stats-grid">
            {REAL_STATS.map((s) => (
              <div key={s.l}>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#FFFFFF' }}>{s.v}</div>
                <div style={{ fontSize: 12, color: '#8B96A5', marginTop: 2 }}>{s.l}</div>
                <div style={{ fontSize: 10.5, color: '#5B6672', marginTop: 2 }}>{s.s}</div>
              </div>
            ))}
            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: 28 }}>
              <div style={{ fontSize: 12, color: '#8B96A5', marginBottom: 12 }}>Built for teams at</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px', fontSize: 11.5, fontWeight: 600, color: '#C7CDD6', whiteSpace: 'nowrap' }}>
                {BUILT_FOR.map((b) => <span key={b}>{b}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
