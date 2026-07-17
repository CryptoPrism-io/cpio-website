import { impactColors, connectionColors, type CalendarData } from '../data';

// Economic Calendar pane — ported from reference lines 652-701: ticker row,
// header (title/sub + This Week/Filters pills), 7-day week strip, impact/
// country filter chips + events counter, events table, and the event-detail
// panel (badges, countdown, AI impact analysis, market connections,
// historical-surprise sparkline). The historical-surprise sparkline (line
// 698) lacks stroke-linecap/stroke-linejoin in the reference, so it is raw
// <svg>, not the shared Sparkline component (which hardcodes round
// linecap/linejoin) — same pattern NewsScreen/DashboardScreen established.
// The "Starts in" countdown (line 692) is static mock text in the reference
// (not a live ticking timer) — rendered here by splitting screen.countdown.
export function CalendarScreen({ screen }: { screen: CalendarData }) {
  const [hrs, mins, secs] = screen.countdown.split(':');

  return (
    <>
      {/* Ticker row — reference lines 653-656 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 13, fontSize: 10, color: '#475467', marginBottom: 10, flexWrap: 'wrap' }}>
        {screen.ticker.map((tk) => (
          <span key={tk.sym}>
            <b style={{ color: '#0B1220' }}>{tk.sym}</b> {tk.price} <span style={{ color: '#16A34A' }}>{tk.chg}</span>
          </span>
        ))}
        <span style={{ color: '#0B8D84', fontWeight: 600, marginLeft: 'auto' }}>View all &gt;</span>
      </div>

      {/* Title/sub + This Week/Filters pills — reference lines 657-660 */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#0B1220' }}>Economic Calendar</div>
          <div style={{ fontSize: 9.5, color: '#475467', marginTop: 2 }}>AI analysis of macro events and their market impact.</div>
        </div>
        <div style={{ display: 'flex', gap: 7 }}>
          <span style={{ fontSize: 9, fontWeight: 600, color: '#475467', border: '1px solid #E7E9EC', borderRadius: 7, padding: '4px 9px', whiteSpace: 'nowrap' }}>This Week</span>
          <span style={{ fontSize: 9, fontWeight: 600, color: '#475467', border: '1px solid #E7E9EC', borderRadius: 7, padding: '4px 9px' }}>Filters</span>
        </div>
      </div>

      {/* 7-day week strip — reference lines 661-665; active-day styling from renderVals (line 1160) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginTop: 8 }}>
        {screen.weekDays.map((wd, i) => (
          <div
            key={i}
            style={{
              textAlign: 'center',
              border: `1px solid ${wd.active ? '#0FAE72' : '#E7E9EC'}`,
              background: wd.active ? '#F2FAF6' : '#FFFFFF',
              borderRadius: 8,
              padding: '5px 2px',
            }}
          >
            <div style={{ fontSize: 8, color: '#98A2B3' }}>{wd.d}</div>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: '#0B1220' }}>{wd.n}</div>
            <div style={{ fontSize: 7, color: '#98A2B3' }}>{wd.c}</div>
          </div>
        ))}
      </div>

      {/* Impact/country filter chips + events counter — reference lines 666-671 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 8.5, fontWeight: 600 }}>
        <span style={{ color: '#98A2B3' }}>IMPACT</span>
        <span style={{ color: '#0B1220', background: '#F5F6F7', borderRadius: 6, padding: '3px 8px' }}>All</span>
        <span style={{ color: '#475467', padding: '3px 4px' }}>High</span>
        <span style={{ color: '#475467', padding: '3px 4px' }}>Medium</span>
        <span style={{ color: '#475467', padding: '3px 4px' }}>Low</span>
        <span style={{ color: '#98A2B3', marginLeft: 10 }}>COUNTRY</span>
        <span style={{ color: '#0B1220', background: '#F5F6F7', borderRadius: 6, padding: '3px 8px' }}>All</span>
        <span style={{ color: '#98A2B3', marginLeft: 'auto' }}>137 events</span>
      </div>

      {/* Events table + event-detail panel — reference lines 672-700 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 10, marginTop: 8, flex: 1, minHeight: 0, overflow: 'hidden' }}>
        {/* Events table — reference lines 673-687 */}
        <div style={{ border: '1px solid #E7E9EC', borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '0.55fr 1.5fr 0.6fr 0.7fr 0.55fr 0.65fr 0.65fr', padding: '7px 10px', background: '#F9FAFA', fontSize: 7.5, fontWeight: 700, color: '#98A2B3' }}>
            <span>TIME</span>
            <span>EVENT</span>
            <span>COUNTRY</span>
            <span>IMPACT</span>
            <span>ACTUAL</span>
            <span>FORECAST</span>
            <span>PREVIOUS</span>
          </div>
          {screen.events.map((ev, i) => {
            const impact = impactColors(ev.impact);
            return (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '0.55fr 1.5fr 0.6fr 0.7fr 0.55fr 0.65fr 0.65fr', alignItems: 'center', padding: '7px 10px', borderTop: '1px solid #F0F1F2' }}>
                <span style={{ fontSize: 8.5, color: '#98A2B3' }}>{ev.time}</span>
                <span>
                  <span style={{ fontSize: 9, color: '#0B1220', fontWeight: 700, display: 'block' }}>{ev.name}</span>
                  <span style={{ fontSize: 7.5, color: '#98A2B3' }}>{ev.sub}</span>
                </span>
                <span style={{ fontSize: 8.5, color: '#475467' }}>{ev.country}</span>
                <span>
                  <span style={{ fontSize: 7.5, fontWeight: 700, color: impact.color, background: impact.bg, borderRadius: 999, padding: '2px 6px' }}>{ev.impact}</span>
                </span>
                <span style={{ fontSize: 8.5, fontWeight: 700, color: ev.actualColor }}>{ev.actual}</span>
                <span style={{ fontSize: 8.5, color: '#475467' }}>{ev.forecast}</span>
                <span style={{ fontSize: 8.5, color: '#475467' }}>{ev.prev}</span>
              </div>
            );
          })}
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', padding: '7px 10px', fontSize: 8.5, color: '#98A2B3', borderTop: '1px solid #F0F1F2' }}>
            <span>Showing 1 to 6 of 137 events</span>
            <span style={{ color: '#0B8D84', fontWeight: 600 }}>Load more</span>
          </div>
        </div>

        {/* Event-detail panel — reference lines 688-699 */}
        <div style={{ border: '1px solid #E7E9EC', borderRadius: 10, padding: 11, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: 5 }}>
            <span style={{ fontSize: 8, fontWeight: 700, color: '#DC2626', background: '#FEF2F2', borderRadius: 999, padding: '2px 7px' }}>HIGH IMPACT</span>
            <span style={{ fontSize: 8, fontWeight: 700, color: '#475467', background: '#F5F6F7', borderRadius: 999, padding: '2px 7px' }}>USD</span>
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#0B1220', marginTop: 7 }}>{screen.eventDetail}</div>
          <div style={{ fontSize: 8.5, color: '#98A2B3', marginTop: 2 }}>{screen.eventTime}</div>
          <div style={{ border: '1px solid #E7E9EC', borderRadius: 8, padding: '7px 10px', marginTop: 8 }}>
            <div style={{ fontSize: 7.5, color: '#98A2B3' }}>Starts in</div>
            <div style={{ display: 'flex', gap: 8, fontSize: 14, fontWeight: 800, color: '#0B1220', marginTop: 2 }}>
              <span>{hrs} <span style={{ fontSize: 7, fontWeight: 600, color: '#98A2B3' }}>HRS</span></span>
              <span>{mins} <span style={{ fontSize: 7, fontWeight: 600, color: '#98A2B3' }}>MINS</span></span>
              <span>{secs} <span style={{ fontSize: 7, fontWeight: 600, color: '#98A2B3' }}>SECS</span></span>
            </div>
          </div>
          <div style={{ fontSize: 8, fontWeight: 700, color: '#0B8D84', marginTop: 9 }}>
            AI IMPACT ANALYSIS <span style={{ fontWeight: 600, color: '#98A2B3', background: '#F5F6F7', borderRadius: 5, padding: '1px 5px' }}>Beta</span>
          </div>
          <div style={{ fontSize: 8.5, lineHeight: 1.5, color: '#475467', marginTop: 4 }}>{screen.eventImpactText}</div>
          <div style={{ fontSize: 8, fontWeight: 700, color: '#98A2B3', marginTop: 9 }}>MARKET CONNECTIONS</div>
          {screen.connections.map((cn, i) => {
            const c = connectionColors(cn.warm);
            return (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: '#0B1220' }}>{cn.sym}</span>
                <span style={{ fontSize: 7.5, fontWeight: 700, color: c.color, background: c.bg, borderRadius: 999, padding: '2px 6px' }}>{cn.level}</span>
              </div>
            );
          })}
          <div style={{ fontSize: 8, fontWeight: 700, color: '#98A2B3', marginTop: 'auto', paddingTop: 6 }}>
            HISTORICAL SURPRISE <span style={{ float: 'right', color: '#16A34A' }}>0.18%</span>
          </div>
          <svg width="100%" height="16" viewBox="0 0 120 20" preserveAspectRatio="none" style={{ marginTop: 3 }}>
            <path d="M4 10v-6 M14 10v4 M24 10v-3 M34 10v5 M44 10v-7 M54 10v3 M64 10v-4 M74 10v6 M84 10v-5 M94 10v2 M104 10v-6 M114 10v4" stroke="#16A34A" strokeWidth={3} />
          </svg>
        </div>
      </div>
    </>
  );
}
