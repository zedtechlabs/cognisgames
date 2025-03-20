import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Link } from "wouter";
import CareerTeam from '../assets/Careers_CognisGames.webp';


const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(1, { message: "Please select a subject" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });
  
  const { toast } = useToast();
  
  const onSubmit = async (data: ContactFormValues) => {
    try {

      const payload = { ...data, formType: "contactForm" }; // Add form type

      const response = await fetch("https://hook.eu2.make.com/3qgbw4dkn3b651qxt4y77moiau7tbzmq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you as soon as possible.",
        });
  
        reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  
  return (
    <section id="contact" className="py-20 bg-card/50 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 rounded-tr-full"></div>
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
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have questions about our games or interested in a custom educational gaming solution? Let's connect!
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div 
            className="bg-background border border-primary/30 rounded-xl p-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <label htmlFor="name" className="block orbitron text-sm text-gray-300">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className={`w-full bg-card border ${errors.name ? 'border-destructive' : 'border-primary/30 focus:border-primary'} rounded-lg px-4 py-3 text-white outline-none`}
                  placeholder="Enter your name"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-destructive text-xs mt-1">{errors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block orbitron text-sm text-gray-300">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className={`w-full bg-card border ${errors.email ? 'border-destructive' : 'border-primary/30 focus:border-primary'} rounded-lg px-4 py-3 text-white outline-none`}
                  placeholder="Enter your email"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-destructive text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="block orbitron text-sm text-gray-300">Subject</label>
                <select 
                  id="subject" 
                  className={`w-full bg-card border ${errors.subject ? 'border-destructive' : 'border-primary/30 focus:border-primary'} rounded-lg px-4 py-3 text-white outline-none`}
                  {...register('subject')}
                >
                  <option value="">Select a subject</option>
                  <option value="custom_game">Custom Game Development</option>
                  <option value="existing_games">Questions about Existing Games</option>
                  <option value="partnership">Partnership Opportunities</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && (
                  <p className="text-destructive text-xs mt-1">{errors.subject.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="block orbitron text-sm text-gray-300">Your Message</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  className={`w-full bg-card border ${errors.message ? 'border-destructive' : 'border-primary/30 focus:border-primary'} rounded-lg px-4 py-3 text-white outline-none resize-none`}
                  placeholder="Tell us about your educational gaming needs"
                  {...register('message')}
                ></textarea>
                {errors.message && (
                  <p className="text-destructive text-xs mt-1">{errors.message.message}</p>
                )}
              </div>
              
              <motion.button 
                type="submit" 
                className="btn-glow w-full orbitron bg-primary hover:bg-primary/90 text-background px-6 py-3 rounded-lg font-semibold flex items-center justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <i className="fas fa-paper-plane ml-2"></i>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
          
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-background border border-primary/30 rounded-xl p-6">
              <h3 className="orbitron text-xl font-bold text-white mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-envelope text-primary"></i>
                  </div>
                  <div>
                    <p className="text-gray-300 font-medium">Email Us</p>
                    <p className="text-primary">cognisgames@zedtechlab.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-phone-alt text-primary"></i>
                  </div>
                  <div>
                    <p className="text-gray-300 font-medium">Call Us</p>
                    <p className="text-primary">+91 89202 63364</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-map-marker-alt text-primary"></i>
                  </div>
                  <div>
                    <p className="text-gray-300 font-medium">Visit Us</p>
                    <p className="text-primary">IIT Delhi, Hauz Khas, New Delhi,India, 110016</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-background border border-primary/30 rounded-xl p-6">
              <h3 className="orbitron text-xl font-bold text-white mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {['twitter', 'linkedin-in', 'facebook-f', 'instagram'].map((icon, index) => (
                  <motion.a 
                    key={icon}
                    href="#" 
                    className="w-10 h-10 bg-primary/20 hover:bg-primary/40 rounded-full flex items-center justify-center text-primary transition-colors"
                    whileHover={{ 
                      scale: 1.2,
                      rotate: [-5, 5, 0],
                      transition: { duration: 0.3 }
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (index * 0.1) }}
                  >
                    <i className={`fab fa-${icon}`}></i>
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div className="bg-background border border-primary/30 rounded-xl overflow-hidden">
              <img 
                src={CareerTeam}
                alt="Our team" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="orbitron text-xl font-bold text-white mb-2">Join Our Team</h3>
                <p className="text-gray-400 mb-4">
                  We're always looking for talented developers, educational specialists, and game designers.
                </p>
                <Link href="/career">
                  <motion.a 
                    className="inline-block text-primary hover:underline"
                    whileHover={{ x: 5 }}
                  >
                    View Career Opportunities <i className="fas fa-arrow-right ml-1"></i>
                  </motion.a>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
