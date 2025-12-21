'use client'
import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  FiMapPin, 
  FiClock, 
  FiBriefcase,
  FiDollarSign,
  FiUsers,
  FiAward,
  FiTrendingUp,
  FiHeart,
  FiChevronDown,
  FiSend,
  FiUpload
} from 'react-icons/fi';

const CareersPage = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Glass Installation Technician',
      category: 'technical',
      department: 'Operations',
      location: 'Dubai, UAE',
      type: 'Full-Time',
      experience: '5+ years',
      salary: 'Competitive',
      posted: '2 days ago',
      description: 'We are seeking an experienced glass installation technician to lead our installation team for high-rise commercial projects.',
      responsibilities: [
        'Lead installation teams for commercial glass projects',
        'Ensure quality standards and safety compliance',
        'Read and interpret technical drawings',
        'Coordinate with project managers and clients',
        'Train and mentor junior technicians'
      ],
      requirements: [
        '5+ years experience in glass/aluminum installation',
        'Knowledge of UAE building codes',
        'Ability to work at heights',
        'Valid UAE driving license',
        'Fluent in English (Arabic is a plus)'
      ],
      benefits: [
        'Competitive salary package',
        'Health insurance',
        'Annual leave',
        'Performance bonuses',
        'Career growth opportunities'
      ]
    },
    {
      id: 2,
      title: 'Aluminum Fabrication Engineer',
      category: 'technical',
      department: 'Engineering',
      location: 'Sharjah, UAE',
      type: 'Full-Time',
      experience: '3-5 years',
      salary: 'AED 8,000 - 12,000',
      posted: '5 days ago',
      description: 'Join our engineering team to design and oversee aluminum fabrication projects for residential and commercial clients.',
      responsibilities: [
        'Design aluminum structures and systems',
        'Prepare technical drawings and specifications',
        'Oversee fabrication processes',
        'Conduct quality inspections',
        'Collaborate with project teams'
      ],
      requirements: [
        'Bachelor degree in Mechanical/Civil Engineering',
        '3-5 years relevant experience',
        'Proficiency in AutoCAD and design software',
        'Knowledge of aluminum fabrication techniques',
        'Strong problem-solving skills'
      ],
      benefits: [
        'Medical insurance',
        'Annual bonus',
        'Professional development',
        'Modern work environment',
        'Team building activities'
      ]
    },
    {
      id: 3,
      title: 'Project Manager - Glass & Aluminum',
      category: 'management',
      department: 'Project Management',
      location: 'Abu Dhabi, UAE',
      type: 'Full-Time',
      experience: '7+ years',
      salary: 'AED 15,000 - 20,000',
      posted: '1 week ago',
      description: 'Lead large-scale glass and aluminum projects from conception to completion, ensuring timely delivery and client satisfaction.',
      responsibilities: [
        'Manage multiple projects simultaneously',
        'Coordinate with clients, contractors, and teams',
        'Develop project schedules and budgets',
        'Ensure quality and safety standards',
        'Prepare progress reports and documentation'
      ],
      requirements: [
        'Bachelors degree in Engineering/Construction Management',
        '7+ years project management experience',
        'PMP certification preferred',
        'Strong leadership and communication skills',
        'Experience with construction software'
      ],
      benefits: [
        'Executive compensation package',
        'Company vehicle',
        'Health insurance for family',
        'Performance incentives',
        'Leadership training programs'
      ]
    },
    {
      id: 4,
      title: 'Sales Executive - Glass Solutions',
      category: 'sales',
      department: 'Sales & Marketing',
      location: 'Dubai, UAE',
      type: 'Full-Time',
      experience: '2-4 years',
      salary: 'Base + Commission',
      posted: '3 days ago',
      description: 'Drive sales growth by identifying new business opportunities and maintaining strong client relationships in the glass and aluminum sector.',
      responsibilities: [
        'Generate new business leads',
        'Prepare quotations and proposals',
        'Meet with clients and present solutions',
        'Achieve monthly sales targets',
        'Maintain CRM database'
      ],
      requirements: [
        '2-4 years B2B sales experience',
        'Knowledge of construction industry preferred',
        'Excellent communication skills',
        'Valid UAE driving license',
        'Target-oriented mindset'
      ],
      benefits: [
        'Attractive commission structure',
        'Medical insurance',
        'Mobile allowance',
        'Sales incentives',
        'Career advancement'
      ]
    },
    {
      id: 5,
      title: 'Quality Control Inspector',
      category: 'technical',
      department: 'Quality Assurance',
      location: 'Ajman, UAE',
      type: 'Full-Time',
      experience: '3+ years',
      salary: 'AED 5,000 - 7,000',
      posted: '4 days ago',
      description: 'Ensure all glass and aluminum products meet quality standards through rigorous inspection and testing procedures.',
      responsibilities: [
        'Conduct quality inspections on site and factory',
        'Test materials and finished products',
        'Document inspection reports',
        'Identify and resolve quality issues',
        'Ensure compliance with standards'
      ],
      requirements: [
        '3+ years QC experience in construction',
        'Knowledge of quality standards (ISO, etc.)',
        'Attention to detail',
        'Good documentation skills',
        'Ability to read technical drawings'
      ],
      benefits: [
        'Stable employment',
        'Health insurance',
        'Annual leave',
        'Training opportunities',
        'Safe work environment'
      ]
    },
    {
      id: 6,
      title: 'Administrative Assistant',
      category: 'admin',
      department: 'Administration',
      location: 'Dubai, UAE',
      type: 'Full-Time',
      experience: '1-2 years',
      salary: 'AED 3,500 - 5,000',
      posted: '1 week ago',
      description: 'Support daily office operations and provide administrative assistance to management and project teams.',
      responsibilities: [
        'Handle office correspondence and calls',
        'Maintain filing systems',
        'Schedule appointments and meetings',
        'Prepare documents and reports',
        'Coordinate with vendors and suppliers'
      ],
      requirements: [
        '1-2 years administrative experience',
        'Proficiency in MS Office',
        'Good organizational skills',
        'Fluent in English',
        'Professional appearance and demeanor'
      ],
      benefits: [
        'Competitive salary',
        'Medical insurance',
        'Visa and accommodation allowance',
        'Annual leave',
        'Friendly work environment'
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Positions', count: jobOpenings.length },
    { id: 'technical', label: 'Technical', count: jobOpenings.filter(j => j.category === 'technical').length },
    { id: 'management', label: 'Management', count: jobOpenings.filter(j => j.category === 'management').length },
    { id: 'sales', label: 'Sales & Marketing', count: jobOpenings.filter(j => j.category === 'sales').length },
    { id: 'admin', label: 'Administrative', count: jobOpenings.filter(j => j.category === 'admin').length }
  ];

  const benefits = [
    {
      icon: <FiDollarSign />,
      title: 'Competitive Salary',
      description: 'Market-leading compensation packages with performance bonuses',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <FiHeart />,
      title: 'Health Insurance',
      description: 'Comprehensive medical coverage for you and your family',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: <FiTrendingUp />,
      title: 'Career Growth',
      description: 'Clear advancement paths with training and development programs',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <FiAward />,
      title: 'Recognition',
      description: 'Employee of the month awards and performance incentives',
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: <FiUsers />,
      title: 'Team Culture',
      description: 'Collaborative environment with team building activities',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <FiClock />,
      title: 'Work-Life Balance',
      description: 'Flexible working hours and generous annual leave',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const filteredJobs = activeCategory === 'all' 
    ? jobOpenings 
    : jobOpenings.filter(job => job.category === activeCategory);

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
              JOIN OUR TEAM
            </motion.span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Build Your <span className="text-amber-500">Career</span> With Us
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Join a team of passionate professionals dedicated to excellence in aluminium and glass solutions. We are always looking for talented individuals to grow with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('openings').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold shadow-xl border border-amber-500/30"
              >
                View Open Positions
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold hover:bg-gray-100 transition-all"
              >
                Submit Your CV
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-amber-100 rounded-full text-amber-700 text-sm font-semibold tracking-wider mb-4">
              WHY GLASSCO
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Why Work <span className="text-amber-600">With Us?</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We offer more than just a job – we provide a platform for growth, learning, and success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center text-white text-3xl mb-6`}>
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section id="openings" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-amber-100 rounded-full text-amber-700 text-sm font-semibold tracking-wider mb-4">
              CURRENT OPENINGS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Available <span className="text-amber-600">Positions</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Explore our current job openings and find the perfect role for your skills and ambitions.
            </p>
          </motion.div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-600/30'
                    : 'bg-slate-50 text-gray-700 hover:bg-amber-50 border border-gray-200 hover:border-amber-300'
                }`}
              >
                {category.label}
                <span className={`ml-2 text-sm ${activeCategory === category.id ? 'text-amber-100' : 'text-gray-500'}`}>
                  ({category.count})
                </span>
              </motion.button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white border-2 border-gray-200 hover:border-amber-300 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                        <FiBriefcase size={24} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-3 text-sm">
                          <span className="flex items-center gap-1 text-gray-600">
                            <FiBriefcase size={14} />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1 text-gray-600">
                            <FiMapPin size={14} />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1 text-gray-600">
                            <FiClock size={14} />
                            {job.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">{job.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                        {job.experience}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        {job.salary}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        Posted {job.posted}
                      </span>
                    </div>

                    {selectedJob === job.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-6 pt-6 border-t border-gray-200 space-y-6"
                      >
                        <div>
                          <h4 className="text-lg font-bold text-slate-900 mb-3">Responsibilities:</h4>
                          <ul className="space-y-2">
                            {job.responsibilities.map((resp, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-700">
                                <span className="text-amber-600 mt-1">•</span>
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-lg font-bold text-slate-900 mb-3">Requirements:</h4>
                          <ul className="space-y-2">
                            {job.requirements.map((req, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-700">
                                <span className="text-amber-600 mt-1">•</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-lg font-bold text-slate-900 mb-3">Benefits:</h4>
                          <ul className="space-y-2">
                            {job.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-700">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 lg:ml-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold whitespace-nowrap shadow-lg flex items-center justify-center gap-2"
                    >
                      <FiSend />
                      Apply Now
                    </motion.button>
                    <button
                      onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                      className="px-6 py-3 bg-slate-100 text-slate-900 rounded-xl font-semibold whitespace-nowrap hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                    >
                      {selectedJob === job.id ? 'Hide' : 'View'} Details
                      <motion.div
                        animate={{ rotate: selectedJob === job.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiChevronDown />
                      </motion.div>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Don not See the Right Position?
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                We are always interested in meeting talented professionals. Send us your CV and we will keep you in mind for future opportunities.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(217, 119, 6, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold text-lg shadow-xl border border-amber-500/30 inline-flex items-center gap-2"
              >
                <FiUpload />
                Submit Your CV
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;