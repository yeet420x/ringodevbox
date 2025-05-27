import React, { useState, useEffect } from 'react';
import '../styles/TypingScreen.css';

function TypingScreen({ onBack }) {
  const [text, setText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);

    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9' || e.key === '*' || e.key === '#') {
        setText(prev => prev + e.key);
      } else if (e.key === 'Backspace') {
        setText(prev => prev.slice(0, -1));
      } else if (e.key === 'Escape') {
        onBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(cursorInterval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onBack]);

  return (
    <div className="typing-screen">
      <div className="typing-area">
        <span className="typed-text">{text}</span>
        <span className={`cursor ${cursorVisible ? 'visible' : ''}`}>_</span>
      </div>
      <p className="typing-hint">Use numpad (0-9, *, #) to type</p>
      <p className="typing-hint">Press ESC to go back</p>
    </div>
  );
}

export default TypingScreen; 