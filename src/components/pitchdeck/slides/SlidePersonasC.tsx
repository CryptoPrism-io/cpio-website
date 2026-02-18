// Variant C: India-first personas
import { DeckSlide } from '../DeckSlide';
import { indiaPersonas } from '../../../data/pitchDeckVariants';

const personaIcons: Record<string, JSX.Element> = {
  trader: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#0ecb81" strokeWidth="2">
      <circle cx="18" cy="12" r="6" />
      <path d="M6 30c0-6 5.4-10 12-10s12 4 12 10" />
      <path d="M22 8l4-4M26 4l-2 2" />
    </svg>
  ),
  analyst: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#0ecb81" strokeWidth="2">
      <circle cx="18" cy="12" r="6" />
      <path d="M6 30c0-6 5.4-10 12-10s12 4 12 10" />
      <circle cx="26" cy="8" r="4" />
      <path d="M26 6v4M24 8h4" />
    </svg>
  ),
  developer: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#0ecb81" strokeWidth="2">
      <circle cx="18" cy="12" r="6" />
      <path d="M6 30c0-6 5.4-10 12-10s12 4 12 10" />
      <path d="M22 6l4 3-4 3M14 6l-4 3 4 3" />
    </svg>
  ),
};

export function SlidePersonasC() {
  return (
    <DeckSlide id="personas" number={6}>
      <div className="flex flex-col items-center gap-10">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-center">
          Built for three types of <span className="text-[#0ecb81]">Indian</span> users
        </h2>

        <p className="text-gray-500 text-sm text-justify max-w-lg">
          119 million crypto users. From Tier-1 day traders to Tier-2 city newcomers to API-first developers.
          SaaS for retail. DaaS for institutions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {indiaPersonas.map((persona) => (
            <div
              key={persona.role}
              className="glass-card terminal-green rounded-xl p-6 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                {personaIcons[persona.type]}
                <span className="font-mono text-[#0ecb81] text-sm font-bold">
                  {persona.role}
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                {persona.description}
              </p>
              <div className="flex flex-col gap-2 mt-auto">
                {persona.tools.map((tool) => (
                  <div key={tool} className="flex items-center gap-2 text-xs">
                    <span className="text-[#0ecb81]">&bull;</span>
                    <span className="text-gray-300">{tool}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DeckSlide>
  );
}
