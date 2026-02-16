import React from 'react';
import { heroTitle, heroSubtitle, heroSubtitleHighlight } from '../data/mockData';

interface HeroSectionProps {
  readonly className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className = '' }) => {
  return (
    <section className={`text-center mt-16 mb-24 max-w-4xl mx-auto ${className}`}>
      <h1 className="text-4xl md:text-7xl font-display font-extrabold text-white mb-8 leading-[1.1] tracking-tight">
        {heroTitle.prefix}
        <span className="text-neon-green neon-glow-green">{heroTitle.highlight1}</span>
        {heroTitle.connector}
        <span className="text-neon-green neon-glow-green">{heroTitle.highlight2}</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
        {heroSubtitle}
        <span className="text-white border-b border-neon-green/40">
          {heroSubtitleHighlight}
        </span>
      </p>
    </section>
  );
};

export default HeroSection;
