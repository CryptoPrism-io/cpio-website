import type { ScreenerData } from '../data';

// AI Screener pane — ported from reference lines 529-563.
// Note: the results-table sparkline (line 557) and the prompt-box sparkle icon
// (line 533) both lack stroke-linecap/stroke-linejoin in the reference, so they
// are rendered as raw <svg>, not via the shared Sparkline component (which
// hardcodes round linecap/linejoin).
export function ScreenerScreen({ screen }: { screen: ScreenerData }) {
  return (
    <>
      {/* Header — reference line 530-531 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#0B1220' }}>AI Screener</span>
        <span style={{ fontSize: 9, fontWeight: 700, color: '#0B8D84', background: '#F2FAF6', borderRadius: 6, padding: '2px 7px' }}>Beta</span>
      </div>
      <div style={{ fontSize: 10, color: '#475467', marginTop: 3 }}>
        Describe any market opportunity in plain English and let CryptoPrism build the screen.
      </div>

      {/* Prompt box — reference line 532-536 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, border: '1px solid #E7E9EC', borderRadius: 10, padding: '10px 14px', marginTop: 10 }}>
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="#0B8D84" strokeWidth={1.5}>
          <path d="M10 3l1.4 4.3L16 9l-4.6 1.7L10 15l-1.4-4.3L4 9l4.6-1.7z" />
        </svg>
        <span style={{ fontSize: 11.5, color: '#0B1220', flex: 1 }}>{screen.prompt}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#FFFFFF', background: '#0FAE72', borderRadius: 7, padding: '6px 12px', whiteSpace: 'nowrap' }}>
          &#10022; Build Screen
        </span>
      </div>

      {/* Example chips — reference lines 537-540 */}
      <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 9.5, color: '#667085' }}>Try examples:</span>
        {screen.examples.map((ex) => (
          <span key={ex} style={{ fontSize: 10, color: '#475467', border: '1px solid #E7E9EC', borderRadius: 999, padding: '5px 10px' }}>
            {ex}
          </span>
        ))}
      </div>

      {/* Results meta + filter chips — reference lines 541-544 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, color: '#0B1220', fontWeight: 600 }}>&#9679; {screen.resultsMeta}</span>
        {screen.filters.map((ft) => (
          <span
            key={ft}
            style={{ fontSize: 9.5, color: '#475467', border: '1px solid #E7E9EC', borderRadius: 7, padding: '4px 9px', marginLeft: 'auto' }}
          >
            {ft}
          </span>
        ))}
      </div>

      {/* Results table — reference lines 545-562 */}
      <div
        style={{
          marginTop: 8,
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
          border: '1px solid #E7E9EC',
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.6fr 0.6fr 0.8fr 0.6fr 0.6fr 0.9fr 0.9fr',
            padding: '8px 12px',
            background: '#F9FAFA',
            fontSize: 8.5,
            fontWeight: 700,
            color: '#667085',
          }}
        >
          <span>TOKEN</span>
          <span>SCORE</span>
          <span>PRICE</span>
          <span>24H</span>
          <span>7D</span>
          <span>ON-CHAIN</span>
          <span>ETF FLOWS</span>
        </div>
        {screen.results.map((rs) => (
          <div
            key={rs.sym}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.6fr 0.6fr 0.8fr 0.6fr 0.6fr 0.9fr 0.9fr',
              alignItems: 'center',
              padding: '7px 12px',
              borderTop: '1px solid #F0F1F2',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: rs.iconBg,
                  color: '#FFFFFF',
                  fontSize: 8.5,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 'none',
                }}
                title="placeholder logo — swap with real token icon"
              >
                {rs.sym}
              </span>
              <span>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: '#0B1220', display: 'block' }}>{rs.sym}</span>
                <span style={{ fontSize: 8, color: '#667085' }}>{rs.name}</span>
              </span>
            </span>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: '#0B8D84' }}>{rs.score}</span>
            <span style={{ fontSize: 10, color: '#0B1220' }}>{rs.price}</span>
            <span style={{ fontSize: 9.5, color: '#16A34A' }}>{rs.chg24}</span>
            <span style={{ fontSize: 9.5, color: '#16A34A' }}>{rs.chg7}</span>
            <svg width="52" height="16" viewBox="0 0 70 30" preserveAspectRatio="none">
              <path d={rs.sparkPath} fill="none" stroke="#16A34A" strokeWidth={1.8} />
            </svg>
            <span style={{ fontSize: 9.5, color: '#16A34A' }}>{rs.etf}</span>
          </div>
        ))}
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px 12px',
            fontSize: 9,
            color: '#667085',
            borderTop: '1px solid #F0F1F2',
          }}
        >
          <span>Showing 1 to 5 of 34 results</span>
          <span style={{ color: '#0B8D84', fontWeight: 600 }}>View more results</span>
        </div>
      </div>
    </>
  );
}
