import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  { href: '#home', label: 'HOME' },
  { href: '#games', label: 'GAMES' },
  { href: '#services', label: 'SERVICES' },
  { href: '#clients', label: 'CLIENTS' },
  { href: '#contact', label: 'CONTACT' }
];

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-40 bg-background/95 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="flex flex-col items-center justify-center h-full space-y-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, staggerChildren: 0.1 }}
          >
            {links.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="orbitron text-2xl text-white hover:text-primary transition-colors"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + (index * 0.05) }}
                onClick={onClose}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
          
          <motion.button
            className="absolute top-5 right-5 text-white text-3xl hover:text-primary transition-colors"
            onClick={onClose}
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <i className="fas fa-times"></i>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
