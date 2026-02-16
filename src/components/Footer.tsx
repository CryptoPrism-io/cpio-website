import React from 'react';
import { footerLinks } from '../data/mockData';

interface FooterProps {
  readonly className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`max-w-7xl mx-auto px-6 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10 ${className}`}>
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-neon-green text-xl">diamond</span>
        <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.3em]">
          Prism v2.0.4 - Crypto Intelligence Terminal
        </span>
      </div>
      <div className="flex gap-10 text-[10px] uppercase tracking-[0.2em] font-mono text-gray-500">
        {footerLinks.map((link) => (
          <a
            key={link.label}
            className="hover:text-neon-green transition-colors"
            href={link.href}
          >
            {link.label}
          </a>
        ))}
      </div>
      <div className="text-gray-700 text-[10px] font-mono uppercase tracking-widest">
        Data encrypted via 256-bit PRISM protocol
      </div>
    </footer>
  );
};

export default Footer;
