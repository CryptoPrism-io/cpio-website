import { useState } from 'react';
import { useIsMobile } from '../hooks';

const TRUST_BADGES = ['Private Beta', 'Enterprise Ready', 'AI Native', 'Explainable'];

const FAQ_ITEMS = [
  { q: 'What data does CryptoPrism use?', a: 'We aggregate and normalize thousands of sources—including market data, on-chain metrics, news, social, and macroeconomic data—to deliver a comprehensive and high-quality view of the markets.' },
  { q: 'Is CryptoPrism for retail or institutions?', a: 'CryptoPrism is built for institutions, teams, and serious investors. Our infrastructure, security, and features are designed to meet enterprise-grade requirements.' },
  { q: 'Can I connect CryptoPrism via APIs?', a: 'Yes. We offer REST and WebSocket APIs, real-time data streams, and SDKs so you can integrate CryptoPrism into your existing workflows and products.' },
  { q: 'Is the AI explainable?', a: 'Absolutely. Every insight, score, and recommendation comes with clear rationale, source attribution, and impact analysis—so you always know why something matters.' },
  { q: 'When is the beta available?', a: "We're onboarding select teams now. Request early access to join our private beta and shape the future of crypto intelligence." },
  // Corrected: dropped "SOC 2 Type II-aligned security practices" (unverifiable compliance claim).
  { q: 'How is my data secured?', a: 'We use enterprise-grade encryption and strict access controls to protect your data at every layer.' },
];

export function FinalCtaFaq() {
  const [openIndex, setOpenIndex] = useState(0);
  const isMobile = useIsMobile();

  return (
    <section id="prism-faq" data-page="" style={{ position: 'relative', background: '#050B14', padding: isMobile ? '64px 0 0' : '56px 0 0', marginTop: isMobile ? 56 : 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(900px 600px at 78% 20%, rgba(15,174,114,0.14), rgba(5,11,20,0) 70%)' }} />
      <div className="prism-wrap" style={{ position: 'relative', paddingBottom: isMobile ? 56 : 90 }}>
        <div style={{ maxWidth: 640 }}>
          <h2 style={{ margin: 0, fontSize: isMobile ? 28 : 44, lineHeight: isMobile ? 1.12 : 1.06, color: '#FFFFFF' }}>
            Turn Fragmented Markets Into <span style={{ color: '#34D399' }}>Explainable Intelligence.</span>
          </h2>
          <p style={{ margin: '20px 0 0', fontSize: isMobile ? 15 : 16.5, lineHeight: 1.6, color: '#9AA5B1' }}>
            CryptoPrism is the AI-native intelligence layer that transforms complexity into clarity&mdash;so you can see more, understand deeper, and act with conviction.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, marginTop: 30 }}>
            <button className="prism-btn-gradient cta-early-access-trigger">Request Early Access</button>
            <button className="prism-btn-dark-outline cta-early-access-trigger">Request Demo</button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? '10px 24px' : 34, marginTop: 38 }}>
            {TRUST_BADGES.map((b) => (
              <span key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#9AA5B1' }}>{b}</span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: isMobile ? 56 : 80 }}>
          <div style={{ textAlign: 'center' }}>
            <div className="prism-pill" style={{ display: 'inline-flex', background: 'rgba(15,174,114,0.08)', color: '#34D399' }}><span className="prism-pill__dot" style={{ background: '#34D399' }} />FAQ</div>
            <h3 style={{ margin: '20px 0 0', fontSize: isMobile ? 26 : 36, letterSpacing: '-0.02em', color: '#FFFFFF' }}>Frequently Asked <span style={{ color: '#34D399' }}>Questions.</span></h3>
            <p style={{ margin: '12px 0 0', fontSize: 15, color: '#9AA5B1' }}>Everything you need to know about CryptoPrism.</p>
          </div>

          <div className="prism-grid-2" style={{ maxWidth: 1180, margin: '44px auto 0' }}>
            {FAQ_ITEMS.map((f, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={f.q}
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '20px 22px', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: '#FFFFFF' }}>{f.q}</span>
                    <span style={{ color: '#9AA5B1', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s ease', flex: 'none' }}>&#9660;</span>
                  </div>
                  {isOpen && <div style={{ fontSize: 13.5, lineHeight: 1.6, color: '#9AA5B1', marginTop: 12 }}>{f.a}</div>}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20, maxWidth: 1180, margin: '40px auto 0', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: '22px 28px' }}>
            <span style={{ fontSize: 15.5, fontWeight: 600, color: '#FFFFFF' }}>Ready to see the future of crypto intelligence?</span>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="prism-btn-gradient cta-early-access-trigger" style={{ fontSize: 14, padding: '11px 20px' }}>Request Early Access</button>
              <button className="prism-btn-dark-outline cta-early-access-trigger" style={{ fontSize: 14, padding: '10px 18px' }}>Request Demo</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
