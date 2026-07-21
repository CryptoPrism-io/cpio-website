import { useEffect, useLayoutEffect, useRef } from 'react';
import { animate, createTimeline, stagger } from 'animejs';
import { scrollToId } from '../hooks';
import { INTRO, prefersReducedMotion } from './motion';

// v5 nav — "Floating Glass Command Bar" (2026-07-21, user-picked concept; sizing
// + entrance revised per feedback).
//
// - OVERLAYS the hero: position:absolute over the full-viewport hero so the
//   aurora shows through the nav area — no white strip, the "main screen"
//   background IS the nav background. (PrismHome dropped the nav from fitPages
//   and made the hero full-vh to enable this.)
// - ~33% smaller than the first pass (height 62->40, fonts ~14.5->10.5, logo
//   30->20) so it reads as a light, floating control bar.
// - ENTRANCE = the finale: after the prism assembles and all hero content
//   unfolds (INTRO.navStart), the glass bar blips in at center and expands
//   equally left + right (scaleX from a center origin), then the contents fade
//   in. Only the background layer scales, so the text is never squished.
// - Interactions kept: rotating border glint, a highlight capsule that glides
//   between links (positioned in layout coords so it stays aligned under the
//   page's CSS zoom), shimmer sweep on Request Demo. All reduced-motion guarded.
//
// Destinations unchanged: Platform/Why Us/FAQ scroll; Sign In ->
// app.cryptoprism.io; Request Demo -> EarlyAccessModal (cta-early-access-trigger).

const NAV_LINKS: { label: string; id: string }[] = [
  { label: 'Platform', id: 'prism-platform' },
  { label: 'Why Us', id: 'prism-trust' },
  { label: 'FAQ', id: 'prism-faq' },
];

const glintGradient = (a: number) =>
  `conic-gradient(from ${a}deg, transparent 0deg, rgba(52,211,153,0.55) 42deg, transparent 120deg, transparent 240deg, rgba(15,174,114,0.5) 306deg, transparent 350deg)`;

