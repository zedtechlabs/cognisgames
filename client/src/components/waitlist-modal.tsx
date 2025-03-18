
import { motion } from 'framer-motion';
import { useState } from 'react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameName: string;
}

export const WaitlistModal = ({ isOpen, onClose, gameName }: WaitlistModalProps) => {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    ageGroup: '',
    interests: {
      mathematics: false,
      science: false,
      language: false,
      history: false
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add API call to save waitlist entry
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
          <div>
            <label className="block text-gray-300 mb-2">Email Address *</label>
            <input
              type="email"
              required
              className="w-full bg-background border border-primary/30 rounded-lg px-4 py-2 text-white"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Full Name *</label>
            <input
              type="text"
              required
              className="w-full bg-background border border-primary/30 rounded-lg px-4 py-2 text-white"
              value={formData.fullName}
              onChange={e => setFormData({...formData, fullName: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Age Group</label>
            <select 
              className="w-full bg-background border border-primary/30 rounded-lg px-4 py-2 text-white"
              value={formData.ageGroup}
              onChange={e => setFormData({...formData, ageGroup: e.target.value})}
            >
              <option value="">Select age group</option>
              <option value="8-12">8-12 years</option>
              <option value="13-16">13-16 years</option>
              <option value="17+">17+ years</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Interests (Select all that apply)</label>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(formData.interests).map(([key, value]) => (
                <label key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={e => setFormData({
                      ...formData,
                      interests: {...formData.interests, [key]: e.target.checked}
                    })}
                    className="rounded border-primary/30 bg-background text-primary focus:ring-primary"
                  />
                  <span className="text-gray-300 capitalize">{key}</span>
                </label>
              ))}
            </div>
          </div>

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
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameName: string;
}

const WaitlistModal = ({ isOpen, onClose, gameName }: WaitlistModalProps) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ email, fullName, ageGroup, interests, gameName });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-card border-2 border-primary rounded-xl p-8 w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h2 className="orbitron text-2xl font-bold text-white mb-6">Join the Waitlist</h2>
            <p className="text-gray-400 mb-6">Be among the first to try {gameName} when it's ready.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-background border border-primary/30 rounded-lg p-3 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-background border border-primary/30 rounded-lg p-3 text-white"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div>
                <select
                  className="w-full bg-background border border-primary/30 rounded-lg p-3 text-white"
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value)}
                  required
                >
                  <option value="">Select Age Group</option>
                  <option value="0-12">0-12</option>
                  <option value="13-17">13-17</option>
                  <option value="18+">18+</option>
                </select>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Interests</p>
                <div className="flex flex-wrap gap-2">
                  {['Mathematics', 'Science', 'Language', 'History'].map((interest) => (
                    <label key={interest} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={interest}
                        checked={interests.includes(interest)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setInterests([...interests, interest]);
                          } else {
                            setInterests(interests.filter(i => i !== interest));
                          }
                        }}
                        className="accent-primary"
                      />
                      <span className="text-white">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-background font-medium py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Join Waitlist
              </button>
            </form>
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <i className="fas fa-times"></i>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WaitlistModal;
