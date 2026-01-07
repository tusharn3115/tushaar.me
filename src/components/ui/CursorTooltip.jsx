import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const CursorTooltip = ({ title }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [mounted, setMounted] = useState(false);

    // Smooth out the movement
    // Increased damping slightly to prevent overshoot
    const springConfig = { damping: 20, stiffness: 150 };
    const sx = useSpring(mouseX, springConfig);
    const sy = useSpring(mouseY, springConfig);

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    if (!mounted) return null;

    return createPortal(
        <motion.div
            style={{
                translateX: sx,
                translateY: sy,
                pointerEvents: 'none', // Critical so it doesn't block hover events
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 9999, // Ensure it's on top of everything
            }}
            className="flex items-center justify-center pointer-events-none"
        >
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: title ? 1 : 0,
                    opacity: title ? 1 : 0
                }}
                className="px-4 py-2 bg-white/90 dark:bg-black/90 text-black dark:text-white rounded-full shadow-2xl backdrop-blur-md border border-black/5 dark:border-white/10 translate-x-4 translate-y-4"
            >
                <span className="text-[10px] font-mono whitespace-nowrap uppercase tracking-widest font-semibold">
                    {title}
                </span>
            </motion.div>
        </motion.div>,
        document.body
    );
};

export default CursorTooltip;