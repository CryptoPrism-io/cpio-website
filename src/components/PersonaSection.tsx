import React, { useState, useCallback, useEffect, useRef } from 'react';
import { personas, personaData } from '../data/mockData';
import type { Persona } from '../data/mockData';

interface PersonaSectionProps {
  readonly className?: string;
}

interface PersonaCardProps {
  readonly persona: Persona;
  readonly position: number;
  readonly onClick: () => void;
}

const AUTOPLAY_MS = 4000;

const PersonaCard: React.FC<PersonaCardProps> = ({ persona, position, onClick }) => {
  const isActive = position === 0;
  const isAdjacent = Math.abs(position) === 1;
  const isFar = Math.abs(position) >= 2;

  const cardClasses = isActive
    ? 'w-80 md:w-[360px] h-[460px] glass-card-active persona-inner-glow persona-active-glow rounded-2xl p-7 z-20 scale-100 shadow-2xl cursor-default opacity-100'
    : isAdjacent
    ? 'w-72 h-[420px] glass-card persona-inner-glow rounded-2xl p-6 opacity-25 scale-[0.85] cursor-pointer hover:opacity-35 hidden lg:block'
    : 'w-64 h-[380px] glass-card persona-inner-glow rounded-2xl p-6 opacity-10 scale-75 grayscale cursor-pointer hover:opacity-15 hidden xl:block';

  if (isFar) {
    return (
      <div className={`${cardClasses} shrink-0 transition-all duration-700 ease-in-out`} onClick={onClick}>
        <div className="inline-flex items-center px-2 py-1 rounded text-[9px] font-bold bg-white/5 text-white/40 mb-4 tracking-wider uppercase">
          Persona
        </div>
        <h3 className="text-lg font-bold mb-1">{persona.name}</h3>
        <p className="text-[10px] text-gray-500 mb-6">{persona.subtitle}</p>
        <div className="grid grid-cols-2 gap-2 mt-auto">
          {persona.tools.slice(0, 2).map((tool) => (
            <div key={tool.label} className="bg-white/5 border border-white/10 p-2 rounded text-[9px]">
              {tool.label}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isAdjacent) {
    return (
      <div className={`${cardClasses} shrink-0 transition-all duration-700 ease-in-out`} onClick={onClick}>
        <div className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold bg-white/10 text-white/60 mb-4 tracking-wider uppercase">
          Persona
        </div>
        <h3 className="text-xl font-bold mb-1">{persona.name}</h3>
        <p className="text-xs text-gray-500 mb-6">{persona.subtitle}</p>
        {persona.features.length > 0 && (
          <div className="flex gap-2 mb-8">
            {persona.features.map((feat) => (
              <div key={feat.label} className="flex-1 bg-white/5 border border-white/10 py-2 px-3 rounded text-[10px] flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">{feat.icon}</span> {feat.label}
              </div>
            ))}
          </div>
        )}
        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-3">Prism Tools</p>
        <div className="grid grid-cols-2 gap-2">
          {persona.tools.map((tool) => (
            <div key={tool.label} className="bg-white/5 border border-white/10 p-2 rounded flex items-center gap-2 text-[10px]">
              <span className="material-symbols-outlined text-sm">{tool.icon}</span> {tool.label}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Active card
  return (
    <div className={`${cardClasses} shrink-0 transition-all duration-700 ease-in-out relative`}>
      <div className="flex justify-between items-start mb-5">
        <div className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold bg-neon-green/20 text-neon-green tracking-wider uppercase">
          Persona
        </div>
        <div className="w-3 h-3 rounded-sm bg-neon-green shadow-[0_0_10px_rgba(14,203,129,0.8)]" />
      </div>
      <h3 className="text-2xl font-bold mb-2">{persona.name}</h3>
      <p className="text-sm text-gray-400 mb-8">{persona.subtitle}</p>
      {persona.features.length > 0 && (
        <div className="flex gap-3 mb-8">
          {persona.features.map((feat) => (
            <div key={feat.label} className="flex-1 bg-neon-green/5 border border-neon-green/20 py-3 px-4 rounded-xl flex items-center gap-2 text-xs font-medium">
              <span className="material-symbols-outlined text-neon-green text-lg">{feat.icon}</span> {feat.label}
            </div>
          ))}
        </div>
      )}
      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-4 border-t border-white/5 pt-6">
        Prism Tools
      </p>
      <div className="grid grid-cols-2 gap-3">
        {persona.tools.map((tool) => (
          <div
            key={tool.label}
            className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-3 text-xs font-medium hover:border-neon-green/40 transition-colors group cursor-pointer"
          >
            <span className="material-symbols-outlined text-neon-green group-hover:scale-110 transition-transform">
              {tool.icon}
            </span>
            {tool.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export const PersonaSection: React.FC<PersonaSectionProps> = ({ className = '' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const { headline, subtitle } = personaData;

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % personas.length);
    }, AUTOPLAY_MS);
  }, []);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  // Wrap index around so there are always 2 cards on each side of the active
  const wrap = (i: number) => ((i % personas.length) + personas.length) % personas.length;

  const carouselSlots = [-2, -1, 0, 1, 2].map((offset) => ({
    index: wrap(activeIndex + offset),
    position: offset,
  }));

  return (
    <section className={`relative py-20 ${className}`}>
      {/* Heading */}
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
          {headline.prefix}
          <span className="text-neon-green drop-shadow-[0_0_15px_rgba(14,203,129,0.4)]">
            {headline.highlight}
          </span>
        </h2>
        <p className="text-lg text-gray-400 font-light">
          {subtitle.before}
          <span className="text-gray-100 font-medium">{subtitle.bold1}</span>
          {subtitle.mid}
          <span className="text-gray-100 font-medium">{subtitle.bold2}</span>
          {subtitle.after}
        </p>
      </div>

      {/* Carousel */}
      <div className="relative w-full max-w-[1600px] mx-auto overflow-visible">
        <div className="flex items-center justify-center gap-4 carousel-fade py-6">
          {carouselSlots.map((slot) => (
            <PersonaCard
              key={`${slot.position}-${personas[slot.index].name}`}
              persona={personas[slot.index]}
              position={slot.position}
              onClick={() => goTo(slot.index)}
            />
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="mt-12 flex items-center justify-center gap-2">
        {personas.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-500 ${
              i === activeIndex
                ? 'w-8 h-1.5 bg-neon-green shadow-[0_0_10px_rgba(14,203,129,0.6)]'
                : 'w-1.5 h-1.5 bg-gray-800 hover:bg-gray-700'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default PersonaSection;
