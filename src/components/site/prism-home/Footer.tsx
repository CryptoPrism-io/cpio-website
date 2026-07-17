export function Footer() {
  return (
    <footer style={{ background: '#050B14', padding: '22px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="prism-wrap" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 11, color: '#8B96A5' }}>
          Trinetry Infotech Pvt Ltd &middot; CIN U62099PN2025PTC247965 &middot; Pune, India
        </span>
        <span style={{ fontSize: 11, color: '#8B96A5', fontStyle: 'italic' }}>
          Source-cited research infrastructure. Not investment advice. No price predictions.
        </span>
      </div>
    </footer>
  );
}
