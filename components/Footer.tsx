import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, MessageCircleMore, MessageCircle } from "lucide-react"
import { contactDetails, socialLinks, quickLinks } from "@/data/nav-footer-details"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Company */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Fortune Sudhakara Properties</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              We are a leading real estate company specializing in premium plots, residential properties, and commercial
              developments. Your trusted partner for quality investments.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon === 'Facebook' ? Facebook :
                               social.icon === 'Twitter' ? Twitter :
                               social.icon === 'Instagram' ? Instagram : Youtube;
                return (
                  <a 
                    key={social.name}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Address</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p>{contactDetails.address.line1},</p>
                  <p>{contactDetails.address.line2},</p>
                  <p>{contactDetails.address.line3}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href={`tel:${contactDetails.phoneNumbers[0]}`} className="hover:underline">
                  {contactDetails.phoneNumbers[0].replace(/\+?(\d{2})(\d{4})(\d{5})/, '+$1 $2 $3')}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <a href="mailto:info@srisanari.com" className="break-all hover:underline">info@srisanari.com</a>
                  <a href="mailto:srisanari.raju@gmail.com" className="break-all hover:underline block mt-1">srisanari.raju@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.url} className="text-gray-300 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Location Map */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Our Location</h3>
            <div className="w-full aspect-video bg-gray-700 rounded-lg overflow-hidden border border-gray-600">
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

        <div className="border-t border-gray-700 pt-8 mt-10">
          <p className="text-center text-gray-400 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} SRI SANARI SHANKARA INFRA AND MARKETING. All rights reserved.
          </p>
          <p className="text-center text-gray-400 text-xs sm:text-sm mt-2">
            TS RERA Reg. No.: {contactDetails.reraNumber}
          </p>
        </div>
      </div>
      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${contactDetails.phoneNumbers[0]}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-4 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg z-50 transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
      </a>
    </footer>
  )
}
