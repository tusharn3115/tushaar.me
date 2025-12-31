
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/blogData';

const BlogList = () => {
    // Group posts by year
    const postsByYear = blogPosts.reduce((acc, post) => {
        if (!acc[post.year]) acc[post.year] = [];
        acc[post.year].push(post);
        return acc;
    }, {});

    // Sort years descending
    const years = Object.keys(postsByYear).sort((a, b) => b - a);

    // Variants for container (Stagger)
    const containerVariants = {
        hidden: { opacity: 0, filter: 'blur(16px)' },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            transition: { staggerChildren: 0.3 }
        }
    };

    // Variants for items (Year sections)
    const itemVariants = {
        hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="py-12 md:py-20 max-w-2xl mx-auto"
        >
            <motion.div variants={itemVariants} className="flex flex-col gap-2 mb-16">
                <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 dark:text-white">
                    Blog
                </h1>
                <div className="flex gap-4 text-sm text-gray-400 font-mono">
                    <span className="text-gray-900 dark:text-white font-medium">Blog</span>
                    <span className="line-through opacity-50">Talks</span>
                    <span className="line-through opacity-50">Podcasts</span>
                    <span className="line-through opacity-50">Streams</span>
                    <span className="line-through opacity-50">Notes</span>
                </div>
            </motion.div>

            <div className="space-y-24">
                {years.map(year => (
                    <motion.div
                        key={year}
                        variants={itemVariants}
                        className="relative"
                    >
                        {/* Year Watermark */}
                        <span className="absolute -top-12 -left-4 md:-left-12 text-[8rem] md:text-[10rem] font-bold text-gray-100 dark:text-white/5 select-none pointer-events-none z-0">
                            {year}
                        </span>

                        <div className="relative z-10 space-y-6 md:pl-8">
                            {postsByYear[year].map(post => (
                                <Link to={`/blog/${post.id}`} key={post.id} className="group block">
                                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                                        <h3 className="text-lg font-normal text-gray-800 dark:text-gray-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                            {post.title}
                                        </h3>

                                        <div className="flex items-center gap-3 text-sm font-mono text-gray-400">
                                            {/* Spacer line for visual separation on mobile */}
                                            <span className="hidden md:inline-block w-8 h-px bg-gray-200 dark:bg-white/10" />

                                            <span>{post.date}</span>
                                            <span>·</span>
                                            <span>{post.readTime}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default BlogList;
