import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// ==============================================
// 👇 SPARKLE PARTICLE COMPONENT
// ==============================================
// ==============================================
// 👇 SPARKLE PARTICLE COMPONENT
// ==============================================
export const SparkleParticles = () => {
    // Vibrant colors for sparkles
    const colors = [
        "#00C9A7", // Cyan
        "#845EC2", // Purple
        "#FF9671", // Orange
        "#FFC75F", // Gold
        "#F9F871", // Yellow
        "#ff5e78"  // Pink
    ];

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
            color: colors[Math.floor(Math.random() * colors.length)],
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
                        style={{ filter: `drop-shadow(0 0 3px ${p.color})` }}
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
        <div className="w-full h-full flex flex-col items-center justify-center gap-8 font-sans p-4">

            <div className="relative group">
                <div className="text-black dark:text-white">
                    {/* We use a key to force re-render/re-play animation on click */}
                    <div key={key} className="absolute inset-0 pointer-events-none">
                        <SparkleParticles />
                    </div>

                    <button
                        onClick={() => setKey(prev => prev + 1)}
                        className="relative z-10 px-8 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 rounded-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-all active:scale-95 font-medium shadow-sm hover:shadow-md"
                    >
                        Click for Magic
                    </button>
                </div>
            </div>

            <p className="text-zinc-400 text-xs font-medium tracking-wide uppercase opacity-70">
                Click the button to see colorful sparkles
            </p>
        </div>
    );
}
