// src/HiveApp.jsx
import React, { useState, useEffect, useRef } from 'react';
import './HiveApp.css'; // Using your provided CSS
import image from '../media/image.png'; // Replace with your image path

const HiveApp = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const containerRef = useRef(null);

  // Intersection Observer to trigger animation when component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAnimated(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      className="hive-app-container"
      ref={containerRef}
    >
      <div
        className={`hive-app-words ${isAnimated ? 'animate' : ''}`}
      >
        <h1 className="hive">
          <span id="H">H</span>IVE
        </h1>
        <h1 className="app">
          A<span id="A">P</span>P
          {/* Download Now Text */}
      
        </h1>
        {/* Subtitle */}
        <div className="hiveapp-subtitle-container">
        <p className="hiveapp-subtitle">Let's start your beekeeping journey.</p>
        <p className="hiveapp-subtitle">Download the app now!</p>
        </div>
      </div>
      {/* Fade-in Image */}
      <img
        src={image}
        alt="Hive Illustration"
        className={`fade-image ${isAnimated ? 'visible' : ''}`}
      />
    </div>
  );
};

export default HiveApp;
