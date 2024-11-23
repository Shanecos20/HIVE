// src/App.js

import React from "react";
import HomePage from "./components/HomePage";
import ScrollBar from "./components/ScrollBar";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <HomePage />
    </div>
  );
}

export default App;
