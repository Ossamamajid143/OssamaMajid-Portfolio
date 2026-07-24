import React from 'react';
import { motion } from 'motion/react';
import heroImage from '../assets/images/ossama_profile.jpg';

export default function AboutSection() {
  return (
    <section
      id="about-section-dark"
      style={{ zIndex: 50 }}
      className="w-full sticky top-0 min-h-screen bg-[#050505] text-[#EAE7DF] overflow-hidden relative flex flex-col justify-center"
    >
      {/* Ambient background blur blobs */}
      <div className="ambient-blob w-[500px] h-[500px] bg-neutral-700 top-[10%] left-[-150px]" />
      <div className="ambient-blob ambient-blob-2 w-[400px] h-[400px] bg-neutral-800 bottom-[10%] right-[-100px]" />

      <div
        id="about-section-dark-inner"
        className="w-full h-full px-4 sm:px-6 py-12 sm:py-16 md:py-24 lg:py-28 flex flex-col justify-center relative z-10"
        style={{ transformOrigin: 'center center', willChange: 'transform, opacity' }}
      >
        {/* Top separator line matching services design */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-neutral-800/60 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-3 sm:gap-8 lg:gap-14 items-start">

          {/* LEFT COLUMN - PORTRAIT IMAGE IN FULL ORIGINAL COLOR */}
          <div className="col-span-4 sm:col-span-5 md:col-span-4 lg:col-span-5 flex justify-start sm:justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="about-portrait-card w-full max-w-[140px] xs:max-w-[180px] sm:max-w-[280px] md:max-w-[340px] lg:max-w-[400px] aspect-[3/4] rounded-[12px] sm:rounded-[18px] md:rounded-[20px] overflow-hidden border border-[#2e2d2a]/60 shadow-2xl bg-[#111111] group cursor-pointer transition-shadow duration-300 hover:shadow-2xl relative"
            >
              <img
                src={heroImage}
                alt="Ossama Majid — Full-Stack Developer"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* RIGHT COLUMN - ABOUT CONTENT */}
          <div className="col-span-8 sm:col-span-7 md:col-span-8 lg:col-span-7 flex flex-col">

            {/* Main big display intro text */}
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans font-light text-sm xs:text-base sm:text-2xl md:text-3xl lg:text-[2.25rem] text-[#EAE7DF] leading-snug tracking-normal mb-4 sm:mb-12 md:mb-16 max-w-2xl text-left whitespace-normal break-words"
              style={{ letterSpacing: '0em' }}
            >
              I'm a software engineer driven by a passion for turning ideas into clean, intuitive digital experiences.
            </motion.h2>

            {/* Sub-grid of details */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 items-start w-full">

              {/* Label (ABOUT ME) */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="sm:col-span-4 flex items-center gap-2 pt-1"
              >
                <span className="font-mono text-[9px] sm:text-[11px] tracking-[0.2em] text-[#8c8a82] uppercase flex items-center gap-1.5 sm:gap-2 select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8c8a82]" />
                  (ABOUT ME)
                </span>
              </motion.div>

              {/* Paragraphs description */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="sm:col-span-8 flex flex-col space-y-3 sm:space-y-6 text-[#a6a49d] text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-xl text-left whitespace-normal break-words tracking-normal"
                style={{ letterSpacing: '0em' }}
              >
                <p>
                  {"I’m a full-stack developer who builds fast, modern web applications mostly with Next.js and Tailwind CSS because they just work. I work with businesses and startups to turn ideas into reliable, user-friendly products built to scale."}
                </p>
                <p>
                  {"I've been building websites long enough to have strong opinions about things that don't matter to most people, like whether a transition should be 150ms or 200ms. (It's 150ms, btw). Build the thing, make it work, make it feel good. That's the gig."}
                </p>
              </motion.div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
