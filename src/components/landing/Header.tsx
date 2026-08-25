import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { APP_URL } from '../../data/mockData';

const NAV_LINKS = ['Product', 'Intelligence', 'Compare', 'Pricing'] as const;

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(245,243,238,.92)' : 'rgba(245,243,238,.72)',
      backdropFilter: 'blur(18px)',
      borderBottom: scrolled ? '1px solid rgba(120,110,80,.18)' : '1px solid transparent',
      transition: 'all .3s',
    }}>
      <div className="wrap" style={{ height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Logo />
        <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="hide-mobile">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500, transition: 'color .2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              {l}
            </a>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href={APP_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>
            Sign in
          </a>
          <button className="cta-early-access-trigger btn-primary" style={{ padding: '.6rem 1.1rem', fontSize: 13 }}>
            Request an Invite &rarr;
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
