// v5 Hero (CryptoPrism Hero.dc.html v5, lines 54-104) — dark aurora hero.
// Replaces the v4 light two-column hero wholesale: the source-badge diagram,
// flow-path SVG, "Intelligence Engine" label and the three floating result
// cards are gone in v5. The trust bar now lives at the hero's bottom as a
// dark glass strip (design lines 88-102) instead of a standalone section.
// CTAs: Launch Beta opens the EarlyAccessModal via the
// cta-early-access-trigger class (global click listener in App.tsx); the
// secondary now scrolls to the platform tour instead of promising a video —
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

    // FROZEN 2026-07-22 — one frame, for everyone, not just reduced-motion.
    // This was a requestAnimationFrame loop redrawing 170 stars and 6 sine
    // streams every frame for as long as the page stayed open: an infinite
    // loop by motion.md's definition and a permanent main-thread cost for
    // drift nobody reads. The starfield's job is texture, and a still frame
    // does that at zero ongoing expense.
    //
    // ResizeObserver, not a window resize listener: fitPages re-zooms and
    // re-widths this section AFTER mount (and again at 400ms and 1500ms)
    // without firing a window resize, so a once-only paint would end up
    // stretched against a canvas that changed size underneath it.
    drawBg();
    const ro = new ResizeObserver(() => drawBg());
    ro.observe(cv);
    return () => ro.disconnect();
  }, []);

  return <canvas ref={ref} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}

