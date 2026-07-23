import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Initializes GSAP ScrollTrigger curtain animations for each full‑screen section.
 * Premium cinematic section transitions — scale, opacity, translateY.
 */
export function initCurtainAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Array of all stacked section cards in DOM order
  const sections = [
    { id: 'hero-section',            innerId: 'hero-section-inner' },
    { id: 'services-section-dark',   innerId: 'services-section-dark-inner' },
    { id: 'works-section',           innerId: 'works-section-inner' },
    { id: 'skills-section-dark',     innerId: 'skills-section-dark-inner' },
    { id: 'about-section-dark',      innerId: 'about-section-dark-inner' },
    { id: 'contact-section-dark',    innerId: 'contact-section-dark-inner' },
  ];

  sections.forEach((section, idx) => {
    const innerEl = document.getElementById(section.innerId);
    if (innerEl) {
      gsap.set(innerEl, {
        transformOrigin: 'center center',
        force3D: true,
        willChange: 'transform, opacity',
      });
    }

    // Hero never has an incoming transition
    if (idx === 0) return;

    const prevSection = sections[idx - 1];
    const prevInner    = document.getElementById(prevSection.innerId);
    const currentInner = document.getElementById(section.innerId);
    const currentOuter = document.getElementById(section.id);
    if (!currentOuter) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: currentOuter,
        start: 'top bottom',
        end: 'top top',
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });

    // Previous section gently recedes behind the incoming rounded curtain.
    if (prevInner) {
      tl.to(prevInner, { scale: 0.965, opacity: 0.38, ease: 'power2.inOut' }, 0);
    }

    // Keep the incoming content stable. Its sticky outer section naturally
    // sweeps upward, giving the same panel-over-panel movement as the reference.
    if (currentInner) {
      tl.fromTo(
        currentInner,
        { y: 18, scale: 1.01, opacity: 0.72 },
        { y: 0, scale: 1, opacity: 1, ease: 'power1.out' },
        0
      );
    }
  });

  // Hero name heading parallax while scrolling away
  const heroNameEl = document.querySelector('#hero-name-heading');
  if (heroNameEl) {
    gsap.to(heroNameEl, {
      y: -60,
      opacity: 0.2,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      },
    });
  }

  // Hero center image parallax
  const heroImageEl = document.querySelector('#bento-col-center img');
  if (heroImageEl) {
    gsap.to(heroImageEl, {
      yPercent: 14,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    });
  }

  // Hero left/right columns subtle parallax
  const bentoLeft = document.querySelector('#bento-col-left');
  if (bentoLeft) {
    gsap.to(bentoLeft, {
      y: -30,
      ease: 'none',
      scrollTrigger: { trigger: '#hero-section', start: 'top top', end: 'bottom top', scrub: 1.0 },
    });
  }
  const bentoRight = document.querySelector('#bento-col-right');
  if (bentoRight) {
    gsap.to(bentoRight, {
      y: 30,
      ease: 'none',
      scrollTrigger: { trigger: '#hero-section', start: 'top top', end: 'bottom top', scrub: 0.8 },
    });
  }

  setTimeout(() => ScrollTrigger.refresh(), 200);
}
