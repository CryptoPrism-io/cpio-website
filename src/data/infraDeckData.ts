// ── Infrastructure Deck Data ──────────────────────────────────────────────
// CryptoPrism: AWS Cloud Infrastructure Blueprint
// $1,000/month burn logic for beta → production

import type { SlideData } from './pitchDeckData';

// ── Slide manifest ───────────────────────────────────────────────────────

export const slidesInfra: readonly SlideData[] = [
  { id: 'infra-title',       number: 1,  headline: 'CryptoPrism Infrastructure' },
  { id: 'infra-arch',        number: 2,  headline: 'Microservice Architecture' },
  { id: 'infra-pipeline',    number: 3,  headline: 'Data Pipeline' },
  { id: 'infra-compute',     number: 4,  headline: 'Compute & Containers' },
  { id: 'infra-database',    number: 5,  headline: 'Database & Caching' },
  { id: 'infra-aiml',        number: 6,  headline: 'AI / ML Stack' },
  { id: 'infra-api',         number: 7,  headline: 'API & Integration Layer' },
  { id: 'infra-devops',      number: 8,  headline: 'DevOps & CI/CD' },
  { id: 'infra-security',    number: 9,  headline: 'Security & Compliance' },
  { id: 'infra-envs',        number: 10, headline: 'Beta → Staging → Production' },
  { id: 'infra-budget',      number: 11, headline: '$1,000/mo Budget Breakdown' },
  { id: 'infra-costmap',     number: 12, headline: 'Cost Per User — 1K to 10K' },
  { id: 'infra-fixedvar',   number: 13, headline: 'Fixed vs Variable Costs' },
  { id: 'infra-scaling',    number: 14, headline: 'Scaling Roadmap' },
  { id: 'infra-aws-milestones', number: 15, headline: 'AWS Credits Roadmap' },
] as const;

// ── Microservices ────────────────────────────────────────────────────────

export interface Microservice {
  readonly name: string;
  readonly responsibility: string;
  readonly runtime: string;
  readonly awsService: string;
  readonly instances: string;
}

export const microservices: readonly Microservice[] = [
  { name: 'data-ingest',      responsibility: 'OHLCV, on-chain, metadata fetching from exchanges & APIs',         runtime: 'Python 3.12',    awsService: 'ECS Fargate',  instances: '2 tasks' },
  { name: 'news-fetcher',     responsibility: '44+ sources, 500+ articles/hr, sentiment scoring',                  runtime: 'Python 3.12',    awsService: 'ECS Fargate',  instances: '1 task' },
  { name: 'indicator-engine',  responsibility: '130+ technical indicators, DMV scoring, regime detection',          runtime: 'Python 3.12',    awsService: 'ECS Fargate',  instances: '2 tasks' },
  { name: 'nl-terminal',      responsibility: 'Natural language query → quant analysis via LLM',                    runtime: 'Node.js 20',     awsService: 'Lambda + Bedrock', instances: 'On-demand' },
  { name: 'api-gateway-svc',  responsibility: 'REST + WebSocket API, auth, rate limiting',                          runtime: 'Node.js 20',     awsService: 'ECS Fargate',  instances: '2 tasks' },
  { name: 'strategy-runner',  responsibility: 'Backtest engine, strategy execution, signal generation',             runtime: 'Python 3.12',    awsService: 'Lambda / ECS', instances: 'On-demand' },
  { name: 'notification-svc', responsibility: 'Alerts, webhooks, email/push delivery',                              runtime: 'Node.js 20',     awsService: 'Lambda + SQS', instances: 'Event-driven' },
  { name: 'web-app',          responsibility: 'React SPA, SSR, dashboard UI',                                       runtime: 'Next.js 14',     awsService: 'CloudFront + S3', instances: 'CDN edge' },
] as const;

// ── Pipeline stages ──────────────────────────────────────────────────────

export interface PipelineStage {
  readonly stage: string;
  readonly description: string;
  readonly awsServices: string;
  readonly frequency: string;
  readonly dataVolume: string;
}

