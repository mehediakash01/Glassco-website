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
  FiTool,
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

  // =====================
  // LOADING
  // =====================
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

  // =====================
  // ERROR
  // =====================
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
            href="/segments/glass-services"
            className="px-6 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors inline-block"
          >
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  // =====================
  // UI (UNCHANGED)
  // =====================
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
                : '/segments/glass-services'
            }
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-6 transition-colors"
          >
            <FiArrowLeft /> Back to{' '}
            {parentSegment?.name || 'Services'}
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
              <p className="text-lg text-gray-300">
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

      {/* RELATED SERVICES (unchanged) */}
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
                    href={`/services/${createSlug(
                      related.name
                    )}`}
                    className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-amber-300 transition-all"
                  >
                    {related.image && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={related.image}
                          alt={related.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2">
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
