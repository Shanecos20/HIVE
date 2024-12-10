// // src/components/ContactPage.jsx


// ContactPage.jsx
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './ContactPage.css';

const ContactPage = () => {
  const [rotation, setRotation] = useState(-8);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      // If scrolling down
      if (currentScroll > lastScrollY.current) {
        setRotation(8);
      } else {
        // Scrolling up
        setRotation(-8);
      }
      lastScrollY.current = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="contact-page">
      <div className="contact-content">
        <div className="contact-info-left">
          <div className="contact-info-title">Our phone</div>
          <div className="contact-info-detail">+1 514 282 4600</div>
        </div>
        <div className="contact-info-right">
          <div className="contact-info-detail">2110, Drummond<br/>Montréal, Canada<br/>H3G 1X1</div>
        </div>
        <div className="main-heading">
          <h1>TO TALK<br/>ABOUT<br/>BEARDS</h1>
        </div>
        <motion.div 
          className="green-banner"
          animate={{ rotate: rotation }}
          transition={{ type: "spring", stiffness: 50, damping: 10 }}
        >
          <div className="banner-background">
            <div className="green-overlay"></div>
          </div>
          <div className="green-banner-inner">
            {/* Repeat the text multiple times to ensure it's always visible */}
            <span>A ♥ HELLO@K72.CA&nbsp;</span>
            <span>A ♥ HELLO@K72.CA&nbsp;</span>
            <span>A ♥ HELLO@K72.CA&nbsp;</span>
            <span>A ♥ HELLO@K72.CA&nbsp;</span>
            <span>A ♥ HELLO@K72.CA&nbsp;</span>
            <span>A ♥ HELLO@K72.CA&nbsp;</span>
            <span>A ♥ HELLO@K72.CA&nbsp;</span>
            <span>A ♥ HELLO@K72.CA&nbsp;</span>
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
    </div>
  );
};

export default ContactPage;



// import React, { useState, useEffect, useRef } from "react";
// import "./ContactPage.css"; // Import the CSS for styling
// import Footer from "./Footer"; // Import your existing Footer component

// // Import images
// import headImage from "../media/beeBody/head.png";
// import furImage from "../media/beeBody/fur.png";
// import antennaLImage from "../media/beeBody/antennaL.png";
// import antennaRImage from "../media/beeBody/antennaR.png";
// import eyeLImage from "../media/beeBody/eyeL.png";
// import eyeRImage from "../media/beeBody/eyeR.png";
// import eyeWhiteLImage from "../media/beeBody/eyeWhiteL.png";
// import eyeWhiteRImage from "../media/beeBody/eyeWhiteR.png";
// import legLImage from "../media/beeBody/legL.png";
// import legRImage from "../media/beeBody/legR.png";

// const ContactPage = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   // State to track which form is open
//   const [openForm, setOpenForm] = useState(null);

//   // State for form inputs
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//     company: "", // Added company field for partnership form
//   });

//   // State for submission status
//   const [status, setStatus] = useState("");

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Implement your form submission logic here
//       console.log("Form submitted:", formData);
//       setStatus("Message sent successfully!");
//       // Reset form
//       setFormData({ name: "", email: "", message: "", company: "" });
//     } catch (error) {
//       setStatus("There was an error sending your message. Please try again.");
//     }
//   };

//   // Track mouse movement for eye tracking
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   // Function to calculate pupil position
//   const calculatePupilPosition = (eyeRef) => {
//     if (!eyeRef.current) return {};
//     const rect = eyeRef.current.getBoundingClientRect();
//     const eyeX = rect.left + rect.width / 2;
//     const eyeY = rect.top + rect.height / 2;
//     const dx = mousePosition.x - eyeX;
//     const dy = mousePosition.y - eyeY;
//     const angle = Math.atan2(dy, dx);
//     const radius = rect.width * 0.01; // Adjust the radius as needed
//     const x = radius * Math.cos(angle);
//     const y = radius * Math.sin(angle);
//     return {
//       transform: `translate(${x}px, ${y}px)`,
//     };
//   };

//   const leftEyeRef = useRef(null);
//   const rightEyeRef = useRef(null);

//   return (
//     <div className="contactpage-container">
//       {/* Header Section */}
//       <div className="contactpage-header">
//         <h1 className="contactpage-title">
//           Get In Touch
//           <span className="contactpage-title-background">HIVE</span>
//         </h1>
//         <h2 className="contactpage-subtitle">How can we help you?</h2>
//         <p className="contactpage-description">
//           Select a section below, fill out the form, and we'll be in contact
//           shortly.
//         </p>
//         {/* Leading trail */}
//         <div className="leading-trail"></div>
//       </div>

//       <div className="contactpage-legs">
//         <img src={legLImage} alt="Left Leg" className="bee-leg-left" />
//         <img src={legRImage} alt="Right Leg" className="bee-leg-right" />
//       </div>

//       {/* Bee Head Section */}
//       <div className="contactpage-bee-container">
//         <div className="bee-head">
//           <img src={headImage} alt="Bee Head" className="bee-head-image" />
//           <img src={furImage} alt="Fur" className="bee-fur-image" />
//           <img
//             src={antennaLImage}
//             alt="Left Antenna"
//             className="bee-antenna-left"
//           />
//           <img
//             src={antennaRImage}
//             alt="Right Antenna"
//             className="bee-antenna-right"
//           />

