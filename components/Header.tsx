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
          <Link href="/" className="flex items-center">
            <div className="text-white font-bold text-xl">SRI SANARI</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
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

          {/* Social Icons & Phone */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Facebook className="w-5 h-5 text-white hover:text-primary-yellow cursor-pointer" />
              <Twitter className="w-5 h-5 text-white hover:text-primary-yellow cursor-pointer" />
              <Instagram className="w-5 h-5 text-white hover:text-primary-yellow cursor-pointer" />
              <Youtube className="w-5 h-5 text-white hover:text-primary-yellow cursor-pointer" />
            </div>
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
