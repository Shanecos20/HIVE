// AnimatedContentSection.jsx
import React, { useState, useEffect } from 'react';
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
  {
    title: 'Third Section',
    text: 'This is the third section of the content.',
    image: '/assets/yet-another-bee.gif', // Ensure the path is correct
    mask: '/assets/yet-another-ink-splatter.png', // Ensure the path is correct
  }
  // Add more sections as needed
];

const AnimatedContentSection = () => {
  const [currentSection, setCurrentSection] = useState(-1); // Initialize to -1

  useEffect(() => {
    const triggers = document.querySelectorAll('.trigger');

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6, // Adjust threshold as needed
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const triggerId = entry.target.id;
          console.log(`Triggered: ${triggerId}`);

          // Extract the section number from trigger ID
          const sectionNumber = parseInt(triggerId.split('-')[1], 10) - 1; // Assuming triggers are 1-indexed

          if (!isNaN(sectionNumber)) {
            if (triggerId === 'trigger-4') {
              setCurrentSection(-1); // Unfix content
              console.log('Unfixing content.');
            } else if (sectionNumber >= 0 && sectionNumber < contentData.length) {
              setCurrentSection(sectionNumber);
              console.log(`Setting currentSection to: ${sectionNumber}`);
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

  return (
    <div className="animated-content-section">
      {/* Fixed Content */}
      <AnimatePresence>
        {currentSection >= 0 && (
          <motion.div
            key={`content-${currentSection}`}
            className="fixed-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
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
