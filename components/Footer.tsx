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
            <h3 className="text-xl font-bold text-white font-heading tracking-wide">Sri Sanari Infra</h3>
            <p className="text-gray-300 text-sm leading-relaxed font-sans">
              A premier real estate development company specializing in innovative residential and commercial properties.
              Building dreams into reality with trust and excellence.
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
            <h3 className="text-xl font-bold text-white font-heading tracking-wide">Address</h3>
            <div className="space-y-3 text-sm text-white">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-white" />
                <div className="text-white whitespace-pre-line">
                  {`${contactDetails.address.line1},
${contactDetails.address.line2},
${contactDetails.address.line3}`}
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
            <h3 className="text-xl font-bold text-white font-heading tracking-wide">Quick Links</h3>
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
            <h3 className="text-xl font-bold text-white font-heading tracking-wide">Our Location</h3>
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
          <p className="text-center text-gray-400 text-xs sm:text-sm font-sans">
            &copy; {new Date().getFullYear()} SRI SANARI SHANKARA INFRA AND MARKETING. All rights reserved.
          </p>
          <p className="text-center text-gray-400 text-xs sm:text-sm mt-2 font-sans">
            TS RERA Reg. No.: {contactDetails.reraNumber}
          </p>
        </div>
      </div>
      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${contactDetails.phoneNumbers[0]}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center shadow-xl z-50 transition-all duration-300 hover:scale-110 group"
        aria-label="Chat on WhatsApp"
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#25D366] rounded-full flex items-center justify-center group-hover:bg-[#128C7E] transition-colors duration-300">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="white"
            className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-sm"
            preserveAspectRatio="xMidYMid meet"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.96.66 3.77 1.76 5.22L2 22l4.78-1.76A9.9 9.9 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.33 0-2.62-.32-3.76-.92l-.54-.32-3.92 1.03 1.04-3.82-.24-.38A7.9 7.9 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.23-5.95c-.15-.04-1.69-.83-1.95-.93-.26-.1-.45-.15-.64.15-.19.3-.72.93-.89 1.12-.16.19-.33.21-.6.07-.3-.15-1.26-.47-2.4-1.49-.89-.8-1.49-1.78-1.67-2.08-.18-.3-.02-.46.13-.61.14-.14.3-.37.45-.56.15-.19.2-.32.3-.53.1-.21.05-.4-.03-.56-.08-.17-.65-1.57-.88-2.15-.23-.58-.47-.5-.65-.51-.16-.01-.35-.01-.54-.01-.19 0-.49.07-.75.36-.26.3-1 1-1 2.39s1.02 2.77 1.16 2.96c.14.19 2 3.06 4.85 4.29.68.3 1.21.48 1.62.62.68.23 1.3.2 1.79.12.57-.1 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.26-.19-.54-.31z"/>
          </svg>
        </div>
      </a>
    </footer>
  )
}
