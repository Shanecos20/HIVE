import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"; // Adjust the import as needed
import "./HomePage.css";
import bee1vid from "../media/bee1.mp4";
import bee2vid from "../media/bee2.mp4";
import bee3vid from "../media/bee3.mp4";
import bee4vid from "../media/bee4.mp4";
import { motion } from "framer-motion";

const HomePage = () => {
  // State for text animations
  const [textVisible, setTextVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  // State to control when to start the card animations
  const [startAnimation, setStartAnimation] = useState(false);

  // Initial cards setup for overlapping cards
  const initialCards = [
    { id: 1, video: bee1vid, zIndex: 1004, rotation: Math.random() * 20 - 10 },
    { id: 2, video: bee2vid, zIndex: 1003, rotation: Math.random() * 20 - 10 },
    { id: 3, video: bee3vid, zIndex: 1002, rotation: Math.random() * 20 - 10 },
    { id: 4, video: bee4vid, zIndex: 1001, rotation: Math.random() * 20 - 10 },
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
    moveLeft: (custom) => {
      const screenWidth = window.innerWidth; // Get current screen width
      const moveDistance = screenWidth < 768 ? -150 : -350; // Adjust based on screen size
      return {
        x: moveDistance,
        y: 0,
        rotate: custom * 10,
        transition: { duration: 1, ease: "easeInOut" },
      };
    },
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
            <span className="text" id="HIVE"><span id="hSpan">H</span>IVE</span>
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
            <span className="text text1">IS <span id="Underline">OUR</span></span>
            <span className="text" id="Mission">MISSION</span>
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
            className="cardElement"
            style={{
              zIndex: card.zIndex,
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
          >
            <video
              src={card.video}
              autoPlay
              muted
              loop
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </motion.div>
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
