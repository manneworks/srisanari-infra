"use client";

import { useState } from 'react';
import Image from 'next/image';
import { FaMapMarkerAlt, FaArrowRight, FaCalendarAlt, FaRupeeSign } from 'react-icons/fa';

interface Project {
  id: number;
  title: string;
  location: string;
  image: string;
  status: 'ongoing' | 'upcoming' | 'completed';
  progress: number;
  launchDate: string;
  startingPrice: string;
  unitsLeft: number;
}

const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState('all');

  const projects: Project[] = [
    {
      id: 1,
      title: 'Sanari Hills',
      location: 'Gachibowli, Hyderabad',
      image: '/images/project-1.jpg',
      status: 'ongoing',
      progress: 75,
      launchDate: 'Q4 2023',
      startingPrice: '₹1.2 Cr',
      unitsLeft: 12
    },
    {
      id: 2,
      title: 'Sanari Greens',
      location: 'Financial District, Hyderabad',
      image: '/images/project-2.jpg',
      status: 'ongoing',
      progress: 45,
      launchDate: 'Q1 2024',
      startingPrice: '₹95 Lakhs',
      unitsLeft: 8
    },
    {
      id: 3,
      title: 'Sanari Lakeview',
      location: 'Kokapet, Hyderabad',
      image: '/images/project-3.jpg',
      status: 'upcoming',
      progress: 0,
      launchDate: 'Q2 2024',
      startingPrice: '₹1.5 Cr',
      unitsLeft: 25
    },
    {
      id: 4,
      title: 'Sanari County',
      location: 'Shamshabad, Hyderabad',
      image: '/images/project-4.jpg',
      status: 'completed',
      progress: 100,
      launchDate: 'Q3 2023',
      startingPrice: '₹85 Lakhs',
      unitsLeft: 3
    },
  ];

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(project => activeTab === 'all' || project.status === activeTab);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'ongoing':
        return { text: 'Ongoing', class: 'bg-yellow-100 text-yellow-800' };
      case 'upcoming':
        return { text: 'Upcoming', class: 'bg-blue-100 text-blue-800' };
      case 'completed':
        return { text: 'Sold Out', class: 'bg-red-100 text-red-800' };
      default:
        return { text: 'Unknown', class: 'bg-gray-100 text-gray-800' };
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 0) return 'bg-gray-200';
    if (progress < 40) return 'bg-red-500';
    if (progress < 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#212d45] mb-4">Our <span className="text-[#ffc03d]">Projects</span></h2>
          <div className="w-24 h-1 bg-[#ffc03d] mx-auto mb-2"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our prestigious residential and commercial projects across Hyderabad
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 bg-gray-100 p-1 rounded-full max-w-2xl mx-auto">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'ongoing', label: 'Ongoing' },
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'completed', label: 'Sold Out' },
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-full font-medium text-sm md:text-base transition-all ${
                  isActive
                    ? 'bg-[#ffc03d] text-[#212d45] font-bold shadow-md'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProjects.map(project => {
            const status = getStatusBadge(project.status);
            const progressColor = getProgressColor(project.progress);
            
            return (
              <div 
                key={project.id} 
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#ffc03d]/30 group"
              >
                <div className="relative h-56">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${status.class}`}>
                      {status.text}
                    </span>
                  </div>
                  {project.status !== 'upcoming' && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <div className="flex justify-between text-white text-xs mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${progressColor}`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-bold text-[#212d45] mb-2 group-hover:text-[#ffc03d] transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <FaMapMarkerAlt className="mr-1 text-[#ffc03d]" />
                    <span>{project.location}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="flex items-center">
                      <div className="bg-[#ffc03d] bg-opacity-10 p-2 rounded-full mr-3">
                        <FaCalendarAlt className="text-[#ffc03d]" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Launch Date</div>
                        <div className="font-medium text-sm">{project.launchDate}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-[#ffc03d] bg-opacity-10 p-2 rounded-full mr-3">
                        <FaRupeeSign className="text-[#ffc03d]" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Starting Price</div>
                        <div className="font-bold text-[#212d45]">{project.startingPrice}</div>
                      </div>
                    </div>
                  </div>
                  
                  {project.status !== 'completed' && (
                    <div className="text-center text-sm text-gray-600 mb-4">
                      Only <span className="font-bold text-[#212d45]">{project.unitsLeft} units</span> left
                    </div>
                  )}
                  
                  <button className="w-full bg-[#212d45] text-white py-3 rounded-lg font-medium hover:bg-[#ffc03d] hover:text-[#212d45] transition-colors flex items-center justify-center">
                    View Project <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-14">
          <button className="bg-transparent border-2 border-[#212d45] text-[#212d45] px-8 py-3 rounded-full font-medium hover:bg-[#212d45] hover:text-white transition-colors flex items-center mx-auto group">
            View All Projects
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
