import React, { useRef, useState, useEffect, useCallback } from 'react';
import './StyleShowcase.css';
import { Images } from '../assets/images';
import { Videos } from '../assets/videos';
import { ChevronLeft, ChevronRight, Sparkles, Play, Pause } from 'lucide-react';

const SHOWCASE_ITEMS = [
  {
    id: 1,
    title: 'Blockbuster Cinematic Action',
    desc: 'Dynamic tracking shots, volumetric smoke explosions, and Hollywood filmic color grading.',
    gif: Videos.gifFinishLine,
    image: Images.styleCinemaAction,
    tag: 'Cinematic',
    fps: '60 FPS',
  },
  {
    id: 2,
    title: 'Commercial Product Reveals',
    desc: 'Luxury product macro shots with slow-motion fluid physics, studio rim lights, and soft speculars.',
    gif: Videos.gifFlower,
    image: Images.styleProductCommercial,
    tag: 'Commercial',
    fps: '4K Macro',
  },
  {
    id: 3,
    title: 'Kinetic Typography & Motion Ads',
    desc: 'Dynamic graphic rhythms, bold 3D typographic animation, and beat-synced cuts for social ads.',
    gif: Videos.gifCldMotion,
    image: Images.styleTypographyMotion,
    tag: 'Motion Graphic',
    fps: '60 FPS',
  },
  {
    id: 4,
    title: '3D CGI Character Animation',
    desc: 'Vibrant 3D character animation with natural physics, lifelike motion rigs, and synced audio.',
    gif: Videos.gifPedestrians,
    image: Images.style3DCharacter,
    tag: '3D Character',
    fps: 'Synced Audio',
  },
  {
    id: 5,
    title: 'Coastal FPV Drone Sweep',
    desc: 'Golden hour cinematic FPV drone flight sweeping over coastal ocean surf with lens flare.',
    gif: Videos.gifCoastal,
    image: Images.heroDroneWaterfall,
    tag: 'Drone FPV',
    fps: '4K HDR',
  },
  {
    id: 6,
    title: 'Food & Beverage High-Speed Macro',
    desc: 'Ultra-slow-motion liquid pours, golden crema swirls, and appetizing lifestyle commercials.',
    gif: Videos.gifFlower,
    image: Images.styleFoodSlowmo,
    tag: 'Slow-Mo',
    fps: '120 FPS',
  },
  {
    id: 7,
    title: '8K Documentary Wildlife Slow-Mo',
    desc: 'BBC Earth-style high-speed wildlife tracking, snowy mountain landscapes, and natural depth.',
    gif: Videos.gifSnowHorses,
    image: Images.styleNatureWildlife,
    tag: 'Wildlife 8K',
    fps: 'ProRes 4K',
  },
  {
    id: 8,
    title: 'Bioluminescent Deep Reef',
    desc: 'Majestic sea turtle gliding through crystalline turquoise waters and sunlit coral reef caustics.',
    gif: Videos.gifSeaTurtle,
    image: Images.styleNatureWildlife,
    tag: 'Underwater',
    fps: 'Fluid Sim',
  },
  {
    id: 9,
    title: 'Anime & Stylized Action Motion',
    desc: 'High-octane anime combat sequences with speed lines, dynamic sakuga energy, and neon slashes.',
    gif: Videos.gifQuantum,
    image: Images.styleAnimeAction,
    tag: 'Anime Sakuga',
    fps: '24 FPS Key',
  },
  {
    id: 10,
    title: 'Retro 80s Synthwave & VHS',
    desc: 'Nostalgic synthwave aesthetics, glowing wireframe digital horizons, and analog tape scanlines.',
    gif: Videos.gifCyber,
    image: Images.styleVHSSynthwave,
    tag: 'Synthwave',
    fps: 'Scanline FX',
  },
  {
    id: 11,
    title: 'Supercar Velocity Pursuit',
    desc: 'High-octane urban night pursuit with dynamic anamorphic lens flare and realistic motion blur.',
    gif: Videos.gifSupercar,
    image: Images.bannerSupercarDrift,
    tag: 'Action Drift',
    fps: '60 FPS UHD',
  },
];

function ShowcaseVideoCard({ item }) {
  return (
    <div className="showcase-card">
      <div className="showcase-image-wrapper">
        {/* Animated GIF / High-Res image */}
        <img
          src={item.gif || item.image}
          alt={item.title}
          className="showcase-img"
          loading="lazy"
          decoding="async"
        />

        {/* Badges Overlay */}
        <div className="showcase-card-badges">
          <span className="badge-tag">{item.tag}</span>
          <span className="badge-fps">{item.fps}</span>
        </div>

        <div className="showcase-img-vignette" />
      </div>

      <div className="showcase-card-body">
        <h4 className="showcase-card-title">{item.title}</h4>
        <p className="showcase-card-desc">{item.desc}</p>
      </div>
    </div>
  );
}

export default function StyleShowcase() {
  const sectionRef = useRef(null);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [isOffscreen, setIsOffscreen] = useState(false);

  // Pause rendering when scrolled far offscreen to save GPU
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOffscreen(!entry.isIntersecting);
      },
      { rootMargin: '200px 0px 200px 0px', threshold: 0 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      className="style-showcase-section" 
      id="product" 
      ref={sectionRef}
      aria-label="Artquil AI Video Style Showcase"
    >
      <div className="showcase-container">
        
        {/* Header with Navigation Controls */}
        <div className="showcase-header-wrapper">
          <div className="showcase-header">
            <div className="showcase-eyebrow-row">
              <span className="showcase-eyebrow">
                <Sparkles size={13} className="eyebrow-sparkle" />
                MADE WITH ARTQUIL AI
              </span>
              <span className="showcase-count-pill">11 Styles</span>
            </div>
            <h2 className="showcase-headline">
              One prompt. <span className="highlight-script">Any video style</span> you can imagine.
            </h2>
          </div>

          {/* Interactive Play/Pause Indicator */}
          <div className="showcase-controls">
            <button 
              className={`showcase-play-btn ${isManualPaused ? 'paused' : ''}`}
              onClick={() => setIsManualPaused((prev) => !prev)}
              aria-label={isManualPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
              title={isManualPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
            >
              {isManualPaused ? <Play size={13} fill="currentColor" /> : <Pause size={13} fill="currentColor" />}
              <span>{isManualPaused ? 'Paused' : 'Auto-Scrolling'}</span>
            </button>
          </div>
        </div>

        {/* Full-Bleed Viewport with Gradient Edge Masks */}
        <div className="showcase-track-viewport">
          {/* Edge Blur Gradients */}
          <div className="showcase-edge-fade edge-fade-left" />
          <div className="showcase-edge-fade edge-fade-right" />

          {/* Continuous GPU-Composited Pure CSS Infinite Marquee Track */}
          <div 
            className={`showcase-marquee-track ${isOffscreen || isManualPaused ? 'is-paused' : ''}`}
          >
            {/* Set 1 */}
            <div className="showcase-card-group">
              {SHOWCASE_ITEMS.map((item) => (
                <ShowcaseVideoCard 
                  key={`track1-${item.id}`} 
                  item={item} 
                />
              ))}
            </div>

            {/* Set 2 (Identical clone for seamless continuous infinite glide) */}
            <div className="showcase-card-group" aria-hidden="true">
              {SHOWCASE_ITEMS.map((item) => (
                <ShowcaseVideoCard 
                  key={`track2-${item.id}`} 
                  item={item} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Hint */}
        <div className="showcase-footer-hint">
          <span>💡 Hover any card to pause & inspect cinematic lighting and fluid physics</span>
        </div>

      </div>
    </section>
  );
}
