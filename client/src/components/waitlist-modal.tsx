import { motion } from 'framer-motion';
import { useState } from 'react';

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
    console.log('Form Data Submitted:', formData);
    onClose();
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Address */}
          <div>
            <label className="block text-gray-300 mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              required
              className="w-full bg-background border border-primary/30 rounded-lg px-4 py-2 text-white"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-gray-300 mb-2">Full Name *</label>
            <input
              type="text"
              name="fullName"
              required
              className="w-full bg-background border border-primary/30 rounded-lg px-4 py-2 text-white"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>

          {/* Age Group Dropdown */}
          <div>
            <label className="block text-gray-300 mb-2">Age Group</label>
            <select
              name="ageGroup"
              required
              className="w-full bg-background border border-primary/30 rounded-lg px-4 py-2 text-white"
              value={formData.ageGroup}
              onChange={handleInputChange}
            >
              <option value="" disabled>Select your age group</option>
              <option value="0-6">0-6</option>
              <option value="7-10">7-10</option>
              <option value="11-13">11-13</option>
              <option value="14-16">14-16</option>
              <option value="17+">17+</option>
            </select>
          </div>

          {/* Interests (Checkboxes) */}
          <div>
            <label className="block text-gray-300 mb-2">Interests (Select all that apply)</label>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center text-white">
                <input
                  type="checkbox"
                  name="mathematics"
                  checked={formData.interests.mathematics}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Mathematics
              </label>
              <label className="flex items-center text-white">
                <input
                  type="checkbox"
                  name="science"
                  checked={formData.interests.science}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Science
              </label>
              <label className="flex items-center text-white">
                <input
                  type="checkbox"
                  name="language"
                  checked={formData.interests.language}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Language
              </label>
              <label className="flex items-center text-white">
                <input
                  type="checkbox"
                  name="history"
                  checked={formData.interests.history}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                History
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-background font-medium py-3 rounded-lg transition-colors"
          >
            JOIN WAITLIST
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default WaitlistModal;
