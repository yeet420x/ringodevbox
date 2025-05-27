import React, { useEffect, useRef } from 'react';
import '../../styles/Menu.css';

function Info({ onBack }) {
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
        <h2>SKILLS & INFO</h2>
        <ul className="skills-list">
          <li>Frontend Development</li>
          <li>Backend Development</li>
          <li>Smart Contract Development</li>
          <li>Blockchain Development</li>
          <li>Full Stack Development</li>
          <li>Game Development</li>
          <li>Cloud Services</li>
          <li>Database Management</li>
        </ul>
        <p className="menu-hint">Press ESC to go back</p>
        
      </div>
    </div>
  );
}

export default Info; 