export const pipelineStages: readonly PipelineStage[] = [
  { stage: 'Ingest',    description: 'Pull OHLCV, on-chain, news, security scores, token metadata, whitepapers',  awsServices: 'ECS Fargate, EventBridge (cron), S3 (raw)', frequency: 'Hourly + Daily', dataVolume: '108K+ records/run' },
  { stage: 'Transform', description: 'Clean, normalize, deduplicate across 1,000+ coins',                          awsServices: 'Lambda, Step Functions, S3 (processed)',     frequency: 'Post-ingest',    dataVolume: '~2GB/run' },
  { stage: 'Compute',   description: '130+ indicators, DMV scoring, regime classification per coin per timeframe',  awsServices: 'ECS Fargate (compute-heavy), ElastiCache',   frequency: 'Hourly + Daily', dataVolume: '130K+ calculations' },
  { stage: 'Enrich',    description: 'AI sentiment from news, LLM classification, topic tagging (182+ categories)', awsServices: 'Bedrock (Claude), Lambda, SQS',              frequency: '500+ articles/hr', dataVolume: '~50K tokens/hr' },
  { stage: 'Store',     description: 'Write to PostgreSQL (3 DBs), update Redis cache, index for search',           awsServices: 'RDS PostgreSQL, ElastiCache Redis, OpenSearch', frequency: 'Continuous',   dataVolume: '3 databases' },
  { stage: 'Serve',     description: 'REST API (<200ms), WebSocket streams, webhook delivery',                      awsServices: 'API Gateway, ALB, CloudFront',               frequency: 'Real-time',      dataVolume: '<200ms p95' },
] as const;

// ── AWS Services used ────────────────────────────────────────────────────

export interface AwsServiceDetail {
  readonly service: string;
  readonly category: string;
  readonly purpose: string;
  readonly tier: string;
  readonly monthlyCost: string;
}

export const awsServices: readonly AwsServiceDetail[] = [
  // Compute
  { service: 'ECS Fargate',         category: 'Compute',   purpose: 'Containerized microservices (data-ingest, indicator-engine, API)',     tier: '0.25 vCPU / 0.5 GB × 5 tasks',     monthlyCost: '$180' },
  { service: 'Lambda',              category: 'Compute',   purpose: 'Event-driven functions (NL queries, transforms, notifications)',        tier: '~2M invocations/mo, 512MB',          monthlyCost: '$45' },
  { service: 'EC2 Spot (t3.xlarge)', category: 'Compute',  purpose: 'ML training jobs, heavy backtests (scheduled, interruptible)',          tier: 'Spot, ~8 hrs/week',                  monthlyCost: '$35' },
  // Database & Cache
  { service: 'RDS PostgreSQL',      category: 'Database',  purpose: '3 databases: OHLCV, indicators, news/sentiment',                       tier: 'db.t4g.micro (free tier Y1) + db.t4g.small', monthlyCost: '$65' },
  { service: 'ElastiCache Redis',   category: 'Database',  purpose: 'Hot data cache, rate limiting, session store, real-time leaderboards',  tier: 'cache.t4g.micro',                    monthlyCost: '$15' },
  { service: 'DynamoDB',            category: 'Database',  purpose: 'User sessions, API keys, webhook configs, strategy metadata',           tier: 'On-demand, <1M reads/mo',            monthlyCost: '$5' },
  { service: 'S3',                  category: 'Storage',   purpose: 'Data lake (raw + processed), backups, static assets, model artifacts',  tier: 'Standard + IA lifecycle',             monthlyCost: '$8' },
  // AI/ML
  { service: 'Amazon Bedrock',      category: 'AI/ML',     purpose: 'Claude for NL terminal, Titan for embeddings, Cohere for rerank',      tier: 'Pay-per-token, ~500K tokens/day',    monthlyCost: '$160' },
  { service: 'SageMaker Serverless', category: 'AI/ML',    purpose: 'Custom models: regime detection, anomaly scoring, sentiment classifier', tier: 'Serverless inference endpoints',     monthlyCost: '$55' },
  // Networking
  { service: 'API Gateway',         category: 'Network',   purpose: 'REST + WebSocket APIs, throttling, API key management',                 tier: 'HTTP API, ~5M requests/mo',          monthlyCost: '$25' },
  { service: 'CloudFront',          category: 'Network',   purpose: 'CDN for web app, API acceleration, edge caching',                       tier: '100GB transfer/mo',                  monthlyCost: '$15' },
  { service: 'ALB',                 category: 'Network',   purpose: 'Load balancing across Fargate tasks, health checks, TLS termination',   tier: '1 ALB, ~5 LCUs',                     monthlyCost: '$25' },
  { service: 'Route 53',            category: 'Network',   purpose: 'DNS, health checks, failover routing',                                  tier: '1 hosted zone',                      monthlyCost: '$2' },
  // DevOps
  { service: 'ECR',                 category: 'DevOps',    purpose: 'Container image registry for all microservices',                         tier: '~5GB images',                        monthlyCost: '$2' },
  { service: 'CodePipeline + CodeBuild', category: 'DevOps', purpose: 'CI/CD: build, test, deploy on push to main',                          tier: '1 pipeline, ~200 builds/mo',         monthlyCost: '$12' },
  { service: 'CloudWatch',          category: 'DevOps',    purpose: 'Logs, metrics, alarms, dashboards, anomaly detection',                   tier: '10 custom metrics, 5GB logs',        monthlyCost: '$20' },
  { service: 'Secrets Manager',     category: 'DevOps',    purpose: 'API keys, DB credentials, exchange secrets rotation',                    tier: '~20 secrets',                        monthlyCost: '$8' },
  // Security
  { service: 'WAF',                 category: 'Security',  purpose: 'Bot protection, rate limiting, SQL injection / XSS filtering',           tier: '1 Web ACL, 5 rules',                 monthlyCost: '$11' },
  { service: 'KMS',                 category: 'Security',  purpose: 'Encryption keys for RDS, S3, Secrets Manager',                           tier: '~5 CMKs',                            monthlyCost: '$5' },
  { service: 'VPC + NAT Gateway',   category: 'Security',  purpose: 'Private networking, NAT for outbound API calls from private subnets',    tier: '1 NAT GW (biggest single cost!)',     monthlyCost: '$32' },
  { service: 'IAM + Cognito',       category: 'Security',  purpose: 'User auth, RBAC, service-to-service auth, MFA',                          tier: '50K MAU free tier',                  monthlyCost: '$0' },
] as const;

