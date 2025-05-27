import React, { useState, useEffect } from 'react';
import '../styles/Interface.css';
import Portfolio from './Portfolio';
import Snake from './menu/Snake';
import Info from './menu/Info';
import Contact from './menu/Contact';
import TypingScreen from './TypingScreen';
import contractIcon from '../assets/contract.svg';
import snakeIcon from '../assets/snake.svg';
import infoIcon from '../assets/info.svg';
import contactIcon from '../assets/contact.svg';

function Interface() {
  const [activeIndex, setActiveIndex] = useState(() => {
    const saved = localStorage.getItem('menuIndex');
    return saved ? parseInt(saved) : 0;
  });
  const [currentScreen, setCurrentScreen] = useState('menu');
  const [previousScreen, setPreviousScreen] = useState([]);
  const [time, setTime] = useState('12:00');
  const [signal, setSignal] = useState(4);
  const [battery, setBattery] = useState(3);
  const [isTyping, setIsTyping] = useState(false);

  const menuItems = [
    { icon: <img src={contractIcon} alt="Portfolio" className="menu-icon" />, label: 'Portfolio', component: Portfolio },
    { icon: <img src={snakeIcon} alt="Snake" className="menu-icon" />, label: 'Snake', component: Snake },
    { icon: <img src={infoIcon} alt="Info" className="menu-icon" />, label: 'Info', component: Info },
    { icon: <img src={contactIcon} alt="Contact" className="menu-icon" />, label: 'Contact', component: Contact }
  ];

  const handleKeyDown = (e) => {
    if (isTyping) {
      if (e.key === 'Escape') {
        setIsTyping(false);
      }
      return;
    }

    if (currentScreen === 'snake') {
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      handleBack();
      return;
    }

    if (currentScreen === 'menu') {
      if (/^[0-9*#]$/.test(e.key)) {
        setIsTyping(true);
        return;
      }

      switch(e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex(prev => {
            const newIndex = prev > 0 ? prev - 1 : menuItems.length - 1;
            const menuItem = document.querySelector(`.menu-item:nth-child(${newIndex + 1})`);
            menuItem?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            return newIndex;
          });
          break;
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex(prev => {
            const newIndex = prev < menuItems.length - 1 ? prev + 1 : 0;
            const menuItem = document.querySelector(`.menu-item:nth-child(${newIndex + 1})`);
            menuItem?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            return newIndex;
          });
          break;
        case 'Enter':
          e.preventDefault();
          const selectedItem = menuItems[activeIndex];
          setPreviousScreen(prev => [...prev, currentScreen]);
          setCurrentScreen(selectedItem.label.toLowerCase());
          break;
        default:
          break;
      }
    }
  };

  const handleBack = () => {
    if (isTyping) {
      setIsTyping(false);
      return;
    }
    if (previousScreen.length > 0) {
      const lastScreen = previousScreen[previousScreen.length - 1];
      setPreviousScreen(prev => prev.slice(0, -1));
      setCurrentScreen(lastScreen);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScreen, activeIndex, isTyping]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('menuIndex', activeIndex.toString());
  }, [activeIndex]);

  const renderStatusBar = () => (
    <div className="status-bar">
      <div className="signal-strength">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className={`signal-bar ${i < signal ? 'active' : ''}`} />
        ))}
      </div>
      <span className="time">{time}</span>
      <div className="battery-indicator">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className={`battery-bar ${i < battery ? 'active' : ''}`} />
        ))}
      </div>
    </div>
  );

  if (isTyping) {
    return (
      <div className="nokia-interface">
        {renderStatusBar()}
        <TypingScreen onBack={() => setIsTyping(false)} />
      </div>
    );
  }

  if (currentScreen !== 'menu') {
    const CurrentComponent = menuItems.find(
      item => item.label.toLowerCase() === currentScreen
    )?.component;

    return (
      <div className="nokia-interface">
        {renderStatusBar()}
        {CurrentComponent && <CurrentComponent onBack={handleBack} />}
      </div>
    );
  }

  return (
    <div className="interface-container">
      <div className="nokia-interface">
        {renderStatusBar()}
        <div className="content">
        
          <div className="menu-grid">
            {menuItems.map((item, index) => (
              <div 
                key={item.label} 
                className={`menu-item ${index === activeIndex ? 'active' : ''}`}
                onClick={() => {
                  setActiveIndex(index);
                  handleKeyDown({ key: 'Enter' });
                }}
              >
                <div className="icon">{item.icon}</div>
                <div className="label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="external-controls">
        <div className="navigation-hints">
          <div className="hint-section">
            <div className="hint-title">Controls</div>
            <div className="hint-item">Select (Enter)</div>
            <div className="hint-item">Back (Esc)</div>
            <div className="hint-item">Navigate (↑ ↓)</div>
            <div className="hint-item">Type (0-9, *, #)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interface; 