import React, { useState, useEffect, useRef, useMemo } from 'react';
import './HowItWorks.css';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  Clapperboard, 
  Camera, 
  AudioLines, 
  Share2, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';
import { Images } from '../assets/images';
import { Videos } from '../assets/videos';
import { useScrollReveal } from '../hooks/useScrollReveal';

const STEPS_CARDS = [
  {
    id: 0,
    stepNum: '01',
    stepLabel: 'Describe The Vision',
    headline: 'Neural Prompt & Scene Engine',
    desc: 'Write subject, camera movement, mood, and atmosphere in natural language. Artquil converts raw ideas into a high-fidelity cinematic video storyboard in seconds.',
    tag: 'Step 1: Prompting',
    accentColor: '#c084fc',
    glowColor: 'rgba(192, 132, 252, 0.55)',
    borderColor: '#c084fc',
    image: Images.howStep1Storyboard,
    videoUrl: Videos.sceneQuantum,
    previewBadge: 'Prompt to Storyboard',
    icon: Clapperboard,
  },
  {
    id: 1,
    stepNum: '02',
    stepLabel: 'Camera & Visual Style',
    headline: 'Cinematic Physics & Camera Optics',
    desc: 'Select 35mm anamorphic glass, FPV drone dive, 3D CGI Unreal render, or anime action. Motion physics calibrate automatically while creative styling stays fully open.',
    tag: 'Step 2: Optics & Style',
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.55)',
    borderColor: '#38bdf8',
    image: Images.howStep2CameraHUD,
    videoUrl: Videos.coastalDrone,
    previewBadge: 'Physics & Optics',
    icon: Camera,
  },
  {
    id: 2,
    stepNum: '03',
    stepLabel: 'Synced Audio & Render',
    headline: 'Generative Audio & 4K Render',
    desc: 'Our single automated pipeline synthesizes production-ready 4K video frames, natural AI voiceover, dynamic sound effects, and orchestral score in a single export.',
    tag: 'Step 3: Synced Audio',
    accentColor: '#eab308',
    glowColor: 'rgba(234, 179, 8, 0.6)',
    borderColor: '#eab308',
    image: Images.howStep3SyncedVideo,
    videoUrl: Videos.snowHorses,
    previewBadge: 'Neural Synthesis',
    icon: AudioLines,
  },
  {
    id: 3,
    stepNum: '04',
    stepLabel: 'Multi-Format Export',
    headline: 'Instant Master Distribution',
    desc: 'Export ready-to-publish masters in 16:9 widescreen, 9:16 vertical reels, and 1:1 square crops with synchronized subtitles and multi-track audio.',
    tag: 'Step 4: Global Export',
    accentColor: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.55)',
    borderColor: '#f43f5e',
    image: Images.heroCyberpunkChase,
    videoUrl: Videos.deepOceans,
    previewBadge: 'Cinema Ready',
    icon: Share2,
  },
];

