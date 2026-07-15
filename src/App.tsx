import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { ArrowDownLeft, ArrowUpRight, Clock, MapPin, Menu, Globe, Calendar, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Modal from './components/Modal';
import {
  ServicesContent,
  WorksContent,
  AboutContent,
  ContactContent,
} from './components/PortfolioSections';
import ServicesSection from './components/ServicesSection';
import WorksSection from './components/WorksSection';
import SkillsSection from './components/SkillsSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';

// Import generated portrait image
import heroImage from './assets/images/cozy_artistic_room_1784106403072.jpg';

export default function App() {
  const [activePanel, setActivePanel] = useState<'services' | 'works' | 'about' | 'contact' | null>(null);
  const [currentTime, setCurrentTime] = useState('');
  const [dateInfo, setDateInfo] = useState({ month: '', day: '', year: '', weekday: '' });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [isOverlayMenuOpen, setIsOverlayMenuOpen] = useState(false);

  // Parallax spring-based movement logic for Hero Image (max 8px movement)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const xSpring = useSpring(mouseX, springConfig);
  const ySpring = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    // Normalized position from -0.5 to 0.5
    const xVal = (e.clientX - rect.left) / width - 0.5;
    const yVal = (e.clientY - rect.top) / height - 0.5;
    // Set spring target to max 8px in each direction (so -8px to 8px range)
    mouseX.set(xVal * 16);
    mouseY.set(yVal * 16);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const lenisRef = React.useRef<Lenis | null>(null);

  const scrollToSection = (id: 'services' | 'works' | 'about' | 'contact') => {
    let targetId = '';
    if (id === 'services') targetId = 'services-section-dark';
    else if (id === 'works') targetId = 'works-section';
    else if (id === 'about') targetId = 'about-section-dark';
    else if (id === 'contact') targetId = 'contact-section-dark';

    const element = document.getElementById(targetId);
    if (element) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(element, { duration: 1.5 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Scroll triggered floating button visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.8; // 80% of viewport leaves
      if (scrollY >= threshold) {
        setShowFloatingButton(true);
      } else {
        setShowFloatingButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once initially
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize global Lenis smooth scrolling and GSAP scroll transitions
  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Connect ScrollTrigger to Lenis scroll updates
    lenis.on('scroll', ScrollTrigger.update);

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // 2. Setup GSAP MatchMedia for global curtain scroll-linked transition effects (Desktop only)
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      gsap.registerPlugin(ScrollTrigger);

      // In order, the major segments of the curtain stack:
      const sections = [
        { id: 'hero-section', innerId: 'hero-section-inner' },
        { id: 'services-section-dark', innerId: 'services-section-dark-inner' },
        { id: 'works-intro-sticky', innerId: 'works-intro-sticky-inner' },
        { id: 'project-nura', innerId: 'project-nura-inner' },
        { id: 'project-jobportal', innerId: 'project-jobportal-inner' },
        { id: 'project-productize', innerId: 'project-productize-inner' },
        { id: 'project-cinerec', innerId: 'project-cinerec-inner' },
        { id: 'project-code2img', innerId: 'project-code2img-inner' },
        { id: 'skills-section-dark', innerId: 'skills-section-dark-inner' },
        { id: 'about-section-dark', innerId: 'about-section-dark-inner' },
        { id: 'contact-section-dark', innerId: 'contact-section-dark-inner' }
      ];

      sections.forEach((section, idx) => {
        const innerEl = document.getElementById(section.innerId);
        if (innerEl) {
          gsap.set(innerEl, { transformOrigin: 'center center', force3D: true });
        }

        if (idx === 0) return; // No incoming animation for hero itself

        const prevSection = sections[idx - 1];
        const prevInner = document.getElementById(prevSection.innerId);
        const currentInner = document.getElementById(section.innerId);
        const currentOuter = document.getElementById(section.id);

        if (!currentOuter) return;

        // Custom transition timeline linked to ScrollTrigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: currentOuter,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            invalidateOnRefresh: true,
          }
        });

        // Outgoing section scales down (100% -> 98%) and fades slightly (1 -> 0.9)
        if (prevInner) {
          tl.to(prevInner, {
            scale: 0.98,
            opacity: 0.9,
            ease: 'power1.inOut'
          }, 0);
        }

        // Incoming section fades in (0 -> 1) and scales down (1.02 -> 1)
        if (currentInner) {
          tl.fromTo(currentInner,
            {
              scale: 1.02,
              opacity: 0
            },
            {
              scale: 1,
              opacity: 1,
              ease: 'power1.inOut'
            },
            0
          );
        }
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      mm.revert();
    };
  }, []);

  // Pause Lenis scrolling when modals or overlay menus are open
  useEffect(() => {
    if (lenisRef.current) {
      if (activePanel || isOverlayMenuOpen) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [activePanel, isOverlayMenuOpen]);

  // Body scroll locking when overlay is open
  useEffect(() => {
    if (isOverlayMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOverlayMenuOpen]);

  // Dynamic Date and Ticking Clock Setup
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      // Formatting date elements for elegant uppercase display
      const monthShort = now.toLocaleString('en-US', { month: 'short' }).toUpperCase();
      const dayStr = String(now.getDate()).padStart(2, '0');
      const yearShort = String(now.getFullYear()).slice(-2);
      const weekdayStr = now.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();

      setDateInfo({
        month: monthShort,
        day: dayStr,
        year: yearShort,
        weekday: weekdayStr
      });

      // Monospace time format: HH:MM:SS AM/PM
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).toUpperCase()
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="portfolio-root" className="min-h-screen bg-[#eae8e4] text-[#1c1b1a] relative overflow-x-hidden selection:bg-[#1c1b1a] selection:text-[#eae8e4] flex flex-col font-sans">
      
      {/* 1. HERO BLOCK SECTION (Light Background) */}
      <section
        id="hero-section"
        className="w-full md:sticky md:top-0 z-0 md:h-screen min-h-screen bg-[#eae8e4] text-[#1c1b1a] overflow-hidden flex flex-col justify-between relative animate-none"
      >
        <div
          id="hero-section-inner"
          className="w-full h-full p-6 md:p-10 lg:p-12 flex flex-col justify-between"
        >
        
        {/* 1.1 HEADER SECTOR */}
        <header
          id="portfolio-header"
          style={{
            opacity: showFloatingButton ? 0 : 1,
            pointerEvents: showFloatingButton ? 'none' : 'auto',
            transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: showFloatingButton ? 'translateY(-10px)' : 'translateY(0)',
          }}
          className="w-full flex items-center justify-between z-40"
        >
          <div id="header-brand" className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="font-display font-bold text-sm tracking-tight uppercase text-[#1c1b1a]">
              Web Developer & Designer
            </span>
            <span className="hidden sm:inline text-neutral-400 font-light text-xs">/</span>
            <span className="font-mono text-[10px] tracking-wider text-neutral-500 uppercase flex items-center gap-1">
              <Globe className="w-3 h-3 text-[#8c8a82]" /> AVAILABLE FOR CONTRACTS
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
            {(['services', 'works', 'about', 'contact'] as const).map((panel) => (
              <button
                key={panel}
                onClick={() => scrollToSection(panel)}
                id={`nav-link-${panel}`}
                className="font-mono text-xs uppercase tracking-widest text-[#1c1b1a] hover:text-[#8c8a82] transition-colors relative group py-1 cursor-pointer"
              >
                {panel}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#8c8a82] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* Mobile menu trigger button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            id="mobile-nav-trigger"
            className="p-1.5 md:hidden text-[#1c1b1a] hover:text-[#8c8a82] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </header>

        {/* Mobile Nav Dropdown Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              id="mobile-nav-dropdown"
              className="absolute top-20 left-6 right-6 bg-[#1c1b1a] text-[#eae8e4] p-6 rounded-xl border border-[#2e2d2a] shadow-xl md:hidden z-40 space-y-4"
            >
              <div className="flex flex-col gap-3">
                {(['services', 'works', 'about', 'contact'] as const).map((panel) => (
                  <button
                    key={panel}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      // Slight delay for smooth scrolling feel after panel close
                      setTimeout(() => scrollToSection(panel), 200);
                    }}
                    id={`mobile-nav-link-${panel}`}
                    className="w-full text-left font-display font-bold text-lg uppercase tracking-wide py-1 hover:text-[#8c8a82] transition-colors cursor-pointer border-b border-[#2e2d2a]/60 pb-2"
                  >
                    {panel}
                  </button>
                ))}
              </div>
              <div className="pt-2 text-center text-[10px] font-mono text-neutral-400">
                OSSAMA MAJID PORTFOLIO • 2026
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1.2 MAIN HERO NAME BANNER */}
        <main id="main-hero-area" className="flex-1 flex flex-col justify-center my-6 lg:my-10">
          <div className="w-full text-center py-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              id="hero-name-heading"
              className="font-display font-extrabold text-[13.2vw] leading-[0.8] tracking-tighter text-[#1c1b1a] uppercase select-none w-full"
            >
              OSSAMA MAJID
            </motion.h1>
          </div>

          {/* 1.3 THREE-COLUMN BENTO STAGE */}
          <div id="bento-three-columns" className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-center mt-6 lg:mt-12">
            
            {/* Left Column - Intro and CTA */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              id="bento-col-left"
              className="col-span-1 md:col-span-4 space-y-6 flex flex-col items-start"
            >
              <div className="p-1 rounded bg-[#e1dfda] inline-flex">
                <ArrowDownLeft className="w-6 h-6 text-[#8c8a82] animate-bounce" />
              </div>

              <p className="text-[#3a3937] text-base md:text-[15px] lg:text-lg leading-relaxed max-w-[280px] md:max-w-[320px] font-light">
                I build fast, modern websites that help businesses grow, available for freelance projects worldwide.
              </p>

              <button
                onClick={() => setActivePanel('contact')}
                id="cta-contact-button"
                className="bg-[#2d2c2a] text-[#f4f3ef] px-6 py-3 rounded-full hover:bg-[#1a1918] active:scale-95 transition-all flex items-center gap-2 uppercase tracking-wide text-xs font-semibold select-none group cursor-pointer shadow-sm"
              >
                <span>CONTACT</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </motion.div>

            {/* Middle Column - Grayscale Center Photo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
              id="bento-col-center"
              className="col-span-1 md:col-span-4 flex justify-center items-center"
            >
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full max-w-[280px] md:max-w-[320px] aspect-[3/4] rounded-[20px] overflow-hidden shadow-xl border border-[#d6d4ce]/80 bg-[#eae8e4] group cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
              >
                <motion.img
                  src={heroImage}
                  alt="Cozy artistic modern room photography showing long vertical shadows cast from high window blinds onto a world map poster hanging above a contemporary couch."
                  style={{ x: xSpring, y: ySpring, scale: 1.05 }}
                  whileHover={{ scale: 1.07 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover filter grayscale opacity-95 transition-all duration-300 hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                {/* Artistic subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>

            {/* Right Column - Dynamic Daily Available Date & Real-time Monospace Clock */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              id="bento-col-right"
              className="col-span-1 md:col-span-4 flex flex-col justify-end items-start md:items-end text-left md:text-right space-y-4"
            >
              <div className="flex flex-col items-start md:items-end group select-none">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#706e6a] uppercase mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[#8c8a82]" /> AVAILABLE FOR WORK
                </span>

                {/* The big daily auto-updating date */}
                <div id="dynamic-available-date" className="font-display font-extrabold text-7xl sm:text-8xl lg:text-9xl tracking-tighter leading-none text-[#1c1b1a] flex items-baseline hover:scale-102 transition-transform duration-300">
                  <span>{dateInfo.month}</span>
                  <span className="text-[#8c8a82] font-light mx-1">'</span>
                  <span>{dateInfo.day}</span>
                </div>
              </div>

              {/* Micro details: live ticking clock and location */}
              <div className="space-y-1 font-mono text-[10px] tracking-wider text-neutral-500">
                <div className="flex items-center gap-1.5 justify-start md:justify-end">
                  <Clock className="w-3 h-3 text-[#8c8a82] animate-pulse" />
                  <span>LOCAL TIME: <span className="text-[#1c1b1a] font-medium">{currentTime}</span></span>
                </div>
                <div className="flex items-center gap-1.5 justify-start md:justify-end">
                  <MapPin className="w-3 h-3 text-[#8c8a82]" />
                  <span>GLOBALLY ONLINE • UTC-07:00</span>
                </div>
              </div>
            </motion.div>

          </div>
        </main>

      </div>
      </section>

      {/* 2. WHAT I DO SECTION (Dark Full-bleed Background, GSAP Animated) */}
      <ServicesSection />

      {/* 2.2. PORTFOLIO WORKS SECTION (Dark Full-bleed Background, Curtain Stacking) */}
      <WorksSection />

      {/* 2.5. SKILLS SECTION (Dark Full-bleed Background) */}
      <SkillsSection />

      {/* 2.6. ABOUT ME SECTION (Dark Full-bleed Background) */}
      <AboutSection />

      {/* 2.7. CONTACT & FOOTER SECTION (Curtain stack, Dark to Light reveal) */}
      <ContactSection />

      {/* 4. INTERACTIVE NAVIGATIONAL DRAWER OVERLAYS */}
      <Modal
        isOpen={activePanel === 'services'}
        onClose={() => setActivePanel(null)}
        title="SERVICES"
      >
        <ServicesContent />
      </Modal>

      <Modal
        isOpen={activePanel === 'works'}
        onClose={() => setActivePanel(null)}
        title="WORKS"
      >
        <WorksContent />
      </Modal>

      <Modal
        isOpen={activePanel === 'about'}
        onClose={() => setActivePanel(null)}
        title="ABOUT"
      >
        <AboutContent />
      </Modal>

      <Modal
        isOpen={activePanel === 'contact'}
        onClose={() => setActivePanel(null)}
        title="CONTACT"
      >
        <ContactContent />
      </Modal>

      {/* 5. FLOATING CIRCULAR HAMBURGER TRIGGER BUTTON */}
      <AnimatePresence>
        {showFloatingButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={() => setIsOverlayMenuOpen(!isOverlayMenuOpen)}
            id="floating-hamburger-trigger"
            className="fixed top-6 right-6 md:top-10 md:right-10 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#eae8e4]/90 backdrop-blur-md hover:bg-[#eae8e4] text-[#1c1b1a] shadow-2xl flex flex-col items-center justify-center gap-1.5 border border-[#1c1b1a]/10 hover:scale-110 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] active:scale-95 transition-all duration-300 cursor-pointer"
            aria-label={isOverlayMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {/* Morphing 3 lines into an X */}
            <motion.div
              animate={isOverlayMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-6 h-[2px] bg-[#1c1b1a] rounded-full"
            />
            <motion.div
              animate={isOverlayMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="w-6 h-[2px] bg-[#1c1b1a] rounded-full"
            />
            <motion.div
              animate={isOverlayMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-6 h-[2px] bg-[#1c1b1a] rounded-full"
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 6. FULL-SCREEN NAVIGATION OVERLAY MENU */}
      <AnimatePresence>
        {isOverlayMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            id="full-screen-menu-overlay"
            className="fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-xl flex flex-col justify-between p-6 md:p-12 lg:p-16 text-[#eae7df] overflow-hidden"
          >
            {/* Elegant curved background circle accents for high-end feel */}
            <div className="absolute top-0 right-0 w-[90vw] h-[90vw] max-w-[900px] max-h-[900px] rounded-full bg-[#111111] -translate-y-1/4 translate-x-1/4 pointer-events-none z-0" />
            <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-[#1c1b1a]/40 blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none z-0" />

            {/* Spacer to align with top bar */}
            <div className="h-16 w-full" />

            {/* Huge Display Typography Navigation Items */}
            <div className="relative flex-1 flex flex-col justify-center items-end text-right z-10 max-w-7xl mx-auto w-full pr-4 sm:pr-8 md:pr-12">
              <nav className="flex flex-col space-y-3 sm:space-y-5 md:space-y-6">
                {[
                  {
                    label: 'HOME',
                    action: () => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setIsOverlayMenuOpen(false);
                    }
                  },
                  {
                    label: 'SERVICES',
                    action: () => {
                      scrollToSection('services');
                      setIsOverlayMenuOpen(false);
                    }
                  },
                  {
                    label: 'WORKS',
                    action: () => {
                      scrollToSection('works');
                      setIsOverlayMenuOpen(false);
                    }
                  },
                  {
                    label: 'ABOUT',
                    action: () => {
                      scrollToSection('about');
                      setIsOverlayMenuOpen(false);
                    }
                  },
                  {
                    label: 'CONTACT',
                    action: () => {
                      scrollToSection('contact');
                      setIsOverlayMenuOpen(false);
                    }
                  }
                ].map((item, idx) => (
                  <motion.button
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + idx * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    key={item.label}
                    onClick={item.action}
                    className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-[#eae7df] hover:text-[#8c8a82] hover:-translate-x-3 transition-all duration-300 text-right uppercase block select-none cursor-pointer"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>
            </div>

            {/* Footer sector inside full screen overlay */}
            <div className="relative w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6 z-10 pt-4 border-t border-neutral-800/30">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="flex flex-col space-y-1.5"
              >
                <span className="font-mono text-[10px] tracking-widest text-[#8c8a82] uppercase">EMAIL ADDRESS</span>
                <a
                  href="mailto:contact@zunedaalim.com"
                  className="font-display font-bold text-lg sm:text-xl text-[#eae7df] hover:text-[#8c8a82] transition-colors"
                >
                  contact@zunedaalim.com
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.52, duration: 0.5 }}
                className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-widest text-[#8c8a82]"
              >
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Github</a>
                <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Leetcode</a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
