import type { RefObject } from 'react';
import { Reveal } from '../../shared';
import { useIsMobile } from '../hooks';

const INTRO_ROWS = [
  { title: 'Markets generate endless information.', color: '#0B1220', body: 'Every day brings more data, more opinions, and more noise.' },
  { title: 'Humans generate endless bias.', color: '#0FAE72', body: 'Emotions distort our interpretation, destroy our timing, and cloud our judgment.' },
  { title: 'CryptoPrism replaces emotional reactions with explainable reasoning.', color: '#0B1220', body: 'Turning signals into structured intelligence.' },
];

const HUMAN_TRAITS = [['Emotional', 'Reactive'], ['Inconsistent', 'Biased'], ['Unreliable', 'Under pressure']];
const MACHINE_TRAITS = [['Evidence-based', 'Objective'], ['Consistent', 'Rule-driven'], ['Reliable', 'Always on']];

const BIAS_CARDS = [
  { title: 'Recency Bias', body: 'We overweight the latest events and ignore the bigger picture.' },
  { title: 'Confirmation Bias', body: 'We seek information that confirms our beliefs and ignore the rest.' },
  { title: 'Loss Aversion', body: 'We feel losses twice as strongly as we feel gains.' },
  { title: 'Overconfidence', body: 'We overestimate our knowledge and our ability to predict.' },
  { title: 'Anchoring', body: 'We rely too heavily on the first piece of information we see.' },
  { title: 'Availability Bias', body: 'We focus on what’s easy to recall, not what’s actually true.' },
];

const REASONING_TRAITS = [
  { title: 'Evidence', body: 'Grounded in verifiable data' },
  { title: 'Probability', body: 'Quantified, not guessed' },
  { title: 'Confidence', body: 'Measured, not assumed' },
  { title: 'Reasoning', body: 'Transparent and reproducible' },
];

function TraitCard({ heading, headingColor, bg, border, traits, width }: { heading: string; headingColor: string; bg: string; border: string; traits: string[][]; width: number | string }) {
  return (
    <div style={{ width, boxSizing: 'border-box', background: bg, border: `1px solid ${border}`, borderRadius: 16, padding: '18px 20px' }}>
      <div style={{ fontSize: 14.5, fontWeight: 700, color: headingColor }}>{heading}</div>
      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {traits.map(([a, b]) => (
          <div key={a}><div style={{ fontSize: 13, fontWeight: 600, color: '#0B1220' }}>{a}</div><div style={{ fontSize: 11.5, color: '#98A2B3' }}>{b}</div></div>
        ))}
      </div>
    </div>
  );
}

