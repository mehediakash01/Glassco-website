'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiLogOut, 
  FiGrid,
  FiBriefcase,
  FiImage,
  FiUsers,
  FiMail,
  FiSettings,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiSave,
  FiX
} from 'react-icons/fi';

// Hardcoded credentials (temporary)
const ADMIN_CREDENTIALS = {
  email: 'admin@glasscotrade.com',
  password: 'Glassco@2025'
};

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  // Check if user is logged in on mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Login Component
  const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      setTimeout(() => {
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
          localStorage.setItem('adminLoggedIn', 'true');
          setIsAuthenticated(true);
        } else {
          setError('Invalid email or password');
        }
        setLoading(false);
      }, 1000);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="text-4xl font-bold mb-2">
                <span className="text-slate-900">GLASS</span>
                <span className="text-amber-600">CO</span>
              </div>
              <div className="h-1 w-20 bg-amber-600 mx-auto rounded-full mb-4"></div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Admin Dashboard</h2>
              <p className="text-gray-600">Sign in to manage your content</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6"
              >
                {error}
              </motion.div>
            )}

            <div onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors"
                  placeholder="admin@glasscotrade.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <motion.button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </motion.button>
            </div>

            {/* Demo Credentials (Remove in production) */}
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-xs text-amber-800 font-semibold mb-2">Demo Credentials:</p>
              <p className="text-xs text-amber-700">Email: admin@glasscotrade.com</p>
              <p className="text-xs text-amber-700">Password: Glassco@2025</p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    setIsAuthenticated(false);
  };

  // Dashboard Stats
  const stats = [
    { label: 'Total Services', value: '10', icon: <FiGrid />, color: 'from-blue-500 to-blue-600' },
    { label: 'Total Projects', value: '25', icon: <FiBriefcase />, color: 'from-green-500 to-green-600' },
    { label: 'Gallery Items', value: '48', icon: <FiImage />, color: 'from-purple-500 to-purple-600' },
    { label: 'Contact Inquiries', value: '12', icon: <FiMail />, color: 'from-amber-500 to-amber-600' }
  ];

  // Sidebar menu items
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <FiGrid /> },
    { id: 'services', label: 'Services', icon: <FiBriefcase /> },
    { id: 'projects', label: 'Projects', icon: <FiImage /> },
    { id: 'gallery', label: 'Gallery', icon: <FiImage /> },
    { id: 'contacts', label: 'Contacts', icon: <FiMail /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings /> }
  ];

  // Modal for adding/editing content
  const Modal = ({ type, onClose }) => {
    const [formData, setFormData] = useState({});

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-slate-900">Add New {type}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              <FiX />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                placeholder="Enter title"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                placeholder="Enter description"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none">
                <option>Select category</option>
                <option>Commercial</option>
                <option>Residential</option>
                <option>Industrial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Image Upload</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-amber-500 transition-colors cursor-pointer">
                <FiImage className="mx-auto text-4xl text-gray-400 mb-2" />
                <p className="text-gray-600">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <FiSave />
                Save
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Content Area based on active tab
  const ContentArea = () => {
    if (activeTab === 'overview') {
      return (
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Dashboard Overview</h2>
          
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
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <FiMail className="text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">New contact submission</p>
                    <p className="text-sm text-gray-600">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Services, Projects, Gallery tabs
    return (
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 capitalize">{activeTab}</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setModalType(activeTab);
              setShowModal(true);
            }}
            className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            <FiPlus />
            Add New
          </motion.button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg"></div>
                      <div>
                        <p className="font-semibold text-slate-900">Sample {activeTab} {item}</p>
                        <p className="text-sm text-gray-600">Added 2 days ago</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      Commercial
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <FiEye />
                      </button>
                      <button className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                        <FiEdit />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Main Dashboard Layout
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-gradient-to-b from-slate-900 to-slate-800 p-6 overflow-y-auto">
        {/* Logo */}
        <div className="mb-8">
          <div className="text-3xl font-bold">
            <span className="text-white">GLASS</span>
            <span className="text-amber-500">CO</span>
          </div>
          <p className="text-gray-400 text-sm mt-1">Admin Dashboard</p>
        </div>

        {/* Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === item.id
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'text-gray-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300 mt-8"
        >
          <FiLogOut className="text-xl" />
          <span className="font-medium">Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <ContentArea />
      </main>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <Modal 
            type={modalType} 
            onClose={() => setShowModal(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;