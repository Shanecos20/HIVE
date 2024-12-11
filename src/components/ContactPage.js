// ContactPage.jsx
import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './ContactPage.css';

const ContactPage = () => {
  const controls = useAnimation();
  const lastScrollY = useRef(0);
  const ticking = useRef(false); // To optimize scroll handling

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          if (currentScroll > lastScrollY.current) {
            // Scrolling down
            controls.start({
              rotate: 8,
              transition: { type: 'spring', stiffness: 50, damping: 10 },
            });
          } else if (currentScroll < lastScrollY.current) {
            // Scrolling up
            controls.start({
              rotate: -8,
              transition: { type: 'spring', stiffness: 50, damping: 10 },
            });
          }
          lastScrollY.current = currentScroll;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  return (
    <div className="contact-page">
      <div className="contact-content">
        <div className="contact-info-left">
          <div className="contact-info-title">CALL US</div>
          <div className="contact-info-detail">+1 514 282 4600</div>
        </div>
        <div className="contact-info-right">
          <div className="contact-info-detail">
            1000, Somewhere<br />
            Someplace, Ireland<br />
            H10 100
          </div>
        </div>
        <div className="main-heading">
          <h1>YOU GOT<br />SOME<br />QUESTIONS?</h1>
        </div>
        <motion.div
          className="green-banner"
          animate={controls}
          initial={{ rotate: -8 }}
        >
          <div className="banner-content">
          <div className="banner-background">
            <div className="green-overlay"></div>
          </div>
          <div className="green-banner-inner">
            {/* Repeat the text multiple times to ensure it's always visible */}
            {Array.from({ length: 8 }).map((_, index) => (
              <span key={index}> ♥ HIVEAPP@EMAIL.IE&nbsp;</span>
            ))}
          </div>
          </div>
        </motion.div>
        <div className="follow-us">
          <div className="follow-title">FOLLOW US</div>
          <div className="social-links">
            <button>FB</button>
            <button>IG</button>
            <button>IN</button>
            <button>YT</button>
          </div>
        </div>
      </div>
      {/* Spacer for additional scrolling */}
      <div className="spacer"></div>
    </div>
  );
};

export default ContactPage;
