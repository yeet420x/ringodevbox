import React, { useState } from 'react';
import PhoneContainer from './components/PhoneContainer';
import InitialLoader from './components/loaders/InitialLoader';
import './styles/App.css';

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const handleLoaderComplete = () => {
    setIsInitialLoading(false);
  };

  return (
    <div className="app-wrapper">
      {isInitialLoading && (
        <div className="loader-container">
          <InitialLoader onComplete={handleLoaderComplete} />
        </div>
      )}
      <div className={`phone-wrapper ${isInitialLoading ? 'hidden' : ''}`}>
        <PhoneContainer>
          {/* Your existing phone content */}
        </PhoneContainer>
      </div>
    </div>
  );
}

export default App; 