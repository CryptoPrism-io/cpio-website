import { useEffect, useState, Fragment, type ReactNode } from 'react';
import { useInView, useRevealClass } from './hooks';

// ─── Logo ───────────────────────────────────────────────────────────────────
export function Logo({ size = 28 }: { size?: number }) {
  return (
    <a href="#/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <defs>
          <linearGradient id="lg-cp" x1="0" y1="0" x2="32" y2="32">
            <stop offset={0} stopColor="#0A8F5A" />
            <stop offset={1} stopColor="#0E7490" />
          </linearGradient>
        </defs>
        <path d="M16 2 L29 9.5 L29 22.5 L16 30 L3 22.5 L3 9.5 Z" stroke="url(#lg-cp)" strokeWidth="1.6" fill="rgba(10,143,90,.07)" />
        <path d="M16 2 L16 30 M3 9.5 L29 22.5 M29 9.5 L3 22.5" stroke="url(#lg-cp)" strokeWidth="0.8" opacity=".55" />
        <circle cx="16" cy="16" r="3.2" fill="#0A8F5A" />
      </svg>
      <span style={{ fontFamily: 'Manrope', fontWeight: 800, letterSpacing: '-0.04em', fontSize: 18, color: 'var(--text)' }}>
        CryptoPrism<span style={{ color: 'var(--emerald)' }}>.</span>
      </span>
    </a>
  );
}

// ─── Nav ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Product', href: '#/product', key: 'product' },
  { label: 'Intelligence', href: '#/intelligence', key: 'intelligence' },
  { label: 'Compare', href: '#/compare', key: 'compare' },
  { label: 'Pricing', href: '#/pricing', key: 'pricing' },
  { label: 'For Desks & Funds', href: '#/institutional', key: 'institutional' },
];

export function NavBar({ active, cta = 'invite' }: { active: string | null; cta?: 'invite' | 'api' }) {
  return (
    <header className="nav">
      <div className="wrap" style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <Logo />
        <nav className="hide-m" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {NAV_LINKS.map((l) => (
            <a key={l.key} href={l.href} className={'nav-link' + (active === l.key ? ' active' : '')}>{l.label}</a>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <a href="#" onClick={(e) => e.preventDefault()} className="hide-m" style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Sign in</a>
          <a href="#" className="btn-primary cta-early-access-trigger" style={{ padding: '.6rem 1.15rem', fontSize: 13 }}>
            {cta === 'api' ? 'Get API access' : 'Request an Invite'}
          </a>
        </div>
      </div>
    </header>
  );
}

// ─── Trust bar (Home only) ──────────────────────────────────────────────────
export function TrustBar() {
  return (
    <div className="trust-bar" style={{ marginTop: 64 }}>
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', gap: 18, height: 38, overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <span className="mono" style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', color: 'var(--emerald)' }}>BETA · INVITE ONLY</span>
        <span style={{ width: 1, height: 14, background: 'rgba(120,110,80,.3)' }} />
        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Built &amp; validated out-of-sample</span>
        <span className="hide-m" style={{ width: 1, height: 14, background: 'rgba(120,110,80,.3)' }} />
        <span className="hide-m" style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>As deployed for Isha Foundation · Featured in Times of India (AI Bharatverse)</span>
      </div>
    </div>
  );
}

// ─── Stat that deep-links to Evidence ───────────────────────────────────────
export function StatLink({ v, l, href = '#/evidence' }: { v: string; l: string; href?: string }) {
  return (
    <a className="stat-link" href={href}>
      <span className="stat-v display mono" style={{ fontSize: 26, color: 'var(--text)', display: 'block', transition: 'color .2s' }}>{v}</span>
      <span className="label" style={{ fontSize: 9, marginTop: 5, display: 'block' }}>{l}</span>
    </a>
  );
}

// ─── DMV Conviction Gauge (dark terminal panel) ─────────────────────────────
export function Odo({ value, digits = 2 }: { value: number; digits?: number }) {
  const s = String(Math.max(0, Math.round(value))).padStart(digits, '0');
  return (
    <span className="odo">
      {s.split('').map((d, i) => (
        <span key={i} className="odo-d">
          <span className="odo-strip" style={{ transform: `translateY(-${Number(d)}em)` }}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => <span key={n}>{n}</span>)}
          </span>
        </span>
      ))}
    </span>
  );
}

