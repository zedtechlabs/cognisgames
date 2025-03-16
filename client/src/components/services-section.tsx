import { motion } from 'framer-motion';

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    id: '1',
    icon: 'fa-pencil-alt',
    title: 'Custom Game Design',
    description: 'We design educational games from concept to completion, tailored to your specific curriculum and learning objectives.'
  },
  {
    id: '2',
    icon: 'fa-graduation-cap',
    title: 'Curriculum Integration',
    description: 'We work with educators to seamlessly integrate our games into existing curriculum and learning management systems.'
  },
  {
    id: '3',
    icon: 'fa-chart-line',
    title: 'Learning Analytics',
    description: 'Our games include comprehensive analytics tools to track student progress and identify areas for improvement.'
  },
  {
    id: '4',
    icon: 'fa-vr-cardboard',
    title: 'VR/AR Development',
    description: 'We create immersive virtual and augmented reality educational experiences for next-level learning engagement.'
  },
  {
    id: '5',
    icon: 'fa-users-cog',
    title: 'Teacher Training',
    description: 'We provide comprehensive training for educators on how to effectively implement our games in the classroom.'
  },
  {
    id: '6',
    icon: 'fa-cogs',
    title: 'Ongoing Support',
    description: 'We offer continuous technical support, updates, and content additions to ensure long-term success.'
  }
];

const ServiceCard = ({ service, index }: { service: Service, index: number }) => {
  return (
    <motion.div 
      className="bg-card p-6 rounded-xl border border-primary/30 hover:border-primary/60 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div 
        className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6"
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(34, 197, 94, 0.3)' }}
      >
        <i className={`fas ${service.icon} text-2xl text-primary`}></i>
      </motion.div>
      <h3 className="orbitron text-xl font-bold text-white mb-3">{service.title}</h3>
      <p className="text-gray-400">{service.description}</p>
    </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-card/50 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full opacity-10">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="border border-primary/20"></div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="orbitron text-4xl font-bold text-white mb-4">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We specialize in creating custom educational games tailored to specific learning objectives and curriculum requirements.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
        
        <motion.div 
          className="mt-16 bg-background/60 border border-primary/30 rounded-xl p-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="orbitron text-2xl font-bold text-white mb-4">Ready to transform learning?</h3>
              <p className="text-gray-400 mb-6">
                Let's discuss how our custom educational games can meet your specific teaching and learning objectives.
              </p>
              <motion.a 
                href="#contact" 
                className="btn-glow inline-block orbitron bg-primary hover:bg-primary/90 text-background px-6 py-3 rounded-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started <i className="fas fa-arrow-right ml-2"></i>
              </motion.a>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Game development process" 
                className="rounded-lg shadow-lg border border-primary/30"
              />
              <motion.div 
                className="absolute -top-4 -left-4 w-16 h-16 hexagon bg-primary/80 flex items-center justify-center"
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="press-start text-xs text-background font-bold">PRO</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
