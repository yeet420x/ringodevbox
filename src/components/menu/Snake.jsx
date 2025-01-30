import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import '../../styles/Snake.css';

function Snake({ onBack }) {
  const [snake, setSnake] = useState([[2, 2]]);
  const [food, setFood] = useState([5, 5]);
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const gridSize = 8; // Smaller grid to fit screen better

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        onBack();
        return;
      }

      if (!gameStarted && e.key === 'Enter') {
        setGameStarted(true);
        return;
      }
      
      if (gameOver && e.key === 'Enter') {
        setSnake([[2, 2]]);
        setFood([5, 5]);
        setDirection('RIGHT');
        setGameOver(false);
        setScore(0);
        setGameStarted(true);
        return;
      }

      if (gameStarted && !gameOver) {
        switch (e.key) {
          case 'ArrowUp':
            if (direction !== 'DOWN') setDirection('UP');
            break;
          case 'ArrowDown':
            if (direction !== 'UP') setDirection('DOWN');
            break;
          case 'ArrowLeft':
            if (direction !== 'RIGHT') setDirection('LEFT');
            break;
          case 'ArrowRight':
            if (direction !== 'LEFT') setDirection('RIGHT');
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, gameOver, direction, onBack]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = [...prevSnake[0]];
        
        switch (direction) {
          case 'UP': head[1] -= 1; break;
          case 'DOWN': head[1] += 1; break;
          case 'LEFT': head[0] -= 1; break;
          case 'RIGHT': head[0] += 1; break;
          default: break;
        }

        if (head[0] < 0 || head[0] >= gridSize || head[1] < 0 || head[1] >= gridSize) {
          setGameOver(true);
          return prevSnake;
        }

        if (prevSnake.some(segment => segment[0] === head[0] && segment[1] === head[1])) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];
        
        if (head[0] === food[0] && head[1] === food[1]) {
          setScore(prev => prev + 1);
          let newFood;
          do {
            newFood = [
              Math.floor(Math.random() * gridSize),
              Math.floor(Math.random() * gridSize)
            ];
          } while (newSnake.some(segment => 
            segment[0] === newFood[0] && segment[1] === newFood[1]
          ));
          setFood(newFood);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, 200);
    return () => clearInterval(gameInterval);
  }, [direction, gameStarted, gameOver, food, gridSize]);

  return (
    <div className="nokia-screen">
      <div className="game-header">Snake II</div>
      <div className="game-container">
        <div className="game-grid">
          {Array.from({ length: gridSize }, (_, y) => (
            Array.from({ length: gridSize }, (_, x) => {
              const isSnake = snake.some(segment => 
                segment[0] === x && segment[1] === y
              );
              const isFood = food[0] === x && food[1] === y;
              const isHead = snake[0][0] === x && snake[0][1] === y;
              return (
                <div 
                  key={`${x}-${y}`}
                  className={`cell ${isHead ? 'head' : isSnake ? 'snake' : ''} ${isFood ? 'food' : ''}`}
                />
              );
            })
          ))}
        </div>
        <div className="game-score">Score: {score}</div>
        {!gameStarted && (
          <div className="game-overlay">Press Enter to Start</div>
        )}
        {gameOver && (
          <div className="game-overlay">Game Over - {score}</div>
        )}
      </div>
    </div>
  );
}

Snake.propTypes = {
  onBack: PropTypes.func.isRequired
};

export default Snake; 