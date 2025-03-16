import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import GameCard, { Game } from '@/components/game-card';
import Particles from '@/components/particles';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import GameController from '@/components/game-controller';

// Import the games data from games-section
const allGames: Game[] = [
  {
    id: '1',
    title: 'MathQuest',
    description: 'A mathematical adventure where players solve equations to progress through an epic fantasy world.',
    imageUrl: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ageRange: 'Ages 10-14',
    isNew: true
  },
  {
    id: '2',
    title: 'HistoryHeroes',
    description: 'Travel through time to meet historical figures and participate in pivotal moments from the past.',
    imageUrl: 'https://images.unsplash.com/photo-1569701813229-33284b643e3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ageRange: 'Ages 12-16'
  },
  {
    id: '3',
    title: 'ScienceExplorers',
    description: 'Build experiments, conduct research, and discover scientific principles in this interactive laboratory.',
    imageUrl: 'https://images.unsplash.com/photo-1544376798-76ad6cac0e38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ageRange: 'Ages 8-13'
  },
  {
    id: '4',
    title: 'LanguageLegends',
    description: 'Master new languages through storytelling and adventure in this immersive linguistic journey.',
    imageUrl: 'https://images.unsplash.com/photo-1516641396056-0ce60a85d49f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ageRange: 'Ages 7-15'
  },
  {
    id: '5',
    title: 'CodingCrusaders',
    description: 'Learn programming concepts through puzzle-solving and building your own virtual world.',
    imageUrl: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ageRange: 'Ages 12-18'
  },
  {
    id: '6',
    title: 'EcoDefenders',
    description: 'Protect virtual ecosystems and learn about environmental science in this strategy-based game.',
    imageUrl: 'https://images.unsplash.com/photo-1619504413895-d5992b8c95d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ageRange: 'Ages 9-14',
    isPopular: true
  },
  {
    id: '7',
    title: 'GeometryJumpers',
    description: 'Master geometric concepts through an exciting platformer game with increasingly complex challenges.',
    imageUrl: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ageRange: 'Ages 8-12'
  },
  {
    id: '8',
    title: 'ChemistryClash',
    description: 'Mix elements, create compounds, and solve puzzles in this chemistry-based strategy game.',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ageRange: 'Ages 13-17',
    isPopular: true
  },
  {
    id: '9',
    title: 'ArtisticAdventures',
    description: 'Explore famous art styles and techniques while creating your own masterpieces in this creative game.',
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ageRange: 'Ages 7-16'
  },
  {
    id: '10',
    title: 'MusicMakers',
    description: 'Learn music theory, composition, and rhythm through interactive challenges and creative play.',
    imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ageRange: 'Ages 6-15',
    isNew: true
  },
  {
    id: '11',
    title: 'PhysicsPhenom',
    description: 'Manipulate gravity, friction, and momentum to solve physics-based puzzles and challenges.',
    imageUrl: 'https://images.unsplash.com/photo-1635070041409-e63e783ce3c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ageRange: 'Ages 11-18'
  },
  {
    id: '12',
    title: 'LiteraryQuests',
    description: 'Journey through famous works of literature while developing reading comprehension and literary analysis skills.',
    imageUrl: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ageRange: 'Ages 10-17'
  }
];

// Define age ranges for filtering
const ageRanges = [
  'All Ages',
  'Ages 6-9',
  'Ages 10-13',
  'Ages 14-18'
];

// Define subjects for filtering
const subjects = [
  'All Subjects',
  'Math',
  'Science',
  'History',
  'Language',
  'Coding',
  'Art',
  'Music',
  'Literature',
  'Environmental'
];

const GamesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGames, setFilteredGames] = useState<Game[]>(allGames);
  const [selectedAgeRange, setSelectedAgeRange] = useState('All Ages');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [showNew, setShowNew] = useState(false);
  const [showPopular, setShowPopular] = useState(false);

  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.hash && link.hash.startsWith('#')) {
        e.preventDefault();
        const targetId = link.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Filter games based on search term and filters
  useEffect(() => {
    let result = allGames;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(game => 
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        game.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by age range
    if (selectedAgeRange !== 'All Ages') {
      const minAge = parseInt(selectedAgeRange.split('-')[0].replace('Ages ', ''));
      const maxAge = parseInt(selectedAgeRange.split('-')[1]);
      
      result = result.filter(game => {
        const gameMinAge = parseInt(game.ageRange.split('-')[0].replace('Ages ', ''));
        const gameMaxAge = parseInt(game.ageRange.split('-')[1]);
        
        return (gameMinAge <= maxAge && gameMaxAge >= minAge);
      });
    }
    
    // Filter by subject
    if (selectedSubject !== 'All Subjects') {
      // Map subject to keywords in title/description
      const subjectKeywords: {[key: string]: string[]} = {
        'Math': ['math', 'geometry', 'equation', 'number'],
        'Science': ['science', 'chemistry', 'physics', 'lab', 'experiment'],
        'History': ['history', 'historical', 'past', 'time'],
        'Language': ['language', 'linguistic', 'word', 'grammar'],
        'Coding': ['coding', 'programming', 'code', 'computer'],
        'Art': ['art', 'artistic', 'draw', 'creative'],
        'Music': ['music', 'rhythm', 'melody', 'instrument'],
        'Literature': ['literature', 'literary', 'book', 'read', 'story'],
        'Environmental': ['environment', 'eco', 'nature', 'planet']
      };
      
      const keywords = subjectKeywords[selectedSubject] || [];
      
      result = result.filter(game => {
        const content = (game.title + ' ' + game.description).toLowerCase();
        return keywords.some(keyword => content.includes(keyword.toLowerCase()));
      });
    }
    
    // Filter by badges
    if (showNew) {
      result = result.filter(game => game.isNew);
    }
    
    if (showPopular) {
      result = result.filter(game => game.isPopular);
    }
    
    setFilteredGames(result);
  }, [searchTerm, selectedAgeRange, selectedSubject, showNew, showPopular]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedAgeRange('All Ages');
    setSelectedSubject('All Subjects');
    setShowNew(false);
    setShowPopular(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Particles />
      <Navbar />
      
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="orbitron text-4xl font-bold text-white mb-4">
              Our <span className="text-primary">Games</span> Library
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Browse our complete collection of educational games designed to make learning engaging and effective through play.
            </p>
          </motion.div>
          
          {/* Filters */}
          <motion.div 
            className="bg-card border border-primary/30 rounded-xl p-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search */}
              <div>
                <label className="block orbitron text-sm text-gray-300 mb-2">Search Games</label>
                <Input
                  type="text"
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-background border-primary/30 focus:border-primary"
                />
              </div>
              
              {/* Age Filter */}
              <div>
                <label className="block orbitron text-sm text-gray-300 mb-2">Age Range</label>
                <select
                  className="w-full bg-background border border-primary/30 rounded-lg px-4 py-2 text-white outline-none"
                  value={selectedAgeRange}
                  onChange={(e) => setSelectedAgeRange(e.target.value)}
                >
                  {ageRanges.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>
              
              {/* Subject Filter */}
              <div>
                <label className="block orbitron text-sm text-gray-300 mb-2">Subject</label>
                <select
                  className="w-full bg-background border border-primary/30 rounded-lg px-4 py-2 text-white outline-none"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <label className="orbitron text-sm text-gray-300">Tags:</label>
              <Badge
                className={`cursor-pointer ${showNew ? 'bg-secondary text-white' : 'bg-secondary/20 text-gray-300 hover:bg-secondary/40'}`}
                onClick={() => setShowNew(!showNew)}
              >
                New Games {showNew && <span className="ml-1">✓</span>}
              </Badge>
              <Badge
                className={`cursor-pointer ${showPopular ? 'bg-primary text-background' : 'bg-primary/20 text-gray-300 hover:bg-primary/40'}`}
                onClick={() => setShowPopular(!showPopular)}
              >
                Popular Games {showPopular && <span className="ml-1">✓</span>}
              </Badge>
              
              <div className="ml-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="border-primary/30 text-gray-300"
                >
                  <i className="fas fa-times mr-2"></i> Clear Filters
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Results */}
          <div className="mb-8">
            <p className="text-gray-400 mb-4">Found {filteredGames.length} games</p>
            
            {filteredGames.length === 0 ? (
              <motion.div 
                className="text-center py-16 bg-card/50 rounded-xl border border-primary/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <i className="fas fa-search text-4xl text-primary/50 mb-4"></i>
                <h3 className="orbitron text-xl font-bold text-white mb-2">No Games Found</h3>
                <p className="text-gray-400">Try adjusting your filters or search terms</p>
                <Button
                  variant="outline"
                  className="mt-4 border-primary text-primary hover:bg-primary/10"
                  onClick={clearFilters}
                >
                  Reset Filters
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredGames.map((game, index) => (
                  <GameCard key={game.id} game={game} index={index} />
                ))}
              </div>
            )}
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a 
              href="/"
              className="btn-glow inline-block orbitron bg-card border border-primary text-primary hover:bg-primary/10 px-8 py-3 rounded-lg font-semibold"
            >
              <motion.span
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-arrow-left mr-2"></i> Back to Home
              </motion.span>
            </a>
          </motion.div>
        </div>
      </section>
      
      <Footer />
      <GameController />
    </motion.div>
  );
};

export default GamesPage;