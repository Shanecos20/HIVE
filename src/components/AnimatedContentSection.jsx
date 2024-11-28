// AnimatedContentSection.jsx
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AnimatedContentSection.css';

// Sample content data
const contentData = [
  {
    title: 'First Section',
    text: 'This is the first section of the content.',
    image: '/assets/bee.gif', // Ensure the path is correct
    mask: '/assets/ink-splatter.png', // Ensure the path is correct
  },
  {
    title: 'Second Section',
    text: 'This is the second section of the content.',
    image: '/assets/another-bee.gif', // Ensure the path is correct
    mask: '/assets/another-ink-splatter.png', // Ensure the path is correct
  },
  // Add more sections as needed
];

// Utility function to clamp values within a range
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const AnimatedContentSection = () => {
  const containerRef = useRef(null);
  const [isFixed, setIsFixed] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [fixStart, setFixStart] = useState(0); // Records scroll position when fixed
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  // Update viewportHeight on window resize
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection Observer to detect when the component enters the viewport
  useEffect(() => {
    const observerOptions = {
      root: null, // Observes relative to the viewport
      rootMargin: '0px',
      threshold: 0.1, // 10% of the component is visible
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          // Delay fixing to allow animations to play
          setTimeout(() => {
            if (containerRef.current) {
              // Calculate the exact scroll position where the component becomes fixed
              const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
              setFixStart(containerTop); // Record the fix start position without offset
            }
            setIsFixed(true); // Fix the component
          }, 500); // Adjust delay as needed to allow animations
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [hasAnimated]);

  // Scroll handler to update currentSection and unfix the component
  useEffect(() => {
    if (!isFixed) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const fixedScrollHeight = 0.8 * viewportHeight * contentData.length; // Total scroll distance while fixed

      const scrolled = window.scrollY - fixStart; // Distance scrolled since component was fixed

      const scrollProgress = clamp(scrolled / fixedScrollHeight, 0, 1); // Progress between 0 and 1

      const newSection = Math.floor(scrollProgress * contentData.length);
      const clampedSection = clamp(newSection, 0, contentData.length - 1);

      if (clampedSection !== currentSection) {
        setCurrentSection(clampedSection);
      }

      // Debugging logs
      console.log('Scrolled:', scrolled);
      console.log('Fixed Scroll Height:', fixedScrollHeight);
      console.log('Scroll Progress:', scrollProgress);
      console.log('Current Section:', clampedSection);

      // Unfix the component after scrolling through all content sections
      if (scrollProgress >= 1) {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check in case user is already scrolled

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFixed, currentSection, fixStart, viewportHeight]);

  return (
    <div
      ref={containerRef}
      className="animated-content-section"
      style={{ height: `${contentData.length * 80 + 20}vh` }} // 80vh per section + 20vh buffer
    >
      {/* Placeholder to maintain layout when fixed */}
      <div
        className={`placeholder ${isFixed ? 'active' : ''}`}
        style={{
          height: isFixed ? '80vh' : '0', // Ensure placeholder matches fixed content height
        }}
      ></div>

      {/* Fixed content */}
      <AnimatePresence>
        {isFixed && (
          <motion.div
            className="fixed-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Title Animation */}
            <AnimatePresence>
              <motion.h1
                key={`title-${currentSection}`}
                className="section-title"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 50 }}
              >
                {contentData[currentSection].title}
              </motion.h1>
            </AnimatePresence>

            {/* Text Animation */}
            <AnimatePresence>
              <motion.p
                key={`text-${currentSection}`}
                className="section-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {contentData[currentSection].text}
              </motion.p>
            </AnimatePresence>

            {/* Image Animation */}
            <AnimatePresence>
              <motion.div
                key={`image-${currentSection}`}
                className="section-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  backgroundImage: `url(${contentData[currentSection].image})`,
                  WebkitMaskImage: `url(${contentData[currentSection].mask})`,
                  maskImage: `url(${contentData[currentSection].mask})`,
                }}
              />
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedContentSection;