export function DMVGauge({ compact = false }: { compact?: boolean }) {
  const [t, setT] = useState(0);
  const [phase, setPhase] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const el = (Date.now() - start) / 1000;
      const next = Math.min(el / 2.6, 1);
      setT(next);
      if (next >= 1) clearInterval(id);
    }, 30);
    const ph = setInterval(() => setPhase((p) => p + 0.32), 90);
    return () => { clearInterval(id); clearInterval(ph); };
  }, []);
  const e = 1 - Math.pow(1 - t, 3);
  const D = 82, M = 71, V = 64;
  const composite = 78;
  const frac = composite / 100;

  const CX = 140, CY = 130, R = 100;
  const pt = (tt: number, rad: number): [number, number] => {
    const a = (210 - 240 * tt) * Math.PI / 180;
    return [CX + rad * Math.cos(a), CY - rad * Math.sin(a)];
  };
  let dialD = '';
  for (let i = 0; i <= 60; i++) {
    const [x, y] = pt(i / 60, R);
    dialD += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
  }
  const colorFor = (tt: number) => tt < 1 / 3 ? '#0ECB81' : tt < 2 / 3 ? '#22D3EE' : '#8B5CF6';
  const prog = frac * e;
  const [hx, hy] = pt(prog, R);
  const ticks = [];
  for (let i = 0; i <= 24; i++) {
    const tt = i / 24;
    const major = i % 6 === 0;
    const [x1, y1] = pt(tt, R + 14);
    const [x2, y2] = pt(tt, R + (major ? 26 : 21));
    const lit = tt <= prog + 0.001;
    ticks.push(<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={lit ? colorFor(tt) : 'rgba(255,255,255,.1)'} strokeWidth={major ? 2 : 1.2} strokeLinecap="round" style={lit ? { filter: `drop-shadow(0 0 3px ${colorFor(tt)})` } : undefined} />);
  }
  const [z1x, z1y] = pt(0, R + 38), [z2x, z2y] = pt(.5, R + 36), [z3x, z3y] = pt(1, R + 38);

  const Trace = ({ color, amp, jag, off }: { color: string; amp: number; jag: boolean; off: number }) => {
    const pts = [];
    for (let i = 0; i < 27; i++) {
      const y = 11 + Math.sin(i * 0.52 + phase + off) * amp + (jag ? Math.sin(i * 2.3 + phase * 1.9) * 2.6 : 0);
      pts.push(`${(i * (86 / 26)).toFixed(1)},${y.toFixed(1)}`);
    }
    return (
      <svg width="86" height="22" viewBox="0 0 86 22">
        <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity=".9" />
      </svg>
    );
  };

  const regime = 'REGIME: ACCUMULATION';
  const typedN = t <= 0.55 ? 0 : Math.min(regime.length, Math.floor(((t - 0.55) / 0.45) * regime.length + 0.999));

  const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const onMove = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = ev.currentTarget.getBoundingClientRect();
    setTilt({ x: -((ev.clientY - r.top) / r.height - 0.5) * 7, y: ((ev.clientX - r.left) / r.width - 0.5) * 9 });
  };

  const axes = [
    { l: 'DIRECTION', v: D, c: '#0ECB81', amp: 5, jag: false, off: 0 },
    { l: 'MAGNITUDE', v: M, c: '#22D3EE', amp: 3.4, jag: false, off: 2 },
    { l: 'VOLATILITY', v: V, c: '#8B5CF6', amp: 3.6, jag: true, off: 4 },
  ];

  return (
    <div className="dark-panel" onMouseMove={onMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })} style={{
      position: 'relative', padding: compact ? 20 : 26, width: '100%', maxWidth: 440,
      transform: `perspective(950px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      transition: 'transform .25s ease-out', willChange: 'transform',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
        <span className="label">DMV CONVICTION · BTC</span>
        <span className="mono" style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', color: 'var(--dk-amber)', border: '1px solid rgba(245,158,11,.35)', background: 'rgba(245,158,11,.08)', padding: '3px 8px', borderRadius: 4, whiteSpace: 'nowrap' }}>SAMPLE — BTC</span>
      </div>

      <div style={{ position: 'relative' }}>
        <svg viewBox="0 0 280 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <linearGradient id="dmvDial" x1="0" y1="0" x2="1" y2="0">
              <stop offset={0} stopColor="#0ECB81" />
              <stop offset={.55} stopColor="#22D3EE" />
              <stop offset={1} stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          {ticks}
          <path d={dialD} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="12" strokeLinecap="round" />
          <path d={dialD} fill="none" stroke="url(#dmvDial)" strokeWidth="12" strokeLinecap="round" pathLength={100}
            strokeDasharray="100" strokeDashoffset={100 - prog * 100}
            style={{ filter: 'drop-shadow(0 0 10px rgba(14,203,129,.35))' }} />
          <circle cx={hx} cy={hy} r="11" fill="rgba(255,255,255,.14)" />
          <circle cx={hx} cy={hy} r="5.5" fill="#fff" style={{ filter: `drop-shadow(0 0 8px ${colorFor(prog)})` }} />
          <text x={z1x} y={z1y + 4} fill="rgba(160,177,197,.5)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">0</text>
          <text x={z2x} y={z2y + 4} fill="rgba(160,177,197,.5)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">50</text>
          <text x={z3x} y={z3y + 4} fill="rgba(160,177,197,.5)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">100</text>
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 14, pointerEvents: 'none' }}>
          <span className="display" style={{ fontSize: compact ? 58 : 84, color: '#fff', letterSpacing: '-0.05em', textShadow: '0 0 30px rgba(14,203,129,.3)' }}>
            <Odo value={composite * e} />
          </span>
          <span className="label" style={{ marginTop: 4, fontSize: 8.5 }}>CONVICTION / 100</span>
          <span className="mono" style={{ marginTop: 8, fontSize: 9.5, fontWeight: 600, letterSpacing: '.16em', color: '#0ECB81', minHeight: 13 }}>
            {typedN > 0 ? regime.slice(0, typedN) : ''}
            <span style={{ display: 'inline-block', width: 6, height: 10, background: '#0ECB81', marginLeft: 3, verticalAlign: '-1px', animation: 'site-blink-caret 1s steps(1) infinite' }} />
          </span>
        </div>
      </div>

      <div style={{ marginTop: 6 }}>
        {axes.map((x) => (
          <div key={x.l} style={{ display: 'grid', gridTemplateColumns: '86px 1fr auto', gap: 14, alignItems: 'center', padding: '9px 0', borderTop: '1px solid rgba(30,45,65,.55)' }}>
            <Trace color={x.c} amp={x.amp} jag={x.jag} off={x.off} />
            <span className="label" style={{ fontSize: 9 }}>{x.l}</span>
            <span className="mono" style={{ fontSize: 19, fontWeight: 600, color: x.c }}>
              <Odo value={x.v * e} />
            </span>
          </div>
        ))}
      </div>

      <a href="#/evidence" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, padding: '10px 14px', borderRadius: 8, background: 'rgba(14,203,129,.07)', border: '1px solid rgba(14,203,129,.25)' }}>
        <span className="mono" style={{ fontSize: 11, fontWeight: 600, color: '#0ECB81' }}>AUC 0.896 · out-of-sample</span>
        <span style={{ fontSize: 11, color: 'var(--dk-muted)' }}>Methodology →</span>
      </a>
    </div>
  );
}

// ─── Ask Prism — AI analyst chat card (dark) ────────────────────────────────
export function AskPrism() {
  const [ph, setPh] = useState(0);
  useEffect(() => {
    const seq: [number, number][] = [[0, 0], [1, 900], [2, 2000], [3, 2900]];
    let ids = seq.map(([p, ms]) => setTimeout(() => setPh(p), ms));
    const loop = setInterval(() => {
      ids.forEach(clearTimeout);
      setPh(0);
      ids = seq.map(([p, ms]) => setTimeout(() => setPh(p), ms));
    }, 9500);
    return () => { ids.forEach(clearTimeout); clearInterval(loop); };
  }, []);
  const chips = [
    { s: 'On-chain · whale flows', c: '#22D3EE' },
    { s: 'Funding · Binance / Bybit', c: '#0ECB81' },
    { s: 'MVRV · 7d series', c: '#F59E0B' },
  ];
  return (
    <div className="dark-panel" style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <span style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg,#0ECB81,#22D3EE)', display: 'grid', placeItems: 'center' }}>
          <svg width="15" height="15" viewBox="0 0 32 32" fill="none"><path d="M16 3 L28 10 L28 22 L16 29 L4 22 L4 10 Z" stroke="#04110a" strokeWidth="2.4" /><circle cx="16" cy="16" r="3" fill="#04110a" /></svg>
        </span>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--dk-text)', fontFamily: 'Manrope' }}>Ask Prism</div>
          <div className="label" style={{ fontSize: 8 }}>TERMINAL FEATURE · CITES SOURCES</div>
        </div>
        <span className="mono" style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 700, letterSpacing: '.1em', color: 'var(--dk-amber)', border: '1px solid rgba(245,158,11,.35)', background: 'rgba(245,158,11,.08)', padding: '3px 8px', borderRadius: 4, whiteSpace: 'nowrap' }}>SAMPLE</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
        <div style={{ background: 'rgba(99,102,241,.14)', border: '1px solid rgba(99,102,241,.3)', padding: '10px 14px', borderRadius: '12px 12px 2px 12px', fontSize: 13, color: 'var(--dk-text)', maxWidth: '85%' }}>
          Should I be worried about this BTC pullback?
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ width: 3, background: 'linear-gradient(to bottom,#0ECB81,transparent)', borderRadius: 2, alignSelf: 'stretch' }} />
        <div style={{ flex: 1, fontSize: 13, lineHeight: 1.6, color: 'var(--dk-secondary)', minHeight: 128 }}>
          {ph === 0 ? (
            <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center', paddingTop: 4 }}>
              {[0, 1, 2].map((i) => <span key={i} style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: '#0ECB81', animation: `site-type-dot 1.3s infinite ${i * 0.2}s` }} />)}
            </span>
          ) : null}
          {ph >= 1 ? (
            <div style={{ animation: 'site-rise-sm .4s ease-out' }}>
              Short answer: <span style={{ color: 'var(--dk-text)', fontWeight: 600 }}>not yet.</span> Whales added <span className="mono" style={{ color: '#0ECB81' }}>+18.2K BTC</span> over the last 7 days while exchange reserves hit a 5-year low.
            </div>
          ) : null}
          {ph >= 2 ? (
            <div style={{ marginTop: 10, animation: 'site-rise-sm .4s ease-out' }}>
              Funding is neutral (<span className="mono">+0.008%</span>) and MVRV sits at <span className="mono">2.1</span> — below the 3.5+ danger zone. This reads as rotation, not distribution.
            </div>
          ) : null}
          {ph >= 3 ? (
            <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 6, animation: 'site-rise-sm .4s ease-out' }}>
              {chips.map((x) => (
                <span key={x.s} className="mono" style={{ fontSize: 10, padding: '4px 8px', borderRadius: 4, border: `1px solid ${x.c}40`, background: `${x.c}10`, color: x.c, fontWeight: 600, letterSpacing: '.04em' }}>{x.s}</span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// ─── Screener demo — TOP MOVERS table (dark, DEMO DATA) ─────────────────────
type ScreenerRow = { sym: string; name: string; p: number; ch: number; dmv: number; sig: string; spark: number[] };

export function ScreenerDemo() {
  const seed: ScreenerRow[] = [
    { sym: 'BTC', name: 'Bitcoin', p: 84250, ch: 2.4, dmv: 76, sig: 'BULL', spark: [40, 42, 41, 46, 52, 49, 55, 62, 58, 65, 72, 78] },
    { sym: 'ETH', name: 'Ethereum', p: 4160.8, ch: 1.2, dmv: 68, sig: 'BULL', spark: [50, 48, 52, 49, 55, 53, 57, 60, 58, 62, 66, 68] },
    { sym: 'SOL', name: 'Solana', p: 218.46, ch: -0.8, dmv: 71, sig: 'NEUTR', spark: [60, 64, 62, 66, 70, 68, 65, 63, 67, 64, 62, 60] },
    { sym: 'AVAX', name: 'Avalanche', p: 38.92, ch: 5.6, dmv: 62, sig: 'BULL', spark: [35, 38, 36, 41, 44, 42, 48, 52, 55, 58, 62, 66] },
    { sym: 'ARB', name: 'Arbitrum', p: 1.84, ch: -1.4, dmv: 54, sig: 'WATCH', spark: [70, 68, 66, 64, 62, 58, 60, 57, 55, 52, 50, 48] },
  ];
  const [rows, setRows] = useState(seed);
  useEffect(() => {
    const id = setInterval(() => {
      setRows((rs) => rs.map((r) => ({
        ...r,
        p: r.p * (1 + (Math.random() - 0.48) * 0.002),
        ch: Math.max(-9.9, Math.min(9.9, r.ch + (Math.random() - 0.5) * 0.15)),
      })));
    }, 1100);
    return () => clearInterval(id);
  }, []);
  const fmtP = (n: number) => n >= 1000 ? n.toLocaleString('en-US', { maximumFractionDigits: 0 }) : n >= 100 ? n.toFixed(2) : n.toFixed(3);
  const sigCol = (s: string) => s === 'BULL' ? '#0ECB81' : s === 'WATCH' ? '#F59E0B' : '#A0B1C5';
  const Spark = ({ data, color }: { data: number[]; color: string }) => {
    const max = Math.max(...data), min = Math.min(...data);
    const pts = data.map((v, i) => `${(i / (data.length - 1)) * 76},${20 - ((v - min) / (max - min || 1)) * 18}`).join(' ');
    return <svg width="76" height="22" viewBox="0 0 76 22"><polyline points={pts} fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  };
  return (
    <div className="dark-panel" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 18px', borderBottom: '1px solid rgba(30,45,65,.6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 7, height: 7, borderRadius: 4, background: '#0ECB81', boxShadow: '0 0 10px #0ECB81', animation: 'site-pulse-soft 2s infinite' }} />
          <span className="label">SCREENER · TOP MOVERS · 1H</span>
        </div>
        <span className="mono" style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', color: 'var(--dk-amber)', border: '1px solid rgba(245,158,11,.35)', background: 'rgba(245,158,11,.08)', padding: '3px 8px', borderRadius: 4, whiteSpace: 'nowrap' }}>DEMO DATA</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr .9fr .7fr 1.1fr .7fr .8fr', padding: '8px 18px', borderBottom: '1px solid rgba(30,45,65,.5)', fontSize: 9, color: 'var(--dk-muted)', textTransform: 'uppercase', letterSpacing: '.14em', fontWeight: 700 }}>
        <span>Asset</span><span style={{ textAlign: 'right' }}>Price</span><span style={{ textAlign: 'right' }}>1h</span><span style={{ textAlign: 'center' }}>Trend</span><span style={{ textAlign: 'center' }}>DMV</span><span style={{ textAlign: 'right' }}>Signal</span>
      </div>
      {rows.map((r, i) => (
        <div key={r.sym} style={{ display: 'grid', gridTemplateColumns: '1.4fr .9fr .7fr 1.1fr .7fr .8fr', alignItems: 'center', padding: '11px 18px', borderBottom: i < rows.length - 1 ? '1px solid rgba(30,45,65,.3)' : 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 26, height: 26, borderRadius: 6, background: 'rgba(14,203,129,.08)', border: '1px solid rgba(14,203,129,.22)', display: 'grid', placeItems: 'center', fontSize: 9, fontWeight: 700, color: '#0ECB81' }}>{r.sym.slice(0, 2)}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--dk-text)' }}>{r.sym}</div>
              <div style={{ fontSize: 10, color: 'var(--dk-muted)' }}>{r.name}</div>
            </div>
          </div>
          <span className="mono" style={{ textAlign: 'right', fontSize: 13, color: 'var(--dk-text)', fontVariantNumeric: 'tabular-nums' }}>${fmtP(r.p)}</span>
          <span className="mono" style={{ textAlign: 'right', fontSize: 12, color: r.ch >= 0 ? '#0ECB81' : '#EF4444' }}>{r.ch >= 0 ? '+' : ''}{r.ch.toFixed(2)}%</span>
          <span style={{ display: 'flex', justifyContent: 'center' }}><Spark data={r.spark} color={r.ch >= 0 ? '#0ECB81' : '#EF4444'} /></span>
          <span className="mono" style={{ textAlign: 'center', fontSize: 13, fontWeight: 700, color: r.dmv >= 70 ? '#0ECB81' : r.dmv >= 60 ? '#F59E0B' : '#A0B1C5' }}>{r.dmv}</span>
          <span style={{ textAlign: 'right' }}>
            <span className="mono" style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 4, background: `${sigCol(r.sig)}15`, color: sigCol(r.sig), letterSpacing: '.1em' }}>{r.sig}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────────────
function Dead({ children }: { children: ReactNode }) {
  return <a href="#" onClick={(e) => e.preventDefault()}>{children}</a>;
}

export function Footer() {
  const cols: { h: string; l: [string, string][] }[] = [
    { h: 'Product', l: [['Terminal', '#/product'], ['DMV Score', '#/intelligence'], ['API', '#/institutional'], ['Pricing', '#/pricing'], ['Changelog', '#dead']] },
    { h: 'Company', l: [['About', '#/about'], ['Evidence', '#/evidence'], ['Careers', '#dead'], ['Contact', '#dead']] },
    { h: 'For Institutions', l: [['B2B API', '#/institutional'], ['White-label', '#/institutional'], ['Data-as-a-Service', '#/institutional'], ['Book a call', '#/institutional']] },
    { h: 'Trust', l: [['Methodology', '#/evidence'], ['DPDP / Privacy', '#dead'], ['Security (SOC2 in progress)', '#dead'], ['Status', '#dead']] },
  ];
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr 1.1fr 1.1fr', gap: 32 }}>
          <div>
            <Logo />
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 14, lineHeight: 1.55, maxWidth: 250 }}>
              The Bloomberg for Crypto. One terminal. Every signal.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <div className="label" style={{ marginBottom: 12 }}>{c.h}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {c.l.map(([t, h]) => (
                  <li key={t}>{h === '#dead' ? <Dead>{t}</Dead> : <a href={h}>{t}</a>}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 44, paddingTop: 20, borderTop: '1px solid rgba(120,110,80,.2)', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className="mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>Trinetry Infotech Pvt Ltd · CIN U62099PN2025PTC247965 · Pune, India</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic' }}>Source-cited research infrastructure. Not investment advice. No price predictions.</span>
        </div>
      </div>
    </footer>
  );
}

// ─── Section header atom ────────────────────────────────────────────────────
export function SplitWords({ text, base = 80, step = 55 }: { text: string; base?: number; step?: number }) {
  const words = String(text).split(' ');
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="wm"><span className="wmi" style={{ '--wm-d': `${base + i * step}ms` } as React.CSSProperties}>{w}</span></span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  );
}

export function SectionHead({ eyebrow, title, sub, center, maxW = 760 }: {
  eyebrow: string; title: string; sub?: string; center?: boolean; maxW?: number;
}) {
  const [ref, on] = useInView<HTMLDivElement>();
  const wordCount = title.split(' ').length;
  return (
    <div ref={ref} className={'sh' + (on ? ' on' : '')} style={{ textAlign: center ? 'center' : 'left', marginBottom: 52, maxWidth: maxW, marginInline: center ? 'auto' : undefined }}>
      <span className="label sh-eyebrow" style={{ color: 'var(--emerald)' }}>{eyebrow}</span>
      <h2 className="display" style={{ fontSize: 'clamp(32px,4.6vw,56px)', marginTop: 14 }}><SplitWords text={title} /></h2>
      {sub ? <p className="sh-sub" style={{ '--sub-d': `${80 + wordCount * 55 + 180}ms`, fontSize: 17, color: 'var(--text-secondary)', marginTop: 14, lineHeight: 1.55, maxWidth: 620, marginInline: center ? 'auto' : undefined } as React.CSSProperties}>{sub}</p> : null}
    </div>
  );
}

// ─── Reveal wrapper — fades/rises a block in on scroll (see hooks.ts) ───────
export function Reveal({ children, dir = 'up', className = '' }: { children: ReactNode; dir?: 'up' | 'left' | 'right'; className?: string }) {
  const ref = useRevealClass<HTMLDivElement>();
  const dirClass = dir === 'left' ? ' rv-left' : dir === 'right' ? ' rv-right' : '';
  return <div ref={ref} className={`rvh${dirClass} ${className}`}>{children}</div>;
}
