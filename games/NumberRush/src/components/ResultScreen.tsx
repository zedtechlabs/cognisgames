
import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import AnswerOptions from './AnswerOptions';
import { Button } from '@/components/ui/button';
import { getOperationSymbol } from '../utils/gameUtils';
import { Trophy, Coins, RotateCcw, Clock, CheckCircle, XCircle, BarChart3, Pickaxe } from 'lucide-react';

interface ResultScreenProps {
  onPlayAgain?: () => void;
  onGoToStats?: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ onPlayAgain, onGoToStats }) => {
  const { gameState, resetGame } = useGame();
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);
  
  // Determine if the player's answer was correct
  const isCorrect = gameState.selectedAnswer === gameState.correctAnswer;
  
  // Calculate time taken
  const timeTaken = gameState.gameEndTime 
    ? Math.floor((gameState.gameEndTime - gameState.gameStartTime) / 1000) 
    : 0;
  
  // Show coin animation after a delay
  useEffect(() => {
    if (isCorrect && gameState.coins > 0) {
      const timeout = setTimeout(() => {
        setShowCoinAnimation(true);
      }, 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [isCorrect, gameState.coins]);

  const handleResetGame = () => {
    resetGame();
    if (onPlayAgain) onPlayAgain();
  };
  
  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in">
      <div className="glass-panel rounded-3xl p-8 mb-6 bg-gradient-to-br from-amber-400/10 to-yellow-600/10 backdrop-blur-md border border-amber-200/20">
        {/* Result Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full mb-4">
            {isCorrect ? (
              <CheckCircle className="h-20 w-20 text-green-500 animate-scale-in" />
            ) : (
              <XCircle className="h-20 w-20 text-red-500 animate-scale-in" />
            )}
          </div>
          <h2 className="text-3xl font-bold mb-2 text-black">
            {isCorrect ? "Correct Answer!" : "Incorrect Answer"}
          </h2>
          <p className="text-gray-600">
            {isCorrect 
              ? "Great job solving the problem!" 
              : "Keep practicing, you'll get it next time!"}
          </p>
        </div>
        
        {/* Problem Summary */}
        <div className="bg-amber-950/20 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-amber-500/20">
          <h3 className="font-semibold text-black mb-3">Problem</h3>
          <div className="flex items-center justify-center flex-wrap gap-2 text-lg">
            {gameState.currentNumbers.map((num, index) => (
              <React.Fragment key={index}>
                <span className="font-medium text-black">{num}</span>
                {index < gameState.currentNumbers.length - 1 && (
                  <span className="text-black font-medium">
                    {getOperationSymbol(gameState.operation)}
                  </span>
                )}
              </React.Fragment>
            ))}
            <span className="font-medium text-black">=</span>
            <span className="font-bold text-black">{gameState.correctAnswer}</span>
          </div>
        </div>
        
        {/* Your answer section */}
        <div className="mb-6">
          <h3 className="font-semibold text-black mb-3">Your Answer</h3>
          <AnswerOptions 
            options={gameState.options}
            onSelect={() => {}}
            selectedAnswer={gameState.selectedAnswer}
            correctAnswer={gameState.correctAnswer}
            revealed={true}
          />
        </div>
        
        {/* Performance Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-amber-950/20 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center border border-amber-500/20">
            <Clock className="h-5 w-5 text-blue-600 mb-1" />
            <span className="text-sm text-gray-600">Time</span>
            <span className="text-xl font-bold text-black">{timeTaken} seconds</span>
          </div>
          <div className="bg-amber-950/20 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center border border-amber-500/20">
            <Trophy className="h-5 w-5 text-amber-500 mb-1" />
            <span className="text-sm text-gray-600">Score</span>
            <span className="text-xl font-bold text-black">{gameState.score}</span>
          </div>
        </div>
        
        {/* Coins Earned (shown only if correct) */}
        {isCorrect && gameState.coins > 0 && (
          <div className="relative bg-amber-950/30 rounded-2xl p-4 mb-8 overflow-hidden border border-amber-500/30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-black">Points Earned</h3>
                <p className="text-gray-600">Great performance!</p>
              </div>
              <div className="relative z-10 flex items-center space-x-2">
                <Coins className="h-6 w-6 text-yellow-500" />
                <span className="text-2xl font-bold text-black">+{gameState.coins}</span>
              </div>
            </div>
            {showCoinAnimation && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-3 w-3 rounded-full bg-yellow-400 animate-coin-earned"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button 
          onClick={handleResetGame} 
          variant="outline"
          className="py-6 rounded-xl border-amber-500/30 bg-amber-900/20 hover:bg-amber-900/30"
        >
          <RotateCcw className="mr-2 h-5 w-5" /> Play Again
        </Button>
        
        <Button 
          onClick={onGoToStats} 
          className="py-6 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 shadow-lg"
        >
          <BarChart3 className="mr-2 h-5 w-5" /> View Stats
        </Button>
      </div>
    </div>
  );
};

export default ResultScreen;
