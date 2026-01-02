
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
