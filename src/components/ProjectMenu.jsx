import React from 'react';
import { motion } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';

export default function ProjectMenu({ project, onClose }) {
  if (!project) return null;

  // Recipe/Specs mapping based on selected project
  const projectDetails = {
    aether: {
      order: '01. AETHER SPATIAL ESPRESSO',
      ingredients: ['40% WebGL Render', '40% Tone.js Oscillator', '20% Coordinate Physics'],
      cost: 'FREE // OPEN-SOURCE',
      link: '#',
      desc: 'An immersive spatial audio synthesizer that allows users to sculpt waveforms by dragging nodes across active 3D geometric grids.'
    },
    kronos: {
      order: '02. KRONOS TEMPORAL DRIFT',
      ingredients: ['50% React Node Engine', '30% HTML5 Canvas', '20% GenAI Weight Stream'],
      cost: 'FREE // STUDY CASE',
      link: '#',
      desc: 'A node-based prompt pipeline workspace that visually diagrams neural model weight adjustments and temporal generative sequences.'
    },
    nebula: {
      order: '03. NEBULA COSMIC FLUID',
      ingredients: ['45% Three.js Orbitals', '35% Custom GLSL Shader', '20% Solidity Events'],
      cost: 'FREE // BLOCKCHAIN EXPERIMENTAL',
      link: '#',
      desc: 'An astronomical sandbox mapping live cryptocurrency block transactions onto star densities and orbital speed vectors.'
    },
    valo: {
      order: '04. VALO TELEMETRY SHOT',
      ingredients: ['40% Next.js Base', '30% GSAP Timelines', '30% Video Composition'],
      cost: 'FREE // PRODUCTION BUILD',
      link: '#',
      desc: 'A high-fidelity gaming telemetry dashboard integrating match telemetry widgets, smooth overlay transforms, and video triggers.'
    },
    about: {
      order: '05. HOUSE BREW (ABOUT ME)',
      ingredients: ['30% Art Direction', '40% Frontend Physics', '30% Kinetic Typography'],
      cost: 'CONTRACTS // OPEN',
      link: '#',
      desc: 'Formulating web experiences at the intersection of digital arts and software architecture. Committed to 60fps interaction physics.'
    }
  };

  const details = projectDetails[project] || projectDetails.about;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cafe-dark/20 backdrop-blur-sm p-4 select-none">
      
      {/* Click outside to close helper */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* The Thermal Receipt Modal */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative w-full max-w-sm bg-[#faf8f5] text-cafe-brown border-2 border-cafe-brown/80 shadow-2xl p-6 rounded-md font-mono-tag font-mono text-xs flex flex-col gap-5"
      >
        {/* Receipt Top Header */}
        <div className="flex flex-col items-center text-center gap-1">
          <span className="font-syne font-bold text-lg tracking-wider">ÆTHERIUS ROASTERS</span>
          <span className="text-[9px] tracking-widest text-cafe-brown/60 uppercase">SAN FRANCISCO BRANCH // REGISTER #1</span>
          <span className="text-[8px] text-cafe-brown/40">DATE: {new Date().toLocaleDateString()} // TIME: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>

        {/* Dotted border line */}
        <div className="border-t border-dashed border-cafe-brown/40 w-full" />

        {/* Ticket ID */}
        <div className="flex justify-between items-center text-[10px] font-bold">
          <span>TICKET #00409</span>
          <span>CUST: CREATIVE_EXPLORER</span>
        </div>

        <div className="border-t border-dashed border-cafe-brown/40 w-full" />

        {/* Receipt items list */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-[11px]">{details.order}</span>
            <p className="text-[10px] text-cafe-brown/70 leading-relaxed font-sans font-light mt-1 pl-2 border-l border-cafe-brown/20">
              {details.desc}
            </p>
          </div>

          <div className="flex flex-col gap-1.5 pl-2 mt-2">
            <span className="text-[8px] font-bold text-cafe-brown/60 tracking-wider">INGREDIENT DISPLACEMENT:</span>
            {details.ingredients.map((ing, i) => (
              <div key={i} className="flex justify-between items-center text-[9px] text-cafe-brown/80">
                <span>- {ing.split(' ')[1]}</span>
                <span className="font-bold">{ing.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-dashed border-cafe-brown/40 w-full" />

        {/* Financial checkout details */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-[10px]">
            <span>SUBTOTAL</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between items-center text-[10px]">
            <span>TAX RATE</span>
            <span>0.00%</span>
          </div>
          <div className="flex justify-between items-center font-bold text-[11px] mt-1 border-t border-cafe-brown/10 pt-2">
            <span>TOTAL PRICE</span>
            <span>{details.cost}</span>
          </div>
        </div>

        <div className="border-t-2 border-dashed border-cafe-brown/60 w-full" />

        {/* Actions row */}
        <div className="flex gap-4 mt-2">
          {/* Close button */}
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-cafe-brown/30 rounded hover:bg-cafe-brown hover:text-cafe-light active:scale-98 transition-all flex items-center justify-center gap-1.5 font-bold uppercase tracking-wider text-[9px] cursor-none"
          >
            <X className="h-3 w-3" /> Dismiss
          </button>
          
          {/* Link to visit */}
          <a
            href={details.link}
            onClick={(e) => {
              e.preventDefault();
              alert(`Navigating to project repository / case study for ${project.toUpperCase()}`);
            }}
            className="flex-1 py-2.5 bg-cafe-brown text-cafe-light rounded hover:bg-cafe-dark active:scale-98 transition-all flex items-center justify-center gap-1.5 font-bold uppercase tracking-wider text-[9px] cursor-none"
          >
            Order Link <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

        {/* Barcode footer visual */}
        <div className="flex flex-col items-center gap-1 mt-4">
          {/* Simulated barcode bars */}
          <div className="flex gap-px h-6 items-stretch opacity-60">
            {Array.from({ length: 32 }).map((_, i) => (
              <div 
                key={i} 
                className="bg-cafe-brown" 
                style={{ width: `${(i % 3 === 0 ? 3 : i % 2 === 0 ? 1 : 2)}px` }} 
              />
            ))}
          </div>
          <span className="text-[7px] text-cafe-brown/40 tracking-[0.3em] font-mono">*AEPORTFOLIO2026*</span>
        </div>

      </motion.div>
    </div>
  );
}
