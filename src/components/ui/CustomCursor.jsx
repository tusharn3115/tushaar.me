
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
    const [isPointer, setIsPointer] = useState(false);
    const [isActive, setIsActive] = useState(false);

    // Use motion values for better performance than state
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for that "premium" feel - adjusted for fluid 'weight'
    const springConfig = { damping: 30, stiffness: 400, mass: 0.4 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveMouse = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const checkHover = (e) => {
            const target = e.target;
            // Check if hovering over clickable elements
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                window.getComputedStyle(target).cursor === 'pointer'
            ) {
                setIsPointer(true);
            } else {
                setIsPointer(false);
            }
        };

        const handleMouseDown = () => setIsActive(true);
        const handleMouseUp = () => setIsActive(false);

        window.addEventListener("mousemove", moveMouse);
        window.addEventListener("mouseover", checkHover);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", moveMouse);
            window.removeEventListener("mouseover", checkHover);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-start"
            style={{
                x,
                y,
            }}
        >
            {/* Mac-style Arrow Cursor */}
            <motion.div
                animate={{
                    scale: isActive ? 0.9 : 1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-sm"
                >
                    <path
                        d="M5.5 3L12 19L14.5 13L20.5 11L5.5 3Z"
                        fill="black"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                    />
                </svg>
            </motion.div>
        </motion.div>
    );
};

export default CustomCursor;
