import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Send, CheckCircle2, Star, Layers, Code, ShoppingBag, Radio, MessageSquare, History, Cpu } from 'lucide-react';
import { Project, Service, ContactMessage } from '../types';

// Hardcoded premium projects
const PROJECTS: Project[] = [
  {
    id: 'nura',
    title: 'NURA',
    category: 'E-Commerce / Healthy Candy',
    year: '2026',
    description: 'A modern, premium e-commerce storefront for organic candy designed with micro-interactions, floating visual elements, and immersive state cycles.',
    imageUrl: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'TypeScript', 'Tailwind', 'Motion'],
  },
  {
    id: 'jobportal',
    title: 'JOB PORTAL',
    category: 'Full-Stack Recruitment Platform',
    year: '2025',
    description: 'A high-performance recruitment engine featuring advanced multi-attribute salary and duration filtering, active candidate profiles, and responsive job listings.',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    tags: ['Node.js', 'React', 'Tailwind', 'Drizzle ORM'],
  },
  {
    id: 'productize',
    title: 'PRODUCTIZE SAAS',
    category: 'SAAS Platform',
    year: '2025',
    description: 'A sleek pricing simulator and service platform showcasing fluid price tier toggles, plan checkout triggers, and clean modular layout architecture.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    tags: ['Next.js', 'React', 'Tailwind', 'Stripe'],
  },
  {
    id: 'cinerec',
    title: 'CINEREC',
    category: 'ML Recommendation Engine',
    year: '2026',
    description: 'An interactive machine learning-powered movie recommendation dashboard mapping user choices through high-contrast neural network path structures.',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    tags: ['Python', 'ML Algorithms', 'React', 'D3.js'],
  },
  {
    id: 'code2img',
    title: 'CODE2IMG',
    category: 'Code-to-Image Tool',
    year: '2026',
    description: 'A highly customizable screenshot-beautifier utility converting raw code snippets into beautiful, downloadable gradient frames with custom formatting options.',
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
    tags: ['TypeScript', 'Canvas API', 'Tailwind', 'Vite'],
  }
];

// Premium services list
const SERVICES: Service[] = [
  {
    id: 'ux-ui',
    title: 'Creative UI/UX Design',
    description: 'Fusing content strategy with high-contrast visual systems to craft unforgettable modern digital brand styles.',
    deliverables: ['Custom Design Systems', 'Framer Prototypes', 'Typography Pairing', 'Responsive Wireframes']
  },
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    description: 'Engineering scalable, secure, and semantic React & TypeScript web applications with blazing performance and clean code.',
    deliverables: ['React & Next.js builds', 'Tailwind CSS Stylings', 'TypeScript Type-Safety', 'State Management']
  },
  {
    id: 'headless-ecommerce',
    title: 'Headless E-Commerce',
    description: 'Building custom transactional platforms that increase conversions using fast, serverless storefront architectures.',
    deliverables: ['Stripe Integration', 'Shopify Storefront APIs', 'Secure Checkout Flow', 'Inventory Synchronizers']
  },
  {
    id: 'motion',
    title: 'Motion & Interaction',
    description: 'Crafting meaningful, fluid physics-based micro-animations and route transitions that delight visitors and guide interactions.',
    deliverables: ['Framer Motion Loops', 'WebGL Shader Effects', 'SVG Micro-Animations', 'Responsive Layout Shifts']
  }
];

const TECH_STACK = [
  { category: 'Languages', items: ['TypeScript', 'JavaScript (ESNext)', 'HTML5 / CSS3', 'Node.js'] },
  { category: 'Frameworks', items: ['React 19', 'Next.js', 'Express', 'Vite'] },
  { category: 'Styling & Animation', items: ['Tailwind CSS v4', 'Framer Motion', 'CSS Modules'] },
  { category: 'Tools & Database', items: ['Git', 'Drizzle ORM', 'PostgreSQL', 'Firebase / Firestore'] }
];

