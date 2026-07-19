const SIDE_CARDS_LEFT = [
  { title: 'Secure by Design', body: 'Enterprise-grade security, encryption and access controls at every layer.' },
  { title: 'Unified Data Layer', body: 'All critical data sources normalized, validated and continuously updated.' },
];
const SIDE_CARDS_RIGHT = [
  { title: 'Built for Integration', body: 'APIs, webhooks and streams that plug into your existing infrastructure.' },
  { title: 'Enterprise Ready', body: 'Scalable, reliable and built to meet the standards of the most demanding teams.' },
];
const WHO_ITS_FOR = ['Hedge Funds', 'Asset Managers', 'Fintech Platforms', 'Exchanges', 'Research Teams', 'Family Offices'];
const INTELLIGENCE_ENGINES = [
  { title: 'Market Intelligence Engine', body: 'Prices, volume, liquidity, market structure' },
  { title: 'On-Chain Intelligence Engine', body: 'Wallets, flows, network health' },
  { title: 'Sentiment Intelligence Engine', body: 'News, social, NLP, sentiment scoring' },
  { title: 'Macro & Economic Engine', body: 'Macro data, events, policy, indicators' },
];
const DATA_FOUNDATION = [
  { title: 'Market Data', body: 'Exchanges, order books' },
  { title: 'On-Chain Data', body: 'Chains, contracts, wallets' },
  { title: 'News & Social', body: 'Newswires, blogs, X' },
  { title: 'Macro Data', body: 'Rates, FX, commodities' },
  { title: 'Alternative Data', body: 'Satellite, web signals' },
  { title: 'Partner Data', body: 'APIs, premium datasets' },
];

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="prism-card" style={{ padding: 18, marginBottom: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#0B1220', marginTop: 12 }}>{title}</div>
      <div style={{ fontSize: 12, lineHeight: 1.5, color: '#475467', marginTop: 5 }}>{body}</div>
    </div>
  );
}

export function EnterpriseArchitecture() {
  return (
    <section id="prism-enterprise" data-page="" style={{ position: 'relative', padding: '52px 0 44px', background: '#FAFAF8' }}>
      <div className="prism-wrap">
        <div style={{ textAlign: 'center' }}>
          <div className="prism-pill" style={{ display: 'inline-flex' }}><span className="prism-pill__dot" />THE PLATFORM</div>
          <h2 className="prism-arch-title" style={{ margin: '26px 0 0', lineHeight: 1.06, color: '#0B1220' }}>
            Enterprise Infrastructure.<br /><span className="prism-grad-text">Built for the Real World.</span>
          </h2>
          <p style={{ margin: '18px auto 0', maxWidth: 620, fontSize: 16.5, lineHeight: 1.55, color: '#475467' }}>
            CryptoPrism unifies fragmented data, AI engines, and enterprise workflows into a secure, scalable intelligence infrastructure.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, maxWidth: 1120, margin: '56px auto 0', alignItems: 'flex-start' }}>
          <div className="prism-arch-side">{SIDE_CARDS_LEFT.map((c) => <InfoCard key={c.title} {...c} />)}</div>

          <div className="prism-card" style={{ flex: 1, borderRadius: 22, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '12px 16px', borderBottom: '1px solid #E7E9EC' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ED6A5E' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F4BF4F' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#61C554' }} />
            </div>
            <div style={{ padding: '28px 30px', boxSizing: 'border-box' }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#0B1220' }}>The CryptoPrism Enterprise Architecture</div>
              <div style={{ fontSize: 12.5, color: '#475467', marginTop: 3 }}>One intelligence layer. Infinite possibilities.</div>

              <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', color: '#98A2B3', marginTop: 22 }}>WHO IT&rsquo;S FOR</div>
              <div className="prism-arch-grid-6" style={{ marginTop: 10 }}>
                {WHO_ITS_FOR.map((w) => (
                  <div key={w} style={{ border: '1px solid #E7E9EC', borderRadius: 12, padding: '14px 8px', textAlign: 'center', fontSize: 11, fontWeight: 600, color: '#0B1220' }}>{w}</div>
                ))}
              </div>

              <div style={{ background: '#0B1220', borderRadius: 16, padding: 18, marginTop: 16 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', color: '#7FE0BE' }}>CRYPTOPRISM INTELLIGENCE LAYER</div>
                <div className="prism-arch-grid-4" style={{ marginTop: 10 }}>
                  {INTELLIGENCE_ENGINES.map((e) => (
                    <div key={e.title} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 14 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: '#FFFFFF' }}>{e.title}</div>
                      <div style={{ fontSize: 11, color: '#8B96A5', marginTop: 4 }}>{e.body}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 10, background: 'rgba(15,174,114,0.12)', border: '1px solid rgba(15,174,114,0.3)', borderRadius: 10, padding: '10px 14px', fontSize: 12, fontWeight: 600, color: '#7FE0BE', textAlign: 'center' }}>
                  Knowledge Graph + Entity Resolution + Cross-Source Correlation
                </div>
              </div>

              <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', color: '#98A2B3', marginTop: 16 }}>UNIFIED DATA FOUNDATION</div>
              <div className="prism-arch-grid-6" style={{ marginTop: 10 }}>
                {DATA_FOUNDATION.map((d) => (
                  <div key={d.title} style={{ border: '1px solid #E7E9EC', borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#0B1220' }}>{d.title}</div>
                    <div style={{ fontSize: 9.5, color: '#98A2B3', marginTop: 4, lineHeight: 1.4 }}>{d.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="prism-arch-side">{SIDE_CARDS_RIGHT.map((c) => <InfoCard key={c.title} {...c} />)}</div>
        </div>

        <div style={{ maxWidth: 700, margin: '50px auto 0', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#0B1220' }}>Institutional-grade infrastructure powering institutional decisions.</div>
          <p style={{ margin: '12px 0 0', fontSize: 15, lineHeight: 1.55, color: '#475467' }}>
            From raw data to real-world actions&mdash;CryptoPrism provides the foundation enterprises build their edge on.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 26 }}>
            <button className="prism-btn-primary cta-early-access-trigger">Explore Enterprise Solutions</button>
            <button className="prism-btn-ghost cta-early-access-trigger">Talk to Our Team</button>
          </div>
        </div>
      </div>
    </section>
  );
}
