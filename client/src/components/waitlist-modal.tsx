import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameName: string;
}

const WaitlistModal = ({ isOpen, onClose, gameName }: WaitlistModalProps) => {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    ageGroup: '',
    interests: {
      mathematics: false,
      science: false,
      language: false,
      history: false,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      interests: { ...prevFormData.interests, [name]: checked },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError(null);

    const formattedInterests = Object.keys(formData.interests)
    .filter((key) => formData.interests[key as keyof typeof formData.interests])
    .join(", ");
  
    const payload = {
      formType: "waitlistForm",
      gameName,
      email: formData.email,
      fullName: formData.fullName,
      ageGroup: formData.ageGroup,
      interests: formattedInterests, // Converts interests to string format
    };
  

    try {
      const response = await fetch("https://hook.eu2.make.com/3qgbw4dkn3b651qxt4y77moiau7tbzmq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "You've been added to the waitlist.",
        });

        // Clear form fields
        setFormData({
          email: "",
          fullName: "",
          ageGroup: "",
          interests: {
            mathematics: false,
            science: false,
            language: false,
            history: false,
          },
        });

        onClose(); // Close modal
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setError("There was a problem submitting your request.");
      toast({
        title: "Error",
        description: "There was a problem submitting your request. Try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-card border-2 border-primary/30 rounded-xl w-full max-w-md p-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="orbitron text-2xl font-bold text-white">Join the Waitlist</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <p className="text-gray-400 mb-6">
          Be among the first to try <span className="text-primary">{gameName}</span> when it's ready. 
          We'll notify you as soon as it's available for testing.
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Email Address *</label>
            <input
              type="email"
              required
              name="email"
              className="w-full bg-background border border-primary/30 rounded-lg px-4 py-2 text-white"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Full Name *</label>
            <input
              type="text"
              required
              name="fullName"
              className="w-full bg-background border border-primary/30 rounded-lg px-4 py-2 text-white"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Age Group *</label>
            <select
              required
              name="ageGroup"
              className="w-full bg-background border border-primary/30 rounded-lg px-4 py-2 text-white"
              value={formData.ageGroup}
              onChange={handleInputChange}
            >
              <option value="">Select Age Group</option>
              <option value="7-10">7-10</option>
              <option value="11-14">11-14</option>
              <option value="15-18">15-18</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Interests (Select all that apply)</label>
            <div className="grid grid-cols-2 gap-2">
              {["mathematics", "science", "language", "history"].map((interest) => (
                <label key={interest} className="flex items-center space-x-2 text-gray-300">
                  <input
                    type="checkbox"
                    name={interest}
                    checked={formData.interests[interest as keyof typeof formData.interests]}
                    onChange={handleCheckboxChange}
                    className="accent-primary"
                  />
                  <span className="capitalize">{interest}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-background font-medium py-3 rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Join Waitlist"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default WaitlistModal;
