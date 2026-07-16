import { useState } from 'react';
import { useIsMobile } from '../hooks';
import dashboardImg from '../../../../assets/prism-feature-dashboard.png';
import screenerImg from '../../../../assets/prism-feature-screener.png';
import screensImg from '../../../../assets/prism-feature-screens.png';
import analyticsImg from '../../../../assets/prism-feature-analytics.png';
import newsImg from '../../../../assets/prism-feature-news.png';

const FEATURES = [
  { key: 'dashboard', title: 'Unified Dashboard', desc: 'Every market signal, one workspace.', src: dashboardImg },
  { key: 'screener', title: 'AI Screener', desc: 'Describe it in plain English. AI finds it.', src: screenerImg },
  { key: 'screens', title: 'Public Screens', desc: 'Curated research, ready to act on.', src: screensImg },
  { key: 'analytics', title: 'Analytics', desc: 'Institutional-grade market depth.', src: analyticsImg },
  { key: 'news', title: 'News Intelligence', desc: 'Every headline, explained.', src: newsImg },
];

const DEFAULT_ACTIVE = 2; // "Public Screens" — matches the source's default shelfActive

export function FeatureShowcase() {
  const isMobile = useIsMobile();
  const [active, setActive] = useState(DEFAULT_ACTIVE);

  return (
    <section id="prism-platform" style={{ position: 'relative', padding: '70px 0 80px', background: '#FAFAF8' }}>
      <div className="prism-wrap">
        <div style={{ textAlign: 'center' }}>
          <div className="prism-pill" style={{ display: 'inline-flex' }}><span className="prism-pill__dot" />FEATURE SHOWCASE</div>
          <h2 style={{ margin: '18px 0 0', fontSize: isMobile ? 28 : 38, lineHeight: 1.08, color: '#0B1220' }}>
            Every Capability. <span className="prism-grad-text">Explored in Depth.</span>
          </h2>
        </div>

        {!isMobile ? (
          <div className="prism-shelf" onMouseLeave={() => setActive(DEFAULT_ACTIVE)}>
            {FEATURES.map((f, i) => (
              <div
                key={f.key}
                className={`prism-shelf__card ${i === active ? 'prism-shelf__card--active' : 'prism-shelf__card--collapsed'}`}
                onMouseEnter={() => setActive(i)}
              >
                {i === active ? (
                  <div style={{ width: '100%', marginTop: 18, flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: '#0B1220', whiteSpace: 'nowrap' }}>{f.title}</div>
                    <div style={{ fontSize: 13.5, lineHeight: 1.55, color: '#475467', marginTop: 8, maxWidth: 340 }}>{f.desc}</div>
                    <div style={{ width: '100%', flex: 1, minHeight: 0, position: 'relative', marginTop: 14 }}>
                      <img src={f.src} alt={f.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                  </div>
                ) : (
                  <div className="prism-shelf__title-vertical">{f.title}</div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ marginTop: 28 }}>
            {FEATURES.map((f, i) => {
              const open = i === active;
              return (
                <div key={f.key} className="prism-shelf-mobile__card">
                  <div className="prism-shelf-mobile__header" onClick={() => setActive(open ? -1 : i)}>
                    <span>{f.title}</span>
                    <span style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}>&#9660;</span>
                  </div>
                  {open && (
                    <div style={{ padding: '0 20px 20px' }}>
                      <div style={{ fontSize: 13.5, color: '#475467', marginBottom: 12 }}>{f.desc}</div>
                      <img src={f.src} alt={f.title} style={{ width: '100%', borderRadius: 10, display: 'block' }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
