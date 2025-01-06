import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import "./Styles.css";

const App = () => {
  return (
    <div className="app">
      <h1>Profile Analytics</h1>
      <UserCard />
    </div>
  );
};

export default App;
