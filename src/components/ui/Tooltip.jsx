import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const Tooltip = ({ text, content, underline = true, children }) => {
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
        <div
            ref={triggerRef}
            className="relative inline-flex group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children ? children : (
                <span
                    className={`cursor-help font-medium transition-colors duration-300 ${underline
                        ? 'border-b border-gray-300 dark:border-gray-700 border-dashed hover:border-gray-900 dark:hover:border-gray-100 text-gray-900 dark:text-gray-100'
                        : 'text-gray-900 dark:text-gray-100'
                        }`}
                >
                    {text}
                </span>
            )}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: position === 'top' ? 8 : -8, filter: "blur(4px)" }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.95, y: position === 'top' ? 8 : -8, filter: "blur(4px)" }}
                        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }} // Premium "Apple-like" eased curve
                        className={`absolute left-1/2 -translate-x-1/2 w-max max-w-[320px] z-100 ${position === 'top' ? 'bottom-full mb-3' : 'top-full mt-3'}`}
                    >
                        {/* 
                           PREMIUM INVERTED DESIGN:
                           - Light Mode: Dark (Zinc 900) for contrast against white page.
                           - Dark Mode: Light (White) for contrast against dark page.
                        */}
                        <div className="relative px-3 py-2 rounded-xl bg-zinc-900 dark:bg-white border border-transparent dark:border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)]">
                            <div className="text-xs font-medium text-white dark:text-zinc-900 antialiased">
                                {content}
                            </div>
                        </div>

                        {/* Solid Arrow - Centered Bottom */}
                        <div
                            className={`absolute w-3 h-3 rotate-45 transform bg-zinc-900 dark:bg-white border border-transparent dark:border-white/10 z-0 left-1/2 -translate-x-1/2 ${position === 'top'
                                ? '-bottom-[5px] border-t-0 border-l-0' // Arrow points down
                                : '-top-[5px] border-b-0 border-r-0'   // Arrow points up
                                }`}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Tooltip;