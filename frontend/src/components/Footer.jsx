import React from 'react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black py-10 mt-5">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-8 mb-6">
          <a href="https://www.instagram.com/" className="text-gray-400 hover:text-white">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.linkedin.com/" className="text-gray-400 hover:text-white">
            <FaLinkedin size={24} />
          </a>
        </div>

        <p className="text-lg mb-4">832 N Wellness Drive, Midway, UT 84049</p>
        <p className="text-lg mb-8">888 680-1814 | sales@ameyalli.com</p>
        
        <div className="mb-8">
          <p className="text-sm">Copyright © 2024 | ABHINASH MISHRA</p>
          <p className="text-sm">&copy; 2024 AMEYALLI. Christie's International Real Estate. All Rights Reserved.</p>
        </div>

        <p className="text-sm underline cursor-pointer">PRIVACY POLICY | LEGAL</p>
      </div>
    </footer>
  );
};

export default Footer;
