import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ExternalLink, 
  Code2, 
  Briefcase, 
  Layers, 
  Image as ImageIcon,
  ArrowRight,
  MapPin,
  Command,
  Plus,
  Zap,
  GitCommit,
  TrendingUp,
  Cpu,
  Globe,
  Building2,
  ChevronDown,
  Minus
} from 'lucide-react';

// --- Styles & Fonts ---
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&display=swap');
  
  .font-instrument { font-family: 'Instrument Serif', serif; }
  .font-inter { font-family: 'Inter', sans-serif; }
  
  .premium-shadow {
    box-shadow: 
      0 4px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px -1px rgba(0, 0, 0, 0.02),
      0 20px 40px -10px rgba(0, 0, 0, 0.06);
  }
  
  .glass-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.8);
  }
  
  .glass-tooltip {
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 
      0 20px 40px -10px rgba(0,0,0,0.4),
      0 0 15px rgba(255,255,255,0.03) inset;
  }

  .noise-bg {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
  }
`;

// --- Components ---

const VerifiedBadge = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#1D9BF0] fill-current ml-1" aria-label="Verified Account">
    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .495.083.965.238 1.4-1.272.65-2.147 2.02-2.147 3.6 0 1.457.748 2.795 1.867 3.48-.05.19-.083.39-.083.595 0 2.21 1.71 3.998 3.818 3.998.47 0 .92-.084 1.336-.25.62 1.333 1.926 2.25 3.437 2.25s2.817-.917 3.437-2.25c.415.165.866.25 1.336.25 2.11 0 3.818-1.79 3.818-4 0-.205-.034-.405-.084-.595 1.12-.685 1.868-2.023 1.868-3.48zm-11.454 4.34l-3.32-3.32 1.415-1.415 1.905 1.905 4.775-4.775 1.415 1.415-6.19 6.19z" />
  </svg>
);

const Tooltip = ({ text, content, underline = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState('top'); // 'top' or 'bottom'
  const triggerRef = useRef(null);

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceAbove = rect.top;
      // If less than 180px space above, flip to bottom
      if (spaceAbove < 180) {
        setPosition('bottom');
      } else {
        setPosition('top');
      }
    }
    setIsVisible(true);
  };

  return (
    <span 
      ref={triggerRef}
      className="relative inline-block group z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className={`cursor-help text-gray-900 font-medium transition-colors duration-300 ${underline ? 'border-b border-gray-400 border-dashed hover:border-gray-900' : ''}`}>
        {text}
      </span>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: position === 'top' ? 8 : -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: position === 'top' ? 8 : -8, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.8 }}
            className={`absolute left-1/2 -translate-x-1/2 w-max max-w-[260px] glass-tooltip text-white text-xs p-3.5 rounded-2xl pointer-events-none z-[100] ${position === 'top' ? 'bottom-full mb-3' : 'top-full mt-3'}`}
          >
            {content}
            
            {/* Arrow */}
            <div 
              className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0a0a0a] border-r border-b border-[rgba(255,255,255,0.08)] transform rotate-45 ${
                position === 'top' 
                  ? 'bottom-[-6px] border-t-0 border-l-0' 
                  : 'top-[-6px] border-r-0 border-b-0 bg-[#0a0a0a]'
              }`} 
              // Fix for upper border when pointing up (top-[-6px]), we need to rotate properly or change borders
              style={position === 'bottom' ? { transform: 'translateX(-50%) rotate(-135deg)', top: '-5px', left: '50%' } : { transform: 'translateX(-50%) rotate(45deg)', bottom: '-5px', left: '50%' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

// --- Projects Accordion Component ---
const ProjectItem = ({ project, isOpen, onClick }) => {
  return (
    <motion.div 
      initial={false}
      className={`group border-b border-gray-100 last:border-0 ${isOpen ? 'bg-gray-50/50' : 'bg-transparent'} transition-colors duration-300 rounded-xl overflow-hidden`}
    >
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-instrument italic transition-all duration-300 ${isOpen ? 'bg-gray-900 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>
            {project.icon}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 font-inter">{project.title}</h3>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">{project.role}</p>
          </div>
        </div>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-400 group-hover:text-gray-900"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-4 pb-6 pt-0 pl-[4.5rem]">
              <p className="text-sm text-gray-600 leading-relaxed font-light mb-4">
                {project.description}
              </p>
              <div className="flex items-center gap-3">
                 <div className="flex gap-1.5">
                   {project.stack.split('•').map((tech, i) => (
                      <span key={i} className="text-[10px] px-2 py-1 bg-white border border-gray-200 rounded text-gray-500 font-medium">{tech.trim()}</span>
                   ))}
                 </div>
                 <div className="h-4 w-[1px] bg-gray-200 mx-1" />
                 <a href="#" className="text-xs font-medium text-gray-900 hover:text-emerald-600 transition-colors flex items-center gap-1">
                   View Project <ExternalLink size={10} />
                 </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Redesigned GitHub Heatmap ---
const GitHubSection = () => {
  // Generate mock data for the heatmap
  const weeks = 52;
  const days = 7;
  
  const getLevel = () => {
    const rand = Math.random();
    if (rand > 0.9) return 4; // Highest
    if (rand > 0.7) return 3;
    if (rand > 0.5) return 2;
    if (rand > 0.25) return 1;
    return 0; // Empty
  };

  const getColor = (level) => {
    switch(level) {
      case 4: return 'bg-[#216e39]';
      case 3: return 'bg-[#30a14e]';
      case 2: return 'bg-[#40c463]';
      case 1: return 'bg-[#9be9a8]';
      default: return 'bg-[#ebedf0]';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm relative overflow-hidden group">
       <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
             <Github size={18} className="text-gray-900" />
             <span className="text-sm font-semibold text-gray-900">Contribution Graph</span>
          </div>
          <div className="text-xs text-gray-500 font-medium">Last Year</div>
       </div>

       {/* Heatmap Grid */}
       <div className="flex gap-[3px] overflow-hidden mask-image-r">
          {Array.from({ length: 32 }).map((_, w) => ( // Showing ~32 weeks for mobile fit
             <div key={w} className="flex flex-col gap-[3px]">
               {Array.from({ length: 7 }).map((_, d) => {
                 const level = getLevel();
                 return (
                   <motion.div 
                     key={d}
                     whileHover={{ scale: 1.3 }}
                     className={`w-[10px] h-[10px] rounded-[2px] ${getColor(level)} transition-colors`}
                   />
                 )
               })}
             </div>
          ))}
       </div>

       <div className="flex items-center justify-between mt-4 text-[10px] text-gray-400 font-medium">
          <span>Learn how we count contributions</span>
          <div className="flex items-center gap-1">
             <span>Less</span>
             <div className="w-[10px] h-[10px] bg-[#ebedf0] rounded-[2px]" />
             <div className="w-[10px] h-[10px] bg-[#9be9a8] rounded-[2px]" />
             <div className="w-[10px] h-[10px] bg-[#40c463] rounded-[2px]" />
             <div className="w-[10px] h-[10px] bg-[#30a14e] rounded-[2px]" />
             <div className="w-[10px] h-[10px] bg-[#216e39] rounded-[2px]" />
             <span>More</span>
          </div>
       </div>
    </div>
  );
};

// --- Mock Data ---

const roles = [
  {
    company: "FantasticFare",
    role: "Frontend Developer",
    date: "2023 — Present",
    logo: "F",
  },
  {
    company: "Freelance",
    role: "Full Stack Engineer",
    date: "2021 — 2023",
    logo: "FR",
  },
  {
    company: "Keizer",
    role: "UI Developer",
    date: "2019 — 2021",
    logo: "K",
  }
];

const projects = [
  {
    title: "Chronicle",
    role: "Engineering Lead",
    description: "A minimal journaling app built with React and Tailwind. Features rich text editing, local-first architecture, and seamless Supabase sync.",
    stack: "React • Tailwind • Supabase",
    icon: "C",
  },
  {
    title: "Apex UI",
    role: "Creator",
    description: "An accessible, unstyled component library for rapid prototyping. Used by 500+ developers for internal tools and dashboards.",
    stack: "TypeScript • Radix • Stitches",
    icon: "A",
  },
  {
    title: "Velvet",
    role: "Frontend Architect",
    description: "High-performance e-commerce dashboard with real-time analytics, inventory management, and Stripe integration.",
    stack: "Next.js • GraphQL • Stripe",
    icon: "V",
  }
];

const componentsImages = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=2574&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2674&auto=format&fit=crop"
];

const SectionHeading = ({ children }) => (
  <h2 className="text-[11px] font-semibold text-gray-400 mb-6 tracking-[0.2em] uppercase pl-1 font-inter">
    {children}
  </h2>
);

// --- Main Application ---

export default function Portfolio() {
  const [openProject, setOpenProject] = useState(0); // Default first one open

  return (
    <>
      <style>{fontStyles}</style>
      <div className="min-h-screen bg-[#FDFCF8] text-gray-600 font-inter selection:bg-gray-900 selection:text-white pb-32 noise-bg">
        
        {/* Refined decorative top blur */}
        <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#FDFCF8] via-[#FDFCF8]/90 to-transparent z-20 pointer-events-none backdrop-blur-[1px]" />
        
        <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-24 relative z-10">
          
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="space-y-20"
          >

            {/* 1. Header Section (Banner + Profile) */}
            <motion.section variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="relative mb-12">
              {/* Banner Image */}
              <div className="w-full h-56 rounded-[2rem] overflow-hidden relative border border-black/5 premium-shadow group">
                 {/* Updated Banner GIF */}
                 <img 
                   src="https://i.pinimg.com/originals/5d/2c/44/5d2c44694918947aede42306cb7154d0.gif"
                   alt="Profile Banner"
                   className="w-full h-full object-cover object-top opacity-90 transition-transform duration-700 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Profile Info (Overlapping Banner) */}
              <div className="px-6 relative -mt-20 flex flex-col items-start">
                 {/* Profile Picture */}
                 <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-36 h-36 rounded-full border-[6px] border-[#FDFCF8] shadow-xl overflow-hidden bg-white relative z-10"
                  >
                    <img 
                      src="https://pbs.twimg.com/profile_images/2004813445838127104/8Go0jvZt_400x400.jpg"
                      alt="Tushar Negi"
                      className="w-full h-full object-cover"
                    />
                 </motion.div>

                 {/* Name, Badge & Origin */}
                 <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight font-instrument">Tushar Negi</h1>
                    <VerifiedBadge />
                    <span className="text-gray-300 hidden sm:inline">•</span>
                    <Tooltip 
                      text="I am from India" 
                      content={
                        <div className="flex items-center gap-3 min-w-[140px]">
                           {/* Stylized Flag */}
                           <div className="w-8 h-8 rounded-full border border-white/20 overflow-hidden relative flex-shrink-0 shadow-sm">
                             <div className="absolute inset-0 bg-gradient-to-b from-[#ff9933] via-white to-[#138808]" />
                             <div className="absolute inset-0 flex items-center justify-center">
                               <div className="w-2.5 h-2.5 rounded-full border border-[#000080]" />
                             </div>
                           </div>
                           <div>
                              <p className="font-semibold text-white text-sm">Based in India</p>
                              <p className="text-[10px] text-gray-400">GMT+5:30</p>
                           </div>
                        </div>
                      }
                    />
                 </div>
                 
                 {/* Role/Headline & Bio */}
                 <div className="mt-6 max-w-xl">
                    <h2 className="text-4xl sm:text-[2.75rem] font-instrument italic font-normal text-gray-900 tracking-tight leading-[1.1] mb-5">
                      Designer Engineer.<br />
                      <span className="text-gray-400 not-italic font-inter font-light tracking-tighter">Developer who Designs.</span>
                    </h2>
                    
                    <div className="text-lg text-gray-500 leading-relaxed font-light font-inter">
                      Currently Frontend Developer at{" "}
                      <Tooltip 
                        text="FantasticFare" 
                        underline={true}
                        content={
                          <div className="flex flex-col gap-2">
                             <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                               <Building2 size={16} />
                               <span>FantasticFare</span>
                             </div>
                             <p className="text-gray-300 leading-snug">Global travel technology & sales optimization platform.</p>
                             <div className="flex gap-2 mt-1">
                                <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300">USA</span>
                                <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300">Remote</span>
                             </div>
                          </div>
                        }
                      />
                      . Previously Freelance for various national and international clients. I'm passionate about building polished interfaces and crafting seamless user experiences, with a philosophy that the best animations are those that feel so natural they go entirely unnoticed.
                    </div>
                 </div>

                 {/* Location & Status */}
                 <div className="flex items-center gap-6 pt-8 text-xs tracking-wide uppercase text-gray-400 font-semibold font-inter">
                     <motion.span whileHover={{ color: "#111827" }} className="flex items-center gap-2 transition-colors cursor-default">
                       <MapPin size={14} className="text-gray-300" /> Pune, India
                     </motion.span>
                     <motion.span whileHover={{ color: "#10B981" }} className="flex items-center gap-2 transition-colors cursor-default">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> Available for projects
                     </motion.span>
                  </div>
              </div>
            </motion.section>

            {/* 2. GitHub Section */}
            <motion.section variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <SectionHeading>Engineering Activity</SectionHeading>
              <GitHubSection />
            </motion.section>

            {/* 3. Projects (FAQ Style) */}
            <motion.section variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <SectionHeading>Projects</SectionHeading>
              <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
                {projects.map((project, index) => (
                  <ProjectItem 
                    key={index} 
                    project={project} 
                    isOpen={openProject === index} 
                    onClick={() => setOpenProject(openProject === index ? -1 : index)}
                  />
                ))}
              </div>
            </motion.section>

            {/* 4. Components Section */}
            <motion.section variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="relative">
               <div className="mb-8 px-1">
                  <SectionHeading>Components</SectionHeading>
                  <p className="text-sm text-gray-500 -mt-5 max-w-sm font-light">A collection of isolated UI components, interactions, and design system experiments.</p>
               </div>
               
               {/* Image Grid */}
               <div className="relative group">
                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 h-[320px] overflow-hidden mask-image-b transition-all duration-700">
                    {componentsImages.map((src, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ scale: 1.02, filter: "brightness(1.05)" }}
                        className="relative rounded-lg overflow-hidden bg-gray-100 cursor-pointer aspect-[3/4]"
                      >
                        <img src={src} alt="Gallery item" className="w-full h-full object-cover opacity-95 hover:opacity-100 transition-opacity duration-500" />
                      </motion.div>
                    ))}
                 </div>
                 
                 {/* Bottom Fade Gradient */}
                 <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FDFCF8] via-[#FDFCF8]/80 to-transparent z-10 flex items-end justify-center pb-4 pointer-events-none">
                   <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="pointer-events-auto group flex items-center gap-3 bg-[#111] text-white pl-6 pr-5 py-3 rounded-full shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-black/20 transition-all"
                    >
                      <span className="text-sm font-medium tracking-wide">Browse Library</span>
                      <ArrowRight size={14} className="text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                   </motion.button>
                 </div>
               </div>
            </motion.section>

             {/* 5. Recent Roles Timeline */}
             <motion.section variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <SectionHeading>Experience</SectionHeading>
              <div className="flex flex-col gap-2">
                {roles.map((role, index) => (
                  <motion.div 
                    key={index} 
                    whileHover={{ scale: 1.01 }}
                    className="group flex items-center gap-5 py-5 px-4 rounded-xl border border-transparent hover:bg-white hover:border-gray-200/50 hover:shadow-sm transition-all duration-300 cursor-default"
                  >
                    <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-900 font-instrument italic text-xl shadow-sm group-hover:shadow-md transition-all duration-300">
                      {role.logo}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 font-semibold tracking-tight font-inter text-base">{role.company}</h3>
                      <p className="text-sm text-gray-500 font-normal">{role.role}</p>
                    </div>
                    <div className="text-xs text-gray-400 font-medium tracking-wide">
                      {role.date}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* 6. Contact Section (Cleaned) */}
            <motion.section variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
               <SectionHeading>Connect</SectionHeading>
               
               <div className="flex flex-col sm:flex-row items-center justify-between gap-8 py-10 border-t border-b border-gray-100">
                  <div className="flex gap-8">
                     <motion.a 
                        href="#" 
                        whileHover={{ y: -4, color: "#1D9BF0" }} 
                        className="text-gray-400 transition-colors"
                        aria-label="Twitter"
                     >
                       <Twitter size={28} strokeWidth={1.5} />
                     </motion.a>
                     <motion.a 
                        href="#" 
                        whileHover={{ y: -4, color: "#0077B5" }} 
                        className="text-gray-400 transition-colors"
                        aria-label="LinkedIn"
                     >
                       <Linkedin size={28} strokeWidth={1.5} />
                     </motion.a>
                     <motion.a 
                        href="#" 
                        whileHover={{ y: -4, color: "#181717" }} 
                        className="text-gray-400 transition-colors"
                        aria-label="GitHub"
                     >
                       <Github size={28} strokeWidth={1.5} />
                     </motion.a>
                  </div>
                  
                  <motion.a 
                    href="mailto:hello@example.com" 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-8 py-3 bg-[#111] text-white rounded-full text-sm font-medium hover:bg-black transition-all shadow-xl shadow-gray-900/10 hover:shadow-gray-900/20"
                   >
                     Get in touch
                   </motion.a>
               </div>
            </motion.section>

            {/* Footer */}
            <motion.footer variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] uppercase tracking-wider text-gray-400 font-inter font-medium">
               <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <p>All Systems Normal</p>
               </div>
               <p className="mt-4 sm:mt-0">© {new Date().getFullYear()} Tushar Negi.</p>
            </motion.footer>

          </motion.div>
        </main>
      </div>
    </>
  );
}