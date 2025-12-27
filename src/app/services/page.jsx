'use client'

import React, { useState, useEffect } from 'react';
import { 
  FiArrowRight, 
  FiCheckCircle, 
  FiLayers,
  FiHome,
  FiZap,
  FiSettings,
  FiLock,
  FiMaximize2,
  FiTool,
  FiLoader
} from 'react-icons/fi';
import { BsDoorOpen, BsBuilding, BsGrid3X3Gap } from 'react-icons/bs';
import Link from 'next/link';
import SectionWrapper from '@/components/SectionWrapper';
import { servicesAPI } from '../../lib/serviceApi'; 

const iconMap = {
  BsDoorOpen,
  BsBuilding,
  BsGrid3X3Gap,
  FiLayers,
  FiHome,
  FiZap,
  FiSettings,
  FiLock,
  FiMaximize2,
  FiTool,
};

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await servicesAPI.getAll();
        
        if (res.success) {
          console.log('Services fetched:', res.data);
          setServices(res.data);
        } else {
          console.error('Failed to fetch services', res.error);
          setError(res.error);
        }
      } catch (err) {
        console.error('Error fetching services', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <SectionWrapper id="services">
        <div className="container mx-auto px-4 py-20 text-center">
          <FiLoader className="animate-spin text-6xl text-amber-500 mx-auto mb-4" />
          <p className="text-white text-lg">Loading services...</p>
        </div>
      </SectionWrapper>
    );
  }

  if (error) {
    return (
      <SectionWrapper id="services">
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-red-400 text-lg">Error loading services: {error}</p>
        </div>
      </SectionWrapper>
    );
  }

  // Normalize services data
  const normalizedServices = services.map(service => {
    // Parse features if they're a string
    let features = service.features || [];
    if (typeof features === 'string') {
      try {
        features = JSON.parse(features);
      } catch (e) {
        features = [];
      }
    }

    // Get icon component
    const IconComponent = iconMap[service.icon] || FiLayers;

    return {
      ...service,
      features: Array.isArray(features) ? features : [],
      IconComponent,
    };
  });

  const categories = [
    { id: 'all', label: 'All Services', count: normalizedServices.length },
    { id: 'aluminum', label: 'Aluminum Works', count: normalizedServices.filter(s => s.category === 'aluminum').length },
    { id: 'glazing', label: 'Glazing Systems', count: normalizedServices.filter(s => s.category === 'glazing').length },
    { id: 'metalwork', label: 'Metal Works', count: normalizedServices.filter(s => s.category === 'metalwork').length },
    { id: 'outdoor', label: 'Outdoor Solutions', count: normalizedServices.filter(s => s.category === 'outdoor').length }
  ];

  const filteredServices = activeTab === 'all'
    ? normalizedServices
    : normalizedServices.filter(s => s.category === activeTab);

  return (
    <section id="services" className="py-20 md:py-28 bg-black">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 opacity-100">
          <span className="inline-block px-4 py-2 bg-amber-600/30 border-2 border-amber-500 rounded-full text-amber-400 text-sm font-bold tracking-wider mb-4">
            WHAT WE DO
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-amber-400">Services</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-6">
            Comprehensive aluminium and glass solutions tailored to your project needs with precision engineering and expert craftsmanship.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full"></div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                activeTab === category.id
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/50 border-2 border-amber-400'
                  : 'bg-slate-700/80 text-gray-200 hover:bg-slate-600/80 border-2 border-slate-600 hover:border-amber-500/50'
              }`}
            >
              {category.label}
              <span className={`ml-2 text-sm ${activeTab === category.id ? 'text-amber-100' : 'text-gray-400'}`}>
                ({category.count})
              </span>
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-slate-800/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 border-2 border-slate-600 hover:border-amber-400 hover:-translate-y-2"
            >
              {/* Service Image */}
              <div className="relative h-56 overflow-hidden">
                {service.image_url ? (
                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                    <service.IconComponent className="text-6xl text-amber-500/50" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent z-10"></div>
                <div className="absolute top-4 left-4 z-20 w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg shadow-amber-500/30">
                  <service.IconComponent />
                </div>
              </div>

              {/* Card content */}
              <div className="p-6 bg-slate-800">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-base leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Features */}
                {service.features && service.features.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {service.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <FiCheckCircle className="text-amber-400 flex-shrink-0" size={16} />
                        <span className="truncate">{feature.title || feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                <Link href={`/services/${service.slug}`}>
                  <div className="flex items-center gap-2 text-amber-400 font-bold hover:gap-3 transition-all duration-300 cursor-pointer text-base group/link">
                    Learn More
                    <FiArrowRight className="group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>

              {/* Bottom Accent Line */}
              <div className="h-1 bg-gradient-to-r from-amber-500 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No services found in this category.</p>
          </div>
        )}

        {/* Bottom CTA Section */}
        <div className="mt-20">
          <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-12 md:p-16 overflow-hidden border border-amber-500/20">
            <div className="pointer-events-none absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl -z-10"></div>
            <div className="pointer-events-none absolute bottom-0 left-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl -z-10"></div>
            <div className="relative z-10 text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Can not Find What You are Looking For?
              </h3>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                We offer custom solutions tailored to your specific needs. Contact us to discuss your project requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold text-lg shadow-xl shadow-amber-500/30 border border-amber-500/30 inline-flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300 active:scale-95 hover:shadow-2xl hover:shadow-amber-500/40">
                  Request Custom Quote
                  <span className="animate-pulse">→</span>
                </button>
                <button className="px-8 py-4 bg-transparent text-white rounded-xl font-semibold text-lg border-2 border-white/30 hover:border-amber-500 hover:bg-white/5 transition-all duration-300 hover:scale-105 active:scale-95">
                  View All Projects
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: `${services.length}+`, label: 'Services Offered' },
            { number: '500+', label: 'Projects Completed' },
            { number: '100%', label: 'Quality Guaranteed' },
            { number: '24/7', label: 'Support Available' }
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
      </div>
    </section>
  );
};

export default ServicesSection;