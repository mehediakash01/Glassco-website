'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiPhone, 
  FiMail, 
  FiMapPin, 
  FiClock,
  FiArrowRight,
  FiSend
} from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', link: '/' },
    { name: 'About Us', link: '/about' },
    { name: 'Services', link: '/services' },
    { name: 'Projects', link: '/projects' },
    { name: 'Gallery', link: '/gallery' },
    { name: 'News & Events', link: '/news' },
    { name: 'Careers', link: '/careers' },
    { name: 'Contact Us', link: '/contact' }
  ];

  const services = [
    { name: 'Aluminum Doors & Windows', link: '/services/aluminum-doors-windows' },
    { name: 'Curtain Walls', link: '/services/curtain-walls' },
    { name: 'Spider Glazing', link: '/services/spider-glazing' },
    { name: 'Composite Cladding', link: '/services/composite-cladding' },
    { name: 'Pergolas & Canopies', link: '/services/pergolas-canopy' },
    { name: 'Automatic Doors', link: '/services/automatic-doors' }
  ];

  const workingHours = [
    { day: 'Saturday - Thursday', time: '8:00 AM - 6:00 PM' },
    { day: 'Friday', time: 'Closed' }
  ];

  return (
    <footer className="relative bg-gradient-to-r from-black to-amber-500/85 text-white ">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
           <div className="w-32 h-32 mx-auto mb-4">
                    <img 
                   src="/assets/images/glassco-logo.png"
                      alt="Glassco Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
              <div className="h-1 w-20 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mb-4"></div>
              <p className="text-white/75 text-sm leading-relaxed">
                Industry-leading aluminium and glass solutions provider in UAE with 15+ years of excellence in delivering premium quality installations.
              </p>
            </div>

            {/* Social Media */}
            <div className="flex gap-3">
              {[
                { icon: <FaFacebookF />, link: '#', color: 'hover:bg-blue-600' },
                { icon: <FaInstagram />, link: '#', color: 'hover:bg-pink-600' },
                { icon: <FaLinkedinIn />, link: '#', color: 'hover:bg-blue-700' },
                { icon: <FaWhatsapp />, link: '#', color: 'hover:bg-green-600' },
                { icon: <FaTwitter />, link: '#', color: 'hover:bg-sky-500' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white ${social.color} transition-all duration-300 border border-white/10`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-amber-500 rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.link}
                    className="text-gray-400 hover:text-amber-500 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <FiArrowRight className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" size={14} />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Our Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-amber-500 rounded-full"></span>
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.link}
                    className="text-white/70 hover:text-amber-500 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <FiArrowRight className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" size={14} />
                    <span>{service.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-amber-500 rounded-full"></span>
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="https://maps.google.com/?q=24.339201,54.481352"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/75 hover:text-amber-500 transition-colors duration-300 group"
                >
                  <FiMapPin className="text-amber-500 mt-1 flex-shrink-0" size={18} />
                  <span className="text-sm leading-relaxed">
                    Glassco Aluminum & Glass Workshop<br />
                    Mussaffah 42 - 42 Street<br />
                    Musaffah - M42<br />
                    Abu Dhabi, UAE
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+971 488 58814"
                  className="flex items-center gap-3 text-white/75 hover:text-amber-500 transition-colors duration-300"
                >
                  <FiPhone className="text-amber-500" size={18} />
                  <span className="text-sm">+971 488 58814</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@glasscotrade.com"
                  className="flex items-center gap-3 text-white/75 hover:text-amber-500 transition-colors duration-300"
                >
                  <FiMail className="text-amber-500" size={18} />
                  <span className="text-sm">info@glasscotrade.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/75">
                  <FiClock className="text-amber-500 mt-1 flex-shrink-0" size={18} />
                  <div className="text-sm">
                    {workingHours.map((schedule, index) => (
                      <div key={index} className="mb-1">
                        <span className="font-medium text-white">{schedule.day}:</span>
                        <br />
                        <span>{schedule.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8 mb-8"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
            <p className="text-white/75 mb-6">Subscribe to our newsletter for latest updates, projects, and exclusive offers.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-amber-600/50 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <FiSend />
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-white/75 text-sm text-center md:text-left">
              © {currentYear} <span className="text-amber-500 font-semibold">Glassco Aluminium & Glass Workshop LLC</span>. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="/privacy-policy" className="text-white/75 hover:text-amber-500 transition-colors duration-300">
                Privacy Policy
              </a>
              <span className="text-gray-600">|</span>
              <a href="/terms-conditions" className="text-white/75 hover:text-amber-500 transition-colors duration-300">
                Terms & Conditions
              </a>
              <span className="text-gray-600">|</span>
              <a href="/sitemap" className="text-white/75 hover:text-amber-500 transition-colors duration-300">
                Sitemap
              </a>
            </div>
          </div>

          {/* Made By */}
          <div className="text-center mt-4 text-xs text-white/75">
            Designed & Developed By <Link href="https://www.royallipstech.com" className='text-blue-400 underline'> Royallips Technologies</Link>
          </div>
        </div>
      </div>

   
    </footer>
  );
};

export default Footer;