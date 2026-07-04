import React from 'react';
import { Logo } from './Logo';
import { useReveal } from './hooks';

const TABS = [
  { name: 'Glassnode', sub: 'On-chain · $800/mo', col: '#0E7490' },
  { name: 'CoinGlass', sub: 'Derivatives · $29/mo', col: '#B45309' },
  { name: 'Santiment', sub: 'Social · $135/mo', col: '#6D28D9' },
  { name: 'AltFins', sub: 'Technical · $25/mo', col: '#C2410C' },
  { name: 'TradingView', sub: 'Charts · $30/mo', col: '#4338CA' },
  { name: 'Sheets', sub: 'Manual journal · free', col: '#7A8590' },
];

export const TabGraveyard: React.FC = () => {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="reveal" style={{ padding: '120px 0', position: 'relative' }}>
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="label">CHAPTER 01 &middot; THE PROBLEM</span>
          <h2 className="display" style={{ fontSize: 'clamp(36px,5vw,64px)', marginTop: 16, maxWidth: 880, marginInline: 'auto' }}>
            A typical trade cycle <em style={{ fontStyle: 'italic', color: 'var(--rose)', fontFamily: 'serif', fontWeight: 400 }}>still</em> requires{' '}
            <span style={{ color: 'var(--emerald)' }}>six tabs</span>.
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text-secondary)', maxWidth: 620, marginInline: 'auto', marginTop: 16 }}>
            $1,000+/month, 30 minutes of context-switching per setup, and the conviction collapses somewhere between tab three and four.
          </p>
        </div>

        <div className="graveyard-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14, alignItems: 'center', marginBottom: 32 }}>
          {TABS.map((t, i) => (
            <div key={t.name} className="glass" style={{
              padding: 18, position: 'relative', textAlign: 'left',
              borderTop: `2px solid ${t.col}`, borderTopLeftRadius: 14, borderTopRightRadius: 14,
            }}>
              <div className="mono" style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '.1em' }}>TAB {String(i + 1).padStart(2, '0')}</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginTop: 6, color: 'var(--text)' }}>{t.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{t.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, marginTop: 40 }}>
          <svg width="32" height="80" viewBox="0 0 32 80" style={{ opacity: 0.6 }}>
            <line x1="16" y1="0" x2="16" y2="64" stroke="var(--emerald)" strokeWidth="1.4" strokeDasharray="3 4" />
            <path d="M8 60 L16 72 L24 60" fill="none" stroke="var(--emerald)" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <div className="glass gradient-border" style={{ padding: '20px 32px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <Logo />
            <span style={{ height: 24, width: 1, background: 'rgba(120,110,80,.2)' }} />
            <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--emerald)', fontWeight: 600 }}>One workspace.</span> $29/mo. ~5 minutes per cycle.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabGraveyard;
