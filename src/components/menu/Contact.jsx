import React from 'react';
import '../../styles/Menu.css';

function Contact({ onBack }) {
  return (
    <div className="menu-screen">
      <div className="menu-content">
        <h2>CONTACT</h2>
        <div className="contact-list">
          <div className="contact-item">
            <span className="label">GitHub:</span>
            <a href="https://github.com/yeet420x" target="_blank" rel="noopener noreferrer">@yeet420x</a>
          </div>
          <div className="contact-item">
            <span className="label">Email:</span>
            <a href="mailto:ringojpegs@gmail.com" target="_blank" rel="noopener noreferrer">ringojpegs@gmail.com</a>
          </div>
          <div className="contact-item">
            <span className="label">X/Twitter:</span>
            <a href="https://x.com/jpeg_ringo" target="_blank" rel="noopener noreferrer">Ringo | zakariya.sol</a>
          </div>
        </div>
        <p className="menu-hint">Press ESC to go back</p>
      </div>
    </div>
  );
}

export default Contact; 