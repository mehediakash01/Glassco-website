'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiSave, FiPlus, FiTrash2, FiUpload, FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { projectsAPI } from '@/lib/projectApi';

export default function ProjectModal({ project, onClose, onSave }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    year: '',
    service: '',
    description: '',
    client_type: '',
    image: null,
    features: [{ title: '', description: '', icon: '' }],
    specifications: [''],
    benefits: [''],
    applications: ['']
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        category: project.category || '',
        location: project.location || '',
        year: project.year || '',
        service: project.service || '',
        description: project.description || '',
        client_type: project.client_type || '',
        image: project.image_url || project.image || null,
        features: project.features && project.features.length > 0 
          ? project.features 
          : [{ title: '', description: '', icon: '' }],
        specifications: project.specifications && project.specifications.length > 0 
          ? project.specifications 
          : [''],
        benefits: project.benefits && project.benefits.length > 0 
          ? project.benefits 
          : [''],
        applications: project.applications && project.applications.length > 0 
          ? project.applications 
          : ['']
      });
    }
  }, [project]);

  const handleChange = (field, value) => setFormData({ ...formData, [field]: value });

  const handleArrayChange = (field, index, value) => {
    const arr = [...formData[field]];
    arr[index] = value;
    setFormData({ ...formData, [field]: arr });
  };

  const addArrayItem = (field) => setFormData({ ...formData, [field]: [...formData[field], ''] });

  const removeArrayItem = (field, index) => {
    const arr = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: arr });
  };

  const handleFeatureChange = (index, key, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index][key] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => setFormData({
    ...formData,
    features: [...formData.features, { title: '', description: '', icon: '' }]
  });

  const removeFeature = (index) => setFormData({
    ...formData,
    features: formData.features.filter((_, i) => i !== index)
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return toast.error('Please upload a valid image');
    if (file.size > 5 * 1024 * 1024) return toast.error('Image must be <5MB');
    setFormData({ ...formData, image: file });
    toast.success('Image selected');
  };

  const validateForm = () => {
    if (!formData.title.trim()) return toast.error('Title is required');
    if (!formData.category.trim()) return toast.error('Category is required');
    if (!formData.description.trim()) return toast.error('Description is required');
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const toastId = toast.loading(project ? 'Updating project...' : 'Creating project...');
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'image' && formData.image) data.append('image', formData.image);
        else if (Array.isArray(formData[key]) || typeof formData[key] === 'object') {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      });

      let result;
      if (project) result = await projectsAPI.update(project.id, data);
      else result = await projectsAPI.create(data);

      toast.dismiss(toastId);
      if (result.success || result.id) {
        toast.success(project ? 'Project updated!' : 'Project created!');
        onSave(result.data || {});
        onClose();
      } else {
        toast.error(result.error || 'Failed to save project');
      }
    } catch (err) {
      toast.dismiss(toastId);
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
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
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4 border-b z-10">
          <h3 className="text-2xl font-bold text-slate-900">
            {project ? 'Edit Project' : 'Add New Project'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl transition-colors disabled:opacity-50" disabled={loading}>
            <FiX />
          </button>
        </div>

        <div className="space-y-8">
          {/* Basic Info */}
          <section>
            <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-amber-600 rounded"></span>Basic Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none disabled:bg-gray-100"
                  placeholder="Project Title"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none disabled:bg-gray-100"
                  placeholder="Project Category"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none disabled:bg-gray-100"
                  placeholder="Project Location"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => handleChange('year', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none disabled:bg-gray-100"
                  placeholder="2025"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
              <textarea
                rows="3"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none disabled:bg-gray-100"
                placeholder="Short description"
                disabled={loading}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Client Type</label>
              <input
                type="text"
                value={formData.client_type}
                onChange={(e) => handleChange('client_type', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none disabled:bg-gray-100"
                placeholder="Client Type"
                disabled={loading}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Project Image</label>
              <div className={`border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-amber-500 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  disabled={loading}
                />
                <label htmlFor="image-upload" className={loading ? 'cursor-not-allowed' : 'cursor-pointer'}>
                  <FiUpload className="mx-auto text-4xl text-gray-400 mb-2" />
                  <p className="text-gray-600">Click to upload image (optional)</p>
                  <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                  {formData.image && (
                    <p className="text-sm text-green-600 mt-2 font-medium">
                      ✓ {formData.image.name || 'Image uploaded'}
                    </p>
                  )}
                </label>
              </div>
            </div>
          </section>

          {/* Features, Specs, Benefits, Applications */}
          {['features', 'specifications', 'benefits', 'applications'].map((section) => (
            <section key={section}>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-1 h-6 bg-amber-600 rounded"></span>
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </h4>
                <button
                  onClick={() => section === 'features' ? addFeature() : addArrayItem(section)}
                  className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2 text-sm font-medium disabled:opacity-50"
                  disabled={loading}
                >
                  <FiPlus /> Add {section.slice(0, -1)}
                </button>
              </div>

              {formData[section].map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  {section === 'features' ? (
                    <>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleFeatureChange(idx, 'title', e.target.value)}
                        className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none disabled:bg-gray-100"
                        placeholder="Title"
                        disabled={loading}
                      />
                      <input
                        type="text"
                        value={item.icon}
                        onChange={(e) => handleFeatureChange(idx, 'icon', e.target.value)}
                        className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none disabled:bg-gray-100"
                        placeholder="Icon"
                        disabled={loading}
                      />
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleFeatureChange(idx, 'description', e.target.value)}
                        className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none disabled:bg-gray-100"
                        placeholder="Description"
                        disabled={loading}
                      />
                      {formData.features.length > 1 && (
                        <button
                          onClick={() => removeFeature(idx)}
                          className="px-3 text-red-600 hover:text-red-700 disabled:opacity-50"
                          disabled={loading}
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleArrayChange(section, idx, e.target.value)}
                        className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none disabled:bg-gray-100"
                        placeholder={section.slice(0, -1)}
                        disabled={loading}
                      />
                      {formData[section].length > 1 && (
                        <button
                          onClick={() => removeArrayItem(section, idx)}
                          className="px-3 text-red-600 hover:text-red-700 disabled:opacity-50"
                          disabled={loading}
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </>
                  )}
                </div>
              ))}
            </section>
          ))}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 sticky bottom-0 bg-white border-t pb-4 z-10">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin" />
                  {project ? 'Updating...' : 'Saving...'}
                </>
              ) : (
                <>
                  <FiSave />
                  {project ? 'Update Project' : 'Save Project'}
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
