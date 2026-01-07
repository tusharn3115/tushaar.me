import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { Github, ArrowUpRight, Loader2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import {
    ContributionGraph,
    ContributionGraphCalendar,
    ContributionGraphBlock
} from '../ui-components/ContributionGraph';

// Tooltip Component using Portal
const PortalTooltip = ({ activity, position }) => {
    if (!activity || !position) return null;

    // Render directly to body to escape all stacking contexts
    return createPortal(
        <div
            className="fixed z-[99999] pointer-events-none"
            style={{
                left: position.x,
                top: position.y,
                transform: 'translate(-50%, -100%) translateY(-10px)',
            }}
        >
            <div className="bg-slate-900 dark:bg-slate-800 text-white text-[10px] py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap flex flex-col items-center border border-slate-700/50">
                <span className="font-bold mb-0.5">{activity.count} contributions</span>
                <span className="text-slate-400 text-[9px] font-medium uppercase tracking-wider">{activity.date}</span>
                {/* Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-slate-900 dark:border-t-slate-800"></div>
            </div>
        </div>,
        document.body
    );
};

const GitHubSection = () => {
    const username = 'tusharn3115';

    const [contributionData, setContributionData] = useState([]);
    const [totalContributions, setTotalContributions] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Tooltip State
    const [hoveredBlock, setHoveredBlock] = useState(null); // { activity, x, y }
    const containerRef = useRef(null);

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

    // DARK MODE THEME (GitHub-like) - Muted Forest
    const darkTheme = {
        textMain: '#f8fafc', // Slate 50
        textSub: '#94a3b8',  // Slate 400
        level0: '#161b22', // Darkest
        level1: '#0d361e', // Deep Forest
        level2: '#1b5e32', // Medium Forest
        level3: '#2ea043', // Typical GitHub Green
        level4: '#4ade80', // Highlight Green
    };

    const theme = currentTheme === 'dark' ? darkTheme : lightTheme;

    const getLevel = (count) => {
        if (count === 0) return 0;
        if (count < 3) return 1;
        if (count < 6) return 2;
        if (count < 10) return 3;
        return 4;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://github-contributions-api.deno.dev/${username}.json`);
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();

                // Transform data for ContributionGraph
                const flatData = data.contributions.flat().map(day => ({
                    date: day.date,
                    count: day.contributionCount,
                    level: getLevel(day.contributionCount)
                }));

                setContributionData(flatData);
                setTotalContributions(data.totalContributions);

            } catch (err) {
                console.error("GitHub Fetch Error:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Tooltip Handlers
    const handleMouseEnter = (e, activity) => {
        const rect = e.target.getBoundingClientRect();
        setHoveredBlock({
            activity,
            x: rect.left + rect.width / 2,
            y: rect.top
        });
    };

    const handleMouseLeave = () => {
        setHoveredBlock(null);
    };

    if (error) return null;

    return (
        <>
            <PortalTooltip
                activity={hoveredBlock?.activity}
                position={hoveredBlock ? { x: hoveredBlock.x, y: hoveredBlock.y } : null}
            />

            <motion.div
                ref={containerRef}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-[900px] mx-auto font-sans relative py-8"
            >
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="flex justify-between items-end mb-12 border-b border-black/5 dark:border-white/5 pb-8"
                >
                    <div className="space-y-1">
                        <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-gray-400 block">
                            Open Source
                        </span>
                        <div className="flex items-baseline gap-3">
                            <h2 className="text-4xl md:text-5xl font-instrument italic font-normal text-gray-900 dark:text-white tracking-tight">
                                GitHub <span className="font-inter not-italic font-light text-gray-500 dark:text-gray-400 text-3xl md:text-4xl">Activity</span>
                            </h2>
                            <span className="text-lg font-mono text-gray-500 dark:text-gray-600 hidden sm:block">@{username}</span>
                        </div>
                    </div>

                    <motion.a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-sm font-semibold transition-all duration-300 group/link pb-1"
                        style={{ color: theme.textMain }}
                    >
                        <span className="relative after:absolute after:bg-current after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300">
                            View Profile
                        </span>
                        <ArrowUpRight size={16} className="text-slate-400 dark:text-slate-500 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-current" />
                    </motion.a>
                </motion.div>

                {loading ? (
                    <div className="h-[150px] flex flex-col items-center justify-center w-full gap-3">
                        <Loader2 className="animate-spin" size={28} style={{ color: currentTheme === 'dark' ? '#39d353' : '#15803d' }} />
                        <span className="text-sm font-medium animate-pulse transition-colors duration-300" style={{ color: currentTheme === 'dark' ? '#26a641' : '#22c55e' }}>Loading history...</span>
                    </div>
                ) : (
                    <div className="w-full flex flex-col items-center relative">
                        <ContributionGraph
                            data={contributionData}
                            totalCount={totalContributions}
                            className="w-full"
                        >
                            <ContributionGraphCalendar
                                blockRadius={2}
                                blockMargin={3}
                            >
                                {({ activity, dayIndex, weekIndex }) => (
                                    <ContributionGraphBlock
                                        activity={activity}
                                        dayIndex={dayIndex}
                                        weekIndex={weekIndex}
                                        onMouseEnter={(e) => handleMouseEnter(e, activity)}
                                        onMouseLeave={handleMouseLeave}
                                        className="cursor-pointer transition-all duration-300 hover:opacity-80"
                                    />
                                )}
                            </ContributionGraphCalendar>

                            {/* Custom Footer */}
                            <div className="flex items-center justify-between mt-6 pt-2 w-full">
                                <span className="text-sm font-medium" style={{ color: theme.textSub }}>
                                    <span className="text-base font-semibold mr-1" style={{ color: theme.textMain }}>
                                        {totalContributions.toLocaleString()}
                                    </span>
                                    contributions in the last year
                                </span>

                                <div className="flex items-center gap-3 text-[10px] font-medium" style={{ color: theme.textSub }}>
                                    <span>Less</span>
                                    <div className="flex gap-[3px] p-1 rounded-full">
                                        <div className="w-[10px] h-[10px] rounded-[2px]" style={{ backgroundColor: theme.level0 }} />
                                        <div className="w-[10px] h-[10px] rounded-[2px]" style={{ backgroundColor: theme.level1 }} />
                                        <div className="w-[10px] h-[10px] rounded-[2px]" style={{ backgroundColor: theme.level2 }} />
                                        <div className="w-[10px] h-[10px] rounded-[2px]" style={{ backgroundColor: theme.level3 }} />
                                        <div className="w-[10px] h-[10px] rounded-[2px]" style={{ backgroundColor: theme.level4 }} />
                                    </div>
                                    <span>More</span>
                                </div>
                            </div>
                        </ContributionGraph>
                    </div>
                )}
            </motion.div>
        </>
    );
};

export default GitHubSection;