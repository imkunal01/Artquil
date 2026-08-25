import React, { useRef, useEffect } from 'react';
import './StyleShowcase.css';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Videos } from '../assets/videos';

const SHOWCASE_ITEMS = [
  {
    id: 1,
    title: 'Blockbuster Cinematic Action',
    desc: 'Dynamic tracking shots, volumetric smoke explosions, and Hollywood filmic color grading.',
    videoUrl: Videos.finishLine,
  },
  {
    id: 2,
    title: 'Commercial Product Reveals',
    desc: 'Luxury product macro shots with slow-motion fluid physics, studio rim lights, and soft speculars.',
    videoUrl: Videos.flowerTimelapse,
  },
  {
    id: 3,
    title: 'Kinetic Typography & Motion Ads',
    desc: 'Dynamic graphic rhythms, bold 3D typographic animation, and beat-synced cuts for social ads.',
    videoUrl: Videos.cldMotion,
  },
  {
    id: 4,
    title: '3D CGI & Urban Cinema',
    desc: 'Vibrant character animation with natural physics, lifelike motion rigs, and cinematic audio.',
    videoUrl: Videos.pedestrians,
  },
  {
    id: 5,
    title: 'Coastal FPV Drone Sweep',
    desc: 'Golden hour cinematic FPV drone flight sweeping over coastal ocean surf with lens flare.',
    videoUrl: Videos.coastalDrone,
  },
  {
    id: 6,
    title: 'Food & Beverage High-Speed Macro',
    desc: 'Ultra-slow-motion liquid pours, golden crema swirls, and appetizing lifestyle commercials.',
    videoUrl: Videos.flowerTimelapse,
  },
  {
    id: 7,
    title: '8K Documentary Wildlife Slow-Mo',
    desc: 'BBC Earth-style high-speed wildlife tracking, snowy mountain landscapes, and natural depth.',
    videoUrl: Videos.snowHorses,
  },
  {
    id: 8,
    title: 'Bioluminescent Deep Reef',
    desc: 'Majestic sea turtle gliding through crystalline turquoise waters and sunlit coral reef caustics.',
    videoUrl: Videos.seaTurtle,
  },
  {
    id: 9,
    title: 'Anime & Stylized Action Motion',
    desc: 'High-octane anime combat sequences with speed lines, dynamic sakuga energy, and neon slashes.',
    videoUrl: Videos.sceneQuantum,
  },
  {
    id: 10,
    title: 'Retro 80s Synthwave & VHS',
    desc: 'Nostalgic synthwave aesthetics, glowing wireframe digital horizons, and analog tape scanlines.',
    videoUrl: Videos.sceneCyber,
  },
  {
    id: 11,
    title: 'Supercar Velocity Pursuit',
    desc: 'High-octane urban night pursuit with dynamic anamorphic lens flare and realistic motion blur.',
    videoUrl: Videos.supercar,
  },
];

function ShowcaseVideoCard({ item }) {
  const isVideo = typeof item.videoUrl === 'string' && (item.videoUrl.endsWith('.mp4') || item.videoUrl.endsWith('.webm'));
  const videoRef = useRef(null);

  useEffect(() => {
    if (!isVideo) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, [item.videoUrl, isVideo]);

  return (
    <div className="showcase-card">
      <div className="showcase-image-wrapper">
        {isVideo ? (
          <video
            ref={videoRef}
            src={item.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="showcase-img"
            onLoadedMetadata={(e) => {
              e.target.muted = true;
              e.target.play().catch(() => {});
            }}
            onCanPlay={(e) => {
              e.target.muted = true;
              e.target.play().catch(() => {});
            }}
          />
        ) : (
          <img
            src={item.videoUrl || item.image}
            alt={item.title}
            className="showcase-img"
            loading="lazy"
          />
        )}
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

  // Measure scroll progress as this section moves naturally through the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Smooth physics-based horizontal translation on page scroll
  const rawX = useTransform(scrollYProgress, [0, 1], ['0px', '-1400px']);
  const x = useSpring(rawX, { stiffness: 90, damping: 25, restDelta: 0.001 });

  return (
    <section className="style-showcase-section" id="product" ref={sectionRef}>
      <div className="showcase-container">
        
        {/* Header */}
        <div className="showcase-header">
          <span className="showcase-eyebrow">MADE WITH ARTQUIL AI</span>
          <h2 className="showcase-headline">
            One prompt. <span className="highlight-script">Any video style</span> you can imagine.
          </h2>
        </div>

        {/* Full-bleed edge-to-edge Horizontal Track */}
        <div className="showcase-track-viewport">
          <motion.div style={{ x }} className="showcase-motion-track">
            {SHOWCASE_ITEMS.map((item) => (
              <ShowcaseVideoCard key={item.id} item={item} />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
