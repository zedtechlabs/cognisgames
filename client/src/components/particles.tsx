import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

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
  const particles = useRef<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Generate random particles
  useEffect(() => {
    // Create particles only if container exists and we're in browser
    if (typeof window === 'undefined' || !containerRef.current) return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    const particleCount = Math.min(Math.floor(width * height / 15000), 50);
    
    particles.current = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.5 + 0.1,
      duration: Math.random() * 20 + 10,
      delay: -Math.random() * 10,
    }));
  }, []);
  
  const floatVariants = {
    initial: (particle: Particle) => ({
      y: particle.y,
      opacity: particle.opacity,
    }),
    animate: (particle: Particle) => ({
      y: [particle.y, particle.y - 30, particle.y],
      transition: {
        y: {
          repeat: Infinity,
          duration: particle.duration,
          delay: particle.delay,
          ease: "easeInOut"
        }
      }
    })
  };
  
  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none">
      {particles.current.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/50"
          custom={particle}
          variants={floatVariants}
          initial="initial"
          animate="animate"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        />
      ))}
    </div>
  );
};

export default Particles;
