// Variant F: "Where Crypto Actually Lives" — flips competitive narrative
import { slidesFVariant } from '../../data/pitchDeckVariants';
import { DeckShell } from './DeckShell';
import { SlideHero } from './slides/SlideHero';
import { SlideProblem } from './slides/SlideProblem';
import { SlideProduct } from './slides/SlideProduct';
import { SlideEngine } from './slides/SlideEngine';
import { SlideAutopsy } from './slides/SlideAutopsy';
import { SlideWhereCrypto } from './slides/SlideWhereCrypto';
import { SlideMetrics } from './slides/SlideMetrics';
import { SlideCta } from './slides/SlideCta';
import { SlideMoat } from './slides/SlideMoat';
import { SlideTeam } from './slides/SlideTeam';

export default function PitchDeckF() {
  return (
    <DeckShell slides={slidesFVariant}>
      {({ onExport, onPdf }) => (
        <>
          <SlideHero />
          <SlideProblem />
          <SlideProduct />
          <SlideEngine />
          <SlideAutopsy />
          <SlideWhereCrypto />
          <SlideMetrics />
          <SlideCta />
          <SlideMoat />
          <SlideTeam onExport={onExport} onPdf={onPdf} />
        </>
      )}
    </DeckShell>
  );
}
