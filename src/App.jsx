import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Core UI Components
import CustomCursor from './components/CustomCursor';
import BentoGrid from './components/BentoGrid';

// Scroll-Driven Sections
import ScrollProjects from './sections/ScrollProjects';
import KineticTypo from './sections/KineticTypo';

// Overlays & Modals
import ProjectDetailModal from './components/ProjectDetailModal';
import MenuOverlay from './components/MenuOverlay';

export default function App() {
  const [activeProject, setActiveProject] = useState(null); // Project details modal state
  const [menuOpen, setMenuOpen] = useState(false); // Blackboard menu board toggle state

  return (
    <div className="snap-container select-none">
      
      {/* Dynamic tracking cursor pointer */}
      <CustomCursor />

      {/* Subtle Film Grain Texture Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.015] mix-blend-overlay noise-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
        </svg>
      </div>

      {/* SECTION 1: Bento Dashboard Snap Section */}
      <section className="snap-section flex flex-col justify-between py-6 px-6 md:px-12 bg-[#efedee] border-b border-bento-text/5">
        
        {/* Header Bar */}
        <header className="relative w-full z-30 flex items-center justify-between py-4 select-none">
          {/* Monospace tagline */}
          <span className="font-space text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#111111]/60">
            (a motion developer portfolio)
          </span>

          {/* Center brand title */}
          <h1 className="font-syne text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#111111]">
            ALt.
          </h1>

          {/* Top-right menu list toggle button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-9 w-9 items-center justify-center border-2 border-[#111111] rounded-lg text-[#111111] hover:bg-[#ff3b00] hover:border-[#ff3b00] hover:text-white active:scale-95 transition-all cursor-none outline-none focus:outline-none"
            title="Open Menu Board"
          >
            {/* Pause-like hamburger menu lines */}
            <div className="flex flex-col gap-1 w-4 items-center justify-center">
              <div className="h-[2px] w-full bg-current rounded" />
              <div className="h-[2px] w-full bg-current rounded" />
            </div>
          </button>
        </header>

        {/* Bento grid panel */}
        <div className="flex-1 flex items-center justify-center max-w-7xl mx-auto w-full">
          <BentoGrid onSelectProject={(project) => setActiveProject(project)} />
        </div>

        {/* Vertical Nominee Badge */}
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center bg-[#efedee] border-y border-l border-[#111111]/30 py-4 px-2 w-10 text-[#111111] font-mono select-none rounded-l-xl shadow-sm">
          <span className="font-syne font-extrabold text-base tracking-wider border-b border-[#111111]/15 pb-1.5 mb-2">W.</span>
          <span className="text-[8px] font-bold uppercase tracking-[0.25em] writing-mode-vertical rotate-180 py-1 origin-center whitespace-nowrap text-center">
            Nominee
          </span>
        </div>

      </section>

      {/* SECTION 2: Stacked Scroll Projects (yields 3 snap points) */}
      <ScrollProjects onSelectProject={(project) => setActiveProject(project)} />

      {/* SECTION 3: Kinetic Typography Footer Section (snaps to bottom) */}
      <KineticTypo />

      {/* MODALS & OVERLAYS */}
      <AnimatePresence>
        
        {/* Full-screen Project details slide */}
        {activeProject && (
          <ProjectDetailModal 
            project={activeProject} 
            onClose={() => setActiveProject(null)} 
          />
        )}

        {/* Blackboard Menu Overlay */}
        {menuOpen && (
          <MenuOverlay 
            isOpen={menuOpen} 
            onClose={() => setMenuOpen(false)} 
            onSelectProject={(id) => setActiveProject({ id })}
          />
        )}

      </AnimatePresence>

    </div>
  );
}
