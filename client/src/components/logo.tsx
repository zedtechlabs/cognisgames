import { motion } from 'framer-motion';
import logoTrans from '../assets/logo-trans.png';

const CognisLogo = () => {
  return (
    <div className="flex items-center space-x-2">
      <motion.div
        animate={{ 
          filter: ['drop-shadow(0 0 0.5rem rgba(34, 197, 94, 0.5))', 'drop-shadow(0 0 1rem rgba(34, 197, 94, 0.8))', 'drop-shadow(0 0 0.5rem rgba(34, 197, 94, 0.5))'],
          opacity: [1, 0.8, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="h-10"
      >
        <img src={logoTrans} alt="Cognis Logo" className="h-10 w-auto" />
      </motion.div>
      <div>
        <h1 className="orbitron text-2xl font-bold">
          <span className="bg-gradient-to-r from-primary to-secondary-lighter text-transparent bg-clip-text">
            COGNIS
          </span>
          <span className="text-white">GAMES</span>
        </h1>
        <p className="text-xs text-gray-400">
          by 
          <a 
            href="https://www.zedtechlab.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-gray-400 no-underline"
          >
            Zed Tech Lab
        </a>
      </p>
      </div>
    </div>
  );
};

export default CognisLogo;
