import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, ExternalLink, Github, Monitor, RefreshCw, Layers, Check, Sparkles, Sliders } from 'lucide-react';

interface ProjectData {
  id: string;
  num: string;
  title: string;
  category: string;
  githubUrl: string;
  liveUrl?: string;
  bgContextImage?: string;
}

const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'nura',
    num: '01',
    title: 'Nura',
    category: 'E-Commerce / Healthy Candy',
    githubUrl: 'https://github.com/Ossamamajid143/Nura'
  },
  {
    id: 'jobportal',
    num: '02',
    title: 'Job Portal',
    category: 'Full-Stack Recruitment Platform',
    githubUrl: 'https://github.com/Ossamamajid143/Job-Portal'
  },
  {
    id: 'productize',
    num: '03',
    title: 'Productize SAAS',
    category: 'SAAS Platform / Pricing Engine',
    githubUrl: 'https://github.com/Ossamamajid143/Productize'
  },
  {
    id: 'cinerec',
    num: '04',
    title: 'CineRec',
    category: 'ML Recommendation Engine',
    githubUrl: 'https://github.com/Ossamamajid143/CineRec'
  },
  {
    id: 'code2img',
    num: '05',
    title: 'Code2Img',
    category: 'Code-to-Image Tool',
    githubUrl: 'https://github.com/Ossamamajid143/Code2Img'
  }
];

