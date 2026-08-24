// v5 Hero (CryptoPrism Hero.dc.html v5, lines 54-104) — dark aurora hero.
// Replaces the v4 light two-column hero wholesale: the source-badge diagram,
// flow-path SVG, "Intelligence Engine" label and the three floating result
// cards are gone in v5. The trust bar now lives at the hero's bottom as a
// dark glass strip (design lines 88-102) instead of a standalone section.
// The single CTA opens the live product. A duplicate local-scroll action was
// removed so the hero has one clear next step.
// The prism canvas (PrismCanvas.tsx) is unchanged; only its hero anchor moved
// (design line 71: 74%/50%, 540x660, centered).

import { useLayoutEffect, useRef } from 'react';
import type { ReactNode, RefObject } from 'react';
import { animate, stagger, createSpring } from 'animejs';
import { APP_URL } from '../../../../data/mockData';
import { INTRO } from '../motion';

const TRUST_ITEMS: { label: string; icon: ReactNode }[] = [
  { label: 'Funds', icon: <path d="M3 9.5 12 4l9 5.5 M5 10v8 M9.5 10v8 M14.5 10v8 M19 10v8 M3 19.5h18" /> },
  { label: 'Trading Firms', icon: <path d="M4 20V14 M9.3 20V9 M14.6 20v-7.5 M20 20V5 M4 9l5.3-4 5.3 3L20 4.5" /> },
  {
    label: 'Research Teams',
    icon: (
      <>
        <circle cx="9" cy="8.5" r="3.2" />
        <path d="M3.5 19.5c.6-3.2 2.9-5 5.5-5s4.9 1.8 5.5 5 M15.5 5.8a3.2 3.2 0 0 1 0 5.4 M17.5 14.9c1.6.7 2.7 2.2 3 4.6" />
      </>
    ),
  },
];

export function Hero({ anchorRef }: { anchorRef: RefObject<HTMLDivElement | null> }) {
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
  const ctaEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduceRef.current) return;
    animate(e.currentTarget, { translateY: -1, duration: 120, ease: 'outQuad' });
  };
  const ctaLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduceRef.current) return;
    animate(e.currentTarget, { translateY: 0, scale: 1, duration: 120, ease: 'outQuad' });
  };
  const ctaDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduceRef.current) return;
    animate(e.currentTarget, { scale: 0.97, duration: 120, ease: 'outQuad' });
  };
  const ctaUp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduceRef.current) return;
    animate(e.currentTarget, { scale: 1, ease: createSpring({ stiffness: 320, damping: 14 }) });
  };

  return (
    <section
      ref={rootRef}
      data-page=""
      style={{
        position: 'relative', overflow: 'hidden',
        background: 'var(--prism-hero-3)',
      }}
    >
      {/* One restrained halo supports the prism; the former starfield, dot
          field, contour waves and second bloom competed with the product. */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: '58%', top: '12%', width: 680, height: 620, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(15,174,114,0.16), transparent 72%)', filter: 'blur(64px)' }} />
      </div>
      {/* right-side grid overlay (design line 68, showGrid on) */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '58%', height: '100%', backgroundImage: 'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)', backgroundSize: '44px 44px', WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 20%, transparent 90%)', maskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 20%, transparent 90%)', pointerEvents: 'none' }} />
      {/* prism travel anchor (design line 71) — right-of-center dock */}
      <div ref={anchorRef} style={{ position: 'absolute', left: '74%', top: '50%', width: 540, height: 660, transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 4, maxWidth: 1560, margin: '0 auto', padding: '92px 44px 120px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', boxSizing: 'border-box', width: '100%' }}>
        <div data-anim style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(52,211,153,0.4)', background: 'rgba(52,211,153,0.08)', backdropFilter: 'blur(4px)', borderRadius: 999, padding: '7px 16px', fontSize: 13, fontWeight: 500, color: 'var(--prism-focus)' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--prism-focus)', display: 'inline-block' }} />
          Now in Private Beta
        </div>
        <h1 data-anim style={{ fontFamily: 'var(--font-heading)', margin: '36px 0 0', maxWidth: 800, fontSize: 82, fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.025em', color: 'var(--prism-on-dark)' }}>
          Explainable intelligence for <span style={{ color: 'var(--prism-focus)' }}>modern markets.</span>
        </h1>
        <p data-anim style={{ margin: '30px 0 0', maxWidth: 620, fontSize: 22, fontWeight: 400, lineHeight: 1.5, color: 'var(--prism-on-dark-2)' }}>
          Research across market, on-chain, derivatives and sentiment data &mdash; with rationale and sources attached.
        </p>
        <div data-anim style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 48 }}>
          <a
            href={APP_URL}
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
            Explore CryptoPrism
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" aria-hidden="true"><path d="M1 7h13M9.5 1.8 14.7 7l-5.2 5.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
        {/* Was "No credit card required · Private beta access · Enterprise
            ready". There is no checkout in this flow, so that line was
            template reassurance for a transaction that does not exist. And
            "Enterprise ready" is the same
            claim screen 4 explicitly dropped as unverifiable at private-beta
            stage (it removed SOC 2, VPC/on-prem and SLA-backed uptime for
            exactly that reason). Both replaced with things that are true. */}
        <div data-anim style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 26, fontSize: 13, fontWeight: 500, color: 'var(--prism-on-dark-3)' }}>
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
            Built for investment research teams
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
