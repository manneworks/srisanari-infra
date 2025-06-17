"use client";

import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaChevronDown, FaChevronUp, FaClock, FaRegBuilding } from 'react-icons/fa';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Property Inquiry',
    message: ''
  });
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitStatus({
        success: true,
        message: 'Thank you for your message! Our team will contact you shortly.'
      });
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Property Inquiry',
        message: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: 'What areas do you serve in Hyderabad?',
      answer: 'We serve all major areas in Hyderabad including Gachibowli, HITEC City, Financial District, Kokapet, Gachibowli, Kondapur, and surrounding regions.'
    },
    {
      question: 'How can I book a site visit?',
      answer: 'You can book a site visit by calling us at +91 98765 43210 or by filling out the contact form. Our representative will schedule a convenient time for you.'
    },
    {
      question: 'What documents are required for booking?',
      answer: 'For booking, you need to submit a copy of your ID proof, address proof, and a booking amount cheque. Our team will guide you through the complete documentation process.'
    },
    {
      question: 'Do you offer home loans?',
      answer: 'Yes, we have tie-ups with leading banks and financial institutions that offer home loans at competitive interest rates. Our team can assist you with the loan application process.'
    },
    {
      question: 'What is the payment plan?',
      answer: 'We offer flexible payment plans with options like 10:80:10, 20:80, and construction-linked plans. The exact terms will be discussed based on the project and your requirements.'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#212d45] mb-4">Contact <span className="text-[#ffc03d]">Us</span></h2>
          <div className="w-24 h-1 bg-[#ffc03d] mx-auto mb-2"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our projects or ready to invest? Reach out to our team for personalized assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-[#212d45] mb-2">Send Us a Message</h3>
            <p className="text-gray-500 mb-6">Fill out the form below and our team will get back to you within 24 hours.</p>
            
            {submitStatus && (
              <div className={`p-4 mb-6 rounded-lg text-sm ${submitStatus.success ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {submitStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc03d] focus:border-transparent transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc03d] focus:border-transparent transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc03d] focus:border-transparent transition-all"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">Subject *</label>
                  <div className="relative">
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc03d] focus:border-transparent appearance-none bg-white"
                      required
                    >
                      <option value="Property Inquiry">Property Inquiry</option>
                      <option value="Site Visit">Schedule Site Visit</option>
                      <option value="Investment">Investment Opportunity</option>
                      <option value="Partnership">Business Partnership</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <FaChevronDown className="text-sm" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc03d] focus:border-transparent transition-all"
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#212d45] text-white py-3.5 px-6 rounded-lg font-medium hover:bg-[#ffc03d] hover:text-[#212d45] transition-colors flex items-center justify-center disabled:opacity-70 group"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <FaPaperPlane className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
          
          {/* Contact Info & FAQ */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-[#212d45] mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#ffc03d] bg-opacity-10 p-3 rounded-lg text-[#ffc03d] mr-4 flex-shrink-0">
                    <FaPhone className="text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Call Us</h4>
                    <div className="space-y-1">
                      <a href="tel:+919876543210" className="block text-gray-600 hover:text-[#ffc03d] transition-colors">+91 98765 43210</a>
                      <a href="tel:+914066778899" className="block text-gray-600 hover:text-[#ffc03d] transition-colors">+91 40 6677 8899</a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#ffc03d] bg-opacity-10 p-3 rounded-lg text-[#ffc03d] mr-4 flex-shrink-0">
                    <FaEnvelope className="text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Email Us</h4>
                    <div className="space-y-1">
                      <a href="mailto:info@srisanari.com" className="block text-gray-600 hover:text-[#ffc03d] transition-colors">info@srisanari.com</a>
                      <a href="mailto:sales@srisanari.com" className="block text-gray-600 hover:text-[#ffc03d] transition-colors">sales@srisanari.com</a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#ffc03d] bg-opacity-10 p-3 rounded-lg text-[#ffc03d] mr-4 flex-shrink-0">
                    <FaMapMarkerAlt className="text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Corporate Office</h4>
                    <p className="text-gray-600">
                      SRI SANARI SHANKARA INFRA AND MARKETING,<br />
                      Plot No. 123, Hitech City Road,<br />
                      Gachibowli, Hyderabad,<br />
                      Telangana 500032
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#ffc03d] bg-opacity-10 p-3 rounded-lg text-[#ffc03d] mr-4 flex-shrink-0">
                    <FaClock className="text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Business Hours</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li className="flex justify-between">
                        <span className="text-gray-500">Monday - Saturday</span>
                        <span>9:30 AM - 7:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500">Sunday</span>
                        <span>10:00 AM - 2:00 PM</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-[#212d45] mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex justify-between items-center text-left font-medium text-gray-800 focus:outline-none group"
                    >
                      <span className="group-hover:text-[#ffc03d] transition-colors">{faq.question}</span>
                      {activeFaq === index ? (
                        <FaChevronUp className="text-[#ffc03d] text-sm ml-2" />
                      ) : (
                        <FaChevronDown className="text-gray-400 text-sm ml-2 group-hover:text-[#ffc03d] transition-colors" />
                      )}
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ${activeFaq === index ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}
                    >
                      <p className="text-gray-600 text-sm pb-2">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