// --- PROJECT 01: NURA LIVE DEMO VIDEO SIMULATOR ---
function NuraDemo() {
  const [cartCount, setCartCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeFlavor, setActiveFlavor] = useState('Strawberry Splash');

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCartCount(prev => (prev >= 5 ? 0 : prev + 1));
      setActiveFlavor(prev => prev === 'Strawberry Splash' ? 'Watermelon Wonder' : 'Strawberry Splash');
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full h-full bg-[#0d0d0d] text-[#EAE7DF] flex flex-col justify-between p-4 relative font-sans overflow-hidden select-none">
      {/* Stars Background Particle simulation */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-neutral-800/60 pb-3 z-10">
        <span className="font-display font-black text-xs tracking-wider uppercase text-white">NURA</span>
        <div className="flex items-center gap-4 text-[10px] font-mono text-neutral-400">
          <span>FLAVORS</span>
          <span>SHOP</span>
          <button 
            onClick={() => setCartCount(c => c + 1)} 
            className="flex items-center gap-1.5 bg-[#eae8e4] text-[#050505] px-2.5 py-1 rounded-full font-sans font-bold hover:bg-white active:scale-95 transition-all cursor-pointer"
          >
            <span>CART</span>
            <span className="w-4 h-4 rounded-full bg-[#050505] text-[#eae8e4] flex items-center justify-center font-bold text-[8px] scale-90">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Main Candy Hero Frame */}
      <div className="flex-1 flex flex-col justify-center items-center relative z-10 text-center py-4">
        {/* Floating candies visualization */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            animate={isPlaying ? { y: [-10, 10, -10], rotate: [0, 360] } : {}}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 left-10 w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 blur-[1px] opacity-70 flex items-center justify-center text-xs"
          >
            🍓
          </motion.div>
          <motion.div 
            animate={isPlaying ? { y: [8, -12, 8], rotate: [360, 0] } : {}}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-8 right-12 w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-amber-400 blur-[2px] opacity-60 flex items-center justify-center text-sm"
          >
            🍉
          </motion.div>
        </div>

        <h4 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tighter leading-none text-white max-w-sm mb-2">
          PURE JOY IN EVERY CHEW.
        </h4>
        <p className="text-[10px] font-mono tracking-widest text-[#8c8a82] uppercase max-w-[180px]">
          THIS IS WHAT HEALTHY CANDY FEELS LIKE
        </p>

        {/* Dynamic active flavor detail card */}
        <div className="mt-4 p-3 rounded-xl bg-neutral-900/80 border border-neutral-800/80 w-52 text-left shadow-lg">
          <div className="flex items-center justify-between text-[8px] font-mono text-neutral-500 uppercase mb-1">
            <span>ACTIVE FLAVOR</span>
            <span className="text-emerald-400 font-semibold">• ACTIVE_LOOP</span>
          </div>
          <div className="font-bold text-xs text-white">{activeFlavor}</div>
          <div className="text-[9px] text-neutral-400 mt-1">0g Sugar, Organic Fruity Goodness</div>
        </div>
      </div>

      {/* Footer tagline */}
      <div className="text-center py-2 border-t border-neutral-900 z-10">
        <span className="font-display font-black text-xs sm:text-sm tracking-tight text-white/90">
          Deliciously Guilt-Free, Anytime.
        </span>
      </div>

      {/* Playback simulation status */}
      <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-md border border-neutral-800 px-2 py-0.5 rounded-full font-mono text-[8px] text-neutral-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>{isPlaying ? 'PLAYING PREVIEW' : 'PAUSED'}</span>
      </div>
    </div>
  );
}

// --- PROJECT 02: JOB PORTAL LIVE DEMO VIDEO SIMULATOR ---
function JobPortalDemo() {
  const [salary, setSalary] = useState(65000);
  const [isPlaying, setIsPlaying] = useState(true);
  const [jobType, setJobType] = useState({ fullTime: true, partTime: false, remote: true });

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      // Animate filter slider up and down
      setSalary(prev => {
        if (prev >= 85000) return 40000;
        return prev + 15000;
      });
      // Toggle checkboxes
      setJobType(prev => ({
        fullTime: !prev.fullTime,
        partTime: prev.fullTime,
        remote: !prev.remote
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full h-full bg-[#172554] text-slate-100 flex flex-col justify-between font-sans overflow-hidden select-none p-0 relative">
      
      {/* Blurred background job items */}
      <div className="absolute inset-x-4 top-16 bottom-4 opacity-15 space-y-3 filter blur-[1.5px] pointer-events-none">
        {[1, 2, 3].map((n) => (
          <div key={n} className="w-full p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="h-4 bg-slate-700 rounded w-1/3 mb-2" />
            <div className="h-3 bg-slate-800 rounded w-2/3" />
          </div>
        ))}
      </div>

      {/* Portal Top Nav */}
      <div className="bg-blue-950/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-blue-900/50 z-10">
        <span className="font-bold text-xs tracking-tight text-white font-mono">Job Portal</span>
        <div className="flex items-center gap-3 text-[9px] font-mono text-blue-300">
          <span>ADD JOBS</span>
          <span>MY JOBS</span>
          <div className="w-6 h-6 rounded-full bg-blue-500/30 border border-blue-400/40 flex items-center justify-center font-bold text-[8px] text-white">
            OM
          </div>
        </div>
      </div>

      {/* FILTER MODAL POPUP (Exact layout matching the second image) */}
      <div className="flex-1 flex items-center justify-center p-4 z-10 relative">
        <div className="w-full max-w-[350px] bg-white text-slate-800 rounded-2xl shadow-2xl p-5 border border-slate-200/50 relative">
          
          {/* Close button indicator */}
          <div className="absolute top-4 right-4 text-slate-400">
            <span className="text-lg font-bold">×</span>
          </div>

          <h4 className="text-center font-sans font-bold text-sm text-slate-900 mb-5 tracking-tight">
            Filter Jobs
          </h4>

          <div className="space-y-4 text-left">
            {/* Job Type Grid */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-slate-400 tracking-wide block uppercase">Job Type</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={jobType.fullTime} 
                    onChange={() => setJobType(p => ({ ...p, fullTime: !p.fullTime }))}
                    className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                  />
                  <span className="text-slate-600">Full Time</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={jobType.partTime} 
                    onChange={() => setJobType(p => ({ ...p, partTime: !p.partTime }))}
                    className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                  />
                  <span className="text-slate-600">Part Time</span>
                </label>
                <label className="flex items-center gap-2 col-span-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={jobType.remote} 
                    onChange={() => setJobType(p => ({ ...p, remote: !p.remote }))}
                    className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                  />
                  <span className="text-slate-600">Work From Home</span>
                </label>
              </div>
            </div>

            {/* Range Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-400 tracking-wide uppercase">
                <span>Salary</span>
                <span className="text-blue-600 font-bold">${salary.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100000" 
                step="5000"
                value={salary} 
                onChange={(e) => setSalary(Number(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
              />
              <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
                <span>0</span>
                <span>100,000</span>
              </div>
            </div>

            {/* Duration select */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-slate-400 tracking-wide block uppercase">Duration</span>
              <div className="w-full p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex justify-between items-center cursor-pointer">
                <span>All</span>
                <span className="text-[10px] text-slate-400">▼</span>
              </div>
            </div>

            {/* Action buttons */}
            <button 
              onClick={() => {}} 
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide uppercase shadow-lg shadow-blue-500/10 cursor-pointer active:scale-98 transition-all"
            >
              Apply Filters
            </button>
          </div>

        </div>
      </div>

      {/* Playback indicator */}
      <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded-full font-mono text-[8px] text-slate-300 z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
        <span>{isPlaying ? 'FILTER_DRIVEN_LOOP' : 'PAUSED'}</span>
      </div>
    </div>
  );
}

// --- PROJECT 03: PRODUCTIZE SAAS LIVE DEMO VIDEO SIMULATOR ---
function ProductizeDemo() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly');
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full h-full bg-[#faf9f6] text-neutral-800 flex flex-col justify-between font-sans overflow-hidden select-none p-0 relative">
      
      {/* Dynamic ambient lines */}
      <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-neutral-200/50 filter blur-3xl pointer-events-none" />

      {/* Top Nav */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-neutral-200/60 z-10 bg-white/80 backdrop-blur-md">
        <span className="font-bold text-xs tracking-tight text-neutral-900 font-display">Productize</span>
        <div className="flex items-center gap-3 text-[8px] font-mono font-bold text-neutral-500 uppercase">
          <span>About</span>
          <span>Features</span>
          <span>Pricing</span>
          <button className="bg-neutral-900 text-white px-2.5 py-1 rounded-md font-sans font-bold hover:bg-neutral-800 active:scale-95 transition-all cursor-pointer">
            Free trial
          </button>
        </div>
      </div>

      {/* Pricing Cards Container */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-3 z-10">
        
        {/* Sliding cycle toggle selector */}
        <div className="flex items-center gap-1 bg-neutral-100 border border-neutral-200/60 p-1 rounded-full mb-4 shadow-sm">
          <button 
            onClick={() => setBillingCycle('monthly')}
            className={`px-3 py-1 rounded-full text-[9px] font-bold tracking-tight uppercase transition-all cursor-pointer ${billingCycle === 'monthly' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500'}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setBillingCycle('yearly')}
            className={`px-3 py-1 rounded-full text-[9px] font-bold tracking-tight uppercase transition-all cursor-pointer ${billingCycle === 'yearly' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500'}`}
          >
            Yearly <span className="text-emerald-500 text-[8px] font-black font-mono">(-20%)</span>
          </button>
        </div>

        {/* Pricing columns */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-[460px]">
          
          {/* FREE PLAN */}
          <div className="bg-white border border-neutral-200/80 p-3 rounded-xl flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-[8px] font-mono text-neutral-400 font-bold uppercase tracking-wider block">Free</span>
              <div className="text-lg font-display font-bold text-neutral-900 mt-1">$0</div>
              <span className="text-[8px] text-neutral-400 block -mt-1 font-mono">per month</span>
              <ul className="text-[8px] text-neutral-500 space-y-1 mt-3">
                <li className="flex items-center gap-1">✓ 1 Member</li>
                <li className="flex items-center gap-1">✓ 2 Projects</li>
                <li className="flex items-center gap-1">✓ 2GB Cloud</li>
              </ul>
            </div>
            <button className="w-full mt-4 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-[9px] tracking-wide uppercase transition-all cursor-pointer">
              Get Free
            </button>
          </div>

          {/* PRO PLAN (Premium Highlighted) */}
          <div className="bg-neutral-900 text-white border border-neutral-800 p-3.5 rounded-xl flex flex-col justify-between shadow-xl relative scale-[1.03]">
            <span className="absolute -top-2 right-3 bg-neutral-100 text-neutral-900 text-[6px] font-bold tracking-widest px-1.5 py-0.5 rounded-full uppercase border border-neutral-200">POPULAR</span>
            <div>
              <span className="text-[8px] font-mono text-neutral-400 font-bold uppercase tracking-wider block">Pro</span>
              <div className="text-lg font-display font-bold text-white mt-1">
                {billingCycle === 'monthly' ? '$9' : '$7'}
              </div>
              <span className="text-[8px] text-neutral-400 block -mt-1 font-mono">per month</span>
              <ul className="text-[8px] text-neutral-300 space-y-1 mt-3">
                <li className="flex items-center gap-1">✓ 5 Members</li>
                <li className="flex items-center gap-1">✓ Unlimited</li>
                <li className="flex items-center gap-1">✓ 50GB Cloud</li>
                <li className="flex items-center gap-1">✓ Integrations</li>
              </ul>
            </div>
            <button className="w-full mt-4 py-1.5 rounded-lg bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-[9px] tracking-wide uppercase transition-all cursor-pointer">
              Sign Up
            </button>
          </div>

          {/* BUSINESS PLAN */}
          <div className="bg-white border border-neutral-200/80 p-3 rounded-xl flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-[8px] font-mono text-neutral-400 font-bold uppercase tracking-wider block">Business</span>
              <div className="text-lg font-display font-bold text-neutral-900 mt-1">
                {billingCycle === 'monthly' ? '$19' : '$15'}
              </div>
              <span className="text-[8px] text-neutral-400 block -mt-1 font-mono">per month</span>
              <ul className="text-[8px] text-neutral-500 space-y-1 mt-3">
                <li className="flex items-center gap-1">✓ 15 Members</li>
                <li className="flex items-center gap-1">✓ Unlimited</li>
                <li className="flex items-center gap-1">✓ 200GB Cloud</li>
              </ul>
            </div>
            <button className="w-full mt-4 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-[9px] tracking-wide uppercase transition-all cursor-pointer">
              Sign Up
            </button>
          </div>

        </div>

      </div>

      {/* Playback overlay status */}
      <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/70 backdrop-blur-md border border-neutral-200 px-2 py-0.5 rounded-full font-mono text-[8px] text-neutral-500">
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-pulse" />
        <span>{isPlaying ? 'INTERACTIVE_PRICING_CYCLE' : 'PAUSED'}</span>
      </div>
    </div>
  );
}

// --- PROJECT 04: CINEREC LIVE DEMO VIDEO SIMULATOR ---
interface Movie {
  title: string;
  imgSeed: string;
  posterColor: string;
}

const CINEMA_MOVIES: Movie[] = [
  { title: 'Green Lantern', imgSeed: 'green_lantern', posterColor: 'from-emerald-950 to-green-900' },
  { title: 'X-men origins: wolverine', imgSeed: 'wolverine', posterColor: 'from-slate-950 to-neutral-900' },
  { title: 'Howard the duck', imgSeed: 'howard_duck', posterColor: 'from-amber-950 to-orange-900' }
];

function CineRecDemo() {
  const [selectedMovie, setSelectedMovie] = useState<string>('Green Lantern');
  const [recommendations, setRecommendations] = useState<string[]>(['Deadpool', 'Green Hornet', 'Guardians of the Galaxy']);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-cycles recommended movie
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setSelectedMovie(prev => {
        if (prev === 'Green Lantern') {
          setRecommendations(['Logan', 'Deadpool', 'X-Men']);
          return 'X-men origins: wolverine';
        } else if (prev === 'X-men origins: wolverine') {
          setRecommendations(['Ted', 'Space Jam', 'Guardians of the Galaxy']);
          return 'Howard the duck';
        } else {
          setRecommendations(['Deadpool', 'Green Hornet', 'Guardians of the Galaxy']);
          return 'Green Lantern';
        }
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full h-full bg-[#0a0a0c] text-neutral-100 flex flex-col justify-between font-sans overflow-hidden select-none p-4 relative">
      
      {/* Decorative ambient background lights */}
      <div className="absolute inset-0 bg-radial-gradient-subtle pointer-events-none" />

      {/* Instructions label */}
      <div className="text-center py-1 z-10">
        <span className="font-mono text-[10px] text-[#8c8a82]/80 uppercase tracking-wider block">
          (Click any of the movies to get recommendation)
        </span>
      </div>

      {/* Movies selector grid */}
      <div className="flex-1 flex flex-col justify-center items-center py-4 z-10">
        <div className="grid grid-cols-3 gap-3 w-full max-w-[440px]">
          {CINEMA_MOVIES.map((movie) => {
            const isSelected = selectedMovie === movie.title;
            return (
              <div 
                key={movie.title}
                onClick={() => {
                  setSelectedMovie(movie.title);
                  if (movie.title === 'Green Lantern') {
                    setRecommendations(['Deadpool', 'Green Hornet', 'Guardians of the Galaxy']);
                  } else if (movie.title === 'X-men origins: wolverine') {
                    setRecommendations(['Logan', 'Deadpool', 'X-Men']);
                  } else {
                    setRecommendations(['Ted', 'Space Jam', 'Guardians of the Galaxy']);
                  }
                }}
                className={`flex flex-col rounded-xl overflow-hidden cursor-pointer transition-all duration-500 relative border ${isSelected ? 'border-amber-400 shadow-xl shadow-amber-500/10 scale-[1.04]' : 'border-neutral-800 scale-95 opacity-70 hover:opacity-95'}`}
              >
                {/* Simulated Movie Poster with nice layout details */}
                <div className={`aspect-[2/3] bg-gradient-to-t ${movie.posterColor} flex flex-col justify-between p-2 relative`}>
                  
                  {/* Glowing tag */}
                  {isSelected && (
                    <span className="absolute top-2 right-2 bg-amber-400 text-[#050505] text-[6px] font-bold px-1 py-0.5 rounded uppercase leading-none animate-pulse">
                      Selected
                    </span>
                  )}

                  {/* Aesthetic artwork container */}
                  <div className="flex-1 flex items-center justify-center text-xl">
                    {movie.title === 'Green Lantern' && '🟢'}
                    {movie.title === 'X-men origins: wolverine' && '🐺'}
                    {movie.title === 'Howard the duck' && '🦆'}
                  </div>

                  <div className="font-display font-bold text-[8px] sm:text-[9px] uppercase tracking-wide leading-tight text-white mb-1 drop-shadow-md">
                    {movie.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic AI recommended output row */}
        <div className="mt-5 w-full max-w-[440px] p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-left">
          <div className="text-[8px] font-mono text-amber-400/80 uppercase font-black tracking-widest mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400 animate-spin-slow" />
            <span>AI NEURAL RECOMMENDATIONS</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {recommendations.map((rec) => (
              <div key={rec} className="bg-neutral-800/80 border border-neutral-700/60 rounded-md p-1.5 text-center text-[9px] font-sans font-bold text-white shadow-sm truncate">
                {rec}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Playback overlay status */}
      <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-md border border-neutral-800 px-2 py-0.5 rounded-full font-mono text-[8px] text-neutral-400 z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        <span>{isPlaying ? 'NEURAL_RECOMMEND_ACTIVE' : 'PAUSED'}</span>
      </div>
    </div>
  );
}

// --- PROJECT 05: CODE2IMG LIVE DEMO VIDEO SIMULATOR ---
function Code2ImgDemo() {
  const [gradientIndex, setGradientIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [codeLang, setCodeLang] = useState('Python');

  const gradients = [
    'from-[#6cbca4] to-[#1a4175]',
    'from-rose-500 via-purple-600 to-indigo-700',
    'from-emerald-400 to-cyan-500',
    'from-amber-200 via-red-500 to-purple-600'
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setGradientIndex(prev => (prev + 1) % gradients.length);
      setCodeLang(prev => prev === 'Python' ? 'JavaScript' : 'Python');
    }, 3500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full h-full bg-[#0c0c0e] text-neutral-300 flex flex-col justify-between font-sans overflow-hidden select-none p-4 relative">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-2 z-10">
        <span className="text-[10px] font-bold text-indigo-400 font-mono tracking-tight flex items-center gap-1">
          <span>{'{...}'}</span> Code to Image
        </span>
        <div className="w-3.5 h-3.5 bg-neutral-800 rounded-full flex items-center justify-center text-[8px] font-mono text-neutral-400">
          G
        </div>
      </div>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col justify-center items-center py-2 z-10 relative">
        
        {/* Dynamic Image Canvas Preview */}
        <div className={`w-full max-w-[420px] aspect-[16/9] bg-gradient-to-br ${gradients[gradientIndex]} rounded-xl p-6 shadow-2xl flex items-center justify-center transition-all duration-1000 ease-in-out`}>
          
          {/* Mock Code Editor Frame */}
          <div className="w-full rounded-lg bg-neutral-900/95 shadow-xl border border-white/5 p-4 flex flex-col gap-2 font-mono text-[9px] sm:text-xs">
            
            {/* Red, Yellow, Green mock controls */}
            <div className="flex gap-1.5 pb-1 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
              <span className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
            </div>

            {/* Code Highlight output */}
            <div className="text-left text-slate-100 font-medium space-y-1">
              {codeLang === 'Python' ? (
                <>
                  <div>
                    <span className="text-indigo-400">import</span> numpy <span className="text-indigo-400">as</span> np
                  </div>
                  <div>
                    <span className="text-emerald-400">print</span>(<span className="text-amber-300">"hello World!"</span>)
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <span className="text-pink-400">const</span> render = () <span className="text-pink-400">=&gt;</span> {'{'}
                  </div>
                  <div className="pl-3">
                    console.<span className="text-emerald-400">log</span>(<span className="text-amber-300">'Ready!'</span>);
                  </div>
                  <div>{'};'}</div>
                </>
              )}
            </div>

          </div>
        </div>

        {/* Dynamic Control Panel */}
        <div className="mt-4 w-full max-w-[420px] bg-neutral-900/80 border border-neutral-800/80 rounded-xl p-3 grid grid-cols-4 gap-2 text-[8px] font-mono uppercase tracking-wider text-left">
          
          <div className="flex flex-col gap-1 bg-neutral-950 p-1.5 rounded border border-neutral-800">
            <span className="text-[6px] text-neutral-500 font-black">Font</span>
            <span className="text-white font-bold">JetBrains Mono</span>
          </div>

          <div className="flex flex-col gap-1 bg-neutral-950 p-1.5 rounded border border-neutral-800">
            <span className="text-[6px] text-neutral-500 font-black">Padding</span>
            <span className="text-white font-bold">70%</span>
          </div>

          <div className="flex flex-col gap-1 bg-neutral-950 p-1.5 rounded border border-neutral-800">
            <span className="text-[6px] text-neutral-500 font-black">Language</span>
            <span className="text-indigo-400 font-bold">{codeLang}</span>
          </div>

          <div className="flex flex-col gap-1 bg-[#eae8e4] text-[#050505] p-1.5 rounded border border-neutral-200 justify-center items-center text-center font-bold">
            <span>EXPORT</span>
          </div>

        </div>

      </div>

      {/* Playback overlay status */}
      <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-md border border-neutral-800 px-2 py-0.5 rounded-full font-mono text-[8px] text-neutral-400 z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
        <span>{isPlaying ? 'LIVE_CANVAS_EXPORT_LOOP' : 'PAUSED'}</span>
      </div>
    </div>
  );
}

export default function WorksSection() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section id="works-section" className="w-full bg-[#050505] relative">
      {/* Decorative vertical spacer or separator line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-neutral-800/60 pointer-events-none" />

      {/* 2.2.A. INTRO STICKY HEADER BLOCK (Curtain-style stacked card) */}
      <div
        id="works-intro-sticky"
        className="w-full min-h-screen md:h-screen md:sticky md:top-0 z-[20] bg-[#050505] text-[#EAE7DF] overflow-hidden border-b border-neutral-900/80 flex flex-col justify-center"
      >
        <div
          id="works-intro-sticky-inner"
          className="w-full h-full px-6 py-16 md:py-0 flex flex-col justify-center"
        >
          {/* Top divider inside section */}
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

      {/* CURTAIN REVEAL CONTAINER */}
      {PROJECTS_DATA.map((project, idx) => {
        // Assign decreasing or increasing relative layers matching standard sticky reveal
        const zIndexValue = 20 + idx + 1; // 21, 22, 23, 24, 25
        const zIndexClass = `z-[${zIndexValue}]`;

        return (
          <div
            key={project.id}
            id={`project-${project.id}`}
            className={`w-full min-h-screen md:h-screen md:sticky md:top-0 ${zIndexClass} bg-[#050505] overflow-hidden border-b border-neutral-900/80 flex items-center justify-center`}
          >
            <div
              id={`project-${project.id}-inner`}
              className="w-full h-full px-6 py-16 md:py-0 flex items-center justify-center"
            >
              {/* Top divider inside section */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-neutral-900 pointer-events-none" />

              {/* Content Box */}
              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 items-center">
              
              {/* LEFT COLUMN: HUGE NUMBERS */}
              <div className="col-span-1 md:col-span-5 flex flex-col justify-center items-start md:pr-10">
                <motion.div
                  initial={{ opacity: 0, x: -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-black text-[15vw] md:text-[14vw] lg:text-[12vw] leading-none tracking-tighter text-[#EAE7DF] select-none cursor-default hover:text-white transition-all duration-500"
                >
                  {project.num}
                </motion.div>
              </div>

              {/* RIGHT COLUMN: PREVIEW WINDOW & INFO */}
              <div className="col-span-1 md:col-span-7 flex flex-col justify-center space-y-6">
                
                {/* HIGH-FIDELITY LIVE RECONSTRUCTED PREVIEW (WINDOW) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full aspect-[4/3] max-w-[560px] md:max-w-none rounded-2xl overflow-hidden border border-neutral-800/80 bg-neutral-950 flex flex-col shadow-2xl relative group"
                >
                  {/* Top OS Window Control Header */}
                  <div className="bg-neutral-900/90 border-b border-neutral-800/80 px-4 py-3 flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="w-3 h-3 rounded-full bg-neutral-800 group-hover:bg-red-500/80 transition-colors duration-300" />
                      <span className="w-3 h-3 rounded-full bg-neutral-800 group-hover:bg-yellow-500/80 transition-colors duration-300" />
                      <span className="w-3 h-3 rounded-full bg-neutral-800 group-hover:bg-green-500/80 transition-colors duration-300" />
                    </div>
                    {/* Tiny URL address bar mockup */}
                    <div className="bg-neutral-950/70 text-neutral-500 rounded px-4 py-1 text-[8px] font-mono tracking-wider w-1/2 text-center select-none truncate">
                      {project.id === 'nura' && 'nura.shop'}
                      {project.id === 'jobportal' && 'jobportal.dev'}
                      {project.id === 'productize' && 'productize.io'}
                      {project.id === 'cinerec' && 'cinerec.ai'}
                      {project.id === 'code2img' && 'code2img.app'}
                    </div>
                    {/* Blank spacing to balance */}
                    <div className="w-8" />
                  </div>

                  {/* Dynamic interactive preview panel simulator */}
                  <div className="flex-1 w-full bg-neutral-950 relative">
                    {project.id === 'nura' && <NuraDemo />}
                    {project.id === 'jobportal' && <JobPortalDemo />}
                    {project.id === 'productize' && <ProductizeDemo />}
                    {project.id === 'cinerec' && <CineRecDemo />}
                    {project.id === 'code2img' && <Code2ImgDemo />}
                  </div>

                </motion.div>

                {/* PROJECT NAME, CATEGORY, & ACTION BUTTONS */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-[560px] md:max-w-none text-left">
                  
                  {/* Category & Title */}
                  <div className="space-y-1 select-none">
                    <span className="font-mono text-[10px] md:text-xs text-[#8c8a82] tracking-widest uppercase block">
                      {project.category}
                    </span>
                    <h3 className="font-display font-black text-2xl md:text-3xl text-[#eae8e4] tracking-tight uppercase leading-none">
                      {project.title}
                    </h3>
                  </div>

                  {/* GitHub Action Link Button */}
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800/80 text-[#eae8e4] hover:text-white hover:border-neutral-500 rounded-full font-mono text-[11px] font-bold tracking-wide uppercase transition-all duration-300 w-fit cursor-pointer shadow-lg"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Developer</span>
                  </motion.a>

                </div>

              </div>

            </div>

          </div>
        </div>
        );
      })}
    </section>
  );
}
