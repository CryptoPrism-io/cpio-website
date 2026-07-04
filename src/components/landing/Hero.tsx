import React from 'react';
import { CryptoScoreGauge } from './CryptoScoreGauge';

const DATA_SOURCES = ['Bitcoin', 'Ethereum', 'Solana', 'Polygon', 'Arbitrum', 'Avalanche', 'BigQuery', 'Binance', 'Bybit', 'CoinGecko', 'DeFiLlama'];

const HERO_STATS = [
  { v: '6', l: 'Chains indexed' },
  { v: '130+', l: 'Indicators' },
  { v: '1,000+', l: 'Coins tracked' },
  { v: '$29', l: 'vs $800 Glassnode' },
];

export const Hero: React.FC = () => (
  <section style={{ position: 'relative', paddingTop: 140, paddingBottom: 80, overflow: 'hidden' }}>
    <div className="orb" style={{ width: 800, height: 600, top: -200, left: '10%', background: 'rgba(10,143,90,.12)' }} />
    <div className="orb" style={{ width: 500, height: 500, top: 100, right: '5%', background: 'rgba(14,116,144,.08)' }} />
    <div className="orb" style={{ width: 400, height: 400, bottom: -100, left: '40%', background: 'rgba(109,40,217,.07)' }} />

    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.35, pointerEvents: 'none' }}>
      <defs>
        <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M60 0 L0 0 0 60" fill="none" stroke="rgba(120,110,80,.08)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-grid)" />
    </svg>

    <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
      <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,.95fr)', gap: 60, alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 999, border: '1px solid rgba(10,143,90,.25)', background: 'rgba(10,143,90,.06)', marginBottom: 28, fontSize: 11 }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--emerald)', boxShadow: '0 0 10px var(--emerald)', animation: 'landing-pulse-soft 2s infinite' }} />
            <span className="mono" style={{ color: 'var(--emerald)', letterSpacing: '.08em', fontWeight: 600 }}>BETA &middot; INVITE ONLY</span>
          </div>

          <h1 className="display" style={{ fontSize: 'clamp(48px, 7vw, 92px)', marginBottom: 24 }}>
            One terminal.<br />
            <span style={{
              background: 'linear-gradient(120deg,#0A8F5A 0%,#0E7490 60%,#6D28D9 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Every signal.</span>
          </h1>

          <p style={{ fontSize: 19, lineHeight: 1.55, color: 'var(--text-secondary)', maxWidth: 540, marginBottom: 36, fontWeight: 400 }}>
            On-chain, derivatives, and AI fused into a single DMV conviction score.
            The institutional edge — without the institutional price tag.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 44 }}>
            <button className="cta-early-access-trigger btn-primary">Request an Invite &rarr;</button>
            <a href="#product" className="btn-ghost">See how it works &darr;</a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid rgba(120,110,80,.18)', paddingTop: 22 }}>
            {HERO_STATS.map((s, i) => (
              <div key={s.l} style={{ paddingLeft: i ? 16 : 0, borderLeft: i ? '1px solid rgba(120,110,80,.18)' : 'none' }}>
                <div className="display mono" style={{ fontSize: 22, color: 'var(--text)' }}>{s.v}</div>
                <div className="label" style={{ fontSize: 9, marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CryptoScoreGauge />
        </div>
      </div>
    </div>

    <div style={{ marginTop: 80, paddingTop: 36, borderTop: '1px solid rgba(120,110,80,.14)' }}>
      <div className="wrap" style={{ marginBottom: 22 }}>
        <span className="label">DATA SOURCES</span>
      </div>
      <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)' }}>
        <div className="marquee">
          {[...Array(2)].flatMap((_, k) =>
            DATA_SOURCES.map((n) => (
              <span key={`${k}-${n}`} className="mono" style={{ fontSize: 13, color: 'var(--text-muted)', letterSpacing: '.05em', fontWeight: 500, opacity: 0.7 }}>
                &#9671; {n.toUpperCase()}
              </span>
            )),
          )}
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
