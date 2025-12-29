"use client"
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      image: "/assets/images/banner-1.jpg", 
      title: "Precision in Glass & Aluminium",
      subtitle: "Crafting excellence for modern architecture",
      cta: "Explore Our Work",
      link: "/projects"
    },
    {
      image: "/assets/images/banner-2.jpg",
      title: "Transforming Spaces with Quality",
      subtitle: "Premium solutions across the GCC",
      cta: "View Services",
      link: "/services/glass-services"
    },
    {
      image: "/assets/images/banner-3.jpg",
      title: "Where Innovation Meets Design",
      subtitle: "15+ years of trusted expertise",
      cta: "Get Started",
      link: "/contact"
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

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

  // Create puzzle pieces - 4x3 grid = 12 pieces
  const pieces = Array.from({ length: 12 }, (_, i) => i);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-slate-900">
      {/* Slides with Puzzle Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
        >
          {/* Puzzle Pieces Grid */}
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-3">
            {pieces.map((piece) => {
              const row = Math.floor(piece / 4);
              const col = piece % 4;
              const delay = (row + col) * 0.05;

              return (
                <motion.div
                  key={piece}
                  initial={{ 
                    opacity: 0,
                    scale: 0,
                    rotateY: -90,
                    x: (col - 1.5) * 100,
                    y: (row - 1) * 100
                  }}
                  animate={{ 
                    opacity: 1,
                    scale: 1,
                    rotateY: 0,
                    x: 0,
                    y: 0
                  }}
                  exit={{ 
                    opacity: 0,
                    scale: 0.8,
                    rotateY: 90
                  }}
                  transition={{
                    duration: 0.6,
                    delay: delay,
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }}
                  className="relative overflow-hidden"
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                  }}
                >
                  {/* Image piece */}
                  <div 
                    className="absolute inset-0 w-full h-full"
                    style={{
                      backgroundImage: `url(${slides[currentSlide].image})`,
                      backgroundSize: "400% 300%",
                      backgroundPosition: `${col * 33.33}% ${row * 50}%`,
                    }}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Gradient Overlays */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/60 pointer-events-none"
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"
          />

          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-4xl mx-auto text-center">
                
                {/* Main Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
                  className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 font-light"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>

                {/* Single CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.8, ease: "easeOut" }}
                >
                  <Link href={slides[currentSlide].link}>
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 50px rgba(217, 119, 6, 0.6)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative px-10 py-5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full font-semibold text-base md:text-lg shadow-2xl border border-amber-500/30 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {slides[currentSlide].cta}
                        <motion.span
                          className="group-hover:translate-x-1 transition-transform duration-300"
                        >
                          <FiArrowRight size={20} />
                        </motion.span>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                    </motion.button>
                  </Link>
                </motion.div>

                {/* Minimal Decorative Element */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "120px", opacity: 1 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mt-16 mx-auto"
                ></motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Minimal Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-6 md:px-12 z-20 pointer-events-none">
        <motion.button
          whileHover={{ scale: 1.15, backgroundColor: "rgba(217, 119, 6, 0.9)" }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:border-amber-500/50 transition-all duration-300 flex items-center justify-center shadow-2xl"
        >
          <FiChevronLeft size={24} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.15, backgroundColor: "rgba(217, 119, 6, 0.9)" }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:border-amber-500/50 transition-all duration-300 flex items-center justify-center shadow-2xl"
        >
          <FiChevronRight size={24} />
        </motion.button>
      </div>

      {/* Elegant Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            className={`relative transition-all duration-500 ${
              currentSlide === index
                ? "w-12 h-1.5 bg-amber-500 rounded-full"
                : "w-8 h-1.5 bg-white/30 hover:bg-white/50 rounded-full"
            }`}
          >
            {currentSlide === index && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 bg-amber-500 rounded-full shadow-lg shadow-amber-500/60"
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Minimal Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.8 }}
        className="absolute bottom-12 right-8 md:right-12 z-20 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-amber-500 to-transparent"></div>
          <span className="text-white/40 text-xs font-light tracking-widest">SCROLL</span>
        </motion.div>
      </motion.div>

      {/* Minimalist Stats Bar - Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-r from-black/60 via-black/40 to-black/60 backdrop-blur-xl border-t border-white/5"
      >
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="grid grid-cols-4 gap-4 md:gap-8">
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-amber-500 mb-1">
                5000+
              </div>
              <div className="text-xs text-gray-400 font-light">
                Sq.ft Facility
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-amber-500 mb-1">
                15+
              </div>
              <div className="text-xs text-gray-400 font-light">
                Years
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-amber-500 mb-1">
                500+
              </div>
              <div className="text-xs text-gray-400 font-light">
                Projects
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-amber-500 mb-1">
                100%
              </div>
              <div className="text-xs text-gray-400 font-light">
                Satisfaction
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroBanner;