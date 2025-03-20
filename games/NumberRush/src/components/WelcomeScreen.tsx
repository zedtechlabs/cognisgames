
import React from 'react';
import { Button } from '@/components/ui/button';
import { useGame } from '../context/GameContext';
import { TrendingUp, Zap, Brain } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
  onStats: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onStats }) => {
  const { gameState } = useGame();
  
  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in">
      <div className="glass-panel rounded-3xl p-8 mb-8 bg-gradient-to-br from-amber-400/10 to-yellow-600/10 backdrop-blur-md border border-amber-200/20 shadow-xl">
        {/* Logo and Title */}
        <div className="text-center mb-10">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center shadow-lg animate-pulse-scale">
            <Brain className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-2 text-black">
            Number Rush
          </h1>
          <p className="text-muted-foreground text-black">
            Challenge your brain with a fast-paced number game
          </p>
        </div>
        
        {/* Game Stats Preview */}
        {gameState.totalGamesPlayed > 0 && (
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 mb-8 border border-amber-200/10">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-muted-foreground text-xs text-black">Games</p>
                <p className="text-2xl font-bold text-black">{gameState.totalGamesPlayed}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs text-black">Accuracy</p>
                <p className="text-2xl font-bold text-black">
                  {gameState.totalGamesPlayed > 0 
                    ? Math.round((gameState.correctAnswers / gameState.totalGamesPlayed) * 100)
                    : 0}%
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs text-black">Coins</p>
                <p className="text-2xl font-bold text-black">{gameState.totalCoins}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Call to Action */}
        <div className="text-center mb-6">
          <p className="text-muted-foreground text-black mb-4">
            Challenge yourself with different operations and difficulty levels.
            Track your progress and earn points!
          </p>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="space-y-4">
        <Button 
          onClick={onStart} 
          size="lg" 
          className="w-full py-6 text-lg rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 shadow-lg hover:shadow-amber-500/20 transition-all border-0"
        >
          <Zap className="mr-2 h-5 w-5" /> Start Game
        </Button>
        
        <Button 
          onClick={onStats} 
          variant="outline"
          className="w-full py-6 text-lg rounded-xl border-amber-200/20 bg-white/5 hover:bg-white/10 text-black"
        >
          <TrendingUp className="mr-2 h-5 w-5" /> View Statistics
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
