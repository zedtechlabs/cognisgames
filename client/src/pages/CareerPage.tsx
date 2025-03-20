import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Particles from '@/components/particles';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Opportunity {
  id: string;
  title: string;
  description: string;
  location: string;
  department: string;
}

// If there are openings, list them here. Otherwise, leave the array empty.
const opportunities: Opportunity[] = [
  // You can uncomment and add openings here if needed.
];

const CareerPage = () => {
  // State for form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [resume, setResume] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Handle text input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload (Resume validation: max 5MB)
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) { // 5MB in bytes
        setError("File size must be under 5MB.");
        toast({
          title: "File Size Error",
          description: "File size must be under 5MB.",
          variant: "destructive",
        });
        setResume(null);
      } else {
        setError(null);
        setResume(file);
      }
    }
  };

  // Allow user to remove the uploaded file manually
  const handleRemoveFile = () => {
    setResume(null);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validate that all fields are filled in
    if (!formData.fullName || !formData.email || !formData.phone || !formData.message || !resume) {
      setError("Please fill all required fields and upload a resume.");
      toast({
        title: "Submission Error",
        description: "Please fill all required fields and upload a resume.",
        variant: "destructive",
      });
      return;
    }
  
    // Validate file size (Max: 5MB)
    if (resume.size > 5 * 1024 * 1024) {
      setError("File size must be under 5MB.");
      toast({
        title: "File Too Large",
        description: "Resume file size must be under 5MB.",
        variant: "destructive",
      });
      return;
    }
  
    setIsSubmitting(true);
    setError(null);
  
    try {
      // ✅ Step 1: Upload Resume to Cloudinary
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", resume);
      cloudinaryFormData.append("upload_preset", "talent-resumes"); // Replace with actual Cloudinary Upload Preset
  
      const cloudinaryResponse = await fetch("https://api.cloudinary.com/v1_1/dnv7zt6lv/image/upload", { 
        method: "POST",
        body: cloudinaryFormData,
      });
  
      if (!cloudinaryResponse.ok) throw new Error("Failed to upload resume.");
  
      const cloudinaryData = await cloudinaryResponse.json();
      const resumeUrl = cloudinaryData.secure_url; // ✅ Resume Cloudinary Link
  
      // ✅ Step 2: Send Form Data + Resume URL to Make.com Webhook
      const formDataToSend = new FormData();
      formDataToSend.append("formType", "talentApplication"); // Helps Make route the data correctly
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("resume", resumeUrl); // Send Cloudinary resume link
  
      const response = await fetch("https://hook.eu2.make.com/3plk690gtufamdqaevwh686h27tzk2u7", {
        method: "POST",
        body: formDataToSend,
      });
  
      if (response.ok) {
        toast({
          title: "Submitted",
          description: "Thank you! Your application has been received.",
        });
        // ✅ Clear form fields and file
        setFormData({ fullName: "", email: "", phone: "", message: "" });
        setResume(null);
      } else {
        toast({
          title: "Submission Error",
          description: "Error submitting the form. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Network Error",
        description: "Network error. Please try again later.",
        variant: "destructive",
      });
      setError("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
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
                    <p className="text-gray-400 mb-2">{opp.description}</p>
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
            {error && <p className="text-red-500 mb-4">{error}</p>}
      
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-background border border-primary/30 rounded-lg px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-background border border-primary/30 rounded-lg px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-background border border-primary/30 rounded-lg px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Message / Cover Letter *</label>
                <textarea
                  name="message"
                  required
                  placeholder="Tell us about yourself and your experience..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-background border border-primary/30 rounded-lg px-4 py-2 text-white"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Upload Resume (Max: 5MB, Only PDF Allowed) *</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  onChange={handleResumeChange}
                  className="w-full bg-background border border-primary/30 rounded-lg px-4 py-2 text-white"
                />
                {resume && (
                  <div className="flex items-center mt-2">
                    <p className="text-green-500">{resume.name}</p>
                    <button 
                      type="button" 
                      onClick={handleRemoveFile} 
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-background font-medium py-3 rounded-lg transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
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
