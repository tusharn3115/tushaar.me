import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../../ui/SectionHeading';
import { roles } from '../../../data/portfolioData';

const Experience = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <motion.section
            variants={{
                hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: "easeOut" } }
            }}
            className="max-w-3xl mx-auto"
        >
            {/* Refined Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-12 border-b border-black/5 dark:border-white/5 pb-8 flex justify-between items-end"
            >
                <div className="space-y-1">
                    <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-gray-400 block">
                        Career Path
                    </span>
                    <h2 className="text-4xl md:text-5xl font-instrument italic font-normal text-gray-900 dark:text-white tracking-tight">
                        Experience <span className="font-inter not-italic font-light text-gray-500 dark:text-gray-400 text-3xl md:text-4xl">& Roles</span>
                    </h2>
                </div>
                <span className="text-[10px] font-mono text-gray-400 hidden md:block">
                    2021 — Present
                </span>
            </motion.div>

            <div className="relative flex flex-col gap-12 pl-8 border-l border-black/5 dark:border-white/5 ml-3" onMouseLeave={() => setActiveIndex(null)}>
                {roles.map((role, index) => {
                    const isOpen = activeIndex === index;
                    const isAnyOpen = activeIndex !== null;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onMouseEnter={() => setActiveIndex(index)}
                            className={`group relative cursor-pointer transition-all duration-500 ease-out ${isAnyOpen && !isOpen ? 'opacity-40 blur-[1px]' : 'opacity-100'}`}
                        >
                            {/* Timeline Dot */}
                            <div className={`absolute -left-[39px] top-3 w-3 h-3 rounded-full border border-white dark:border-zinc-950 transition-all duration-300 ${isOpen ? 'bg-black dark:bg-white scale-125 ring-4 ring-black/5 dark:ring-white/5' : 'bg-slate-300 dark:bg-slate-700'}`} />

                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-black/5 dark:border-white/5 pb-4 group-hover:border-black/20 dark:group-hover:border-white/20 transition-colors duration-500">
                                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                                    <h3 className={`text-2xl md:text-3xl font-instrument italic transition-colors duration-300 ${isOpen ? 'text-black dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                                        {role.company}
                                    </h3>
                                    <span className="text-sm font-inter text-slate-500 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                                        {role.role}
                                    </span>
                                </div>
                                <span className="text-xs font-mono tracking-wide text-slate-400 group-hover:text-slate-600 dark:text-slate-600 dark:group-hover:text-slate-400 transition-colors uppercase">
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
                                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
        </motion.section>
    );
};

export default Experience;