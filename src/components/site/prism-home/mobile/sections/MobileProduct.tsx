// Mobile Home — Product section: phone-frame mock with 6 auto-cycling screens.
//
// Ported verbatim from docs/superpowers/specs/reference/2026-07-18-mobile-design-v1.html
// lines 116-283: header (117-120), phone frame + status bar (122-129), the
// six sc-if screens (scr0 Dashboard 130-170, scr1 Screener 171-193, scr2
// Public Screens 194-214, scr3 Analytics 215-236, scr4 News 237-254, scr5
// Calendar 255-270), caption (274, PHONE_CAPTIONS[toolIdx]), tool tab chips
// (276-282).
//
// Autoplay + hold mechanics port script lines 387, 397, 461-465: a 2500ms
// interval advances toolIdx unless "held" — clicking a tab (or any
// pointerdown on the tab row) extends the hold window 8s into the future.
// Rather than 6 separately-conditioned `scrIn`-animated divs (one per
// sc-if block, as in the reference), a single wrapper div is keyed by
// toolIdx so the entry animation replays whichever screen becomes active.

import { useEffect, useRef, useState } from 'react';
import {
  TOOL_TABS,
  PHONE_CAPTIONS,
  PULSE,
  FEED,
  SCREENER_ROWS,
  PUB_SCREENS,
  NEWS_ROWS,
  CAL_ROWS,
} from '../data';

const AUTOPLAY_MS = 2500;
const HOLD_MS = 8000;

