import { motion, AnimatePresence } from 'framer-motion';

interface GameMenuItem {
  id: string;
  title: string;
  icon: string;
  href: string;
}

const games: GameMenuItem[] = [
  { id: '1', title: 'Number Rush', icon: 'fa-calculator', href: '#' },
  { id: '2', title: 'HistoryHeroes', icon: 'fa-landmark', href: '#' },
  { id: '3', title: 'ScienceExp', icon: 'fa-flask', href: '#' },
  { id: '4', title: 'LangLegends', icon: 'fa-language', href: '#' },
  { id: '5', title: 'CodeCrusaders', icon: 'fa-code', href: '#' },
  { id: '6', title: 'EcoDefenders', icon: 'fa-leaf', href: '#' },
];

interface GameMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const GameMenu = ({ isOpen, onClose }: GameMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="max-w-2xl w-full px-4">
            <motion.div 
              className="bg-card border-2 border-primary rounded-xl p-8 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.35 }}
            >
              <motion.button 
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={onClose}
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <i className="fas fa-times text-xl"></i>
              </motion.button>
              
              <motion.h2 
                className="orbitron text-3xl font-bold text-white mb-6 text-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Quick Game Access
              </motion.h2>
              
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {games.map((game, index) => (
                  <motion.a 
                    key={game.id}
                    href={game.href} 
                    className="bg-background p-4 rounded-lg border border-primary/30 hover:border-primary text-center transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (index * 0.05) }}
                    whileHover={{ 
                      y: -5,
                      boxShadow: '0 10px 15px -3px rgba(34, 197, 94, 0.3)'
                    }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2"
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: 'rgba(34, 197, 94, 0.3)'
                      }}
                    >
                      <i className={`fas ${game.icon} text-primary`}></i>
                    </motion.div>
                    <p className="text-white orbitron text-sm">{game.title}</p>
                  </motion.a>
                ))}
              </motion.div>
              
              <motion.div 
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.a 
                  href="#games" 
                  className="btn-glow inline-block orbitron bg-primary hover:bg-primary/90 text-background px-6 py-3 rounded-lg font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                >
                  View All Games
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameMenu;
