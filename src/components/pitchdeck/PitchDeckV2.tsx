// V2: Combined Story Deck — 19 slides (16 main + 3 appendix)
// Story arc: Title → Hook → Problem → India → Mismatch → Competitors → Solution → Engine → Proof → Markets → Users → Traction → Business → Moat → Not Custodian → CTA → Appendix A/B/C
import { slidesV2 } from '../../data/pitchDeckVariants';
import { DeckShell } from './DeckShell';
import { exportPptxV2 } from '../../utils/exportPptx';
import { SlideTitle } from './slides/SlideTitle';
import { SlideHeroC } from './slides/SlideHeroC';
import { SlideProblem } from './slides/SlideProblem';
import { SlideIndiaAmplifier } from './slides/SlideIndiaAmplifier';
import { SlideWhereCrypto } from './slides/SlideWhereCrypto';
import { SlideCompetitors } from './slides/SlideCompetitors';
import { SlideProduct } from './slides/SlideProduct';
import { SlideEngine } from './slides/SlideEngine';
import { SlideAutopsy } from './slides/SlideAutopsy';
import { SlideFiveMarkets } from './slides/SlideFiveMarkets';
import { SlidePersonas } from './slides/SlidePersonas';
import { SlideMetrics } from './slides/SlideMetrics';
import { SlideCta } from './slides/SlideCta';
import { SlideMoatV2 } from './slides/SlideMoatV2';
import { SlideNotCustodian } from './slides/SlideNotCustodian';
import { SlideCtaV2 } from './slides/SlideCtaV2';
import { SlideSources } from './slides/SlideSources';
import { SlideFinancials } from './slides/SlideFinancials';
import { SlideGrowthModel } from './slides/SlideGrowthModel';

export default function PitchDeckV2() {
  return (
    <DeckShell slides={slidesV2} exportFn={exportPptxV2}>
      {({ onExport, onPdf }) => (
        <>
          <SlideTitle />
          <SlideHeroC />
          <SlideProblem />
          <SlideIndiaAmplifier />
          <SlideWhereCrypto />
          <SlideCompetitors />
          <SlideProduct />
          <SlideEngine />
          <SlideAutopsy />
          <SlideFiveMarkets />
          <SlidePersonas />
          <SlideMetrics />
          <SlideCta />
          <SlideMoatV2 />
          <SlideNotCustodian />
          <SlideCtaV2 onExport={onExport} onPdf={onPdf} />
          <SlideSources />
          <SlideFinancials />
          <SlideGrowthModel />
        </>
      )}
    </DeckShell>
  );
}
