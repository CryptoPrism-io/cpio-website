import { useEffect, useState } from 'react';

/** True at or below the mobile breakpoint used throughout the prism-home page.
 * Sections with absolutely-positioned decorative diagrams that can't reflow
 * (Hero's data-flow diagram, Problem's source cards, BiasTax's comparison
 * canvas) branch to a simplified stacked layout below this width instead of
 * trying to CSS-reflow fixed pixel coordinates. */
export function useIsMobile(breakpoint = 900): boolean {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= breakpoint,
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [breakpoint]);
  return isMobile;
}
