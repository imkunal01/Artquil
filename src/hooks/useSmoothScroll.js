import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

let globalLenis = null;

/**
 * Global helper to trigger snappy, buttery smooth scroll to an element or offset
 * @param {string | HTMLElement | number} target - CSS selector, element, or pixel number
 * @param {Object} options - Lenis scrollTo options
 */
export function smoothScrollTo(target, options = {}) {
  if (globalLenis) {
    globalLenis.scrollTo(target, {
      duration: 0.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -12 * t)),
      ...options,
    });
  } else {
    if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

/**
 * Custom hook to initialize fast, ultra-responsive Lenis scrolling across the application.
 * Tuned with faster response times, higher wheel multiplier, and low inertia latency.
 */
export function useSmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Disable smooth scroll on reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 0.55,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -14 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.25,
      touchMultiplier: 1.5,
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = lenis;
    globalLenis = lenis;

    let rafId = null;
    let isRunning = true;

    function raf(time) {
      if (isRunning) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
    }

    rafId = requestAnimationFrame(raf);

    // Pause RAF when document is hidden to conserve GPU/CPU
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        if (rafId) cancelAnimationFrame(rafId);
      } else {
        isRunning = true;
        rafId = requestAnimationFrame(raf);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isRunning = false;
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      lenis.destroy();
      globalLenis = null;
    };
  }, []);

  return lenisRef;
}

export default useSmoothScroll;
