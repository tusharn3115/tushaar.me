'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight, Activity, Zap, Search, Layout } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading'; // Ensure this path is correct for your setup

// 1. SAMPLE DATA (You can replace this with your import)
const projects = [
    {
        title: "Tesla",
        role: "Team Lead, Energy Products",
        icon: <Zap size={24} />,
        description: "Led the development of the energy products dashboard, optimizing real-time data visualization for solar and powerwall customers. Improved load times by 40% using Next.js incremental static regeneration.",
        stack: "React • TypeScript • D3.js • Next.js"
    },
    {
        title: "Lyft",
        role: "Team Lead, Visualization",
        icon: <Activity size={24} />,
        description: "Architected the internal visualization tools for Level 5 self-driving data. Created high-performance 3D rendering components to visualize LIDAR point clouds in the browser.",
        stack: "WebGL • React • Three.js • Python"
    },
    {
        title: "Google",
        role: "Software Engineer",
        icon: <Search size={24} />,
        description: "Contributed to the AMP Project, focusing on performance optimization and story format. Maintained open-source repositories and improved CI/CD pipelines.",
        stack: "JavaScript • AMP • Node.js • HTML5"
    },
    {
        title: "Frame.io",
        role: "Frontend Architect",
        icon: <Layout size={24} />,
        description: "Designed the collaborative video review interface. Implemented frame-accurate video playback controls and real-time commenting features using WebSockets.",
        stack: "Vue.js • Redux • WebSockets • AWS"
    }
];

// 2. THE SINGLE COMPONENT
const Projects = () => {
    const [activeindex, setActiveIndex] = useState(null);
    const timeoutRef = useRef(null);

    // Optimized Hover Logic
    const onEnter = (index) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        // Wait 75ms to see if user stays before triggering animation
        timeoutRef.current = setTimeout(() => {
            setActiveIndex(index);
        }, 75);
    };

    const onLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        // Wait 75ms before closing to prevent flickering
        timeoutRef.current = setTimeout(() => {
            setActiveIndex(null);
        }, 75);
    };

    return (
        <section className="max-w-3xl mx-auto py-12">
            <SectionHeading>Experiences</SectionHeading>

            <div className="flex flex-col">
                {projects.map((project, index) => {
                    const isOpen = activeindex === index;

                    return (
                        <div
                            key={index}
                            onMouseEnter={() => onEnter(index)}
                            onMouseLeave={onLeave}
                            className="group relative w-full cursor-pointer py-2"
                        >
                            <div className="flex items-start gap-6">
                                {/* Left: Icon */}
                                <div className="flex-shrink-0 mt-2">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all duration-300 ease-out ${isOpen ? 'bg-slate-900 text-white shadow-xl scale-110' : 'bg-slate-50 text-slate-900'}`}>
                                        {project.icon}
                                    </div>
                                </div>

                                {/* Right: Content */}
                                <div className="flex-grow border-b border-gray-100 pb-8 group-last:border-0">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                                                {project.title}
                                            </h3>
                                            <p className="text-sm text-slate-500 font-medium mt-1 uppercase tracking-wide">
                                                {project.role}
                                            </p>
                                        </div>
                                        
                                        {/* Hover Arrow */}
                                        <div className={`text-slate-300 transition-all duration-300 ${isOpen ? 'opacity-100 translate-x-0 text-slate-900' : 'opacity-0 -translate-x-4'}`}>
                                            <ArrowRight size={20} />
                                        </div>
                                    </div>

                                    {/* Accordion Body */}
                                    <motion.div
                                        initial={false}
                                        animate={isOpen ? { height: "auto", opacity: 1, marginTop: 12 } : { height: 0, opacity: 0, marginTop: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-sm text-slate-600 leading-relaxed font-light max-w-xl">
                                            {project.description}
                                        </p>

                                        <div className="mt-5 flex items-center gap-4">
                                            <div className="flex flex-wrap gap-2">
                                                {project.stack.split('•').map((tech, i) => (
                                                    <span 
                                                        key={i} 
                                                        className="text-[10px] px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-slate-600 font-semibold tracking-wide"
                                                    >
                                                        {tech.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                            
                                            <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />
                                            
                                            <a href="#" className="flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-emerald-600 transition-colors">
                                                View Case Study <ExternalLink size={11} />
                                            </a>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Projects;