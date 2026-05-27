import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InteractiveEspresso() {
  const [steamParticles, setSteamParticles] = useState([]);
  const [steamId, setSteamId] = useState(0);

  useEffect(() => {
    // Spawn steam particles on a periodic interval
    const interval = setInterval(() => {
      setSteamParticles((prev) => [
        ...prev,
        {
          id: steamId,
          xOffset: (Math.random() - 0.5) * 8, // Random initial drift
          delay: Math.random() * 0.2
        }
      ]);
      setSteamId((id) => id + 1);
    }, 800);

    return () => clearInterval(interval);
  }, [steamId]);

  // Clean up particles that have drifted away and faded out
  useEffect(() => {
    if (steamParticles.length > 15) {
      setSteamParticles((prev) => prev.slice(prev.length - 10));
    }
  }, [steamParticles]);

  return (
    <div className="relative flex flex-col items-center select-none">
      
      {/* Active Steam Particles Emitter */}
      <div className="absolute top-[4px] left-[62px] w-8 h-20 pointer-events-none overflow-visible">
        <AnimatePresence>
          {steamParticles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ y: 0, x: particle.xOffset, scale: 0.6, opacity: 0 }}
              animate={{ 
                y: -60, 
                x: [particle.xOffset, particle.xOffset + 12, particle.xOffset - 6, particle.xOffset + 4],
                scale: [0.6, 1.2, 1.6], 
                opacity: [0, 0.4, 0.2, 0] 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3.5, ease: 'easeOut', delay: particle.delay }}
              className="absolute bottom-0 w-3 h-3 rounded-full bg-white/50 filter blur-[4px]"
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Coffee Machine SVG */}
      <svg 
        width="130" 
        height="90" 
        viewBox="0 0 130 90" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        {/* Machine base */}
        <rect x="5" y="10" width="120" height="70" rx="4" stroke="#3d2314" strokeWidth="2.5" />
        
        {/* Lower warming tray / grate */}
        <rect x="5" y="68" width="120" height="12" rx="2" stroke="#3d2314" strokeWidth="2" fill="#eae4d9" />
        
        {/* Vertical tray grill lines */}
        <line x1="20" y1="70" x2="20" y2="78" stroke="#3d2314" strokeWidth="1.5" />
        <line x1="40" y1="70" x2="40" y2="78" stroke="#3d2314" strokeWidth="1.5" />
        <line x1="60" y1="70" x2="60" y2="78" stroke="#3d2314" strokeWidth="1.5" />
        <line x1="80" y1="70" x2="80" y2="78" stroke="#3d2314" strokeWidth="1.5" />
        <line x1="100" y1="70" x2="100" y2="78" stroke="#3d2314" strokeWidth="1.5" />

        {/* Top cup warming tray railing */}
        <path d="M10 10 L10 5 L120 5 L120 10" stroke="#3d2314" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Group Head / Dispenser (under the hood) */}
        <rect x="52" y="24" width="26" height="8" stroke="#3d2314" strokeWidth="2" fill="#3d2314" />
        
        {/* Portafilter handle pointing left */}
        <path d="M52 28 L30 28" stroke="#3d2314" strokeWidth="3" strokeLinecap="round" />
        <circle cx="30" cy="28" r="2.5" fill="#3d2314" />

        {/* Steam Wand on right */}
        <path d="M92 24 L102 45 L98 47" stroke="#3d2314" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Dials / pressure gauges on left */}
        <circle cx="20" cy="20" r="3.5" stroke="#3d2314" strokeWidth="1.5" />
        <circle cx="32" cy="20" r="3.5" stroke="#3d2314" strokeWidth="1.5" />
        
        {/* Pressure gauge needles */}
        <line x1="20" y1="20" x2="22" y2="18" stroke="#3d2314" strokeWidth="1" />
        <line x1="32" y1="20" x2="30" y2="18" stroke="#3d2314" strokeWidth="1" />

        {/* Buttons / toggles on right */}
        <rect x="98" y="16" width="6" height="6" rx="1" stroke="#3d2314" strokeWidth="1.5" />
        <rect x="108" y="16" width="6" height="6" rx="1" stroke="#3d2314" strokeWidth="1.5" />

        {/* Display screen (dashes) */}
        <rect x="45" y="16" width="40" height="6" rx="1" stroke="#3d2314" strokeWidth="1.5" fill="#eae4d9" />
        <line x1="50" y1="19" x2="80" y2="19" stroke="#3d2314" strokeWidth="1.5" strokeDasharray="3 2" />

        {/* Coffee cup on the tray */}
        <path d="M60 55 C60 62, 70 62, 70 55 Z" stroke="#3d2314" strokeWidth="2" fill="#eae4d9" />
        <path d="M70 53 C73 53, 73 57, 70 57" stroke="#3d2314" strokeWidth="1.5" />
        
        {/* Coffee stream dripping down */}
        <line x1="65" y1="32" x2="65" y2="52" stroke="#3d2314" strokeWidth="1.5" strokeDasharray="2 3" />

        {/* Speckled texture dots (espresso spray) */}
        <circle cx="15" cy="55" r="0.75" fill="#3d2314" opacity="0.3" />
        <circle cx="28" cy="48" r="0.5" fill="#3d2314" opacity="0.4" />
        <circle cx="34" cy="58" r="0.75" fill="#3d2314" opacity="0.2" />
        <circle cx="98" cy="52" r="0.5" fill="#3d2314" opacity="0.5" />
        <circle cx="106" cy="60" r="0.75" fill="#3d2314" opacity="0.3" />
      </svg>
    </div>
  );
}
