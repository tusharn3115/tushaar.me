import React from 'react';
import { motion } from 'motion/react';
import { ChefHat, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogList = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-[#09090b] [background:radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] dark:[background:radial-gradient(#1f1f23_1px,transparent_1px)] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-xl mx-auto text-center space-y-8"
            >
                {/* Icon Container */}
                <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
                    <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10 w-20 h-20 bg-zinc-100 dark:bg-zinc-800/60 rounded-3xl flex items-center justify-center shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-700/50 backdrop-blur-sm"
                    >
                        <ChefHat size={36} strokeWidth={1.5} className="text-zinc-900 dark:text-zinc-100" />
                    </motion.div>

                    {/* Decorative Elements */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 bg-zinc-200/50 dark:bg-zinc-700/30 blur-2xl rounded-full"
                    />
                </div>

                {/* Text Content */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-instrument italic font-normal tracking-tight text-zinc-900 dark:text-white">
                        Cooking in Progress
                    </h1>

                    <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[460px] mx-auto">
                        I'm currently in the kitchen, apron on, furiously cooking up some spicy blog posts for you.
                    </p>

                    <div className="inline-block px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 text-amber-700 dark:text-amber-400 text-sm font-medium font-mono">
                        Status: Simmering until perfection
                    </div>
                </div>

                {/* Action */}
                <div className="pt-4">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium text-sm hover:opacity-90 transition-opacity"
                    >
                        <ArrowLeft size={16} />
                        Return to Portfolio
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default BlogList;
