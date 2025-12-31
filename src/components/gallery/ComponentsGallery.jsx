import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { componentsImages } from '../../data/portfolioData';
import CursorTooltip from '../ui/CursorTooltip';

const items = componentsImages.slice(0, 6).map((item, i) => ({
    id: i,
    src: item.src,
    title: item.title,
    tag: i % 2 === 0 ? "Framer Motion" : "React Component",
    index: String(i + 1).padStart(2, '0')
}));

const ComponentsGallery = () => {
    const [activeTitle, setActiveTitle] = useState(null);

    return (
        <section className="py-20 bg-transparent">
            <CursorTooltip title={activeTitle} />
            <div className="container mx-auto px-6">

                {/* Refined Header */}
                {/* Refined Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-16 border-b border-black/5 dark:border-white/5 pb-8 flex justify-between items-end"
                >
                    <div className="space-y-1">
                        <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-gray-400 block">
                            Archive v2.0
                        </span>
                        <h2 className="text-3xl font-light tracking-tight text-gray-900 dark:text-white">
                            Components <span className="font-serif italic text-gray-500 dark:text-gray-400">I have cooked</span>
                        </h2>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 hidden md:block">
                        Total / 06
                    </span>
                </motion.div>

                {/* Tightened Asymmetric Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-y-20 gap-x-8">
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                            onMouseEnter={() => setActiveTitle(item.title)}
                            onMouseLeave={() => setActiveTitle(null)}
                            className={`relative group md:col-span-12 ${i % 2 !== 0 ? 'md:mt-32 lg:col-start-8 lg:col-span-5' : 'lg:col-span-7'
                                }`}
                        >
                            {/* Metadata Layer - Tighter spacing */}
                            {/* <div className="flex items-center gap-3 mb-3">
                                <span className="text-[10px] font-mono text-gray-700 dark:text-gray-300 opacity-70">
                                    {item.index}
                                </span>
                                <h3 className="text-base font-normal tracking-tight text-gray-900 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
                                    {item.title}
                                </h3>
                            </div> */}

                            {/* Image Container - Clean & Sharp */}
                            <div className="relative aspect-[16/10] overflow-hidden bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
                                {item.src.endsWith('.mp4') ? (
                                    <video
                                        src={item.src}
                                        autoPlay loop muted playsInline
                                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                                    />
                                ) : (
                                    <img
                                        src={item.src}
                                        alt={item.title}
                                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                                    />
                                )}

                                {/* Minimal Corner Icon */}
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                    <ArrowUpRight size={16} className="text-white mix-blend-difference" />
                                </div>
                            </div>

                            {/* Minimal Footer */}
                            {/* <div className="mt-3 flex justify-between items-center">
                                <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">
                                    {item.tag}
                                </span>
                                <div className="h-[1px] w-0 group-hover:w-8 bg-gray-900 dark:bg-white transition-all duration-500" />
                            </div> */}
                        </motion.div>
                    ))}
                </div>

                {/* Minimal CTA - Reduced Margin */}
                <div className="mt-10 flex justify-center">
                    <Link to="/component" className="group flex items-center gap-6 px-8 py-3 transition-all duration-300 cursor-pointer">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 group-hover:text-black dark:group-hover:text-white">
                            View All Components
                        </span>
                        <div className="relative w-8 h-[1px] bg-gray-300 dark:bg-gray-700 overflow-hidden">
                            <div className="absolute inset-0 bg-gray-900 dark:bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                        </div>
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default ComponentsGallery;