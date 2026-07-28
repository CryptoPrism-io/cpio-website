// Bottom page — "Conversational FAQ" macrostructure (Hallmark redesign
// 2026-07-22). Replaces the v5 dark CTA-hero + 2-column accordion-card grid +
// closing CTA bar.
//
// THE SHAPE: an asymmetric diptych. The closing argument holds the narrow left
// column; the questions run down the wide right column as a hairline-ruled
// document. The page reads like an honest interview at the end, not a third
// marketing panel. Screens 2-4 are all centre-axis, so the page's last word is
// deliberately off-axis.
//
// WHAT WAS REMOVED, and why:
//   - The closing "Ready to see the future of crypto intelligence?" CTA bar.
//     This screen carried THREE CTA clusters (top buttons, badge row, bottom
//     bar) and every one of them opened the same modal. One door out is the
//     macrostructure's rule and the honest count.
//   - The four trust badges (Private Beta / Enterprise Ready / AI Native /
//     Explainable). Four contentless adjectives with icons. Replaced by one
//     factual line that matches what the FAQ already says.
//   - PrismDecoration, the animated prism-triangle SVG. Its two SMIL
//     <animateMotion> loops were NOT covered by the page's reduced-motion rule
//     (that rule kills CSS `animation`, which SMIL is not), so they kept
//     moving for users who asked for stillness. The right column is now the
//     question document, so there is no space for it either.
//   - The extra radial bloom overlay — AuroraBackdrop's calm variant already
//     carries the section's atmosphere.
//
// ACCESSIBILITY: the accordion is now <details>/<summary>. The previous
// implementation was a <div onClick> with no role, no tabIndex and no key
// handler — the entire FAQ was unreachable by keyboard. Native <details> gives
// keyboard operation, focus, and expanded state for free.
//
// Section id + data-page are unchanged: #prism-faq is the footer's deep-link
// target and data-page="" keeps this a full-vh fitPages snap page.

import { useRef } from 'react';
import type { ReactNode } from 'react';
import { useIsMobile } from '../hooks';
import { AuroraBackdrop } from '../AuroraBackdrop';

const ARROW: ReactNode = (
  <svg width="15" height="13" viewBox="0 0 16 14" fill="none" aria-hidden="true">
    <path d="M1 7h13M9.5 1.8 14.7 7l-5.2 5.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FAQ_ITEMS = [
  {
    q: 'What data does CryptoPrism use?',
    // Corrected 2026-07-22: the previous answer claimed "thousands of sources",
    // which contradicted the 14+ / 44 figures stated elsewhere on the same
    // page. The quantity claim is dropped rather than picking a number.
    a: 'We aggregate and normalise market data, on-chain metrics, news, social and macroeconomic sources into one comparable view, so every signal is scored against the same baseline.',
  },
  {
    q: 'Is CryptoPrism for retail or institutions?',
    a: 'CryptoPrism is built for institutions, teams, and serious investors. Our infrastructure, security, and features are designed to meet enterprise-grade requirements.',
  },
  {
    q: 'Can I connect CryptoPrism via APIs?',
    a: 'Yes. We offer REST and WebSocket APIs, real-time data streams, and SDKs so you can integrate CryptoPrism into your existing workflows and products.',
  },
  {
    q: 'Is the AI explainable?',
    a: 'Every insight, score, and recommendation comes with clear rationale, source attribution, and impact analysis — so you always know why something matters.',
  },
  {
    q: 'When is the beta available?',
    a: 'We’re onboarding select teams now. Request early access to join the private beta and shape the roadmap while it is still being set.',
  },
  // Keeps the prior no-dummy-data correction: no SOC 2 / compliance claim.
  {
    q: 'How is my data secured?',
    a: 'We use enterprise-grade encryption and strict access controls to protect your data at every layer.',
  },
];

export function FinalCtaFaq() {
  const isMobile = useIsMobile();
  const askRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="prism-faq"
      data-page=""
      style={{
        position: 'relative', background: '#050B14', overflow: 'hidden', boxSizing: 'border-box',
        padding: isMobile ? '64px 20px 72px' : '56px 44px',
        marginTop: isMobile ? 56 : 0,
      }}
    >
      <AuroraBackdrop variant="calm" />

      <div className="prism-close__grid">
        {/* the closing argument — narrow column, one door out */}
        <div className="prism-close__say">
          <h2>
            Turn fragmented markets into{' '}
            <span style={{ color: 'var(--prism-focus)' }}>explainable intelligence.</span>
          </h2>
          <p className="prism-close__lede">
            CryptoPrism is the AI-native intelligence layer that transforms complexity into clarity &mdash; so you can see more, understand deeper, and act with conviction.
          </p>
          <button type="button" className="prism-close__cta cta-early-access-trigger">
            Request a demo
            {ARROW}
          </button>
          <p className="prism-close__note">Private beta &middot; onboarding select teams</p>
        </div>

        {/* the questions ARE the structure — hairline-ruled document.
            EXCLUSIVE accordion: this section is a fixed-height fitPages snap
            page, so its height is measured once. Native <details> are
            independent, so leaving them all openable let three expanded
            answers push the column past the measured height and straight into
            the section's overflow:hidden — the list read as broken. One open
            at a time bounds the growth to a single answer, which the layout
            has room for. `name` does this natively (Baseline 2024); onToggle
            closes siblings as the fallback for engines without it. */}
        <div className="prism-close__ask" ref={askRef}>
          {FAQ_ITEMS.map((f, i) => (
            <details
              key={f.q}
              className="prism-faq-item"
              name="prism-faq"
              open={i === 0}
              onToggle={(e) => {
                const self = e.currentTarget as HTMLDetailsElement;
                if (!self.open) return;
                askRef.current?.querySelectorAll<HTMLDetailsElement>('details[open]').forEach((d) => {
                  if (d !== self) d.open = false;
                });
              }}
              // NOTE: do NOT nudge fitPages (dispatching `resize`) from here.
              // Re-running it re-measures every section and the browser
              // re-anchors scroll, which yanks the page mid-read. With one
              // answer open the column has ~128px of headroom against the
              // measured section height, so no re-fit is needed.
            >
              <summary className="prism-faq-q">
                {f.q}
                <span className="prism-faq-sign" aria-hidden="true" />
              </summary>
              <p className="prism-faq-a">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
