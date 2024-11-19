import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"; // Ensure the path is correct
import "./HomePage.css";
import field1 from "../gifs/field1.gif"; // Adjust the path if necessary
import field2 from "../gifs/field2.gif";
import field3 from "../gifs/field3.gif";

const HomePage = () => {
  const [textVisible, setTextVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after a delay
    const textTimeout = setTimeout(() => setTextVisible(true), 500);
    const cardsTimeout = setTimeout(() => setCardsVisible(true), 3000);

    return () => {
      clearTimeout(textTimeout);
      clearTimeout(cardsTimeout);
    };
  }, []);

  return (
    <div className="home-container">
      <Navbar />
      <div className="title-section">
        <h1
          className={`title-line ${
            textVisible ? "unveil" : ""
          } ${cardsVisible ? "move-apart" : ""}`}
        >
          <div className="text-line">
            <span className="text">HIVE</span>
            <span className="text">APP</span>
            <div className="overlay"></div>
          </div>
        </h1>
        <h1
          className={`title-line ${
            textVisible ? "unveil delay-1" : ""
          } ${cardsVisible ? "move-apart" : ""}`}
        >
          <div className="text-line">
            <span className="text">OUR</span>
            <span className="text">MISSION</span>
            <div className="overlay"></div>
          </div>
        </h1>
      </div>
      <div className={`card-stack ${cardsVisible ? "drop-in" : ""}`}>
        <div className="card card-1">
          <img src={field1} alt="Field 1" />
        </div>
        <div className="card card-2">
          <img src={field2} alt="Field 2" />
        </div>
        <div className="card card-3">
          <img src={field3} alt="Field 3" />
        </div>
      </div>
      <p className={`subtitle ${textVisible ? "fade-in delay-3" : ""}`}>
        Discover new communities, engage with people, and build connections like
        never before.
      </p>
    </div>
  );
};

export default HomePage;
