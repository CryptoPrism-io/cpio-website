// v5 Hero (CryptoPrism Hero.dc.html v5, lines 54-104) — dark aurora hero.
// Replaces the v4 light two-column hero wholesale: the source-badge diagram,
// flow-path SVG, "Intelligence Engine" label and the three floating result
// cards are gone in v5. The trust bar now lives at the hero's bottom as a
// dark glass strip (design lines 88-102) instead of a standalone section.
// CTAs (Launch Beta / Watch Platform Demo) open the EarlyAccessModal via the
// cta-early-access-trigger class (global click listener in App.tsx) — wired
// 2026-07-20.
// The prism canvas (PrismCanvas.tsx) is unchanged; only its hero anchor moved
// (design line 71: 74%/50%, 540x660, centered).

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode, RefObject } from 'react';
import { animate, stagger, createSpring } from 'animejs';
import { INTRO } from '../motion';

const HERO_WORDS = ['Markets.', 'Traders.', 'Investors.', 'Funds.', 'Analysts.'];

const TRUST_ITEMS: { label: string; icon: ReactNode }[] = [
  { label: 'Funds', icon: <path d="M3 9.5 12 4l9 5.5 M5 10v8 M9.5 10v8 M14.5 10v8 M19 10v8 M3 19.5h18" /> },
  { label: 'Trading Firms', icon: <path d="M4 20V14 M9.3 20V9 M14.6 20v-7.5 M20 20V5 M4 9l5.3-4 5.3 3L20 4.5" /> },
  { label: 'Fintechs', icon: <path d="M12 3 21 8l-9 5-9-5z M4.5 11.5 12 15.7l7.5-4.2 M4.5 15.5 12 19.7l7.5-4.2" /> },
  {
    label: 'Research Teams',
    icon: (
      <>
        <circle cx="9" cy="8.5" r="3.2" />
        <path d="M3.5 19.5c.6-3.2 2.9-5 5.5-5s4.9 1.8 5.5 5 M15.5 5.8a3.2 3.2 0 0 1 0 5.4 M17.5 14.9c1.6.7 2.7 2.2 3 4.6" />
      </>
    ),
  },
  { label: 'APIs', icon: <path d="M8.5 7.5 4 12l4.5 4.5 M15.5 7.5 20 12l-4.5 4.5" /> },
];

// Full-bleed hero background canvas — port of the design's drawBg (script
// lines 1355-1389): 170 upward-drifting parallax stars (22% dark-ink, rest
// accent-tinted) + 6 slow sine "data streams". Reduced motion renders a
// single static frame.
type Star = { x: number; y: number; z: number; ph: number; ink: boolean };
type Stream = { y0: number; amp: number; ph: number; sp: number };

function HeroBgCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const stars: Star[] = [];
    for (let i = 0; i < 170; i++) {
      stars.push({ x: Math.random(), y: Math.random(), z: 0.25 + Math.random() * 0.75, ph: Math.random() * Math.PI * 2, ink: Math.random() < 0.22 });
    }
    const streams: Stream[] = [];
    for (let i = 0; i < 6; i++) {
      streams.push({ y0: 0.12 + i * 0.15, amp: 18 + Math.random() * 30, ph: Math.random() * Math.PI * 2, sp: 0.05 + Math.random() * 0.06 });
    }
    const t0 = performance.now();

    const drawBg = () => {
      const r = cv.getBoundingClientRect();
      if (r.bottom < 0 || !r.width) return;
      const w = Math.round(r.width);
      const h = Math.round(r.height);
      if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
      const c = cv.getContext('2d');
      if (!c) return;
      const t = (performance.now() - t0) / 1000;
      c.clearRect(0, 0, w, h);
      // accent #0FAE72 → 15,174,114
      for (const s of streams) {
        c.beginPath();
        for (let x = 0; x <= w; x += 16) {
          const y = s.y0 * h + Math.sin(x / 210 + t * s.sp * 8 + s.ph) * s.amp + Math.sin(x / 90 - t * s.sp * 5) * s.amp * 0.3;
          if (x === 0) c.moveTo(x, y); else c.lineTo(x, y);
        }
        c.strokeStyle = 'rgba(15,174,114,0.07)';
        c.lineWidth = 1;
        c.stroke();
      }
      for (const s of stars) {
        const y = ((s.y - t * 0.008 * s.z) % 1 + 1) % 1;
        const tw = 0.25 + 0.55 * Math.abs(Math.sin(t * 0.5 + s.ph));
        const cxp = ((s.x + Math.sin(t * 0.05 + s.ph) * 0.006 * s.z) % 1) * w;
        c.fillStyle = s.ink ? `rgba(11,18,32,${tw * 0.35})` : `rgba(15,174,114,${tw * s.z})`;
        const sz = s.z * 2.1;
        c.fillRect(cxp, y * h, sz, sz);
      }
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      drawBg();
      return;
    }
    let raf = 0;
    const loop = () => {
      drawBg();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}

