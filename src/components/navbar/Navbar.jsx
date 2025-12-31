import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Github, Instagram, Twitter, Linkedin } from 'lucide-react';
import Logo from '../ui/Logo';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    // Calligraphy Path Data for "TN"
    const pathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 0.5
            }
        }
    };

    const navLinks = [
        { name: 'Blog', href: '/blog' },
        { name: 'Projects', href: '/' }, // Redirect to home for now
        { name: 'Components', href: '/component' },
    ];

    const iconLinks = [
        { icon: Instagram, href: '#' },
        { icon: Twitter, href: '#' },
        { icon: Linkedin, href: '#' },
        { icon: Github, href: 'https://github.com/tusharn3115' },
    ];

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 w-full pointer-events-none"
        >
            {/* Left: Animated Calligraphy "TN" Logo */}
            <div className="pointer-events-auto px-4 py-2 rounded-full transition-colors duration-300">
                <Link to="/" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
                    <Logo />
                </Link>
            </div>

            {/* Right: Navigation Links & Icons */}
            <div className="pointer-events-auto px-6 py-3 rounded-full transition-colors duration-300 flex items-center gap-8">
                {/* Text Links */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all duration-300"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Divider */}
                <div className="hidden md:block h-4 w-[1px] bg-zinc-300 dark:bg-zinc-700 mx-2"></div>

                {/* Icon Links */}
                <div className="flex items-center gap-5">
                    {iconLinks.map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors transform hover:scale-110 active:scale-95 duration-200"
                        >
                            <item.icon size={18} strokeWidth={1.5} />
                        </a>
                    ))}

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white cursor-pointer"
                    >
                        {theme === 'dark' ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        )}
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
