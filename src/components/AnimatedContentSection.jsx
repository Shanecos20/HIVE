// AnimatedContentSection.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AnimatedContentSection.css";

// Import images
import flower1 from "../media/flower1.png";
import flower2 from "../media/flower2.png";
import flower3 from "../media/flower3.png";
import flower4 from "../media/flower4.png";
import flower5 from "../media/flower5.png";
import flower6 from "../media/flower6.png";

import beehive1 from "../media/beehive1.png";
import beehive2 from "../media/beehive2.png";

import beekeeper from "../media/beekeeper.png";
import honeycomb from "../media/honeycomb.png";
// Bees have been removed from the beekeeper section

// Sample content data with imported images
const contentData = [
  {
    title: "What is HIVE",
    text: `HIVE is an innovative app designed to support beekeepers and modernize the way modular bee hives are managed. By integrating Internet of Things (IoT) technology, HIVE allows users to monitor their hives in real time from the app. With advanced features like queen bee tracking, pest detection, behavioral analysis, and environmental sensors, HIVE provides invaluable insights into the health and activity of the hive, ensuring optimal care and efficiency.`,
    theme: "flowers",
    images: [flower1, flower2, flower3, flower4, flower5, flower6],
  },
  {
    title: "How Does HIVE Work",
    text: `HIVE combines modular hive structures with IoT-enabled sensors and trackers. These devices collect data on hive conditions, such as temperature, humidity, and hive activity. The app provides beekeepers with real-time alerts on potential issues like pests, unusual behavior, or environmental changes, empowering them to take proactive action to protect their colonies.`,
    theme: "beehives",
    images: [beehive1, beehive2],
  },
  {
    title: "Why Choose HIVE",
    text: `With its focus on sustainability and efficiency, HIVE is more than just a tool—it's a game-changer for beekeeping. Whether you're a seasoned beekeeper or a beginner, HIVE simplifies hive management and enhances your ability to care for your bees. Its modular design ensures flexibility, and the app's intuitive interface makes it easy to stay connected to your hives anytime, anywhere.`,
    theme: "beekeeper",
    images: [beekeeper, honeycomb],
  },
];

// Flowers Animation Component
const FlowersAnimation = ({ images }) => (
  <div className="flowers-container">
    {images.map((src, index) => (
      <motion.img
        key={index}
        src={src}
        alt={`flower-${index + 1}`}
        className={`flower flower-${index + 1}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: index * 0.2,
          duration: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
      />
    ))}
  </div>
);

// Beehives Animation Component
const BeehivesAnimation = ({ images }) => (
  <div className="beehives-container">
    {images.map((src, index) => (
      <motion.img
        key={index}
        src={src}
        alt={`beehive-${index + 1}`}
        className={`beehive beehive-${index + 1}`}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: index * 0.3,
          type: "spring",
          stiffness: 50,
          damping: 10,
        }}
      />
    ))}
  </div>
);

// Beekeeper Animation Component (Bees Removed)
const BeekeeperAnimation = ({ images }) => (
  <div className="beekeeper-container">
    <motion.img
      src={images[0]}
      alt="beekeeper"
      className="beekeeper"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    />

    {/* Honeycomb Image */}
    <motion.img
      src={images[1]}
      alt="honeycomb"
      className="honeycomb"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    />
  </div>
);

const AnimatedContentSection = () => {
  const [currentSection, setCurrentSection] = useState(-1);
  const modeRef = useRef("normal"); // Tracks current mode: 'normal' or 'reverse'

  useEffect(() => {
    const triggers = document.querySelectorAll(".trigger");

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const triggerId = entry.target.id;

          // Handle mode switching
          if (triggerId === "trigger-0") {
            modeRef.current = "normal";
            console.log("Mode set to normal");
          } else if (triggerId === "trigger-5") {
            modeRef.current = "reverse";
            console.log("Mode set to reverse");
          }

          const mode = modeRef.current;

          // Map triggers to sections based on mode
          if (mode === "normal") {
            if (triggerId === "trigger-1") {
              setCurrentSection(0);
            } else if (triggerId === "trigger-2") {
              setCurrentSection(1);
            } else if (triggerId === "trigger-3") {
              setCurrentSection(2);
            } else if (triggerId === "trigger-4") {
              setCurrentSection(-1); // Unfix content
            }
          } else if (mode === "reverse") {
            if (triggerId === "trigger-1") {
              setCurrentSection(-1); // Fade out first section
            } else if (triggerId === "trigger-2") {
              setCurrentSection(0); // Show first section
            } else if (triggerId === "trigger-3") {
              setCurrentSection(1); // Show second section
            } else if (triggerId === "trigger-4") {
              setCurrentSection(2); // Show third section
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    triggers.forEach((trigger) => {
      observer.observe(trigger);
      console.log(`Observing trigger: ${trigger.id}`);
    });

    // Cleanup
    return () => {
      triggers.forEach((trigger) => {
        observer.unobserve(trigger);
        console.log(`Unobserving trigger: ${trigger.id}`);
      });
    };
  }, []);

  const renderTheme = (theme, images) => {
    switch (theme) {
      case "flowers":
        return <FlowersAnimation images={images} />;
      case "beehives":
        return <BeehivesAnimation images={images} />;
      case "beekeeper":
        return <BeekeeperAnimation images={images} />;
      default:
        return null;
    }
  };

  return (
    <div className="animated-content-section">
      {/* Fixed Content */}
      <AnimatePresence>
        {currentSection >= 0 && (
          <motion.div
            key={`content-${currentSection}`}
            className="fixed-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Animated Theme */}
            {renderTheme(
              contentData[currentSection].theme,
              contentData[currentSection].images
            )}

            {/* Title */}
            <h1 className="section-title">
              {contentData[currentSection].title}
            </h1>

            {/* Paragraph */}
            <p className="section-text">{contentData[currentSection].text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedContentSection;
