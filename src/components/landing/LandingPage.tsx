import React from 'react';
import '../../styles/landing.css';
import { Header } from './Header';
import { Hero } from './Hero';
import { TabGraveyard } from './TabGraveyard';
import { Pillars } from './Pillars';
import { FeatureGrid } from './FeatureGrid';
import { Quadrant } from './Quadrant';
import { Pricing } from './Pricing';
import { FooterCTA } from './FooterCTA';

export const LandingPage: React.FC = () => (
  <div className="landing-light">
    <Header />
    <main>
      <Hero />
      <TabGraveyard />
      <Pillars />
      <FeatureGrid />
      <Quadrant />
      <Pricing />
      <FooterCTA />
    </main>
  </div>
);

export default LandingPage;