export function Hero({ anchorRef }: { anchorRef: RefObject<HTMLDivElement | null> }) {
  // rotating headline word — design script line 1285: every 2600ms unless the
  // tab is hidden; keyed span replays the wordIn animation on each cycle
  const [wIdx, setWIdx] = useState(0);
  useEffect(() => {
    // Guarded 2026-07-22: the word swap is auto-updating content, so it stops
    // for anyone who asked the OS to minimise motion. The CSS rule only kills
    // the wordIn keyframe, not the timer that changes the text underneath it.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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

  // CTA micro-interactions. ONE signal per state (slop-test gate 13): hover is
  // a 1px lift and nothing else, press is the spring. The buttons used to run
  // translateY + a transitioned box-shadow + a transitioned background on
  // hover simultaneously, then scale on press — four signals on one element.
  // motion.md's button recipe is exactly translateY(-1px) on hover, spring on
  // release, so that is what this is now.
  const ctaEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduceRef.current) return;
    animate(e.currentTarget, { translateY: -1, duration: 120, ease: 'outQuad' });
  };
  const ctaLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduceRef.current) return;
    animate(e.currentTarget, { translateY: 0, scale: 1, duration: 120, ease: 'outQuad' });
  };
  const ctaDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduceRef.current) return;
    animate(e.currentTarget, { scale: 0.97, duration: 120, ease: 'outQuad' });
  };
  const ctaUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduceRef.current) return;
    animate(e.currentTarget, { scale: 1, ease: createSpring({ stiffness: 320, damping: 14 }) });
  };

  return (
    <section
      ref={rootRef}
      data-page=""
      style={{
        position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(1400px 900px at 74% 40%, var(--prism-hero-1) 0%, var(--prism-hero-2) 55%, var(--prism-hero-3) 100%)',
      }}
    >
      {/* animated background stack (design lines 55-65) */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {/* FROZEN 2026-07-22. These two blooms drifted on 16s and 21s infinite
            loops. motion.md bans infinite loops outside functional loaders,
            and gate 29's atmospheric allowance is specifically for blooms that
            are fixed, not animated — a bloom that never stops moving pulls the
            eye off the headline for as long as the page is open. They keep
            their identity (0%) position and size, which is what the keyframes
            started from, so the composition is unchanged; it just holds still.
            The prism canvas is a separate component and still moves — the hero
            has a subject in motion, it no longer has a moving backdrop too. */}
        <div style={{ position: 'absolute', left: '55%', top: '8%', width: 720, height: 560, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(15,174,114,0.20), transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', left: '62%', top: '30%', width: 560, height: 480, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(34,211,238,0.13), transparent 70%)', filter: 'blur(70px)' }} />
        {/* The third bloom was rgba(124,58,237) — violet. It was the only purple
            anywhere on the site, off the brand palette entirely, and a
            purple-to-cyan blurred mesh behind a hero is the single most
            pattern-matched generated-design default of the last few years.
            Removed 2026-07-22; the green + cyan blooms carry the aurora. */}
        {/* Decoration budget (2026-07-22). The hero was carrying SEVEN stacked
            decorative systems — base gradient, 2 aurora blooms, two dot-grids,
            a twinkle layer, a drifting wave set, a 170-star parallax canvas and
            a corner grid — five of them on infinite loops. motion.md bans
            infinite loops outside functional loaders, and past a point the
            layers stop reading as atmosphere and start reading as "something
            had to go here". Cut: the second dot-grid (the twinkle layer, which
            duplicated what the canvas starfield already does) and the wave
            drift animation. Kept: the base gradient, two blooms, one dot-grid,
            the canvas starfield, the static waves, the corner grid. Animated
            layers halved; nothing the eye was actually reading was lost. */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1.7px), radial-gradient(circle, rgba(255,255,255,0.28) 1px, transparent 1.7px)', backgroundSize: '210px 190px, 130px 120px', backgroundPosition: '14px 8px, 70px 84px' }} />
        <svg width="2400" height="100%" viewBox="0 0 2400 800" preserveAspectRatio="none" aria-hidden="true" style={{ position: 'absolute', left: 0, bottom: 0, height: '100%', opacity: 0.42 }}>
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

      <div style={{ position: 'relative', zIndex: 4, maxWidth: 1560, margin: '0 auto', padding: '92px 44px 120px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', boxSizing: 'border-box', width: '100%' }}>
        <div data-anim style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(52,211,153,0.4)', background: 'rgba(52,211,153,0.08)', backdropFilter: 'blur(4px)', borderRadius: 999, padding: '7px 16px', fontSize: 13, fontWeight: 500, color: 'var(--prism-focus)' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--prism-focus)', display: 'inline-block' }} />
          Now in Private Beta
        </div>
        <h1 data-anim style={{ fontFamily: 'var(--font-heading)', margin: '36px 0 0', maxWidth: 800, fontSize: 82, fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.025em', color: 'var(--prism-on-dark)' }}>
          AI-Native Financial Intelligence for Modern{' '}
          {/* Solid accent, not a background-clip gradient fill. Gradient text is
              the fastest-read "AI generated" tell there is and no genre allows
              it; the rotation is the interesting idea here, the gradient was
              just decoration on top of it. */}
          <span
            key={wIdx}
            style={{
              color: 'var(--prism-focus)',
              animation: 'prism-wordIn 0.55s var(--prism-ease-out)', display: 'inline-block',
            }}
          >
            {HERO_WORDS[wIdx]}
          </span>
        </h1>
        <p data-anim style={{ margin: '30px 0 0', maxWidth: 620, fontSize: 22, fontWeight: 400, lineHeight: 1.5, color: 'var(--prism-on-dark-2)' }}>
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
            // Flat accent, not a gradient — gate 2's atmospheric override
            // allows radial gradients on BACKGROUNDS only, never on text or
            // pill buttons. It also means the page finally has ONE primary-CTA
            // voice: this, the nav's outlined variant and the closing section's
            // fill were three different treatments of the same action.
            // The 40px green box-shadow is gone with it: a soft coloured halo
            // on a dark surface is the shadow-glow-on-dark tell, and motion.md
            // bans transitioning box-shadow on dark outright.
            style={{
              fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 12, fontSize: 16, fontWeight: 600,
              color: 'var(--prism-accent-ink)', background: 'var(--accent)', border: '1px solid var(--accent)',
              borderRadius: 999, padding: '16px 30px', cursor: 'pointer',
              transition: 'background-color var(--prism-dur-short) var(--prism-ease-out), border-color var(--prism-dur-short) var(--prism-ease-out)',
            }}
          >
            Launch Beta
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" aria-hidden="true"><path d="M1 7h13M9.5 1.8 14.7 7l-5.2 5.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          {/* Was "Watch Platform Demo" with a play glyph, wired to the same
              early-access modal as the primary — it promised a video that does
              not exist and opened a form instead. It now does what it says and
              scrolls to the platform tour, which is a real thing on this page. */}
          <button
            type="button"
            onClick={() => document.getElementById('prism-platform')?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={ctaEnter}
            onMouseLeave={ctaLeave}
            onMouseDown={ctaDown}
            onMouseUp={ctaUp}
            style={{
              fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 11, fontSize: 16, fontWeight: 600,
              color: 'var(--prism-on-dark)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 999, padding: '15px 26px', cursor: 'pointer', backdropFilter: 'blur(6px)',
              transition: 'background-color var(--prism-dur-short) var(--prism-ease-out)',
            }}
          >
            See the platform
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" aria-hidden="true"><path d="M8 1v11M3 7.5 8 12.5l5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
        {/* Was "No credit card required · Private beta access · Enterprise
            ready". There is no card anywhere in the funnel — the CTA opens an
            early-access form — so that line was template reassurance for a
            checkout that does not exist. And "Enterprise ready" is the same
            claim screen 4 explicitly dropped as unverifiable at private-beta
            stage (it removed SOC 2, VPC/on-prem and SLA-backed uptime for
            exactly that reason). Both replaced with things that are true. */}
        <div data-anim style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 26, fontSize: 13, fontWeight: 500, color: 'var(--prism-on-dark-3)' }}>
          <span>Private beta access</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--prism-rule-dark)' }} />
          <span>Onboarding select teams</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--prism-rule-dark)' }} />
          <span>Every score source-cited</span>
        </div>
      </div>

      {/* trust bar — dark glass strip merged into the hero (design lines 88-102) */}
      <div data-anim style={{ position: 'relative', width: '100%', boxSizing: 'border-box', maxWidth: 1560, margin: '0 auto', alignSelf: 'stretch', padding: '0 44px 36px' }}>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: '22px 40px', backdropFilter: 'blur(8px)' }}>
          {/* Was "Trusted by builders creating the future of finance". Screen 4
              already corrected this exact pattern — its own comment records
              that "Trusted by teams at [industries]" implied existing paying
              clients and was reframed as target audience. The hero was still
              making the un-reframed version of the claim, so the page
              contradicted its own correction. These five are categories, not
              customers; "Built for" is what they actually are. */}
          <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 500, letterSpacing: '0.04em', color: 'var(--prism-on-dark-3)' }}>
            Built for the teams making the decisions
          </div>
          <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', marginTop: 16 }}>
            {TRUST_ITEMS.map((item, i) => (
              <div key={item.label} style={{ display: 'contents' }}>
                {i > 0 && <div style={{ width: 1, background: 'rgba(255,255,255,0.1)' }} />}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, fontSize: 15, fontWeight: 600, color: 'var(--prism-on-dark)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--prism-on-dark-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
