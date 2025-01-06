import React from "react";

const Stats = ({ stats }) => {
  return (
    <div id="quiz-stats" className="row text-center">
      <div className="col-xs-3">
        <i className="fa fa-bar-chart"></i>
      </div>
      <div className="col-xs-3 col-lg-2">
        <p>Correct Rate</p>
        <span>{stats.correct}/{stats.questionsAsked}</span>
      </div>
      <div className="col-xs-3 col-lg-2">
        <p>Correct Streak</p>
        <span>{stats.correctStreak}</span>
      </div>
      <div className="col-xs-3 col-lg-2">
        <p><span>Avg. </span>Response Time (s)</p>
        <span>{stats.averageResponseTime.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Stats;
