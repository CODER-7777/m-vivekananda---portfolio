import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { BackgroundAnimation } from './components/BackgroundAnimation';
import { CustomCursor } from './components/CustomCursor';
import { ParticleTransitions } from './components/ParticleTransitions';
import { CodeRain } from './components/CodeRain';
import { ShaderBackground } from './components/ShaderBackground';
import { ThemeSwitcher, Theme } from './components/ThemeSwitcher';
import { Terminal } from './components/Terminal';
import { KonamiCode } from './components/KonamiCode';

import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { ARPage } from './pages/AR';

import './styles/themes.css';

function App() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('dark');
  const [showCodeRain, setShowCodeRain] = useState(true);
  const [showShaders, setShowShaders] = useState(false); // Disabled by default for performance

  const handleKonamiActivation = () => {
    setCurrentTheme('retro');
  };

  return (
    <Router>
      <div className="bg-[#050414] min-h-screen text-white selection:bg-pink-500 selection:text-white cursor-none overflow-x-hidden relative">
        {/* Background Effects - Layer Order Matters! */}
        <ParticleTransitions />
        {showCodeRain && <CodeRain />}
        {showShaders && <ShaderBackground />}

        {/* Interactive Components */}
        <CustomCursor />
        <ThemeSwitcher onThemeChange={setCurrentTheme} value={currentTheme} />
        <Terminal />
        <KonamiCode onActivate={handleKonamiActivation} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ar" element={<ARPage />} />
        </Routes>

        {/* Footer */}
        <footer className="py-12 bg-[#02020a] border-t border-white/5 text-center relative z-10 mt-auto">
          <div className="flex justify-center gap-8 mb-8 text-sm font-medium text-gray-400">
            <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <Link to="/contact" className="hover:text-purple-400 transition-colors">Contact</Link>
          </div>
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} M Vivekananda.All rights reserved.
          </p>
          <p className="text-gray-700 text-xs mt-2">
            Try Konami Code: ↑↑↓↓←→←→BA | Press Ctrl+` for Terminal
          </p>
        </footer>


      </div>
    </Router>
  );
}

export default App;