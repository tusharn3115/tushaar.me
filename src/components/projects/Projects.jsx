import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { projects } from '../../data/portfolioData';
import { ShimmeringText } from '../ui/ShimmeringText';

const Projects = () => {
    // Show only first 4 projects for the main section
    const featuredProjects = projects.slice(0, 4);

    return (
        <section className=" dark:bg-[#09090b] relative overflow-hidden">

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-16 md:mb-20 border-b border-black/5 dark:border-white/5 pb-8 flex justify-between items-end"
                >
                    <div className="space-y-1">
                        <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-gray-400 block">
                            Portfolio v2.0
                        </span>
                        <h2 className="text-4xl md:text-5xl font-instrument italic font-normal text-gray-900 dark:text-white tracking-tight">
                            Selected <span className="font-inter not-italic font-light text-gray-500 dark:text-gray-400 text-3xl md:text-4xl">Projects</span>
                        </h2>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 hidden md:block">
                        Featured / 03
                    </span>
                </motion.div>

            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-12 md:gap-y-16">
                {featuredProjects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>

            {/* "Cooking more projects" Faded Text */}
            <div className="text-center relative pointer-events-none select-none overflow-hidden pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <ShimmeringText
                        text="Cooking More..."
                        className="text-[10vw] md:text-[3vw] font-bold leading-tight pb-4 tracking-tighter"
                    />
                </motion.div>
                <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-zinc-50/50 dark:from-[#09090b] to-transparent" />
            </div>
        </section>
    );
};

export default Projects;