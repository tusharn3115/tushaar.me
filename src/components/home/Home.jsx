
import React from 'react';
import { motion } from 'framer-motion';

// --- Components ---
import Header from '../header/Header';
import GitHubSection from '../github/GitHubSection';
import Projects from '../projects/Projects';
import ComponentsGallery from '../gallery/ComponentsGallery';
import Experience from '../experience/Experience';
import Contact from '../contact/Contact';
import Footer from '../footer/Footer';
import SectionHeading from '../ui/SectionHeading';
import TechStack from './TechStack';

// --- Home Component ---
const Home = () => {
    // Variants matching BlogList exactly
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-20 max-w-2xl mx-auto"
        >

            {/* 1. Header Section (Banner + Profile) */}
            <motion.div variants={itemVariants}>
                <Header />
            </motion.div>

            {/* 2. GitHub Section */}
            <motion.div variants={itemVariants}>
                <SectionHeading>Engineering Activity</SectionHeading>
                <GitHubSection />
            </motion.div>

            {/* 3. Tech Stack Slider */}
            <motion.div variants={itemVariants}>
                <TechStack />
            </motion.div>

            {/* 4. Experience Section */}
            <motion.div variants={itemVariants}>
                <Experience />
            </motion.div>

            {/* 4. Components Section */}
            <motion.div variants={itemVariants}>
                <ComponentsGallery />
            </motion.div>

            {/* 5. Projects (FAQ Style) */}
            <motion.div variants={itemVariants}>
                <Projects />
            </motion.div>

            {/* 6. Contact Section */}
            <motion.div variants={itemVariants}>
                <Contact />
            </motion.div>

            {/* Footer */}
            <motion.div variants={itemVariants}>
                <Footer />
            </motion.div>

        </motion.div>
    );
};

export default Home;
