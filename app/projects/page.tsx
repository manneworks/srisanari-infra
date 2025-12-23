"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Filter, MapPin, Calendar } from "lucide-react"
import { getProjects } from "@/data/projects"
import { Project } from "@/data/types"

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all")

  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects()
        setProjects(data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "Commercial", label: "Commercial" },
    { id: "Residential", label: "Residential" },
    { id: "Apartments", label: "Apartments" },
    { id: "Agriculture Land", label: "Agriculture Land" },
    { id: "Development Lands", label: "Development Lands" },
    { id: "Villas", label: "Villas" },
  ]

  // Define property types with their IDs matching the Contentful projectType slugs
  // Map project data to match the card component's expected format
  const projectCards = projects.map((project) => {
    return {
      id: project.id || '',
      title: project.title || 'Untitled Project',
      status: project.status || 'Ongoing',
      location: project.location || 'Location not specified',
      price: project.price || 'Price on request',
      area: project.area || 'Area not specified',
      image: project.images?.[0] || "/placeholder.svg",
      features: project.amenities?.slice(0, 4) || [],
      completion: project.completion || 'Completion date not specified',
      amenities: project.amenities || [],
      description: project.description || '',
      projectType: project.type,
      filtertype: project.filtertype
    };
  });

  // Filter projects based on active filters
  const filteredProjects = projectCards.filter((project) => {
    if (!project.filtertype) return false;
    if (activeFilter === 'all') return true;
    
    // Exact match without case conversion
    return project.filtertype === activeFilter;
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
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:gap-6 lg:items-center lg:justify-center">
            {/* Property Type Filters */}
            <div className="w-full lg:w-auto">
              <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:items-center lg:justify-center">
                <div className="flex flex-wrap justify-center gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`px-4 py-2 text-sm rounded-full font-medium transition-all duration-200 ${
                        activeFilter === filter.id
                          ? "bg-primary-yellow text-navy-blue"
                          : "bg-gray-100 text-gray-600 hover:bg-primary-yellow hover:text-navy-blue"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
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
        <div className="container mx-auto max-w-6xl px-4">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">Loading projects...</p>
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {filteredProjects.map((project) => {
                const projectUrl = `/projects/${project.id}`;
                return (
                  <Link 
                    key={project.id}
                    href={projectUrl}
                    className="block h-full bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                      <div className="flex flex-col h-full">
                        <div className="relative h-48 sm:h-52 overflow-hidden">
                          <Image 
                            src={project.image} 
                            alt={project.title} 
                            fill 
                            className="object-cover transition-transform duration-500 hover:scale-105"
                            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent">
                            <span className="absolute top-3 left-3 bg-black text-white px-2.5 py-0.5 rounded-full text-xs sm:text-sm font-medium">
                              {project.projectType}
                            </span>
                          </div>
                          <div className="absolute top-3 right-3">
                            <span className="bg-primary-yellow text-navy-blue px-2.5 py-0.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                              {project.filtertype}
                            </span>
                          </div>
                        </div>

                        <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                          <h3 className="text-lg sm:text-xl font-bold mb-2 text-navy-blue line-clamp-2" title={project.title}>
                            {project.title}
                          </h3>
                          <div className="flex items-start text-gray-600 mb-2 space-x-1.5">
                            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
                            <span className="text-xs sm:text-sm line-clamp-2">{project.location}</span>
                          </div>

                          <div className="flex items-center text-gray-600 mb-3 sm:mb-4 space-x-1.5">
                            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span className="text-xs sm:text-sm">
                              {typeof project.completion === 'string' && project.completion.includes('Completion:') 
                                ? project.completion 
                                : `Completion: ${project.completion || 'N/A'}`}
                            </span>
                          </div>

                          <div className="mt-auto pt-2 border-t border-gray-100">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                              <span className="text-lg sm:text-xl font-medium text-primary-yellow">
                                {project.price}
                              </span>
                              {project.area && (
                                <span className="text-gray-600 text-sm bg-gray-50 px-2.5 py-1 rounded-md">
                                  {project.area}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="mt-4 sm:mt-6">
                            <div className="mb-4 sm:mb-6">
                              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {project.features.slice(0, 3).map((feature: string, index: number) => (
                                  <span
                                    key={index}
                                    className="bg-gray-50 text-gray-700 px-2 py-0.5 sm:py-1 rounded text-xs border border-gray-100"
                                    title={feature}
                                  >
                                    {feature.length > 15 ? `${feature.substring(0, 15)}...` : feature}
                                  </span>
                                ))}
                                {project.features.length > 3 && (
                                  <span
                                    className="bg-gray-50 text-gray-500 px-2 py-0.5 sm:py-1 rounded text-xs border border-gray-100"
                                    title={`${project.features.length - 3} more features`}
                                  >
                                    +{project.features.length - 3}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="btn-primary w-full text-center block mt-2 sm:mt-3 !text-black hover:!text-black text-sm sm:text-base py-2 sm:py-2.5">
                              View Details
                            </div>
                          </div>
                        </div>
                      </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 text-lg">No projects found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
