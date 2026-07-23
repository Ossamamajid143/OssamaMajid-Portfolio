import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isTouch = () => window.matchMedia('(pointer: coarse)').matches;

// Scale distances for mobile — less movement on touch
const dist = (d: number) => (isTouch() ? d * 0.5 : d);

// ─── Generic fade-up helper ───────────────────────────────────────────
function fadeUp(
  el: Element | string | null,
  opts: {
    y?: number;
    delay?: number;
    duration?: number;
    ease?: string;
    trigger?: Element | string | null;
    start?: string;
  } = {}
) {
  if (!el) return;
  gsap.fromTo(
    el,
    { opacity: 0, y: opts.y ?? dist(50), force3D: true },
    {
      opacity: 1,
      y: 0,
      duration: opts.duration ?? 0.95,
      delay: opts.delay ?? 0,
      ease: opts.ease ?? 'power3.out',
      clearProps: 'transform',
      scrollTrigger: {
        trigger: (opts.trigger ?? el) as gsap.DOMTarget,
        start: opts.start ?? 'top 88%',
        toggleActions: 'play none none none',
      },
    }
  );
}

// ─── Split text into word spans for stagger ──────────────────────────
function splitWords(el: Element): HTMLSpanElement[] {
  const text = el.textContent ?? '';
  const words = text.trim().split(/\s+/);
  el.textContent = '';
  el.setAttribute('aria-label', text);
  return words.map((word) => {
    const span = document.createElement('span');
    span.textContent = word;
    span.style.display = 'inline-block';
    span.style.willChange = 'transform, opacity';
    el.appendChild(span);
    // Keep the whitespace outside the inline-block. Trailing whitespace inside
    // an inline-block can collapse at line breaks and made About's words join.
    el.appendChild(document.createTextNode(' '));
    return span;
  });
}

// ─── Staggered word reveal ────────────────────────────────────────────
function revealWords(
  el: Element | null,
  opts: { trigger?: Element | null; start?: string; delay?: number } = {}
) {
  if (!el) return;
  const words = splitWords(el);
  gsap.fromTo(
    words,
    { opacity: 0, y: dist(40), rotateX: 8 },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.06,
      delay: opts.delay ?? 0,
      force3D: true,
      scrollTrigger: {
        trigger: (opts.trigger ?? el) as gsap.DOMTarget,
        start: opts.start ?? 'top 82%',
        toggleActions: 'play none none none',
      },
    }
  );
}

