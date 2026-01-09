import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Github, Globe, Home, LayoutGrid } from 'lucide-react';
import { projects } from '../data/portfolioData';
import Tooltip from '../components/ui/Tooltip';
import Footer from '../components/layout/Footer/Footer';

const ProjectPage = () => {
    const { id } = useParams();

    // Find Project
    const projectIndex = projects.findIndex(p => p.id === id);
    const project = projects[projectIndex];
    const nextProject = projects[(projectIndex + 1) % projects.length];
    const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        },
        exit: { opacity: 0 }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
    };

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Project not found</h1>
                    <Link to="/" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 underline decoration-zinc-300 underline-offset-4">Return Home</Link>
                </div>
            </div>
        );
    }

    return (
        <article className="min-h-screen pt-24 pb-32">
            <Helmet>
                <title>{project.title} | Tushar Negi</title>
                <meta name="description" content={project.longDescription ? project.longDescription.substring(0, 160) : project.description} />
            </Helmet>
            <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={containerVariants}
            >
                <div className="max-w-4xl mx-auto px-6 space-y-12">

                    {/* Top Nav Pill */}
                    <motion.div variants={itemVariants} className="flex items-center gap-3">
                        <Tooltip content="Home" underline={false}>
                            <Link
                                to="/"
                                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                            >
                                <Home size={18} />
                            </Link>
                        </Tooltip>
                        <Tooltip content="All Projects" underline={false}>
                            <Link
                                to="/projects"
                                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                            >
                                <LayoutGrid size={18} />
                            </Link>
                        </Tooltip>
                    </motion.div>

                    {/* Header Section */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                            <div className="space-y-4 max-w-2xl">
                                <h1 className="text-4xl md:text-6xl font-serif italic text-zinc-900 dark:text-zinc-50 leading-tight">
                                    {project.title}
                                </h1>
                                <p className="text-xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {project.stack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/50"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 shrink-0">
                                {project.live && (
                                    <Tooltip content="View Live Site" underline={false}>
                                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-500 transition-all bg-transparent group">
                                            <Globe size={20} className="group-hover:scale-110 transition-transform" />
                                        </a>
                                    </Tooltip>
                                )}
                                {project.github && (
                                    <Tooltip content="View Source Code" underline={false}>
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-500 transition-all bg-transparent group">
                                            <Github size={20} className="group-hover:scale-110 transition-transform" />
                                        </a>
                                    </Tooltip>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Hero Image - Premium Gradient Style */}
                    <motion.div
                        variants={itemVariants}
                        className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)] ring-1 ring-zinc-900/5 dark:ring-white/10"
                    >
                        {/* Gradient Background */}
                        <div className={`absolute inset-0 bg-linear-to-br ${project.gradient} opacity-90`} />

                        {/* Floating Browser Window */}
                        <div className="absolute inset-0 flex items-center justify-center p-6 md:p-16 lg:p-20">
                            <div className="w-full h-full bg-white dark:bg-[#0c0c0c] rounded-xl shadow-[0_30px_90px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden transform transition-transform hover:scale-[1.01] duration-500">
                                {/* Browser Toolbar */}
                                <div className="h-8 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 flex items-center px-4 gap-2 shrink-0">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                                    </div>
                                    <div className="ml-4 w-1/3 h-4 rounded-sm bg-zinc-100 dark:bg-zinc-800 opacity-50" />
                                </div>

                                {/* Content Placeholder */}
                                <div className="flex-1 overflow-hidden relative bg-white dark:bg-zinc-950 flex flex-col items-center justify-center">
                                    {project.img ? (
                                        <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-center opacity-50 p-6">
                                            <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 mb-4" />
                                            <div className="w-32 h-4 bg-zinc-100 dark:bg-zinc-800 rounded-full mb-3" />
                                            <div className="w-24 h-4 bg-zinc-100 dark:bg-zinc-800 rounded-full opacity-60" />
                                            <div className="mt-8 px-6 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-md text-sm text-zinc-400">
                                                Project Preview
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Main Text Content */}
                    <motion.div
                        variants={itemVariants}
                        className="prose prose-zinc dark:prose-invert prose-lg max-w-3xl mx-auto text-zinc-600 dark:text-zinc-400 leading-8"
                    >
                        <p className="first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-zinc-900 dark:first-letter:text-zinc-100">
                            {project.longDescription}
                        </p>

                        <p>
                            Provides intelligent study plan generation and dynamic resource curation. Built with modern web technologies offering an intuitive interface. Seamless interaction with AI-powered educational tools makes learning more efficient and engaging.
                        </p>
                    </motion.div>

                    {/* Footer Navigation */}
                    <div className="pt-12 border-t border-zinc-200 dark:border-zinc-800 mt-16">
                        <div className="flex justify-between items-center">
                            <Link to={`/project/${prevProject.id}`} className="group block text-left">
                                <span className="text-sm text-zinc-500 dark:text-zinc-400 mb-1 block">Previous</span>
                                <div className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white group-hover:underline">
                                    {prevProject.title}
                                </div>
                            </Link>

                            <Link to={`/project/${nextProject.id}`} className="group block text-right">
                                <span className="text-sm text-zinc-500 dark:text-zinc-400 mb-1 block">Next</span>
                                <div className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white group-hover:underline">
                                    {nextProject.title}
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="pt-10">
                        <Footer />
                    </div>

                </div>
            </motion.div >
        </article>
    );
};

export default ProjectPage;
