"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      {/* Top Contact Bar - Desktop */}
      <div className="hidden lg:block bg-[#212d45] text-white text-sm py-1 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <FaPhone className="text-[#ffc03d]" />
              <a href="tel:+91986663349" className="hover:text-[#ffc03d] transition-colors">+91 98666 63349</a>
              <span className="mx-2">|</span>
              <a href="tel:+917893515501" className="hover:text-[#ffc03d] transition-colors">+91 78935 15501</a>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-[#ffc03d]" />
              <a href="mailto:info@srisanari.com" className="hover:text-[#ffc03d] transition-colors">info@srisanari.com</a>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-[#ffc03d]" />
            <span>Villa #748, Symphony Park Homes, Beeramguda</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white py-3 px-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-[#212d45]">
            SRI SANARI SHANKARA
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-[#212d45] hover:text-[#ffc03d] font-medium transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-[#212d45] hover:text-[#ffc03d] font-medium transition-colors">
              About Us
            </Link>
            <Link href="/projects" className="text-[#212d45] hover:text-[#ffc03d] font-medium transition-colors">
              Our Projects
            </Link>
            <Link 
              href="/contact" 
              className="bg-[#ffc03d] hover:bg-[#e6ac35] text-[#212d45] font-bold px-6 py-2 rounded-full transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="lg:hidden text-[#212d45] focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white py-4 px-4 shadow-lg">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-[#212d45] hover:text-[#ffc03d] font-medium py-2 border-b border-gray-100"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-[#212d45] hover:text-[#ffc03d] font-medium py-2 border-b border-gray-100"
                onClick={toggleMenu}
              >
                About Us
              </Link>
              <Link 
                href="/projects" 
                className="text-[#212d45] hover:text-[#ffc03d] font-medium py-2 border-b border-gray-100"
                onClick={toggleMenu}
              >
                Our Projects
              </Link>
              <div className="pt-4">
                <Link 
                  href="/contact" 
                  className="block w-full text-center bg-[#ffc03d] hover:bg-[#e6ac35] text-[#212d45] font-bold px-6 py-3 rounded-full transition-colors"
                  onClick={toggleMenu}
                >
                  Contact Us
                </Link>
              </div>
              
              {/* Mobile Contact Info */}
              <div className="pt-4 border-t border-gray-100">
                <div className="space-y-3">
                  <a 
                    href="tel:+91986663349" 
                    className="flex items-center space-x-2 text-[#212d45] hover:text-[#ffc03d]"
                  >
                    <FaPhone className="text-[#ffc03d]" />
                    <span>+91 98666 63349</span>
                  </a>
                  <a 
                    href="mailto:info@srisanari.com" 
                    className="flex items-center space-x-2 text-[#212d45] hover:text-[#ffc03d]"
                  >
                    <FaEnvelope className="text-[#ffc03d]" />
                    <span>info@srisanari.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

