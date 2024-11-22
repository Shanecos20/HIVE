import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"; // Adjust the import as needed
import "./HomePage.css";
import field1 from "../gifs/field1.gif";
import field2 from "../gifs/field2.gif";
import field3 from "../gifs/field3.gif";
import field4 from "../gifs/field4.gif";
import { motion } from "framer-motion";

const HomePage = () => {
  // State for text animations
  const [textVisible, setTextVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  // State to control when to start the card animations
  const [startAnimation, setStartAnimation] = useState(false);

  // Initial cards setup for overlapping cards
  const initialCards = [
    { id: 1, gif: field1, zIndex: 1004, rotation: Math.random() * 20 - 10 },
    { id: 2, gif: field2, zIndex: 1003, rotation: Math.random() * 20 - 10 },
    { id: 3, gif: field3, zIndex: 1002, rotation: Math.random() * 20 - 10 },
    { id: 4, gif: field4, zIndex: 1001, rotation: Math.random() * 20 - 10 },
  ];

  const [cards, setCards] = useState(initialCards);

  // State to track which cards have started moving
  const [animatedCardIds, setAnimatedCardIds] = useState([]);

  // Text and card visibility effects
  useEffect(() => {
    const textTimeout = setTimeout(() => setTextVisible(true), 500);
    const cardsTimeout = setTimeout(() => setCardsVisible(true), 2000);

    return () => {
      clearTimeout(textTimeout);
      clearTimeout(cardsTimeout);
    };
  }, []);

  // Delay the drop-down animation by a few seconds (e.g., 3 seconds after cards become visible)
  useEffect(() => {
    if (cardsVisible) {
      const animationTimeout = setTimeout(() => {
        setStartAnimation(true);
      }, 0); // Adjust this value to increase/decrease delay

      return () => clearTimeout(animationTimeout);
    }
  }, [cardsVisible]);

  // Schedule card movements with delays
  useEffect(() => {
    if (!startAnimation) return;

    // Schedule the movements
    const timeouts = [];
    cards.forEach((card, index) => {
      const timeout = setTimeout(() => {
        setAnimatedCardIds((prevIds) => [...prevIds, card.id]);
      }, 2000 * (index + 1)); // Delay increases by 2 seconds for each card

      timeouts.push(timeout);
    });

    return () => {
      // Clear all timeouts when component unmounts or when startAnimation changes
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [startAnimation, cards]);

  // Function to handle card animation completion
  const handleAnimationComplete = (cardId) => {
    // Remove the card's id from animatedCardIds after it moves
    setAnimatedCardIds((prevIds) => prevIds.filter((id) => id !== cardId));

    // Move the card to the back of the stack
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      const cardIndex = updatedCards.findIndex((c) => c.id === cardId);
      if (cardIndex !== -1) {
        const [movedCard] = updatedCards.splice(cardIndex, 1);
        movedCard.rotation = Math.random() * 20 - 10;
        movedCard.zIndex = 1000;
        updatedCards.forEach((card) => (card.zIndex += 1));
        updatedCards.push(movedCard);
      }
      return updatedCards;
    });
  };

  // Animation variants for the cards
  const cardVariants = {
    hidden: { y: -1000 },
    visible: (custom) => ({
      y: 0,
      x: 0,
      rotate: custom * 10,
      transition: {
        delay: custom * 0.1,
        duration: 1,
        ease: "easeInOut",
      },
    }),
    moveLeft: (custom) => ({
      x: -350,
      y: 0, // Maintain vertical position
      rotate: custom * 10, // Maintain rotation
      transition: { duration: 1.5, ease: "easeInOut" },
    }),
  };

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
            <span className="text text1">HIVE</span>
            <span className="text text2">APP</span>
            <div className="overlay"></div>
          </div>
        </h1>
        <h1
          className={`title-line ${
            textVisible ? "unveil delay-1" : ""
          } ${cardsVisible ? "move-apart" : ""}`}
        >
          <div className="text-line">
            <span className="text text1">OUR</span>
            <span className="text text2">MISSION</span>
            <div className="overlay"></div>
          </div>
        </h1>
      </div>
      {/* Overlapping Cards Section */}
      <div
        className={`overlapping-cards-container ${
          cardsVisible ? "drop-in" : ""
        }`}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "visible",
          marginTop: "50px",
          height: "600px",
        }}
      >
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            style={{
              position: "absolute",
              width: "270px",
              height: "370px",
              backgroundImage: `url(${card.gif})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              zIndex: card.zIndex,
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            }}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate={
              animatedCardIds.includes(card.id)
                ? "moveLeft"
                : startAnimation
                ? "visible"
                : "hidden"
            }
            onAnimationComplete={() => {
              if (animatedCardIds.includes(card.id)) {
                handleAnimationComplete(card.id);
              }
            }}
          />
        ))}
      </div>
      <p className={`subtitle ${textVisible ? "fade-in delay-3" : ""}`}>
        Discover new communities, engage with people, and build connections like
        never before.
      </p>
    </div>
  );
};

export default HomePage;
