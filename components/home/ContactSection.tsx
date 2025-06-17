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
              <h2 className="text-3xl font-bold mb-4">Contact Us Today</h2>
              <p className="text-gray-300 mb-8">
                Ready to invest in your dream property? Get in touch with our experts today.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 flex-grow flex flex-col">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
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
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent placeholder-gray-400"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
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
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent placeholder-gray-400"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Type your message here..."
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent resize-none placeholder-gray-400"
                  ></textarea>
                </div>
              </div>
              <div className="mt-auto">
                <button
                  type="submit"
                  className="w-full btn-primary py-3 px-6 text-lg"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-6 text-primary-yellow">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-700 transition-colors text-white"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-semibold text-white">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-primary-yellow" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-primary-yellow" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-200 leading-relaxed">{faq.answer}</p>
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
