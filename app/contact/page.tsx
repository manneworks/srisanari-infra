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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all required fields.',
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your message! We will get back to you soon.',
        })
        // Reset form on success
        setFormData({ name: "", phone: "", email: "", subject: "", message: "" })
      } else {
        throw new Error(data.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and common phone number characters
    const value = e.target.value.replace(/[^0-9+\-()\s]/g, '');
    setFormData({
      ...formData,
      phone: value,
    });
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

      {/* Contact Form & Map */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-navy-blue">Send us a Message</h2>
              <div className="bg-white p-8 rounded-xl border border-gray-100 transition-all duration-300">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <p className="text-gray-600 mb-6">We'll get back to you within 24 hours</p>
                  {submitStatus.message && (
                    <div className={`p-4 rounded-md ${submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {submitStatus.message}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-none focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent transition-all duration-200"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        required
                        pattern="[0-9+\-()\s]+"
                        title="Please enter a valid phone number (only numbers, +, -, (, ), and spaces are allowed)"
                        className="w-full px-4 py-3 border border-gray-200 rounded-none focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent transition-all duration-200"
                        placeholder="Your phone number"
                        inputMode="tel"
                        maxLength={15}
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent transition-all duration-200"
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent transition-all duration-200 bg-white"
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent resize-none transition-all duration-200"
                      placeholder="Tell us about your requirements..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full py-4 text-lg font-semibold text-white bg-navy-blue hover:bg-opacity-90 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow shadow-md hover:shadow-lg ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>

            {/* Map & Additional Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-navy-blue">Find Us</h2>

              {/* Map */}
              <div className="bg-white rounded-xl overflow-hidden mb-8 border border-gray-100 transition-all duration-300">
                <div className="h-64 lg:h-80">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.8!2d78.2644!3d17.5449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDMyJzQxLjYiTiA3OMKwMTUnNTEuOCJF!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-b-xl"
                  ></iframe>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-white p-8 rounded-xl border border-gray-100 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-6 text-navy-blue">Why Choose Us?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3 group">
                    <div className="w-6 h-6 bg-primary-yellow/10 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-primary-yellow/20 transition-colors duration-200">
                      <div className="w-1.5 h-1.5 bg-primary-yellow rounded-full"></div>
                    </div>
                    <span className="text-gray-700">RERA Registered Company (A01100003667)</span>
                  </li>
                  <li className="flex items-start space-x-3 group">
                    <div className="w-6 h-6 bg-primary-yellow/10 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-primary-yellow/20 transition-colors duration-200">
                      <div className="w-1.5 h-1.5 bg-primary-yellow rounded-full"></div>
                    </div>
                    <span className="text-gray-700">10+ Years of Industry Experience</span>
                  </li>
                  <li className="flex items-start space-x-3 group">
                    <div className="w-6 h-6 bg-primary-yellow/10 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-primary-yellow/20 transition-colors duration-200">
                      <div className="w-1.5 h-1.5 bg-primary-yellow rounded-full"></div>
                    </div>
                    <span className="text-gray-700">500+ Satisfied Customers</span>
                  </li>
                  <li className="flex items-start space-x-3 group">
                    <div className="w-6 h-6 bg-primary-yellow/10 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-primary-yellow/20 transition-colors duration-200">
                      <div className="w-1.5 h-1.5 bg-primary-yellow rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Transparent Dealings & Clear Documentation</span>
                  </li>
                  <li className="flex items-start space-x-3 group">
                    <div className="w-6 h-6 bg-primary-yellow/10 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-primary-yellow/20 transition-colors duration-200">
                      <div className="w-1.5 h-1.5 bg-primary-yellow rounded-full"></div>
                    </div>
                    <span className="text-gray-700">End-to-End Property Solutions</span>
                  </li>
                </ul>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h4 className="font-semibold mb-4 text-navy-blue text-lg">Follow Us</h4>
                  <div className="flex space-x-3">
                    <a href="#" className="w-10 h-10 rounded-lg bg-gray-50 hover:bg-primary-yellow/10 flex items-center justify-center transition-colors duration-200 group">
                      <Facebook className="w-5 h-5 text-gray-600 group-hover:text-primary-yellow transition-colors duration-200" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-lg bg-gray-50 hover:bg-primary-yellow/10 flex items-center justify-center transition-colors duration-200 group">
                      <Twitter className="w-5 h-5 text-gray-600 group-hover:text-primary-yellow transition-colors duration-200" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-lg bg-gray-50 hover:bg-primary-yellow/10 flex items-center justify-center transition-colors duration-200 group">
                      <Instagram className="w-5 h-5 text-gray-600 group-hover:text-primary-yellow transition-colors duration-200" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-lg bg-gray-50 hover:bg-primary-yellow/10 flex items-center justify-center transition-colors duration-200 group">
                      <Youtube className="w-5 h-5 text-gray-600 group-hover:text-primary-yellow transition-colors duration-200" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Temporarily commented out
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
      */}

      {/* Contact Information - Moved to bottom */}
      {/* <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-navy-blue">Our Contact Information</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Reach out to us through any of these channels
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-20 h-20 bg-primary-yellow/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group">
                <div className="w-16 h-16 bg-primary-yellow rounded-xl flex items-center justify-center transition-all duration-300 group-hover:rotate-6">
                  <Phone className="w-7 h-7 text-navy-blue" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-navy-blue">Phone</h3>
              <div className="space-y-2">
                <a href="tel:+919866663349" className="block text-gray-600 hover:text-primary-yellow transition-colors text-base">+91 98666 63349</a>
                <a href="tel:+917893515501" className="block text-gray-600 hover:text-primary-yellow transition-colors text-base">+91 78935 15501</a>
              </div>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-20 h-20 bg-primary-yellow/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group">
                <div className="w-16 h-16 bg-primary-yellow rounded-xl flex items-center justify-center transition-all duration-300 group-hover:rotate-6">
                  <Mail className="w-7 h-7 text-navy-blue" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-navy-blue">Email</h3>
              <div className="space-y-2">
                <a href="mailto:info@srisanari.com" className="block text-gray-600 hover:text-primary-yellow transition-colors text-sm">info@srisanari.com</a>
                <a href="mailto:srisanari.raju@gmail.com" className="block text-gray-600 hover:text-primary-yellow transition-colors text-sm">srisanari.raju@gmail.com</a>
              </div>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-20 h-20 bg-primary-yellow/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group">
                <div className="w-16 h-16 bg-primary-yellow rounded-xl flex items-center justify-center transition-all duration-300 group-hover:rotate-6">
                  <MapPin className="w-7 h-7 text-navy-blue" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-navy-blue">Address</h3>
              <address className="text-gray-600 text-sm not-italic">
                Villa #748, Symphony Park Homes,
                <br className="hidden sm:block" />
                Beeramguda, Patancheru,
                <br className="hidden sm:block" />
                Sangareddy, Hyd, TS - 502319
              </address>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-20 h-20 bg-primary-yellow/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group">
                <div className="w-16 h-16 bg-primary-yellow rounded-xl flex items-center justify-center transition-all duration-300 group-hover:rotate-6">
                  <Clock className="w-7 h-7 text-navy-blue" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-navy-blue">Office Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-base">Mon - Sat: 9:00 AM - 7:00 PM</p>
                <p className="text-base">Sunday: 10:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  )
}
