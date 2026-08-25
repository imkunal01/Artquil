import React from 'react';
import './Testimonials.css';
import { Star } from 'lucide-react';
import { Images } from '../assets/images';
import { useScrollReveal } from '../hooks/useScrollReveal';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Artquil replaced two expensive filming crews and an editing agency retainer in a single month. Our commercial video campaigns ship 10x faster now.",
    author: "Priya Nair",
    role: "Founder, Lumen Studio",
    avatar: Images.avatarPriya,
  },
  {
    id: 2,
    quote: "We generate every product video ad variant in Artquil. The automated voiceover and background sound synchronization is pure magic for ROAS.",
    author: "Arjun Bhatt",
    role: "Head of Growth, Pixelcart",
    avatar: Images.avatarArjun,
  },
  {
    id: 3,
    quote: "The video fidelity and camera physics are genuinely surprising. Our educators describe the lesson, get a 4K animated video — no stock footage needed.",
    author: "Meera Kapoor",
    role: "Content Lead, Northwind Media",
    avatar: Images.avatarMeera,
  },
];

export default function Testimonials() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.15 });

  return (
    <section className="testimonials-section" id="research" ref={sectionRef}>
      <div className="testimonials-container">
        
        {/* Section Header */}
        <div className={`testimonials-header reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          <span className="testimonials-eyebrow">LOVED BY CREATORS, MARKETERS & PRODUCTION TEAMS</span>
          <h2 className="testimonials-headline">
            Don't take our <span className="highlight-script">word</span> for it
          </h2>
        </div>

        {/* 3 Testimonial Cards Grid */}
        <div className="testimonials-grid">
          {TESTIMONIALS.map((item, idx) => (
            <div 
              key={item.id} 
              className={`testimonial-card reveal-init delay-${(idx + 1) * 150} ${isVisible ? 'reveal-visible' : ''}`}
            >
              {/* 5 Stars */}
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#a855f7" color="#a855f7" />
                ))}
              </div>

              {/* Quote */}
              <p className="testimonial-quote">"{item.quote}"</p>

              {/* Author Info */}
              <div className="author-row">
                <img 
                  src={item.avatar} 
                  alt={item.author} 
                  className="author-avatar-img" 
                />
                <div className="author-details">
                  <h4 className="author-name">{item.author}</h4>
                  <span className="author-role">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
