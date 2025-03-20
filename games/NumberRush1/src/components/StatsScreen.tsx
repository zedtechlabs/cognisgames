
import React from 'react';
import { Button } from '@/components/ui/button';
import { useGame } from '../context/GameContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Award, Brain, Activity, Timer, Trophy } from 'lucide-react';

interface StatsScreenProps {
  onBack: () => void;
}

const StatsScreen: React.FC<StatsScreenProps> = ({ onBack }) => {
  const { gameState } = useGame();
  
  // Calculate stats
  const accuracy = gameState.totalGamesPlayed > 0 
    ? Math.round((gameState.correctAnswers / gameState.totalGamesPlayed) * 100) 
    : 0;
  
  const avgTimePerGame = gameState.totalGamesPlayed > 0 
    ? Math.round(gameState.totalTimePlayed / gameState.totalGamesPlayed) 
    : 0;
  
  // Prepare chart data
  const difficultyData = [
    { name: 'Easy', games: gameState.gamesPerDifficulty.single || 0 },
    { name: 'Medium', games: gameState.gamesPerDifficulty.double || 0 },
    { name: 'Hard', games: gameState.gamesPerDifficulty.triple || 0 },
  ];
  
  const operationData = [
    { name: 'Addition', games: gameState.gamesPerOperation.addition || 0 },
    { name: 'Subtraction', games: gameState.gamesPerOperation.subtraction || 0 },
    { name: 'Multiplication', games: gameState.gamesPerOperation.multiplication || 0 },
  ];
  
  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <div className="glass-panel rounded-3xl p-8 mb-6 bg-gradient-to-br from-amber-400/10 to-yellow-600/10 backdrop-blur-md border border-amber-200/20 shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-black">
            Statistics
          </h1>
          <Brain className="h-8 w-8 text-amber-400" />
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-amber-950/20 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center border border-amber-500/20">
            <Trophy className="h-6 w-6 text-amber-500 mb-2" />
            <p className="text-gray-600 text-xs">Games Played</p>
            <p className="text-2xl font-bold text-black">{gameState.totalGamesPlayed}</p>
          </div>
          
          <div className="bg-amber-950/20 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center border border-amber-500/20">
            <Award className="h-6 w-6 text-green-500 mb-2" />
            <p className="text-gray-600 text-xs">Accuracy</p>
            <p className="text-2xl font-bold text-black">{accuracy}%</p>
          </div>
          
          <div className="bg-amber-950/20 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center border border-amber-500/20">
            <Timer className="h-6 w-6 text-blue-600 mb-2" />
            <p className="text-gray-600 text-xs">Avg Time</p>
            <p className="text-2xl font-bold text-black">{avgTimePerGame}s</p>
          </div>
          
          <div className="bg-amber-950/20 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center border border-amber-500/20">
            <Activity className="h-6 w-6 text-red-500 mb-2" />
            <p className="text-gray-600 text-xs">Total Points</p>
            <p className="text-2xl font-bold text-black">{gameState.totalCoins}</p>
          </div>
        </div>
        
        {/* Charts Section */}
        {gameState.totalGamesPlayed > 0 ? (
          <div className="space-y-8">
            {/* Difficulty Distribution */}
            <div>
              <h3 className="font-semibold text-black mb-4">Difficulty Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={difficultyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.2)" />
                    <XAxis dataKey="name" stroke="#000000" />
                    <YAxis stroke="#000000" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255,255,255,0.9)', 
                        border: '1px solid rgba(0,0,0,0.3)',
                        borderRadius: '8px',
                        color: 'black'
                      }} 
                    />
                    <Bar dataKey="games" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Operation Distribution */}
            <div>
              <h3 className="font-semibold text-black mb-4">Operation Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={operationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.2)" />
                    <XAxis dataKey="name" stroke="#000000" />
                    <YAxis stroke="#000000" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255,255,255,0.9)', 
                        border: '1px solid rgba(0,0,0,0.3)',
                        borderRadius: '8px',
                        color: 'black'
                      }} 
                    />
                    <Bar dataKey="games" fill="#d97706" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">
              Play some games to see your statistics here!
            </p>
          </div>
        )}
      </div>
      
      {/* Back Button */}
      <Button 
        onClick={onBack} 
        variant="outline"
        className="w-full py-6 text-lg rounded-xl border-amber-200/20 bg-amber-900/20 hover:bg-amber-900/30"
      >
        <ArrowLeft className="mr-2 h-5 w-5" /> Back to Home
      </Button>
    </div>
  );
};

export default StatsScreen;