/* -----------------------------------------
   1. SERVICES CONTENT
-------------------------------------------- */
export function ServicesContent() {
  const getIcon = (id: string) => {
    switch (id) {
      case 'ux-ui': return <Layers className="w-5 h-5 text-[#8c8a82]" />;
      case 'frontend': return <Code className="w-5 h-5 text-[#8c8a82]" />;
      case 'headless-ecommerce': return <ShoppingBag className="w-5 h-5 text-[#8c8a82]" />;
      default: return <Radio className="w-5 h-5 text-[#8c8a82]" />;
    }
  };

  return (
    <div id="services-content-wrapper" className="space-y-10">
      <div id="services-intro" className="space-y-4">
        <h3 className="font-display text-3xl font-bold tracking-tight text-[#eae8e4]">
          Premium Services for Ambitious Teams
        </h3>
        <p className="text-neutral-400 text-sm leading-relaxed max-w-xl">
          I provide clean-code frontend engineering and brand UI design that help startups, agencies, and enterprises stand out online.
        </p>
      </div>

      <div id="services-list" className="grid gap-6">
        {SERVICES.map((service, index) => (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={service.id}
            id={`service-${service.id}`}
            className="p-6 rounded-xl bg-[#252422] border border-[#2e2d2a] hover:border-[#8c8a82]/40 transition-all group"
          >
            <div className="flex items-start gap-4 mb-3">
              <div className="p-2.5 rounded-lg bg-[#1c1b1a] border border-[#2e2d2a] group-hover:bg-[#8c8a82] group-hover:text-[#1c1b1a] transition-all">
                {getIcon(service.id)}
              </div>
              <div>
                <h4 className="font-display font-semibold text-lg text-[#eae8e4] group-hover:text-[#fff] transition-colors">
                  {service.title}
                </h4>
                <p className="text-neutral-400 text-xs mt-1 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#2e2d2a]/60">
              <span className="font-mono text-[10px] uppercase text-[#8c8a82] tracking-wider block mb-2">
                CORE DELIVERABLES:
              </span>
              <div className="flex flex-wrap gap-2">
                {service.deliverables.map((deliv, i) => (
                  <span
                    key={i}
                    className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-[#1c1b1a] border border-[#2e2d2a] text-neutral-300"
                  >
                    {deliv}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* -----------------------------------------
   2. WORKS CONTENT
-------------------------------------------- */
export function WorksContent() {
  return (
    <div id="works-content-wrapper" className="space-y-10">
      <div id="works-intro" className="space-y-4">
        <h3 className="font-display text-3xl font-bold tracking-tight text-[#eae8e4]">
          Selected Digital Productions
        </h3>
        <p className="text-neutral-400 text-sm leading-relaxed max-w-xl">
          A showcase of recent premium client works, personal explorations, and highly optimized layouts.
        </p>
      </div>

      <div id="works-grid" className="grid gap-8">
        {PROJECTS.map((project, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            key={project.id}
            id={`project-card-${project.id}`}
            className="group relative overflow-hidden rounded-xl bg-[#252422] border border-[#2e2d2a] p-4 flex flex-col md:flex-row gap-6 hover:border-[#8c8a82]/40 transition-all duration-300"
          >
            {/* Image Container */}
            <div className="relative w-full md:w-2/5 aspect-[4/3] rounded-lg overflow-hidden bg-black flex-shrink-0 border border-[#2e2d2a]">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md border border-[#2e2d2a] font-mono text-[10px] text-[#eae8e4] px-2 py-0.5 rounded">
                {project.year}
              </div>
            </div>

            {/* Content Container */}
            <div className="flex-1 flex flex-col justify-between py-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase text-[#8c8a82] tracking-widest">
                    {project.category}
                  </span>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="p-1 rounded-full text-[#8c8a82] hover:text-[#fff] hover:bg-[#1c1b1a] transition-all"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                <h4 className="font-display font-bold text-xl text-[#eae8e4] tracking-tight group-hover:text-white transition-colors">
                  {project.title}
                </h4>

                <p className="text-neutral-400 text-xs leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5 pt-4 border-t border-[#2e2d2a]/50">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#1c1b1a] text-neutral-400 border border-[#2e2d2a]/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* -----------------------------------------
   3. ABOUT CONTENT
-------------------------------------------- */
export function AboutContent() {
  return (
    <div id="about-content-wrapper" className="space-y-8">
      {/* Intro section */}
      <div id="about-intro" className="space-y-4">
        <h3 className="font-display text-3xl font-bold tracking-tight text-[#eae8e4]">
          Who is Ossama Majid?
        </h3>
        <p className="text-neutral-300 text-sm leading-relaxed">
          I am a professional **Web Developer and UI/UX Designer** focused on building elegant, scalable, and high-performance frontend interfaces. I operate at the intersection of aesthetic architecture and modern software engineering.
        </p>
      </div>

      {/* Grid details */}
      <div id="about-grid" className="grid gap-6 md:grid-cols-2">
        {/* Core Philosophy */}
        <div className="p-5 rounded-xl bg-[#252422] border border-[#2e2d2a] space-y-3">
          <div className="flex items-center gap-2 text-[#8c8a82]">
            <Star className="w-4 h-4" />
            <h4 className="font-mono text-xs uppercase tracking-wider font-semibold text-[#eae8e4]">Philosophy</h4>
          </div>
          <p className="text-neutral-400 text-xs leading-relaxed">
            I believe that every micro-interaction and type sizing choice matters. A website is not just a layout; it is a fluid, functional narrative that reflects the high standards of a brand. I avoid bloated code and generic visual packages.
          </p>
        </div>

        {/* Experience Stats */}
        <div className="p-5 rounded-xl bg-[#252422] border border-[#2e2d2a] space-y-3">
          <div className="flex items-center gap-2 text-[#8c8a82]">
            <Cpu className="w-4 h-4" />
            <h4 className="font-mono text-xs uppercase tracking-wider font-semibold text-[#eae8e4]">Approach</h4>
          </div>
          <p className="text-neutral-400 text-xs leading-relaxed">
            I build modern SPAs and servers using lightweight technologies such as React 19, Vite, Tailwind CSS, and custom Express API gateways. This guarantees rapid initial load times, great SEO audit scores, and absolute design consistency.
          </p>
        </div>
      </div>

      {/* Tech Stack List */}
      <div id="about-tech-stack" className="space-y-4 pt-4">
        <h4 className="font-display font-bold text-lg text-[#eae8e4] border-b border-[#2e2d2a] pb-2">
          Engineered Technology Stack
        </h4>
        <div className="grid gap-4 sm:grid-cols-2">
          {TECH_STACK.map((group, index) => (
            <div key={index} className="space-y-2">
              <span className="font-mono text-[10px] text-[#8c8a82] uppercase tracking-widest block">
                {group.category}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((tech, i) => (
                  <span
                    key={i}
                    className="font-sans text-xs px-2.5 py-1 rounded-md bg-[#252422] border border-[#2e2d2a] text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------
   4. CONTACT CONTENT
-------------------------------------------- */
export function ContactContent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [messagesHistory, setMessagesHistory] = useState<ContactMessage[]>(() => {
    // Read from localStorage to persist submissions!
    const stored = localStorage.getItem('ossama_portfolio_messages');
    return stored ? JSON.parse(stored) : [];
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    // Simulate network latency for satisfying feel
    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        message,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };

      const updatedHistory = [newMessage, ...messagesHistory];
      setMessagesHistory(updatedHistory);
      localStorage.setItem('ossama_portfolio_messages', JSON.stringify(updatedHistory));

      setIsSubmitting(false);
      setIsSuccess(true);
      setName('');
      setEmail('');
      setMessage('');

      // Clear success notification after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1200);
  };

  const handleClearHistory = () => {
    setMessagesHistory([]);
    localStorage.removeItem('ossama_portfolio_messages');
  };

  return (
    <div id="contact-content-wrapper" className="space-y-8">
      <div id="contact-intro" className="space-y-3">
        <h3 className="font-display text-3xl font-bold tracking-tight text-[#eae8e4]">
          Let's Build Something Exceptional
        </h3>
        <p className="text-neutral-400 text-sm leading-relaxed">
          Fill out the secure contact panel below or write to me for freelance opportunities, project scopes, or direct collaborations.
        </p>
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            id="contact-success-banner"
            className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Message Dispatched Successfully!</p>
              <p className="opacity-90 mt-0.5">Thank you, your entry has been persisted locally in your browser console outbox.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Container */}
      <form onSubmit={handleSubmit} id="contact-submission-form" className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Name Field */}
          <div className="space-y-1.5">
            <label htmlFor="form-name" className="font-mono text-[10px] uppercase text-[#8c8a82] tracking-wider block">
              Your Name
            </label>
            <input
              type="text"
              id="form-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Liam Sterling"
              className="w-full bg-[#252422] border border-[#2e2d2a] rounded-lg px-4 py-3 text-sm text-[#eae8e4] placeholder-neutral-500 focus:outline-none focus:border-[#8c8a82] transition-colors"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-1.5">
            <label htmlFor="form-email" className="font-mono text-[10px] uppercase text-[#8c8a82] tracking-wider block">
              Your Email Address
            </label>
            <input
              type="email"
              id="form-email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. liam@example.com"
              className="w-full bg-[#252422] border border-[#2e2d2a] rounded-lg px-4 py-3 text-sm text-[#eae8e4] placeholder-neutral-500 focus:outline-none focus:border-[#8c8a82] transition-colors"
            />
          </div>
        </div>

        {/* Message Field */}
        <div className="space-y-1.5">
          <label htmlFor="form-message" className="font-mono text-[10px] uppercase text-[#8c8a82] tracking-wider block">
            Project Details & Message
          </label>
          <textarea
            id="form-message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Introduce yourself and outline your project vision..."
            className="w-full bg-[#252422] border border-[#2e2d2a] rounded-lg p-4 text-sm text-[#eae8e4] placeholder-neutral-500 focus:outline-none focus:border-[#8c8a82] transition-colors resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          id="form-submit-btn"
          className="w-full sm:w-auto bg-[#8c8a82] hover:bg-[#a6a49d] active:bg-[#72706b] disabled:opacity-50 text-[#1c1b1a] font-semibold text-xs tracking-wider uppercase px-6 py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
        >
          {isSubmitting ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-[#1c1b1a] border-t-transparent rounded-full animate-spin" />
              <span>TRANSMITTING...</span>
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>SEND PORTFOLIO INQUIRY</span>
            </>
          )}
        </button>
      </form>

      {/* Simulated Local Outbox persistence list */}
      {messagesHistory.length > 0 && (
        <div id="contact-outbox-wrapper" className="pt-6 border-t border-[#2e2d2a]/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#8c8a82] flex items-center gap-1.5">
              <History className="w-3.5 h-3.5" /> Local Message Outbox ({messagesHistory.length})
            </span>
            <button
              onClick={handleClearHistory}
              id="clear-outbox-btn"
              className="font-mono text-[9px] uppercase tracking-wider text-red-400/80 hover:text-red-400 transition-colors cursor-pointer"
            >
              Clear Log
            </button>
          </div>

          <div id="outbox-list" className="max-h-[220px] overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {messagesHistory.map((item) => (
              <div key={item.id} id={`outbox-item-${item.id}`} className="p-3.5 rounded-lg bg-[#1c1b1a] border border-[#2e2d2a] space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400">
                  <span className="font-semibold text-neutral-300">{item.name} ({item.email})</span>
                  <span>{item.timestamp}</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed italic">
                  "{item.message}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
