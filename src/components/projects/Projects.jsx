
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import ProjectItem from './ProjectItem';
import { projects } from '../../data/portfolioData';

const Projects = () => {
    const [openProject, setOpenProject] = useState(0); // Default first one open

    return (
        <motion.section variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <SectionHeading>Projects</SectionHeading>
            <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
                {projects.map((project, index) => (
                    <ProjectItem
                        key={index}
                        project={project}
                        isOpen={openProject === index}
                        onClick={() => setOpenProject(openProject === index ? -1 : index)}
                    />
                ))}
            </div>
        </motion.section>
    );
};

export default Projects;
