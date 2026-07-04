import { useEffect, useRef } from 'react';

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

export function fmt(n: number, dp = 2): string {
  if (n >= 1000) return n.toLocaleString('en-US', { maximumFractionDigits: dp });
  if (n >= 1) return n.toFixed(dp);
  return n.toFixed(4);
}
