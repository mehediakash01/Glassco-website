// src/components/dashboard/ProjectModal.jsx
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { projectsAPI } from '@/lib/projectApi'; // We'll create this API helper like servicesAPI

const ProjectModal = ({ isOpen, onClose, project, onSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (project) {
      // populate form for editing
      setValue('title', project.title);
      setValue('category', project.category);
      setValue('location', project.location);
      setValue('year', project.year);
      setValue('service', project.service);
      setValue('description', project.description);
      setValue('client_type', project.client_type);
    } else {
      reset();
    }
  }, [project, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      let formData = new FormData();
      for (let key in data) {
        if (key === 'image' && data.image[0]) {
          formData.append('image', data.image[0]);
        } else {
          formData.append(key, data[key]);
        }
      }

      let response;
      if (project) {
        response = await projectsAPI.update(project.id, formData);
      } else {
        response = await projectsAPI.create(formData);
      }

      if (response.success) {
       toast.success('Success', response.message, 'success');
        onSuccess();
        onClose();
      } else {
        toast.error('Error', response.error, 'error');
      }
    } catch (err) {
      console.error(err);
     toast.error('Error', 'Something went wrong', 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">{project ? 'Edit Project' : 'Add Project'}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input {...register('title', { required: true })} placeholder="Title" className="input" />
          <input {...register('category', { required: true })} placeholder="Category" className="input" />
          <input {...register('location', { required: true })} placeholder="Location" className="input" />
          <input type="number" {...register('year', { required: true })} placeholder="Year" className="input" />
          <input {...register('service', { required: true })} placeholder="Service" className="input" />
          <textarea {...register('description', { required: true })} placeholder="Description" className="input" />
          <input {...register('client_type', { required: true })} placeholder="Client Type" className="input" />
          <input type="file" {...register('image')} className="input" />

          <div className="flex justify-end gap-2 mt-3">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">{project ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
