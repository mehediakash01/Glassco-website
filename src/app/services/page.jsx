'use client'
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FiArrowRight, 
  FiCheckCircle, 
  FiLayers,
  FiGrid,
  FiBox,
  FiHome,
  FiZap,
  FiSettings,
  FiLock,
  FiMaximize2,
  FiTool
} from 'react-icons/fi';
import { BsDoorOpen, BsBuilding, BsGrid3X3Gap } from 'react-icons/bs';

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState('all');

  const services = [
    {
      id: 1,
      icon: <BsDoorOpen />,
      title: 'Aluminum Doors and Windows',
      category: 'aluminum',
      description: 'High-performance aluminium doors and windows designed for durability, insulation, and aesthetic appeal with premium-grade profiles.',
      features: ['Weather Resistant', 'Thermal Efficiency', 'Custom Designs', 'High Security'],
      image: '/services/aluminum-windows.jpg'
    },
    {
      id: 2,
      icon: <BsBuilding />,
      title: 'Curtain Walls',
      category: 'glazing',
      description: 'Architectural elegance with superior engineering. Maximize natural light while maintaining structural integrity and energy efficiency.',
      features: ['Structural Glazing', 'Energy Efficient', 'Weatherproofing', 'Modern Aesthetics'],
      image: '/services/curtain-walls.jpg'
    },
    {
      id: 3,
      icon: <BsGrid3X3Gap />,
      title: 'Spider Glazing',
      category: 'glazing',
      description: 'Seamless all-glass look using high-grade stainless steel spider fittings for maximum transparency and modern appeal.',
      features: ['Point-Load System', 'Maximum Transparency', 'Wind Load Resistant', 'Premium Fittings'],
      image: '/services/spider-glazing.jpg'
    },
    {
      id: 4,
      icon: <FiLayers />,
      title: 'Composite Cladding',
      category: 'cladding',
      description: 'Contemporary appearance with insulation, fire safety, and weather resistance. Wide range of colors and textures available.',
      features: ['Fire Resistant', 'Weather Protection', 'Lightweight', 'Easy Installation'],
      image: '/services/composite-cladding.jpg'
    },
    {
      id: 5,
      icon: <FiHome />,
      title: 'Pergolas & Canopies',
      category: 'outdoor',
      description: 'Premium outdoor structures adding style, shade, and protection with durable aluminium and optional glass roofing.',
      features: ['Custom Designs', 'Durable Structure', 'Weather Resistant', 'Elegant Finish'],
      image: '/services/pergolas.jpg'
    },
    {
      id: 6,
      icon: <FiZap />,
      title: 'Automatic Doors',
      category: 'automation',
      description: 'Advanced automatic door systems with precision sensors and robust motors for smooth, quiet, and reliable operation.',
      features: ['Sensor Technology', 'Smooth Operation', 'High Safety', 'Low Maintenance'],
      image: '/services/automatic-doors.jpg'
    },
    {
      id: 7,
      icon: <FiSettings />,
      title: 'Steel and Metal Decoration',
      category: 'metalwork',
      description: 'Custom steel and metal decorative works including railings, screens, and architectural accents with precision craftsmanship.',
      features: ['Custom Fabrication', 'Artistic Design', 'Premium Finish', 'Corrosion Resistant'],
      image: '/services/metal-decoration.jpg'
    },
    {
      id: 8,
      icon: <FiLock />,
      title: 'Gates and Boundary Walls',
      category: 'metalwork',
      description: 'Strong and stylish gate systems with optional automation. Corrosion-resistant and designed for smooth operation.',
      features: ['Security First', 'Automation Ready', 'Weather Proof', 'Premium Materials'],
      image: '/services/gates.jpg'
    },
    {
      id: 9,
      icon: <FiMaximize2 />,
      title: 'Partition Glazing',
      category: 'glazing',
      description: 'Modern glass partition systems for offices and homes. Improve space efficiency while maintaining light flow and acoustic comfort.',
      features: ['Space Efficient', 'Acoustic Comfort', 'Privacy Options', 'Modern Look'],
      image: '/services/partition-glazing.jpg'
    },
    {
      id: 10,
      icon: <FiTool />,
      title: 'Glass Processing',
      category: 'processing',
      description: 'Comprehensive glass processing including cutting, tempering, lamination, and insulated glass production with strict quality standards.',
      features: ['Precision Cutting', 'Tempering', 'Lamination', 'Quality Assured'],
      image: '/services/glass-processing.jpg'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Services', count: services.length },
    { id: 'aluminum', label: 'Aluminum Works', count: services.filter(s => s.category === 'aluminum').length },
    { id: 'glazing', label: 'Glazing Systems', count: services.filter(s => s.category === 'glazing').length },
    { id: 'metalwork', label: 'Metal Works', count: services.filter(s => s.category === 'metalwork').length },
    { id: 'outdoor', label: 'Outdoor Solutions', count: services.filter(s => s.category === 'outdoor').length }
  ];

  const filteredServices = activeTab === 'all' 
    ? services 
    : services.filter(service => service.category === activeTab);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-amber-50/30 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10"></div>

      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-amber-100 rounded-full text-amber-700 text-sm font-semibold tracking-wider mb-4"
          >
            WHAT WE DO
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our <span className="text-amber-600">Services</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-6">
            Comprehensive aluminium and glass solutions tailored to your project needs with precision engineering and expert craftsmanship.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === category.id
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-600/30'
                  : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200 hover:border-amber-300'
              }`}
            >
              {category.label}
              <span className={`ml-2 text-sm ${activeTab === category.id ? 'text-amber-100' : 'text-gray-500'}`}>
                ({category.count})
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              layout
              whileHover={{ y: -10 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-amber-300"
            >
              {/* Service Image */}
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl text-amber-500/20">
                    {service.icon}
                  </div>
                </div>
                
                {/* Icon Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  className="absolute top-4 left-4 w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg z-20"
                >
                  {service.icon}
                </motion.div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-amber-600/0 group-hover:bg-amber-600/10 transition-all duration-500 z-10"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                      <FiCheckCircle className="text-amber-600 flex-shrink-0" size={14} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-amber-600 font-semibold hover:gap-3 transition-all duration-300 group"
                >
                  Learn More
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>

              {/* Bottom Accent Line */}
              <div className="h-1 bg-gradient-to-r from-amber-500 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 md:p-16 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Can not Find What You are Looking For?
              </h3>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                We offer custom solutions tailored to your specific needs. Contact us to discuss your project requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(217, 119, 6, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold text-lg shadow-xl border border-amber-500/30 inline-flex items-center justify-center gap-2"
                >
                  Request Custom Quote
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent text-white rounded-xl font-semibold text-lg border-2 border-white/30 hover:border-amber-500 hover:bg-white/5 transition-all duration-300"
                >
                  View All Projects
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: '10+', label: 'Services Offered' },
            { number: '500+', label: 'Projects Completed' },
            { number: '100%', label: 'Quality Guaranteed' },
            { number: '24/7', label: 'Support Available' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="bg-white rounded-2xl p-6 text-center border border-gray-200 hover:border-amber-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;