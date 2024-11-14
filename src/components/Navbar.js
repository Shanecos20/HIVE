// src/components/Navbar.js

import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle body scroll lock and blur effect
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('no-scroll');
      document.querySelector('.main-content').classList.add('blur');
    } else {
      document.body.classList.remove('no-scroll');
      document.querySelector('.main-content').classList.remove('blur');
    }
    return () => {
      document.body.classList.remove('no-scroll');
      document.querySelector('.main-content').classList.remove('blur');
    };
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">HIVE</div>
      <div
        className={`burger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <div className={`overlay ${menuOpen ? 'active slide-down' : 'slide-up'}`}>
        <ul className="overlay-menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#download">Download</a></li>
          <li><a href="#marketplace">Products</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
