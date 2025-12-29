'use client'
import { motion } from 'framer-motion';
import { FiGrid, FiBriefcase, FiImage, FiMail } from 'react-icons/fi';

export default function Overview() {
  const stats = [
    { label: 'Total Services', value: '10', icon: <FiGrid />, color: 'from-blue-500 to-blue-600' },
    { label: 'Total Projects', value: '25', icon: <FiBriefcase />, color: 'from-green-500 to-green-600' },
    { label: 'Gallery Items', value: '48', icon: <FiImage />, color: 'from-purple-500 to-purple-600' },
    { label: 'Contact Inquiries', value: '12', icon: <FiMail />, color: 'from-amber-500 to-amber-600' }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-black mb-8">Dashboard Overview</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-white text-2xl mb-4`}>
              {stat.icon}
            </div>
            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-black">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-black mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <FiMail className="text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-black">New contact submission</p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}