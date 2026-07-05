import React, { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { useReveal } from './hooks';

interface Competitor {
  readonly name: string;
  readonly x: number;
  readonly y: number;
  readonly sub: string;
  readonly col: string;
  readonly us?: boolean;
}

const COMPETITORS: readonly Competitor[] = [
  { name: 'Glassnode', x: 0.22, y: 0.62, sub: 'On-chain depth · $800/mo', col: '#0E7490' },
  { name: 'CoinGlass', x: 0.18, y: 0.30, sub: 'Derivatives · $29/mo', col: '#B45309' },
  { name: 'Santiment', x: 0.34, y: 0.40, sub: 'Social + on-chain · $135/mo', col: '#6D28D9' },
  { name: 'Dune', x: 0.20, y: 0.18, sub: 'SQL-driven · variable', col: '#C2410C' },
  { name: 'AltFins', x: 0.30, y: 0.50, sub: 'Technical + AI · $25/mo', col: '#4338CA' },
  { name: 'Messari', x: 0.40, y: 0.55, sub: 'Research · $5K+/yr', col: '#7A8590' },
  { name: 'CryptoPrism', x: 0.82, y: 0.86, sub: 'All signals fused · $29/mo', col: '#0A8F5A', us: true },
];

const LEGEND = [
  { l: 'On-chain · Derivatives · Social · Technical', v: 'All four', c: '#0A8F5A' },
  { l: 'Plain-English interpretation', v: 'AI-native', c: '#0E7490' },
  { l: 'Mid-market pricing', v: '$29/mo', c: '#B45309' },
  { l: 'Closed-loop journal', v: 'Only one', c: '#6D28D9' },
];

export const Quadrant: React.FC = () => {
  const ref = useReveal<HTMLElement>();
  const dotsRef = useRef<SVGGElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = dotsRef.current;
    if (!el || !el.children.length || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          // Group fade — safe fallback: if this never runs, dots sit at
          // their natural opacity:1, fully visible, just without the pop.
          animate(el.children, {
            opacity: [0, 1],
            duration: 450,
            ease: 'outQuad',
            delay: stagger(110),
          });
          // Radius pop on the primary dot circles only (marked .qm-dot),
          // sequenced with the same stagger so each dot "lands".
          const dots = el.querySelectorAll('.qm-dot');
          dots.forEach((dot, i) => {
            const targetR = Number(dot.getAttribute('data-target-r'));
            animate(dot, {
              r: [0, targetR],
              duration: 500,
              ease: 'outElastic(1, .6)',
              delay: 110 * i,
            });
          });
          io.unobserve(el);
        }
      }),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="reveal" id="compare" style={{ padding: '120px 0', position: 'relative' }}>
      <div className="wrap">
        <div style={{ marginBottom: 56, maxWidth: 780 }}>
          <span className="label">CHAPTER 04 &middot; THE EMPTY CENTER</span>
          <h2 className="display" style={{ fontSize: 'clamp(36px,5vw,64px)', marginTop: 16 }}>
            Every tool sits in one corner.
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text-secondary)', marginTop: 18, maxWidth: 580 }}>
            Glassnode owns on-chain. CoinGlass owns derivatives. Santiment owns social. Nobody fuses them — and nobody translates them.{' '}
            <span style={{ color: 'var(--emerald)' }}>That's the whitespace.</span>
          </p>
        </div>

        <div className="glass" style={{ padding: 32, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <div className="label">COMPETITIVE POSITION</div>
            <div className="mono" style={{ display: 'flex', gap: 16, fontSize: 11, color: 'var(--text-muted)' }}>
              <span>&#9679; COMPETITORS &middot; n=6</span>
              <span style={{ color: 'var(--emerald)' }}>&#9679; CRYPTOPRISM</span>
            </div>
          </div>

          <div style={{ position: 'relative', aspectRatio: '16/10', maxWidth: '100%' }}>
            <svg viewBox="0 0 800 500" style={{ width: '100%', height: '100%' }}>
              {[1, 2, 3, 4].map((i) => <line key={`gx${i}`} x1={i * 160} y1="20" x2={i * 160} y2="460" className="qline" />)}
              {[1, 2, 3].map((i) => <line key={`gy${i}`} x1="40" y1={i * 110 + 20} x2="780" y2={i * 110 + 20} className="qline" />)}

              <line x1="40" y1="460" x2="780" y2="460" className="qaxis" />
              <line x1="40" y1="20" x2="40" y2="460" className="qaxis" />

              <text x="40" y="490" fill="#7A8590" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="2">SINGLE SOURCE &rarr;</text>
              <text x="780" y="490" fill="#7A8590" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="2" textAnchor="end">MULTI-SOURCE FUSION</text>
              <text x="20" y="20" fill="#7A8590" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="2" transform="rotate(-90 20 20)" textAnchor="end">RAW DATA</text>
              <text x="20" y="460" fill="#7A8590" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="2" transform="rotate(-90 20 460)">AI-INTERPRETED &rarr;</text>

              <rect x="450" y="40" width="320" height="180" fill="rgba(10,143,90,.06)" stroke="rgba(10,143,90,.25)" strokeDasharray="4 4" />
              <text x="610" y="135" fill="#0A8F5A" fontSize="13" fontFamily="Manrope" fontWeight="700" textAnchor="middle" letterSpacing="0.5">WHITESPACE</text>
              <text x="610" y="155" fill="#7A8590" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">(zero competitors)</text>

              <g ref={dotsRef}>
                {COMPETITORS.map((c) => {
                  const cx = 40 + c.x * 740;
                  const cy = 460 - c.y * 440;
                  const targetR = c.us ? 9 : 6;
                  return (
                    <g key={c.name}>
                      {c.us && (
                        <>
                          <circle cx={cx} cy={cy} r="32" fill={c.col} opacity={0.08}>
                            <animate attributeName="r" values="22;36;22" dur="2.4s" repeatCount="indefinite" />
                          </circle>
                          <circle cx={cx} cy={cy} r="22" fill={c.col} opacity={0.18} />
                        </>
                      )}
                      <circle
                        className="qm-dot"
                        data-target-r={targetR}
                        cx={cx} cy={cy} r={targetR}
                        fill={c.col} stroke={c.us ? '#FFFDF7' : 'none'} strokeWidth={c.us ? 1.5 : 0}
                      />
                      <text x={cx + 14} y={cy - 4} fill="#0F1419" fontSize={c.us ? 14 : 12} fontFamily="Manrope" fontWeight={c.us ? 800 : 600}>{c.name}</text>
                      <text x={cx + 14} y={cy + 12} fill="#7A8590" fontSize="10" fontFamily="JetBrains Mono">{c.sub}</text>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginTop: 28, paddingTop: 24, borderTop: '1px solid rgba(120,110,80,.18)' }}>
            {LEGEND.map((x) => (
              <div key={x.l} style={{ borderLeft: `2px solid ${x.c}`, paddingLeft: 14 }}>
                <div className="label" style={{ fontSize: 9 }}>{x.l}</div>
                <div className="display mono" style={{ fontSize: 18, color: x.c, marginTop: 4 }}>{x.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quadrant;
