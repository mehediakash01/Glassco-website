'use client'
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FiCheckCircle, 
  FiArrowRight,
  FiAward,
  FiShield,
  FiTool,
  FiZap,
  FiSettings,
  FiLock,
  FiMaximize2
} from 'react-icons/fi';
import { BsDoorOpen, BsBuilding, BsGrid3X3Gap } from 'react-icons/bs';
import { notFound, useParams } from 'next/navigation';

// Service data - matches your navbar
const servicesData = {
  'aluminum-doors-windows': {
    title: 'Aluminum Doors and Windows',
    icon: <BsDoorOpen />,
    tagline: 'PREMIUM QUALITY',
    heroImage: '/services/detail/aluminum-hero.jpg',
    description: 'Glassco specializes in manufacturing high-performance aluminium doors and windows designed for durability, insulation, and aesthetic appeal. Using premium-grade profiles and advanced fabrication systems, we deliver solutions that ensure smooth functionality, weather resistance, and long-lasting performance.',
    fullDescription: 'Our products enhance modern architecture with sleek designs, high security, and excellent thermal efficiency. Whether for residential villas, commercial buildings, or industrial facilities, we customize every unit to match your project\'s style and performance requirements.',
    features: [
      { icon: <FiShield />, title: 'Weather Resistant', description: 'Built to withstand harsh UAE climate conditions with advanced weatherproofing technology.' },
      { icon: <FiZap />, title: 'Thermal Efficiency', description: 'Superior insulation properties that reduce energy costs and maintain indoor comfort.' },
      { icon: <FiTool />, title: 'Custom Designs', description: 'Tailored solutions to match your architectural vision and functional needs.' },
      { icon: <FiAward />, title: 'High Security', description: 'Robust locking systems and reinforced frames for maximum protection.' }
    ],
    specifications: [
      'Premium-grade aluminium profiles',
      'Smooth functionality mechanisms',
      'Advanced weather sealing',
      'High-security multi-point locks',
      'Thermal break technology',
      'Powder-coated finish options',
      'Custom color matching available',
      'Sound insulation properties'
    ],
    benefits: [
      'Long-lasting durability and performance',
      'Reduced energy consumption',
      'Enhanced property value',
      'Low maintenance requirements',
      'Modern aesthetic appeal',
      'Customizable to any design'
    ],
    applications: [
      'Residential Villas',
      'Commercial Buildings',
      'Industrial Facilities',
      'High-Rise Apartments',
      'Office Complexes',
      'Retail Spaces'
    ]
  },
  'curtain-walls': {
    title: 'Curtain Walls',
    icon: <BsBuilding />,
    tagline: 'ARCHITECTURAL EXCELLENCE',
    heroImage: '/services/detail/curtain-walls-hero.jpg',
    description: 'Our curtain wall systems combine architectural elegance with superior engineering. Designed to maximize natural light while maintaining structural integrity, Glassco\'s curtain walls improve energy efficiency, reduce noise, and elevate the building\'s façade.',
    fullDescription: 'We offer stick, unitized, and structural glazing systems—each fabricated with precision to ensure strength, weatherproofing, and long-term durability. Ideal for commercial towers, showrooms, and corporate buildings.',
    features: [
      { icon: <BsBuilding />, title: 'Structural Glazing', description: 'Seamless glass façades with hidden frames for modern aesthetics.' },
      { icon: <FiZap />, title: 'Energy Efficient', description: 'Advanced glazing technology that minimizes heat transfer and reduces cooling costs.' },
      { icon: <FiShield />, title: 'Weatherproofing', description: 'Complete protection against wind, rain, and extreme temperatures.' },
      { icon: <FiAward />, title: 'Modern Aesthetics', description: 'Sleek, contemporary designs that enhance building appearance.' }
    ],
    specifications: [
      'Stick system installation',
      'Unitized panel systems',
      'Structural silicone glazing',
      'High-performance glass options',
      'Thermal break technology',
      'Wind load calculations',
      'Water penetration testing',
      'Custom engineering designs'
    ],
    benefits: [
      'Maximum natural light penetration',
      'Superior energy performance',
      'Reduced building weight',
      'Faster installation time',
      'Enhanced building value',
      'Minimal maintenance'
    ],
    applications: [
      'Commercial Towers',
      'Corporate Buildings',
      'Shopping Malls',
      'Hotels & Resorts',
      'Exhibition Centers',
      'Airport Terminals'
    ]
  },
  'spider-glazing': {
    title: 'Spider Glazing',
    icon: <BsGrid3X3Gap />,
    tagline: 'SEAMLESS TRANSPARENCY',
    heroImage: '/services/detail/spider-glazing-hero.jpg',
    description: 'Glassco\'s spider glazing systems provide a seamless all-glass look for modern buildings. Using high-grade stainless steel spider fittings, the system delivers maximum transparency without compromising strength or safety.',
    fullDescription: 'Spider glazing is ideal for entrances, atriums, lobbies, and high-impact architectural spaces. Each installation is engineered to handle wind loads, vibrations, and point-load stress for unmatched performance.',
    features: [
      { icon: <BsGrid3X3Gap />, title: 'Point-Load System', description: 'Advanced spider fittings distribute loads efficiently across glass panels.' },
      { icon: <FiZap />, title: 'Maximum Transparency', description: 'Minimal visual obstruction with frameless glass design.' },
      { icon: <FiShield />, title: 'Wind Load Resistant', description: 'Engineered to withstand high wind pressures and structural movements.' },
      { icon: <FiAward />, title: 'Premium Fittings', description: 'High-grade stainless steel components for durability and aesthetics.' }
    ],
    specifications: [
      'Stainless steel spider fittings (Grade 304/316)',
      'Tempered or laminated glass',
      'Point-fixed glass systems',
      'Structural calculations included',
      'Wind load engineering',
      'Vibration analysis',
      'Custom fitting designs',
      'Polished or brushed finish'
    ],
    benefits: [
      'Unobstructed views',
      'Modern architectural statement',
      'Natural light optimization',
      'Flexible design possibilities',
      'Long-lasting performance',
      'Easy maintenance'
    ],
    applications: [
      'Building Entrances',
      'Atriums & Lobbies',
      'Skywalks & Bridges',
      'Canopies',
      'Showrooms',
      'Museum Facades'
    ]
  },
  'composite-cladding': {
    title: 'Composite Cladding',
    icon: <FiTool />,
    tagline: 'MODERN PROTECTION',
    heroImage: '/services/detail/cladding-hero.jpg',
    description: 'Our aluminium composite cladding solutions offer a clean, contemporary appearance combined with insulation, fire safety, and weather resistance.',
    fullDescription: 'Available in a wide range of colors and textures, Glassco cladding panels are designed to enhance building aesthetics while protecting exterior surfaces. Lightweight yet strong, our systems support easy installation and long-term performance for commercial and industrial projects.',
    features: [
      { icon: <FiShield />, title: 'Fire Resistant', description: 'Complies with international fire safety standards.' },
      { icon: <FiAward />, title: 'Weather Protection', description: 'Complete protection against environmental elements.' },
      { icon: <FiZap />, title: 'Lightweight', description: 'Easy to handle and install without compromising strength.' },
      { icon: <FiTool />, title: 'Easy Installation', description: 'Quick and efficient installation process.' }
    ],
    specifications: [
      'Aluminium composite panels (ACP)',
      'Fire-rated core materials',
      'Wide color range (RAL/custom)',
      'Various textures available',
      'Weather-resistant coating',
      'Lightweight panel design',
      'Easy-fix installation systems',
      'Custom panel fabrication'
    ],
    benefits: [
      'Enhanced building aesthetics',
      'Thermal insulation properties',
      'Long-lasting durability',
      'Low maintenance costs',
      'Quick installation time',
      'Cost-effective solution'
    ],
    applications: [
      'Commercial Buildings',
      'Industrial Facilities',
      'Retail Outlets',
      'Educational Institutions',
      'Healthcare Facilities',
      'Residential Projects'
    ]
  },
  'pergolas-canopy': {
    title: 'Pergolas & Canopies',
    icon: <FiTool />,
    tagline: 'OUTDOOR ELEGANCE',
    heroImage: '/services/detail/pergolas-hero.jpg',
    description: 'Glassco designs and installs premium pergolas and canopies that add style, shade, and protection to outdoor spaces.',
    fullDescription: 'Built with durable aluminium structures and optional glass or polycarbonate roofing, these systems enhance villas, terraces, gardens, and commercial outdoor areas. Each pergola or canopy is customized to match the client\'s preferred design, offering both functional comfort and architectural beauty.',
    features: [
      { icon: <FiTool />, title: 'Custom Designs', description: 'Tailored to your specific space and style preferences.' },
      { icon: <FiShield />, title: 'Durable Structure', description: 'Built to last with premium materials and engineering.' },
      { icon: <FiAward />, title: 'Weather Resistant', description: 'Protection from sun, rain, and harsh weather.' },
      { icon: <FiZap />, title: 'Elegant Finish', description: 'Beautiful designs that complement your property.' }
    ],
    specifications: [
      'Aluminium frame structures',
      'Glass or polycarbonate roofing',
      'Powder-coated finishes',
      'Custom size options',
      'Retractable roof options',
      'LED lighting integration',
      'Drainage systems included',
      'Wind load calculations'
    ],
    benefits: [
      'Outdoor space enhancement',
      'UV protection',
      'Increased property value',
      'Versatile usage options',
      'Low maintenance',
      'All-weather comfort'
    ],
    applications: [
      'Residential Villas',
      'Garden Areas',
      'Terraces & Patios',
      'Restaurant Outdoor Seating',
      'Pool Areas',
      'Parking Spaces'
    ]
  },
  'automatic-doors': {
    title: 'Automatic Doors',
    icon: <FiZap />,
    tagline: 'SMART ACCESS SOLUTIONS',
    heroImage: '/services/detail/automatic-doors-hero.jpg',
    description: 'We provide advanced automatic door systems for malls, hospitals, offices, and commercial spaces. Our solutions include sliding, swing, telescopic, and sensor-based doors engineered for smooth, quiet, and reliable operation.',
    fullDescription: 'With precision sensors, robust motors, and high safety standards, Glassco\'s automatic doors enhance accessibility, convenience, and modern aesthetics. Perfect for high-traffic areas requiring seamless entry and exit solutions.',
    features: [
      { icon: <FiZap />, title: 'Sensor Technology', description: 'Advanced motion sensors for reliable detection and smooth operation.' },
      { icon: <FiTool />, title: 'Smooth Operation', description: 'Quiet, efficient motors designed for continuous daily use.' },
      { icon: <FiShield />, title: 'High Safety', description: 'Built-in safety features to prevent accidents and ensure user protection.' },
      { icon: <FiAward />, title: 'Low Maintenance', description: 'Durable components requiring minimal upkeep and service.' }
    ],
    specifications: [
      'Sliding door systems',
      'Swing door operators',
      'Telescopic door units',
      'Motion sensor integration',
      'Safety beam systems',
      'Emergency breakout function',
      'Remote control operation',
      'Battery backup options',
      'Adjustable speed controls',
      'Weather-resistant designs'
    ],
    benefits: [
      'Enhanced accessibility',
      'Energy efficiency through controlled access',
      'Improved traffic flow',
      'Modern, professional appearance',
      'Reduced manual operation wear',
      'ADA compliance ready'
    ],
    applications: [
      'Shopping Malls',
      'Hospitals',
      'Office Buildings',
      'Hotels',
      'Airport Terminals',
      'Banks'
    ]
  },
  'steel-metal-decoration': {
    title: 'Steel and Metal Decoration Works',
    icon: <FiSettings />,
    tagline: 'ARTISTIC METALWORK',
    heroImage: '/services/detail/metal-decoration-hero.jpg',
    description: 'Glassco offers custom steel and metal decorative works to add elegance and character to interiors and exteriors. Our team fabricates railings, screens, artistic partitions, façade elements, and architectural accents using high-quality stainless steel, MS, and aluminium.',
    fullDescription: 'Every piece is crafted with precision cutting, welding, polishing, and finishing techniques to deliver a visually appealing and durable result. From contemporary designs to traditional patterns, we bring your vision to life.',
    features: [
      { icon: <FiTool />, title: 'Custom Fabrication', description: 'Tailored designs created to match your unique specifications.' },
      { icon: <FiAward />, title: 'Artistic Design', description: 'Creative patterns and contemporary aesthetics for stunning results.' },
      { icon: <FiShield />, title: 'Premium Finish', description: 'High-quality polishing, powder coating, and surface treatments.' },
      { icon: <FiZap />, title: 'Corrosion Resistant', description: 'Materials and finishes designed to withstand environmental exposure.' }
    ],
    specifications: [
      'Stainless steel (304/316 grade)',
      'Mild steel fabrication',
      'Aluminium metalwork',
      'Precision laser cutting',
      'TIG/MIG welding',
      'Powder coating finishes',
      'Polished and brushed options',
      'Custom pattern designs',
      'CNC bending and forming',
      'Protective coating application'
    ],
    benefits: [
      'Unique aesthetic enhancement',
      'Long-lasting durability',
      'Customizable to any design',
      'Adds property value',
      'Low maintenance requirements',
      'Weather and corrosion resistant'
    ],
    applications: [
      'Railings & Handrails',
      'Decorative Screens',
      'Façade Elements',
      'Interior Partitions',
      'Artistic Installations',
      'Staircase Features'
    ]
  },
  'gates-boundary-walls': {
    title: 'Gates and Boundary Walls',
    icon: <FiLock />,
    tagline: 'SECURITY & STYLE',
    heroImage: '/services/detail/gates-hero.jpg',
    description: 'We design and fabricate strong and stylish gates and boundary wall systems to enhance security and property aesthetics. From sliding and swing gates to decorative metal boundary designs, our solutions combine functionality with premium craftsmanship.',
    fullDescription: 'Made from high-grade steel and aluminium, each gate is corrosion-resistant, weatherproof, and designed for smooth operation with optional automation features. Perfect for residential villas, commercial properties, and industrial facilities.',
    features: [
      { icon: <FiLock />, title: 'Security First', description: 'Robust construction designed to provide maximum property protection.' },
      { icon: <FiZap />, title: 'Automation Ready', description: 'Compatible with automatic gate operators and access control systems.' },
      { icon: <FiShield />, title: 'Weather Proof', description: 'Corrosion-resistant materials and protective coatings for all climates.' },
      { icon: <FiAward />, title: 'Premium Materials', description: 'High-grade steel and aluminium ensuring longevity and strength.' }
    ],
    specifications: [
      'Sliding gate systems',
      'Swing gate mechanisms',
      'Cantilever gate options',
      'Automated gate operators',
      'Remote control access',
      'Intercom integration',
      'Safety sensors included',
      'Anti-climb designs',
      'Powder-coated finishes',
      'Custom height and width',
      'Decorative panel options',
      'Heavy-duty hinges and locks'
    ],
    benefits: [
      'Enhanced property security',
      'Increased privacy',
      'Aesthetic property enhancement',
      'Convenient automated access',
      'Durable and long-lasting',
      'Customizable designs'
    ],
    applications: [
      'Residential Villas',
      'Commercial Properties',
      'Industrial Facilities',
      'Gated Communities',
      'Parking Lots',
      'Government Buildings'
    ]
  },
  'partition-glazing': {
    title: 'Partition Glazing',
    icon: <FiMaximize2 />,
    tagline: 'SPACE OPTIMIZATION',
    heroImage: '/services/detail/partition-hero.jpg',
    description: 'Glassco provides modern glass partition systems for offices, homes, and commercial interiors. Our partitions improve space efficiency while maintaining openness, light flow, and acoustic comfort.',
    fullDescription: 'Available in clear, frosted, laminated, or double-glazed options, our systems offer style, privacy, and durability. Ideal for corporate offices, conference rooms, showrooms, and home interiors seeking a contemporary look.',
    features: [
      { icon: <FiMaximize2 />, title: 'Space Efficient', description: 'Maximize usable space without compromising functionality or aesthetics.' },
      { icon: <FiShield />, title: 'Acoustic Comfort', description: 'Sound insulation properties for quiet, productive environments.' },
      { icon: <FiZap />, title: 'Privacy Options', description: 'Choose from clear, frosted, tinted, or smart glass solutions.' },
      { icon: <FiAward />, title: 'Modern Look', description: 'Sleek, contemporary designs that enhance any interior space.' }
    ],
    specifications: [
      'Frameless glass partitions',
      'Aluminium framed systems',
      'Single and double glazing',
      'Tempered safety glass',
      'Laminated glass options',
      'Frosted and tinted glass',
      'Smart glass technology',
      'Sliding partition systems',
      'Fixed partition walls',
      'Floor-to-ceiling installations',
      'Custom sizes available',
      'Sound insulation ratings'
    ],
    benefits: [
      'Natural light penetration',
      'Visual spaciousness',
      'Flexible space division',
      'Easy reconfiguration',
      'Professional appearance',
      'Improved productivity'
    ],
    applications: [
      'Corporate Offices',
      'Conference Rooms',
      'Retail Showrooms',
      'Home Offices',
      'Medical Facilities',
      'Educational Institutions'
    ]
  },
  'glass-processing': {
    title: 'Glass Processing',
    icon: <FiTool />,
    tagline: 'PRECISION CRAFTSMANSHIP',
    heroImage: '/services/detail/glass-processing-hero.jpg',
    description: 'With advanced machinery and a skilled technical team, Glassco delivers comprehensive glass processing services including cutting, polishing, drilling, tempering, lamination, sandblasting, and insulated glass production.',
    fullDescription: 'Every process meets strict international quality standards to ensure high strength, clarity, and precision. We support small custom projects as well as large-scale architectural requirements with efficiency and reliability.',
    features: [
      { icon: <FiTool />, title: 'Precision Cutting', description: 'CNC-controlled cutting for exact dimensions and clean edges.' },
      { icon: <FiZap />, title: 'Tempering', description: 'Heat treatment process for enhanced strength and safety.' },
      { icon: <FiShield />, title: 'Lamination', description: 'Multi-layer glass bonding for security and sound insulation.' },
      { icon: <FiAward />, title: 'Quality Assured', description: 'International standards compliance and rigorous testing.' }
    ],
    specifications: [
      'CNC glass cutting',
      'Edge polishing (pencil, flat, beveled)',
      'CNC drilling and cutouts',
      'Tempering (up to 12mm)',
      'Laminated glass production',
      'Insulated glass units (IGU)',
      'Sandblasting and etching',
      'UV bonding technology',
      'Heat soak testing',
      'Quality control inspection',
      'Custom shapes and sizes',
      'Coating application'
    ],
    benefits: [
      'Precise specifications',
      'Enhanced glass strength',
      'Safety compliance',
      'Custom design flexibility',
      'Fast turnaround time',
      'Consistent quality output'
    ],
    applications: [
      'Architectural Projects',
      'Interior Design',
      'Furniture Manufacturing',
      'Automotive Industry',
      'Solar Applications',
      'Custom Projects'
    ]
  }
};

