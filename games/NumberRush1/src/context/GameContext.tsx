
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { generateOptions, calculateAnswer } from '../utils/gameUtils';

// Define operation types
export type Operation = 'addition' | 'subtraction' | 'multiplication';

// Define game state interface
export interface GameState {
  difficulty: 'single' | 'double' | 'triple';
  operation: Operation;
  numberCount: number;
  timeInterval: number;
  isAutomatic: boolean;
  currentNumbers: number[];
  visibleNumberIndex: number;
  options: number[];
  correctAnswer: number;
  score: number;
  coins: number;
  gameStatus: 'setup' | 'playing' | 'results';
  timeRemaining: number;
  gameStartTime: number;
  gameEndTime: number | null;
  selectedAnswer: number | null;
  // Stats properties
  totalGamesPlayed: number;
  correctAnswers: number;
  totalTimePlayed: number;
  totalCoins: number;
  gamesPerDifficulty: {
    single: number;
    double: number;
    triple: number;
  };
  gamesPerOperation: {
    addition: number;
    subtraction: number;
    multiplication: number;
  };
}

// Define context interface
interface GameContextType {
  gameState: GameState;
  startGame: (settings: GameSettings) => void;
  showNextNumber: () => void;
  selectAnswer: (answer: number) => void;
  resetGame: () => void;
}

// Define game settings interface
export interface GameSettings {
  difficulty: 'single' | 'double' | 'triple';
  operation: Operation;
  numberCount: number;
  timeInterval: number;
  isAutomatic: boolean;
}

