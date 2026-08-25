import React from 'react';
import './WhyChooseUs.css';
import { Sparkles, Zap, PlusCircle, ShieldCheck, BarChart3, RefreshCw, Film } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const FEATURES_DATA = [
  {
    id: 1,
    icon: <Sparkles size={20} />,
    title: 'High-definition video output',
    desc: 'Sharp, on-brief 4K 60FPS video with cinematic camera paths and natural motion physics — not generic AI output.',
  },
  {
    id: 2,
    icon: <Zap size={20} />,
    title: 'Seconds, not days',
    desc: 'Most video scenes render in under 10 seconds so your creative team can iterate, storyboard, and export in real time.',
  },
  {
    id: 3,
    icon: <PlusCircle size={20} />,
    title: 'Built for non-filmmakers',
    desc: 'No complex editing timeline software or camera gear — guided controls, camera motion presets, and smart defaults.',
  },
  {
    id: 4,
    icon: <ShieldCheck size={20} />,
    title: 'Commercial-use ready',
    desc: 'All paid plans include full commercial licenses and royalty-free synchronized audio so you can ship straight to ad campaigns.',
  },
  {
    id: 5,
    icon: <BarChart3 size={20} />,
    title: 'Affordable at scale',
    desc: 'A fraction of the cost of physical production sets, motion design agencies, freelance editors, or stock footage libraries.',
  },
  {
    id: 6,
    icon: <RefreshCw size={20} />,
    title: 'Always improving models',
    desc: 'We ship new diffusion video models, camera motion controllers, and neural voice synthesis continuously at no extra cost.',
  },
];

export default function WhyChooseUs() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.15 });

  return (
    <section className="why-choose-section" id="about" ref={sectionRef}>
      <div className="why-choose-container">
        
        {/* Section Header */}
        <div className={`why-choose-header reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          <span className="why-choose-eyebrow">WHY CHOOSE US</span>
          <h2 className="why-choose-headline">
            Why teams choose <span className="highlight-script">Artquil</span>
          </h2>
          <p className="why-choose-subtitle">
            Artquil is built for real publishing work: fast video generation, studio-grade render quality, simple camera controls, synchronized audio, and commercial rights.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="why-features-grid">
          {FEATURES_DATA.map((feat, idx) => (
            <div 
              key={feat.id} 
              className={`why-feat-card reveal-init delay-${(idx + 1) * 100} ${isVisible ? 'reveal-visible' : ''}`}
            >
              <div className="feat-icon-bubble">
                {feat.icon}
              </div>
              <h3 className="feat-card-title">{feat.title}</h3>
              <p className="feat-card-desc">{feat.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
