import '../../styles/site.css';
import { NavBar, Footer } from './shared';

export function InvitePage() {
  return (
    <div className="site-light">
      <NavBar active={null} />
      <main style={{ paddingTop: 64, minHeight: '72vh', display: 'flex', alignItems: 'center' }}>
        <section style={{ padding: '70px 0', width: '100%' }}>
          <div className="wrap" style={{ maxWidth: 560, textAlign: 'center' }}>
            <span className="mono" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.14em', color: 'var(--emerald)' }}>BETA · INVITE ONLY</span>
            <h1 className="display" style={{ fontSize: 'clamp(38px,5vw,58px)', margin: '14px 0 12px' }}><span className="line-mask"><span className="line-in" style={{ animationDelay: '.08s' }}>Request an Invite</span></span></h1>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 28, lineHeight: 1.6 }}>Built. Validated. Now open to a few more traders.</p>
            <a href="#" className="btn-primary cta-early-access-trigger" style={{ padding: '1rem 2rem', fontSize: 15, display: 'inline-flex' }}>Request an Invite →</a>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 18 }}>
              Running a desk or fund? <a href="#/institutional" style={{ color: 'var(--emerald)', fontWeight: 600 }}>Talk to us →</a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default InvitePage;
