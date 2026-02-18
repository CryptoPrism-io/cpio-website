import { DeckSlide } from '../DeckSlide';
import { microservices } from '../../../data/infraDeckData';

function SvcIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <circle cx="6" cy="6" r="1" fill={color} />
      <circle cx="6" cy="18" r="1" fill={color} />
    </svg>
  );
}

export function InfraSlideArch() {
  return (
    <DeckSlide id="infra-arch" number={2}>
      <div className="flex flex-col items-center gap-5">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-white text-center">
          <span className="text-[#ff9900]">8 microservices.</span> One platform.
        </h2>

        <p className="text-gray-500 text-sm text-justify max-w-lg">
          Event-driven, containerized architecture. Each service owns its domain, scales independently,
          and communicates via SQS queues and EventBridge events.
        </p>

        {/* Architecture grid */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {microservices.map((svc) => (
            <div key={svc.name} className="glass-card rounded-lg px-4 py-3 flex items-start gap-3">
              <SvcIcon color={svc.awsService.includes('Lambda') || svc.awsService.includes('CloudFront') ? '#ff9900' : '#0ecb81'} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#0ecb81] text-xs font-bold">{svc.name}</span>
                  <span className="text-gray-600 text-[9px] font-mono">{svc.runtime}</span>
                </div>
                <p className="text-gray-400 text-[11px] leading-relaxed mt-0.5">{svc.responsibility}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[#ff9900] text-[9px] font-mono">{svc.awsService}</span>
                  <span className="text-gray-600 text-[9px]">{svc.instances}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 text-[10px] font-mono text-gray-600">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#0ecb81]" /> ECS Fargate</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#ff9900]" /> Lambda / Serverless</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-500" /> CDN / Static</span>
        </div>
      </div>
    </DeckSlide>
  );
}
