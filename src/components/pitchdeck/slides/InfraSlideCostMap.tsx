import { DeckSlide } from '../DeckSlide';
import { costPerUserMap } from '../../../data/infraDeckData';

function BarSegment({ width, color, label }: { width: string; color: string; label: string }) {
  return (
    <div
      className="h-full flex items-center justify-center text-[7px] font-mono text-white/80 overflow-hidden"
      style={{ width, backgroundColor: color, minWidth: 0 }}
      title={label}
    >
      {label}
    </div>
  );
}

export function InfraSlideCostMap() {
  const maxTotal = Math.max(...costPerUserMap.map((r) => r.total));

  return (
    <DeckSlide id="infra-costmap" number={12}>
      <div className="flex flex-col items-center gap-4">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-white text-center">
          Cost per user: <span className="text-[#047857]">$1.00 &rarr; $0.36</span>
        </h2>

        <p className="text-gray-500 text-sm text-justify max-w-lg">
          Infrastructure cost per user drops 64% from 1K to 10K users. Fixed pipeline costs
          (data processing is per-coin, not per-user) and cache efficiency drive the curve down.
        </p>

        {/* Main table */}
        <div className="w-full max-w-5xl glass-card rounded-xl overflow-hidden">
          <div className="grid grid-cols-[0.5fr_0.6fr_0.6fr_0.6fr_0.6fr_0.6fr_0.6fr_0.6fr_0.7fr_0.7fr] gap-px bg-gray-800 text-[9px]">
            {/* Header */}
            <div className="bg-[#0a0f1a] px-2 py-2 font-mono text-gray-500 uppercase">Users</div>
            <div className="bg-[#0a0f1a] px-2 py-2 font-mono text-gray-500 uppercase">Compute</div>
            <div className="bg-[#0a0f1a] px-2 py-2 font-mono text-gray-500 uppercase">DB</div>
            <div className="bg-[#0a0f1a] px-2 py-2 font-mono text-gray-500 uppercase">AI/ML</div>
            <div className="bg-[#0a0f1a] px-2 py-2 font-mono text-gray-500 uppercase">Network</div>
            <div className="bg-[#0a0f1a] px-2 py-2 font-mono text-gray-500 uppercase">DevOps</div>
            <div className="bg-[#0a0f1a] px-2 py-2 font-mono text-gray-500 uppercase">Security</div>
            <div className="bg-[#0a0f1a] px-2 py-2 font-mono text-gray-500 uppercase">Buffer</div>
            <div className="bg-[#0a0f1a] px-2 py-2 font-mono text-gray-500 uppercase">Total</div>
            <div className="bg-[#0a0f1a] px-2 py-2 font-mono text-gray-500 uppercase">$/User</div>

            {costPerUserMap.map((row) => (
              <>
                <div key={`${row.users}-u`} className="bg-[#0d1320] px-2 py-1.5 font-mono text-white font-bold">{(row.users / 1000).toFixed(0)}K</div>
                <div key={`${row.users}-c`} className="bg-[#0d1320] px-2 py-1.5 font-mono text-[#c2410c]">${row.compute}</div>
                <div key={`${row.users}-d`} className="bg-[#0d1320] px-2 py-1.5 font-mono text-[#3b82f6]">${row.database}</div>
                <div key={`${row.users}-a`} className="bg-[#0d1320] px-2 py-1.5 font-mono text-[#8b5cf6]">${row.aiMl}</div>
                <div key={`${row.users}-n`} className="bg-[#0d1320] px-2 py-1.5 font-mono text-gray-400">${row.network}</div>
                <div key={`${row.users}-o`} className="bg-[#0d1320] px-2 py-1.5 font-mono text-gray-400">${row.devops}</div>
                <div key={`${row.users}-s`} className="bg-[#0d1320] px-2 py-1.5 font-mono text-gray-400">${row.security}</div>
                <div key={`${row.users}-b`} className="bg-[#0d1320] px-2 py-1.5 font-mono text-gray-600">${row.buffer}</div>
                <div key={`${row.users}-t`} className="bg-[#0d1320] px-2 py-1.5 font-mono text-white font-bold">${row.total.toLocaleString()}</div>
                <div key={`${row.users}-p`} className={`bg-[#0d1320] px-2 py-1.5 font-mono font-bold ${row.perUser <= 0.40 ? 'text-[#047857]' : row.perUser <= 0.50 ? 'text-[#b45309]' : 'text-[#c2410c]'}`}>
                  ${row.perUser.toFixed(2)}
                </div>
              </>
            ))}
          </div>
        </div>

        {/* Visual bar chart */}
        <div className="w-full max-w-5xl">
          <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-2">Cost Composition by User Count</div>
          <div className="space-y-1.5">
            {costPerUserMap.filter((_, i) => i % 2 === 0 || i === costPerUserMap.length - 1).map((row) => {
              const pct = (v: number) => `${((v / row.total) * 100).toFixed(0)}%`;
              return (
                <div key={row.users} className="flex items-center gap-2">
                  <span className="font-mono text-white text-[10px] w-8 text-right">{(row.users / 1000).toFixed(0)}K</span>
                  <div className="flex-1 h-5 rounded-sm overflow-hidden flex" style={{ width: `${(row.total / maxTotal) * 100}%` }}>
                    <BarSegment width={pct(row.compute)} color="#c2410c" label="Compute" />
                    <BarSegment width={pct(row.database)} color="#3b82f6" label="DB" />
                    <BarSegment width={pct(row.aiMl)} color="#8b5cf6" label="AI/ML" />
                    <BarSegment width={pct(row.network)} color="#6366f1" label="Net" />
                    <BarSegment width={pct(row.devops + row.security)} color="#374151" label="Ops" />
                    <BarSegment width={pct(row.buffer)} color="#1f2937" label="Buffer" />
                  </div>
                  <span className="font-mono text-[#047857] text-[10px] w-16 text-right">${row.total.toLocaleString()}</span>
                  <span className="font-mono text-gray-400 text-[10px] w-14 text-right">${row.perUser.toFixed(2)}/u</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key insights */}
        <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { value: '64%', label: 'Cost/user reduction', detail: '$1.00 → $0.36 at 10K' },
            { value: '3.6x', label: 'Total cost grows', detail: '$1K → $3.6K for 10x users' },
            { value: '~23%', label: 'AI/ML share', detail: 'Largest variable cost driver' },
            { value: '~20%', label: 'Buffer maintained', detail: 'AWS surprises are real' },
          ].map((kpi) => (
            <div key={kpi.label} className="glass-card rounded-lg p-3 flex flex-col items-center text-center gap-1">
              <span className="font-mono text-[#047857] text-lg font-bold">{kpi.value}</span>
              <span className="text-white text-[10px] font-medium">{kpi.label}</span>
              <span className="text-gray-500 text-[9px]">{kpi.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </DeckSlide>
  );
}
