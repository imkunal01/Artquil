import React, { useEffect } from 'react';
import './TechnologyPage.css';
import TechnologyHero from './TechnologyHero';
import MultiModelPipeline from './MultiModelPipeline';
import ModelRouterPlayground from './ModelRouterPlayground';
import TechStackSection from './TechStackSection';
import TechBenchmarks from './TechBenchmarks';
import CTABanner from '../CTABanner';

export default function TechnologyPage({ onNavigateHome, onOpenAuth }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Technology & Multi-Model Architecture — Artquil / Cognexa';
  }, []);

  const handleExploreStack = () => {
    const stackEl = document.getElementById('stack');
    if (stackEl) {
      stackEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSeeArchitecture = () => {
    const archEl = document.getElementById('architecture');
    if (archEl) {
      archEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="tech-page-wrapper">
      {/* 1. Technology Hero (Screenshot 1 Match) */}
      <TechnologyHero 
        onExploreStack={handleExploreStack}
        onSeeArchitecture={handleSeeArchitecture}
      />

      {/* 2. Pipeline & Rendering Multi-Model Architecture (Screenshot 2 Match) */}
      <MultiModelPipeline />

      {/* 3. Live Model Semantic Router Simulator */}
      <ModelRouterPlayground />

      {/* 4. Built for Speed, Scale and Trust Tech Stack Matrix (Screenshot 3 Match) */}
      <TechStackSection />

      {/* 5. Hard Engineering Benchmarks */}
      <TechBenchmarks />

      {/* 6. Conversion CTA */}
      <CTABanner />
    </div>
  );
}
