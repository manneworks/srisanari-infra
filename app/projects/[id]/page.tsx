"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, TrendingUp, Phone, Mail, X, ChevronLeft, ChevronRight } from "lucide-react"

// Mock project data - in real app, this would come from API/database
const getProjectById = (id: string) => {
  const projects = {
    "1": {
      id: 1,
      title: "Sri Sanari Green Valley",
      type: "Residential Plots",
      status: "Ongoing",
      location: "Patancheru, Sangareddy",
      price: "₹15,000 per sq.yd",
      area: "150-300 sq.yd",
      completion: "2024",
      description:
        "Sri Sanari Green Valley is a premium residential plot development located in the heart of Patancheru. This RERA-approved project offers well-planned plots with modern infrastructure and excellent connectivity to Hyderabad city.",
      images: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      specifications: {
        "Plot Sizes": "150, 200, 250, 300 sq.yd",
        "Total Area": "25 Acres",
        "Total Plots": "180 Plots",
        "150, 200, 250, 300 sq.yd',\
        'Total Area": "25 Acres",
        "Total Plots": "180 Plots",
        "Road Width": "30 & 40 feet",
        Approval: "RERA Approved",
        Possession: "Immediate",
        Registration: "Clear Title",
      },
      amenities: [
        "Gated Community with 24/7 Security",
        "Underground Electricity",
        "Water Supply Connection",
        "Sewerage System",
        "Street Lighting",
        "Park & Recreation Area",
        "Children's Play Area",
        "Community Hall",
        "Jogging Track",
        "Landscaped Gardens",
      ],
      locationAdvantages: [
        "15 minutes from Patancheru Railway Station",
        "20 minutes from HITEC City",
        "10 minutes from National Highway",
        "Close to reputed schools and colleges",
        "Near hospitals and medical facilities",
        "Shopping malls and markets nearby",
        "Excellent public transportation",
        "Rapid development area",
      ],
    },
  }

  return projects[id as keyof typeof projects] || null
}