export function Hero({ anchorRef }: { anchorRef: RefObject<HTMLDivElement | null> }) {
  // rotating headline word — design script line 1285: every 2600ms unless the
  // tab is hidden; keyed span replays the wordIn animation on each cycle
  const [wIdx, setWIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      if (!document.hidden) setWIdx((i) => (i + 1) % HERO_WORDS.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  // anime.js entrance cascade (2026-07-21 motion pass) — on mount, the hero
  // content (pill → headline → sub → CTAs → trust strip, tagged [data-anim])
  // rises + fades in with a staggered delay. useLayoutEffect pre-hides the
  // elements before paint so there's no flash, and it runs before PrismHome's
  // fitPages (a passive effect), so the zoom sizing is applied on top cleanly.
  // Reduced-motion: skip entirely — elements keep their natural visible state.
  const rootRef = useRef<HTMLElement>(null);
  const reduceRef = useRef(false);
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    reduceRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceRef.current) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-anim]'));
    if (!targets.length) return;
    targets.forEach((t) => { t.style.opacity = '0'; });
    const anim = animate(targets, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: INTRO.contentDuration,
      delay: stagger(INTRO.contentStagger, { start: INTRO.contentStart }),
      ease: 'outCubic',
    });
    return () => {
      anim.revert();
      targets.forEach((t) => { t.style.opacity = ''; t.style.transform = ''; });
    };
  }, []);

  // CTA micro-interactions — hover lift + press spring, reduced-motion guarded.
  const ctaEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduceRef.current) return;
    animate(e.currentTarget, { translateY: -3, duration: 220, ease: 'outQuad' });
  };
  const ctaLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduceRef.current) return;
    animate(e.currentTarget, { translateY: 0, scale: 1, duration: 320, ease: 'outQuad' });
  };
  const ctaDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduceRef.current) return;
    animate(e.currentTarget, { scale: 0.96, duration: 120, ease: 'outQuad' });
  };
  const ctaUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduceRef.current) return;
    animate(e.currentTarget, { scale: 1, ease: createSpring({ stiffness: 320, damping: 14 }) });
  };

  return (
    <section
      ref={rootRef}
      data-page="76"
      style={{
        position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(1400px 900px at 74% 40%, #0B1B2E 0%, #060D18 55%, #04070E 100%)',
      }}
    >
      {/* animated background stack (design lines 55-65) */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: '55%', top: '8%', width: 720, height: 560, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(15,174,114,0.20), transparent 70%)', filter: 'blur(60px)', animation: 'prism-auroraA 16s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', left: '62%', top: '30%', width: 560, height: 480, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(34,211,238,0.13), transparent 70%)', filter: 'blur(70px)', animation: 'prism-auroraB 21s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', left: '-10%', top: '45%', width: 640, height: 520, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(124,58,237,0.10), transparent 70%)', filter: 'blur(80px)', animation: 'prism-auroraC 24s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1.7px), radial-gradient(circle, rgba(255,255,255,0.28) 1px, transparent 1.7px)', backgroundSize: '210px 190px, 130px 120px', backgroundPosition: '14px 8px, 70px 84px' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(52,211,153,0.6) 1.2px, transparent 2px)', backgroundSize: '290px 260px', backgroundPosition: '150px 40px', animation: 'prism-twinkle 5s ease-in-out infinite' }} />
        <svg width="2400" height="100%" viewBox="0 0 2400 800" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, bottom: 0, height: '100%', opacity: 0.5, animation: 'prism-waveDrift 26s linear infinite alternate' }}>
          <path d="M0 560 C300 500 500 640 800 590 S1400 480 1700 560 S2200 660 2400 590" fill="none" stroke="rgba(15,174,114,0.16)" strokeWidth="1.4" />
          <path d="M0 640 C350 590 550 700 900 655 S1500 560 1800 640 S2250 720 2400 660" fill="none" stroke="rgba(34,211,238,0.11)" strokeWidth="1.2" />
          <path d="M0 470 C320 430 560 540 880 500 S1450 400 1750 470 S2200 560 2400 500" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </svg>
      </div>
      {/* right-side grid overlay (design line 68, showGrid on) */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '58%', height: '100%', backgroundImage: 'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)', backgroundSize: '44px 44px', WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 20%, transparent 90%)', maskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 20%, transparent 90%)', pointerEvents: 'none' }} />
      <HeroBgCanvas />
      {/* prism travel anchor (design line 71) — right-of-center dock */}
      <div ref={anchorRef} style={{ position: 'absolute', left: '74%', top: '50%', width: 540, height: 660, transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 4, maxWidth: 1560, margin: '0 auto', padding: '110px 44px 80px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', boxSizing: 'border-box', width: '100%' }}>
        <div data-anim style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(52,211,153,0.4)', background: 'rgba(52,211,153,0.08)', backdropFilter: 'blur(4px)', borderRadius: 999, padding: '7px 16px', fontSize: 13, fontWeight: 500, color: '#34D399' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#34D399', display: 'inline-block' }} />
          Now in Private Beta
        </div>
        <h1 data-anim style={{ fontFamily: 'var(--font-heading)', margin: '36px 0 0', maxWidth: 800, fontSize: 82, fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.025em', color: '#FFFFFF' }}>
          AI-Native Financial Intelligence for Modern{' '}
          <span
            key={wIdx}
            style={{
              background: 'linear-gradient(120deg, var(--accent) 20%, var(--accent-2) 85%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
              animation: 'prism-wordIn 0.55s ease', display: 'inline-block',
            }}
          >
            {HERO_WORDS[wIdx]}
          </span>
        </h1>
        <p data-anim style={{ margin: '30px 0 0', maxWidth: 620, fontSize: 22, fontWeight: 400, lineHeight: 1.5, color: '#A8B3C4' }}>
          Fragmented market data in. One explainable decision out.
        </p>
        <div data-anim style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 48 }}>
          <button
            type="button"
            className="cta-early-access-trigger"
            onMouseEnter={ctaEnter}
            onMouseLeave={ctaLeave}
            onMouseDown={ctaDown}
            onMouseUp={ctaUp}
            style={{
              fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 12, fontSize: 16, fontWeight: 600,
              color: '#04070E', background: 'linear-gradient(135deg, #34D399, var(--accent))', border: 'none',
              borderRadius: 16, padding: '17px 30px', cursor: 'pointer', boxShadow: '0 14px 40px rgba(15,174,114,0.35)', transition: 'box-shadow 0.25s ease, background 0.25s ease',
            }}
          >
            Launch Beta
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none"><path d="M1 7h13M9.5 1.8 14.7 7l-5.2 5.2" stroke="#04070E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button
            type="button"
            className="cta-early-access-trigger"
            onMouseEnter={ctaEnter}
            onMouseLeave={ctaLeave}
            onMouseDown={ctaDown}
            onMouseUp={ctaUp}
            style={{
              fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 11, fontSize: 16, fontWeight: 600,
              color: '#FFFFFF', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 16, padding: '16px 26px', cursor: 'pointer', backdropFilter: 'blur(6px)', transition: 'box-shadow 0.25s ease, background 0.25s ease',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8.5" stroke="#FFFFFF" strokeWidth="1.5" /><path d="M8.3 7.2v5.6L12.8 10Z" fill="#FFFFFF" /></svg>
            Watch Platform Demo
          </button>
        </div>
        <div data-anim style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 26, fontSize: 13, fontWeight: 500, color: '#7A8BA0' }}>
          <span>No credit card required</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#33415C' }} />
          <span>Private beta access</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#33415C' }} />
          <span>Enterprise ready</span>
        </div>
      </div>

      {/* trust bar — dark glass strip merged into the hero (design lines 88-102) */}
      <div data-anim style={{ position: 'relative', width: '100%', boxSizing: 'border-box', maxWidth: 1560, margin: '0 auto', alignSelf: 'stretch', padding: '0 44px 36px' }}>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: '22px 40px', backdropFilter: 'blur(8px)' }}>
          <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 500, letterSpacing: '0.04em', color: '#7A8BA0' }}>
            Trusted by builders creating the future of finance
          </div>
          <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', marginTop: 16 }}>
            {TRUST_ITEMS.map((item, i) => (
              <div key={item.label} style={{ display: 'contents' }}>
                {i > 0 && <div style={{ width: 1, background: 'rgba(255,255,255,0.1)' }} />}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, fontSize: 15, fontWeight: 600, color: '#E7E9EC' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A8BA0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {item.icon}
                  </svg>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
