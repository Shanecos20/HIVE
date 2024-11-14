// src/App.js

import React from "react";
import HomePage from "./components/HomePage";
import ScrollBar from "./components/ScrollBar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ScrollBar />
      <HomePage />
    </div>
  );
}

export default App;
