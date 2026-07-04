import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

interface AnimatedPriceProps {
  readonly value: number;
  readonly className?: string;
  readonly style?: React.CSSProperties;
}

/**
 * Renders "$<value>" and smoothly counts between the old and new value
 * whenever `value` changes (e.g. toggling monthly/annual pricing).
 * Defaults to a plain static render — the count-up is a progressive
 * enhancement layered on top via `useEffect`, not a required step.
 */
export const AnimatedPrice: React.FC<AnimatedPriceProps> = ({ value, className, style }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const current = useRef(value);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      current.current = value;
      return;
    }

    const counter = { n: current.current };
    animate(counter, {
      n: value,
      duration: 500,
      ease: 'outCubic',
      onUpdate: () => { el.textContent = `$${Math.round(counter.n)}`; },
      onComplete: () => { current.current = value; },
    });
  }, [value]);

  return <span ref={ref} className={className} style={style}>${value}</span>;
};

export default AnimatedPrice;
