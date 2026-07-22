import { useLayoutEffect, useRef } from 'react';
import { animate } from 'animejs';
import { INTRO, prefersReducedMotion } from './motion';

// v6 nav — "N9 Edge-aligned minimal" (Hallmark redesign 2026-07-22).
// Replaces the v5 "Floating Glass Command Bar" (N5 floating pill).
//
// WHY THE CHANGE: the detached glass capsule with a centred link row, a
// gradient CTA and three idle loops is the most-templated nav shape on the
// web. N9 is its opposite — wordmark hard-left, sign-in + one outlined CTA
// hard-right, and NOTHING between them. The empty middle IS the design; it
// also lets the hero's aurora read uninterrupted instead of being cut by a
// floating bar. (Apple product pages, Carl Hauser.)
//
// WHAT WAS REMOVED, and why:
//   - The 9s rotating conic border glint, the 6.5s auto-shimmer sweep and the
//     gliding hover-highlight capsule. Three simultaneous infinite loops on a
//     nav is noise, and infinite loops pull the eye and never let it go.
//   - The gradient CTA fill (slop-test gate 2 — no genre allows gradient
//     fills on pill buttons; gate 41 wants an explicit accent-ink pairing).
//
// POSITIONING. The nav is ABSOLUTE over the hero, not fixed. A fixed bar was
// tried and reverted: every section is a scroll-snap page sized to exactly
// 100vh and snapped to y=0, so the bar landed on top of each section's first
// line and clipped its cap-height, and its scroll listener competed with
// fitPages/revealCheck on the same event. So the nav belongs to the hero page
// and scrolls away with it, and the hero's aurora runs behind it unbroken.
//
// The three section destinations live here as well as in the footer. They sit in the RIGHT cluster beside the actions, not spread
// across the middle — the empty centre is still the design, so this reads as
// N9 with a right-hand index rather than N1b's centred link row. They are
// real <a href> with smooth-scroll handlers; in the old pill they were <a>
// with no href and an onClick, i.e. invisible to keyboard and screen readers.
// They remain in the Ft5 footer too, which is the only nav below 1024px.
//
// Type is now legible: wordmark 17px (was 13), links/CTA 13.5px (was 10.5).
// Every interactive element is a real <a href> or <button> and inherits the
// page-level :focus-visible ring from prism-home.css.
//
// Destinations: Sign In -> app.cryptoprism.io; Request Demo ->
// EarlyAccessModal (cta-early-access-trigger, global listener in App.tsx).

const SECTIONS: { label: string; id: string }[] = [
  { label: 'Platform', id: 'prism-platform' },
  { label: 'Why us', id: 'prism-trust' },
  { label: 'FAQ', id: 'prism-faq' },
];

export function Nav() {
  const markRef = useRef<HTMLAnchorElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  // Entrance finale — the two edge groups settle in from their own edges after
  // the prism assembles and the hero content has finished unfolding. One
  // orchestrated moment, transform + opacity only. Pre-hidden before paint so
  // there is no flash; fully reverted on unmount so nothing leaks across a
  // mobile/desktop breakpoint switch.
  useLayoutEffect(() => {
    const mark = markRef.current;
    const right = rightRef.current;
    if (!mark || !right) return;
    if (prefersReducedMotion()) return;

    mark.style.opacity = '0';
    right.style.opacity = '0';

    let anims: ReturnType<typeof animate>[] = [];
    const id = window.setTimeout(() => {
      anims = [
        animate(mark, { opacity: [0, 1], translateX: [-14, 0], duration: 560, ease: 'outExpo' }),
        animate(right, { opacity: [0, 1], translateX: [14, 0], duration: 560, delay: 90, ease: 'outExpo' }),
      ];
    }, INTRO.navStart);

    return () => {
      window.clearTimeout(id);
      anims.forEach((a) => a.revert());
      mark.style.opacity = ''; mark.style.transform = '';
      right.style.opacity = ''; right.style.transform = '';
    };
  }, []);

  return (
    <nav className="prism-nav-edge" aria-label="Primary">
      <a ref={markRef} className="prism-nav-mark" href="#/" aria-label="CryptoPrism — home">
        <svg width="24" height="24" viewBox="0 0 30 30" fill="none" aria-hidden="true">
          <path d="M15 2.5 25.8 8.75v12.5L15 27.5 4.2 21.25V8.75Z" stroke="var(--accent)" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M15 10.5 19 17h-8Z" stroke="var(--accent-2)" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
        {/* one flex item — the accent full-stop must not inherit the row gap */}
        <span>CryptoPrism<span style={{ color: 'var(--accent)' }}>.</span></span>
      </a>

      <div ref={rightRef} className="prism-nav-right">
        <span className="prism-nav-sections">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              className="prism-nav-link"
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {s.label}
            </a>
          ))}
        </span>
        <a className="prism-nav-link" href="https://app.cryptoprism.io">Sign in</a>
        <button type="button" className="prism-nav-cta cta-early-access-trigger">
          Request demo
        </button>
      </div>
    </nav>
  );
}
