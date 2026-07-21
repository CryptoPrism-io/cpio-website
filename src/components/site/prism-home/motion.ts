// Shared motion foundation for the desktop prism-home page (2026-07-21 motion
// pass). Desktop-only helpers — the mobile tree never imports this.

/** True when the visitor asked the OS to minimise motion. Every anime.js
 * timeline on the page guards on this and applies its end state instead. */
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Cinematic first-screen intro timeline — all values are milliseconds from
// component mount. The three page-1 pieces (PrismCanvas, Hero, Nav) mount
// together in PrismHome, so these shared delays line them up into ONE
// sequence, unfolding like a film shot:
//   1. the prism assembles from scattered shards and fades in   (prism*)
//   2. the hero content rises in block-by-block                 (content*)
//   3. the nav settles in last                                  (navStart)
export const INTRO = {
  prismStart: 80,       // prism begins assembling
  prismDuration: 1200,  // ...shards -> solid + fade, over this long
  contentStart: 720,    // hero content cascade begins (after the prism reads)
  contentStagger: 145,  // gap between each content block
  contentDuration: 780, // each block's own rise+fade
  // Nav is the FINALE — it plays only after the prism + all hero content have
  // finished (content ends ~2225ms), blipping in at center and expanding L+R.
  navStart: 2300,
} as const;
