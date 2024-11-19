// src/components/ScrollBar.js

import React, { useState, useEffect, useRef } from 'react';
import './ScrollBar.css';

const ScrollBar = ({ containerRef }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollRatio, setScrollRatio] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startScrollY, setStartScrollY] = useState(0);
  const scrollbarRef = useRef(null);

  const defaultHeight = 20;
  const hoverHeight = 25;
  const draggingHeight = 100;
  const scrollOffset = 70;

  const scrollbarHeight = isDragging ? draggingHeight : isHovered ? hoverHeight : defaultHeight;

  useEffect(() => {
    // Ensure containerRef.current is defined before adding scroll listener
    if (!containerRef?.current) return;

    const container = containerRef.current;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const docHeight = container.scrollHeight - container.clientHeight;
      const ratio = scrollTop / docHeight;
      setScrollRatio(ratio);
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartY(e.clientY);
    setStartScrollY(containerRef?.current?.scrollTop || 0);
  };

  const handleMouseMove = (e) => {
    if (isDragging && containerRef?.current) {
      const deltaY = e.clientY - startY;
      const docHeight = containerRef.current.scrollHeight - containerRef.current.clientHeight;
      const viewportHeight = containerRef.current.clientHeight - scrollOffset * 2;
      const scrollDelta = (deltaY / viewportHeight) * docHeight;
      let newScrollY = startScrollY + scrollDelta;

      // Ensure the new scroll position is within bounds
      newScrollY = Math.max(0, Math.min(newScrollY, docHeight));

      containerRef.current.scrollTo(0, newScrollY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Adjusted top calculation to include scrollOffset
  const top = scrollOffset + scrollRatio * (window.innerHeight - scrollbarHeight - scrollOffset * 2);

  return (
    <div className="scroll-bar-container">
      <div
        className={`scroll-bar ${isDragging ? 'dragging' : ''}`}
        style={{ top: `${top}px` }}
        ref={scrollbarRef}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
};

export default ScrollBar;
