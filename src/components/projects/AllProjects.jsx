import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { projects } from '../../data/portfolioData';
import { ShimmeringText } from '../ui/ShimmeringText';

import { Helmet } from 'react-helmet-async';

const AllProjects = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <main className="min-h-screen dark:bg-[#09090b] pt-32 pb-24">
            <Helmet>
                <title>All Projects — Tushar Negi</title>
                <meta name="description" content="A curated archive of my creative journey—spanning shipping web applications, open source experiments, and digital craftsmanship." />
            </Helmet>
            <div className="max-w-6xl mx-auto px-6">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-24 border-b border-black/5 dark:border-white/5 pb-10">
                    <div className="space-y-4 max-w-2xl">
                        <Link
                            to="/"
                            className="group inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors text-sm font-medium mb-4"
                        >
                            <span className="p-1 rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                                <ArrowLeft size={14} />
                            </span>
                            Back to Home
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500 block mb-2">
                                Portfolio Archive
                            </span>
                            <h1 className="text-5xl md:text-7xl font-instrument italic font-normal text-zinc-900 dark:text-white tracking-tight leading-[1.1]">
                                All <span className="font-inter not-italic font-bold text-zinc-300 dark:text-zinc-600">Projects</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.7 }}
                            className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light"
                        >
                            A curated collection of shipping web applications, experiments, and digital craftsmanship.
                        </motion.p>
                    </div>

                    {/* Metadata / Counter */}
                    <div className="hidden md:block text-right">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.7 }}
                        >
                            <span className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-2">
                                Total Works
                            </span>
                            <span className="text-6xl font-instrument italic text-zinc-200 dark:text-zinc-800">
                                {projects.length.toString().padStart(2, '0')}
                            </span>
                        </motion.div>
                    </div>
                </div>

                {/* Projects Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-24"
                >
                    {projects.map((project, index) => (
                        <motion.div key={project.id} variants={itemVariants}>
                            <ProjectCard project={project} index={index} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer Note */}
                <div className="text-center relative pointer-events-none select-none overflow-hidden pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <ShimmeringText
                            text="Cooking More Projects..."
                            className="text-[10vw] md:text-[5vw] font-bold leading-tight pb-4 tracking-tighter"
                        />
                    </motion.div>
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-zinc-50/50 dark:from-[#09090b] to-transparent" />
                </div>
            </div>
        </main>
    );
};

export default AllProjects;