// Create the context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Set up the provider
export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    difficulty: 'single',
    operation: 'addition',
    numberCount: 3,
    timeInterval: 2000,
    isAutomatic: true,
    currentNumbers: [],
    visibleNumberIndex: -1,
    options: [],
    correctAnswer: 0,
    score: 0,
    coins: 0,
    gameStatus: 'setup',
    timeRemaining: 0,
    gameStartTime: 0,
    gameEndTime: null,
    selectedAnswer: null,
    // Initialize stats with default values
    totalGamesPlayed: 0,
    correctAnswers: 0,
    totalTimePlayed: 0,
    totalCoins: 0,
    gamesPerDifficulty: {
      single: 0,
      double: 0,
      triple: 0,
    },
    gamesPerOperation: {
      addition: 0,
      subtraction: 0,
      multiplication: 0,
    },
  });

  // Load stats from localStorage when component mounts
  useEffect(() => {
    const savedStats = localStorage.getItem('numberRushStats');
    if (savedStats) {
      const parsedStats = JSON.parse(savedStats);
      setGameState(prev => ({
        ...prev,
        totalGamesPlayed: parsedStats.totalGamesPlayed || 0,
        correctAnswers: parsedStats.correctAnswers || 0,
        totalTimePlayed: parsedStats.totalTimePlayed || 0,
        totalCoins: parsedStats.totalCoins || 0,
        gamesPerDifficulty: parsedStats.gamesPerDifficulty || {
          single: 0,
          double: 0,
          triple: 0,
        },
        gamesPerOperation: parsedStats.gamesPerOperation || {
          addition: 0,
          subtraction: 0,
          multiplication: 0,
        },
      }));
    }
  }, []);

  // Timer effect for automatic mode
  useEffect(() => {
    let intervalId: number;
    
    if (gameState.gameStatus === 'playing' && gameState.isAutomatic && gameState.visibleNumberIndex < gameState.numberCount - 1) {
      intervalId = window.setInterval(() => {
        showNextNumber();
      }, gameState.timeInterval);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [gameState.gameStatus, gameState.isAutomatic, gameState.visibleNumberIndex, gameState.numberCount]);

  // Game timer effect
  useEffect(() => {
    let timerId: number;
    
    if (gameState.gameStatus === 'playing' && !gameState.gameEndTime) {
      timerId = window.setInterval(() => {
        const elapsedTime = Date.now() - gameState.gameStartTime;
        const remaining = Math.max(0, 60000 - elapsedTime); // 60 seconds max time
        
        setGameState(prev => ({
          ...prev,
          timeRemaining: Math.floor(remaining / 1000),
        }));
        
        if (remaining <= 0) {
          clearInterval(timerId);
          endGame(null);
        }
      }, 100);
    }
    
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [gameState.gameStatus, gameState.gameEndTime, gameState.gameStartTime]);

  // Generate numbers based on difficulty
  const generateGameNumbers = (difficulty: 'single' | 'double' | 'triple', count: number): number[] => {
    const numbers: number[] = [];
    
    for (let i = 0; i < count; i++) {
      let num: number;
      
      switch (difficulty) {
        case 'single':
          num = Math.floor(Math.random() * 9) + 1; // 1-9
          break;
        case 'double':
          num = Math.floor(Math.random() * 90) + 10; // 10-99
          break;
        case 'triple':
          num = Math.floor(Math.random() * 900) + 100; // 100-999
          break;
      }
      
      numbers.push(num);
    }
    
    return numbers;
  };

  // Adjust number count based on difficulty
  const getNumberCountForDifficulty = (difficulty: 'single' | 'double' | 'triple', baseCount: number): number => {
    switch (difficulty) {
      case 'single':
        return baseCount;
      case 'double':
        return Math.min(baseCount + 1, 5); // Add one more number for double digit
      case 'triple':
        return Math.min(baseCount + 2, 5); // Add two more numbers for triple digit
      default:
        return baseCount;
    }
  };

  // Start a new game
  const startGame = (settings: GameSettings) => {
    // Adjust number count based on difficulty
    const adjustedNumberCount = getNumberCountForDifficulty(settings.difficulty, settings.numberCount);
    
    const numbers = generateGameNumbers(settings.difficulty, adjustedNumberCount);
    const correctAnswer = calculateAnswer(numbers, settings.operation);
    const options = generateOptions(correctAnswer, settings.difficulty);
    
    setGameState({
      ...settings,
      numberCount: adjustedNumberCount,
      currentNumbers: numbers,
      visibleNumberIndex: -1,
      options,
      correctAnswer,
      score: 0,
      coins: 0,
      gameStatus: 'playing',
      timeRemaining: 60,
      gameStartTime: Date.now(),
      gameEndTime: null,
      selectedAnswer: null,
      // Preserve stats
      totalGamesPlayed: gameState.totalGamesPlayed,
      correctAnswers: gameState.correctAnswers,
      totalTimePlayed: gameState.totalTimePlayed,
      totalCoins: gameState.totalCoins,
      gamesPerDifficulty: gameState.gamesPerDifficulty,
      gamesPerOperation: gameState.gamesPerOperation,
    });
    
    // Show the first number immediately
    setTimeout(() => showNextNumber(), 500);
  };

  // Show the next number
  const showNextNumber = () => {
    if (gameState.visibleNumberIndex < gameState.numberCount - 1) {
      setGameState(prev => ({
        ...prev,
        visibleNumberIndex: prev.visibleNumberIndex + 1,
      }));
    }
  };

  // Handle answer selection
  const selectAnswer = (answer: number) => {
    // Only process if game is active and all numbers have been shown
    if (gameState.gameStatus === 'playing' && gameState.visibleNumberIndex === gameState.numberCount - 1) {
      endGame(answer);
    }
  };

  // End the game and calculate score
  const endGame = (selectedAnswer: number | null) => {
    const isCorrect = selectedAnswer === gameState.correctAnswer;
    const gameEndTime = Date.now();
    const timeTaken = (gameEndTime - gameState.gameStartTime) / 1000; // in seconds
    
    // Calculate score and coins
    let earnedScore = 0;
    let earnedCoins = 0;
    
    if (isCorrect) {
      // Base points
      earnedScore = 100;
      
      // Difficulty bonus
      const difficultyMultiplier = 
        gameState.difficulty === 'single' ? 1 :
        gameState.difficulty === 'double' ? 2 : 3;
        
      // Speed bonus (faster = more points)
      const speedBonus = Math.max(0, Math.floor(50 - timeTaken * 2));
      
      // Final score calculation
      earnedScore = earnedScore * difficultyMultiplier + speedBonus;
      
      // Coins calculation (simplify for now)
      earnedCoins = Math.ceil(earnedScore / 10);
    }
    
    // Update game state with results and update stats
    const newGameState: GameState = {
      ...gameState,
      gameStatus: 'results' as const,
      gameEndTime,
      selectedAnswer,
      score: earnedScore,
      coins: earnedCoins,
      totalGamesPlayed: gameState.totalGamesPlayed + 1,
      correctAnswers: isCorrect ? gameState.correctAnswers + 1 : gameState.correctAnswers,
      totalTimePlayed: gameState.totalTimePlayed + timeTaken,
      totalCoins: gameState.totalCoins + earnedCoins,
      gamesPerDifficulty: {
        ...gameState.gamesPerDifficulty,
        [gameState.difficulty]: gameState.gamesPerDifficulty[gameState.difficulty] + 1
      },
      gamesPerOperation: {
        ...gameState.gamesPerOperation,
        [gameState.operation]: gameState.gamesPerOperation[gameState.operation] + 1
      }
    };
    
    setGameState(newGameState);
    
    // Save stats to localStorage
    const statsToSave = {
      totalGamesPlayed: newGameState.totalGamesPlayed,
      correctAnswers: newGameState.correctAnswers,
      totalTimePlayed: newGameState.totalTimePlayed,
      totalCoins: newGameState.totalCoins,
      gamesPerDifficulty: newGameState.gamesPerDifficulty,
      gamesPerOperation: newGameState.gamesPerOperation,
    };
    
    localStorage.setItem('numberRushStats', JSON.stringify(statsToSave));
  };

  // Reset the game to setup screen
  const resetGame = () => {
    setGameState(prev => ({
      difficulty: 'single',
      operation: 'addition',
      numberCount: 3,
      timeInterval: 2000,
      isAutomatic: true,
      currentNumbers: [],
      visibleNumberIndex: -1,
      options: [],
      correctAnswer: 0,
      score: 0,
      coins: 0,
      gameStatus: 'setup',
      timeRemaining: 0,
      gameStartTime: 0,
      gameEndTime: null,
      selectedAnswer: null,
      // Preserve the stats
      totalGamesPlayed: prev.totalGamesPlayed,
      correctAnswers: prev.correctAnswers,
      totalTimePlayed: prev.totalTimePlayed,
      totalCoins: prev.totalCoins,
      gamesPerDifficulty: prev.gamesPerDifficulty,
      gamesPerOperation: prev.gamesPerOperation,
    }));
  };

  return (
    <GameContext.Provider value={{ gameState, startGame, showNextNumber, selectAnswer, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook for using the game context
export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
