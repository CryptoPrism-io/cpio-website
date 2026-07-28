// Screen 3 — "Workbench" section (Hallmark redesign 2026-07-22).
// The product frame is the content; the copy gets out of its way.
//
// WHAT WAS REMOVED, and why:
//   - THE FAKE BROWSER TITLE BAR. Three traffic-light dots plus a URL-shaped
//     search pill, hand-built in CSS. Re-drawn OS chrome is one of the
//     strongest "this was generated" tells there is (slop-test gate 47): the
//     visitor already has a browser, and the fake one is always wrong — the
//     dots aren't macOS dots and the pill isn't a URL bar. The app mock itself
//     STAYS. It is CryptoPrism's own product UI, which is exactly what this
//     screen is for; only the imitation of the browser around it is gone. The
//     frame is now a plain <figure> with a hairline border, per the gate's fix.
//   - The 150px fixed header. It held a "THE PLATFORM" pill (the section below
//     used the same label), a gradient-filled headline and a sub — and all
//     three swapped every 1.5s, so three blocks of text were moving above an
//     already-moving mock. The head is now static and left-aligned; the
//     per-screen words moved into a <figcaption> under the frame, which is
//     where a caption belongs and lets the tour read as a tour.
//   - The staged customer chip ("YS · Yogesh Sahu · Enterprise Plan"). Signing
//     the founder in as the Enterprise-plan customer reads as staged. The chip
//     shape is real product UI so it stays, but it now names the workspace
//     rather than inventing a person.
//
// AUTOPLAY: 1.5s -> 4.5s (1.5s is faster than you can finish reading a screen),
// now pauses on hover AND focus (WCAG 2.2.2 wants both), and does not run at
// all under prefers-reduced-motion — the old timer had no motion guard, so it
// kept cycling for users who asked for stillness.
//
// The sidebar items were <div onClick>: not focusable, not activatable by
// keyboard, invisible to assistive tech. They are <button>s now.
//
// Section id + data-page unchanged: #prism-platform is a nav/footer deep-link
// target and data-page="" keeps this a full-vh fitPages snap page.

import { useEffect, useState, type ReactElement } from 'react';
import { SCREENS, buildNav, NAV_LABELS, type ScreenData } from './feature-showcase/data';
import { prefersReducedMotion } from '../motion';
import { DashboardScreen } from './feature-showcase/screens/DashboardScreen';
import { ScreenerScreen } from './feature-showcase/screens/ScreenerScreen';
import { ScreensScreen } from './feature-showcase/screens/ScreensScreen';
import { NewsScreen } from './feature-showcase/screens/NewsScreen';
import { CalendarScreen } from './feature-showcase/screens/CalendarScreen';
import { AnalyticsScreen } from './feature-showcase/screens/AnalyticsScreen';

const ACCENT = '#0FAE72';
const AUTOPLAY_MS = 4500;

// Maps a mockup sidebar label -> the feature screen it drives, so the window's
// OWN internal nav is the switcher (clicking "Screener" opens the AI Screener,
// etc.). Labels with no screen (Signals, Research, Watchlist, …) stay inert.
const NAV_TO_SCREEN: Record<string, number> = {};
SCREENS.forEach((s, i) => { NAV_TO_SCREEN[s.navActive] = i; });

// Autoplay walks the sidebar's VISUAL order (top -> bottom) rather than the
// SCREENS data order, so the active highlight scrolls straight down the list
// instead of jumping around it.
const ROTATION: number[] = NAV_LABELS.filter((l) => NAV_TO_SCREEN[l] !== undefined).map((l) => NAV_TO_SCREEN[l]);

export function FeatureShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const t = window.setTimeout(() => setActive((a) => {
      const pos = ROTATION.indexOf(a);
      return ROTATION[(pos + 1) % ROTATION.length];
    }), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [active, paused]);

  const screen = SCREENS[active];
  const navItems = buildNav(screen.navActive);

  return (
    <section
      id="prism-platform"
      data-page=""
      style={{ position: 'relative', padding: '26px 44px 24px', background: '#FAFAF8', boxSizing: 'border-box' }}
    >
      <div className="prism-work__head">
        {/* deliberate break at the sentence — left to wrap, "layer." orphans */}
        <h2>Six surfaces.<br /><em>One decision layer.</em></h2>
        <p className="prism-work__lede">
          The same models and the same scores, surfaced six ways &mdash; from the morning dashboard to a screener you describe in plain English. Pick one on the left to look around.
        </p>
      </div>

      {/* The frame: no re-drawn browser chrome. onFocus/onBlur bubble in React,
          so the tour also pauses while a keyboard user is inside it. */}
      <figure
        className="prism-work__fig"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {/* Authored at 1280px then zoomed ~1.3x, so the mock's text/UI render
            larger/readable AND the window fills the width out to the gutters. */}
        <div style={{ width: 1280, zoom: 1.3, margin: '0 auto' }}>
          <div className="prism-work__frame">
            <div style={{ display: 'flex', height: 560 }}>
              <div className="prism-showcase-sidebar">
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14, padding: '0 4px' }}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M10 2 17 6v8l-7 4-7-4V6z" stroke={ACCENT} strokeWidth={1.8} />
                  </svg>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: '#0B1220' }}>CryptoPrism.</span>
                </div>
                <div style={{ border: '1px solid #E7E9EC', borderRadius: 8, padding: '6px 9px', fontSize: 11, fontWeight: 600, color: '#475467', marginBottom: 12 }}>+ Ask AI</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1, overflow: 'hidden' }}>
                  {navItems.filter((nv) => NAV_TO_SCREEN[nv.label] !== undefined).map((nv) => {
                    const target = NAV_TO_SCREEN[nv.label];
                    const isActive = target === active;
                    return (
                      <button
                        key={nv.label}
                        type="button"
                        className="prism-work__tab"
                        aria-current={isActive ? 'true' : undefined}
                        onClick={() => setActive(target)}
                      >
                        {nv.label}
                        {/* auto-rotate progress on the active item (pauses on hover/focus) */}
                        {isActive && (
                          <span
                            key={active}
                            aria-hidden="true"
                            className="prism-work__tab-bar"
                            style={{ animation: `prism-barfill ${AUTOPLAY_MS}ms linear forwards`, animationPlayState: paused ? 'paused' : 'running' }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 7, borderTop: '1px solid #E7E9EC', paddingTop: 10, marginTop: 8 }}>
                  <span style={{ width: 20, height: 20, borderRadius: '50%', background: ACCENT, color: '#FFFFFF', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                    CP
                  </span>
                  <div style={{ fontSize: 10.5, lineHeight: 1.3, overflow: 'hidden' }}>
                    <div style={{ fontWeight: 600, color: '#0B1220', whiteSpace: 'nowrap' }}>Research Workspace</div>
                    <div style={{ color: '#667085', fontSize: 9.5 }}>Private beta</div>
                  </div>
                </div>
              </div>

              <div style={{ flex: 1, minWidth: 0, padding: '18px 24px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
                {renderScreen(screen)}
              </div>
            </div>
          </div>
        </div>

        <figcaption className="prism-work__cap">
          <b>{screen.navActive}</b>
          <span>{screen.sub}</span>
        </figcaption>
      </figure>
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
