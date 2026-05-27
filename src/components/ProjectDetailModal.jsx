import React from 'react';
import { motion } from 'framer-motion';
import { X, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function ProjectDetailModal({ project, onClose }) {
  if (!project) return null;

  const projectData = {
    aether: {
      title: 'Aether Spatial Studio',
      subtitle: 'SPATIAL AUDIO SYNTHESIS',
      tags: ['WebGL', 'Tone.js', 'Audio Graph'],
      year: '2026',
      desc: 'Aether is an immersive web application designed to translate spatial user coordinates into real-time audio oscillations. By plotting node shapes on a visual canvas, creators build geometric synthesizer configurations that shift frequency, pan, and filter thresholds in 3D space.',
      details: [
        'Interactive 3D WebGL particle node grid.',
        'Tone.js context oscillator matrix.',
        'High-refresh rate mouse spatial coordinate mapping.',
        'Custom audio track exports and session recording.'
      ]
    },
    kronos: {
      title: 'Kronos Neural Canvas',
      subtitle: 'TEMPORAL AI WORKSPACE',
      tags: ['React Flow', 'HTML5 Canvas', 'Neural API'],
      year: '2025',
      desc: 'Kronos provides visual node-graph workspaces to debug generative neural model pipelines. By connecting inputs, temporal models, and prompt adjustments, developers map raw prompt weight layers and watch live generative processes execute.',
      details: [
        'Custom dragging node connector engine.',
        'Real-time model pipeline telemetry gauges.',
        'Dynamic canvas background ticks.',
        'Custom API integration bindings for OpenAI & Claude.'
      ]
    },
    nebula: {
      title: 'Nebula Asset Orbitals',
      subtitle: 'WEB3 ASTRONOMICAL GRAPH',
      tags: ['Three.js', 'Solidity', 'GLSL Shaders'],
      year: '2025',
      desc: 'Nebula is an artistic visualization engine mapping decentralized network transactions onto stellar coordinate orbits. Block transactions feed density coordinates into real-time GLSL particle clouds, constructing a glowing universe from block telemetry.',
      details: [
        'Performant particle physics shaders.',
        'Dynamic star field orbits tracking live blocks.',
        'Metamask wallet connection and network telemetry.',
        'High-fidelity visual bloom post-processing filters.'
      ]
    },
    valo: {
      title: 'Valo Esports Telemetry',
      subtitle: 'CINEMATIC DATA HUB',
      tags: ['Next.js', 'GSAP', 'NextGen UI'],
      year: '2026',
      desc: 'Valo is a high-speed esports analytics dashboard mapping match stats, live player status coordinates, and telemetry. It integrates smooth video overlays and complex timeline reveals to convey dense statistical data in a premium layout.',
      details: [
        'GSAP scroll-triggered statistics transitions.',
        'Smooth video playback masks and hover zooms.',
        'Modular bento data widgets.',
        'Interactive team comparison graphs.'
      ]
    }
  };

  const data = projectData[project.id] || projectData.aether;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#efedee]/85 backdrop-blur-md p-4 md:p-8 select-none">
      
      {/* Background click close handler */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Casing */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative w-full max-w-3xl bg-[#efedee] border border-white/80 shadow-2xl p-8 md:p-12 rounded-3xl text-bento-text flex flex-col justify-between max-h-[90vh] overflow-y-auto"
      >
        {/* Top bar */}
        <div className="flex justify-between items-start gap-4 mb-8">
          <div>
            <span className="font-space text-[10px] font-bold text-bento-accent tracking-[0.25em] uppercase">
              {data.subtitle} // PROJECT SPEC
            </span>
            <h2 className="font-syne text-3xl md:text-5xl font-extrabold uppercase mt-2 tracking-tight">
              {data.title}
            </h2>
          </div>
          
          <button 
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-bento-text/10 bg-white/20 hover:bg-[#ff3b00] hover:text-white transition-all duration-300 cursor-none"
            aria-label="Close Modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
          
          {/* Left Column: Description & Specs */}
          <div className="md:col-span-7 flex flex-col gap-6">
            <p className="font-sans text-sm leading-relaxed text-bento-muted font-light">
              {data.desc}
            </p>

            <div className="flex flex-col gap-3">
              <span className="font-space text-[9px] font-bold text-bento-text tracking-widest uppercase">
                / KEY HIGHLIGHTS:
              </span>
              <div className="flex flex-col gap-2">
                {data.details.map((hl, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-bento-muted">
                    <CheckCircle2 className="h-4 w-4 text-bento-accent shrink-0 mt-0.5" />
                    <span className="font-sans font-light">{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Metadata details */}
          <div className="md:col-span-5 flex flex-col gap-6 bg-white/30 border border-white/60 p-6 rounded-2xl">
            <div className="flex flex-col gap-1">
              <span className="font-space text-[8px] font-bold text-[#8a8a8a] tracking-widest">DEPLOYMENT YEAR</span>
              <span className="font-mono text-xs font-bold text-bento-text">[{data.year}]</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-space text-[8px] font-bold text-[#8a8a8a] tracking-widest">TECHNOLOGY DISPLACEMENT</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {data.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="font-space text-[8px] font-bold tracking-widest uppercase bg-[#ff3b00]/10 text-[#ff3b00] border border-[#ff3b00]/15 px-2.5 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-space text-[8px] font-bold text-[#8a8a8a] tracking-widest">DEVELOPMENT BUDGET</span>
              <span className="font-sans text-xs font-bold text-bento-text">OPEN SOURCE</span>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="border-t border-bento-text/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-space text-[9px] font-bold text-bento-muted uppercase tracking-widest">
            AETHERIUS DESIGN LAB // PORTFOLIO 2026
          </span>

          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert(`Navigating to Case Study details...`);
            }}
            className="flex items-center gap-2 bg-bento-text text-[#efedee] hover:bg-[#ff3b00] transition-colors duration-300 font-space text-[10px] font-bold uppercase tracking-widest px-6 py-3 rounded-full cursor-none"
          >
            LAUNCH PROJECT WORKCASE <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

      </motion.div>
    </div>
  );
}
