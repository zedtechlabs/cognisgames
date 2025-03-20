
import { Operation } from "../context/GameContext";

// Calculate the answer based on the operation and numbers
export const calculateAnswer = (numbers: number[], operation: Operation): number => {
  if (numbers.length === 0) return 0;
  
  let result = numbers[0];
  
  for (let i = 1; i < numbers.length; i++) {
    switch (operation) {
      case 'addition':
        result += numbers[i];
        break;
      case 'subtraction':
        result -= numbers[i];
        break;
      case 'multiplication':
        result *= numbers[i];
        break;
    }
  }
  
  return result;
};

// Generate plausible options for multiple choice
export const generateOptions = (correctAnswer: number, difficulty: 'single' | 'double' | 'triple'): number[] => {
  const options: number[] = [correctAnswer];
  
  // Determine the range for wrong answers based on difficulty
  let range: number;
  switch (difficulty) {
    case 'single':
      range = 5;
      break;
    case 'double':
      range = 20;
      break;
    case 'triple':
      range = 100;
      break;
  }
  
  // Generate 3 incorrect options
  while (options.length < 4) {
    // Create a plausible wrong answer near the correct answer
    const offset = Math.floor(Math.random() * range) + 1;
    const sign = Math.random() > 0.5 ? 1 : -1;
    const wrongAnswer = correctAnswer + (offset * sign);
    
    // Ensure no duplicates
    if (!options.includes(wrongAnswer)) {
      options.push(wrongAnswer);
    }
  }
  
  // Shuffle the options
  return shuffle(options);
};

// Fisher-Yates shuffle algorithm
export const shuffle = <T>(array: T[]): T[] => {
  const result = [...array];
  
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  
  return result;
};

// Format operation to display symbol
export const getOperationSymbol = (operation: Operation): string => {
  switch (operation) {
    case 'addition':
      return '+';
    case 'subtraction':
      return '-';
    case 'multiplication':
      return '×';
    default:
      return '';
  }
};

// Format time in MM:SS format
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Helper for creating a difficulty display name
export const getDifficultyName = (difficulty: 'single' | 'double' | 'triple'): string => {
  switch (difficulty) {
    case 'single':
      return 'Single Digit';
    case 'double':
      return 'Double Digit';
    case 'triple':
      return 'Triple Digit';
    default:
      return '';
  }
};

// Helper for creating an operation display name
export const getOperationName = (operation: Operation): string => {
  switch (operation) {
    case 'addition':
      return 'Addition';
    case 'subtraction':
      return 'Subtraction';
    case 'multiplication':
      return 'Multiplication';
    default:
      return '';
  }
};
