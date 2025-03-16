import { motion } from 'framer-motion';
import ExtemLogo from '../assets/extem-logo';

interface Partner {
  id: string;
  name: string;
  logo?: React.ReactNode;
  isLogo?: boolean;
}

const partners: Partner[] = [
  {
    id: '1',
    name: 'Extem Education',
    logo: <ExtemLogo className="h-24 w-auto mx-auto" />,
    isLogo: true
  }
];

const ClientsSection = () => {
  return (
    <section id="clients" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="orbitron text-4xl font-bold text-white mb-4">
            Trusted <span className="text-primary">Partners</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We collaborate with leading educational institutions to create immersive learning experiences through gaming.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              className="bg-card border border-primary/30 rounded-xl p-6 hover:border-primary/60 transition-all hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: '0 10px 25px -5px rgba(34, 197, 94, 0.3)' }}
            >
              {partner.isLogo ? (
                partner.logo
              ) : (
                <div className="h-16 flex items-center justify-center">
                  <h3 className="orbitron text-lg font-bold text-white">{partner.name}</h3>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-gray-400 mb-6">
            Join our growing network of educational partners and transform how your students learn.
          </p>
          <motion.a 
            href="#contact" 
            className="btn-glow inline-block orbitron bg-card border border-primary text-primary hover:bg-primary/10 px-8 py-3 rounded-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Become a Partner <i className="fas fa-handshake ml-2"></i>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsSection;
