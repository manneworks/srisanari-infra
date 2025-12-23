"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/data/projects";
import { Project } from "@/data/types";
import { PropertyCardSkeleton } from "./PropertyCardSkeleton";

export default function RecentProperties() {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const projects = await getProjects();

        // Sort projects by creation date (newest first) and take the first 6
        const recentProperties = [...projects]
          .sort(
            (a, b) =>
              new Date(b.createdAt || 0).getTime() -
              new Date(a.createdAt || 0).getTime()
          )
          .slice(0, 6);

        setProperties(recentProperties);
      } catch (err) {
        setError("Failed to load properties. Please try again later.");
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (error) {
    return (
      <section className="section-padding bg-light">
        <div className="container text-center">
          <div role="alert" className="text-red-600">
            {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            aria-label="Retry loading properties"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      className="section-padding bg-light"
      aria-labelledby="recent-properties-heading"
    >
      <div className="container">
        <div className="text-center mb-12">
          <h2
            id="recent-properties-heading"
            className="text-3xl md:text-4xl font-bold mb-4 text-navy-blue font-heading tracking-tight"
          >
            Recent Properties
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <PropertyCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                role="listitem"
              >
                <Link href={`/projects/${project.id}`} className="block h-full">
                  <div className="relative h-60 w-full">
                    <Image
                      src={project.images?.[0] || "/placeholder.svg"}
                      alt={project.title || "Property image"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                    <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                      {project.status}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                      {project.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-3">
                      <svg
                        className="w-4 h-4 mr-1.5 text-primary-yellow"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm">{project.location}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-navy-blue">
                        {project.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        {project.area}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link 
            href="/projects" 
            className="btn-call font-heading tracking-wider whitespace-nowrap hover:shadow-md transition-shadow duration-300 inline-flex items-center px-6 py-3"
          >
            View All Properties
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
