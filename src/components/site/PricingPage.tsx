import { useState } from 'react';
import '../../styles/site.css';
import { NavBar, Footer } from './shared';

type Region = 'india' | 'us' | 'ppp';

export function PricingPage() {
  const [region, setRegion] = useState<Region>('india');
  const regions: { id: Region; label: string }[] = [
    { id: 'india', label: 'India · ₹' },
    { id: 'us', label: 'US / EU · $' },
    { id: 'ppp', label: 'Emerging · PPP' },
  ];
  const tiers: { n: string; tag?: string; india: string; us: string; ppp: string; d: string; featured?: boolean; feats: string[] }[] = [
    { n: 'Lite', india: '₹99', us: '$4', ppp: '$1.50', d: 'Scores, screeners, and daily briefs for casual traders.', feats: ['DMV scores on 1,000+ coins', 'Core screener', 'Daily market brief'] },
    { n: 'Pro', tag: 'CORE', india: '₹499', us: '$29', ppp: '$12', d: 'The full terminal for serious operators.', featured: true, feats: ['Everything in Lite', 'Natural-language terminal', 'Full 130+ indicator set', 'Signal alerts', 'News with sources (44 feeds)'] },
    { n: 'Inst-Lite', india: '₹999', us: '$99', ppp: '$35', d: 'For power users who want raw depth.', feats: ['Everything in Pro', 'Raw score components', 'Export & sheets access', 'Priority support'] },
  ];
  const b2b: Record<Region, string> = { india: '₹2L–₹5L/mo', us: '$49 +usage', ppp: '$15 +usage' };
  return (
    <div className="site-light">
      <NavBar active="pricing" />
      <main style={{ paddingTop: 64 }}>
        <section style={{ padding: '86px 0 30px', textAlign: 'center' }}>
          <div className="wrap">
            <span className="label" style={{ color: 'var(--emerald)' }}>PRICING · REGION-AWARE</span>
            <h1 className="display" style={{ fontSize: 'clamp(42px,6vw,76px)', margin: '16px 0 18px' }}><span className="line-mask"><span className="line-in" style={{ animationDelay: '.1s' }}>Priced for where <span className="grad-text">you trade from.</span></span></span></h1>
            <div style={{ display: 'inline-flex', marginTop: 18, padding: 4, background: 'rgba(255,255,255,.6)', border: '1px solid rgba(120,110,80,.25)', borderRadius: 999 }}>
              {regions.map((r) => (
                <button key={r.id} onClick={() => setRegion(r.id)} style={{
                  padding: '9px 18px', fontSize: 13, fontWeight: 600, borderRadius: 999, border: 'none', cursor: 'pointer', transition: 'all .2s',
                  background: region === r.id ? 'var(--emerald)' : 'transparent',
                  color: region === r.id ? '#FFFDF7' : 'var(--text-secondary)',
                }}>{r.label}</button>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '30px 0 40px' }}>
          <div className="wrap">
            <div className="g3" style={{ alignItems: 'stretch', maxWidth: 1080, margin: '0 auto' }}>
              {tiers.map((t) => (
                <div key={t.n} className={t.featured ? 'gradient-border' : 'card'} style={{ padding: 30, position: 'relative', transform: t.featured ? 'translateY(-10px)' : 'none' }}>
                  {t.featured ? (
                    <span style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--emerald)', color: '#FFFDF7', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 999, letterSpacing: '.12em', whiteSpace: 'nowrap' }}>CORE · MOST POPULAR</span>
                  ) : null}
                  <div className="label" style={{ marginBottom: 8 }}>{t.n.toUpperCase()}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, minHeight: 34 }}>{t.d}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 20 }}>
                    <span className="display mono" style={{ fontSize: 46, color: t.featured ? 'var(--emerald)' : 'var(--text)' }}>{t[region]}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>/mo</span>
                  </div>
                  <a href="#" className={(t.featured ? 'btn-primary' : 'btn-ghost') + ' cta-early-access-trigger'} style={{ width: '100%', justifyContent: 'center', marginBottom: 20, display: 'inline-flex' }}>
                    Request an Invite
                  </a>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {t.feats.map((f) => (
                      <li key={f} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--text-secondary)' }}>
                        <svg width="14" height="14" viewBox="0 0 16 16" style={{ flexShrink: 0, marginTop: 3 }}><path d="M3 8.5l3.2 3L13 4.5" stroke="var(--emerald)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <a href="#/institutional" className="dark-panel tile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '22px 30px', maxWidth: 1080, margin: '30px auto 0', flexWrap: 'wrap' }}>
              <div>
                <span className="label" style={{ color: '#22D3EE' }}>B2B API · FOR DESKS &amp; FUNDS</span>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginTop: 6 }}>Signal feeds, white-label, data-as-a-service.</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <span className="display mono" style={{ fontSize: 26, color: '#0ECB81' }}>{b2b[region]}</span>
                <span className="mono" style={{ fontSize: 12, color: '#22D3EE', fontWeight: 600 }}>Learn more →</span>
              </div>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default PricingPage;
