import React, { useState } from 'react';
// import './AlertBox.css';  // Assumes that your CSS is in a file named AlertBox.css

function AlertBox({ message, type }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`alert-box ${type}`}>
      {/* <span className="closebtn" onClick={() => setIsVisible(false)}>&times;</span> */}
      {message}
    </div>
  );
}

export default AlertBox;
