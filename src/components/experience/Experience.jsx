import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { roles } from '../../data/portfolioData';

const Experience = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="max-w-3xl mx-auto py-5">
            <SectionHeading>Experience</SectionHeading>

            <div className="flex flex-col gap-8" onMouseLeave={() => setActiveIndex(null)}>
                {roles.map((role, index) => {
                    const isOpen = activeIndex === index;
                    const isAnyOpen = activeIndex !== null;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onMouseEnter={() => setActiveIndex(index)}
                            className={`group relative cursor-pointer transition-all duration-500 ease-out ${isAnyOpen && !isOpen ? 'opacity-40 blur-[1px]' : 'opacity-100'
                                }`}
                        >
                            {/* Header */}
                            <div className="flex items-baseline justify-between border-b border-black/10 dark:border-white/10 pb-4 group-hover:border-black/30 dark:group-hover:border-white/30 transition-colors duration-300">
                                <div className="flex items-baseline gap-4">
                                    <h3 className="text-3xl md:text-4xl font-instrument italic text-slate-900 dark:text-white transition-colors">
                                        {role.company}
                                    </h3>
                                    <span className="text-sm font-inter text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
                                        {role.role}
                                    </span>
                                </div>
                                <span className="text-xs font-mono text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300 transition-colors">
                                    {role.date}
                                </span>
                            </div>

                            {/* Expanded Content */}
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-4 pb-2">
                                            <p className="text-base font-light text-slate-600 dark:text-slate-300 font-inter leading-relaxed max-w-xl">
                                                {role.description}
                                            </p>

                                            {role.skills && (
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {role.skills.split('•').map((skill, i) => (
                                                        <span
                                                            key={i}
                                                            className="text-[11px] uppercase tracking-wider px-2 py-1 bg-black/5 dark:bg-white/5 rounded text-slate-600 dark:text-slate-300"
                                                        >
                                                            {skill.trim()}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default Experience;