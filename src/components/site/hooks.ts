import { useEffect, useRef, useState } from 'react';

/** Adds a class (default 'rvon') to the element once it scrolls near the viewport.
 * Mirrors landing/hooks.ts's useReveal — includes the same 4s safety-net timeout so
 * content never stays permanently hidden if IntersectionObserver fails to fire. */
export function useRevealClass<T extends HTMLElement>(className = 'rvon') {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.1) {
      el.classList.add(className);
      return;
    }
    if (!('IntersectionObserver' in window)) {
      el.classList.add(className);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
          io.unobserve(entry.target);
        }
      }),
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' },
    );
    io.observe(el);

    const fallback = setTimeout(() => el.classList.add(className), 4000);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, [className]);
  return ref;
}

/** Same trigger as useRevealClass, but returns boolean state instead of mutating
 * classList directly — for components (SectionHead) that need to branch render logic. */
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.1) {
      setOn(true);
      return;
    }
    if (!('IntersectionObserver' in window)) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setOn(true);
          io.unobserve(entry.target);
        }
      }),
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' },
    );
    io.observe(el);

    const fallback = setTimeout(() => setOn(true), 4000);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, []);

  return [ref, on] as const;
}

/** Scrolls an in-page element into view without touching location.hash
 * (the app's router treats hash changes as route changes, so anchor links
 * like href="#engines" can't be used for in-page scrolling). */
export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
