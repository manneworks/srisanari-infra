"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const faqs = [
    {
      question: "What are the payment options available for property purchase?",
      answer:
        "We offer flexible payment options including bank loans, EMI facilities, and installment plans. Our team will help you choose the best option based on your financial situation.",
    },
    {
      question: "Are all properties RERA approved?",
      answer:
        "Yes, all our projects are RERA approved and registered. We ensure complete legal compliance and transparency in all our dealings.",
    },
    {
      question: "What documents are required for property registration?",
      answer:
        "Required documents include Aadhar card, PAN card, income proof, bank statements, and passport size photographs. Our legal team will guide you through the entire documentation process.",
    },
    {
      question: "Do you provide home loan assistance?",
      answer:
        "Yes, we have tie-ups with leading banks and financial institutions to provide home loan assistance at competitive interest rates.",
    },
    {
      question: "What is the typical timeline for property handover?",
      answer:
        "Timeline varies by project type. For ready-to-move properties, handover is immediate. For under-construction projects, we provide detailed timelines during booking.",
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    alert("Thank you for your inquiry! We will contact you soon.")
    setFormData({ name: "", email: "", message: "" })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-navy rounded-xl shadow-lg p-8 text-white flex flex-col h-full">
            <div>
              <h2 className="text-3xl font-bold mb-4 font-heading tracking-tight">Contact Us Today</h2>
              <p className="text-gray-300 mb-8 font-sans">
                Ready to invest in your dream property? Get in touch with our experts today.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 flex-grow flex flex-col">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2 font-sans">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent placeholder-gray-400 font-sans"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2 font-sans">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent placeholder-gray-400 font-sans"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-2 font-sans">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent placeholder-gray-400 font-sans"
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-primary-yellow text-navy hover:bg-yellow-500 py-3 px-6 rounded-lg font-semibold transition-colors mt-auto font-heading tracking-wider"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-900 font-heading tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-medium text-gray-900 font-heading">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="p-4 bg-gray-50 border-t border-gray-100">
                      <p className="text-gray-700 font-sans">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
