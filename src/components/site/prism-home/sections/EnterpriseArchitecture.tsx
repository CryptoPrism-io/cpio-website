// v5 "Enterprise Architecture" (CryptoPrism Hero.dc.html v5, lines 748-817).
// Full-width v5 fit-page section: centered browser-frame architecture card
// (max 1120) with two absolute side-card columns (±260), icon tiles, dark
// intelligence layer, down-arrow connectors, and a closing CTA block.

import type { ReactNode } from 'react';

type IconCard = { title: string; body: string; icon: ReactNode };

// 4 supporting feature cards — a full-width row under the architecture diagram
// (previously two absolute columns flanking a capped card; now the diagram
// fills the width and these sit below it as an even 4-across strip)
const FEATURE_CARDS: IconCard[] = [
  { title: 'Secure by Design', body: 'Enterprise-grade security, encryption and access controls at every layer.', icon: <path d="M10 2.5 3.5 5v5c0 4 3 6.6 6.5 7.5 3.5-.9 6.5-3.5 6.5-7.5V5z M7.2 10l2 2 3.6-3.8" /> },
  { title: 'Unified Data Layer', body: 'All critical data sources normalized, validated and continuously updated.', icon: <><ellipse cx="10" cy="5" rx="6.5" ry="2.3" /><path d="M3.5 5v10c0 1.3 2.9 2.3 6.5 2.3s6.5-1 6.5-2.3V5 M3.5 10c0 1.3 2.9 2.3 6.5 2.3s6.5-1 6.5-2.3" /></> },
  { title: 'Built for Integration', body: 'APIs, webhooks and streams that plug into your existing infrastructure.', icon: <path d="M10 2.5v4 M10 13.5v4 M2.5 10h4 M13.5 10h4 M5.5 5.5l2.7 2.7 M11.8 11.8l2.7 2.7 M14.5 5.5l-2.7 2.7 M8.2 11.8l-2.7 2.7" /> },
  { title: 'Enterprise Ready', body: 'Scalable, reliable and built to meet the standards of the most demanding teams.', icon: <><circle cx="10" cy="10" r="7.5" /><path d="M6.8 10.2l2.1 2.1 4.3-4.5" /></> },
];

const WHO_ITS_FOR: { label: string; icon: ReactNode }[] = [
  { label: 'Hedge Funds', icon: <path d="M3 9.5 10 4l7 5.5 M5 10v6 M9.5 10v6 M14.5 10v6 M3 16h14" /> },
  { label: 'Asset Managers', icon: <><circle cx="10" cy="10" r="7.5" /><path d="M10 2.5v7.5l6 3" /></> },
  { label: 'Fintech Platforms', icon: <path d="M7 6.5 3.5 10 7 13.5 M13 6.5 16.5 10 13 13.5" /> },
  { label: 'Exchanges', icon: <path d="M3 7h14 M3 13h14 M13 4l4 3-4 3 M7 10l-4 3 4 3" /> },
  { label: 'Research Teams', icon: <><circle cx="7" cy="7.5" r="2.6" /><path d="M2.5 16c.5-2.6 2.3-4 4.5-4s4 1.4 4.5 4 M13 8a2.6 2.6 0 0 0 0-5.2 M14.5 11.5c1.3.6 2.2 1.8 2.5 3.8" /></> },
  { label: 'Family Offices', icon: <path d="M3 9.5 10 4l7 5.5v6.5H3z M8 16v-4h4v4" /> },
];

const ENGINES: { title: string; body: string; icon: ReactNode }[] = [
  { title: 'Market Intelligence Engine', body: 'Prices, volume, liquidity, market structure', icon: <path d="M4 16V11 M8 16V8 M12 16V10.5 M16 16V5" /> },
  { title: 'On-Chain Intelligence Engine', body: 'Wallets, flows, network health', icon: <path d="M10 2.5 16 6v8l-6 3.5L4 14V6z M10 9.8V17.5 M4 6l6 3.8 6-3.8" /> },
  { title: 'Sentiment Intelligence Engine', body: 'News, social, NLP, sentiment scoring', icon: <><circle cx="10" cy="10" r="7.5" /><path d="M7 8h.01 M13 8h.01 M6.8 12c.9 1.1 2 1.7 3.2 1.7s2.3-.6 3.2-1.7" /></> },
  { title: 'Macro & Economic Engine', body: 'Macro data, events, policy, indicators', icon: <><circle cx="10" cy="10" r="7.5" /><path d="M2.5 10h15 M10 2.5c-2.5 2.2-2.5 12.8 0 15 M10 2.5c2.5 2.2 2.5 12.8 0 15" /></> },
];

function FeatureCard({ title, body, icon }: IconCard) {
  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #E7E9EC', borderRadius: 16, padding: 18 }}>
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 9, background: '#F2FAF6' }}>
        <svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="var(--accent-2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
      </span>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#0B1220', marginTop: 12 }}>{title}</div>
      <div style={{ fontSize: 12, lineHeight: 1.5, color: '#475467', marginTop: 5 }}>{body}</div>
    </div>
  );
}

