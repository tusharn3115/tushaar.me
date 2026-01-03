
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// --- Components ---
import Navbar from './components/navbar/Navbar';
import Plum from './components/background/Plum';
import Home from './components/home/Home';
import BlogList from './components/blog/BlogList';
import BlogPost from './components/blog/BlogPost';
import ComponentsPage from './components/component-page/ComponentsPage';

import { AnimatePresence, motion } from 'framer-motion';
import CustomCursor from './components/ui/CustomCursor';

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
      {/* <CustomCursor /> */}

      {/* Conditionally render Global Utils */}
      {!isComponentPage && (
        <>
          <Navbar />
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
            className="min-h-screen text-gray-600 dark:text-gray-400 font-inter selection:bg-gray-900 selection:text-white pb-32"
          >
            <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 relative z-10 w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:id" element={<BlogPost />} />
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
