import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { roles } from '../../data/portfolioData';

const Experience = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="max-w-3xl mx-auto py-12">
            <SectionHeading>Experience</SectionHeading>

            <div className="relative flex flex-col gap-2">
                {/* Visual Timeline Line */}
                <div className="absolute left-[29px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-gray-100 via-gray-200 to-gray-100 hidden sm:block" />

                {roles.map((role, index) => {
                    const isOpen = activeIndex === index;

                    return (
                        <div
                            key={index}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                            className={`group relative w-full cursor-pointer rounded-2xl transition-colors duration-200 border ${isOpen ? 'bg-slate-50/80 border-slate-200' : 'bg-transparent border-transparent hover:bg-slate-50/50'
                                }`}
                        >
                            <div className="flex items-start gap-6 p-4">

                                {/* Left: Logo */}
                                <div className="relative flex-shrink-0 z-10">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-all duration-200 shadow-sm border ${isOpen ? 'bg-white border-slate-200 text-slate-900 scale-105 shadow-md' : 'bg-white border-gray-100 text-slate-400'
                                        }`}>
                                        {role.logo}
                                    </div>
                                    {/* Current Role Indicator */}
                                    {role.isCurrent && (
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
                                    )}
                                </div>

                                {/* Right: Content */}
                                <div className="flex-grow pt-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <h3 className={`text-lg font-bold tracking-tight transition-colors duration-200 ${isOpen ? 'text-slate-900' : 'text-slate-700'}`}>
                                                    {role.company}
                                                </h3>
                                                <ArrowUpRight
                                                    size={14}
                                                    className={`transition-all duration-200 ${isOpen ? 'opacity-100 translate-x-0 text-slate-400' : 'opacity-0 -translate-x-2'}`}
                                                />
                                            </div>
                                            <p className="text-sm text-slate-500 font-medium italic font-serif mt-0.5">
                                                {role.role}
                                            </p>
                                        </div>

                                        <div className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200 ${isOpen ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-transparent border-transparent text-slate-400'
                                            }`}>
                                            {role.date}
                                        </div>
                                    </div>

                                    {/* Accordion Body */}
                                    <motion.div
                                        initial={false}
                                        animate={isOpen ? { height: "auto", opacity: 1, marginTop: 12 } : { height: 0, opacity: 0, marginTop: 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="relative pl-4 border-l-2 border-slate-200">
                                            <p className="text-sm text-slate-600 leading-relaxed font-light">
                                                {role.description}
                                            </p>

                                            {role.skills && (
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {role.skills.split('•').map((skill, i) => (
                                                        <span
                                                            key={i}
                                                            className="text-[10px] px-2.5 py-1 bg-white border border-slate-100 rounded-md text-slate-600 font-medium shadow-sm tracking-wide"
                                                        >
                                                            {skill.trim()}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
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

export default Experience;