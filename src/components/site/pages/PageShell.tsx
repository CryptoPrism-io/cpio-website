// Shared shell for the standalone routed marketing pages (Careers, Blog, News,
// About): a light top header (logo → home, key links, Request Demo) + the page
// content + the site footer. Light "warm paper" theme to match the homepage
// content sections. (2026-07-21)

import type { ReactNode } from 'react';
import { Footer } from '../prism-home/Footer';

const ACCENT = '#0FAE72';

const NAV: { label: string; href: string }[] = [
  { label: 'Platform', href: '#/' },
  { label: 'About', href: '#/about' },
  { label: 'Careers', href: '#/careers' },
  { label: 'Blog', href: '#/blog' },
  { label: 'News', href: '#/news' },
];

export function PageShell({ active, children }: { active?: string; children: ReactNode }) {
  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, system-ui, sans-serif', color: '#0B1220' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(250,250,248,0.85)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderBottom: '1px solid #E7E9EC' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px', height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box' }}>
          <a href="#/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
            <svg width="26" height="26" viewBox="0 0 30 30" fill="none" aria-hidden="true">
              <path d="M15 2.5 25.8 8.75v12.5L15 27.5 4.2 21.25V8.75Z" stroke={ACCENT} strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M15 10.5 19 17h-8Z" stroke="#0B8D84" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, color: '#0B1220' }}>CryptoPrism<span style={{ color: ACCENT }}>.</span></span>
          </a>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {NAV.map((n) => (
              <a key={n.label} href={n.href} style={{ fontSize: 14, fontWeight: active === n.label ? 700 : 500, color: active === n.label ? ACCENT : '#475467', textDecoration: 'none' }}>{n.label}</a>
            ))}
          </nav>
          <button
            type="button"
            className="cta-early-access-trigger"
            style={{ fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#FFFFFF', background: `linear-gradient(135deg, #34D399, ${ACCENT})`, border: 'none', borderRadius: 12, padding: '10px 20px', cursor: 'pointer', boxShadow: '0 8px 22px rgba(15,174,114,0.22)' }}
          >
            Request Demo
          </button>
        </div>
      </header>

      <main style={{ flex: 1 }}>{children}</main>

      <Footer />
    </div>
  );
}

// Shared page hero (pill + title + subtitle), centered.
export function PageHero({ pill, titleA, titleB, sub }: { pill: string; titleA: string; titleB?: string; sub: string }) {
  return (
    <section style={{ textAlign: 'center', padding: '80px 32px 40px', maxWidth: 820, margin: '0 auto' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(15,174,114,0.35)', background: '#FFFFFF', borderRadius: 999, padding: '6px 15px', fontSize: 11.5, fontWeight: 600, letterSpacing: '0.12em', color: '#0B8D84' }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: ACCENT }} />{pill}
      </div>
      <h1 style={{ fontFamily: 'var(--font-heading)', margin: '22px 0 0', fontSize: 52, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#0B1220' }}>
        {titleA} {titleB && <span style={{ background: `linear-gradient(120deg, ${ACCENT} 20%, #0B8D84 85%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{titleB}</span>}
      </h1>
      <p style={{ margin: '20px auto 0', maxWidth: 620, fontSize: 17, lineHeight: 1.55, color: '#475467' }}>{sub}</p>
    </section>
  );
}
