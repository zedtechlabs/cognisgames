
import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import NumberDisplay from './NumberDisplay';
import AnswerOptions from './AnswerOptions';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { formatTime, getOperationName, getDifficultyName } from '../utils/gameUtils';
import { Timer, ChevronRight } from 'lucide-react';

const GameScreen: React.FC = () => {
  const { gameState, showNextNumber, selectAnswer } = useGame();
  const [showAnswers, setShowAnswers] = useState(false);
  
  // Show answer options once all numbers have been displayed AND countdown is complete
  useEffect(() => {
    if (gameState.visibleNumberIndex === gameState.numberCount - 1) {
      // Delay showing answers to ensure the last number's countdown completes
      const timeout = setTimeout(() => {
        setShowAnswers(true);
      }, 2000); // Wait for countdown to finish (matches the timeInterval in GameContext)
      
      return () => clearTimeout(timeout);
    } else {
      setShowAnswers(false);
    }
  }, [gameState.visibleNumberIndex, gameState.numberCount]);
  
  const handleAnswerSelect = (answer: number) => {
    selectAnswer(answer);
  };
  
  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in">
      {/* Game Info Bar */}
      <div className="glass-panel rounded-2xl p-4 mb-6 flex items-center justify-between bg-gradient-to-r from-amber-400/20 to-yellow-500/20 backdrop-blur-md border border-yellow-500/20 relative z-10">
        <div className="flex items-center space-x-2">
          <div className="chip bg-amber-500 text-white">
            {getDifficultyName(gameState.difficulty)}
          </div>
          <div className="chip bg-yellow-500 text-white">
            {getOperationName(gameState.operation)}
          </div>
          <div className="chip bg-amber-600 text-white">
            {gameState.numberCount} Numbers
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <Timer className="h-4 w-4 text-amber-600" />
          <span className="font-medium text-black">{formatTime(gameState.timeRemaining)}</span>
        </div>
      </div>
      
      {/* Main Game Area */}
      <div className="glass-panel rounded-3xl p-8 mb-6 bg-gradient-to-br from-amber-400/10 to-yellow-500/10 backdrop-blur-md border border-amber-200/20 shadow-xl relative z-10">
        {/* Progress Bar */}
        <Progress 
          value={(gameState.visibleNumberIndex + 1) / gameState.numberCount * 100} 
          className="h-2 mb-8 bg-amber-950/20"
        />
        
        {!showAnswers && (
          <NumberDisplay 
            numbers={gameState.currentNumbers}
            visibleIndex={gameState.visibleNumberIndex}
            operation={gameState.operation}
          />
        )}
        
        {/* Answer Options */}
        <div className={`mt-8 transition-opacity duration-500 ${showAnswers ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          {showAnswers ? (
            <AnswerOptions 
              options={gameState.options}
              onSelect={handleAnswerSelect}
              selectedAnswer={gameState.selectedAnswer}
              correctAnswer={null}
              revealed={false}
            />
          ) : (
            <div className="h-24 flex items-center justify-center">
              <p className="text-gray-600 text-center">
                {gameState.visibleNumberIndex < 0 
                  ? "Get ready..." 
                  : gameState.visibleNumberIndex < gameState.numberCount - 1 
                    ? "Remember the numbers!" 
                    : "Calculating answer..."}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Manual Next Button (for non-automatic mode) */}
      {!gameState.isAutomatic && gameState.visibleNumberIndex < gameState.numberCount - 1 && (
        <Button 
          onClick={showNextNumber} 
          size="lg" 
          className="w-full py-6 text-lg rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 shadow-lg hover:shadow-amber-500/20 transition-all border-0 relative z-10"
        >
          Next Number <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default GameScreen;
