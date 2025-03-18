import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
};

const Particles = () => {
  const isMobile = useIsMobile();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [counter, setCounter] = useState(0);

  // Generate a new particle with random properties
  const generateParticle = () => {
    return {
      id: counter,
      x: Math.random() * 100, // percent
      y: Math.random() * 100, // percent
      size: Math.random() * 6 + 2, // 2-8px
      opacity: Math.random() * 0.5 + 0.3, // 0.3-0.8
      duration: Math.random() * 10 + 15, // 15-25s
      delay: 0
    };
  };

  // Initialize some particles
  useEffect(() => {
    const initialCount = isMobile ? 15 : 30;
    const initialParticles = Array.from({ length: initialCount }, (_, i) => ({
      ...generateParticle(),
      id: i,
      delay: Math.random() * 10 // stagger initial appearance
    }));
    
    setParticles(initialParticles);
    setCounter(initialCount);
    
    // Add new particles occasionally
    const interval = setInterval(() => {
      setParticles(prev => {
        // Remove old particles if we have too many
        const maxParticles = isMobile ? 20 : 40;
        const current = prev.length >= maxParticles ? 
          prev.slice(1) : [...prev];
          
        // Add a new particle
        return [...current, {
          ...generateParticle(),
          id: counter + 1
        }];
      });
      
      setCounter(c => c + 1);
    }, 3000); // every 3 seconds
    
    return () => clearInterval(interval);
  }, [isMobile, counter]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute bg-primary rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: 0,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, particle.opacity, 0],
              scale: [0, 1, 0],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              ease: "easeInOut"
            }}
            exit={{ opacity: 0, scale: 0 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Particles;