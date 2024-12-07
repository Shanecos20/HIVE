// src/components/StaticOverlay.js

import React, { useRef, useEffect } from 'react';
import './StaticOverlay.css';

const StaticOverlay = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let animationFrameId;

    const generateStatic = () => {
      const imageData = ctx.createImageData(width, height);
      const buffer = new Uint8ClampedArray(imageData.data);

      for (let i = 0; i < buffer.length; i += 4) {
        const color = Math.random() * 255;
        buffer[i] = color;        // Red
        buffer[i + 1] = color;    // Green
        buffer[i + 2] = color;    // Blue
        buffer[i + 3] = 30;       // Alpha (transparency)
      }

      imageData.data.set(buffer);
      ctx.putImageData(imageData, 0, 0);

      animationFrameId = requestAnimationFrame(generateStatic);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    generateStatic();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="static-overlay" />;
};

export default StaticOverlay;
