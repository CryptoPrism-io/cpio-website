import { DeckSlide } from '../DeckSlide';

const proofCards = [
  {
    label: 'CryptoPrism',
    title: 'Built the platform',
    stats: '17 repos · 1,000+ coins · 130+ indicators · 3 databases',
  },
  {
    label: 'Times Internet',
    title: 'Led AI architecture',
    stats: 'Foundation database for India · technical strategy · system design',
  },
  {
    label: 'Isha Foundation',
    title: 'Shipped a game',
    stats: '50K downloads · 110 countries · 2M digital reach',
  },
  {
    label: 'Gamerz Nation',
    title: 'Built revenue',
    stats: '7 franchises · Rs 1.4 Cr Y1 revenue · 35% gross margin',
  },
] as const;

const careerHighlights = [
  {
    period: '2025-Present',
    role: 'Founder & Director',
    company: 'CryptoPrism / Trinetry Infotech',
    metric: '17 repos',
  },
  {
    period: '2024-2025',
    role: 'Chief Tech Architect Consultant',
    company: 'Times Internet',
    metric: 'India foundation DB',
  },
  {
    period: '2023-2024',
    role: 'Credit Card Product & AI/ML',
    company: 'Tesco Bank -> Barclays',
    metric: '10,000+ customers',
  },
  {
    period: '2022-2023',
    role: 'MSc FinTech',
    company: 'Strathclyde Business School, UK',
    metric: '87% -> 59% false positives',
  },
  {
    period: '2020-2021',
    role: 'Product Lead',
    company: 'Isha Foundation',
    metric: '50K downloads',
  },
  {
    period: '2018-2020',
    role: 'Founder & CEO',
    company: 'Gamerz Nation Esports',
    metric: 'Rs 1.4 Cr Y1 revenue',
  },
  {
    period: '2016-2018',
    role: 'QA Lead',
    company: 'Ubisoft',
    metric: '250K first-day users',
  },
] as const;

export function SlideFounder() {
  return (
    <DeckSlide id="founder" number={16}>
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="max-w-4xl">
          <div className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.34em] text-gray-500">
            Founder evidence / career arc
          </div>
          <h2 className="mt-1.5 font-display text-3xl md:text-5xl font-semibold tracking-tight text-white leading-[0.92]">
            Why this founder fits this problem
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-gray-400 leading-relaxed">
            Same pattern across roles: build systems, ship product, and show numbers.
            CryptoPrism is the current version of that track record.
          </p>
        </div>

        <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
          {proofCards.map((card) => (
            <div key={card.label} className="glass-card rounded-2xl p-3">
              <div className="text-[9px] font-mono uppercase tracking-[0.28em] text-gray-500">
                {card.label}
              </div>
              <div className="mt-1.5 text-sm font-semibold text-white tracking-tight">
                {card.title}
              </div>
              <div className="mt-2 text-[11px] font-mono uppercase tracking-[0.12em] text-[#047857] leading-relaxed">
                {card.stats}
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-3 xl:grid-cols-[1.35fr_0.95fr] items-start">
          <div className="glass-card rounded-[26px] p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.28em] text-gray-500">
                  Career highlights
                </div>
                <div className="mt-1 text-lg md:text-xl font-semibold text-white tracking-tight">
                  Selected roles and major outcomes
                </div>
              </div>
              <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-gray-500">
                descending order
              </div>
            </div>

            <div className="mt-3 grid gap-2">
              {careerHighlights.map((item) => (
                <div
                  key={item.period}
                  className="grid grid-cols-[0.9fr_1.25fr_1.65fr] gap-3 items-center rounded-2xl border border-white/10 bg-black/10 px-3 py-2.5"
                >
                  <div>
                    <div className="text-[9px] font-mono uppercase tracking-[0.16em] text-gray-500">
                      {item.period}
                    </div>
                    <div className="mt-1 text-xs md:text-sm font-semibold text-white tracking-tight">
                      {item.role}
                    </div>
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">
                    {item.company}
                  </div>
                  <div className="text-xs md:text-sm font-semibold text-[#047857] leading-tight">
                    {item.metric}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="glass-card terminal-green rounded-[24px] p-4">
              <div className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.28em] text-gray-500">
                Founder profile
              </div>
              <div className="mt-3 flex items-end justify-between gap-3 border-b border-white/10 pb-3">
                <div>
                  <div className="text-lg md:text-xl font-semibold tracking-tight text-white">
                    Yogesh Sahu
                  </div>
                  <div className="mt-1 text-xs md:text-sm text-[#047857] font-mono uppercase tracking-[0.16em]">
                    Founder & Director
                  </div>
                </div>
                <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-gray-500">
                  Trinetry Infotech
                </div>
              </div>

              <div className="mt-3 grid gap-2 text-sm text-gray-300">
                <div className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#047857] shrink-0" />
                  <span>MSc FinTech with portfolio optimisation and AML work.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#047857] shrink-0" />
                  <span>Ex-Barclays and Times Internet architect with product delivery experience.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#047857] shrink-0" />
                  <span>Built and shipped products used across 110 countries.</span>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-[24px] p-4">
              <div className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.28em] text-gray-500">
                Board support
              </div>
              <div className="mt-3 flex items-end justify-between gap-3 border-b border-white/10 pb-3">
                <div>
                  <div className="text-lg md:text-xl font-semibold tracking-tight text-white">
                    Umesh Sahu
                  </div>
                  <div className="mt-1 text-xs md:text-sm text-gray-400 font-mono uppercase tracking-[0.16em]">
                    Non-executive Director
                  </div>
                </div>
                <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-gray-500">
                  Advisory depth
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-300">
                {[
                  'Ex-Defense Officer',
                  '30yr Industrialist',
                  'MBA Marketing',
                  'Business Strategy',
                ].map((tag) => (
                  <div key={tag} className="rounded-xl border border-white/10 bg-black/10 px-3 py-2">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-[9px] md:text-[10px] font-mono uppercase tracking-[0.26em] text-gray-600">
          Trinetry Infotech Private Limited &middot; Established November 2025 &middot; India
        </p>
      </div>
    </DeckSlide>
  );
}
