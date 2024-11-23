// src/components/Navbar.js

import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle body scroll lock and blur effect
  useEffect(() => {
    const mainContent = document.querySelector(".main-content");

    if (menuOpen) {
      document.body.classList.add("no-scroll");
      mainContent?.classList.add("blur"); // Optional chaining to ensure mainContent exists
    } else {
      document.body.classList.remove("no-scroll");
      mainContent?.classList.remove("blur");
    }

    // Cleanup effect to remove classes on unmount or when menuOpen changes
    return () => {
      document.body.classList.remove("no-scroll");
      mainContent?.classList.remove("blur");
    };
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">HIVE</div>
        <div className="navbar-quick-links">
          <a href="#story">
            <span>Our Story</span>
          </a>
          <a href="#about">
            <span>About Us</span>
          </a>
          <a href="#download">
            <span>Download</span>
          </a>
        </div>

      <div
        className={`burger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <div className={`overlay ${menuOpen ? "slide-down" : "slide-up"}`}>
        <ul className="overlay-menu">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#download">Download</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>{" "}
          {/* New About button in overlay */}
          <li>
            <a href="#marketplace">Products</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
