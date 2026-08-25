import React, { useState, useEffect } from 'react';
import './ProductPage.css';
import ProductHero from './ProductHero';
import ProductSuiteGrid from './ProductSuiteGrid';
import UpscaleComparison from './UpscaleComparison';
import ProductSandbox from './ProductSandbox';
import ProductTechSpecs from './ProductTechSpecs';
import CTABanner from '../CTABanner';

export default function ProductPage({ onNavigateHome, onOpenAuth }) {
  const [selectedToolForSandbox, setSelectedToolForSandbox] = useState('studio');

  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Products Suite — Artquil AI Generative Platform';
  }, []);

  const handleExploreTools = () => {
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
      productsGrid.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProduct = (productId) => {
    setSelectedToolForSandbox(productId);
    const sandboxEl = document.getElementById('interactive-sandbox');
    if (sandboxEl) {
      sandboxEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="product-page-wrapper">
      {/* 1. Hero Section (Screenshot 2 Style) */}
      <ProductHero 
        onExploreClick={handleExploreTools}
        onStartClick={() => {
          if (onOpenAuth) onOpenAuth();
          else handleExploreTools();
        }}
      />

      {/* 2. 6-Card Suite Grid (Screenshot 1 Style) */}
      <ProductSuiteGrid onSelectProduct={handleSelectProduct} />

      {/* 3. Smart Editor 4K Upscale Comparison Slider (Screenshot 3 Style) */}
      <UpscaleComparison />

      {/* 4. Interactive Live Sandbox / Developer Playground */}
      <ProductSandbox selectedToolId={selectedToolForSandbox} />

      {/* 5. Enterprise Architecture & Infrastructure Specs */}
      <ProductTechSpecs />

      {/* 6. Conversion CTA Banner */}
      <CTABanner />
    </div>
  );
}
