"use client"
import React, { useRef } from "react";
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

import PageGlow from "@/components/PageGlow";

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
   
      className="py-20 md:py-28 "
    >
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
            className="inline-block px-4 py-2 bg-amber-600/20 border border-amber-500/30 rounded-full text-amber-400 text-sm font-semibold tracking-wider mb-4"
          >
            WHO WE ARE
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-amber-500">Glassco</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Industry Leading Excellence in{" "}
                <span className="text-amber-500">Aluminium & Glass</span>
              </h3>
              {/* <div className="absolute -left-4 top-0 w-1 h-20 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full"></div> */}
            </div>

            <p className="text-white leading-relaxed text-lg">
              <span className="font-semibold text-white">
                Glassco Aluminium And Glass Workshop LLC
              </span>{" "}
              is a fast-growing, industry-leading company in the UAE with a
              5,000 square feet factory equipped with the latest equipment and
              machinery.
            </p>

            <p className="text-white leading-relaxed">
              We operate across multiple dimensions with professionally
              qualified and experienced employees in the Aluminium & Glass
              sector, delivering premium solutions that combine innovation,
              precision, and reliability.
            </p>

            {/* Specializations */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-amber-500/20">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-500">●</span> Our Specializations
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
                      className="text-amber-500 mt-1 flex-shrink-0"
                      size={16}
                    />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group border border-amber-500/20">
              <img
                src="/assets/images/about-image.png"
                alt="Glassco Factory"
                className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>

              {/* Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute top-6 right-6 bg-gradient-to-br from-amber-500 to-amber-600 text-white px-6 py-3 rounded-xl shadow-lg"
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
                    boxShadow: "0 10px 30px rgba(245, 158, 11, 0.3)",
                  }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6 hover:border-amber-500/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="text-amber-500 text-2xl mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                    <span className="text-amber-500">{stat.suffix}</span>
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
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
              className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-2xl border border-amber-500/20 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4 shadow-lg shadow-amber-500/30">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* MD Message */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-amber-500/20">
            <div className="grid lg:grid-cols-3 gap-0">
              {/* MD Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="relative h-64 lg:h-auto"
              >
                <img
                  src="/assets/images/owner.jpg"
                  alt="Mr. Ajaz Ahmed"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900"></div>
              </motion.div>

              {/* Content */}
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
                    </p>
                    <p>
                      As we continue to grow, we remain committed to
                      sustainability, safety, and customer satisfaction — the
                      true foundation of everything we do at Glassco.
                    </p>
                  </div>

                  {/* Signature */}
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-700/50">
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

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6 text-lg">
            Ready to transform your vision into reality?
          </p>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(245, 158, 11, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold text-lg shadow-xl shadow-amber-500/30 border border-amber-500/30"
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