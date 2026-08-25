import React from 'react';
import './ProductHero.css';
import { ArrowRight, Sparkles, Shield, Cpu, Play } from 'lucide-react';

export default function ProductHero({ onExploreClick, onStartClick }) {
  return (
    <section className="product-hero-section">
      {/* Background Ambient Glows */}
      <div className="product-hero-glow glow-top"></div>
      <div className="product-hero-glow glow-center"></div>
      <div className="product-hero-glow glow-right"></div>
      <div className="hero-grid-pattern"></div>

      <div className="product-hero-container">
        {/* The Product Tag (Matching Screenshot 2) */}
        <div className="product-hero-pill">
          <span className="pill-dot"></span>
          <span>THE PRODUCT +</span>
        </div>

        {/* Display Headline (Matching Screenshot 2) */}
        <h1 className="product-hero-headline">
          ONE PLATFORM.<br />
          <span className="font-serif-accent text-gradient-lavender hero-six-accent">Six</span> POWERFUL<br />
          TOOLS.
        </h1>

        {/* Subtitle (Matching Screenshot 2 adapted for Artquil) */}
        <p className="product-hero-description">
          From a text prompt to enterprise-scale AI video and visual production — everything you need to create with AI, in one place.
        </p>

        {/* Action Buttons (Matching Screenshot 2) */}
        <div className="product-hero-actions">
          <button 
            className="btn-product-start"
            onClick={onStartClick}
          >
            <span>Start free</span>
          </button>

          <button 
            className="btn-product-explore"
            onClick={onExploreClick}
          >
            <span>Explore tools</span>
            <ArrowRight size={16} className="btn-arrow-icon" />
          </button>
        </div>

        {/* Quick Trust Highlights */}
        <div className="product-hero-meta">
          <div className="hero-meta-item">
            <Cpu size={15} className="meta-icon" />
            <span>High-throughput AWS GPU Compute</span>
          </div>
          <div className="hero-meta-divider"></div>
          <div className="hero-meta-item">
            <Sparkles size={15} className="meta-icon" />
            <span>Single Automated Audio+Video Pipeline</span>
          </div>
          <div className="hero-meta-divider"></div>
          <div className="hero-meta-item">
            <Shield size={15} className="meta-icon" />
            <span>Enterprise Brand Safe</span>
          </div>
        </div>
      </div>
    </section>
  );
}
