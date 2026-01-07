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

    return (
        <main className="min-h-screen dark:bg-[#09090b] pt-24 pb-20">
            <Helmet>
                <title>All Projects — Tushar Negi</title>
                <meta name="description" content="A curated archive of my creative journey—spanning shipping web applications, open source experiments, and digital craftsmanship." />
            </Helmet>
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="mb-16 md:mb-24 space-y-8">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors mb-8"
                    >
                        <ArrowLeft size={20} />
                        Back to Home
                    </Link>

                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-serif italic text-zinc-900 dark:text-white mb-6 tracking-tight"
                        >
                            All Projects
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed"
                        >
                            A curated archive of my creative journey—spanning shipping web applications, open source experiments, and digital craftsmanship.
                        </motion.p>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-y-24">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>

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