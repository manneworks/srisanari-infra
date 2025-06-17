"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Filter, MapPin, Calendar } from "lucide-react"

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "ongoing", label: "Ongoing" },
    { id: "completed", label: "Completed" },
  ]

  const propertyTypes = [
    { id: "all", label: "All Types" },
    { id: "residential", label: "Residential Plots" },
    { id: "commercial", label: "Commercial" },
    { id: "agriculture", label: "Agriculture" },
    { id: "apartments", label: "Apartments" },
    { id: "houses", label: "Independent Houses" },
  ]

  const projects = [
    {
      id: 1,
      title: "Sri Sanari Green Valley",
      type: "residential",
      status: "ongoing",
      location: "Patancheru, Sangareddy",
      price: "₹15,000 per sq.yd",
      area: "150-300 sq.yd",
      image: "/placeholder.svg?height=300&width=400",
      features: ["RERA Approved", "Gated Community", "24/7 Security", "Park & Recreation"],
      completion: "2024",
    },
    {
      id: 2,
      title: "Shankara Commercial Hub",
      type: "commercial",
      status: "completed",
      location: "Miyapur, Hyderabad",
      price: "₹25,000 per sq.yd",
      area: "200-500 sq.yd",
      image: "/placeholder.svg?height=300&width=400",
      features: ["Prime Location", "High ROI", "Ready Possession", "IT Corridor"],
      completion: "2023",
    },
    {
      id: 3,
      title: "Infra Farm Lands",
      type: "agriculture",
      status: "ongoing",
      location: "Medak District",
      price: "₹5,000 per sq.yd",
      area: "1-5 Acres",
      image: "/placeholder.svg?height=300&width=400",
      features: ["Water Facility", "Fertile Soil", "Road Connectivity", "Investment Grade"],
      completion: "2024",
    },
    {
      id: 4,
      title: "Sanari Heights Apartments",
      type: "apartments",
      status: "ongoing",
      location: "Kondapur, Hyderabad",
      price: "₹4,500 per sq.ft",
      area: "1200-2500 sq.ft",
      image: "/placeholder.svg?height=300&width=400",
      features: ["2&3 BHK", "Modern Amenities", "Gym & Pool", "Parking"],
      completion: "2025",
    },
    {
      id: 5,
      title: "Premium Villas",
      type: "houses",
      status: "completed",
      location: "Gachibowli, Hyderabad",
      price: "₹1.2 Cr onwards",
      area: "2400-3600 sq.ft",
      image: "/placeholder.svg?height=300&width=400",
      features: ["Independent Villa", "Luxury Finishes", "Private Garden", "Premium Location"],
      completion: "2023",
    },
    {
      id: 6,
      title: "Tech City Plots",
      type: "residential",
      status: "ongoing",
      location: "Kokapet, Hyderabad",
      price: "₹18,000 per sq.yd",
      area: "120-250 sq.yd",
      image: "/placeholder.svg?height=300&width=400",
      features: ["IT Hub Proximity", "Metro Connectivity", "Schools Nearby", "Investment Grade"],
      completion: "2024",
    },
  ]

  const filteredProjects = projects.filter((project) => {
    const statusMatch = activeFilter === "all" || project.status === activeFilter
    const typeMatch = selectedType === "all" || project.type === selectedType
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

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Status Filters */}
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <div className="flex space-x-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
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

            {/* Property Type Filter */}
            <div className="flex items-center space-x-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow"
              >
                {propertyTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
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
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        project.status === "completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {project.status === "completed" ? "Completed" : "Ongoing"}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary-yellow text-navy-blue px-3 py-1 rounded-full text-sm font-medium">
                      {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
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
                      <span className="text-2xl font-bold text-primary-yellow">{project.price}</span>
                      <span className="text-gray-600">{project.area}</span>
                    </div>
                  </div>

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

                  <Link href={`/projects/${project.id}`} className="btn-primary w-full text-center block">
                    View Details
                  </Link>
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
