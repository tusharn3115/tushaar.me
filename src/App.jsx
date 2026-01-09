
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// --- Components ---
// --- Components ---
import Navbar from './components/layout/Navbar/Navbar';
import Plum from './components/ui/background/Plum';
import GridPattern from './components/ui/background/GridPattern';
import Home from './pages/Home';
import BlogList from './pages/Blog';
import BlogPost from './pages/BlogPost';
import ComponentsPage from './pages/Components';
import AllProjects from './pages/Projects';

import { AnimatePresence, motion } from 'motion/react';
import CustomCursor from './components/ui/CustomCursor';
import SmoothScroll from './components/ui/SmoothScroll';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Layout Wrapper to handle conditional rendering ---
const AppContent = () => {
  const { pathname } = useLocation();
  const isComponentPage = pathname === '/component';

  return (
    <>
      <ScrollToTop />
      {!isComponentPage && <SmoothScroll />}
      {/* <CustomCursor /> */}
      <div className="noise-bg-fixed" />

      {/* Conditionally render Global Utils */}
      {!isComponentPage && (
        <>
          <Navbar />
          {/* <GridPattern /> */}
          <Plum />
        </>
      )}

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {isComponentPage ? (
          // Full Screen Layout for Components Page
          <motion.main
            key="component-layout"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen bg-black text-white"
          >
            <Routes>
              <Route path="/component" element={<ComponentsPage />} />
            </Routes>
          </motion.main>
        ) : (
          // Standard Layout
          <motion.div
            key="standard-layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen text-gray-600 dark:text-gray-400 font-inter selection:bg-gray-900 selection:text-white pb-8"
          >
            <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 relative z-10 w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/projects" element={<AllProjects />} />
              </Routes>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Main Application ---
export default function Portfolio() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
