
import React, { useState, useEffect, useRef } from 'react';
import { getOperationSymbol } from '../utils/gameUtils';
import { Operation } from '../context/GameContext';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface NumberDisplayProps {
  numbers: number[];
  visibleIndex: number;
  operation: Operation;
}

const NumberDisplay: React.FC<NumberDisplayProps> = ({ numbers, visibleIndex, operation }) => {
  const [animation, setAnimation] = useState<'enter' | 'exit' | null>(null);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<number>(100);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  
  // Add floating number animations periodically
  useEffect(() => {
    if (!containerRef.current) return;
    
    const interval = setInterval(() => {
      addFloatingNumber();
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Countdown timer effect with fixed timing
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (visibleIndex >= 0 && visibleIndex < numbers.length) {
      // Reset countdown when a new number is shown
      setCountdown(100);
      
      // Create a new timer with consistent timing
      timerRef.current = window.setInterval(() => {
        setCountdown(prev => {
          const newValue = prev - 1;
          if (newValue <= 0) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            return 0;
          }
          return newValue;
        });
      }, 20); // Update every 20ms for smooth progress
    }
    
    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [visibleIndex, numbers.length]);
  
  // Create floating gold numbers for decoration
  const addFloatingNumber = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const floatingNumber = document.createElement('div');
    floatingNumber.className = 'floating-number';
    floatingNumber.textContent = String(Math.floor(Math.random() * 10));
    
    // Random position within container, but avoid center
    let left, top;
    
    // Keep numbers at the edges of the container
    if (Math.random() > 0.5) {
      left = Math.random() > 0.5 ? Math.random() * 20 : 80 + Math.random() * 20;
      top = Math.random() * container.offsetHeight;
    } else {
      left = Math.random() * container.offsetWidth;
      top = Math.random() > 0.5 ? Math.random() * 20 : 80 + Math.random() * 20;
    }
    
    floatingNumber.style.left = `${left}px`;
    floatingNumber.style.top = `${top}px`;
    
    container.appendChild(floatingNumber);
    
    // Remove element after animation completes
    setTimeout(() => {
      if (floatingNumber.parentNode === container) {
        container.removeChild(floatingNumber);
      }
    }, 4000);
  };
  
  // Add mining effects on number click
  const addMiningEffect = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const mining = document.createElement('div');
    mining.className = 'mining';
    
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mining.style.left = `${x}px`;
    mining.style.top = `${y}px`;
    
    container.appendChild(mining);
    
    // Remove element after animation completes
    setTimeout(() => {
      if (mining.parentNode === container) {
        container.removeChild(mining);
      }
    }, 2000);
  };
  
  // Handle number transitions with animations
  useEffect(() => {
    if (visibleIndex >= 0 && visibleIndex < numbers.length) {
      // Start exit animation for current number if exists
      if (currentNumber !== null) {
        setAnimation('exit');
        
        // After exit animation, show new number with enter animation
        const timeout = setTimeout(() => {
          setCurrentNumber(numbers[visibleIndex]);
          setAnimation('enter');
        }, 500); // Match the animation duration
        
        return () => clearTimeout(timeout);
      } else {
        // First number, just enter
        setCurrentNumber(numbers[visibleIndex]);
        setAnimation('enter');
      }
    }
  }, [visibleIndex, numbers]);

  // Handle animation end
  const handleAnimationEnd = () => {
    if (animation === 'enter') {
      setAnimation(null);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="flex flex-col items-center justify-center h-52 relative"
      onClick={addMiningEffect}
    >
      {visibleIndex === -1 ? (
        <div className="text-center text-xl text-amber-600 animate-pulse-scale">
          Get ready to mine some gold...
        </div>
      ) : (
        <>
          {/* Countdown Timer */}
          <div className="absolute top-2 right-2 w-10 h-10">
            <CircularProgressbar 
              value={countdown} 
              styles={buildStyles({
                pathColor: `rgba(245, 158, 11, ${countdown/100})`,
                trailColor: 'rgba(229, 231, 235, 0.3)',
                pathTransition: 'linear',
              })} 
            />
          </div>
          
          {/* Current Number Display */}
          <div className="w-full h-full flex items-center justify-center">
            {currentNumber !== null && (
              <div 
                className={`number-display ${animation === 'enter' ? 'number-animation-enter' : ''} ${animation === 'exit' ? 'number-animation-exit' : ''} text-transparent bg-clip-text bg-gradient-to-br from-amber-500 to-yellow-600`}
                onAnimationEnd={handleAnimationEnd}
              >
                {visibleIndex > 0 && <span className="mr-4 text-amber-600">{getOperationSymbol(operation)}</span>}
                {currentNumber}
              </div>
            )}
          </div>
          
          {/* Number Progress Indicator */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1">
            {numbers.map((_, index) => (
              <div 
                key={index}
                className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                  index <= visibleIndex ? 'bg-gradient-to-r from-amber-400 to-yellow-600' : 'bg-amber-100'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NumberDisplay;
