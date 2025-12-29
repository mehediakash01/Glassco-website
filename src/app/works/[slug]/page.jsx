'use client';

import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  FiArrowRight,
  FiCheckCircle,
  FiHome,
  FiArrowLeft,
  FiLoader,
  FiPackage,
  FiSettings,
  FiLayers,
} from 'react-icons/fi';
import { segmentsData } from '@/Data/segments';

// Helper function to create consistent slugs
const createSlug = (name) =>
  name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

export default function WorkDetails() {
  const { slug } = useParams();

  const {
    service,
    parentSegment,
    relatedServices,
    loading,
    error,
  } = useMemo(() => {
    if (!slug) {
      return {
        service: null,
        parentSegment: null,
        relatedServices: [],
        loading: true,
        error: null,
      };
    }

    let foundService = null;
    let foundSegment = null;
    let related = [];

    for (const segment of segmentsData) {
      const servicesKey = segment.glassServices
        ? 'glassServices'
        : 'installationServices';

      const services = segment[servicesKey] || [];

      const matched = services.find(
        (s) => createSlug(s.name) === slug
      );

      if (matched) {
        foundService = matched;
        foundSegment = segment;
        related = services
          .filter((s) => createSlug(s.name) !== slug)
          .slice(0, 3);
        break;
      }
    }

    if (!foundService) {
      return {
        service: null,
        parentSegment: null,
        relatedServices: [],
        loading: false,
        error: 'Service not found',
      };
    }

    return {
      service: foundService,
      parentSegment: foundSegment,
      relatedServices: related,
      loading: false,
      error: null,
    };
  }, [slug]);

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <FiLoader className="animate-spin text-6xl text-amber-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">
            Loading service details...
          </p>
        </div>
      </div>
    );
  }

  // ERROR
  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Service Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            {error ||
              'The service you are looking for does not exist.'}
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors inline-block"
          >
            Back to Home
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
            <Link
              href="/"
              className="hover:text-amber-600 transition-colors flex items-center gap-1"
            >
              <FiHome size={16} />
              Home
            </Link>
            <span>/</span>
            {parentSegment && (
              <>
                <Link
                  href={`/segments/${createSlug(
                    parentSegment.name
                  )}`}
                  className="hover:text-amber-600 transition-colors"
                >
                  {parentSegment.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-amber-600 font-medium">
              {service.name}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 md:px-8">
          <Link
            href={
              parentSegment
                ? `/segments/${createSlug(
                    parentSegment.name
                  )}`
                : '/'
            }
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-6 transition-colors"
          >
            <FiArrowLeft /> Back to{' '}
            {parentSegment?.name || 'Home'}
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {service.status && (
                <span className="inline-block px-4 py-2 bg-amber-600 text-white text-sm font-semibold rounded-full mb-4">
                  {service.status}
                </span>
              )}
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {service.name}
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed">
                {service.description}
              </p>
            </div>

            {service.image && (
              <div className="relative h-64 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content - 2 columns */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Solutions (for glass services) */}
              {service.solutions && service.solutions.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                    <span className="w-1 h-10 bg-amber-600 rounded"></span>
                    Available Solutions
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {service.solutions.map((solution, idx) => (
                      <div
                        key={idx}
                        className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-200 hover:border-amber-300 hover:shadow-xl transition-all"
                      >
                        <h3 className="text-lg font-bold text-slate-900 mb-4">{solution.type}</h3>
                        <ul className="space-y-2">
                          {solution.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <FiCheckCircle className="text-amber-600 mt-0.5 flex-shrink-0" size={16} />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Types (generic types array) */}
              {service.types && service.types.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <span className="w-1 h-10 bg-amber-600 rounded"></span>
                    Available Types
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {service.types.map((type, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all text-center"
                      >
                        <span className="text-sm font-medium text-slate-900">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Glass Types */}
              {service.availableGlassTypes && service.availableGlassTypes.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <span className="w-1 h-10 bg-amber-600 rounded"></span>
                    Available Glass Types
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {service.availableGlassTypes.map((type, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-4 rounded-xl border-2 border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all text-center"
                      >
                        <FiLayers className="mx-auto text-amber-600 mb-2" size={20} />
                        <span className="text-sm font-medium text-slate-900">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Glass Options */}
              {service.glassOptions && service.glassOptions.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <span className="w-1 h-10 bg-amber-600 rounded"></span>
                    Glass Options
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {service.glassOptions.map((option, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-amber-400 transition-all text-center"
                      >
                        <span className="text-sm font-medium text-slate-900">{option}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Process / Manufacturing Process */}
              {(service.process || service.manufacturingProcess) && (
                <div className="bg-slate-50 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <FiSettings className="text-amber-600" size={24} />
                    {service.process ? 'Process' : 'Manufacturing Process'}
                  </h3>
                  <ol className="space-y-3">
                    {(service.process || service.manufacturingProcess).map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {idx + 1}
                        </span>
                        <span className="text-gray-700 pt-1">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Capabilities */}
              {service.capabilities && service.capabilities.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <span className="w-1 h-10 bg-amber-600 rounded"></span>
                    Capabilities
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.capabilities.map((cap, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200 hover:border-amber-400 transition-all"
                      >
                        <FiCheckCircle className="text-amber-600 mt-1 flex-shrink-0" size={20} />
                        <span className="text-gray-700">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits (from root level) */}
              {service.benefits && service.benefits.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <span className="w-1 h-10 bg-amber-600 rounded"></span>
                    Key Benefits
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200 hover:border-amber-400 transition-all"
                      >
                        <FiCheckCircle className="text-amber-600 mt-1 flex-shrink-0" size={20} />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Applications */}
              {service.applications && service.applications.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <span className="w-1 h-10 bg-amber-600 rounded"></span>
                    Applications
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {service.applications.map((app, idx) => (
                      <div
                        key={idx}
                        className="bg-white border-2 border-slate-200 hover:border-amber-400 rounded-xl p-4 text-center transition-all hover:shadow-lg"
                      >
                        <span className="text-sm font-medium text-gray-800">{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - 1 column */}
            <div className="lg:col-span-1">
              {/* Specifications Sidebar */}
              {service.specifications && (
                <div className="bg-amber-50 border-2 border-amber-200 p-6 rounded-2xl mb-8 sticky top-24">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <FiPackage className="text-amber-600" size={24} />
                    Specifications
                  </h3>
                  <div className="space-y-3 text-sm">
                    {Object.entries(service.specifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between py-2 border-b border-amber-200 last:border-0">
                        <span className="text-gray-600 font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="font-semibold text-slate-900">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-amber-300">
                    <Link href="/#contact">
                      <button className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold shadow-lg hover:scale-105 transition-all active:scale-95 flex items-center justify-center gap-2">
                        Request Quote
                        <FiArrowRight />
                      </button>
                    </Link>
                  </div>
                </div>
              )}

              {/* Service Info Card */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Service Information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <span className="text-gray-600">Segment</span>
                    <span className="font-semibold text-slate-900">{parentSegment?.name}</span>
                  </div>
                  {service.status && (
                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <span className="text-gray-600">Status</span>
                      <span className="font-semibold text-amber-600">{service.status}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600">Service ID</span>
                    <span className="font-mono text-amber-600 font-semibold">
                      #{service.glassServiceId || service.installationServiceId}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED SERVICES */}
      {relatedServices.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Related{' '}
              <span className="text-amber-600">Services</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedServices.map((related) => {
                const id =
                  related.glassServiceId ||
                  related.installationServiceId;

                return (
                  <Link
                    key={id}
                    href={`/works/${createSlug(
                      related.name
                    )}`}
                    className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-amber-300 transition-all group"
                  >
                    {related.image && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={related.image}
                          alt={related.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2 group-hover:text-amber-600 transition-colors">
                        {related.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {related.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-amber-600 font-semibold text-sm">
                        Learn More <FiArrowRight />
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