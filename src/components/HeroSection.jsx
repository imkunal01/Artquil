import React, { useState, useEffect, useRef } from 'react';
import './HeroSection.css';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Images } from '../assets/images';
import { Videos } from '../assets/videos';
import { useScrollReveal } from '../hooks/useScrollReveal';
import MoltenMetal from './MoltenMetal';

const VIDEO_CARDS = [
  {
    id: 0,
    title: "Cinematic coastal drone flight over golden hour ocean surf",
    fullPrompt: "Cinematic FPV drone flight sweeping over golden hour coastal breakers with synchronized orchestral score, 4K 60fps",
    image: Images.heroDroneWaterfall,
    videoUrl: Videos.v1,
    duration: "00:08",
    tag: "Cinematic Film",
    presetName: "Drone Sweep",
    audioSynced: true,
  },
  {
    id: 1,
    title: "Dusk metropolitan canyon with glowing traffic and architectural depth",
    fullPrompt: "Cinematic tracking shot through wet metropolitan avenue at blue hour with reflective asphalt and glowing city lights, 4K HDR",
    image: Images.heroCyberpunkChase,
    videoUrl: null,
    duration: "00:10",
    tag: "Urban Twilight",
    presetName: "City Street",
    audioSynced: true,
  },
  {
    id: 2,
    title: "Cyberpunk warrior walking through rainy neon Tokyo at night",
    fullPrompt: "Cyberpunk warrior walking through rainy neon street with reflective asphalt and ambient synth soundtrack",
    image: Images.bannerScifiSingularity,
    videoUrl: Videos.v2,
    duration: "00:10",
    tag: "Sci-Fi Action",
    presetName: "Cyberpunk Action",
    audioSynced: true,
  },
  {
    id: 3,
    title: "Luminescent neon city skyline with flying vehicles and glowing reflections",
    fullPrompt: "Cinematic hyper-detailed aerial flight through futuristic neon city skyscrapers at night with volumetric fog and synthwave soundtrack, 4K HDR",
    image: Images.videoCyberpunk,
    videoUrl: null,
    duration: "00:07",
    tag: "Neon City",
    presetName: "Neon City",
    audioSynced: true,
  },
];

