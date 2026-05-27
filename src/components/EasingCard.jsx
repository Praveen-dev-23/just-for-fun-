import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function EasingCard() {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0.5, y: 0.875 }); // Default center indicator positions

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Normalize mouse X from 0 to 1 relative to card width
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    
    // Evaluate standard EaseOutCubic formula: y = 1 - (1 - x)^3
    const y = 1 - Math.pow(1 - x, 3);
    
    setCoords({ x, y });
  };

  // Convert normalized 0-1 values into SVG viewport coordinates (width 200, height 120)
  // Note: Y coordinates are inverted in SVG (0 is top, height is bottom)
  const plotX = coords.x * 200;
  const plotY = 120 - (coords.y * 100 + 10); // 10px margin at bottom

  // Generate SVG path string representing the EaseOutCubic curve
  const points = [];
  for (let i = 0; i <= 20; i++) {
    const xVal = i / 20;
    const yVal = 1 - Math.pow(1 - xVal, 3);
    points.push(`${xVal * 200},${120 - (yVal * 100 + 10)}`);
  }
  const pathD = `M ${points.join(' L ')}`;

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="glass-card rounded-3xl p-6 flex flex-col justify-between select-none relative h-full w-full group overflow-hidden border border-white/60"
    >
      <div className="flex flex-col gap-1 z-10">
        <span className="font-space text-[9px] font-bold tracking-widest text-bento-muted uppercase">
          CURVE // FUNCTION
        </span>
        <h3 className="font-syne text-sm font-bold text-bento-text">
          Progress Easing
        </h3>
      </div>

      {/* SVG Motion Curve Chart */}
      <div className="relative w-full h-[120px] my-4 flex items-center justify-center">
        
        {/* Graph background grids */}
        <div className="absolute inset-0 grid grid-cols-5 grid-rows-3 opacity-[0.07] pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="border border-bento-text" />
          ))}
        </div>

        <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible z-10">
          {/* Grid axis labels */}
          <text x="5" y="115" fill="rgba(0,0,0,0.35)" fontSize="7" fontFamily="monospace">0.00</text>
          <text x="5" y="65" fill="rgba(0,0,0,0.35)" fontSize="7" fontFamily="monospace">0.50</text>
          <text x="5" y="15" fill="rgba(0,0,0,0.35)" fontSize="7" fontFamily="monospace">1.00</text>

          {/* Ease curve outline path */}
          <path 
            d={pathD} 
            stroke="rgba(0,0,0,0.15)" 
            strokeWidth="1.5" 
            fill="none" 
          />

          {/* User cursor projection coordinate intersection lines */}
          <line x1={plotX} y1="0" x2={plotX} y2="120" stroke="rgba(255, 59, 0, 0.15)" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="0" y1={plotY} x2="200" y2={plotY} stroke="rgba(255, 59, 0, 0.15)" strokeWidth="1" strokeDasharray="2 2" />

          {/* Dynamic tracking curve path */}
          <path 
            d={`M 0,110 L ${plotX},${plotY}`}
            stroke="#ff3b00" 
            strokeWidth="1.5" 
            fill="none" 
            opacity="0.3"
          />

          {/* Active coordinate red dot */}
          <circle 
            cx={plotX} 
            cy={plotY} 
            r="4.5" 
            fill="#ff3b00" 
            className="transition-shadow duration-300 group-hover:shadow-md"
          />
        </svg>
      </div>

      {/* Footer statistics readout */}
      <div className="flex justify-between items-center z-10">
        <span className="font-space text-[8px] font-bold text-bento-muted">
          easeOutCubic
        </span>
        <span className="font-mono text-[9px] font-bold text-bento-accent bg-bento-accent/10 px-2 py-0.5 rounded">
          t: {coords.x.toFixed(2)} // y: {coords.y.toFixed(2)}
        </span>
      </div>

    </div>
  );
}
