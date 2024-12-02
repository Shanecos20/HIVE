// SectionSeparator.jsx
import React, { useEffect, useRef, useState } from 'react';
import './SectionSeparator.css';

const words = ['Learn', 'About', 'HIVE'];

const SectionSeparator = () => {
  const separatorRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null, // Observe within the viewport
      rootMargin: '0px',
      threshold: 0.1, // Trigger when 10% of the component is visible
    };

    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observing after it's visible
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    if (separatorRef.current) {
      observer.observe(separatorRef.current);
    }

    // Cleanup on unmount
    return () => {
      if (separatorRef.current) {
        observer.unobserve(separatorRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`separator-container ${isVisible ? 'visible' : ''}`}
      ref={separatorRef}
      aria-hidden="true"
    >
      {words.map((word, wordIndex) => (
        <div
          key={wordIndex}
          className={`separator-word word-${wordIndex + 1}`}
          data-word={word}
        >
          {word.split('').map((letter, letterIndex) => (
            <span
              key={letterIndex}
              className={`letter letter-${wordIndex + 1}-${letterIndex + 1}`}
              data-letter={letter}
              style={{ '--i': letterIndex }}
            >
              {letter}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SectionSeparator;
