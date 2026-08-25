import React from 'react';
import './Logo.css';

/**
 * Artquil AI Logo Component
 * @param {Object} props
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {boolean} [props.showText=true]
 * @param {string} [props.className='']
 */
export default function Logo({ size = 'md', showText = true, className = '' }) {
  return (
    <div className={`artquil-logo-wrapper size-${size} ${className}`}>
      {/* Dynamic Vector Icon */}
      <div className="artquil-icon-container">
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="artquil-svg-icon"
        >
          <defs>
            <linearGradient id="artquil-grad-primary" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="35%" stopColor="#a855f7" />
              <stop offset="70%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>

            <linearGradient id="artquil-grad-ribbon" x1="10" y1="8" x2="30" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.8" />
            </linearGradient>

            <filter id="artquil-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
          </defs>

          {/* Outer Glowing Rounded Ring */}
          <rect 
            x="2" 
            y="2" 
            width="36" 
            height="36" 
            rx="11" 
            fill="#0f111a" 
            stroke="url(#artquil-grad-primary)" 
            strokeWidth="2" 
          />

          {/* Glowing Ambient Core */}
          <circle 
            cx="20" 
            cy="20" 
            r="12" 
            fill="url(#artquil-grad-primary)" 
            opacity="0.22" 
            filter="blur(4px)" 
          />

          {/* Futuristic 'A' + Kinetic Film Quill Ribbon */}
          {/* Left sweeping curve */}
          <path 
            d="M13 29L19.2 10.8C19.5 9.8 20.5 9.8 20.8 10.8L27 29" 
            stroke="url(#artquil-grad-primary)" 
            strokeWidth="3.2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          {/* Kinetic Crossbar Ribbon (Infinity/Quill loop) */}
          <path 
            d="M15 22.5C18 20.5 22 24.5 25 22.5" 
            stroke="url(#artquil-grad-ribbon)" 
            strokeWidth="2.8" 
            strokeLinecap="round" 
          />

          {/* Center Pulsing Sparkle Dot */}
          <circle 
            cx="20" 
            cy="15" 
            r="1.8" 
            fill="#38bdf8" 
            filter="url(#artquil-glow)" 
          />
        </svg>
      </div>

      {showText && (
        <span className="artquil-brand-name">
          Artquil<span className="artquil-dot-ai">.ai</span>
        </span>
      )}
    </div>
  );
}
