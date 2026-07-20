// v5 "The Bias Tax" (CryptoPrism Hero.dc.html v5, lines 250-386).
// Fixed 1472x930 canvas layout: left narrative column (badge, 54px headline,
// 3 story rows, Human Thinking vs Machine Reasoning comparison around the
// sec3Anchor prism dock), a dotted divider rail at x=640, six bias cards at
// x=660 whose dashed curves (x=964) converge on the Prism Reasoning Engine
// card at x=1180, and a closing quote block. Reveal is the v5 [data-reveal]
// mechanism (PrismHome.tsx runtime).

import type { ReactNode, RefObject } from 'react';

const STORY_ROWS: { icon: ReactNode; strong: string; strongColor?: string; rest: string }[] = [
  {
    icon: <path d="M5 2.5h7l3.5 3.5v11.5H5z M12 2.5V6h3.5 M7.5 10h5 M7.5 13h5" />,
    strong: 'Markets generate endless information.',
    rest: 'Every day brings more data, more opinions, and more noise.',
  },
  {
    icon: (
      <>
        <path d="M11.5 2.5a5.5 5.5 0 0 1 5.5 5.5c0 2-1 3.4-2 4.6-.8 1-1 1.9-1 2.9v2h-5v-1.8c0-.6-.4-1-1-1H6.7c-.6 0-1-.5-.9-1.1l.3-1.6-1.6-.6c-.5-.2-.7-.9-.3-1.3L6 8.2A5.6 5.6 0 0 1 11.5 2.5z" />
        <circle cx="11.5" cy="8" r="1.6" />
      </>
    ),
    strong: 'Humans generate endless bias.',
    strongColor: 'var(--accent)',
    rest: 'Emotions distort our interpretation, destroy our timing, and cloud our judgment.',
  },
  {
    // brand hexagon row — rendered with its own svg (viewBox 0 0 30 30,
    // accent-2 stroke, design line 265); flagged via strong text below
    icon: null,
    strong: 'CryptoPrism replaces emotional reactions with explainable reasoning.',
    rest: 'Turning signals into structured intelligence.',
  },
];

const HUMAN_TRAITS = [
  { head: 'Emotional', sub: 'Reactive' },
  { head: 'Inconsistent', sub: 'Biased' },
  { head: 'Unreliable', sub: 'Under pressure' },
];
const MACHINE_TRAITS = [
  { head: 'Evidence-based', sub: 'Objective' },
  { head: 'Consistent', sub: 'Rule-driven' },
  { head: 'Reliable', sub: 'Always on' },
];

const BIASES: { label: string; desc: string; icon: ReactNode; highlighted?: boolean }[] = [
  {
    label: 'Recency Bias', desc: 'We overweight the latest events and ignore the bigger picture.', highlighted: true,
    icon: (
      <>
        <circle cx="10" cy="10" r="7.5" />
        <path d="M10 5.5V10l3 2" />
      </>
    ),
  },
  {
    label: 'Confirmation Bias', desc: 'We seek information that confirms our beliefs and ignore the rest.',
    icon: (
      <>
        <circle cx="9" cy="9" r="5.5" />
        <path d="M13 13l4 4" />
      </>
    ),
  },
  {
    label: 'Loss Aversion', desc: 'We feel losses twice as strongly as we feel gains.',
    icon: (
      <>
        <rect x="2.5" y="2.5" width="15" height="15" rx="3" />
        <path d="M5.5 7l3.5 4 2-2 3.5 4" />
      </>
    ),
  },
  {
    label: 'Overconfidence', desc: 'We overestimate our knowledge and our ability to predict.',
    icon: (
      <>
        <circle cx="10" cy="7" r="3.2" />
        <path d="M4 17c.7-3.4 3-5.2 6-5.2s5.3 1.8 6 5.2" />
      </>
    ),
  },
  {
    label: 'Anchoring', desc: 'We rely too heavily on the first piece of information we see.',
    icon: (
      <>
        <circle cx="10" cy="5" r="2.2" />
        <path d="M10 7.2V17 M4.5 12c0 3 2.5 5 5.5 5s5.5-2 5.5-5 M7 9.5h6" />
      </>
    ),
  },
  {
    label: 'Availability Bias', desc: 'We focus on what’s easy to recall, not what’s actually true.',
    icon: <path d="M3 4.5h14v9H9l-3.5 3v-3H3z M6.5 8h7 M6.5 10.8h4.5" />,
  },
];

