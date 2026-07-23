import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, Menu, Globe, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Modal from './components/Modal';
import useCurtainScroll from './hooks/useCurtainScroll';
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
  const [dateInfo, setDateInfo] = useState({ month: '', day: '', year: '', weekday: '' });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [isOverlayMenuOpen, setIsOverlayMenuOpen] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const lastScrollY = React.useRef(0);
  const navHideTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Scroll triggered floating button + navbar hide/show
  useEffect(() => {
    const threshold = window.innerHeight * 0.75; // slightly lower so button appears sooner

    const handleScroll = (scrollY?: number) => {
      const y = typeof scrollY === 'number' ? scrollY : window.scrollY;

      // Floating button visibility
      setShowFloatingButton(y >= threshold);

      // Navbar hide on scroll-down / reveal on scroll-up (only after 80px)
      if (y > 80) {
        const delta = y - lastScrollY.current;
        if (delta > 4) {
          // Scrolling down — hide nav
          setIsNavHidden(true);
          if (navHideTimer.current) clearTimeout(navHideTimer.current);
        } else if (delta < -3) {
          // Scrolling up — reveal nav
          setIsNavHidden(false);
        }
      } else {
        setIsNavHidden(false);
      }
      lastScrollY.current = y;
    };

    // If Lenis is in use, subscribe to its events; otherwise fall back to native scroll
    const lenis = lenisRef.current;
    if (lenis && typeof lenis.on === 'function') {
      // Lenis emits a numeric scroll value in its event payload (varies by version).
      const lenisHandler = (e: any) => {
        // Try the most common shapes: e.scroll or e.target?.scroll or e. Scroll
        const val = e && (typeof e === 'number' ? e : e.scroll ?? e.deltaY ?? window.scrollY);
        handleScroll(typeof val === 'number' ? val : window.scrollY);
      };
      lenis.on('scroll', lenisHandler);

      // Call once to sync initial state
      handleScroll(lenis.scroll ?? window.scrollY);

      return () => {
        if (lenis && typeof lenis.off === 'function') lenis.off('scroll', lenisHandler);
        if (navHideTimer.current) clearTimeout(navHideTimer.current);
      };
    }

    window.addEventListener('scroll', () => handleScroll(), { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', () => handleScroll());
      if (navHideTimer.current) clearTimeout(navHideTimer.current);
    };
  }, []);

  useCurtainScroll(lenisRef, activePanel, isOverlayMenuOpen);

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
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="portfolio-root" className="min-h-screen bg-[#eae8e4] text-[#1c1b1a] relative overflow-x-hidden selection:bg-[#1c1b1a] selection:text-[#eae8e4] flex flex-col font-sans">
      
      {/* 1. HERO BLOCK SECTION (Light Background, Curtain Stack Base) */}
      <section
        id="hero-section"
        style={{ zIndex: 10 }}
        className="w-full sticky top-0 h-screen min-h-screen bg-[#eae8e4] text-[#1c1b1a] overflow-hidden flex flex-col justify-between relative animate-none"
      >
        <div
          id="hero-section-inner"
          className="hero-reference w-full h-full p-6 md:p-10 lg:px-[2.75vw] lg:pt-[2.75vw] lg:pb-2 flex flex-col justify-between"
          style={{ transformOrigin: 'center center', willChange: 'transform, opacity' }}
        >
        
        {/* 1.1 HEADER SECTOR */}
        <header
          id="portfolio-header"
          style={{
            opacity: showFloatingButton ? 0 : 1,
            pointerEvents: showFloatingButton ? 'none' : 'auto',
            transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: (showFloatingButton || isNavHidden) ? 'translate3d(0, -100%, 0)' : 'translate3d(0, 0, 0)',
          }}
          className="w-full flex items-center justify-between z-40"
        >
          <div id="header-brand" className="flex items-center">
            <span className="hero-nav-copy font-sans text-sm md:text-[1.4vw] font-normal tracking-[-0.055em] text-[#6d6a63]">
              Web Developer & Designer
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-[1.15vw]">
            {(['services', 'works', 'about', 'contact'] as const).map((panel) => (
              <button
                key={panel}
                onClick={() => scrollToSection(panel)}
                id={`nav-link-${panel}`}
                className="hero-nav-copy font-sans text-[1.4vw] capitalize tracking-[-0.055em] text-[#6d6a63] hover:text-[#393633] transition-colors relative group py-1 cursor-pointer"
              >
                {panel.charAt(0).toUpperCase() + panel.slice(1)}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#6d6a63] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* Mobile menu trigger button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            id="mobile-nav-trigger"
            className="p-1.5 md:hidden text-[#1c1b1a] hover:text-[#706e6a] transition-colors cursor-pointer"
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
        <main id="main-hero-area" className="hero-main flex-1 flex flex-col justify-center lg:justify-end my-6 lg:my-0">
          <div className="hero-name-wrap w-full text-center py-4">
            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              id="hero-name-heading"
              className="hero-name font-display font-extrabold text-[14.2vw] leading-[0.8] tracking-[-0.025em] text-[#151515] uppercase select-none w-full"
            >
              OSSAMA MAJID
            </motion.h1>
          </div>

          {/* 1.3 THREE-COLUMN BENTO STAGE */}
          <div id="bento-three-columns" className="hero-bento grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-center mt-6 lg:mt-[3.1vw]">
            
            {/* Left Column - Intro and CTA */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              id="bento-col-left"
              className="hero-left col-span-1 md:col-span-4 space-y-6 flex flex-col items-start"
            >
              <ArrowDownRight className="hero-arrow w-6 h-6 md:w-[2.4vw] md:h-[2.4vw] text-[#8b8b75] stroke-[1.35]" />

              <p className="hero-intro text-[#6d6a63] text-base md:text-[1.65vw] leading-[1.33] tracking-[-0.055em] max-w-[280px] md:max-w-[28vw] font-normal">
                I build fast, modern websites that help businesses grow, available for freelance projects worldwide.
              </p>

              <button
                onClick={() => setActivePanel('contact')}
                id="cta-contact-button"
                className="hero-contact bg-[#393633] text-[#f4f3ef] px-6 py-3 md:px-[2.05vw] md:py-[1.45vw] rounded-full hover:bg-[#1a1918] active:scale-95 transition-all flex items-center gap-2 uppercase tracking-[-0.045em] text-xs md:text-[1.45vw] font-medium select-none group cursor-pointer shadow-sm"
              >
                <span>CONTACT</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </motion.div>

            {/* Middle Column - Grayscale Center Photo */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              id="bento-col-center"
              className="hero-photo-col col-span-1 md:col-span-4 flex justify-center items-center"
            >
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="hero-photo relative w-full max-w-[280px] md:max-w-[22.5vw] aspect-[4/5] rounded-[7px] overflow-hidden shadow-none border-0 bg-[#eae8e4] group cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
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

            {/* Right Column - Dynamic Month'Year (e.g. JUL'26) matching reference image */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.06 }}
              id="bento-col-right"
              className="hero-date-col col-span-1 md:col-span-4 flex flex-col justify-end items-start md:items-end text-left md:text-right space-y-2"
            >
              <div className="flex flex-col items-start md:items-end group select-none">
                <span className="hero-available font-mono text-[10px] md:text-[1.15vw] tracking-[0.09em] text-[#706e6a] uppercase mb-1">
                  AVAILABLE FOR WORK
                </span>

                {/* Big Month'Year display (e.g. JUL'26) matching reference image */}
                <div id="dynamic-available-date" className="hero-date font-display font-extrabold text-7xl sm:text-8xl lg:text-[6.7vw] tracking-[-0.09em] leading-[0.78] text-[#393633] flex items-baseline hover:scale-102 transition-transform duration-300">
                  <span>{dateInfo.month}</span>
                  <span className="text-[#1c1b1a] font-light mx-0.5">'</span>
                  <span>{dateInfo.year}</span>
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

      {/* 2.7. CONTACT SECTION (Curtain stack, Dark to Light reveal) */}
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
            className="fixed top-6 right-6 md:top-10 md:right-10 z-[100] w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#eae8e4]/90 backdrop-blur-md hover:bg-[#eae8e4] text-[#1c1b1a] shadow-2xl flex flex-col items-center justify-center gap-[7px] border border-[#1c1b1a]/10 hover:scale-110 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] active:scale-95 transition-all duration-300 cursor-pointer"
            aria-label={isOverlayMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {/* Morphing 2 lines into an X */}
            <motion.div
              animate={isOverlayMenuOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-5 h-[1.5px] bg-[#1c1b1a] rounded-full"
            />
            <motion.div
              animate={isOverlayMenuOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-5 h-[1.5px] bg-[#1c1b1a] rounded-full"
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
            className="fixed inset-0 z-[90] bg-[#050505]/98 backdrop-blur-xl flex flex-col justify-between p-6 md:p-12 lg:p-16 text-[#eae7df] overflow-hidden"
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
                      setIsOverlayMenuOpen(false);
                      // Small delay lets Lenis restart before we scroll
                      setTimeout(() => {
                        if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 1.4 });
                        else window.scrollTo({ top: 0, behavior: 'smooth' });
                      }, 180);
                    }
                  },
                  {
                    label: 'SERVICES',
                    action: () => {
                      setIsOverlayMenuOpen(false);
                      setTimeout(() => scrollToSection('services'), 180);
                    }
                  },
                  {
                    label: 'WORKS',
                    action: () => {
                      setIsOverlayMenuOpen(false);
                      setTimeout(() => scrollToSection('works'), 180);
                    }
                  },
                  {
                    label: 'ABOUT',
                    action: () => {
                      setIsOverlayMenuOpen(false);
                      setTimeout(() => scrollToSection('about'), 180);
                    }
                  },
                  {
                    label: 'CONTACT',
                    action: () => {
                      setIsOverlayMenuOpen(false);
                      setTimeout(() => scrollToSection('contact'), 180);
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
            <div className="relative w-full max-w-7xl mx-auto flex flex-col justify-start gap-3 z-10 pt-4 border-t border-neutral-800/30">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="flex flex-col space-y-1"
              >
                <span className="font-mono text-[10px] tracking-widest text-[#8c8a82] uppercase">EMAIL ADDRESS</span>
                <a
                  href="mailto:osamamajid143@gmail.com"
                  className="font-mono text-sm sm:text-base text-[#eae7df] hover:text-[#8c8a82] transition-colors tracking-wide"
                >
                  osamamajid143@gmail.com
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.52, duration: 0.5 }}
                className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-widest text-[#8c8a82]"
              >
                <a href="https://www.linkedin.com/in/ossama-majid" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="https://github.com/Ossamamajid143" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Github</a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
