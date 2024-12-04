// src/components/ContactPage.jsx

import React, { useState } from 'react';
import './ContactPage.css'; // Import the CSS for styling
import Footer from './Footer'; // Import your existing Footer component

const ContactPage = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // State for submission status
  const [status, setStatus] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic (e.g., send data to an API)
    try {
      // Example: Replace with your submission logic
      // await sendFormData(formData);
      console.log('Form submitted:', formData);
      setStatus('Message sent successfully!');
      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('There was an error sending your message. Please try again.');
    }
  };

  return (
    <div className="contactpage-container">
      {/* Content Wrapper */}
      <div className="contactpage-content">
        {/* Header Section */}
        <div className="contactpage-header">
          <h1 className="contactpage-header-title">
            <span className="contactpage-word contactpage-word-get">Get</span>
            <span className="contactpage-word contactpage-word-in">In</span>
            <span className="contactpage-word contactpage-word-touch">Touch</span>
          </h1>
        </div>

        {/* Form Section */}
        <div className="contactpage-form-container">
          <form className="contactpage-form" onSubmit={handleSubmit}>
            <label className="contactpage-form-label">
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="contactpage-form-input"
              />
            </label>
            <label className="contactpage-form-label">
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                className="contactpage-form-input"
              />
            </label>
            <label className="contactpage-form-label">
              Message:
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message..."
                className="contactpage-form-textarea"
              ></textarea>
            </label>
            <button type="submit" className="contactpage-submit-button">
              Send Message
            </button>
            {status && <p className="contactpage-form-status">{status}</p>}
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
