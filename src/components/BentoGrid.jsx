import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EasingCard from './EasingCard';
import CursorTrackerCard from './CursorTrackerCard';
import portraitImg from '../assets/portrait.png';

export default function BentoGrid({ onSelectProject }) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate normalized mouse positions from -1 to 1 relative to viewport center
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Parallax translation amounts depending on depth layers
  const bgTransform = `translate(${mouseOffset.x * -20}px, ${mouseOffset.y * -20}px) scale(1.05)`;
  
  // Custom tilt variables for individual cards
  const getCardStyle = (factor) => ({
    transform: `translate(${mouseOffset.x * factor}px, ${mouseOffset.y * factor}px)`,
    transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
  });

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center py-20 px-4 md:px-12 select-none overflow-hidden bg-[#efedee]">
      
      {/* 1. Giant Background B&W Portrait (Opposing Parallax) */}
      <div 
        className="absolute w-[600px] h-[600px] md:w-[700px] md:h-[700px] pointer-events-none opacity-85 z-0 flex items-center justify-center transition-all duration-300"
        style={{ transform: bgTransform }}
      >
        <img 
          src={portraitImg} 
          alt="B&W Background Portrait" 
          className="w-full h-full object-cover portrait-bw"
        />
      </div>

      {/* 2. Interactive Bento Collage Container */}
      <div className="relative max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 z-10 items-stretch">
        
        {/* CARD A: Performance Supervision (Top Left - Spans 3 cols) */}
        <div 
          className="lg:col-span-3 h-[180px]" 
          style={getCardStyle(14)}
        >
          <div className="glass-card rounded-3xl p-6 flex flex-col justify-between h-full border border-white/60">
            <div className="flex flex-col gap-1">
              <span className="font-space text-[9px] font-bold text-bento-muted tracking-widest uppercase">SYS // CORE</span>
              <h3 className="font-syne text-sm font-bold text-bento-text leading-tight mt-1">Performance Supervision</h3>
            </div>
            
            {/* Japanese Text illustration */}
            <div className="text-right mt-2 self-end">
              <span className="font-syne font-bold text-3xl tracking-widest text-bento-text opacity-95">
                フィドル
              </span>
            </div>
          </div>
        </div>

        {/* CARD B: Scroll Smoothly Tag (Vertical strip - Spans 1 col) */}
        <div 
          className="lg:col-span-1 hidden lg:flex items-center justify-center h-[180px]" 
          style={getCardStyle(16)}
        >
          <div className="bg-[#ff3b00]/10 border border-[#ff3b00]/25 rounded-3xl w-full h-full flex flex-col items-center justify-center py-4 text-center">
            <div className="writing-mode-vertical rotate-180 font-space text-[8px] font-bold tracking-[0.4em] text-bento-accent uppercase">
              SCROLL SMOOTHLY
            </div>
            {/* Tiny orange block */}
            <div className="w-1.5 h-6 bg-[#ff3b00] mt-3 rounded-full animate-bounce" />
          </div>
        </div>

        {/* CARD C: Central Red Highlight Showcase - AETHER (Center - Spans 5 cols) */}
        <div 
          onClick={() => onSelectProject({ id: 'aether' })}
          className="lg:col-span-5 h-[380px] lg:row-span-2 cursor-none group" 
          style={getCardStyle(10)}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-full border-2 border-[#ff3b00] flex flex-col justify-between p-8 bg-[#3d2314]">
            
            {/* Red portrait cover */}
            <div className="absolute inset-0 z-0 opacity-80 overflow-hidden">
              <img 
                src={portraitImg} 
                alt="Highlight Red Portrait" 
                className="w-full h-full object-cover portrait-red group-hover:scale-105 transition-transform duration-700"
              />
              {/* Vibrant red color multiply overlay */}
              <div className="absolute inset-0 bg-red-600 mix-blend-multiply" />
            </div>

            {/* Coordinates tag */}
            <div className="relative z-10 flex justify-between items-start font-mono text-[9px] text-[#ff3b00] font-bold">
              <span>[1.00 // AXIS]</span>
              <span>0.50</span>
            </div>

            {/* Center card visual line */}
            <div className="relative z-10 w-full h-px bg-white/20 my-2" />

            {/* Headline and text */}
            <div className="relative z-10 mt-auto flex flex-col gap-3 text-center items-center">
              <span className="font-space text-[9px] font-bold text-white/50 tracking-widest uppercase">FEATURED RELEASE</span>
              <h3 className="font-syne text-2xl md:text-3xl font-extrabold text-[#eae4d9] uppercase tracking-tight">
                Control your Progress Data
              </h3>
              <p className="max-w-xs font-sans text-[10px] text-white/70 font-light leading-relaxed">
                Break it apart, apply to any element across the page, pass it through JS.
              </p>
            </div>

            {/* Grid tag offset */}
            <div className="relative z-10 flex justify-between items-end font-mono text-[9px] text-white/30 mt-4">
              <span>0.00</span>
              <span className="text-[#ff3b00]">t: {mouseOffset.x.toFixed(2)}</span>
            </div>

          </div>
        </div>

        {/* CARD D: Use Scroll Container - KRONOS project (Top Right - Spans 3 cols) */}
        <div 
          onClick={() => onSelectProject({ id: 'kronos' })}
          className="lg:col-span-3 h-[180px] cursor-none group" 
          style={getCardStyle(15)}
        >
          <div className="glass-card rounded-3xl p-6 flex flex-col justify-between h-full border border-white/60 hover:bg-white/50 transition-colors">
            <div className="flex flex-col gap-1">
              <span className="font-space text-[9px] font-bold text-bento-muted tracking-widest uppercase">PROJECTS // 02</span>
              <h3 className="font-syne text-sm font-bold text-bento-text">Use Scroll Container. <span className="text-bento-muted font-normal text-xs block">If you want</span></h3>
            </div>
            
            {/* Project graphic representation (mini dashboard outline) */}
            <div className="border border-bento-text/10 bg-white/25 rounded-lg p-2 flex flex-col gap-1 mt-2">
              <span className="font-syne text-[8.5px] font-bold text-bento-accent tracking-wider uppercase">Master Your Skills</span>
              <div className="flex items-center justify-between border-t border-bento-text/5 pt-1 mt-0.5 font-mono text-[7px] text-bento-muted">
                <span>StringTune</span>
                <span className="h-2 w-10 bg-bento-text/10 rounded-full overflow-hidden relative">
                  <span className="absolute top-0 left-0 w-2/3 h-full bg-bento-accent" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD E: Safe Natural Kerning (Middle Left - Spans 3 cols) */}
        <div 
          className="lg:col-span-3 h-[180px]" 
          style={getCardStyle(12)}
        >
          <div className="glass-card rounded-3xl p-6 flex flex-col justify-between h-full border border-white/60">
            <div className="flex flex-col gap-1">
              <span className="font-space text-[9px] font-bold text-bento-muted tracking-widest uppercase">TYPO // MATRIX</span>
              <h3 className="font-syne text-xs font-semibold text-bento-text leading-tight mt-1">Safe natural kerning when Splitting</h3>
            </div>
            
            {/* Split typography visual */}
            <div className="flex items-center gap-1.5 self-center mt-2 border border-bento-accent/15 rounded px-3 py-1.5 bg-bento-accent/5">
              <span className="font-syne font-extrabold text-3xl text-bento-accent tracking-tight">T</span>
              <span className="h-6 w-px bg-bento-accent/40" />
              <span className="font-syne font-extrabold text-3xl text-bento-text tracking-tight">u</span>
            </div>
          </div>
        </div>

        {/* CARD F: Vertical Spacer / Layout bar (Middle Center/Right - Spans 1 col) */}
        <div 
          className="lg:col-span-1 hidden lg:flex h-[180px]" 
          style={getCardStyle(11)}
        >
          <div className="border border-white/40 rounded-3xl w-full h-full flex flex-col justify-around items-center opacity-40">
            <div className="h-10 w-px bg-bento-text" />
            <div className="w-1.5 h-1.5 rounded-full bg-bento-text" />
            <div className="h-10 w-px bg-bento-text" />
          </div>
        </div>

        {/* CARD G: Progress Easing Chart (Middle Right - Spans 3 cols) */}
        <div 
          className="lg:col-span-3 h-[180px]" 
          style={getCardStyle(13)}
        >
          <EasingCard />
        </div>

        {/* CARD H: Ultra Optimized / VALO Showcase (Bottom Left - Spans 2 cols) */}
        <div 
          onClick={() => onSelectProject({ id: 'valo' })}
          className="lg:col-span-2 h-[200px] cursor-none group overflow-hidden" 
          style={getCardStyle(15)}
        >
          <div className="glass-card rounded-3xl p-5 flex flex-col justify-between h-full border border-white/60 relative hover:bg-white/50 transition-colors">
            
            {/* Background image shadow */}
            <div className="absolute right-0 bottom-0 w-[60%] h-[75%] opacity-30 group-hover:scale-105 transition-transform duration-500">
              <img src={portraitImg} alt="Optimized Card bg" className="w-full h-full object-cover portrait-bw" />
            </div>

            <div className="flex flex-col gap-1 z-10">
              <span className="font-space text-[9px] font-bold text-bento-muted tracking-widest uppercase">PERF // CODE</span>
              <h3 className="font-syne text-xs font-bold text-bento-text">Ultra Optimized</h3>
            </div>
            
            <div className="font-space text-[8.5px] font-bold tracking-wider z-10 text-bento-muted">
              [60 FPS SUITE]
            </div>
          </div>
        </div>

        {/* CARD I: Horizontal Minimal Text Card (Bottom Left-Center - Spans 4 cols) */}
        <div 
          className="lg:col-span-4 h-[200px] flex items-stretch" 
          style={getCardStyle(11)}
        >
          <div className="glass-card rounded-3xl p-6 flex flex-col justify-between h-full w-full border border-white/60">
            <div className="flex flex-col gap-1">
              <span className="font-space text-[9px] font-bold text-bento-muted tracking-widest uppercase">CORE VALUES</span>
              <h3 className="font-syne text-xs font-bold text-bento-text mt-1">Aesthetic Engineering</h3>
            </div>

            <div className="flex items-center gap-6 font-space text-[8px] font-bold text-bento-muted uppercase tracking-widest mt-4">
              <span>FOR DEVELOPERS</span>
              <span>&</span>
              <span>DESIGNERS</span>
            </div>
          </div>
        </div>

        {/* CARD J: Cursor Tracker (Bottom Center-Right - Spans 3 cols) */}
        <div 
          className="lg:col-span-3 h-[200px]" 
          style={getCardStyle(13)}
        >
          <CursorTrackerCard />
        </div>

        {/* CARD K: Sticky & Splitted text combinations (Bottom Right - Spans 3 cols) */}
        <div 
          onClick={() => onSelectProject({ id: 'nebula' })}
          className="lg:col-span-3 h-[200px] cursor-none group flex flex-col gap-4" 
          style={getCardStyle(14)}
        >
          {/* Top block (HTML split text) */}
          <div className="glass-card rounded-2xl p-4 flex items-center justify-between flex-1 border border-white/60 hover:bg-white/50 transition-colors">
            <div className="flex flex-col gap-0.5">
              <span className="font-space text-[7.5px] font-bold text-[#8a8a8a] tracking-widest uppercase">TEXT ENGINE</span>
              <h4 className="font-syne text-[10px] font-bold text-bento-text leading-tight mt-0.5">Blend HTML with Splitted Text</h4>
            </div>
            
            {/* Small visual bar */}
            <div className="w-1.5 h-6 bg-[#ff3b00] rounded-full shrink-0 group-hover:scale-y-110 transition-transform duration-300" />
          </div>

          {/* Bottom block (Position Sticky) */}
          <div className="glass-card rounded-2xl p-4 flex flex-col justify-between flex-1 border border-white/60">
            <div className="flex justify-between items-start font-mono text-[8px] font-bold text-bento-muted">
              <span>Position Sticky?</span>
              <span>Of course</span>
            </div>
          </div>
        </div>

      </div>
      
    </div>
  );
}
