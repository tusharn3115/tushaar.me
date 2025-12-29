
import React from 'react';
import { motion } from 'framer-motion';

// --- Components ---
import Header from './components/header/Header';
import GitHubSection from './components/github/GitHubSection';
import Projects from './components/projects/Projects';
import ComponentsGallery from './components/gallery/ComponentsGallery';
import Experience from './components/experience/Experience';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import SectionHeading from './components/ui/SectionHeading';

// --- Main Application ---
export default function Portfolio() {
  return (
    <>
      <div className="min-h-screen bg-[#FDFCF8] text-gray-600 font-inter selection:bg-gray-900 selection:text-white pb-32 noise-bg">

        {/* Refined decorative top blur */}
        <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#FDFCF8] via-[#FDFCF8]/90 to-transparent z-20 pointer-events-none backdrop-blur-[1px]" />

        <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-24 relative z-10">

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="space-y-20"
          >

            {/* 1. Header Section (Banner + Profile) */}
            <Header />

            {/* 2. GitHub Section */}
            <motion.section variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <SectionHeading>Engineering Activity</SectionHeading>
              <GitHubSection />
            </motion.section>

            {/* 3. Projects (FAQ Style) */}
            <Projects />

            {/* 4. Components Section */}
            <ComponentsGallery />

            {/* 5. Recent Roles Timeline */}
            <Experience />

            {/* 6. Contact Section */}
            <Contact />

            {/* Footer */}
            <Footer />

          </motion.div>
        </main>
      </div>
    </>
  );
}