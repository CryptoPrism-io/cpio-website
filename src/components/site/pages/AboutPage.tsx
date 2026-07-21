// About page (2026-07-21). Mission, what we do, verified stats, and principles.
// Stats are the project's REAL verified metrics (docs_revamp/02-market-primer);
// keep them accurate.

import { PageShell, PageHero } from './PageShell';
import { useIsMobile } from '../prism-home/hooks';

const STATS = [
  { v: '130+', l: 'Indicators tracked' },
  { v: '1,000+', l: 'Coins covered' },
  { v: '6', l: 'Blockchains unified' },
  { v: '44', l: 'News & social sources' },
  { v: '0.896', l: 'DMV Score AUC' },
];

const PRINCIPLES = [
  { title: 'Explainable, not oracular', desc: 'Every output carries its reasoning. We don’t predict prices — we surface evidence and let you decide with conviction.' },
  { title: 'Source-cited by design', desc: 'Research infrastructure you can audit. Signals trace back to data; claims trace back to sources.' },
  { title: 'Institutional standards', desc: 'Validated pipelines, versioned lineage, and rigor built for funds, fintechs and research teams.' },
];

export function AboutPage() {
  const isMobile = useIsMobile(760);
  return (
    <PageShell active="About">
      <PageHero
        pill="ABOUT"
        titleA="One explainable"
        titleB="decision out."
        sub="CryptoPrism is an AI-native intelligence layer that turns fragmented market data — macro, on-chain, derivatives and sentiment — into transparent, risk-aware decisions."
      />

      {/* Mission */}
      <section style={{ maxWidth: 820, margin: '10px auto 0', padding: isMobile ? '0 22px' : '0 32px' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #E7E9EC', borderRadius: 20, padding: isMobile ? '26px 24px' : '34px 38px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: '#0B8D84' }}>OUR MISSION</div>
          <p style={{ fontSize: 19, lineHeight: 1.6, color: '#0B1220', margin: '14px 0 0' }}>
            The markets don’t lack data — they drown in it. We’re building the research engine that reads everything,
            explains what matters, and hands you a decision you can defend. Precision of a trading terminal, confidence
            of institutional tooling.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ maxWidth: 980, margin: '48px auto 0', padding: isMobile ? '0 22px' : '0 32px' }}>
        <div style={{ background: '#0B1220', borderRadius: 22, padding: isMobile ? '26px 24px' : '36px 40px', display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)', gap: isMobile ? 20 : 24 }}>
          {STATS.map((s) => (
            <div key={s.l}>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>{s.v}</div>
              <div style={{ fontSize: 12.5, color: '#8B96A5', marginTop: 6 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section style={{ maxWidth: 1080, margin: '56px auto 0', padding: isMobile ? '0 22px 70px' : '0 32px 90px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? 25 : 30, fontWeight: 800, color: '#0B1220', textAlign: 'center', margin: 0 }}>What we stand for</h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 18, marginTop: 30 }}>
          {PRINCIPLES.map((p) => (
            <div key={p.title} style={{ background: '#FFFFFF', border: '1px solid #E7E9EC', borderRadius: 16, padding: 26 }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 11, background: '#F2FAF6' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#0B8D84" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5l4 4 8-8.5" /></svg>
              </span>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#0B1220', marginTop: 16 }}>{p.title}</div>
              <div style={{ fontSize: 14.5, lineHeight: 1.6, color: '#475467', marginTop: 8 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

export default AboutPage;
