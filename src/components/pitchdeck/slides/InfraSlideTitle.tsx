import { DeckSlide } from '../DeckSlide';

export function InfraSlideTitle() {
  return (
    <DeckSlide id="infra-title" number={1}>
      <div className="flex flex-col items-center text-center gap-10">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <img src="/logo.svg" alt="CryptoPrism" className="w-14 h-14 md:w-18 md:h-18" style={{ filter: 'drop-shadow(0 0 12px rgba(14,203,129,0.5))' }} />
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white">
            Cloud Infrastructure
            <br />
            <span className="text-[#ff9900]">Blueprint</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg font-mono tracking-wide">
            AWS Architecture for CryptoPrism
          </p>
        </div>

        <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#ff9900] to-transparent opacity-50" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '8', label: 'Microservices' },
            { value: '20+', label: 'AWS Services' },
            { value: '$1K', label: 'Monthly Burn' },
            { value: '6', label: 'ML Models' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="font-mono text-[#ff9900] text-2xl md:text-3xl font-bold">{s.value}</span>
              <span className="text-gray-500 text-[10px] uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-gray-500 text-xs">
            A product by <span className="text-gray-300">Trinetry Infotech Private Limited</span>
          </span>
          <span className="text-gray-600 text-[10px] font-mono">
            Beta Launch Architecture — $1,000/mo target burn
          </span>
        </div>
      </div>
    </DeckSlide>
  );
}
