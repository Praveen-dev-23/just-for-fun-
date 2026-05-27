import React from 'react';
import { motion } from 'framer-motion';

export default function InteractiveRadio({ playing, onToggle }) {
  return (
    <div className="relative flex flex-col items-center select-none">
      
      {/* Radio Casing Button */}
      <button 
        onClick={onToggle}
        className="relative z-10 outline-none focus:outline-none cursor-none bg-transparent border-0 p-0 active:scale-95 transition-transform"
        aria-label="Toggle Radio Music"
      >
        <svg 
          width="110" 
          height="70" 
          viewBox="0 0 110 70" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Box Body */}
          <rect 
            x="5" 
            y="15" 
            width="100" 
            height="50" 
            rx="6" 
            stroke="#3d2314" 
            strokeWidth="2.5" 
            fill={playing ? '#f4f0e6' : 'transparent'}
            className="transition-colors duration-300"
          />

          {/* Handle */}
          <path 
            d="M25 15 L25 5 L85 5 L85 15" 
            stroke="#3d2314" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          {/* Antenna */}
          <line x1="85" y1="15" x2="105" y2="2" stroke="#3d2314" strokeWidth="1.5" />
          <circle cx="105" cy="2" r="1.5" fill="#3d2314" />

          {/* Cassette Door Grid */}
          <rect 
            x="30" 
            y="25" 
            width="50" 
            height="30" 
            rx="3" 
            stroke="#3d2314" 
            strokeWidth="2" 
            fill="#eae4d9"
          />

          {/* Cassette Left Spindle/Reel */}
          <motion.circle 
            cx="45" 
            cy="40" 
            r="6" 
            stroke="#3d2314" 
            strokeWidth="1.5" 
            strokeDasharray="4 2"
            animate={playing ? { rotate: 360 } : { rotate: 0 }}
            transition={playing ? { repeat: Infinity, duration: 3, ease: 'linear' } : {}}
            style={{ originX: '45px', originY: '40px' }}
          />

          {/* Cassette Right Spindle/Reel */}
          <motion.circle 
            cx="65" 
            cy="40" 
            r="6" 
            stroke="#3d2314" 
            strokeWidth="1.5" 
            strokeDasharray="4 2"
            animate={playing ? { rotate: 360 } : { rotate: 0 }}
            transition={playing ? { repeat: Infinity, duration: 3, ease: 'linear' } : {}}
            style={{ originX: '65px', originY: '40px' }}
          />

          {/* Speaker grills on left */}
          <line x1="12" y1="28" x2="22" y2="28" stroke="#3d2314" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="12" y1="36" x2="22" y2="36" stroke="#3d2314" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="12" y1="44" x2="22" y2="44" stroke="#3d2314" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="12" y1="52" x2="22" y2="52" stroke="#3d2314" strokeWidth="1.5" strokeLinecap="round" />

          {/* Dials on right */}
          <circle cx="92" cy="30" r="3.5" stroke="#3d2314" strokeWidth="1.5" />
          <circle cx="92" cy="42" r="3.5" stroke="#3d2314" strokeWidth="1.5" />

          {/* Tuner scale slider */}
          <rect x="35" y="20" width="40" height="3" rx="1" fill="#3d2314" opacity="0.1" />
          <line x1="50" y1="20" x2="50" y2="23" stroke="#3d2314" strokeWidth="1.5" />

          {/* Active play LED light */}
          {playing && (
            <circle cx="92" cy="54" r="1.5" fill="#f43f5e" />
          )}
        </svg>
      </button>

      {/* Mini floating notes when active */}
      {playing && (
        <div className="absolute -top-6 w-full flex justify-between pointer-events-none">
          <motion.span 
            animate={{ y: [-5, -15], x: [0, 5], opacity: [0, 0.8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
            className="text-[10px] font-bold text-cafe-brown font-mono"
          >
            ♫
          </motion.span>
          <motion.span 
            animate={{ y: [-2, -20], x: [0, -4], opacity: [0, 0.8, 0] }}
            transition={{ repeat: Infinity, duration: 2.3, delay: 0.7, ease: 'easeOut' }}
            className="text-[8px] font-bold text-cafe-brown font-mono"
          >
            ♪
          </motion.span>
        </div>
      )}

    </div>
  );
}
