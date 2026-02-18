import { DeckSlide } from '../DeckSlide';
import { fixedVarBreakdown, fixedVarSummary } from '../../../data/infraDeckData';

export function InfraSlideFixedVar() {
  const fixed = fixedVarBreakdown.filter((i) => i.type === 'fixed');
  const variable = fixedVarBreakdown.filter((i) => i.type === 'variable');
  const semiVar = fixedVarBreakdown.filter((i) => i.type === 'semi-variable');

  return (
    <DeckSlide id="infra-fixedvar" number={13}>
      <div className="flex flex-col items-center gap-4">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-white text-center">
          <span className="text-[#3b82f6]">Fixed</span> vs{' '}
          <span className="text-[#ff9900]">Variable</span> vs{' '}
          <span className="text-[#8b5cf6]">Semi-Variable</span>
        </h2>

        <p className="text-gray-500 text-sm text-justify max-w-lg">
          Only 21% of the $1K beta budget is truly fixed. As users grow, the fixed portion
          shrinks to just 6% — meaning 94% of infrastructure spend scales with actual usage.
        </p>

        {/* Summary bars — at 1K vs 10K */}
        <div className="w-full max-w-4xl">
          <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-2">Cost Composition Shift</div>
          <div className="space-y-3">
            {/* 1K users bar */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-400 text-xs font-mono">1K users</span>
                <span className="text-white text-xs font-mono font-bold">$1,000/mo</span>
              </div>
              <div className="h-7 rounded-md overflow-hidden flex">
                <div className="flex items-center justify-center text-[9px] font-mono text-white/90" style={{ width: fixedVarSummary.fixed.pctOfTotal1K, backgroundColor: '#3b82f6' }}>
                  Fixed {fixedVarSummary.fixed.pctOfTotal1K}
                </div>
                <div className="flex items-center justify-center text-[9px] font-mono text-white/90" style={{ width: fixedVarSummary.variable.pctOfTotal1K, backgroundColor: '#ff9900' }}>
                  Variable {fixedVarSummary.variable.pctOfTotal1K}
                </div>
                <div className="flex items-center justify-center text-[9px] font-mono text-white/90" style={{ width: fixedVarSummary.semiVariable.pctOfTotal1K, backgroundColor: '#8b5cf6' }}>
                  Semi-Var {fixedVarSummary.semiVariable.pctOfTotal1K}
                </div>
                <div className="flex items-center justify-center text-[9px] font-mono text-white/60" style={{ width: fixedVarSummary.buffer.pctOfTotal1K, backgroundColor: '#1f2937' }}>
                  Buffer
                </div>
              </div>
            </div>
            {/* 10K users bar */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-400 text-xs font-mono">10K users</span>
                <span className="text-white text-xs font-mono font-bold">$3,600/mo</span>
              </div>
              <div className="h-7 rounded-md overflow-hidden flex">
                <div className="flex items-center justify-center text-[9px] font-mono text-white/90" style={{ width: fixedVarSummary.fixed.pctOfTotal10K, backgroundColor: '#3b82f6' }}>
                  {fixedVarSummary.fixed.pctOfTotal10K}
                </div>
                <div className="flex items-center justify-center text-[9px] font-mono text-white/90" style={{ width: fixedVarSummary.variable.pctOfTotal10K, backgroundColor: '#ff9900' }}>
                  Variable {fixedVarSummary.variable.pctOfTotal10K}
                </div>
                <div className="flex items-center justify-center text-[9px] font-mono text-white/90" style={{ width: fixedVarSummary.semiVariable.pctOfTotal10K, backgroundColor: '#8b5cf6' }}>
                  Semi-Var {fixedVarSummary.semiVariable.pctOfTotal10K}
                </div>
                <div className="flex items-center justify-center text-[9px] font-mono text-white/60" style={{ width: fixedVarSummary.buffer.pctOfTotal10K, backgroundColor: '#1f2937' }}>
                  Buf
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Three columns: Fixed / Variable / Semi-variable */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Fixed */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full bg-[#3b82f6]" />
              <span className="font-mono text-[#3b82f6] text-xs font-bold uppercase">Fixed — ${fixedVarSummary.fixed.at1K}/mo</span>
            </div>
            {fixed.map((item) => (
              <div key={item.service} className="glass-card rounded-lg px-3 py-2 border-l-2 border-[#3b82f6]">
                <div className="flex items-center justify-between">
                  <span className="text-white text-[10px] font-medium">{item.service}</span>
                  <span className="font-mono text-[#3b82f6] text-[10px]">${item.baseCost}</span>
                </div>
                <span className="text-gray-600 text-[9px]">{item.scaleFactor}</span>
              </div>
            ))}
          </div>

          {/* Variable */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full bg-[#ff9900]" />
              <span className="font-mono text-[#ff9900] text-xs font-bold uppercase">Variable — ${fixedVarSummary.variable.at1K}/mo</span>
            </div>
            {variable.map((item) => (
              <div key={item.service} className="glass-card rounded-lg px-3 py-2 border-l-2 border-[#ff9900]">
                <div className="flex items-center justify-between">
                  <span className="text-white text-[10px] font-medium">{item.service}</span>
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-gray-500 text-[9px]">${item.baseCost}</span>
                    <span className="text-gray-600 text-[9px]">&rarr;</span>
                    <span className="font-mono text-[#ff9900] text-[10px]">${item.costAt10K}</span>
                  </div>
                </div>
                <span className="text-gray-600 text-[9px]">{item.scaleFactor}</span>
              </div>
            ))}
          </div>

          {/* Semi-variable */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full bg-[#8b5cf6]" />
              <span className="font-mono text-[#8b5cf6] text-xs font-bold uppercase">Semi-Var — ${fixedVarSummary.semiVariable.at1K}/mo</span>
            </div>
            {semiVar.map((item) => (
              <div key={item.service} className="glass-card rounded-lg px-3 py-2 border-l-2 border-[#8b5cf6]">
                <div className="flex items-center justify-between">
                  <span className="text-white text-[10px] font-medium">{item.service}</span>
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-gray-500 text-[9px]">${item.baseCost}</span>
                    <span className="text-gray-600 text-[9px]">&rarr;</span>
                    <span className="font-mono text-[#8b5cf6] text-[10px]">${item.costAt10K}</span>
                  </div>
                </div>
                <span className="text-gray-600 text-[9px]">{item.scaleFactor}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key insight */}
        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { value: '$209', label: 'Fixed at 1K', detail: '21% of budget', color: '#3b82f6' },
            { value: '$227', label: 'Fixed at 10K', detail: 'Only 6% — barely moves', color: '#3b82f6' },
            { value: '$310', label: 'Variable at 1K', detail: '31% — mostly AI/ML', color: '#ff9900' },
            { value: '$1,430', label: 'Variable at 10K', detail: '40% — Bedrock is the driver', color: '#ff9900' },
          ].map((kpi) => (
            <div key={kpi.label} className="glass-card rounded-lg p-3 flex flex-col items-center text-center gap-1">
              <span className="font-mono text-lg font-bold" style={{ color: kpi.color }}>{kpi.value}</span>
              <span className="text-white text-[10px] font-medium">{kpi.label}</span>
              <span className="text-gray-500 text-[9px]">{kpi.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </DeckSlide>
  );
}
