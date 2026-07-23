import { useEffect, MutableRefObject } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initCurtainAnimations } from '../utils/curtainAnimation';
import { initScrollAnimations } from '../utils/scrollAnimations';

/**
 * Hook to initialize Lenis smooth scrolling and all GSAP scroll animations.
 * Lenis is tuned for a premium cinematic feel — heavy inertia, buttery smooth.
 */
export default function useCurtainScroll(
  lenisRef: MutableRefObject<Lenis | null>,
  activePanel: any,
  isOverlayMenuOpen: boolean
) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize Lenis — tuned for premium cinematic scroll weight
    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.25,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.8,
    });
    lenisRef.current = lenis;

    // Sync Lenis scroll events with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Connect Lenis RAF with GSAP ticker for 60-120fps precision
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Register GSAP plugins and initialize all scroll animations
    gsap.registerPlugin(ScrollTrigger);
    if (!prefersReducedMotion) {
      initCurtainAnimations();
      // Small delay to ensure DOM is fully painted before setting up reveals
      setTimeout(() => {
        initScrollAnimations();
      }, 100);
    }

    // Refresh ScrollTrigger after all animations registered
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    // Cleanup on unmount
    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
}
