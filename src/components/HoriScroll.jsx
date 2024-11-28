// HoriScroll.jsx
import React, { useRef, useEffect, useState } from 'react';
import './HoriScroll.css';

const HoriScroll = () => {
  const hsSectionRef = useRef(null);
  const hsWrapperRef = useRef(null);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [sectionHeight, setSectionHeight] = useState('100vh');

  // Calculate scrollWidth and set section height
  useEffect(() => {
    const calculateScroll = () => {
      if (hsWrapperRef.current && hsSectionRef.current) {
        const wrapperWidth = hsWrapperRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const totalScroll = wrapperWidth - viewportWidth;

        console.log('Wrapper Width:', wrapperWidth);
        console.log('Viewport Width:', viewportWidth);
        console.log('Total Scroll:', totalScroll);

        setScrollWidth(totalScroll);
        setSectionHeight(`${totalScroll + window.innerHeight}px`);
      }
    };

    // Initial calculation
    calculateScroll();

    // Recalculate on resize
    window.addEventListener('resize', calculateScroll);
    return () => window.removeEventListener('resize', calculateScroll);
  }, []);

  // Handle scroll and map to translateX
  useEffect(() => {
    const handleScroll = () => {
      if (hsSectionRef.current && hsWrapperRef.current) {
        const section = hsSectionRef.current;
        const wrapper = hsWrapperRef.current;

        const scrollTop = window.scrollY;
        const sectionTop = section.offsetTop;
        const scrolled = scrollTop - sectionTop;

        console.log('Scroll Top:', scrollTop);
        console.log('Section Top:', sectionTop);
        console.log('Scrolled:', scrolled);

        if (scrolled >= 0 && scrolled <= scrollWidth) {
          wrapper.style.transform = `translateX(-${scrolled}px)`;
        } else if (scrolled > scrollWidth) {
          wrapper.style.transform = `translateX(-${scrollWidth}px)`;
        } else {
          wrapper.style.transform = 'translateX(0px)';
        }
      }
    };

    // Throttle scroll handler with requestAnimationFrame
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollWidth]);

  return (
    <section
      className="hs-section"
      ref={hsSectionRef}
      style={{ height: sectionHeight }}
    >
      <div
        className="hs-wrapper"
        ref={hsWrapperRef}
        style={{
          transform: `translateX(0px)`,
          transition: 'transform 0.1s ease-out', // Optional: adjust or remove for immediate response
        }}
      >
        <div
          className="hs-card hs-card-1"
          role="group"
          aria-label="Card 1"
          tabIndex="0"
        >
          Card 1
        </div>
        <div
          className="hs-card hs-card-2"
          role="group"
          aria-label="Card 2"
          tabIndex="0"
        >
          Card 2
        </div>
        <div
          className="hs-card hs-card-3"
          role="group"
          aria-label="Card 3"
          tabIndex="0"
        >
          Card 3
        </div>
        <div
          className="hs-card hs-card-4"
          role="group"
          aria-label="Card 4"
          tabIndex="0"
        >
          Card 4
        </div>
        <div
          className="hs-card hs-card-5"
          role="group"
          aria-label="Card 5"
          tabIndex="0"
        >
          Card 5
        </div>
        {/* Add more cards as needed */}
      </div>
    </section>
  );
};

export default HoriScroll;
