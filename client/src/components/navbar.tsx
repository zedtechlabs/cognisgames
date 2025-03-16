import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import Logo from './logo';
import MobileMenu from './mobile-menu';

const links = [
  { href: '#home', label: 'HOME' },
  { href: '#games', label: 'GAMES' },
  { href: '#services', label: 'SERVICES' },
  { href: '#clients', label: 'CLIENTS' },
  { href: '#contact', label: 'CONTACT' }
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      <motion.nav 
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          isScrolled ? 'backdrop-blur-md bg-background/80 border-primary/20' : 'bg-transparent border-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Logo />
          
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="nav-item orbitron text-white hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <button 
            className="md:hidden text-white text-2xl"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </motion.nav>
      
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};

export default Navbar;
