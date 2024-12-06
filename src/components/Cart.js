// Cart.js
import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { motion } from 'framer-motion';
import './Cart.css';

export default function Cart({ isOpen, onClose }) {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  if (!isOpen) return null;

  return (
    <motion.div 
      className="cart-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="cart-modal"
        initial={{ scale: 0.8, y: "-50%", x: "50%" }}
        animate={{ scale: 1, y: "0%", x: "0%" }}
        exit={{ scale: 0.8, y: "-50%", x: "50%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.img || 'https://via.placeholder.com/50'} alt={item.name} />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>Quantity: {item.qty}</p>
                  <p>Price: {item.price}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="remove-button">Remove</button>
              </div>
            ))}
          </div>
        )}
        <div className="cart-actions">
          <button onClick={clearCart} className="clear-button">Clear Cart</button>
          <button onClick={() => { /* Navigate to checkout */ }} className="checkout-button">Checkout</button>
        </div>
      </motion.div>
    </motion.div>
  );
}
