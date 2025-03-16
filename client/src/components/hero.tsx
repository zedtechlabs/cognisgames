import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax effect values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  return (
    <section 
      id="home" 
      ref={sectionRef} 
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y: y1 }}>
          <motion.div 
            className="absolute top-20 left-20 w-20 h-20 bg-primary/20 rounded-full blur-xl"
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-40 right-20 w-32 h-32 bg-secondary/20 rounded-full blur-xl"
            animate={{ 
              scale: [1, 1.3, 1],
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 w-40 h-40 bg-primary/10 rounded-full blur-xl"
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="orbitron text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
              Learn Through <span className="text-primary">Play</span>
            </h1>
            <p className="press-start text-sm text-gray-300 mb-8">
              Educational games that make learning an adventure
            </p>
            <p className="text-gray-400 mb-8">
              Cognis Games creates immersive educational experiences that combine cutting-edge game design with proven learning methodologies. Our games transform complex subjects into engaging adventures.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#games" 
                className="btn-glow orbitron bg-primary hover:bg-primary/90 text-background px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
              >
                <i className="fas fa-gamepad"></i> Explore Games
              </a>
              <a 
                href="#contact" 
                className="btn-glow orbitron border-2 border-primary text-primary hover:bg-primary/10 px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
              >
                <i className="fas fa-envelope"></i> Contact Us
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ y: y2 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10"
            >
              <div className="relative z-10 hexagon bg-card p-1 border-2 border-primary/50 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Educational gaming" 
                  className="w-full h-auto rounded opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
              <motion.div 
                className="absolute -top-5 -left-5 w-20 h-20 bg-secondary/30 rounded-full blur-lg"
                animate={{ 
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute -bottom-5 -right-5 w-24 h-24 bg-primary/30 rounded-full blur-lg"
                animate={{ 
                  opacity: [0.7, 1, 0.7],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ opacity }}
      >
        <span className="block text-center mb-2">Scroll to Explore</span>
        <i className="fas fa-chevron-down block text-center text-primary"></i>
      </motion.div>
    </section>
  );
};

export default Hero;
