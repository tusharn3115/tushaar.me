import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const Plum = () => {
    const canvasRef = useRef(null);
    const { theme } = useTheme();
    const [size, setSize] = useState({ width: 0, height: 0 });

    // Configuration
    const r180 = Math.PI;
    const r90 = Math.PI / 2;
    const r15 = Math.PI / 12;
    // Theme-based colors
    const color = theme === 'dark' ? '#bfa094' : '#88888825'; // Lighter/Subtle for dark mode? 
    // Wait, user asked: "change its color for light and dark mode"
    // Dark Mode -> "Light/White lines" usually looks best on black.
    // Light Mode -> "Dark/Gray lines" usually looks best on white.
    // Vue Code used: '#88888825' (Generic gray with opacity)

    // I will use logic inside the effect to pick color based on current theme ref.

    const { random } = Math;
    const MIN_BRANCH = 30;
    const len = 4; // Shorter segments for slower growth visual
    const stopperRef = useRef(null); // To store the requestAnimationFrame ID

    useEffect(() => {
        // Handle Resize
        const updateSize = () => {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener('resize', updateSize);
        updateSize();

        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || size.width === 0 || size.height === 0) return;

        const ctx = canvas.getContext('2d');
        const width = size.width;
        const height = size.height;

        // High DPI setup
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);

        // Styling
        // Light Mode: Subtle dark lines (#888888 with very low opacity 0.05)
        // Dark Mode: Subtle white lines (#ffffff with very low opacity 0.05)
        ctx.strokeStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
        ctx.lineWidth = 1;

        let steps = [];
        let prevSteps = [];

        const step = (x, y, rad, counter = { value: 0 }) => {
            const length = random() * len;
            counter.value += 1;

            const [nx, ny] = polar2cart(x, y, length, rad);

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(nx, ny);
            ctx.stroke();

            const rad1 = rad + random() * r15;
            const rad2 = rad - random() * r15;

            // Out of bounds check
            if (nx < -100 || nx > width + 100 || ny < -100 || ny > height + 100) return;

            const rate = counter.value <= MIN_BRANCH ? 0.8 : 0.5;

            // Left branch
            if (random() < rate) steps.push(() => step(nx, ny, rad1, counter));
            // Right branch
            if (random() < rate) steps.push(() => step(nx, ny, rad2, counter));
        };

        const polar2cart = (x = 0, y = 0, r = 0, theta = 0) => {
            const dx = r * Math.cos(theta);
            const dy = r * Math.sin(theta);
            return [x + dx, y + dy];
        };

        let lastTime = performance.now();
        const interval = 1000 / 30; // 30 FPS for slower, smoother feel

        const frame = () => {
            if (performance.now() - lastTime < interval) {
                stopperRef.current = requestAnimationFrame(frame);
                return;
            }

            prevSteps = steps;
            steps = [];
            lastTime = performance.now();

            if (!prevSteps.length) {
                // Stop if no more steps
                return;
            }

            // Execute steps
            prevSteps.forEach((i) => {
                if (random() < 0.5) steps.push(i);
                else i();
            });

            stopperRef.current = requestAnimationFrame(frame);
        };

        const start = () => {
            ctx.clearRect(0, 0, width, height);
            steps = [
                // Only from Left side (growing right)
                () => step(0, randomMiddle() * height, 0),
                () => step(0, randomMiddle() * height, 0),
                // Only from Right side (growing left)
                () => step(width, randomMiddle() * height, r180),
                () => step(width, randomMiddle() * height, r180),
            ];
            if (width < 500) steps = steps.slice(0, 2);
            frame();
        };

        const randomMiddle = () => random() * 0.6 + 0.2;

        start();

        return () => {
            if (stopperRef.current) cancelAnimationFrame(stopperRef.current);
        };
    }, [size, theme]); // Re-run when size or theme changes

    return (
        <div
            className="fixed inset-0 pointer-events-none z-[-1]"
        // Mask to fade out edges if desired, or center. 
        // The prompt mentioned 'radial-gradient(circle, transparent, black)'
        // In CSS mask-image: transparent part is HIDDEN (cutoff), black part is VISIBLE.
        // So circle transparent at center means -> Hole in the center?
        // "Plum" usually grows from edges inward.
        // I'll leave the mask off for now or use a subtle vignette to fade EDGES.
        // style={{ maskImage: 'radial-gradient(circle, transparent, black)' }} 
        >
            <canvas ref={canvasRef} width={400} height={400} />
        </div>
    );
};

export default Plum;
