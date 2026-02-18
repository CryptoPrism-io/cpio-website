import { DeckSlide } from '../DeckSlide';
import { scalingRoadmap } from '../../../data/infraDeckData';

const phaseColors: Record<string, string> = {
  Beta: '#f0b90b',
  Growth: '#ff9900',
  Production: '#0ecb81',
  Scale: '#3b82f6',
};

export function InfraSlideScaling() {
  return (
    <DeckSlide id="infra-scaling" number={12}>
      <div className="flex flex-col items-center gap-6">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-white text-center">
          Scaling: <span className="text-[#ff9900]">$1K &rarr; $30K</span> as users grow
        </h2>

        <p className="text-gray-500 text-sm text-justify max-w-lg">
          Infrastructure costs scale linearly with users, not ahead of them.
          No over-provisioning. Every dollar tied to a user or a pipeline.
        </p>

        {/* Scaling phases */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4">
          {scalingRoadmap.map((phase) => (
            <div
              key={phase.phase}
              className={`glass-card rounded-xl p-5 flex flex-col gap-3 ${phase.phase === 'Beta' ? 'terminal-green' : ''}`}
              style={{ borderTop: `3px solid ${phaseColors[phase.phase]}` }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold" style={{ color: phaseColors[phase.phase] }}>
                  {phase.phase}
                </span>
                <span className="font-mono text-[#0ecb81] text-sm font-bold">{phase.monthlyCost}</span>
              </div>
              <div className="flex items-center gap-4 text-gray-400 text-xs">
                <span>{phase.timeline}</span>
                <span className="text-gray-600">|</span>
                <span>{phase.users} users</span>
              </div>
              <p className="text-gray-400 text-[11px] leading-relaxed">{phase.keyChanges}</p>
              <div className="text-[#ff9900] text-[9px] font-mono">{phase.awsHighlights}</div>
            </div>
          ))}
        </div>

        {/* Key principle */}
        <div className="glass-card rounded-xl p-5 w-full max-w-3xl text-center">
          <p className="font-mono text-[#ff9900] text-sm font-bold mb-2">
            Infrastructure cost per user: $5-20 at beta → $2-3 at scale
          </p>
          <p className="text-gray-400 text-xs">
            Serverless-first means we pay for what we use. No idle servers. No wasted capacity.
            <br />
            <span className="text-gray-500 text-[10px]">AWS Savings Plans + Reserved Instances cut 30-40% from Year 2.</span>
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-6 text-gray-500 text-sm font-mono">
          <span>cryptoprism.io</span>
          <span className="text-gray-700">|</span>
          <span>Trinetry Infotech Pvt. Ltd.</span>
        </div>
      </div>
    </DeckSlide>
  );
}
