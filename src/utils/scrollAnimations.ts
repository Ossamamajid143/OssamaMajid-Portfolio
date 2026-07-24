import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isTouch = () => window.matchMedia('(pointer: coarse)').matches;

// Scale distances for mobile — subtle controlled movement
const dist = (d: number) => (isTouch() ? d * 0.5 : d);

// ─── Generic Fade-Up Helper ───────────────────────────────────────────
function fadeUp(
  el: Element | string | null,
  opts: {
    y?: number;
    delay?: number;
    duration?: number;
    ease?: string;
    trigger?: Element | string | null | false;
    start?: string;
  } = {}
) {
  if (!el) return;
  const noScrollTrigger = opts.trigger === null || opts.trigger === false;
  gsap.fromTo(
    el,
    { opacity: 0, y: opts.y ?? dist(40), force3D: true },
    {
      opacity: 1,
      y: 0,
      duration: opts.duration ?? 0.95,
      delay: opts.delay ?? 0,
      ease: opts.ease ?? 'power3.out',
      clearProps: 'transform',
      scrollTrigger: noScrollTrigger ? undefined : {
        trigger: (opts.trigger ?? el) as gsap.DOMTarget,
        start: opts.start ?? 'top 88%',
        toggleActions: 'play none none none',
      },
    }
  );
}

// ─── Premium Line-Mask Text Reveal Helper ────────────────────────────
/**
 * Wraps text lines/words into overflow-hidden clip masks,
 * then animates inner spans from bottom-to-top (yPercent: 110 -> 0) with power4.out.
 */
function revealLinesMask(
  el: Element | null,
  opts: {
    trigger?: Element | null | false;
    start?: string;
    delay?: number;
    duration?: number;
    stagger?: number;
    ease?: string;
    byWords?: boolean;
  } = {}
) {
  if (!el) return;

  // Prevent duplicate wrapping
  if (el.getAttribute('data-mask-split') === 'true') return;
  el.setAttribute('data-mask-split', 'true');

  const text = el.textContent?.trim() || '';
  if (!text) return;

  const rawHtml = el.innerHTML.trim();
  const hasBr = rawHtml.includes('<br>');

  let segments: string[] = [];
  if (hasBr) {
    segments = rawHtml.split(/<br\s*\/?>/i);
  } else if (opts.byWords) {
    segments = text.split(/\s+/);
  } else {
    // Default: split words or preserve single line
    segments = text.split(/\s+/);
  }

  el.innerHTML = '';
  el.setAttribute('aria-label', text);

  const targets: HTMLElement[] = [];

  segments.forEach((segText, i) => {
    const maskSpan = document.createElement('span');
    maskSpan.className = 'mask-line-container';
    maskSpan.style.display = 'inline-block';
    maskSpan.style.overflow = 'hidden';
    maskSpan.style.verticalAlign = 'top';
    maskSpan.style.lineHeight = '1.05';
    maskSpan.style.paddingBottom = '0.08em';

    const innerSpan = document.createElement('span');
    innerSpan.className = 'mask-line-inner';
    innerSpan.innerHTML = segText;
    innerSpan.style.display = 'inline-block';
    innerSpan.style.willChange = 'transform, opacity';

    maskSpan.appendChild(innerSpan);
    el.appendChild(maskSpan);

    if (i < segments.length - 1) {
      if (opts.byWords || !hasBr) {
        el.appendChild(document.createTextNode(' '));
      } else {
        el.appendChild(document.createElement('br'));
      }
    }

    targets.push(innerSpan);
  });

  const triggerConfig = opts.trigger === false ? undefined : {
    trigger: (opts.trigger ?? el) as gsap.DOMTarget,
    start: opts.start ?? 'top 85%',
    toggleActions: 'play none none none',
  };

  gsap.fromTo(
    targets,
    {
      yPercent: 115,
      opacity: 0,
      rotateX: 6,
      force3D: true,
    },
    {
      yPercent: 0,
      opacity: 1,
      rotateX: 0,
      duration: opts.duration ?? 1.2,
      delay: opts.delay ?? 0,
      ease: opts.ease ?? 'power4.out',
      stagger: opts.stagger ?? 0.08,
      force3D: true,
      scrollTrigger: triggerConfig,
    }
  );
}

