"use client"
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FiAward,
  FiUsers,
  FiTrendingUp,
  FiCheckCircle,
  FiTarget,
  FiShield,
} from "react-icons/fi";
import { BsBuilding, BsGear } from "react-icons/bs";

const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const stats = [
    {
      icon: <BsBuilding />,
      value: "5000",
      suffix: "Sq.ft",
      label: "Factory Space",
    },
    { icon: <BsGear />, value: "15", suffix: "+", label: "Years Experience" },
    {
      icon: <FiUsers />,
      value: "50",
      suffix: "+",
      label: "Skilled Professionals",
    },
    {
      icon: <FiAward />,
      value: "500",
      suffix: "+",
      label: "Projects Completed",
    },
  ];

  const features = [
    {
      icon: <FiTarget />,
      title: "Precision Engineering",
      desc: "State-of-the-art equipment ensures exact specifications",
    },
    {
      icon: <FiShield />,
      title: "Quality Assurance",
      desc: "Rigorous testing and international standards compliance",
    },
    {
      icon: <FiTrendingUp />,
      title: "Innovation Driven",
      desc: "Advanced technology meets skilled craftsmanship",
    },
    {
      icon: <FiCheckCircle />,
      title: "Customer Focus",
      desc: "Dedicated to exceeding expectations at every step",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-white overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30 -z-10"></div>

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
            WHO WE ARE
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            About <span className="text-amber-600">Glassco</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Left Column - Company Overview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative">
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Industry Leading Excellence in{" "}
                <span className="text-amber-600">Aluminium & Glass</span>
              </h3>
              <div className="absolute -left-4 top-0 w-1 h-20 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full"></div>
            </div>

            <p className="text-gray-700 leading-relaxed text-lg">
              <span className="font-semibold text-slate-900">
                Glassco Aluminium And Glass Workshop LLC
              </span>{" "}
              is a fast-growing, industry-leading company in the UAE with a
              5,000 square feet factory equipped with the latest equipment and
              machinery.
            </p>

            <p className="text-gray-700 leading-relaxed">
              We operate across multiple dimensions with professionally
              qualified and experienced employees in the Aluminium & Glass
              sector, delivering premium solutions that combine innovation,
              precision, and reliability.
            </p>

            {/* Specializations */}
            <div className="bg-gradient-to-br from-slate-50 to-amber-50 p-6 rounded-2xl border border-amber-100">
              <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-amber-600">●</span> Our Specializations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Aluminium Doors & Windows",
                  "Curtain Walls",
                  "Spider Glazing",
                  "Composite Cladding",
                  "Pergolas & Canopy",
                  "Handrails",
                  "Automatic Doors",
                  "Metal Decoration Works",
                  "Gates & Boundary Walls",
                  "Partition Glazing",
                  "Glass Processing",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                    className="flex items-start gap-2"
                  >
                    <FiCheckCircle
                      className="text-amber-600 mt-1 flex-shrink-0"
                      size={16}
                    />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Image & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Image with Overlay */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="/assets/images/about-image.png"
                alt="Glassco Factory"
                className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>

              {/* Floating Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute top-6 right-6 bg-amber-600 text-white px-6 py-3 rounded-xl shadow-lg"
              >
                <div className="text-2xl font-bold">15+</div>
                <div className="text-xs">Years of Trust</div>
              </motion.div>

              {/* Bottom Text */}
              <div className="absolute bottom-6 left-6 right-6">
                <h4 className="text-white text-xl font-bold mb-2">
                  State-of-the-Art Facility
                </h4>
                <p className="text-gray-300 text-sm">
                  Advanced machinery & skilled professionals
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 30px rgba(217, 119, 6, 0.2)",
                  }}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:border-amber-300 transition-all duration-300 cursor-pointer"
                >
                  <div className="text-amber-600 text-2xl mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">
                    {stat.value}
                    <span className="text-amber-600">{stat.suffix}</span>
                  </div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-200 hover:border-amber-300 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4 shadow-lg">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* MD's Message Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative"
        >
          {/* Decorative Quote Mark */}
          <div className="absolute -top-6 -left-2 text-9xl text-amber-200 font-serif leading-none">
            
          </div>

          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-3 gap-0">
              {/* MD Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="relative h-64 lg:h-auto"
              >
                <img
                  src="/md-image.jpg"
                  alt="Mr. Ajaz Ahmed"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900 lg:bg-gradient-to-r"></div>
              </motion.div>

              {/* MD Message Content */}
              <div className="lg:col-span-2 p-8 md:p-12 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <span className="inline-block px-4 py-2 bg-amber-600/20 rounded-full text-amber-400 text-xs font-semibold tracking-wider mb-4 border border-amber-500/30">
                    MESSAGE FROM MANAGING DIRECTOR
                  </span>

                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Our Vision for Excellence
                  </h3>

                  <div className="space-y-4 text-gray-300 leading-relaxed mb-8">
                    <p>
                      At{" "}
                      <span className="text-amber-400 font-semibold">
                        Glassco Aluminium & Glass Work Shop LLC
                      </span>
                      , our vision is clear — to deliver excellence through
                      precision, innovation, and commitment. Since our founding,
                      we have focused on combining advanced technology with
                      skilled craftsmanship to provide premium aluminium and
                      glass solutions across the UAE.
                    </p>
                    <p>
                      Our success is built on trust, quality, and long-term
                      partnerships. We take pride not only in what we build, but
                      in how we serve — safely, ethically, and efficiently.
                      Whether its a residential project, a commercial façade, or
                      custom fabrication, our team works with dedication to
                      exceed expectations at every step.
                    </p>
                    <p>
                      As we continue to grow, we remain committed to
                      sustainability, safety, and customer satisfaction — the
                      true foundation of everything we do at Glassco.
                    </p>
                  </div>

                  {/* MD Signature */}
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-700">
                    <div className="flex-1">
                      <div className="text-2xl font-bold text-white mb-1">
                        Mr. Ajaz Ahmed
                      </div>
                      <div className="text-amber-400 font-medium">
                        Managing Director
                      </div>
                      <div className="text-gray-400 text-sm">
                        Glassco Aluminium & Glass Workshop LLC
                      </div>
                    </div>
                    <div className="hidden sm:block w-24 h-px bg-gradient-to-r from-amber-500 to-transparent"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6 text-lg">
            Ready to transform your vision into reality?
          </p>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(217, 119, 6, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold text-lg shadow-xl border border-amber-500/30"
          >
            Get in Touch
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
