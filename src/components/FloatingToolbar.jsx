import React from 'react';
import { Info, Menu, ChevronLeft, ChevronRight } from 'lucide-react';

export default function FloatingToolbar({ 
  onToggleInfo, 
  onToggleMenu, 
  onPrevCup, 
  onNextCup 
}) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center justify-between gap-4 px-6 py-2.5 rounded-full bg-cafe-dark border border-cafe-brown/40 shadow-xl shadow-cafe-dark/10 select-none">
      
      {/* Info Button */}
      <button
        onClick={onToggleInfo}
        className="flex h-9 w-9 items-center justify-center rounded-full text-cafe-light/70 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-none"
        aria-label="View Info"
        title="Portfolio Info"
      >
        <Info className="h-4 w-4" />
      </button>

      {/* Menu / List Button */}
      <button
        onClick={onToggleMenu}
        className="flex h-9 w-9 items-center justify-center rounded-full text-cafe-light/70 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-none"
        aria-label="View Menu"
        title="Project Menu List"
      >
        <Menu className="h-4 w-4" />
      </button>

      {/* Vertical divider line */}
      <div className="h-5 w-px bg-white/15 mx-1" />

      {/* Cycle Left Button */}
      <button
        onClick={onPrevCup}
        className="flex h-9 w-9 items-center justify-center rounded-full text-cafe-light/70 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-none"
        aria-label="Previous Cup"
        title="Previous Cup"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Cycle Right Button */}
      <button
        onClick={onNextCup}
        className="flex h-9 w-9 items-center justify-center rounded-full text-cafe-light/70 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-none"
        aria-label="Next Cup"
        title="Next Cup"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

    </div>
  );
}
