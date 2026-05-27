import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function MenuOverlay({ isOpen, onClose, onSelectProject }) {
  if (!isOpen) return null;

  const menuItems = [
    { id: 'aether', title: 'Aether Spatial Espresso', type: 'WEBGL / TONE.JS', price: '$0.00' },
    { id: 'kronos', title: 'Kronos Temporal Brew', type: 'REACT / CANVAS', price: '$0.00' },
    { id: 'nebula', title: 'Nebula Cosmic Fluid', type: 'THREE.JS / GLSL', price: '$0.00' },
    { id: 'valo', title: 'Valo Telemetry Shot', type: 'NEXT.JS / GSAP', price: '$0.00' },
    { id: 'about', title: 'House Blend (About Me)', type: 'ART DIR / PHYSICS', price: 'CONTRACT' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cafe-dark/20 backdrop-blur-sm p-4 select-none">
      
      {/* Background click close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Blackboard Menu Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative w-full max-w-sm bg-cafe-dark text-cafe-light border-2 border-cafe-brown shadow-2xl p-8 rounded-xl font-mono-tag font-mono text-xs flex flex-col gap-6"
      >
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="font-syne font-bold text-base tracking-widest uppercase text-white">MENU BOARD</span>
            <span className="text-[8px] tracking-widest text-cafe-glow uppercase mt-1">Select a Brew to Examine</span>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full hover:bg-white/10 text-cafe-light cursor-none"
            aria-label="Close Menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Board divider */}
        <div className="h-px bg-cafe-glow/30 w-full" />

        {/* Menu list */}
        <div className="flex flex-1 flex-col gap-5">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectProject(item.id);
                onClose();
              }}
              className="flex justify-between items-center w-full text-left group cursor-none border-b border-white/[0.04] pb-2 transition-all hover:border-cafe-glow/30"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-syne text-[11px] font-bold text-white group-hover:text-cafe-glow transition-colors duration-200">
                  {item.title}
                </span>
                <span className="text-[7.5px] text-[#8a8a8a] uppercase tracking-wider">
                  [{item.type}]
                </span>
              </div>
              
              <span className="text-[10px] font-bold text-cafe-glow">
                {item.price}
              </span>
            </button>
          ))}
        </div>

        <div className="text-[7px] text-[#555] text-center font-mono mt-4">
          * GRINDER ACTIVE // BEANS LOCALLY SOURCED *
        </div>
      </motion.div>
    </div>
  );
}
