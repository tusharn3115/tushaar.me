import PeelingCheckbox from '../components/ui/PeelingCheckbox';
import AskAI from '../components/ui/AskAI';
import ClickSparkles from '../components/ui/ClickSparkles';
import FileTree from '../components/ui/FileTree';
import GlassyFolder from '../components/ui/GlassyFolder';
import VoiceConversation from '../components/ui/VoiceConversation';
import DynamicIsland from '../components/ui/DynamicIsland';

// PLACEHOLDERS
const PeelingCheckboxCode = `import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

/**
 * PeelingCheckbox
 * * Pixel-perfect recreation with "Folded Corner" logic.
 * * * * Logic:
 * * - Hover: Top-Right corner folds diagonally inward (morphs shape).
 * * - Click: The whole sticker peels off towards the Bottom-Left.
 * * - Fix: Hover effect is now strictly scoped to the checkbox and text area.
 */

const PeelingCheckbox = ({
    checked: controlledChecked,
    defaultChecked = false,
    onChange,
    className = "",
    style = {}
}) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const [isHovered, setIsHovered] = useState(false);

    const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;
    const currentVariant = isChecked ? "checked" : (isHovered ? "hover" : "unchecked");

    const toggle = () => {
        const newValue = !isChecked;
        if (controlledChecked === undefined) {
            setInternalChecked(newValue);
        }
        onChange?.(newValue);
    };

    const handleKeyDown = (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            toggle();
        }
    };

    // --- 1. SVG Path Topology ---

    // UNCHECKED: Full Rounded Square
    const pathFull = \`
    M 6 0 
    L 16 0 
    L 22 0 
    C 25.31 0 28 2.69 28 6 
    L 28 12 
    L 28 22 A 6 6 0 0 1 22 28 
    L 6 28 A 6 6 0 0 1 0 22 
    L 0 6 A 6 6 0 0 1 6 0 Z
  \`;

    // HOVER: Folded Corner
    const pathFolded = \`
    M 6 0 
    L 16 0 
    L 16 0 
    C 20 4 24 8 28 12 
    L 28 12 
    L 28 22 A 6 6 0 0 1 22 28 
    L 6 28 A 6 6 0 0 1 0 22 
    L 0 6 A 6 6 0 0 1 6 0 Z
  \`;

    // --- 2. The Ear (The Folded Flap) ---
    const pathEar = \`
    M 16 0
    C 16 0 16 6 16 6 
    A 6 6 0 0 0 22 12
    L 28 12
    Z
  \`;

    // --- 3. Animation Variants ---

    const wrapperVariants = {
        unchecked: {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        hover: {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            transition: { duration: 0.2 }
        },
        checked: {
            x: -30,        // Move Left
            y: 30,         // Move Down (Bottom-Left Direction)
            rotate: -120,  // Rotate inwards/down-left
            opacity: 0,    // Fade out
            scale: 0.9,
            transition: {
                duration: 0.45,
                ease: [0.4, 0, 0.2, 1] // Aggressive "Ease-In-Out" for the rip
            }
        }
    };

    const sheetVariants = {
        unchecked: {
            d: pathFull,
            fill: "var(--peel)",
            filter: "brightness(1)",
        },
        hover: {
            d: pathFolded,
            fill: "var(--peel)",
            filter: "brightness(0.98)", // Slight shadow from bending
            transition: { duration: 0.25, ease: "easeInOut" }
        },
        checked: {
            d: pathFolded,
            filter: "brightness(0.95)",
            transition: { duration: 0.1 }
        }
    };

    const earVariants = {
        unchecked: {
            opacity: 0,
            x: 2,
            y: -2,
            transition: { duration: 0.2 }
        },
        hover: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration: 0.25, ease: "easeOut" }
        },
        checked: {
            opacity: 1, // Stay visible as it flies away
            transition: { duration: 0.1 }
        }
    };

    const checkVariants = {
        unchecked: { pathLength: 0, opacity: 0 },
        hover: { pathLength: 0, opacity: 0 },
        checked: {
            pathLength: 1,
            opacity: 1,
            transition: { delay: 0.2, duration: 0.3, ease: "easeOut" }
        }
    };

    const bgVariants = {
        unchecked: { scale: 1 },
        checked: {
            scale: [1, 0.95, 1.05, 1], // Bounce impact
            transition: { delay: 0.1, duration: 0.4 }
        }
    };

    return (
        // Outer Container: Handles Layout/Centering only. No events here.
        <div className={\`flex w-full h-full justify-center items-center \${className}\`}>

            {/* Interactive Container: Handles Hover/Click/Focus. Events moved here. */}
            <div
                className="inline-flex items-center gap-4 cursor-pointer select-none group outline-none p-2 rounded-xl"
                onClick={toggle}
                onKeyDown={handleKeyDown}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                role="checkbox"
                aria-checked={isChecked}
                tabIndex={0}
                style={{
                    '--fill': '#2BC858',   // Green
                    '--peel': '#FFFFFF',   // White
                    '--ear': '#E5E5E5',    // Light Gray (Back of sticker)
                    perspective: '800px',  // For 3D rotation feel
                    ...style
                }}
            >
                <div className="relative flex-shrink-0" style={{ width: 28, height: 28 }}>

                    {/* 1. Base Layer: Green Background + Checkmark */}
                    <motion.svg
                        width="28" height="28" viewBox="0 0 28 28" fill="none"
                        className="absolute inset-0"
                    >
                        <motion.rect
                            width="28" height="28" rx="6"
                            fill="var(--fill)"
                            variants={bgVariants}
                            initial="unchecked"
                            animate={currentVariant}
                        />
                        <motion.path
                            d="M 8 14.5 L 12 18.5 L 20 9.5"
                            stroke="white"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            variants={checkVariants}
                            initial="unchecked"
                            animate={currentVariant}
                        />
                    </motion.svg>

                    {/* 2. Top Layer: The Peeling Sticker */}
                    <motion.div
                        className="absolute inset-0 drop-shadow-sm"
                        variants={wrapperVariants}
                        initial="unchecked"
                        animate={currentVariant}
                        style={{
                            transformOrigin: "bottom left",
                            transformStyle: "preserve-3d"
                        }}
                    >
                        <motion.svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                            {/* The Main Sheet (White) */}
                            <motion.path
                                variants={sheetVariants}
                                strokeWidth="0.5"
                            />
                            {/* The Folded Ear (Gray Back) */}
                            <motion.path
                                d={pathEar}
                                fill="var(--ear)"
                                variants={earVariants}
                                style={{ filter: "drop-shadow(-1px 1px 1px rgba(0,0,0,0.1))" }}
                            />
                        </motion.svg>
                    </motion.div>
                </div>

                <span className="text-slate-700 dark:text-slate-200 font-medium text-lg font-sans tracking-tight transition-colors group-hover:text-slate-900 dark:group-hover:text-white">
                    Check to see the peeling effect
                </span>
            </div>
        </div>
    );
};

export default PeelingCheckbox;`;
const AskAICode = `import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
                    text: "### Result\\nThis is a simulated response.\\n- It demonstrates the UI.\\n- It looks real.",
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
        const lines = text.split('\\n');
        const blocks = [];

        lines.forEach((line) => {
            const trim = line.trim();
            if (!trim) return;

            if (trim.startsWith('### ')) {
                blocks.push({ type: 'h3', content: trim.replace('### ', '') });
            } else if (trim.startsWith('## ')) {
                blocks.push({ type: 'h2', content: trim.replace('## ', '') });
            } else if (trim.startsWith('* ') || trim.startsWith('- ')) {
                blocks.push({ type: 'li', content: trim.replace(/^[\\*\\-] /, '') });
            } else {
                blocks.push({ type: 'p', content: trim });
            }
        });
        return blocks;
    };

    const parseInline = (text) => {
        const parts = text.split(/(\\*\\*.*?\\*\\*)/g);
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
            text: "### Hello There!\\nI am a **simulated AI assistant** running in your portfolio.\\n\\n- I can help demonstrate UI interactions.\\n- I feature smooth animations.\\n- I look just like the real thing!",
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
                            width: 'min(580px, 90vw)', // Responsive width
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
                            width: 'min(580px, 90vw)', // Responsive width
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
                        className={\`absolute z-20 pointer-events-none flex items-center justify-center
              \${(status === 'input' || status === 'result') ? 'top-6 left-6' : 'top-4 left-5'} 
              \${(status === 'idle') ? 'left-5' : ''}
              \${(status === 'processing') ? 'left-6' : ''}
            \`}
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
                                className={\`transition-colors duration-500
                  \${status === 'processing' ? 'text-gray-400' : 'text-gray-800'}
                \`}
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
                                            className={\`h-8 px-3 flex items-center justify-center rounded-md transition-all duration-300 relative overflow-hidden group/btn border shadow-sm
                        \${query
                                                    ? 'bg-gray-900 text-white border-gray-900 cursor-pointer hover:bg-black'
                                                    : 'bg-[#F7F7F7] text-gray-300 border-gray-200'}
                      \`}
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
                                                                        src={\`https://www.google.com/s2/favicons?domain=\${source.domain}&sz=32\`}
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

            <style>{\`
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
      \`}</style>
        </div>
    );
}`;
const ClickSparklesCode = `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// ==============================================
// 👇 SPARKLE PARTICLE COMPONENT
// ==============================================
export const SparkleParticles = () => {
    // Generate a fixed number of particles
    const particles = Array.from({ length: 45 }).map((_, i) => {
        // Angle: Cone pointing upwards (225° to 315°)
        const angle = (Math.random() * 90 + 225) * (Math.PI / 180);
        const velocity = Math.random() * 80 + 40;

        return {
            id: i,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity, // Negative = Up
            scale: Math.random() * 0.5 + 0.3,
            color: Math.random() > 0.6 ? 'var(--sparkle-pri)' : 'var(--sparkle-sec)',
            delay: Math.random() * 0.1,
            spin: Math.random() * 180 - 90,
        };
    });

    return (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    animate={{
                        x: p.vx,
                        y: p.vy,
                        opacity: [0, 1, 0],
                        scale: [0, p.scale, 0],
                        rotate: p.spin * 2,
                    }}
                    transition={{
                        duration: Math.random() * 0.6 + 0.6,
                        ease: "easeOut",
                        times: [0, 0.4, 1],
                        delay: p.delay,
                    }}
                    className="absolute top-1 left-1/2"
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill={p.color}
                        style={{ filter: \`drop-shadow(0 0 3px \${p.color})\` }}
                    >
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
};

// ==============================================
// 👆 END OF COMPONENT
// ==============================================


/**
 * Preview/Demo Component
 * This wrapper provides the dark background and trigger button 
 * so you can see the sparkles in the preview.
 */
export default function ClickSparkles() {
    const [key, setKey] = useState(0);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-8 font-sans p-4"
            style={{
                '--sparkle-pri': 'currentColor',
                '--sparkle-sec': 'currentColor',
            }}>

            <div className="relative group">
                <div className="text-black dark:text-white">
                    {/* We use a key to force re-render/re-play animation on click */}
                    <div key={key} className="absolute inset-0 pointer-events-none">
                        <SparkleParticles />
                    </div>

                    <button
                        onClick={() => setKey(prev => prev + 1)}
                        className="relative z-10 px-8 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-zinc-200 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all active:scale-95 font-medium shadow-sm"
                    >
                        Click for Sparkles
                    </button>
                </div>
            </div>

            <p className="text-gray-500 dark:text-zinc-500 text-sm text-center max-w-xs">
                Sparkles adapt to your theme
            </p>
        </div>
    );
}`;
const FileTreeCode = `import React, { useState } from "react";
import {
    motion,
    AnimatePresence,
} from "motion/react";
import {
    Folder,
    FolderOpen,
    FileCode,
    FileJson,
    FileImage,
    FileText,
    ChevronRight,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** * UTILS */
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const INITIAL_DATA = [
    {
        id: "project",
        name: "project",
        type: "folder",
        children: [
            {
                id: "src",
                name: "src",
                type: "folder",
                children: [
                    {
                        id: "app",
                        name: "app",
                        type: "folder",
                        children: [
                            { id: "page.tsx", name: "page.tsx", type: "file", meta: "React Component" },
                            { id: "layout.tsx", name: "layout.tsx", type: "file", meta: "Layout" },
                        ],
                    },
                    {
                        id: "components",
                        name: "components",
                        type: "folder",
                        children: [
                            { id: "button.tsx", name: "button.tsx", type: "file" },
                            { id: "input.tsx", name: "input.tsx", type: "file" },
                        ],
                    },
                ],
            },
            {
                id: "public",
                name: "public",
                type: "folder",
                children: [
                    { id: "images", name: "images", type: "folder", children: [] },
                ],
            },
            { id: "README.md", name: "README.md", type: "file", meta: "Markdown" },
            { id: "package.json", name: "package.json", type: "file", meta: "JSON" },
        ],
    },
];

/**
 * ANIMATION CONFIGURATION
 * "Professional" feel: Snappy, no bounce, linear-ish start, smooth end.
 */
const TRANSITION_VARS = {
    type: "spring",
    bounce: 0,
    duration: 0.3,
};

/**
 * ICONS HELPER
 */
const getFileIcon = (filename, type, isOpen) => {
    const iconClass = "w-4 h-4 text-neutral-500 transition-colors duration-200 group-hover:text-neutral-300";

    if (type === "folder") {
        return isOpen ? (
            <FolderOpen className={cn(iconClass, "text-neutral-200")} />
        ) : (
            <Folder className={iconClass} />
        );
    }

    if (filename.endsWith("json")) return <FileJson className={iconClass} />;
    if (filename.endsWith("png") || filename.endsWith("svg")) return <FileImage className={iconClass} />;
    if (filename.endsWith("md")) return <FileText className={iconClass} />;

    return <FileCode className={iconClass} />;
};

/**
 * COMPONENT: FileRow
 * Removed wobble/3D effects. Added simple slide for label on hover.
 */
const FileRow = ({
    node,
    depth,
    isOpen,
    isSelected,
    onToggle,
    onSelect,
}) => {
    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                onSelect();
                if (node.type === "folder") onToggle();
            }}
            className={cn(
                "group flex items-center h-[34px] w-full cursor-pointer select-none transition-colors duration-200",
                isSelected ? "bg-gray-200 dark:bg-[#1f1f1f]" : "hover:bg-gray-100 dark:hover:bg-[#151515]"
            )}
            style={{ paddingLeft: \`\${depth * 1.2 + 0.5}rem\` }}
        >
            {/* CARET CONTAINER */}
            <div className="flex items-center justify-center w-5 h-5 shrink-0 mr-1 text-neutral-500">
                {node.type === "folder" && (
                    <motion.div
                        initial={false}
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronRight className="w-3.5 h-3.5" />
                    </motion.div>
                )}
            </div>

            {/* ICON */}
            <div className="shrink-0 mr-2">
                {getFileIcon(node.name, node.type, isOpen)}
            </div>

            {/* LABEL */}
            <motion.span
                className={cn(
                    "text-[13px] tracking-tight truncate",
                    isSelected ? "text-black dark:text-white font-medium" : "text-gray-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-neutral-200"
                )}
                animate={{ x: isSelected ? 2 : 0 }}
                transition={{ duration: 0.2 }}
            >
                {node.name}
            </motion.span>
        </div>
    );
};

/**
 * COMPONENT: FileTreeRecursive
 * Handles the accordion logic with smooth height/opacity transitions.
 */
const FileTreeRecursive = ({
    nodes,
    depth = 0,
    selectedId,
    onSelect,
}) => {
    // Pre-expand 'project', 'src', and 'app' to match image
    const [expanded, setExpanded] = useState(new Set(["project", "src", "app"]));

    const toggleExpand = (id) => {
        const next = new Set(expanded);
        if (next.has(id)) {
            next.delete(id);
        } else {
            next.add(id);
        }
        setExpanded(next);
    };

    return (
        <ul className="flex flex-col">
            {nodes.map((node) => {
                const isExpanded = expanded.has(node.id);
                const hasChildren = node.children && node.children.length > 0;

                return (
                    <li key={node.id}>
                        <FileRow
                            node={node}
                            depth={depth}
                            isOpen={isExpanded}
                            isSelected={selectedId === node.id}
                            onToggle={() => toggleExpand(node.id)}
                            onSelect={() => onSelect(node.id)}
                        />

                        <AnimatePresence initial={false}>
                            {isExpanded && hasChildren && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                        height: "auto",
                                        opacity: 1,
                                        transition: TRANSITION_VARS
                                    }}
                                    exit={{
                                        height: 0,
                                        opacity: 0,
                                        transition: { ...TRANSITION_VARS, duration: 0.2 }
                                    }}
                                    className="overflow-hidden"
                                >
                                    {/* Inner wrapper ensures content slides down rather than squishing */}
                                    <motion.div
                                        initial={{ y: -10, opacity: 0, filter: "blur(4px)" }}
                                        animate={{
                                            y: 0,
                                            opacity: 1,
                                            filter: "blur(0px)",
                                            transition: {
                                                duration: 0.3,
                                                delay: 0.05, // Slight delay to let height open first
                                            }
                                        }}
                                        exit={{
                                            y: -10,
                                            opacity: 0,
                                            filter: "blur(4px)",
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        <FileTreeRecursive
                                            nodes={node.children}
                                            depth={depth + 1}
                                            selectedId={selectedId}
                                            onSelect={onSelect}
                                        />
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </li>
                );
            })}
        </ul>
    );
};

/**
 * MAIN COMPONENT
 */
const FileTree = () => {
    const [selectedId, setSelectedId] = useState("app");

    return (
        // FIX: Changed items-center to items-start and added pt-20.
        // This anchors the component to the top-center, preventing upward shifts during expansion.
        <div className="w-full h-full flex items-start justify-center pt-20 p-8 font-sans antialiased text-gray-900 dark:text-neutral-200">

            {/* Container */}
            <div className="w-full max-w-[300px] select-none">
                <FileTreeRecursive
                    nodes={INITIAL_DATA}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                />
            </div>

        </div>
    );
};

export default FileTree;`;
const GlassyFolderCode = `import React, { useState } from 'react';
import { motion } from 'motion/react';

// --- Mini Skeleton Components (Cleaner & Sharper) ---
const FileSkeleton1 = () => (
    <div className="w-full h-full p-3 flex flex-col gap-2 opacity-60">
        <div className="w-1/2 h-2 bg-gray-400/50 rounded-full mb-1" />
        <div className="w-full h-20 bg-gray-600/20 rounded-md border border-gray-500/10" />
        <div className="flex gap-2 mt-auto">
            <div className="w-8 h-8 rounded-full bg-gray-500/20" />
            <div className="flex-1 flex flex-col gap-1 justify-center">
                <div className="w-full h-1.5 bg-gray-400/20 rounded-full" />
                <div className="w-2/3 h-1.5 bg-gray-400/20 rounded-full" />
            </div>
        </div>
    </div>
);

const FileSkeleton2 = () => (
    <div className="w-full h-full p-3 flex flex-col gap-2 opacity-60">
        <div className="flex justify-between items-center mb-1">
            <div className="w-1/3 h-2 bg-gray-400/50 rounded-full" />
            <div className="w-4 h-4 rounded-full bg-blue-400/30" />
        </div>
        <div className="space-y-2">
            <div className="w-full h-1.5 bg-gray-500/20 rounded-full" />
            <div className="w-5/6 h-1.5 bg-gray-500/20 rounded-full" />
            <div className="w-full h-1.5 bg-gray-500/20 rounded-full" />
        </div>
        <div className="w-full h-16 bg-gray-600/20 rounded-md mt-2 border border-gray-500/10" />
    </div>
);

const FileSkeleton3 = () => (
    <div className="w-full h-full p-3 flex flex-col gap-3 opacity-60">
        <div className="w-full h-24 bg-gray-600/20 rounded-md border border-dashed border-gray-500/20 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border-2 border-gray-500/20" />
        </div>
        <div className="space-y-1.5">
            <div className="w-full h-1.5 bg-gray-500/20 rounded-full" />
            <div className="w-3/4 h-1.5 bg-gray-500/20 rounded-full" />
        </div>
    </div>
);

const GlassyFolder = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Toggle open state on click
    const toggleFolder = () => setIsOpen(!isOpen);

    // --- Animation Variants ---

    // Files: Located at Z=0 initially. When open, they move back slightly to Z=-10 
    // to ensure they are behind the open flap visually, but front of the backplate.
    const fileVariants = {
        closed: {
            y: 0,
            rotate: 0,
            scale: 1,
            x: 0,
            z: 0,
            transition: { type: "spring", stiffness: 300, damping: 25 }
        },
        peek: (index) => ({
            y: -60 - (index * 8),
            rotate: index === 0 ? -4 : index === 2 ? 4 : 0,
            scale: 1.02,
            z: 0,
            transition: { type: "spring", stiffness: 300, damping: 25 }
        }),
        open: (index) => ({
            y: -150,
            x: index === 0 ? -110 : index === 2 ? 110 : 0,
            rotate: index === 0 ? -15 : index === 2 ? 15 : 0,
            scale: 1.1,
            z: 0,
            transition: {
                type: "spring",
                stiffness: 180,
                damping: 20,
                delay: 0.05 * index
            }
        })
    };

    // Front Cover: Starts at Z=30 (Positive/Front).
    // This huge gap ensures it never clips through files during the rotation arc.
    const frontVariants = {
        closed: {
            rotateX: 0,
            y: 0,
            z: 30, // Start significantly in front
            transition: { type: "spring", stiffness: 300, damping: 25 }
        },
        peek: {
            rotateX: -20,
            y: 0,
            z: 30, // Maintain Z depth
            transition: { type: "spring", stiffness: 300, damping: 25 }
        },
        open: {
            rotateX: -70, // Open forward
            y: 10, // Slight adjustments to pivot feel
            z: 30, // Maintain Z depth so it stays "on top" visually
            transition: { type: "spring", stiffness: 180, damping: 20 }
        }
    };

    return (
        <div className="w-full h-full flex items-center justify-center p-8 select-none font-sans perspective-[1200px]">

            {/* 3D Scene Container */}
            {/* Increased perspective to flatten the view slightly and reduce edge distortion */}
            <motion.div
                className="relative w-80 h-60 cursor-pointer"
                style={{ perspective: 1200, transformStyle: "preserve-3d" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={toggleFolder}
                initial={false}
                animate={isOpen ? "open" : isHovered ? "peek" : "closed"}
            >

                {/* --- Back of Folder + Tab (Layer -1) --- */}
                {/* Pushed WAY back (-30px) to guarantee no z-fighting with files or cover */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ transform: "translateZ(-30px)", transformStyle: "preserve-3d" }}
                >
                    {/* Tab */}
                    <div
                        className="absolute -top-4 left-0 w-36 h-10 bg-[#2b2b2b] rounded-t-xl shadow-sm transition-colors duration-300"
                        style={{
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), inset 1px 0 0 rgba(255,255,255,0.05), inset -1px 0 0 rgba(255,255,255,0.05)"
                        }}
                    />

                    {/* Back Plate */}
                    <div
                        className="absolute inset-0 bg-linear-to-b from-[#333] to-[#1a1a1a] rounded-[24px] shadow-2xl overflow-hidden transition-all duration-300"
                        style={{
                            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)" // Replaced border with shadow
                        }}
                    >
                        {/* Subtle Texture */}
                        <div className="absolute inset-0 opacity-20 bg-linear-to-br from-white/10 to-transparent" />
                    </div>
                </div>

                {/* --- The Files (Layer 0) --- */}
                {/* They sit at Z=0, safely sandwiched between back (-30) and front (+30) */}
                <div
                    className="absolute inset-x-0 bottom-5 h-32 z-10 flex items-end justify-center pointer-events-none"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* File 1 (Left) */}
                    <motion.div
                        custom={0}
                        variants={fileVariants}
                        className="absolute w-48 h-44 bg-[#2a2a2a] rounded-xl shadow-lg origin-bottom flex overflow-hidden border border-transparent"
                        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)" }} // Replaced border
                    >
                        <FileSkeleton1 />
                    </motion.div>

                    {/* File 2 (Center) */}
                    <motion.div
                        custom={1}
                        variants={fileVariants}
                        className="absolute w-48 h-44 bg-[#262626] rounded-xl shadow-lg origin-bottom flex overflow-hidden border border-transparent"
                        style={{ zIndex: 10, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)" }} // Replaced border
                    >
                        <FileSkeleton2 />
                    </motion.div>

                    {/* File 3 (Right) */}
                    <motion.div
                        custom={2}
                        variants={fileVariants}
                        className="absolute w-48 h-44 bg-[#303030] rounded-xl shadow-lg origin-bottom flex overflow-hidden border border-transparent"
                        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)" }} // Replaced border
                    >
                        <FileSkeleton3 />
                    </motion.div>
                </div>

                {/* --- Front of Folder (Layer +1) --- */}
                {/* Animated Motion Div for the Cover */}
                {/* Crucial: It operates in its own Z-plane starting at +30px */}
                <motion.div
                    variants={frontVariants}
                    className="absolute inset-0 z-50 rounded-[24px] pointer-events-none"
                    style={{
                        transformOrigin: "bottom",
                        transformStyle: "preserve-3d",
                        backfaceVisibility: "hidden", // Optimizes rendering
                        willChange: "transform",
                        outline: "1px solid transparent" // FORCE ANTI-ALIASING on 3D edges
                    }}
                >
                    {/* Glass Gradient & Blur */}
                    <div
                        className="absolute inset-0 bg-linear-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md rounded-[24px]"
                        style={{
                            // Replaced standard border with box-shadow for smooth edges in 3D
                            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.4)"
                        }}
                    >

                        {/* Realistic Specular Sheen (Top Edge) */}
                        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-70" />

                        {/* Inner Depth Shadow (Bottom) */}
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent rounded-b-[24px]" />

                        {/* Surface Shine */}
                        <div className="absolute -inset-full top-0 block bg-gradient-to-br from-transparent via-white/5 to-transparent skew-x-12 opacity-20 pointer-events-none" />

                    </div>
                </motion.div>

            </motion.div>

            {/* UI Hint */}
            <div className="fixed bottom-12 text-gray-500 font-medium text-xs tracking-widest uppercase opacity-60">
                Hover to Peek • Click to Interact
            </div>

        </div>
    );
};

export default GlassyFolder;`;
const VoiceConversationCode = `import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic } from "lucide-react";

export default function VoiceConversation() {
    const [isListening, setIsListening] = useState(false);

    // Auto-revert logic
    useEffect(() => {
        let timer;
        if (isListening) {
            timer = setTimeout(() => {
                setIsListening(false);
            }, 4000);
        }
        return () => clearTimeout(timer);
    }, [isListening]);

    const smoothSpring = {
        type: "spring",
        stiffness: 180,
        damping: 30,
        mass: 1,
    };

    return (
        <div className="flex w-full h-full items-center justify-center overflow-hidden font-sans relative">
            <svg className="absolute hidden">
                <defs>
                    <filter id="goo-professional">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 19 -9"
                            result="goo"
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            <div className="relative flex items-center justify-center w-full">

                {/* --- GOOEY BACKGROUND LAYER --- */}
                <div
                    className="relative flex items-center justify-center"
                    style={{ filter: "url(#goo-professional)" }}
                >
                    {/* Input Field Background - Grey */}
                    <motion.div
                        className="h-16 w-[420px] bg-gray-200 dark:bg-zinc-800 shadow-sm z-10"
                        style={{ borderRadius: 9999 }}
                    />
                    {/* Button Background - Grey (Matches Input) */}
                    <motion.div
                        className="absolute bg-gray-200 dark:bg-zinc-800 rounded-full z-20 cursor-pointer"
                        initial={false}
                        animate={{
                            x: isListening ? 265 : 176,
                            width: isListening ? 64 : 48,
                            height: isListening ? 64 : 48,
                        }}
                        layout
                        transition={smoothSpring}
                        onClick={() => setIsListening(true)}
                    />
                </div>

                {/* --- CONTENT LAYER (Sharp/No Blur) --- */}
                <div className="absolute pointer-events-none flex items-center justify-center w-full h-full">

                    {/* Text Container */}
                    <div className="absolute w-[420px] flex items-center pl-8">
                        <AnimatePresence mode="wait">
                            {isListening ? (
                                <motion.span
                                    key="listening"
                                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    // Black text for Active state
                                    className="text-lg font-medium text-black dark:text-white"
                                >
                                    Listening...
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="ask"
                                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    // Dark Gray/Black text for Idle state
                                    className="text-lg font-medium text-gray-900 dark:text-white"
                                >
                                    Ask anything...
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Button Content (Icons) */}
                    <motion.div
                        className="absolute flex items-center justify-center pointer-events-auto cursor-pointer text-black dark:text-white"
                        onClick={() => setIsListening(true)}
                        initial={false}
                        animate={{
                            x: isListening ? 265 : 176,
                            width: isListening ? 64 : 48,
                            height: isListening ? 64 : 48,
                        }}
                        transition={smoothSpring}
                        // Neutral shadow
                        style={{
                            filter: isListening ? "drop-shadow(0 10px 15px rgba(0,0,0, 0.1))" : "none"
                        }}
                    >
                        <AnimatePresence mode="wait">
                            {isListening ? (
                                <Waveform key="wave" />
                            ) : (
                                <motion.div
                                    key="mic"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Mic size={24} strokeWidth={2} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                </div>
            </div>

            <div className="absolute bottom-12 text-gray-400 text-sm font-medium tracking-wide opacity-60">
                TAP TO INTERACT
            </div>
        </div>
    );
}

// --- Waveform Animation Component ---
const Waveform = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-[4px] h-4"
        >
            {[1, 2, 3, 4].map((index) => (
                <motion.div
                    key={index}
                    className="w-[3px] bg-black dark:bg-white rounded-full"
                    animate={{
                        height: [8, 16 + Math.random() * 10, 8],
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                        delay: index * 0.1,
                    }}
                />
            ))}
        </motion.div>
    );
};

const DynamicIsland = \`"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    Globe,
    Github,
    Linkedin,
    Mail,
    Sparkles,
    Code2,
    X, // This is the close icon (cross)
} from "lucide-react";

  // --- Assets ---
  const AVATAR_URL =
    "https://pbs.twimg.com/profile_images/2004813445838127104/8Go0jvZt_400x400.jpg";

  // Custom X (formerly Twitter) Logo Component
  const XLogo = ({ size = 20, className = "" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );

  export default function DynamicIsland() {
    const [isExpanded, setIsExpanded] = useState(false);
    // We manage overflow state explicitly to prevent animation glitches.
    const [overflowState, setOverflowState] = useState("hidden");
    const containerRef = useRef(null);

    // Helper to close cleanly
    const handleClose = (e) => {
      e?.stopPropagation();
      setOverflowState("hidden"); // Instantly clip content before shrinking
      setIsExpanded(false);
    };

    // Close when clicking outside
    useEffect(() => {
      function handleClickOutside(event) {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target)
        ) {
          handleClose();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // --- Animation Config ---
    const springTransition = {
      type: "spring",
      damping: 25,
      stiffness: 320,
      mass: 0.8,
    };

    return (
       <div className="flex items-center justify-center p-6 font-sans antialiased">
            <div
                className="relative w-full max-w-lg flex justify-center h-[300px] items-center"
                ref={containerRef}
            >
                <motion.div
                    layout
                    onClick={() => {
                        if (!isExpanded) setIsExpanded(true);
                    }}
                    // Only enable overflow-visible when the expansion is totally complete
                    onLayoutAnimationComplete={() => {
                        if (isExpanded) setOverflowState("visible");
                    }}
                    className={\`
                relative cursor-pointer bg-black text-white
                \${isExpanded ? "rounded-[32px]" : "rounded-full"}
          \`}
                animate={{
                    boxShadow: isExpanded
                        ? "0px 24px 60px -12px rgba(0,0,0,0.5)"
                        : "0px 10px 30px -10px rgba(0,0,0,0.3)",
                }}
                transition={springTransition}
                style={{
                    width: isExpanded ? 360 : 130,
                    height: isExpanded ? 220 : 48,
                    overflow: overflowState, // Dynamic overflow control
                }}
        >
                <AnimatePresence mode="popLayout">
                    {/* --- COLLAPSED STATE --- */}
                    {!isExpanded && (
                        <motion.div
                            key="collapsed"
                            initial={{ opacity: 0, filter: "blur(4px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, filter: "blur(4px)" }}
                            transition={{ duration: 0.15 }}
                            className="absolute inset-0 flex items-center justify-between px-1.5"
                        >
                            <div className="flex items-center gap-3">
                                <motion.img
                                    layoutId="avatar"
                                    src={AVATAR_URL}
                                    alt="Avatar"
                                    className="w-9 h-9 rounded-full object-cover"
                                />
                                <motion.span
                                    layoutId="name"
                                    className="text-[14px] font-semibold tracking-tight text-white"
                                >
                                    Tushar
                                </motion.span>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                transition={{ delay: 0.1 }}
                                className="pr-2 text-neutral-500"
                            >
                                <Sparkles size={12} fill="currentColor" />
                            </motion.div>
                        </motion.div>
                    )}

                    {/* --- EXPANDED STATE --- */}
                    {isExpanded && (
                        <motion.div
                            key="expanded"
                            initial={{ opacity: 0, filter: "blur(4px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            exit={{
                                opacity: 0,
                                filter: "blur(4px)",
                                transition: { duration: 0.1 },
                            }}
                            className="flex flex-col w-full h-full p-6"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-4">
                                    <motion.img
                                        layoutId="avatar"
                                        src={AVATAR_URL}
                                        alt="Avatar"
                                        className="w-14 h-14 rounded-full object-cover shadow-lg"
                                    />
                                    <div className="flex flex-col pt-1">
                                        <motion.h2
                                            layoutId="name"
                                            className="text-xl font-bold leading-none tracking-tight"
                                        >
                                            Tushar
                                        </motion.h2>
                                        <motion.span
                                            initial={{ opacity: 0, y: 5, filter: "blur(4px)" }}
                                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                            transition={{ delay: 0.1 }}
                                            className="text-neutral-400 text-xs font-medium mt-1.5 flex items-center gap-1"
                                        >
                                            <Code2 size={12} /> Design Engineer
                                        </motion.span>
                                    </div>
                                </div>
                            </div>

                            {/* Short Bio */}
                            <motion.p
                                initial={{ opacity: 0, y: 5, filter: "blur(4px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ delay: 0.15 }}
                                className="text-neutral-300 text-[13px] leading-relaxed mt-2 mb-6"
                            >
                                Obsessed with micro-interactions and minimal UI. Building
                                digital products that feel like magic.
                            </motion.p>

                            {/* Minimal Links */}
                            <motion.div
                                className="grid grid-cols-5 gap-2 mt-auto"
                                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ delay: 0.2 }}
                            >
                                <IconLink icon={<Globe size={20} />} label="Site" />
                                <IconLink icon={<Github size={20} />} label="Git" />
                                <IconLink icon={<XLogo size={18} />} label="X" />
                                <IconLink icon={<Linkedin size={20} />} label="In" />
                                <IconLink icon={<Mail size={20} />} label="Mail" />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    </div>
  );
}

// Icon Button with Tooltip
function IconLink({ icon, label }) {
    return (
        <motion.div
            className="relative flex flex-col items-center justify-center group cursor-pointer"
            whileHover="hover"
            initial="rest"
            whileTap="tap"
        >
            {/* Tooltip Label */}
            <motion.div
                variants={{
                    hover: { opacity: 1, y: -4, scale: 1 },
                    rest: { opacity: 0, y: 0, scale: 0.95 },
                }}
                transition={{ duration: 0.2 }}
                className="absolute -top-9 px-2.5 py-1 bg-neutral-800 text-white text-[10px] font-medium rounded-lg tracking-wide whitespace-nowrap pointer-events-none border border-neutral-700/50 z-50"
            >
                {label}
                {/* Tiny Arrow */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-800 rotate-45 border-r border-b border-neutral-700/50" />
            </motion.div>

            {/* Icon Container */}
            <motion.div
                variants={{
                    hover: { y: -2 },
                    tap: { scale: 0.9 },
                }}
                className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center text-neutral-400 group-hover:bg-neutral-800 group-hover:text-white transition-colors duration-300"
            >
                {icon}
            </motion.div>
        </motion.div>
    );
}
};`;

