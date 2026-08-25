import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ activePage = 'home', onNavigate, onOpenAuth, currentUser, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, page, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);

    if (onNavigate) {
      onNavigate(page, targetId);
    } else {
      window.location.hash = page !== 'home' ? `#${page}` : (targetId ? `#${targetId}` : '');
    }
  };

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'nav-scrolled' : ''}`}>
      <nav className={`navbar-pill ${isScrolled ? 'pill-scrolled' : ''}`}>
        <a 
          href="#" 
          className="navbar-brand"
          onClick={(e) => handleLinkClick(e, 'home', null)}
          aria-label="Artquil Home"
        >
          <Logo size="md" />
        </a>

        <div className="navbar-links">
          <a 
            href="#about" 
            className={`nav-link ${activePage === 'about' ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, 'about', null)}
          >
            About
          </a>
          <a 
            href="#product" 
            className={`nav-link ${activePage === 'product' ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, 'product', null)}
          >
            Product
          </a>
          <a 
            href="#technology" 
            className={`nav-link ${activePage === 'technology' ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, 'technology', null)}
          >
            Technology
          </a>
          <a 
            href="#developers" 
            className={`nav-link ${activePage === 'developers' ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, 'developers', null)}
          >
            Developers
          </a>
          <a 
            href="#research" 
            className={`nav-link ${activePage === 'research' ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, 'research', null)}
          >
            Research
          </a>
          <a 
            href="#contact" 
            className={`nav-link ${activePage === 'contact' ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, 'contact', null)}
          >
            Contact
          </a>
        </div>

        <div className="navbar-actions">
          {currentUser ? (
            /* Logged In User Profile Pill */
            <div className="nav-user-profile-relative">
              <button 
                className="nav-user-pill-btn"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                <div className="user-avatar-dot">
                  <User size={13} />
                </div>
                <span className="user-pill-name">{currentUser.name}</span>
                <ChevronDown size={14} className="user-pill-chevron" />
              </button>

              {profileDropdownOpen && (
                <div className="nav-user-dropdown-menu">
                  <div className="dropdown-user-header">
                    <span className="dropdown-name">{currentUser.name}</span>
                    <span className="dropdown-email">{currentUser.email}</span>
                    <span className="dropdown-plan-badge">{currentUser.plan || 'Pro Creator'}</span>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button 
                    className="dropdown-item-btn logout"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      if (onLogout) onLogout();
                    }}
                  >
                    <LogOut size={14} />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Not logged in: Log in & Start Free buttons */
            <>
              <button 
                className="btn-login"
                onClick={() => onOpenAuth && onOpenAuth('login')}
              >
                Log in
              </button>
              <button 
                className="btn-start"
                onClick={() => onOpenAuth && onOpenAuth('signup')}
              >
                <span>Start free</span>
              </button>
            </>
          )}
          
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <a 
            href="#about" 
            className={activePage === 'about' ? 'active-mobile' : ''}
            onClick={(e) => handleLinkClick(e, 'about', null)}
          >
            About
          </a>
          <a 
            href="#product" 
            className={activePage === 'product' ? 'active-mobile' : ''}
            onClick={(e) => handleLinkClick(e, 'product', null)}
          >
            Product
          </a>
          <a 
            href="#technology" 
            className={activePage === 'technology' ? 'active-mobile' : ''}
            onClick={(e) => handleLinkClick(e, 'technology', null)}
          >
            Technology
          </a>
          <a 
            href="#developers" 
            className={activePage === 'developers' ? 'active-mobile' : ''}
            onClick={(e) => handleLinkClick(e, 'developers', null)}
          >
            Developers
          </a>
          <a 
            href="#research" 
            className={activePage === 'research' ? 'active-mobile' : ''}
            onClick={(e) => handleLinkClick(e, 'research', null)}
          >
            Research
          </a>
          <a 
            href="#contact" 
            className={activePage === 'contact' ? 'active-mobile' : ''}
            onClick={(e) => handleLinkClick(e, 'contact', null)}
          >
            Contact
          </a>

          <div className="mobile-menu-actions">
            {currentUser ? (
              <div className="mobile-user-status">
                <span>Signed in as <strong>{currentUser.name}</strong></span>
                <button 
                  className="btn-login full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onLogout) onLogout();
                  }}
                >
                  Log out
                </button>
              </div>
            ) : (
              <>
                <button 
                  className="btn-login full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenAuth) onOpenAuth('login');
                  }}
                >
                  Log in
                </button>
                <button 
                  className="btn-start full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenAuth) onOpenAuth('signup');
                  }}
                >
                  Start free
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
