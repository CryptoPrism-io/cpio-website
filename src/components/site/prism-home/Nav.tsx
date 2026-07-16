import { scrollToId } from '../hooks';

export function Nav() {
  return (
    <nav className="prism-nav">
      <div className="prism-nav__brand">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
          <path d="M15 2.5 25.8 8.75v12.5L15 27.5 4.2 21.25V8.75Z" stroke="#0FAE72" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M15 10.5 19 17h-8Z" stroke="#0B8D84" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        <span className="prism-nav__wordmark">CryptoPrism<span style={{ color: '#0FAE72' }}>.</span></span>
      </div>
      <div className="prism-nav__links">
        <a onClick={() => scrollToId('prism-platform')}>Platform</a>
        <a onClick={() => scrollToId('prism-enterprise')}>Enterprise</a>
        <a onClick={() => scrollToId('prism-faq')}>FAQ</a>
      </div>
      <a href="#" className="prism-btn-primary cta-early-access-trigger">Request Early Access</a>
    </nav>
  );
}
