// src/components/HomePage.js

import React from 'react';
import Navbar from './Navbar';
import PhoneModel from './PhoneModel';
import Footer from './Footer';
import './HomePage.css';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      {/* Rest of the content */}
      <div className="hero-section">
        <div className="hero-text">
          <h1>Welcome to HIVE App</h1>
          <p>Enhance your beekeeping experience with our IoT solutions.</p>
          <a href="#download" className="cta-button">Download Now</a>
        </div>
        <div className="hero-model">
          <PhoneModel />
        </div>
      </div>
      {/* Other sections */}
      <Footer />
    </div>
  );
};

export default HomePage;
