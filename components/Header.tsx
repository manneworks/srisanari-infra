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
    { name: "Our Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="bg-navy fixed w-full top-0 z-50 shadow-lg">
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
          <nav className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-white hover:text-primary-yellow transition-colors ${
                  pathname === item.href ? "text-primary-yellow" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Phone Number */}
          <div className="hidden lg:flex items-center">
            <a href="tel:+919866663349" className="btn-primary flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+91 98666 63349</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-700">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-white hover:text-primary-yellow transition-colors ${
                    pathname === item.href ? "text-primary-yellow" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <a href="tel:+919866663349" className="btn-primary inline-flex items-center space-x-2 w-fit">
                <Phone className="w-4 h-4" />
                <span>+91 98666 63349</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