// ─── Line mask reveal (clip-path) ─────────────────────────────────────
function lineReveal(
  el: Element | null,
  opts: { trigger?: Element | null; start?: string; delay?: number; duration?: number } = {}
) {
  if (!el) return;
  gsap.fromTo(
    el,
    { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
    {
      clipPath: 'inset(0 0% 0 0)',
      opacity: 1,
      duration: opts.duration ?? 1.0,
      delay: opts.delay ?? 0,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: (opts.trigger ?? el) as gsap.DOMTarget,
        start: opts.start ?? 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
}

// ─── Staggered list item reveal ───────────────────────────────────────
function staggerFadeUp(
  els: NodeListOf<Element> | Element[],
  opts: { trigger?: Element | null; start?: string; baseDelay?: number; stagger?: number; x?: number } = {}
) {
  if (!els || !els.length) return;
  gsap.fromTo(
    Array.from(els),
    { opacity: 0, y: dist(28), x: opts.x ?? 0, force3D: true },
    {
      opacity: 1,
      y: 0,
      x: 0,
      duration: 0.65,
      ease: 'power2.out',
      stagger: opts.stagger ?? 0.08,
      delay: opts.baseDelay ?? 0,
      scrollTrigger: {
        trigger: (opts.trigger ?? els[0]) as gsap.DOMTarget,
        start: opts.start ?? 'top 88%',
        toggleActions: 'play none none none',
      },
    }
  );
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────
export function initScrollAnimations() {
  if (prefersReducedMotion()) return;
  const noParallax = isTouch();

  // ── HERO SECTION ──────────────────────────────────────────────────
  // The hero enters with motion/react animations; add parallax depth layers
  if (!noParallax) {
    // Arrow icon parallax
    gsap.to('#bento-col-left .lucide-arrow-down-right, #bento-col-left svg', {
      y: -dist(15),
      ease: 'none',
      scrollTrigger: { trigger: '#hero-section', start: 'top top', end: 'bottom top', scrub: 1.0 },
    });
  }

  // ── SERVICES SECTION ──────────────────────────────────────────────
  const servicesSection = document.querySelector('#services-section-dark');
  if (servicesSection) {
    // Main heading word reveal
    const servicesHeading = servicesSection.querySelector('h2, [id*="services-main-title"]');
    if (servicesHeading) revealWords(servicesHeading, { trigger: servicesSection, start: 'top 78%' });

    // Services subtitle/intro text
    const servicesIntro = servicesSection.querySelectorAll('.services-intro p, [class*="text-neutral"] > p');
    staggerFadeUp(servicesIntro, { trigger: servicesSection, start: 'top 75%', baseDelay: 0.2 });

    // Each service row fades in with stagger from left
    const serviceRows = servicesSection.querySelectorAll('.service-row, [class*="border-b"][class*="py-"]');
    serviceRows.forEach((row, i) => {
      gsap.fromTo(
        row,
        { opacity: 0, x: -dist(30), force3D: true },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Tech rows within each service
    const techRows = servicesSection.querySelectorAll('.tech-row, [class*="font-mono"][class*="text-xs"]');
    staggerFadeUp(techRows, { trigger: servicesSection, start: 'top 70%', baseDelay: 0.35, stagger: 0.05 });
  }

  // ── WORKS SECTION ─────────────────────────────────────────────────
  // Works intro section
  const worksIntro = document.querySelector('#works-intro-sticky');
  if (worksIntro) {
    const worksTitle = worksIntro.querySelector('h2');
    if (worksTitle) revealWords(worksTitle, { trigger: worksIntro, start: 'top 78%' });
    const worksP = worksIntro.querySelector('p');
    if (worksP) fadeUp(worksP, { trigger: worksIntro, start: 'top 75%', delay: 0.25 });
  }

  // Individual project cards
  const projectCards = document.querySelectorAll('.project-card-reveal');
  projectCards.forEach((card) => {
    const parentSection = card.closest('[id^="project-"]');

    // Project number
    const numEl = card.querySelector('span[class*="text-5xl"], span[class*="text-7xl"], span[class*="text-8xl"]');
    if (numEl) {
      gsap.fromTo(numEl,
        { opacity: 0, x: -dist(25), force3D: true },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: parentSection ?? card, start: 'top 82%', toggleActions: 'play none none none' }
        }
      );
    }

    // Project title — word reveal
    const titleEl = card.querySelector('h3');
    if (titleEl) revealWords(titleEl, { trigger: parentSection ?? card, start: 'top 80%', delay: 0.1 });

    // Meta line (category/year)
    const metaEl = card.querySelector('[class*="font-mono"][class*="text-[10px"]');
    if (metaEl) fadeUp(metaEl, { trigger: parentSection ?? card, start: 'top 80%', y: dist(15), delay: 0.2 });

    // Description
    const descEl = card.querySelector('p');
    if (descEl) fadeUp(descEl, { trigger: parentSection ?? card, start: 'top 78%', delay: 0.3, duration: 0.8 });

    // Tech tags — stagger
    const tags = card.querySelectorAll('span[class*="rounded-full"]');
    staggerFadeUp(tags, { trigger: parentSection ?? card, start: 'top 76%', baseDelay: 0.4, stagger: 0.06 });

    // CTA links
    const links = card.querySelectorAll('a');
    staggerFadeUp(links, { trigger: parentSection ?? card, start: 'top 74%', baseDelay: 0.55, stagger: 0.1 });

    // Image parallax
    const img = card.querySelector('img');
    if (img && !noParallax) {
      gsap.fromTo(
        img,
        { scale: 1.1, force3D: true },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: parentSection ?? card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2.0,
          },
        }
      );
    }

    // Divider line scaleX reveal
    const divider = (parentSection ?? card).querySelector('.project-divider');
    if (divider) {
      gsap.to(divider, {
        scaleX: 1,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: parentSection ?? card,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    }
  });

  // ── SKILLS SECTION ─────────────────────────────────────────────────
  const skillsSection = document.querySelector('#skills-section-dark');
  if (skillsSection) {
    // Heading lines
    const headingLines = skillsSection.querySelectorAll('.skills-heading-line');
    headingLines.forEach((line, i) => {
      gsap.fromTo(
        line,
        { opacity: 0, y: dist(70), force3D: true },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: skillsSection,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Skills title reveal
    const skillsTitle = skillsSection.querySelector('.skills-title-reveal');
    if (skillsTitle) fadeUp(skillsTitle, { trigger: skillsSection, start: 'top 80%', y: dist(40), delay: 0.08 });

    // Skill list items with stagger
    const skillItems = skillsSection.querySelectorAll('.skill-list-item');
    skillItems.forEach((item, i) => {
      const col = item.closest('.skill-list-col');
      gsap.fromTo(
        item,
        { opacity: 0, x: dist(18), force3D: true },
        {
          opacity: 1,
          x: 0,
          duration: 0.55,
          delay: i * 0.04,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: col ?? skillsSection,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Skill category labels
    const categories = skillsSection.querySelectorAll('[class*="tracking-widest"]');
    staggerFadeUp(categories, { trigger: skillsSection, start: 'top 82%', baseDelay: 0.05, stagger: 0.07 });
  }

  // ── ABOUT SECTION ──────────────────────────────────────────────────
  const aboutSection = document.querySelector('#about-section-dark');
  if (aboutSection) {
    // Portrait card reveal
    const cardEl = aboutSection.querySelector('.about-portrait-card');
    if (cardEl) {
      gsap.fromTo(
        cardEl,
        { opacity: 0, y: dist(45), scale: 0.97, force3D: true },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: aboutSection,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // The About heading already has its own motion reveal in React. Keeping it
    // as plain text preserves natural word spacing and line wrapping.

    // Paragraphs stagger
    const aboutPs = aboutSection.querySelectorAll('p');
    aboutPs.forEach((p, i) => {
      gsap.fromTo(
        p,
        { opacity: 0, y: dist(25), force3D: true },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          delay: 0.15 + i * 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: p,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Stat items
    const stats = aboutSection.querySelectorAll('[class*="stat"], [class*="metric"]');
    staggerFadeUp(stats, { trigger: aboutSection, start: 'top 75%', baseDelay: 0.3, stagger: 0.1 });
  }

  // ── CONTACT SECTION ────────────────────────────────────────────────
  const contactSection = document.querySelector('#contact-section-dark');
  if (contactSection) {
    // Heading lines with letter-spacing animation
    const contactHeadingLines = contactSection.querySelectorAll('.contact-heading-line');
    contactHeadingLines.forEach((line, i) => {
      gsap.fromTo(
        line,
        { opacity: 0, y: dist(90), letterSpacing: '0.2em', force3D: true },
        {
          opacity: 1,
          y: 0,
          letterSpacing: '-0.04em',
          duration: 1.2,
          delay: i * 0.14,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: contactSection,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // CTA items (buttons, links)
    const ctaItems = contactSection.querySelectorAll('.contact-cta-reveal');
    ctaItems.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: dist(30), scale: 0.94, force3D: true },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.18 + i * 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contactSection,
            start: 'top 76%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Form fields
    const formFields = contactSection.querySelectorAll('input, textarea');
    staggerFadeUp(formFields, { trigger: contactSection, start: 'top 72%', baseDelay: 0.4, stagger: 0.1 });

    // Footer bar
    const footerBar = contactSection.querySelector('.contact-footer-bar');
    if (footerBar) {
      gsap.fromTo(
        footerBar,
        { opacity: 0, y: dist(20) },
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
