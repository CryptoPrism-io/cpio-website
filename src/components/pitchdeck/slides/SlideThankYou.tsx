import { DeckSlide } from '../DeckSlide';

export function SlideThankYou() {
  return (
    <DeckSlide id="thankyou" number={22}>
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

        {/* Founder contact card */}
        <div className="glass-card rounded-xl px-8 py-6 flex flex-col items-center gap-4 max-w-md w-full">
          <div className="w-14 h-14 rounded-full bg-[#0ecb81]/20 flex items-center justify-center">
            <span className="text-[#0ecb81] font-bold text-lg">YS</span>
          </div>
          <div className="text-center">
            <span className="text-white text-lg font-bold block">Yogesh Sahu</span>
            <span className="text-[#0ecb81] text-[10px] font-mono uppercase tracking-wider">
              Founder & Director
            </span>
          </div>

          {/* Contact details */}
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4l-10 8L2 4" />
              </svg>
              <span className="text-white text-sm font-mono">yogesh.sahu@cryptoprism.io</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span className="text-white text-sm font-mono">+91 9823383230</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              <span className="text-white text-sm font-mono">linkedin.com/in/yogeshsahu-</span>
            </div>
          </div>
        </div>

        {/* Social / web links */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-[10px] font-mono">Website:</span>
            <span className="text-[#0ecb81] text-xs font-mono font-bold">cryptoprism-io.web.app</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-[10px] font-mono">X / Twitter:</span>
            <span className="text-[#1d9bf0] text-xs font-mono font-bold">@cryptoprism_io</span>
          </div>
        </div>

        <p className="text-gray-600 text-[10px] font-mono text-center">
          Trinetry Infotech Private Limited &middot; Established November 2025 &middot; India
        </p>
      </div>
    </DeckSlide>
  );
}
