// src/components/Navbar.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  // Close the menu when a link is clicked
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" onClick={handleLinkClick}>
          HIVE
        </Link>
      </div>
      <div className="navbar-quick-links">
        <Link to="/about" onClick={handleLinkClick}>
          <span>About Us</span>
        </Link>
        <Link to="/shop" onClick={handleLinkClick}>
          <span>Shop</span>
        </Link>
        <Link to="/download" onClick={handleLinkClick}>
          <span>Download</span>
        </Link>
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
            <Link to="/" onClick={handleLinkClick}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/download" onClick={handleLinkClick}>
              Download
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={handleLinkClick}>
              About
            </Link>
          </li>
          <li>
            <Link to="/shop" onClick={handleLinkClick}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={handleLinkClick}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
