import React, { useState, useEffect, lazy, Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StyleShowcase from './components/StyleShowcase';
import PublishEverywhere from './components/PublishEverywhere';
import VideoFeatureBanner from './components/VideoFeatureBanner';
import HowItWorks from './components/HowItWorks';
import PlatformOverview from './components/PlatformOverview';
import RealResults from './components/RealResults';
import WhyChooseUs from './components/WhyChooseUs';
import AudienceGrid from './components/AudienceGrid';
import Testimonials from './components/Testimonials';
import PricingPlans from './components/PricingPlans';
import FAQSection from './components/FAQSection';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';
import { useSmoothScroll, smoothScrollTo } from './hooks/useSmoothScroll';

// Code-split secondary routes & modals for instant initial bundle delivery
const ProductPage = lazy(() => import('./components/ProductPage/ProductPage'));
const TechnologyPage = lazy(() => import('./components/TechnologyPage/TechnologyPage'));
const DevelopersPage = lazy(() => import('./components/DevelopersPage/DevelopersPage'));
const ResearchPage = lazy(() => import('./components/ResearchPage/ResearchPage'));
const AboutPage = lazy(() => import('./components/AboutPage/AboutPage'));
const ContactPage = lazy(() => import('./components/ContactPage/ContactPage'));
const AuthModal = lazy(() => import('./components/AuthModal/AuthModal'));

const PageLoader = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#a855f7',
    fontSize: '14px',
    fontWeight: 600,
    letterSpacing: '1px'
  }}>
    Loading Artquil Engine...
  </div>
);

function parseCurrentRoute() {
  const hash = window.location.hash.toLowerCase().replace('#', '');
  const searchParams = new URLSearchParams(window.location.search);
  const pageParam = searchParams.get('page');

  if (hash.includes('product') || pageParam === 'product') return 'product';
  if (hash.includes('technology') || pageParam === 'technology') return 'technology';
  if (hash.includes('developer') || pageParam === 'developers') return 'developers';
  if (hash.includes('research') || pageParam === 'research') return 'research';
  if (hash.includes('about') || pageParam === 'about') return 'about';
  if (hash.includes('contact') || pageParam === 'contact') return 'contact';
  return 'home';
}

function App() {
  // Initialize buttery smooth momentum scrolling engine
  useSmoothScroll();

  const [currentPage, setCurrentPage] = useState(parseCurrentRoute);

  // Authentication Modal State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'signup'
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('artquil_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Listen to browser hash and history back/forward navigation
  useEffect(() => {
    const handleHashOrPopState = () => {
      setCurrentPage(parseCurrentRoute());
    };

    window.addEventListener('hashchange', handleHashOrPopState);
    window.addEventListener('popstate', handleHashOrPopState);

    return () => {
      window.removeEventListener('hashchange', handleHashOrPopState);
      window.removeEventListener('popstate', handleHashOrPopState);
    };
  }, []);

  const handleNavigate = (page, targetId) => {
    setCurrentPage(page);

    if (page === 'home') {
      window.history.pushState(null, '', targetId ? `#${targetId}` : '#');
      if (targetId) {
        setTimeout(() => {
          smoothScrollTo(`#${targetId}`);
        }, 100);
      } else {
        smoothScrollTo(0);
      }
    } else {
      window.history.pushState(null, '', `#${page}`);
      if (targetId) {
        setTimeout(() => {
          smoothScrollTo(`#${targetId}`);
        }, 100);
      } else {
        smoothScrollTo(0);
      }
    }
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('artquil_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('artquil_user');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="app-container">
      {/* 1. Global Floating Pill Navigation */}
      <Navbar 
        activePage={currentPage} 
        onNavigate={handleNavigate}
        onOpenAuth={handleOpenAuth}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <main>
        {/* 2. Routing Pages */}
        <Suspense fallback={<PageLoader />}>
          {currentPage === 'technology' ? (
            /* Dedicated Technology Architecture & Multi-Model Engine Page */
            <TechnologyPage 
              onNavigateHome={() => handleNavigate('home', null)}
              onOpenAuth={() => handleOpenAuth('signup')}
            />
          ) : currentPage === 'product' ? (
            /* Dedicated Product Page (Suite, Hero, Upscale Slider, Sandbox, Specs) */
            <ProductPage 
              onNavigateHome={() => handleNavigate('home', null)}
              onOpenAuth={() => handleOpenAuth('signup')}
            />
          ) : currentPage === 'developers' ? (
            /* Developers & REST API Docs Page */
            <DevelopersPage 
              onOpenAuth={() => handleOpenAuth('signup')}
            />
          ) : currentPage === 'research' ? (
            /* Research & AI Labs Page */
            <ResearchPage />
          ) : currentPage === 'about' ? (
            /* About Us & Vision Page */
            <AboutPage 
              onOpenAuth={() => handleOpenAuth('signup')}
            />
          ) : currentPage === 'contact' ? (
            /* Contact & Enterprise Inquiries Page */
            <ContactPage />
          ) : (
            /* Main Landing Page */
            <>
              {/* Hero Section: 3D Video Shuffling Deck & Prompt Studio */}
              <HeroSection />

              {/* Video Styles Showcase: One prompt. Any video style you can imagine. */}
              <StyleShowcase />

              {/* Social / Distribution Ecosystem */}
              <PublishEverywhere />

              {/* Large Video Feature Spotlight Banner (Ripple Distortion) */}
              <VideoFeatureBanner />

              {/* How It Works (Steps 1, 2, 3: Video Prompt, Camera Styles, Synced Audio) */}
              <HowItWorks />

              {/* Platform Overview (Create, Edit, Scale, Integrate) */}
              <PlatformOverview />

              {/* Real Results & ROI Metric Cards (-85%, 10x, ₹0) */}
              <RealResults />

              {/* Why Teams Choose Artquil (6 Features Grid) */}
              <WhyChooseUs />

              {/* Who It's For (AI for Everyone's Creativity: 6 Audiences) */}
              <AudienceGrid />

              {/* Testimonials & Social Proof */}
              <Testimonials />

              {/* Pricing Plans (Simple Plans. No Surprises.) */}
              <PricingPlans />

              {/* FAQ Section (Accordion) */}
              <FAQSection />

              {/* CTA Banner */}
              <CTABanner />
            </>
          )}
        </Suspense>
      </main>

      {/* Company & Product Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Auth Modal for Log In & Sign Up */}
      <Suspense fallback={null}>
        {authModalOpen && (
          <AuthModal 
            isOpen={authModalOpen}
            initialMode={authModalMode}
            onClose={() => setAuthModalOpen(false)}
            onAuthSuccess={handleAuthSuccess}
          />
        )}
      </Suspense>
    </div>
  );
}

export default App;
