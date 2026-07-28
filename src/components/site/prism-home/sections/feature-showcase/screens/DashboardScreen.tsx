import type { DashboardData } from '../data';

// Unified Dashboard pane — ported from reference lines 477-526.
export function DashboardScreen({ screen }: { screen: DashboardData }) {
  return (
    <>
      {/* Ticker row — reference line 477-480 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 13, fontSize: 10.5, color: '#475467', marginBottom: 12, flexWrap: 'wrap' }}>
        {screen.ticker.map((tk) => (
          <span key={tk.sym}>
            <b style={{ color: '#0B1220' }}>{tk.sym}</b> {tk.price} <span style={{ color: '#16A34A' }}>{tk.chg}</span>
          </span>
        ))}
        <span style={{ color: '#0B8D84', fontWeight: 600, marginLeft: 'auto' }}>View all &gt;</span>
      </div>

      {/* Grid: 5 price cards + Market Overview (col 6, rows 1-2) + Daily Recap (cols 1-3) + News (cols 4-5) — reference lines 481-526 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr) 1.15fr', gridTemplateRows: 'auto 1fr', gap: 10, flex: 1, minHeight: 0 }}>
        {screen.priceCards.map((pc, i) => (
          <div key={i} style={{ border: '1px solid #E7E9EC', borderRadius: 10, padding: 10, minWidth: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#0B1220', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{pc.name}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#0B1220', marginTop: 5 }}>{pc.price}</div>
            <div style={{ fontSize: 9.5, color: '#16A34A', marginTop: 1 }}>{pc.chg}</div>
            {/* width must stay 100% (fluid grid column) — Sparkline's numeric-only width prop can't express that, so this one is raw svg, byte-matched to reference line 487 */}
            <svg width="100%" height={18} viewBox="0 0 70 30" preserveAspectRatio="none" style={{ marginTop: 4 }}>
              <path d={pc.sparkPath} fill="none" stroke="#16A34A" strokeWidth={1.6} />
            </svg>
          </div>
        ))}

        {/* Market Overview panel — reference lines 490-509 */}
        <div style={{ gridColumn: '6', gridRow: '1 / 3', border: '1px solid #E7E9EC', borderRadius: 12, padding: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0B1220', marginBottom: 8 }}>Market Overview</div>
          <div style={{ fontSize: 9, fontWeight: 700, color: '#667085' }}>TOTAL MARKET CAP</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#0B1220', marginTop: 2 }}>{screen.totalCap}</div>
          <div style={{ fontSize: 9, fontWeight: 700, color: '#667085', marginTop: 8 }}>24H VOLUME</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#0B1220', marginTop: 2 }}>{screen.vol24h}</div>
          <div style={{ fontSize: 9, fontWeight: 700, color: '#667085', marginTop: 10 }}>MARKET DOMINANCE</div>
          <div style={{ display: 'flex', width: '100%', height: 7, borderRadius: 999, overflow: 'hidden', marginTop: 6 }}>
            <div style={{ width: '56.3%', background: '#F59E0B' }} />
            <div style={{ width: '9.8%', background: '#7C3AED' }} />
            <div style={{ width: '33.9%', background: '#E7E9EC' }} />
          </div>
          <div style={{ fontSize: 8.5, color: '#667085', marginTop: 4 }}>BTC 56.3% &#183; ETH 9.8%</div>
          <div style={{ fontSize: 9, fontWeight: 700, color: '#667085', marginTop: 12 }}>FEAR &amp; GREED INDEX</div>
          <div style={{ position: 'relative', flex: 1, minHeight: 40, marginTop: 6 }}>
            <svg width="100%" height="100%" viewBox="0 0 160 60" preserveAspectRatio="xMidYMid meet">
              <circle cx={18} cy={40} r={2.5} fill="#0B1220" />
              <circle cx={34} cy={24} r={2.5} fill="#0B1220" />
              <circle cx={50} cy={46} r={2.5} fill="#0B1220" />
              <circle cx={64} cy={18} r={2.5} fill="#F59E0B" />
              <circle cx={80} cy={34} r={2.5} fill="#0B1220" />
              <circle cx={96} cy={12} r={2.5} fill="#0B1220" />
              <circle cx={110} cy={40} r={2.5} fill="#0B1220" />
              <circle cx={126} cy={22} r={2.5} fill="#0B1220" />
              <circle cx={142} cy={44} r={2.5} fill="#0B1220" />
            </svg>
            <div style={{ position: 'absolute', left: '50%', top: '30%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#F59E0B' }}>{screen.fng}</div>
              <div style={{ fontSize: 8, fontWeight: 700, color: '#B45309' }}>Fear</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 7.5, color: '#667085', marginTop: 2 }}>
            <span>Extreme Fear</span>
            <span>Extreme Greed</span>
          </div>
        </div>

        {/* Daily Recap panel — reference lines 510-516 */}
        <div style={{ gridColumn: '1 / 4', border: '1px solid #E7E9EC', borderRadius: 12, padding: 12, overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#0B1220' }}>Daily Recap</span>
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="#667085" strokeWidth={1.6}>
              <path d="M4 10a6 6 0 0 1 10.5-4 M16 10a6 6 0 0 1-10.5 4 M14.5 3v3.5H11 M5.5 17v-3.5H9" />
            </svg>
          </div>
          {screen.dailyRecap.map((rc, i) => (
            <div key={i} style={{ fontSize: 9.5, lineHeight: 1.5, color: '#475467', marginBottom: 6 }}>&#8226; {rc}</div>
          ))}
          <div style={{ fontSize: 9, fontWeight: 700, color: '#667085', marginTop: 8 }}>YOUR WATCHLIST</div>
          <div style={{ fontSize: 9.5, lineHeight: 1.5, color: '#475467', marginTop: 4 }}>
            &#8226; USD Coin &#8212; BUY signal (24 bull / 6 bear); ML HOLD 91% confidence.
          </div>
          <div style={{ fontSize: 8, color: '#667085', marginTop: 8 }}>Powered by Saarthi</div>
        </div>

        {/* News panel — reference lines 517-525 */}
        <div style={{ gridColumn: '4 / 6', border: '1px solid #E7E9EC', borderRadius: 12, padding: 12, overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#0B1220' }}>News</span>
            <span style={{ fontSize: 9.5, fontWeight: 600, color: '#0B8D84' }}>News Desk &gt;</span>
          </div>
          {screen.newsList.map((ns, i) => (
            <div key={i} style={{ marginBottom: 8, paddingBottom: 8, borderBottom: '1px solid #F0F1F2' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 8.5, fontWeight: 700, color: '#667085', textTransform: 'uppercase' }}>
                <span>{ns.cat}</span>
                <span style={{ fontWeight: 500, textTransform: 'none' }}>{ns.time}</span>
              </div>
              <div style={{ fontSize: 9.5, lineHeight: 1.4, color: '#0B1220', marginTop: 3 }}>{ns.title}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
