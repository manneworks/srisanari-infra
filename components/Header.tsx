"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="bg-white fixed w-full top-0 z-50 shadow-lg font-heading">
      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
      <div className="container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <img 
              src="/images/navbar-logo.png" 
              alt="SRI SANARI Logo" 
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-12 absolute left-1/2 transform -translate-x-1/2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-gray-900 hover:text-yellow-600 transition-colors font-semibold text-[15px] px-2 tracking-wide ${
                  pathname === item.href ? "text-yellow-600" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Phone Number */}
          <div className="hidden lg:flex items-center">
            <a href="tel:+919866663349" className="btn-call flex items-center space-x-2 font-heading tracking-wider">
              <Phone className="w-4 h-4" />
              <span>+91 98666 63349</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-gray-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="h-full overflow-y-auto p-6">
            <nav className="flex flex-col space-y-6">
              <button 
                className="self-end mb-4 text-gray-500 hover:text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-lg text-gray-900 hover:text-yellow-600 transition-colors py-3 font-semibold ${
                    pathname === item.href ? "text-yellow-600" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <a 
                href="tel:+919866663349" 
                className="btn-call inline-flex items-center justify-center space-x-2 w-full mt-4 font-heading tracking-wider"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="w-4 h-4" />
                <span>+91 98666 63349</span>
              </a>
              {/* Social Icons */}
              <div className="flex space-x-4 pt-4 mt-auto justify-center">
                <a href="#" className="text-gray-600 hover:text-primary-yellow transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-primary-yellow transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-primary-yellow transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-primary-yellow transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
