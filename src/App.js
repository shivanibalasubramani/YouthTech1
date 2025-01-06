import React, { useState, useEffect } from "react";
import Stats from "./components/Stats";
import Question from "./components/Question";
import PlayAgain from "./components/PlayAgain";
import "./App.css";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [stats, setStats] = useState({
    questionsAsked: 0,
    correct: 0,
    correctStreak: 0,
    averageResponseTime: 0,
  });
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => res.json())
      .then((data) => {
        const formattedQuestions = data.results.map((item) => ({
          question: item.question,
          answers: shuffleAnswers([
            ...item.incorrect_answers.map((answer) => ({
              text: answer,
              isCorrect: false,
            })),
            { text: item.correct_answer, isCorrect: true },
          ]),
        }));
        setQuestions(formattedQuestions);
      })
      .catch((err) => console.error(err));
  }, []);

  const shuffleAnswers = (answers) => {
    return answers.sort(() => Math.random() - 0.5);
  };

  const handleAnswerClick = (isCorrect, responseTime) => {
    setStats((prevStats) => {
      const updatedStats = { ...prevStats };
      updatedStats.questionsAsked++;
      updatedStats.averageResponseTime =
        (updatedStats.averageResponseTime * (updatedStats.questionsAsked - 1) +
          responseTime) /
        updatedStats.questionsAsked;

      if (isCorrect) {
        updatedStats.correct++;
        updatedStats.correctStreak++;
      } else {
        updatedStats.correctStreak = 0;
      }
      return updatedStats;
    });

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setGameOver(true);
    }
  };

  const handlePlayAgain = () => {
    setGameOver(false);
    setCurrentQuestionIndex(0);
    setStats({
      questionsAsked: 0,
      correct: 0,
      correctStreak: 0,
      averageResponseTime: 0,
    });
    fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => res.json())
      .then((data) => {
        const formattedQuestions = data.results.map((item) => ({
          question: item.question,
          answers: shuffleAnswers([
            ...item.incorrect_answers.map((answer) => ({
              text: answer,
              isCorrect: false,
            })),
            { text: item.correct_answer, isCorrect: true },
          ]),
        }));
        setQuestions(formattedQuestions);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div id="quiz">
      <Stats stats={stats} />
      {!gameOver && questions.length > 0 ? (
        <Question
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswerClick}
        />
      ) : (
        <PlayAgain onPlayAgain={handlePlayAgain} />
      )}
    </div>
  );
};

export default App;
