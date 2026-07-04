import { useEffect, useRef } from 'react';
import { animate, stagger, type AnimationParams } from 'animejs';

/** Reveals an element (adds the `in` class) once it scrolls near the viewport. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.1) {
      el.classList.add('in');
      return;
    }
    if (!('IntersectionObserver' in window)) {
      el.classList.add('in');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      }),
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' },
    );
    io.observe(el);

    // Safety net: never leave content permanently invisible if the observer
    // fails to fire for any reason (blocked API, rare browser edge case).
    const fallback = setTimeout(() => el.classList.add('in'), 4000);

    return () => { io.disconnect(); clearTimeout(fallback); };
  }, []);
  return ref;
}

/**
 * Staggers the direct children of a container in with anime.js once the
 * container scrolls into view. Deliberately sets no inline opacity/transform
 * outside the animation call — if the trigger never fires, children stay at
 * their natural fully-visible layout, so there's no fade-in-invisible risk.
 */
export function useStaggerReveal<T extends HTMLElement>(
  animParams: AnimationParams,
  staggerMs = 90,
) {
  const ref = useRef<T>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !el.children.length) return;

    if (!('IntersectionObserver' in window)) {
      animate(el.children, animParams);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate(el.children, { ...animParams, delay: stagger(staggerMs) });
          io.unobserve(el);
        }
      }),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

export function fmt(n: number, dp = 2): string {
  if (n >= 1000) return n.toLocaleString('en-US', { maximumFractionDigits: dp });
  if (n >= 1) return n.toFixed(dp);
  return n.toFixed(4);
}
