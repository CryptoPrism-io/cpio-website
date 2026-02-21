// V2 Slide 1: Title / Cover slide — company intro
import { DeckSlide } from '../DeckSlide';

export function SlideTitle() {
  return (
    <DeckSlide id="title" number={1}>
      <div className="flex flex-col items-center text-center gap-10">
        {/* Logo + Brand */}
        <div className="flex flex-col items-center gap-4">
          <img
            src="/logo.svg"
            alt="CryptoPrism"
            className="w-16 h-16 md:w-20 md:h-20"
            style={{ filter: 'drop-shadow(0 0 12px rgba(14,203,129,0.5))' }}
          />
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white uppercase">
            Crypto<span className="text-[#047857]">Prism</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg font-mono tracking-wide">
            Decision Confidence for Crypto Traders
          </p>
        </div>

        {/* Divider */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#047857] to-transparent opacity-50" />

        {/* Company info */}
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-[#047857] text-sm tracking-wider">
            cryptoprism-io.web.app
          </span>
          <span className="text-gray-500 text-xs">
            A product by <span className="text-gray-300">Trinetry Infotech Private Limited</span>
          </span>
          <span className="text-gray-600 text-[10px] font-mono">
            Established November 2025
          </span>
        </div>

        {/* Team */}
        <div className="flex items-center gap-8 md:gap-12">
          <div className="flex flex-col items-center gap-1">
            <span className="text-white text-sm font-bold">Yogesh Sahu</span>
            <span className="text-gray-500 text-[10px] font-mono">MSc FinTech, SBS UK</span>
            <span className="text-[#047857] text-[10px] font-mono uppercase tracking-wider">
              Founder & Director
            </span>
          </div>
          <div className="w-px h-12 bg-gray-700" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-white text-sm font-bold">Umesh Sahu</span>
            <span className="text-gray-500 text-[10px] font-mono">MBA Marketing</span>
            <span className="text-[#047857] text-[10px] font-mono uppercase tracking-wider">
              Non-Executive Director
            </span>
          </div>
        </div>
      </div>
    </DeckSlide>
  );
}
