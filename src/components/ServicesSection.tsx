import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

interface TechRow {
  num: string;
  items: string;
}

interface ServiceData {
  id: string;
  num: string;
  title: string;
  description: string;
  techs: TechRow[];
}

const SERVICES_DATA: ServiceData[] = [
  {
    id: 'fullstack',
    num: '(01)',
    title: 'Full-Stack Development',
    description: 'From frontend interactions to backend APIs, I build complete web solutions. I work with modern stacks to deliver apps that are scalable, maintainable, and ready for real-world users.',
    techs: [
      { num: '01', items: 'React, Node.js, Express.js' },
      { num: '02', items: 'REST APIs, Firebase, Docker' },
      { num: '03', items: 'Git, GitHub, Postman' }
    ]
  },
  {
    id: 'frontend',
    num: '(02)',
    title: 'UI/UX & Frontend',
    description: 'Good design feels effortless. I design and develop responsive, intuitive interfaces that work smoothly across devices, with a strong focus on clarity, accessibility, and performance.',
    techs: [
      { num: '01', items: 'NextJs, TailwindCSS, GSAP' },
      { num: '02', items: 'Figma → Pixel-perfect code' }
    ]
  },
  {
    id: 'performance',
    num: '(03)',
    title: 'Optimization',
    description: 'I focus on building systems that stay reliable as things scale. From handling data efficiently to designing clean architecture, I apply core computer science principles to keep applications fast, stable, and future-ready.',
    techs: [
      { num: '01', items: 'Data Structures & Algorithms' },
      { num: '02', items: 'DBMS, OOP, OS Fundamentals' },
      { num: '03', items: 'Scalable systems & data pipelines' }
    ]
  }
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Setup GSAP MatchMedia ScrollTrigger animations
    const mm = gsap.matchMedia();

    // Desktop: Premium Sticky Stack Progress Dimming & Reveals
    mm.add('(min-width: 768px)', () => {
      SERVICES_DATA.forEach((service) => {
        const sectionEl = document.getElementById(`service-block-${service.id}`);
        if (!sectionEl) return;

        const dividerEl = sectionEl.querySelector('.service-divider');
        const numEl = sectionEl.querySelector('.service-num');
        const titleEl = sectionEl.querySelector('.service-title');
        const descEl = sectionEl.querySelector('.service-desc');
        const techRows = sectionEl.querySelectorAll('.tech-row');

        // Initial setup for desktop active states (start subtle)
        gsap.set([numEl, titleEl], { opacity: 0.25, color: '#8c8a82' });
        gsap.set(descEl, { opacity: 0.25, color: '#404040' });
        gsap.set(techRows, { opacity: 0.25 });

        // Divider Line scaleX: 0 -> 1 on scroll
        gsap.fromTo(dividerEl,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionEl,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );

        // Slide up index + title on scroll trigger
        gsap.fromTo([numEl, titleEl],
          { y: 50 },
          {
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionEl,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          }
        );

        // Description slide up
        gsap.fromTo(descEl,
          { y: 30 },
          {
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: descEl,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );

        // Tech rows stagger
        gsap.fromTo(techRows,
          { x: -30 },
          {
            x: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionEl,
              start: 'top 75%',
              toggleActions: 'play none none none',
            }
          }
        );

        // Section brightness & progress control
        ScrollTrigger.create({
          trigger: sectionEl,
          start: 'top 40%',
          end: 'bottom 40%',
          onToggle: (self) => {
            if (self.isActive) {
              gsap.to([numEl, titleEl], { opacity: 1, color: '#EAE7DF', duration: 0.4 });
              gsap.to(descEl, { opacity: 1, color: '#A3A3A3', duration: 0.4 });
              gsap.to(techRows, { opacity: 1, duration: 0.4 });
            } else {
              gsap.to([numEl, titleEl], { opacity: 0.25, color: '#8c8a82', duration: 0.4 });
              gsap.to(descEl, { opacity: 0.25, color: '#404040', duration: 0.4 });
              gsap.to(techRows, { opacity: 0.25, duration: 0.4 });
            }
          }
        });
      });
    });

    // Mobile: Simplified linear animations (no sticky-stack Dimming to save screenspace)
    mm.add('(max-width: 767px)', () => {
      SERVICES_DATA.forEach((service) => {
        const sectionEl = document.getElementById(`service-block-${service.id}`);
        if (!sectionEl) return;

        const dividerEl = sectionEl.querySelector('.service-divider');
        const numEl = sectionEl.querySelector('.service-num');
        const titleEl = sectionEl.querySelector('.service-title');
        const descEl = sectionEl.querySelector('.service-desc');
        const techRows = sectionEl.querySelectorAll('.tech-row');

        // Reset elements to be fully readable natively on mobile
        gsap.set([numEl, titleEl], { opacity: 1, color: '#EAE7DF' });
        gsap.set(descEl, { opacity: 1, color: '#A3A3A3' });
        gsap.set(techRows, { opacity: 1 });

        // Divider Line scaleX: 0 -> 1 on scroll
        gsap.fromTo(dividerEl,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionEl,
              start: 'top 95%',
              toggleActions: 'play none none none',
            }
          }
        );

        // Slide up on scroll trigger
        gsap.fromTo([numEl, titleEl],
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionEl,
              start: 'top 90%',
              toggleActions: 'play none none none',
            }
          }
        );

        // Description slide up
        gsap.fromTo(descEl,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: descEl,
              start: 'top 90%',
              toggleActions: 'play none none none',
            }
          }
        );

        // Tech rows stagger
        gsap.fromTo(techRows,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionEl,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );
      });
    });

    // Clean up on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="services-section-dark"
      className="w-full md:sticky md:top-0 z-10 min-h-screen bg-[#050505] text-[#EAE7DF] overflow-hidden relative flex flex-col justify-center"
    >
      <div
        id="services-section-dark-inner"
        className="w-full h-full px-6 py-20 md:py-28 lg:py-36 flex flex-col justify-center"
      >
      {/* Decorative ambient borders */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#EAE7DF]/10 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#EAE7DF]/10 to-transparent pointer-events-none" />

      {/* 1. INTRO HEADER SECTOR */}
      <div
        id="services-section-header"
        className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-20 md:mb-32"
      >
        <div className="col-span-1 md:col-span-7">
          <h2
            id="services-main-title"
            className="font-display font-black tracking-tighter uppercase leading-[0.8] text-[#EAE7DF] select-none"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)' }}
          >
            WHAT I DO /
          </h2>
        </div>

        <div className="col-span-1 md:col-span-5 flex flex-col md:items-start justify-start space-y-4 pt-4 text-left">
          <span className="font-mono text-[11px] tracking-[0.25em] text-[#8c8a82] uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8c8a82]" />
            (SERVICES)
          </span>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-[500px] font-light">
            I specialize in building fast, reliable, and user-friendly full-stack web applications. I help small businesses and startups turn ideas into high-quality websites and products that actually work and scale.
          </p>
        </div>
      </div>

      {/* 2. THE STACKING NATIVE ACCORDION LIST */}
      <div
        ref={listRef}
        id="services-stack-list"
        className="max-w-7xl mx-auto w-full flex flex-col relative"
      >
        {SERVICES_DATA.map((service, idx) => {
          // Responsive sticky top values to stack them perfectly on desktop, relative on mobile
          const stickyClasses = [
            'md:sticky md:top-0 z-30',
            'md:sticky md:top-[88px] z-20',
            'md:sticky md:top-[176px] z-10'
          ][idx];

          return (
            <div
              key={service.id}
              id={`service-block-${service.id}`}
              className="w-full flex flex-col relative"
            >
              {/* Divider Line */}
              <div className="relative w-full z-40">
                <div className="service-divider absolute top-0 left-0 right-0 h-[1px] bg-neutral-800 origin-left scale-x-0" />
              </div>

              {/* Sticky Header Row */}
              <div
                className={`${stickyClasses} bg-[#050505] py-6 md:py-8 grid grid-cols-12 w-full gap-4 items-baseline z-30`}
              >
                {/* Number */}
                <div className="service-num col-span-3 md:col-span-3 font-display font-medium text-2xl md:text-4xl lg:text-5xl text-[#EAE7DF]/80">
                  {service.num}
                </div>
                {/* Title */}
                <div className="col-span-9 md:col-span-9">
                  <h3 className="service-title font-display font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight text-[#EAE7DF] uppercase hover:scale-[1.01] transition-transform duration-300 origin-left cursor-default">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Scrollable Content Block */}
              <div
                id={`content-${service.id}`}
                className="grid grid-cols-12 w-full pb-16 pt-6 md:pt-10 gap-4"
              >
                <div className="hidden md:block col-span-3" />
                <div className="col-span-12 md:col-span-9 space-y-10">
                  {/* Description */}
                  <p className="service-desc text-neutral-400 text-sm md:text-base lg:text-lg max-w-2xl font-light leading-relaxed">
                    {service.description}
                  </p>

                  {/* Tech stacks row list */}
                  <div className="space-y-4 max-w-3xl pt-2">
                    {service.techs.map((tech, techIdx) => (
                      <div
                        key={techIdx}
                        className="tech-row flex flex-col w-full border-t border-neutral-900 pt-5 pb-2 transition-all duration-300 hover:bg-neutral-900/40 hover:pl-2 group"
                      >
                        <div className="flex items-baseline gap-4 md:gap-8">
                          {/* Number */}
                          <span className="font-mono text-xs md:text-sm text-neutral-500 select-none group-hover:text-neutral-400 group-hover:translate-x-[2px] transition-all duration-300">
                            {tech.num}
                          </span>
                          {/* Item Text */}
                          <span className="font-display font-bold text-lg md:text-2xl lg:text-3xl text-[#EAE7DF] tracking-tight group-hover:text-white group-hover:translate-x-[5px] transition-all duration-300">
                            {tech.items}
                          </span>
                        </div>
                      </div>
                    ))}
                    {/* Final closing border-t line for the last tech row */}
                    <div className="w-full h-[1px] bg-neutral-900 mt-2" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
