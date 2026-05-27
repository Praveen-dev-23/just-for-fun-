import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CursorTrackerCard() {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate cursor coordinate offset relative to the card border bounds
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    
    setCoords({ x, y });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-card-dark text-white rounded-3xl p-6 flex flex-col justify-between select-none relative h-full w-full overflow-hidden border border-white/10 group cursor-none"
    >
      
      {/* Upper header */}
      <div className="flex flex-col gap-1 z-10">
        <span className="font-space text-[9px] font-bold tracking-widest text-[#8a8a8a] uppercase">
          COORDINATES // DYNAMICS
        </span>
        <h3 className="font-syne text-sm font-bold text-white">
          Cursor Tracking of any kind
        </h3>
      </div>

      {/* Center active tracking area */}
      <div className="relative w-full h-[100px] my-2 border border-white/[0.04] bg-black/20 rounded-xl overflow-hidden flex items-center justify-center">
        
        {/* Dynamic target tracking pointer */}
        {hovered && (
          <motion.div 
            className="absolute z-20 pointer-events-none flex items-center gap-1.5"
            style={{ 
              left: coords.x, 
              top: coords.y,
              translateX: '-5px',
              translateY: '-5px'
            }}
            transition={{ type: 'spring', stiffness: 800, damping: 25, mass: 0.1 }}
          >
            {/* SVG cursor arrow */}
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" className="drop-shadow-md">
              <path d="M0 0 L11 7.5 L5.5 8.5 L0 13.5 Z" fill="#ffffff" stroke="#ff3b00" strokeWidth="1" />
            </svg>

            {/* Orange cursor label tag */}
            <div className="bg-[#ff3b00] text-[#eae4d9] font-mono text-[7px] font-bold uppercase px-1.5 py-0.5 rounded tracking-wide shadow-md whitespace-nowrap">
              CURSOR CONTENT
            </div>
          </motion.div>
        )}

        {/* Backdrop visual indicator grid */}
        <div className="text-[10px] font-mono text-white/20 select-none text-center">
          {hovered ? (
            <span className="text-white/60">
              X: {coords.x}px // Y: {coords.y}px
            </span>
          ) : (
            'HOVER INSIDE TO TRACK'
          )}
        </div>

      </div>

      {/* Bottom statistics readouts */}
      <div className="flex justify-between items-center z-10">
        <span className="font-space text-[8px] font-bold text-[#8a8a8a]">
          Pointer Position
        </span>
        <span className="font-mono text-[9px] font-bold text-[#ff3b00] uppercase">
          [ACTIVE: {hovered ? 'TRUE' : 'FALSE'}]
        </span>
      </div>

      {/* Ambient background hover light glow */}
      <div 
        className="absolute -right-12 -bottom-12 w-24 h-24 rounded-full bg-[#ff3b00]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
      />

    </div>
  );
}
