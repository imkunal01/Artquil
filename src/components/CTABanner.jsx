import React from 'react';
import './CTABanner.css';
import { ArrowRight, Video, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function CTABanner() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.2 });

  return (
    <section className="cta-banner-section" ref={sectionRef}>
      <div className="cta-banner-container">
        
        <div className={`cta-card-panel reveal-init reveal-scale ${isVisible ? 'reveal-visible' : ''}`}>
          {/* Ambient Glows inside CTA Box */}
          <div className="cta-panel-glow" />
          
          <h2 className="cta-headline">
            BRING YOUR<br />
            IMAGINATION TO LIFE
          </h2>

          <p className="cta-subtitle">
            Anyone can make broadcast-quality AI videos quickly and easily — creator, marketer, or global brand.
          </p>

          <div className="cta-actions-row">
            <button className="btn-cta-white">
              <span>Start Generating Free</span>
              <ArrowRight size={16} />
            </button>
            <button className="btn-cta-glass">
              <span>Talk to Sales</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
