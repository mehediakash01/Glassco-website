"use client";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Globe,
  Building2,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link";
import PDFViewerButton from "./PdfViewerButton";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [language, setLanguage] = useState("EN");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Segments Dropdown
  const segments = [
    { name: "Glass Services", slug: "glass-services" },
    {
      name: "Aluminum and Installation Services",
      slug: "aluminum-and-installation-services",
    },
  ];

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "Segments", link: "#", hasDropdown: true, type: "segments" },
    { name: "Projects", link: "/projects" },
    { name: "Gallery", link: "/gallery" },
    { name: "Careers", link: "/careers" },
    { name: "Contact Us", link: "/contact" },
  ];

  const getDropdownItems = (type) => {
    if (type === "segments") return segments;
    return [];
  };

  return (
    <>
      {/* Top Bar - Hidden on mobile, slides up on scroll for desktop */}
      <div
        className={`hidden lg:block bg-black text-white border-b border-amber-600/30 fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          isScrolled ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-center flex-wrap gap-2">
            <div className="flex items-center gap-2 xl:gap-4 text-xs flex-wrap">
              <div className="flex flex-col items-start min-w-fit">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-amber-500 flex-shrink-0" />
                  <span className="whitespace-nowrap">Abu Dhabi</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-300">
                  <Phone className="w-3 h-3 text-amber-500 flex-shrink-0" />
                  <span>Glassco - +971 02 4439943</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-300">
                  <Phone className="w-3 h-3 text-amber-500 flex-shrink-0" />
                  <span>AMC - +971 2 555 7229</span>
                </div>
              </div>
              <div className="h-8 w-px bg-gray-700 hidden xl:block"></div>
              <div className="flex items-center gap-1.5 min-w-fit">
                <Mail className="w-3 h-3 text-amber-500 flex-shrink-0" />
                <span className="whitespace-nowrap truncate max-w-[150px] xl:max-w-none">
                  info@glasscotrade.com
                </span>
              </div>
              <div className="flex items-center gap-1.5 min-w-fit">
                <Globe className="w-3 h-3 text-amber-500 flex-shrink-0" />
                <Link
                  href="https://amccompleteinteriors.com/"
                  className="whitespace-nowrap truncate max-w-[150px] xl:max-w-none"
                  target="_blank"
                >
                  www.amccompleteinteriors.com
                </Link>
              </div>
              <div className="h-8 w-px bg-gray-700 hidden xl:block"></div>
              <div className="flex items-center gap-1.5 min-w-fit">
                <Building2 className="w-3 h-3 text-amber-500 flex-shrink-0" />
                <span className="whitespace-nowrap">
                  glassco general trading LLC
                </span>
              </div>
            </div>

            {/* Language Switcher */}
            {/* <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setLanguage('EN')}
                className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                  language === 'EN' ? 'bg-amber-600 text-white' : 'text-gray-300 hover:text-amber-500'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('AR')}
                className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                  language === 'AR' ? 'bg-amber-600 text-white' : 'text-gray-300 hover:text-amber-500'
                }`}
              >
                AR
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`fixed left-0 right-0 z-40 transition-all duration-300 w-full lg:px-32 ${
          isScrolled
            ? "top-0 bg-gradient-to-r from-black to-amber-500/75 backdrop-blur-md shadow-xl py-2 lg:py-2 border-b border-amber-600/20"
            : "top-0 lg:top-[48px] bg-gradient-to-r from-black to-amber-500/75 lg:bg-transparent py-2 "
        }`}
      >
        <div className="w-full max-w-full px-2 sm:px-3 md:px-4 mx-auto">
          <div className="flex items-center justify-between gap-1 sm:gap-2">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0 hover:scale-105 transition-transform duration-200">
              <Link
                href="/"
                className="relative w-14 h-14 xs:w-16 xs:h-16 sm:w-16 sm:h-16 md:w-14 md:h-14 lg:w-24 lg:h-20"
              >
                <img
                  src="/assets/images/glassco-logo.png"
                  alt="Glassco Logo"
                  className="w-full h-full object-contain"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-6">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() =>
                    item.hasDropdown && setActiveDropdown(item.name)
                  }
                  onMouseLeave={() =>
                    item.hasDropdown && setActiveDropdown(null)
                  }
                >
                  {item.hasDropdown ? (
                    <button className="font-medium transition-all duration-300 flex items-center gap-1 py-2 relative text-white hover:text-amber-500 text-sm xl:text-base whitespace-nowrap hover:-translate-y-0.5">
                      {item.name}
                      <ChevronDown
                        className={`text-sm w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
                    </button>
                  ) : (
                    <Link href={item.link}>
                      <span className="font-medium transition-all duration-300 flex items-center gap-1 py-2 relative text-white hover:text-amber-500 text-sm xl:text-base whitespace-nowrap cursor-pointer hover:-translate-y-0.5 inline-block">
                        {item.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </Link>
                  )}

                  {/* Dropdown Menu - FIXED */}
                  {item.hasDropdown && (
                    <div
                      className={`absolute top-full left-0 mt-2 w-80 bg-black backdrop-blur-lg shadow-2xl rounded-lg overflow-hidden border border-amber-600/20 transition-all duration-200 ${
                        activeDropdown === item.name
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      <div className="py-2">
                        {getDropdownItems(item.type).map((subItem, idx) => (
                          <Link
                            key={idx}
                            href={`/segments/${subItem.slug}`}
                            className="block px-6 py-3 text-gray-300 hover:bg-amber-600/10 hover:text-amber-500 transition-all duration-200 border-l-2 border-transparent hover:border-amber-500"
                          >
                            <span className="text-sm">{subItem.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button - Desktop */}
        
           <span className="hidden lg:block">
   <PDFViewerButton></PDFViewerButton>
           </span>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white text-xl sm:text-2xl p-1.5 sm:p-2 hover:text-amber-500 transition-colors flex-shrink-0 z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-[60px] xs:h-[64px] sm:h-[64px] lg:h-[2px]"></div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div
            className={`fixed top-0 right-0 bottom-0 w-[280px] xs:w-[300px] sm:w-80 max-w-[85vw] bg-black z-50 lg:hidden overflow-y-auto shadow-2xl transition-transform duration-300 ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-4 sm:p-6">
              {/* Close Button */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-4 sm:top-6 right-4 sm:right-6 text-white text-xl sm:text-2xl hover:text-amber-500 transition-colors"
              >
                <X />
              </button>

              {/* Logo */}
              <div className="mb-6 sm:mb-8 mt-2">
                <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-3 sm:mb-4">
                  <img
                    src="/assets/images/glassco-logo.png"
                    alt="Glassco Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center text-[10px] sm:text-xs text-gray-400">
                  Aluminium & Glass Workshop LLC
                </div>
              </div>

              {/* Contact Info - Mobile */}
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-black rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-300">
                  <MapPin className="w-3 h-3 text-amber-500 flex-shrink-0" />
                  <span>Abu Dhabi</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-300">
                  <Phone className="w-3 h-3 text-amber-500 flex-shrink-0" />
                  <span>Glassco - +971 02 4439943</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-300">
                  <Phone className="w-3 h-3 text-amber-500 flex-shrink-0" />
                  <span>AMC - +971 2 555 7229</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-300 break-all">
                  <Mail className="w-3 h-3 text-amber-500 flex-shrink-0" />
                  <span>info@glasscotrade.com</span>
                </div>
                <div className="flex items-center text-white gap-1.5 min-w-fit">
                  <Globe className="w-3 h-3 text-amber-500 flex-shrink-0" />
                  <Link
                    href="https://amccompleteinteriors.com/"
                    className="whitespace-nowrap truncate text-xs xl:max-w-none"
                    target="_blank"
                  >
                    www.amccompleteinteriors.com
                  </Link>
                </div>
              </div>

              {/* Menu Items */}
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-gray-800 last:border-0"
                >
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === item.name ? null : item.name
                          )
                        }
                        className="w-full flex items-center justify-between py-3 sm:py-4 text-sm sm:text-base text-white font-medium hover:text-amber-500 transition-colors"
                      >
                        {item.name}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden bg-black rounded-lg mb-3 transition-all duration-200 ${
                          activeDropdown === item.name
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        {getDropdownItems(item.type).map((subItem, idx) => (
                          <Link
                            key={idx}
                            href={`/segments/${subItem.slug}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-300 hover:text-amber-500 hover:bg-amber-600/10 transition-colors border-l-2 border-transparent hover:border-amber-500"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.link}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 sm:py-4 text-sm sm:text-base text-white font-medium hover:text-amber-500 transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Language Switcher - Mobile */}
              {/* <div className="flex items-center gap-2 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-800">
                <span className="text-[10px] sm:text-xs text-gray-400">Language:</span>
                <button
                  onClick={() => setLanguage('EN')}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded text-[10px] sm:text-xs font-medium transition-all ${
                    language === 'EN' ? 'bg-amber-600 text-white' : 'text-gray-300 hover:text-amber-500'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('AR')}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded text-[10px] sm:text-xs font-medium transition-all ${
                    language === 'AR' ? 'bg-amber-600 text-white' : 'text-gray-300 hover:text-amber-500'
                  }`}
                >
                  AR
                </button>
              </div> */}

              {/* CTA Button - Mobile */}
          <PDFViewerButton></PDFViewerButton>

              {/* Social Links - Mobile */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-800">
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  <FaFacebookF size={16} className="sm:w-[18px] sm:h-[18px]" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  <FaInstagram size={16} className="sm:w-[18px] sm:h-[18px]" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  <FaLinkedinIn size={16} className="sm:w-[18px] sm:h-[18px]" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  <FaWhatsapp size={16} className="sm:w-[18px] sm:h-[18px]" />
                </a>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;
