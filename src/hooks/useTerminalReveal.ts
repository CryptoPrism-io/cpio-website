import { useState, useEffect, useRef } from 'react';

export function useTerminalReveal(lineCount: number, delayPerLine = 400, startDelay = 300) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasTriggered]);

  useEffect(() => {
    if (!hasTriggered) return;

    const timeout = setTimeout(() => {
      if (visibleCount < lineCount) {
        setVisibleCount((c) => c + 1);
      }
    }, visibleCount === 0 ? startDelay : delayPerLine);

    return () => clearTimeout(timeout);
  }, [hasTriggered, visibleCount, lineCount, delayPerLine, startDelay]);

  return { ref, visibleCount };
}
