"use client"

import { useState, useEffect, use } from 'react'
import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, Phone, Mail, X, ChevronLeft, ChevronRight, TrendingUp, ArrowLeft, Share2, Heart, Ruler, Building2, Layers, Home, Users, Loader2 } from "lucide-react"
import { Project } from "@/data/types"
import { getProjectById, getSuggestedProjects } from "@/data/projects"
import { ProjectNotFound } from "@/components/ErrorState"

async function getProject(id: string) {
  try {
    const project = await getProjectById(id)
    if (!project) {
      throw new Error('Project not found')
    }
    return project
  } catch (error) {
    console.error('Error fetching project:', error)
    throw new Error('Failed to load project. Please try again.')
  }
}

async function getSuggestedProjectsData(id: string) {
  try {
    return await getSuggestedProjects(id)
  } catch (error) {
    console.error('Error fetching suggested projects:', error)
    return []
  }
}

// Main page component that handles the async params
export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  // Use the unwrapped params.id directly
  return <ProjectDetailPageContent id={params.id} />
}

// Client component that handles the actual rendering
function ProjectDetailPageContent({ id }: { id: string }) {
  const [suggestedProjects, setSuggestedProjects] = useState<Project[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load project and suggested projects on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Load project data
        const projectData = await getProjectById(id);
        if (!projectData) {
          throw new Error('Project not found');
        }
        setProject(projectData);
        
        // Load suggested projects
        const projects = await getSuggestedProjectsData(id);
        setSuggestedProjects(projects);
      } catch (err) {
        console.error('Error loading project:', err);
        setError('Failed to load project. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [id]);
  
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedImage, setSelectedImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-yellow"></div>
      </div>
    );
  }
  
  if (error || !project) {
    return <ProjectNotFound />;
  }

  const nextImage = () => {
    if (!project?.images?.length) return;
    setSelectedImage((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    if (!project?.images?.length) return;
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
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">{project.title}</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="text-sm text-gray-300 mb-1">Starting Price</div>
                  <div className="text-xl font-bold text-primary-yellow">{project.price}</div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="text-sm text-gray-300 mb-1">Area</div>
                  <div className="text-xl font-semibold text-white">{project.area}</div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="text-sm text-gray-300 mb-1">Status</div>
                  <div className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${project.status === "Completed" ? "bg-green-500" : "bg-blue-500"}`}></span>
                    <span className="text-white">{project.status}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-6">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-primary-yellow mr-2" />
                  <span>{project.location}</span>
                </div>
                <div className="h-4 w-px bg-gray-600"></div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-primary-yellow mr-2" />
                  <span>Completion: {project.completion}</span>
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">{project.description}</p>
            </div>

            <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
              {project.images?.length > 0 ? (
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className="object-cover cursor-pointer"
                  onClick={() => project.images?.length > 0 && setShowGallery(true)}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-500">No images available</span>
                </div>
              )}
              {project.images?.length > 0 && (
                <button
                  onClick={() => setShowGallery(true)}
                  className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg hover:bg-opacity-70 transition-colors"
                >
                  View Gallery ({project.images.length} {project.images.length === 1 ? 'photo' : 'photos'})
                </button>
              )}
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
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Overview Text */}
                <div className="lg:pr-8">
                  <h2 className="text-2xl font-bold text-navy-blue mb-6">Overview</h2>
                  <p className="text-gray-600 leading-relaxed">{project.description}</p>
                </div>
                
                {/* Vertical Divider - Only shows on lg screens and up */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-8 bottom-8 w-px bg-gray-200"></div>
                
                {/* Right Column - Gallery */}
                <div className="lg:pl-8">
                  <h2 className="text-2xl font-bold text-navy-blue mb-6">Project Gallery</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {project.images.slice(0, 4).map((image, index) => (
                      <div 
                        key={index}
                        className="w-full h-48 sm:h-64 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => {
                          setSelectedImage(index);
                          setShowGallery(true);
                        }}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${project.title} - ${index + 1}`}
                          width={800}
                          height={500}
                          className="w-full h-full object-cover"
                        />
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
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-4">
                <h3 className="text-2xl font-bold text-navy-blue mb-6">Interested in this project?</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-transparent placeholder-gray-400"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-transparent placeholder-gray-400"
                      placeholder="Your phone number"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-transparent placeholder-gray-400"
                      placeholder="Your email address"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-transparent placeholder-gray-400"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary-yellow text-navy-blue hover:bg-yellow-500 transition-colors py-3 px-6 rounded-full font-heading tracking-wider font-semibold text-base flex items-center justify-center space-x-2"
                  >
                    <span>Send Message</span>
                  </button>
                </form>
                {/* Contact Information Section - Commented Out
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-lg text-navy-blue mb-4">Contact Information</h4>
                  <div className="space-y-4">
                    <a href="tel:+919876543210" className="flex items-center text-gray-700 hover:text-primary-yellow transition-colors">
                      <Phone className="w-5 h-5 mr-3 text-primary-yellow" />
                      <span>+91 98765 43210</span>
                    </a>
                    <a href="mailto:info@srisanari.com" className="flex items-center text-gray-700 hover:text-primary-yellow transition-colors">
                      <Mail className="w-5 h-5 mr-3 text-primary-yellow" />
                      <span>info@srisanari.com</span>
                    </a>
                  </div>
                </div>
                */}
              </div>
            </div>
          </div>

          {/* Gallery Modal */}
          {showGallery && (
            <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
              <div className="relative max-w-4xl w-full max-h-full p-4">
                <button
                  onClick={() => setShowGallery(false)}
                  className="absolute top-4 right-4 text-white hover:text-primary-yellow z-10"
                >
                  <X className="w-8 h-8" />
                </button>
                
                <div className="relative flex items-center justify-center min-h-[60vh]">
                  {project.images?.length > 0 ? (
                    <>
                      <Image
                        src={project.images[selectedImage]}
                        alt={`${project.title} - Image ${selectedImage + 1}`}
                        width={800}
                        height={600}
                        className="object-contain max-h-[80vh]"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />

                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary-yellow bg-black/50 p-2 rounded-full"
                        disabled={project.images.length <= 1}
                      >
                        <ChevronLeft className="w-8 h-8" />
                      </button>

                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary-yellow bg-black/50 p-2 rounded-full"
                        disabled={project.images.length <= 1}
                      >
                        <ChevronRight className="w-8 h-8" />
                      </button>
                    </>
                  ) : (
                    <div className="text-white text-center p-8">
                      <p className="text-xl">No images available</p>
                      <button 
                        onClick={() => setShowGallery(false)}
                        className="mt-4 px-6 py-2 bg-primary-yellow text-navy-blue rounded-lg font-medium hover:bg-yellow-400 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>

                {project.images?.length > 0 && (
                  <div className="flex justify-center mt-4 space-x-2">
                    {project.images.map((_: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          selectedImage === index ? "bg-primary-yellow" : "bg-gray-400 hover:bg-gray-300"
                        }`}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
