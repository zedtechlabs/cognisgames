import { motion } from 'framer-motion';
import { Link } from 'wouter';
import Logo from './logo';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const emailSchema = z.string().email({ message: "Please enter a valid email address" });

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      emailSchema.parse(email);
      setIsSubmitting(true);
      
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      
      setEmail('');
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: "There was a problem subscribing. Please try again.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <footer className="bg-card pt-16 pb-8 border-t border-primary/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-gray-400 mb-6">
              Transforming education through immersive gaming experiences that make learning fun and effective.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'linkedin-in', 'facebook-f', 'instagram'].map((icon) => (
                <a 
                  key={icon}
                  href="#" 
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  <i className={`fab fa-${icon}`}></i>
                </a>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="orbitron text-lg font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['home', 'games', 'services', 'clients', 'contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link}`} className="text-gray-400 hover:text-primary transition-colors">
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="orbitron text-lg font-bold text-white mb-6">Our Games</h3>
            <ul className="space-y-3">
              {[
                'Number Rush', 
                'HistoryHeroes', 
                'ScienceExplorers', 
                'LanguageLegends', 
                'CodingCrusaders'
              ].map((game) => (
                <li key={game}>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                    {game}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="orbitron text-lg font-bold text-white mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to receive updates on our new games and educational resources.
            </p>
            <form className="flex" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-background border border-primary/30 rounded-l-lg px-4 py-2 text-white outline-none flex-grow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button 
                type="submit" 
                className="btn-glow bg-primary text-background rounded-r-lg px-4 py-2 border border-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <i className="fas fa-paper-plane"></i>
                )}
              </button>
            </form>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t border-primary/20 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Cognis Games, a division of Zed Tech Lab. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
