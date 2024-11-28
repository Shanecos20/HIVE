import React from 'react';
import './Footer.css';
import { FaLinkedin, FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Background Text */}
      <div className="footer__background-text">HIVE</div>

      {/* Left Section - Navigation Links */}
      <div className="footer__left">
        <a href="/about" className="footer__link">E-Book</a>
        <a href="/services" className="footer__link">Contact</a>
        <a href="/contact" className="footer__link">About Us</a>
        <a href="/faq" className="footer__link">Download HIVE</a>
      </div>

      {/* Right Section - Social Icons */}
      <div className="footer__right">
        <div className="footer__social-link-container">
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <span className="footer__social-text">LinkedIn</span>
        </div>
        <div className="footer__social-link-container">
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="YouTube">
            <FaYoutube />
          </a>
          <span className="footer__social-text">YouTube</span>
        </div>
        <div className="footer__social-link-container">
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Twitter">
            <FaTwitter />
          </a>
          <span className="footer__social-text">Twitter</span>
        </div>
        <div className="footer__social-link-container">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
            <FaInstagram />
          </a>
          <span className="footer__social-text">Instagram</span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer__bottom">
        <div className="footer__copyright">
          &copy; {new Date().getFullYear()} HIVE App. All rights reserved.
        </div>
        <a href="/privacy-policy" className="footer__privacy">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
