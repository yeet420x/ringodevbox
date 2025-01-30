import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../styles/Socials.css';

function Socials({ onBack, type }) {
  const urls = {
    X: "https://x.com/your-x-profile",
    Telegram: "https://t.me/your-telegram"
  };

  useEffect(() => {
    window.open(urls[type], '_blank');
  }, [type]);

  return (
    <div className="socials-screen">
      <div className="redirect-container">
        <div className="redirect-message">
          Opening {type}...
        </div>
        <button 
          className="redirect-button"
          onClick={() => window.open(urls[type], '_blank')}
        >
          Click here if it doesn't open automatically
        </button>
      </div>
      <button className="back-button" onClick={onBack}>Back</button>
    </div>
  );
}

Socials.propTypes = {
  onBack: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['X', 'Telegram']).isRequired
};

export default Socials; 