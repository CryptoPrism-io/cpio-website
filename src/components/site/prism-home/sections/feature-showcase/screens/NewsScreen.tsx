import { affectedColors, headlineTagColors, type NewsData } from '../data';

// News Intelligence pane — ported from reference lines 716-750 (3-col grid:
// headline list / selected-article panel / impact panel). The ticker row,
// "News Desk" header, watchlist/customize chips, category filters and
// timeframe selector (reference lines 704-715) are omitted: NewsData carries
// no fields for them (no `ticker`, no header/chip data), so rendering them
// would require fabricated data. The sentiment sparkline (line 747) lacks
// stroke-linecap/stroke-linejoin in the reference, so it is raw <svg>, not
// the shared Sparkline component (which hardcodes round linecap/linejoin) —
// same pattern DashboardScreen/ScreenerScreen established.
export function NewsScreen({ screen }: { screen: NewsData }) {
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.35fr 0.75fr', gap: 10, marginTop: 8, flex: 1, minHeight: 0, overflow: 'hidden' }}>
        {/* Headline list — reference lines 717-726 */}
        <div style={{ border: '1px solid #E7E9EC', borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {screen.headlines.map((hl, i) => {
            const tag = headlineTagColors(hl.tag);
            return (
              <div key={i} style={{ padding: '8px 10px', borderTop: '1px solid #F0F1F2', background: hl.active ? '#F9FAFA' : 'transparent' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 7.5, fontWeight: 700, color: tag.color, background: tag.bg, borderRadius: 999, padding: '2px 6px' }}>{hl.tag}</span>
                  <span style={{ fontSize: 7.5, color: '#98A2B3' }}>{hl.time}</span>
                </div>
                <div style={{ fontSize: 9, color: '#0B1220', fontWeight: 600, marginTop: 4, lineHeight: 1.35 }}>{hl.title}</div>
                <div style={{ fontSize: 7.5, color: '#98A2B3', marginTop: 3 }}>{hl.source}</div>
              </div>
            );
          })}
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', padding: '7px 10px', fontSize: 8, color: '#98A2B3', borderTop: '1px solid #F0F1F2' }}>
            <span>Showing 1 to 10 of 125 results</span>
            <span style={{ color: '#0B8D84', fontWeight: 600 }}>Load more</span>
          </div>
        </div>

        {/* Selected-article panel — reference lines 727-734 */}
        <div style={{ border: '1px solid #E7E9EC', borderRadius: 10, padding: 11, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <span style={{ fontSize: 7.5, fontWeight: 700, color: '#DC2626', background: '#FEF2F2', borderRadius: 999, padding: '2px 6px' }}>HIGH IMPACT</span>
            <span style={{ fontSize: 7.5, fontWeight: 700, color: '#475467', background: '#F5F6F7', borderRadius: 999, padding: '2px 6px' }}>BTC</span>
            <span style={{ fontSize: 7.5, color: '#98A2B3' }}>23m ago &#183; bitcoin.com</span>
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0B1220', lineHeight: 1.35, marginTop: 6 }}>{screen.newsDetailTitle}</div>
          <div style={{ border: '1px solid #E7E9EC', borderRadius: 8, padding: 8, marginTop: 7, background: '#F9FAFA' }}>
            <div style={{ fontSize: 7.5, fontWeight: 700, color: '#0B8D84', marginBottom: 3 }}>
              AI SUMMARY <span style={{ fontWeight: 600, color: '#98A2B3', background: '#FFFFFF', borderRadius: 4, padding: '1px 4px' }}>Beta</span>
            </div>
            <div style={{ fontSize: 8.5, lineHeight: 1.5, color: '#475467' }}>{screen.aiSummary}</div>
          </div>
          <div style={{ fontSize: 8, fontWeight: 700, color: '#0B1220', marginTop: 8 }}>KEY TAKEAWAYS</div>
          {screen.takeaways.map((tw, i) => (
            <div key={i} style={{ fontSize: 8.5, lineHeight: 1.45, color: '#475467', marginTop: 3 }}>&#8226; {tw}</div>
          ))}
          <div style={{ display: 'flex', gap: 5, marginTop: 'auto', paddingTop: 7, alignItems: 'center' }}>
            <span style={{ fontSize: 7.5, fontWeight: 600, color: '#475467', background: '#F5F6F7', borderRadius: 999, padding: '2px 7px' }}>Security</span>
            <span style={{ fontSize: 7.5, fontWeight: 600, color: '#475467', background: '#F5F6F7', borderRadius: 999, padding: '2px 7px' }}>Mining</span>
            <span style={{ fontSize: 7.5, fontWeight: 600, color: '#475467', background: '#F5F6F7', borderRadius: 999, padding: '2px 7px' }}>Bitcoin</span>
            <span style={{ fontSize: 8, fontWeight: 700, color: '#0B8D84', marginLeft: 'auto' }}>View Full Article &#8594;</span>
          </div>
        </div>

        {/* Impact Score + Affected Assets panels — reference lines 735-749 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0, overflow: 'hidden' }}>
          <div style={{ border: '1px solid #E7E9EC', borderRadius: 10, padding: 11 }}>
            <div style={{ fontSize: 8, fontWeight: 700, color: '#98A2B3' }}>IMPACT SCORE</div>
            <div style={{ fontSize: 21, fontWeight: 800, color: '#DC2626', marginTop: 2 }}>
              {screen.impactScore} <span style={{ fontSize: 9, fontWeight: 600, color: '#98A2B3' }}>/100</span>
            </div>
            <span style={{ fontSize: 7.5, fontWeight: 700, color: '#DC2626', background: '#FEF2F2', borderRadius: 999, padding: '2px 7px' }}>High Impact</span>
            <div style={{ width: '100%', height: 4, borderRadius: 999, background: '#E7E9EC', marginTop: 9, position: 'relative' }}>
              <div style={{ width: '30%', height: '100%', borderRadius: 999, background: '#DC2626' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 7, color: '#98A2B3', marginTop: 3 }}>
              <span>Bearish</span>
              <span>Bullish</span>
            </div>
          </div>
          <div style={{ border: '1px solid #E7E9EC', borderRadius: 10, padding: 11, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 8, fontWeight: 700, color: '#98A2B3' }}>AFFECTED ASSETS</div>
            {screen.affected.map((af) => {
              const c = affectedColors(af.s);
              return (
                <div key={af.sym} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: '#0B1220' }}>{af.sym}</span>
                  <span style={{ fontSize: 7.5, fontWeight: 700, color: c.color, background: c.bg, borderRadius: 999, padding: '2px 6px' }}>{af.s}</span>
                </div>
              );
            })}
            <div style={{ fontSize: 8, fontWeight: 700, color: '#98A2B3', marginTop: 'auto', paddingTop: 7 }}>
              SENTIMENT OVER TIME <span style={{ fontWeight: 500 }}>(24H)</span>
            </div>
            <svg width="100%" height="22" viewBox="0 0 120 30" preserveAspectRatio="none" style={{ marginTop: 3 }}>
              <path d="M0 10 L15 14 L30 8 L45 16 L60 12 L75 20 L90 16 L105 24 L120 21" fill="none" stroke="#DC2626" strokeWidth={1.6} />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
