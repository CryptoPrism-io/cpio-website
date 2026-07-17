import { Sparkline, screenCardTagColors, type ScreensData } from '../data';

// Public Screens pane — ported from reference lines 565-594.
export function ScreensScreen({ screen }: { screen: ScreensData }) {
  return (
    <>
      {/* Header row — reference line 567-568 */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#0B1220' }}>Public Screens</div>
          <div style={{ fontSize: 10, color: '#475467', marginTop: 2 }}>AI-crafted screens used by top researchers and traders.</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{ fontSize: 9.5, fontWeight: 600, color: '#475467', border: '1px solid #E7E9EC', borderRadius: 7, padding: '5px 10px', whiteSpace: 'nowrap' }}>
            My Screens <span style={{ color: '#98A2B3' }}>0</span>
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 6 }}>
                <span style={{ display: 'flex', alignItems: 'center' }} title="placeholder token logos">
                  <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#0B1220', border: '1.5px solid #FFFFFF' }} />
                  <span
                    style={{ width: 14, height: 14, borderRadius: '50%', background: '#627EEA', border: '1.5px solid #FFFFFF', marginLeft: -5 }}
                  />
                  <span
                    style={{ width: 14, height: 14, borderRadius: '50%', background: '#F59E0B', border: '1.5px solid #FFFFFF', marginLeft: -5 }}
                  />
                  <span
                    style={{ fontSize: 8, fontWeight: 600, color: '#475467', background: '#F5F6F7', borderRadius: 999, padding: '2px 5px', marginLeft: 3 }}
                  >
                    {c.plus}
                  </span>
                </span>
                <Sparkline path={c.sparkPath} stroke={c.sparkColor} width={58} height={16} viewBox="0 0 70 30" strokeWidth={1.8} />
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
                <span style={{ fontSize: 8, color: '#98A2B3' }}>{c.meta}</span>
                <span style={{ fontSize: 8.5, fontWeight: 700, color: '#475467', border: '1px solid #E7E9EC', borderRadius: 6, padding: '3px 8px' }}>
                  &#10022; Ask AI
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer row — reference line 593 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#98A2B3', marginTop: 8 }}>
        <span>Showing 1 to 6 of 48 screens</span>
        <span style={{ color: '#0B8D84', fontWeight: 600 }}>Load more</span>
      </div>
    </>
  );
}
