import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, CornerDownLeft } from 'lucide-react';

// Custom "AI Sparkles" Icon Component
const SparklesIcon = ({ size = 24, className, ...props }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
    >
        {/* Main Star */}
        <path
            d="M10 2C10 2 12.5 8 18 10C12.5 12 10 18 10 18C10 18 7.5 12 2 10C7.5 8 10 2 10 2Z"
            fill="currentColor"
        />
        {/* Secondary Star */}
        <path
            d="M18 14C18 14 19 16.5 21 18C19 19.5 18 22 18 22C18 22 17 19.5 15 18C17 16.5 18 14 18 14Z"
            fill="currentColor"
        />
    </svg>
);

export default function AskAI() {
    const [status, setStatus] = useState('idle'); // 'idle' | 'input' | 'processing' | 'result'
    const [query, setQuery] = useState('');
    const [structuredContent, setStructuredContent] = useState([]);
    const [sources, setSources] = useState([]);
    const inputRef = useRef(null);

    // ---------------------------------------------------------------------------
    // GEMINI API CONFIGURATION
    // ---------------------------------------------------------------------------
    const apiKey = ""; // System provides this at runtime

    const callGemini = async (userQuery) => {
        // Simulating API call for demo since we don't have a real key here
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    text: "### Result\nThis is a simulated response.\n- It demonstrates the UI.\n- It looks real.",
                    sources: [
                        { title: "React Documentation", uri: "https://react.dev", domain: "react.dev" },
                        { title: "Google Gemini", uri: "https://deepmind.google/technologies/gemini/", domain: "deepmind.google" }
                    ]
                })
            }, 1500)
        });
    };

    // ---------------------------------------------------------------------------
    // PARSING & ANIMATION HELPERS
    // ---------------------------------------------------------------------------

    const parseMarkdownToBlocks = (text) => {
        if (!text) return [];
        const lines = text.split('\n');
        const blocks = [];

        lines.forEach((line) => {
            const trim = line.trim();
            if (!trim) return;

            if (trim.startsWith('### ')) {
                blocks.push({ type: 'h3', content: trim.replace('### ', '') });
            } else if (trim.startsWith('## ')) {
                blocks.push({ type: 'h2', content: trim.replace('## ', '') });
            } else if (trim.startsWith('* ') || trim.startsWith('- ')) {
                blocks.push({ type: 'li', content: trim.replace(/^[\*\-] /, '') });
            } else {
                blocks.push({ type: 'p', content: trim });
            }
        });
        return blocks;
    };

    const parseInline = (text) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    // ---------------------------------------------------------------------------
    // EFFECTS & HANDLERS
    // ---------------------------------------------------------------------------

    useEffect(() => {
        if (status === 'input' && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 150);
        }
    }, [status]);

    const handleSubmit = async () => {
        if (!query.trim()) return;
        setStatus('processing');

        // Create mock data if real API is not ready
        const minWait = new Promise(resolve => setTimeout(resolve, 2000));

        // Using mock response for UI demo purposes
        const resultObj = {
            text: "### Hello There!\nI am a **simulated AI assistant** running in your portfolio.\n\n- I can help demonstrate UI interactions.\n- I feature smooth animations.\n- I look just like the real thing!",
            sources: [
                { title: "Framer Motion", uri: "https://www.framer.com/motion/", domain: "framer.com" },
                { title: "React", uri: "https://react.dev", domain: "react.dev" }
            ]
        };

        await minWait;

        setStructuredContent(parseMarkdownToBlocks(resultObj.text));
        setSources(resultObj.sources);
        setStatus('result');
    };

    const reset = () => {
        setStatus('idle');
        setQuery('');
        setStructuredContent([]);
        setSources([]);
    };

    const springTransition = {
        type: "spring",
        damping: 28,
        stiffness: 180,
        mass: 0.8
    };

    return (
        <div className="w-full h-full flex items-center justify-center p-4 font-sans antialiased text-gray-900">
            <div className="relative group perspective-1000">

                {/* Backdrop - Only visible when active */}
                {status !== 'idle' && (
                    <div
                        className="fixed inset-0 z-0 bg-transparent"
                        onClick={reset}
                    />
                )}

                <motion.div
                    layout
                    initial="idle"
                    animate={status}
                    transition={springTransition}
                    variants={{
                        idle: {
                            width: 140,
                            height: 52,
                            borderRadius: 26,
                            // Clean float shadow
                            boxShadow: "0px 4px 6px -1px rgba(0,0,0,0.05), 0px 2px 4px -1px rgba(0,0,0,0.03), 0 0 0 1px rgba(0,0,0,0.02)"
                        },
                        input: {
                            width: 580,
                            height: 340,
                            borderRadius: 24,
                            // Reduced, subtle shadow
                            boxShadow: "0px 15px 30px -10px rgba(0,0,0,0.08), 0px 0px 0px 1px rgba(0,0,0,0.03)"
                        },
                        processing: {
                            width: 170,
                            height: 52,
                            borderRadius: 26,
                            boxShadow: "0px 4px 6px -1px rgba(0,0,0,0.05), 0px 2px 4px -1px rgba(0,0,0,0.03), 0 0 0 1px rgba(0,0,0,0.02)"
                        },
                        result: {
                            width: 580,
                            height: 520,
                            borderRadius: 24,
                            boxShadow: "0px 15px 30px -10px rgba(0,0,0,0.08), 0px 0px 0px 1px rgba(0,0,0,0.03)"
                        }
                    }}
                    className="bg-white relative z-10 flex flex-col overflow-hidden origin-center transform-gpu"
                    onClick={() => status === 'idle' && setStatus('input')}
                >

                    {/* --- SHARED ICON --- */}
                    <motion.div
                        layout="position"
                        transition={springTransition}
                        className={`absolute z-20 pointer-events-none flex items-center justify-center
              ${(status === 'input' || status === 'result') ? 'top-6 left-6' : 'top-4 left-5'} 
              ${(status === 'idle') ? 'left-5' : ''}
              ${(status === 'processing') ? 'left-6' : ''}
            `}
                    >
                        {/* Jelly Animation */}
                        <motion.div
                            animate={status === 'processing' ? {
                                scaleX: [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1],
                                scaleY: [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1],
                                rotate: [0, -3, 3, -1, 1, 0],
                            } : { scaleX: 1, scaleY: 1, rotate: 0 }}
                            transition={status === 'processing' ? {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                times: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1]
                            } : { duration: 0.3 }}
                        >
                            <SparklesIcon
                                size={20}
                                className={`transition-colors duration-500
                  ${status === 'processing' ? 'text-gray-400' : 'text-gray-800'}
                `}
                            />
                        </motion.div>
                    </motion.div>

                    {/* --- IDLE STATE --- */}
                    <AnimatePresence mode="popLayout">
                        {status === 'idle' && (
                            <motion.div
                                key="idle-content"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex items-center justify-center pl-6 cursor-pointer"
                            >
                                {/* Subtle sheen animation */}
                                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[26px]">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/50 to-transparent -translate-x-full animate-shimmer-fast w-full h-full" />
                                </div>
                                <span className="text-gray-800 font-semibold text-[15px] tracking-tight relative z-10">
                                    Ask AI
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* --- PROCESSING STATE --- */}
                    <AnimatePresence mode="popLayout">
                        {status === 'processing' && (
                            <motion.div
                                key="processing-text"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex items-center justify-center pl-6"
                            >
                                <div className="shimmer-text text-[15px] font-medium tracking-tight">
                                    Processing...
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* --- EXPANDED CONTENT --- */}
                    <div className="flex-1 relative w-full h-full">

                        {/* INPUT UI */}
                        <AnimatePresence>
                            {status === 'input' && (
                                <motion.div
                                    key="input-ui"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                                    className="absolute inset-0 p-6 flex flex-col"
                                >
                                    {/* Controls */}
                                    <div className="absolute top-5 right-5 flex items-center gap-2">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); reset(); }}
                                            className="group flex items-center justify-center px-2 py-1.5 rounded-md bg-[#F7F7F7] border border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300 hover:bg-gray-100 shadow-sm transition-all"
                                        >
                                            <Command size={13} className="mr-1" />
                                            <span className="text-[11px] font-medium font-mono">ESC</span>
                                        </button>

                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleSubmit(); }}
                                            disabled={!query}
                                            className={`h-8 px-3 flex items-center justify-center rounded-md transition-all duration-300 relative overflow-hidden group/btn border shadow-sm
                        ${query
                                                    ? 'bg-gray-900 text-white border-gray-900 cursor-pointer hover:bg-black'
                                                    : 'bg-[#F7F7F7] text-gray-300 border-gray-200'}
                      `}
                                        >
                                            {query && (
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer-button" />
                                            )}
                                            <span className="text-[11px] font-medium mr-1.5">{query ? 'Ask' : 'Enter'}</span>
                                            <CornerDownLeft size={13} strokeWidth={2.5} />
                                        </button>
                                    </div>

                                    {/* Input Area - OFF WHITE / GRAY & SUNK */}
                                    <div
                                        className="mt-14 flex-1 relative rounded-xl bg-[#F7F7F7] overflow-hidden transition-all focus-within:bg-[#F5F5F5]"
                                        // Subtle inner shadow for sunk effect
                                        style={{ boxShadow: "inset 0px 2px 5px rgba(0,0,0,0.03)" }}
                                    >
                                        <textarea
                                            ref={inputRef}
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSubmit();
                                                }
                                            }}
                                            placeholder="What do you want to know?"
                                            className="w-full h-full resize-none bg-transparent text-[21px] text-gray-800 placeholder:text-gray-400 focus:outline-none font-normal leading-relaxed tracking-tight p-6"
                                            spellCheck={false}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* RESULT UI */}
                        <AnimatePresence>
                            {status === 'result' && (
                                <motion.div
                                    key="result-ui"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                                    className="absolute inset-0 p-8 flex flex-col"
                                >
                                    <div className="mt-8 h-full overflow-y-auto pr-2 custom-scrollbar">

                                        {/* STRUCTURED BLUR REVEAL */}
                                        <div className="min-h-[20px]">
                                            {structuredContent.map((block, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, filter: 'blur(8px)', y: 8 }}
                                                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                                                    transition={{
                                                        duration: 0.6,
                                                        ease: "easeOut",
                                                        delay: index * 0.1
                                                    }}
                                                >
                                                    {block.type === 'h2' && (
                                                        <h2 className="text-[19px] font-bold mt-6 mb-3 text-gray-900 leading-tight">
                                                            {parseInline(block.content)}
                                                        </h2>
                                                    )}
                                                    {block.type === 'h3' && (
                                                        <h3 className="text-[17px] font-semibold mt-5 mb-2 text-gray-900 leading-tight">
                                                            {parseInline(block.content)}
                                                        </h3>
                                                    )}
                                                    {block.type === 'li' && (
                                                        <div className="flex items-start gap-2.5 mb-2 ml-1">
                                                            <span className="mt-2 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                                                            <span className="text-gray-700 leading-relaxed text-[15px]">
                                                                {parseInline(block.content)}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {block.type === 'p' && (
                                                        <p className="mb-3 text-gray-700 leading-[1.7] text-[15px]">
                                                            {parseInline(block.content)}
                                                        </p>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Sources (Reveal after text) */}
                                        {sources.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: structuredContent.length * 0.1 + 0.3 }}
                                                className="mt-8 pt-6 border-t border-gray-100"
                                            >
                                                <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-3">Sources</div>
                                                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                                    {sources.map((source, idx) => (
                                                        <a
                                                            key={idx}
                                                            href={source.uri}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex-shrink-0 h-[72px] min-w-[140px] max-w-[200px] bg-[#F7F7F7] rounded-lg border border-gray-100 hover:border-gray-300 hover:bg-white hover:shadow-md transition-all cursor-pointer p-3 flex flex-col justify-between group/source relative overflow-hidden"
                                                        >
                                                            <div className="absolute inset-0 bg-white opacity-0 group-hover/source:opacity-100 transition-opacity z-0" />
                                                            <div className="flex items-center gap-2 relative z-10">
                                                                <div className="w-5 h-5 rounded-full bg-white border border-gray-100 flex items-center justify-center shrink-0">
                                                                    <img
                                                                        src={`https://www.google.com/s2/favicons?domain=${source.domain}&sz=32`}
                                                                        alt=""
                                                                        className="w-3 h-3 opacity-70"
                                                                        onError={(e) => e.target.style.display = 'none'}
                                                                    />
                                                                </div>
                                                                <span className="text-[10px] text-gray-500 font-medium truncate w-full">{source.domain}</span>
                                                            </div>
                                                            <div className="text-[11px] text-gray-700 font-medium truncate w-full leading-tight relative z-10 mt-1">
                                                                {source.title}
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>
                </motion.div>
            </div>

            <style>{`
        .shimmer-text {
          background: linear-gradient(
            to right,
            #9CA3AF 20%,
            #1F2937 50%,
            #9CA3AF 80%
          );
          background-size: 200% auto;
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          animation: shimmer 1.5s linear infinite;
        }

        @keyframes shimmer-fast {
          0% { transform: translateX(-150%) skewX(-20deg); }
          50%, 100% { transform: translateX(150%) skewX(-20deg); }
        }
        .animate-shimmer-fast {
          animation: shimmer-fast 3s infinite ease-in-out;
        }

        @keyframes shimmer-button {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer-button {
          animation: shimmer-button 2s infinite linear;
        }

        @keyframes shimmer {
          to {
            background-position: 200% center;
          }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
        </div>
    );
}
