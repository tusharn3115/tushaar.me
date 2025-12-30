'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight, Loader2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const GitHubSection = () => {
    const username = 'tusharn3115'; // Your username

    const [contributionData, setContributionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // PREMIUM DARK GREEN THEME
    const { theme: currentTheme } = useTheme();

    // PREMIUM DARK GREEN THEME (Light Mode)
    const lightTheme = {
        textMain: '#0f172a', // Slate 900
        textSub: '#64748b',  // Slate 500
        level0: '#f1f5f9', // Slate 100
        level1: '#86efac', // Green 300
        level2: '#22c55e', // Green 500
        level3: '#15803d', // Green 700
        level4: '#022c22', // Green 950
    };

    // DARK MODE THEME (GitHub-like)
    const darkTheme = {
        textMain: '#f8fafc', // Slate 50
        textSub: '#94a3b8',  // Slate 400
        level0: '#1e293b', // Slate 800
        level1: '#0e4429', // Dark Green
        level2: '#006d32', // Medium Green
        level3: '#26a641', // Bright Green
        level4: '#39d353', // Neon Green
    };

    const theme = currentTheme === 'dark' ? darkTheme : lightTheme;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://github-contributions-api.deno.dev/${username}.json`);
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();

                const weeks = [];
                let currentWeek = [];
                const flatDays = data.contributions.flat();

                flatDays.forEach((day, index) => {
                    currentWeek.push(day);
                    if (currentWeek.length === 7 || index === flatDays.length - 1) {
                        weeks.push(currentWeek);
                        currentWeek = [];
                    }
                });

                const lastYearWeeks = weeks.slice(-38);

                setContributionData({
                    total: data.totalContributions,
                    weeks: lastYearWeeks
                });
            } catch (err) {
                console.error("GitHub Fetch Error:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getColor = (count) => {
        if (count === 0) return theme.level0;
        if (count < 5) return theme.level1;
        if (count < 10) return theme.level2;
        if (count < 20) return theme.level3;
        return theme.level4;
    };



    if (error) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[900px] mx-auto font-sans relative py-8"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
                <div className="flex flex-col gap-1">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-2 text-sm font-medium" style={{ color: theme.textSub }}
                    >
                        <Github size={16} />
                        <span>GitHub Activity</span>
                    </motion.div>
                    <motion.h3
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl font-bold tracking-tight transition-colors duration-300" style={{ color: theme.textMain }}
                    >
                        @{username}
                    </motion.h3>
                </div>

                <motion.a
                    href={`https://github.com/${username}`}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-1 text-sm font-semibold transition-all duration-300 group/link"
                    style={{ color: theme.textMain }}
                >
                    <span className="relative after:absolute after:bg-current after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300">
                        View Profile
                    </span>
                    <ArrowUpRight size={16} className="text-slate-400 dark:text-slate-500 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-current" />
                </motion.a>
            </div>

            {loading ? (
                <div className="h-[150px] flex flex-col items-center justify-center w-full gap-3">
                    <Loader2 className="animate-spin" size={28} style={{ color: theme.level2 }} />
                    <span className="text-sm font-medium animate-pulse transition-colors duration-300" style={{ color: theme.level3 }}>Loading history...</span>
                </div>
            ) : (
                <div className="w-full flex flex-col items-center">

                    <div className="w-full">
                        {/* Month Labels */}
                        <div className="flex text-[10px] font-medium mb-3 ml-8 w-max gap-[3px]" style={{ color: theme.textSub }}>
                            {contributionData?.weeks.map((week, i) => {
                                const firstDay = week[0];
                                const date = new Date(firstDay.date);
                                const month = date.toLocaleString('default', { month: 'short' });

                                // Show label if it's the first week of the month (roughly)
                                const dayOfMonth = date.getDate();
                                const showLabel = dayOfMonth <= 7;

                                return (
                                    <span key={i} className="w-[11px] text-center inline-block">
                                        {showLabel ? month : ''}
                                    </span>
                                );
                            })}
                        </div>

                        <div className="flex gap-[3px] justify-center">
                            {/* Days of Week Labels */}
                            <div className="flex flex-col justify-between gap-[3px] mr-3 mt-[16px] h-[88px] transition-colors duration-300" style={{ color: theme.textSub }}>
                                <span className="text-[9px] h-[10px] leading-[10px]">Mon</span>
                                <span className="text-[9px] h-[10px] leading-[10px]">Wed</span>
                                <span className="text-[9px] h-[10px] leading-[10px]">Fri</span>
                            </div>

                            {/* The Grid */}
                            {contributionData?.weeks.map((week, wIndex) => (
                                <div key={wIndex} className="flex flex-col gap-[3px]">
                                    {week.map((day, dIndex) => {
                                        const bgColor = getColor(day.contributionCount);

                                        return (
                                            <div key={dIndex} className="relative group">
                                                {/* The Square */}
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 260,
                                                        damping: 20,
                                                        delay: wIndex * 0.005 + dIndex * 0.005
                                                    }}
                                                    className={`w-[11px] h-[11px] rounded-[2px] cursor-pointer transition-colors duration-500`}
                                                    style={{ backgroundColor: bgColor }}
                                                />

                                                {/* FIXED TOOLTIP:
                                              1. Removed blur entirely.
                                              2. Uses simple opacity and scale transition.
                                              3. pointer-events-none prevents flickering when moving mouse.
                                              4. z-50 ensures it sits on top of everything.
                                            */}
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none 
                                                            opacity-0 scale-90 translate-y-2 
                                                            group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 
                                                            transition-all duration-200 ease-out origin-bottom">

                                                    <div className="bg-slate-900 dark:bg-slate-800 text-white text-[10px] py-2 px-3 rounded-lg shadow-xl whitespace-nowrap relative flex flex-col items-center">
                                                        <span className="font-bold mb-0.5">{day.contributionCount} contributions</span>
                                                        <span className="text-slate-400 text-[9px] font-medium uppercase tracking-wider">{day.date}</span>

                                                        {/* Tooltip Arrow */}
                                                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-slate-900 dark:border-t-slate-800"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>

                        {/* Footer Legend */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center justify-between mt-6 pt-2"
                        >
                            <span className="text-sm font-medium" style={{ color: theme.textSub }}>
                                <span className="text-base font-semibold mr-1" style={{ color: theme.textMain }}>
                                    {contributionData?.total.toLocaleString()}
                                </span>
                                contributions in the last year
                            </span>

                            <div className="flex items-center gap-3 text-[10px] font-medium" style={{ color: theme.textSub }}>
                                <span>Less</span>
                                <div className="flex gap-[3px] p-1 rounded-full">
                                    <div className="w-[10px] h-[10px] rounded-sm" style={{ backgroundColor: theme.level0 }} />
                                    <div className="w-[10px] h-[10px] rounded-sm" style={{ backgroundColor: theme.level1 }} />
                                    <div className="w-[10px] h-[10px] rounded-sm" style={{ backgroundColor: theme.level2 }} />
                                    <div className="w-[10px] h-[10px] rounded-sm" style={{ backgroundColor: theme.level3 }} />
                                    <div className="w-[10px] h-[10px] rounded-sm" style={{ backgroundColor: theme.level4 }} />
                                </div>
                                <span>More</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default GitHubSection;