// ─── Staggered List / Element Reveal Helper ──────────────────────────
function staggerFadeUp(
  els: NodeListOf<Element> | Element[],
  opts: { trigger?: Element | null | false; start?: string; baseDelay?: number; stagger?: number; x?: number } = {}
) {
  if (!els || !els.length) return;
  const triggerConfig = opts.trigger === false ? undefined : {
    trigger: (opts.trigger ?? els[0]) as gsap.DOMTarget,
    start: opts.start ?? 'top 88%',
    toggleActions: 'play none none none',
  };

  gsap.fromTo(
    Array.from(els),
    { opacity: 0, y: dist(30), x: opts.x ?? 0, force3D: true },
    {
      opacity: 1,
      y: 0,
      x: 0,
      duration: 0.85,
      ease: 'power3.out',
      stagger: opts.stagger ?? 0.08,
      delay: opts.baseDelay ?? 0,
      scrollTrigger: triggerConfig,
    }
  );
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────
export function initScrollAnimations() {
  if (prefersReducedMotion()) return;
  const noParallax = isTouch();

  // ── 1. HERO SECTION ENTRY ANIMATIONS ───────────────────────────────
  const heroHeading = document.querySelector('#hero-name-heading');
  if (heroHeading) {
    revealLinesMask(heroHeading, {
      trigger: false, // Run immediately on load
      delay: 0.1,
      duration: 1.35,
      ease: 'power4.out',
      byWords: true,
      stagger: 0.1,
    });
  }

  // Hero left intro copy & contact button
  const heroLeftItems = document.querySelectorAll('#bento-col-left > *');
  if (heroLeftItems.length) {
    staggerFadeUp(heroLeftItems, {
      trigger: false,
      baseDelay: 0.4,
      stagger: 0.12,
    });
  }

  // Hero middle portrait photo
  const heroPhoto = document.querySelector('#bento-col-center');
  if (heroPhoto) {
    fadeUp(heroPhoto, {
      trigger: false,
      delay: 0.3,
      duration: 1.1,
      y: dist(45),
      ease: 'power3.out',
    });
  }

  // Hero right date counter
  const heroRight = document.querySelector('#bento-col-right');
  if (heroRight) {
    fadeUp(heroRight, {
      trigger: false,
      delay: 0.45,
      duration: 1.0,
      y: dist(35),
      ease: 'power3.out',
    });
  }

  // Hero arrow parallax
  if (!noParallax) {
    gsap.to('#bento-col-left .lucide-arrow-down-right, #bento-col-left svg', {
      y: -dist(20),
      ease: 'none',
      scrollTrigger: { trigger: '#hero-section', start: 'top top', end: 'bottom top', scrub: 1.0 },
    });
  }

  // ── 2. SERVICES SECTION ANIMATIONS ─────────────────────────────────
  const servicesSection = document.querySelector('#services-section-dark');
  if (servicesSection) {
    // Heading mask reveal
    const servicesHeading = servicesSection.querySelector('h2, #services-main-title');
    if (servicesHeading) {
      revealLinesMask(servicesHeading, {
        trigger: servicesSection,
        start: 'top 80%',
        delay: 0.05,
        duration: 1.25,
        ease: 'power4.out',
      });
    }

    // Intro paragraph
    const servicesIntroP = servicesSection.querySelectorAll('#services-section-header p, #services-section-header span');
    if (servicesIntroP.length) {
      staggerFadeUp(servicesIntroP, {
        trigger: servicesSection,
        start: 'top 78%',
        baseDelay: 0.2,
        stagger: 0.1,
      });
    }

    // Service blocks stagger
    const serviceRows = servicesSection.querySelectorAll('[id^="service-block-"]');
    serviceRows.forEach((row, i) => {
      gsap.fromTo(
        row,
        { opacity: 0, y: dist(35), force3D: true },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }

  // ── 3. WORKS SECTION ANIMATIONS ────────────────────────────────────
  const worksSection = document.querySelector('#works-section');
  if (worksSection) {
    const worksTitle = worksSection.querySelector('h2, #works-main-title');
    if (worksTitle) {
      revealLinesMask(worksTitle, {
        trigger: worksSection,
        start: 'top 85%',
        delay: 0.05,
        duration: 1.25,
        ease: 'power4.out',
      });
    }

    const worksHeaderCopy = worksSection.querySelectorAll('#works-section p, #works-section span[class*="font-mono"]');
    if (worksHeaderCopy.length) {
      staggerFadeUp(worksHeaderCopy, {
        trigger: worksSection,
        start: 'top 82%',
        baseDelay: 0.25,
        stagger: 0.1,
      });
    }
  }

  // ── 4. SKILLS SECTION ANIMATIONS ───────────────────────────────────
  const skillsSection = document.querySelector('#skills-section-dark');
  if (skillsSection) {
    // Heading lines mask reveal
    const headingLines = skillsSection.querySelectorAll('.skills-heading-line');
    headingLines.forEach((line, i) => {
      revealLinesMask(line, {
        trigger: skillsSection,
        start: 'top 80%',
        delay: i * 0.12,
        duration: 1.25,
        ease: 'power4.out',
      });
    });

    // Skills title reveal
    const skillsTitle = skillsSection.querySelector('.skills-title-reveal');
    if (skillsTitle) {
      revealLinesMask(skillsTitle, {
        trigger: skillsSection,
        start: 'top 80%',
        delay: 0.1,
        duration: 1.2,
        ease: 'power4.out',
      });
    }

    // Skill category lists with stagger
    const skillCols = skillsSection.querySelectorAll('.skill-list-col');
    skillCols.forEach((col, i) => {
      staggerFadeUp(col.querySelectorAll('.skill-list-item'), {
        trigger: col,
        start: 'top 88%',
        baseDelay: i * 0.1,
        stagger: 0.05,
      });
    });
  }

  // ── 5. ABOUT SECTION ANIMATIONS ────────────────────────────────────
  const aboutSection = document.querySelector('#about-section-dark');
  if (aboutSection) {
    // Portrait card reveal
    const cardEl = aboutSection.querySelector('.about-portrait-card');
    if (cardEl) {
      gsap.fromTo(
        cardEl,
        { opacity: 0, y: dist(45), scale: 0.96, force3D: true },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: aboutSection,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // About main heading mask reveal
    const aboutHeading = aboutSection.querySelector('h2');
    if (aboutHeading) {
      revealLinesMask(aboutHeading, {
        trigger: aboutSection,
        start: 'top 80%',
        delay: 0.1,
        duration: 1.25,
        ease: 'power4.out',
        byWords: true,
      });
    }

    // Paragraphs stagger
    const aboutPs = aboutSection.querySelectorAll('p');
    if (aboutPs.length) {
      staggerFadeUp(aboutPs, {
        trigger: aboutSection,
        start: 'top 78%',
        baseDelay: 0.3,
        stagger: 0.12,
      });
    }
  }

  // ── 6. CONTACT SECTION ANIMATIONS ──────────────────────────────────
  const contactSection = document.querySelector('#contact-section-dark');
  if (contactSection) {
    // Heading lines mask reveal
    const contactHeadingLines = contactSection.querySelectorAll('.contact-heading-line');
    contactHeadingLines.forEach((line, i) => {
      revealLinesMask(line, {
        trigger: contactSection,
        start: 'top 80%',
        delay: i * 0.14,
        duration: 1.3,
        ease: 'power4.out',
      });
    });

    // Form card reveal
    const ctaCard = contactSection.querySelector('.contact-cta-reveal');
    if (ctaCard) {
      gsap.fromTo(
        ctaCard,
        { opacity: 0, y: dist(40), scale: 0.95, force3D: true },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.95,
          delay: 0.25,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contactSection,
            start: 'top 76%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Form input fields stagger
    const formFields = contactSection.querySelectorAll('input, textarea, button[type="submit"]');
    if (formFields.length) {
      staggerFadeUp(formFields, {
        trigger: ctaCard ?? contactSection,
        start: 'top 74%',
        baseDelay: 0.35,
        stagger: 0.08,
      });
    }

    // Footer bar fade-up
    const footerBar = contactSection.querySelector('.contact-footer-bar');
    if (footerBar) {
      gsap.fromTo(
        footerBar,
        { opacity: 0, y: dist(20), force3D: true },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerBar,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }

  // ── GLOBAL SCROLL-TRIGGERED PARALLAX ON SECTION HEADINGS ──────────
  if (!noParallax) {
    const sectionHeadings = document.querySelectorAll(
      '#services-section-dark h2, #skills-section-dark h2, #about-section-dark h2, #contact-section-dark h2'
    );
    sectionHeadings.forEach((heading) => {
      const parentSection = heading.closest('section') ?? heading.parentElement;
      if (!parentSection) return;
      gsap.to(heading, {
        y: -dist(20),
        ease: 'none',
        scrollTrigger: {
          trigger: parentSection,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    });
  }

  setTimeout(() => ScrollTrigger.refresh(), 350);
}
