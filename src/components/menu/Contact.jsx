import React, { useEffect, useRef } from 'react';
import '../../styles/Menu.css';

function Contact({ onBack }) {
  const contentRef = useRef(null);
  const scrollStep = 50;

  const handleScroll = (direction) => {
    if (contentRef.current) {
      const currentScroll = contentRef.current.scrollTop;
      const newScroll = direction === 'up' 
        ? currentScroll - scrollStep 
        : currentScroll + scrollStep;
      
      contentRef.current.scrollTo({
        top: newScroll,
        behavior: 'smooth'
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleScroll('up');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleScroll('down');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="menu-screen">
      <div className="menu-content" ref={contentRef}>
      <p className="menu-hint">Use ↑↓ arrows to scroll content</p>
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