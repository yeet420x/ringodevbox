import React, { useState } from 'react';
import PhoneContainer from './components/PhoneContainer';
import InitialLoader from './components/loaders/InitialLoader';
import './styles/App.css';

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const handleLoaderComplete = () => {
    console.log("Loading complete"); // Debug log
    setIsInitialLoading(false);
  };

  return (
    <div className="app-wrapper">
      {isInitialLoading ? (
        <InitialLoader onComplete={handleLoaderComplete} />
      ) : (
        <PhoneContainer />
      )}
    </div>
  );
}

export default App; 