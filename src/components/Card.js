// Card.js
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Card = React.memo(
  ({ card, isShuffling, onShuffleComplete }) => {
    const { id, color, rotation, zIndex } = card;
    const controls = useAnimation();

    // Handle initial fall animation
    useEffect(() => {
      controls.start({
        y: '50%',
        opacity: 1,
        rotate: rotation,
        transition: {
          delay: (1005 - zIndex) * 0.2,
          duration: 1,
          type: 'spring',
          stiffness: 50,
        },
      });
    }, [controls, rotation, zIndex]);

    // Handle shuffling animation
    useEffect(() => {
      if (isShuffling) {
        const shuffleSequence = async () => {
          // Move to the left and rotate
          await controls.start({
            x: -300,
            rotate: rotation - 15,
            transition: { duration: 0.75, ease: 'easeInOut' },
          });

          // Move back to the center and reset rotation
          await controls.start({
            x: 0,
            rotate: rotation,
            transition: { duration: 0.75, ease: 'easeInOut' },
          });

          // Notify parent that shuffling is complete
          onShuffleComplete(id);
        };

        shuffleSequence();
      }
    }, [isShuffling, controls, rotation, id, onShuffleComplete]);

    return (
      <motion.div
        className="card"
        style={{
          backgroundColor: color,
          rotate: rotation,
          // Temporarily set zIndex to a high value during shuffling
          zIndex: isShuffling ? 9999 : zIndex,
          position: 'absolute',
          width: '100px',
          height: '150px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '24px',
          cursor: 'pointer',
        }}
        initial={{
          y: '-150vh',
          opacity: 0,
          rotate: rotation,
        }}
        animate={controls}
        exit={{ opacity: 0 }}
      >
        {id + 1}
      </motion.div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.card.id === nextProps.card.id &&
      prevProps.card.zIndex === nextProps.card.zIndex &&
      prevProps.isShuffling === nextProps.isShuffling
    );
  }
);

export default Card;