// ── Budget breakdown ─────────────────────────────────────────────────────

export interface BudgetCategory {
  readonly category: string;
  readonly services: string;
  readonly monthlyCost: number;
  readonly percentOfBudget: string;
  readonly notes: string;
}

export const budgetBreakdown: readonly BudgetCategory[] = [
  { category: 'Compute',            services: 'ECS Fargate, Lambda, EC2 Spot',                    monthlyCost: 260,  percentOfBudget: '26%', notes: '5 Fargate tasks + Lambda + weekly spot training' },
  { category: 'Database & Cache',   services: 'RDS PostgreSQL, ElastiCache Redis, DynamoDB, S3',  monthlyCost: 93,   percentOfBudget: '9%',  notes: '3 PG databases, Redis cache, S3 data lake' },
  { category: 'AI / ML',            services: 'Bedrock (Claude/Titan), SageMaker Serverless',     monthlyCost: 215,  percentOfBudget: '22%', notes: 'NL terminal + custom model inference' },
  { category: 'Networking',         services: 'API Gateway, CloudFront, ALB, Route 53',           monthlyCost: 67,   percentOfBudget: '7%',  notes: 'CDN + API routing + load balancing' },
  { category: 'DevOps',             services: 'ECR, CodePipeline, CloudWatch, Secrets Manager',   monthlyCost: 42,   percentOfBudget: '4%',  notes: 'CI/CD + monitoring + secret rotation' },
  { category: 'Security',           services: 'WAF, KMS, VPC/NAT, IAM/Cognito',                  monthlyCost: 48,   percentOfBudget: '5%',  notes: 'NAT Gateway is the biggest line item here' },
  { category: 'Buffer / Overages',  services: 'Data transfer, burst capacity, misc',              monthlyCost: 275,  percentOfBudget: '27%', notes: 'Always budget 25-30% buffer for AWS surprises' },
] as const;

// ── Environment stages ───────────────────────────────────────────────────

