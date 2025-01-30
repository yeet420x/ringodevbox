import React from 'react';
import Screen from './Screen';
import Keypad from './Keypad';
import '../styles/PhoneContainer.css';

function PhoneContainer() {
  return (
    <div className="phone-container">
      <div className="phone-frame">
        <div className="speaker"></div>
        <div className="nokia-brand">NOKIA</div>
        <Screen />
        <Keypad />
      </div>
    </div>
  );
}

export default PhoneContainer; 