export function Nav() {
  const bgRef = useRef<HTMLDivElement>(null);
  const glintRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const shimmerRef = useRef<HTMLSpanElement>(null);
  const reduceRef = useRef(false);

  // Entrance finale — blip at center, expand L+R, then reveal contents.
  useLayoutEffect(() => {
    const bg = bgRef.current;
    const content = contentRef.current;
    if (!bg || !content) return;
    reduceRef.current = prefersReducedMotion();
    if (reduceRef.current) return;
    const parts = Array.from(content.querySelectorAll<HTMLElement>('[data-navc]'));
    // pre-hide before paint (bar = a center dot; contents invisible)
    bg.style.transformOrigin = '50% 50%';
    bg.style.opacity = '0';
    bg.style.transform = 'scaleX(0.04) scaleY(0.5)';
    parts.forEach((p) => { p.style.opacity = '0'; });

    let tl: ReturnType<typeof createTimeline> | null = null;
    const id = window.setTimeout(() => {
      tl = createTimeline();
      tl.add(bg, { opacity: [0, 1], scaleY: [0.5, 1], duration: 200, ease: 'outQuad' })
        .add(bg, { scaleX: [0.04, 1], duration: 640, ease: 'outExpo' }, '-=70')
        .add(parts, { opacity: [0, 1], translateY: [6, 0], duration: 420, delay: stagger(70), ease: 'outCubic' }, '-=300');
    }, INTRO.navStart);

    return () => {
      window.clearTimeout(id);
      tl?.revert();
      bg.style.opacity = ''; bg.style.transform = '';
      parts.forEach((p) => { p.style.opacity = ''; p.style.transform = ''; });
    };
  }, []);

  // Idle life — slow rotating border glint + periodic auto-shimmer.
  useEffect(() => {
    reduceRef.current = prefersReducedMotion();
    if (glintRef.current) glintRef.current.style.background = glintGradient(0);
    if (reduceRef.current) return;
    const obj = { a: 0 };
    const glint = animate(obj, {
      a: 360, duration: 9000, loop: true, ease: 'linear',
      onUpdate: () => { if (glintRef.current) glintRef.current.style.background = glintGradient(obj.a); },
    });
    const iv = window.setInterval(() => {
      if (document.hidden || !shimmerRef.current) return;
      animate(shimmerRef.current, { translateX: ['-160%', '260%'], duration: 900, ease: 'outQuad' });
    }, 6500);
    return () => { glint.revert(); window.clearInterval(iv); };
  }, []);

  // Hover-follow highlight — offset* coords stay aligned under the page zoom.
  const onLinkEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const ind = indicatorRef.current;
    if (!ind) return;
    const left = e.currentTarget.offsetLeft;
    const width = e.currentTarget.offsetWidth;
    if (reduceRef.current) { ind.style.left = `${left}px`; ind.style.width = `${width}px`; ind.style.opacity = '1'; return; }
    animate(ind, { left, width, opacity: 1, duration: 300, ease: 'outCubic' });
  };
  const onLinksLeave = () => {
    const ind = indicatorRef.current;
    if (!ind) return;
    if (reduceRef.current) { ind.style.opacity = '0'; return; }
    animate(ind, { opacity: 0, duration: 220, ease: 'outQuad' });
  };

  const onDemoEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduceRef.current) return;
    if (shimmerRef.current) animate(shimmerRef.current, { translateX: ['-160%', '260%'], duration: 720, ease: 'outQuad' });
    animate(e.currentTarget, { translateY: -1, duration: 180, ease: 'outQuad' });
  };
  const onDemoLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduceRef.current) return;
    animate(e.currentTarget, { translateY: 0, duration: 220, ease: 'outQuad' });
  };

  return (
    <nav
      style={{
        position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 20,
        display: 'flex', justifyContent: 'center', padding: '14px 40px 0',
        boxSizing: 'border-box', background: 'transparent', pointerEvents: 'none',
      }}
    >
      <div style={{ position: 'relative', width: '100%', maxWidth: 860, height: 40, pointerEvents: 'auto' }}>
        {/* glass background layer — this is what blips + expands from center */}
        <div
          ref={bgRef}
          style={{
            position: 'absolute', inset: 0, borderRadius: 999,
            background: 'rgba(8,16,26,0.55)',
            backdropFilter: 'blur(18px) saturate(140%)', WebkitBackdropFilter: 'blur(18px) saturate(140%)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 16px 44px -18px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          <span
            ref={glintRef}
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0, borderRadius: 999, padding: 1, opacity: 0.65, pointerEvents: 'none',
              background: glintGradient(0),
              WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor', maskComposite: 'exclude',
            }}
          />
        </div>

        {/* contents (fade in after the bar expands; never scaled, so no squish) */}
        <div
          ref={contentRef}
          style={{
            position: 'relative', zIndex: 1, height: '100%', boxSizing: 'border-box',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 0 15px',
          }}
        >
          {/* brand */}
          <div data-navc style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <svg width="20" height="20" viewBox="0 0 30 30" fill="none" aria-hidden="true" style={{ filter: 'drop-shadow(0 0 6px rgba(52,211,153,0.4))' }}>
              <path d="M15 2.5 25.8 8.75v12.5L15 27.5 4.2 21.25V8.75Z" stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round" />
              <path d="M15 10.5 19 17h-8Z" stroke="var(--accent-2)" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em', color: '#F1F6F4' }}>
              CryptoPrism<span style={{ color: 'var(--accent)' }}>.</span>
            </span>
          </div>

          {/* links + gliding highlight */}
          <div data-navc onMouseLeave={onLinksLeave} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 2 }}>
            <span
              ref={indicatorRef}
              aria-hidden="true"
              style={{
                position: 'absolute', top: '50%', left: 0, width: 0, height: 24, transform: 'translateY(-50%)',
                borderRadius: 8, background: 'rgba(15,174,114,0.16)', border: '1px solid rgba(15,174,114,0.35)',
                opacity: 0, pointerEvents: 'none',
              }}
            />
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                onMouseEnter={onLinkEnter}
                onClick={() => scrollToId(link.id)}
                style={{ position: 'relative', padding: '6px 11px', fontSize: 10.5, fontWeight: 500, color: '#A9B7B4', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'color 0.2s ease' }}
                onMouseOver={(e) => { e.currentTarget.style.color = '#EAFBF3'; }}
                onMouseOut={(e) => { e.currentTarget.style.color = '#A9B7B4'; }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* actions */}
          <div data-navc style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
            <a href="https://app.cryptoprism.io" style={{ fontSize: 10.5, fontWeight: 500, color: '#A9B7B4', cursor: 'pointer', transition: 'color 0.2s ease' }}
              onMouseOver={(e) => { e.currentTarget.style.color = '#EAFBF3'; }}
              onMouseOut={(e) => { e.currentTarget.style.color = '#A9B7B4'; }}
            >
              Sign In
            </a>
            <button
              type="button"
              className="cta-early-access-trigger"
              onMouseEnter={onDemoEnter}
              onMouseLeave={onDemoLeave}
              style={{
                position: 'relative', overflow: 'hidden', fontFamily: 'inherit', fontSize: 10.5, fontWeight: 600,
                color: '#04070E', background: 'linear-gradient(135deg, #34D399, var(--accent))', border: 'none',
                borderRadius: 999, padding: '7px 15px', cursor: 'pointer', boxShadow: '0 6px 18px rgba(15,174,114,0.3)',
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>Request Demo</span>
              <span
                ref={shimmerRef}
                aria-hidden="true"
                style={{
                  position: 'absolute', top: 0, left: 0, height: '100%', width: '42%',
                  background: 'linear-gradient(105deg, transparent, rgba(255,255,255,0.5), transparent)',
                  transform: 'translateX(-160%)', pointerEvents: 'none',
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