function ArrowRow() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 40, margin: '6px 0' }}>
      {Array.from({ length: 6 }, (_, i) => (
        <span key={i} style={{ color: 'var(--accent)', fontSize: 12 }}>↓</span>
      ))}
    </div>
  );
}

export function EnterpriseArchitecture() {
  return (
    <section id="prism-enterprise" data-page="" style={{ position: 'relative', padding: '52px 44px 44px', background: '#FAFAF8', boxSizing: 'border-box' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="prism-pill" style={{ display: 'inline-flex' }}><span className="prism-pill__dot" />THE PLATFORM</div>
        <h2 className="prism-arch-title" style={{ fontFamily: 'var(--font-heading)', margin: '26px 0 0', lineHeight: 1.06, color: '#0B1220' }}>
          Enterprise Infrastructure.<br /><span className="prism-grad-text">Built for the Real World.</span>
        </h2>
        <p style={{ margin: '18px auto 0', maxWidth: 620, fontSize: 16.5, lineHeight: 1.55, color: '#475467' }}>
          CryptoPrism unifies fragmented data, AI engines, and enterprise workflows into a secure, scalable intelligence infrastructure.
        </p>
      </div>

      <div style={{ width: '100%', margin: '44px auto 0' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #E7E9EC', borderRadius: 22, boxShadow: '0 24px 60px rgba(11,18,32,0.08)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '12px 16px', borderBottom: '1px solid #E7E9EC' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ED6A5E' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F4BF4F' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#61C554' }} />
          </div>
          <div style={{ padding: '28px 30px', boxSizing: 'border-box' }}>
            <div style={{ fontSize: 19, fontWeight: 700, color: '#0B1220' }}>The CryptoPrism Enterprise Architecture</div>
            <div style={{ fontSize: 13.5, color: '#475467', marginTop: 4 }}>One intelligence layer. Infinite possibilities.</div>

            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: '#98A2B3', marginTop: 24 }}>WHO IT&rsquo;S FOR</div>
            <div className="prism-arch-grid-6" style={{ marginTop: 12 }}>
              {WHO_ITS_FOR.map((w) => (
                <div key={w.label} style={{ border: '1px solid #E7E9EC', borderRadius: 12, padding: '16px 8px', textAlign: 'center' }}>
                  <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="#0B1220" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}>{w.icon}</svg>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0B1220', marginTop: 9 }}>{w.label}</div>
                </div>
              ))}
            </div>

            <ArrowRow />

            <div style={{ background: '#0B1220', borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: '#7FE0BE' }}>CRYPTOPRISM INTELLIGENCE LAYER</div>
              <div className="prism-arch-grid-4" style={{ marginTop: 12 }}>
                {ENGINES.map((e) => (
                  <div key={e.title} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 16 }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{e.icon}</svg>
                    <div style={{ fontSize: 14.5, fontWeight: 700, color: '#FFFFFF', marginTop: 11 }}>{e.title}</div>
                    <div style={{ fontSize: 12.5, color: '#8B96A5', marginTop: 5, lineHeight: 1.45 }}>{e.body}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, background: 'rgba(15,174,114,0.12)', border: '1px solid rgba(15,174,114,0.3)', borderRadius: 10, padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#7FE0BE', textAlign: 'center' }}>
                Knowledge Graph + Entity Resolution + Cross-Source Correlation
              </div>
            </div>
            {/* "Unified Data Foundation" row removed 2026-07-20: it repeated
                Screen 2's data inputs and carried the tiniest (8.5px) labels.
                Cutting it shortens the card so the fit-page zoom rises. */}
          </div>
        </div>
      </div>

      <div className="prism-arch-grid-4" style={{ width: '100%', margin: '20px auto 0' }}>
        {FEATURE_CARDS.map((c) => <FeatureCard key={c.title} {...c} />)}
      </div>

      <div style={{ maxWidth: 700, margin: '44px auto 0', textAlign: 'center' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#0B1220' }}>Institutional-grade infrastructure powering institutional decisions.</div>
        <p style={{ margin: '12px 0 0', fontSize: 15, lineHeight: 1.55, color: '#475467' }}>
          From raw data to real-world actions&mdash;CryptoPrism provides the foundation enterprises build their edge on.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 26 }}>
          <button type="button" style={{ fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: '#FFFFFF', background: '#0B1220', border: 'none', borderRadius: 14, padding: '14px 26px', cursor: 'pointer' }}>Explore Enterprise Solutions</button>
          <button type="button" style={{ fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: '#0B1220', background: '#FFFFFF', border: '1px solid #E7E9EC', borderRadius: 14, padding: '13px 24px', cursor: 'pointer' }}>Talk to Our Team</button>
        </div>
      </div>
    </section>
  );
}
