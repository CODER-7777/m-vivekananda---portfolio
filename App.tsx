import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BackgroundAnimation } from './components/BackgroundAnimation';
import { CustomCursor } from './components/CustomCursor';

import { Home } from './pages/Home';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="bg-[#050414] min-h-screen text-white selection:bg-pink-500 selection:text-white cursor-none overflow-x-hidden relative">
        <BackgroundAnimation />
        <CustomCursor />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {/* Footer */}
        <footer className="py-12 bg-[#02020a] border-t border-white/5 text-center relative z-10 mt-auto">
          <div className="flex justify-center gap-8 mb-8 text-sm font-medium text-gray-400">
            <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <Link to="/blog" className="hover:text-pink-400 transition-colors">Blog</Link>
            <Link to="/contact" className="hover:text-purple-400 transition-colors">Contact</Link>
          </div>
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} M Vivekananda. Built with React & Tailwind.
          </p>
        </footer>


      </div>
    </Router>
  );
}

export default App;