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

  const hiveVariants = {
    hidden: { opacity: 0, x: -150, y: -150 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 1.5 },
    },
  };

  const appVariants = {
    hidden: { opacity: 0, x: 150, y: 150 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 1.5 },
    },
  };

  return (
    <div className="animated-circle-container">
      {/* Animated Corner Texts */}
      <motion.div
        className="corner-text corner-text--hive"
        variants={hiveVariants}
        initial="hidden"
        animate={controls}
      >
        HIVE
      </motion.div>
      <motion.div
        className="corner-text corner-text--app"
        variants={appVariants}
        initial="hidden"
        animate={controls}
      >
        APP
      </motion.div>

      {/* Central Circle with Rotating Text */}
      <motion.div
        ref={ref}
        className="circle-wrapper"
        initial="hidden"
        animate={controls}
      >
        <motion.svg
          className="rotating-svg"
          width="400"
          height="400"
          viewBox="0 0 400 400"
          variants={outerTextVariants}
          animate="animate"
        >
          <defs>
            {/* Outer Path: Smaller radius to move closer to circle edge */}
            <path
              id="outerPath"
              d="
                M 200, 200
                m -140, 0
                a 140,140 0 1,1 280,0
                a 140,140 0 1,1 -280,0
              "
            />
            {/* Inner Path: Smaller radius to move inside the central circle */}
            <path
              id="innerPath"
              d="
                M 200, 200
                m -70, 0
                a 70,70 0 1,1 140,0
                a 70,70 0 1,1 -140,0
              "
            />
          </defs>

          {/* Outer Rotating Text */}
          <text className="outer-text">
            <textPath href="#outerPath" startOffset="0%" className="outer-text-path">
              {Array(8).fill(' HIVE APP ').join(' ')}
            </textPath>
          </text>

          {/* Inner Text */}
          <text className="inner-text">
            <textPath
              href="#innerPath"
              startOffset="54%" // Centered horizontally
              className="inner-text-path inner-text-path--download"
            >
              DOWNLOAD
            </textPath>
            <textPath
              href="#innerPath"
              startOffset="4%" // Centered horizontally
              className="inner-text-path inner-text-path--now"
            >
              NOW
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
