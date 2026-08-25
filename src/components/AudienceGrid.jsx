import React from 'react';
import './AudienceGrid.css';
import { Images } from '../assets/images';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Play } from 'lucide-react';

const AUDIENCES = [
  {
    id: 1,
    title: 'Creators & Influencers',
    desc: 'Generate scroll-stopping video hooks, TikTok reels, YouTube shorts, and cinematic B-roll on demand.',
    image: Images.audienceCreatorStudio,
    tag: 'Short-Form Video',
  },
  {
    id: 2,
    title: 'Marketing & Ad Teams',
    desc: 'Ship ad video creatives, A/B variants, and high-converting video hooks in minutes, not weeks.',
    image: Images.audienceMarketingTeam,
    tag: 'Ad Campaigns',
  },
  {
    id: 3,
    title: 'Designers & Agencies',
    desc: 'Pitch video commercials, mood reels, style frames, and client motion storyboards at the speed of thought.',
    image: Images.audienceAgencyPitch,
    tag: 'Storyboards & Pitches',
  },
  {
    id: 4,
    title: 'E-commerce Brands',
    desc: 'Dynamic 3D product videos, lifestyle lookbook reels, and seasonal campaign showcases without a physical studio.',
    image: Images.audienceEcommerceFashion,
    tag: 'Product Commercials',
  },
  {
    id: 5,
    title: 'Publishers & E-Learning',
    desc: 'Animated video lessons, explainer chapters, and editorial video stories aligned to every narrative.',
    image: Images.audienceEducationExplainer,
    tag: 'E-Learning & Media',
  },
  {
    id: 6,
    title: 'Enterprises & Studios',
    desc: 'On-brand video generation at scale via GPU Cloud API, with team workspaces, brand controls, and audit trails.',
    image: Images.audienceEnterpriseStudio,
    tag: 'Enterprise Video API',
  },
];

export default function AudienceGrid() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.15 });

  return (
    <section className="audience-grid-section" ref={sectionRef}>
      <div className="audience-container">
        
        {/* Section Header */}
        <div className={`audience-header reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          <span className="audience-eyebrow">WHO IT'S FOR</span>
          <h2 className="audience-headline">
            AI for <span className="highlight-script">everyone's</span> creativity
          </h2>
        </div>

        {/* 6 Audience Cards Grid */}
        <div className="audiences-cards-grid">
          {AUDIENCES.map((item, idx) => (
            <div 
              key={item.id} 
              className={`audience-card reveal-init delay-${(idx + 1) * 100} ${isVisible ? 'reveal-visible' : ''}`}
            >
              <div className="audience-image-box">
                <img src={item.image} alt={item.title} className="audience-img" />
                <div className="audience-image-overlay" />
                <span className="audience-tag">{item.tag}</span>
                <div className="audience-play-icon">
                  <div className="play-disc">
                    <Play size={13} fill="#ffffff" />
                  </div>
                </div>
              </div>

              <div className="audience-card-info">
                <h3 className="audience-card-title">{item.title}</h3>
                <p className="audience-card-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
