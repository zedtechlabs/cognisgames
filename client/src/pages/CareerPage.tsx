import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Particles from '@/components/particles';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Opportunity {
  id: string;
  title: string;
  description: string;
  location: string;
  department: string;
}

// If there are openings, list them here. Otherwise, leave the array empty.
const opportunities: Opportunity[] = [
  // Example opportunity (uncomment to test):
  // {
  //   id: '1',
  //   title: 'Front-end Developer',
  //   description: 'Join our dynamic team to build innovative educational experiences.',
  //   location: 'Remote',
  //   department: 'Engineering',
  // }
];

const CareerPage = () => {
  // State for the Talent Application Form
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add API call to submit the talent form data (e.g., to Google Sheets or your backend)
    console.log('Talent Application Submitted:', formData);
    // Clear form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      message: '',
    });
    alert("Thank you! We'll contact you if a suitable opportunity arises.");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Particles />
      <Navbar />
      
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="orbitron text-4xl font-bold text-white mb-4">
              Career Opportunities
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore our current openings. If you don't find a suitable position, fill out the form below and we’ll notify you about future opportunities.
            </p>
          </motion.div>
          
          {/* Opportunities Section */}
          <div className="mb-16">
            {opportunities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {opportunities.map((opp, index) => (
                  <motion.div 
                    key={opp.id}
                    className="bg-card border border-primary/30 rounded-xl p-6 hover:-translate-y-2 transition-transform"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h2 className="orbitron text-2xl font-bold text-white mb-2">
                      {opp.title}
                    </h2>
                    <p className="text-gray-400 mb-2">
                      {opp.description}
                    </p>
                    <p className="text-gray-400 text-sm">
                      <span className="font-bold">Location:</span> {opp.location} &bull; <span className="font-bold">Department:</span> {opp.department}
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                className="text-center py-16 bg-card/50 rounded-xl border border-primary/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <i className="fas fa-briefcase text-4xl text-primary/50 mb-4"></i>
                <h3 className="orbitron text-2xl font-bold text-white mb-2">
                  Currently, there are no openings
                </h3>
                <p className="text-gray-400">
                  But we are always looking for talented individuals to join our team.
                </p>
              </motion.div>
            )}
          </div>
          
          {/* Talent Application Form */}
          <motion.div 
            className="bg-card border border-primary/30 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="orbitron text-2xl font-bold text-white mb-4">
              Talent Application Form
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Full Name *</label>
                <Input
                  type="text"
                  name="fullName"
                  required
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="bg-background border-primary/30 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Email Address *</label>
                <Input
                  type="email"
                  name="email"
                  required
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-background border-primary/30 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Phone Number</label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Your phone number (optional)"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-background border-primary/30 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Message / Cover Letter</label>
                <textarea
                  name="message"
                  placeholder="Tell us about yourself and your experience..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-background border border-primary/30 rounded-lg px-4 py-2 text-white focus:border-primary"
                  rows={4}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-background font-medium py-3 rounded-lg transition-colors"
              >
                Submit Application
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </motion.div>
  );
};

export default CareerPage;
