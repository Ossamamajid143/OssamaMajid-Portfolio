import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';

import project1Img from '../assets/images/project_bi_dashboard.png';
import project2Img from '../assets/images/project_eco_ecommerce.png';
import project3Img from '../assets/images/project_gta6_parody.png';
import project4Img from '../assets/images/project_xnerds_portal.png';
import project5Img from '../assets/images/project_vitaloom.png';

interface ProjectData {
  id: string;
  num: string;
  title: string;
  category: string;
  year: string;
  role: string;
  description: string;
  techs: string[];
  image: string;
  githubUrl: string;
  liveUrl?: string;
}

const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'bi-dashboard',
    num: '01',
    title: 'Business Intelligence Dashboard',
    category: 'Enterprise Analytics / BI Platform',
    year: '2025',
    role: 'Full-Stack Developer',
    description: 'A comprehensive business intelligence dashboard tracking real-time cashflow forecasts, monthly profit margins, overtime analytics, and automated ERP integration alerts.',
    techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
    image: project1Img,
    githubUrl: 'https://github.com/Ossamamajid143',
    liveUrl: 'https://github.com/Ossamamajid143'
  },
  {
    id: 'eco-ecommerce',
    num: '02',
    title: 'Eco Appliances',
    category: 'E-Commerce / Modern Appliances',
    year: '2025',
    role: 'UI/UX & Frontend Lead',
    description: 'A clean, sustainable e-commerce storefront for home appliances. Features smooth hero navigation, interactive product catalogs, cart management, and responsive layouts.',
    techs: ['React', 'Tailwind CSS', 'Framer Motion', 'JavaScript'],
    image: project2Img,
    githubUrl: 'https://github.com/Ossamamajid143',
    liveUrl: 'https://github.com/Ossamamajid143'
  },
  {
    id: 'gta6-parody',
    num: '03',
    title: 'GTA 6 Preorder Parody',
    category: 'Web Application / Parody & Commentary',
    year: '2025',
    role: 'Full-Stack Developer',
    description: 'An interactive commentary web app highlighting gaming search trends with live counter trackers, official legal filings, and responsive dark-mode layout.',
    techs: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    image: project3Img,
    githubUrl: 'https://github.com/Ossamamajid143',
    liveUrl: 'https://github.com/Ossamamajid143'
  },
  {
    id: 'xnerds-portal',
    num: '04',
    title: 'xNerds Platform',
    category: 'HR & Team Management Portal',
    year: '2024',
    role: 'Full-Stack Architecture',
    description: 'An enterprise team management portal with seamless authentication workflows, instant Google OAuth sign-in, employee onboarding, and HR data management.',
    techs: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    image: project4Img,
    githubUrl: 'https://github.com/Ossamamajid143',
    liveUrl: 'https://github.com/Ossamamajid143'
  },
  {
    id: 'vitaloom',
    num: '05',
    title: 'Vitaloom Wellness',
    category: 'E-Commerce / Wellness Brand',
    year: '2024',
    role: 'Frontend Architecture',
    description: 'A premium wellness supplement e-commerce site showcasing adaptogen powder products with rich dark aesthetics, smooth hero slider interactions, and high-conversion UX.',
    techs: ['React', 'Next.js', 'Tailwind CSS', 'GSAP'],
    image: project5Img,
    githubUrl: 'https://github.com/Ossamamajid143',
    liveUrl: 'https://github.com/Ossamamajid143'
  }
];

