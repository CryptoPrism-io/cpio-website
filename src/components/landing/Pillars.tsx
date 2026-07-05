import React from 'react';
import { useReveal } from './hooks';
import { SaarthiChat } from './SaarthiChat';

const DmvFormula: React.FC = () => (
  <div className="glass gradient-border" style={{ padding: 28 }}>
    <div className="label" style={{ marginBottom: 18 }}>DMV SCORE &middot; PROPRIETARY FRAMEWORK</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'JetBrains Mono', fontSize: 14, flexWrap: 'wrap', marginBottom: 22 }}>
      <span style={{ color: 'var(--text)', fontSize: 18, fontWeight: 600 }}>Score</span>
      <span style={{ color: 'var(--text-muted)' }}>=</span>
      <span style={{ padding: '4px 10px', background: 'rgba(14,116,144,.12)', color: '#0E7490', borderRadius: 6, border: '1px solid rgba(14,116,144,.3)' }}>Direction</span>
      <span style={{ color: 'var(--text-muted)' }}>+</span>
      <span style={{ padding: '4px 10px', background: 'rgba(180,83,9,.12)', color: '#B45309', borderRadius: 6, border: '1px solid rgba(180,83,9,.3)' }}>Magnitude</span>
      <span style={{ color: 'var(--text-muted)' }}>+</span>
      <span style={{ padding: '4px 10px', background: 'rgba(67,56,202,.12)', color: '#4338CA', borderRadius: 6, border: '1px solid rgba(67,56,202,.3)' }}>Volatility</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 18, padding: '12px 0', borderTop: '1px solid rgba(120,110,80,.14)' }}>
      <span className="mono" style={{ fontSize: 24, fontWeight: 700, color: 'var(--emerald)' }}>AUC 0.896</span>
      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>out-of-sample, audited</span>
    </div>
    {[
      { l: 'Direction', items: ['Whale flows', 'Exchange reserves', 'Active addresses'], c: '#0E7490' },
      { l: 'Magnitude', items: ['Funding rate', 'OI delta', 'Volume regime'], c: '#B45309' },
      { l: 'Volatility', items: ['Realized vol', 'Social velocity', 'RSI structure'], c: '#4338CA' },
    ].map((g) => (
      <div key={g.l} style={{ padding: '12px 0', borderTop: '1px solid rgba(120,110,80,.14)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: g.c }} />
          <span style={{ fontSize: 12, fontWeight: 600 }}>{g.l}</span>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 18 }}>{g.items.join(' · ')}</div>
      </div>
    ))}
  </div>
);

const JournalCard: React.FC = () => (
  <div className="glass" style={{ padding: 22, background: 'var(--panel-bg)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
      <span className="label">JOURNAL &middot; ENTRY 048</span>
      <span className="mono" style={{ fontSize: 11, color: 'var(--emerald)' }}>+12.4% &middot; CLOSED</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 18 }}>
      <span className="display" style={{ fontSize: 28 }}>SOL &middot; LONG</span>
      <span className="mono" style={{ color: 'var(--text-muted)', fontSize: 13 }}>4.2K position &middot; 5d hold</span>
    </div>
    <div style={{ marginBottom: 16 }}>
      <div className="label" style={{ marginBottom: 8 }}>SIGNAL CONTEXT @ ENTRY</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[
          { l: 'Whale accumulation', v: '+2.4M SOL', c: '#0E7490' },
          { l: 'Funding rate', v: '−0.012%', c: '#0A8F5A' },
          { l: 'DMV score @ entry', v: '74', c: '#B45309' },
          { l: 'DMV score @ exit', v: '81', c: '#0A8F5A' },
        ].map((m) => (
          <div key={m.l} style={{ padding: '10px 12px', background: 'rgba(120,110,80,.05)', borderLeft: `2px solid ${m.c}`, borderRadius: '0 6px 6px 0' }}>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{m.l}</div>
            <div className="mono" style={{ fontSize: 14, fontWeight: 600, color: m.c, marginTop: 2 }}>{m.v}</div>
          </div>
        ))}
      </div>
    </div>
    <div style={{ padding: 14, background: 'rgba(109,40,217,.08)', border: '1px solid rgba(109,40,217,.2)', borderRadius: 8, fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
      <span style={{ color: 'var(--violet)', fontWeight: 600 }}>Saarthi:</span> You acted on whale accumulation 6 of your last 8 wins. Your edge is on-chain confirmation.
    </div>
  </div>
);

interface Pillar {
  readonly tag: string;
  readonly title: string;
  readonly body: string;
  readonly color: string;
  readonly visual: React.ReactNode;
}

const PILLARS: readonly Pillar[] = [
  {
    tag: '01 / SAARTHI',
    title: 'AI that cites its work.',
    body: 'Conversational analyst trained on on-chain metrics, derivatives flows, and historical regimes. Every claim ships with a source.',
    color: '#6D28D9',
    visual: <SaarthiChat />,
  },
  {
    tag: '02 / DMV SCORE',
    title: 'One score. Three dimensions fused.',
    body: 'Direction, Magnitude, and Volatility collapsed into a single conviction score — validated out-of-sample at AUC 0.896, patent planned.',
    color: '#0E7490',
    visual: <DmvFormula />,
  },
  {
    tag: '03 / CLOSED LOOP',
    title: 'Discover → Trade → Journal → Learn.',
    body: 'Every entry auto-captures the on-chain context that informed it. Saarthi reviews your journal to surface the patterns you actually traded — and the ones that worked.',
    color: '#0A8F5A',
    visual: <JournalCard />,
  },
];

const PillarRow: React.FC<{ readonly p: Pillar; readonly reverse: boolean }> = ({ p, reverse }) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal pillar-row" style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center',
      padding: '60px 0', borderTop: '1px solid rgba(120,110,80,.14)',
    }}>
      <div style={{ order: reverse ? 2 : 1 }}>
        <div className="mono" style={{ fontSize: 11, color: p.color, letterSpacing: '.18em', fontWeight: 600, marginBottom: 18 }}>{p.tag}</div>
        <h3 className="display" style={{ fontSize: 'clamp(28px,3.5vw,46px)', marginBottom: 18 }}>{p.title}</h3>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 460 }}>{p.body}</p>
      </div>
      <div style={{ order: reverse ? 1 : 2 }}>{p.visual}</div>
    </div>
  );
};

export const Pillars: React.FC = () => (
  <section id="product" style={{ padding: '120px 0', background: 'var(--section-tint)' }}>
    <div className="wrap">
      <div style={{ marginBottom: 64, maxWidth: 720 }}>
        <span className="label">CHAPTER 02 &middot; THE STACK</span>
        <h2 className="display" style={{ fontSize: 'clamp(36px,5vw,64px)', marginTop: 16 }}>
          Three pillars.<br />
          <span style={{ color: 'var(--text-muted)' }}>One spine.</span>
        </h2>
      </div>

      {PILLARS.map((p, i) => (
        <PillarRow key={p.tag} p={p} reverse={i % 2 === 1} />
      ))}
    </div>
  </section>
);

export default Pillars;
