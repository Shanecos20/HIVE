import React, { useEffect, useState, useRef } from "react";
import "./HomePage.css";
import bee1vid from "../media/bee1.mp4";
import bee2vid from "../media/bee2.mp4";
import bee3vid from "../media/bee5.mp4";
import bee4vid from "../media/bee6.mp4";
import { motion } from "framer-motion";
import AnimatedParagraph from "./AnimatedParagraph"; // not in use but for some reason cuts hero section cards in half when commented out
import Footer from "./Footer";
//import HoriScroll from "./HoriScroll";
//import AnimatedCircle from "./AnimatedCircle";
import HiveApp from "./HiveApp";
import AnimatedContentSection from "./AnimatedContentSection";
import SectionSeparator from "./SectionSeperator";

const HomePage = () => {
  // Configurable delay variables
  const initialDropDelay = 2000; // 2 seconds before drop-in starts
  const staggerDelay = 200; // 0.2 seconds between each card's drop-in

  // State for text animations
  const [textVisible, setTextVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  // State to control when to start the card animations
  const [startAnimation, setStartAnimation] = useState(false);

  // Initial cards setup for overlapping cards
  const initialCards = [
    {
      id: 1,
      video: bee1vid,
      zIndex: 1004,
      rotation: Math.random() * 20 - 10,
    },
    {
      id: 2,
      video: bee2vid,
      zIndex: 1003,
      rotation: Math.random() * 20 - 10,
    },
    {
      id: 3,
      video: bee3vid,
      zIndex: 1002,
      rotation: Math.random() * 20 - 10,
    },
    {
      id: 4,
      video: bee4vid,
      zIndex: 1001,
      rotation: Math.random() * 20 - 10,
    },
  ];

  const [cards, setCards] = useState(initialCards);

  // State to track which cards have started moving
  const [animatedCardIds, setAnimatedCardIds] = useState([]);

  // Refs for video elements
  const videoRefs = useRef([]);

  // Text and card visibility effects
  useEffect(() => {
    const textTimeout = setTimeout(() => setTextVisible(true), 500);
    const cardsTimeout = setTimeout(
      () => setCardsVisible(true),
      initialDropDelay
    );

    return () => {
      clearTimeout(textTimeout);
      clearTimeout(cardsTimeout);
    };
  }, [initialDropDelay]);

  // Calculate and set startAnimation after initial drop-in animations complete
  useEffect(() => {
    if (cardsVisible) {
      // Total time = (staggerDelay * (number of cards - 1)) + animationDuration
      const animationDuration = 1000; // 1 second for each card's drop-in
      const totalInitialAnimationTime =
        staggerDelay * (cards.length - 1) + animationDuration;

      const animationTimeout = setTimeout(() => {
        setStartAnimation(true);
      }, totalInitialAnimationTime);

      return () => clearTimeout(animationTimeout);
    }
  }, [cardsVisible, staggerDelay, cards.length]);

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
        delay: (staggerDelay / 1000) * custom, // Convert ms to seconds
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
        transition: { duration: 0.3, ease: "easeInOut" },
        //dark filter
        filter: "brightness(0.5)",
      };
    },
    returnToCenter: (custom) => ({
      x: 0,
      y: 0,
      rotate: custom * 10,
      transition: { duration: 0.3, ease: "easeInOut" }, // No delay
      //dark filter
      filter: "brightness(1)",
    }),
  };

  // Control video playback based on card order
  useEffect(() => {
    if (videoRefs.current.length === 0) return;

    // Determine the frontmost card based on the first element in the array
    const frontCardIndex = 0;

    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === frontCardIndex) {
          // Play the frontmost video
          video.play().catch((error) => {
            // Handle play promise rejection (e.g., autoplay restrictions)
            console.error("Error playing video:", error);
          });
        } else {
          // Pause all other videos
          video.pause();
        }
      }
    });
  }, [cards]);

  return (
    <div className="home-container">
      <div className="title-section">
        <h1
          className={`title-line ${textVisible ? "unveil" : ""} ${
            cardsVisible ? "move-apart" : ""
          }`}
        >
          <div className="text-line">
            <span className="text" id="Hive">
              <span id="hSpan">H</span>IVE
            </span>
            <span className="text" id="App">
              APP
            </span>
            <div className="overlay"></div>
          </div>
        </h1>
        <h1
          className={`title-line ${textVisible ? "unveil delay-1" : ""} ${
            cardsVisible ? "move-apart" : ""
          }`}
        >
          <div className="text-line">
            <span className="text text1">
              IS <span id="Underline">OUR</span>
            </span>
            <span className="text" id="Mission">
              MISSION
            </span>
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
                ? "returnToCenter"
                : cardsVisible
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
              ref={(el) => (videoRefs.current[index] = el)} // Assign ref here
              src={card.video}
              muted
              loop
              className="card-image"
              loading="lazy" // Lazy loading for performance
              // Removed autoPlay to control via refs
            />
          </motion.div>
        ))}
      </div>
      <p className={`subtitle ${textVisible ? "fade-in delay-3" : ""}`}>
        Discover new communities, engage with people, and build connections like
        never before.
      </p>
      <div className="new-section" id="Seperator1">
        <SectionSeparator />
      </div>
      {/* New Trigger before all existing triggers */}
      <div className="trigger" id="trigger-0"></div>{" "}
      {/* Sets mode to 'normal' */}
      {/* Animated Content Section Wrapper */}
      <section className="new-section" id="aboutSec">
        <AnimatedContentSection />
      </section>
      {/* Trigger Sections */}
      <div className="trigger" id="trigger-1"></div>
      <div className="trigger" id="trigger-2"></div>
      <div className="trigger" id="trigger-3"></div>
      <div className="trigger" id="trigger-4"></div>{" "}
      {/* Previously the fade and unfix trigger */}
      {/* New Trigger after all existing triggers */}
      <div className="trigger" id="trigger-5"></div>{" "}
      {/* Sets mode to 'reverse' */}
      {/* Spacer between triggers and next content */}
      <div style={{ height: "100vh" }}></div>

      <section className="new-section" id="CTASec">
        <HiveApp />
      </section>
      <section className="new-section" id="footer">
        <Footer />
      </section>
    </div>
  );
};

export default HomePage;