export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.15 });

  const targetAngleRef = useRef(0);
  const currentAngleRef = useRef(0);
  const velocityRef = useRef(0);
  const animFrameRef = useRef(0);
  const isPausedRef = useRef(false);
  const isVisibleRef = useRef(false);
  const isRunningRef = useRef(false);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  const startAnimationLoop = () => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    const loop = () => {
      if (!isVisibleRef.current) {
        isRunningRef.current = false;
        return;
      }

      const diff = targetAngleRef.current - currentAngleRef.current;
      velocityRef.current = velocityRef.current * 0.88 + diff * 0.016;
      currentAngleRef.current += velocityRef.current;

      // Check if animation has reached resting equilibrium
      if (Math.abs(diff) < 0.0005 && Math.abs(velocityRef.current) < 0.0001) {
        currentAngleRef.current = targetAngleRef.current;
        velocityRef.current = 0;
        setRotationAngle(currentAngleRef.current);
        const currentClosestStep = Math.round(currentAngleRef.current / (Math.PI / 2)) % STEPS_CARDS.length;
        const normalized = (currentClosestStep + STEPS_CARDS.length) % STEPS_CARDS.length;
        setActiveIndex(normalized);
        isRunningRef.current = false;
        return;
      }

      setRotationAngle(currentAngleRef.current);
      const currentClosestStep = Math.round(currentAngleRef.current / (Math.PI / 2)) % STEPS_CARDS.length;
      const normalized = (currentClosestStep + STEPS_CARDS.length) % STEPS_CARDS.length;
      setActiveIndex(normalized);

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
  };

  // Auto-advance target angle smoothly every 5.5 seconds (only when visible and not hovered)
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPausedRef.current && isVisibleRef.current) {
        targetAngleRef.current += Math.PI / 2;
        startAnimationLoop();
      }
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  // Trigger animation loop when section enters viewport
  useEffect(() => {
    if (isVisible) {
      startAnimationLoop();
    } else {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      isRunningRef.current = false;
    }
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isVisible]);

  const goToStep = (index) => {
    const currentStepIndex = Math.round(targetAngleRef.current / (Math.PI / 2)) % STEPS_CARDS.length;
    const normalizedCurrent = (currentStepIndex + STEPS_CARDS.length) % STEPS_CARDS.length;
    let delta = index - normalizedCurrent;
    if (delta > 2) delta -= 4;
    if (delta < -2) delta += 4;
    targetAngleRef.current += delta * (Math.PI / 2);
    startAnimationLoop();
  };

  const handleNext = () => {
    targetAngleRef.current += Math.PI / 2;
    startAnimationLoop();
  };

  const handlePrev = () => {
    targetAngleRef.current -= Math.PI / 2;
    startAnimationLoop();
  };

  const currentStep = STEPS_CARDS[activeIndex];

  // Compute 3D circular cylinder transforms for all 4 cards
  const cardsTransformData = useMemo(() => {
    const RY = 210; // Vertical radius
    const RZ = 160; // Depth radius

    return STEPS_CARDS.map((card, i) => {
      const cardAngle = rotationAngle - (i * Math.PI / 2);
      
      const y = -Math.sin(cardAngle) * RY + 10;
      const z = Math.cos(cardAngle) * RZ;
      const rotX = Math.sin(cardAngle) * 26;
      const rotY = -Math.sin(cardAngle * 2) * 2.5;
      
      // Normalized depth position from 0 (back) to 1 (front)
      const frontness = (Math.cos(cardAngle) + 1) / 2;
      const scale = 0.76 + 0.24 * frontness;
      const opacity = Math.max(0.2, Math.pow(frontness, 1.4));
      const zIndex = Math.round(frontness * 30);
      const isFrontActive = frontness > 0.88;

      return {
        card,
        i,
        y,
        z,
        rotX,
        rotY,
        scale,
        opacity,
        zIndex,
        isFrontActive,
        brightness: 0.45 + 0.55 * frontness,
      };
    });
  }, [rotationAngle]);

  return (
    <section className="how-it-works-section" id="technology" ref={sectionRef}>
      <div className="hiw-container">
        
        {/* Left Column: Twohands-inspired high-impact copy & interactive stepper */}
        <div className={`hiw-left-column reveal-init reveal-left ${isVisible ? 'reveal-visible' : ''}`}>
          
          <div className="hiw-eyebrow-pill">
            <span className="eyebrow-glow-dot" />
            <span>HOW IT WORKS</span>
          </div>

          <h2 className="hiw-headline">
            Your vision moves fast. <br />
            <span className="gradient-highlight">Your video pipeline</span> should too.
          </h2>

          <p className="hiw-subtitle">
            Artquil compresses scripting, filming, 4K neural rendering, and synchronized sound design into one continuous AI workflow.
          </p>

          {/* Interactive Steps Pill Nav */}
          <div className="hiw-step-selector-row">
            {STEPS_CARDS.map((step, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={step.id}
                  className={`hiw-step-pill ${isActive ? 'active' : ''}`}
                  onClick={() => goToStep(idx)}
                  style={{
                    borderColor: isActive ? step.borderColor : undefined,
                    boxShadow: isActive ? `0 0 20px ${step.glowColor}` : undefined,
                  }}
                >
                  <span className="step-pill-number">{step.stepNum}</span>
                  <span className="step-pill-label">{step.stepLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Key Value Checklist */}
          <div className="hiw-checklist">
            <div className="check-item">
              <div className="check-icon-circle">
                <Check size={13} />
              </div>
              <span>From text prompt to 4K cinematic scene in under 10 seconds</span>
            </div>
            <div className="check-item">
              <div className="check-icon-circle">
                <Check size={13} />
              </div>
              <span>Automated 35mm optics, lighting, and camera motion physics</span>
            </div>
            <div className="check-item">
              <div className="check-icon-circle">
                <Check size={13} />
              </div>
              <span>Generative AI dialogue, sound effects & synchronized soundtrack</span>
            </div>
          </div>

          {/* CTAs & Social Proof */}
          <div className="hiw-cta-row">
            <a href="#pricing" className="hiw-btn-primary">
              <span>Start creating</span>
              <ArrowRight size={15} />
            </a>
            <a href="#product" className="hiw-btn-secondary">
              <span>View examples</span>
            </a>
          </div>

          {/* Bottom Social Proof */}
          <div className="hiw-proof-row">
            <div className="proof-avatars">
              <img src={Images.avatarPriya} alt="Creator" className="avatar-img" />
              <img src={Images.avatarArjun} alt="Creator" className="avatar-img" />
              <img src={Images.avatarMeera} alt="Creator" className="avatar-img" />
            </div>
            <span className="proof-text">Trusted by 37,000+ creators & video teams</span>
          </div>

        </div>

        {/* Right Column: Continuous 3D Circular Vertical Wheel Perspective Stage */}
        <div 
          className={`hiw-right-column reveal-init reveal-right delay-200 ${isVisible ? 'reveal-visible' : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Ambient Lighting & Backdrop Glow */}
          <div 
            className="wheel-ambient-glow"
            style={{
              background: `radial-gradient(circle, ${currentStep.glowColor} 0%, transparent 70%)`
            }}
          />

          {/* Glowing Vertical Connection Rail */}
          <div className="wheel-connection-beam" />

          {/* 3D Circular Perspective Stage */}
          <div className="circular-wheel-stage">
            {cardsTransformData.map(({ card, i, y, z, rotX, rotY, scale, opacity, zIndex, isFrontActive, brightness }) => (
              <div
                key={card.id}
                className={`wheel-card-frame ${isFrontActive ? 'is-active-card' : ''}`}
                onClick={() => goToStep(i)}
                style={{
                  transform: `translate3d(0, ${y.toFixed(1)}px, ${z.toFixed(1)}px) scale(${scale.toFixed(3)}) rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg)`,
                  opacity: opacity.toFixed(3),
                  zIndex,
                  filter: `brightness(${brightness.toFixed(2)})`,
                  borderColor: isFrontActive ? card.borderColor : 'rgba(255, 255, 255, 0.1)',
                  boxShadow: isFrontActive 
                    ? `0 0 40px ${card.glowColor}, 0 25px 65px rgba(0, 0, 0, 0.85)`
                    : '0 16px 40px rgba(0, 0, 0, 0.7)',
                }}
              >
                {/* Media Content */}
                <div className="wheel-card-media-box">
                  {isFrontActive && isVisible && typeof card.videoUrl === 'string' && (card.videoUrl.endsWith('.mp4') || card.videoUrl.endsWith('.webm')) ? (
                    <video
                      src={card.videoUrl}
                      poster={card.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="wheel-card-media"
                      onLoadedMetadata={(e) => {
                        e.target.muted = true;
                        e.target.play().catch(() => {});
                      }}
                    />
                  ) : (
                    <img 
                      src={card.image} 
                      alt={card.headline} 
                      className="wheel-card-media" 
                      loading="lazy" 
                      decoding="async"
                    />
                  )}

                  <div className="wheel-card-overlay" />

                  {/* Top Header Tag */}
                  <div className="wheel-card-header">
                    <span 
                      className="wheel-step-badge"
                      style={{ background: isFrontActive ? card.accentColor : 'rgba(15, 17, 26, 0.85)' }}
                    >
                      {card.stepNum} · {card.previewBadge}
                    </span>
                    <span className="wheel-quality-badge">4K HDR</span>
                  </div>

                  {/* Bottom Title Pill */}
                  <div className="wheel-card-footer">
                    <div className="wheel-title-row">
                      <Sparkles size={14} style={{ color: card.accentColor }} />
                      <span className="wheel-headline-text">{card.headline}</span>
                    </div>
                    <p className="wheel-desc-snippet">{card.desc}</p>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Quick Vertical Stepper Controls */}
          <div className="wheel-controls-panel">
            <button className="wheel-nav-btn" onClick={handlePrev} aria-label="Previous step">
              <ChevronUp size={18} />
            </button>
            <div className="wheel-dots-col">
              {STEPS_CARDS.map((_, i) => (
                <button
                  key={i}
                  className={`wheel-dot ${i === activeIndex ? 'active' : ''}`}
                  onClick={() => goToStep(i)}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>
            <button className="wheel-nav-btn" onClick={handleNext} aria-label="Next step">
              <ChevronDown size={18} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
