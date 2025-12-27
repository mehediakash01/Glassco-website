'use client'

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FiArrowRight, FiCheckCircle, FiLoader, FiHome, FiTag, FiPackage } from 'react-icons/fi';
import * as FiIcons from 'react-icons/fi';
import * as BsIcons from 'react-icons/bs';
import Link from 'next/link';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  
  const [service, setService] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching service with slug:', slug);
        
        // Fetch current service
        const serviceRes = await fetch(`/api/services/${slug}`);
        console.log('Service response status:', serviceRes.status);
        
        const serviceData = await serviceRes.json();
        console.log('Service data:', serviceData);
        
        if (!serviceRes.ok) {
          throw new Error(serviceData.message || 'Service not found');
        }
        
        // Parse features, specifications, benefits, applications if they're strings
        const parsedService = {
          ...serviceData.data,
          features: typeof serviceData.data.features === 'string' 
            ? JSON.parse(serviceData.data.features) 
            : serviceData.data.features || [],
          specifications: typeof serviceData.data.specifications === 'string'
            ? JSON.parse(serviceData.data.specifications)
            : serviceData.data.specifications || [],
          benefits: typeof serviceData.data.benefits === 'string'
            ? JSON.parse(serviceData.data.benefits)
            : serviceData.data.benefits || [],
          applications: typeof serviceData.data.applications === 'string'
            ? JSON.parse(serviceData.data.applications)
            : serviceData.data.applications || []
        };
        
        setService(parsedService);
        
        // Fetch related services from same category
        if (parsedService?.category) {
          try {
            const relatedRes = await fetch(`/api/services?category=${parsedService.category}`);
            const relatedData = await relatedRes.json();
            
            if (relatedRes.ok && relatedData.data) {
              // Filter out current service and limit to 3
              const filtered = relatedData.data
                .filter(s => s.slug !== slug)
                .slice(0, 3);
              setRelatedServices(filtered);
            }
          } catch (err) {
            console.error('Error fetching related services:', err);
            // Don't fail the whole page if related services fail
          }
        }
      } catch (err) {
        console.error('Error fetching service:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchData();
    }
  }, [slug]);

  const resolveIcon = (iconName) => {
    if (!iconName) return null;
    
    try {
      // Check in FiIcons
      if (FiIcons[iconName]) {
        const IconComponent = FiIcons[iconName];
        return <IconComponent />;
      }

      // Check in BsIcons
      if (BsIcons[iconName]) {
        const IconComponent = BsIcons[iconName];
        return <IconComponent />;
      }
    } catch (err) {
      console.error('Error resolving icon:', iconName, err);
    }
    
    return null;
  };

  const getCategoryLabel = (category) => {
    const labels = {
      'aluminum': 'Aluminum Works',
      'glazing': 'Glazing Systems',
      'metalwork': 'Metal Works',
      'outdoor': 'Outdoor Solutions'
    };
    return labels[category] || category;
  };

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
          <Link href="/#services" className="px-6 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors inline-block">
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
            <Link href="/#services" className="hover:text-amber-600 transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-amber-600 font-medium">{getCategoryLabel(service.category)}</span>
            <span>/</span>
            <span className="text-slate-900 font-medium truncate">{service.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] bg-slate-900 overflow-hidden">
        {service.image_url && (
          <div className="absolute inset-0">
            <img 
              src={service.image_url} 
              alt={service.title}
              className="w-full h-full object-cover opacity-30"
            />
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10"></div>
        
        {service.icon && (
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="text-9xl text-white">{resolveIcon(service.icon)}</div>
          </div>
        )}

        <div className="relative z-20 h-full flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl">
              {/* Category Badge */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full text-slate-300 text-sm font-medium">
                  <FiTag size={14} />
                  {getCategoryLabel(service.category)}
                </span>
                {service.tagline && (
                  <span className="inline-block px-4 py-2 bg-amber-600/20 backdrop-blur-sm border border-amber-500/30 rounded-full text-amber-400 text-sm font-semibold tracking-wider">
                    {service.tagline}
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {service.title}
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                {service.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold shadow-xl border border-amber-500/30 flex items-center justify-center gap-2 hover:scale-105 hover:shadow-2xl hover:shadow-amber-600/40 transition-all duration-300 active:scale-95">
                  Get a Quote
                  <FiArrowRight />
                </button>
                <Link href="/#projects">
                  <button className="w-full px-8 py-4 bg-transparent text-white rounded-xl font-semibold border-2 border-white/30 hover:border-amber-500 hover:bg-white/5 transition-all duration-300 hover:scale-105 active:scale-95">
                    View Projects
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content - 2 columns */}
            <div className="lg:col-span-2">
              {/* Overview */}
              {service.full_description && (
                <div className="mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <span className="w-1 h-10 bg-amber-600 rounded"></span>
                    Overview
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {service.full_description}
                  </p>
                </div>
              )}

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                    <span className="w-1 h-10 bg-amber-600 rounded"></span>
                    Key Features
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {service.features.map((feature, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-200 hover:border-amber-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        {feature.icon && (
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white text-xl mb-4">
                            {resolveIcon(feature.icon)}
                          </div>
                        )}
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                        {feature.description && (
                          <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specifications */}
              {service.specifications && service.specifications.length > 0 && (
                <div className="mb-16 bg-slate-50 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <FiPackage className="text-amber-600" size={24} />
                    Technical Specifications
                  </h3>
                  <ul className="space-y-3">
                    {service.specifications.map((spec, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <FiCheckCircle className="text-amber-600 mt-1 flex-shrink-0" size={20} />
                        <span className="text-gray-700">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Applications */}
              {service.applications && service.applications.length > 0 && (
                <div className="mb-16">
                  <h3 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                    <span className="w-1 h-10 bg-amber-600 rounded"></span>
                    Ideal Applications
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {service.applications.map((app, index) => (
                      <div
                        key={index}
                        className="bg-white border-2 border-gray-200 hover:border-amber-500 rounded-xl p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-105"
                      >
                        <span className="text-gray-800 font-medium text-sm">{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - 1 column */}
            <div className="lg:col-span-1">
              {/* Benefits Card */}
              {service.benefits && service.benefits.length > 0 && (
                <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-8 rounded-2xl mb-8 lg:sticky lg:top-24 border border-amber-200">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <FiCheckCircle className="text-amber-600" size={24} />
                    Benefits
                  </h3>
                  <ul className="space-y-4">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <FiCheckCircle className="text-white" size={14} />
                        </div>
                        <span className="text-gray-800 font-medium">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA in Sidebar */}
                  <div className="mt-8 pt-8 border-t border-amber-300">
                    <button className="w-full px-6 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold shadow-lg hover:scale-105 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2">
                      Request Quote
                      <FiArrowRight />
                    </button>
                    <Link href="/#contact">
                      <button className="w-full mt-3 px-6 py-3 bg-white text-amber-600 rounded-xl font-semibold border-2 border-amber-600 hover:bg-amber-50 transition-all duration-300">
                        Contact Us
                      </button>
                    </Link>
                  </div>
                </div>
              )}

              {/* Service Info Card */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 mb-8">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Service Information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <span className="text-gray-600">Category</span>
                    <span className="font-semibold text-slate-900">{getCategoryLabel(service.category)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <span className="text-gray-600">Service Code</span>
                    <span className="font-mono text-amber-600 font-semibold">#{service.id}</span>
                  </div>
                  {service.features && service.features.length > 0 && (
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-600">Features</span>
                      <span className="font-semibold text-slate-900">{service.features.length}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Services */}
          {relatedServices.length > 0 && (
            <div className="mt-20 pt-20 border-t border-slate-200">
              <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">
                Related <span className="text-amber-600">Services</span>
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedServices.map((relatedService) => (
                  <Link 
                    key={relatedService.id} 
                    href={`/services/${relatedService.slug}`}
                    className="group bg-black border-2 border-slate-200 rounded-2xl overflow-hidden hover:border-amber-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative h-48 bg-slate-900 overflow-hidden">
                      {relatedService.image_url ? (
                        <img 
                          src={relatedService.image_url} 
                          alt={relatedService.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                          <div className="text-5xl text-amber-500/30">
                            {resolveIcon(relatedService.icon)}
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block px-3 py-1 bg-amber-600/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full capitalize">
                          {relatedService.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                        {relatedService.title}
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {relatedService.description}
                      </p>
                      <div className="flex items-center gap-2 text-amber-600 font-semibold text-sm group-hover:gap-3 transition-all">
                        Learn More
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to Services */}
          <div className="mt-12 text-center">
            <Link 
              href="/#services" 
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold text-lg group transition-all hover:gap-3"
            >
              <span>View All Services</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}