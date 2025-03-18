import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

const AnimatedBackground = () => {
  const isMobile = useIsMobile();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles
    const count = isMobile ? 30 : 50;
    const newParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      // Generate random positions covering the entire viewport
      const x = Math.random() * 100; // percentage of viewport width
      const y = Math.random() * 100; // percentage of viewport height
      
      // Random size between 10px and 60px
      const size = 10 + Math.random() * 50;
      
      // Color variations in the green-cyan spectrum
      const hue = 120 + Math.random() * 60; // 120-180 (green to cyan)
      const saturation = 60 + Math.random() * 30; // 60-90%
      const lightness = 40 + Math.random() * 20; // 40-60%
      const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      
      // Duration between 20 and 40 seconds
      const duration = 20 + Math.random() * 20;
      
      // Random delay to stagger animations
      const delay = Math.random() * 10;
      
      newParticles.push({
        id: i,
        x,
        y,
        size,
        color,
        duration,
        delay
      });
    }
    
    setParticles(newParticles);
  }, [isMobile]);

  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background to-background/80 overflow-hidden pointer-events-none">
      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-30 blur-md"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color
          }}
          animate={{
            x: [
              0,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              0
            ],
            y: [
              0,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              0
            ],
            scale: [1, 1.1, 0.9, 1.2, 1]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(32, 223, 127, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(32, 223, 127, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: isMobile ? '20px 20px' : '40px 40px'
        }}
      />
      
      {/* Radial gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.3) 100%)'
        }}
      />
    </div>
  );
};

export default AnimatedBackground;