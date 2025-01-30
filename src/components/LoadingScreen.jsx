import React from 'react';
import '../styles/LoadingScreen.css';
import nokiaGif from '../assets/nokia.gif';

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="gif-container">
        <img src={nokiaGif} alt="Nokia Startup" className="nokia-startup" />
      </div>
    </div>
  );
}

export default LoadingScreen; 