'use client'

import React, { useState, useEffect } from 'react';
import { FiArrowRight, FiExternalLink, FiMapPin, FiCalendar, FiAward, FiLoader } from 'react-icons/fi';
import { projectsAPI } from '@/lib/projectApi';

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching projects...');
        
        const res = await projectsAPI.getAll();
        
        console.log('API Response:', res);
        
        if (res.success && res.data) {
          console.log('Projects fetched successfully:', res.data.length, 'items');
          setProjects(res.data);
        } else {
          console.error('API returned unsuccessful response:', res);
          setError(res.error || 'Failed to fetch projects');
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  // Loading State
  if (loading) {
    return (
      <section className="relative py-20 md:py-28 bg-black min-h-screen">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <FiLoader className="animate-spin text-6xl text-amber-500 mb-4" />
            <p className="text-white text-lg font-medium">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="relative py-20 md:py-28 bg-black min-h-screen">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-red-500/10 border border-red-500/30 rounded-2xl p-8">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <p className="text-red-400 text-xl font-semibold mb-2">Error Loading Projects</p>
            <p className="text-red-300 text-base">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Calculate categories dynamically
  const categories = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'commercial', label: 'Commercial', count: projects.filter(p => p.category === 'commercial').length },
    { id: 'residential', label: 'Residential', count: projects.filter(p => p.category === 'residential').length },
    { id: 'hospitality', label: 'Hospitality', count: projects.filter(p => p.category === 'hospitality').length },
    { id: 'industrial', label: 'Industrial', count: projects.filter(p => p.category === 'industrial').length },
    { id: 'healthcare', label: 'Healthcare', count: projects.filter(p => p.category === 'healthcare').length }
  ].filter(cat => cat.id === 'all' || cat.count > 0);

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  console.log('Filtered projects:', filteredProjects.length, 'for category:', activeCategory);

  return (
    <section className="relative py-20 md:py-28 bg-black overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="pointer-events-none absolute top-20 left-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl -z-10"></div>
      <div className="pointer-events-none absolute bottom-20 right-0 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl -z-10"></div>

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 opacity-100">
          <span className="inline-block px-4 py-2 bg-amber-600/30 border-2 border-amber-500 rounded-full text-amber-400 text-sm font-bold tracking-wider mb-4">
            OUR PORTFOLIO
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="text-amber-400">Projects</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-6">
            Explore our portfolio of successfully completed projects across the UAE, showcasing quality craftsmanship and innovative solutions.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full"></div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/50 border-2 border-amber-400'
                  : 'bg-slate-700/80 text-gray-200 hover:bg-slate-600/80 border-2 border-slate-600 hover:border-amber-500/50'
              }`}
            >
              {category.label}
              <span className={`ml-2 text-sm ${activeCategory === category.id ? 'text-amber-100' : 'text-gray-400'}`}>
                ({category.count})
              </span>
            </button>
          ))}
        </div>

  

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group bg-slate-800/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 border-2 border-slate-600 hover:border-amber-400 cursor-pointer hover:-translate-y-2"
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                      <FiAward className="text-6xl text-amber-500/30" />
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-10"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 bg-amber-600 text-white text-xs font-semibold rounded-full shadow-lg capitalize">
                      {project.category}
                    </span>
                  </div>

                  {/* Hover Icon */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center shadow-xl transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <FiExternalLink className="text-white text-2xl" />
                    </div>
                  </div>

                  {/* Bottom Info on Image */}
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <div className="flex items-center gap-2 text-white/90 text-xs mb-2">
                      <FiMapPin size={12} />
                      <span>{project.location}</span>
                      <span className="mx-2">•</span>
                      <FiCalendar size={12} />
                      <span>{project.year}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 bg-slate-800">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-amber-400 text-sm font-medium mb-3">
                    <FiAward size={14} />
                    <span>{project.service}</span>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Client Type Tag */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 bg-slate-700/50 px-3 py-1 rounded-full">
                      {project.client_type}
                    </span>
                    <span className="text-amber-400 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Details
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className="h-1 bg-gradient-to-r from-amber-500 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-800/30 rounded-2xl border border-slate-700">
            <p className="text-gray-300 text-xl mb-2">No projects found in this category</p>
            <p className="text-gray-500 text-sm">Try selecting a different category</p>
          </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { number: `${projects.length}+`, label: 'Projects Completed' },
            { number: '100+', label: 'Happy Clients' },
            { number: '15+', label: 'Years Experience' },
            { number: '99%', label: 'Client Satisfaction' }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 text-center border border-amber-500/20 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl md:text-4xl font-bold text-amber-500 mb-2">{stat.number}</div>
              <div className="text-gray-300 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-12 md:p-16 border border-amber-500/20 overflow-hidden">
            {/* Decorative blurs inside CTA */}
            <div className="pointer-events-none absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl -z-10"></div>
            <div className="pointer-events-none absolute bottom-0 left-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl -z-10"></div>
            
            {/* CTA Content */}
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Lets discuss your requirements and create something exceptional together. Our team is ready to bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold text-lg shadow-xl border border-amber-500/30 inline-flex items-center justify-center gap-2 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 active:scale-95">
                  Get Free Consultation
                  <span className="animate-pulse">→</span>
                </button>
                <button className="px-8 py-4 bg-transparent text-white rounded-xl font-semibold text-lg border-2 border-white/30 hover:border-amber-500 hover:bg-white/5 transition-all duration-300 hover:scale-105 active:scale-95">
                  Download Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-800 border-2 border-amber-500/30 rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 hover:scale-100"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                <p className="text-amber-400 font-medium">{selectedProject.service}</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-white text-3xl leading-none w-8 h-8 flex items-center justify-center hover:rotate-90 transition-transform duration-300"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2 text-gray-300">
                <FiMapPin className="text-amber-400" />
                <span>{selectedProject.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <FiCalendar className="text-amber-400" />
                <span>Completed in {selectedProject.year}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <FiAward className="text-amber-400" />
                <span>{selectedProject.client_type}</span>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            <button className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-300 active:scale-95">
              Contact Us About This Project
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;