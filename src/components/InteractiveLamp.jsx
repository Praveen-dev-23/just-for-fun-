import React from 'react';
import { motion } from 'framer-motion';

export default function InteractiveLamp({ lampOn, setLampOn }) {
  return (
    <div className="relative flex flex-col items-center select-none">
      
      {/* Clickable Desk Lamp SVG */}
      <button 
        onClick={() => setLampOn(!lampOn)}
        className="relative z-20 outline-none focus:outline-none cursor-none bg-transparent border-0 p-0"
        aria-label="Toggle Desk Lamp"
      >
        <svg 
          width="70" 
          height="80" 
          viewBox="0 0 70 80" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 active:scale-95"
        >
          {/* Lampshade */}
          <path 
            d="M20 35 C20 18, 50 18, 50 35 L55 35 L45 15 L25 15 L15 35 Z" 
            stroke="#3d2314" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill={lampOn ? '#eae4d9' : 'transparent'}
            className="transition-colors duration-300"
          />
          {/* Inner shade detailing */}
          <line x1="35" y1="15" x2="35" y2="35" stroke="#3d2314" strokeWidth="1.5" strokeDasharray="3 3" />
          
          {/* Lamp neck / stem */}
          <path 
            d="M35 15 L35 8 L10 8 L10 65 L20 65" 
            stroke="#3d2314" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          
          {/* Toggle pull cord */}
          <line x1="42" y1="35" x2="42" y2="48" stroke="#3d2314" strokeWidth="1.5" />
          <circle 
            cx="42" 
            cy="48" 
            r="2.5" 
            fill="#3d2314" 
            className={`transition-transform duration-200 ${lampOn ? 'translate-y-1' : ''}`} 
          />

          {/* Lamp base */}
          <path 
            d="M5 68 L65 68 L60 72 L10 72 Z" 
            stroke="#3d2314" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="#3d2314"
          />
        </svg>
      </button>

      {/* Spotlight Cone overlay. Placed absolute and expanding downwards. */}
      {lampOn && (
        <motion.div
          initial={{ opacity: 0, scaleY: 0.8 }}
          animate={{ opacity: 0.2, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0.8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute top-[34px] left-1/2 -translate-x-1/2 z-10 pointer-events-none origin-top"
          style={{ width: '400px', height: '600px' }}
        >
          {/* Yellow semi-transparent spotlight shape */}
          <svg viewBox="0 0 400 600" className="w-full h-full">
            <defs>
              <linearGradient id="lampGlow" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon 
              points="190,0 210,0 400,600 0,600" 
              fill="url(#lampGlow)" 
            />
          </svg>
        </motion.div>
      )}

    </div>
  );
}
