'use client'
import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiExternalLink, FiMapPin, FiCalendar, FiAward } from 'react-icons/fi';

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'Dubai Marina Tower',
      category: 'commercial',
      location: 'Dubai Marina, UAE',
      year: '2024',
      service: 'Curtain Walls & Spider Glazing',
      image: '/projects/project-1.jpg',
      description: 'Complete curtain wall installation for a 40-story commercial tower with structural glazing and spider glass entrance.',
      clientType: 'Commercial High-Rise'
    },
    {
      id: 2,
      title: 'Al Ain Villa Complex',
      category: 'residential',
      location: 'Al Ain, UAE',
      year: '2024',
      service: 'Aluminum Windows & Doors',
      image: '/projects/project-2.jpg',
      description: 'Premium aluminum doors and windows installation for 25 luxury villas with custom designs and thermal efficiency.',
      clientType: 'Residential Villas'
    },
    {
      id: 3,
      title: 'Sharjah Shopping Mall',
      category: 'commercial',
      location: 'Sharjah, UAE',
      year: '2023',
      service: 'Automatic Doors & Glass Processing',
      image: '/projects/project-3.jpg',
      description: 'Automated entrance systems and glass partitions for premium shopping mall with high-traffic requirements.',
      clientType: 'Retail Complex'
    },
    {
      id: 4,
      title: 'Abu Dhabi Corporate Office',
      category: 'commercial',
      location: 'Abu Dhabi, UAE',
      year: '2024',
      service: 'Partition Glazing & Metal Works',
      image: '/projects/project-4.jpg',
      description: 'Modern glass partition systems and decorative metal screens for corporate office spaces.',
      clientType: 'Office Building'
    },
    {
      id: 5,
      title: 'Jumeirah Beach Resort',
      category: 'hospitality',
      location: 'Dubai, UAE',
      year: '2023',
      service: 'Pergolas & Composite Cladding',
      image: '/projects/project-5.jpg',
      description: 'Custom pergolas for outdoor dining areas and composite cladding for resort facade enhancement.',
      clientType: 'Hotel & Resort'
    },
    {
      id: 6,
      title: 'Industrial Warehouse Complex',
      category: 'industrial',
      location: 'Ajman, UAE',
      year: '2024',
      service: 'Gates & Boundary Walls',
      image: '/projects/project-6.jpg',
      description: 'Heavy-duty automated gates and boundary wall systems for industrial facility security.',
      clientType: 'Industrial Facility'
    },
    {
      id: 7,
      title: 'Palm Jumeirah Residence',
      category: 'residential',
      location: 'Palm Jumeirah, Dubai',
      year: '2023',
      service: 'Spider Glazing & Aluminum Works',
      image: '/projects/project-7.jpg',
      description: 'Luxury spider glazing installation with premium aluminum windows for beachfront residence.',
      clientType: 'Luxury Villa'
    },
    {
      id: 8,
      title: 'Dubai Silicon Oasis Office',
      category: 'commercial',
      location: 'Dubai Silicon Oasis, UAE',
      year: '2024',
      service: 'Curtain Walls & Partition Glazing',
      image: '/projects/project-8.jpg',
      description: 'Modern curtain wall system and glass partitions for tech company headquarters.',
      clientType: 'Tech Office'
    },
    {
      id: 9,
      title: 'Ras Al Khaimah Hospital',
      category: 'healthcare',
      location: 'Ras Al Khaimah, UAE',
      year: '2023',
      service: 'Automatic Doors & Safety Glass',
      image: '/projects/project-9.jpg',
      description: 'Hospital-grade automatic doors and tempered glass installations for medical facility.',
      clientType: 'Healthcare'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'commercial', label: 'Commercial', count: projects.filter(p => p.category === 'commercial').length },
    { id: 'residential', label: 'Residential', count: projects.filter(p => p.category === 'residential').length },
    { id: 'hospitality', label: 'Hospitality', count: projects.filter(p => p.category === 'hospitality').length },
    { id: 'industrial', label: 'Industrial', count: projects.filter(p => p.category === 'industrial').length },
    { id: 'healthcare', label: 'Healthcare', count: projects.filter(p => p.category === 'healthcare').length }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-20 -z-10"></div>

      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-amber-100 rounded-full text-amber-700 text-sm font-semibold tracking-wider mb-4"
          >
            OUR PORTFOLIO
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Featured <span className="text-amber-600">Projects</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-6">
            Explore our portfolio of successfully completed projects across the UAE, showcasing quality craftsmanship and innovative solutions.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-600/30'
                  : 'bg-slate-50 text-gray-700 hover:bg-amber-50 border border-gray-200 hover:border-amber-300'
              }`}
            >
              {category.label}
              <span className={`ml-2 text-sm ${activeCategory === category.id ? 'text-amber-100' : 'text-gray-500'}`}>
                ({category.count})
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(project)}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-amber-300 cursor-pointer"
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                  {/* Placeholder gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900"></div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-10"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 bg-amber-600 text-white text-xs font-semibold rounded-full shadow-lg">
                      {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                    </span>
                  </div>

                  {/* Hover Icon */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center z-20"
                  >
                    <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center shadow-xl">
                      <FiExternalLink className="text-white text-2xl" />
                    </div>
                  </motion.div>

                  {/* Bottom Info on Image */}
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <div className="flex items-center gap-2 text-white/80 text-xs mb-2">
                      <FiMapPin size={12} />
                      <span>{project.location}</span>
                      <span className="mx-2">•</span>
                      <FiCalendar size={12} />
                      <span>{project.year}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-amber-600 text-sm font-medium mb-3">
                    <FiAward size={14} />
                    <span>{project.service}</span>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Client Type Tag */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {project.clientType}
                    </span>
                    <motion.span
                      className="text-amber-600 font-semibold text-sm flex items-center gap-1"
                      whileHover={{ x: 5 }}
                    >
                      View Details
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </motion.span>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className="h-1 bg-gradient-to-r from-amber-500 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { number: '500+', label: 'Projects Completed' },
            { number: '100+', label: 'Happy Clients' },
            { number: '15+', label: 'Years Experience' },
            { number: '99%', label: 'Client Satisfaction' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-center border border-amber-600/20 hover:border-amber-600/50 transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold text-amber-500 mb-2">{stat.number}</div>
              <div className="text-gray-300 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-amber-50 to-white rounded-3xl p-12 md:p-16 border-2 border-amber-200">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Lets discuss your requirements and create something exceptional together. Our team is ready to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(217, 119, 6, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold text-lg shadow-xl border border-amber-500/30 inline-flex items-center justify-center gap-2"
              >
                Get Free Consultation
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold text-lg hover:bg-slate-800 transition-all duration-300"
              >
                Download Portfolio
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Project Detail Modal - Optional for future enhancement */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">{selectedProject.title}</h3>
                  <p className="text-amber-600 font-medium">{selectedProject.service}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <FiMapPin className="text-amber-600" />
                  <span>{selectedProject.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FiCalendar className="text-amber-600" />
                  <span>Completed in {selectedProject.year}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FiAward className="text-amber-600" />
                  <span>{selectedProject.clientType}</span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold shadow-lg"
              >
                Contact Us About This Project
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;