import React, { useState } from 'react';
import LoadingScreen from './LoadingScreen';
import Interface from './Interface';
import '../styles/Screen.css';

function Screen() {
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="screen-area">
      {isLoading ? <LoadingScreen /> : <Interface />}
    </div>
  );
}

export default Screen; 