import React, { useState } from 'react';
import './PricingPlans.css';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function PricingPlans() {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.15 });

  const isAnnual = billingCycle === 'annual';

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      badge: null,
      price: 'Free',
      period: '',
      desc: 'Perfect for exploring AI video creation.',
      features: [
        '50 video credits / month',
        '720p HD video render quality',
        'Camera motion presets',
        'Personal use only',
        'Community support',
      ],
      ctaText: 'Start free',
      ctaClass: 'btn-plan-outline',
      highlighted: false,
    },
    {
      id: 'creator',
      name: 'Creator',
      badge: 'MOST POPULAR',
      price: isAnnual ? '₹799' : '₹999',
      period: '/mo',
      savings: isAnnual ? 'Billed ₹9,588 annually (Save 20%)' : 'Billed monthly',
      desc: 'For professional creators, marketers & editors.',
      features: [
        '1,500 video credits / month',
        '4K 60FPS Ultra HD output',
        'Synchronized AI voiceover & BGM',
        'Commercial-use license',
        'Priority email & chat support',
      ],
      ctaText: 'Go Creator',
      ctaClass: 'btn-plan-primary',
      highlighted: true,
    },
    {
      id: 'business',
      name: 'Business',
      badge: null,
      price: 'Custom',
      period: '',
      desc: 'For production studios, agencies & scale.',
      features: [
        'Unlimited video generations',
        'Video API access + team seats',
        'Custom voice cloning & brand kits',
        'Dedicated GPU inference cluster',
        'Dedicated success manager',
      ],
      ctaText: 'Talk to sales',
      ctaClass: 'btn-plan-outline',
      highlighted: false,
    },
  ];

  return (
    <section className="pricing-section" id="pricing" ref={sectionRef}>
      <div className="pricing-container">
        
        {/* Section Header */}
        <div className={`pricing-header reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          <span className="pricing-eyebrow">START FREE. SCALE WHEN YOU'RE READY.</span>
          <h2 className="pricing-headline">
            Simple plans. <span className="highlight-script">No surprises.</span>
          </h2>

          {/* Billing Switcher Toggle */}
          <div className="billing-toggle-wrapper">
            <button 
              className={`billing-toggle-btn ${!isAnnual ? 'active' : ''}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly billing
            </button>
            <button 
              className={`billing-toggle-btn ${isAnnual ? 'active' : ''}`}
              onClick={() => setBillingCycle('annual')}
            >
              <span>Annual billing</span>
              <span className="save-badge">Save 20%</span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="pricing-cards-grid">
          {plans.map((plan, idx) => (
            <div 
              key={plan.id} 
              className={`pricing-card ${plan.highlighted ? 'card-highlighted' : ''} reveal-init delay-${(idx + 1) * 150} ${isVisible ? 'reveal-visible' : ''}`}
            >
              {plan.badge && (
                <div className="plan-popular-badge">
                  <span>{plan.badge}</span>
                </div>
              )}

              <span className="plan-name">{plan.name}</span>
              
              <div className="plan-price-row">
                <span className="plan-price">{plan.price}</span>
                {plan.period && <span className="plan-period">{plan.period}</span>}
              </div>

              {plan.savings && (
                <span className="plan-savings-tag">{plan.savings}</span>
              )}

              {/* Feature List */}
              <ul className="plan-features-list">
                {plan.features.map((feat, i) => (
                  <li key={i} className="plan-feature-item">
                    <span className="feature-bullet">→</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className={`btn-plan ${plan.ctaClass}`}>
                <span>{plan.ctaText}</span>
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
