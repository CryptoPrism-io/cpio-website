// V2: Combined Story Deck — 14 slides, best of B+C+F+G
// Story arc: Hook → Problem → India → Mismatch → Competitors → Solution → Engine → Proof → Markets → Users → Traction → Business → Moat → CTA
import { slidesV2 } from '../../data/pitchDeckVariants';
import { DeckShell } from './DeckShell';
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
import { SlideCtaV2 } from './slides/SlideCtaV2';

export default function PitchDeckV2() {
  return (
    <DeckShell slides={slidesV2}>
      {({ onExport, onPdf }) => (
        <>
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
          <SlideCtaV2 onExport={onExport} onPdf={onPdf} />
        </>
      )}
    </DeckShell>
  );
}
