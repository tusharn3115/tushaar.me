import React, { useState } from 'react';
import { motion } from "motion/react";

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
            y: -40 - (index * 5),
            rotate: index === 0 ? -4 : index === 2 ? 4 : 0,
            scale: 1.02,
            z: 0,
            transition: { type: "spring", stiffness: 300, damping: 25 }
        }),
        open: (index) => ({
            y: -85,
            x: index === 0 ? -70 : index === 2 ? 70 : 0,
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
        <div className="w-full h-full flex items-center justify-center p-4 select-none font-sans perspective-[1200px]">

            {/* 3D Scene Container */}
            {/* Reduced width from w-60 to w-48, height from h-48 to h-40 */}
            <motion.div
                className="relative w-48 h-40 cursor-pointer"
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
                    {/* Tab - Reduced width from w-28 to w-20 */}
                    <div
                        className="absolute -top-4 left-0 w-20 h-10 bg-[#2b2b2b] rounded-t-xl shadow-sm transition-colors duration-300"
                        style={{
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), inset 1px 0 0 rgba(255,255,255,0.05), inset -1px 0 0 rgba(255,255,255,0.05)"
                        }}
                    />

                    {/* Back Plate */}
                    <div
                        className="absolute inset-0 bg-linear-to-b from-[#333] to-[#1a1a1a] rounded-[24px] overflow-hidden transition-all duration-300"
                        style={{
                            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.05)" // Manual smoother shadow
                        }}
                    >
                        {/* Subtle Texture */}
                        <div className="absolute inset-0 opacity-20 bg-linear-to-br from-white/10 to-transparent" />
                    </div>
                </div>

                {/* --- The Files (Layer 0) --- */}
                {/* They sit at Z=0, safely sandwiched between back (-30) and front (+30) */}
                <div
                    className="absolute inset-x-0 bottom-5 h-24 z-10 flex items-end justify-center pointer-events-none"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* File 1 (Left) - Reduced w-36 to w-28, h-32 to h-24 */}
                    <motion.div
                        custom={0}
                        variants={fileVariants}
                        className="absolute w-28 h-24 bg-[#2a2a2a] rounded-xl shadow-md origin-bottom flex overflow-hidden border border-transparent"
                        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)" }} // Replaced border
                    >
                        <FileSkeleton1 />
                    </motion.div>

                    {/* File 2 (Center) */}
                    <motion.div
                        custom={1}
                        variants={fileVariants}
                        className="absolute w-28 h-24 bg-[#262626] rounded-xl shadow-md origin-bottom flex overflow-hidden border border-transparent"
                        style={{ zIndex: 10, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)" }} // Replaced border
                    >
                        <FileSkeleton2 />
                    </motion.div>

                    {/* File 3 (Right) */}
                    <motion.div
                        custom={2}
                        variants={fileVariants}
                        className="absolute w-28 h-24 bg-[#303030] rounded-xl shadow-md origin-bottom flex overflow-hidden border border-transparent"
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
                            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.2)"
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
            {/* <div className="fixed bottom-12 text-gray-500 font-medium text-xs tracking-widest uppercase opacity-60">
                Hover to Peek • Click to Interact
            </div> */}

        </div>
    );
};

export default GlassyFolder;