export interface Environment {
  readonly name: string;
  readonly purpose: string;
  readonly infra: string;
  readonly monthlyCost: string;
  readonly ciTrigger: string;
}

export const environments: readonly Environment[] = [
  { name: 'Development',  purpose: 'Local + shared dev environment. Feature branches tested here.',            infra: 'LocalStack (free) + shared RDS dev instance',                   monthlyCost: '$0-50',   ciTrigger: 'Push to feature/*' },
  { name: 'Staging',      purpose: 'Mirror of production. Integration tests, load tests, QA review.',          infra: 'Same AWS services as prod, smaller instances',                   monthlyCost: '$200-300', ciTrigger: 'Merge to develop' },
  { name: 'Production',   purpose: 'Live platform serving users. Blue-green deployment, auto-scaling.',         infra: 'Full AWS stack, multi-AZ, CloudFront, WAF',                     monthlyCost: '$700-750', ciTrigger: 'Merge to main (manual approval)' },
] as const;

// ── Scaling roadmap ──────────────────────────────────────────────────────

export interface ScalingPhase {
  readonly phase: string;
  readonly timeline: string;
  readonly users: string;
  readonly monthlyCost: string;
  readonly keyChanges: string;
  readonly awsHighlights: string;
}

export const scalingRoadmap: readonly ScalingPhase[] = [
  {
    phase: 'Beta',
    timeline: 'Months 1-3',
    users: '50-200',
    monthlyCost: '$1,000',
    keyChanges: 'Single-AZ, minimal redundancy, free tier maximized, spot instances for training',
    awsHighlights: 'Fargate (min tasks), RDS free tier, Lambda, Bedrock pay-per-use, NAT Gateway',
  },
  {
    phase: 'Growth',
    timeline: 'Months 4-9',
    users: '200-1,500',
    monthlyCost: '$3,000-5,000',
    keyChanges: 'Multi-AZ RDS, add read replicas, upgrade Fargate tasks, add OpenSearch, increase Bedrock quota',
    awsHighlights: 'RDS Multi-AZ, ElastiCache cluster mode, SageMaker real-time endpoints, CloudWatch alarms',
  },
  {
    phase: 'Production',
    timeline: 'Months 10-18',
    users: '1,500-5,000',
    monthlyCost: '$8,000-15,000',
    keyChanges: 'Auto-scaling groups, dedicated SageMaker endpoints, Global Accelerator, reserved instances',
    awsHighlights: 'ECS auto-scaling, RDS reserved, Savings Plans, multi-region CloudFront, dedicated WAF rules',
  },
  {
    phase: 'Scale',
    timeline: 'Months 18+',
    users: '5,000+',
    monthlyCost: '$15,000-30,000',
    keyChanges: 'Multi-region active-active, dedicated Bedrock throughput, Aurora Serverless v2, EKS migration',
    awsHighlights: 'Aurora Serverless, EKS Fargate, Bedrock provisioned throughput, Graviton instances, RI/SP',
  },
] as const;

// ── AI/ML model details ──────────────────────────────────────────────────

export interface MLModel {
  readonly name: string;
  readonly purpose: string;
  readonly awsService: string;
  readonly inputOutput: string;
  readonly estimatedCost: string;
}

export const mlModels: readonly MLModel[] = [
  { name: 'NL Query Engine',       purpose: 'Natural language → structured quant queries',                awsService: 'Bedrock (Claude 3.5 Sonnet)',  inputOutput: 'User query → SQL + analysis',  estimatedCost: '$0.003/query' },
  { name: 'News Sentiment',        purpose: 'Classify 500+ articles/hr into bullish/bearish/neutral',    awsService: 'Bedrock (Claude Haiku)',       inputOutput: 'Article → sentiment + score',   estimatedCost: '$0.0003/article' },
  { name: 'Regime Detector',       purpose: 'Classify market regime: trending/ranging/volatile/crash',   awsService: 'SageMaker (custom XGBoost)',   inputOutput: '130 indicators → regime label', estimatedCost: '$0.001/inference' },
  { name: 'Anomaly Scorer',        purpose: 'Detect unusual volume/price/on-chain patterns',              awsService: 'SageMaker (Isolation Forest)', inputOutput: 'Coin features → anomaly score', estimatedCost: '$0.0005/coin' },
  { name: 'Embedding Index',       purpose: 'Semantic search across news, whitepapers, strategies',       awsService: 'Bedrock (Titan Embeddings)',   inputOutput: 'Text → 1536-dim vector',        estimatedCost: '$0.0001/embed' },
  { name: 'Strategy Optimizer',    purpose: 'Bayesian optimization of strategy parameters',                awsService: 'EC2 Spot (training only)',     inputOutput: 'Strategy params → optimal set', estimatedCost: '$0.50/optimization' },
] as const;

