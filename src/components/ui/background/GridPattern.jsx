import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../../context/ThemeContext';

const GridPattern = () => {
    const canvasRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let time = 0;

        // Configuration
        const dotSpacing = 30; // Space between dots
        const dotSize = 1.5;   // Radius of dots
        const wobbleRange = 2; // How far they move (pixels)
        const wobbleSpeed = 0.002; // How fast they move

        // Theme colors
        const getDotColor = () => theme === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.1)';

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = getDotColor();

            // Create a slightly larger grid than necessary to cover edges during wobble
            const rows = Math.ceil(canvas.height / dotSpacing) + 2;
            const cols = Math.ceil(canvas.width / dotSpacing) + 2;

            for (let i = -1; i < rows; i++) {
                for (let j = -1; j < cols; j++) {
                    const x = j * dotSpacing;
                    const y = i * dotSpacing;

                    // Calculate wobble offset
                    // Using distinct frequencies for x and y to create organic movement
                    // Adding spatial variation (i, j) so they don't move in unison
                    const offsetX = Math.sin(time + i * 0.5) * Math.cos(time * 0.5 + j) * wobbleRange;
                    const offsetY = Math.cos(time + j * 0.5) * Math.sin(time * 0.5 + i) * wobbleRange;

                    ctx.beginPath();
                    ctx.arc(x + offsetX, y + offsetY, dotSize, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            time += wobbleSpeed;
            animationFrameId = requestAnimationFrame(draw);
        };

        // Initialize
        window.addEventListener('resize', resize);
        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]); // Re-init when theme changes

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[-2]"
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default GridPattern;
