import React from 'react';
import '../styles/Keypad.css';

function Keypad() {
  const handleNumberClick = (number) => {
    const event = new KeyboardEvent('keydown', {
      key: number,
      bubbles: true
    });
    window.dispatchEvent(event);
  };

  const handleEscClick = () => {
    const event = new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true
    });
    window.dispatchEvent(event);
  };

  const numberPadButtons = [
    { number: '1', subtext: '' },
    { number: '2', subtext: 'ABC' },
    { number: '3', subtext: 'DEF' },
    { number: '4', subtext: 'GHI' },
    { number: '5', subtext: 'JKL' },
    { number: '6', subtext: 'MNO' },
    { number: '7', subtext: 'PQRS' },
    { number: '8', subtext: 'TUV' },
    { number: '9', subtext: 'WXYZ' },
    { number: '*', subtext: '' },
    { number: '0', subtext: '' },
    { number: '#', subtext: '' },
  ];

  return (
    <div className="keypad">
      <div className="nav-buttons">
        <button className="nav-btn up">▲</button>
        <div className="nav-middle">
          <button className="nav-btn left">◀</button>
          <button className="nav-btn select">●</button>
          <button className="nav-btn right">▶</button>
        </div>
        <button className="nav-btn down">▼</button>
      </div>
      
      <div className="function-buttons">
        <button className="fn-btn green">
          <div className="led"></div>
        </button>
        <button 
          className="fn-btn red"
          onClick={handleEscClick}
        >
          <div className="led"></div>
        </button>
      </div>

      <div className="number-pad">
        {numberPadButtons.map((btn) => (
          <button 
            key={btn.number} 
            className="num-btn" 
            data-subtext={btn.subtext}
            onClick={() => handleNumberClick(btn.number)}
          >
            {btn.number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Keypad; 