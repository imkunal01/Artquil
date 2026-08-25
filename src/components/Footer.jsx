import React from 'react';
import './Footer.css';
import { Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import Logo from './Logo';

export default function Footer({ onNavigate }) {
  const handleLinkClick = (e, page, targetId) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page, targetId);
    } else {
      window.location.hash = page !== 'home' ? `#${page}` : (targetId || '');
    }
  };

  return (
    <footer className="footer-section" id="contact-footer">
      <div className="footer-container">
        
        {/* Main Footer Row */}
        <div className="footer-top-grid">
          
          {/* Brand Col */}
          <div className="footer-brand-col">
            <a href="#" onClick={(e) => handleLinkClick(e, 'home', null)}>
              <Logo size="lg" />
            </a>
            <p className="footer-tagline">
              Single-pipeline automated prompt-to-video generation platform with synchronized voiceover, sound effects, and musical score.
            </p>
            <div className="footer-contact-info">
              <div className="contact-item">
                <MapPin size={15} className="contact-icon" />
                <span>23 Mig Flats, Shiv Shakti Colony, Prayagraj, UP</span>
              </div>
              <div className="contact-item">
                <Phone size={15} className="contact-icon" />
                <span>+91 80816 37568</span>
              </div>
              <div className="contact-item">
                <Mail size={15} className="contact-icon" />
                <span>contact@artquil.com</span>
              </div>
            </div>
          </div>

          {/* Links Col 1: Product & Tech */}
          <div className="footer-links-col">
            <h5 className="footer-heading">Platform</h5>
            <ul className="footer-links">
              <li><a href="#product" onClick={(e) => handleLinkClick(e, 'product', null)}>Product Suite</a></li>
              <li><a href="#technology" onClick={(e) => handleLinkClick(e, 'technology', null)}>Technology Stack</a></li>
              <li><a href="#technology" onClick={(e) => handleLinkClick(e, 'technology', 'architecture')}>Multi-Model Pipeline</a></li>
              <li><a href="#technology" onClick={(e) => handleLinkClick(e, 'technology', 'stack')}>Inference Architecture</a></li>
              <li><a href="#developers" onClick={(e) => handleLinkClick(e, 'developers', null)}>Developer REST API</a></li>
            </ul>
          </div>

          {/* Links Col 2: Solutions */}
          <div className="footer-links-col">
            <h5 className="footer-heading">Solutions</h5>
            <ul className="footer-links">
              <li><a href="#marketing" onClick={(e) => handleLinkClick(e, 'home', 'who-its-for')}>Marketing &amp; Ads</a></li>
              <li><a href="#elearning" onClick={(e) => handleLinkClick(e, 'home', 'who-its-for')}>E-Learning Creators</a></li>
              <li><a href="#ecommerce" onClick={(e) => handleLinkClick(e, 'home', 'who-its-for')}>E-Commerce Brands</a></li>
              <li><a href="#studios" onClick={(e) => handleLinkClick(e, 'home', 'who-its-for')}>Entertainment Studios</a></li>
              <li><a href="#enterprise" onClick={(e) => handleLinkClick(e, 'contact', null)}>Enterprise Clusters</a></li>
            </ul>
          </div>

          {/* Links Col 3: Company */}
          <div className="footer-links-col">
            <h5 className="footer-heading">Company</h5>
            <ul className="footer-links">
              <li><a href="#about" onClick={(e) => handleLinkClick(e, 'about', null)}>About Us</a></li>
              <li><a href="#research" onClick={(e) => handleLinkClick(e, 'research', null)}>AI/ML Research</a></li>
              <li><a href="#contact" onClick={(e) => handleLinkClick(e, 'contact', null)}>Contact &amp; Support</a></li>
              <li><a href="#developers" onClick={(e) => handleLinkClick(e, 'developers', null)}>SDKs &amp; Documentation</a></li>
              <li><a href="#careers" onClick={(e) => handleLinkClick(e, 'about', null)}>Careers</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} Artquil Private Limited. All rights reserved. Headquartered in Prayagraj, Uttar Pradesh.
          </p>
          <div className="footer-legal-links">
            <a href="#about" onClick={(e) => handleLinkClick(e, 'about', null)}>Privacy Policy</a>
            <a href="#about" onClick={(e) => handleLinkClick(e, 'about', null)}>Terms of Service</a>
            <a href="#technology" onClick={(e) => handleLinkClick(e, 'technology', 'stack')}>AWS Cloud Security</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
