// Professional multi-column site footer (2026-07-21). Dark, brand-consistent,
// with product/company/resources/legal backlinks, social links, and the legal
// disclaimer bar. Company links (Careers/Blog/News/About) are real hash routes;
// product links deep-scroll to homepage sections (navigating home first if the
// visitor is on another page). Resources/legal point to placeholder routes.

import { useIsMobile } from './hooks';

const ACCENT = '#0FAE72';

type Col = { title: string; links: { label: string; href?: string; section?: string }[] };

const COLUMNS: Col[] = [
  {
    title: 'Product',
    links: [
      { label: 'Platform', section: 'prism-platform' },
      { label: 'Why Us', section: 'prism-trust' },
      { label: 'AI Screener', section: 'prism-platform' },
      { label: 'Analytics', section: 'prism-platform' },
      { label: 'FAQ', section: 'prism-faq' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#/about' },
      { label: 'Careers', href: '#/careers' },
      { label: 'Blog', href: '#/blog' },
      { label: 'News', href: '#/news' },
      { label: 'Contact', href: 'mailto:hello@cryptoprism.io' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#/blog' },
      { label: 'API Reference', href: '#/blog' },
      { label: 'Help Center', href: '#/blog' },
      { label: 'Status', href: '#/news' },
      { label: 'Changelog', href: '#/news' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#/about' },
      { label: 'Terms of Service', href: '#/about' },
      { label: 'Security', href: '#/about' },
      { label: 'Disclaimer', href: '#/about' },
    ],
  },
];

const SOCIALS: { label: string; href: string; icon: React.ReactNode }[] = [
  { label: 'X', href: 'https://x.com/cryptoprism_io', icon: <path d="M4 4l6.5 8.5L4.3 20H6l5.4-6.4L16.5 20H20l-6.9-9L19.6 4H18l-5 5.9L8.5 4H4z" /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/cryptoprism-io', icon: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M7 10v7 M7 7v.01 M11 17v-4a2 2 0 0 1 4 0v4 M11 17v-7" /></> },
  { label: 'GitHub', href: 'https://github.com/CryptoPrism-io', icon: <path d="M9 19c-4 1.4-4-2-6-2.5 M15 21v-3.6a3 3 0 0 0-.9-2.4c3-.3 6-1.5 6-6.5a5 5 0 0 0-1.4-3.5 4.6 4.6 0 0 0-.1-3.5s-1.1-.3-3.6 1.3a12 12 0 0 0-6.4 0C6.6 1.7 5.5 2 5.5 2a4.6 4.6 0 0 0-.1 3.5A5 5 0 0 0 4 9c0 5 3 6.2 6 6.5a3 3 0 0 0-.9 2.4V21" /> },
  { label: 'Telegram', href: 'https://t.me/cryptoprism', icon: <path d="M21 4L3 11l5 2 2 6 3-4 4 3 4-14z M8 13l9-6-6 8" /> },
];

/** Deep-link a footer "Product" item to a homepage section — navigating home
 * first if the visitor is on another route. */
function scrollToSection(id: string) {
  const onHome = !window.location.hash || window.location.hash === '#/' || !window.location.hash.startsWith('#/');
  if (onHome) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.location.hash = '';
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 140);
  }
}

const linkStyle: React.CSSProperties = { fontSize: 13.5, color: '#8B96A5', textDecoration: 'none', cursor: 'pointer', transition: 'color 0.18s ease', display: 'inline-block', padding: '3px 0' };

export function Footer() {
  const isMobile = useIsMobile(760);
  return (
    <footer style={{ background: '#04070E', borderTop: '1px solid rgba(255,255,255,0.08)', color: '#8B96A5' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: isMobile ? '40px 22px 0' : '56px 32px 0', boxSizing: 'border-box' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : '1.6fr repeat(4, 1fr)', gap: isMobile ? 28 : 40 }}>
          {/* Brand */}
          <div style={{ gridColumn: isMobile ? '1 / -1' : undefined }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <svg width="26" height="26" viewBox="0 0 30 30" fill="none" aria-hidden="true">
                <path d="M15 2.5 25.8 8.75v12.5L15 27.5 4.2 21.25V8.75Z" stroke={ACCENT} strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M15 10.5 19 17h-8Z" stroke="#0B8D84" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 19, fontWeight: 700, color: '#F1F6F4' }}>
                CryptoPrism<span style={{ color: ACCENT }}>.</span>
              </span>
            </div>
            <p style={{ margin: '16px 0 0', maxWidth: 300, fontSize: 13.5, lineHeight: 1.6, color: '#8B96A5' }}>
              AI-native financial intelligence for modern markets. Fragmented data in, one explainable decision out.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 9, border: '1px solid rgba(255,255,255,0.12)', color: '#8B96A5', transition: 'all 0.18s ease' }}
                  onMouseOver={(e) => { e.currentTarget.style.color = '#F1F6F4'; e.currentTarget.style.borderColor = 'rgba(15,174,114,0.5)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.color = '#8B96A5'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F1F6F4' }}>{col.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: 16 }}>
                {col.links.map((l) => (
                  l.section ? (
                    <a
                      key={l.label}
                      style={linkStyle}
                      onClick={() => scrollToSection(l.section!)}
                      onMouseOver={(e) => { e.currentTarget.style.color = '#F1F6F4'; }}
                      onMouseOut={(e) => { e.currentTarget.style.color = '#8B96A5'; }}
                    >
                      {l.label}
                    </a>
                  ) : (
                    <a
                      key={l.label}
                      href={l.href}
                      style={linkStyle}
                      onMouseOver={(e) => { e.currentTarget.style.color = '#F1F6F4'; }}
                      onMouseOut={(e) => { e.currentTarget.style.color = '#8B96A5'; }}
                    >
                      {l.label}
                    </a>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ marginTop: 48, padding: '22px 0', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 11, color: '#5B6672' }}>
            &copy; 2026 CryptoPrism &middot; Trinetry Infotech Pvt Ltd &middot; CIN U62099PN2025PTC247965 &middot; Pune, India
          </span>
          <span style={{ fontSize: 11, color: '#5B6672', fontStyle: 'italic' }}>
            Source-cited research infrastructure. Not investment advice. No price predictions.
          </span>
        </div>
      </div>
    </footer>
  );
}
