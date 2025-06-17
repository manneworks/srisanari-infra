"use client";

import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">SRI SANARI</h3>
            <p className="text-gray-400 mb-6">
              Premium real estate solutions in Hyderabad. We offer the best properties and projects for your investment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-primary p-2 rounded-full hover:bg-opacity-80">
                <FaFacebookF />
              </a>
              <a href="#" className="bg-primary p-2 rounded-full hover:bg-opacity-80">
                <FaTwitter />
              </a>
              <a href="#" className="bg-primary p-2 rounded-full hover:bg-opacity-80">
                <FaInstagram />
              </a>
              <a href="#" className="bg-primary p-2 rounded-full hover:bg-opacity-80">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-primary">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-primary">About Us</Link></li>
              <li><Link href="/properties" className="text-gray-400 hover:text-primary">Properties</Link></li>
              <li><Link href="/projects" className="text-gray-400 hover:text-primary">Projects</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaPhone className="mt-1 mr-3 text-primary" />
                <span>+91 98666 63349</span>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="mt-1 mr-3 text-primary" />
                <span>info@srisanari.com</span>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-primary" />
                <span>Villa #748, Symphony Park Homes, Beeramguda, Patancheru, Hyderabad, TS - 502319</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 w-full rounded-l-md focus:outline-none text-gray-800"
              />
              <button className="bg-primary px-4 py-2 rounded-r-md font-medium">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SRI SANARI SHANKARA INFRA AND MARKETING. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
