import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Box, Layers } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { componentsImages } from '../../data/portfolioData';

// Mock data enhancement
const items = componentsImages.map((src, i) => ({
    id: i,
    src,
    title: `Component ${i + 1}`,
    category: i % 2 === 0 ? "Interaction" : "UI Module"
}));

const ComponentsGallery = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative py-12"
        >
            {/* Header */}
            <div className="mb-10 px-1 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <SectionHeading>Interface Library</SectionHeading>
                    <p className="text-sm text-gray-500 dark:text-gray-400 -mt-4 max-w-md font-light leading-relaxed transition-colors">
                        A curated collection of isolated UI components, micro-interactions, and
                        design system experiments crafted with React & Framer Motion.
                    </p>
                </div>

                {/* Decorative Pill */}
                <div className="hidden md:flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-100/50 dark:bg-white/5 px-3 py-1 rounded-full border border-gray-100 dark:border-white/5 transition-colors">
                    <Layers size={12} />
                    <span>{componentsImages.length} Components</span>
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="relative">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-[400px] overflow-hidden mask-image-b">
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            layoutId={`card-${i}`}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="relative rounded-xl overflow-hidden bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 aspect-[4/5] transition-colors"
                        >
                            <img
                                src={item.src}
                                alt={item.title}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Fade & CTA */}
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#FDFCF8] via-[#FDFCF8] to-transparent dark:from-[#09090b] dark:via-[#09090b] z-10 flex items-end justify-center pb-8 pointer-events-none transition-colors duration-300">

                    {/* BUTTON */}
                    <button
                        className="pointer-events-auto relative overflow-hidden flex items-center gap-3 
                        /* Glassy & Premium Styles */
                        bg-black/90 backdrop-blur-xl border border-white/10 
                        text-white pl-6 pr-5 py-3.5 rounded-full 
                        shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] 
                        transition-all duration-300 group cursor-pointer hover:scale-105"
                    >
                        {/* --- THE FLARE --- 
                            Moves Left -> Right.
                            Slow, smooth wash over the glass.
                        */}
                        <div className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-30deg] z-10 animate-flare-slow pointer-events-none" />

                        {/* Button Content */}
                        <Box size={16} className="text-white/90 relative z-20" />
                        <span className="text-sm font-medium tracking-wide relative z-20">Browse Full Library</span>
                        <ArrowRight size={14} className="text-white/90 relative z-20 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Animation Logic */}
            <style jsx>{`
                @keyframes flare-slow {
                    /* Start off-screen LEFT */
                    0% { 
                        left: -100%; 
                    }
                    /* Move to off-screen RIGHT smoothly (takes 50% of the timeline) */
                    50% { 
                        left: 200%; 
                    }
                    /* Stay there for the rest of the loop (Delay) */
                    100% { 
                        left: 200%; 
                    }
                }
                
                .animate-flare-slow {
                    /* Duration: 5s total loop
                       Movement: Takes ~2.5s (very smooth)
                       Delay: Takes ~2.5s before repeating
                    */
                    animation: flare-slow 5s infinite ease-in-out;
                }

                .mask-image-b {
                    mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
                }
            `}</style>
        </motion.section>
    );
};

export default ComponentsGallery;