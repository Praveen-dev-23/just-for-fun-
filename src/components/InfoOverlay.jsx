import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function InfoOverlay({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cafe-dark/20 backdrop-blur-sm p-4 select-none">
      
      {/* Background click close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative w-full max-w-sm bg-cafe-light text-cafe-brown border-2 border-cafe-brown shadow-2xl p-6 rounded-xl font-mono-tag font-mono text-xs flex flex-col gap-4"
      >
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="font-syne font-bold text-base tracking-wide">ALT. CAFE</span>
            <span className="text-[9px] tracking-widest text-cafe-brown/60 uppercase">Portfolio Info Spec</span>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full hover:bg-cafe-brown/10 text-cafe-brown cursor-none"
            aria-label="Close Info"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="border-t border-cafe-brown/20 w-full" />

        <div className="flex flex-col gap-3 font-sans font-light leading-relaxed text-[11px] text-cafe-brown/80">
          <p>
            Welcome to <strong>ALt.</strong>, a café-shaped creative interactive developer portfolio engineered with React, Framer Motion, and Tailwind CSS.
          </p>
          <p>
            Each mug sitting on the shelves represents a project. Click a mug to take a "taste" (view its receipt summary and repository details).
          </p>
          <p>
            <strong>Interactive Elements:</strong>
            <br />
            - <strong>Lamp</strong>: Toggles light rays, focusing shelf illumination.
            <br />
            - <strong>Cassette Radio</strong>: Toggles ambient lofi loop tracks.
            <br />
            - <strong>Espresso Machine</strong>: Periodically brews coffee and emits floating steam.
            <br />
            - <strong>Digital Clock</strong>: Syncs with local system hours and minutes.
          </p>
        </div>

        <div className="border-t border-cafe-brown/20 w-full pt-2 text-[9px] text-cafe-brown/50 text-center font-mono">
          DESIGNED BY ANTIGRAVITY // 2026
        </div>
      </motion.div>
    </div>
  );
}
