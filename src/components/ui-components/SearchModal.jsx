import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ArrowRight, Github, Instagram, Twitter, Linkedin, Home, FileText, Layers, Briefcase, User, Code, Command, CornerDownLeft, ArrowUp, ArrowDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Import Data
import { componentsList } from '../../data/componentData';
import { roles, projects, socialLinks } from '../../data/portfolioData';

const SearchModal = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const listRef = useRef(null);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setActiveIndex(0);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Define searchable items with categories
    const allItems = useMemo(() => {
        const menuItems = [
            { id: 'home', title: 'Portfolio', path: '/', icon: Home, type: 'link', section: 'Menu' },
            { id: 'components', title: 'Components', path: '/component', icon: Layers, type: 'link', section: 'Menu' },
            { id: 'blog', title: 'Blog', path: '/blog', icon: FileText, type: 'link', section: 'Menu' },
        ];

        const portfolioItems = [
            { id: 'about', title: 'About', path: '/#about', icon: User, type: 'link', section: 'Portfolio' },
            { id: 'tech-stack', title: 'Tech Stack', path: '/#tech-stack', icon: Code, type: 'link', section: 'Portfolio' },
            { id: 'experience', title: 'Experience', path: '/#experience', icon: Briefcase, type: 'link', section: 'Portfolio' },
        ];

        const componentItems = componentsList.map(comp => ({
            id: `comp-${comp.id}`,
            title: comp.title,
            path: '/component',
            state: { selectedId: comp.id },
            icon: Layers,
            type: 'component',
            section: 'Components'
        }));

        const projectItems = projects.map(proj => ({
            id: `proj-${proj.title}`,
            title: proj.title,
            path: '/projects',
            icon: Briefcase,
            type: 'link',
            section: 'Projects'
        }));

        const socialItems = [
            { id: 'social-github', title: 'GitHub', path: socialLinks.github, icon: Github, type: 'external', section: 'Socials' },
            { id: 'social-linkedin', title: 'LinkedIn', path: socialLinks.linkedin, icon: Linkedin, type: 'external', section: 'Socials' },
            { id: 'social-twitter', title: 'Twitter', path: socialLinks.twitter, icon: Twitter, type: 'external', section: 'Socials' },
            { id: 'social-instagram', title: 'Instagram', path: socialLinks.instagram, icon: Instagram, type: 'external', section: 'Socials' },
            { id: 'social-email', title: 'Email', path: socialLinks.email, icon: User, type: 'external', section: 'Socials' },
        ];

        const experienceItems = roles.map(role => ({
            id: `exp-${role.company}`,
            title: role.company,
            subtitle: role.role,
            path: '/#experience',
            icon: Briefcase,
            type: 'link',
            section: 'Experience'
        }));

        return [...menuItems, ...portfolioItems, ...componentItems, ...projectItems, ...socialItems, ...experienceItems];
    }, []);

    // Filter items
    const filteredItems = useMemo(() => {
        if (!query) return allItems;
        return allItems.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase()))
        );
    }, [query, allItems]);

    // Group items for display
    const groupedItems = useMemo(() => {
        return filteredItems.reduce((acc, item) => {
            if (!acc[item.section]) acc[item.section] = [];
            acc[item.section].push(item);
            return acc;
        }, {});
    }, [filteredItems]);

    // Keyboard Navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : prev));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const selectedItem = filteredItems[activeIndex];
                if (selectedItem) handleSelect(selectedItem);
            } else if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, activeIndex, filteredItems, onClose]);

    // Scroll active item into view
    useEffect(() => {
        if (listRef.current) {
            const activeElement = listRef.current.querySelector(`[data-index="${activeIndex}"]`);
            if (activeElement) {
                activeElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
        }
    }, [activeIndex]);

    const handleSelect = (item) => {
        if (item.type === 'link') {
            navigate(item.path);
        } else if (item.type === 'component') {
            // Logic to switch component if on component page
            navigate(item.path, { state: item.state });
        } else if (item.type === 'external') {
            window.open(item.path, '_blank');
        }
        onClose();
    };

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                        onClick={onClose}
                    />

                    {/* Modal Container - Centered */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="w-full max-w-2xl bg-white dark:bg-[#111111] rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden pointer-events-auto flex flex-col max-h-[70vh]"
                        >
                            {/* Header */}
                            <div className="flex items-center px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
                                <Search className="w-5 h-5 text-zinc-400 mr-3" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Type a command or search..."
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        setActiveIndex(0);
                                    }}
                                    className="flex-1 bg-transparent border-none outline-none text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 text-base"
                                />
                                <button
                                    onClick={onClose}
                                    className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* List */}
                            <div ref={listRef} className="flex-1 overflow-y-auto custom-scrollbar p-2">
                                {filteredItems.length === 0 ? (
                                    <div className="p-12 text-center text-zinc-500 text-sm">
                                        No results found for "<span className="text-zinc-900 dark:text-zinc-100">{query}</span>"
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        {Object.entries(groupedItems).map(([section, items]) => (
                                            <div key={section} className="mb-2">
                                                <div className="px-3 py-2 text-xs font-medium text-zinc-400 uppercase tracking-wider sticky top-0 bg-white dark:bg-[#111111] z-10">
                                                    {section}
                                                </div>
                                                <div className="space-y-0.5">
                                                    {items.map((item) => {
                                                        // Find global index for navigation
                                                        const globalIndex = filteredItems.indexOf(item);
                                                        const isActive = globalIndex === activeIndex;

                                                        return (
                                                            <div
                                                                key={item.id}
                                                                data-index={globalIndex}
                                                                onClick={() => handleSelect(item)}
                                                                onMouseEnter={() => setActiveIndex(globalIndex)}
                                                                className={`flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer transition-colors ${isActive
                                                                    ? 'bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-zinc-100'
                                                                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5'
                                                                    } `}
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <div className={`w-5 h-5 flex items-center justify-center ${isActive ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400'} `}>
                                                                        <item.icon size={18} strokeWidth={2} />
                                                                    </div>
                                                                    <div className="flex flex-col">
                                                                        <span className="text-sm font-medium">{item.title}</span>
                                                                        {item.subtitle && (
                                                                            <span className="text-xs text-zinc-400">{item.subtitle}</span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                {isActive && (
                                                                    <CornerDownLeft className="w-4 h-4 text-zinc-400" />
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <LogoIcon />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1">
                                        <kbd className="font-sans px-1 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 min-w-[20px] text-center text-zinc-600 dark:text-zinc-400">↵</kbd>
                                        to select
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="font-sans px-1 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 min-w-[20px] text-center text-zinc-600 dark:text-zinc-400">Esc</kbd>
                                        to close
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

// Mini Logo for Footer
const LogoIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-zinc-400">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default SearchModal;
