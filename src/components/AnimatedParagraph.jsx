// AnimatedParagraph.jsx

import React, { useEffect, useRef } from 'react';
import './AnimatedParagraph.css';

// Import local images (if using local assets)
import image1 from '../media/image1.jpg';
import image2 from '../media/image2.jpg';
import image3 from '../media/image3.jpg';
import image4 from '../media/image4.jpg';

const AnimatedParagraph = () => {
  const paragraphRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const options = {
      threshold: 0.1,
    };

    // Observer for words
    const wordObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          wordObserver.unobserve(entry.target);
        }
      });
    }, options);

    // Observer for cards
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('expand');
          cardObserver.unobserve(entry.target);
        }
      });
    }, options);

    // Observe each word
    const words = paragraphRef.current.querySelectorAll('.word');
    words.forEach((word) => wordObserver.observe(word));

    // Observe each card
    cardRefs.current.forEach((card) => {
      if (card) cardObserver.observe(card);
    });

    return () => {
      wordObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  const text = [
    'Welcome', 'to', 'our', 'innovative', 'platform,', 'where', 'creativity', 'meets', 'technology.', 'Explore', 'features', 'that', 'transform', 'your', 'ideas', 'into', 'reality.'
  ];

  // Define card data with positions and image sources
  const cardsData = [
    { position: 3, image: image1 }, // Adjust indices based on cardPositions
    { position: 5, image: image2 },
    { position: 10, image: image3 },
    { position: 14, image: image4 },
  ];

  let content = [];
  let cardIndex = 0;

  text.forEach((word, index) => {
    content.push(
      <span className="word" key={`word-${index}`}>
        {word}{' '}
      </span>
    );

    const cardData = cardsData.find(card => card.position === index);
    if (cardData) {
      content.push(
        <span
          className="card-container"
          key={`card-${index}`}
          ref={(el) => (cardRefs.current[cardIndex++] = el)}
        >
          <div className="card">
            <img src={cardData.image} alt={`Card ${cardIndex}`} className="card-image" />
          </div>
        </span>
      );
    }
  });

  return (
    <div className="animated-paragraph-container">
      <p className="animated-paragraph" ref={paragraphRef}>
        {content}
      </p>
    </div>
  );
};

export default AnimatedParagraph;
