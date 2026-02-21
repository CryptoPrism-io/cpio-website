import { DeckSlide } from '../DeckSlide';

const databases = [
  {
    name: 'RDS PostgreSQL',
    icon: 'db',
    color: '#3b82f6',
    items: [
      { label: 'DB-1: OHLCV', detail: '1,000+ coins, 108K+ records/run, time-series partitioned', tier: 'db.t4g.micro (free tier Y1)' },
      { label: 'DB-2: Indicators', detail: '130+ indicators per coin per timeframe, DMV scores', tier: 'db.t4g.small' },
      { label: 'DB-3: News & Sentiment', detail: '44 sources, 182+ topic categories, sentiment scores', tier: 'db.t4g.micro' },
    ],
    cost: '$65/mo',
  },
  {
    name: 'ElastiCache Redis',
    icon: 'cache',
    color: '#ef4444',
    items: [
      { label: 'Hot data cache', detail: 'Latest prices, top movers, trending coins — sub-ms reads', tier: '' },
      { label: 'Rate limiting', detail: 'Per-user API quota enforcement (sliding window)', tier: '' },
      { label: 'Session store', detail: 'JWT session data, WebSocket connection state', tier: '' },
      { label: 'Pub/Sub', detail: 'Real-time price updates to WebSocket subscribers', tier: '' },
    ],
    cost: '$15/mo',
  },
  {
    name: 'DynamoDB',
    icon: 'kv',
    color: '#f0b90b',
    items: [
      { label: 'User profiles & API keys', detail: 'Low-latency key-value lookups, auto-scaling', tier: '' },
      { label: 'Strategy metadata', detail: 'Strategy configs, backtest results, deployment state', tier: '' },
    ],
    cost: '$5/mo',
  },
  {
    name: 'S3',
    icon: 'storage',
    color: '#047857',
    items: [
      { label: 'Data lake', detail: 'Raw + processed data, partitioned by date/coin', tier: 'S3 Standard' },
      { label: 'Model artifacts', detail: 'Trained ML models, embeddings, feature stores', tier: 'S3 IA' },
      { label: 'Backups', detail: 'RDS snapshots, Redis RDB exports, audit logs', tier: 'S3 Glacier' },
    ],
    cost: '$8/mo',
  },
];

export function InfraSlideDatabase() {
  return (
    <DeckSlide id="infra-database" number={5}>
      <div className="flex flex-col items-center gap-5">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-white text-center">
          Database & Caching: <span className="text-[#3b82f6]">Multi-layer storage</span>
        </h2>

        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-3">
          {databases.map((db) => (
            <div key={db.name} className="glass-card rounded-xl p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold" style={{ color: db.color }}>{db.name}</span>
                <span className="font-mono text-[#047857] text-xs font-bold">{db.cost}</span>
              </div>
              <div className="space-y-2">
                {db.items.map((item) => (
                  <div key={item.label} className="flex flex-col">
                    <span className="text-white text-[11px] font-medium">{item.label}</span>
                    <span className="text-gray-500 text-[10px]">{item.detail}</span>
                    {item.tier && <span className="text-gray-600 text-[9px] font-mono">{item.tier}</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-lg px-4 py-2 flex items-center gap-3">
          <span className="text-gray-500 text-xs">Total Data Layer:</span>
          <span className="font-mono text-[#3b82f6] text-sm font-bold">$93/mo</span>
          <span className="text-gray-600 text-[10px]">(9% of $1K budget — RDS free tier saves ~$30/mo in Y1)</span>
        </div>
      </div>
    </DeckSlide>
  );
}
