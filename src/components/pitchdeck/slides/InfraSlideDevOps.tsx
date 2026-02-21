import { DeckSlide } from '../DeckSlide';

function IconGitBranch() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  );
}

function IconMonitor() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

const cicdSteps = [
  { step: 'Push', detail: 'Developer pushes to feature/* branch on GitHub', color: '#666' },
  { step: 'Build', detail: 'CodeBuild: lint, type-check, unit tests, Docker build', color: '#ff9900' },
  { step: 'Test', detail: 'Integration tests against staging DB, API contract tests', color: '#f0b90b' },
  { step: 'Stage', detail: 'Auto-deploy to staging ECS cluster, run smoke tests', color: '#3b82f6' },
  { step: 'Approve', detail: 'Manual approval gate for production deploys', color: '#8b5cf6' },
  { step: 'Deploy', detail: 'Blue-green deploy to production ECS, CloudFront invalidation', color: '#047857' },
] as const;

const monitoring = [
  { metric: 'Service Health', tool: 'CloudWatch Alarms', threshold: 'ECS task health, Lambda errors > 1%' },
  { metric: 'API Latency', tool: 'CloudWatch Metrics', threshold: 'p95 < 200ms, p99 < 500ms' },
  { metric: 'Pipeline Success', tool: 'Custom Dashboard', threshold: '> 99.5% data pipeline completion' },
  { metric: 'Error Rate', tool: 'CloudWatch Logs Insights', threshold: '< 0.1% 5xx responses' },
  { metric: 'Cost Tracking', tool: 'AWS Cost Explorer', threshold: 'Daily alerts if > $40/day' },
  { metric: 'Security Events', tool: 'CloudTrail + GuardDuty', threshold: 'Unauthorized API calls, unusual patterns' },
] as const;

export function InfraSlideDevOps() {
  return (
    <DeckSlide id="infra-devops" number={8}>
      <div className="flex flex-col items-center gap-5">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-white text-center">
          DevOps: <span className="text-[#ff9900]">CI/CD + Observability</span>
        </h2>

        {/* CI/CD Pipeline */}
        <div className="w-full max-w-4xl">
          <div className="flex items-center gap-2 mb-2">
            <IconGitBranch />
            <span className="font-mono text-xs text-gray-500 uppercase tracking-wider">CI/CD Pipeline (CodePipeline + CodeBuild)</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {cicdSteps.map((s, i) => (
              <div key={s.step} className="flex items-center gap-1.5">
                {i > 0 && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
                <div className="glass-card rounded-lg px-3 py-2 flex flex-col">
                  <span className="font-mono text-[10px] font-bold" style={{ color: s.color }}>{s.step}</span>
                  <span className="text-gray-500 text-[9px]">{s.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monitoring */}
        <div className="w-full max-w-4xl">
          <div className="flex items-center gap-2 mb-2">
            <IconMonitor />
            <span className="font-mono text-xs text-gray-500 uppercase tracking-wider">Monitoring & Alerting</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {monitoring.map((m) => (
              <div key={m.metric} className="glass-card rounded-lg px-3 py-2">
                <span className="text-white text-[11px] font-medium">{m.metric}</span>
                <div className="text-[#ff9900] text-[9px] font-mono">{m.tool}</div>
                <div className="text-gray-500 text-[9px]">{m.threshold}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-lg px-4 py-2 flex items-center gap-3">
          <span className="text-gray-500 text-xs">Total DevOps:</span>
          <span className="font-mono text-[#ff9900] text-sm font-bold">$42/mo</span>
          <span className="text-gray-600 text-[10px]">(ECR $2 + CodePipeline $12 + CloudWatch $20 + Secrets $8)</span>
        </div>
      </div>
    </DeckSlide>
  );
}
