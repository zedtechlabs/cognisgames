
import React, { useState } from 'react';
import { Operation, GameSettings, useGame } from '../context/GameContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, Minus, X, Brain } from 'lucide-react';

const GameSetup: React.FC = () => {
  const { startGame } = useGame();
  const [settings, setSettings] = useState<GameSettings>({
    difficulty: 'single',
    operation: 'addition',
    numberCount: 3,
    timeInterval: 2000,
    isAutomatic: true,
  });

  const handleDifficultyChange = (value: string) => {
    setSettings(prev => ({
      ...prev,
      difficulty: value as 'single' | 'double' | 'triple',
    }));
  };

  const handleOperationChange = (value: Operation) => {
    setSettings(prev => ({
      ...prev,
      operation: value,
    }));
  };

  const handleNumberCountChange = (value: number[]) => {
    setSettings(prev => ({
      ...prev,
      numberCount: value[0],
    }));
  };

  const handleTimeIntervalChange = (value: number[]) => {
    setSettings(prev => ({
      ...prev,
      timeInterval: value[0],
    }));
  };

  const handleIsAutomaticChange = (checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      isAutomatic: checked,
    }));
  };

  const handleStartGame = () => {
    startGame(settings);
  };

  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in">
      <div className="glass-panel rounded-3xl p-8 mb-6 bg-gradient-to-br from-amber-400/10 to-yellow-600/10 backdrop-blur-md border border-amber-200/20">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2 text-black">Number Rush</h1>
          <p className="text-muted-foreground">
            Test your mental math skills and challenge yourself
          </p>
        </div>

        <Tabs defaultValue="standard" className="w-full">
          <TabsList className="w-full mb-6 bg-amber-950/20 border border-amber-500/20">
            <TabsTrigger value="standard" className="w-1/2 text-black data-[state=active]:bg-amber-500 data-[state=active]:text-white">Standard</TabsTrigger>
            <TabsTrigger value="custom" className="w-1/2 text-black data-[state=active]:bg-amber-500 data-[state=active]:text-white">Custom</TabsTrigger>
          </TabsList>
          
          <TabsContent value="standard" className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-black">Difficulty</h3>
              <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                <Button 
                  variant={settings.difficulty === 'single' ? 'default' : 'outline'} 
                  onClick={() => handleDifficultyChange('single')}
                  className={`flex-1 ${settings.difficulty === 'single' ? 'bg-amber-500 hover:bg-amber-600' : 'border-amber-500/30 text-black'}`}
                >
                  Easy
                </Button>
                <Button 
                  variant={settings.difficulty === 'double' ? 'default' : 'outline'} 
                  onClick={() => handleDifficultyChange('double')}
                  className={`flex-1 ${settings.difficulty === 'double' ? 'bg-amber-500 hover:bg-amber-600' : 'border-amber-500/30 text-black'}`}
                >
                  Medium
                </Button>
                <Button 
                  variant={settings.difficulty === 'triple' ? 'default' : 'outline'} 
                  onClick={() => handleDifficultyChange('triple')}
                  className={`flex-1 ${settings.difficulty === 'triple' ? 'bg-amber-500 hover:bg-amber-600' : 'border-amber-500/30 text-black'}`}
                >
                  Hard
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-black">Operation</h3>
              <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                <Button 
                  variant={settings.operation === 'addition' ? 'default' : 'outline'} 
                  onClick={() => handleOperationChange('addition')}
                  className={`flex-1 ${settings.operation === 'addition' ? 'bg-amber-500 hover:bg-amber-600' : 'border-amber-500/30 text-black'}`}
                >
                  <Plus className="mr-1 h-4 w-4" /> Add
                </Button>
                <Button 
                  variant={settings.operation === 'subtraction' ? 'default' : 'outline'} 
                  onClick={() => handleOperationChange('subtraction')}
                  className={`flex-1 ${settings.operation === 'subtraction' ? 'bg-amber-500 hover:bg-amber-600' : 'border-amber-500/30 text-black'}`}
                >
                  <Minus className="mr-1 h-4 w-4" /> Sub
                </Button>
                <Button 
                  variant={settings.operation === 'multiplication' ? 'default' : 'outline'} 
                  onClick={() => handleOperationChange('multiplication')}
                  className={`flex-1 text-xs sm:text-sm ${settings.operation === 'multiplication' ? 'bg-amber-500 hover:bg-amber-600' : 'border-amber-500/30 text-black'}`}
                >
                  <X className="mr-1 h-4 w-4" /> Mult
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold text-black">Number Complexity</h3>
                <span className="text-sm text-black">
                  {settings.difficulty === 'single' ? 'Single Digit' : 
                   settings.difficulty === 'double' ? 'Double Digit' : 'Triple Digit'}
                </span>
              </div>
              <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                <Button 
                  variant={settings.difficulty === 'single' ? 'default' : 'outline'} 
                  onClick={() => handleDifficultyChange('single')}
                  className={`flex-1 ${settings.difficulty === 'single' ? 'bg-amber-500 hover:bg-amber-600' : 'border-amber-500/30 text-black'}`}
                >
                  1-9
                </Button>
                <Button 
                  variant={settings.difficulty === 'double' ? 'default' : 'outline'} 
                  onClick={() => handleDifficultyChange('double')}
                  className={`flex-1 ${settings.difficulty === 'double' ? 'bg-amber-500 hover:bg-amber-600' : 'border-amber-500/30 text-black'}`}
                >
                  10-99
                </Button>
                <Button 
                  variant={settings.difficulty === 'triple' ? 'default' : 'outline'} 
                  onClick={() => handleDifficultyChange('triple')}
                  className={`flex-1 ${settings.difficulty === 'triple' ? 'bg-amber-500 hover:bg-amber-600' : 'border-amber-500/30 text-black'}`}
                >
                  100-999
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold text-black">Number of Operands</h3>
                <span className="text-sm text-black">
                  {settings.numberCount} numbers
                </span>
              </div>
              <Slider 
                defaultValue={[3]} 
                min={2} 
                max={5} 
                step={1} 
                value={[settings.numberCount]}
                onValueChange={handleNumberCountChange}
                className="bg-amber-950/30"
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-black">Operation</h3>
              <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                <Button 
                  variant={settings.operation === 'addition' ? 'default' : 'outline'} 
                  onClick={() => handleOperationChange('addition')}
                  className={`flex-1 ${settings.operation === 'addition' ? 'bg-amber-500 hover:bg-amber-600' : 'border-amber-500/30 text-black'}`}
                >
                  <Plus className="mr-1 h-4 w-4" /> Add
                </Button>
                <Button 
                  variant={settings.operation === 'subtraction' ? 'default' : 'outline'} 
                  onClick={() => handleOperationChange('subtraction')}
                  className={`flex-1 ${settings.operation === 'subtraction' ? 'bg-amber-500 hover:bg-amber-600' : 'border-amber-500/30 text-black'}`}
                >
                  <Minus className="mr-1 h-4 w-4" /> Sub
                </Button>
                <Button 
                  variant={settings.operation === 'multiplication' ? 'default' : 'outline'} 
                  onClick={() => handleOperationChange('multiplication')}
                  className={`flex-1 text-xs sm:text-sm ${settings.operation === 'multiplication' ? 'bg-amber-500 hover:bg-amber-600' : 'border-amber-500/30 text-black'}`}
                >
                  <X className="mr-1 h-4 w-4" /> Mult
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-black">Timing Mode</h3>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="automatic-mode" className="text-black">Auto</Label>
                  <Switch 
                    id="automatic-mode" 
                    checked={settings.isAutomatic}
                    onCheckedChange={handleIsAutomaticChange}
                    className="data-[state=checked]:bg-amber-500"
                  />
                </div>
              </div>
              {settings.isAutomatic && (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-black">Time Between Numbers</span>
                    <span className="text-sm text-black">
                      {(settings.timeInterval / 1000).toFixed(1)} seconds
                    </span>
                  </div>
                  <Slider 
                    defaultValue={[2000]} 
                    min={500} 
                    max={5000} 
                    step={500} 
                    value={[settings.timeInterval]}
                    onValueChange={handleTimeIntervalChange}
                    className="bg-amber-950/30"
                  />
                </div>
              )}
              {!settings.isAutomatic && (
                <p className="text-sm text-black">
                  In manual mode, you'll need to click "Next" to reveal each number.
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Button 
        onClick={handleStartGame} 
        size="lg" 
        className="w-full py-6 text-lg rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 shadow-lg hover:shadow-amber-500/20 transition-all border-0"
      >
        Start Game
      </Button>
    </div>
  );
};

export default GameSetup;
