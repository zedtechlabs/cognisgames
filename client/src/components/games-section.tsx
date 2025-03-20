import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import GameCard, { Game } from './game-card';
import numberRushLogo from '../assets/number_rush_cognisgames.webp';
import HistoryHeroesImage from '../assets/HistoryHeroes_CognisGames.webp';
import ScienceExplorers from '../assets/ScienceExplorers.webp';
import LanguageLegends from '../assets/LanguageLegends.webp';
import CodingCrusaders from '../assets/CodingCrusaders.webp';
import EcoDefenders from '../assets/EcoDefenders.webp';

const gamesData: Game[] = [
  {
    id: '1',
    title: 'Number Rush',
    description: 'Race against the clock to solve rapid-fire math challenges and sharpen your mental calculation skills.',
    imageUrl: numberRushLogo,  // Replacing Unsplash URL with local image
    ageRange: 'Ages 7+',
    isNew: true,
    actionType: 'demo', 
    demoLink: '/games/NumberRush'
  },
  {
    id: '2',
    title: 'HistoryHeroes',
    description: 'Travel through time to meet historical figures and participate in pivotal moments from the past.',
    imageUrl: HistoryHeroesImage,
    ageRange: 'Ages 12+',
    actionType: 'waitlist'
  },
  {
    id: '3',
    title: 'ScienceExplorers',
    description: 'Build experiments, conduct research, and discover scientific principles in this interactive laboratory.',
    imageUrl: ScienceExplorers,
    ageRange: 'Ages 10+',
    actionType: 'waitlist'
  },
  {
    id: '4',
    title: 'LanguageLegends',
    description: 'Master new languages through storytelling and adventure in this immersive linguistic journey.',
    imageUrl: LanguageLegends ,
    ageRange: 'Ages 7+',
    actionType: 'waitlist'
  },
  {
    id: '5',
    title: 'CodingCrusaders',
    description: 'Learn programming concepts through puzzle-solving and building your own virtual world.',
    imageUrl: CodingCrusaders,
    ageRange: 'Ages 12+',
    actionType: 'waitlist'
  },
  {
    id: '6',
    title: 'EcoDefenders',
    description: 'Protect virtual ecosystems and learn about environmental science in this strategy-based game.',
    imageUrl: EcoDefenders,
    ageRange: 'Ages 9+',
    isPopular: false,
    actionType: 'waitlist'
  }
];

const GamesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <section id="games" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="orbitron text-4xl font-bold text-white mb-4">
            Featured <span className="text-primary">Games</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our collection of educational games designed to make learning fun and effective across various subjects and age groups.
          </p>
        </motion.div>
        
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gamesData.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="/games"
            className="btn-glow inline-block orbitron bg-card border border-primary text-primary hover:bg-primary/10 px-8 py-3 rounded-lg font-semibold"
          >
            <motion.span
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Games <i className="fas fa-arrow-right ml-2"></i>
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GamesSection;
