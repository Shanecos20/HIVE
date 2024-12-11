import React from 'react';
import './DownloadPage.css';
import beeVideo from '../media/bee2.mp4'; // Ensure correct path
import qrImage from '../media/image.png';    // Add your QR code image here

export default function DownloadPage() {
  return (
    <div className="download-page">
      <video className="background-video" autoPlay loop muted playsInline>
        <source src={beeVideo} type="video/mp4" />
      </video>
      <div className="main-content">
        <div className="address-lines">
          <div className="line line1">HIVEAPP</div>
          <div className="line line2">DOWNLOAD</div>
          <div className="line line3">HERE</div>
        </div>
        <div className="contact-info">
          <div className="contact-label">[CONTACT]</div>
          <div className="contact-details">
            HIVE@HIVEAPP.IE<br/>
            +00 00 000 0000
          </div>
        </div>
        <div className="store-links">
          <a href="#" className="store-button ios">iOS</a>
          <a href="#" className="store-button android">Android</a>
        </div>
        <div className="qr-container">
          <img src={qrImage} alt="QR Code" />
        </div>
      </div>
    </div>
  );
}