export default function WorksSection() {
  return (
    <section id="works-section" className="w-full bg-transparent text-[#EAE7DF] relative">
      <div className="absolute inset-x-0 top-0 h-[1px] bg-neutral-800/60 pointer-events-none" />

      <div id="works-section-inner">

      {/* SECTION HEADER BLOCK */}
      <div
        id="works-intro-sticky"
        style={{ zIndex: 30 }}
        className="w-full min-h-screen md:h-screen relative bg-transparent text-[#EAE7DF] overflow-hidden border-b border-neutral-900/80 flex flex-col justify-center"
      >
        <div
          id="works-intro-sticky-inner"
          className="w-full h-full px-6 py-16 md:py-0 flex flex-col justify-center"
          style={{ transformOrigin: 'center center', willChange: 'transform, opacity' }}
        >
          <div className="absolute inset-x-0 top-0 h-[1px] bg-neutral-900 pointer-events-none" />

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="col-span-1 md:col-span-12 mb-8 md:mb-12">
              <h2
                id="works-main-title"
                className="font-display font-black tracking-tighter uppercase leading-[0.8] text-[#EAE7DF] select-none"
                style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)' }}
              >
                SELECTED WORKS /
              </h2>
            </div>

            <div className="col-span-1 md:col-span-4 flex flex-col md:items-start justify-start space-y-4 text-left">
              <span className="font-mono text-[11px] tracking-[0.25em] text-[#8c8a82] uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8c8a82]" />
                (PROJECTS)
              </span>
            </div>

            <div className="col-span-1 md:col-span-8 text-left">
              <p className="text-neutral-400 text-lg md:text-2xl leading-relaxed max-w-3xl font-light">
                Thoughtfully crafted digital experiences that blend utility and aesthetics into something functional, memorable, and refined.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* EDITORIAL PROJECTS STACK */}
      {PROJECTS_DATA.map((project, idx) => {
        const zIndexValue = 31 + idx;
        const isEven = idx % 2 === 1;

        return (
          <div
            key={project.id}
            id={`project-${project.id}`}
            style={{ zIndex: zIndexValue }}
            className="w-full min-h-screen md:h-screen relative bg-transparent overflow-hidden border-b border-neutral-900/80 flex items-center justify-center"
          >
            <div
              id={`project-${project.id}-inner`}
              className="w-full h-full px-6 py-12 md:py-16 flex items-center justify-center relative"
              style={{ transformOrigin: 'center center', willChange: 'transform, opacity' }}
            >
              {/* Thin top editorial divider line */}
              <div className="project-divider absolute top-0 left-0 right-0 h-[1px] bg-neutral-800/60 origin-left scale-x-0 pointer-events-none" />

              <div className="project-card-reveal max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                
                {/* ODD PROJECTS (1, 3, 5): Image Left (7 cols), Content Right (5 cols) */}
                {!isEven ? (
                  <>
                    {/* LEFT COLUMN: EDITORIAL NUMBER & FEATURED SCREENSHOT */}
                    <div className="col-span-1 lg:col-span-7 flex flex-col space-y-4">
                      {/* Editorial page number (very small, thin, muted gray, far left) */}
                      <div className="flex items-center gap-3">
                        <span className="font-display font-light text-5xl sm:text-7xl lg:text-8xl text-neutral-600/40 tracking-tighter select-none leading-none">
                          {project.num}
                        </span>
                        <span className="h-[1px] w-12 bg-neutral-800/80" />
                        <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                          FEATURED WORK
                        </span>
                      </div>

                      {/* Featured Screenshot Container */}
                      <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl lg:rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800/60 shadow-xl group cursor-pointer relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-all duration-700 ease-out"
                        />
                        {/* Subtle dark overlay on hover */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      </div>
                    </div>

                    {/* RIGHT COLUMN: EDITORIAL CONTENT */}
                    <div className="col-span-1 lg:col-span-5 flex flex-col justify-center space-y-6 text-left lg:pl-2">
                      {/* Metadata Row */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-3 font-mono text-[10px] md:text-xs text-[#8c8a82] tracking-[0.2em] uppercase">
                          <span>({project.num})</span>
                          <span>•</span>
                          <span>{project.category}</span>
                          <span>•</span>
                          <span className="text-neutral-400">{project.year}</span>
                        </div>
                        <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block pt-0.5">
                          ROLE: {project.role}
                        </span>
                      </div>

                      {/* Project Title */}
                      <h3 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#EAE7DF] uppercase tracking-tight leading-none group-hover:text-white transition-colors duration-300">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-lg">
                        {project.description}
                      </p>

                      {/* Technology Stack Tags (Minimalist text labels with subtle borders) */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {project.techs.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 font-mono text-[11px] text-neutral-300 transition-all duration-300 hover:border-neutral-700 hover:text-white"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-6 pt-4">
                        <a
                          href={project.liveUrl || project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-2 font-mono text-xs text-[#EAE7DF] hover:text-white uppercase tracking-widest relative py-1"
                        >
                          <span>Live Demo</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
                          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover/link:w-full transition-all duration-300" />
                        </a>

                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white uppercase tracking-widest relative py-1"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>GitHub</span>
                          <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
                          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover/link:w-full transition-all duration-300" />
                        </a>
                      </div>
                    </div>
                  </>
                ) : (
                  /* EVEN PROJECTS (2, 4): Content Left (5 cols), Image Right (7 cols) */
                  <>
                    {/* LEFT COLUMN: EDITORIAL CONTENT */}
                    <div className="col-span-1 lg:col-span-5 flex flex-col justify-center space-y-6 text-left lg:pr-2 order-last lg:order-first">
                      {/* Metadata Row */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-3 font-mono text-[10px] md:text-xs text-[#8c8a82] tracking-[0.2em] uppercase">
                          <span>({project.num})</span>
                          <span>•</span>
                          <span>{project.category}</span>
                          <span>•</span>
                          <span className="text-neutral-400">{project.year}</span>
                        </div>
                        <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block pt-0.5">
                          ROLE: {project.role}
                        </span>
                      </div>

                      {/* Project Title */}
                      <h3 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#EAE7DF] uppercase tracking-tight leading-none group-hover:text-white transition-colors duration-300">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-lg">
                        {project.description}
                      </p>

                      {/* Technology Stack Tags */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {project.techs.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 font-mono text-[11px] text-neutral-300 transition-all duration-300 hover:border-neutral-700 hover:text-white"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-6 pt-4">
                        <a
                          href={project.liveUrl || project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-2 font-mono text-xs text-[#EAE7DF] hover:text-white uppercase tracking-widest relative py-1"
                        >
                          <span>Live Demo</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
                          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover/link:w-full transition-all duration-300" />
                        </a>

                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white uppercase tracking-widest relative py-1"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>GitHub</span>
                          <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
                          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover/link:w-full transition-all duration-300" />
                        </a>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: EDITORIAL NUMBER & FEATURED SCREENSHOT */}
                    <div className="col-span-1 lg:col-span-7 flex flex-col space-y-4 order-first lg:order-last">
                      {/* Editorial page number */}
                      <div className="flex items-center gap-3">
                        <span className="font-display font-light text-5xl sm:text-7xl lg:text-8xl text-neutral-600/40 tracking-tighter select-none leading-none">
                          {project.num}
                        </span>
                        <span className="h-[1px] w-12 bg-neutral-800/80" />
                        <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                          FEATURED WORK
                        </span>
                      </div>

                      {/* Featured Screenshot Container */}
                      <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl lg:rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800/60 shadow-xl group cursor-pointer relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-all duration-700 ease-out"
                        />
                        {/* Subtle dark overlay on hover */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      </div>
                    </div>
                  </>
                )}

              </div>
            </div>
          </div>
        );
      })}
      </div>
    </section>
  );
}
