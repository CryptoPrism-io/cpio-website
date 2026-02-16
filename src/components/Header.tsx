import React from 'react';
import { navLinks } from '../data/mockData';

interface HeaderProps {
  readonly className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-10 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-cyber-black border border-neon-green/30 rounded flex items-center justify-center shadow-[0_0_15px_rgba(14,203,129,0.2)]">
          <span className="material-symbols-outlined text-neon-green text-2xl">diamond</span>
        </div>
        <span className="text-2xl font-display font-extrabold tracking-tighter text-white uppercase">
          Crypto Prism
        </span>
      </div>
      <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest text-gray-500 uppercase">
        {navLinks.map((link) => (
          <a
            key={link.label}
            className="hover:text-neon-green transition-colors"
            href={link.href}
          >
            {link.label}
          </a>
        ))}
        <button className="px-6 py-2 bg-neon-green/5 border border-neon-green/20 rounded text-neon-green hover:bg-neon-green/10 transition-all">
          Establish Link
        </button>
      </nav>
    </header>
  );
};

export default Header;
