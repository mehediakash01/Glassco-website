'use client'
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FiPhone, 
  FiMail, 
  FiMapPin, 
  FiClock,
  FiSend,
  FiUser,
  FiMessageSquare,
  FiCheckCircle
} from 'react-icons/fi';
import { FaWhatsapp, FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutubeSquare, FaTwitterSquare, FaYoutube } from 'react-icons/fa';


const ContactSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: <FiPhone />,
      title: 'Phone',
      details: ['Glassco - +971 02 4439943', 'AMC - +971 2 555 7229'],
      link: 'tel:048858814',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <FiMail />,
      title: 'Email',
      details: ['info@glasscotrade.com', 'info@amccompleteinteriors.com'],
      link: 'mailto:info@glasscotrade.com',
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: <FiMapPin />,
      title: 'Location',
      details: ['Abu Dhabi, UAE (HQ)', 'Dubai, UAE (Branch)'],
      link: '#map',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <FiClock />,
      title: 'Working Hours',
      details: ['mon-sat: 7AM - 6PM', 'Sunday: Closed'],
      link: null,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    }, 3000);
  };

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
    <section ref={sectionRef} className="relative  overflow-x-hidden py-12 sm:py-16 md:py-20 lg:py-28">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-amber-100 rounded-full blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-black rounded-full blur-3xl opacity-20 -z-10"></div>

      {/* FIXED: Changed from w-11/12 to w-full with proper padding */}
      <div className="w-full max-w-full px-3 sm:px-4 md:px-6 lg:px-8 mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16 lg:py-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-500 rounded-full text-amber-700 text-xs sm:text-sm font-semibold tracking-wider mb-3 sm:mb-4"
          >
            GET IN TOUCH
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">
            Contact <span className="text-amber-600">Us</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 px-4">
            Have a project in mind? Lets discuss how we can help bring your vision to life with our premium aluminium and glass solutions.
          </p>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Contact Info Cards - FIXED GRID FOR SMALL SCREENS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 lg:mb-16"
        >
          {contactInfo.map((info, index) => (
            <motion.a
              key={index}
              href={info.link || '#'}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-amber-300 group"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br ${info.color} rounded-lg sm:rounded-xl flex items-center justify-center text-white text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {info.icon}
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-black mb-2 sm:mb-3">{info.title}</h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-gray-600 text-xs sm:text-sm mb-1 break-words">
                  {detail}
                </p>
              ))}
            </motion.a>
          ))}
        </motion.div>

        {/* Main Contact Section */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12 lg:mb-16">
          {/* Contact Form - FIXED FOR SMALL SCREENS */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 border border-gray-100 w-full max-w-full"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-1 sm:mb-2">Send us a Message</h3>
            <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6 md:mb-8">Fill out the form below and we will get back to you within 24 hours.</p>

            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center py-8 sm:py-12"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <FiCheckCircle className="text-green-600 text-3xl sm:text-4xl" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-black mb-2">Thank You!</h4>
                <p className="text-gray-600 text-sm sm:text-base">Your message has been sent successfully. We will contact you soon.</p>
              </motion.div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {/* Name Input */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-amber-500 focus:outline-none transition-colors text-sm sm:text-base"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-amber-500 focus:outline-none transition-colors text-sm sm:text-base"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-amber-500 focus:outline-none transition-colors text-sm sm:text-base"
                        placeholder="+971 XX XXX XXXX"
                      />
                    </div>
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Project Details *
                  </label>
                  <div className="relative">
                    <FiMessageSquare className="absolute left-3 sm:left-4 top-3 sm:top-4 text-gray-400 text-sm sm:text-base" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-amber-500 focus:outline-none transition-colors resize-none text-sm sm:text-base"
                      placeholder="Tell us about your project requirements..."
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-500/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend />
                      Send Message
                    </>
                  )}
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* Right Side - Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-4 sm:space-y-6 lg:space-y-8"
          >
            {/* Why Choose Us */}
            <div className="bg-gradient-to-br from-black to-black rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 text-white">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6">Why Choose Glassco?</h3>
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                {[
                  '20+ Years Experience',
                  '5,000 Sq.ft Facility',
                  'Certified Professionals',
                  '500+ Projects Completed',
                  'Premium Quality',
                  '24/7 Support'
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-2 sm:gap-3"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <FiCheckCircle className="text-white text-xs sm:text-sm" />
                    </div>
                    <span className="text-gray-200 text-xs sm:text-sm md:text-base">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-3 sm:mb-4 md:mb-6">Follow Us</h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 md:mb-6">Stay connected with us on social media.</p>
              <div className="flex gap-2 sm:gap-3 md:gap-4">
                {[
                  { icon: <FaFacebookF />, color: 'from-blue-600 to-blue-700', link: 'https://www.facebook.com/profile.php?id=61585352374632', },
                  { icon: <FaInstagram />, color: 'from-pink-600 to-purple-600', link: 'https://www.instagram.com/glassco.uae/', },
                  { icon: <FaLinkedinIn />, color: 'from-blue-700 to-blue-800', link: 'https://www.linkedin.com/in/glassco-aluminium-and-glass-workshop-llc-753374374/', },
                  { icon: <FaYoutube />, link: 'https://www.youtube.com/@GlasscoAluminiumGlassWorkshop', color: 'from-red-600 to-red-600 hover:bg-red-600' },
                                 { icon: <FaTwitter />, link: 'https://x.com/glassco_uae', color: 'from-sky-600 to-sky-700 hover:bg-sky-500' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br ${social.color} rounded-lg sm:rounded-xl flex items-center justify-center text-white text-base sm:text-lg md:text-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-amber-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border-2 border-amber-200">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-2 sm:mb-3 md:mb-4">Need Immediate Assistance?</h3>
              <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 md:mb-6">Call us directly or send a WhatsApp message.</p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <motion.a
                  href="tel:048858814"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-black text-white rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm text-center hover:bg-black transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FiPhone />
                  Call Now
                </motion.a>
                <motion.a
                  href="https://wa.me/+971255572229"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-green-600 text-white rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm text-center hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaWhatsapp />
                  WhatsApp
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Google Maps Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-white/10 w-full max-w-full"
        >
          <div className="h-64 sm:h-80 md:h-96 w-full relative overflow-hidden rounded-xl sm:rounded-2xl">
            {/* Embedded Google Map */}
            <iframe
              src="https://www.google.com/maps?q=Glassco+Aluminum+%26+Glass+Workshop,+Abu+Dhabi&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            ></iframe>
            
            {/* Map Overlay Info */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 md:left-auto md:right-6 md:max-w-sm">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-2xl"
              >
                <h4 className="text-base sm:text-lg md:text-xl font-bold text-black mb-2 sm:mb-3 flex items-center gap-2">
                  <FiMapPin className="text-amber-600" />
                  Visit Our Workshop
                </h4>
                <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                  Glassco Aluminum & Glass Workshop<br />
                
                 Mussaffah 42 - 42 Street - Musaffah - M42 - Abu Dhabi - United Arab Emirates
                </p>
                <motion.a
                  href="https://www.google.com/maps/place/Glassco+Aluminum+%26+Glass+Workshop/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-300 w-full justify-center"
                >
                  <FiMapPin />
                  Get Directions
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;