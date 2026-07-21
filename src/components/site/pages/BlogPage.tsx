// Blog page (2026-07-21). Grid of posts. NOTE: posts are ILLUSTRATIVE
// placeholders — wire to a real CMS/MDX source before publishing.

import { PageShell, PageHero } from './PageShell';
import { useIsMobile } from '../prism-home/hooks';

const ACCENT = '#0FAE72';

const POSTS = [
  { cat: 'Research', date: 'Jul 18, 2026', read: '8 min', title: 'How the DMV Score turns 130+ signals into one number', excerpt: 'A look under the hood at Direction, Magnitude and Volatility — and why explainability beats a black box.' },
  { cat: 'Product', date: 'Jul 11, 2026', read: '5 min', title: 'Natural-language screening: from a sentence to a strategy', excerpt: 'Describe an opportunity in plain English and let the engine assemble the screen. Here’s how it works.' },
  { cat: 'Engineering', date: 'Jul 3, 2026', read: '11 min', title: 'Unifying 6 chains + 44 sources into one real-time graph', excerpt: 'The data platform behind CryptoPrism — ingestion, normalization, and sub-10s decision latency.' },
  { cat: 'Markets', date: 'Jun 24, 2026', read: '6 min', title: 'Reading regime shifts before the market prices them in', excerpt: 'What early-signal detection looks like when you fuse on-chain, derivatives and sentiment.' },
  { cat: 'Research', date: 'Jun 15, 2026', read: '9 min', title: 'Backtesting without lying to yourself', excerpt: 'Walk-forward validation, out-of-sample discipline, and the metrics that actually matter.' },
  { cat: 'Company', date: 'Jun 6, 2026', read: '4 min', title: 'Why we build for institutions first', excerpt: 'Institutional rigor, retail accessibility — the order matters, and here’s why.' },
];

export function BlogPage() {
  const isMobile = useIsMobile(760);
  return (
    <PageShell active="Blog">
      <PageHero pill="BLOG" titleA="Research, product &" titleB="market intelligence." sub="Deep dives on our models, the data platform, and how we think about explainable AI for markets." />

      <section style={{ maxWidth: 1120, margin: '20px auto 0', padding: isMobile ? '0 22px 60px' : '0 32px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 20 }}>
          {POSTS.map((p) => (
            <a
              key={p.title}
              href="#/blog"
              style={{ display: 'flex', flexDirection: 'column', background: '#FFFFFF', border: '1px solid #E7E9EC', borderRadius: 18, overflow: 'hidden', textDecoration: 'none', transition: 'box-shadow 0.18s ease, transform 0.18s ease' }}
              onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 18px 44px rgba(11,18,32,0.09)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseOut={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ height: 140, background: 'linear-gradient(135deg, rgba(15,174,114,0.14), rgba(34,211,238,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="46" height="46" viewBox="0 0 30 30" fill="none" style={{ opacity: 0.5 }}>
                  <path d="M15 2.5 25.8 8.75v12.5L15 27.5 4.2 21.25V8.75Z" stroke={ACCENT} strokeWidth="1.4" strokeLinejoin="round" />
                  <path d="M15 10.5 19 17h-8Z" stroke="#0B8D84" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
              </div>
              <div style={{ padding: '20px 22px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: '#98A2B3' }}>
                  <span style={{ fontWeight: 700, color: '#0B8D84', letterSpacing: '0.05em' }}>{p.cat.toUpperCase()}</span>
                  <span>·</span><span>{p.date}</span><span>·</span><span>{p.read}</span>
                </div>
                <div style={{ fontSize: 17, fontWeight: 700, color: '#0B1220', marginTop: 12, lineHeight: 1.3 }}>{p.title}</div>
                <div style={{ fontSize: 14, lineHeight: 1.55, color: '#475467', marginTop: 8 }}>{p.excerpt}</div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

export default BlogPage;
