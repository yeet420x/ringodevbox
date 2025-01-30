import React, { useEffect, useState } from 'react';
import '../../styles/InitialLoader.css';

function InitialLoader({ onComplete }) {
  const [snake, setSnake] = useState(Array.from({ length: 25 }, () => ({ x: 0, y: 0 })));
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Start loading timeout immediately
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
      onComplete(); // Ensure onComplete is called
    }, 10000);

    // Only run snake animation if still loading
    if (!isLoading) {
      return () => clearTimeout(loadingTimeout);
    }

    const GRID_W = 30;
    const GRID_H = 20;
    const borderPattern = [];
    
    // Top edge
    for (let x = 4; x < GRID_W - 4; x++) borderPattern.push({ x, y: 4 });
    // Right edge
    for (let y = 4; y < GRID_H - 4; y++) borderPattern.push({ x: GRID_W - 5, y });
    // Bottom edge
    for (let x = GRID_W - 5; x >= 4; x--) borderPattern.push({ x, y: GRID_H - 5 });
    // Left edge
    for (let y = GRID_H - 5; y >= 4; y--) borderPattern.push({ x: 4, y });

    const moveSnake = () => {
      if (!isLoading) return; // Stop movement if not loading
      
      if (currentPathIndex >= borderPattern.length) {
        setCurrentPathIndex(0);
        return;
      }

      const targetPos = borderPattern[currentPathIndex];
      const newSnake = [...snake];
      newSnake.unshift({ x: targetPos.x, y: targetPos.y });
      newSnake.pop();

      setSnake(newSnake);
      setCurrentPathIndex(prev => prev + 1);
    };

    const moveInterval = setInterval(moveSnake, 50);

    // Cleanup function
    return () => {
      clearInterval(moveInterval);
      clearTimeout(loadingTimeout);
    };
  }, [currentPathIndex, snake, onComplete, isLoading]);

  // Don't render if not loading
  if (!isLoading) return null;

  return (
    <div className="initial-loader">
      <div className="loader-container">
        <div className="loader-grid">
          {snake.map((segment, index) => (
            <div
              key={index}
              className={`loader-segment ${index === 0 ? 'head' : 'body'}`}
              style={{
                left: `${(segment.x / 30) * 100}%`,
                top: `${(segment.y / 20) * 100}%`,
                opacity: Math.max(1 - index / snake.length, 0.8)
              }}
            />
          ))}
        </div>
        <div className="loader-content">
          <div className="loader-gif">
            <img src="/src/assets/nokia.gif" alt="Loading..." />
          </div>
          <div className="nokia-loading-text">
            <span>N</span>
            <span>O</span>
            <span>K</span>
            <span>I</span>
            <span>A</span>
            <span>&nbsp;</span>
            <span>I</span>
            <span>S</span>
            <span>&nbsp;</span>
            <span>L</span>
            <span>O</span>
            <span>A</span>
            <span>D</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InitialLoader; 