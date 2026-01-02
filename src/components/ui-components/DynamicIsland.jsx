"use client";

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
                    className={`
            relative cursor-pointer bg-black text-white
            ${isExpanded ? "rounded-[32px]" : "rounded-full"}
          `}
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

                                    {/* Close Icon (Optional) */}
                                    {/*<div
                    onClick={handleClose}
                    className="p-2 bg-neutral-900 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </div>*/}
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