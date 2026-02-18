import { DeckSlide } from '../DeckSlide';

const contactChannels = [
  {
    label: 'Partnerships',
    value: 'partnerships@cryptoprism.io',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4-4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    color: '#3b82f6',
  },
  {
    label: 'Investment Inquiries',
    value: 'invest@cryptoprism.io',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    color: '#0ecb81',
  },
  {
    label: 'General',
    value: 'hello@cryptoprism.io',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4l-10 8L2 4" />
      </svg>
    ),
    color: '#f0b90b',
  },
] as const;

const socialLinks = [
  { label: 'Website', value: 'cryptoprism-io.web.app', color: '#0ecb81' },
  { label: 'X / Twitter', value: '@cryptoprism_io', color: '#1d9bf0' },
  { label: 'LinkedIn', value: 'linkedin.com/company/cryptoprism-io', color: '#0a66c2' },
] as const;

export function SlideThankYou() {
  return (
    <DeckSlide id="thankyou" number={19}>
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.svg"
            alt="CryptoPrism"
            className="w-10 h-10 md:w-12 md:h-12"
            style={{ filter: 'drop-shadow(0 0 8px rgba(14,203,129,0.5))' }}
          />
          <span className="font-display text-xl md:text-2xl font-extrabold tracking-tighter text-white uppercase">
            Crypto Prism
          </span>
        </div>

        <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-center">
          Thank <span className="text-[#0ecb81]">you.</span>
        </h2>

        <p className="text-gray-400 text-sm text-center max-w-lg">
          We're building the intelligence layer that 659M crypto traders deserve.
          <br />
          Let's talk about how we can work together.
        </p>

        {/* Contact cards */}
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-3">
          {contactChannels.map((ch) => (
            <div
              key={ch.label}
              className="glass-card rounded-lg p-4 border-t-2 flex flex-col items-center gap-2 text-center"
              style={{ borderTopColor: ch.color }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${ch.color}20`, color: ch.color }}
              >
                {ch.icon}
              </div>
              <span className="text-gray-400 text-[10px] font-mono uppercase tracking-wider">
                {ch.label}
              </span>
              <span className="text-white text-xs font-bold font-mono">{ch.value}</span>
            </div>
          ))}
        </div>

        {/* Social links */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {socialLinks.map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="text-gray-500 text-[10px] font-mono">{s.label}:</span>
              <span className="text-xs font-mono font-bold" style={{ color: s.color }}>
                {s.value}
              </span>
            </div>
          ))}
        </div>

        {/* Founder contact */}
        <div className="glass-card rounded-lg px-5 py-3 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#0ecb81]/20 flex items-center justify-center shrink-0">
            <span className="text-[#0ecb81] font-bold text-sm">YS</span>
          </div>
          <div>
            <span className="text-white text-sm font-bold block">Yogesh Sahu</span>
            <span className="text-gray-400 text-[10px] font-mono">
              Founder & Director &middot; Trinetry Infotech Private Limited
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-[10px] font-mono text-center">
          Trinetry Infotech Private Limited &middot; Established November 2025 &middot; India
        </p>
      </div>
    </DeckSlide>
  );
}
