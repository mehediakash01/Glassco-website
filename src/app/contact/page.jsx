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
import { FaWhatsapp, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

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
      details: ['+971 XX XXX XXXX', '+971 XX XXX XXXX'],
      link: 'tel:+971XXXXXXXX',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <FiMail />,
      title: 'Email',
      details: ['info@glasscotrade.com', 'sales@glasscotrade.com'],
      link: 'mailto:info@glasscotrade.com',
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: <FiMapPin />,
      title: 'Location',
      details: ['Glassco Aluminium & Glass Workshop LLC', 'UAE'],
      link: '#map',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <FiClock />,
      title: 'Working Hours',
      details: ['Saturday - Thursday: 8:00 AM - 6:00 PM', 'Friday: Closed'],
      link: null,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const services = [
    'Aluminum Doors and Windows',
    'Curtain Walls',
    'Spider Glazing',
    'Composite Cladding',
    'Pergolas & Canopy',
    'Automatic Doors',
    'Steel and Metal Decoration',
    'Gates and Boundary Walls',
    'Partition Glazing',
    'Glass Processing',
    'Other'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-amber-50/20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-20 -z-10"></div>

      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-amber-100 rounded-full text-amber-700 text-sm font-semibold tracking-wider mb-4"
          >
            GET IN TOUCH
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Contact <span className="text-amber-600">Us</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-6">
            Have a project in mind? Lets discuss how we can help bring your vision to life with our premium aluminium and glass solutions.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactInfo.map((info, index) => (
            <motion.a
              key={index}
              href={info.link || '#'}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-amber-300 group"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {info.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{info.title}</h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-gray-600 text-sm mb-1">
                  {detail}
                </p>
              ))}
            </motion.a>
          ))}
        </motion.div>

        {/* Main Contact Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100"
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-2">Send us a Message</h3>
            <p className="text-gray-600 mb-8">Fill out the form below and we will get back to you within 24 hours.</p>

            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCheckCircle className="text-green-600 text-4xl" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h4>
                <p className="text-gray-600">Your message has been sent successfully. We will contact you soon.</p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors"
                        placeholder="+971 XX XXX XXXX"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Select */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Service Required *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors bg-white"
                  >
                    <option value="">Select a service</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Details *
                  </label>
                  <div className="relative">
                    <FiMessageSquare className="absolute left-4 top-4 text-gray-400" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your project requirements..."
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-500/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
            className="space-y-8"
          >
            {/* Why Choose Us */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Why Choose Glassco?</h3>
              <div className="space-y-4">
                {[
                  '15+ Years of Industry Experience',
                  '5,000 Sq.ft State-of-the-Art Facility',
                  'Certified & Skilled Professionals',
                  '500+ Successfully Completed Projects',
                  'Premium Quality Materials',
                  '24/7 Customer Support'
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <FiCheckCircle className="text-white text-sm" />
                    </div>
                    <span className="text-gray-200">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Follow Us</h3>
              <p className="text-gray-600 mb-6">Stay connected with us on social media for updates, projects, and more.</p>
              <div className="flex gap-4">
                {[
                  { icon: <FaFacebookF />, color: 'from-blue-600 to-blue-700', link: '#' },
                  { icon: <FaInstagram />, color: 'from-pink-600 to-purple-600', link: '#' },
                  { icon: <FaLinkedinIn />, color: 'from-blue-700 to-blue-800', link: '#' },
                  { icon: <FaWhatsapp />, color: 'from-green-500 to-green-600', link: '#' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-14 h-14 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center text-white text-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-amber-50 rounded-3xl p-8 border-2 border-amber-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Need Immediate Assistance?</h3>
              <p className="text-gray-700 mb-6">Call us directly or send a WhatsApp message for quick response.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  href="tel:+971XXXXXXXX"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold text-center hover:bg-slate-800 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FiPhone />
                  Call Now
                </motion.a>
                <motion.a
                  href="https://wa.me/971XXXXXXXX"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold text-center hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2"
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
        className="border-t border-white/10"
      >
        <div className="h-96 w-full relative">
          {/* Embedded Google Map */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634.8!2d54.481352!3d24.339201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDIwJzIxLjEiTiA1NMKwMjgnNTIuOSJF!5e0!3m2!1sen!2sae!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale hover:grayscale-0 transition-all duration-500"
          ></iframe>
          
          {/* Map Overlay Info */}
          <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-sm">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-2xl"
            >
              <h4 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <FiMapPin className="text-amber-600" />
                Visit Our Workshop
              </h4>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                Glassco Aluminum & Glass Workshop<br />
                Mussaffah 42 - 42 Street<br />
                Musaffah - M42, Abu Dhabi, UAE
              </p>
              <motion.a
                href="https://www.google.com/maps/dir/?api=1&destination=24.339201,54.481352"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full justify-center"
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