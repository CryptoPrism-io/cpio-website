// Slide: "This is the product — ask it anything."
// Embeds the real TerminalPanel from the website — the actual working NL query interface.
import { DeckSlide } from '../DeckSlide';
import { TerminalPanel } from '../../TerminalPanel';

export function SlideProductDemo() {
  return (
    <DeckSlide id="product-demo" number={6}>
      <div className="flex flex-col gap-6">
        {/* Headline */}
        <div className="text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            This is <span className="text-[#0ecb81]">the product</span> — ask it anything.
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Live demo. Click any query to see results update in real time.
          </p>
        </div>

        {/* The actual product terminal — real component, not a screenshot */}
        <div className="w-full rounded-xl overflow-hidden border border-[rgba(14,203,129,0.2)] shadow-[0_0_40px_rgba(14,203,129,0.08)]">
          <TerminalPanel className="!h-auto !py-4 !px-4 lg:!px-6" />
        </div>

        {/* Proof stamp */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] font-mono text-gray-600">
          <span className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-[#0ecb81] rounded-full animate-pulse" />
            108K+ OHLCV records processed daily
          </span>
          <span className="hidden sm:inline">·</span>
          <span>130+ technical indicators</span>
          <span className="hidden sm:inline">·</span>
          <span>500+ news articles/hr</span>
          <span className="hidden sm:inline">·</span>
          <span>REST API &lt;200ms</span>
        </div>
      </div>
    </DeckSlide>
  );
}