// ── Security layers ──────────────────────────────────────────────────────

export interface SecurityLayer {
  readonly layer: string;
  readonly implementation: string;
  readonly awsService: string;
}

export const securityLayers: readonly SecurityLayer[] = [
  { layer: 'Network',        implementation: 'VPC with public/private subnets, security groups, NACLs. All databases in private subnet.',          awsService: 'VPC, Security Groups' },
  { layer: 'Edge',            implementation: 'WAF rules: rate limiting (100 req/min), bot detection, geo-blocking, SQL injection filtering.',     awsService: 'AWS WAF + CloudFront' },
  { layer: 'Authentication',  implementation: 'JWT tokens via Cognito, MFA support, OAuth2 social login, API key management.',                     awsService: 'Cognito + API Gateway' },
  { layer: 'Authorization',   implementation: 'RBAC: Free/Signal/Edge/Enterprise tiers. Per-endpoint permissions. Service-to-service IAM roles.',  awsService: 'IAM + custom middleware' },
  { layer: 'Encryption',      implementation: 'TLS 1.3 in transit. AES-256 at rest for RDS, S3, ElastiCache. KMS-managed keys.',                   awsService: 'KMS + ACM' },
  { layer: 'Secrets',         implementation: 'All API keys, DB creds, exchange secrets in Secrets Manager with auto-rotation every 30 days.',      awsService: 'Secrets Manager' },
  { layer: 'Audit',           implementation: 'CloudTrail for all API calls. VPC Flow Logs. Access logging on S3 and ALB.',                         awsService: 'CloudTrail + CloudWatch' },
  { layer: 'Compliance',      implementation: 'No custody of user funds. No PII beyond email. GDPR-ready data deletion. SOC 2 roadmap.',            awsService: 'AWS Config + Audit Manager' },
] as const;

// ── Cost per user mapping (1K → 10K) ────────────────────────────────────
// Model assumptions:
// - Pipeline costs are per-coin (fixed) — doesn't change with users
// - User-driven: API calls, Bedrock tokens, WebSocket connections, CDN
// - Step jumps: Multi-AZ RDS at ~2K, read replicas at ~5K, dedicated ML at ~8K
// - Cache hit ratio improves with users (same coins, same indicators)
// - 25% DAU, ~5% concurrent at any given time
// - Savings Plans kick in at ~4K users (committed spend)

export interface CostPerUserRow {
  readonly users: number;
  readonly compute: number;
  readonly database: number;
  readonly aiMl: number;
  readonly network: number;
  readonly devops: number;
  readonly security: number;
  readonly buffer: number;
  readonly total: number;
  readonly perUser: number;
  readonly notes: string;
}

