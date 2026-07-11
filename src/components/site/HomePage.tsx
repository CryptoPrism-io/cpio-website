import '../../styles/site.css';
import { NavBar, TrustBar, StatLink, DMVGauge, AskPrism, Footer, SectionHead, Logo, Reveal } from './shared';
import { useInView, scrollToId } from './hooks';

// ─── H1 · Hero ──────────────────────────────────────────────────────────────
function HomeHero() {
  return (
    <section style={{ position: 'relative', paddingTop: 92, paddingBottom: 56, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(1100px 640px at 70% 26%, rgba(10,143,90,.09), transparent 62%), radial-gradient(800px 500px at 15% 80%, rgba(14,116,144,.07), transparent 60%)' }} />
      <div className="orb" style={{ width: 620, height: 500, top: -160, right: '-6%', background: 'rgba(10,143,90,.15)' }} />
      <div className="orb" style={{ width: 460, height: 400, bottom: -140, left: '-8%', background: 'rgba(109,40,217,.08)' }} />

      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-grid">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '7px 14px', borderRadius: 999, border: '1px solid rgba(10,143,90,.35)', background: 'rgba(255,255,255,.72)', marginBottom: 30, fontSize: 11, whiteSpace: 'nowrap', animation: 'site-rise-sm .7s cubic-bezier(.2,.8,.2,1) both .05s' }}>
              <span style={{ width: 7, height: 7, borderRadius: 4, background: 'var(--emerald)', boxShadow: '0 0 10px var(--emerald)', animation: 'site-pulse-soft 2s infinite' }} />
              <span className="mono" style={{ color: 'var(--emerald)', letterSpacing: '.12em', fontWeight: 600 }}>BETA · INVITE ONLY</span>
            </div>

            <h1 className="display" style={{ fontSize: 'clamp(54px,7.8vw,116px)', lineHeight: .98, letterSpacing: '-0.052em', marginBottom: 28 }}>
              <span className="line-mask"><span className="line-in" style={{ animationDelay: '.12s' }}>The Bloomberg</span></span>
              <span className="line-mask"><span className="line-in grad-text" style={{ animationDelay: '.3s' }}><em style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 500, letterSpacing: '-0.02em' }}>for</em> Crypto.</span></span>
            </h1>

            <p style={{ fontSize: 19, lineHeight: 1.55, color: 'var(--text-secondary)', maxWidth: 520, marginBottom: 14, animation: 'site-rise-sm .7s cubic-bezier(.2,.8,.2,1) both .4s' }}>
              On-chain, derivatives, and AI fused into one DMV conviction score.
              Institutional-grade research — <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif', color: 'var(--text)' }}>without the institutional price tag.</em>
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36, animation: 'site-rise-sm .7s cubic-bezier(.2,.8,.2,1) both .5s' }}>
              <span style={{ width: 28, height: 1, background: 'rgba(120,110,80,.4)' }} />
              <span className="mono" style={{ fontSize: 11, letterSpacing: '.22em', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>One terminal · Every signal</span>
              <span style={{ width: 28, height: 1, background: 'rgba(120,110,80,.4)' }} />
            </div>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 46, animation: 'site-rise-sm .7s cubic-bezier(.2,.8,.2,1) both .6s' }}>
              <a href="#" className="btn-primary cta-early-access-trigger" style={{ padding: '1rem 1.8rem', fontSize: 15 }}>Request an Invite →</a>
              <a href="#" onClick={(e) => { e.preventDefault(); scrollToId('engines'); }} className="btn-ghost" style={{ padding: '1rem 1.5rem', fontSize: 15 }}>See how it works ↓</a>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,auto)', justifyContent: 'start', columnGap: 36, rowGap: 16, borderTop: '1px solid rgba(120,110,80,.22)', paddingTop: 22, animation: 'site-rise-sm .7s cubic-bezier(.2,.8,.2,1) both .72s' }}>
              <StatLink v="6" l="Chains indexed" />
              <StatLink v="130+" l="Indicators" />
              <StatLink v="1,000+" l="Coins covered" />
              <StatLink v="1B+" l="Datapoints / day" />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', animation: 'site-rise .9s cubic-bezier(.2,.8,.2,1) both .45s' }}>
            <DMVGauge />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── H2 · Proof band ────────────────────────────────────────────────────────
