"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, Mail, MapPin, Globe, Building2 } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [language, setLanguage] = useState('EN');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Services Dropdown
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

  // Segments Dropdown
  const segments = [
    { name: 'Glass Services', slug: 'glass-services' },
    { name: 'Aluminum and Installation Services', slug: 'aluminum-and-installation-services' }
  ];

  const menuItems = [
    { name: 'Home', link: '/' },
    { name: 'About Us', link: '/about' },
    { name: 'Services', link: '#', hasDropdown: true, type: 'services' }, 
    { name: 'Segments', link: '#', hasDropdown: true, type: 'segments' },
    { name: 'Projects', link: '/projects' },
    { name: 'Gallery', link: '/gallery' },
    { name: 'Careers', link: '/careers' },
    { name: 'Contact Us', link: '/contact' }
  ];

  // Determine which dropdown to show
  const getDropdownItems = (type) => {
    if(type === 'services') return services;
    if(type === 'segments') return segments;
    return [];
  }

  return (
    <>
      {/* Top Bar */}
      <motion.div 
        className="hidden lg:block bg-slate-900 text-white border-b border-amber-600/30 fixed top-0 left-0 right-0 z-50"
        initial={{ y: 0 }}
        animate={{ y: isScrolled ? -60 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="container mx-auto px-4 py-2.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 xl:gap-4 text-xs flex-wrap">
              <div className="flex flex-col items-start min-w-fit">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-amber-500 flex-shrink-0" />
                  <span className="whitespace-nowrap">Abu Dhabi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-amber-500 flex-shrink-0" />
                  <span className="whitespace-nowrap">+971 02 443 9943</span>
                </div>
              </div>
              <div className="h-8 w-px bg-gray-700 hidden xl:block"></div>
              <div className="flex items-center gap-1.5 min-w-fit">
                <Mail className="w-3 h-3 text-amber-500 flex-shrink-0" />
                <span className="whitespace-nowrap truncate max-w-[150px] xl:max-w-none">info@glasscotrade.com</span>
              </div>
              <div className="flex items-center gap-1.5 min-w-fit">
                <Globe className="w-3 h-3 text-amber-500 flex-shrink-0" />
                <span className="whitespace-nowrap truncate max-w-[150px] xl:max-w-none">www.glasscotrade.com</span>
              </div>
              <div className="h-8 w-px bg-gray-700 hidden xl:block"></div>
              <div className="flex items-center gap-1.5 min-w-fit">
                <Building2 className="w-3 h-3 text-amber-500 flex-shrink-0" />
                <span className="whitespace-nowrap">glassco general trading LLC</span>
              </div>
            </div>
            
            {/* Language Switcher */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setLanguage('EN')}
                className={`px-2 py-1 rounded text-xs font-medium transition-all ${language === 'EN' ? 'bg-amber-600 text-white' : 'text-gray-300 hover:text-amber-500'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('AR')}
                className={`px-2 py-1 rounded text-xs font-medium transition-all ${language === 'AR' ? 'bg-amber-600 text-white' : 'text-gray-300 hover:text-amber-500'}`}
              >
                AR
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Navbar */}
      <motion.nav
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'top-0 bg-slate-900/98 backdrop-blur-md shadow-xl py-3 lg:py-4 border-b border-amber-600/20' : 'top-0 lg:top-[60px] bg-slate-900/95 lg:bg-black/50 py-3 lg:py-6'}`}
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between gap-2">
            {/* Logo */}
            <motion.div className="flex items-center gap-2 lg:gap-3 flex-shrink-0" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <div className="relative w-10 h-10 md:w-12 md:h-12 lg:w-24 lg:h-24">
                <img src="/assets/images/glasscoLogo.png" alt="Glassco Logo" className="w-full h-full object-contain"/>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-8">
              {menuItems.map((item, index) => (
                <div key={index} className="relative group" onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)} onMouseLeave={() => setActiveDropdown(null)}>
                  <motion.a
                    href={item.link}
                    className="font-medium transition-all duration-300 flex items-center gap-1 py-2 relative text-white hover:text-amber-500 text-sm xl:text-base whitespace-nowrap"
                    whileHover={{ y: -2 }}
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronDown className="text-sm w-4 h-4" />}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
                  </motion.a>

                  {/* Dropdown */}
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
                            {getDropdownItems(item.type).map((subItem, idx) => (
                              <Link
                                key={idx}
                                href={`/${item.type}/${subItem.slug}`}
                                className="block px-6 py-3 text-gray-300 hover:bg-amber-600/10 hover:text-amber-500 transition-all duration-200 border-l-2 border-transparent hover:border-amber-500 text-sm"
                              >
                                {subItem.name}
                              </Link>
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
              className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 xl:px-6 py-2.5 xl:py-3 rounded-lg font-medium shadow-lg hover:shadow-amber-600/50 transition-all duration-300 border border-amber-500/30 text-sm xl:text-base whitespace-nowrap flex-shrink-0"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(217, 119, 6, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get Quote</span>
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
            </motion.button>

            {/* Mobile Menu Button */}
            <button className="lg:hidden text-white text-2xl p-2 hover:text-amber-500 transition-colors flex-shrink-0" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Spacers */}
      <div className="hidden lg:block h-[120px]"></div>
      <div className="lg:hidden h-[72px]"></div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }} className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-slate-900 z-50 lg:hidden overflow-y-auto shadow-2xl">
              {/* Mobile content same as before */}
              {/* ... keep all existing mobile dropdown and menu logic ... */}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
