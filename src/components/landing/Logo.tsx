import React from 'react';

interface LogoProps {
  readonly size?: number;
}

export const Logo: React.FC<LogoProps> = ({ size = 28 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="lg-cp" x1="0" y1="0" x2="32" y2="32">
          <stop offset={0} stopColor="#0ECB81" />
          <stop offset={1} stopColor="#0AA06A" />
        </linearGradient>
      </defs>
      <path d="M16 2 L29 9.5 L29 22.5 L16 30 L3 22.5 L3 9.5 Z" stroke="url(#lg-cp)" strokeWidth="1.6" fill="rgba(14,203,129,.06)" />
      <path d="M16 2 L16 30 M3 9.5 L29 22.5 M29 9.5 L3 22.5" stroke="url(#lg-cp)" strokeWidth="0.8" opacity={0.55} />
      <circle cx="16" cy="16" r="3.2" fill="#0ECB81" />
    </svg>
    <span style={{ fontFamily: 'Manrope', fontWeight: 800, letterSpacing: '-0.04em', fontSize: 18, color: 'var(--text)' }}>
      CryptoPrism<span style={{ color: 'var(--emerald)' }}>.</span>
    </span>
  </div>
);

export default Logo;
