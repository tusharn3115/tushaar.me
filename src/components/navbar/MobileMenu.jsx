import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import Logo from '../ui/Logo';

const MobileMenu = ({ isOpen, onClose, navLinks, iconLinks, theme, toggleTheme }) => {

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, [isOpen]);

    const backdropVariants = {
        closed: { opacity: 0 },
        open: { opacity: 1, transition: { duration: 0.3 } }
    };

    const menuVariants = {
        closed: { y: "-100%", transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] } },
        open: { y: "0%", transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
    };

    const itemVariants = {
        closed: { opacity: 0, y: 10 },
        open: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.1 } }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={backdropVariants}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
                    />

                    {/* Menu Panel (Top Sheet) */}
                    <motion.div
                        drag="y"
                        dragConstraints={{ top: -300, bottom: 0 }} // Allow dragging up
                        dragElastic={{ top: 0.7, bottom: 0 }} // Prevent dragging down
                        onDragEnd={(_, { offset, velocity }) => {
                            // Close if dragged up significantly or flicked up
                            if (offset.y < -75 || velocity.y < -500) {
                                onClose();
                            }
                        }}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#0c0c0e] rounded-b-[2rem] shadow-2xl md:hidden overflow-hidden border-b border-black/5 dark:border-white/5"
                    >
                        {/* Header: Logo Left, Controls Right */}
                        <div className="flex items-center justify-between px-6 pt-5 pb-3">
                            <div className="flex items-center gap-3">
                                <Logo className="w-6 h-6" />
                                <span className="font-instrument italic text-lg font-medium">Portfolio</span>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="p-2 -mr-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="px-8 pb-8 pt-2 flex flex-col gap-8">

                            {/* Links */}
                            <div className="flex flex-col gap-6">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.name}
                                        variants={itemVariants}
                                        custom={i}
                                    >
                                        <Link
                                            to={link.href}
                                            onClick={onClose}
                                            className="group flex items-center justify-between"
                                        >
                                            <span className="text-4xl font-instrument italic text-zinc-800 dark:text-zinc-100 font-medium tracking-tight group-active:scale-95 transition-transform">
                                                {link.name}
                                            </span>
                                            <ArrowUpRight
                                                size={20}
                                                className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-zinc-400"
                                            />
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Divider line */}
                            <div className="h-px w-full bg-black/5 dark:bg-white/5" />

                            {/* Socials */}
                            <motion.div
                                variants={itemVariants}
                                className="w-full flex items-center justify-center gap-6"
                            >
                                {iconLinks.map((link, idx) => {
                                    const Icon = link.Icon;
                                    return (
                                        <a
                                            key={idx}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100 transition-colors transform hover:scale-110 active:scale-95 duration-200"
                                        >
                                            <Icon size={24} strokeWidth={1.5} />
                                        </a>
                                    );
                                })}
                            </motion.div>
                        </div>

                        {/* Drag Handle Visual */}
                        <div className="w-full h-6 flex items-center justify-center pb-2 cursor-grab active:cursor-grabbing hover:bg-black/5 dark:hover:bg-white/5 transition-colors absolute bottom-0 left-0 right-0">
                            <div className="w-16 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700/50" />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
