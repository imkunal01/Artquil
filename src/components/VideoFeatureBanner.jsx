import React, { useState, useEffect } from 'react';
import './VideoFeatureBanner.css';
import { Waves, Sparkles } from 'lucide-react';
import { Videos } from '../assets/videos';
import { useScrollReveal } from '../hooks/useScrollReveal';
import RippleDistortion from './RippleDistortion';

const SCENES = [
  {
    id: 'neural-flow',
    name: 'Neural Quantum Simulation',
    prompt: 'Hyper-detailed quantum particle simulation with volumetric lighting and radiant energy pulses in 4K 60fps',
    src: Videos.sceneVideo1,
    tint: '#06b6d4',
    swirl: 1.3,
  },
  {
    id: 'cyber-motion',
    name: 'Cyber Kinetic Dimension',
    prompt: 'Futuristic cinematic journey through rainy neon metropolitan highway with optical refractions and ambient synth soundtrack',
    src: Videos.sceneVideo2,
    tint: '#a855f7',
    swirl: 1.4,
  },
];

export default function VideoFeatureBanner() {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.15 });

  // Auto change image every 6.5s (pauses on hover so user can play with ripple freely)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSceneIndex((prev) => (prev + 1) % SCENES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentScene = SCENES[activeSceneIndex];

  return (
    <section className="video-feature-banner-section" id="technology" ref={sectionRef}>
      <div className="banner-container">
        
        {/* Section Header */}
        <div className={`banner-header-center reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          <div className="banner-eyebrow">
            <Waves size={14} className="eyebrow-wave-icon" />
            <span>INTERACTIVE NEURAL DIFFUSION ENGINE</span>
          </div>

          <h2 className="banner-headline">
            From a single sentence to <span className="highlight-script">living video</span>
          </h2>

          <p className="banner-subtitle">
            Move your cursor across the canvas below to interact with the neural latent space. Fluid light refractions and caustics simulate AI frame generation physics in real-time.
          </p>

          {/* Clean Glass Scene Selector Pills */}
          <div className="scene-selectors-row">
            {SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                className={`scene-pill-btn ${activeSceneIndex === idx ? 'active' : ''}`}
                onClick={() => setActiveSceneIndex(idx)}
              >
                <span>{scene.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grand Big Glass Canvas Stage (Clean with No HUD clutter) */}
        <div 
          className={`banner-canvas-stage reveal-init delay-200 ${isVisible ? 'reveal-visible' : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Ambient Glow Aura Matching Active Scene */}
          <div 
            className="canvas-ambient-aura"
            style={{ background: `radial-gradient(circle, ${currentScene.tint}40 0%, transparent 70%)` }}
          />

          {/* Grand Glass Frame Container */}
          <div className="glass-canvas-frame">
            <div className="ripple-canvas-wrapper">
              <RippleDistortion
                key={currentScene.id}
                src={currentScene.src || currentScene.image}
                brushSize={190}
                strength={0.24}
                swirl={currentScene.swirl}
                rings={5}
                spread={4.5}
                fade={2.8}
                spacing={10}
                dispersion={0.09}
                glint={0.3}
                tint={currentScene.tint}
                tintAmount={0.15}
                grayscale={false}
                highlightColor="#ffffff"
                trigger="both"
                clickStrength={2.8}
                quality="high"
              />
            </div>
          </div>

          {/* Subtle Clean Prompt Caption Below Frame */}
          <div className="canvas-bottom-caption">
            <Sparkles size={15} className="caption-sparkle" />
            <span className="caption-prompt">"{currentScene.prompt}"</span>
          </div>

        </div>

      </div>
    </section>
  );
}
