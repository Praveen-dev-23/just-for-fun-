import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';

// Core UI Components
import CustomCursor from './components/CustomCursor';
import FloatingToolbar from './components/FloatingToolbar';
import CafeScene from './components/CafeScene';

// Overlays
import ProjectMenu from './components/ProjectMenu';
import InfoOverlay from './components/InfoOverlay';
import MenuOverlay from './components/MenuOverlay';

// Lofi Background Loop track (soft, chill ambient loop)
const AUDIO_URL = 'https://assets.mixkit.co/music/preview/mixkit-lo-fi-dreams-1448.mp3';
const CUPS_ORDER = ['aether', 'kronos', 'nebula', 'valo', 'about'];

export default function App() {
  const [lampOn, setLampOn] = useState(true); // Lamp starts ON to illuminate the warm scene
  const [activeProject, setActiveProject] = useState(null); // Clicked cup details receipt
  const [infoOpen, setInfoOpen] = useState(false); // Info modal
  const [menuOpen, setMenuOpen] = useState(false); // Menu modal
  const [musicPlaying, setMusicPlaying] = useState(false); // Lofi state
  
  const audioRef = useRef(null);

  // Initialize and clean up global audio
  useEffect(() => {
    audioRef.current = new Audio(AUDIO_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2; // Keep background music very soft and ambient

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Sync music play state
  const handleToggleMusic = () => {
    if (!audioRef.current) return;

    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setMusicPlaying(true))
        .catch(err => {
          console.warn("Audio blocked by browser autoplay constraints.", err);
          alert("Click anywhere on the screen first, then toggle music.");
        });
    }
  };

  // Nav: cycle left (previous cup)
  const handlePrevCup = () => {
    let currentIndex = CUPS_ORDER.indexOf(activeProject);
    if (currentIndex === -1) {
      // If nothing selected, start from the first cup
      setActiveProject(CUPS_ORDER[0]);
    } else {
      let prevIndex = (currentIndex - 1 + CUPS_ORDER.length) % CUPS_ORDER.length;
      setActiveProject(CUPS_ORDER[prevIndex]);
    }
  };

  // Nav: cycle right (next cup)
  const handleNextCup = () => {
    let currentIndex = CUPS_ORDER.indexOf(activeProject);
    if (currentIndex === -1) {
      setActiveProject(CUPS_ORDER[0]);
    } else {
      let nextIndex = (currentIndex + 1) % CUPS_ORDER.length;
      setActiveProject(CUPS_ORDER[nextIndex]);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#eae4d9] text-[#3d2314] flex flex-col justify-between py-6 px-6 md:px-12 selection:bg-[#3d2314] selection:text-[#eae4d9] overflow-hidden">
      
      {/* Dynamic blending custom cursor */}
      <CustomCursor />

      {/* 1. Header Bar */}
      <header className="relative w-full z-30 flex items-center justify-between py-4 select-none">
        
        {/* Monospace tagline */}
        <span className="font-space text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#3d2314]/75">
          (a café-shaped portfolio)
        </span>

        {/* Cafe Title logo */}
        <h1 className="font-syne text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#3d2314]">
          ALt.
        </h1>

        {/* Audio control pause/play toggle */}
        <button
          onClick={handleToggleMusic}
          className="flex h-9 w-9 items-center justify-center border-2 border-[#3d2314] rounded-lg text-[#3d2314] hover:bg-[#3d2314] hover:text-[#eae4d9] active:scale-95 transition-all cursor-none outline-none focus:outline-none"
          title="Toggle Background Music"
        >
          {musicPlaying ? (
            // Pause symbol (||)
            <span className="font-sans font-bold text-xs">||</span>
          ) : (
            // Play symbol (▶)
            <span className="font-sans font-bold text-xs pl-0.5">▶</span>
          )}
        </button>

      </header>

      {/* 2. Main Cafe Scene Wrapper (Centers the aspect-ratio scene) */}
      <main className="relative flex-1 flex items-center justify-center py-6 w-full max-w-7xl mx-auto z-10">
        
        <div className="w-full h-full flex items-center justify-center">
          <CafeScene 
            lampOn={lampOn} 
            setLampOn={setLampOn}
            selectedProjectId={activeProject}
            onSelectProject={(id) => setActiveProject(id)}
            musicPlaying={musicPlaying}
            onToggleMusic={handleToggleMusic}
          />
        </div>

      </main>

      {/* 3. Awwwards Vertical Nominee Badge on Right Edge */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center bg-white border-y-2 border-l-2 border-[#3d2314] py-4 px-2 w-10 text-[#3d2314] font-mono select-none">
        <span className="font-syne font-extrabold text-base tracking-wider border-b border-[#3d2314] pb-1.5 mb-2">W.</span>
        <span className="text-[8px] font-bold uppercase tracking-[0.25em] writing-mode-vertical rotate-180 py-1 origin-center whitespace-nowrap text-center">
          Nominee
        </span>
      </div>

      {/* 4. Bottom Floating Pill Toolbar */}
      <FloatingToolbar 
        onToggleInfo={() => setInfoOpen(!infoOpen)}
        onToggleMenu={() => setMenuOpen(!menuOpen)}
        onPrevCup={handlePrevCup}
        onNextCup={handleNextCup}
      />

      {/* 5. Animated Overlays */}
      <AnimatePresence>
        
        {/* Project details thermal receipt ticket */}
        {activeProject && (
          <ProjectMenu 
            project={activeProject} 
            onClose={() => setActiveProject(null)} 
          />
        )}

        {/* Blackboard Menu Overlay */}
        {menuOpen && (
          <MenuOverlay 
            isOpen={menuOpen} 
            onClose={() => setMenuOpen(false)} 
            onSelectProject={(id) => setActiveProject(id)}
          />
        )}

        {/* Portfolio Info Overlay */}
        {infoOpen && (
          <InfoOverlay 
            isOpen={infoOpen} 
            onClose={() => setInfoOpen(false)} 
          />
        )}

      </AnimatePresence>

    </div>
  );
}
