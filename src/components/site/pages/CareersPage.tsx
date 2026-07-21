// Careers page (2026-07-21). Professional SaaS careers layout: hero, culture
// values, benefits, and open roles. NOTE: the open roles + team numbers below
// are ILLUSTRATIVE placeholders — wire to a real ATS (Greenhouse/Lever/Ashby)
// or a roles data source before going live.

import { PageShell, PageHero } from './PageShell';
import { useIsMobile } from '../prism-home/hooks';

const ACCENT = '#0FAE72';

const VALUES = [
  { title: 'Signal over noise', desc: 'We ship things that carry information. No vanity features, no fluff — every line of code and copy earns its place.' },
  { title: 'Explainability first', desc: 'If we can’t explain why, we don’t ship it. Trust is the product; transparency is how we build it.' },
  { title: 'Own the outcome', desc: 'Small team, huge surface area. You’ll own problems end-to-end and see your work in the hands of real funds.' },
  { title: 'Institutional rigor', desc: 'We build for BlackRock-grade standards with a startup’s speed. Precision and pace are not a trade-off.' },
];

const BENEFITS = [
  { icon: <path d="M12 3v18 M8 7h5.5a2.5 2.5 0 0 1 0 5H8 M8 12h6.5a2.5 2.5 0 0 1 0 5H8" />, title: 'Competitive equity', desc: 'Meaningful ownership from day one — you’re building this with us.' },
  { icon: <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Z M12 7v5l3 2" />, title: 'Flexible & remote-first', desc: 'Work where you do your best thinking. Async by default, sync when it matters.' },
  { icon: <path d="M20 7 9 18l-5-5" />, title: 'Full health cover', desc: 'Comprehensive medical, dental and vision for you and your family.' },
  { icon: <path d="M12 2v4 M12 18v4 M4.9 4.9l2.8 2.8 M16.3 16.3l2.8 2.8 M2 12h4 M18 12h4 M4.9 19.1l2.8-2.8 M16.3 7.7l2.8-2.8" />, title: 'Learning budget', desc: 'Annual stipend for courses, conferences, books and the tools you need.' },
  { icon: <path d="M8 21h8 M12 17v4 M4 4h16v9a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z M4 8H2a2 2 0 0 0 0 4h2 M20 8h2a2 2 0 0 1 0 4h-2" />, title: 'Real impact', desc: 'Ship to funds and traders in week one. Your work compounds daily.' },
  { icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13A4 4 0 0 1 16 11" />, title: 'Small, senior team', desc: 'Work directly with founders and staff engineers. No layers, no politics.' },
];

const ROLES = [
  { title: 'Senior ML Engineer', team: 'AI / Research', location: 'Remote · Pune', type: 'Full-time' },
  { title: 'Quant Researcher', team: 'AI / Research', location: 'Remote', type: 'Full-time' },
  { title: 'Senior Frontend Engineer', team: 'Product', location: 'Remote · Pune', type: 'Full-time' },
  { title: 'Data Platform Engineer', team: 'Infrastructure', location: 'Remote', type: 'Full-time' },
  { title: 'Product Designer', team: 'Product', location: 'Remote', type: 'Full-time' },
  { title: 'Developer Advocate', team: 'Growth', location: 'Remote', type: 'Contract' },
];

export function CareersPage() {
  const isMobile = useIsMobile(760);
  return (
    <PageShell active="Careers">
      <PageHero
        pill="CAREERS"
        titleA="Build the future of"
        titleB="financial intelligence."
        sub="We’re a small, senior team building AI-native research infrastructure for institutions. If you want your work in the hands of funds and traders — fast — you’ll fit right in."
      />

      {/* Values */}
      <section style={{ maxWidth: 1080, margin: '20px auto 0', padding: isMobile ? '0 22px' : '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 18 }}>
          {VALUES.map((v, i) => (
            <div key={v.title} style={{ background: '#FFFFFF', border: '1px solid #E7E9EC', borderRadius: 18, padding: '26px 28px' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: ACCENT }}>{String(i + 1).padStart(2, '0')}</div>
              <div style={{ fontSize: 19, fontWeight: 700, color: '#0B1220', marginTop: 8 }}>{v.title}</div>
              <div style={{ fontSize: 14.5, lineHeight: 1.6, color: '#475467', marginTop: 8 }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section style={{ maxWidth: 1080, margin: '64px auto 0', padding: isMobile ? '0 22px' : '0 32px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? 26 : 32, fontWeight: 800, color: '#0B1220', textAlign: 'center', margin: 0 }}>Why you’ll love it here</h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 18, marginTop: 32 }}>
          {BENEFITS.map((b) => (
            <div key={b.title} style={{ background: '#FFFFFF', border: '1px solid #E7E9EC', borderRadius: 16, padding: 24 }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, borderRadius: 12, background: '#F2FAF6' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B8D84" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{b.icon}</svg>
              </span>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0B1220', marginTop: 16 }}>{b.title}</div>
              <div style={{ fontSize: 14, lineHeight: 1.55, color: '#475467', marginTop: 6 }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Open roles */}
      <section style={{ maxWidth: 1080, margin: '64px auto 0', padding: isMobile ? '0 22px' : '0 32px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? 26 : 32, fontWeight: 800, color: '#0B1220', textAlign: 'center', margin: 0 }}>Open roles</h2>
        <div style={{ marginTop: 28, border: '1px solid #E7E9EC', borderRadius: 18, overflow: 'hidden', background: '#FFFFFF' }}>
          {ROLES.map((r, i) => (
            <a
              key={r.title}
              href="mailto:careers@cryptoprism.io?subject=Application"
              style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 26px', borderTop: i === 0 ? 'none' : '1px solid #E7E9EC', textDecoration: 'none', transition: 'background 0.15s ease' }}
              onMouseOver={(e) => { e.currentTarget.style.background = '#F7F9F8'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: '#0B1220' }}>{r.title}</div>
                <div style={{ fontSize: 13.5, color: '#98A2B3', marginTop: 3 }}>{r.team} · {r.location} · {r.type}</div>
              </div>
              <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 14, fontWeight: 600, color: ACCENT, whiteSpace: 'nowrap' }}>
                Apply
                <svg width="15" height="13" viewBox="0 0 16 14" fill="none"><path d="M1 7h13M9.5 1.8 14.7 7l-5.2 5.2" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </a>
          ))}
        </div>
        <p style={{ textAlign: 'center', fontSize: 14, color: '#475467', marginTop: 22 }}>
          Don’t see your role? We’re always looking for exceptional people —{' '}
          <a href="mailto:careers@cryptoprism.io" style={{ color: ACCENT, fontWeight: 600, textDecoration: 'none' }}>tell us how you’d contribute</a>.
        </p>
      </section>

      <div style={{ height: 72 }} />
    </PageShell>
  );
}

export default CareersPage;
