// Variant G: "Five Markets, One Problem" — the wedge cluster
import { slidesGVariant } from '../../data/pitchDeckVariants';
import { DeckShell } from './DeckShell';
import { SlideHero } from './slides/SlideHero';
import { SlideProblem } from './slides/SlideProblem';
import { SlideProduct } from './slides/SlideProduct';
import { SlideEngine } from './slides/SlideEngine';
import { SlideAutopsy } from './slides/SlideAutopsy';
import { SlideFiveMarkets } from './slides/SlideFiveMarkets';
import { SlideMetrics } from './slides/SlideMetrics';
import { SlideCta } from './slides/SlideCta';
import { SlideMoat } from './slides/SlideMoat';
import { SlideTeam } from './slides/SlideTeam';

export default function PitchDeckG() {
  return (
    <DeckShell slides={slidesGVariant}>
      {({ onExport, onPdf }) => (
        <>
          <SlideHero />
          <SlideProblem />
          <SlideProduct />
          <SlideEngine />
          <SlideAutopsy />
          <SlideFiveMarkets />
          <SlideMetrics />
          <SlideCta />
          <SlideMoat />
          <SlideTeam onExport={onExport} onPdf={onPdf} />
        </>
      )}
    </DeckShell>
  );
}
