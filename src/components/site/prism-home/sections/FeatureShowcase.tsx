import { useEffect, useState, type ReactElement } from 'react';
import { SCREENS, buildNav, type ScreenData } from './feature-showcase/data';
import { DashboardScreen } from './feature-showcase/screens/DashboardScreen';
import { ScreenerScreen } from './feature-showcase/screens/ScreenerScreen';
import { ScreensScreen } from './feature-showcase/screens/ScreensScreen';
import { NewsScreen } from './feature-showcase/screens/NewsScreen';
import { CalendarScreen } from './feature-showcase/screens/CalendarScreen';
import { AnalyticsScreen } from './feature-showcase/screens/AnalyticsScreen';

const ACCENT = '#0FAE72';
const AUTOPLAY_MS = 6000;

// Maps a mockup sidebar label -> the feature screen it drives, so the window's
// OWN internal nav is the switcher (clicking "Screener" opens the AI Screener,
// etc.). Labels with no screen (Signals, Research, Watchlist, …) stay inert.
const NAV_TO_SCREEN: Record<string, number> = {};
SCREENS.forEach((s, i) => { NAV_TO_SCREEN[s.navActive] = i; });

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
    <section id="prism-platform" data-page="" style={{ position: 'relative', padding: '22px 44px 24px', background: '#FAFAF8', boxSizing: 'border-box' }}>
      <div>
        {/* Fixed-height, centred header so every screen's headline + sub occupy
            the SAME space — uniform across all screens (sized to the busiest,
            screen 3's 2-line sub), no vertical jump when the screen changes. */}
        <div style={{ height: 122, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <div className="prism-pill" style={{ display: 'inline-flex' }}>
            <span className="prism-pill__dot" />THE PLATFORM
          </div>
          <h2 style={{ margin: '10px 0 0', fontSize: 29, lineHeight: 1.08, color: '#0B1220' }}>
            {screen.headlineA} <span className="prism-grad-text">{screen.headlineB}</span>
          </h2>
          <p style={{ margin: '7px auto 0', maxWidth: 760, fontSize: 14.5, lineHeight: 1.45, color: '#475467' }}>{screen.sub}</p>
        </div>

        {/* Full-width showcase window — the mockup's OWN sidebar is the nav */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{ maxWidth: 1560, margin: '16px auto 0' }}
        >
          {/* Authored at 1280px then zoomed ~1.3x, so the mockup's text/UI render
              larger/readable AND the window fills the width out to the gutters
              (was ~91px side margin; now ~50px). */}
          <div style={{ width: 1280, zoom: 1.3, margin: '0 auto' }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #E7E9EC', borderRadius: 20, boxShadow: '0 24px 60px rgba(11,18,32,0.08)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderBottom: '1px solid #E7E9EC' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ED6A5E', flex: 'none' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F4BF4F', flex: 'none' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#61C554', flex: 'none' }} />
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: 440, display: 'flex', alignItems: 'center', gap: 6, background: '#F5F6F7', borderRadius: 8, padding: '6px 12px', fontSize: 11.5, color: '#98A2B3' }}>
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1, overflow: 'hidden' }}>
                  {navItems.filter((nv) => NAV_TO_SCREEN[nv.label] !== undefined).map((nv) => {
                    const target = NAV_TO_SCREEN[nv.label];
                    const clickable = target !== undefined;
                    return (
                      <div
                        key={nv.label}
                        onClick={clickable ? () => setActive(target) : undefined}
                        onMouseEnter={clickable ? (e) => { if (nv.bg === 'transparent') e.currentTarget.style.background = '#F5F7F6'; } : undefined}
                        onMouseLeave={clickable ? (e) => { if (nv.bg === 'transparent') e.currentTarget.style.background = 'transparent'; } : undefined}
                        style={{ padding: '6px 8px', borderRadius: 6, fontSize: 11.5, fontWeight: nv.weight, color: nv.color, background: nv.bg, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: clickable ? 'pointer' : 'default', transition: 'background 0.15s ease' }}
                      >
                        {nv.label}
                      </div>
                    );
                  })}
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

              <div style={{ flex: 1, minWidth: 0, padding: '18px 24px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
                {renderScreen(screen)}
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function renderScreen(screen: ScreenData): ReactElement {
  switch (screen.key) {
    case 'dashboard': return <DashboardScreen screen={screen} />;
    case 'screener': return <ScreenerScreen screen={screen} />;
    case 'screens': return <ScreensScreen screen={screen} />;
    case 'analytics': return <AnalyticsScreen screen={screen} />;
    case 'calendar': return <CalendarScreen screen={screen} />;
    case 'news': return <NewsScreen screen={screen} />;
  }
}
