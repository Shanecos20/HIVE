// src/components/Navbar.js

import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">HIVE App</div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#download">Download</a></li>
        <li><a href="#marketplace">Marketplace</a></li>
        <li><a href="#reviews">Reviews</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
