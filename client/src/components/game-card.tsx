import { motion } from 'framer-motion';

export interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  ageRange: string;
  isNew?: boolean;
  isPopular?: boolean;
}

interface GameCardProps {
  game: Game;
  index: number;
}

const GameCard = ({ game, index }: GameCardProps) => {
  const badgeClass = game.isNew 
    ? "bg-secondary text-white"
    : game.isPopular 
      ? "bg-primary text-background"
      : "";
  
  const badgeText = game.isNew 
    ? "NEW" 
    : game.isPopular 
      ? "POPULAR" 
      : "";
  
  return (
    <motion.div 
      className="game-card bg-card rounded-xl overflow-hidden border border-primary/30 p-1 relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {(game.isNew || game.isPopular) && (
        <div className={`absolute top-[-10px] right-[-10px] z-10 press-start text-xs ${badgeClass} px-3 py-1 rounded-full`}>
          {badgeText}
        </div>
      )}
      
      <img 
        src={game.imageUrl} 
        alt={game.title} 
        className="w-full h-48 object-cover rounded-t"
      />
      
      <div className="p-5">
        <h3 className="orbitron text-xl font-bold text-white mb-2">{game.title}</h3>
        <p className="text-gray-400 text-sm mb-4">{game.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">{game.ageRange}</span>
          <motion.button 
            className="btn-glow text-sm bg-primary hover:bg-primary/90 text-background px-4 py-2 rounded-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowWaitlist(true)}
          >
            Try Demo
          </motion.button>
          
          <WaitlistModal 
            isOpen={showWaitlist}
            onClose={() => setShowWaitlist(false)}
            gameName={game.title}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;
