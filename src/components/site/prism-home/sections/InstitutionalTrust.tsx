// Screen 4 — "Stat-Led" section (Hallmark redesign 2026-07-22, attempt 2).
// Replaces the v5 centred head + 3x2 grid of six identical icon-tile cards +
// rounded dark stat panel.
//
// THE SHAPE: this screen's job is credibility, so it leads with the one figure
// an institutional buyer actually weighs — the DMV score's 0.896 AUC — paired
// with the worded headline (a lead figure must never stand alone). The other
// four verified numbers qualify it from a hairline strip beneath, and the six
// capabilities follow as a spec sheet: claim + proof, because that is what
// they are, not features that happen to need icons.
//
// Attempt 1 stacked head -> full-width dark band -> a 3-column table. It was
// honest but flat — everything below the band carried the same weight, so the
// screen had no subject and the "what it means" column made it read grey. That
// column is gone; its content lived on the cards as `desc` and is the least
// load-bearing copy in the section.
//
// WHAT WAS REMOVED, and why:
//   - The six icon-tile cards. Rounded rectangle + icon in a tinted square +
//     title + two lines + hairline + two check bullets, x6 in a 3-column grid,
//     is the single most-generated layout on the web.
//   - The 01-06 numbering. Ordinal labels on a set that has no order.
//   - The "THE PLATFORM" pill — the Feature Showcase directly above uses that
//     exact label, so the page said "THE PLATFORM" twice in a row.
//   - The gradient-filled headline (no genre allows background-clip text).
//   - Every icon in the section. Their stroke weights ran 1.5-1.8 against the
//     nav/footer marks at 1.8, so the page drew one logo at three weights.
//   - The rounded dark card. The dark treatment now belongs to the lead
//     figure alone, which is what makes it read as the focal point.
//
// CONTRAST: the old panel set #5B6672 on #0B1220 (3.2:1, failed AA at 12px)
// and #98A2B3 on white (2.6:1). Both replaced by tokens that pass.
//
// Section id + data-page unchanged: #prism-trust is a footer deep-link target
// and data-page="" keeps this a full-vh fitPages snap page.

import { useIsMobile } from '../hooks';

// Every figure here is verified against docs_revamp/02-market-primer-notes.md.
// Do not add one without a source. (The six unsourced stats in Problem.tsx are
// a separate open item — see the audit.)
const LEAD = { v: '0.896', q: 'AUC · DMV Score', s: 'Direction · Magnitude · Volatility' };

const SUPPORT = [
  { v: '130+', l: 'Indicators Tracked', s: 'Technical, on-chain & sentiment' },
  { v: '1,000+', l: 'Coins Covered', s: 'Across major digital assets' },
  { v: '6', l: 'Blockchains Unified', s: 'Cross-chain on-chain intelligence' },
  { v: '44', l: 'News & Social Sources', s: 'Aggregated & sentiment-scored' },
];

// `proof` is each card's original bullet pair, joined. 2026-07-20 corrections
// preserved — no SOC 2 claim, no VPC/air-gapped/SLA claims, no uptime figure.
const SPEC: { name: string; proof: string }[] = [
  { name: 'Explainable AI', proof: 'Rationale for every output · human-in-the-loop review' },
  { name: 'Enterprise Security', proof: 'End-to-end encryption · role-based access control' },
  { name: 'APIs & Integrations', proof: 'REST & WebSocket APIs · plug-and-play SDKs' },
  { name: 'Audit Trail', proof: 'Immutable logs · versioned data lineage' },
  { name: 'Private Deployment', proof: 'Cloud, hybrid or on-prem options · data isolation by design' },
  { name: 'Continuous Learning', proof: 'Adaptive models · always improving' },
];

// Reframed 2026-07-20 as target audience, not existing paying clients.
const BUILT_FOR = ['Hedge Funds', 'Fintechs', 'Exchanges', 'Family Offices', 'Research Firms', 'Asset Managers'];

export function InstitutionalTrust() {
  const isMobile = useIsMobile();

  return (
    <section
      id="prism-trust"
      data-page=""
      style={{
        position: 'relative', background: '#FAFAF8', boxSizing: 'border-box',
        padding: isMobile ? '64px 20px 40px' : '48px 44px 40px',
      }}
    >
      <div className="prism-trust__top">
        <div className="prism-trust__head">
          <h2>
            Why institutions choose <em>CryptoPrism.</em>
          </h2>
          <p className="prism-trust__lede">
            Purpose-built for the highest standards of intelligence, security and performance &mdash; and for the funds, fintechs and research teams that have to show their work.
          </p>
        </div>

        {/* H4 · the lead figure — the screen's only dark element */}
        <div className="prism-trust__figure">
          <b>{LEAD.v}</b>
          <div className="prism-trust__figure-q">{LEAD.q}</div>
          <div className="prism-trust__figure-s">{LEAD.s}</div>
        </div>
      </div>

      {/* T4 · supporting figures */}
      <div className="prism-trust__support">
        {SUPPORT.map((p) => (
          <div key={p.l}>
            <div className="prism-trust__stat">{p.v}</div>
            <div className="prism-trust__stat-l">{p.l}</div>
            <div className="prism-trust__stat-s">{p.s}</div>
          </div>
        ))}
      </div>

      {/* F3 · the spec sheet */}
      <table className="prism-trust__spec">
        <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' }}>
          CryptoPrism platform capabilities and the proof behind each one
        </caption>
        <tbody>
          {SPEC.map((s) => (
            <tr key={s.name}>
              <th scope="row">{s.name}</th>
              <td className="prism-trust__proofs">{s.proof}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <dl className="prism-trust__for">
        <dt>Built for</dt>
        {BUILT_FOR.map((b, i) => (
          <dd key={b}>{b}{i < BUILT_FOR.length - 1 ? ' ·' : ''}</dd>
        ))}
      </dl>
    </section>
  );
}
