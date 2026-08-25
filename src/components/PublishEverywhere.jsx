import React from 'react';
import './PublishEverywhere.css';
import { ShoppingBag, Globe } from 'lucide-react';

const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const FigmaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12a3 3 0 1 0 3 3 3 3 0 0 0-3-3m-4.5 6a3 3 0 0 0 3-3V9H6a3 3 0 0 0 0 6 3 3 0 0 0 1.5 0M6 9a3 3 0 0 1 3-3h3v6H6a3 3 0 0 1 0-6m6-6h3a3 3 0 0 1 0 6h-3V3m3 6a3 3 0 0 1 0 6h-3V9h3"/>
  </svg>
);

// Custom sleek SVG icons for TikTok, Pinterest, X, Behance, Figma, Discord
const TikTokIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.89-2.88 2.89 2.89 0 0 1 2.89-2.88c.28 0 .54.04.79.1V9.02a6.34 6.34 0 0 0-.79-.05A6.34 6.34 0 0 0 3 15.31 6.34 6.34 0 0 0 9.34 21.65a6.34 6.34 0 0 0 6.34-6.34V8.58a8.28 8.28 0 0 0 4.91 1.62V6.75a4.88 4.88 0 0 1-1-.06z"/>
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const PinterestIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.98-.12-2.48.02-3.55l1.04-4.41s-.27-.53-.27-1.32c0-1.24.72-2.16 1.62-2.16.76 0 1.13.57 1.13 1.26 0 .77-.49 1.92-.74 2.99-.21.89.44 1.61 1.32 1.61 1.58 0 2.8-1.67 2.8-4.08 0-2.13-1.53-3.62-3.72-3.62-2.53 0-4.02 1.9-4.02 3.86 0 .76.3 1.58.66 2.03.07.09.08.17.06.26l-.25 1.02c-.04.16-.13.2-.3.12-1.12-.52-1.82-2.15-1.82-3.46 0-2.82 2.05-5.41 5.91-5.41 3.1 0 5.51 2.21 5.51 5.16 0 3.08-1.94 5.56-4.64 5.56-.91 0-1.76-.47-2.05-1.02l-.56 2.13c-.2 1.05-.75 2.37-1.12 3.19A12 12 0 1 0 12 0z"/>
  </svg>
);

const BehanceIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 7h-7v2h7V7zm1.726 10c-.442 1.297-2.029 3-4.726 3-3.328 0-5.474-2.467-5.474-5.5 0-3.328 2.336-5.5 5.25-5.5 3.088 0 4.95 2.168 4.95 5.5v1H16.48c.086 1.76 1.378 2.84 2.88 2.84 1.17 0 2.086-.54 2.518-1.34h1.848zm-4.726-5.5c-1.365 0-2.316.92-2.46 2.22h4.86c-.066-1.34-.962-2.22-2.4-2.22zM7.8 13.6c1.37 0 2.47-.68 2.47-2.05 0-1.25-.97-1.85-2.05-1.85H4.2v3.9H7.8zm.24 4.8c1.55 0 2.76-.78 2.76-2.28 0-1.38-1.09-2.12-2.61-2.12H4.2v4.4h3.84zM0 6v12h8.04c3.08 0 4.96-1.57 4.96-3.8 0-1.5-.92-2.68-2.26-3.13 1.06-.5 1.83-1.55 1.83-2.9C12.57 6.45 10.9 6 8.35 6H0z"/>
  </svg>
);

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 12.33c-.76 1.76-2.45 2.97-4.64 2.97-2.93 0-5.3-2.37-5.3-5.3s2.37-5.3 5.3-5.3c1.34 0 2.56.5 3.5 1.33l-1.42 1.42c-.54-.48-1.27-.75-2.08-.75-1.82 0-3.3 1.48-3.3 3.3s1.48 3.3 3.3 3.3c1.55 0 2.68-.96 2.96-2.3H12v-2.03h5.64c.05.3.08.62.08.97 0 2.1-.73 4.02-2.08 5.36z"/>
  </svg>
);

const PLATFORMS = [
  { name: 'Instagram', icon: <InstagramIcon /> },
  { name: 'TikTok', icon: <TikTokIcon /> },
  { name: 'YouTube', icon: <YoutubeIcon /> },
  { name: 'Shopify', icon: <ShoppingBag size={22} /> },
  { name: 'Web', icon: <Globe size={22} /> },
  { name: 'Google', icon: <GoogleIcon /> },
  { name: 'Pinterest', icon: <PinterestIcon /> },
  { name: 'X (Twitter)', icon: <XIcon /> },
  { name: 'Behance', icon: <BehanceIcon /> },
  { name: 'Figma', icon: <FigmaIcon /> },
];

import { useScrollReveal } from '../hooks/useScrollReveal';

export default function PublishEverywhere() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.2 });

  return (
    <section className="publish-section" ref={sectionRef}>
      <div className="publish-container">
        <h2 className={`publish-headline reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          Publish everywhere your <span className="highlight-audience">audience</span> lives
        </h2>

        <div className="platforms-row">
          {PLATFORMS.map((plat, idx) => (
            <div 
              key={idx} 
              className={`platform-icon-item reveal-init delay-${(idx + 1) * 100 > 800 ? 800 : (idx + 1) * 100} ${isVisible ? 'reveal-visible' : ''}`} 
              title={plat.name}
            >
              {plat.icon}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
