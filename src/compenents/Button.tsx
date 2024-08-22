import React from 'react';

function Button({ onClick, imgSrc, imgAlt, text }) {
  return (
    <button onClick={onClick} className="api-button">
      <img src={imgSrc} className="logo" alt={imgAlt} />
      <div>{text}</div>
    </button>
  );
}

export default Button;
