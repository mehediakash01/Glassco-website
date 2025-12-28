'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowRight, FiExternalLink, FiMapPin, FiCalendar, FiAward, FiLoader, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import { projectsAPI } from '@/lib/projectApi';

const localImages = {
  'ballroom': '/assets/projects/ballroom.jpg',
  'boutique': '/assets/projects/boutique.jpg',
  'creed': '/assets/projects/creed.jpg',
  'dubai-creek': '/assets/projects/dubai-creek.jpg',
  'feta': '/assets/projects/feta.jpg',
  'frontGold': '/assets/projects/frontGold.jpg',
  'huff': '/assets/projects/huff.jpg',
  'i10': '/assets/projects/i10.jpg',
  'khunji': '/assets/projects/khunji.jpg',
  'manuel': '/assets/projects/manuel.jpg',
  'padel': '/assets/projects/padel.jpg',
  'urban': '/assets/projects/urban.jpg',
  'view': '/assets/projects/view.jpg',
};

// Get all images as array
const allImages = Object.values(localImages);

const ProjectsSection = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await projectsAPI.getAll();
        
        if (res.success && res.data) {
          // Map projects with local images
          const projectsWithImages = res.data.map((project, index) => ({
            ...project,
            // Assign images in a cycling pattern
            mainImage: allImages[index % allImages.length],
            // Each project gets 3-5 random images for gallery
            galleryImages: [
              allImages[index % allImages.length],
              allImages[(index + 1) % allImages.length],
              allImages[(index + 2) % allImages.length],
              allImages[(index + 3) % allImages.length],
            ]
          }));
          
          setProjects(projectsWithImages);
        } else {
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

  // Handle image navigation
  const nextImage = (e) => {
    e.stopPropagation();
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.galleryImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.galleryImages.length - 1 : prev - 1
      );
    }
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const handleContactRedirect = () => {
    router.push('/contact');
  };

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
      <section className="relative py-20 md:py-28 bg-gradient-to-r from-black to-amber-500/45 min-h-screen">
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

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-r from-black to-amber-500/45 overflow-hidden">
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
                onClick={() => handleProjectClick(project)}
                className="group bg-slate-800/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 border-2 border-slate-600 hover:border-amber-400 cursor-pointer hover:-translate-y-2"
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  <img
                    src={project.mainImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-10"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 bg-amber-600 text-white text-xs font-semibold rounded-full shadow-lg capitalize">
                      {project.category}
                    </span>
                  </div>

                  {/* Gallery indicator */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-black/60 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                      {project.galleryImages.length} Photos
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
                      View Gallery
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
            <div className="pointer-events-none absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl -z-10"></div>
            <div className="pointer-events-none absolute bottom-0 left-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl -z-10"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Lets discuss your requirements and create something exceptional together. Our team is ready to bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleContactRedirect}
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold text-lg shadow-xl border border-amber-500/30 inline-flex items-center justify-center gap-2 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 active:scale-95"
                >
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

      {/* Project Gallery Modal */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-slate-900 border-2 border-amber-500/30 rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-50 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
            >
              <FiX size={24} />
            </button>

            <div className="grid md:grid-cols-2 h-full max-h-[95vh]">
              {/* Image Gallery Side */}
              <div className="relative bg-black flex items-center justify-center p-4">
                {/* Main Image */}
                <img
                  src={selectedProject.galleryImages[currentImageIndex]}
                  alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg"
                />

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all hover:scale-110"
                >
                  <FiChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all hover:scale-110"
                >
                  <FiChevronRight size={24} />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {currentImageIndex + 1} / {selectedProject.galleryImages.length}
                </div>

                {/* Thumbnail Navigation */}
                <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2 px-4">
                  {selectedProject.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(idx);
                      }}
                      className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === currentImageIndex 
                          ? 'border-amber-500 scale-110' 
                          : 'border-white/30 hover:border-white/60'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Details Side */}
              <div className="p-8 overflow-y-auto max-h-[95vh]">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-amber-600 text-white text-xs font-semibold rounded-full mb-3 capitalize">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                  <p className="text-amber-400 font-medium text-lg">{selectedProject.service}</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-gray-300 bg-slate-800/50 p-3 rounded-lg">
                    <FiMapPin className="text-amber-400 flex-shrink-0" size={20} />
                    <span>{selectedProject.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300 bg-slate-800/50 p-3 rounded-lg">
                    <FiCalendar className="text-amber-400 flex-shrink-0" size={20} />
                    <span>Completed in {selectedProject.year}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300 bg-slate-800/50 p-3 rounded-lg">
                    <FiAward className="text-amber-400 flex-shrink-0" size={20} />
                    <span>{selectedProject.client_type}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-xl font-bold text-white mb-3">Project Description</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <button 
                  onClick={handleContactRedirect}
                  className="w-full px-6 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-300 active:scale-95 flex items-center justify-center gap-2"
                >
                  Contact Us About This Project
                  <FiArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;