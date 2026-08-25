import React from 'react';
import './PlatformOverview.css';
import { Sparkles, Wand2, Layers, Code, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const PILLARS = [
  {
    id: 1,
    tag: 'CREATE',
    icon: <Sparkles size={18} />,
    title: 'Generate video from text',
    desc: 'Studio-quality cinematic video scenes for campaigns, products, cinematics, and e-learning.',
  },
  {
    id: 2,
    tag: 'EDIT',
    icon: <Wand2 size={18} />,
    title: 'Refine without timeline software',
    desc: 'Extend camera shots, adjust motion pacing, re-generate voiceover, and upscale in one click.',
  },
  {
    id: 3,
    tag: 'SCALE',
    icon: <Layers size={18} />,
    title: 'Produce for teams and brands',
    desc: 'Batch video rendering, brand consistency, and multi-seat collaborative controls for real teams.',
  },
  {
    id: 4,
    tag: 'INTEGRATE',
    icon: <Code size={18} />,
    title: 'Connect via Video API',
    desc: 'Integrate generative video inference and audio synchronization into your app, CMS, or pipeline.',
  },
];

export default function PlatformOverview() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.15 });

  return (
    <section className="platform-overview-section" ref={sectionRef}>
      <div className="platform-container">
        
        {/* Section Header */}
        <div className={`platform-header reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          <span className="platform-eyebrow">PLATFORM OVERVIEW</span>
          <h2 className="platform-headline">
            Everything starts from a <span className="highlight-script">prompt</span>
          </h2>
          <p className="platform-subtitle">
            A quick homepage view of what Artquil does. The full product breakdown and developer SDKs live on the Product page.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="pillars-grid">
          {PILLARS.map((pillar, idx) => (
            <div 
              key={pillar.id} 
              className={`pillar-card reveal-init delay-${(idx + 1) * 120} ${isVisible ? 'reveal-visible' : ''}`}
            >
              <div className="pillar-icon-box">
                {pillar.icon}
              </div>
              <span className="pillar-tag">{pillar.tag}</span>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-desc">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className={`platform-cta-row reveal-init delay-600 ${isVisible ? 'reveal-visible' : ''}`}>
          <button className="btn-explore-product">
            <span>Explore Product</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