// dashed convergence curves + divider-rail dot ys (design lines 297-316)
const CURVE_YS = [68, 180, 292, 404, 516, 628];
const CURVE_ANIM = [
  { dur: 7.4, begin: -0.6 },
  { dur: 8.1, begin: -1.8 },
  { dur: 7.0, begin: -3.0 },
  { dur: 8.5, begin: -4.2 },
  { dur: 7.7, begin: -5.4 },
  { dur: 8.2, begin: -6.6 },
];

const ENGINE_ROWS: { label: string; sub: string; icon: ReactNode }[] = [
  {
    label: 'Evidence', sub: 'Grounded in verifiable data',
    icon: (
      <>
        <rect x="3" y="3" width="14" height="4.2" rx="1.2" />
        <rect x="3" y="9" width="14" height="4.2" rx="1.2" />
        <path d="M3 16h14" />
      </>
    ),
  },
  { label: 'Probability', sub: 'Quantified, not guessed', icon: <path d="M4 17V12 M8 17V9 M12 17v-6.5 M16 17V6 M4 7.5 9 4l3.5 2L16.5 3" /> },
  { label: 'Confidence', sub: 'Measured, not assumed', icon: <path d="M10 2.5 3.5 5v5c0 4 3 6.6 6.5 7.5 3.5-.9 6.5-3.5 6.5-7.5V5z M7.2 10l2 2 3.6-3.8" /> },
  {
    label: 'Reasoning', sub: 'Transparent and reproducible',
    icon: (
      <>
        <circle cx="5" cy="15" r="2.2" />
        <circle cx="10" cy="5" r="2.2" />
        <circle cx="15" cy="13" r="2.2" />
        <path d="M6.5 13.2 8.8 7 M11.8 6.5l2.2 4.6" />
      </>
    ),
  },
];

const reveal = {
  opacity: 0, transform: 'translateY(26px)',
  transition: 'opacity 0.8s ease, transform 0.8s ease',
} as const;

