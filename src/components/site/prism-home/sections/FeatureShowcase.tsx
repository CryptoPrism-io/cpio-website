import { useEffect, useState } from 'react';
import { SCREENS, buildNav, type ScreenData } from './feature-showcase/data';
import { DashboardScreen } from './feature-showcase/screens/DashboardScreen';
import { ScreenerScreen } from './feature-showcase/screens/ScreenerScreen';
import { ScreensScreen } from './feature-showcase/screens/ScreensScreen';

const ACCENT = '#0FAE72';
const ACCENT2 = '#0B8D84';
const AUTOPLAY_MS = 6000;

// Tab icons keyed by screen key — ported from reference lines 437-442 (19x19, viewBox 0 0 20 20, strokeWidth 1.5).
function TabIcon({ k, stroke }: { k: ScreenData['key']; stroke: string }) {
  switch (k) {
    case 'dashboard':
      return (
        <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3.5" width="14" height="13" rx="2" />
          <path d="M3 8h14 M7 3.5v13" />
        </svg>
      );
    case 'screener':
      return (
        <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 3l1.4 4.3L16 9l-4.6 1.7L10 15l-1.4-4.3L4 9l4.6-1.7z" />
        </svg>
      );
    case 'screens':
      return (
        <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="6" height="6" rx="1.4" />
          <rect x="11" y="3" width="6" height="6" rx="1.4" />
          <rect x="3" y="11" width="6" height="6" rx="1.4" />
          <rect x="11" y="11" width="6" height="6" rx="1.4" />
        </svg>
      );
    case 'analytics':
      return (
        <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="5" cy="15" r="2" />
          <circle cx="10" cy="5" r="2" />
          <circle cx="15" cy="13" r="2" />
          <path d="M6.5 13.2 8.8 7 M11.8 6.5l2.2 4.6" />
        </svg>
      );
    case 'calendar':
      return (
        <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="14" height="13" rx="2" />
          <path d="M3 8h14 M7 2.5v3 M13 2.5v3" />
        </svg>
      );
    case 'news':
      return (
        <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 2.5h7l3.5 3.5v11.5H5z M12 2.5V6h3.5 M7.5 10h5 M7.5 13h5" />
        </svg>
      );
    default:
      return null;
  }
}

// Caption icon variants — ported from reference lines 761-767 (17x17, stroke #0B8D84).
function CaptionIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'spark':
      return (
        <svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke={ACCENT2} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 3l1.4 4.3L16 9l-4.6 1.7L10 15l-1.4-4.3L4 9l4.6-1.7z" />
        </svg>
      );
    case 'antenna':
      return (
        <svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke={ACCENT2} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10" cy="14.5" r="1.4" />
          <path d="M6.7 11.8a4.7 4.7 0 0 1 6.6 0 M4.2 9.2a8.2 8.2 0 0 1 11.6 0" />
        </svg>
      );
    case 'shield':
      return (
        <svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke={ACCENT2} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 2.5 3.5 5v5c0 4 3 6.6 6.5 7.5 3.5-.9 6.5-3.5 6.5-7.5V5z" />
        </svg>
      );
    case 'target':
      return (
        <svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke={ACCENT2} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10" cy="10" r="7.5" />
          <path d="M6.8 10.2l2.1 2.1 4.3-4.5" />
        </svg>
      );
    case 'grid':
      return (
        <svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke={ACCENT2} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="6" height="6" rx="1.4" />
          <rect x="11" y="3" width="6" height="6" rx="1.4" />
          <rect x="3" y="11" width="6" height="6" rx="1.4" />
          <rect x="11" y="11" width="6" height="6" rx="1.4" />
        </svg>
      );
    case 'message':
      return (
        <svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke={ACCENT2} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 4.5h14v9.2H8l-3.5 3v-3H3z" />
        </svg>
      );
    case 'chart':
      return (
        <svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke={ACCENT2} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 16V11 M8 16V8 M12 16V10.5 M16 16V5" />
        </svg>
      );
    default:
      return null;
  }
}

