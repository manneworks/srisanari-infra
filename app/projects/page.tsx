"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Filter, MapPin, Calendar } from "lucide-react"
import { projects } from "@/data/projects"
import { Project } from "@/data/types"

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("Ongoing")
  const [selectedType, setSelectedType] = useState("all")
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const filters = [
    { id: "Ongoing", label: "Ongoing" },
    { id: "Completed", label: "Completed" },
    { id: "Upcoming", label: "Upcoming" },
    { id: "Available", label: "Available" },
  ]

  const propertyTypes = [
    { id: "all", label: "All Types" },
    { id: "residential", label: "Residential Plots" },
    { id: "commercial", label: "Commercial" },
    { id: "agriculture", label: "Agriculture" },
    { id: "apartments", label: "Apartments" },
    { id: "villas", label: "Villas" },
  ]

  // Map project data to match the card component's expected format
  const projectCards = projects.map((project: Project) => ({
    id: project.id,
    title: project.title,
    type: project.type.toLowerCase(),
    status: project.status,
    location: project.location,
    price: project.price,
    area: project.area || '',
    image: project.images[0] || "/placeholder.svg",
    features: project.amenities?.slice(0, 4) || [],
    completion: project.completion,
  }))

  const filteredProjects = projectCards.filter((project) => {
    const statusMatch = activeFilter === "all" || project.status.toLowerCase() === activeFilter.toLowerCase()
    const typeMatch = selectedType === "all" || project.type === selectedType.toLowerCase()
    return statusMatch && typeMatch
  })

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-navy text-white">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Projects</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our premium real estate developments across Hyderabad and Telangana
          </p>
        </div>
      </section>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden bg-white border-b">
        <div className="container py-4">
          <button 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center space-x-2 text-navy-blue font-medium"
          >
            <Filter className="w-5 h-5" />
            <span>Filter Projects</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <section className={`${showMobileFilters ? 'block' : 'hidden lg:block'} py-4 lg:py-8 bg-white border-b`}>
        <div className="container">
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:gap-6 lg:items-center lg:justify-between">
            {/* Status Filters */}
            <div className="w-full lg:w-auto">
              <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-4">
                <span className="text-sm font-medium text-gray-700 lg:hidden">Status</span>
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`px-3 py-1.5 text-sm lg:px-4 lg:py-2 rounded-full font-medium transition-colors ${
                        activeFilter === filter.id
                          ? "bg-primary-yellow text-navy-blue"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Property Type Filter */}
            <div className="w-full lg:w-auto">
              <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-4">
                <label htmlFor="property-type" className="text-sm font-medium text-gray-700 lg:hidden">Property Type</label>
                <select
                  id="property-type"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent transition-all duration-200 cursor-pointer"
                >
                  {propertyTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Apply Button (Mobile Only) */}
            <div className="lg:hidden pt-2">
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="w-full py-2.5 bg-primary-yellow text-navy-blue font-medium rounded-xl hover:bg-yellow-500 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full"
              >
                <div className="relative h-48">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        project.status === "Completed" 
                          ? "bg-green-100 text-green-800" 
                          : project.status === "Ongoing" 
                            ? "bg-blue-100 text-blue-800"
                            : project.status === "Upcoming"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary-yellow text-navy-blue px-3 py-1 rounded-full text-sm font-medium">
                      {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2 text-navy-blue">{project.title}</h3>

                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{project.location}</span>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">Completion: {project.completion}</span>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xl font-medium text-primary-yellow">{project.price}</span>
                      <span className="text-gray-600 text-sm">{project.area}</span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.features.slice(0, 3).map((feature, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                        {project.features.length > 3 && (
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            +{project.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <Link 
                      href={`/projects/${project.id}`} 
                      className="btn-primary w-full text-center block mt-4 !text-black hover:!text-black"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No projects found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
