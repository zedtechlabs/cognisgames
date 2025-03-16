import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameMenu from './game-menu';

const GameController = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };
  
  return (
    <>
      <motion.div 
        className="fixed bottom-6 right-6 z-50"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          delay: 1,
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        <motion.button 
          id="game-controller-btn" 
          className="btn-glow bg-primary text-background w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          onClick={toggleMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            y: [0, -8, 0],
          }}
          transition={{ 
            y: {
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }
          }}
        >
          <i className="fas fa-gamepad text-2xl"></i>
        </motion.button>
      </motion.div>
      
      <GameMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default GameController;
