// src/components/ContactPage.jsx

import React, { useState, useEffect, useRef } from 'react';
import './ContactPage.css'; // Import the CSS for styling
import Footer from './Footer'; // Import your existing Footer component

const ContactPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Function to calculate eye position
  const calculateEyePosition = (eyeRef) => {
    if (!eyeRef.current) return {};
    const rect = eyeRef.current.getBoundingClientRect();
    const eyeX = rect.left + rect.width / 2;
    const eyeY = rect.top + rect.height / 2;
    const dx = mousePosition.x - eyeX;
    const dy = mousePosition.y - eyeY;
    const angle = Math.atan2(dy, dx);
    const radius = 20; // Increase radius due to bigger eyes
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return {
      left: `calc(50% - 10px + ${x}px)`,
      top: `calc(50% - 10px + ${y}px)`,
    };
  };

  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);

  return (
    <div className="contactpage-container">
      {/* Header Section */}
      <div className="contactpage-header">
        <h1 className="contactpage-title">
          Get In Touch
          <span className="contactpage-title-background">HIVE</span>
        </h1>
        <h2 className="contactpage-subtitle">How can we help you?</h2>
        <p className="contactpage-description">
          Select a section below, fill out the form, and we'll be in contact shortly.
        </p>
        {/* Leading trail */}
        <div className="leading-trail"></div>
      </div>

      {/* Bee Head Section */}
      <div className="contactpage-bee-container">
        <div className="bee-head">
          <div className="bee-eye" ref={leftEyeRef}>
            <div
              className="bee-pupil"
              style={calculateEyePosition(leftEyeRef)}
            ></div>
          </div>
          <div className="bee-eye" ref={rightEyeRef}>
            <div
              className="bee-pupil"
              style={calculateEyePosition(rightEyeRef)}
            ></div>
          </div>
          {/* Add more bee features here if desired */}
        </div>
      </div>

      {/* Options Section */}
      <div className="contactpage-options">
        <div className="contactpage-option">
          <div className="option-card">
            <div className="option-front">
              <h3>Partnership Inquiries</h3>
            </div>
            <div className="option-back">
              <p>Interested in partnering with us? Fill out our partnership form.</p>
            </div>
          </div>
        </div>
        <div className="contactpage-option">
          <div className="option-card">
            <div className="option-front">
              <h3>Product Questions</h3>
            </div>
            <div className="option-back">
              <p>Have questions about our products? Get in touch with us here.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Leading trail below options */}
      <div className="leading-trail"></div>

      {/* Info Sections */}
      <div className="contactpage-info-sections">
        <div className="info-section">
          <h3>Contact Us</h3>
          <div className="section-line"></div>
          <p>Address, phone number, email, etc.</p>
        </div>
        <div className="info-section">
          <h3>Follow Us</h3>
          <div className="section-line"></div>
          <p>Social media links, etc.</p>
        </div>
        <div className="info-section">
          <h3>The Team</h3>
          <div className="section-line"></div>
          <div className="team-members">
            <div className="team-member">
              <div className="member-card">
                <div className="member-front">
                  <p>Shane Costello</p>
                </div>
                <div className="member-back">
                  <p>Website Design</p>
                </div>
              </div>
            </div>
            <div className="team-member">
              <div className="member-card">
                <div className="member-front">
                  <p>Yana Greer</p>
                </div>
                <div className="member-back">
                  <p>Graphic Design</p>
                </div>
              </div>
            </div>
            {/* Add more team members as needed */}
            <div className="team-member">
              <div className="member-card">
                <div className="member-front">
                  <p>Matthew Creaven</p>
                </div>
                <div className="member-back">
                  <p>App Design</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
