
import React, { useState } from 'react';
import { GameProvider, useGame } from '../context/GameContext';
import GameSetup from '../components/GameSetup';
import GameScreen from '../components/GameScreen';
import ResultScreen from '../components/ResultScreen';
import WelcomeScreen from '../components/WelcomeScreen';
import StatsScreen from '../components/StatsScreen';

// Main game component that handles different screens based on game status
const GameContainer: React.FC = () => {
  const { gameState, resetGame } = useGame();
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'game' | 'stats'>('welcome');
  
  // Only show game-related screens when in game mode
  if (currentScreen === 'game') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        {gameState.gameStatus === 'setup' && <GameSetup />}
        {gameState.gameStatus === 'playing' && <GameScreen />}
        {gameState.gameStatus === 'results' && (
          <ResultScreen 
            onPlayAgain={() => resetGame()} 
            onGoToStats={() => setCurrentScreen('stats')} 
          />
        )}
      </div>
    );
  }
  
  // Show welcome screen
  if (currentScreen === 'welcome') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <WelcomeScreen onStart={() => setCurrentScreen('game')} onStats={() => setCurrentScreen('stats')} />
      </div>
    );
  }
  
  // Show stats screen
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <StatsScreen onBack={() => setCurrentScreen('welcome')} />
    </div>
  );
};

// Add floating golden numbers for background, but avoid card areas
const FloatingNumbers = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {[...Array(30)].map((_, i) => {
        // Create random positions that avoid the center area (where cards usually are)
        let left = Math.random() * 100;
        let top = Math.random() * 100;
        
        // Avoid the center 60% of the screen (where cards usually are)
        // This creates a 20% border area on all sides where numbers can appear
        if (left > 20 && left < 80 && top > 20 && top < 80) {
          // If in center area, move to edges
          if (Math.random() > 0.5) {
            left = Math.random() > 0.5 ? Math.random() * 15 : 85 + Math.random() * 15;
          } else {
            top = Math.random() > 0.5 ? Math.random() * 15 : 85 + Math.random() * 15;
          }
        }
        
        return (
          <div
            key={i}
            className="absolute font-bold text-yellow-500/70 animate-float"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              fontSize: `${Math.floor(Math.random() * 20) + 12}px`,
              animationDuration: `${3 + Math.random() * 7}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.7,
              textShadow: '0 0 5px rgba(234, 179, 8, 0.3)',
              zIndex: 0
            }}
          >
            {Math.floor(Math.random() * 10)}
          </div>
        );
      })}
    </div>
  );
};

// Main page component that wraps the game in the provider
const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 background-animate">
      <FloatingNumbers />
      <GameProvider>
        <GameContainer />
      </GameProvider>
    </div>
  );
};

export default Index;
