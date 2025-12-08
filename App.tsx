import React from 'react';
import { Hero } from './components/Hero';
import { Timeline } from './components/Timeline';
import { Education } from './components/Education';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Leadership } from './components/Leadership';
import { Artwork } from './components/Artwork';
import { AIChat } from './components/AIChat';
import { CustomCursor } from './components/CustomCursor';

function App() {
  return (
    <div className="bg-[#030014] min-h-screen text-white selection:bg-pink-500 selection:text-white cursor-none overflow-x-hidden">
      <CustomCursor />
      <Hero />
      <Education />
      <Timeline />
      <Projects />
      <Artwork />
      <Skills />
      <Leadership />
      
      {/* Footer */}
      <footer className="py-12 bg-zinc-950 border-t border-white/10 text-center relative z-10">
        <p className="text-gray-500">
          © {new Date().getFullYear()} M Vivekananda. Built with React, Tailwind & Gemini API.
        </p>
        <p className="text-xs text-gray-700 mt-2">
           Portfolio data based on Resume/CV.
        </p>
      </footer>

      <AIChat />
    </div>
  );
}

export default App;