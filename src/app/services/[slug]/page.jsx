'use client'

import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiLoader } from 'react-icons/fi';
import * as FiIcons from 'react-icons/fi';
import * as BsIcons from 'react-icons/bs';
import Link from 'next/link';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchService() {
      try {
        setLoading(true);
        const res = await fetch(`/api/services/${slug}`);
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.message || 'Service not found');
        }
        
        setService(data.data);
      } catch (err) {
        console.error('Error fetching service:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchService();
    }
  }, [slug]);

  const resolveIcon = (iconName) => {
    if (!iconName) return null;

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

    return null;
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
          <Link href="/services" className="px-6 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors inline-block">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] bg-slate-900 overflow-hidden">
        {/* Background Image */}
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
        
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="text-9xl text-white">{resolveIcon(service.icon)}</div>
        </div>

        <div className="relative z-20 h-full flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              {service.tagline && (
                <span className="inline-block px-4 py-2 bg-amber-600/20 backdrop-blur-sm border border-amber-500/30 rounded-full text-amber-400 text-sm font-semibold tracking-wider mb-4">
                  {service.tagline}
                </span>
              )}
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {service.title}
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                {service.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(217, 119, 6, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold shadow-xl border border-amber-500/30 flex items-center justify-center gap-2"
                >
                  Get a Quote
                  <FiArrowRight />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent text-white rounded-xl font-semibold border-2 border-white/30 hover:border-amber-500 hover:bg-white/5 transition-all"
                >
                  View Projects
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section ref={sectionRef} className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          {/* Overview */}
          {service.full_description && (
            <div className="max-w-4xl mb-20">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              >
                Overview
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-gray-700 leading-relaxed"
              >
                {service.full_description}
              </motion.p>
            </div>
          )}

          {/* Features */}
          {service.features && service.features.length > 0 && (
            <div className="mb-20">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center"
              >
                Key <span className="text-amber-600">Features</span>
              </motion.h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {service.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-200 hover:border-amber-300 hover:shadow-xl transition-all"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                      {resolveIcon(feature.icon)}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Specifications & Benefits */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Specifications */}
            {service.specifications && service.specifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-slate-50 p-8 rounded-2xl"
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 bg-amber-600 rounded"></span>
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
              </motion.div>
            )}

            {/* Benefits */}
            {service.benefits && service.benefits.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-amber-50 p-8 rounded-2xl"
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 bg-amber-600 rounded"></span>
                  Benefits
                </h3>
                <ul className="space-y-3">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FiCheckCircle className="text-amber-600 mt-1 flex-shrink-0" size={20} />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* Applications */}
          {service.applications && service.applications.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-20"
            >
              <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                Ideal <span className="text-amber-600">Applications</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {service.applications.map((app, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-gray-200 hover:border-amber-500 rounded-xl p-4 text-center transition-all hover:shadow-lg"
                  >
                    <span className="text-gray-800 font-medium text-sm">{app}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}