import '../../styles/site.css';
import { NavBar, Footer } from './shared';

export function AboutPage() {
  const pedigree: [string, string][] = [
    ['Barclays', 'Financial infrastructure'],
    ['Ubisoft', 'Production at scale'],
    ['Times Internet', 'Consumer products in India'],
    ['MSc FinTech', 'University of Strathclyde'],
  ];
  const record: [string, string][] = [
    ['Gamerz Nation', 'First venture — exited'],
    ['Kari & the Lost Shrines', '50K+ downloads · built with Isha Foundation'],
    ['AI Bharatverse', 'Featured in Times of India'],
  ];
  return (
    <div className="site-light">
      <NavBar active={null} />
      <main style={{ paddingTop: 64 }}>
        <section style={{ padding: '86px 0 50px' }}>
          <div className="wrap">
            <span className="label" style={{ color: 'var(--emerald)' }}>ABOUT</span>
            <h1 className="display" style={{ fontSize: 'clamp(42px,6vw,80px)', margin: '16px 0 20px', maxWidth: 860 }}>
              <span className="line-mask"><span className="line-in" style={{ animationDelay: '.1s' }}>One founder.</span></span>
              <span className="line-mask"><span className="line-in grad-text" style={{ animationDelay: '.26s' }}>Zero excuses.</span></span>
            </h1>
          </div>
        </section>

        <section style={{ padding: '20px 0 60px' }}>
          <div className="wrap">
            <div className="two-col" style={{ gridTemplateColumns: '.9fr 1.1fr', alignItems: 'start' }}>
              <div className="card" style={{ padding: 32 }}>
                <span style={{ width: 64, height: 64, borderRadius: 32, background: 'linear-gradient(135deg,#0A8F5A,#0E7490)', display: 'grid', placeItems: 'center', color: '#fff', fontFamily: 'Manrope', fontWeight: 800, fontSize: 22, marginBottom: 18 }}>YS</span>
                <h2 className="display" style={{ fontSize: 30, marginBottom: 6 }}>Yogesh Sahu</h2>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: '0 0 20px' }}>Founder · two-time operator</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {pedigree.map(([n, d]) => (
                    <div key={n} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderBottom: '1px solid rgba(120,110,80,.16)', paddingBottom: 10 }}>
                      <span style={{ fontSize: 14, fontWeight: 700 }}>{n}</span>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'right' }}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div className="card" style={{ padding: 28 }}>
                  <span className="label">TRACK RECORD</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
                    {record.map(([n, d]) => (
                      <div key={n} style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                        <span style={{ width: 7, height: 7, borderRadius: 4, background: 'var(--emerald)', flexShrink: 0, position: 'relative', top: -1 }} />
                        <div>
                          <span style={{ fontSize: 15, fontWeight: 700 }}>{n}</span>
                          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}> — {d}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="dark-panel" style={{ padding: 28 }}>
                  <span className="label" style={{ color: '#0ECB81' }}>THE COMPANY</span>
                  <p style={{ fontSize: 15, color: 'var(--dk-secondary)', lineHeight: 1.65, margin: '12px 0 0' }}>
                    <span style={{ color: '#fff', fontWeight: 700 }}>Trinetry Infotech Pvt Ltd</span> — DPIIT-recognized, Pune, India.
                    Twelve products built in six months; nine live. <a href="#/evidence" style={{ color: '#0ECB81', fontWeight: 600 }}>The record is public →</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default AboutPage;
