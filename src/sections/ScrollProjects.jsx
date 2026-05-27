import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import portraitImg from '../assets/portrait.png';

const scrollProjectsData = [
  {
    id: 'kronos',
    title: 'KRONOS AI NODE CANVAS',
    subtitle: 'TEMPORAL GENERATIVE WORKSPACE',
    tags: ['React Flow', 'Canvas', 'AI Weights'],
    desc: 'Visual node diagrams detailing generative prompt sequences and model parameters. Tracks and maps raw weight changes during active inference pipelines.',
    accent: '#a855f7',
    filterClass: 'hue-rotate-[120deg] saturate(2) brightness(0.6)' // Purple filter tint
  },
  {
    id: 'nebula',
    title: 'NEBULA BLOCK ORBITALS',
    subtitle: 'WEB3 COSMIC TRANSACTION EXPLORER',
    tags: ['Three.js', 'Solidity', 'GLSL Shaders'],
    desc: 'Generative universe mapping live Ethereum transactions onto stellar coordinates and gas fee nebula densities. Explore decentralized ledger telemetry.',
    accent: '#10b981',
    filterClass: 'hue-rotate-[240deg] saturate(1.8) brightness(0.6)' // Emerald/cyan filter tint
  },
  {
    id: 'valo',
    title: 'VALO ESPORTS TELEMETRY',
    subtitle: 'CINEMATIC ANALYTICS MATRIX',
    tags: ['Next.js', 'GSAP', 'NextGen UI'],
    desc: 'Esports analytics portal aggregating speed telemetry widgets, layout transforms, and inline video masks into a high-performance data dashboard.',
    accent: '#f43f5e',
    filterClass: 'hue-rotate-[320deg] saturate(2.5) brightness(0.5)' // Red/rose filter tint
  }
];

export default function ScrollProjects({ onSelectProject }) {
  return (
    <div className="relative w-full flex flex-col items-stretch">
      {scrollProjectsData.map((project) => (
        <ProjectSnapSection 
          key={project.id} 
          project={project} 
          onSelectProject={onSelectProject}
        />
      ))}
    </div>
  );
}

function ProjectSnapSection({ project, onSelectProject }) {
  const containerRef = useRef(null);
  
  // Track scroll progress of this specific section relative to viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Calculate card transforms as it scrolls out of view
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.55]);
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -30]);

  // Image zoom parallax
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);

  return (
    <div 
      ref={containerRef}
      className="snap-section flex items-center justify-center bg-[#efedee] px-6 md:px-12 select-none"
    >
      
      {/* Sticky card panel */}
      <motion.div
        style={{ scale, opacity, y: yOffset }}
        onClick={() => onSelectProject({ id: project.id })}
        className="relative w-full max-w-4xl h-[70vh] rounded-3xl overflow-hidden glass-card border border-white/60 flex flex-col md:flex-row justify-between p-8 md:p-12 gap-8 shadow-xl cursor-none group"
      >
        {/* Left Side: Text details */}
        <div className="flex flex-col justify-between flex-1 h-full z-10">
          <div className="flex flex-col gap-2">
            <span 
              className="font-space text-[9px] font-bold tracking-[0.2em] uppercase"
              style={{ color: project.accent }}
            >
              {project.subtitle}
            </span>
            <h3 className="font-syne text-2xl md:text-4xl font-extrabold uppercase text-bento-text mt-1 leading-tight tracking-tight">
              {project.title}
            </h3>
            <p className="font-sans text-xs md:text-sm text-bento-muted font-light leading-relaxed mt-4 max-w-md">
              {project.desc}
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span 
                  key={tag}
                  className="font-space text-[8px] font-bold tracking-widest uppercase bg-bento-text/5 px-2.5 py-0.5 rounded-full border border-bento-text/5"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Launch link */}
            <span className="flex items-center gap-2 font-space text-[9px] font-bold uppercase tracking-widest text-bento-text group-hover:text-bento-accent transition-colors duration-300">
              EXPLORE CASE SPEC <ArrowUpRight className="h-4.5 w-4.5" />
            </span>
          </div>
        </div>

        {/* Right Side: Parallax Image */}
        <div className="relative w-full md:w-[45%] h-[40%] md:h-full rounded-2xl overflow-hidden border border-white/60 bg-black/10 shrink-0">
          <motion.div 
            style={{ scale: imgScale }}
            className="w-full h-full"
          >
            <img 
              src={portraitImg} 
              alt={project.title} 
              className="w-full h-full object-cover transition-all duration-300"
              style={{ filter: `contrast(1.2) sepia(100%) ${project.filterClass}` }}
            />
          </motion.div>
          
          {/* Subtle vignette shadow gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

      </motion.div>
      
    </div>
  );
}
