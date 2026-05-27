import React from 'react';
import { motion } from 'framer-motion';
import InteractiveLamp from './InteractiveLamp';
import InteractiveRadio from './InteractiveRadio';
import InteractiveClock from './InteractiveClock';
import InteractiveEspresso from './InteractiveEspresso';

export default function CafeScene({ 
  lampOn, 
  setLampOn, 
  onSelectProject, 
  selectedProjectId,
  musicPlaying,
  onToggleMusic
}) {
  
  // Custom cups definition matching the shelf positions
  const cups = [
    {
      id: 'aether',
      title: 'AETHER',
      shelf: 'top',
      positionClass: 'left-[45px]',
      svg: (
        <svg width="45" height="35" viewBox="0 0 45 35" fill="none" className="line-art group-hover:scale-105 transition-transform duration-300">
          <path d="M5 10 C5 25, 35 25, 35 10 Z" stroke="#3d2314" strokeWidth="2.5" fill="none" />
          <path d="M35 13 C39 13, 39 19, 35 19" stroke="#3d2314" strokeWidth="2" />
          <line x1="10" y1="10" x2="30" y2="10" stroke="#3d2314" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 'kronos',
      title: 'KRONOS',
      shelf: 'top',
      positionClass: 'left-[125px]',
      svg: (
        <svg width="40" height="35" viewBox="0 0 40 35" fill="none" className="line-art group-hover:scale-105 transition-transform duration-300">
          <path d="M8 5 L12 30 L28 30 L32 5 Z" stroke="#3d2314" strokeWidth="2.5" fill="none" />
          <line x1="14" y1="5" x2="16" y2="30" stroke="#3d2314" strokeWidth="1.5" />
          <line x1="20" y1="5" x2="20" y2="30" stroke="#3d2314" strokeWidth="1.5" />
          <line x1="26" y1="5" x2="24" y2="30" stroke="#3d2314" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      id: 'nebula',
      title: 'NEBULA',
      shelf: 'bottom',
      positionClass: 'left-[45px]',
      svg: (
        <svg width="45" height="38" viewBox="0 0 45 38" fill="none" className="line-art group-hover:scale-105 transition-transform duration-300">
          <rect x="10" y="5" width="22" height="28" rx="2" stroke="#3d2314" strokeWidth="2.5" fill="none" />
          <path d="M32 10 C36 10, 36 20, 32 20" stroke="#3d2314" strokeWidth="2" />
          <line x1="10" y1="12" x2="32" y2="12" stroke="#3d2314" strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>
      )
    },
    {
      id: 'valo',
      title: 'VALO',
      shelf: 'bottom',
      positionClass: 'left-[125px]',
      svg: (
        <svg width="40" height="38" viewBox="0 0 40 38" fill="none" className="line-art group-hover:scale-105 transition-transform duration-300">
          <path d="M8 5 C8 20, 32 20, 32 5 Z" stroke="#3d2314" strokeWidth="2.5" fill="none" />
          <line x1="20" y1="20" x2="20" y2="32" stroke="#3d2314" strokeWidth="2.5" />
          <path d="M12 32 L28 32 L25 35 L15 35 Z" stroke="#3d2314" strokeWidth="2.5" fill="#3d2314" />
        </svg>
      )
    },
    {
      id: 'about',
      title: 'ABOUT',
      shelf: 'bottom',
      positionClass: 'left-[200px]',
      svg: (
        <svg width="45" height="35" viewBox="0 0 45 35" fill="none" className="line-art group-hover:scale-105 transition-transform duration-300">
          <path d="M10 8 C10 22, 30 22, 30 8 Z" stroke="#3d2314" strokeWidth="2.5" fill="none" />
          <path d="M10 12 C6 10, 4 16, 10 16" stroke="#3d2314" strokeWidth="2" />
          <path d="M30 12 C34 10, 36 16, 30 16" stroke="#3d2314" strokeWidth="2" />
          <circle cx="20" cy="14" r="2.5" stroke="#3d2314" strokeWidth="1.5" />
        </svg>
      )
    }
  ];

  return (
    <div className="relative w-full max-w-5xl aspect-[16/9] bg-cafe-bg border-b-4 border-cafe-brown flex flex-col justify-end overflow-hidden select-none">
      
      {/* Decorative Grid Lines Overlay (Subtle) */}
      <div className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-[0.05]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-full border-r border-cafe-brown" />
        ))}
      </div>

      {/* Left side window shadow light rays */}
      <div className="absolute left-0 top-0 h-full w-[45%] pointer-events-none z-0">
        <svg viewBox="0 0 300 500" className="w-full h-full opacity-[0.25]">
          <defs>
            <linearGradient id="windowGlow" x1="0" y1="0.5" x2="1" y2="0.5">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Light beams */}
          <polygon points="0,0 80,0 220,500 0,500" fill="url(#windowGlow)" />
          
          {/* Window pane shadows */}
          <rect x="0" y="40" width="12" height="120" fill="#eae4d9" opacity="0.3" />
          <rect x="0" y="180" width="12" height="120" fill="#eae4d9" opacity="0.3" />
        </svg>
      </div>

      {/* Main Counter top shelf line */}
      <div className="absolute bottom-[110px] w-full h-[4px] bg-cafe-brown z-10" />

      {/* Potted Plant far left on counter */}
      <div className="absolute bottom-[114px] left-[5%] z-20 flex flex-col items-center">
        {/* Plant leaf elements swaying */}
        <motion.div 
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          style={{ originX: '50%', originY: '100%' }}
          className="w-16 h-20 mb-[-2px] flex items-end justify-center pointer-events-none"
        >
          <svg width="60" height="70" viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Center stem */}
            <path d="M30 70 Q30 30 25 10" stroke="#3d2314" strokeWidth="2" strokeLinecap="round" />
            {/* Leaf pairs */}
            <path d="M30 60 Q15 50 10 52 Q15 62 30 60" stroke="#3d2314" strokeWidth="2" fill="none" />
            <path d="M30 50 Q45 42 50 45 Q42 55 30 50" stroke="#3d2314" strokeWidth="2" fill="none" />
            <path d="M28 40 Q12 32 8 36 Q15 44 28 40" stroke="#3d2314" strokeWidth="2" fill="none" />
            <path d="M27 30 Q40 20 45 22 Q38 32 27 30" stroke="#3d2314" strokeWidth="2" fill="none" />
            <path d="M26 20 Q15 12 10 15 Q18 22 26 20" stroke="#3d2314" strokeWidth="2" fill="none" />
          </svg>
        </motion.div>
        
        {/* Pot */}
        <svg width="34" height="28" viewBox="0 0 34 28" fill="none" className="line-art">
          <path d="M4 2 L30 2 L26 26 L8 26 Z" stroke="#3d2314" strokeWidth="2.5" fill="#f4f0e6" />
          <line x1="2" y1="2" x2="32" y2="2" stroke="#3d2314" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Interactive Desk elements on counter */}
      
      {/* 1. Cassette Radio */}
      <div className="absolute bottom-[114px] left-[26%] z-20">
        <InteractiveRadio playing={musicPlaying} onToggle={onToggleMusic} />
      </div>

      {/* 2. Digital Clock */}
      <div className="absolute bottom-[114px] left-[44%] z-20">
        <InteractiveClock />
      </div>

      {/* 3. Espresso Coffee Machine */}
      <div className="absolute bottom-[114px] right-[5%] z-20">
        <InteractiveEspresso />
      </div>

      {/* Shelving unit in center-right area */}
      <div className="absolute top-[8%] left-[45%] w-[320px] h-[210px] z-10 flex flex-col justify-between">
        
        {/* Shelving Backboard Shadow (toggled by lamp state) */}
        <div className={`absolute inset-0 rounded-lg border border-cafe-brown/10 transition-colors duration-500 -z-10 ${lampOn ? 'bg-cafe-glow/30' : 'bg-transparent'}`} />

        {/* Top Shelf */}
        <div className="relative w-full h-[85px] border-b-2 border-cafe-brown flex items-end pb-[2px]">
          {/* Top shelf cups */}
          {cups.filter(c => c.shelf === 'top').map(cup => (
            <button
              key={cup.id}
              onClick={() => onSelectProject(cup.id)}
              data-cursor-text="TASTE"
              className={`absolute bottom-[2px] ${cup.positionClass} group cursor-none outline-none border-none bg-transparent p-0 transition-transform hover:-translate-y-0.5`}
              style={{ filter: selectedProjectId === cup.id ? 'drop-shadow(0 2px 4px rgba(61,35,20,0.15))' : 'none' }}
            >
              {/* If active project, draw small selector tick */}
              {selectedProjectId === cup.id && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cafe-brown animate-pulse" />
              )}
              {cup.svg}
            </button>
          ))}

          {/* Desk Lamp on top shelf */}
          <div className="absolute bottom-[2px] right-[25px]">
            <InteractiveLamp lampOn={lampOn} setLampOn={setLampOn} />
          </div>
        </div>

        {/* Bottom Shelf */}
        <div className="relative w-full h-[85px] border-b-2 border-cafe-brown flex items-end pb-[2px]">
          {/* Bottom shelf cups */}
          {cups.filter(c => c.shelf === 'bottom').map(cup => (
            <button
              key={cup.id}
              onClick={() => onSelectProject(cup.id)}
              data-cursor-text="TASTE"
              className={`absolute bottom-[2px] ${cup.positionClass} group cursor-none outline-none border-none bg-transparent p-0 transition-transform hover:-translate-y-0.5`}
              style={{ filter: selectedProjectId === cup.id ? 'drop-shadow(0 2px 4px rgba(61,35,20,0.15))' : 'none' }}
            >
              {/* If active project, draw selector tick */}
              {selectedProjectId === cup.id && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cafe-brown animate-pulse" />
              )}
              {cup.svg}
            </button>
          ))}
        </div>

      </div>

      {/* Decorative vertical wood slats counter panel at bottom */}
      <div className="w-full h-[110px] bg-cafe-light border-t-2 border-cafe-brown flex items-stretch z-15 justify-around px-2 pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="w-[2px] h-full bg-cafe-brown/15" />
        ))}
      </div>

      {/* Global shadow overlay (dimming when lamp is off) */}
      <div className={`absolute inset-0 pointer-events-none transition-colors duration-500 z-18 ${lampOn ? 'bg-black/0' : 'bg-cafe-brown/5'}`} />

    </div>
  );
}
