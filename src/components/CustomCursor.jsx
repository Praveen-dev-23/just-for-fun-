import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorType, setCursorType] = useState('default'); // 'default' | 'hover' | 'taste' | 'magnetic'

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs matching mouse movement speed
  const springConfig = { damping: 35, stiffness: 450, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable custom cursor on mobile touch interfaces
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    setVisible(true);

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isLink = target.tagName === 'A' || target.closest('a');
      const isButton = target.tagName === 'BUTTON' || target.closest('button') || target.getAttribute('role') === 'button';
      const cursorTextAttr = target.getAttribute('data-cursor-text') || target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
      const isMagnetic = target.hasAttribute('data-cursor-magnetic') || target.closest('[data-cursor-magnetic]');

      if (cursorTextAttr) {
        setCursorType('taste');
        setCursorText(cursorTextAttr);
      } else if (isMagnetic) {
        setCursorType('magnetic');
        setCursorText('');
      } else if (isLink || isButton) {
        setCursorType('hover');
        setCursorText('');
      } else {
        setCursorType('default');
        setCursorText('');
      }
    };

    const handleMouseLeaveWindow = () => setVisible(false);
    const handleMouseEnterWindow = () => setVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, [cursorX, cursorY]);

  if (!visible) return null;

  // Design sizes for different hover states, matching the bento accents
  const outerVariants = {
    default: {
      width: 18,
      height: 18,
      border: '1.5px solid #111111',
      backgroundColor: 'transparent',
    },
    hover: {
      width: 36,
      height: 36,
      border: '1.5px solid #ff3b00',
      backgroundColor: 'rgba(255, 59, 0, 0.05)',
    },
    magnetic: {
      width: 50,
      height: 50,
      border: '1.5px solid #ff3b00',
      backgroundColor: 'transparent',
    },
    taste: {
      width: 56,
      height: 56,
      border: '1.5px solid #ff3b00',
      backgroundColor: '#ff3b00',
    }
  };

  const innerVariants = {
    default: { scale: 1, backgroundColor: '#111111' },
    hover: { scale: 0.5, backgroundColor: '#ff3b00' },
    magnetic: { scale: 0, backgroundColor: '#ff3b00' },
    taste: { scale: 0, backgroundColor: '#efedee' }
  };

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2">
      
      {/* Outer Tracking Ring */}
      <motion.div
        className="absolute flex items-center justify-center rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={cursorType}
        variants={outerVariants}
        transition={{ type: 'spring', stiffness: 600, damping: 30 }}
      >
        {/* Core Inner Dot */}
        <motion.div 
          className="w-1.5 h-1.5 rounded-full"
          animate={cursorType}
          variants={innerVariants}
          transition={{ duration: 0.2 }}
        />

        {/* Hover text label */}
        {cursorType === 'taste' && (
          <span className="absolute font-space text-[8px] font-bold uppercase tracking-wider text-cafe-light">
            {cursorText}
          </span>
        )}
      </motion.div>

    </div>
  );
}
