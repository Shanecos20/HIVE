// AnimatedContentSection.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AnimatedContentSection.css";

// AnimatedContentSection.jsx
const contentData = [
  {
    title: "What is HIVE",
    text: `HIVE is an innovative app designed to support beekeepers and modernize the way modular bee hives are managed...`,
    theme: "flowers",
    images: [
      "/media/flower1.png",
      "/media/flower2.png",
      "/media/flower3.png",
      "/media/flower4.png",
      "/media/flower5.png",
      "/media/flower6.png",
    ],
  },
  {
    title: "How Does HIVE Work",
    text: `HIVE combines modular hive structures with IoT-enabled sensors and trackers...`,
    theme: "beehives",
    images: [
      "/media/beehive1.png",
      "/media/beehive2.png",
    ],
  },
  {
    title: "Why Choose HIVE",
    text: `With its focus on sustainability and efficiency, HIVE is more than just a tool—it's a game-changer for beekeeping...`,
    theme: "beekeeper",
    images: [
      "/media/beekeeper.png",
      "/media/bee1.gif",
      "/media/bee2.gif",
      "/media/bee3.gif",
    ],
  },
];

const FlowersAnimation = ({ images }) => (
  <div className="flowers-container">
    {images.map((src, index) => (
      <motion.img
        key={index}
        src={src}
        alt={`flower-${index}`}
        className="flower"
        initial={{ scale: 0, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{
          delay: index * 0.2,
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
      />
    ))}
  </div>
);

const BeehivesAnimation = ({ images }) => (
  <div className="beehives-container">
    {images.map((src, index) => (
      <motion.img
        key={index}
        src={src}
        alt={`beehive-${index}`}
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
    {images.slice(1).map((src, index) => (
      <motion.img
        key={index}
        src={src}
        alt={`bee-${index}`}
        className="bee"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: -100, opacity: 1 }}
        transition={{
          delay: 0.5 + index * 0.2,
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
    ))}
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
            <p className="section-text">
              {contentData[currentSection].text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedContentSection;