function ProofBand() {
  const stats = [
    { v: '7.69', l: 'Sharpe ratio', s: 'automated founder portfolio' },
    { v: '0.896', l: 'DMV AUC', s: 'vs 0.50 random baseline' },
    { v: '60.7%', l: 'OOS accuracy', s: 'out-of-sample backtest' },
    { v: '+229.6%', l: 'Net return', s: '226 trades, fully automated' },
  ];
  return (
    <section style={{ padding: '64px 0' }}>
      <div className="wrap">
        <Reveal className="dark-panel" >
          <div style={{ padding: '40px 40px 34px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12, marginBottom: 30 }}>
              <div>
                <span className="label" style={{ color: '#0ECB81' }}>VALIDATED · OUT-OF-SAMPLE</span>
                <h2 className="display" style={{ fontSize: 'clamp(28px,3.6vw,44px)', marginTop: 10, color: '#fff' }}>Not projections. Validated results.</h2>
              </div>
              <a href="#/evidence" className="mono" style={{ fontSize: 12, color: '#0ECB81', fontWeight: 600 }}>Full evidence →</a>
            </div>
            <div className="g4">
              {stats.map((s) => (
                <a key={s.l} href="#/evidence" style={{ display: 'block', borderLeft: '2px solid rgba(14,203,129,.5)', paddingLeft: 16 }}>
                  <div className="display mono" style={{ fontSize: 'clamp(30px,3vw,42px)', color: '#0ECB81', textShadow: '0 0 24px rgba(14,203,129,.3)' }}>{s.v}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--dk-text)', marginTop: 6 }}>{s.l}</div>
                  <div style={{ fontSize: 11, color: 'var(--dk-muted)', marginTop: 2 }}>{s.s}</div>
                </a>
              ))}
            </div>
            <div style={{ marginTop: 26, paddingTop: 18, borderTop: '1px solid rgba(30,45,65,.6)', fontSize: 11, color: 'var(--dk-muted)' }}>
              Founder portfolio case studies · out-of-sample backtest · fully automated. <a href="#/evidence" style={{ color: '#0ECB81' }}>Every number, traceable →</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── H3 · Six tabs problem ──────────────────────────────────────────────────
function SixTabs() {
  const tabs = [
    { name: 'Glassnode', sub: 'On-chain · $800/mo', col: '#0E7490' },
    { name: 'CoinGlass', sub: 'Derivatives · $29/mo', col: '#B45309' },
    { name: 'Santiment', sub: 'Social · $135/mo', col: '#6D28D9' },
    { name: 'AltFins', sub: 'Technical · $25/mo', col: '#C2410C' },
    { name: 'TradingView', sub: 'Charts · $30/mo', col: '#4338CA' },
    { name: 'Sheets', sub: 'Manual journal · free', col: '#7A8590' },
  ];
  return (
    <section style={{ padding: '70px 0' }}>
      <div className="wrap">
        <SectionHead center eyebrow="THE PROBLEM" title="A typical trade cycle still requires six tabs."
          sub="$1,000+/month, 30 minutes of context-switching per setup — and conviction collapses between tab three and four." />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 14 }} className="g3">
          {tabs.map((t, i) => (
            <div key={t.name} className="card tile" style={{ padding: 18, borderTop: `2px solid ${t.col}` }}>
              <div className="mono" style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '.1em' }}>TAB {String(i + 1).padStart(2, '0')}</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginTop: 6 }}>{t.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{t.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginTop: 36 }}>
          <svg width="32" height="64" viewBox="0 0 32 64" style={{ opacity: .6 }}>
            <line x1="16" y1="0" x2="16" y2="50" stroke="var(--emerald)" strokeWidth="1.4" strokeDasharray="3 4" />
            <path d="M8 46 L16 58 L24 46" fill="none" stroke="var(--emerald)" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <div className="gradient-border" style={{ padding: '20px 32px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Logo />
            <span className="hide-m" style={{ height: 24, width: 1, background: 'rgba(120,110,80,.3)' }} />
            <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--emerald)', fontWeight: 700 }}>One workspace.</span> From ₹499 / $29·mo. ~5 minutes per cycle.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── H4 · The bias tax ──────────────────────────────────────────────────────
function BiasTax() {
  const rows = [
    { w: '100%', v: '119M', t: 'Indian traders in the market', c: 'rgba(15,20,25,.85)' },
    { w: '72%', v: '84%', t: 'trade on tips, not data', c: 'var(--amber)' },
    { w: '46%', v: '49%', t: 'end the year in net loss', c: 'var(--rose)' },
  ];
  return (
    <section style={{ padding: '70px 0', background: 'rgba(232,227,214,.45)' }}>
      <div className="wrap">
        <div className="two-col">
          <div>
            <SectionHead eyebrow="THE BIAS TAX" title="Traders don't lose to the market. They lose to themselves." />
            <p style={{ fontSize: 17, color: 'var(--text-secondary)', maxWidth: 440, marginTop: -26, lineHeight: 1.6 }}>
              The market doesn't lack data — <span style={{ color: 'var(--text)', fontWeight: 600 }}>it lacks judgment.</span> CryptoPrism is the judgment layer.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {rows.map((r) => (
              <Reveal key={r.v}>
                <a href="#/evidence" style={{ display: 'block' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
                    <span className="display mono" style={{ fontSize: 30, color: 'var(--text)' }}>{r.v}</span>
                    <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{r.t}</span>
                  </div>
                  <div style={{ height: 12, borderRadius: 6, background: 'rgba(120,110,80,.14)', overflow: 'hidden' }}>
                    <div className="bar-fill rvh rvon" style={{ width: r.w, height: '100%', borderRadius: 6, background: r.c, opacity: .82 }} />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── H5 · Four engines ──────────────────────────────────────────────────────
function FourEngines() {
  const engines = [
    { n: 'IP Data', d: '1B+ datapoints/day across 17 automated pipelines and 6 chains.', c: '#0E7490', icon: 'M4 6h16M4 12h16M4 18h10' },
    { n: 'DMV Scoring', d: 'Direction · Magnitude · Volatility fused into one conviction score. AUC 0.896.', c: '#0A8F5A', icon: 'M12 3v18M5 12a7 7 0 0 1 14 0' },
    { n: 'ML Signals', d: 'A 6-model ensemble, validated out-of-sample. Sharpe 7.69.', c: '#4338CA', icon: 'M4 17l5-6 4 3 7-9' },
    { n: 'Sentiment', d: "FinBERT reads 44 news and social sources so you don't have to.", c: '#6D28D9', icon: 'M4 6h16v10H8l-4 4z' },
  ];
  return (
    <section id="engines" style={{ padding: '90px 0 70px' }}>
      <div className="wrap">
        <SectionHead center eyebrow="THE PLATFORM" title="Four engines. One terminal. Ask in English." />
        <div className="g4">
          {engines.map((e, i) => (
            <div key={e.n} className="card tile" style={{ padding: 26, borderTop: `2px solid ${e.c}` }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${e.c}14`, border: `1px solid ${e.c}40`, display: 'grid', placeItems: 'center', marginBottom: 16 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d={e.icon} stroke={e.c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className="mono" style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '.18em', marginBottom: 8 }}>ENGINE 0{i + 1}</div>
              <h3 style={{ fontSize: 19, fontWeight: 800, marginBottom: 8 }}>{e.n}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>{e.d}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 34 }}>
          <a href="#/product" className="btn-ghost">Explore the platform →</a>
        </div>
      </div>
    </section>
  );
}

// ─── H6 · Terminal on screen ────────────────────────────────────────────────
function TerminalSection() {
  return (
    <section style={{ padding: '70px 0' }}>
      <div className="wrap">
        <div className="two-col" style={{ alignItems: 'center', gridTemplateColumns: '.9fr 1.1fr' }}>
          <div>
            <SectionHead eyebrow="ASK PRISM · THE TERMINAL" title="Ask in English. Get quant answers with sources."
              sub="A conversational analyst over the full data core — every claim ships with a source. No SQL. No Pine Script." />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: -18 }}>
              <StatLink v="1,000+" l="Coins" />
              <StatLink v="130+" l="Indicators" />
              <StatLink v="44" l="News sources" />
              <StatLink v="0.896" l="DMV AUC" href="#/evidence" />
            </div>
          </div>
          <AskPrism />
        </div>
      </div>
    </section>
  );
}

// ─── H7 · Cost wedge ────────────────────────────────────────────────────────
function CostWedge() {
  const bars = [
    { n: 'Bloomberg seat', v: '~$2,000/mo', w: '100%', c: 'rgba(15,20,25,.8)' },
    { n: 'Glassnode', v: '$800/mo', w: '63%', c: 'var(--cyan)' },
    { n: 'CryptoPrism', v: 'from $29/mo', w: '12%', c: 'var(--emerald)', us: true },
  ];
  return (
    <section style={{ padding: '70px 0', background: 'rgba(232,227,214,.45)' }}>
      <div className="wrap">
        <SectionHead center eyebrow="THE COST WEDGE" title="Institutional-grade output. A fraction of the cost." />
        <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {bars.map((b) => (
            <Reveal key={b.n}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                <span style={{ fontSize: 14, fontWeight: b.us ? 800 : 600, color: b.us ? 'var(--emerald)' : 'var(--text)' }}>{b.n}</span>
                <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: b.us ? 'var(--emerald)' : 'var(--text-secondary)' }}>{b.v}</span>
              </div>
              <div style={{ height: b.us ? 18 : 14, borderRadius: 8, background: 'rgba(120,110,80,.13)', overflow: 'hidden' }}>
                <div className="bar-fill rvh rvon" style={{ width: b.w, height: '100%', borderRadius: 8, background: b.c, boxShadow: b.us ? '0 0 16px rgba(10,143,90,.4)' : 'none' }} />
              </div>
            </Reveal>
          ))}
          <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', marginTop: 8 }}>
            Customer pricing shown. <a href="#/pricing" style={{ color: 'var(--emerald)', fontWeight: 600 }}>See region-aware plans →</a>
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── H8 · Two doors ─────────────────────────────────────────────────────────
function TwoDoors() {
  return (
    <section style={{ padding: '90px 0 70px' }}>
      <div className="wrap">
        <SectionHead center eyebrow="TWO DOORS" title="Built for how you actually work." />
        <div className="g2" style={{ maxWidth: 980, margin: '0 auto' }}>
          <Reveal dir="left">
            <a href="#/pricing" className="card tile" style={{ padding: 36, display: 'block' }}>
              <div className="label" style={{ color: 'var(--emerald)', marginBottom: 14 }}>FOR TRADERS</div>
              <h3 className="display" style={{ fontSize: 32, marginBottom: 12 }}>I trade →</h3>
              <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Screeners, DMV conviction scores, and news that moves markets. <span className="mono" style={{ color: 'var(--emerald)', fontWeight: 600 }}>From ₹99 / $4·mo.</span>
              </p>
            </a>
          </Reveal>
          <Reveal dir="right">
            <a href="#/institutional" className="dark-panel tile" style={{ padding: 36, display: 'block' }}>
              <div className="label" style={{ color: '#22D3EE', marginBottom: 14 }}>FOR DESKS &amp; FUNDS</div>
              <h3 className="display" style={{ fontSize: 32, marginBottom: 12, color: '#fff' }}>I run a desk or want the data →</h3>
              <p style={{ fontSize: 15, color: 'var(--dk-secondary)', lineHeight: 1.6, margin: 0 }}>
                Signal feeds, white-label, and a REST API for funds, exchanges, and research desks.
              </p>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── H9 · Proof of execution ────────────────────────────────────────────────
function ExecutionGrid() {
  const items: [string, string][] = [
    ['CryptoPrism Terminal', 'live'], ['DMV Scoring Engine', 'live'], ['ML Signal Ensemble', 'live'],
    ['FinBERT News Engine', 'live'], ['Data Pipeline Mesh ×17', 'live'], ['PWA App', 'live'],
    ['FxSaarthi', 'live'], ['Backtest Engine', 'live'], ['Screener', 'live'],
    ['REST API', 'beta'], ['Alerts', 'beta'], ['Trade Journal', 'beta'],
  ];
  return (
    <section style={{ padding: '70px 0', background: 'rgba(232,227,214,.45)' }}>
      <div className="wrap">
        <SectionHead center eyebrow="PROOF OF EXECUTION" title="One founder. Six months. Twelve built, nine live." />
        <div className="g4" style={{ gridTemplateColumns: 'repeat(4,1fr)', maxWidth: 1020, margin: '0 auto' }}>
          {items.map(([n, s]) => (
            <div key={n} className="card" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: 4, background: s === 'live' ? 'var(--emerald)' : 'var(--amber)', boxShadow: s === 'live' ? '0 0 8px rgba(10,143,90,.6)' : 'none', flexShrink: 0 }} />
              <span style={{ fontSize: 13, fontWeight: 600, flex: 1 }}>{n}</span>
              <span className="mono" style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.1em', color: s === 'live' ? 'var(--emerald)' : 'var(--amber)', textTransform: 'uppercase' }}>{s}</span>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 26 }}>
          Public GitHub history · velocity is verifiable, not asserted. <a href="#/evidence" style={{ color: 'var(--emerald)', fontWeight: 600 }}>See the build record →</a>
        </p>
      </div>
    </section>
  );
}

// ─── H10 · Data sources ─────────────────────────────────────────────────────
function SourcesRow() {
  const sources = ['BigQuery', 'Binance', 'Bybit', 'CoinGecko', 'DefiLlama', 'Bitcoin', 'Ethereum', 'Solana', 'Polygon', 'Arbitrum', 'Avalanche'];
  return (
    <section style={{ padding: '56px 0 40px' }}>
      <div className="wrap" style={{ marginBottom: 20 }}>
        <span className="label">DATA SOURCES · 24/7 STREAM</span>
      </div>
      <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)', WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)' } as React.CSSProperties}>
        <div className="marquee">
          {[0, 1].flatMap((k) => sources.map((n) => (
            <span key={`${k}-${n}`} className="mono" style={{ fontSize: 13, color: 'var(--text-muted)', letterSpacing: '.05em', fontWeight: 500 }}>◇ {n.toUpperCase()}</span>
          )))}
        </div>
      </div>
    </section>
  );
}

// ─── H11 · Founder strip ────────────────────────────────────────────────────
function FounderStrip() {
  return (
    <section style={{ padding: '26px 0 60px' }}>
      <div className="wrap">
        <a href="#/about" className="glass tile" style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '18px 26px', flexWrap: 'wrap' }}>
          <span style={{ width: 40, height: 40, borderRadius: 20, background: 'linear-gradient(135deg,#0A8F5A,#0E7490)', display: 'grid', placeItems: 'center', color: '#fff', fontFamily: 'Manrope', fontWeight: 800, fontSize: 14 }}>YS</span>
          <span style={{ fontSize: 14, color: 'var(--text-secondary)', flex: 1, minWidth: 260 }}>
            Built by a <span style={{ color: 'var(--text)', fontWeight: 700 }}>two-time founder</span> — ex-Barclays, ex-Ubisoft, ex-Times Internet · MSc FinTech, Strathclyde.
          </span>
          <span className="mono" style={{ fontSize: 12, color: 'var(--emerald)', fontWeight: 600 }}>Meet the founder →</span>
        </a>
      </div>
    </section>
  );
}

// ─── H12 · Final CTA ────────────────────────────────────────────────────────
function FinalCTA() {
  const [ref, on] = useInView<HTMLDivElement>();
  return (
    <section style={{ padding: '80px 0 20px', position: 'relative', overflow: 'hidden' }}>
      <div className="orb" style={{ width: 700, height: 380, top: '18%', left: '50%', transform: 'translateX(-50%)', background: 'rgba(10,143,90,.13)' }} />
      <div ref={ref} className={'wrap sh' + (on ? ' on' : '')} style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 760 }}>
        <span className="mono sh-eyebrow" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.14em', color: 'var(--emerald)' }}>BETA · INVITE ONLY</span>
        <h2 className="display" style={{ fontSize: 'clamp(40px,6vw,76px)', margin: '18px 0 26px' }}>
          <span className="wm" style={{ display: 'block' }}><span className="wmi" style={{ '--wm-d': '60ms' } as React.CSSProperties}>Built. Validated.</span></span>
          <span className="wm" style={{ display: 'block' }}><span className="wmi grad-text" style={{ '--wm-d': '230ms' } as React.CSSProperties}>Now open to a few more traders.</span></span>
        </h2>
        <div className="sh-sub" style={{ '--sub-d': '.55s', display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 18 } as React.CSSProperties}>
          <a href="#" className="btn-primary cta-early-access-trigger" style={{ padding: '15px 30px', fontSize: 15 }}>Request an Invite →</a>
        </div>
        <p className="sh-sub" style={{ '--sub-d': '.7s', fontSize: 13, color: 'var(--text-muted)' } as React.CSSProperties}>
          Running a desk or fund? <a href="#/institutional" style={{ color: 'var(--emerald)', fontWeight: 600 }}>Talk to us →</a>
        </p>
      </div>
    </section>
  );
}

// ─── Page root ──────────────────────────────────────────────────────────────
export function HomePage() {
  return (
    <div className="site-light">
      <NavBar active={null} />
      <TrustBar />
      <main>
        <HomeHero />
        <ProofBand />
        <SixTabs />
        <BiasTax />
        <FourEngines />
        <TerminalSection />
        <CostWedge />
        <TwoDoors />
        <ExecutionGrid />
        <SourcesRow />
        <FounderStrip />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
