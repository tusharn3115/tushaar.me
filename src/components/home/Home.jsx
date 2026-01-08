
import React from 'react';
import { motion } from 'motion/react';

// --- Components ---
import Header from '../header/Header';
import GitHubSection from '../github/GitHubSection';
import Projects from '../projects/Projects';
import ComponentsGallery from '../gallery/ComponentsGallery';
import Experience from '../experience/Experience';
import Contact from '../contact/Contact';
import Footer from '../footer/Footer';
import QuoteSection from '../footer/QuoteSection';
import SectionHeading from '../ui/SectionHeading';
import TechStack from './TechStack';
import { Helmet } from 'react-helmet-async';

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
            <Helmet>
                <title>Tushar Negi — Creative Developer & UI Engineer</title>
                <meta name="description" content="I build accessible, pixel-perfect web experiences. Explore my projects, open-source contributions, and engineering journey." />
            </Helmet>

            {/* 1. Header Section (Banner + Profile) */}
            <motion.div variants={itemVariants}>
                <Header />
            </motion.div>

            {/* 2. Experience Section */}
            <motion.div variants={itemVariants}>
                <Experience />
            </motion.div>

            {/* 3. Projects (Selected Works) */}
            <motion.div variants={itemVariants}>
                <Projects />
            </motion.div>

            {/* 4. Components Section (Micro-interactions) */}
            <motion.div variants={itemVariants}>
                <ComponentsGallery />
            </motion.div>

            {/* 5. GitHub Section */}
            <motion.div variants={itemVariants}>
                {/* <SectionHeading>Engineering Activity</SectionHeading> */}
                <GitHubSection />
            </motion.div>

            {/* 6. Tech Stack */}
            <motion.div variants={itemVariants}>
                <TechStack />
            </motion.div>

            {/* 7. Contact Section */}
            <motion.div variants={itemVariants}>
                <Contact />
            </motion.div>

            {/* Footer */}
            <motion.div variants={itemVariants}>
                <QuoteSection />
                <Footer />
            </motion.div>

        </motion.div>
    );
};

export default Home;

