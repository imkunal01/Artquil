import React, { useState, useEffect, useRef } from 'react';
import './VideoFeatureBanner.css';
import { Waves, Sparkles, Play, Pause, VolumeX, Volume2 } from 'lucide-react';
import { Videos } from '../assets/videos';
import { useScrollReveal } from '../hooks/useScrollReveal';

const SCENES = [
  {
    id: 'video-1',
    name: 'Neural Cinema (V1)',
    prompt: 'Hyper-detailed cinematic video generation with volumetric lighting, fluid motion dynamics, and synchronized sound in 4K 60fps',
    src: Videos.v1,
    tint: '#06b6d4',
  },
  {
    id: 'video-2',
    name: 'Cyber Kinetic Dimension (V2)',
    prompt: 'Futuristic cinematic journey through rainy neon metropolitan highway with optical refractions and ambient synth soundtrack',
    src: Videos.v2,
    tint: '#a855f7',
  },
];

export default function VideoFeatureBanner() {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.15 });
  const videoRef = useRef(null);

  const currentScene = SCENES[activeSceneIndex];

  // Pause video playback when section is scrolled out of view to save battery and RAM
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible && isPlaying) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible, isPlaying, activeSceneIndex]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section className="video-feature-banner-section" id="technology" ref={sectionRef}>
      <div className="banner-container">
        
        {/* Section Header */}
        <div className={`banner-header-center reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          <div className="banner-eyebrow">
            <Waves size={14} className="eyebrow-wave-icon" />
            <span>NEURAL VIDEO SYNTHESIS ENGINE</span>
          </div>

          <h2 className="banner-headline">
            From a single sentence to <span className="highlight-script">living video</span>
          </h2>

          <p className="banner-subtitle">
            Artquil synthesizes high-fidelity 4K 60fps cinematic video frames with realistic physics, lighting depth, and temporal coherence in seconds.
          </p>

          {/* Clean Glass Scene Selector Pills */}
          <div className="scene-selectors-row">
            {SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                className={`scene-pill-btn ${activeSceneIndex === idx ? 'active' : ''}`}
                onClick={() => {
                  setActiveSceneIndex(idx);
                  setIsPlaying(true);
                }}
                style={{
                  borderColor: activeSceneIndex === idx ? scene.tint : undefined,
                  boxShadow: activeSceneIndex === idx ? `0 0 16px ${scene.tint}55` : undefined,
                }}
              >
                <span>{scene.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grand Big Glass Stage */}
        <div className={`banner-canvas-stage reveal-init delay-200 ${isVisible ? 'reveal-visible' : ''}`}>
          {/* Ambient Glow Aura Matching Active Scene */}
          <div 
            className="canvas-ambient-aura"
            style={{ background: `radial-gradient(circle, ${currentScene.tint}35 0%, transparent 70%)` }}
          />

          {/* Grand Glass Frame Container */}
          <div className="glass-canvas-frame">
            <div className="banner-video-wrapper">
              <video
                ref={videoRef}
                key={currentScene.id}
                src={currentScene.src}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="metadata"
                className="banner-video-media"
              />

              {/* Video Gradient Overlay */}
              <div className="banner-video-overlay" />

              {/* Video Floating HUD Badges */}
              <div className="banner-hud-top">
                <div className="hud-pill hud-model-pill">
                  <span className="hud-dot" />
                  <span>Artquil V3 Cinema Engine</span>
                </div>
                <div className="hud-pill hud-res-pill">
                  <span>4K UHD • 60 FPS</span>
                </div>
              </div>

              {/* Video Quick Controls */}
              <div className="banner-video-controls">
                <button 
                  className="video-ctrl-btn" 
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
                </button>
                <button 
                  className="video-ctrl-btn" 
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Prompt Caption Below Frame */}
          <div className="canvas-bottom-caption">
            <Sparkles size={15} className="caption-sparkle" style={{ color: currentScene.tint }} />
            <span className="caption-prompt">"{currentScene.prompt}"</span>
          </div>

        </div>

      </div>
    </section>
  );
}