function ReasoningEngineCard() {
  return (
    <div className="prism-card" style={{ padding: 26, width: '100%', maxWidth: 292, boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <svg width="32" height="32" viewBox="0 0 30 30" fill="none"><path d="M15 2.5 25.8 8.75v12.5L15 27.5 4.2 21.25V8.75Z" stroke="#0FAE72" strokeWidth="1.8" strokeLinejoin="round" /><circle cx="15" cy="15" r="3" stroke="#0B8D84" strokeWidth="1.5" /></svg>
        <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', color: '#0B1220', lineHeight: 1.25 }}>Prism<br />Reasoning Engine</div>
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.5, color: '#475467', marginTop: 14 }}>Replacing bias with explainable intelligence.</div>
      <div style={{ height: 1, background: '#E7E9EC', margin: '18px 0' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {REASONING_TRAITS.map((r) => (
          <div key={r.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ width: 34, height: 34, borderRadius: 9, background: '#F2FAF6', flex: 'none' }} />
            <div><div style={{ fontSize: 13.5, fontWeight: 700, color: '#0FAE72' }}>{r.title}</div><div style={{ fontSize: 12, color: '#475467', marginTop: 2 }}>{r.body}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BiasTax({ anchorRef }: { anchorRef: RefObject<HTMLDivElement | null> }) {
  const isMobile = useIsMobile();

  const intro = (
    <>
      <div className="prism-pill"><span className="prism-pill__dot" />THE BIAS TAX</div>
      <h2 style={{ margin: '26px 0 0', fontSize: isMobile ? 32 : 54, lineHeight: 1.04, color: '#0B1220' }}>
        Your biggest competitor isn&rsquo;t the market.<br /><span className="prism-grad-text">It&rsquo;s human judgment.</span>
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 26, marginTop: 40 }}>
        {INTRO_ROWS.map((r) => (
          <div key={r.title} style={{ fontSize: 15, lineHeight: 1.55, color: '#475467' }}>
            <span style={{ fontWeight: 700, color: r.color }}>{r.title}</span><br />{r.body}
          </div>
        ))}
      </div>
    </>
  );

  const comparison = (
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', flexWrap: isMobile ? 'nowrap' : 'wrap', alignItems: 'center', justifyContent: isMobile ? 'flex-start' : 'center', gap: 18, width: isMobile ? '100%' : undefined }}>
      <TraitCard heading="Human Thinking" headingColor="#B42318" bg="#FDF4F2" border="#F2DEDA" traits={HUMAN_TRAITS} width={isMobile ? '100%' : 180} />
      <div style={{ textAlign: 'center', flex: 'none' }}>
        <div ref={anchorRef} style={{ width: isMobile ? 60 : 150, height: isMobile ? 60 : 190, margin: isMobile ? '0 auto' : undefined }} />
        <div style={{ fontSize: 13, fontWeight: 600, color: '#0B1220', marginTop: 2 }}>CryptoPrism</div>
      </div>
      <TraitCard heading="Machine Reasoning" headingColor="#0B8D84" bg="#F2FAF6" border="#D7EEE3" traits={MACHINE_TRAITS} width={isMobile ? '100%' : 180} />
    </div>
  );

  const biasCards = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {BIAS_CARDS.map((b) => (
        <Reveal key={b.title}>
          <div className="prism-card" style={{ display: 'flex', gap: 14, alignItems: 'flex-start', width: isMobile ? '100%' : 304, boxSizing: 'border-box', padding: 18 }}>
            <span style={{ width: 38, height: 38, border: '1px solid #E7E9EC', borderRadius: 10, flex: 'none' }} />
            <div><div style={{ fontSize: 14.5, fontWeight: 700, color: '#0B1220' }}>{b.title}</div><div style={{ fontSize: 12.5, lineHeight: 1.45, color: '#475467', marginTop: 4 }}>{b.body}</div></div>
          </div>
        </Reveal>
      ))}
    </div>
  );

  const closingQuote = (
    <div style={{ maxWidth: 860, margin: '40px auto 0', textAlign: 'center' }}>
      <div style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, letterSpacing: '-0.015em', color: '#0B1220' }}>The market can be unpredictable.</div>
      <div style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, letterSpacing: '-0.015em', marginTop: 4 }}><span className="prism-grad-text">Human biases are predictable.</span></div>
    </div>
  );

  if (isMobile) {
    return (
      <section style={{ padding: '80px 0', background: '#FAFAF8' }}>
        <div className="prism-wrap" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <Reveal>{intro}</Reveal>
          <Reveal>{comparison}</Reveal>
          {biasCards}
          <Reveal><ReasoningEngineCard /></Reveal>
          <Reveal>{closingQuote}</Reveal>
        </div>
      </section>
    );
  }

  return (
    <section data-page="" style={{ position: 'relative', padding: '52px 0 44px', background: '#FAFAF8' }}>
      <div className="prism-wrap">
        <div style={{ position: 'relative', width: '100%', maxWidth: 1472, height: 930, margin: '0 auto' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, width: 600 }}>
            <Reveal>{intro}</Reveal>
            <div style={{ marginTop: 52 }}>{comparison}</div>
          </div>
          <div style={{ position: 'absolute', left: 660, top: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>{biasCards}</div>
          <div style={{ position: 'absolute', left: 1180, top: 110 }}><Reveal><ReasoningEngineCard /></Reveal></div>
        </div>
        <Reveal>{closingQuote}</Reveal>
      </div>
    </section>
  );
}
