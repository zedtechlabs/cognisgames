import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if element is hoverable
      const target = e.target as HTMLElement;
      const isHoverable = target.closest('a, button, .btn, .game-card, [role="button"]');
      setIsPointer(!!isHoverable);
      
      // Show cursor after first movement
      if (!isVisible) setIsVisible(true);
    };
    
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      
      // Restore default cursor
      document.body.style.cursor = 'auto';
    };
  }, [isVisible]);

  if (typeof window === 'undefined') return null;
  
  return (
    <>
      {/* Base cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full bg-transparent border-2 border-primary z-[9999] pointer-events-none"
        animate={{ 
          x: position.x - 12,
          y: position.y - 12,
          scale: isPointer ? 1.5 : 1,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ 
          type: "spring",
          damping: 25,
          stiffness: 400,
          mass: 0.2
        }}
      />
      
      {/* Cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-primary z-[9999] pointer-events-none"
        animate={{ 
          x: position.x - 6,
          y: position.y - 6,
          opacity: isVisible ? 1 : 0 
        }}
        transition={{
          type: "spring",
          damping: 35,
          stiffness: 500,
          mass: 0.15
        }}
      />
      
      {/* Arrow for clickable elements */}
      {isPointer && (
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 z-[9999] pointer-events-none flex items-center justify-center text-primary"
          animate={{ 
            x: position.x - 16,
            y: position.y - 16,
            opacity: isVisible ? 1 : 0 
          }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 11l-8-8v5H5v6h8v5l8-8z"/>
          </svg>
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;
