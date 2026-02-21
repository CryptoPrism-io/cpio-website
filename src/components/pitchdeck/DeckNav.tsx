import type { SlideData } from '../../data/pitchDeckData';

interface DeckNavProps {
  slides: readonly SlideData[];
  activeIndex: number;
  onNavigate: (index: number) => void;
  onExit: () => void;
  onExport: () => void;
  onPdf: () => void;
  lightMode: boolean;
  onToggleLight: () => void;
}

export function DeckNav({ slides, activeIndex, onNavigate, onExit, onExport, onPdf, lightMode, onToggleLight }: DeckNavProps) {
  const dotActive = lightMode ? 'bg-[#047857] shadow-[0_0_8px_rgba(14,203,129,0.6)]' : 'bg-[#047857] shadow-[0_0_8px_rgba(14,203,129,0.6)]';
  const dotInactive = lightMode ? 'bg-gray-400 hover:bg-gray-500' : 'bg-gray-600 hover:bg-gray-400';
  const btnBorder = lightMode ? 'border-gray-400 text-gray-500 hover:text-[#047857] hover:border-[#047857]' : 'border-gray-600 text-gray-400 hover:text-[#047857] hover:border-[#047857]';
  const counterColor = lightMode ? 'text-gray-500' : 'text-gray-500';

  return (
    <nav
      className="deck-nav-print-hide fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3"
      aria-label="Slide navigation"
    >
      {/* Exit button */}
      <button
        onClick={onExit}
        className={`mb-2 w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
          lightMode ? 'border-gray-400 text-gray-500 hover:text-gray-800 hover:border-gray-800' : 'border-gray-600 text-gray-400 hover:text-white hover:border-white'
        }`}
        aria-label="Exit deck"
        title="Exit (Esc)"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 1l12 12M13 1L1 13" />
        </svg>
      </button>

      {/* Light/Dark toggle */}
      <button
        onClick={onToggleLight}
        className={`mb-2 w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${btnBorder}`}
        aria-label={lightMode ? 'Switch to dark mode' : 'Switch to light mode'}
        title={lightMode ? 'Dark mode' : 'Light mode'}
      >
        {lightMode ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 8a5 5 0 1 1-6-6 4 4 0 0 0 6 6z" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="7" cy="7" r="3" />
            <path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.8 2.8l1 1M10.2 10.2l1 1M11.2 2.8l-1 1M3.8 10.2l-1 1" />
          </svg>
        )}
      </button>

      {/* Dot indicators */}
      {slides.map((slide, i) => (
        <button
          key={slide.id}
          onClick={() => onNavigate(i)}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            i === activeIndex
              ? `${dotActive} scale-125`
              : dotInactive
          }`}
          aria-label={`Go to slide ${i + 1}: ${slide.headline.split('\n')[0]}`}
          aria-current={i === activeIndex ? 'step' : undefined}
        />
      ))}

      {/* Slide counter */}
      <span className={`mt-2 font-mono text-[10px] select-none ${counterColor}`}>
        {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </span>

      {/* PDF button */}
      <button
        onClick={onPdf}
        className={`mt-4 w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${btnBorder}`}
        aria-label="Save as PDF"
        title="Save as PDF"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="1" width="10" height="12" rx="1" />
          <path d="M5 5h4M5 7.5h4M5 10h2" />
        </svg>
      </button>

      {/* PPT Export button */}
      <button
        onClick={onExport}
        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${btnBorder}`}
        aria-label="Download as PowerPoint"
        title="Download PPT"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M7 1v9M3 7l4 4 4-4M2 12h10" />
        </svg>
      </button>
    </nav>
  );
}
