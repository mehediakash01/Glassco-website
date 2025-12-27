'use client'
import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiZoomIn, FiDownload } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const GalleryPage = () => {
  const router = useRouter();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Your 15 images from public/assets/gallery
  const localImages = [
    '/assets/gellary/IMG_4424.JPG',
    '/assets/gellary/IMG_4443.JPG',
    '/assets/gellary/IMG_4455.JPG',
    '/assets/gellary/IMG_4459.JPG',
    '/assets/gellary/IMG_4487.JPG',
    '/assets/gellary/IMG_4490.JPG',
    '/assets/gellary/IMG_4507.JPG',
    '/assets/gellary/IMG_4517.JPG',
    '/assets/gellary/IMG_4521.JPG',
    '/assets/gellary/IMG_4575.JPG',
    '/assets/gellary/IMG_4527.JPG',
    '/assets/gellary/IMG_4528.JPG',
    '/assets/gellary/IMG_4529.JPG',
    '/assets/gellary/IMG_4534.JPG',
    '/assets/gellary/IMG_4552.JPG',
  ];

  const galleryImages = [
    // Aluminum Doors & Windows (images 0-3)
    { id: 1, category: 'aluminum', title: 'Modern Aluminum Windows', location: 'Dubai Marina', image: localImages[0] },
    { id: 2, category: 'aluminum', title: 'Premium Door Installation', location: 'Abu Dhabi', image: localImages[1] },
    { id: 3, category: 'aluminum', title: 'Thermal Efficient Windows', location: 'Sharjah', image: localImages[2] },
    
    // Curtain Walls (images 3-6)
    { id: 4, category: 'curtain-walls', title: 'Glass Facade Tower', location: 'Dubai', image: localImages[3] },
    { id: 5, category: 'curtain-walls', title: 'Commercial Building Facade', location: 'Abu Dhabi', image: localImages[4] },
    { id: 6, category: 'curtain-walls', title: 'Structural Glazing', location: 'Sharjah', image: localImages[5] },
    
    // Spider Glazing (images 6-9)
    { id: 7, category: 'spider-glazing', title: 'Entrance Spider Glass', location: 'Dubai Mall', image: localImages[6] },
    { id: 8, category: 'spider-glazing', title: 'Atrium Glass Installation', location: 'Abu Dhabi', image: localImages[7] },
    { id: 9, category: 'spider-glazing', title: 'Point-Fixed Glazing', location: 'Sharjah', image: localImages[8] },
    
    // Pergolas & Canopies (images 9-11)
    { id: 10, category: 'pergolas', title: 'Outdoor Pergola Design', location: 'Palm Jumeirah', image: localImages[9] },
    { id: 11, category: 'pergolas', title: 'Restaurant Canopy', location: 'Dubai Marina', image: localImages[10] },
    { id: 12, category: 'pergolas', title: 'Villa Garden Pergola', location: 'Al Ain', image: localImages[11] },
    
    // Gates & Metalwork (images 12-14)
    { id: 13, category: 'gates', title: 'Automated Main Gate', location: 'Dubai Hills', image: localImages[12] },
    { id: 14, category: 'gates', title: 'Decorative Metal Gate', location: 'Abu Dhabi', image: localImages[13] },
    { id: 15, category: 'gates', title: 'Boundary Wall Design', location: 'Sharjah', image: localImages[14] },
  ];

  const categories = [
    { id: 'all', label: 'All Images', count: galleryImages.length },
    { id: 'aluminum', label: 'Aluminum Works', count: galleryImages.filter(img => img.category === 'aluminum').length },
    { id: 'curtain-walls', label: 'Curtain Walls', count: galleryImages.filter(img => img.category === 'curtain-walls').length },
    { id: 'spider-glazing', label: 'Spider Glazing', count: galleryImages.filter(img => img.category === 'spider-glazing').length },
    { id: 'pergolas', label: 'Pergolas & Canopies', count: galleryImages.filter(img => img.category === 'pergolas').length },
    { id: 'gates', label: 'Gates & Metalwork', count: galleryImages.filter(img => img.category === 'gates').length },
  ];

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(image => image.category === activeCategory);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  const handleDownload = () => {
    if (selectedImage) {
      const link = document.createElement('a');
      link.href = selectedImage.image;
      link.download = `${selectedImage.title}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-2 bg-amber-600/20 backdrop-blur-sm border border-amber-500/30 rounded-full text-amber-400 text-sm font-semibold tracking-wider mb-4"
            >
              PROJECT GALLERY
            </motion.span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our <span className="text-amber-500">Work Gallery</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore our portfolio of premium aluminium and glass installations across the UAE. Each project showcases our commitment to quality, innovation, and excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
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
                    : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200 hover:border-amber-300 shadow-sm'
                }`}
              >
                {category.label}
                <span className={`ml-2 text-sm ${activeCategory === category.id ? 'text-amber-100' : 'text-gray-500'}`}>
                  ({category.count})
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Image Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="wait">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  variants={itemVariants}
                  layout
                  onClick={() => openLightbox(image, index)}
                  className="group relative aspect-square bg-slate-900 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  {/* Image */}
                  <img
                    src={image.image}
                    alt={image.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>
                  
                  {/* Hover Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center shadow-xl transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <FiZoomIn className="text-white text-2xl" />
                    </div>
                  </div>

                  {/* Image Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                    <h3 className="text-white font-bold text-lg mb-1">{image.title}</h3>
                    <p className="text-amber-400 text-sm">{image.location}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-gray-400 text-6xl mb-4">📷</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No Images Found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl transition-colors z-10"
            >
              <FiX />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl transition-colors z-10"
            >
              <FiChevronLeft />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl transition-colors z-10"
            >
              <FiChevronRight />
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-6xl w-full"
            >
              {/* Image */}
              <div className="bg-slate-900 rounded-2xl overflow-hidden mb-4">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full max-h-[70vh] object-contain"
                />
              </div>

              {/* Image Info */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{selectedImage.title}</h3>
                    <p className="text-amber-400">{selectedImage.location}</p>
                  </div>
                  <button 
                    onClick={handleDownload}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <FiDownload />
                    Download
                  </button>
                </div>
                <div className="text-sm text-gray-300 mt-4">
                  Image {currentImageIndex + 1} of {filteredImages.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Inspired by Our Work?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Lets create something exceptional for your project. Contact us today for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => router.push('/contact')}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(217, 119, 6, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold text-lg shadow-xl border border-amber-500/30"
              >
                Request a Quote
              </motion.button>
              <motion.button
                onClick={() => router.push('/projects')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all"
              >
                View All Projects
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;