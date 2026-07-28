import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import type { ChartConfiguration } from 'chart.js';
import type { AnalyticsData } from '../data';

// Analytics pane — ported from reference lines 596-650: ticker row, header
// (title/sub + date-range/Compare/Export pills), 8 sub-tabs (tabs2, active
// styling from renderVals line 1168), 5 metric cards (4 sparkline + Fear &
// Greed, derived styling from renderVals lines 1169-1173), 5 live Chart.js
// panels (Total Market Cap, Exchange Net Flows, Stablecoin Market Cap,
// Derivatives OI, Liquidations doughnut), and the Top Gainers list. Chart
// lifecycle replaces the design's componentDidUpdate/initAnalyticsCharts
// (lines 1218-1242) with a mount/unmount effect — the screen unmounts on
// tab switch, so mount is the React-idiomatic equivalent of "just built".
// The metric-card sparkline (line 614) lacks stroke-linecap/stroke-linejoin
// in the reference, so it's raw <svg>, not the shared Sparkline component
// (which hardcodes round linecap/linejoin) — same pattern established by
// DashboardScreen/CalendarScreen/NewsScreen.
export function AnalyticsScreen({ screen }: { screen: AnalyticsData }) {
  const tmcRef = useRef<HTMLCanvasElement>(null);
  const flowsRef = useRef<HTMLCanvasElement>(null);
  const stblRef = useRef<HTMLCanvasElement>(null);
  const oiRef = useRef<HTMLCanvasElement>(null);
  const liqRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const charts: Chart[] = [];
    const NO = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true, displayColors: false, backgroundColor: '#0B1220', titleFont: { size: 9 }, bodyFont: { size: 9 }, padding: 6 },
      },
      animation: false,
    } as const;
    const days = Array.from({ length: 30 }, (_, i) => `Jun ${15 + i <= 30 ? 15 + i : i - 15}`);
    const walk = (start: number, drift: number, vol: number) => {
      let v = start;
      return Array.from({ length: 30 }, (_, i) => {
        v += drift + Math.sin(i * 1.7) * vol + Math.cos(i * 0.9) * vol * 0.6;
        return +v.toFixed(2);
      });
    };
    const grad = (ctx: CanvasRenderingContext2D, hex: string) => {
      const g = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height || 80);
      g.addColorStop(0, hex + '33');
      g.addColorStop(1, hex + '00');
      return g;
    };
    type MkConfig =
      | ChartConfiguration<'line', number[], string>
      | ChartConfiguration<'bar', number[], string>
      | ChartConfiguration<'doughnut', number[], string>;
    const mk = (el: HTMLCanvasElement | null, cfg: MkConfig) => {
      if (el) charts.push(new Chart(el, cfg as ChartConfiguration));
    };
    const hidden = { scales: { x: { display: false }, y: { display: false } } };

    const tctx = tmcRef.current?.getContext('2d');
    mk(tmcRef.current, { type: 'line', data: { labels: days, datasets: [{ data: walk(2.05, 0.009, 0.03), borderColor: '#16A34A', backgroundColor: tctx ? grad(tctx, '#16A34A') : 'transparent', fill: true, tension: 0.4, pointRadius: 0, pointHitRadius: 8, borderWidth: 1.6 }] }, options: { ...NO, ...hidden } });
    const flowVals = Array.from({ length: 26 }, (_, i) => +(Math.sin(i * 1.3) * 0.9 + Math.cos(i * 0.7) * 0.7).toFixed(2));
    mk(flowsRef.current, { type: 'bar', data: { labels: days.slice(0, 26), datasets: [{ data: flowVals, backgroundColor: flowVals.map((v) => (v >= 0 ? '#16A34A' : '#DC2626')), borderRadius: 1.5, barPercentage: 0.7 }] }, options: { ...NO, ...hidden } });
    const sctx = stblRef.current?.getContext('2d');
    mk(stblRef.current, { type: 'line', data: { labels: days, datasets: [{ data: walk(160, 0.32, 0.9), borderColor: '#7C3AED', backgroundColor: sctx ? grad(sctx, '#7C3AED') : 'transparent', fill: true, tension: 0.4, pointRadius: 0, pointHitRadius: 8, borderWidth: 1.6 }] }, options: { ...NO, ...hidden } });
    const octx = oiRef.current?.getContext('2d');
    mk(oiRef.current, { type: 'line', data: { labels: days, datasets: [{ data: walk(21, 0.09, 0.35), borderColor: '#2563EB', backgroundColor: octx ? grad(octx, '#2563EB') : 'transparent', fill: true, tension: 0.4, pointRadius: 0, pointHitRadius: 8, borderWidth: 1.5 }] }, options: { ...NO, ...hidden } });
    mk(liqRef.current, { type: 'doughnut', data: { labels: ['Long', 'Short'], datasets: [{ data: [82.6, 29.8], backgroundColor: ['#16A34A', '#DC2626'], borderWidth: 0 }] }, options: { ...NO, cutout: '68%' } });

    return () => charts.forEach((c) => { try { c.destroy(); } catch { /* canvas already gone */ } });
  }, []);

  return (
    <>
      {/* Ticker row — reference lines 597-599 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 13, fontSize: 10, color: '#475467', marginBottom: 10, flexWrap: 'wrap' }}>
        {screen.ticker.map((tk) => (
          <span key={tk.sym}>
            <b style={{ color: '#0B1220' }}>{tk.sym}</b> {tk.price} <span style={{ color: '#16A34A' }}>{tk.chg}</span>
          </span>
        ))}
        <span style={{ color: '#0B8D84', fontWeight: 600, marginLeft: 'auto' }}>View all &gt;</span>
      </div>

      {/* Title/sub + date-range/Compare/Export pills — reference lines 601-603 */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#0B1220' }}>Analytics</div>
          <div style={{ fontSize: 9.5, color: '#475467', marginTop: 2 }}>Institutional-grade market and on-chain intelligence.</div>
        </div>
        <div style={{ display: 'flex', gap: 7 }}>
          <span style={{ fontSize: 9, fontWeight: 600, color: '#475467', border: '1px solid #E7E9EC', borderRadius: 7, padding: '4px 9px', whiteSpace: 'nowrap' }}>Jun 15 &#8211; Jul 15, 2024</span>
          <span style={{ fontSize: 9, fontWeight: 600, color: '#475467', border: '1px solid #E7E9EC', borderRadius: 7, padding: '4px 9px' }}>Compare</span>
          <span style={{ fontSize: 9, fontWeight: 600, color: '#475467', border: '1px solid #E7E9EC', borderRadius: 7, padding: '4px 9px' }}>Export</span>
        </div>
      </div>

      {/* 8 sub-tabs (tabs2) — reference line 605-607; active styling from renderVals line 1168 */}
      <div style={{ display: 'flex', gap: 14, borderBottom: '1px solid #E7E9EC', marginTop: 8, fontSize: 9.5, fontWeight: 600 }}>
        {screen.tabs2.map((t2, i) => (
          <span key={i} style={{ color: t2.active ? '#0B8D84' : '#667085', borderBottom: `2px solid ${t2.active ? '#0FAE72' : 'transparent'}`, padding: '4px 1px 6px' }}>
            {t2.label}
          </span>
        ))}
      </div>

      {/* 5 metric cards — reference lines 608-617; derived styling from renderVals lines 1169-1173 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginTop: 10 }}>
        {screen.metricCards.map((mc, i) => (
          <div key={i} style={{ border: '1px solid #E7E9EC', borderRadius: 10, padding: 9, minWidth: 0 }}>
            <div style={{ fontSize: 8.5, color: '#475467', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{mc.label}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: mc.fng ? '#DC2626' : '#0B1220', marginTop: 3 }}>
              {mc.value} <span style={{ fontSize: 8, fontWeight: 600, color: mc.fng ? '#DC2626' : '#16A34A' }}>{mc.chg}</span>
            </div>
            {mc.fng ? (
              <div style={{ width: '100%', height: 4, borderRadius: 999, background: '#E7E9EC', marginTop: 10, position: 'relative' }}>
                <div style={{ width: '34%', height: '100%', borderRadius: 999, background: '#DC2626' }} />
                <span style={{ position: 'absolute', left: '34%', top: -2, width: 8, height: 8, borderRadius: '50%', background: '#DC2626', transform: 'translateX(-50%)' }} />
              </div>
            ) : (
              // reference line 614 omits stroke-linecap/stroke-linejoin — raw svg, not the shared Sparkline component
              <svg width="100%" height={16} viewBox="0 0 70 30" preserveAspectRatio="none" style={{ marginTop: 4 }}>
                <path d={mc.sparkPath} fill="none" stroke="#16A34A" strokeWidth={1.8} />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Chart row 1: Total Market Cap / Exchange Net Flows / Stablecoin Market Cap — reference lines 618-634 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr 1fr', gap: 8, marginTop: 8, flex: 1, minHeight: 0 }}>
        <div style={{ border: '1px solid #E7E9EC', borderRadius: 10, padding: 10, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 9.5, fontWeight: 700, color: '#0B1220' }}>Total Market Cap</span>
            <span style={{ display: 'flex', gap: 3, fontSize: 7.5, fontWeight: 600, color: '#667085' }}>
              <span>1D</span>
              <span>7D</span>
              <span style={{ color: '#FFFFFF', background: '#0FAE72', borderRadius: 4, padding: '1px 4px' }}>1M</span>
              <span>3M</span>
              <span>6M</span>
              <span>1Y</span>
            </span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#0B1220', marginTop: 3 }}>
            $2.30T <span style={{ fontSize: 8.5, fontWeight: 600, color: '#16A34A' }}>+2.81%</span>
          </div>
          <div style={{ flex: 1, minHeight: 40, position: 'relative', marginTop: 4 }}>
            <canvas ref={tmcRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
          </div>
        </div>
        <div style={{ border: '1px solid #E7E9EC', borderRadius: 10, padding: 10, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: '#0B1220' }}>
            Exchange Net Flows <span style={{ fontSize: 7.5, fontWeight: 500, color: '#667085' }}>(30D)</span>
          </div>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#0B1220', marginTop: 3 }}>
            &#8722;$1.38B <span style={{ fontSize: 8, fontWeight: 600, color: '#475467' }}>Net Outflow</span>
          </div>
          <div style={{ flex: 1, minHeight: 36, position: 'relative', marginTop: 4 }}>
            <canvas ref={flowsRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
          </div>
        </div>
        <div style={{ border: '1px solid #E7E9EC', borderRadius: 10, padding: 10, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: '#0B1220' }}>Stablecoin Market Cap</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#0B1220', marginTop: 3 }}>
            $168.7B <span style={{ fontSize: 8, fontWeight: 600, color: '#16A34A' }}>+1.94%</span>
          </div>
          <div style={{ flex: 1, minHeight: 36, position: 'relative', marginTop: 4 }}>
            <canvas ref={stblRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
          </div>
        </div>
      </div>

      {/* Chart row 2: Top Gainers / Derivatives OI / Liquidations — reference lines 635-649 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 8, marginTop: 8 }}>
        <div style={{ border: '1px solid #E7E9EC', borderRadius: 10, padding: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5 }}>
            <span style={{ fontWeight: 700, color: '#0B1220' }}>
              Top Gainers <span style={{ fontSize: 7.5, fontWeight: 500, color: '#667085' }}>(24H)</span>
            </span>
            <span style={{ color: '#0B8D84', fontWeight: 600, fontSize: 8.5 }}>View all</span>
          </div>
          {screen.gainers.map((gn, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 0.8fr 0.9fr', fontSize: 8.5, color: '#475467', marginTop: 6 }}>
              <span style={{ fontWeight: 700, color: '#0B1220' }}>{gn.sym}</span>
              <span>{gn.price}</span>
              <span style={{ color: '#16A34A' }}>{gn.chg}</span>
              <span>{gn.vol}</span>
            </div>
          ))}
        </div>
        <div style={{ border: '1px solid #E7E9EC', borderRadius: 10, padding: 10 }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: '#0B1220' }}>Derivatives OI</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#0B1220', marginTop: 2 }}>
            $23.47B <span style={{ fontSize: 8, fontWeight: 600, color: '#16A34A' }}>+3.21%</span>
          </div>
          <div style={{ height: 26, position: 'relative', marginTop: 4 }}>
            <canvas ref={oiRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
          </div>
        </div>
        <div style={{ border: '1px solid #E7E9EC', borderRadius: 10, padding: 10, display: 'flex', gap: 10, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 9.5, fontWeight: 700, color: '#0B1220' }}>
              Liquidations <span style={{ fontSize: 7.5, fontWeight: 500, color: '#667085' }}>(24H)</span>
            </div>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#0B1220', marginTop: 2 }}>{screen.liquidations}</div>
            <div style={{ fontSize: 8, marginTop: 4 }}>
              <span style={{ color: '#16A34A', fontWeight: 700 }}>Long {screen.long}</span>
              <br />
              <span style={{ color: '#DC2626', fontWeight: 700 }}>Short {screen.short}</span>
            </div>
          </div>
          <div style={{ width: 52, height: 52, position: 'relative', marginLeft: 'auto', flex: 'none' }}>
            <canvas ref={liqRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
          </div>
        </div>
      </div>
    </>
  );
}
