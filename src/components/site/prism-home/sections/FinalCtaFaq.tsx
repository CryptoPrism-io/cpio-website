// v5 "Final CTA + FAQ" (CryptoPrism Hero.dc.html v5, lines 849-916).
// Dark #050B14 section: left-aligned CTA hero with an animated prism-triangle
// decoration on the right, icon'd trust badges, then a centered FAQ accordion
// and a closing CTA bar. Full-width (section owns its 44px gutter).
// FAQ copy keeps the prior no-dummy-data correction (no SOC 2 claim); the CTAs
// keep the real EarlyAccessModal hook (cta-early-access-trigger).

import { useState } from 'react';
import type { ReactNode } from 'react';
import { useIsMobile } from '../hooks';
import { AuroraBackdrop } from '../AuroraBackdrop';

const TRUST_BADGES: { label: string; icon: ReactNode }[] = [
  { label: 'Private Beta', icon: <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#34D399" strokeWidth="1.5"><rect x="4.5" y="9" width="11" height="8" rx="1.5" /><path d="M6.5 9V6a3.5 3.5 0 0 1 7 0v3" /></svg> },
  { label: 'Enterprise Ready', icon: <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#34D399" strokeWidth="1.5"><path d="M10 2.5 3.5 5v5c0 4 3 6.6 6.5 7.5 3.5-.9 6.5-3.5 6.5-7.5V5z" /></svg> },
  { label: 'AI Native', icon: <svg width="15" height="15" viewBox="0 0 30 30" fill="none" stroke="#34D399" strokeWidth="1.6" strokeLinejoin="round"><path d="M15 2.5 25.8 8.75v12.5L15 27.5 4.2 21.25V8.75Z" /></svg> },
  { label: 'Explainable', icon: <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#34D399" strokeWidth="1.5"><circle cx="10" cy="10" r="7.5" /><path d="M6.8 10.2l2.1 2.1 4.3-4.5" /></svg> },
];

const FAQ_ITEMS = [
  { q: 'What data does CryptoPrism use?', a: 'We aggregate and normalize thousands of sources—including market data, on-chain metrics, news, social, and macroeconomic data—to deliver a comprehensive and high-quality view of the markets.' },
  { q: 'Is CryptoPrism for retail or institutions?', a: 'CryptoPrism is built for institutions, teams, and serious investors. Our infrastructure, security, and features are designed to meet enterprise-grade requirements.' },
  { q: 'Can I connect CryptoPrism via APIs?', a: 'Yes. We offer REST and WebSocket APIs, real-time data streams, and SDKs so you can integrate CryptoPrism into your existing workflows and products.' },
  { q: 'Is the AI explainable?', a: 'Absolutely. Every insight, score, and recommendation comes with clear rationale, source attribution, and impact analysis—so you always know why something matters.' },
  { q: 'When is the beta available?', a: "We're onboarding select teams now. Request early access to join our private beta and shape the future of crypto intelligence." },
  // Corrected: dropped "SOC 2 Type II-aligned security practices" (unverifiable compliance claim).
  { q: 'How is my data secured?', a: 'We use enterprise-grade encryption and strict access controls to protect your data at every layer.' },
];

// animated prism-triangle decoration (design lines 852-867) — hidden ≤900px
function PrismDecoration() {
  return (
    <div className="prism-hide-mobile" style={{ position: 'absolute', right: 0, top: -30, width: 460, height: 400, pointerEvents: 'none' }}>
      <svg width="460" height="400" viewBox="0 0 460 400" fill="none">
        <g stroke="rgba(52,211,153,0.35)" strokeWidth="1" strokeLinejoin="round">
          <path d="M230 30 L360 210 L230 340 L100 210 Z" />
          <path d="M230 30 L230 340 M100 210 L360 210" />
          <path d="M230 30 L165 210 L230 340 M230 30 L295 210 L230 340" stroke="rgba(52,211,153,0.18)" />
        </g>
        <circle cx="230" cy="30" r="3" fill="#34D399" />
        <circle cx="100" cy="210" r="2.4" fill="rgba(52,211,153,0.6)" />
        <circle cx="360" cy="210" r="2.4" fill="rgba(52,211,153,0.6)" />
        <circle cx="230" cy="340" r="2.4" fill="rgba(52,211,153,0.6)" />
        <circle r="2.2" fill="#34D399"><animateMotion dur="7s" repeatCount="indefinite" path="M230,30 L360,210 L230,340 L100,210 Z" /></circle>
        <circle r="2.2" fill="#34D399" opacity="0.7"><animateMotion dur="7s" begin="-3.5s" repeatCount="indefinite" path="M230,30 L360,210 L230,340 L100,210 Z" /></circle>
      </svg>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(260px 220px at 50% 48%, rgba(52,211,153,0.10), transparent 70%)' }} />
    </div>
  );
}

export function FinalCtaFaq() {
  const [openIndex, setOpenIndex] = useState(0);
  const isMobile = useIsMobile();

  return (
    <section id="prism-faq" data-page="" style={{ position: 'relative', background: '#050B14', padding: isMobile ? '64px 20px 0' : '56px 44px 0', marginTop: isMobile ? 56 : 0, overflow: 'hidden', boxSizing: 'border-box' }}>
      {/* same particle + wave backdrop as the hero (2026-07-22) */}
      <AuroraBackdrop />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(900px 600px at 78% 20%, rgba(15,174,114,0.14), rgba(5,11,20,0) 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', width: '100%', paddingBottom: isMobile ? 56 : 90 }}>
        {!isMobile && <PrismDecoration />}
        <div style={{ maxWidth: 640, position: 'relative' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', margin: 0, fontSize: isMobile ? 28 : 52, lineHeight: 1.06, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
            Turn Fragmented Markets Into <span style={{ color: '#34D399' }}>Explainable Intelligence.</span>
          </h2>
          <p style={{ margin: '20px 0 0', fontSize: isMobile ? 15 : 16.5, lineHeight: 1.6, color: '#9AA5B1' }}>
            CryptoPrism is the AI-native intelligence layer that transforms complexity into clarity&mdash;so you can see more, understand deeper, and act with conviction.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, marginTop: 30 }}>
            <button className="prism-btn-gradient cta-early-access-trigger" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              Launch Beta
              <svg width="15" height="13" viewBox="0 0 16 14" fill="none"><path d="M1 7h13M9.5 1.8 14.7 7l-5.2 5.2" stroke="#FFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button className="prism-btn-dark-outline cta-early-access-trigger" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              Request Demo
              <svg width="15" height="13" viewBox="0 0 16 14" fill="none"><path d="M1 7h13M9.5 1.8 14.7 7l-5.2 5.2" stroke="#FFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? '10px 24px' : 34, marginTop: 38 }}>
            {TRUST_BADGES.map((b) => (
              <span key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#9AA5B1' }}>{b.icon}{b.label}</span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: isMobile ? 56 : 80 }}>
          <div style={{ textAlign: 'center' }}>
            <div className="prism-pill" style={{ display: 'inline-flex', background: 'rgba(15,174,114,0.08)', color: '#34D399' }}><span className="prism-pill__dot" style={{ background: '#34D399' }} />FAQ</div>
            {/* matched to the CTA heading above (same size + line-height) */}
            <h3 style={{ fontFamily: 'var(--font-heading)', margin: '20px 0 0', fontSize: isMobile ? 28 : 52, lineHeight: 1.06, letterSpacing: '-0.02em', color: '#FFFFFF' }}>Frequently Asked <span style={{ color: '#34D399' }}>Questions.</span></h3>
            <p style={{ margin: '16px 0 0', fontSize: isMobile ? 15 : 16.5, lineHeight: 1.6, color: '#9AA5B1' }}>Everything you need to know about CryptoPrism.</p>
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
                    <span style={{ fontSize: isMobile ? 15 : 16.5, fontWeight: 700, color: '#FFFFFF' }}>{f.q}</span>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="#9AA5B1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s ease' }}><path d="M4 7l6 6 6-6" /></svg>
                  </div>
                  {isOpen && <div style={{ fontSize: isMobile ? 13.5 : 15, lineHeight: 1.65, color: '#9AA5B1', marginTop: 12 }}>{f.a}</div>}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20, maxWidth: 1180, margin: '40px auto 0', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: '22px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" style={{ flex: 'none' }}><path d="M15 2.5 25.8 8.75v12.5L15 27.5 4.2 21.25V8.75Z" stroke="#34D399" strokeWidth="1.8" strokeLinejoin="round" /></svg>
              <span style={{ fontSize: 15.5, fontWeight: 600, color: '#FFFFFF' }}>Ready to see the future of crypto intelligence?</span>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="prism-btn-gradient cta-early-access-trigger" style={{ fontSize: 14, padding: '11px 20px' }}>Launch Beta</button>
              <button className="prism-btn-dark-outline cta-early-access-trigger" style={{ fontSize: 14, padding: '10px 18px' }}>Request Demo</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
