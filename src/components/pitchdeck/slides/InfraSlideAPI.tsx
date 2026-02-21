import { DeckSlide } from '../DeckSlide';

const apiLayers = [
  {
    name: 'API Gateway (HTTP API)',
    color: '#c2410c',
    description: 'REST endpoints for all client requests. Built-in throttling, API key management, usage plans per tier (Free/Signal/Edge).',
    specs: '~5M requests/mo · $25/mo',
    endpoints: 'GET /coins, GET /indicators, POST /query, GET /watchlist, GET /strategies',
  },
  {
    name: 'WebSocket API',
    color: '#047857',
    description: 'Real-time price streams, alert notifications, live strategy signals. Backed by Redis Pub/Sub for fan-out.',
    specs: 'Persistent connections · $5/mo (included in API GW)',
    endpoints: 'ws://prices, ws://alerts, ws://strategy-signals',
  },
  {
    name: 'Application Load Balancer',
    color: '#3b82f6',
    description: 'Routes traffic to ECS Fargate tasks. Path-based routing: /api → gateway-svc, /ws → websocket-svc. Health checks every 30s.',
    specs: '1 ALB, ~5 LCUs · $25/mo',
    endpoints: 'Internal service-to-service + external client traffic',
  },
  {
    name: 'CloudFront CDN',
    color: '#8b5cf6',
    description: 'Edge-cached web app (React SPA), API acceleration for global users, TLS termination, DDoS protection (Shield Standard).',
    specs: '100GB transfer/mo, 50+ edge locations · $15/mo',
    endpoints: 'cryptoprism-io.web.app (web) + api.cryptoprism-io.web.app (API)',
  },
] as const;

const integrations = [
  { name: 'Exchange APIs', targets: 'Binance, OKX, Bybit, CoinMarketCap', protocol: 'REST + WebSocket' },
  { name: 'News Sources', targets: '44+ verified crypto news outlets', protocol: 'RSS + REST' },
  { name: 'On-Chain', targets: 'Etherscan, BscScan, blockchain RPCs', protocol: 'JSON-RPC + REST' },
  { name: 'Webhooks Out', targets: 'User-configured endpoints, Telegram, Discord', protocol: 'HTTP POST + SNS' },
] as const;

export function InfraSlideAPI() {
  return (
    <DeckSlide id="infra-api" number={7}>
      <div className="flex flex-col items-center gap-5">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-white text-center">
          API & Integration: <span className="text-[#c2410c]">Gateway → ALB → Services</span>
        </h2>

        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-3">
          {apiLayers.map((layer) => (
            <div key={layer.name} className="glass-card rounded-xl p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold" style={{ color: layer.color }}>{layer.name}</span>
              </div>
              <p className="text-gray-400 text-[11px] leading-relaxed">{layer.description}</p>
              <span className="text-gray-500 text-[9px] font-mono">{layer.specs}</span>
              <span className="text-gray-600 text-[9px]">{layer.endpoints}</span>
            </div>
          ))}
        </div>

        {/* External integrations */}
        <div className="w-full max-w-5xl">
          <div className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-2">External Integrations</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {integrations.map((int) => (
              <div key={int.name} className="glass-card rounded-lg p-3 flex flex-col gap-1">
                <span className="font-mono text-[#047857] text-[10px] font-bold">{int.name}</span>
                <span className="text-gray-400 text-[10px]">{int.targets}</span>
                <span className="text-gray-600 text-[9px] font-mono">{int.protocol}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-lg px-4 py-2 flex items-center gap-3">
          <span className="text-gray-500 text-xs">Total Networking:</span>
          <span className="font-mono text-[#c2410c] text-sm font-bold">$67/mo</span>
          <span className="text-gray-600 text-[10px]">(7% of budget)</span>
        </div>
      </div>
    </DeckSlide>
  );
}
