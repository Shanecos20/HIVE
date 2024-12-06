// DownloadPage.js
import React, { useEffect, useRef } from 'react';
import './DownloadPage.css';

export default function DownloadPage() {
  const beeRef = useRef(null);
  
  // Simple mouse tracking for the bee eyes
  useEffect(() => {
    const handleMouseMove = (e) => {
      const bee = beeRef.current;
      if(!bee) return;
      const rect = bee.getBoundingClientRect();
      const centerX = rect.left + rect.width/2;
      const centerY = rect.top + rect.height/2;
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const rotate = angle * (180 / Math.PI);
      bee.style.transform = `rotate(${rotate}deg)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return ()=> window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="download-page">
      <div className="bee-container">
        <div className="bee" ref={beeRef}></div>
      </div>
      <h2>Download the App</h2>
      <p>Get the latest version of our AI-powered hive management app.</p>
      <button className="download-button">Download Now</button>
    </div>
  );
}
