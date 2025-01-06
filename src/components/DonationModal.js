import React, { useState } from "react";

const DonationModal = ({ foundation, onClose, onThankYou }) => {
  const [points, setPoints] = useState("");
  const [message, setMessage] = useState("");

  const handleConfirmDonation = () => {
    if (!points || !message) {
      alert("Please fill in all fields.");
      return;
    }
    onThankYou();
  };

  return (
    <div className="donation-modal">
      <h2>Donate Points</h2>
      <div className="donation-details">
        <div className="info">
          <label htmlFor="donationPoints">Enter Points to Donate:</label>
          <input
            type="number"
            id="donationPoints"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            min="1"
            placeholder="Enter points"
            required
          />

          <label htmlFor="donationMessage">Your Message to the Foundation:</label>
          <textarea
            id="donationMessage"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here..."
            required
          ></textarea>

          <button onClick={handleConfirmDonation}>Confirm Donation</button>
        </div>
        <img
          id="donationImage"
          className="donation-image"
          src={foundation.image}
          alt={foundation.name}
        />
      </div>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default DonationModal;
