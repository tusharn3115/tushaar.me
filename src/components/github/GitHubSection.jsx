
import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

const GitHubSection = () => {
    // Generate mock data for the heatmap
    const weeks = 52;
    const days = 7;

    const getLevel = () => {
        const rand = Math.random();
        if (rand > 0.9) return 4; // Highest
        if (rand > 0.7) return 3;
        if (rand > 0.5) return 2;
        if (rand > 0.25) return 1;
        return 0; // Empty
    };

    const getColor = (level) => {
        switch (level) {
            case 4: return 'bg-[#216e39]';
            case 3: return 'bg-[#30a14e]';
            case 2: return 'bg-[#40c463]';
            case 1: return 'bg-[#9be9a8]';
            default: return 'bg-[#ebedf0]';
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Github size={18} className="text-gray-900" />
                    <span className="text-sm font-semibold text-gray-900">Contribution Graph</span>
                </div>
                <div className="text-xs text-gray-500 font-medium">Last Year</div>
            </div>

            {/* Heatmap Grid */}
            <div className="flex gap-[3px] overflow-hidden mask-image-r">
                {Array.from({ length: 32 }).map((_, w) => ( // Showing ~32 weeks for mobile fit
                    <div key={w} className="flex flex-col gap-[3px]">
                        {Array.from({ length: 7 }).map((_, d) => {
                            const level = getLevel();
                            return (
                                <motion.div
                                    key={d}
                                    whileHover={{ scale: 1.3 }}
                                    className={`w-[10px] h-[10px] rounded-[2px] ${getColor(level)} transition-colors`}
                                />
                            )
                        })}
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between mt-4 text-[10px] text-gray-400 font-medium">
                <span>Learn how we count contributions</span>
                <div className="flex items-center gap-1">
                    <span>Less</span>
                    <div className="w-[10px] h-[10px] bg-[#ebedf0] rounded-[2px]" />
                    <div className="w-[10px] h-[10px] bg-[#9be9a8] rounded-[2px]" />
                    <div className="w-[10px] h-[10px] bg-[#40c463] rounded-[2px]" />
                    <div className="w-[10px] h-[10px] bg-[#30a14e] rounded-[2px]" />
                    <div className="w-[10px] h-[10px] bg-[#216e39] rounded-[2px]" />
                    <span>More</span>
                </div>
            </div>
        </div>
    );
};

export default GitHubSection;
