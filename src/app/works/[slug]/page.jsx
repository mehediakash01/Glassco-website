'use client'

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FiArrowRight, FiCheckCircle, FiHome, FiArrowLeft, FiLoader, FiPackage, FiTool, FiSettings, FiLayers } from 'react-icons/fi';
import { segmentsData } from '@/Data/segments';

// Helper function to create consistent slugs
const createSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export default function WorkDetails() {
  const { slug } = useParams();
  
  const [service, setService] = useState(null);
  const [parentSegment, setParentSegment] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    let foundService = null;
    let foundSegment = null;

    // Search through all segments to find the service
    for (const segment of segmentsData) {
      const servicesKey = segment.glassServices ? 'glassServices' : 'installationServices';
      const services = segment[servicesKey] || [];
      
      const matchedService = services.find(s => createSlug(s.name) === slug);
      
      if (matchedService) {
        foundService = matchedService;
        foundSegment = segment;
        
        // Get other services from the same segment (excluding current)
        const related = services.filter(s => createSlug(s.name) !== slug).slice(0, 3);
        setRelatedServices(related);
        break;
      }
    }

    if (!foundService) {
      setError('Service not found');
      setLoading(false);
      return;
    }

    setService(foundService);
    setParentSegment(foundSegment);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <FiLoader className="animate-spin text-6xl text-amber-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-8">{error || 'The service you are looking for does not exist.'}</p>
          <Link href="/segments/glass-services" className="px-6 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors inline-block">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
            <Link href="/" className="hover:text-amber-600 transition-colors flex items-center gap-1">
              <FiHome size={16} />
              Home
            </Link>
            <span>/</span>
            {parentSegment && (
              <>
                <Link 
                  href={`/segments/${createSlug(parentSegment.name)}`} 
                  className="hover:text-amber-600 transition-colors"
                >
                  {parentSegment.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-amber-600 font-medium">{service.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 md:px-8">
          <Link 
            href={parentSegment ? `/segments/${createSlug(parentSegment.name)}` : '/segments/glass-services'}
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-6 transition-colors"
          >
            <FiArrowLeft /> Back to {parentSegment?.name || 'Services'}
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {service.status && (
                <span className="inline-block px-4 py-2 bg-amber-600 text-white text-sm font-semibold rounded-full mb-4">
                  {service.status}
                </span>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {service.name}
              </h1>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                {service.description}
              </p>
            </div>
            
            {service.image && (
              <div className="relative h-64 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Solutions (for Glass Services) */}
              {service.solutions && service.solutions.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <FiLayers className="text-amber-600" size={20} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Solutions Offered</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {service.solutions.map((solution, idx) => (
                      <div key={idx} className="bg-slate-50 border-2 border-slate-200 rounded-xl p-6 hover:border-amber-300 transition-colors">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">{solution.type}</h3>
                        <ul className="space-y-2">
                          {solution.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-700">
                              <FiCheckCircle className="text-amber-600 mt-1 flex-shrink-0" size={16} />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Types (for various services) */}
              {service.types && service.types.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <FiPackage className="text-amber-600" size={20} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Types Available</h2>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {service.types.map((type, idx) => (
                      <div key={idx} className="bg-white border-2 border-slate-200 rounded-lg p-4 hover:border-amber-300 hover:shadow-md transition-all">
                        <p className="font-semibold text-slate-900">{type}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Glass Types */}
              {service.availableGlassTypes && service.availableGlassTypes.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <FiTool className="text-amber-600" size={20} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Available Glass Types</h2>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {service.availableGlassTypes.map((type, idx) => (
                      <span key={idx} className="px-4 py-2 bg-amber-50 text-amber-700 font-semibold rounded-lg border border-amber-200">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Glass Options */}
              {service.glassOptions && service.glassOptions.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <FiTool className="text-amber-600" size={20} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Glass Options</h2>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {service.glassOptions.map((option, idx) => (
                      <span key={idx} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg border border-slate-300">
                        {option}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Manufacturing Process */}
              {service.manufacturingProcess && service.manufacturingProcess.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <FiSettings className="text-amber-600" size={20} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Manufacturing Process</h2>
                  </div>
                  <div className="space-y-4">
                    {service.manufacturingProcess.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                          {idx + 1}
                        </div>
                        <p className="text-gray-700 pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Process */}
              {service.process && service.process.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <FiSettings className="text-amber-600" size={20} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Process</h2>
                  </div>
                  <div className="space-y-4">
                    {service.process.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                          {idx + 1}
                        </div>
                        <p className="text-gray-700 pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Capabilities */}
              {service.capabilities && service.capabilities.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <FiTool className="text-amber-600" size={20} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Capabilities</h2>
                  </div>
                  <ul className="space-y-3">
                    {service.capabilities.map((cap, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700">
                        <FiCheckCircle className="text-amber-600 mt-1 flex-shrink-0" size={18} />
                        <span className="text-lg">{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {service.benefits && service.benefits.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <FiCheckCircle className="text-amber-600" size={20} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Key Benefits</h2>
                  </div>
                  <ul className="grid md:grid-cols-2 gap-4">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <FiCheckCircle className="text-amber-600 mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Applications */}
              {service.applications && service.applications.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <FiPackage className="text-amber-600" size={20} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Applications</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {service.applications.map((app, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-white border-2 border-slate-200 p-4 rounded-lg hover:border-amber-300 transition-colors">
                        <FiArrowRight className="text-amber-600 mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-700 font-medium">{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Specifications */}
              {service.specifications && (
                <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Specifications</h3>
                  <div className="space-y-3">
                    {Object.entries(service.specifications).map(([key, value]) => (
                      <div key={key} className="border-b border-slate-300 pb-2 last:border-0">
                        <p className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="font-semibold text-slate-900">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-gradient-to-br from-amber-600 to-amber-700 text-white rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-3">Need This Service?</h3>
                <p className="mb-6 text-amber-50">Get in touch with our experts for a free consultation and quote.</p>
                <Link 
                  href="/contact" 
                  className="block w-full bg-white text-amber-600 text-center py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
                >
                  Contact Us
                </Link>
              </div>

              {/* Parent Segment Link */}
              {parentSegment && (
                <div className="bg-slate-900 text-white rounded-xl p-6">
                  <p className="text-amber-400 text-sm mb-2">Part of</p>
                  <h3 className="text-xl font-bold mb-3">{parentSegment.name}</h3>
                  <Link 
                    href={`/segments/${createSlug(parentSegment.name)}`}
                    className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    View All Services <FiArrowRight />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
              Related <span className="text-amber-600">Services</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedServices.map((related) => {
                const relatedId = related.glassServiceId || related.installationServiceId;
                return (
                  <Link 
                    key={relatedId}
                    href={`/services/${createSlug(related.name)}`}
                    className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-amber-300 transition-all duration-300 group"
                  >
                    {related.image && (
                      <div className="relative h-48 bg-slate-900 overflow-hidden">
                        <img 
                          src={related.image} 
                          alt={related.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                        {related.name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">{related.description}</p>
                      <span className="inline-flex items-center gap-2 text-amber-600 font-semibold text-sm">
                        Learn More <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}