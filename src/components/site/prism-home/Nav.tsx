import { scrollToId } from '../hooks';

// v5 nav (CryptoPrism Hero.dc.html v5, lines 35-52).
// 2026-07-20: trimmed to only real destinations (the design's Products/Enterprise/
// Research/Pricing/About/Blog links had no pages — those are orphaned). Links now
// scroll to the homepage sections that exist; Request Demo -> EarlyAccessModal
// (cta-early-access-trigger, via the global click listener in App.tsx); Sign In ->
// app.cryptoprism.io. Add links back when their destination pages get built.
// The fitPages runtime (PrismHome.tsx) width-locks this nav to 1560 and zooms it.

const NAV_LINKS: { label: string; id: string }[] = [
  { label: 'Platform', id: 'prism-platform' },
  { label: 'Why Us', id: 'prism-trust' },
  { label: 'FAQ', id: 'prism-faq' },
];

export function Nav() {
  return (
    <nav className="prism-nav">
      <div className="prism-nav__brand">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
          <path d="M15 2.5 25.8 8.75v12.5L15 27.5 4.2 21.25V8.75Z" stroke="var(--accent)" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M15 10.5 19 17h-8Z" stroke="var(--accent-2)" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        <span className="prism-nav__wordmark">CryptoPrism<span style={{ color: 'var(--accent)' }}>.</span></span>
      </div>
      <div className="prism-nav__links">
        {NAV_LINKS.map((link) => (
          <a key={link.id} onClick={() => scrollToId(link.id)}>{link.label}</a>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        <a href="https://app.cryptoprism.io" style={{ fontSize: 14.5, fontWeight: 500, color: '#475467', cursor: 'pointer' }}>Sign In</a>
        <button
          type="button"
          className="cta-early-access-trigger"
          style={{
            fontFamily: 'inherit', fontSize: 14.5, fontWeight: 600, color: '#FFFFFF',
            background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', border: 'none',
            borderRadius: 16, padding: '11px 22px', cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(15,174,114,0.22)', transition: 'all 0.25s ease',
          }}
        >
          Request Demo
        </button>
      </div>
    </nav>
  );
}