function TraitCard({ title, titleColor, bg, border, traits }: { title: string; titleColor: string; bg: string; border: string; traits: { head: string; sub: string }[] }) {
  return (
    <div style={{ width: 180, boxSizing: 'border-box', background: bg, border: `1px solid ${border}`, borderRadius: 16, padding: '18px 20px' }}>
      <div style={{ fontSize: 14.5, fontWeight: 700, color: titleColor }}>{title}</div>
      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {traits.map((t) => (
          <div key={t.head}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0B1220' }}>{t.head}</div>
            <div style={{ fontSize: 11.5, color: '#98A2B3' }}>{t.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BiasTax({ anchorRef }: { anchorRef: RefObject<HTMLDivElement | null> }) {
  return (
    <section data-page="" style={{ position: 'relative', padding: '52px 44px 44px', background: '#FAFAF8' }}>
      {/* fills the full section width; children positioned by % of the 1472
          design width, the convergence SVG stretches (preserveAspect none) */}
      <div style={{ position: 'relative', width: '100%', height: 930, margin: '0 auto' }}>
        {/* left narrative column */}
        <div style={{ position: 'absolute', left: 0, top: 0, width: 600 }}>
          <div data-reveal="0" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(15,174,114,0.35)', background: '#FFFFFF', borderRadius: 999, padding: '7px 16px', fontSize: 11.5, fontWeight: 600, letterSpacing: '0.12em', color: 'var(--accent-2)', ...reveal }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
            THE BIAS TAX
          </div>
          <h2 data-reveal="1" style={{ fontFamily: 'var(--font-heading)', margin: '26px 0 0', fontSize: 54, fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.02em', color: '#0B1220', ...reveal }}>
            Your biggest competitor isn&rsquo;t the market.<br />
            <span style={{ background: 'linear-gradient(120deg, var(--accent) 20%, var(--accent-2) 85%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              It&rsquo;s human judgment.
            </span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26, marginTop: 40 }}>
            {STORY_ROWS.map((row, i) => (
              <div key={row.strong} data-reveal={i + 2} style={{ display: 'flex', gap: 16, ...reveal }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, border: '1px solid #E7E9EC', borderRadius: 12, background: '#FFFFFF', flex: 'none' }}>
                  {row.icon ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#0B1220" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      {row.icon}
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 30 30" fill="none" stroke="var(--accent-2)" strokeWidth="1.8" strokeLinejoin="round">
                      <path d="M15 2.5 25.8 8.75v12.5L15 27.5 4.2 21.25V8.75Z" />
                      <path d="M15 10.5 19 17h-8Z" strokeWidth="1.5" />
                    </svg>
                  )}
                </span>
                <div style={{ fontSize: 15, lineHeight: 1.55, color: '#475467' }}>
                  <span style={{ fontWeight: 700, color: row.strongColor || '#0B1220' }}>{row.strong}</span>
                  <br />
                  {row.rest}
                </div>
              </div>
            ))}
          </div>
          <div data-reveal="5" style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 52, ...reveal }}>
            <TraitCard title="Human Thinking" titleColor="#B42318" bg="#FDF4F2" border="#F2DEDA" traits={HUMAN_TRAITS} />
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" style={{ flex: 'none' }}><path d="M1 7h17M12.5 1.8 18.7 7l-6.2 5.2" stroke="#98A2B3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <div style={{ textAlign: 'center', flex: 'none' }}>
              <div ref={anchorRef} style={{ width: 150, height: 190 }} />
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0B1220', marginTop: 2 }}>CryptoPrism</div>
            </div>
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" style={{ flex: 'none' }}><path d="M1 7h17M12.5 1.8 18.7 7l-6.2 5.2" stroke="#98A2B3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <TraitCard title="Machine Reasoning" titleColor="var(--accent-2)" bg="#F2FAF6" border="#D7EEE3" traits={MACHINE_TRAITS} />
          </div>
        </div>

        {/* divider rail + dashed convergence curves */}
        <div style={{ position: 'absolute', left: '43.5%', top: 20, bottom: 260, width: 1, background: '#E7E9EC' }} />
        <svg width="100%" height="930" viewBox="0 0 1472 930" fill="none" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {CURVE_YS.map((y, i) => (
            <circle key={`rail${y}`} cx="640.5" cy={y} r={i === 0 ? 4 : 3} fill={i === 0 ? 'var(--accent)' : '#D4D9DE'} />
          ))}
          <g opacity="0.85">
            {CURVE_YS.map((y) => (
              <path key={`c${y}`} d={`M964,${y} C1050,${y} 1090,350 1172,350`} stroke="rgba(15,174,114,0.22)" strokeWidth="1" strokeDasharray="2 4" />
            ))}
            <circle cx="1176" cy="350" r="3.5" fill="var(--accent)" />
            {CURVE_YS.map((y, i) => (
              <circle key={`m${y}`} r="2.2" fill="var(--accent)" opacity="0.85">
                <animateMotion dur={`${CURVE_ANIM[i].dur}s`} begin={`${CURVE_ANIM[i].begin}s`} repeatCount="indefinite" path={`M964,${y} C1050,${y} 1090,350 1172,350`} />
              </circle>
            ))}
          </g>
        </svg>

        {/* six bias cards */}
        <div style={{ position: 'absolute', left: '44.8%', top: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {BIASES.map((b, i) => (
            <div
              key={b.label}
              data-reveal={i}
              style={{
                display: 'flex', gap: 14, alignItems: 'flex-start', width: 304, height: 96, boxSizing: 'border-box', padding: 18,
                background: '#FFFFFF',
                border: b.highlighted ? '1px solid rgba(15,174,114,0.3)' : '1px solid #E7E9EC',
                borderRadius: 16,
                boxShadow: b.highlighted ? '0 8px 24px rgba(15,174,114,0.08)' : '0 6px 18px rgba(11,18,32,0.04)',
                ...reveal,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, border: '1px solid #E7E9EC', borderRadius: 10, flex: 'none' }}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#0B1220" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {b.icon}
                </svg>
              </span>
              <div>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: '#0B1220' }}>{b.label}</div>
                <div style={{ fontSize: 12.5, lineHeight: 1.45, color: '#475467', marginTop: 4 }}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Prism Reasoning Engine card */}
        <div data-reveal="6" style={{ position: 'absolute', left: '80.2%', right: 0, top: 110, boxSizing: 'border-box', background: '#FFFFFF', border: '1px solid #E7E9EC', borderRadius: 22, padding: 26, boxShadow: '0 16px 44px rgba(11,18,32,0.07)', ...reveal }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="32" height="32" viewBox="0 0 30 30" fill="none" style={{ flex: 'none' }}>
              <path d="M15 2.5 25.8 8.75v12.5L15 27.5 4.2 21.25V8.75Z" stroke="var(--accent)" strokeWidth="1.8" strokeLinejoin="round" />
              <circle cx="15" cy="15" r="3" stroke="var(--accent-2)" strokeWidth="1.5" />
            </svg>
            <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', color: '#0B1220', lineHeight: 1.25 }}>Prism<br />Reasoning Engine</div>
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.5, color: '#475467', marginTop: 14 }}>Replacing bias with explainable intelligence.</div>
          <div style={{ height: 1, background: '#E7E9EC', margin: '18px 0' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {ENGINE_ROWS.map((row) => (
              <div key={row.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 9, background: '#F2FAF6', flex: 'none' }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="var(--accent-2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {row.icon}
                  </svg>
                </span>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--accent)' }}>{row.label}</div>
                  <div style={{ fontSize: 12, color: '#475467', marginTop: 2 }}>{row.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* closing quote */}
      <div style={{ maxWidth: 860, margin: '40px auto 0', textAlign: 'center' }}>
        <div data-reveal="0" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 22, ...reveal }}>
          <svg width="36" height="28" viewBox="0 0 36 28" fill="none" style={{ flex: 'none', marginTop: 2 }}>
            <path d="M8 4C4.5 6.5 2.5 10 2.5 14.5c0 3.5 2.2 6 5.2 6s5-2.2 5-5-2-4.8-4.6-4.8c-.5 0-1 .1-1.3.2C7.4 8.6 9 6.4 11.2 5L8 4z M25 4c-3.5 2.5-5.5 6-5.5 10.5 0 3.5 2.2 6 5.2 6s5-2.2 5-5-2-4.8-4.6-4.8c-.5 0-1 .1-1.3.2.6-2.3 2.2-4.5 4.4-5.9L25 4z" fill="#B8E4D2" />
          </svg>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.015em', color: '#0B1220' }}>The market can be unpredictable.</div>
            <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.015em', marginTop: 4 }}>
              <span style={{ background: 'linear-gradient(120deg, var(--accent) 20%, var(--accent-2) 85%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Human biases are predictable.
              </span>
            </div>
          </div>
          <svg width="36" height="28" viewBox="0 0 36 28" fill="none" style={{ flex: 'none', alignSelf: 'flex-end' }}>
            <path d="M28 24c3.5-2.5 5.5-6 5.5-10.5 0-3.5-2.2-6-5.2-6s-5 2.2-5 5 2 4.8 4.6 4.8c.5 0 1-.1 1.3-.2-.6 2.3-2.2 4.5-4.4 5.9L28 24z M11 24c3.5-2.5 5.5-6 5.5-10.5 0-3.5-2.2-6-5.2-6s-5 2.2-5 5 2 4.8 4.6 4.8c.5 0 1-.1 1.3-.2-.6 2.3-2.2 4.5-4.4 5.9L11 24z" fill="#B8E4D2" />
          </svg>
        </div>
      </div>
    </section>
  );
}
