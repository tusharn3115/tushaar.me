
import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { roles } from '../../data/portfolioData';

const Experience = () => {
    return (
        <motion.section variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <SectionHeading>Experience</SectionHeading>
            <div className="flex flex-col gap-2">
                {roles.map((role, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.01 }}
                        className="group flex items-center gap-5 py-5 px-4 rounded-xl border border-transparent hover:bg-white hover:border-gray-200/50 hover:shadow-sm transition-all duration-300 cursor-default"
                    >
                        <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-900 font-instrument italic text-xl shadow-sm group-hover:shadow-md transition-all duration-300">
                            {role.logo}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-gray-900 font-semibold tracking-tight font-inter text-base">{role.company}</h3>
                            <p className="text-sm text-gray-500 font-normal">{role.role}</p>
                        </div>
                        <div className="text-xs text-gray-400 font-medium tracking-wide">
                            {role.date}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default Experience;
