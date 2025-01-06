import React from "react";

const FoundationsList = ({ foundations, onDonate }) => {
  return (
    <div id="foundations" className="foundations-list">
      {foundations.map((foundation, index) => (
        <div key={index} className="foundation-card">
          <img src={foundation.image} alt={foundation.name} />
          <div className="info">
            <h3>{foundation.name}</h3>
            <p>{foundation.type}: {foundation.count} beneficiaries</p>
            <p>Contact: {foundation.contact}</p>
            <a href={foundation.gmap} target="_blank" rel="noopener noreferrer">
              View on Map
            </a>
            <br />
            <button onClick={() => onDonate(foundation)}>Donate Points</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoundationsList;
