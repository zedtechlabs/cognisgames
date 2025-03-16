import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import GamesSection from '@/components/games-section';
import ServicesSection from '@/components/services-section';
import ClientsSection from '@/components/clients-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';
import GameController from '@/components/game-controller';
import Particles from '@/components/particles';

const Home = () => {
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
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Particles />
      <Navbar />
      <Hero />
      <GamesSection />
      <ServicesSection />
      <ClientsSection />
      <ContactSection />
      <Footer />
      <GameController />
    </motion.div>
  );
};

export default Home;
