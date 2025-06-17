import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Company */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-yellow">Fortune Sudhakara Properties</h3>
            <p className="text-gray-300 mb-4">
              We are a leading real estate company specializing in premium plots, residential properties, and commercial
              developments. Your trusted partner for quality investments.
            </p>
            <div className="flex space-x-3">
              <Facebook className="w-5 h-5 hover:text-primary-yellow cursor-pointer" />
              <Twitter className="w-5 h-5 hover:text-primary-yellow cursor-pointer" />
              <Instagram className="w-5 h-5 hover:text-primary-yellow cursor-pointer" />
              <Youtube className="w-5 h-5 hover:text-primary-yellow cursor-pointer" />
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-yellow">Address</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <p>
                  Villa #748, Symphony Park Homes,
                  <br />
                  Beeramguda, Patancheru,
                  <br />
                  Sangareddy, Hyd, TS - 502319
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <div>
                  <p>+91 98666 63349</p>
                  <p>+91 78935 15501</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <div>
                  <p>info@srisanari.com</p>
                  <p>srisanari.raju@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-yellow">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/" className="hover:text-primary-yellow">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-yellow">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-primary-yellow">
                  Our Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-yellow">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-yellow">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-yellow">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Location Map */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-yellow">Our Location</h3>
            <div className="w-full h-48 bg-gray-700 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.8!2d78.2644!3d17.5449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDMyJzQxLjYiTiA3OMKwMTUnNTEuOCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 SRI SANARI SHANKARA INFRA AND MARKETING. All rights reserved.</p>
          <p className="mt-2">TS RERA Reg. No.: A01100003667</p>
        </div>
      </div>
    </footer>
  )
}
