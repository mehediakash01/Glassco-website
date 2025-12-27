'use client'

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FiArrowRight, FiCheckCircle, FiHome, FiTag, FiPackage, FiLoader } from 'react-icons/fi';
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

export default function SegmentPage() {
  const { slug } = useParams();
  
  const [segment, setSegment] = useState(null);
  const [relatedSegments, setRelatedSegments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    // Find the segment matching the slug
    const foundSegment = segmentsData.find(
      s => createSlug(s.name) === slug
    );

    if (!foundSegment) {
      setError('Segment not found');
      setLoading(false);
      return;
    }

    setSegment(foundSegment);

    // Pick related segments (other than current)
    const others = segmentsData.filter(s => s.name !== foundSegment.name).slice(0, 3);
    setRelatedSegments(others);

    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <FiLoader className="animate-spin text-6xl text-amber-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading segment...</p>
        </div>
      </div>
    );
  }

  if (error || !segment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Segment Not Found</h1>
          <p className="text-gray-600 mb-8">{error || 'The segment you are looking for does not exist.'}</p>
          <Link href="/#services" className="px-6 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors inline-block">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  // Determine service type keys
  const servicesKey = segment.glassServices ? 'glassServices' : 'installationServices';
  const services = segment[servicesKey] || [];

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
            <span className="text-amber-600 font-medium">{segment.name}</span>
          </div>
        </div>
      </div>

      {/* Overview */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">{segment.name}</h1>
          <p className="text-lg text-gray-700 mb-12 leading-relaxed">{segment.overview}</p>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => {
              const serviceId = service.glassServiceId || service.installationServiceId;
              
              return (
                <div 
                  key={serviceId} 
                  className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-amber-300 transition-all duration-300 group"
                >
                  {service.image && (
                    <div className="relative h-48 bg-slate-900 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    {service.status && (
                      <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full mb-3">
                        {service.status}
                      </span>
                    )}
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                      {service.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {service.description}
                    </p>

                    {/* Show benefits if available */}
                    {service.benefits && service.benefits.length > 0 && (
                      <ul className="text-gray-700 text-sm mb-4 space-y-2">
                        {service.benefits.slice(0, 3).map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <FiCheckCircle className="text-amber-600 mt-0.5 flex-shrink-0" size={16} />
                            <span className="line-clamp-1">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Show types if available (for installation services) */}
                    {service.types && service.types.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-2">Types Available:</p>
                        <div className="flex flex-wrap gap-1">
                          {service.types.slice(0, 3).map((type, i) => (
                            <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <Link 
                      href={`/works/${createSlug(service.name)}`} 
                      className="inline-flex items-center gap-2 text-amber-600 font-semibold mt-2 hover:gap-3 transition-all group-hover:text-amber-700"
                    >
                      Learn More <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related Segments */}
      {relatedSegments.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
              Explore Other <span className="text-amber-600">Segments</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedSegments.map(rel => (
                <Link 
                  key={rel.segmentId} 
                  href={`/segments/${createSlug(rel.name)}`} 
                  className="bg-white border-2 border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-amber-300 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-600 transition-colors">
                      <FiPackage className="text-amber-600 group-hover:text-white transition-colors" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                      {rel.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-3">{rel.overview}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-amber-600 font-semibold text-sm">
                    View Segment <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}