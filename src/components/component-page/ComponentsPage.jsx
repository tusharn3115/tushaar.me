
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { componentsImages } from '../../data/portfolioData';
import { useTheme } from '../../context/ThemeContext';
import Logo from '../ui/Logo';
import {
    PanelLeftClose,
    PanelLeftOpen,
    Command,
    Sun,
    Moon,
    Maximize,
    Code,
    Heart,
    Home
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ComponentsPage = () => {
    const [selectedId, setSelectedId] = useState(0);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const { theme, toggleTheme } = useTheme();

    const selectedItem = componentsImages[selectedId];

    // Mock categories
    const sections = [
        { title: 'SECTIONS', items: ['Spotlight Gallery', 'Sticky Scroll', 'Hero Section'] },
        { title: 'CARDS', items: ['Border Frame', 'Mango Cards', 'Media Player'] },
        { title: 'BACKGROUNDS', items: ['Raycast Background', 'Aurora Bars'] },
    ];

    return (
        <div className="flex h-screen bg-white dark:bg-[#09090b] text-gray-900 dark:text-white overflow-hidden font-inter selection:bg-pink-500/30 transition-colors duration-500">

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 280 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} // Bezier for smooth "Apple-like" slide
                className="h-full border-r border-gray-200 dark:border-[#27272a] bg-gray-50/50 dark:bg-[#09090b] flex flex-col flex-shrink-0 overflow-hidden relative z-20"
            >
                <div className="w-[280px] h-full flex flex-col"> {/* Fixed width container to prevent text reflow during collapse */}

                    {/* Header */}
                    <div className="p-4 h-16 flex items-center justify-between border-b border-gray-200 dark:border-[#27272a] flex-shrink-0">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 flex items-center justify-center text-black dark:text-white transition-transform group-hover:scale-90">
                                <Logo />
                            </div>
                            <span className="font-medium tracking-tight text-sm">Portfolio</span>
                        </Link>
                        {/* Tiny keyboard shortcut hint */}
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="p-1.5 rounded-md text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#27272a] transition-all"
                        >
                            <PanelLeftClose size={18} />
                        </button>
                    </div>

                    {/* Scrollable List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
                        {/* Library */}
                        <div>
                            <h3 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-widest mb-3 uppercase pl-3">
                                Library
                            </h3>
                            <div className="space-y-0.5">
                                {componentsImages.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedId(index)}
                                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 border-l-2 ${selectedId === index
                                            ? 'bg-gray-100 dark:bg-[#27272a] text-black dark:text-white border-pink-500 font-medium shadow-sm'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#27272a]/50 border-transparent'
                                            }`}
                                    >
                                        {item.title}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mock Sections */}
                        {sections.map((section, idx) => (
                            <div key={idx}>
                                <h3 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-widest mb-3 uppercase pl-3">
                                    {section.title}
                                </h3>
                                <div className="space-y-0.5 opacity-40 pointer-events-none">
                                    {section.items.map((item, i) => (
                                        <div
                                            key={i}
                                            className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-500 dark:text-gray-400 flex items-center justify-between"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.aside>


            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#09090b] relative z-10">

                {/* Top Toolbar */}
                <header className="h-16 border-b border-gray-200 dark:border-[#27272a] flex items-center justify-between px-6 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-sm flex-shrink-0 z-10">
                    <div className="flex items-center gap-4">
                        {!isSidebarOpen && (
                            <>
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="p-2 -ml-2 rounded-md text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#27272a] transition-all"
                                    title="Open Sidebar"
                                >
                                    <PanelLeftOpen size={18} />
                                </button>
                                <div className="h-4 w-[1px] bg-gray-200 dark:bg-[#27272a]" />
                            </>
                        )}

                        <h1 className="text-sm font-medium text-gray-900 dark:text-white">
                            {selectedItem?.title}
                        </h1>
                    </div>

                    <div className="flex items-center gap-2">
                        <TooltipButton icon={<Heart size={16} />} />
                        <TooltipButton icon={<Command size={16} />} />
                        <TooltipButton icon={<Code size={16} />} />

                        <div className="h-4 w-[1px] bg-gray-200 dark:bg-[#27272a] mx-1" />

                        <button
                            onClick={toggleTheme}
                            className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 dark:border-[#27272a] text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#27272a] transition-all"
                        >
                            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                        </button>

                        <TooltipButton icon={<Maximize size={16} />} />
                    </div>
                </header>

                {/* Preview Area */}
                <div className="flex-1 p-4 md:p-6 overflow-hidden flex flex-col bg-gray-50/50 dark:bg-black">
                    {/* The "Shell" container */}
                    <div className="flex-1 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-[#27272a] overflow-hidden flex items-center justify-center relative shadow-sm dark:shadow-2xl transition-all duration-500">

                        {/* Dot Grid Background */}
                        <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.2]"
                            style={{ backgroundImage: `radial-gradient(${theme === 'dark' ? '#333' : '#000'} 1px, transparent 1px)`, backgroundSize: '24px 24px' }}
                        />

                        {/* Optional pink glow */}
                        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-pink-500/5 to-transparent opacity-0 dark:opacity-50 pointer-events-none" />

                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={selectedId}
                                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 1.02, y: -10 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="relative z-10 max-w-4xl max-h-[85%] w-full flex items-center justify-center p-8"
                            >
                                {selectedItem?.src.endsWith('.mp4') ? (
                                    <video
                                        src={selectedItem.src}
                                        autoPlay loop muted playsInline
                                        className="max-w-full max-h-[70vh] object-contain rounded-md shadow-2xl border border-gray-900/5 dark:border-white/5"
                                    />
                                ) : (
                                    <img
                                        src={selectedItem?.src}
                                        alt={selectedItem?.title}
                                        className="max-w-full max-h-[70vh] object-contain rounded-md shadow-2xl border border-gray-900/5 dark:border-white/5"
                                    />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-3 flex justify-between items-center px-1 text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                        <span>Preview Mode</span>
                        <span>{selectedId + 1} / {componentsImages.length}</span>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Helper for icon buttons
const TooltipButton = ({ icon }) => (
    <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 dark:border-[#27272a] text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#27272a] transition-all">
        {icon}
    </button>
);

export default ComponentsPage;
