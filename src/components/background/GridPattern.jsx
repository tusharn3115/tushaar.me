import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const GridPattern = () => {
    const { theme } = useTheme();

    // Use stroke color based on theme
    // Dark mode: very subtle white/gray dots
    // Light mode: very subtle black/gray dots
    const dotColor = theme === 'dark' ? '#ffffff' : '#000000';
    const dotOpacity = 0.05; // Very subtle

    return (
        <div className="fixed inset-0 pointer-events-none z-[-2]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern
                        id="grid-pattern"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                    >
                        <circle cx="2" cy="2" r="1" fill={dotColor} fillOpacity={dotOpacity} />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
        </div>
    );
};

export default GridPattern;
