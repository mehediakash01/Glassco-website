"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';
import { BsBuilding, BsGlobe } from 'react-icons/bs';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [language, setLanguage] = useState('EN');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { name: 'Aluminum doors and windows', slug: 'aluminum-doors-windows' },
    { name: 'Curtain walls', slug: 'curtain-walls' },
    { name: 'Spider glazing', slug: 'spider-glazing' },
    { name: 'Composite cladding', slug: 'composite-cladding' },
    { name: 'Pergolas & canopy', slug: 'pergolas-canopy' },
    { name: 'Automatic doors', slug: 'automatic-doors' },
    { name: 'Steel and metal decoration works', slug: 'steel-metal-decoration' },
    { name: 'Gates and boundary walls', slug: 'gates-boundary-walls' },
    { name: 'Partition glazing', slug: 'partition-glazing' },
    { name: 'Glass processing', slug: 'glass-processing' }
  ];

  const menuItems = [
    { name: 'Home', link: '/' },
    { name: 'About Us', link: '/about' },
    { name: 'Services', link: '#', hasDropdown: true }, 
    { name: 'Projects', link: '/projects' },
    { name: 'Gallery', link: '/gallery' },
    { name: 'Careers', link: '/careers' },
    { name: 'Contact Us', link: '/contact' }
  ];

  return (
    <>
      {/* Top Bar with Gold Accent */}
      <motion.div 
        className="bg-slate-900 text-white py-2.5 px-4 border-b border-amber-600/30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center gap-4 text-xs">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                <FiMapPin className="w-3 h-3 text-amber-500" />
                <span>Abu Dhabi</span>
              </div>
              <div className="flex items-center gap-2 ">
                <FiPhone className="w-3 h-3 text-amber-500" />
                <span>+971 02 443 9943</span>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <FiMail className="w-3 h-3 text-amber-500" />
              <span>info@glasscotrade.com</span>
            </div>
            <div className="flex items-center gap-2">
              <BsGlobe className="w-3 h-3 text-amber-500" />
              <span>www.glasscotrade.com</span>
            </div>
            <div className="h-8 w-px bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <BsBuilding className="w-3 h-3 text-amber-500" />
              <span>glassco general trading LLC</span>
            </div>
          </div>
      </motion.div>

      {/* Main Navbar - Transparent Overlay */}
      <motion.nav
        className={`fixed top-[42px] md:top-[48px] left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-slate-900/95 backdrop-blur-md shadow-xl py-4 border-b border-amber-600/20' 
            : 'bg-transparent py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative">
                <div className="text-3xl md:text-4xl font-bold tracking-tight">
                  <span className="text-white">GLASS</span>
                  <span className="text-amber-500">CO</span>
                </div>
                <div className="h-0.5 w-full bg-gradient-to-r from-amber-500 to-transparent mt-1"></div>
              </div>
              <div className="hidden lg:block text-xs text-gray-300 ml-2 border-l border-amber-600/30 pl-3">
                Aluminium & Glass<br/>
                <span className="text-amber-500">Workshop LLC</span>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              {menuItems.map((item, index) => (
                <div 
                  key={index}
                  className="relative group"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <motion.a
                    href={item.link}
                    className={`font-medium transition-all duration-300 flex items-center gap-1 py-2 relative ${
                      isScrolled ? 'text-white hover:text-amber-500' : 'text-white hover:text-amber-400'
                    }`}
                    whileHover={{ y: -2 }}
                  >
                    {item.name}
                    {item.hasDropdown && <FiChevronDown className="text-sm" />}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
                  </motion.a>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && (
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-4 w-80 bg-slate-900/98 backdrop-blur-lg shadow-2xl rounded-lg overflow-hidden border border-amber-600/20"
                        >
                          <div className="py-3">
                            <motion.a
                              href="/services"
                              className="block px-6 py-3 text-amber-400 hover:bg-amber-600/10 font-semibold transition-all duration-200 border-l-2 border-amber-500"
                              whileHover={{ x: 5 }}
                            >
                              <span className="text-sm">View All Services</span>
                            </motion.a>
                            <div className="border-t border-gray-700 my-2"></div>
                            {services.map((service, idx) => (
                              <motion.a
                                key={idx}
                                href={`/services/${service.slug}`}
                                className="block px-6 py-3 text-gray-300 hover:bg-amber-600/10 hover:text-amber-500 transition-all duration-200 border-l-2 border-transparent hover:border-amber-500"
                                whileHover={{ x: 5 }}
                              >
                                <span className="text-sm">{service.name}</span>
                              </motion.a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <motion.button
              className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-amber-600/50 transition-all duration-300 border border-amber-500/30"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(217, 119, 6, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get Quote</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white text-2xl p-2 hover:text-amber-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-slate-900 z-50 lg:hidden overflow-y-auto shadow-2xl"
            >
              <div className="p-6">
                {/* Close Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-6 right-6 text-white text-2xl hover:text-amber-500 transition-colors"
                >
                  <FiX />
                </button>

                {/* Logo */}
                <div className="mb-8 mt-2">
                  <div className="text-2xl font-bold">
                    <span className="text-white">GLASS</span>
                    <span className="text-amber-500">CO</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Aluminium & Glass Workshop</div>
                </div>

                {/* Menu Items */}
                {menuItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-800 last:border-0">
                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {item.hasDropdown ? (
                        <div>
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                            className="w-full flex items-center justify-between py-4 text-white font-medium hover:text-amber-500 transition-colors"
                          >
                            {item.name}
                            <motion.div
                              animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <FiChevronDown />
                            </motion.div>
                          </button>
                          <AnimatePresence>
                            {activeDropdown === item.name && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden bg-slate-800/50 rounded-lg mb-3"
                              >
                                <Link
                                  href="/services"
                                  className="block px-4 py-3 text-sm text-amber-400 hover:text-amber-500 hover:bg-amber-600/10 transition-colors border-l-2 border-amber-500 font-semibold"
                                >
                                  View All Services
                                </Link>
                                <div className="border-t border-gray-700 mx-4 my-2"></div>
                                {services.map((service, idx) => (
                                  <a
                                    key={idx}
                                    href={`/services/${service.slug}`}
                                    className="block px-4 py-3 text-sm text-gray-300 hover:text-amber-500 hover:bg-amber-600/10 transition-colors border-l-2 border-transparent hover:border-amber-500"
                                  >
                                    {service.name}
                                  </a>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <a
                          href={item.link}
                          className="block py-4 text-white font-medium hover:text-amber-500 transition-colors"
                        >
                          {item.name}
                        </a>
                      )}
                    </motion.div>
                  </div>
                ))}

                {/* CTA Button - Mobile */}
                <motion.button
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg mt-6 border border-amber-500/30"
                  whileTap={{ scale: 0.95 }}
                >
                  Get Quote
                </motion.button>

                {/* Social Links - Mobile */}
                <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-gray-800">
                  <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                    <FaFacebookF size={18} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                    <FaInstagram size={18} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                    <FaLinkedinIn size={18} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                    <FaWhatsapp size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;