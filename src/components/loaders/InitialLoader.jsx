import React, { useEffect, useState } from 'react';
import '../../styles/InitialLoader.css';

function InitialLoader({ onComplete }) {
  const [dots, setDots] = useState(Array.from({ length: 10 }, () => ({ x: 0, y: 0 })));
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [isGlowing, setIsGlowing] = useState(false);

  useEffect(() => {
    // Define the NOKIA letter pattern
    const letterPattern = [
      // N
      { x: 5, y: 5 }, { x: 5, y: 6 }, { x: 5, y: 7 }, { x: 5, y: 8 },
      { x: 6, y: 6 }, { x: 7, y: 7 },
      { x: 8, y: 5 }, { x: 8, y: 6 }, { x: 8, y: 7 }, { x: 8, y: 8 },
      // O
      { x: 10, y: 5 }, { x: 10, y: 6 }, { x: 10, y: 7 }, { x: 10, y: 8 },
      { x: 11, y: 5 }, { x: 11, y: 8 },
      { x: 12, y: 5 }, { x: 12, y: 6 }, { x: 12, y: 7 }, { x: 12, y: 8 },
      // K
      { x: 14, y: 5 }, { x: 14, y: 6 }, { x: 14, y: 7 }, { x: 14, y: 8 },
      { x: 15, y: 6 }, { x: 16, y: 5 }, { x: 16, y: 7 }, { x: 16, y: 8 },
      // I
      { x: 18, y: 5 }, { x: 18, y: 6 }, { x: 18, y: 7 }, { x: 18, y: 8 },
      // A
      { x: 20, y: 8 }, { x: 20, y: 7 }, { x: 20, y: 6 }, { x: 20, y: 5 },
      { x: 21, y: 5 }, { x: 22, y: 5 },
      { x: 22, y: 6 }, { x: 22, y: 7 }, { x: 22, y: 8 },
      { x: 21, y: 6 }
    ];

    const moveDots = () => {
      if (currentPathIndex < letterPattern.length) {
        const targetPos = letterPattern[currentPathIndex];
        setDots(prevDots => {
          const newDots = [...prevDots];
          newDots[currentPathIndex] = { x: targetPos.x, y: targetPos.y };
          return newDots;
        });
        setCurrentPathIndex(prev => prev + 1);
      } else {
        // When dots are done, wait 1 second then transform
        setTimeout(() => {
          setIsGlowing(true);
          // Wait 2 more seconds after transformation before completing
          setTimeout(onComplete, 2000);
        }, 1000);
        return true; // Signal to clear the interval
      }
    };

    const moveInterval = setInterval(() => {
      if (moveDots()) {
        clearInterval(moveInterval);
      }
    }, 100); // Faster dot movement (changed from 200 to 100)

    return () => {
      clearInterval(moveInterval);
    };
  }, [currentPathIndex, onComplete]);

  return (
    <div className="initial-loader">
      <div className="loader-container">
        <div className="loader-grid">
          {dots.map((dot, index) => (
            <div
              key={index}
              className={`loader-dot ${isGlowing ? 'fade' : ''}`}
              style={{
                left: `${(dot.x / 30) * 100}%`,
                top: `${(dot.y / 20) * 100}%`,
                transitionDelay: `${index * 0.05}s`
              }}
            />
          ))}
        </div>
        <div className={`loader-content ${isGlowing ? 'glow' : ''}`}>
          <div className="nokia-text">
            <span>N</span>
            <span>O</span>
            <span>K</span>
            <span>I</span>
            <span>A</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InitialLoader; 