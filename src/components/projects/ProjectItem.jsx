
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';

const ProjectItem = ({ project, isOpen, onClick }) => {
    return (
        <motion.div
            layout
            initial={false}
            className={`group border-b border-gray-100 last:border-0 ${isOpen ? 'bg-gray-50/50' : 'bg-transparent'} transition-colors duration-300 rounded-xl overflow-hidden`}
        >
            <motion.button
                layout="position"
                onClick={onClick}
                className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
            >
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-instrument italic transition-all duration-300 ${isOpen ? 'bg-gray-900 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>
                        {project.icon}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 font-inter">{project.title}</h3>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">{project.role}</p>
                    </div>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-400 group-hover:text-gray-900"
                >
                    <ChevronDown size={18} />
                </motion.div>
            </motion.button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        layout="position"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.4, bounce: 0, opacity: { duration: 0.2 } }}
                    >
                        <div className="px-4 pb-6 pt-0 pl-[4.5rem]">
                            <p className="text-sm text-gray-600 leading-relaxed font-light mb-4">
                                {project.description}
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    {project.stack.split('•').map((tech, i) => (
                                        <span key={i} className="text-[10px] px-2 py-1 bg-white border border-gray-200 rounded text-gray-500 font-medium">{tech.trim()}</span>
                                    ))}
                                </div>
                                <div className="h-4 w-[1px] bg-gray-200 mx-1" />
                                <a href="#" className="text-xs font-medium text-gray-900 hover:text-emerald-600 transition-colors flex items-center gap-1">
                                    View Project <ExternalLink size={10} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ProjectItem;
