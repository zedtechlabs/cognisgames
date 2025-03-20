
import React from 'react';

interface AnswerOptionsProps {
  options: number[];
  onSelect: (answer: number) => void;
  selectedAnswer: number | null;
  correctAnswer: number | null;
  revealed: boolean;
}

const AnswerOptions: React.FC<AnswerOptionsProps> = ({ 
  options, 
  onSelect, 
  selectedAnswer, 
  correctAnswer, 
  revealed 
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 w-full animate-fade-in">
      {options.map((option, index) => {
        // Determine button styling based on game state
        let buttonClass = "answer-option flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg text-xl font-medium";
        
        if (revealed) {
          if (option === correctAnswer) {
            buttonClass += " bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-400";
          } else if (option === selectedAnswer) {
            buttonClass += " bg-gradient-to-r from-red-500 to-rose-600 text-white border-red-400";
          } else {
            buttonClass += " bg-gray-700/40 text-white border-gray-600/40";
          }
        } else {
          buttonClass += " bg-gradient-to-r from-amber-600/80 to-yellow-700/80 hover:from-amber-600 hover:to-yellow-700 text-white border border-amber-500/60";
        }
        
        return (
          <button
            key={index}
            className={buttonClass}
            onClick={() => !revealed && onSelect(option)}
            disabled={revealed}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default AnswerOptions;
