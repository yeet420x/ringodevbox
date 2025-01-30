import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../styles/Snake.css';

function Snake({ onBack }) {
  const GRID_SIZE = 8;
  const INITIAL_SPEED = 200;
  const SPEED_INCREASE = 10;
  const MIN_SPEED = 100;
  
  const [snake, setSnake] = useState([[2, 2]]);
  const [food, setFood] = useState([5, 5]);
  const [direction, setDirection] = useState('RIGHT');
  const [nextDirection, setNextDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showWalletInput, setShowWalletInput] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [gameSpeed, setGameSpeed] = useState(INITIAL_SPEED);
  const [showNokiaAnimation, setShowNokiaAnimation] = useState(false);

  const generateFood = () => {
    let newFood;
    do {
      newFood = [
        Math.floor(Math.random() * GRID_SIZE),
        Math.floor(Math.random() * GRID_SIZE)
      ];
    } while (snake.some(segment => 
      segment[0] === newFood[0] && segment[1] === newFood[1]
    ));
    return newFood;
  };

  const moveSnake = React.useCallback(() => {
    if (!gameStarted || gameOver) return;

    setSnake(prevSnake => {
      const head = [...prevSnake[0]];
      setDirection(nextDirection);
      
      switch (nextDirection) {
        case 'UP': head[1] = (head[1] - 1 + GRID_SIZE) % GRID_SIZE; break;
        case 'DOWN': head[1] = (head[1] + 1) % GRID_SIZE; break;
        case 'LEFT': head[0] = (head[0] - 1 + GRID_SIZE) % GRID_SIZE; break;
        case 'RIGHT': head[0] = (head[0] + 1) % GRID_SIZE; break;
        default: break;
      }

      if (prevSnake.some(segment => segment[0] === head[0] && segment[1] === head[1])) {
        setGameOver(true);
        if (score >= 60) {
          setShowNokiaAnimation(true);
          setTimeout(() => {
            setShowNokiaAnimation(false);
            setShowWalletInput(true);
          }, 3000);
        }
        return prevSnake;
      }

      const newSnake = [head];
      
      if (head[0] === food[0] && head[1] === food[1]) {
        newSnake.push(...prevSnake);
        setScore(prev => {
          const newScore = prev + 1;
          if (newScore % 5 === 0 && gameSpeed > MIN_SPEED) {
            setGameSpeed(speed => Math.max(speed - SPEED_INCREASE, MIN_SPEED));
          }
          return newScore;
        });
        setFood(generateFood());
      } else {
        newSnake.push(...prevSnake.slice(0, -1));
      }

      return newSnake;
    });
  }, [gameStarted, gameOver, nextDirection, GRID_SIZE, food, score, gameSpeed]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, gameSpeed);
    return () => clearInterval(gameLoop);
  }, [gameSpeed, gameStarted, gameOver, moveSnake]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameStarted && !gameOver) {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
          e.preventDefault();
          e.stopPropagation();
          
          switch (e.key) {
            case 'ArrowUp':
              if (direction !== 'DOWN') setNextDirection('UP');
              break;
            case 'ArrowDown':
              if (direction !== 'UP') setNextDirection('DOWN');
              break;
            case 'ArrowLeft':
              if (direction !== 'RIGHT') setNextDirection('LEFT');
              break;
            case 'ArrowRight':
              if (direction !== 'LEFT') setNextDirection('RIGHT');
              break;
          }
        }
      }

      if (e.key === 'Escape') {
        if (showWalletInput) {
          setShowWalletInput(false);
          return;
        }
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
        setNextDirection('RIGHT');
        setGameOver(false);
        setScore(0);
        setGameSpeed(INITIAL_SPEED);
        setGameStarted(true);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyPress, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyPress, { capture: true });
  }, [gameStarted, gameOver, direction, onBack, showWalletInput]);

  const handleWalletSubmit = (e) => {
    e.preventDefault();
    if (walletAddress.trim()) {
      // Here you would handle the wallet submission
      console.log('Wallet submitted:', walletAddress);
      setShowWalletInput(false);
    }
  };

  return (
    <div className="snake-screen">
      {showNokiaAnimation ? (
        <div className="nokia-animation">
          <div className="nokia-text">
            <span>N</span>
            <span>O</span>
            <span>K</span>
            <span>I</span>
            <span>A</span>
          </div>
        </div>
      ) : (
        <>
          <div className="game-header">Snake II</div>
          <div className="game-area">
            <div className="game-grid">
              {Array.from({ length: GRID_SIZE }, (_, y) => (
                <div key={y} className="row">
                  {Array.from({ length: GRID_SIZE }, (_, x) => {
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
                  })}
                </div>
              ))}
            </div>
            <div className="score">Score: {score}</div>
            {!gameStarted && (
              <div className="game-message">Press Enter to Start</div>
            )}
            {gameOver && (
              <div className="game-message game-over">
                Game Over - {score}<br/>Press Enter to Restart
              </div>
            )}
            {showWalletInput && (
              <div className="wallet-overlay">
                <form onSubmit={handleWalletSubmit}>
                  <div className="wallet-message">
                    Congratulations!<br/>Score: {score}
                  </div>
                  <input
                    type="text"
                    className="wallet-input"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="Enter Solana wallet address"
                  />
                  <button type="submit" className="submit-btn">Submit</button>
                </form>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

Snake.propTypes = {
  onBack: PropTypes.func.isRequired
};

export default Snake; 