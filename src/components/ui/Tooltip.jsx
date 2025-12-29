import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Tooltip = ({ text, content, underline = true }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState('top'); // 'top' or 'bottom'
    const triggerRef = useRef(null);

    const handleMouseEnter = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const spaceAbove = rect.top;
            // If less than 180px space above, flip to bottom
            if (spaceAbove < 180) {
                setPosition('bottom');
            } else {
                setPosition('top');
            }
        }
        setIsVisible(true);
    };

    return (
        <span
            ref={triggerRef}
            className="relative inline-block group z-50"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsVisible(false)}
        >
            <span className={`cursor-help text-gray-900 font-medium transition-colors duration-300 ${underline ? 'border-b border-gray-400 border-dashed hover:border-gray-900' : ''}`}>
                {text}
            </span>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.9,
                            y: position === 'top' ? 10 : -10,
                            filter: "blur(10px)" // Blur In
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            filter: "blur(0px)" // Clear
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.9,
                            y: position === 'top' ? 10 : -10,
                            filter: "blur(10px)" // Blur Out
                        }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={`absolute left-1/2 -translate-x-1/2 w-max max-w-[280px] px-3 py-2 z-[100] bg-[#09090b] border border-[#27272a] rounded-xl shadow-2xl ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'}`}
                    >
                        {content}

                        {/* Arrow */}
                        <div
                            className={`absolute w-2.5 h-2.5 bg-[#09090b] border border-[#27272a] transform rotate-45 z-[-1] ${position === 'top'
                                ? 'bottom-[-5px] border-t-0 border-l-0 left-1/2 -translate-x-1/2'
                                : 'top-[-5px] border-r-0 border-b-0 left-1/2 -translate-x-1/2'
                                }`}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </span>
    );
};

export default Tooltip;