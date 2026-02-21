import { DeckSlide } from '../DeckSlide';
import { pipelineStages } from '../../../data/infraDeckData';

const stageColors: Record<string, string> = {
  Ingest: '#c2410c',
  Transform: '#b45309',
  Compute: '#047857',
  Enrich: '#3b82f6',
  Store: '#8b5cf6',
  Serve: '#ec4899',
};

function ArrowDown() {
  return (
    <div className="flex justify-center py-1">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5">
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    </div>
  );
}

export function InfraSlidePipeline() {
  return (
    <DeckSlide id="infra-pipeline" number={3}>
      <div className="flex flex-col items-center gap-5">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-white text-center">
          Six-stage <span className="text-[#c2410c]">data pipeline</span>
        </h2>

        <p className="text-gray-500 text-sm text-justify max-w-lg">
          From raw exchange data to sub-200ms API responses. Every stage is observable, retryable,
          and independently scalable via AWS managed services.
        </p>

        <div className="w-full max-w-4xl space-y-0">
          {pipelineStages.map((stage, i) => (
            <div key={stage.stage}>
              {i > 0 && <ArrowDown />}
              <div className="glass-card rounded-lg px-5 py-3 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <div className="flex items-center gap-2 md:w-28 shrink-0">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: stageColors[stage.stage] || '#666' }}
                  />
                  <span className="font-mono text-sm font-bold" style={{ color: stageColors[stage.stage] || '#666' }}>
                    {stage.stage}
                  </span>
                </div>
                <p className="text-gray-400 text-[11px] flex-1">{stage.description}</p>
                <div className="flex flex-col items-end shrink-0">
                  <span className="text-[#c2410c] text-[9px] font-mono">{stage.awsServices}</span>
                  <span className="text-gray-600 text-[9px]">{stage.frequency} · {stage.dataVolume}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DeckSlide>
  );
}
