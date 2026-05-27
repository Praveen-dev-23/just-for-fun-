import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({ children, className = '', strength = 0.3, ...props }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate the center coordinates of the target element
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Calculate distance from center to mouse cursor
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Attract the button towards the cursor by a fraction of the distance
    setPosition({ x: distanceX * strength, y: distanceY * strength });
  };

  const handleMouseLeave = () => {
    // Snap back to original center position with smooth spring easing
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 180, damping: 15, mass: 0.1 }}
      className={`inline-block cursor-none ${className}`}
      data-cursor-magnetic
      {...props}
    >
      {children}
    </motion.div>
  );
}
