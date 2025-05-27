import React, { useState, useEffect, useRef } from 'react';
import '../styles/Portfolio.css';

const Portfolio = ({ onBack }) => {
  const [currentSection, setCurrentSection] = useState('about');
  const contentRef = useRef(null);
  const scrollStep = 50; // pixels to scroll per arrow press
  
  const projects = [
    {
      name: 'Luna AI',
      description: 'AI gf for your phone and pc, Solana Token $LUNAI on chain.',
      github: 'https://github.com/yeet420x/LUNA',
      website: 'https://www.lunai.fun/'
    },
    {
      name: 'Nokia 3310 ',
      description: 'Embrace the nostalgia with this replica of the iconic Nokia 3310, featuring a modern twist on the classic design.',
      github: 'https://github.com/yeet420x/nokia',
      website: 'https://www.nokia3310.fun/'
    },
    {
      name: 'Yeekuza',
      description: 'For fun project with Ye as a Yakuza with a twist of Yeezy & BlockChain reference.',
      github: 'https://github.com/yeet420x/yekuza',
      website: 'https://www.yekuza.xyz/'
    },


    // Add more projects here
  ];

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

  const renderAbout = () => (
    <div className="nokia-section">
      <h2>ABOUT ME</h2>
      <p>Hi, I'm Ringo!</p>
      <p>I'm a passionate fullstack & blockchain developer focused on creating innovative solutions.</p>
      <p>Press ESC to go back to the main menu.</p>
      <p>Use ↑↓ arrows to scroll content.</p>
    </div>
  );

  const renderProjects = () => (
    <div className="nokia-section">
      <h2>PROJECTS</h2>
      {projects.map((project, index) => (
        <div key={index} className="project-item">
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <div className="project-links">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                GITHUB
              </a>
            )}
            {project.website && (
              <a href={project.website} target="_blank" rel="noopener noreferrer">
                WEBSITE
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderContact = () => (
    <div className="nokia-section">
      <h2>CONTACT</h2>
      <p>GitHub: <a href="https://github.com/yeet420x" target="_blank" rel="noopener noreferrer">@yeet420x</a></p>
      <p>Email: <a href="mailto:ringo.dev.box@gmail.com" target="_blank" rel="noopener noreferrer">ringojpegs@gmail.com</a></p>
      <p>Press ESC to go back to the main menu.</p>
    </div>
  );

  

  return (
    <div className="portfolio-container">
      <div className="nokia-content" ref={contentRef}>
        {renderAbout()}
        {renderProjects()}
       
        {renderContact()}
      </div>
      
    </div>
  );
};

export default Portfolio; 