// V3: Combined Story Deck — 14 core + 5 appendix = 19 slides
// V3 changes: dark emerald palette (#047857 throughout), darkened accent colors,
// slide-1 wordmark footer, 30mm print padding, +50% heading sizes, neumorphic backgrounds.
// Story arc: Title → Hook → Problem → India → Competitors → Product Demo → Engine → Proof → Traction → Markets → Users → Moat → Founder → CTA → [Appendix]
import { slidesV2 } from '../../data/pitchDeckVariants';
import { DeckShell } from './DeckShell';
import { exportPptxV2 } from '../../utils/exportPptx';
import { SlideTitle } from './slides/SlideTitle';
import { SlideHeroC } from './slides/SlideHeroC';
import { SlideProblem } from './slides/SlideProblem';
import { SlideIndiaAmplifier } from './slides/SlideIndiaAmplifier';
import { SlideCompetitors } from './slides/SlideCompetitors';
import { SlideProductDemo } from './slides/SlideProductDemo';
import { SlideEngine } from './slides/SlideEngine';
import { SlideAutopsy } from './slides/SlideAutopsy';
import { SlideFiveMarkets } from './slides/SlideFiveMarkets';
import { SlidePersonas } from './slides/SlidePersonas';
import { SlideMetrics } from './slides/SlideMetrics';
import { SlideMoatV2 } from './slides/SlideMoatV2';
import { SlideNotCustodian } from './slides/SlideNotCustodian';
import { SlideFounder } from './slides/SlideFounder';
import { SlideCtaV2 } from './slides/SlideCtaV2';
import { SlideThankYou } from './slides/SlideThankYou';
import { SlideSources } from './slides/SlideSources';
import { SlideFinancials } from './slides/SlideFinancials';
import { SlideGrowthModel } from './slides/SlideGrowthModel';

export default function PitchDeckV3() {
  return (
    <DeckShell slides={slidesV2} exportFn={exportPptxV2}>
      {({ onExport, onPdf }) => (
        <>
          {/* Core (14 slides) */}
          <SlideTitle />
          <SlideHeroC />
          <SlideProblem />
          <SlideIndiaAmplifier />
          <SlideCompetitors />
          <SlideProductDemo />
          <SlideEngine />
          <SlideAutopsy />
          <SlideMetrics />
          <SlideFiveMarkets />
          <SlidePersonas />
          <SlideMoatV2 />
          <SlideFounder />
          <SlideCtaV2 onExport={onExport} onPdf={onPdf} />
          {/* Appendix */}
          <SlideNotCustodian />
          <SlideSources />
          <SlideFinancials />
          <SlideGrowthModel />
          <SlideThankYou />
        </>
      )}
    </DeckShell>
  );
}
