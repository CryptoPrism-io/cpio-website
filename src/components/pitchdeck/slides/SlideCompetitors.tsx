// V2 Slide 5: "Why existing tools don't solve this" — Competitor analysis
import { useContext } from 'react';
import { DeckSlide } from '../DeckSlide';
import { DeckLightModeContext } from '../DeckContext';
import { competitors } from '../../../data/pitchDeckVariants';

function Check() {
  return <span className="text-[#0ecb81] text-sm font-bold">&#10003;</span>;
}
function Cross() {
  return <span className="text-[#ff4d4d] text-sm font-bold">&times;</span>;
}

export function SlideCompetitors() {
  const light = useContext(DeckLightModeContext);

  const rowStyle: React.CSSProperties = light ? {
    background: 'rgba(255,255,255,0.85)',
    border: '1px solid rgba(0,0,0,0.14)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(0,0,0,0.06)',
  } : {
    background: 'rgba(10,12,18,0.55)',
    border: '1px solid rgba(255,255,255,0.13)',
    boxShadow: '0 4px 18px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.35)',
  };

  const cpRowStyle: React.CSSProperties = light ? {
    background: 'rgba(240,255,250,0.9)',
    border: '1px solid rgba(4,120,87,0.45)',
    boxShadow: '0 3px 14px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.07), 0 0 16px rgba(4,120,87,0.08), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(4,120,87,0.08)',
  } : {
    background: 'rgba(14,203,129,0.06)',
    border: '1px solid rgba(14,203,129,0.55)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.6), 0 2px 6px rgba(0,0,0,0.4), 0 0 18px rgba(14,203,129,0.08), inset 0 1px 0 rgba(14,203,129,0.18), inset 0 -1px 0 rgba(0,0,0,0.4)',
  };

  const calloutStyle: React.CSSProperties = light ? {
    background: 'rgba(255,255,255,0.85)',
    border: '1px solid rgba(0,0,0,0.14)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.95)',
  } : {
    background: 'rgba(10,12,18,0.55)',
    border: '1px solid rgba(255,255,255,0.13)',
    boxShadow: '0 4px 18px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.35)',
  };

  return (
    <DeckSlide id="competitors" number={5}>
      <div className="flex flex-col items-center gap-6">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-center">
          Why existing tools <span className="text-[#ff4d4d]">don't solve this</span>
        </h2>

        <p className="text-gray-500 text-sm text-justify max-w-lg">
          Every major platform was built in SF, London, or Singapore — for Western quants.
          None combine indicators + news sentiment + strategy library + NL interface.
        </p>

        {/* Comparison table — proportional columns, full width */}
        <div className="w-full">
          {/* Header */}
          <div className="grid grid-cols-[1.6fr_0.7fr_1fr_2.2rem_2.2rem_2.2rem_2.2rem_2.2fr] gap-x-3 gap-y-0 px-3 py-2 text-[10px] font-mono text-gray-600">
            <span>PLATFORM</span>
            <span>HQ</span>
            <span>PRICE</span>
            <span className="text-center">NL/AI</span>
            <span className="text-center">NEWS</span>
            <span className="text-center">STRAT</span>
            <span className="text-center">TA</span>
            <span>KEY LIMITATION</span>
          </div>

          {competitors.map((c) => (
            <div
              key={c.name}
              className="rounded-lg grid grid-cols-[1.6fr_0.7fr_1fr_2.2rem_2.2rem_2.2rem_2.2rem_2.2fr] gap-x-3 gap-y-0 px-3 py-2.5 mb-1.5 items-center w-full"
              style={rowStyle}
            >
              <span className="font-mono text-white text-xs font-bold">{c.name}</span>
              <span className="text-gray-500 text-[10px]">{c.hq}</span>
              <span className="font-mono text-gray-400 text-[10px]">{c.pricing}</span>
              <span className="text-center">{c.hasNL ? <Check /> : <Cross />}</span>
              <span className="text-center">{c.hasNewsSentiment ? <Check /> : <Cross />}</span>
              <span className="text-center">{c.hasStrategyLib ? <Check /> : <Cross />}</span>
              <span className="text-center">{c.hasIndicators ? <Check /> : <Cross />}</span>
              <span className={`text-[10px] leading-snug ${light ? 'text-gray-600' : 'text-gray-400'}`}>{c.limitation}</span>
            </div>
          ))}

          {/* CryptoPrism row */}
          <div
            className="rounded-lg grid grid-cols-[1.6fr_0.7fr_1fr_2.2rem_2.2rem_2.2rem_2.2rem_2.2fr] gap-x-3 gap-y-0 px-3 py-2.5 mb-1.5 items-center w-full"
            style={cpRowStyle}
          >
            <span className="font-mono text-[#0ecb81] text-xs font-bold">CryptoPrism</span>
            <span className="text-[#0ecb81] text-[10px]">India</span>
            <span className="font-mono text-[#0ecb81] text-[10px]">$49-149/mo</span>
            <span className="text-center"><Check /></span>
            <span className="text-center"><Check /></span>
            <span className="text-center"><Check /></span>
            <span className="text-center"><Check /></span>
            <span className="text-[#0ecb81] text-[10px] font-bold leading-snug">All four. One platform. 130+ indicators.</span>
          </div>
        </div>

        <div className="rounded-xl p-4 w-full max-w-3xl text-center" style={calloutStyle}>
          <p className="text-gray-300 text-sm">
            <span className="text-[#0ecb81] font-bold">The 400M+ traders in India, SEA, and LatAm have no quant-grade tool built for them.</span>
            <br />
            <span className="text-gray-500 text-xs">
              Every existing platform was designed for Western quants with Bloomberg terminals.
              We combine NL query + news intelligence + strategy library in one product — for this market.
            </span>
          </p>
        </div>
      </div>
    </DeckSlide>
  );
}