const suggestedProjects = [
  {
    id: 2,
    title: "Shankara Commercial Hub",
    location: "Miyapur, Hyderabad",
    price: "₹25,000 per sq.yd",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Infra Farm Lands",
    location: "Medak District",
    price: "₹5,000 per sq.yd",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Sanari Heights Apartments",
    location: "Kondapur, Hyderabad",
    price: "₹4,500 per sq.ft",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedImage, setSelectedImage] = useState(0)
  const [showGallery, setShowGallery] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })

  const project = getProjectById(params.id)

  if (!project) {
    return (
      <div className="pt-20 section-padding text-center">
        <h1 className="text-3xl font-bold text-navy-blue mb-4">Project Not Found</h1>
        <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
        <Link href="/projects" className="btn-primary">
          Back to Projects
        </Link>
      </div>
    )
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "gallery", label: "Gallery" },
    { id: "specifications", label: "Specifications" },
    { id: "amenities", label: "Amenities" },
    { id: "location", label: "Location" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you for your interest! We will contact you soon.")
    setFormData({ name: "", phone: "", email: "", message: "" })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % project.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-navy text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    project.status === "Completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {project.status}
                </span>
                <span className="bg-primary-yellow text-navy-blue px-3 py-1 rounded-full text-sm font-medium">
                  {project.type}
                </span>
              </div>

              <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

              <div className="flex items-center text-gray-300 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{project.location}</span>
              </div>

              <div className="flex items-center text-gray-300 mb-6">
                <Calendar className="w-5 h-5 mr-2" />
                <span>Expected Completion: {project.completion}</span>
              </div>

              <div className="text-3xl font-bold text-primary-yellow mb-6">{project.price}</div>

              <p className="text-gray-300 text-lg leading-relaxed">{project.description}</p>
            </div>

            <div className="relative h-96">
              <Image
                src={project.images[0] || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover rounded-lg cursor-pointer"
                onClick={() => setShowGallery(true)}
              />
              <button
                onClick={() => setShowGallery(true)}
                className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg hover:bg-opacity-70 transition-colors"
              >
                View Gallery ({project.images.length} photos)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b sticky top-20 z-40">
        <div className="container">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "border-primary-yellow text-primary-yellow"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {activeTab === "overview" && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-navy-blue">Project Overview</h2>
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">{project.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="flex items-center space-x-3">
                        <TrendingUp className="w-6 h-6 text-primary-yellow" />
                        <div>
                          <h4 className="font-semibold">High Appreciation</h4>
                          <p className="text-gray-600 text-sm">Expected 15-20% annual growth</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-6 h-6 text-primary-yellow" />
                        <div>
                          <h4 className="font-semibold">Prime Location</h4>
                          <p className="text-gray-600 text-sm">Excellent connectivity</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-xl font-bold mb-4 text-navy-blue">Key Highlights</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary-yellow rounded-full"></div>
                          <span>RERA Approved Project</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary-yellow rounded-full"></div>
                          <span>Clear Title & Documentation</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary-yellow rounded-full"></div>
                          <span>Flexible Payment Options</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary-yellow rounded-full"></div>
                          <span>Bank Loan Assistance Available</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "gallery" && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-navy-blue">Project Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.images.map((image, index) => (
                      <div key={index} className="relative h-48 cursor-pointer group">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${project.title} - Image ${index + 1}`}
                          fill
                          className="object-cover rounded-lg group-hover:scale-105 transition-transform"
                          onClick={() => {
                            setSelectedImage(index)
                            setShowGallery(true)
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "specifications" && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-navy-blue">Specifications</h2>
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(project.specifications).map(([key, value]) => (
                        <div key={key} className="border-b pb-4">
                          <h4 className="font-semibold text-navy-blue mb-2">{key}</h4>
                          <p className="text-gray-600">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "amenities" && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-navy-blue">Amenities</h2>
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-primary-yellow rounded-full"></div>
                          <span className="text-gray-700">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "location" && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-navy-blue">Location Advantages</h2>
                  <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                    <div className="space-y-4">
                      {project.locationAdvantages.map((advantage, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-primary-yellow rounded-full"></div>
                          <span className="text-gray-700">{advantage}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-4 text-navy-blue">Location Map</h3>
                    <div className="w-full h-64 bg-gray-200 rounded-lg">
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
              )}
            </div>

            {/* Sidebar - Interest Form */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-lg shadow-lg sticky top-32">
                <h3 className="text-2xl font-bold mb-6 text-navy-blue">Interested in this Project?</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow resize-none"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn-primary w-full py-3">
                    Send Inquiry
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-3 text-navy-blue">Contact Our Experts</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-primary-yellow" />
                      <a href="tel:+919866663349" className="text-gray-600 hover:text-primary-yellow">
                        +91 98666 63349
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-primary-yellow" />
                      <a href="mailto:info@srisanari.com" className="text-gray-600 hover:text-primary-yellow">
                        info@srisanari.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suggested Projects */}
      <section className="section-padding bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-navy-blue text-center">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {suggestedProjects.map((suggestedProject) => (
              <Link key={suggestedProject.id} href={`/projects/${suggestedProject.id}`}>
                <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={suggestedProject.image || "/placeholder.svg"}
                      alt={suggestedProject.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 text-navy-blue">{suggestedProject.title}</h3>
                    <p className="text-gray-600 mb-2">{suggestedProject.location}</p>
                    <p className="text-primary-yellow font-bold">{suggestedProject.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative max-w-4xl max-h-full p-4">
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 text-white hover:text-primary-yellow z-10"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="relative">
              <Image
                src={project.images[selectedImage] || "/placeholder.svg"}
                alt={`${project.title} - Image ${selectedImage + 1}`}
                width={800}
                height={600}
                className="object-contain max-h-[80vh]"
              />

              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary-yellow"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary-yellow"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
              {project.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-3 h-3 rounded-full ${selectedImage === index ? "bg-primary-yellow" : "bg-gray-400"}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
