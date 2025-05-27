import React from 'react';
import '../../styles/Menu.css';

function Info({ onBack }) {
  return (
    <div className="menu-screen">
      <div className="menu-content">
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