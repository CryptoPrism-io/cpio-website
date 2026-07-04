import React, { useState } from 'react';

interface Tier {
  readonly id: string;
  readonly name: string;
  readonly desc: string;
  readonly price: number;
  readonly priceY?: number;
  readonly alt?: string | null;
  readonly featured?: boolean;
  readonly cta: string;
  readonly ctaIsInvite: boolean;
  readonly features: readonly string[];
}

const TIERS: readonly Tier[] = [
  {
    id: 'free', name: 'Free', desc: 'For curious traders.', price: 0, alt: null,
    cta: 'Request an Invite', ctaIsInvite: true,
    features: ['10 AI queries / day', '24h delayed on-chain data', '3 screener saves · 3 alerts', '10 journal entries / mo', 'Mobile + desktop'],
  },
  {
    id: 'pro', name: 'Pro', desc: 'For serious operators.', price: 29, priceY: 290, alt: '$290 / yr',
    featured: true,
    cta: 'Request an Invite', ctaIsInvite: true,
    features: ['Unlimited AI queries', 'Real-time on-chain (<60s)', 'Unlimited screener saves', '20 alerts · multi-condition', 'Unlimited journal', 'Sheets / Excel plug-in', 'Priority support'],
  },
  {
    id: 'max', name: 'Max', desc: 'For funds & analysts.', price: 99, priceY: 990, alt: '$990 / yr',
    cta: 'Talk to founders', ctaIsInvite: false,
    features: ['Everything in Pro, plus', 'Full API access', 'Unlimited alerts', 'Custom composite formulas', 'Dedicated analyst chat', 'Early alpha features'],
  },
];

export const Pricing: React.FC = () => {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" style={{ padding: '120px 0', position: 'relative' }}>
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="label">CHAPTER 05 &middot; PRICING</span>
          <h2 className="display" style={{ fontSize: 'clamp(36px,5vw,64px)', marginTop: 16 }}>
            Less than one tab.
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text-secondary)', maxWidth: 540, marginInline: 'auto', marginTop: 16 }}>
            Glassnode is $800. CoinGlass is $29. Santiment is $135.{' '}
            <span style={{ color: 'var(--emerald)' }}>CryptoPrism is all of them — for $29.</span>
          </p>

          <div style={{ display: 'inline-flex', marginTop: 32, padding: 4, background: 'rgba(120,110,80,.06)', border: '1px solid rgba(120,110,80,.18)', borderRadius: 999 }}>
            {['Monthly', 'Annual − 17%'].map((l, i) => (
              <button
                key={l}
                onClick={() => setAnnual(i === 1)}
                style={{
                  padding: '8px 18px', fontSize: 13, fontWeight: 600, borderRadius: 999,
                  background: annual === (i === 1) ? 'var(--emerald)' : 'transparent',
                  color: annual === (i === 1) ? '#FFFDF7' : 'var(--text-secondary)',
                  border: 'none', cursor: 'pointer', transition: 'all .2s',
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, alignItems: 'stretch' }}>
          {TIERS.map((t) => {
            const price = annual && t.priceY != null ? Math.round(t.priceY / 12) : t.price;
            return (
              <div
                key={t.id}
                className={t.featured ? 'glass price-pop' : 'glass'}
                style={{
                  padding: 32, position: 'relative',
                  background: t.featured ? 'var(--price-featured-bg)' : 'var(--price-bg)',
                  transform: t.featured ? 'translateY(-12px)' : 'none',
                }}
              >
                {t.featured && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--emerald)', color: '#FFFDF7', fontSize: 10, fontWeight: 700, padding: '4px 12px', borderRadius: 999, letterSpacing: '.12em' }}>
                    MOST POPULAR
                  </div>
                )}
                <div className="label" style={{ marginBottom: 10 }}>{t.name.toUpperCase()}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 18 }}>{t.desc}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                  <span className="display mono" style={{ fontSize: 56 }}>${price}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>/mo</span>
                </div>
                {annual && t.priceY != null && <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>${t.priceY} billed annually</div>}
                {!annual && t.alt && <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>or {t.alt}</div>}

                <button
                  className={`${t.ctaIsInvite ? 'cta-early-access-trigger' : ''} ${t.featured ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ width: '100%', marginTop: 22, marginBottom: 22, justifyContent: 'center' }}
                >
                  {t.cta}
                </button>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {t.features.map((f) => (
                    <li key={f} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0, marginTop: 3 }}>
                        <path d="M2 7.5l3 3 7-7" stroke={t.featured ? '#0A8F5A' : '#0E7490'} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
