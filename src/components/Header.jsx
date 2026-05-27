import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-0 top-0 z-40 w-full transition-all duration-500 ${
          scrolled 
            ? 'py-4 bg-[#050505]/40 backdrop-blur-md border-b border-white/[0.05]' 
            : 'py-8 bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <a href="#" className="font-space text-lg font-bold tracking-[0.2em] text-white">
            ÆTHERIUS
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-10 md:flex">
            {navItems.map((item) => (
              <MagneticButton key={item.name} strength={0.2}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="font-space text-xs font-semibold uppercase tracking-widest text-[#a3a3a3] transition-colors duration-300 hover:text-white"
                >
                  {item.name}
                </a>
              </MagneticButton>
            ))}
          </nav>

          {/* Call to action (Let's Talk) */}
          <div className="hidden md:block">
            <MagneticButton strength={0.25}>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="relative overflow-hidden rounded-full border border-white/20 bg-white px-6 py-2.5 font-space text-xs font-bold uppercase tracking-widest text-black transition-all duration-300 hover:border-white hover:bg-black hover:text-white"
              >
                Let's Talk
              </a>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center justify-center p-2 text-white md:hidden"
            aria-label="Toggle Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </motion.header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-[#050505] p-6 md:hidden"
          >
            {/* Top Bar inside mobile drawer */}
            <div className="flex items-center justify-between py-2">
              <span className="font-space text-lg font-bold tracking-[0.2em] text-white">
                ÆTHERIUS
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-white"
                aria-label="Close Menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Nav items list */}
            <div className="flex flex-1 flex-col justify-center gap-8 pl-4">
              {navItems.map((item, index) => (
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  key={item.name}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="font-syne text-4xl font-bold uppercase tracking-tight text-white/60 transition-colors duration-300 hover:text-white"
                  >
                    {item.name}
                  </a>
                </motion.div>
              ))}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navItems.length * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="mt-4 inline-block font-syne text-4xl font-bold uppercase tracking-tight text-white border-b-2 border-white pb-2"
                >
                  Contact Me
                </a>
              </motion.div>
            </div>
            
            {/* Minimal footer inside mobile menu */}
            <div className="pl-4 pb-8 font-space text-[10px] uppercase tracking-widest text-[#555]">
              ÆTHERIUS // CREATIVE PORTFOLIO 2026
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
