import { useEffect, useRef, useState, useContext } from 'react';
import { DeckSlide, DeckPrintContext } from '../DeckSlide';
import { tractionMetrics } from '../../../data/pitchDeckData';

function AnimatedCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target * 10) / 10);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, inView]);

  const displayValue = inView ? value : 0;
  const display = Number.isInteger(target) ? Math.round(displayValue).toLocaleString() : displayValue.toFixed(1);
  return <>{display}{suffix}</>;
}

function Gauge({ value, label, sublabel }: { value: number; label: string; sublabel: string }) {
  const radius = 34;
  const stroke = 7;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const dashOffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 84 84" className="w-20 h-20">
        <circle cx="42" cy="42" r={normalizedRadius} fill="none" stroke="rgba(15,23,42,0.08)" strokeWidth={stroke} />
        <circle
          cx="42"
          cy="42"
          r={normalizedRadius}
          fill="none"
          stroke="#047857"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform="rotate(-90 42 42)"
        />
        <text
          x="42"
          y="46"
          textAnchor="middle"
          className="fill-slate-900"
          style={{ fontFamily: 'Consolas, monospace', fontSize: 16, fontWeight: 700 }}
        >
          {value}%
        </text>
      </svg>
      <div className="text-center">
        <div className="text-[10px] md:text-xs font-semibold text-slate-800 leading-tight">
          {label}
        </div>
        <div className="text-[9px] md:text-[10px] text-slate-500 leading-tight">
          {sublabel}
        </div>
      </div>
    </div>
  );
}

export function SlideMetrics() {
  const isPrint = useContext(DeckPrintContext);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const workstreams = [
    { name: 'cpio_google-research-timesfm', status: 'production trading bots + backtest engine', note: 'live bots' },
    { name: 'CryptoPrism-News-Fetcher', status: '44 sources, 500+ articles/hr, hourly automation', note: 'live pipeline' },
    { name: 'cryptoprism-onchain', status: '17 endpoints, 6 live chains, 20 tests', note: 'production backend' },
    { name: 'CryptoPrism-DB', status: '3 DBs, 100+ TA indicators, DMV pipelines', note: 'data backbone' },
    { name: 'CPIO', status: 'frontend/backend app layer', note: '~50% MVP built' },
  ] as const;
  const gaugeTargets = [
    { value: 78, label: 'Signal-driven trades', sublabel: 'target share of activity' },
    { value: 65, label: 'Avg leverage usage', sublabel: 'target discipline rate' },
    { value: 84, label: 'Daily active sessions', sublabel: 'target engaged usage' },
  ] as const;

  useEffect(() => {
    if (isPrint) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [isPrint]);

  return (
    <DeckSlide id="traction" number={7}>
      <div ref={ref} className="flex flex-col items-center gap-6 md:gap-8">
        <div className="max-w-4xl text-center">
          <div className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.34em] text-gray-500">
            Live traction / running systems
          </div>
          <h2 className="mt-2 font-display text-4xl md:text-6xl font-semibold text-white text-center leading-[0.92]">
            What&apos;s already <span className="text-[#047857]">running</span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-400 leading-relaxed">
            Not a prototype. The platform is already split across live production systems:
            trading bots, news ingestion, on-chain analytics, database infrastructure, and the app layer.
            The CPIO frontend/backend MVP is roughly 50% complete, but the underlying engine is further ahead.
          </p>
        </div>

        <div className="w-full max-w-6xl glass-card rounded-3xl p-4 md:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.28em] text-gray-500">
                Current stage
              </div>
              <div className="mt-1 text-lg md:text-xl font-semibold text-white">
                Platform already running
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#047857]/25 bg-[#047857]/8 px-3 py-1 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.22em] text-[#047857]">
              CPIO app layer ~50% done
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4 w-full max-w-6xl">
          {tractionMetrics.map((metric) => (
            <div
              key={metric.label}
              className="glass-card terminal-green rounded-2xl p-4 md:p-5 flex flex-col items-center text-center gap-2.5"
            >
              <span className="font-mono text-[#047857] text-2xl md:text-4xl font-bold tracking-tight">
                {isPrint
                  ? `${Number.isInteger(metric.value) ? metric.value.toLocaleString() : metric.value}${metric.suffix}`
                  : <AnimatedCounter target={metric.value} suffix={metric.suffix} inView={inView} />
                }
              </span>
              <span className="text-gray-400 text-[10px] md:text-xs leading-tight">{metric.label}</span>
            </div>
          ))}
        </div>

        <div className="w-full max-w-6xl grid gap-4 xl:grid-cols-[1fr_1.15fr]">
          <div className="glass-card rounded-3xl p-4 md:p-5">
            <div className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.28em] text-gray-500">
              Live stack / repo map
            </div>
            <div className="mt-3 space-y-2.5">
              {workstreams.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/10 px-3 py-2.5">
                  <div className="min-w-0">
                    <div className="text-sm md:text-base font-semibold text-white tracking-tight">
                      {item.name}
                    </div>
                    <div className="text-[10px] md:text-xs text-gray-500 leading-tight">
                      {item.status}
                    </div>
                  </div>
                  <div className="text-right text-[10px] md:text-xs font-mono uppercase tracking-[0.18em] text-[#047857]">
                    {item.note}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-3xl p-4 md:p-5 border border-[rgba(14,203,129,0.1)]">
            <p className="text-gray-500 text-[10px] text-center mb-2 font-mono uppercase tracking-wider">
              Beta tracking targets (Q2 2026 · 30 seed users)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start justify-items-center mt-3">
              {gaugeTargets.map((target) => (
                <Gauge
                  key={target.label}
                  value={target.value}
                  label={target.label}
                  sublabel={target.sublabel}
                />
              ))}
            </div>
            <p className="text-gray-600 text-[10px] text-center mt-3 italic">
              Beta goals benchmarked against TradingView user studies. Not our data yet.
            </p>
          </div>
        </div>
      </div>
    </DeckSlide>
  );
}
