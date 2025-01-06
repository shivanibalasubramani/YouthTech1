import React from "react";

const ThankYouMessage = ({ onClose }) => {
  return (
    <div className="thank-you-message">
      <h2>Thank You!</h2>
      <p>Your points have been donated successfully.</p>
      <button onClick={onClose}>Back to Foundations</button>
    </div>
  );
};

export default ThankYouMessage;
