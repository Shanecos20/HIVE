// src/components/HomePage.js

import React, { useEffect } from 'react';
import Navbar from './Navbar';
import PhoneModel from './PhoneModel';
import Footer from './Footer';

const HomePage = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const zoomFactor = Math.max(1 - scrollPosition / 500, 0);
      document.querySelectorAll('.flower').forEach((flower) => {
        flower.style.transform = `scale(${zoomFactor})`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <div className="main-content">
      <section className="flex flex-col items-center justify-center min-h-screen bg-[#202424] text-white pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full px-4 mx-auto items-center">
          {/* QR Code */}
          <div className="flex justify-center order-3 md:order-1">
            <div
              className="bg-center bg-no-repeat bg-contain"
              style={{
                backgroundImage: "url('/images/QRCODE.png')",
                width: '150px',
                height: '150px',
              }}
            />
          </div>

          {/* Hero Title and Content */}
          <div className="text-center flex flex-col items-center order-1 md:order-2">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold mb-10 font-[Emotion]">
              HIVE
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-400 mb-8 lg:mb-12">
              Revolutionizing Beekeeping with IoT Innovation
            </p>
            <a
              href="#download"
              className="inline-block px-8 py-4 mt-4 lg:mt-8 bg-yellow-400 text-[#202424] rounded-md font-bold text-xl md:text-2xl transition-colors duration-300 hover:bg-yellow-500"
            >
              Download Now
            </a>
          </div>

          {/* Phone Model */}
          <div className="flex justify-center order-2 md:order-3 w-full md:w-auto">
            <div className="w-64 h-96 md:w-80 md:h-[32rem] lg:w-96 lg:h-[36rem]">
              <PhoneModel />
            </div>
          </div>
        </div>
      </section>
      <Footer />
      </div>
    </>
  );
};

export default HomePage;
