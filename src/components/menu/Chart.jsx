import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/Chart.css';

function Chart({ onBack }) {
  const [isLoading, setIsLoading] = useState(true);
  const dexScreenerUrl = "https://dexscreener.com/solana/your-pair-address";

  const handleOpenExternal = () => {
    window.open(dexScreenerUrl, '_blank');
  };

  return (
    <div className="chart-screen">
      <div className="chart-container">
        <iframe
          src={dexScreenerUrl}
          title="DEXScreener Chart"
          className="dex-iframe"
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(true)}
        />
        {isLoading && (
          <div className="chart-fallback">
            <div className="chart-message">Loading chart...</div>
            <button className="chart-external-btn" onClick={handleOpenExternal}>
              Open in new tab
            </button>
          </div>
        )}
      </div>
      <button className="back-button" onClick={onBack}>Back</button>
    </div>
  );
}

Chart.propTypes = {
  onBack: PropTypes.func.isRequired
};

export default Chart; 