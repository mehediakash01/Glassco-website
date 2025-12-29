'use client'
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash2, FiEye, FiLoader, FiRefreshCw, FiAlertCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import ServiceModal from './modals/ServiceModal';
import { servicesAPI } from '../../lib/serviceApi';

export default function ServicesManager() {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoized fetchServices to avoid production setState errors
  const fetchServices = useCallback(async () => {
    let mounted = true; // prevent state update if component unmounts

    setLoading(true);
    setError(null);

    try {
      const result = await servicesAPI.getAll();

      if (!mounted) return;

      if (result.success) {
        setServices(result.data);
      } else {
        setError(result.error);
        toast.error('Failed to load services');
      }
    } catch (err) {
      if (!mounted) return;
      setError(err.message || 'Something went wrong');
      toast.error('Failed to load services');
    } finally {
      if (mounted) setLoading(false);
    }

    return () => {
      mounted = false;
    };
  }, []);

  // Call fetchServices on mount
  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleAdd = () => {
    setSelectedService(null);
    setShowModal(true);
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleDelete = async (slug, title) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-gray-900">Delete {title}?</p>
        <p className="text-sm text-gray-600">This action cannot be undone.</p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);

              const loadingToast = toast.loading('Deleting service...');

              const result = await servicesAPI.delete(slug);

              toast.dismiss(loadingToast);

              if (result.success) {
                toast.success('Service deleted successfully!', {
                  icon: '🗑️',
                  duration: 3000,
                });
                fetchServices();
              } else {
                toast.error(`Failed to delete: ${result.error}`, {
                  duration: 4000,
                });
              }
            }}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      style: { maxWidth: '400px' },
    });
  };

  const handleSave = () => {
    fetchServices();
  };

  const getCategoryColor = (category) => {
    const colors = {
      aluminum: 'bg-blue-100 text-blue-700',
      glazing: 'bg-purple-100 text-purple-700',
      cladding: 'bg-green-100 text-green-700',
      outdoor: 'bg-amber-100 text-amber-700',
      automation: 'bg-indigo-100 text-indigo-700',
      metalwork: 'bg-gray-100 text-gray-700',
      processing: 'bg-pink-100 text-pink-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <FiLoader className="animate-spin text-5xl text-amber-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-black">Services Management</h2>
          <p className="text-gray-600 mt-1">Manage your company services and offerings</p>
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchServices}
            className="px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-amber-500 hover:text-amber-600 transition-all flex items-center gap-2"
          >
            <FiRefreshCw className={loading ? 'animate-spin' : ''} />
            Refresh
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            <FiPlus />
            Add New Service
          </motion.button>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3"
        >
          <FiAlertCircle className="text-red-600 text-2xl flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-red-900">Error Loading Services</h3>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
          <button
            onClick={fetchServices}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Retry
          </button>
        </motion.div>
      )}

      {services.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <p className="text-gray-600 text-sm mb-1">Total Services</p>
            <p className="text-2xl font-bold text-black">{services.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <p className="text-gray-600 text-sm mb-1">Categories</p>
            <p className="text-2xl font-bold text-amber-600">
              {new Set(services.map(s => s.category)).size}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <p className="text-gray-600 text-sm mb-1">Active</p>
            <p className="text-2xl font-bold text-green-600">
              {services.filter(s => s.is_active !== false).length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <p className="text-gray-600 text-sm mb-1">With Images</p>
            <p className="text-2xl font-bold text-blue-600">
              {services.filter(s => s.image_url).length}
            </p>
          </div>
        </div>
      )}

      {services.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-12 text-center shadow-lg"
        >
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Services Yet</h3>
          <p className="text-gray-600 mb-6">Get started by adding your first service</p>
          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2"
          >
            <FiPlus />
            Add First Service
          </button>
        </motion.div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Service</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Features</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <AnimatePresence>
                  {services.map((service, index) => (
                    <motion.tr
                      key={service.id || service.slug}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                            {service.image_url ? (
                              <img
                                src={service.image_url}
                                alt={service.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-xl">🏗️</span>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-black">{service.title}</p>
                            <p className="text-sm text-gray-600">/{service.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getCategoryColor(service.category)}`}>
                          {service.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          service.is_active !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {service.is_active !== false ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 text-xs text-gray-600">
                          {service.features && service.features.length > 0 && (
                            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded">
                              {service.features.length} features
                            </span>
                          )}
                          {service.specifications && service.specifications.length > 0 && (
                            <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded">
                              {service.specifications.length} specs
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                            <FiEye />
                          </button>
                          <button 
                            onClick={() => handleEdit(service)}
                            className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FiEdit />
                          </button>
                          <button 
                            onClick={() => handleDelete(service.slug, service.title)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <ServiceModal
            service={selectedService}
            onClose={() => setShowModal(false)}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
