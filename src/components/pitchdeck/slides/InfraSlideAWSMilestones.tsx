import { DeckSlide } from '../DeckSlide';

const milestones = [
  {
    phase: 'Beta Launch',
    timeline: 'Mo 1-3',
    users: '50-200',
    awsSpend: '$1,000',
    creditsUsed: '$3,000',
    keyServices: [
      { service: 'ECS Fargate', spend: '$180', why: '5 microservice tasks' },
      { service: 'Bedrock (Claude)', spend: '$160', why: 'NL terminal queries' },
      { service: 'RDS PostgreSQL', spend: '$65', why: '3 databases (free tier)' },
      { service: 'Lambda', spend: '$45', why: 'Event-driven functions' },
    ],
    milestone: 'First 100 beta users onboarded, pipeline running 24/7',
    color: '#3b82f6',
  },
  {
    phase: 'Early Growth',
    timeline: 'Mo 4-6',
    users: '200-500',
    awsSpend: '$2,500',
    creditsUsed: '$7,500',
    keyServices: [
      { service: 'Bedrock (Claude)', spend: '$400', why: 'NL query volume 5x' },
      { service: 'ECS Fargate', spend: '$320', why: '+3 tasks, autoscaling' },
      { service: 'RDS Multi-AZ', spend: '$190', why: 'High availability' },
      { service: 'SageMaker', spend: '$120', why: 'Real-time ML endpoints' },
    ],
    milestone: 'First paying customers, SaaS tiers live, <200ms API p95',
    color: '#047857',
  },
  {
    phase: 'Traction',
    timeline: 'Mo 7-9',
    users: '500-1,500',
    awsSpend: '$5,000',
    creditsUsed: '$15,000',
    keyServices: [
      { service: 'Bedrock', spend: '$720', why: 'Full NL + sentiment at scale' },
      { service: 'ECS + ALB', spend: '$580', why: 'Auto-scaling, blue-green deploys' },
      { service: 'RDS + Read Replicas', spend: '$400', why: 'Read-heavy analytics queries' },
      { service: 'CloudFront + WAF', spend: '$200', why: 'Global CDN + security' },
    ],
    milestone: 'DaaS (B2B API) launch, first enterprise customer',
    color: '#c2410c',
  },
  {
    phase: 'Scale',
    timeline: 'Mo 10-12',
    users: '1,500-3,000',
    awsSpend: '$8,000',
    creditsUsed: '$25,000 total',
    keyServices: [
      { service: 'Bedrock Provisioned', spend: '$1,200', why: 'Dedicated throughput' },
      { service: 'ECS Auto-Scaling', spend: '$800', why: '10+ tasks, Graviton' },
      { service: 'Aurora Serverless', spend: '$650', why: 'Migrate from RDS' },
      { service: 'SageMaker Endpoints', spend: '$400', why: 'Dedicated ML inference' },
    ],
    milestone: '$15K+ MRR, Savings Plans activated, credits fully utilized',
    color: '#8b5cf6',
  },
] as const;

export function InfraSlideAWSMilestones() {
  return (
    <DeckSlide id="infra-aws-milestones" number={15}>
      <div className="flex flex-col items-center gap-4">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-white text-center">
          AWS Credits Roadmap: <span className="text-[#c2410c]">$25K in 12 months</span>
        </h2>

        <p className="text-gray-500 text-xs text-center max-w-lg">
          Every dollar of AWS credits maps to a user growth milestone.
          No idle infrastructure — credits burn only as demand scales.
        </p>

        {/* Timeline cards */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-3">
          {milestones.map((m) => (
            <div key={m.phase} className="glass-card rounded-lg p-4 border-l-3" style={{ borderLeftWidth: 3, borderLeftColor: m.color }}>
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold" style={{ color: m.color }}>{m.phase}</span>
                  <span className="text-gray-600 text-[10px] font-mono">{m.timeline}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-[10px] font-mono">{m.users} users</span>
                  <span className="font-mono text-xs font-bold" style={{ color: m.color }}>{m.awsSpend}/mo</span>
                </div>
              </div>

              {/* Services breakdown */}
              <div className="space-y-1 mb-2">
                {m.keyServices.map((s) => (
                  <div key={s.service} className="flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{s.service}</span>
                      <span className="text-gray-600">{s.why}</span>
                    </div>
                    <span className="font-mono text-gray-400">{s.spend}</span>
                  </div>
                ))}
              </div>

              {/* Milestone */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-800">
                <span className="text-[10px] text-gray-400 italic">{m.milestone}</span>
                <span className="font-mono text-[10px] font-bold" style={{ color: m.color }}>
                  {m.creditsUsed} credits
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary bar */}
        <div className="w-full max-w-5xl">
          <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-1">Credits Utilization Timeline</div>
          <div className="h-8 rounded-md overflow-hidden flex">
            <div className="flex items-center justify-center text-[9px] font-mono text-white/90" style={{ width: '12%', backgroundColor: '#3b82f6' }}>
              $3K
            </div>
            <div className="flex items-center justify-center text-[9px] font-mono text-white/90" style={{ width: '18%', backgroundColor: '#047857' }}>
              $7.5K
            </div>
            <div className="flex items-center justify-center text-[9px] font-mono text-white/90" style={{ width: '30%', backgroundColor: '#c2410c' }}>
              $15K
            </div>
            <div className="flex items-center justify-center text-[9px] font-mono text-white/90" style={{ width: '40%', backgroundColor: '#8b5cf6' }}>
              $25K total
            </div>
          </div>
          <div className="flex justify-between text-[9px] text-gray-600 font-mono mt-1">
            <span>Month 1</span>
            <span>Month 3</span>
            <span>Month 6</span>
            <span>Month 9</span>
            <span>Month 12</span>
          </div>
        </div>

        {/* Bottom KPIs */}
        <div className="w-full max-w-4xl grid grid-cols-4 gap-2">
          {[
            { value: '$25K', label: 'Total Credits Ask', detail: 'Fully utilized by Month 12', color: '#c2410c' },
            { value: '3,000', label: 'Users at Burn-Through', detail: '$8K/mo run rate', color: '#047857' },
            { value: '70%+', label: 'Bedrock + Compute', detail: 'Largest AWS spend categories', color: '#3b82f6' },
            { value: '$15K+', label: 'MRR at Month 12', detail: 'Self-sustaining post-credits', color: '#8b5cf6' },
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
