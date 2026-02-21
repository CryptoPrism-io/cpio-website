import { DeckSlide } from '../DeckSlide';
import { environments } from '../../../data/infraDeckData';

const envColors: Record<string, string> = {
  Development: '#b45309',
  Staging: '#3b82f6',
  Production: '#047857',
};

function IconArrowRight() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

const testingStrategy = [
  { type: 'Unit Tests', tool: 'Jest + pytest', coverage: '> 80%', trigger: 'Every push' },
  { type: 'Integration', tool: 'Supertest + docker-compose', coverage: 'All API contracts', trigger: 'PR to develop' },
  { type: 'Load Testing', tool: 'k6 (Grafana)', coverage: 'p95 < 200ms at 100 RPS', trigger: 'Weekly on staging' },
  { type: 'Security Scan', tool: 'Snyk + Trivy', coverage: 'Container + dependency CVEs', trigger: 'Every build' },
  { type: 'E2E', tool: 'Playwright', coverage: 'Critical user flows', trigger: 'Pre-production' },
  { type: 'Chaos', tool: 'AWS FIS', coverage: 'AZ failure, service kill', trigger: 'Monthly on staging' },
] as const;

export function InfraSlideEnvs() {
  return (
    <DeckSlide id="infra-envs" number={10}>
      <div className="flex flex-col items-center gap-5">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-white text-center">
          Beta <span className="text-[#c2410c]">&rarr;</span> Staging <span className="text-[#c2410c]">&rarr;</span> Production
        </h2>

        {/* Environment cards */}
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-stretch gap-3">
          {environments.map((env, i) => (
            <div key={env.name} className="flex items-center gap-3 flex-1">
              {i > 0 && <div className="hidden md:block"><IconArrowRight /></div>}
              <div className="glass-card rounded-xl p-5 flex-1 flex flex-col gap-2" style={{ borderLeft: `3px solid ${envColors[env.name] || '#666'}` }}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold" style={{ color: envColors[env.name] }}>{env.name}</span>
                  <span className="font-mono text-[#047857] text-xs font-bold">{env.monthlyCost}</span>
                </div>
                <p className="text-gray-400 text-[11px] leading-relaxed">{env.purpose}</p>
                <span className="text-gray-500 text-[10px]">{env.infra}</span>
                <div className="flex items-center gap-1 mt-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#c2410c" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
                  <span className="text-[#c2410c] text-[9px] font-mono">{env.ciTrigger}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testing strategy */}
        <div className="w-full max-w-5xl">
          <div className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-2">Testing Strategy</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {testingStrategy.map((t) => (
              <div key={t.type} className="glass-card rounded-lg p-3 flex flex-col gap-1">
                <span className="font-mono text-[#047857] text-[10px] font-bold">{t.type}</span>
                <span className="text-white text-[10px]">{t.tool}</span>
                <span className="text-gray-500 text-[9px]">{t.coverage}</span>
                <span className="text-gray-600 text-[9px] font-mono">{t.trigger}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DeckSlide>
  );
}
