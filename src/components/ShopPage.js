// ShopPage.js
import React, { useState, useContext } from 'react';
import './ShopPage.css';
import { CartContext } from './CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import Cart from './Cart';
import { useInView } from 'react-intersection-observer';

export default function ShopPage() {
  const { addToCart } = useContext(CartContext);
  const [showBundles, setShowBundles] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [expandedBundle, setExpandedBundle] = useState(null);

  const bundles = [
    {
      id: 1,
      name: "Starter Bundle",
      price: "$49",
      desc: "Basic hive sensors & insights",
      products: [
        { id: 101, name: "Temp Sensor", img: "https://via.placeholder.com/50", qty: 1 },
        { id: 102, name: "Basic Hive Monitor", img: "https://via.placeholder.com/50", qty: 1 }
      ]
    },
    {
      id: 2,
      name: "Advanced Bundle",
      price: "$99",
      desc: "Advanced analytics & environmental tracking",
      products: [
        { id: 201, name: "Temp Sensor", img: "https://via.placeholder.com/50", qty: 1 },
        { id: 202, name: "Humidity Sensor", img: "https://via.placeholder.com/50", qty: 1 },
        { id: 203, name: "AI Analytics Upgrade", img: "https://via.placeholder.com/50", qty: 1 }
      ]
    },
    {
      id: 3,
      name: "Pro Bundle",
      price: "$149",
      desc: "Full suite of hive health metrics & AI insights",
      products: [
        { id: 301, name: "Temp Sensor", img: "https://via.placeholder.com/50", qty: 2 },
        { id: 302, name: "Humidity Sensor", img: "https://via.placeholder.com/50", qty: 1 },
        { id: 303, name: "AI Analytics Upgrade", img: "https://via.placeholder.com/50", qty: 1 },
        { id: 304, name: "Pro Security Module", img: "https://via.placeholder.com/50", qty: 1 }
      ]
    }
  ];

  const individualProducts = [
    { id: 1001, name: "Temp Sensor", price: "$10", desc: "Monitor hive temperature" },
    { id: 1002, name: "Humidity Sensor", price: "$12", desc: "Track moisture levels" },
    { id: 1003, name: "AI Analytics Upgrade", price: "$20", desc: "Advanced hive analysis" }
  ];

  const handleToggle = () => {
    setShowBundles(!showBundles);
    setExpandedBundle(null);
  };

  const handleExpand = (id) => {
    setExpandedBundle(expandedBundle === id ? null : id);
  };

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const transitionVariant = {
    initial: (direction) => ({ x: direction === 'enter' ? 300 : -300, opacity: 0 }),
    animate: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: (direction) => ({ x: direction === 'enter' ? -300 : 300, opacity: 0, transition: { duration: 0.5 } })
  };

  return (
    <div className="shop-page">
      <header className="shop-header">
        <div className="curved-text-container">
          {/* A gentler curve and larger viewBox to ensure text is visible */}
          <svg viewBox="0 0 800 300">
            <path id="curvePath" d="M100,200 C300,100 500,100 700,200" fill="transparent" />
            <text fontFamily="Playfair Display" fontWeight="700" fontSize="80" fill="#fff">
              <textPath xlinkHref="#curvePath" startOffset="50%" textAnchor="middle">PRODUCTS</textPath>
            </text>
          </svg>
        </div>
        {/* Additional staggered words below the curved text */}
        <div className="staggered-words">
          <span className="staggered-word word1">shop</span>
          <span className="staggered-word word2">the</span>
          <span className="staggered-word word3">best</span>
        </div>

        <div className="cart-button" onClick={() => setIsCartOpen(true)}>
          🛒 Cart
        </div>
      </header>

      <section className="featured-section" ref={ref}>
        <h2 className="featured-heading">Featured Products</h2>
        <div className="featured-cards">
          {[1,2,3,4,5].map((num) => (
            <motion.div
              key={num}
              className="featured-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: num * 0.2 }}
            >
              <img src="https://via.placeholder.com/300x200" alt={`Featured ${num}`} />
              <h3>Exclusive Item {num}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="toggle-container">
        <div className="toggle-switch">
          <input
            type="checkbox"
            id="toggleSwitch"
            checked={!showBundles}
            onChange={handleToggle}
          />
          <label htmlFor="toggleSwitch" className="toggle-label">
            <span className="toggle-text left">Bundles</span>
            <span className="toggle-slider"></span>
            <span className="toggle-text right">Products</span>
          </label>
        </div>
      </div>

      <div className="product-list-wrapper">
        <AnimatePresence mode="wait" custom={showBundles ? 'enter' : 'exit'}>
          {showBundles ? (
            <motion.div
              key="bundles"
              className="product-list"
              variants={transitionVariant}
              initial="initial"
              animate="animate"
              exit="exit"
              custom="enter"
            >
              {bundles.map(b => (
                <div key={b.id} className="product-item">
                  <img src="https://via.placeholder.com/300x200" alt={b.name} className="product-image" />
                  <div className="product-details">
                    <h3 onClick={() => handleExpand(b.id)} className="product-name">{b.name}</h3>
                    <p className="product-desc">{b.desc}</p>
                    <p className="product-price">{b.price}</p>
                    <button onClick={() => addToCart(b)} className="add-to-bag">Add to Cart</button>
                    <AnimatePresence>
                      {expandedBundle === b.id && (
                        <motion.div
                          className="bundle-dropdown"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h4>Included Products:</h4>
                          {b.products.map(p => (
                            <div key={p.id} className="bundle-product">
                              <img src={p.img} alt={p.name} />
                              <span>{p.name} (x{p.qty})</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="products"
              className="product-list"
              variants={transitionVariant}
              initial="initial"
              animate="animate"
              exit="exit"
              custom="exit"
            >
              {individualProducts.map(p => (
                <div key={p.id} className="product-item">
                  <img src="https://via.placeholder.com/300x200" alt={p.name} className="product-image" />
                  <div className="product-details">
                    <h3 className="product-name">{p.name}</h3>
                    <p className="product-desc">{p.desc}</p>
                    <p className="product-price">{p.price}</p>
                    <button onClick={() => addToCart(p)} className="add-to-bag">Add to Cart</button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="checkout-section">
        <button onClick={() => setIsCartOpen(true)} className="checkout-button">Go to Checkout</button>
      </div>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
