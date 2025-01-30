import React from 'react';
import PropTypes from 'prop-types';

function Chart({ onBack }) {
  const chartLinks = [
    { name: 'Birdeye', url: 'https://birdeye.so' },
    { name: 'DexScreener', url: 'https://dexscreener.com' }
  ];

  return (
    <div className="menu-screen">
      <header className="screen-title">Chart</header>
      <div className="content scrollable">
        <div className="chart-list">
          {chartLinks.map((chart) => (
            <a 
              key={chart.name}
              href={chart.url}
              target="_blank"
              rel="noopener noreferrer"
              className="chart-item"
            >
              {chart.name}
            </a>
          ))}
        </div>
      </div>
      <div className="navigation">
        <button onClick={onBack}>Back (Esc)</button>
      </div>
    </div>
  );
}

Chart.propTypes = {
  onBack: PropTypes.func.isRequired
};

export default Chart; 