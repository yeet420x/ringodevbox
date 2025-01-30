import React from 'react';
import PropTypes from 'prop-types';

function Tokenomics({ onBack }) {
  const tokenInfo = [
    { label: 'Total Supply', value: '1,000,000,000' },
    { label: 'Tax', value: '0/0' },
    { label: 'LP Locked', value: '100%' },
    { label: 'Contract Renounced', value: 'Yes' }
  ];

  return (
    <div className="menu-screen">
      <header className="screen-title">Tokenomics</header>
      <div className="content scrollable">
        <div className="tokenomics-list">
          {tokenInfo.map((info) => (
            <div key={info.label} className="tokenomics-item">
              <span className="label">{info.label}:</span>
              <span className="value">{info.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="navigation">
        <button onClick={onBack}>Back (Esc)</button>
      </div>
    </div>
  );
}

Tokenomics.propTypes = {
  onBack: PropTypes.func.isRequired
};

export default Tokenomics; 