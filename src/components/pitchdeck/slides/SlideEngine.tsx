import { DeckSlide } from '../DeckSlide';
import { pipelineNodes } from '../../../data/pitchDeckData';

export function SlideEngine() {
  return (
    <DeckSlide id="engine" number={4}>
      <div className="flex flex-col items-center gap-8">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-center">
          What powers the <span className="text-[#0ecb81]">answers</span>
        </h2>

        <p className="text-gray-500 text-sm text-center max-w-lg">
          Five-stage pipeline built from 17 production repositories.
          Real architecture, not a diagram.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-2 w-full max-w-5xl">
          {pipelineNodes.map((node, i) => (
            <div key={node.label} className="flex items-center gap-2 flex-1 w-full md:w-auto">
              <div className="glass-card terminal-green rounded-xl p-4 flex flex-col items-center text-center gap-2 w-full">
                <span className="font-mono text-[#0ecb81] font-bold text-sm tracking-wider">
                  {node.label}
                </span>
                <span className="text-gray-500 text-[11px] leading-relaxed">
                  {node.description}
                </span>
                {node.stat && (
                  <span className="font-mono text-[#0ecb81] text-xs font-bold mt-1">
                    {node.stat}
                  </span>
                )}
              </div>
              {i < pipelineNodes.length - 1 && (
                <span className="text-[#0ecb81] text-lg font-bold shrink-0 hidden md:block">&rarr;</span>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-8 mt-2">
          <div className="text-center">
            <span className="font-mono text-[#0ecb81] text-lg font-bold">99.9%</span>
            <span className="text-gray-500 text-xs block">uptime</span>
          </div>
          <div className="w-px h-8 bg-gray-700" />
          <div className="text-center">
            <span className="font-mono text-[#0ecb81] text-lg font-bold">8.5s</span>
            <span className="text-gray-500 text-xs block">news pipeline</span>
          </div>
          <div className="w-px h-8 bg-gray-700" />
          <div className="text-center">
            <span className="font-mono text-[#0ecb81] text-lg font-bold">24/7</span>
            <span className="text-gray-500 text-xs block">continuous scoring</span>
          </div>
        </div>
      </div>
    </DeckSlide>
  );
}
