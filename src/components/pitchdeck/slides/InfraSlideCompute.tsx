import { DeckSlide } from '../DeckSlide';

const computeServices = [
  {
    name: 'ECS Fargate',
    icon: 'container',
    description: 'Serverless containers — no EC2 instances to manage. Each microservice runs as a Fargate task with CPU/memory autoscaling.',
    specs: '0.25 vCPU / 0.5 GB per task · 5 tasks running',
    cost: '$180/mo',
    useCase: 'data-ingest, indicator-engine, news-fetcher, api-gateway, strategy-runner',
  },
  {
    name: 'AWS Lambda',
    icon: 'function',
    description: 'Event-driven functions for NL terminal queries (Bedrock calls), data transforms, notifications, and webhook delivery.',
    specs: '512 MB memory · 15 min max timeout · ~2M invocations/mo',
    cost: '$45/mo',
    useCase: 'nl-terminal, notification-svc, Step Functions orchestration',
  },
  {
    name: 'EC2 Spot Instances',
    icon: 'server',
    description: 'Up to 90% cheaper than on-demand. Used for ML model training, heavy backtests, and batch indicator recomputation.',
    specs: 't3.xlarge spot · ~8 hours/week (scheduled)',
    cost: '$35/mo',
    useCase: 'ML training (XGBoost, Isolation Forest), strategy optimization',
  },
] as const;

function IconContainer() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c2410c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function IconFunction() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c2410c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2c-1.7 0-3 1.3-3 3v4c0 1.7-1.3 3-3 3 1.7 0 3 1.3 3 3v4c0 1.7 1.3 3 3 3" />
      <path d="M14 2c1.7 0 3 1.3 3 3v4c0 1.7 1.3 3 3 3-1.7 0-3 1.3-3 3v4c0 1.7-1.3 3-3 3" />
    </svg>
  );
}

function IconServer() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c2410c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );
}

const icons = { container: IconContainer, function: IconFunction, server: IconServer };

export function InfraSlideCompute() {
  return (
    <DeckSlide id="infra-compute" number={4}>
      <div className="flex flex-col items-center gap-6">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-white text-center">
          Compute: <span className="text-[#c2410c]">Fargate + Lambda + Spot</span>
        </h2>

        <p className="text-gray-500 text-sm text-justify max-w-lg">
          Three compute tiers matched to workload patterns. Always-on for pipelines,
          event-driven for queries, spot for training. Zero idle EC2 instances.
        </p>

        <div className="w-full max-w-4xl space-y-4">
          {computeServices.map((svc) => {
            const Icon = icons[svc.icon as keyof typeof icons];
            return (
              <div key={svc.name} className="glass-card rounded-xl p-5 flex gap-4">
                <Icon />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[#c2410c] text-sm font-bold">{svc.name}</span>
                    <span className="font-mono text-[#047857] text-xs font-bold">{svc.cost}</span>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">{svc.description}</p>
                  <div className="mt-2 flex flex-col gap-1">
                    <span className="text-gray-500 text-[10px] font-mono">{svc.specs}</span>
                    <span className="text-gray-600 text-[10px]">{svc.useCase}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="glass-card rounded-lg px-4 py-2 flex items-center gap-3">
          <span className="text-gray-500 text-xs">Total Compute:</span>
          <span className="font-mono text-[#c2410c] text-sm font-bold">$260/mo</span>
          <span className="text-gray-600 text-[10px]">(26% of $1K budget)</span>
        </div>
      </div>
    </DeckSlide>
  );
}
