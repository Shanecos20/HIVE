import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ScrollableTextSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [revealedImages, setRevealedImages] = useState([]);

  // Update scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to handle revealing hidden images
  const handleImageReveal = (imageId) => {
    if (!revealedImages.includes(imageId)) {
      setRevealedImages((prev) => [...prev, imageId]);
    }
  };

  // Function to handle text splitting and image unveiling
  const renderSplitText = (text, imageId, imageSrc) => {
    return (
      <div
        className="split-text-section"
        style={{
          position: "relative",
          display: "inline-block",
          overflow: "hidden",
          verticalAlign: "middle",
        }}
        onMouseEnter={() => handleImageReveal(imageId)}
      >
        <motion.div
          initial={{ y: 0 }}
          animate={{
            y: revealedImages.includes(imageId) ? "-100%" : 0,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="split-text"
        >
          {text}
        </motion.div>
        {revealedImages.includes(imageId) && (
          <motion.img
            src={imageSrc}
            alt="Revealed Content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "auto",
            }}
          />
        )}
      </div>
    );
  };

  // Helper to calculate text color transition
  const calculateTextColor = () => {
    const maxScroll = 800; // Adjust based on when the text should fully transition
    const progress = Math.min(scrollPosition / maxScroll, 1);
    return `rgba(${255 - progress * 255}, ${255 - progress * 255}, ${255 - progress * 255}, 1)`;
  };

  return (
    <div
      className="scroll-section"
      style={{
        backgroundColor: "#000",
        padding: "50px 20px",
        color: calculateTextColor(),
        fontSize: "1.5rem",
        lineHeight: "2rem",
        textAlign: "center",
        position: "relative",
      }}
    >
      <p>
        Welcome to a world where{" "}
        {renderSplitText("innovation", 1, "/path-to-image1.jpg")} meets
        creativity. Dive deeper into{" "}
        {renderSplitText("connection", 2, "/path-to-image2.jpg")} and explore
        the endless opportunities hidden within our{" "}
        {renderSplitText("community", 3, "/path-to-image3.jpg")}.
      </p>
      <p>
        Every moment is a chance to{" "}
        {renderSplitText("grow", 4, "/path-to-image4.jpg")} and redefine your
        potential. Step forward into the{" "}
        {renderSplitText("future", 5, "/path-to-image5.jpg")} and embrace the
        journey with us.
      </p>
    </div>
  );
};

export default ScrollableTextSection;
