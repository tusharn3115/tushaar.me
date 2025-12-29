
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { componentsImages } from '../../data/portfolioData';

const ComponentsGallery = () => {
    return (
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
    );
};

export default ComponentsGallery;