export const componentsList = [
    {
        id: 'ask-ai',
        title: 'Ask AI Interaction',
        description: 'A polished AI chat interface with "jelly" processing states, markdown rendering, and source citations.',
        component: <AskAI />,
        code: AskAICode,
        category: 'UI Components',
        install: 'npm install motion lucide-react',
        usage: `import AskAI from './AskAI';

// Usage
<div className="h-[600px] w-full bg-white relative">
  <AskAI />
</div>`
    },
    {
        id: 'voice-ui',
        title: 'Voice UI Liquid Morph',
        description: 'A fluid, morphing voice interface visualization that reacts to state changes.',
        component: <VoiceConversation />,
        code: VoiceConversationCode,
        category: 'UI Components',
        install: 'npm install motion lucide-react',
        usage: `import VoiceConversation from './VoiceConversation';

// Usage
<VoiceConversation />`
    },
    {
        id: 'glassy-folder',
        title: '3D Glassy Folder',
        description: 'A beautiful 3D folder component with glassmorphism effects and smooth opening animations.',
        component: <GlassyFolder />,
        code: GlassyFolderCode,
        category: 'UI Components',
        install: 'npm install motion',
        usage: `import GlassyFolder from './GlassyFolder';

// Usage
<div className="flex items-center justify-center h-screen bg-neutral-900">
  <GlassyFolder />
</div>`
    },
    {
        id: 'peeling-checkbox',
        title: 'Peeling Checkbox',
        description: 'A playful checkbox that peels off like a sticker when unchecked.',
        component: <PeelingCheckbox />,
        code: PeelingCheckboxCode,
        category: 'Interactions',
        install: 'npm install motion',
        usage: `import PeelingCheckbox from './PeelingCheckbox';

// Usage
<PeelingCheckbox defaultChecked={false} />`
    },
    {
        id: 'file-tree',
        title: 'VS Code File Tree',
        description: 'A recursive file tree component resembling VS Code explorer with expandable folders.',
        component: <FileTree />,
        code: FileTreeCode,
        category: 'Data Display',
        install: 'npm install motion lucide-react',
        usage: `import FileTree from './FileTree';

// Usage
<FileTree />`
    },
    {
        id: 'click-sparkles',
        title: 'Click Sparkles',
        description: 'A burst of colorful sparkles that appear on click, perfect for adding delight to interactions.',
        component: <ClickSparkles />,
        code: ClickSparklesCode,
        category: 'Backgrounds',
        install: 'npm install motion',
        usage: `import ClickSparkles from './ClickSparkles';

// Usage
<div className="relative w-full h-[400px]">
    <ClickSparkles />
    {/* Other content */}
</div>`
    },
    {
        id: 'dynamic-island',
        title: 'Dynamic Island',
        description: 'An interactive, expanding pill that morphs into a detailed card, inspired by iOS Dynamic Island.',
        component: <DynamicIsland />,
        code: DynamicIsland,
        category: 'UI Components',
        install: 'npm install motion lucide-react',
        usage: `import DynamicIsland from './DynamicIsland';

// Usage
<div className="w-full flex justify-center pt-10">
    <DynamicIsland />
</div>`
    }
];
