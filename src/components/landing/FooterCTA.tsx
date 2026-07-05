import React from 'react';
import { Logo } from './Logo';

const FOOTER_GROUPS = [
  { h: 'Product', l: ['Screener', 'Token detail', 'Saarthi AI', 'Journal', 'Alerts'] },
  { h: 'Intelligence', l: ['On-chain', 'Derivatives', 'Cross-chain', 'DMV Score', 'Methodology'] },
  { h: 'Resources', l: ['Docs', 'API', 'Changelog', 'Blog', 'Status'] },
  { h: 'Company', l: ['About', 'Pricing', 'Careers', 'Privacy', 'Terms'] },
];

export const FooterCTA: React.FC = () => (
  <section style={{ padding: '120px 0 80px', position: 'relative', overflow: 'hidden' }}>
    <div className="orb" style={{ width: 700, height: 400, top: '20%', left: '50%', transform: 'translateX(-50%)', background: 'rgba(10,143,90,.1)' }} />

    <div className="wrap" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 720 }}>
      <span className="label">EPILOGUE</span>
      <h2 className="display" style={{ fontSize: 'clamp(48px,7vw,88px)', marginTop: 16, marginBottom: 24 }}>
        Stop renting<br />
        <span style={{
          background: 'linear-gradient(120deg,#0A8F5A 0%,#0E7490 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>five terminals.</span>
      </h2>
      <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 480, marginInline: 'auto', marginBottom: 36 }}>
        We're onboarding in small batches to keep the data quality high. Request an invite — we'll reach out.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
        <button className="cta-early-access-trigger btn-primary" style={{ padding: '14px 28px', fontSize: 15 }}>
          Request an Invite &rarr;
        </button>
      </div>
      <div className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '.1em' }}>
        &#9671; INVITE ONLY &middot; &#9671; MOBILE-FIRST &middot; &#9671; YOUR DATA, YOUR EXPORT
      </div>
    </div>

    <div className="wrap" style={{ marginTop: 100, paddingTop: 40, borderTop: '1px solid rgba(120,110,80,.18)' }}>
      <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr', gap: 32 }}>
        <div>
          <Logo />
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 14, lineHeight: 1.55, maxWidth: 280 }}>
            The intelligence layer for crypto traders. Built by operators, for operators.
          </p>
        </div>
        {FOOTER_GROUPS.map((g) => (
          <div key={g.h}>
            <div className="label" style={{ marginBottom: 12 }}>{g.h}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {g.l.map((x) => (
                <li key={x}><a href="#" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{x}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 48, paddingTop: 22, borderTop: '1px solid rgba(120,110,80,.14)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div className="mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>&copy; 2026 CRYPTOPRISM.IO</div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>Trinetry Infotech Pvt Ltd</div>
      </div>
    </div>
  </section>
);

export default FooterCTA;
