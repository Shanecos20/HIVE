// src/components/ScrollBar.js

import React, { useState, useEffect } from 'react';
import './ScrollBar.css';

const ScrollBar = () => {
  const [scrollDirection, setScrollDirection] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      if (currentPosition > scrollPosition) {
        setScrollDirection('down');
      } else if (currentPosition < scrollPosition) {
        setScrollDirection('up');
      }
      setScrollPosition(currentPosition);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  return (
    <div className={`scroll-bar ${scrollDirection === 'down' ? 'extrude-down' : 'extrude-up'}`}>
      <div className="scroll-cylinder" />
    </div>
  );
};

export default ScrollBar;
