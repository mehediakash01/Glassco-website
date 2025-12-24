'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSave, FiPlus, FiTrash2, FiUpload } from 'react-icons/fi';

export default function ServiceModal({ service, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    tagline: '',
    category: '',
    description: '',
    fullDescription: '',
    icon: '',
    image: null,
    features: [{ title: '', description: '', icon: '' }],
    specifications: [''],
    benefits: [''],
    applications: ['']
  });

  // Load existing service data for editing
  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || '',
        slug: service.slug || '',
        tagline: service.tagline || '',
        category: service.category || '',
        description: service.description || '',
        fullDescription: service.fullDescription || '',
        icon: service.icon || '',
        image: service.image || null,
        features: service.features || [{ title: '', description: '', icon: '' }],
        specifications: service.specifications || [''],
        benefits: service.benefits || [''],
        applications: service.applications || ['']
      });
    }
  }, [service]);

  // Auto-generate slug from title
  const handleTitleChange = (value) => {
    setFormData({
      ...formData,
      title: value,
      slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    });
  };

  // Handle basic field changes
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Handle array field changes (specs, benefits, applications)
  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  // Handle feature changes
  const handleFeatureChange = (index, field, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index][field] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, { title: '', description: '', icon: '' }]
    });
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validation
    if (!formData.title || !formData.slug || !formData.description) {
      alert('Please fill in required fields');
      return;
    }

    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-4xl w-full p-8 my-8 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4 border-b">
          <h3 className="text-2xl font-bold text-slate-900">
            {service ? 'Edit Service' : 'Add New Service'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            <FiX />
          </button>
        </div>

        <div className="space-y-8">
          {/* Basic Information */}
          <section>
            <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-amber-600 rounded"></span>
              Basic Information
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  placeholder="e.g., Aluminum Doors and Windows"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none bg-gray-50"
                  placeholder="auto-generated"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  placeholder="e.g., PREMIUM QUALITY"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                >
                  <option value="">Select category</option>
                  <option value="aluminum">Aluminum Works</option>
                  <option value="glazing">Glazing Systems</option>
                  <option value="cladding">Cladding</option>
                  <option value="outdoor">Outdoor Solutions</option>
                  <option value="automation">Automation</option>
                  <option value="metalwork">Metal Works</option>
                  <option value="processing">Processing</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Short Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="3"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                placeholder="Brief description for listing pages"
              ></textarea>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Description
              </label>
              <textarea
                rows="5"
                value={formData.fullDescription}
                onChange={(e) => handleChange('fullDescription', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                placeholder="Detailed description for service detail page"
              ></textarea>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-amber-500 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <FiUpload className="mx-auto text-4xl text-gray-400 mb-2" />
                  <p className="text-gray-600">Click to upload image</p>
                  <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                  {formData.image && (
                    <p className="text-sm text-green-600 mt-2">Image selected: {formData.image.name || 'Image uploaded'}</p>
                  )}
                </label>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-1 h-6 bg-amber-600 rounded"></span>
                Key Features
              </h4>
              <button
                onClick={addFeature}
                className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <FiPlus /> Add Feature
              </button>
            </div>

            {formData.features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-xl mb-3">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-semibold text-gray-700">Feature {index + 1}</span>
                  {formData.features.length > 1 && (
                    <button
                      onClick={() => removeFeature(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                    className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                    placeholder="Feature title"
                  />
                  <input
                    type="text"
                    value={feature.icon}
                    onChange={(e) => handleFeatureChange(index, 'icon', e.target.value)}
                    className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                    placeholder="Icon name (optional)"
                  />
                  <input
                    type="text"
                    value={feature.description}
                    onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                    className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none md:col-span-3"
                    placeholder="Feature description"
                  />
                </div>
              </div>
            ))}
          </section>

          {/* Specifications */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-1 h-6 bg-amber-600 rounded"></span>
                Technical Specifications
              </h4>
              <button
                onClick={() => addArrayItem('specifications')}
                className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <FiPlus /> Add Spec
              </button>
            </div>

            {formData.specifications.map((spec, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={spec}
                  onChange={(e) => handleArrayChange('specifications', index, e.target.value)}
                  className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  placeholder="e.g., Premium-grade aluminium profiles"
                />
                {formData.specifications.length > 1 && (
                  <button
                    onClick={() => removeArrayItem('specifications', index)}
                    className="px-3 text-red-600 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>
                )}
              </div>
            ))}
          </section>

          {/* Benefits */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-1 h-6 bg-amber-600 rounded"></span>
                Benefits
              </h4>
              <button
                onClick={() => addArrayItem('benefits')}
                className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <FiPlus /> Add Benefit
              </button>
            </div>

            {formData.benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                  className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  placeholder="e.g., Long-lasting durability and performance"
                />
                {formData.benefits.length > 1 && (
                  <button
                    onClick={() => removeArrayItem('benefits', index)}
                    className="px-3 text-red-600 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>
                )}
              </div>
            ))}
          </section>

          {/* Applications */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-1 h-6 bg-amber-600 rounded"></span>
                Ideal Applications
              </h4>
              <button
                onClick={() => addArrayItem('applications')}
                className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <FiPlus /> Add Application
              </button>
            </div>

            {formData.applications.map((app, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={app}
                  onChange={(e) => handleArrayChange('applications', index, e.target.value)}
                  className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  placeholder="e.g., Residential Villas"
                />
                {formData.applications.length > 1 && (
                  <button
                    onClick={() => removeArrayItem('applications', index)}
                    className="px-3 text-red-600 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>
                )}
              </div>
            ))}
          </section>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 sticky bottom-0 bg-white border-t pb-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <FiSave />
              {service ? 'Update Service' : 'Save Service'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}