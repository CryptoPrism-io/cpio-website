import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { navLinks } from '../data/mockData';

interface HeaderProps {
  readonly className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cyber-black/80 backdrop-blur-xl border-b border-white/5 shadow-lg'
          : 'bg-transparent'
      } ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
    >
      <div className="w-full px-6 lg:px-12 xl:px-20 py-5 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <motion.div
            className="w-10 h-10 bg-cyber-black border border-neon-green/30 rounded flex items-center justify-center shadow-[0_0_15px_rgba(14,203,129,0.2)]"
            animate={{
              boxShadow: [
                '0 0 15px rgba(14, 203, 129, 0.2)',
                '0 0 25px rgba(14, 203, 129, 0.4)',
                '0 0 15px rgba(14, 203, 129, 0.2)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="material-symbols-outlined text-neon-green text-2xl">diamond</span>
          </motion.div>
          <span className="text-2xl font-display font-extrabold tracking-tighter text-white uppercase">
            Crypto Prism
          </span>
        </motion.div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest text-gray-500 uppercase">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              className="relative hover:text-neon-green transition-colors group"
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05, duration: 0.3 }}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-neon-green group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
          <motion.button
            className="px-6 py-2 bg-neon-green/5 border border-neon-green/20 rounded text-neon-green hover:bg-neon-green/10 transition-all"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 400, damping: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Establish Link
          </motion.button>
        </nav>

        {/* Mobile hamburger */}
        <motion.button
          className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span
            className="block w-5 h-0.5 bg-gray-300 rounded-full"
            animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-5 h-0.5 bg-gray-300 rounded-full"
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
          />
          <motion.span
            className="block w-5 h-0.5 bg-gray-300 rounded-full"
            animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
        </motion.button>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-cyber-black/95 backdrop-blur-xl border-t border-white/5"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
          >
            <nav className="flex flex-col px-6 py-6 gap-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  className="text-sm font-bold tracking-widest text-gray-400 uppercase hover:text-neon-green transition-colors"
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                className="mt-2 px-6 py-3 bg-neon-green/5 border border-neon-green/20 rounded text-neon-green text-sm font-bold tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                onClick={() => setMobileOpen(false)}
              >
                Establish Link
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
