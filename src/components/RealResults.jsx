import React from 'react';
import './RealResults.css';
import { Images } from '../assets/images';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Film } from 'lucide-react';

const RESULTS_DATA = [
  {
    id: 1,
    stat: '-85%',
    label: 'Creative & production cost',
    desc: 'E-commerce & direct-to-consumer brands replace slow, expensive monthly studio shoots with automated prompt-to-video pipelines.',
    image: Images.resultsBrandCommercial,
    tag: 'E-Commerce Commercial',
  },
  {
    id: 2,
    stat: '10×',
    label: 'Faster video output',
    desc: 'Marketing agencies generate dozens of cinematic ad variants weekly with prompt presets, batch rendering, and synchronized audio.',
    image: Images.audienceMarketingTeam,
    tag: 'Ad Variant Testing',
  },
  {
    id: 3,
    stat: '₹0',
    label: 'Physical studio cost',
    desc: 'Indie creators & educators produce broadcast-ready video with custom background music and sound effects — no filming crew or stock fees.',
    image: Images.resultsFilmStudio,
    tag: 'Virtual Studio Set',
  },
];

export default function RealResults() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.15 });

  return (
    <section className="real-results-section" ref={sectionRef}>
      <div className="results-container">
        
        {/* Section Header */}
        <div className={`results-header reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          <span className="results-eyebrow">REAL RESULTS FROM REAL CREATORS</span>
          <h2 className="results-headline">
            Quality videos, in seconds, <span className="highlight-script">without the cost</span>
          </h2>
        </div>

        {/* 3 Metric Cards Grid */}
        <div className="results-cards-grid">
          {RESULTS_DATA.map((item, idx) => (
            <div 
              key={item.id} 
              className={`result-card reveal-init delay-${(idx + 1) * 150} ${isVisible ? 'reveal-visible' : ''}`}
            >
              {/* Visual Thumbnail Frame */}
              <div className="result-thumb-wrapper">
                <img src={item.image} alt={item.label} className="result-thumb-img" />
                <div className="result-thumb-overlay" />
                <span className="result-thumb-tag">
                  <Film size={11} /> {item.tag}
                </span>
              </div>

              <div className="result-stat-val">{item.stat}</div>
              <h3 className="result-label">{item.label}</h3>
              <p className="result-desc">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