export default function ServiceDetailPage() {
  const{ slug} = useParams()
 
  const service = servicesData[slug];
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="text-9xl text-white">
            {service.icon}
          </div>
        </div>
        
        <div className="relative z-20 h-full flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="inline-block px-4 py-2 bg-amber-600/20 backdrop-blur-sm border border-amber-500/30 rounded-full text-amber-400 text-sm font-semibold tracking-wider mb-4">
                {service.tagline}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {service.title}
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                {service.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(217, 119, 6, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold shadow-xl border border-amber-500/30 flex items-center justify-center gap-2"
                >
                  Get a Quote
                  <FiArrowRight />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent text-white rounded-xl font-semibold border-2 border-white/30 hover:border-amber-500 hover:bg-white/5 transition-all"
                >
                  View Projects
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section ref={sectionRef} className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          {/* Overview */}
          <div className="max-w-4xl mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
            >
              Overview
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-gray-700 leading-relaxed"
            >
              {service.fullDescription}
            </motion.p>
          </div>

          {/* Key Features */}
          <div className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center"
            >
              Key <span className="text-amber-600">Features</span>
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-200 hover:border-amber-300 hover:shadow-xl transition-all"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Specifications & Benefits */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Specifications */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-slate-50 p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-1 h-8 bg-amber-600 rounded"></span>
                Technical Specifications
              </h3>
              <ul className="space-y-3">
                {service.specifications.map((spec, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FiCheckCircle className="text-amber-600 mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{spec}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-amber-50 p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-1 h-8 bg-amber-600 rounded"></span>
                Benefits
              </h3>
              <ul className="space-y-3">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FiCheckCircle className="text-amber-600 mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Applications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-20"
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Ideal <span className="text-amber-600">Applications</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {service.applications.map((app, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 hover:border-amber-500 rounded-xl p-4 text-center transition-all hover:shadow-lg"
                >
                  <span className="text-gray-800 font-medium text-sm">{app}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Contact our team for a detailed consultation and custom quote for your project.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(217, 119, 6, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold text-lg shadow-xl border border-amber-500/30 inline-flex items-center gap-2"
              >
                Request a Quote
                <FiArrowRight />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}