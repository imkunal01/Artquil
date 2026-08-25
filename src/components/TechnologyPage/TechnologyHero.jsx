import React, { useState, useEffect } from 'react';
import './TechnologyHero.css';
import { Sparkles, ArrowRight, Check, Zap, Shield, Cpu, Layers } from 'lucide-react';
import Images from '../../assets/images';
import { Videos } from '../../assets/videos';

const SAMPLE_PROMPTS = [
  {
    prompt: "lone traveler walking toward a glowing ancient pagoda at dawn, atmospheric mist and bamboo wind sounds",
    model: "Artquil-Diffusion v3.4 + Synced Audio",
    latency: "1.4s",
    resolution: "4K 60FPS Video",
    image: Images.techFujiArtwork,
    videoUrl: Videos.coastalDrone,
    tag: "Cinematic Film (4K)"
  },
  {
    prompt: "bioluminescent ethereal cyber city with neon reflections in rain, synthwave bass soundtrack",
    model: "Artquil-Latent v3.4 Ultra",
    latency: "1.1s",
    resolution: "4K 60FPS Video",
    image: Images.bannerScifiSingularity,
    videoUrl: Videos.sceneCyber,
    tag: "Sci-Fi Video (4K)"
  },
  {
    prompt: "hyper-detailed luxury watch floating in zero-gravity particle smoke with cinematic sound design",
    model: "Commercial-Tensor Video 4K",
    latency: "1.8s",
    resolution: "4K 60FPS Video",
    image: Images.galleryWatch,
    videoUrl: Videos.finishLine,
    tag: "Commercial Ad (4K)"
  },
  {
    prompt: "deep mystical enchanted forest with floating golden dust spirits and ambient acoustic strings",
    model: "Artquil-Video-Diffusion v2",
    latency: "1.2s",
    resolution: "4K 60FPS Video",
    image: Images.bannerEnchantedForest,
    videoUrl: Videos.sceneQuantum,
    tag: "Fantasy Video (4K)"
  }
];

export default function TechnologyHero({ onExploreStack, onSeeArchitecture }) {
  const [activeSampleIndex, setActiveSampleIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [inputValue, setInputValue] = useState(SAMPLE_PROMPTS[0].prompt);

  const activeSample = SAMPLE_PROMPTS[activeSampleIndex];

  const handleGenerateClick = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setActiveSampleIndex((prev) => (prev + 1) % SAMPLE_PROMPTS.length);
      setInputValue(SAMPLE_PROMPTS[(activeSampleIndex + 1) % SAMPLE_PROMPTS.length].prompt);
      setIsGenerating(false);
    }, 600);
  };

  const handleSelectPreset = (index) => {
    setActiveSampleIndex(index);
    setInputValue(SAMPLE_PROMPTS[index].prompt);
  };

  return (
    <section className="tech-hero-section">
      <div className="tech-hero-background-glow">
        <div className="tech-glow-orb tech-glow-top-left"></div>
        <div className="tech-glow-orb tech-glow-center"></div>
      </div>

      <div className="tech-hero-container">
        {/* Left Column: Typography & CTAs */}
        <div className="tech-hero-content">
          <div className="tech-badge-pill">
            <span className="tech-badge-text">TECHNOLOGY</span>
          </div>

          <h1 className="tech-hero-title">
            FROM PROMPT<br />
            TO PERFECT<br />
            <span className="tech-hero-accent-word">video</span>
          </h1>

          <p className="tech-hero-subtitle">
            A single-pipeline automated prompt-to-video generation engine that interprets every prompt,
            routes to specialized diffusion models, synchronizes voiceover and audio, and delivers production-ready 4K videos in seconds.
          </p>

          <div className="tech-hero-actions">
            <button 
              className="tech-btn-primary"
              onClick={onExploreStack}
            >
              <span>Explore the stack</span>
              <ArrowRight size={17} className="tech-btn-icon" />
            </button>

            <button 
              className="tech-btn-secondary"
              onClick={onSeeArchitecture}
            >
              <span>See architecture</span>
              <ArrowRight size={17} className="tech-btn-icon" />
            </button>
          </div>

          <div className="tech-hero-features-row">
            <div className="tech-feat-pill active">
              <Check size={14} className="tech-feat-icon" />
              <span>Smart routing</span>
            </div>
            <div className="tech-feat-pill">
              <span className="tech-feat-dot">✦</span>
              <span>4K quality</span>
            </div>
            <div className="tech-feat-pill">
              <span className="tech-feat-dot">✦</span>
              <span>Real-time safety</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Card with Interactive Prompt Bar */}
        <div className="tech-hero-visual-col">
          <div className="tech-hero-visual-card">
            {/* Outer subtle glow frame */}
            <div className="tech-card-ambient-border"></div>

            <div className="tech-card-image-wrapper">
              {typeof activeSample.videoUrl === 'string' && (activeSample.videoUrl.endsWith('.mp4') || activeSample.videoUrl.endsWith('.webm')) ? (
                <video
                  key={activeSample.tag}
                  src={activeSample.videoUrl}
                  poster={activeSample.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={`tech-hero-main-img ${isGenerating ? 'generating-pulse' : ''}`}
                />
              ) : (
                <img 
                  key={activeSample.tag}
                  src={activeSample.image} 
                  alt="AI Generated Masterpiece" 
                  className={`tech-hero-main-img ${isGenerating ? 'generating-pulse' : ''}`}
                />
              )}
              
              {/* Dynamic Metadata Badge Overlay */}
              <div className="tech-image-meta-badge">
                <span className="meta-tag">{activeSample.tag}</span>
                <span className="meta-sep">•</span>
                <span className="meta-model">{activeSample.model}</span>
                <span className="meta-sep">•</span>
                <span className="meta-speed">{activeSample.latency}</span>
              </div>

              {/* Floating Bottom Prompt Bar (Matching Screenshot 1) */}
              <div className="tech-floating-prompt-bar">
                <div className="prompt-input-group">
                  <span className="sparkle-symbol">✦</span>
                  <input 
                    type="text" 
                    className="prompt-glass-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Describe any scene, art style or cinematic view..."
                  />
                </div>

                <button 
                  className={`tech-prompt-generate-btn ${isGenerating ? 'loading' : ''}`}
                  onClick={handleGenerateClick}
                  title="Cycle prompt & trigger generation"
                >
                  {isGenerating ? (
                    <span className="generating-spinner"></span>
                  ) : (
                    <>
                      <span>Generate</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Sample Switcher Pills */}
            <div className="tech-sample-presets">
              {SAMPLE_PROMPTS.map((sample, idx) => (
                <button
                  key={idx}
                  className={`tech-preset-chip ${activeSampleIndex === idx ? 'active' : ''}`}
                  onClick={() => handleSelectPreset(idx)}
                >
                  {sample.tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