export const costPerUserMap: readonly CostPerUserRow[] = [
  {
    users: 1000,
    compute: 260,   // Fargate 5 tasks $180, Lambda $45, Spot $35
    database: 93,    // RDS t4g.micro (free tier) + t4g.small $65, Redis $15, Dynamo $5, S3 $8
    aiMl: 215,       // Bedrock $160 (500K tok/day), SageMaker serverless $55
    network: 67,     // API GW $25, CF $15, ALB $25, R53 $2
    devops: 42,      // ECR $2, CodePipeline $12, CloudWatch $20, Secrets $8
    security: 48,    // WAF $11, KMS $5, NAT $32
    buffer: 275,     // 27% buffer for overages
    total: 1000,
    perUser: 1.00,
    notes: 'Beta baseline. Free tier maximized. Single-AZ. Spot for training.',
  },
  {
    users: 2000,
    compute: 340,    // +2 Fargate tasks, Lambda scales
    database: 155,   // RDS Multi-AZ (t4g.small), Redis larger, Dynamo scales
    aiMl: 310,       // Bedrock ~800K tok/day, SageMaker more inferences
    network: 90,     // API GW + CF scale with requests
    devops: 48,      // CloudWatch more logs
    security: 50,    // WAF more requests
    buffer: 257,     // 25% buffer
    total: 1250,
    perUser: 0.63,
    notes: 'Multi-AZ RDS (+$60). Cache hit ratio improving — same coins, more users.',
  },
  {
    users: 3000,
    compute: 410,    // 8 Fargate tasks, Lambda higher concurrency
    database: 210,   // RDS t4g.medium Multi-AZ, Redis cluster-mode
    aiMl: 400,       // Bedrock 1.2M tok/day, more NL queries
    network: 115,    // Growing API + CDN traffic
    devops: 55,
    security: 52,
    buffer: 308,
    total: 1550,
    perUser: 0.52,
    notes: 'Cache hit >60%. Bedrock caching reduces per-query cost. RDS t4g.medium upgrade.',
  },
  {
    users: 4000,
    compute: 480,    // 10 Fargate tasks, Lambda reserved concurrency
    database: 270,   // RDS r6g.large for reads, Redis 2 nodes
    aiMl: 475,       // Bedrock 1.5M tok/day, SageMaker auto-scale
    network: 140,
    devops: 60,
    security: 55,
    buffer: 370,
    total: 1850,
    perUser: 0.46,
    notes: 'Savings Plans activated (-20% on Fargate). Read-heavy queries hit Redis first.',
  },
  {
    users: 5000,
    compute: 560,    // 12 Fargate tasks, auto-scaling enabled
    database: 350,   // RDS + read replica, Redis cluster 3 nodes, OpenSearch added
    aiMl: 540,       // Bedrock 1.8M tok/day, SageMaker real-time endpoint
    network: 170,
    devops: 68,
    security: 58,
    buffer: 434,
    total: 2180,
    perUser: 0.44,
    notes: 'Read replica added (+$80). OpenSearch for full-text search. SageMaker dedicated.',
  },
  {
    users: 6000,
    compute: 630,    // Auto-scaling group, 14 tasks peak
    database: 410,   // RDS read replica handling 40% of reads
    aiMl: 610,       // Bedrock prompt caching saves 30%
    network: 200,
    devops: 75,
    security: 60,
    buffer: 495,
    total: 2480,
    perUser: 0.41,
    notes: 'Bedrock prompt caching cuts token cost 30%. Fargate Spot for non-critical tasks.',
  },
  {
    users: 7000,
    compute: 690,    // 16 tasks, Graviton instances -20% cost
    database: 480,   // 2nd read replica, Redis 4 nodes
    aiMl: 670,       // SageMaker batch transform for bulk scoring
    network: 225,
    devops: 82,
    security: 62,
    buffer: 541,
    total: 2750,
    perUser: 0.39,
    notes: 'Graviton (ARM) instances save 20%. 2nd read replica. Batch ML scoring.',
  },
  {
    users: 8000,
    compute: 760,    // ECS auto-scaling mature, Fargate Spot mix
    database: 560,   // Aurora Serverless v2 migration considered
    aiMl: 730,       // Bedrock provisioned throughput for predictable cost
    network: 255,
    devops: 88,
    security: 65,
    buffer: 592,
    total: 3050,
    perUser: 0.38,
    notes: 'Bedrock provisioned throughput locks in price. Aurora Serverless eval for auto-scaling DB.',
  },
  {
    users: 9000,
    compute: 820,
    database: 620,   // Aurora Serverless v2, ElastiCache cluster 6 nodes
    aiMl: 785,
    network: 280,
    devops: 95,
    security: 68,
    buffer: 632,
    total: 3300,
    perUser: 0.37,
    notes: 'Aurora Serverless v2 auto-scales DB capacity. RI commitment on Redis.',
  },
  {
    users: 10000,
    compute: 880,    // Mature auto-scaling, Fargate Spot 30% of fleet
    database: 690,   // Aurora + 2 replicas, Redis 8 nodes, DynamoDB DAX
    aiMl: 840,       // Full Bedrock provisioned + SageMaker multi-model endpoint
    network: 310,    // Global Accelerator for latency
    devops: 100,
    security: 70,
    buffer: 710,
    total: 3600,
    perUser: 0.36,
    notes: 'Economies of scale. 64% cost reduction per user vs 1K. Infrastructure mature.',
  },
] as const;

