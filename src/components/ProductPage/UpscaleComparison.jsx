import React, { useState, useRef, useCallback } from 'react';
import './UpscaleComparison.css';
import { Sparkles, ZoomIn, Layers, Zap, CheckCircle2 } from 'lucide-react';

import heroVilla from '../../assets/images/hero_villa_1787660696745.jpg';
import bannerForest from '../../assets/images/banner_enchanted_forest.jpg';
import luxuryCommercial from '../../assets/images/hero_luxury_commercial.jpg';
import cyberpunkChase from '../../assets/images/hero_cyberpunk_chase.jpg';

const COMPARISON_SCENES = [
  {
    id: 'golden_vista',
    name: 'Mountain Golden Hour',
    tag: 'Landscape & Action',
    image: heroVilla,
    inputRes: '512 × 512 px',
    outputRes: '3840 × 2160 (4K UHD)',
    upscaleFactor: '8x Fidelity',
    stats: { time: '1.2s', details: '+340% Texture clarity' }
  },
  {
    id: 'luxury_product',
    name: 'Luxury Commercial',
    tag: 'Macro Details & Reflections',
    image: luxuryCommercial,
    inputRes: '640 × 360 px',
    outputRes: '4096 × 2304 (DCI 4K)',
    upscaleFactor: '16x Clarity',
    stats: { time: '1.4s', details: '+410% Caustic sharpness' }
  },
  {
    id: 'cyberpunk_scene',
    name: 'Cyberpunk Cinematic',
    tag: 'Lighting & Volumetrics',
    image: cyberpunkChase,
    inputRes: '512 × 512 px',
    outputRes: '3840 × 2160 (4K 60fps)',
    upscaleFactor: '8x Neural Pass',
    stats: { time: '0.9s', details: '+280% Edge crispness' }
  },
  {
    id: 'enchanted_forest',
    name: 'Bioluminescent Nature',
    tag: 'Fine Particle & Foliage',
    image: bannerForest,
    inputRes: '576 × 324 px',
    outputRes: '3840 × 2160 (4K Master)',
    upscaleFactor: '8x Ultra Res',
    stats: { time: '1.1s', details: '+390% Leaf & light rays' }
  }
];

export default function UpscaleComparison() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const activeScene = COMPARISON_SCENES[activeSceneIndex];

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  }, [handleMove]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <section className="upscale-section" id="upscale-demo">
      <div className="upscale-container">
        
        {/* Section Header matching Screenshot 3 */}
        <div className="upscale-header">
          <div className="section-pill-tag">
            <Sparkles size={13} className="pill-icon" />
            <span>SMART EDITOR · UPSCALING</span>
          </div>

          <h2 className="upscale-title">
            From draft to <span className="font-serif-accent text-gradient-purple-cyan">4K</span>, in one pass.
          </h2>

          <p className="upscale-subtitle">
            Drag the slider — a soft, low-resolution input on the left, a crisp AI-upscaled result on the right.
          </p>

          {/* Scene selector tabs */}
          <div className="scene-tabs-wrapper">
            {COMPARISON_SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                className={`scene-tab-btn ${idx === activeSceneIndex ? 'active' : ''}`}
                onClick={() => {
                  setActiveSceneIndex(idx);
                  setSliderPosition(50);
                }}
              >
                <span>{scene.name}</span>
                <span className="scene-tag-badge">{scene.tag}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Canvas matching Screenshot 3 */}
        <div 
          className={`comparison-canvas-wrapper ${isDragging ? 'is-dragging' : ''}`}
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onTouchMove={handleTouchMove}
        >
          {/* Output 4K Sharp Layer (Background) */}
          <div className="comparison-layer layer-sharp">
            <img 
              src={activeScene.image} 
              alt="4K Upscaled Crisp Output" 
              className="comparison-img img-sharp"
              draggable="false"
            />
            {/* Output Badge */}
            <div className="res-badge badge-output">
              <span className="res-dot green-dot"></span>
              <span>Output - 4K</span>
            </div>
          </div>

          {/* Input 512px Low-res / Soft Layer (Foreground clipped by slider) */}
          <div 
            className="comparison-layer layer-soft"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="soft-img-inner" style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}>
              <img 
                src={activeScene.image} 
                alt="512px Low-resolution Input" 
                className="comparison-img img-soft"
                draggable="false"
              />
            </div>
            {/* Input Badge */}
            <div className="res-badge badge-input">
              <span className="res-dot orange-dot"></span>
              <span>Input - 512px</span>
            </div>
          </div>

          {/* Draggable Divider Line & Circular Handle */}
          <div 
            className="slider-divider"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="slider-line"></div>
            <div className="slider-handle" aria-label="Drag slider to compare">
              <div className="handle-inner">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <div className="handle-bar"></div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
              <div className="handle-glow"></div>
            </div>
          </div>
        </div>

        {/* Upscale Engine Stats Bar */}
        <div className="upscale-stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrap">
              <ZoomIn size={18} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Model Resolution</span>
              <strong className="stat-value">{activeScene.outputRes}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap">
              <Zap size={18} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Inference Pass</span>
              <strong className="stat-value">{activeScene.stats.time} on AWS GPUs</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap">
              <Layers size={18} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Super-Res Multiplier</span>
              <strong className="stat-value">{activeScene.upscaleFactor}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap">
              <CheckCircle2 size={18} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Restoration Matrix</span>
              <strong className="stat-value">{activeScene.stats.details}</strong>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