// Caption position table — ported from reference lines 1180-1183.
const CAPTION_POS = [
  { top: 60, left: true },
  { top: 50, left: false },
  { top: 270, left: false },
  { top: 270, left: true },
];

export function FeatureShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % SCREENS.length), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [active, paused]);

  const screen = SCREENS[active];
  const navItems = buildNav(screen.navActive);

  return (
    <section id="prism-platform" style={{ position: 'relative', padding: '70px 0 80px', background: '#FAFAF8' }}>
      <div className="prism-wrap">
        {/* Header — reference lines 426-430 */}
        <div style={{ textAlign: 'center' }}>
          <div className="prism-pill" style={{ display: 'inline-flex' }}>
            <span className="prism-pill__dot" />THE PLATFORM
          </div>
          <h2 style={{ margin: '18px 0 0', fontSize: 38, lineHeight: 1.08, color: '#0B1220' }}>
            {screen.headlineA} <span className="prism-grad-text">{screen.headlineB}</span>
          </h2>
          <p style={{ margin: '14px auto 0', maxWidth: 620, fontSize: 15.5, lineHeight: 1.5, color: '#475467' }}>{screen.sub}</p>
        </div>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{ maxWidth: 1560, margin: '34px auto 0' }}
        >
          {/* Tab rail — reference lines 433-452 */}
          <div className="prism-showcase-tabs">
            {SCREENS.map((s, i) => {
              const isActive = i === active;
              const color = isActive ? ACCENT2 : '#98A2B3';
              return (
                <div key={s.key} className="prism-showcase-tab" onClick={() => setActive(i)}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <TabIcon k={s.key} stroke={color} />
                    <span style={{ fontSize: 12, fontWeight: 700, color, whiteSpace: 'nowrap' }}>{s.tabLabel}</span>
                  </div>
                  <div style={{ position: 'absolute', left: 6, right: 6, bottom: -1, height: 2, background: '#E7E9EC', overflow: 'hidden' }}>
                    {isActive && (
                      <div
                        key={active}
                        style={{
                          height: '100%',
                          background: ACCENT,
                          width: '0%',
                          animation: `prism-barfill ${AUTOPLAY_MS}ms linear forwards`,
                          animationPlayState: paused ? 'paused' : 'running',
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Window card + captions container — reference lines 454-473 (card/chrome/sidebar) and 756-773 (captions) */}
          <div style={{ position: 'relative', maxWidth: 1000, margin: '30px auto 0' }}>
            <div style={{ background: '#FFFFFF', border: '1px solid #E7E9EC', borderRadius: 20, boxShadow: '0 24px 60px rgba(11,18,32,0.08)', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderBottom: '1px solid #E7E9EC' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ED6A5E', flex: 'none' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F4BF4F', flex: 'none' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#61C554', flex: 'none' }} />
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: '100%', maxWidth: 360, display: 'flex', alignItems: 'center', gap: 6, background: '#F5F6F7', borderRadius: 8, padding: '6px 12px', fontSize: 11.5, color: '#98A2B3' }}>
                    <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="#98A2B3" strokeWidth={1.6}>
                      <circle cx="9" cy="9" r="6" />
                      <path d="M14 14l3.5 3.5" />
                    </svg>
                    Search tokens, signals, screens&#8230;
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', height: 560 }}>
                <div className="prism-showcase-sidebar">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14, padding: '0 4px' }}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2 17 6v8l-7 4-7-4V6z" stroke={ACCENT} strokeWidth={1.4} />
                    </svg>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: '#0B1220' }}>CryptoPrism.</span>
                  </div>
                  <div style={{ border: '1px solid #E7E9EC', borderRadius: 8, padding: '6px 9px', fontSize: 11, fontWeight: 600, color: '#475467', marginBottom: 12 }}>+ Ask AI</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1, overflow: 'hidden' }}>
                    {navItems.map((nv) => (
                      <div
                        key={nv.label}
                        style={{ padding: '6px 8px', borderRadius: 6, fontSize: 11.5, fontWeight: nv.weight, color: nv.color, background: nv.bg, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                      >
                        {nv.label}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, borderTop: '1px solid #E7E9EC', paddingTop: 10, marginTop: 8 }}>
                    <span style={{ width: 20, height: 20, borderRadius: '50%', background: ACCENT, color: '#FFFFFF', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                      YS
                    </span>
                    <div style={{ fontSize: 10.5, lineHeight: 1.3, overflow: 'hidden' }}>
                      <div style={{ fontWeight: 600, color: '#0B1220', whiteSpace: 'nowrap' }}>Yogesh Sahu</div>
                      <div style={{ color: '#98A2B3', fontSize: 9.5 }}>Enterprise Plan</div>
                    </div>
                  </div>
                </div>

                <div style={{ flex: 1, minWidth: 0, padding: '18px 22px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
                  {renderScreen(screen)}
                </div>
              </div>
            </div>

            {screen.captions.map((cap, i) => {
              const pos = CAPTION_POS[i % 4];
              const sideStyle = pos.left ? { left: -250 } : { right: -250 };
              const lineStyle = pos.left ? { right: -34 } : { left: -34 };
              const dotStyle = pos.left ? { right: -38 } : { left: -38 };
              return (
                <div key={i} className="prism-showcase-caption" style={{ ...sideStyle, top: pos.top }}>
                  <div style={{ position: 'absolute', top: 33, width: 34, height: 0, borderTop: '1px dashed #C9D6CF', ...lineStyle }} />
                  <span style={{ position: 'absolute', top: 30, width: 6, height: 6, borderRadius: '50%', background: ACCENT, ...dotStyle }} />
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 10, background: '#F2FAF6' }}>
                    <CaptionIcon icon={cap.icon} />
                  </span>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0B1220', marginTop: 11 }}>{cap.title}</div>
                  <div style={{ fontSize: 12, lineHeight: 1.5, color: '#475467', marginTop: 5 }}>{cap.desc}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#E7E9EC', marginTop: 8 }}>{cap.num}</div>
                </div>
              );
            })}
          </div>

          {/* Closing + CTAs — reference lines 776-782 */}
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <div style={{ fontSize: 19, fontWeight: 700, color: '#0B1220', maxWidth: 640, margin: '0 auto' }}>{screen.closing}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 20 }}>
              <button
                className="cta-early-access-trigger"
                style={{ fontFamily: 'inherit', fontSize: 14.5, fontWeight: 600, color: '#FFFFFF', background: '#0B1220', border: 'none', borderRadius: 13, padding: '13px 24px', cursor: 'pointer' }}
              >
                {screen.ctaPrimary}
              </button>
              <button
                className="cta-early-access-trigger"
                style={{ fontFamily: 'inherit', fontSize: 14.5, fontWeight: 600, color: '#0B1220', background: '#FFFFFF', border: '1px solid #E7E9EC', borderRadius: 13, padding: '12px 22px', cursor: 'pointer' }}
              >
                {screen.ctaSecondary}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function renderScreen(screen: ScreenData) {
  switch (screen.key) {
    case 'dashboard': return <DashboardScreen screen={screen} />;
    case 'screener': return <ScreenerScreen screen={screen} />;
    case 'screens': return <ScreensScreen screen={screen} />;
    case 'analytics': return fallback(screen);
    case 'calendar': return fallback(screen);
    case 'news': return fallback(screen);
  }
}

function fallback(screen: ScreenData) {
  return <div style={{ fontSize: 13, color: '#98A2B3', padding: 20 }}>{screen.tabLabel} — coming in a later task</div>;
}
