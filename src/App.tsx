import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Work from './pages/Work';
import Contact from './pages/Contact';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioProvider } from './context/PortfolioContext';
import ThemeToggle from './components/ThemeToggle';
import EditorToolbar from './components/EditorToolbar';

// Check if we're in viewer mode (deployed portfolio without editor)
const isViewerMode = import.meta.env.VITE_VIEWER_MODE === 'true';

function App() {
  return (
    <PortfolioProvider>
      <ThemeProvider>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative">
          {/* Editor Toolbar - only show in editor mode */}
          {!isViewerMode && <EditorToolbar />}

          {/* Theme Toggle */}
          <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
            <ThemeToggle />
          </div>

          <main className={`flex-grow px-4 md:px-8 max-w-7xl mx-auto w-full relative z-10 ${!isViewerMode ? 'pt-16' : ''}`}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Work />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </ThemeProvider>
    </PortfolioProvider>
  );
}

export default App;
