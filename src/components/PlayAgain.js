import React from "react";

const PlayAgain = ({ onPlayAgain }) => {
  return (
    <div id="quiz-play-again">
      <button id="quiz-play-again-btn" className="btn" onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  );
};

export default PlayAgain;
