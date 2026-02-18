import { DeckSlide } from '../DeckSlide';

const careerArc = [
  {
    period: '2016-2018',
    role: 'QA Lead',
    company: 'Ubisoft',
    highlight: 'Assassin\'s Creed Odyssey, For Honor — influenced shift from P2P to dedicated servers. 250K first-day users.',
    color: '#3b82f6',
  },
  {
    period: '2018-2020',
    role: 'Founder & CEO',
    company: 'Gamerz Nation Esports',
    highlight: 'Bootstrapped to 7 franchises in 18 months. Rs 1.4 Cr Y1 revenue, 35% gross margin. NVIDIA, ASUS ROG partnerships.',
    color: '#ff9900',
  },
  {
    period: '2020-2021',
    role: 'Product Lead',
    company: 'Isha Foundation',
    highlight: 'Built mobile game "Kari and the Lost Shrines" — 11-person team, 21-day delivery. 50K downloads, 110 countries, 2M digital reach.',
    color: '#8b5cf6',
  },
  {
    period: '2022-2023',
    role: 'MSc FinTech',
    company: 'Strathclyde Business School, UK',
    highlight: 'Genetic algorithm portfolio optimization across 1,000+ cryptos. AML fraud detection — cut false positives from 87% to 59%.',
    color: '#0ecb81',
  },
  {
    period: '2023-2024',
    role: 'Credit Card Product & AI/ML',
    company: 'Tesco Bank → Barclays',
    highlight: 'Optimized AI/ML algorithms for credit card product decisioning. KYC/AML analytics for 10,000+ customers.',
    color: '#f0b90b',
  },
  {
    period: '2024-2025',
    role: 'Chief Tech Architect Consultant',
    company: 'Times Internet (AI Bharat Verse)',
    highlight: 'Architected AI-first platform to create a foundation database of all things India. Led technical strategy and system design.',
    color: '#ff4d4d',
  },
] as const;

export function SlideFounder() {
  return (
    <DeckSlide id="founder" number={16}>
      <div className="flex flex-col items-center gap-5">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-white text-center">
          Why <span className="text-[#0ecb81]">this founder</span> for this problem
        </h2>

        <p className="text-gray-500 text-xs text-center max-w-lg">
          A decade of shipping products at the intersection of gaming, fintech, and AI.
          From Ubisoft to Barclays to building CryptoPrism.
        </p>

        {/* Career timeline */}
        <div className="w-full max-w-4xl space-y-2">
          {careerArc.map((item, i) => (
            <div key={item.period} className="flex items-start gap-3">
              {/* Timeline dot + line */}
              <div className="flex flex-col items-center pt-1.5 shrink-0 w-3">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                {i < careerArc.length - 1 && <div className="w-px flex-1 bg-gray-800 mt-1" />}
              </div>

              {/* Card */}
              <div className="glass-card rounded-lg px-4 py-3 flex-1 border-l-2" style={{ borderLeftColor: item.color }}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold" style={{ color: item.color }}>{item.role}</span>
                    <span className="text-gray-500 text-[10px]">@ {item.company}</span>
                  </div>
                  <span className="text-gray-600 text-[10px] font-mono">{item.period}</span>
                </div>
                <p className="text-gray-400 text-[11px] leading-relaxed">{item.highlight}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Founder card */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="glass-card terminal-green rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#0ecb81]/20 flex items-center justify-center">
                <span className="text-[#0ecb81] font-bold text-sm">YS</span>
              </div>
              <div>
                <span className="text-white text-sm font-bold block">Yogesh Sahu</span>
                <span className="text-[#0ecb81] text-[10px] font-mono uppercase tracking-wider">Founder & Director</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['MSc FinTech (UK)', 'Ex-Ubisoft', 'Ex-Barclays', 'PSPO Certified', 'Bootstrapped to Rs 1.4Cr', 'Shipped to 110 countries'].map((tag) => (
                <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#0ecb81]/10 text-[#0ecb81] border border-[#0ecb81]/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center">
                <span className="text-gray-400 font-bold text-sm">US</span>
              </div>
              <div>
                <span className="text-white text-sm font-bold block">Umesh Sahu</span>
                <span className="text-gray-400 text-[10px] font-mono uppercase tracking-wider">Non-Executive Director</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['Ex-Defense Officer', '30yr Industrialist', 'MBA Marketing', 'Business Strategy'].map((tag) => (
                <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-gray-700/30 text-gray-400 border border-gray-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-[10px] font-mono text-center max-w-lg">
          Trinetry Infotech Private Limited &middot; Established November 2025 &middot; India
        </p>
      </div>
    </DeckSlide>
  );
}