// ── Fixed vs Variable cost breakdown ─────────────────────────────────────
// Fixed: costs that don't change (or barely change) regardless of user count
// Variable: costs that scale linearly (or near-linearly) with user traffic

export interface FixedVarItem {
  readonly service: string;
  readonly type: 'fixed' | 'variable' | 'semi-variable';
  readonly baseCost: number;       // Monthly at 1K users
  readonly costAt10K: number;      // Monthly at 10K users
  readonly scaleFactor: string;    // What drives cost growth
  readonly awsService: string;
  readonly notes: string;
}

export const fixedVarBreakdown: readonly FixedVarItem[] = [
  // ── FIXED COSTS (don't change with users) ──
  { service: 'NAT Gateway',           type: 'fixed',          baseCost: 32,  costAt10K: 32,   scaleFactor: 'None — flat fee',                   awsService: 'VPC',              notes: 'Biggest fixed line item. $0.045/hr + $0.045/GB. Base transfer is minimal.' },
  { service: 'ALB (base)',             type: 'fixed',          baseCost: 22,  costAt10K: 22,   scaleFactor: 'None — hourly charge',               awsService: 'ELB',              notes: '$0.0225/hr base. LCU charges are variable (see below).' },
  { service: 'Route 53',              type: 'fixed',          baseCost: 2,   costAt10K: 2,    scaleFactor: 'None — 1 hosted zone',               awsService: 'Route 53',         notes: '$0.50/hosted zone + $0.40/M queries (negligible at this scale).' },
  { service: 'ECR (Container Registry)', type: 'fixed',       baseCost: 2,   costAt10K: 3,    scaleFactor: 'Negligible — image storage',          awsService: 'ECR',              notes: '~5-8 GB of container images. Barely changes.' },
  { service: 'CodePipeline + CodeBuild', type: 'fixed',       baseCost: 12,  costAt10K: 15,   scaleFactor: 'Build frequency (not users)',         awsService: 'CodePipeline',     notes: '1 pipeline $1/mo + build minutes. More deploys at scale, but minimal.' },
  { service: 'Secrets Manager',        type: 'fixed',          baseCost: 8,   costAt10K: 10,   scaleFactor: 'Number of secrets (not users)',       awsService: 'Secrets Manager',  notes: '$0.40/secret/mo. ~20 secrets → 25 secrets at scale.' },
  { service: 'KMS',                    type: 'fixed',          baseCost: 5,   costAt10K: 7,    scaleFactor: 'Number of keys (not users)',          awsService: 'KMS',              notes: '$1/key/mo. 5 CMKs → 7 CMKs at scale.' },
  { service: 'WAF (base rules)',       type: 'fixed',          baseCost: 6,   costAt10K: 6,    scaleFactor: 'None — per Web ACL',                  awsService: 'WAF',              notes: '$5/Web ACL + $1/rule. Rules don\'t change with users.' },
  { service: 'Cognito',               type: 'fixed',          baseCost: 0,   costAt10K: 0,    scaleFactor: 'Free up to 50K MAU',                  awsService: 'Cognito',          notes: 'Free tier covers up to 50K monthly active users.' },
  { service: 'Data Pipeline (per-coin)', type: 'fixed',       baseCost: 120, costAt10K: 130,  scaleFactor: 'Number of coins, not users',          awsService: 'ECS Fargate',      notes: 'Processing 1,000+ coins costs the same whether 1 user or 10K read the output.' },

  // ── VARIABLE COSTS (scale with users) ──
  { service: 'Bedrock LLM tokens',    type: 'variable',       baseCost: 160, costAt10K: 720,  scaleFactor: 'NL queries per user (~3-5/day)',      awsService: 'Bedrock',          notes: 'Biggest variable cost. ~$0.003/query × queries/day × users. Prompt caching helps.' },
  { service: 'SageMaker inference',    type: 'variable',       baseCost: 55,  costAt10K: 120,  scaleFactor: 'Real-time model calls',               awsService: 'SageMaker',        notes: 'Regime detection, anomaly scoring per user request. Batch scoring amortizes cost.' },
  { service: 'API Gateway requests',   type: 'variable',       baseCost: 25,  costAt10K: 180,  scaleFactor: 'API calls (~50-100/user/day)',         awsService: 'API Gateway',      notes: '$1/M requests. 10K users × 75 calls/day = 22.5M requests/mo.' },
  { service: 'CloudFront transfer',    type: 'variable',       baseCost: 15,  costAt10K: 130,  scaleFactor: 'Page loads, API responses',            awsService: 'CloudFront',       notes: '$0.085/GB. Dashboard-heavy app, ~1-3 MB/session. More users = more GB.' },
  { service: 'Lambda invocations',     type: 'variable',       baseCost: 45,  costAt10K: 200,  scaleFactor: 'Events per user (queries, alerts)',    awsService: 'Lambda',           notes: 'NL terminal, notifications, transforms. ~20-30 invocations/user/day.' },
  { service: 'DynamoDB reads/writes',  type: 'variable',       baseCost: 5,   costAt10K: 45,   scaleFactor: 'Session lookups, API key checks',     awsService: 'DynamoDB',         notes: 'On-demand pricing. More users = more session reads.' },
  { service: 'WAF requests',          type: 'variable',       baseCost: 5,   costAt10K: 35,   scaleFactor: 'All inbound HTTP requests',            awsService: 'WAF',              notes: '$0.60/M requests inspected.' },

  // ── SEMI-VARIABLE (step functions — jump at thresholds) ──
  { service: 'ECS Fargate tasks',      type: 'semi-variable',  baseCost: 180, costAt10K: 680,  scaleFactor: 'Step: +2 tasks per ~2K users',        awsService: 'ECS Fargate',      notes: 'Fixed within each step. 5 tasks at 1K → 16 tasks at 10K. Graviton saves 20%.' },
  { service: 'RDS PostgreSQL',         type: 'semi-variable',  baseCost: 65,  costAt10K: 540,  scaleFactor: 'Step: instance size + read replicas',  awsService: 'RDS',              notes: 't4g.micro → t4g.medium → r6g.large + replicas. Big jumps at 2K, 5K, 8K.' },
  { service: 'ElastiCache Redis',      type: 'semi-variable',  baseCost: 15,  costAt10K: 150,  scaleFactor: 'Step: node count + cluster mode',      awsService: 'ElastiCache',      notes: '1 node → 3 (cluster) → 6-8 nodes. Jumps at 3K and 7K users.' },
  { service: 'CloudWatch logs/metrics', type: 'semi-variable', baseCost: 20,  costAt10K: 75,   scaleFactor: 'Log volume + custom metrics',          awsService: 'CloudWatch',       notes: 'More services = more logs. $0.50/GB ingestion. Step up with each new service.' },
  { service: 'EC2 Spot (ML training)', type: 'semi-variable',  baseCost: 35,  costAt10K: 80,   scaleFactor: 'Training frequency, not user count',   awsService: 'EC2',              notes: 'More models to retrain as product matures, but not directly user-driven.' },
  { service: 'S3 storage',            type: 'semi-variable',  baseCost: 8,   costAt10K: 35,   scaleFactor: 'Data accumulates over time',           awsService: 'S3',               notes: 'Grows ~2-5 GB/mo. More about age of platform than user count.' },
] as const;

// Summary totals for fixed/variable at 1K and 10K
export const fixedVarSummary = {
  fixed:        { at1K: 209, at10K: 227,  pctOfTotal1K: '21%', pctOfTotal10K: '6%' },
  variable:     { at1K: 310, at10K: 1430, pctOfTotal1K: '31%', pctOfTotal10K: '40%' },
  semiVariable: { at1K: 323, at10K: 1560, pctOfTotal1K: '32%', pctOfTotal10K: '43%' },
  buffer:       { at1K: 158, at10K: 383,  pctOfTotal1K: '16%', pctOfTotal10K: '11%' },
  total:        { at1K: 1000, at10K: 3600 },
} as const;
