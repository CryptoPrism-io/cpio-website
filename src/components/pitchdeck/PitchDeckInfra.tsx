// Infrastructure Deck — 15 slides
// AWS cloud architecture, $1K/mo budget, microservices, AI/ML stack, cost mapping, fixed/variable, AWS credits roadmap
import { slidesInfra } from '../../data/infraDeckData';
import { DeckShell } from './DeckShell';
import { InfraSlideTitle } from './slides/InfraSlideTitle';
import { InfraSlideArch } from './slides/InfraSlideArch';
import { InfraSlidePipeline } from './slides/InfraSlidePipeline';
import { InfraSlideCompute } from './slides/InfraSlideCompute';
import { InfraSlideDatabase } from './slides/InfraSlideDatabase';
import { InfraSlideAIML } from './slides/InfraSlideAIML';
import { InfraSlideAPI } from './slides/InfraSlideAPI';
import { InfraSlideDevOps } from './slides/InfraSlideDevOps';
import { InfraSlideSecurity } from './slides/InfraSlideSecurity';
import { InfraSlideEnvs } from './slides/InfraSlideEnvs';
import { InfraSlideBudget } from './slides/InfraSlideBudget';
import { InfraSlideCostMap } from './slides/InfraSlideCostMap';
import { InfraSlideFixedVar } from './slides/InfraSlideFixedVar';
import { InfraSlideScaling } from './slides/InfraSlideScaling';
import { InfraSlideAWSMilestones } from './slides/InfraSlideAWSMilestones';

export default function PitchDeckInfra() {
  return (
    <DeckShell slides={slidesInfra}>
      {({ onExport: _onExport, onPdf: _onPdf }) => (
        <>
          <InfraSlideTitle />
          <InfraSlideArch />
          <InfraSlidePipeline />
          <InfraSlideCompute />
          <InfraSlideDatabase />
          <InfraSlideAIML />
          <InfraSlideAPI />
          <InfraSlideDevOps />
          <InfraSlideSecurity />
          <InfraSlideEnvs />
          <InfraSlideBudget />
          <InfraSlideCostMap />
          <InfraSlideFixedVar />
          <InfraSlideScaling />
          <InfraSlideAWSMilestones />
        </>
      )}
    </DeckShell>
  );
}
