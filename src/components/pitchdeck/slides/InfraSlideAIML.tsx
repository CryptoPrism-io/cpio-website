import { DeckSlide } from '../DeckSlide';
import { mlModels } from '../../../data/infraDeckData';

function IconBrain() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
      <path d="M10 21v1M14 21v1M9 17h6" />
    </svg>
  );
}

export function InfraSlideAIML() {
  return (
    <DeckSlide id="infra-aiml" number={6}>
      <div className="flex flex-col items-center gap-5">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-white text-center">
          AI / ML Stack: <span className="text-[#8b5cf6]">Bedrock + SageMaker</span>
        </h2>

        <p className="text-gray-500 text-sm text-justify max-w-lg">
          Foundation models via Bedrock (zero infra), custom models on SageMaker Serverless (pay per inference).
          Training on EC2 Spot. No GPU instances running 24/7.
        </p>

        {/* Models grid */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-3">
          {mlModels.map((model) => (
            <div key={model.name} className="glass-card rounded-xl p-4 flex gap-3">
              <IconBrain />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[#8b5cf6] text-xs font-bold">{model.name}</span>
                  <span className="font-mono text-[#0ecb81] text-[10px]">{model.estimatedCost}</span>
                </div>
                <p className="text-gray-400 text-[11px] leading-relaxed mt-1">{model.purpose}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[#ff9900] text-[9px] font-mono">{model.awsService}</span>
                </div>
                <span className="text-gray-600 text-[9px]">{model.inputOutput}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Cost summary */}
        <div className="w-full max-w-4xl glass-card rounded-xl p-4">
          <div className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-3">Monthly AI/ML Cost Estimate</div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <span className="font-mono text-[#ff9900] text-lg font-bold">$160</span>
              <span className="text-gray-500 text-[10px]">Bedrock (Claude + Titan)</span>
              <span className="text-gray-600 text-[9px]">~500K tokens/day</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-mono text-[#ff9900] text-lg font-bold">$55</span>
              <span className="text-gray-500 text-[10px]">SageMaker Serverless</span>
              <span className="text-gray-600 text-[9px]">Custom model inference</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-mono text-[#0ecb81] text-lg font-bold">$215</span>
              <span className="text-gray-500 text-[10px]">Total AI/ML</span>
              <span className="text-gray-600 text-[9px]">22% of $1K budget</span>
            </div>
          </div>
        </div>
      </div>
    </DeckSlide>
  );
}
