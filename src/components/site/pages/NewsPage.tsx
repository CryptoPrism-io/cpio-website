// News / press page (2026-07-21). Timeline list of announcements. NOTE: items
// are ILLUSTRATIVE placeholders — replace with real press/announcements.

import { PageShell, PageHero } from './PageShell';
import { useIsMobile } from '../prism-home/hooks';

const ACCENT = '#0FAE72';

const ITEMS = [
  { tag: 'Product', date: 'Jul 20, 2026', title: 'CryptoPrism opens private beta to institutional desks', body: 'Select funds and trading firms can now request access to the AI research engine ahead of general availability.' },
  { tag: 'Milestone', date: 'Jul 5, 2026', title: 'DMV Score validated at 0.896 AUC across 1,000+ assets', body: 'Our directional model clears out-of-sample validation on the widest coverage set to date.' },
  { tag: 'Platform', date: 'Jun 22, 2026', title: 'Cross-chain intelligence now spans 6 blockchains', body: 'Unified on-chain, market and sentiment coverage extended with sub-10s decision latency.' },
  { tag: 'Company', date: 'Jun 3, 2026', title: 'Trinetry Infotech incorporates CryptoPrism in Pune, India', body: 'The team formalizes operations to build source-cited research infrastructure for modern markets.' },
];

export function NewsPage() {
  const isMobile = useIsMobile(760);
  return (
    <PageShell active="News">
      <PageHero pill="NEWS" titleA="What’s new at" titleB="CryptoPrism." sub="Product milestones, platform updates, and company announcements." />

      <section style={{ maxWidth: 780, margin: '20px auto 0', padding: isMobile ? '0 22px 70px' : '0 32px 90px' }}>
        {ITEMS.map((n, i) => (
          <div key={n.title} style={{ display: 'flex', gap: 22 }}>
            {/* timeline rail */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 'none' }}>
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: ACCENT, marginTop: 6, boxShadow: '0 0 0 4px rgba(15,174,114,0.14)' }} />
              {i < ITEMS.length - 1 && <span style={{ width: 2, flex: 1, background: '#E7E9EC', margin: '6px 0' }} />}
            </div>
            <div style={{ paddingBottom: 34 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5 }}>
                <span style={{ fontWeight: 700, color: '#0B8D84', background: '#F2FAF6', borderRadius: 6, padding: '3px 9px', letterSpacing: '0.04em' }}>{n.tag}</span>
                <span style={{ color: '#98A2B3' }}>{n.date}</span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#0B1220', marginTop: 12, lineHeight: 1.3 }}>{n.title}</div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: '#475467', marginTop: 8 }}>{n.body}</div>
            </div>
          </div>
        ))}
      </section>
    </PageShell>
  );
}

export default NewsPage;
