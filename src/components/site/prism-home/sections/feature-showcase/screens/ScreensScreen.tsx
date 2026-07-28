import { screenCardTagColors, type ScreensData } from '../data';

// Public Screens pane — ported from reference lines 565-594.
export function ScreensScreen({ screen }: { screen: ScreensData }) {
  return (
    <>
      {/* Header row — reference line 567-568 */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#0B1220' }}>Public Screens</div>
          {/* was "used by top researchers and traders" — an invented social-proof
              claim. Describes the screens instead of asserting who uses them. */}
          <div style={{ fontSize: 10, color: '#475467', marginTop: 2 }}>AI-generated screens across every theme and market signal.</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{ fontSize: 9.5, fontWeight: 600, color: '#475467', border: '1px solid #E7E9EC', borderRadius: 7, padding: '5px 10px', whiteSpace: 'nowrap' }}>
            My Screens <span style={{ color: '#667085' }}>0</span>
          </span>
          <span style={{ fontSize: 9.5, fontWeight: 700, color: '#FFFFFF', background: '#0FAE72', borderRadius: 7, padding: '5px 11px', whiteSpace: 'nowrap' }}>
            Create Screen
          </span>
        </div>
      </div>

      {/* Category chips + sentiment legend — reference lines 570-573 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
        {screen.categories.map((cg) => (
          <span
            key={cg.label}
            style={{ fontSize: 10, fontWeight: 600, color: cg.color, background: cg.bg, borderRadius: 999, padding: '5px 11px' }}
          >
            {cg.label}
          </span>
        ))}
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 10, fontSize: 9, fontWeight: 600, color: '#475467' }}>
          <span>&#9679; All</span>
          <span style={{ color: '#16A34A' }}>&#9679; Bullish</span>
          <span style={{ color: '#DC2626' }}>&#9679; Bearish</span>
          <span style={{ color: '#D97706' }}>&#9679; Neutral</span>
        </span>
      </div>

      {/* 3x2 screen-card grid — reference lines 574-592 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: '1fr 1fr',
          gap: 10,
          marginTop: 10,
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        {screen.screenCards.map((c, i) => {
          const { color: tagColor, bg: tagBg } = screenCardTagColors(c.tag);
          return (
            <div
              key={i}
              style={{ border: '1px solid #E7E9EC', borderRadius: 10, padding: 10, display: 'flex', flexDirection: 'column', minHeight: 0 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: '#0B1220', lineHeight: 1.3 }}>{c.title}</span>
                <span
                  style={{
                    fontSize: 8,
                    fontWeight: 700,
                    color: tagColor,
                    background: tagBg,
                    borderRadius: 999,
                    padding: '2px 6px',
                    whiteSpace: 'nowrap',
                    height: 'fit-content',
                  }}
                >
                  {c.tag}
                </span>
              </div>
              <div style={{ fontSize: 9, color: '#475467', marginTop: 4, lineHeight: 1.4 }}>{c.desc}</div>
              {/* The card's middle used to be a ~120px void: the title/desc sat
                  at the top, a stacked-avatar cluster + a 58x16 sparkline were
                  pinned to the bottom by margin-top:auto, and nothing filled
                  between. The trend line now OWNS that space at full width,
                  which is what a screen preview should actually show. The
                  avatar stack is gone — three overlapping circles plus "+4"
                  reads as "four more people", i.e. fabricated social proof. */}
              <div style={{ flex: 1, minHeight: 24, marginTop: 8, display: 'flex', alignItems: 'stretch' }}>
                <svg width="100%" height="100%" viewBox="0 0 70 30" preserveAspectRatio="none" aria-hidden="true">
                  <path d={c.sparkPath} fill="none" stroke={c.sparkColor} strokeWidth={1.8} vectorEffect="non-scaling-stroke" />
                </svg>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #F0F1F2',
                  marginTop: 7,
                  paddingTop: 6,
                }}
              >
                <span style={{ fontSize: 8, color: '#667085' }}>{c.meta}</span>
                <span style={{ fontSize: 8.5, fontWeight: 700, color: '#475467', border: '1px solid #E7E9EC', borderRadius: 6, padding: '3px 8px' }}>
                  &#10022; Ask AI
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer row — reference line 593 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#667085', marginTop: 8 }}>
        <span>Showing 1 to 6 of 48 screens</span>
        <span style={{ color: '#0B8D84', fontWeight: 600 }}>Load more</span>
      </div>
    </>
  );
}
