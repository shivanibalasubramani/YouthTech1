import React, { useState } from "react";

const Question = ({ question, onAnswer }) => {
  const [startTime] = useState(Date.now());

  const handleAnswerClick = (isCorrect) => {
    const responseTime = (Date.now() - startTime) / 1000;
    onAnswer(isCorrect, responseTime);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-md-10 col-md-offset-1 text-center">
          <p>{question.question}</p>
          {question.answers.map((answer, index) => (
            <button
              key={index}
              className="btn quiz-ans-btn"
              onClick={() => handleAnswerClick(answer.isCorrect)}
            >
              {answer.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
