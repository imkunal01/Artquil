import React, { useRef } from 'react';
import './StyleShowcase.css';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Images } from '../assets/images';

const SHOWCASE_ITEMS = [
  {
    id: 1,
    title: 'Blockbuster Cinematic Action',
    desc: 'Dynamic tracking shots, volumetric smoke explosions, and Hollywood filmic color grading.',
    image: Images.styleCinemaAction,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
  },
  {
    id: 2,
    title: 'Commercial Product Reveals',
    desc: 'Luxury product macro shots with slow-motion fluid physics, studio rim lights, and soft speculars.',
    image: Images.styleProductCommercial,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    id: 3,
    title: 'Kinetic Typography & Motion Ads',
    desc: 'Dynamic graphic rhythms, bold 3D typographic animation, and beat-synced cuts for social ads.',
    image: Images.styleTypographyMotion,
  },
  {
    id: 4,
    title: '3D CGI Character Animation',
    desc: 'Vibrant 3D character animation with natural physics, lifelike facial rigs, and synced voice lines.',
    image: Images.style3DCharacter,
  },
  {
    id: 5,
    title: 'Food & Beverage High-Speed Macro',
    desc: 'Ultra-slow-motion liquid pours, golden crema swirls, and appetizing lifestyle commercials.',
    image: Images.styleFoodSlowmo,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  },
  {
    id: 6,
    title: '8K Documentary Wildlife Slow-Mo',
    desc: 'BBC Earth-style high-speed wildlife tracking, snowy mountain landscapes, and natural depth.',
    image: Images.styleNatureWildlife,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    id: 7,
    title: 'Anime & Stylized Action Motion',
    desc: 'High-octane anime combat sequences with speed lines, dynamic sakuga energy, and neon slashes.',
    image: Images.styleAnimeAction,
  },
  {
    id: 8,
    title: 'Retro 80s Synthwave & VHS',
    desc: 'Nostalgic synthwave aesthetics, glowing wireframe digital horizons, and analog tape scanlines.',
    image: Images.styleVHSSynthwave,
  },
];

export default function StyleShowcase() {
  const sectionRef = useRef(null);

  // Measure scroll progress as this section moves naturally through the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Smooth physics-based horizontal translation on page scroll with no extra vertical space
  const rawX = useTransform(scrollYProgress, [0, 1], ['0px', '-900px']);
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
              <div key={item.id} className="showcase-card">
                <div className="showcase-image-wrapper">
                  {item.videoUrl ? (
                    <video
                      src={item.videoUrl}
                      poster={item.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="showcase-img"
                    />
                  ) : (
                    <img src={item.image} alt={item.title} className="showcase-img" />
                  )}
                </div>

                <div className="showcase-card-body">
                  <h4 className="showcase-card-title">{item.title}</h4>
                  <p className="showcase-card-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
