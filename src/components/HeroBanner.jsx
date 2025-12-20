"use client"
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      image: "assets/images/banner-1.jpg", 
      tagline: "TIMELESS ELEGANCE",
      title: "Custom Glass Solutions for Every Project",
      subtitle: "State-Of-Art Manufacturing facility",
      description:
        "Our Glass solutions combine style, strength, and sustainability to transform your architectural vision into reality.",
      cta: "Explore Services",
    },
    {
      image: "assets/images/banner-2.jpg",
      tagline: "PREMIUM QUALITY",
      title: "Delivering Excellence Across GCC Regions",
      subtitle: "Expert Craftsmanship & Innovation",
      description:
        "With cutting-edge technology and skilled artisans, we deliver aluminium and glass solutions that exceed expectations.",
      cta: "View Projects",
    },
    {
      image: "/assets/images/banner-3.jpg",
      tagline: "INNOVATIVE DESIGN",
      title: "Where Precision Meets Perfection",
      subtitle: "Our Designs Enhance both Style & Strength",
      description:
        "From concept to installation, we ensure every detail reflects quality, durability, and modern aesthetics.",
      cta: "Get Quote",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-slate-900">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-3xl">
                {/* Tagline */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="mb-4"
                >
                  <span className="inline-block px-4 py-2 bg-amber-600/20 backdrop-blur-sm border border-amber-500/30 rounded-full text-amber-400 text-xs md:text-sm font-semibold tracking-wider">
                    {slides[currentSlide].tagline}
                  </span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-xl md:text-2xl text-amber-400 font-medium mb-6"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl"
                >
                  {slides[currentSlide].description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 40px rgba(217, 119, 6, 0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg font-semibold text-lg shadow-xl border border-amber-500/30 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {slides[currentSlide].cta}
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <FiArrowRight />
                      </motion.span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-transparent text-white rounded-lg font-semibold text-lg border-2 border-white/30 hover:border-amber-500 hover:bg-white/5 backdrop-blur-sm transition-all duration-300"
                  >
                    Learn More
                  </motion.button>
                </motion.div>

                {/* Decorative Line */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="h-1 bg-gradient-to-r from-amber-500 via-amber-600 to-transparent mt-12 max-w-md"
                ></motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 md:px-8 z-20 pointer-events-none">
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-amber-600/80 hover:border-amber-500 transition-all duration-300 flex items-center justify-center shadow-lg"
        >
          <FiChevronLeft size={24} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-amber-600/80 hover:border-amber-500 transition-all duration-300 flex items-center justify-center shadow-lg"
        >
          <FiChevronRight size={24} />
        </motion.button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`relative h-1 rounded-full transition-all duration-500 ${
              currentSlide === index
                ? "w-12 bg-amber-500"
                : "w-8 bg-white/40 hover:bg-white/60"
            }`}
          >
            {currentSlide === index && (
              <motion.div
                layoutId="activeSlide"
                className="absolute inset-0 bg-amber-500 rounded-full shadow-lg shadow-amber-500/50"
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-white/60 text-xs font-medium tracking-wider rotate-90 origin-center">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-12 bg-gradient-to-b from-amber-500 to-transparent"
        ></motion.div>
      </motion.div>

      {/* Stats/Features Bar */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-transparent backdrop-blur-md border-t border-amber-600/20"
      >
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center md:text-left">
              <div className="text-2xl md:text-3xl font-bold text-amber-500 mb-1">
                5000+
              </div>
              <div className="text-xs md:text-sm text-gray-300">
                Sq.ft Facility
              </div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-2xl md:text-3xl font-bold text-amber-500 mb-1">
                15+
              </div>
              <div className="text-xs md:text-sm text-gray-300">
                Years Experience
              </div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-2xl md:text-3xl font-bold text-amber-500 mb-1">
                500+
              </div>
              <div className="text-xs md:text-sm text-gray-300">
                Projects Completed
              </div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-2xl md:text-3xl font-bold text-amber-500 mb-1">
                100%
              </div>
              <div className="text-xs md:text-sm text-gray-300">
                Client Satisfaction
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroBanner;
