import React from 'react';
import PropTypes from 'prop-types';

function Socials({ onBack }) {
  const socialLinks = [
    { name: 'Twitter', url: 'https://twitter.com/your_handle' },
    { name: 'Telegram', url: 'https://t.me/your_group' },
    { name: 'Discord', url: 'https://discord.gg/your_server' },
    { name: 'Website', url: 'https://your_website.com' }
  ];

  return (
    <div className="menu-screen">
      <header className="screen-title">Socials</header>
      <div className="content scrollable">
        <div className="socials-list">
          {socialLinks.map((social) => (
            <a 
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-item"
            >
              {social.name}
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

Socials.propTypes = {
  onBack: PropTypes.func.isRequired
};

export default Socials; 