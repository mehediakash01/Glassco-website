'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash2, FiEye } from 'react-icons/fi';
import ServiceModal from './modals/ServiceModal';

export default function ServicesManager() {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  
  // Dummy data - will be replaced with API calls
  const services = [
    { id: 1, title: 'Aluminum Doors & Windows', category: 'aluminum', status: 'active' },
    { id: 2, title: 'Curtain Walls', category: 'glazing', status: 'active' },
    { id: 3, title: 'Spider Glazing', category: 'glazing', status: 'active' },
  ];

  const handleAdd = () => {
    setSelectedService(null);
    setShowModal(true);
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this service?')) {
      // API call to delete
      console.log('Delete service:', id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Services Management</h2>
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

      {/* Services Table */}
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
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg"></div>
                    <div>
                      <p className="font-semibold text-slate-900">{service.title}</p>
                      <p className="text-sm text-gray-600">ID: {service.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium capitalize">
                    {service.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium capitalize">
                    {service.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <FiEye />
                    </button>
                    <button 
                      onClick={() => handleEdit(service)}
                      className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                    >
                      <FiEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(service.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <ServiceModal
          service={selectedService}
          onClose={() => setShowModal(false)}
          onSave={(data) => {
            console.log('Save service:', data);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}