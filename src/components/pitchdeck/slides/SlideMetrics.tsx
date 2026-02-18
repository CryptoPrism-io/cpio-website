import { useEffect, useRef, useState, useContext } from 'react';
import { DeckSlide, DeckPrintContext } from '../DeckSlide';
import { tractionMetrics } from '../../../data/pitchDeckData';

function AnimatedCounter({ target, inView }: { target: number; inView: boolean }) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!inView) { setValue(0); return; }

    const duration = 2000;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, inView]);

  return <>{value.toLocaleString()}</>;
}

export function SlideMetrics() {
  const isPrint = useContext(DeckPrintContext);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (isPrint) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [isPrint]);

  return (
    <DeckSlide id="traction" number={8}>
      <div ref={ref} className="flex flex-col items-center gap-10">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-center">
          Early <span className="text-[#0ecb81]">traction</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
          {tractionMetrics.map((metric) => (
            <div
              key={metric.label}
              className="glass-card terminal-green rounded-xl p-6 flex flex-col items-center text-center gap-3"
            >
              <span className="font-mono text-[#0ecb81] text-3xl md:text-4xl font-bold">
                {isPrint ? metric.value.toLocaleString() : <AnimatedCounter target={metric.value} inView={inView} />}
              </span>
              <span className="text-gray-400 text-xs">{metric.label}</span>
            </div>
          ))}
        </div>

        <p className="text-gray-500 text-sm text-center max-w-lg">
          Pipeline is live and processing. Signal quality validated across 180 historical regime events.
          <br />
          Early access waitlist growing organically.
        </p>
      </div>
    </DeckSlide>
  );
}
