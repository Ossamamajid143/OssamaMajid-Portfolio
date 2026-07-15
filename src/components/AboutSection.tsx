import React from 'react';
import { motion } from 'motion/react';
import heroImage from '../assets/images/cozy_artistic_room_1784106403072.jpg';

export default function AboutSection() {
  return (
    <section
      id="about-section-dark"
      className="w-full md:sticky md:top-0 z-40 min-h-screen bg-[#050505] text-[#EAE7DF] overflow-hidden relative flex flex-col justify-center"
    >
      <div
        id="about-section-dark-inner"
        className="w-full h-full px-6 py-20 md:py-28 lg:py-36 flex flex-col justify-center"
      >
        {/* Top separator line matching services design */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-neutral-800/60 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* LEFT COLUMN - PORTRAIT IMAGE WITH SUNLIGHT */}
        <div className="col-span-1 md:col-span-5 flex justify-center order-last md:order-first">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-[85%] md:w-full max-w-[320px] md:max-w-[380px] lg:max-w-[400px] aspect-[3/4] rounded-[20px] overflow-hidden border border-[#2e2d2a]/60 shadow-2xl bg-[#111111] group cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
          >
            <motion.img
              src={heroImage}
              alt="Artistic map on wall with cozy sunlight casting shadows"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover filter grayscale contrast-[1.08] brightness-[0.92] hover:brightness-[1.0] transition-all duration-300"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* RIGHT COLUMN - ABOUT CONTENT */}
        <div className="col-span-1 md:col-span-7 flex flex-col">
          
          {/* Main big display intro text */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-light text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] text-[#EAE7DF] leading-snug tracking-tight mb-12 sm:mb-16 md:mb-20 max-w-2xl text-left"
          >
            I'm a software engineer driven by a passion for turning ideas into clean, intuitive digital experiences.
          </motion.h2>

          {/* Sub-grid of details */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 items-start w-full">
            
            {/* Label (ABOUT ME) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="sm:col-span-4 flex items-center gap-2 pt-1"
            >
              <span className="font-mono text-[11px] tracking-[0.25em] text-[#8c8a82] uppercase flex items-center gap-2 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8c8a82]" />
                (ABOUT ME)
              </span>
            </motion.div>

            {/* Paragraphs description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="sm:col-span-8 flex flex-col space-y-6 text-[#a6a49d] text-sm md:text-base font-light leading-relaxed max-w-xl text-left"
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
