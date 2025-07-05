"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, Phone, Mail, X, ChevronLeft, ChevronRight, TrendingUp, ArrowLeft, Share2, Heart, Ruler, Building2, Layers, Home, Users } from "lucide-react"
import { Project } from "@/data/types"
import { getProjectById, getSuggestedProjects } from "@/data/projects"
import { ProjectNotFound } from "@/components/ErrorState"

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
    return <ProjectNotFound />
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ongoing':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'upcoming':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert('Thank you for your interest! We will contact you soon.')
    setFormData({ name: '', phone: '', email: '', message: '' })
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "gallery", label: "Gallery" },
    { id: "specifications", label: "Specifications" },
    { id: "amenities", label: "Amenities" },
    { id: "location", label: "Location" },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-navy text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${project.status === "Completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
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

              <div className="text-2xl font-bold text-primary-yellow mb-6">{project.price}</div>

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

      {/* Navigation Tabs - Commented Out
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

      {/* Project Detail Layout */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="space-y-8">
            {/* Overview Section */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Overview Text */}
                <div>
                  <h2 className="text-2xl font-bold text-navy-blue mb-6">Overview</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{project.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary-yellow/10 p-2 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-primary-yellow" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-800">High Appreciation</h3>
                          <p className="text-xs text-gray-500">Expected 15-20% annual growth</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-800">RERA Approved</h3>
                          <p className="text-xs text-gray-500">Legal & safe investment</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="flex items-start space-x-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-800">Flexible Payment</h3>
                          <p className="text-xs text-gray-500">Easy EMI options available</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="flex items-start space-x-3">
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-800">Prime Location</h3>
                          <p className="text-xs text-gray-500">Excellent connectivity</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right Column - Gallery */}
                <div>
                  <h2 className="text-2xl font-bold text-navy-blue mb-6">Project Gallery</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {project.images.slice(0, 4).map((image, index) => (
                      <div key={index} className="relative h-40 rounded-lg overflow-hidden group">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${project.title} - Image ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          onClick={() => {
                            setSelectedImage(index);
                            setShowGallery(true);
                          }}
                        />
                        {index === 3 && project.images.length > 4 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white text-sm font-medium">+{project.images.length - 4} more</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications Section with Sidebar and Amenities */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-8 space-y-8">
              {/* Specifications Section */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-navy-blue mb-6">Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(project.specifications).map(([key, value]) => (
                    <div key={key} className="border-b border-gray-100 pb-4">
                      <p className="text-sm text-gray-500">{key}</p>
                      <p className="font-medium text-gray-800">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities Section */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-navy-blue mb-6">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {project.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-yellow"></div>
                      <span className="text-sm text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Location Section */}
              <div className="mt-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-navy-blue mb-6">Location</h2>
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
                  {/* Replace with your map component */}
                  <div className="w-full h-96 flex items-center justify-center bg-gray-200">
                    <span className="text-gray-500">Map View</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Location Advantages</h3>
                  <ul className="space-y-2">
                    {project.locationAdvantages.map((advantage, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-yellow"></div>
                        </div>
                        <span className="ml-2 text-gray-600">{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar - Contact Form */}
            <div className="lg:col-span-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top">
                <h3 className="text-xl font-bold text-navy-blue mb-4">Interested in this project?</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                      placeholder="Your phone number"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                      placeholder="Your email address"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary-yellow text-navy-blue py-3 px-6 rounded-lg font-semibold hover:bg-primary-yellow/90 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="font-semibold text-navy-blue mb-3">Contact Information</h4>
                  <div className="space-y-3">
                    <a href="tel:+919876543210" className="flex items-center text-gray-600 hover:text-primary-yellow transition-colors">
                      <Phone className="w-5 h-5 mr-2 text-primary-yellow" />
                      +91 98765 43210
                    </a>
                    <a href="mailto:info@srisanari.com" className="flex items-center text-gray-600 hover:text-primary-yellow transition-colors">
                      <Mail className="w-5 h-5 mr-2 text-primary-yellow" />
                      info@srisanari.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* Suggested Projects */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-navy-blue text-center">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {getSuggestedProjects(params.id).map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="relative h-48">
                    <Image
                      src={project.images?.[0] || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold mb-2 text-navy-blue">{project.title}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                    <div className="mt-auto">
                      <p className="text-primary-yellow font-bold">{project.price}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-500">{project.type}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          project.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : project.status === 'Ongoing' 
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
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
              {project.images.map((_: any, index: number) => (
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
  );
}
