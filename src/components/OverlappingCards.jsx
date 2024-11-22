import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import field1 from "../gifs/field1.gif";
import field2 from "../gifs/field2.gif";
import field3 from "../gifs/field3.gif";
import field4 from "../gifs/field4.gif";
import { rotate } from "three/webgpu";

const OverlappingCards = () => {
  const initialCards = [
    { id: 1, gif: field1, zIndex: 1004, rotation: Math.random() * 20 - 10 },
    { id: 2, gif: field2, zIndex: 1003, rotation: Math.random() * 20 - 10 },
    { id: 3, gif: field3, zIndex: 1002, rotation: Math.random() * 20 - 10 },
    { id: 4, gif: field4, zIndex: 1001, rotation: Math.random() * 20 - 10 },
  ];


  const [cards, setCards] = useState(initialCards);
  const [hasDropped, setHasDropped] = useState(false);

  useEffect(() => {
    const dropTimeout = setTimeout(() => {
      setHasDropped(true);
    }, 5000);

    return () => clearTimeout(dropTimeout);
  }, []);

  useEffect(() => {
    if (!hasDropped) return;

    const interval = setInterval(() => {
      setCards((prevCards) => {
        const updatedCards = [...prevCards];
        const frontCard = updatedCards.shift();
        if (frontCard) {
          frontCard.rotation = Math.random() * 20 - 10;
          frontCard.zIndex = 1000;
          updatedCards.forEach((card) => (card.zIndex += 1));
          updatedCards.push(frontCard);
        }
        return updatedCards;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [hasDropped]);

  const cardVariants = {
    hidden: { y: -1000 },
    visible: (custom) => ({
      y: 0,
      rotate: custom * 10,
      transition: {
        delay: custom * 0.1,
        duration: 1,
        ease: "easeInOut",
      },
    }),
    moveLeft: {
      x: -300,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
    resetX: {
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          style={{
            position: "absolute",
            width: "200px",
            height: "300px",
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
            hasDropped
              ? {
                  x: index === 0 ? -250 : 0,
                  y: 0,
                  rotate: card.rotation,
                  zIndex: card.zIndex,
                }
              : "visible"
          }
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
          onAnimationComplete={() => {
            if (hasDropped && index === 0) {
              setCards((prevCards) => {
                const updatedCards = [...prevCards];
                const frontCard = updatedCards.shift();
                if (frontCard) {
                  frontCard.rotation = Math.random() * 20 - 10;
                  frontCard.zIndex = 1000;
                  updatedCards.forEach((card) => (card.zIndex += 1));
                  updatedCards.push(frontCard);
                }
                return updatedCards;
              });
            }
          }}
        />
      ))}
    </div>
  );
};

export default OverlappingCards;
