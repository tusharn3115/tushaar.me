import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { componentsList } from '../data/componentData.jsx';
import { useTheme } from '../context/ThemeContext';
import Logo from '../components/ui/Logo';
import CodeBlock from '../components/ui/CodeBlock';
import {
    PanelLeftClose,
    PanelLeftOpen,
    ChevronRight,
    Search
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import SunIcon from '../components/icons/SunIcon';
import MoonIcon from '../components/icons/MoonIcon';
import EyeIcon from '../components/icons/EyeIcon';
import CodeIcon from '../components/icons/CodeIcon';
import { cn } from '../lib/utils'; // Assuming you have this utility
import Footer from '../components/layout/Footer/Footer';


const ComponentsPage = () => {
    const location = useLocation();
    const [selectedId, setSelectedId] = useState(() => {
        if (location.state?.selectedId) {
            const index = componentsList.findIndex(c => c.id === location.state.selectedId);
            return index !== -1 ? index : 0;
        }
        return 0;
    });
    const [isSidebarOpen, setSidebarOpen] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth >= 768; // Open by default on desktop, closed on mobile
        }
        return true;
    });

    // Handle Window Resize
    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        // Optional: only shrink on cross-boundary, but for simplicity:
        // window.addEventListener('resize', handleResize);
        // return () => window.removeEventListener('resize', handleResize);
        // Actually, better not to auto-close if user opened it, just initial state is enough usually.
        // But for "responsiveness", if I resize from desktop to mobile, it should close?
        // Let's stick to initial state for now to avoid annoyance, or just simple check.
    }, []);

    const [viewMode, setViewMode] = useState('preview'); // 'preview' | 'code'
    const { theme, toggleTheme } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');

    const previewIconRef = React.useRef(null);
    const codeIconRef = React.useRef(null);
    const themeIconRef = React.useRef(null);

    const selectedItem = componentsList[selectedId];

    // Filter and Group items
    const filteredItems = componentsList.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const categories = filteredItems.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    return (
        <div className="flex h-screen bg-zinc-50 dark:bg-[#0c0c0e] text-zinc-950 dark:text-zinc-50 overflow-hidden font-inter selection:bg-zinc-200 dark:selection:bg-zinc-800 transition-colors duration-500 relative">
            <div className="noise-bg-fixed opacity-20" />

            {/* Mobile Backdrop */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 bg-black/20 dark:bg-black/40 z-20 md:hidden backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 280 : 0, opacity: isSidebarOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                    "h-full border-r border-black/5 dark:border-white/5 bg-white/80 dark:bg-[#0c0c0e]/80 backdrop-blur-xl flex flex-col flex-shrink-0 overflow-hidden z-30 group/sidebar",
                    "fixed md:relative inset-y-0 left-0" // Fixed on mobile, relative on desktop
                )}
            >
                <div className="w-[280px] h-full flex flex-col">
                    {/* Header */}
                    <div className="h-14 px-5 flex items-center justify-between border-b border-black/5 dark:border-white/5 flex-shrink-0">
                        <Link to="/" className="flex items-center gap-2.5 group opacity-70 hover:opacity-100 transition-opacity">
                            <div className="w-9 h-9 flex items-center justify-center rounded-lg">
                                <Logo className="w-6 h-6" />
                            </div>
                            <span className="font-semibold text-sm tracking-tight font-instrument italic text-lg">Portfolio</span>
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                        >
                            <PanelLeftClose size={16} />
                        </button>
                    </div>

                    {/* Search */}
                    <div className="p-4 pb-2">
                        <div className="relative group/search">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within/search:text-zinc-600 dark:group-focus-within/search:text-zinc-300 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search components..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white dark:bg-[#121214] border border-black/5 dark:border-white/5 rounded-lg py-2 pl-9 pr-3 text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 focus:border-zinc-300 dark:focus:border-zinc-700 transition-all placeholder:text-zinc-400 shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-9 custom-scrollbar">
                        {Object.entries(categories).map(([category, items]) => (
                            <div key={category}>
                                <h3 className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 mb-3 px-3 uppercase tracking-wider">
                                    {category}
                                </h3>
                                <div className="space-y-0.5">
                                    {items.map((item) => {
                                        const globalIndex = componentsList.findIndex(i => i.id === item.id);
                                        const isActive = selectedId === globalIndex;
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => {
                                                    setSelectedId(globalIndex);
                                                    setViewMode('preview');
                                                    if (window.innerWidth < 768) setSidebarOpen(false); // Close on selection on mobile
                                                }}
                                                className={cn(
                                                    "w-full text-left px-3 py-1.5 text-[13px] transition-all duration-200 cursor-pointer rounded-md border-l-[2px] flex items-center gap-2",
                                                    isActive
                                                        ? "bg-black/5 dark:bg-white/10 text-zinc-900 dark:text-white font-medium border-black dark:border-white"
                                                        : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5"
                                                )}
                                            >
                                                {item.title}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        {Object.keys(categories).length === 0 && (
                            <div className="text-center py-10 text-zinc-400 text-xs">
                                No components found.
                            </div>
                        )}
                    </div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-transparent relative z-10 font-sans overflow-hidden">

                {/* Mobile Marquee - Top of View */}
                <div className="md:hidden py-1.5 bg-black dark:bg-white overflow-hidden text-white dark:text-black shrink-0 relative z-40">
                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 12, ease: "linear", repeat: Infinity }}
                        className="whitespace-nowrap flex gap-8 text-[10px] font-bold tracking-widest uppercase"
                    >
                        <span>View in laptop or pc for better view ✦ View in laptop or pc for better view ✦ View in laptop or pc for better view ✦</span>
                        <span>View in laptop or pc for better view ✦ View in laptop or pc for better view ✦ View in laptop or pc for better view ✦</span>
                    </motion.div>
                </div>

                {/* Top Toolbar */}
                <header className="h-14 border-b border-black/5 dark:border-white/5 flex items-center justify-between px-6 bg-white/70 dark:bg-[#0c0c0e]/70 backdrop-blur-xl sticky top-0 z-30 shrink-0">
                    <div className="flex items-center gap-3">
                        {!isSidebarOpen && (
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="p-2 -ml-2 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                            >
                                <PanelLeftOpen size={18} />
                            </button>
                        )}
                        {!isSidebarOpen && <div className="h-4 w-[1px] bg-black/10 dark:bg-white/10" />}

                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-sm text-zinc-500">
                            <span>Components</span>
                            <span className="text-zinc-300 dark:text-zinc-700">/</span>
                            <span className="font-medium text-zinc-900 dark:text-zinc-100">{selectedItem?.title}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                        >
                            {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
                        </button>
                    </div>
                </header>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="max-w-[1600px] mx-auto">
                        <div className="grid grid-cols-1 xl:grid-cols-[1fr_240px] gap-12">

                            {/* Center Column: Documentation */}
                            <div className="min-w-0 px-8 py-12 pb-20 xl:border-r border-black/5 dark:border-white/5">

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedItem?.id || selectedId}
                                        initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                                        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                        exit={{ opacity: 0, filter: "blur(4px)", y: -10 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                    >

                                        {/* Header Section */}
                                        <div className="mb-12 space-y-4">
                                            <h1 className="text-4xl md:text-5xl font-instrument italic font-normal tracking-tight text-zinc-900 dark:text-white">
                                                {selectedItem?.title}
                                            </h1>
                                            <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl font-light">
                                                {selectedItem?.description || "A highly reusable component for your projects."}
                                            </p>
                                        </div>

                                        {/* Main Preview/Code Tabs */}
                                        <div id="preview-section" className="space-y-6 mb-16 scroll-mt-24">
                                            <div className="flex items-center gap-8 border-b border-black/5 dark:border-white/5">
                                                <button
                                                    onClick={() => setViewMode('preview')}
                                                    className={cn(
                                                        "pb-3 text-sm font-medium transition-all relative",
                                                        viewMode === 'preview'
                                                            ? "text-black dark:text-white"
                                                            : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                                                    )}
                                                >
                                                    Preview
                                                    {viewMode === 'preview' && (
                                                        <motion.div
                                                            layoutId="activeTab"
                                                            className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-black dark:bg-white"
                                                        />
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => setViewMode('code')}
                                                    className={cn(
                                                        "pb-3 text-sm font-medium transition-all relative",
                                                        viewMode === 'code'
                                                            ? "text-black dark:text-white"
                                                            : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                                                    )}
                                                >
                                                    Code
                                                    {viewMode === 'code' && (
                                                        <motion.div
                                                            layoutId="activeTab"
                                                            className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-black dark:bg-white"
                                                        />
                                                    )}
                                                </button>
                                            </div>

                                            <div className="relative rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#121214] min-h-[500px] shadow-sm overflow-hidden flex flex-col">
                                                {viewMode === 'preview' ? (
                                                    // Added overflow-x-auto for mobile interactive scrolling
                                                    <div className="w-full h-full min-h-[500px] flex items-center justify-center p-4 md:p-8 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px] overflow-x-auto overflow-y-hidden">
                                                        {/* Force container to allow width expansion if needed. Sticky keeps it in view while scrolling. */}
                                                        <div className="inset-0 bg-white/50 dark:bg-[#09090b]/50 pointer-events-none sticky left-0 top-0" />
                                                        <div className="relative z-10 w-full flex justify-center min-w-min">
                                                            {selectedItem?.component}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="w-full h-full min-h-[500px] overflow-hidden rounded-xl">
                                                        <CodeBlock
                                                            code={selectedItem?.code || '// No code available'}
                                                            fileName={`${selectedItem?.title?.replace(/\s+/g, '') || 'Component'}.jsx`}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Documentation Sections */}
                                        <div className="space-y-10">
                                            {/* Installation */}
                                            {selectedItem?.install && (
                                                <section id="installation" className="space-y-4 scroll-mt-20">
                                                    <h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                                                        Installation
                                                    </h2>
                                                    <div className="mt-4">
                                                        <CodeBlock code={selectedItem.install} fileName="Terminal" />
                                                    </div>
                                                </section>
                                            )}

                                            {/* Usage */}
                                            {selectedItem?.usage && (
                                                <section id="usage" className="space-y-4 scroll-mt-20">
                                                    <h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                                                        Usage
                                                    </h2>
                                                    <CodeBlock code={selectedItem.usage} fileName="Usage.jsx" />
                                                </section>
                                            )}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Footer attribution
                                <div className="border-t border-zinc-200 dark:border-zinc-800 mt-20 py-10">
                                    <div className="flex items-center justify-between text-sm text-zinc-500">
                                        <p>Built by Tushar Negi</p>
                                        <p className="flex items-center gap-2">
                                            Portfolio v2.0
                                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        </p>
                                    </div>
                                </div> */}

                            </div>

                            {/* Right Column: Table of Contents */}
                            <div className="hidden xl:block min-w-0">
                                <div className="sticky top-24 pr-8">
                                    <h4 className="font-semibold text-xs tracking-wider uppercase mb-5 text-zinc-900 dark:text-white">On This Page</h4>
                                    <ul className="space-y-3.5 text-sm text-zinc-500 dark:text-zinc-400 border-l border-black/5 dark:border-white/5 pl-4">
                                        <li>
                                            <button
                                                onClick={() => {
                                                    setViewMode('code');
                                                    document.getElementById('preview-section')?.scrollIntoView({ behavior: 'smooth' });
                                                }}
                                                className="hover:text-black dark:hover:text-white transition-colors cursor-pointer text-left w-full hover:translate-x-1 duration-200"
                                            >
                                                Code
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => document.getElementById('installation')?.scrollIntoView({ behavior: 'smooth' })}
                                                className="hover:text-black dark:hover:text-white transition-colors cursor-pointer text-left w-full hover:translate-x-1 duration-200"
                                            >
                                                Installation
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => document.getElementById('usage')?.scrollIntoView({ behavior: 'smooth' })}
                                                className="hover:text-black dark:hover:text-white transition-colors cursor-pointer text-left w-full hover:translate-x-1 duration-200"
                                            >
                                                Usage
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="px-8 pb-8 border-t border-black/5 dark:border-white/5 pt-10 text-center md:text-left">
                        <Footer />
                    </div>
                </div>
            </main>
        </div>
    );

};

export default ComponentsPage;