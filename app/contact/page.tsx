"use client"

import type React from "react"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you for your message! We will get back to you soon.")
    setFormData({ name: "", phone: "", email: "", subject: "", message: "" })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-navy text-white">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get in touch with our real estate experts. We're here to help you find your perfect property.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-primary-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-navy-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-navy-blue">Phone</h3>
              <p className="text-gray-600">+91 98666 63349</p>
              <p className="text-gray-600">+91 78935 15501</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-primary-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-navy-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-navy-blue">Email</h3>
              <p className="text-gray-600">info@srisanari.com</p>
              <p className="text-gray-600">srisanari.raju@gmail.com</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-primary-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-navy-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-navy-blue">Address</h3>
              <p className="text-gray-600 text-sm">
                Villa #748, Symphony Park Homes,
                <br />
                Beeramguda, Patancheru,
                <br />
                Sangareddy, Hyd, TS - 502319
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-primary-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-navy-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-navy-blue">Office Hours</h3>
              <p className="text-gray-600">Mon - Sat: 9:00 AM - 7:00 PM</p>
              <p className="text-gray-600">Sunday: 10:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-navy-blue">Send us a Message</h2>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                      placeholder="Your email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                    >
                      <option value="">Select a subject</option>
                      <option value="property-inquiry">Property Inquiry</option>
                      <option value="investment-consultation">Investment Consultation</option>
                      <option value="site-visit">Site Visit Request</option>
                      <option value="documentation">Documentation Support</option>
                      <option value="general-inquiry">General Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow resize-none"
                      placeholder="Tell us about your requirements..."
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-primary w-full py-3 text-lg">
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Map & Additional Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-navy-blue">Find Us</h2>

              {/* Map */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                <div className="h-64 lg:h-80">
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

              {/* Additional Information */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-navy-blue">Why Choose Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-yellow rounded-full mt-2"></div>
                    <span className="text-gray-700">RERA Registered Company (A01100003667)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-yellow rounded-full mt-2"></div>
                    <span className="text-gray-700">10+ Years of Industry Experience</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-yellow rounded-full mt-2"></div>
                    <span className="text-gray-700">500+ Satisfied Customers</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-yellow rounded-full mt-2"></div>
                    <span className="text-gray-700">Transparent Dealings & Clear Documentation</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-yellow rounded-full mt-2"></div>
                    <span className="text-gray-700">End-to-End Property Solutions</span>
                  </li>
                </ul>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-3 text-navy-blue">Follow Us</h4>
                  <div className="flex space-x-4">
                    <Facebook className="w-6 h-6 text-gray-600 hover:text-primary-yellow cursor-pointer" />
                    <Twitter className="w-6 h-6 text-gray-600 hover:text-primary-yellow cursor-pointer" />
                    <Instagram className="w-6 h-6 text-gray-600 hover:text-primary-yellow cursor-pointer" />
                    <Youtube className="w-6 h-6 text-gray-600 hover:text-primary-yellow cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-navy text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Invest in Your Dream Property?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Our expert team is ready to guide you through every step of your real estate journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+919866663349" className="btn-primary inline-flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Call Now: +91 98666 63349</span>
            </a>
            <a
              href="mailto:info@srisanari.com"
              className="bg-transparent border-2 border-primary-yellow text-primary-yellow px-6 py-3 rounded-lg font-semibold hover:bg-primary-yellow hover:text-navy-blue transition-colors inline-flex items-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>Email Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
