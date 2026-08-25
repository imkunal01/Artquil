import React, { useRef } from 'react';
import './StyleShowcase.css';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Images } from '../assets/images';
import { Videos } from '../assets/videos';

const SHOWCASE_ITEMS = [
  {
    id: 1,
    title: 'Blockbuster Cinematic Action',
    desc: 'Dynamic tracking shots, volumetric smoke explosions, and Hollywood filmic color grading.',
    gif: Videos.gifFinishLine,
    image: Images.styleCinemaAction,
  },
  {
    id: 2,
    title: 'Commercial Product Reveals',
    desc: 'Luxury product macro shots with slow-motion fluid physics, studio rim lights, and soft speculars.',
    gif: Videos.gifFlower,
    image: Images.styleProductCommercial,
  },
  {
    id: 3,
    title: 'Kinetic Typography & Motion Ads',
    desc: 'Dynamic graphic rhythms, bold 3D typographic animation, and beat-synced cuts for social ads.',
    gif: Videos.gifCldMotion,
    image: Images.styleTypographyMotion,
  },
  {
    id: 4,
    title: '3D CGI Character Animation',
    desc: 'Vibrant 3D character animation with natural physics, lifelike motion rigs, and synced audio.',
    gif: Videos.gifPedestrians,
    image: Images.style3DCharacter,
  },
  {
    id: 5,
    title: 'Coastal FPV Drone Sweep',
    desc: 'Golden hour cinematic FPV drone flight sweeping over coastal ocean surf with lens flare.',
    gif: Videos.gifCoastal,
    image: Images.heroDroneWaterfall,
  },
  {
    id: 6,
    title: 'Food & Beverage High-Speed Macro',
    desc: 'Ultra-slow-motion liquid pours, golden crema swirls, and appetizing lifestyle commercials.',
    gif: Videos.gifFlower,
    image: Images.styleFoodSlowmo,
  },
  {
    id: 7,
    title: '8K Documentary Wildlife Slow-Mo',
    desc: 'BBC Earth-style high-speed wildlife tracking, snowy mountain landscapes, and natural depth.',
    gif: Videos.gifSnowHorses,
    image: Images.styleNatureWildlife,
  },
  {
    id: 8,
    title: 'Bioluminescent Deep Reef',
    desc: 'Majestic sea turtle gliding through crystalline turquoise waters and sunlit coral reef caustics.',
    gif: Videos.gifSeaTurtle,
    image: Images.styleNatureWildlife,
  },
  {
    id: 9,
    title: 'Anime & Stylized Action Motion',
    desc: 'High-octane anime combat sequences with speed lines, dynamic sakuga energy, and neon slashes.',
    gif: Videos.gifQuantum,
    image: Images.styleAnimeAction,
  },
  {
    id: 10,
    title: 'Retro 80s Synthwave & VHS',
    desc: 'Nostalgic synthwave aesthetics, glowing wireframe digital horizons, and analog tape scanlines.',
    gif: Videos.gifCyber,
    image: Images.styleVHSSynthwave,
  },
  {
    id: 11,
    title: 'Supercar Velocity Pursuit',
    desc: 'High-octane urban night pursuit with dynamic anamorphic lens flare and realistic motion blur.',
    gif: Videos.gifSupercar,
    image: Images.bannerSupercarDrift,
  },
];

function ShowcaseVideoCard({ item }) {
  return (
    <div className="showcase-card">
      <div className="showcase-image-wrapper">
        <img
          src={item.gif || item.image}
          alt={item.title}
          className="showcase-img"
          loading="lazy"
          decoding="async"
        />
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
  const x = useSpring(rawX, { stiffness: 120, damping: 30, restDelta: 0.01 });

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
