// Mobile Home — "Bias to Discipline" sticky ledger section.
//
// Ported verbatim from docs/superpowers/specs/reference/2026-07-18-mobile-design-v1.html
// lines 89-114: header ("THE BIAS TAX"), LEDGER.map (3 rows, each a
// `position: sticky` wrapper at `row.top` producing the stacking-cards
// scroll effect — later cards scroll up and pin above/over earlier ones),
// closing tagline.
//
// The header copy says "four most expensive instincts" while LEDGER has
// exactly 3 rows — that mismatch is in the source design itself; transcribed
// as-is per the plan's Self-Review Notes, not "fixed".
//
// 2026-07-19 deviation from the verbatim port (user request): cards are now
// full-viewport-height (calc(100dvh - top - 28px) instead of minHeight 240)
// so exactly one card is on screen at a time and the next one stacks in on
// scroll; the bias→discipline content is vertically centered in the card.

import { LEDGER } from '../data';

// 2026-07-19: per-bias illustration filling the lower zone of the full-height
// cards (user request — the tall cards read as empty). Line-art only, in each
// card's own ink palette, low opacity so it stays texture, not content.
function CardArt({ num }: { num: string }) {
  const common = {
    style: {
      position: 'absolute' as const, left: 24, right: 24, bottom: 26,
      width: 'calc(100% - 48px)', height: 'auto', pointerEvents: 'none' as const,
    },
    viewBox: '0 0 320 120',
    fill: 'none' as const,
  };
  if (num === '01') {
    // Evidence — candlestick history with the full record framed
    const candles = [
      [16, 62, 30, 96], [43, 55, 24, 88], [70, 66, 36, 92], [97, 48, 20, 78],
      [124, 56, 30, 84], [151, 40, 16, 70], [178, 50, 26, 76], [205, 34, 12, 62],
      [232, 42, 22, 66], [259, 28, 10, 54], [286, 36, 18, 58],
    ];
    return (
      <svg {...common}>
        {[24, 62, 100].map((y) => (
          <path key={y} d={`M6 ${y}H314`} stroke="#0B1220" strokeOpacity={0.06} strokeWidth={1} />
        ))}
        {candles.map(([x, bodyTop, wickTop, bottom], i) => (
          <g key={x} stroke={i % 3 === 1 ? '#98A2B3' : '#0FAE72'} strokeOpacity={0.5}>
            <path d={`M${x} ${wickTop}V${bottom}`} strokeWidth={1.3} />
            <rect x={x - 5} y={bodyTop} width={10} height={Math.max(10, (bottom - bodyTop) * 0.55)} rx={2} strokeWidth={1.3} fill="none" />
          </g>
        ))}
        <rect x={3} y={4} width={314} height={112} rx={12} stroke="#0B8D84" strokeOpacity={0.3} strokeWidth={1.2} strokeDasharray="5 6" />
      </svg>
    );
  }
  if (num === '02') {
    // Probability — distribution curve with odds band, not opinions
    return (
      <svg {...common}>
        <path d="M8 108H312" stroke="#FFFFFF" strokeOpacity={0.12} strokeWidth={1} />
        <path
          d="M10 108 C90 106 112 16 160 16 C208 16 230 106 310 108 Z"
          fill="#7FE0BE" fillOpacity={0.07}
        />
        <path
          d="M10 108 C90 106 112 16 160 16 C208 16 230 106 310 108"
          stroke="#7FE0BE" strokeOpacity={0.65} strokeWidth={1.6} strokeLinecap="round"
        />
        <path d="M118 108V52" stroke="#FFFFFF" strokeOpacity={0.22} strokeWidth={1.2} strokeDasharray="3 5" />
        <path d="M202 108V52" stroke="#FFFFFF" strokeOpacity={0.22} strokeWidth={1.2} strokeDasharray="3 5" />
        <circle cx={160} cy={16} r={4} fill="#0FAE72" />
      </svg>
    );
  }
  // '03' Confidence — conviction bars sized by score, rising line
  const bars = [18, 30, 26, 44, 40, 58, 70, 88];
  return (
    <svg {...common}>
      <path d="M8 112H312" stroke="#FFFFFF" strokeOpacity={0.18} strokeWidth={1} />
      {bars.map((h, i) => (
        <rect key={i} x={16 + i * 37} y={112 - h} width={22} height={h} rx={5} fill="#FFFFFF" fillOpacity={0.16} />
      ))}
      <path
        d="M27 88 L64 76 L101 82 L138 62 L175 66 L212 46 L249 32 L286 16"
        stroke="#FFFFFF" strokeOpacity={0.7} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      />
      <path d="M272 14 L286 16 L280 28" stroke="#FFFFFF" strokeOpacity={0.7} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MobileBiasLedger() {
  return (
    <section style={{ position: 'relative', padding: '52px 22px 56px', background: '#FAFAF8' }}>
      <div
        data-reveal
        style={{
          opacity: 0, transform: 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', color: '#0B8D84' }}>
          THE BIAS TAX
        </div>
        <h2 style={{ margin: '12px 0 0', fontSize: 30, fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.025em' }}>
          Every portfolio pays a tax on emotion.
        </h2>
        <p style={{ margin: '12px 0 0', maxWidth: 320, fontSize: 14, lineHeight: 1.55, color: '#475467' }}>
          Prism replaces the four most expensive instincts in investing with something better.
        </p>
      </div>

      <div style={{ marginTop: 26 }}>
        {LEDGER.map((row) => (
          <div key={row.num} style={{ position: 'sticky', top: row.top, marginBottom: 18 }}>
            <div
              style={{
                position: 'relative', overflow: 'hidden', borderRadius: 24, padding: '28px 24px 30px',
                // One card per screen: fill from the sticky top down to the viewport
                // bottom (28px breathing room) so the next card only enters on scroll.
                minHeight: `calc(100dvh - ${row.top} - 28px)`,
                display: 'flex', flexDirection: 'column',
                boxSizing: 'border-box', background: row.bg, border: `1px solid ${row.border}`,
                boxShadow: '0 22px 50px rgba(11,18,32,0.16)',
              }}
            >
              <div
                style={{
                  position: 'absolute', right: -14, top: -30, fontSize: 150, fontWeight: 800,
                  letterSpacing: '-0.05em', lineHeight: 1, color: row.numInk, pointerEvents: 'none',
                }}
              >
                {row.num}
              </div>
              <CardArt num={row.num} />
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', flex: 1, zIndex: 1 }}>
                <div>
                  <div
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 10.5, fontWeight: 600,
                      letterSpacing: '0.1em', color: row.tagInk, border: `1px solid ${row.tagBorder}`,
                      borderRadius: 999, padding: '5px 11px',
                    }}
                  >
                    {row.tag}
                  </div>
                </div>
                {/* center the bias→discipline flip in the now full-height card,
                    keeping clear of the bottom illustration zone */}
                <div style={{ margin: 'auto 0', paddingBottom: 110 }}>
                <div style={{ fontSize: 16, fontWeight: 500, color: row.biasInk, textDecoration: 'line-through' }}>
                  {row.bias}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6 }}>
                  <svg width={20} height={17} viewBox="0 0 16 14" fill="none" style={{ flex: 'none' }}>
                    <path d="M1 7h12 M9 2l5 5-5 5" stroke={row.arrow} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: 42, fontWeight: 800, letterSpacing: '-0.025em', color: row.ink }}>
                    {row.to}
                  </span>
                </div>
                <p style={{ margin: '14px 0 0', maxWidth: 300, fontSize: 15.5, lineHeight: 1.6, color: row.sub }}>
                  {row.desc}
                </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p
        data-reveal
        style={{
          margin: '24px 0 0', fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', color: '#0B1220',
          opacity: 0, transform: 'translateY(20px)',
          transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
        }}
      >
        The discipline of an institution, <span style={{ color: '#0B8D84' }}>built into every decision.</span>
      </p>
    </section>
  );
}

export default MobileBiasLedger;
