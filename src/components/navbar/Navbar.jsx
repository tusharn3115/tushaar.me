import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Search } from 'lucide-react';
import Logo from '../ui/Logo';
import SearchModal from '../ui-components/SearchModal';
import { socialLinks } from '../../data/portfolioData';

// Interactive Icons
import InstagramIcon from '../icons/InstagramIcon';
import TwitterXIcon from '../icons/TwitterXIcon';
import GithubIcon from '../icons/GithubIcon';
import LinkedinIcon from '../icons/LinkedinIcon';
import SunIcon from '../icons/SunIcon';
import MoonIcon from '../icons/MoonIcon';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Keyboard shortcut to toggle search
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

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
        { name: 'Projects', href: '/projects' }, // Redirect to all projects
        { name: 'Components', href: '/component' },
    ];

    const iconLinks = [
        { Icon: InstagramIcon, href: socialLinks.instagram },
        { Icon: TwitterXIcon, href: socialLinks.twitter },
        { Icon: LinkedinIcon, href: socialLinks.linkedin },
        { Icon: GithubIcon, href: socialLinks.github },
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
            <div className="pointer-events-auto px-6 py-3 rounded-full transition-colors duration-300 flex items-center gap-2">
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
                            className="text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors transform hover:scale-110 active:scale-95 duration-200 flex items-center justify-center p-1"
                        >
                            <item.Icon size={20} strokeWidth={1.5} />
                        </a>
                    ))}


                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="flex items-center justify-center p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white cursor-pointer"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? (
                            <SunIcon size={20} strokeWidth={2} />
                        ) : (
                            <MoonIcon size={20} strokeWidth={2} />
                        )}
                    </button>

                    {/* Enhanced Search Trigger */}
                    {/* Enhanced Search Trigger (Pill Shape with Shortcut) */}
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="flex items-center gap-2 pl-3 pr-2 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 group cursor-pointer"
                        aria-label="Search"
                    >
                        <Search size={16} strokeWidth={2} className="text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200" />
                        <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                            <span className="hidden sm:inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-[10px] font-medium font-sans rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700">Ctrl</span>
                            <span className="hidden sm:inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-[10px] font-medium font-sans rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700">K</span>
                        </div>
                    </button>
                </div>
            </div>
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </motion.nav>
    );
};

export default Navbar;
