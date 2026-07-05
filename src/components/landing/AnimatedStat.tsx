import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

interface AnimatedStatProps {
  readonly value: string;
  readonly className?: string;
  readonly style?: React.CSSProperties;
}

/**
 * Parses a display string like "1,000+", "$29", "6", "130+" into
 * { prefix, target, suffix } so the numeric part can be counted up
 * while the surrounding formatting (currency sign, plus, commas) is
 * reapplied on every frame.
 */
function parseStat(value: string): { prefix: string; target: number; suffix: string } {
  const match = value.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return { prefix: '', target: 0, suffix: value };
  const [, prefix, numStr, suffix] = match;
  return { prefix, target: parseFloat(numStr.replace(/,/g, '')), suffix };
}

export const AnimatedStat: React.FC<AnimatedStatProps> = ({ value, className, style }) => {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { prefix, target, suffix } = parseStat(value);

    const render = (n: number) => {
      const rounded = Number.isInteger(target) ? Math.round(n) : Math.round(n * 10) / 10;
      el.textContent = `${prefix}${rounded.toLocaleString('en-US')}${suffix}`;
    };
    render(0);

    if (!('IntersectionObserver' in window)) {
      render(target);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const counter = { n: 0 };
          animate(counter, {
            n: target,
            duration: 1400,
            ease: 'outExpo',
            onUpdate: () => render(counter.n),
          });
          io.unobserve(el);
        }
      }),
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return <div ref={ref} className={className} style={style}>{value}</div>;
};

export default AnimatedStat;
