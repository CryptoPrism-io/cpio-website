// V2 Slide 5: "Why existing tools don't solve this" - Competitor analysis
import { useContext, type CSSProperties } from 'react';
import { DeckSlide } from '../DeckSlide';
import { DeckLightModeContext, DeckPrintContext } from '../DeckContext';
import { competitors } from '../../../data/pitchDeckVariants';

function Check() {
  return <span className="text-[#047857] text-sm font-bold">&#10003;</span>;
}

function Cross() {
  return <span className="text-[#b91c1c] text-sm font-bold">&times;</span>;
}

export function SlideCompetitors() {
  const light = useContext(DeckLightModeContext);
  const isPrint = useContext(DeckPrintContext);

  const rowStyle: CSSProperties = light ? {
    background: 'rgba(255,255,255,0.88)',
    border: '1px solid rgba(0,0,0,0.14)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(0,0,0,0.06)',
  } : {
    background: 'rgba(10,12,18,0.58)',
    border: '1px solid rgba(255,255,255,0.13)',
    boxShadow: '0 4px 18px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.35)',
  };

  const cpRowStyle: CSSProperties = light ? {
    background: 'rgba(240,255,250,0.95)',
    border: '1px solid rgba(4,120,87,0.45)',
    boxShadow: '0 3px 14px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.07), 0 0 16px rgba(4,120,87,0.08), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(4,120,87,0.08)',
  } : {
    background: 'rgba(14,203,129,0.06)',
    border: '1px solid rgba(14,203,129,0.55)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.6), 0 2px 6px rgba(0,0,0,0.4), 0 0 18px rgba(14,203,129,0.08), inset 0 1px 0 rgba(14,203,129,0.18), inset 0 -1px 0 rgba(0,0,0,0.4)',
  };

  const calloutStyle: CSSProperties = light ? {
    background: 'rgba(255,255,255,0.88)',
    border: '1px solid rgba(0,0,0,0.14)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.95)',
  } : {
    background: 'rgba(10,12,18,0.58)',
    border: '1px solid rgba(255,255,255,0.13)',
    boxShadow: '0 4px 18px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.35)',
  };

  const gridCols = 'grid-cols-[1.5fr_0.72fr_0.82fr_0.88fr_0.9fr_2rem_2rem_2rem_2rem_2.35fr]';
  const titleSize = isPrint ? 'text-4xl md:text-6xl' : 'text-3xl md:text-5xl';
  const bodySize = isPrint ? 'text-base md:text-lg max-w-3xl' : 'text-sm md:text-base max-w-2xl';
  const headerText = isPrint ? 'text-[11px]' : 'text-[10px]';
  const cellText = isPrint ? 'text-[12px]' : 'text-[10px]';
  const rowPad = isPrint ? 'px-4 py-3.5' : 'px-3 py-2.5';

  return (
    <DeckSlide id="competitors" number={5}>
      <div className={`flex flex-col items-center ${isPrint ? 'gap-7' : 'gap-6'}`}>
        <div className="max-w-5xl text-center">
          <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-gray-500 mb-3">
            Competitive map
          </div>
          <h2 className={`font-display font-semibold tracking-tight text-white text-center leading-[0.92] ${titleSize}`}>
            Why existing tools <span className="text-[#b91c1c]">don't solve this</span>
          </h2>
          <p className={`mt-4 mx-auto text-gray-500 leading-relaxed ${bodySize}`}>
            These platforms were built for different users, different markets, and different price points.
            CryptoPrism is the only one combining indicators, news sentiment, strategy logic, and NL interaction in one workflow.
          </p>
        </div>

        <div className="w-full">
          <div className={`grid ${gridCols} gap-x-3 gap-y-0 px-4 py-2.5 ${headerText} font-mono uppercase tracking-[0.18em] text-gray-600`}>
            <span>Platform</span>
            <span>HQ</span>
            <span>Stage</span>
            <span>Valuation</span>
            <span>Price</span>
            <span className="text-center">NL</span>
            <span className="text-center">News</span>
            <span className="text-center">Strat</span>
            <span className="text-center">TA</span>
            <span>Key limitation</span>
          </div>

          <div
            className={`rounded-2xl grid ${gridCols} gap-x-3 gap-y-0 items-center w-full mb-2 ${rowPad}`}
            style={cpRowStyle}
          >
            <div className="min-w-0">
              <div className={`font-mono font-semibold tracking-tight text-[#047857] ${isPrint ? 'text-[13px]' : 'text-xs'}`}>
                CryptoPrism
              </div>
              <div className={`mt-1 ${cellText} leading-snug text-[#047857]/80`}>
                India-first crypto intelligence
              </div>
            </div>
            <span className={`${cellText} text-[#047857]`}>India</span>
            <span className={`${cellText} font-mono text-[#047857]`}>Pre-seed</span>
            <span className={`${cellText} font-mono text-[#047857]`}>Internal</span>
            <span className={`${cellText} font-mono text-[#047857]`}>$49-149/mo</span>
            <span className="text-center"><Check /></span>
            <span className="text-center"><Check /></span>
            <span className="text-center"><Check /></span>
            <span className="text-center"><Check /></span>
            <span className="text-[#047857] text-[12px] font-semibold leading-snug">
              All four. One platform. Built for this market.
            </span>
          </div>

          {competitors.map((c) => (
            <div
              key={c.name}
              className={`rounded-2xl grid ${gridCols} gap-x-3 gap-y-0 items-center w-full mb-2 ${rowPad}`}
              style={rowStyle}
            >
              <div className="min-w-0">
                <div className={`font-mono font-semibold tracking-tight ${light ? 'text-slate-900' : 'text-white'} ${isPrint ? 'text-[13px]' : 'text-xs'}`}>
                  {c.name}
                </div>
                <div className={`mt-1 ${cellText} leading-snug ${light ? 'text-slate-500' : 'text-gray-500'}`}>
                  {c.focus}
                </div>
              </div>
              <span className={`${cellText} ${light ? 'text-slate-600' : 'text-gray-500'}`}>{c.hq}</span>
              <span className={`${cellText} font-mono ${light ? 'text-slate-700' : 'text-gray-400'}`}>{c.stage}</span>
              <span className={`${cellText} font-mono ${light ? 'text-slate-700' : 'text-gray-400'}`}>{c.valuation}</span>
              <span className={`${cellText} font-mono ${light ? 'text-slate-700' : 'text-gray-400'}`}>{c.pricing}</span>
              <span className="text-center">{c.hasNL ? <Check /> : <Cross />}</span>
              <span className="text-center">{c.hasNewsSentiment ? <Check /> : <Cross />}</span>
              <span className="text-center">{c.hasStrategyLib ? <Check /> : <Cross />}</span>
              <span className="text-center">{c.hasIndicators ? <Check /> : <Cross />}</span>
              <span className={`${cellText} leading-snug ${light ? 'text-slate-600' : 'text-gray-400'}`}>
                {c.limitation}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-[24px] p-5 md:p-6 w-full max-w-4xl text-center" style={calloutStyle}>
          <p className={`${isPrint ? 'text-base md:text-lg' : 'text-sm'} text-gray-300 leading-relaxed`}>
            <span className="text-[#047857] font-semibold">
              The market gap is not just features. It is geography, stage, and product fit.
            </span>
            <br />
            <span className={`${isPrint ? 'text-sm md:text-base' : 'text-xs'} text-gray-500`}>
              Western incumbents are scaled or late-stage, but none are built around India-first workflows, plain-English querying, and a full intelligence stack in one place.
            </span>
          </p>
        </div>
      </div>
    </DeckSlide>
  );
}