//           <div className="bee-eye left-eye" ref={leftEyeRef}>
//             <img src={eyeLImage} alt="Left Eye" className="bee-eye-image" />
//             <div className="eye-white" id="eye-whiteL">
//               <img
//                 src={eyeWhiteLImage}
//                 alt="Eye White"
//                 className="bee-eye-white-image"
//                 style={calculatePupilPosition(leftEyeRef)}
//               />
//             </div>
//           </div>

//           <div className="bee-eye right-eye" ref={rightEyeRef}>
//             <img src={eyeRImage} alt="Right Eye" className="bee-eye-image" />
//             <div className="eye-white" id="eye-whiteR">
//               <img
//                 src={eyeWhiteRImage}
//                 alt="Eye White"
//                 className="bee-eye-white-image"
//                 style={calculatePupilPosition(rightEyeRef)}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Options Section */}
//       <div className="contactpage-options">
//         {/* Partnership Inquiries Option */}
//         <div
//           className={`contactpage-option ${
//             openForm === "partnership" ? "open" : ""
//           }`}
//         >
//           <div
//             className="option-card"
//             onClick={() => setOpenForm("partnership")}
//           >
//             <div className="option-front">
//               <h3>Partnership Inquiries</h3>
//             </div>
//             <div className="option-back">
//               <p>
//                 Interested in partnering with us? Click to fill out our
//                 partnership form.
//               </p>
//             </div>
//           </div>
//           {/* Partnership Form */}
//           <div className="form-container">
//             {openForm === "partnership" && (
//               <form className="contactpage-form" onSubmit={handleSubmit}>
//                 <label className="contactpage-form-label">
//                   Name:
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     placeholder="Your Name"
//                     className="contactpage-form-input"
//                   />
//                 </label>
//                 <label className="contactpage-form-label">
//                   Email:
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     placeholder="your.email@example.com"
//                     className="contactpage-form-input"
//                   />
//                 </label>
//                 <label className="contactpage-form-label">
//                   Company:
//                   <input
//                     type="text"
//                     name="company"
//                     value={formData.company}
//                     onChange={handleChange}
//                     required
//                     placeholder="Your Company"
//                     className="contactpage-form-input"
//                   />
//                 </label>
//                 <label className="contactpage-form-label">
//                   Message:
//                   <textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                     placeholder="Your message..."
//                     className="contactpage-form-textarea"
//                   ></textarea>
//                 </label>
//                 <button type="submit" className="contactpage-submit-button">
//                   Send Message
//                 </button>
//                 {status && <p className="contactpage-form-status">{status}</p>}
//               </form>
//             )}
//           </div>
//         </div>

//         {/* Product Questions Option */}
//         <div
//           className={`contactpage-option ${
//             openForm === "product" ? "open" : ""
//           }`}
//         >
//           <div className="option-card" onClick={() => setOpenForm("product")}>
//             <div className="option-front">
//               <h3>Product Questions</h3>
//             </div>
//             <div className="option-back">
//               <p>
//                 Have questions about our products? Click to get in touch with us
//                 here.
//               </p>
//             </div>
//           </div>
//           {/* Product Questions Form */}
//           <div className="form-container">
//             {openForm === "product" && (
//               <form className="contactpage-form" onSubmit={handleSubmit}>
//                 <label className="contactpage-form-label">
//                   Name:
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     placeholder="Your Name"
//                     className="contactpage-form-input"
//                   />
//                 </label>
//                 <label className="contactpage-form-label">
//                   Email:
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     placeholder="your.email@example.com"
//                     className="contactpage-form-input"
//                   />
//                 </label>
//                 <label className="contactpage-form-label">
//                   Message:
//                   <textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                     placeholder="Your message..."
//                     className="contactpage-form-textarea"
//                   ></textarea>
//                 </label>
//                 <button type="submit" className="contactpage-submit-button">
//                   Send Message
//                 </button>
//                 {status && <p className="contactpage-form-status">{status}</p>}
//               </form>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Leading trail below options */}
//       <div className="leading-trail"></div>

//       {/* Info Sections */}
//       <div className="contactpage-info-sections">
//         <div className="info-section">
//           <h3>Contact Us</h3>
//           <div className="section-line"></div>
//           <p>Address, phone number, email, etc.</p>
//         </div>
//         <div className="info-section">
//           <h3>Follow Us</h3>
//           <div className="section-line"></div>
//           <p>Social media links, etc.</p>
//         </div>
//         <div className="info-section">
//           <h3>The Team</h3>
//           <div className="section-line"></div>
//           <div className="team-members">
//             <div className="team-member">
//               <div className="member-card">
//                 <div className="member-front">
//                   <p>Shane Costello</p>
//                 </div>
//                 <div className="member-back">
//                   <p>Website Design</p>
//                 </div>
//               </div>
//             </div>
//             <div className="team-member">
//               <div className="member-card">
//                 <div className="member-front">
//                   <p>Yana Greer</p>
//                 </div>
//                 <div className="member-back">
//                   <p>Graphic Design</p>
//                 </div>
//               </div>
//             </div>
//             <div className="team-member">
//               <div className="member-card">
//                 <div className="member-front">
//                   <p>Matthew Creaven</p>
//                 </div>
//                 <div className="member-back">
//                   <p>App Design</p>
//                 </div>
//               </div>
//             </div>
//             {/* Add more team members as needed */}
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default ContactPage;
