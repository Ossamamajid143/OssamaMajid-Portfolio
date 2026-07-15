import React from 'react';
import { motion } from 'motion/react';

interface SkillColumn {
  title: string;
  items: string[];
}

const SKILLS_DATA: SkillColumn[] = [
  {
    title: 'Languages & Tools',
    items: [
      'Python',
      'SQL',
      'C++',
      'Java',
      'Typescript',
      'JavaScript',
      'Git',
      'Postman',
      'Docker',
      'Firebase'
    ]
  },
  {
    title: 'Frameworks & Libraries',
    items: [
      'React',
      'Node.js',
      'Express.js',
      'Flask',
      'Bootstrap',
      'jQuery',
      'TailwindCSS',
      'Framer Motion',
      'GSAP'
    ]
  },
  {
    title: 'Core CS Concepts',
    items: [
      'DSA',
      'DBMS',
      'OOP',
      'Operating Systems',
      'System Design'
    ]
  }
];

export default function SkillsSection() {
  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  // Fade up item variants
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] // Custom easeOutExpo
      }
    }
  };

  return (
    <section
      id="skills-section-dark"
      className="w-full md:sticky md:top-0 z-30 min-h-screen bg-[#050505] text-[#EAE7DF] overflow-hidden relative flex flex-col justify-center"
    >
      <div
        id="skills-section-dark-inner"
        className="w-full h-full px-6 py-20 md:py-28 lg:py-36 flex flex-col justify-center"
      >
        {/* Top separator line matching services design */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-neutral-800/60 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* LEFT COLUMN - LARGE DISPLAY TYPOGRAPHY */}
        <div className="col-span-1 lg:col-span-5 flex flex-col justify-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col font-display font-black uppercase leading-[0.85] text-[#EAE7DF] select-none tracking-tighter"
            style={{ fontSize: 'clamp(3rem, 7.5vw, 6.5rem)' }}
          >
            <span>DEVELOPER</span>
            <span>DESIGNER</span>
            <span>CREATOR/</span>
          </motion.div>
        </div>

        {/* RIGHT COLUMN - SKILLS HEADER & LISTS */}
        <div className="col-span-1 lg:col-span-7 flex flex-col space-y-8 lg:space-y-12">
          
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 
              className="font-display font-bold text-5xl md:text-6xl lg:text-7xl tracking-tighter text-[#eae8e4] uppercase select-none"
              style={{ letterSpacing: '-0.04em' }}
            >
              Skills
            </h2>
          </motion.div>

          {/* Three columns grid of lists */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 md:gap-8 lg:gap-12"
          >
            {SKILLS_DATA.map((col, idx) => (
              <motion.div
                key={col.title}
                variants={itemVariants}
                className="flex flex-col space-y-4"
              >
                {/* Column Title */}
                <div className="flex flex-col space-y-2">
                  <h3 className="font-display font-bold text-sm md:text-base text-[#eae8e4] tracking-tight leading-tight uppercase">
                    {col.title}
                  </h3>
                  <div className="w-full h-[1px] bg-neutral-800/80" />
                </div>

                {/* Column Items */}
                <ul className="flex flex-col space-y-2 font-mono text-[13px] md:text-sm text-[#8c8a82]">
                  {col.items.map((item) => (
                    <motion.li
                      key={item}
                      whileHover={{ x: 5, color: '#EAE7DF' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="cursor-default select-none"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

        </div>

      </div>
      </div>
    </section>
  );
}
