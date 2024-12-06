// Checkout.js
import React, { useState } from 'react';
import './Checkout.css';

export default function Checkout() {
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  
  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <div className="checkout-form">
        <label>Name on Card</label>
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="John Doe" />
        <label>Card Number</label>
        <input value={card} onChange={(e)=>setCard(e.target.value)} placeholder="1234 5678 9012 3456" />
        <button className="pay-button">Pay Now</button>
      </div>
    </div>
  );
}
