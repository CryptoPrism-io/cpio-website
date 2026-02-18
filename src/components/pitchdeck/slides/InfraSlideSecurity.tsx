import { DeckSlide } from '../DeckSlide';
import { securityLayers } from '../../../data/infraDeckData';

const layerColors: Record<string, string> = {
  Network: '#3b82f6',
  Edge: '#ff9900',
  Authentication: '#0ecb81',
  Authorization: '#8b5cf6',
  Encryption: '#f0b90b',
  Secrets: '#ec4899',
  Audit: '#6366f1',
  Compliance: '#14b8a6',
};

function IconShield() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export function InfraSlideSecurity() {
  return (
    <DeckSlide id="infra-security" number={9}>
      <div className="flex flex-col items-center gap-5">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-white text-center">
          Security: <span className="text-[#0ecb81]">8 layers. Zero custody.</span>
        </h2>

        <p className="text-gray-500 text-sm text-justify max-w-lg">
          Defense in depth from edge to database. We never hold user funds — but we protect
          every piece of data as if we did.
        </p>

        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {securityLayers.map((layer) => (
            <div key={layer.layer} className="glass-card rounded-lg px-4 py-3 flex gap-3">
              <div style={{ color: layerColors[layer.layer] || '#666' }}>
                <IconShield />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold" style={{ color: layerColors[layer.layer] || '#666' }}>
                    {layer.layer}
                  </span>
                  <span className="text-[#ff9900] text-[9px] font-mono">{layer.awsService}</span>
                </div>
                <p className="text-gray-400 text-[10px] leading-relaxed mt-0.5">{layer.implementation}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-lg px-4 py-2 flex items-center gap-3">
          <span className="text-gray-500 text-xs">Total Security:</span>
          <span className="font-mono text-[#ff9900] text-sm font-bold">$48/mo</span>
          <span className="text-gray-600 text-[10px]">(WAF $11 + KMS $5 + VPC/NAT $32 + Cognito $0 free tier)</span>
        </div>
      </div>
    </DeckSlide>
  );
}
