// src/components/AnimatedCircle/AnimatedCircle.js
import React, { useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import './AnimatedCircle.css';

const AnimatedCircle = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const outerTextVariants = {
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 30, // Slower rotation for elegance
        ease: 'linear',
      },
    },
  };

  return (
    <div className="animated-circle-container">
      {/* Central Circle with Rotating Text */}
      <motion.div
        ref={ref}
        className="circle-wrapper"
        initial="hidden"
        animate={controls}
      >
        <motion.svg
          className="rotating-svg"
          width="300"
          height="300"
          viewBox="0 0 300 300"
          variants={outerTextVariants}
          animate="animate"
        >
          <defs>
            {/* Outer Path: Adjusted radius */}
            <path
              id="outerPath"
              d="
                M 150, 150
                m -100, 0
                a 100,100 0 1,1 200,0
                a 100,100 0 1,1 -200,0
              "
            />
            {/* Inner Path: Adjusted radius */}
            <path
              id="innerPath"
              d="
                M 150, 150
                m -50, 0
                a 50,50 0 1,1 100,0
                a 50,50 0 1,1 -100,0
              "
            />
          </defs>

          {/* Outer Rotating Text */}
          <text className="outer-text">
            <textPath href="#outerPath" startOffset="0%" className="outer-text-path">
              {Array(9).fill(' SCROLL ').join(' ')}
            </textPath>
          </text>

          {/* Inner Text */}
          <text className="inner-text">
            <textPath
              href="#innerPath"
              startOffset="59%"
              className="inner-text-path inner-text-path--download"
            >
              SCROLL
            </textPath>
            <textPath
              href="#innerPath"
              startOffset="10%"
              className="inner-text-path inner-text-path--now"
            >
              SCROLL
            </textPath>
          </text>
        </motion.svg>

        {/* Central Circle */}
        <div className="central-circle"></div>
      </motion.div>
    </div>
  );
};

export default AnimatedCircle;
