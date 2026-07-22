// Site footer — "Ft5 Statement" (Hallmark redesign 2026-07-22).
// Replaces the Ft3 four-column index (Product / Company / Resources / Legal +
// social row + tiny copyright), which is the single most-recognised AI footer
// fingerprint.
//
// WHY: a private-beta company does not have a nineteen-link sitemap. Nine of
// the previous nineteen links resolved to a placeholder route — Documentation,
// API Reference and Help Center all pointed at #/blog; Status and Changelog at
// #/news; all four Legal links at #/about. A link that lies is worse than an
// absent one, so they are gone. Every link below resolves to something real.
//
// >>> ACTION NEEDED: Privacy Policy and Terms of Service were dropped rather
// than left pointing at #/about. If they belong in the footer they need real
// routes first — see the redesign notes.
//
// The three homepage section anchors (Platform / Why Us / FAQ) moved HERE from
// the nav, which is now N9 edge-aligned. In the nav they were <a> elements with
// no href, so they were never keyboard-reachable; here they are real links.
//
// Also used by PageShell (the routed marketing pages), which carries its own
// header nav — so the column drop costs those pages no navigation.

import { useIsMobile } from './hooks';

const ACCENT = '#0FAE72';

type FootLink = { label: string; href?: string; section?: string };

// Homepage section anchors first, then the real routes.
const LINKS: FootLink[] = [
  { label: 'Platform', section: 'prism-platform' },
  { label: 'Why Us', section: 'prism-trust' },
  { label: 'FAQ', section: 'prism-faq' },
  { label: 'About', href: '#/about' },
  { label: 'Careers', href: '#/careers' },
  { label: 'Blog', href: '#/blog' },
  { label: 'News', href: '#/news' },
  { label: 'Contact', href: 'mailto:hello@cryptoprism.io' },
];

const SOCIALS: { label: string; href: string; icon: React.ReactNode }[] = [
  { label: 'X', href: 'https://x.com/cryptoprism_io', icon: <path d="M4 4l6.5 8.5L4.3 20H6l5.4-6.4L16.5 20H20l-6.9-9L19.6 4H18l-5 5.9L8.5 4H4z" /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/cryptoprism-io', icon: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M7 10v7 M7 7v.01 M11 17v-4a2 2 0 0 1 4 0v4 M11 17v-7" /></> },
  { label: 'GitHub', href: 'https://github.com/CryptoPrism-io', icon: <path d="M9 19c-4 1.4-4-2-6-2.5 M15 21v-3.6a3 3 0 0 0-.9-2.4c3-.3 6-1.5 6-6.5a5 5 0 0 0-1.4-3.5 4.6 4.6 0 0 0-.1-3.5s-1.1-.3-3.6 1.3a12 12 0 0 0-6.4 0C6.6 1.7 5.5 2 5.5 2a4.6 4.6 0 0 0-.1 3.5A5 5 0 0 0 4 9c0 5 3 6.2 6 6.5a3 3 0 0 0-.9 2.4V21" /> },
  { label: 'Telegram', href: 'https://t.me/cryptoprism', icon: <path d="M21 4L3 11l5 2 2 6 3-4 4 3 4-14z M8 13l9-6-6 8" /> },
];

/** Deep-link a footer section item to a homepage section — navigating home
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

export function Footer() {
  const isMobile = useIsMobile(760);

  return (
    <footer className="prism-foot">
      <div className="prism-foot__inner">
        {/* the closing sentence — the page's argument, restated as its last word */}
        <p className="prism-foot__line">
          Fragmented data in.<br />
          <em>One explainable decision out.</em>
        </p>

        <div className="prism-foot__meta">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="24" height="24" viewBox="0 0 30 30" fill="none" aria-hidden="true">
              <path d="M15 2.5 25.8 8.75v12.5L15 27.5 4.2 21.25V8.75Z" stroke={ACCENT} strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M15 10.5 19 17h-8Z" stroke="#0B8D84" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 17, fontWeight: 700, letterSpacing: '-0.015em', color: 'var(--prism-on-dark)' }}>
              CryptoPrism<span style={{ color: ACCENT }}>.</span>
            </span>
          </div>

          <nav className="prism-foot__links" aria-label="Footer">
            {LINKS.map((l) => (
              l.section ? (
                <a
                  key={l.label}
                  className="prism-foot__link"
                  href={`#${l.section}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(l.section!); }}
                >
                  {l.label}
                </a>
              ) : (
                <a key={l.label} className="prism-foot__link" href={l.href}>{l.label}</a>
              )
            ))}
          </nav>

          <div style={{ display: 'flex', gap: 10 }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                className="prism-foot__social"
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={s.label}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{s.icon}</svg>
              </a>
            ))}
          </div>
        </div>

        <div className="prism-foot__legal" style={{ justifyContent: isMobile ? 'flex-start' : 'space-between' }}>
          <code>&copy; 2026 CryptoPrism &middot; Trinetry Infotech Pvt Ltd &middot; CIN U62099PN2025PTC247965 &middot; Pune, India</code>
          <span>Source-cited research infrastructure. Not investment advice. No price predictions.</span>
        </div>
      </div>
    </footer>
  );
}
