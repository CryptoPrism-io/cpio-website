// Variant C: "India-First GTM" — India woven throughout every slide
import { slidesCVariant } from '../../data/pitchDeckVariants';
import { DeckShell } from './DeckShell';
import { SlideHeroC } from './slides/SlideHeroC';
import { SlideProblemC } from './slides/SlideProblemC';
import { SlideProduct } from './slides/SlideProduct';
import { SlideEngine } from './slides/SlideEngine';
import { SlideAutopsy } from './slides/SlideAutopsy';
import { SlidePersonasC } from './slides/SlidePersonasC';
import { SlideMetrics } from './slides/SlideMetrics';
import { SlideCta } from './slides/SlideCta';
import { SlideMoatC } from './slides/SlideMoatC';
import { SlideCtaC } from './slides/SlideCtaC';

export default function PitchDeckC() {
  return (
    <DeckShell slides={slidesCVariant}>
      {({ onExport, onPdf }) => (
        <>
          <SlideHeroC />
          <SlideProblemC />
          <SlideProduct />
          <SlideEngine />
          <SlideAutopsy />
          <SlidePersonasC />
          <SlideMetrics />
          <SlideCta />
          <SlideMoatC />
          <SlideCtaC onExport={onExport} onPdf={onPdf} />
        </>
      )}
    </DeckShell>
  );
}
