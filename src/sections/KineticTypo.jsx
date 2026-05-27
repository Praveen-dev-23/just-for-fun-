import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function KineticTypo() {
  const containerRef = useRef(null);

  // Monitor scroll progress of this section relative to viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Map scroll progress to 3D rotation, spacing, and opacity
  const rotateX = useTransform(scrollYProgress, [0, 0.65], [-40, 0]);
  const letterSpacing = useTransform(scrollYProgress, [0, 0.65], ["-0.06em", "0.22em"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.1, 1]);
  const yOffset = useTransform(scrollYProgress, [0, 0.65], [100, 0]);

  return (
    <div 
      ref={containerRef}
      className="snap-section flex flex-col justify-between bg-[#efedee] px-6 md:px-12 py-16 select-none border-t border-bento-text/5"
      style={{ perspective: 1000 }} // Apply 3D perspective to parent container
    >
      {/* Decorative upper metadata grid */}
      <div className="mx-auto max-w-6xl w-full flex justify-between items-start font-space text-[8px] font-bold text-bento-muted tracking-widest uppercase">
        <span>[SECTION_03 // KINETICS]</span>
        <span>SYS_STATUS: ENGAGED // 60Hz</span>
      </div>

      {/* Centered Kinetic Text block */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          style={{ 
            rotateX, 
            letterSpacing, 
            opacity,
            y: yOffset,
            transformStyle: 'preserve-3d' 
          }}
          className="font-syne font-black text-[12vw] sm:text-[9vw] lg:text-[8.5vw] text-bento-text text-center uppercase leading-[0.85] select-none pointer-events-none"
        >
          AETHERIUS
          <br />
          <span className="text-outline-thick text-transparent opacity-90 block mt-2">
            KINETICS
          </span>
        </motion.div>
      </div>

      {/* Footer Info details */}
      <div className="mx-auto max-w-6xl w-full flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-bento-text/10 pt-8 text-center sm:text-left">
        <div className="flex flex-col gap-1.5">
          <span className="font-space text-[8px] font-bold text-bento-muted tracking-[0.2em] uppercase">
            AETHERIUS // MOTION LAB 2026
          </span>
          <span className="font-sans text-[9.5px] text-bento-muted font-light">
            All code compiled in Vite under roll-snap structures.
          </span>
        </div>

        {/* Minimal coordinate indicator */}
        <div className="font-mono text-[9px] font-bold text-bento-accent bg-bento-accent/10 px-3 py-1 rounded">
          SCROLL_TARGET: 100%
        </div>
      </div>

    </div>
  );
}
