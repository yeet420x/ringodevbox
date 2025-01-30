import React from 'react';
import PropTypes from 'prop-types';

function Buy({ onBack }) {
  const exchanges = [
    { name: 'Raydium', url: 'https://raydium.io/swap' },
    { name: 'Jupiter', url: 'https://jup.ag' },
    { name: 'Orca', url: 'https://www.orca.so' }
  ];

  return (
    <div className="menu-screen">
      <header className="screen-title">Buy</header>
      <div className="content scrollable">
        <div className="exchange-list">
          {exchanges.map((exchange) => (
            <a 
              key={exchange.name}
              href={exchange.url}
              target="_blank"
              rel="noopener noreferrer"
              className="exchange-item"
            >
              {exchange.name}
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

Buy.propTypes = {
  onBack: PropTypes.func.isRequired
};

export default Buy; 