export default function HeroSection() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [inputValue, setInputValue] = useState(VIDEO_CARDS[0].fullPrompt);
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const [heroSectionRef, isHeroVisible] = useScrollReveal({ threshold: 0.05, rootMargin: '50px 0px 50px 0px' });
  const videoRefs = useRef({});

  // Smooth, relaxed auto-cycle duration (7.5s) - pauses on user hover or when offscreen
  useEffect(() => {
    if (!isAutoCycling || !isHeroVisible) return;
    const timer = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % VIDEO_CARDS.length);
    }, 7500);
    return () => clearInterval(timer);
  }, [isAutoCycling, isHeroVisible]);

  // Synchronize video play/pause with hero viewport visibility
  useEffect(() => {
    Object.values(videoRefs.current).forEach((videoEl) => {
      if (videoEl) {
        if (isHeroVisible) {
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      }
    });
  }, [isHeroVisible]);

  // Keep input text smoothly in sync with active video
  useEffect(() => {
    setInputValue(VIDEO_CARDS[activeCardIndex].fullPrompt);
  }, [activeCardIndex]);

  const handleSelectPreset = (index) => {
    setActiveCardIndex(index);
    setInputValue(VIDEO_CARDS[index].fullPrompt);
  };

  const activeCard = VIDEO_CARDS[activeCardIndex];

  return (
    <section className="hero-section" ref={heroSectionRef}>
      {/* Background Ambient Glows & Dynamic Colorful Molten Metal Fluid Animation */}
      <div className="hero-bg-glows">
        <div className="hero-molten-bg-wrapper">
          <MoltenMetal
            color1="#4c1d95"
            color2="#9333ea"
            color3="#d8b4fe"
            speed={0.28}
            scale={3.2}
            detail={2}
            glow={1.8}
            coreSize={0.14}
            swirl={1.3}
            fold={-0.24}
            blackPoint={0.04}
            brightness={1.4}
            colorMode="molten"
            grain={true}
            grainIntensity={0.03}
            mouseInteraction={false}
            mouseStrength={0}
            opacity={0.85}
          />
        </div>
        <div className="glow-blob glow-teal" />
        <div className="glow-blob glow-purple" />
        <div className="glow-blob glow-amber" />
        <div className="hero-bg-vignette" />
        <div className="hero-bottom-fade" />
      </div>

      <div className="hero-container">
        {/* Main 2-Column Grid */}
        <div className="hero-main-grid">

          {/* Left Column: Clean, Elegant Typography & Prompt Console */}
          <div className="hero-content reveal-init reveal-visible">

            {/* Tag Badge */}
            <div className="hero-eyebrow-pill">
              <span className="eyebrow-dot" />
              <span>Prompt-to-Video AI Platform</span>
            </div>

            {/* Clean, Well-Balanced Headline */}
            <h1 className="hero-headline">
              Turn text prompts into <br />
              <span className="gradient-highlight">cinematic Ai video</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle">
              Artquil compresses scripting, filming, 4K rendering, and synchronized audio into a single automated pipeline — ready in seconds.
            </p>

            {/* High-End Prompt Console */}
            <div className="prompt-console-card">
              <div className="console-input-row">
                <Sparkles size={17} className="console-sparkle-icon" />
                <textarea
                  className="console-textarea"
                  rows={2}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Describe your scene, camera movement, and audio..."
                />
              </div>

              <div className="console-footer-row">
                <div className="console-meta-tags">
                  <span className="meta-pill">4K UHD</span>
                  <span className="meta-pill">60 FPS</span>
                  <span className="meta-pill">Synced Audio</span>
                </div>

                <button className="console-generate-btn">
                  <span>Generate Video</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Clean Horizontal Presets Row */}
            <div className="preset-suggestions-bar">
              <span className="presets-heading">Try style:</span>
              <div className="preset-pills-list">
                {VIDEO_CARDS.map((card, idx) => (
                  <button
                    key={card.id}
                    className={`preset-pill-item ${activeCardIndex === idx ? 'active' : ''}`}
                    onClick={() => handleSelectPreset(idx)}
                  >
                    <span>{card.presetName}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: 3D Spatial Fanned Theater */}
          <div
            className="hero-stage-wrapper"
            onMouseEnter={() => setIsAutoCycling(false)}
            onMouseLeave={() => setIsAutoCycling(true)}
          >
            {/* Ambient Backlight */}
            <div className="stage-ambient-glow" />

            <div className="spatial-video-theater">
              {VIDEO_CARDS.map((card, idx) => {
                const positionOffset = (idx - activeCardIndex + VIDEO_CARDS.length) % VIDEO_CARDS.length;
                const isFeatured = positionOffset === 0;

                let positionClass = 'pos-center';
                if (positionOffset === 1) positionClass = 'pos-top-right';
                else if (positionOffset === 2) positionClass = 'pos-bottom-right';
                else if (positionOffset === 3) positionClass = 'pos-bottom-left';

                return (
                  <div
                    key={card.id}
                    className={`theater-card ${positionClass} ${isFeatured ? 'is-featured' : 'is-satellite'}`}
                    onClick={() => handleSelectPreset(idx)}
                  >
                    <div className="card-media-wrapper">
                      {typeof card.videoUrl === 'string' && (card.videoUrl.endsWith('.mp4') || card.videoUrl.endsWith('.webm')) ? (
                        <video
                          ref={(el) => {
                            if (el) {
                              videoRefs.current[card.id] = el;
                              el.muted = true;
                              el.defaultMuted = true;
                              if (isHeroVisible) {
                                el.play().catch(() => {});
                              }
                            }
                          }}
                          src={card.videoUrl}
                          poster={card.image}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          className="theater-media"
                          onLoadedMetadata={(e) => {
                            e.target.muted = true;
                            if (isHeroVisible) {
                              e.target.play().catch(() => {});
                            }
                          }}
                        />
                      ) : (
                        <img 
                          src={card.image} 
                          alt={card.title} 
                          className="theater-media" 
                          loading="lazy" 
                          decoding="async" 
                        />
                      )}

                      <div className="theater-media-overlay" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stage Selector Controls */}
            <div className="theater-controls-bar">
              <div className="theater-dots-row">
                {VIDEO_CARDS.map((card, i) => (
                  <button
                    key={i}
                    className={`theater-dot-btn ${i === activeCardIndex ? 'active' : ''}`}
                    onClick={() => handleSelectPreset(i)}
                  >
                    <span className="dot-label">{card.presetName}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Metrics Bar */}
        <div className="hero-stats-bar">
          <div className="stat-item">
            <span className="stat-value">1M+</span>
            <span className="stat-label">AI VIDEOS GENERATED</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value">37K+</span>
            <span className="stat-label">ACTIVE VIDEO CREATORS</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value">10s</span>
            <span className="stat-label">AVG. RENDER TIME</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value">99.9%</span>
            <span className="stat-label">GPU CLOUD UPTIME</span>
          </div>
        </div>

      </div>
    </section>
  );
}
