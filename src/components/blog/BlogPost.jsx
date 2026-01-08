
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from '../../data/blogData';
import Footer from '../footer/Footer';

const BlogPost = () => {
    const { id } = useParams();
    const post = blogPosts.find(p => p.id === id);

    if (!post) {
        return (
            <div className="py-20 text-center">
                <h2 className="text-xl text-gray-600">Post not found</h2>
                <Link to="/blog" className="text-amber-600 mt-4 inline-block hover:underline">
                    Back to Blog
                </Link>
            </div>
        );
    }

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, filter: 'blur(16px)' },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            transition: { staggerChildren: 0.2 }
        }
    };

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
        <div>
            <motion.article
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="py-12 md:py-20 max-w-3xl mx-auto px-6 md:px-0"
            >
                <motion.div variants={itemVariants}>
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8 group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Blog
                    </Link>
                </motion.div>

                <motion.header variants={itemVariants} className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-instrument italic font-normal tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex gap-4 text-sm font-mono text-gray-400 border-l-2 border-amber-500/50 pl-4">
                        <span>{post.date}, {post.year}</span>
                        <span>·</span>
                        <span>{post.readTime} read</span>
                    </div>
                </motion.header>

                <motion.div variants={itemVariants} className="prose prose-lg dark:prose-invert prose-gray prose-a:text-amber-600 hover:prose-a:text-amber-500 max-w-none">
                    <p className="lead text-xl text-gray-600 dark:text-gray-300">
                        This is a placeholder for the actual blog content. In a real application,
                        this would likely be rendered from a CMS or Markdown file.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <h3>Continuing the journey</h3>
                    <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                        eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                        in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </motion.div>

                <div className="mt-20 pt-10 border-t border-gray-100 dark:border-gray-800">
                    <Footer />
                </div>
            </motion.article>
        </div>
    );
};

export default BlogPost;
