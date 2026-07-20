import { useIsMobile } from '../hooks';

const CHECK = <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M4 10.5l4 4 8-8.5" stroke="#0FAE72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

// 2026-07-20: bullets trimmed 3 -> 2 per card (the strongest two). Fewer tiny
// lines shortens the section so the fit-page zoom rises and the type reads
// larger — per the "show less, bigger" pass.
const CAPABILITY_CARDS = [
  {
    n: '01', title: 'Explainable AI', desc: 'Every insight is traceable. Every recommendation is explainable.',
    icon: <><circle cx="10" cy="9" r="4.5" /><path d="M6.5 12.5c-1.8.5-3 1.7-3 3.5 M13.5 12.5c1.8.5 3 1.7 3 3.5" /></>,
    bullets: ['Rationale for every output', 'Human-in-the-loop'],
  },
  {
    // Corrected: desc softened ("bank-grade ... compliance" implied certifications we don't hold);
    // "SOC 2 Type II aligned" bullet dropped (unverifiable), replaced with a real, generic-true one.
    n: '02', title: 'Enterprise Security', desc: 'Security built in from day one.',
    icon: <path d="M10 2.5 3.5 5v5c0 4 3 6.6 6.5 7.5 3.5-.9 6.5-3.5 6.5-7.5V5z" />,
    bullets: ['End-to-end encryption', 'Role-based access control'],
  },
  {
    n: '03', title: 'APIs & Integrations', desc: 'Seamlessly integrate with your existing stack and workflows.',
    icon: <path d="M7 6.5 3.5 10 7 13.5 M13 6.5 16.5 10 13 13.5" />,
    bullets: ['REST & WebSocket APIs', 'Plug-and-play SDKs'],
  },
  {
    n: '04', title: 'Audit Trail', desc: 'Complete provenance. Every data point. Every model output.',
    icon: <path d="M5 2.5h7l3.5 3.5v11.5H5z M12 2.5V6h3.5 M7.5 10h5 M7.5 13h5" />,
    bullets: ['Immutable logs', 'Versioned data lineage'],
  },
  {
    // Corrected: dropped "VPC / on-prem ready", "Air-gapped options", "SLA-backed uptime" —
    // all implied infrastructure/contracts that don't exist at private-beta stage.
    n: '05', title: 'Private Deployment', desc: 'Flexible deployment to fit your environment. Your data stays yours.',
    icon: <><rect x="3" y="3" width="14" height="4.2" rx="1.2" /><rect x="3" y="9" width="14" height="4.2" rx="1.2" /><path d="M3 16h14" /></>,
    bullets: ['Cloud, hybrid, or on-prem options', 'Data isolation by design'],
  },
  {
    n: '06', title: 'Continuous Learning', desc: 'Models that evolve with the market. Intelligence that compounds.',
    icon: <path d="M2.5 14.5 7.5 9l3 3 6-6.5 M13 5.5h3.5V9" />,
    bullets: ['Adaptive models', 'Always improving'],
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
  const isMobile = useIsMobile();

  return (
    <section id="prism-trust" data-page="" style={{ position: 'relative', padding: isMobile ? '64px 20px 0' : '52px 44px 44px', background: '#FAFAF8', boxSizing: 'border-box' }}>
      {/* v5 full-width: section owns its gutter (no prism-wrap); grids fill the width */}
      <div>
        <div style={{ textAlign: 'center' }}>
          <div className="prism-pill" style={{ display: 'inline-flex' }}><span className="prism-pill__dot" />THE PLATFORM</div>
          <h2 style={{ margin: '26px 0 0', fontSize: isMobile ? 30 : 46, lineHeight: isMobile ? 1.1 : 1.06, color: '#0B1220' }}>
            Why Institutions Choose <span className="prism-grad-text">CryptoPrism.</span>
          </h2>
          <p style={{ margin: '18px auto 0', maxWidth: 640, fontSize: isMobile ? 15 : 16.5, lineHeight: 1.55, color: '#475467' }}>
            Purpose-built for the highest standards of intelligence, security, and performance &mdash; designed for funds, fintechs, and research teams worldwide.
          </p>
        </div>

        <div className="prism-capability-grid" style={{ width: '100%', margin: isMobile ? '36px auto 0' : '52px auto 0' }}>
          {CAPABILITY_CARDS.map((c) => (
            <div key={c.n} className="prism-card" style={{ padding: isMobile ? '18px 16px' : 26 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0FAE72' }}>{c.n}</div>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: isMobile ? 38 : 46, height: isMobile ? 38 : 46, borderRadius: 12, background: '#F2FAF6', marginTop: 14 }}>
                <svg width={isMobile ? 17 : 21} height={isMobile ? 17 : 21} viewBox="0 0 20 20" fill="none" stroke="#0B8D84" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{c.icon}</svg>
              </span>
              <div style={{ fontSize: isMobile ? 16 : 20, fontWeight: 700, color: '#0B1220', marginTop: isMobile ? 12 : 16 }}>{c.title}</div>
              <div style={{ fontSize: 15, lineHeight: 1.55, color: '#475467', marginTop: 8 }}>{c.desc}</div>
              <div style={{ height: 1, background: '#E7E9EC', margin: '18px 0 14px' }} />
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, color: '#475467' }}>
                {c.bullets.map((b) => (
                  <li key={b} style={{ display: 'flex', gap: 7, alignItems: 'center' }}>{CHECK}{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ width: '100%', margin: isMobile ? '40px auto 0' : '60px auto 0', background: '#0B1220', borderRadius: 24, padding: isMobile ? '28px 22px' : '40px 44px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 9, background: 'rgba(15,174,114,0.15)', flex: 'none' }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="#0FAE72" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2.5 3.5 5v5c0 4 3 6.6 6.5 7.5 3.5-.9 6.5-3.5 6.5-7.5V5z" /></svg>
            </span>
            <div style={{ fontSize: isMobile ? 16.5 : 18, fontWeight: 700, color: '#FFFFFF' }}>Built on Real Data. Backed by Validated Performance.</div>
          </div>
          <div style={{ fontSize: 13.5, color: '#8B96A5', margin: isMobile ? '10px 0 26px' : '10px 0 26px 46px' }}>Model-validated performance. Verified data coverage.</div>

          {!isMobile ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr) auto', gap: 28, alignItems: 'start' }}>
              {REAL_STATS.map((s) => (
                <div key={s.l}>
                  <div style={{ fontSize: 30, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>{s.v}</div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: '#8B96A5', marginTop: 4 }}>{s.l}</div>
                  <div style={{ fontSize: 12, color: '#5B6672', marginTop: 2 }}>{s.s}</div>
                </div>
              ))}
              <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: 28 }}>
                <div style={{ fontSize: 13, color: '#8B96A5', marginBottom: 12 }}>Built for teams at</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '9px 20px', fontSize: 12.5, fontWeight: 600, color: '#C7CDD6', whiteSpace: 'nowrap' }}>
                  {BUILT_FOR.map((b) => <span key={b}>{b}</span>)}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '22px 16px' }}>
                {REAL_STATS.map((s) => (
                  <div key={s.l}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF' }}>{s.v}</div>
                    <div style={{ fontSize: 12, color: '#8B96A5', marginTop: 2 }}>{s.l}</div>
                    <div style={{ fontSize: 10.5, color: '#5B6672', marginTop: 2 }}>{s.s}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: 12, color: '#8B96A5', marginBottom: 10 }}>Built for teams at</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', fontSize: 11.5, fontWeight: 600, color: '#C7CDD6' }}>
                  {BUILT_FOR.map((b) => <span key={b}>{b}</span>)}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
