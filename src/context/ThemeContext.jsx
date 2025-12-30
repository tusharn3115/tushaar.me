import React, { createContext, useContext, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                return savedTheme;
            }
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
        }
        return 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = async (e) => {
        // Fallback if browser doesn't support View Transitions
        if (
            !document.startViewTransition ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
            return;
        }

        // Get click position or standard center fallback
        const x = e?.clientX ?? window.innerWidth / 2;
        const y = e?.clientY ?? window.innerHeight / 2;

        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
            flushSync(() => {
                setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
            });
        });

        // Wait for the pseudo-elements to be created
        await transition.ready;

        // Animate the clip-path
        const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
        ];

        // Determine the direction based on current theme (which is about to change)
        const isSwitchingToDark = theme === 'light';

        document.documentElement.animate(
            {
                clipPath: isSwitchingToDark ? clipPath : [...clipPath].reverse(),
            },
            {
                duration: 500,
                easing: 'ease-in-out',
                pseudoElement: isSwitchingToDark ? '::view-transition-new(root)' : '::view-transition-old(root)',
                fill: 'forwards'
            }
        );
    };


    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
