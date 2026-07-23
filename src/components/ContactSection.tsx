import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Live ticking clock state for the footer
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to get exactly: "3:56:50 PM, IST" or similar local timezone representation
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      
      // Determine timezone abbreviation (e.g., IST, EST, UTC)
      let tz = 'UTC';
      try {
        const parts = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).formatToParts(now);
        const tzPart = parts.find(p => p.type === 'timeZoneName');
        if (tzPart) {
          tz = tzPart.value;
        }
      } catch (e) {
        // Fallback to manual abbreviation parsing
        const match = now.toString().match(/\(([^)]+)\)$/);
        if (match) tz = match[1];
      }

      setCurrentTime(`${timeStr}, ${tz}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    // Simulate real high-end portfolio action with short network latency
    setTimeout(() => {
      // Save to localStorage so submissions are persisted
      const existing = localStorage.getItem('ossama_portfolio_messages');
      const messages = existing ? JSON.parse(existing) : [];
      messages.unshift({
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        message,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('ossama_portfolio_messages', JSON.stringify(messages));

      setIsSubmitting(false);
      setIsSuccess(true);
      setName('');
      setEmail('');
      setMessage('');

      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section
      id="contact-section-dark"
      style={{ zIndex: 60 }}
      className="w-full relative z-[60] bg-[#050505] flex flex-col justify-between min-h-screen"
    >
      <div
        id="contact-section-dark-inner"
        className="w-full h-full flex flex-col justify-between min-h-screen"
        style={{ transformOrigin: 'center center', willChange: 'transform, opacity' }}
      >
        {/* 1. CONTACT FORM AREA (Black Background) */}
      <div className="w-full px-6 py-20 md:py-36 lg:py-40 flex flex-col items-center justify-center relative">
        {/* Top boundary separator matching previous sections */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-neutral-800/60 pointer-events-none" />

        <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center space-y-12">
          
          {/* LARGE DISPLAY TYPOGRAPHY HEADING */}
          <div
            className="flex flex-col font-display font-black uppercase leading-[0.85] text-[#EAE7DF] select-none tracking-tighter"
            style={{ fontSize: 'clamp(3.5rem, 9.5vw, 8.5rem)' }}
          >
            <span className="contact-heading-line">LET'S MAKE</span>
            <span className="contact-heading-line">IT HAPPEN</span>
          </div>

          {/* CONTACT FORM CONTAINER */}
          <div
            className="contact-cta-reveal w-full max-w-xl rounded-2xl md:rounded-3xl bg-[#121211] border border-neutral-800/50 p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden"
          >
            <h3 className="font-sans font-light text-xl sm:text-2xl text-[#eae8e4] mb-8 text-center tracking-tight">
              Have a project in mind?
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-5 text-left">
              {/* Name Input */}
              <div className="flex flex-col">
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-[#1c1c1b] border border-neutral-800/80 focus:border-neutral-500/80 text-[#eae8e4] font-mono text-xs sm:text-sm tracking-wide placeholder-neutral-600 focus:outline-none transition-all duration-300"
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-[#1c1c1b] border border-neutral-800/80 focus:border-neutral-500/80 text-[#eae8e4] font-mono text-xs sm:text-sm tracking-wide placeholder-neutral-600 focus:outline-none transition-all duration-300"
                />
              </div>

              {/* Message Input */}
              <div className="flex flex-col">
                <textarea
                  rows={4}
                  placeholder="Tell me about your business or project"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-[#1c1c1b] border border-neutral-800/80 focus:border-neutral-500/80 text-[#eae8e4] font-mono text-xs sm:text-sm tracking-wide placeholder-neutral-600 focus:outline-none transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-[#eae8e4] hover:bg-white text-[#050505] font-sans font-bold text-sm tracking-tight uppercase hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-50 flex items-center justify-center cursor-pointer shadow-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-[#050505]" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    CONNECTING...
                  </span>
                ) : (
                  'Get a quote'
                )}
              </button>
            </form>

            {/* Success overlay banner */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-[#121211] flex flex-col items-center justify-center p-6 text-center z-10"
                >
                  <div className="w-16 h-16 rounded-full bg-[#eae8e4] text-[#050505] flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 stroke-[2.5px]" />
                  </div>
                  <h4 className="font-display font-bold text-xl text-[#eae8e4] mb-2">Message Sent Successfully</h4>
                  <p className="text-neutral-400 text-xs sm:text-sm font-light max-w-xs">
                    Thank you for reaching out! I will get back to you within 24 hours to discuss your project.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* 2. THE MAGNIFICENT LIGHT FOOTER (Light Cream Background) */}
      <div className="w-full bg-[#eae8e4] text-[#1c1b1a] px-6 py-16 md:py-24 relative border-t border-[#d6d4ce]">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
          
          {/* MENU COLUMN (Left) */}
          <div className="col-span-1 md:col-span-6 flex flex-col space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#8c8a82] select-none">
              Menu
            </h4>
            <div className="w-full h-[1px] bg-[#1c1b1a]/10 max-w-xs" />
            <nav className="flex flex-col space-y-2 font-sans font-medium text-base text-[#1c1b1a]/80">
              {[
                { label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
                { label: 'Services', action: () => document.getElementById('services-section-dark')?.scrollIntoView({ behavior: 'smooth' }) },
                { label: 'Works', action: () => document.getElementById('works-section')?.scrollIntoView({ behavior: 'smooth' }) },
                { label: 'About', action: () => document.getElementById('about-section-dark')?.scrollIntoView({ behavior: 'smooth' }) },
                { label: 'Contact', action: () => document.getElementById('contact-section-dark')?.scrollIntoView({ behavior: 'smooth' }) },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="text-left hover:text-[#1c1b1a] hover:pl-1.5 transition-all duration-300 w-fit select-none cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* SOCIALS COLUMN (Right) */}
          <div className="col-span-1 md:col-span-6 flex flex-col space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#8c8a82] select-none">
              Socials
            </h4>
            <div className="w-full h-[1px] bg-[#1c1b1a]/10 max-w-xs" />
            <div className="flex flex-col space-y-2 font-sans font-medium text-base text-[#1c1b1a]/80">
              <a
                href="https://www.linkedin.com/in/ossama-majid"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1c1b1a] hover:pl-1.5 transition-all duration-300 w-fit"
              >
                Linkedin
              </a>
              <a
                href="https://x.com/osamaxmajid?s=21"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1c1b1a] hover:pl-1.5 transition-all duration-300 w-fit"
              >
                X (Twitter)
              </a>
              <a
                href="https://github.com/Ossamamajid143"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1c1b1a] hover:pl-1.5 transition-all duration-300 w-fit"
              >
                Github
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM METRICS BAR (Local Time, Copyright & Scroll-to-top) */}
        <div className="contact-footer-bar max-w-7xl mx-auto w-full mt-16 md:mt-24 pt-8 border-t border-[#1c1b1a]/10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">

          {/* Copyright Info */}
          <div className="font-mono text-[10px] tracking-wider text-neutral-500 uppercase select-none">
            <div>© {new Date().getFullYear()} OSSAMA MAJID.</div>
            <div className="mt-1">DESIGN &amp; FRONTEND ARCHITECTURE.</div>
          </div>

          {/* LOCAL TIME + Scroll to Top button */}
          <div className="flex items-end gap-6">
            <div className="flex flex-col space-y-1.5">
              <span className="font-mono text-[10px] tracking-widest text-[#8c8a82] uppercase select-none font-semibold">
                LOCAL TIME
              </span>
              <span className="font-sans font-bold text-lg md:text-xl text-[#1c1b1a] tracking-tight tabular-nums">
                {currentTime || '—'}
              </span>
            </div>

            {/* Scroll-to-top arrow button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              id="scroll-to-top-btn"
              aria-label="Scroll to top"
              className="w-12 h-12 rounded-full bg-[#d6d4ce] hover:bg-[#1c1b1a] text-[#1c1b1a] hover:text-[#eae8e4] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </div>

        </div>
      </div>
      </div>
    </section>
  );
}
