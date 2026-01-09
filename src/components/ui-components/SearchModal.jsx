import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from "motion/react";
import { Search, X, Github, Linkedin, Briefcase, FileText, User, Twitter, LayoutGrid, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { socialLinks } from '../../data/portfolioData';

const SearchModal = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const listRef = useRef(null);

    // Track mouse coordinates to detect REAL mouse movement vs scroll movement
    const lastMousePos = useRef({ x: 0, y: 0 });
    // Track source of navigation to manage scrollIntoView behavior
    const scrollSource = useRef('keyboard');

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setActiveIndex(0);
            scrollSource.current = 'keyboard';
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        onClose();
    };

    // Define searchable items (Theme options removed)
    const allItems = useMemo(() => {
        const navigationItems = [
            { id: 'nav-home', title: 'Go to Home', path: '/', icon: LayoutGrid, type: 'link', section: 'Navigation', shortcut: 'Shift+H', key: 'H' },
            { id: 'nav-projects', title: 'Go to Projects', path: '/projects', icon: Briefcase, type: 'link', section: 'Navigation', shortcut: 'Shift+P', key: 'P' },
            { id: 'nav-writing', title: 'Go to Writing', path: '/blog', icon: FileText, type: 'link', section: 'Navigation', shortcut: 'Shift+W', key: 'W' },
        ];

        const linkItems = [
            { id: 'social-twitter', title: 'X Profile', path: socialLinks.twitter, icon: Twitter, type: 'external', section: 'Links', shortcut: 'Shift+X', key: 'X' },
            { id: 'social-linkedin', title: 'LinkedIn Profile', path: socialLinks.linkedin, icon: Linkedin, type: 'external', section: 'Links', shortcut: 'Shift+L', key: 'L' },
            { id: 'social-github', title: 'GitHub Profile', path: socialLinks.github, icon: Github, type: 'external', section: 'Links', shortcut: 'Shift+G', key: 'G' },
            { id: 'social-email', title: 'Email', path: socialLinks.email, icon: User, type: 'external', section: 'Links', shortcut: 'Shift+E', key: 'E' },
        ];

        const generalItems = [
            { id: 'action-copy', title: 'Copy Link', action: handleCopyLink, icon: Copy, type: 'action', section: 'General', shortcut: 'Shift+C', key: 'C' },
        ];

        return [...navigationItems, ...linkItems, ...generalItems];
    }, []);

    // Filter items
    const filteredItems = useMemo(() => {
        if (!query) return allItems;
        return allItems.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
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

    const handleSelect = (item) => {
        if (item.type === 'link') {
            navigate(item.path);
            onClose();
        } else if (item.type === 'external') {
            window.open(item.path, '_blank');
            onClose();
        } else if (item.type === 'action') {
            item.action();
        }
    };

    // Keyboard Navigation & Shortcuts
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            // Navigation
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                scrollSource.current = 'keyboard';
                setActiveIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : prev));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                scrollSource.current = 'keyboard';
                setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const selectedItem = filteredItems[activeIndex];
                if (selectedItem) handleSelect(selectedItem);
            } else if (e.key === 'Escape') {
                onClose();
            }
            // Shortcuts (Shift + Key)
            else if (e.shiftKey) {
                const key = e.key.toUpperCase();
                const matchedItem = allItems.find(item => item.key === key);

                if (matchedItem) {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSelect(matchedItem);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, activeIndex, filteredItems, onClose, allItems]);

    // Intelligent Scroll Effect (Only runs on Keyboard interaction)
    useEffect(() => {
        if (listRef.current && scrollSource.current === 'keyboard') {
            const activeElement = listRef.current.querySelector(`[data-index="${activeIndex}"]`);
            if (activeElement) {
                activeElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
        }
    }, [activeIndex]);

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
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        onClick={onClose}
                    />

                    {/* Modal Container */}
                    <div
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) onClose();
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="w-full max-w-2xl bg-[#09090b] text-zinc-100 rounded-xl shadow-2xl border border-zinc-800 overflow-hidden flex flex-col max-h-[70vh] font-inter pointer-events-auto"
                        >
                            {/* Header Section */}
                            <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-800/50 shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-zinc-800/50 rounded-lg">
                                        <LayoutGrid className="w-5 h-5 text-zinc-400" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-sm font-semibold text-zinc-100 leading-tight">Home</h2>
                                        <span className="text-xs text-zinc-500 font-medium">About me and what I'm up to</span>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-1 rounded hover:bg-zinc-800 text-zinc-500 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Search Input */}
                            <div className="flex items-center px-4 py-3 border-b border-zinc-800/50 shrink-0">
                                <Search className="w-4 h-4 text-zinc-500 mr-3" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search for actions..."
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        setActiveIndex(0);
                                        scrollSource.current = 'keyboard';
                                    }}
                                    className="flex-1 bg-transparent border-none outline-none text-zinc-200 placeholder:text-zinc-500 text-[14px]"
                                />
                            </div>

                            {/* List using filteredItems */}
                            <div
                                ref={listRef}
                                className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-2 overscroll-contain"
                            >
                                {filteredItems.length === 0 ? (
                                    <div className="p-12 text-center text-zinc-500 text-sm">
                                        No results found for "<span className="text-zinc-100">{query}</span>"
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        {Object.entries(groupedItems).map(([section, items]) => (
                                            <div key={section} className="mb-2">
                                                <div className="px-3 py-2 text-[11px] font-medium text-zinc-500 text-left">
                                                    {section}
                                                </div>
                                                <div className="space-y-0.5">
                                                    {items.map((item) => {
                                                        const globalIndex = filteredItems.indexOf(item);
                                                        const isActive = globalIndex === activeIndex;

                                                        return (
                                                            <div
                                                                key={item.id}
                                                                data-index={globalIndex}
                                                                onClick={() => handleSelect(item)}
                                                                // Use onMouseMove + Coordinate Check instead of onMouseEnter
                                                                onMouseMove={(e) => {
                                                                    // Only update if the mouse ACTUALLY moved.
                                                                    // Scrolling with wheel keeps e.clientX/Y same, so this won't trigger.
                                                                    if (e.clientX !== lastMousePos.current.x || e.clientY !== lastMousePos.current.y) {
                                                                        lastMousePos.current = { x: e.clientX, y: e.clientY };
                                                                        scrollSource.current = 'mouse';
                                                                        if (!isActive) setActiveIndex(globalIndex);
                                                                    }
                                                                }}
                                                                className={`flex items-center justify-between px-3 py-2.5 mx-1 rounded-md cursor-pointer transition-colors ${isActive
                                                                    ? 'bg-zinc-800/80 text-zinc-100'
                                                                    : 'text-zinc-400 hover:bg-zinc-900/50'
                                                                    } `}
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <item.icon size={16} strokeWidth={2} className={`${isActive ? 'text-zinc-100' : 'text-zinc-500'}`} />
                                                                    <span className="text-[13px] font-medium">{item.title}</span>
                                                                </div>
                                                                {item.shortcut && (
                                                                    <div className="flex items-center gap-1">
                                                                        {item.shortcut.split(" + ").map((key, i) => (
                                                                            <React.Fragment key={i}>
                                                                                <kbd className="font-sans px-1.5 py-0.5 rounded-[4px] bg-zinc-800 border border-zinc-700/50 text-[10px] font-medium text-zinc-400 min-w-[20px] text-center inline-flex items-center justify-center">
                                                                                    {key}
                                                                                </kbd>
                                                                                {i < item.shortcut.split(" + ").length - 1 && <span className="text-[10px] text-zinc-600">+</span>}
                                                                            </React.Fragment>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                <div className="my-2 h-px bg-zinc-800/50 mx-3" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default SearchModal;