import React, { useState } from "react";
import FoundationsList from "./FoundationsList";
import DonationModal from "./DonationModal";
import ThankYouMessage from "./ThankYouMessage";
import "./styles.css";

const App = () => {
  const [location, setLocation] = useState("");
  const [selectedFoundation, setSelectedFoundation] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const foundations = [
    {
      name: "Trust Foundation",
      type: "Children",
      count: 50,
      contact: "8667514376",
      image:
        "https://lh3.googleusercontent.com/p/AF1QipMNmadHjYs2g9_W2sW4mWmryDc-VK3s-wMK-r28=s1360-w1360-h1020",
      gmap: "https://maps.app.goo.gl/rusXJ5XJwC2oMLsR7",
    },
    {
      name: "Swagatham Foundation",
      type: "Old People",
      count: 30,
      contact: "044 2346096311",
      image:
        "https://lh3.googleusercontent.com/p/AF1QipMrQ0qmqMxHg92-dRMlIFkOvF816l6EVzLh8P2b=s1360-w1360-h1020",
      gmap: "https://maps.app.goo.gl/5vZU4RiMrpxioNFXA",
    },
    {
      name: "Scan Foundation",
      type: "Animals",
      count: 100,
      contact: "9876543212",
      image:
        "https://lh3.googleusercontent.com/p/AF1QipPOskglR75eE-qkiZ0357JZqM2urEJzHCPEcUy9=s1360-w1360-h1020",
      gmap: "https://maps.app.goo.gl/j3exAm28ywT7AipG6",
    },
  ];

  const handleSearch = () => {
    if (!location.trim()) {
      alert("Please enter a location.");
    }
  };

  return (
    <div className="donation-container">
      <header className="header">
        <h1>Support a Foundation</h1>
        <p>Find and donate points to foundations near you.</p>
      </header>

      <div className="search-section">
        <label htmlFor="location">Enter Your Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="E.g., Chennai, Tamil Nadu"
        />
        <button onClick={handleSearch}>Find Foundations</button>
      </div>

      <FoundationsList
        foundations={foundations}
        onDonate={(foundation) => setSelectedFoundation(foundation)}
      />

      {selectedFoundation && (
        <DonationModal
          foundation={selectedFoundation}
          onClose={() => setSelectedFoundation(null)}
          onThankYou={() => {
            setSelectedFoundation(null);
            setShowThankYou(true);
          }}
        />
      )}

      {showThankYou && (
        <ThankYouMessage onClose={() => setShowThankYou(false)} />
      )}
    </div>
  );
};

export default App;
