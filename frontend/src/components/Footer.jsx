import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="bg-white py-10">
      <div className="flex flex-col md:flex-row justify-between items-start text-sm text-gray-400 px-10">
        
        {/* Logo & Description */}
        <div className="md:w-1/3">
          <img src={assets.Logo} className="mb-5 w-32" />
          <p className="text-gray-600">
            "Plantastique is your trusted AgriTech marketplace, offering top-quality seeds, tools, and AI-powered plant disease detection. Empowering farmers with innovation for a healthier, greener, and more productive future. Grow smarter with us!"
          </p>
        </div>

        {/* Company Section */}
        <div className="md:w-1/6 mt-3">
          <p className="text-xl text-black font-medium mb-3">COMPANY</p>
          <ul className="text-gray-600 space-y-1">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="md:w-1/6 mt-3">
          <p className="text-xl text-black font-medium mb-3">GET IN TOUCH</p>
          <ul className="text-gray-600 space-y-1">
            <li>+1-212-456-7890</li>
            <li>Plantastique.info@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-10">
        <hr />
        <p className="py-5 text-sm text-center">Copyright 2025 @ Plantastique.com - All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer;
