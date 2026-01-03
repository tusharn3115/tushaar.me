import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { componentsList } from '../../data/componentData.jsx';
import { useTheme } from '../../context/ThemeContext';
import Logo from '../ui/Logo';
import CodeBlock from '../ui-components/CodeBlock';
import {
    PanelLeftClose,
    PanelLeftOpen,
    Sun,
    Moon,
    Code,
    Eye,
    ChevronRight,
    Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils'; // Assuming you have this utility

const ComponentsPage = () => {
    const [selectedId, setSelectedId] = useState(0);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [viewMode, setViewMode] = useState('preview'); // 'preview' | 'code'
    const { theme, toggleTheme } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');

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
        <div className="flex h-screen bg-white dark:bg-[#09090b] text-zinc-950 dark:text-zinc-50 overflow-hidden font-inter selection:bg-zinc-200 dark:selection:bg-zinc-800 transition-colors duration-500">

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 260 : 0, opacity: isSidebarOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-full border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b] flex flex-col flex-shrink-0 overflow-hidden relative z-20 group/sidebar"
            >
                <div className="w-[260px] h-full flex flex-col">
                    {/* Header */}
                    <div className="h-14 px-4 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 flex-shrink-0">
                        <Link to="/" className="flex items-center gap-2 group opacity-80 hover:opacity-100 transition-opacity">
                            <div className="w-6 h-6 flex items-center justify-center">
                                <Logo className="w-full h-full" />
                            </div>
                            <span className="font-semibold text-sm tracking-tight">Portfolio</span>
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                        >
                            <PanelLeftClose size={16} />
                        </button>
                    </div>

                    {/* Search */}
                    <div className="p-3 pb-1">
                        <div className="relative">
                            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="Search components..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg py-1.5 pl-8 pr-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-800 transition-all placeholder:text-zinc-400"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 custom-scrollbar">
                        {Object.entries(categories).map(([category, items]) => (
                            <div key={category}>
                                <h3 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest mb-2 px-2">
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
                                                }}
                                                className={cn(
                                                    "w-full text-left px-2 py-1.5 rounded-md text-sm transition-all duration-200 flex items-center justify-between group",
                                                    isActive
                                                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium shadow-sm"
                                                        : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200"
                                                )}
                                            >
                                                <span>{item.title}</span>
                                                {isActive && (
                                                    <motion.div layoutId="active-indicator" className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                                                )}
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

                    {/* Footer Info */}
                    <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-1">
                        <div className="flex justify-between items-center text-[10px] text-zinc-400 font-mono">
                            <span className="flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                TusharNegi
                            </span>
                            <span>v1.0</span>
                        </div>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-zinc-50/50 dark:bg-[#09090b] relative z-10 font-sans">

                {/* Top Toolbar */}
                <header className="h-14 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        {!isSidebarOpen && (
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="p-2 -ml-2 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                            >
                                <PanelLeftOpen size={18} />
                            </button>
                        )}
                        {!isSidebarOpen && <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />}

                        <div className="flex items-center gap-2 text-sm text-zinc-500">
                            <span>Components</span>
                            <ChevronRight size={14} className="text-zinc-300 dark:text-zinc-700" />
                            <span className="font-medium text-zinc-900 dark:text-zinc-100">{selectedItem?.title}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* View Toggles */}
                        <div className="flex items-center p-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700/50">
                            <button
                                onClick={() => setViewMode('preview')}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                                    viewMode === 'preview'
                                        ? "bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 shadow-sm"
                                        : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                                )}
                            >
                                <Eye size={14} />
                                Preview
                            </button>
                            <button
                                onClick={() => setViewMode('code')}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                                    viewMode === 'code'
                                        ? "bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 shadow-sm"
                                        : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                                )}
                            >
                                <Code size={14} />
                                Code
                            </button>
                        </div>

                        <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-md text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-hidden relative group">
                    {/* Background Grid Pattern */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.4] dark:opacity-[0.2]"
                        style={{
                            backgroundImage: `radial-gradient(${theme === 'dark' ? '#52525b' : '#d4d4d8'} 1px, transparent 1px)`,
                            backgroundSize: '24px 24px'
                        }}
                    />

                    <AnimatePresence mode='wait'>
                        {viewMode === 'preview' ? (
                            <motion.div
                                key={`preview-${selectedItem?.id}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="w-full h-full flex items-center justify-center p-6 sm:p-12"
                            >
                                <div className="absolute inset-0 flex items-center justify-center overflow-auto custom-scrollbar p-6">
                                    {selectedItem?.component}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={`code-${selectedItem?.id}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="w-full h-full overflow-hidden flex flex-col p-6"
                            >
                                <div className="max-w-4xl mx-auto w-full h-full rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden bg-white dark:bg-[#09090b]">
                                    <CodeBlock code={selectedItem?.code || '// No code available'} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default ComponentsPage;