// scr0 — reference lines 131-169.
function DashboardScreen() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
            Good morning, Alex
          </div>
          <div style={{ fontSize: 8, color: '#7A8BA0', fontFamily: "'SF Mono', Menlo, monospace", marginTop: 2 }}>
            Fri, Jul 17, 2026 · <span style={{ color: '#0ECB81' }}>Markets Open</span>
          </div>
        </div>
        <svg width={20} height={20} viewBox="0 0 30 30" fill="none">
          <path d="M15 2.5 25.8 8.75v12.5L15 27.5 4.2 21.25V8.75Z" stroke="#0ECB81" strokeWidth={1.8} strokeLinejoin="round" />
          <path d="M15 10.5 19 17h-8Z" stroke="#0ECB81" strokeWidth={1.5} strokeLinejoin="round" />
        </svg>
      </div>

      <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
        {['⚡ Quick Scan', 'Screener', 'Alerts'].map((label) => (
          <span
            key={label}
            style={{
              flex: 1, textAlign: 'center', fontSize: 8.5, fontWeight: 600, color: '#A8B3C4',
              background: '#0D1524', border: '1px solid #1B2436', borderRadius: 8, padding: '6px 0',
            }}
          >
            {label}
          </span>
        ))}
      </div>

      <div style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: '0.14em', color: '#7A8BA0', margin: '12px 0 6px' }}>
        MARKET PULSE
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        {PULSE.map((p) => (
          <div key={p.sym} style={{ background: '#0D1524', border: '1px solid #1B2436', borderRadius: 10, padding: '9px 10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: '0.1em', color: '#7A8BA0' }}>{p.sym}</span>
              <span style={{ fontSize: 8, fontWeight: 700, color: '#0ECB81', fontFamily: "'SF Mono', Menlo, monospace" }}>{p.chg}</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '-0.02em', color: '#FFFFFF', marginTop: 3 }}>{p.price}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
              <span style={{ fontSize: 7, color: '#7A8BA0', fontFamily: "'SF Mono', Menlo, monospace" }}>7d: {p.wk}</span>
              <span style={{ fontSize: 6.5, fontWeight: 700, color: '#0ECB81', background: 'rgba(14,203,129,0.1)', borderRadius: 4, padding: '1.5px 4px' }}>
                <span style={{ whiteSpace: 'nowrap' }}>CS {p.cs}</span>
              </span>
            </div>
          </div>
        ))}
        <div style={{ background: '#0D1524', border: '1px solid #1B2436', borderRadius: 10, padding: '9px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.12em', color: '#7A8BA0' }}>FEAR & GREED</span>
          <svg width={58} height={34} viewBox="0 0 100 58">
            <path d="M10 52 A40 40 0 0 1 90 52" fill="none" stroke="#1B2436" strokeWidth={8} strokeLinecap="round" />
            <path d="M10 52 A40 40 0 0 1 76 22" fill="none" stroke="#0ECB81" strokeWidth={8} strokeLinecap="round" />
            <text x={50} y={50} textAnchor="middle" fontSize={19} fontWeight={800} fill="#FFFFFF">72</text>
          </svg>
          <span style={{ fontSize: 7, fontWeight: 700, color: '#0ECB81' }}>Greed</span>
        </div>
      </div>

      <div style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: '0.14em', color: '#7A8BA0', margin: '12px 0 6px' }}>
        INTELLIGENCE FEED
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {FEED.map((f) => (
          <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#0D1524', border: '1px solid #1B2436', borderRadius: 10, padding: '8px 10px' }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, borderRadius: '50%', background: f.iconBg, fontSize: 8, fontWeight: 800, color: '#060B14', flex: 'none' }}>
              {f.ic}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: '#FFFFFF' }}>{f.name}</div>
              <div style={{ fontSize: 7, color: '#7A8BA0' }}>{f.sub}</div>
            </div>
            <span style={{ fontSize: 6.5, fontWeight: 700, color: f.tagColor, background: f.tagBg, border: `1px solid ${f.tagBorder}`, borderRadius: 999, padding: '2px 6px', textTransform: 'uppercase' }}>
              {f.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// scr1 — reference lines 172-192.
function ScreenerScreen() {
  return (
    <div>
      <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-0.02em', color: '#FFFFFF' }}>AI Screener</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#0D1524', border: '1px solid #2A3B55', borderRadius: 10, padding: '9px 10px', marginTop: 10 }}>
        <svg width={11} height={11} viewBox="0 0 20 20" fill="none" stroke="#0ECB81" strokeWidth={2} strokeLinecap="round">
          <path d="M8.5 3a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z M12.5 12.5 17 17" />
        </svg>
        <span style={{ fontSize: 8.5, color: '#E7E9EC' }}>large caps with rising on-chain activity</span>
        <span style={{ width: 1, height: 10, background: '#0ECB81', animation: 'prism-scr-blink 1s step-end infinite' }} />
      </div>
      <div style={{ fontSize: 7, color: '#7A8BA0', margin: '8px 0 6px', fontFamily: "'SF Mono', Menlo, monospace" }}>
        ✓ 12,480 assets screened · 3 matches
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {SCREENER_ROWS.map((r) => (
          <div key={r.rank} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#0D1524', border: '1px solid #1B2436', borderRadius: 10, padding: '9px 10px' }}>
            <span style={{ fontSize: 8, fontWeight: 700, color: '#7A8BA0', width: 10 }}>{r.rank}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: '#FFFFFF' }}>{r.name}</div>
              <div style={{ fontSize: 7, color: '#7A8BA0' }}>{r.why}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#0ECB81' }}>{r.cs}</div>
              <div style={{ fontSize: 6, color: '#7A8BA0' }}>PRISM SCORE</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(14,203,129,0.06)', border: '1px solid rgba(14,203,129,0.2)', borderRadius: 10, padding: '8px 10px', marginTop: 8 }}>
        <span style={{ fontSize: 8 }}>✨</span>
        <span style={{ fontSize: 7.5, lineHeight: 1.5, color: '#A8B3C4' }}>
          All three show accelerating active addresses with funding rates still neutral — early-cycle accumulation.
        </span>
      </div>
    </div>
  );
}

// scr2 — reference lines 195-213.
function ScreensScreen() {
  return (
    <div>
      <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-0.02em', color: '#FFFFFF' }}>Public Screens</div>
      <div style={{ fontSize: 7, color: '#7A8BA0', fontFamily: "'SF Mono', Menlo, monospace", marginTop: 2 }}>
        Curated by CryptoPrism Research
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
        {PUB_SCREENS.map((s) => (
          <div key={s.name} style={{ background: '#0D1524', border: '1px solid #1B2436', borderRadius: 11, padding: '10px 11px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 9.5, fontWeight: 700, color: '#FFFFFF' }}>{s.name}</span>
              <span style={{ fontSize: 9, fontWeight: 800, color: '#0ECB81', fontFamily: "'SF Mono', Menlo, monospace" }}>{s.ret}</span>
            </div>
            <div style={{ fontSize: 7, color: '#7A8BA0', marginTop: 3 }}>{s.sub}</div>
            <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
              <span style={{ fontSize: 6.5, fontWeight: 700, color: '#7A8BA0', border: '1px solid #1B2436', borderRadius: 4, padding: '2px 5px' }}>{s.n} assets</span>
              <span style={{ fontSize: 6.5, fontWeight: 700, color: '#0ECB81', background: 'rgba(14,203,129,0.1)', borderRadius: 4, padding: '2px 5px' }}>30d</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// scr3 — reference lines 216-235.
function AnalyticsScreen() {
  return (
    <div>
      <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-0.02em', color: '#FFFFFF' }}>Analytics</div>
      <div style={{ fontSize: 7, color: '#7A8BA0', fontFamily: "'SF Mono', Menlo, monospace", marginTop: 2 }}>
        BTC / USD · 1D
      </div>
      <div style={{ background: '#0D1524', border: '1px solid #1B2436', borderRadius: 11, padding: 10, marginTop: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: '#FFFFFF' }}>$64,695</span>
          <span style={{ fontSize: 8, fontWeight: 700, color: '#0ECB81', fontFamily: "'SF Mono', Menlo, monospace" }}>+3.27%</span>
        </div>
        <svg width="100%" height={64} viewBox="0 0 240 70" preserveAspectRatio="none" style={{ marginTop: 6 }}>
          <path d="M0 58 L20 52 L40 55 L60 42 L80 46 L100 33 L120 38 L140 24 L160 29 L180 16 L200 20 L220 10 L240 14 L240 70 L0 70 Z" fill="rgba(14,203,129,0.08)" />
          <path d="M0 58 L20 52 L40 55 L60 42 L80 46 L100 33 L120 38 L140 24 L160 29 L180 16 L200 20 L220 10 L240 14" fill="none" stroke="#0ECB81" strokeWidth={1.6} />
          <line x1={0} y1={30} x2={240} y2={30} stroke="#2A3B55" strokeWidth={0.7} strokeDasharray="3 3" />
        </svg>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 5, marginTop: 7 }}>
        <div style={{ background: '#0D1524', border: '1px solid #1B2436', borderRadius: 9, padding: '7px 8px' }}>
          <div style={{ fontSize: 6, fontWeight: 700, color: '#7A8BA0', letterSpacing: '0.08em' }}>RSI (14)</div>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: '#FFFFFF', marginTop: 2 }}>61.4</div>
        </div>
        <div style={{ background: '#0D1524', border: '1px solid #1B2436', borderRadius: 9, padding: '7px 8px' }}>
          <div style={{ fontSize: 6, fontWeight: 700, color: '#7A8BA0', letterSpacing: '0.08em' }}>FUNDING</div>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: '#0ECB81', marginTop: 2 }}>+0.01%</div>
        </div>
        <div style={{ background: '#0D1524', border: '1px solid #1B2436', borderRadius: 9, padding: '7px 8px' }}>
          <div style={{ fontSize: 6, fontWeight: 700, color: '#7A8BA0', letterSpacing: '0.08em' }}>OI 24H</div>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: '#FFFFFF', marginTop: 2 }}>$31.2B</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(14,203,129,0.06)', border: '1px solid rgba(14,203,129,0.2)', borderRadius: 10, padding: '8px 10px', marginTop: 8 }}>
        <span style={{ fontSize: 8 }}>✨</span>
        <span style={{ fontSize: 7.5, lineHeight: 1.5, color: '#A8B3C4' }}>
          Structure remains bullish above $61.8k. Momentum cooling but no distribution signature yet.
        </span>
      </div>
    </div>
  );
}

// scr4 — reference lines 238-253.
function NewsScreen() {
  return (
    <div>
      <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-0.02em', color: '#FFFFFF' }}>News Intelligence</div>
      <div style={{ fontSize: 7, color: '#7A8BA0', fontFamily: "'SF Mono', Menlo, monospace", marginTop: 2 }}>
        Ranked by market impact
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
        {NEWS_ROWS.map((n) => (
          <div key={n.h} style={{ background: '#0D1524', border: '1px solid #1B2436', borderRadius: 11, padding: '10px 11px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <span style={{ fontSize: 9, fontWeight: 700, lineHeight: 1.4, color: '#FFFFFF' }}>{n.h}</span>
              <span style={{ flex: 'none', alignSelf: 'flex-start', fontSize: 7, fontWeight: 800, color: n.impactColor, border: `1px solid ${n.impactBorder}`, borderRadius: 5, padding: '2px 5px' }}>
                {n.impact}
              </span>
            </div>
            <div style={{ fontSize: 7, color: '#7A8BA0', marginTop: 4 }}>{n.src} · {n.ago}</div>
            <div style={{ fontSize: 7.5, lineHeight: 1.5, color: '#A8B3C4', marginTop: 4 }}>✨ {n.ai}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// scr5 — reference lines 256-269.
function CalendarScreen() {
  return (
    <div>
      <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-0.02em', color: '#FFFFFF' }}>Economic Calendar</div>
      <div style={{ fontSize: 7, color: '#7A8BA0', fontFamily: "'SF Mono', Menlo, monospace", marginTop: 2 }}>
        Week of Jul 14 – 18
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
        {CAL_ROWS.map((c) => (
          <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 9, background: '#0D1524', border: '1px solid #1B2436', borderRadius: 11, padding: '9px 11px' }}>
            <div style={{ flex: 'none', textAlign: 'center', width: 30 }}>
              <div style={{ fontSize: 8.5, fontWeight: 800, color: '#FFFFFF' }}>{c.day}</div>
              <div style={{ fontSize: 6, color: '#7A8BA0', fontFamily: "'SF Mono', Menlo, monospace" }}>{c.time}</div>
            </div>
            <div style={{ width: 1, height: 20, background: '#1B2436' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: '#FFFFFF' }}>{c.name}</div>
              <div style={{ fontSize: 7, color: '#7A8BA0' }}>{c.note}</div>
            </div>
            <span style={{ fontSize: 6.5, fontWeight: 800, color: c.impColor, background: c.impBg, borderRadius: 5, padding: '2px 5px' }}>{c.imp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const SCREENS = [DashboardScreen, ScreenerScreen, ScreensScreen, AnalyticsScreen, NewsScreen, CalendarScreen];

export function MobileProduct() {
  const [toolIdx, setToolIdx] = useState(0);
  const holdUntil = useRef(0);

  // Autoplay — reference lines 461-465: every 2500ms, advance to the next
  // tool unless the hold window (set by a tab click / pointerdown) hasn't
  // expired yet.
  useEffect(() => {
    const timer = setInterval(() => {
      if (Date.now() < holdUntil.current) return;
      setToolIdx((i) => (i + 1) % 6);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, []);

  const holdTabRow = () => {
    holdUntil.current = Date.now() + HOLD_MS;
  };

  const Screen = SCREENS[toolIdx];

  return (
    <section style={{ padding: '48px 22px', background: '#FFFFFF', borderTop: '1px solid #E7E9EC' }}>
      <div
        data-reveal
        style={{
          textAlign: 'center', opacity: 0, transform: 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', color: '#0B8D84' }}>
          THE PLATFORM
        </div>
        <h2 style={{ margin: '12px 0 0', fontSize: 28, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Six tools. One engine.
        </h2>
      </div>

      <div
        data-reveal
        style={{
          margin: '26px auto 0', width: 336, background: '#0A0F1A', border: '1px solid #1B2436',
          borderRadius: 30, padding: 10, boxShadow: '0 24px 60px rgba(11,18,32,0.22)',
          opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <div style={{ background: '#060B14', borderRadius: 22, overflow: 'hidden' }}>
          <div
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px 0',
              fontSize: 9.5, fontWeight: 600, color: '#E7E9EC',
            }}
          >
            <span>9:41</span>
            <span style={{ width: 64, height: 16, background: '#0A0F1A', borderRadius: 999 }} />
            <svg width={34} height={9} viewBox="0 0 34 10" fill="#E7E9EC">
              <path d="M0 7h2v3H0z M3.5 5h2v5h-2z M7 3h2v7H7z M10.5 1h2v9h-2z" />
              <rect x={17} y={2} width={14} height={7} rx={2} fill="none" stroke="#E7E9EC" strokeWidth={1} />
              <rect x={18.5} y={3.5} width={9} height={4} rx={1} />
            </svg>
          </div>
          <div style={{ padding: '12px 14px 14px', height: 352, boxSizing: 'border-box', overflow: 'hidden' }}>
            <div key={toolIdx} style={{ animation: 'prism-scr-in 0.4s ease' }}>
              <Screen />
            </div>
          </div>
        </div>
      </div>

      <div
        data-reveal
        style={{
          textAlign: 'center', fontSize: 11.5, color: '#98A2B3', marginTop: 12,
          opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        {PHONE_CAPTIONS[toolIdx]}
      </div>

      <div
        onPointerDown={holdTabRow}
        style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 18, flexWrap: 'wrap' }}
      >
        {TOOL_TABS.map((tb, i) => {
          const on = i === toolIdx;
          const ink = on ? '#FFFFFF' : '#475467';
          const bg = on ? '#0B1220' : '#FFFFFF';
          const border = on ? '#0B1220' : '#E7E9EC';
          return (
            <button
              key={tb.name}
              type="button"
              onClick={() => {
                holdUntil.current = Date.now() + HOLD_MS;
                setToolIdx(i);
              }}
              style={{
                fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11,
                fontWeight: 600, color: ink, background: bg, border: `1px solid ${border}`, borderRadius: 999,
                padding: '8px 12px', cursor: 'pointer', transition: 'all 0.25s ease',
              }}
            >
              <svg width={13} height={13} viewBox="0 0 20 20" fill="none" stroke={ink} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d={tb.icon} />
              </svg>
              {tb.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default MobileProduct;
