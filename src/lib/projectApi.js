// src/lib/projectApi.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const projectsAPI = {
  async getAll() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects`);
      const result = await res.json();
      return result;
    } catch (err) {
      console.error('Error fetching projects:', err);
      return { success: false, error: err.message || 'Failed to fetch projects' };
    }
  },

  async create(formData) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects`, {
        method: 'POST',
        body: formData,
      });
      return await res.json();
    } catch (err) {
      console.error('Error creating project:', err);
      return { success: false, error: err.message || 'Failed to create project' };
    }
  },

  async update(id, formData) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: 'PUT',
        body: formData,
      });
      return await res.json();
    } catch (err) {
      console.error('Error updating project:', err);
      return { success: false, error: err.message || 'Failed to update project' };
    }
  },

  async delete(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects/${id}`, { method: 'DELETE' });
      return await res.json();
    } catch (err) {
      console.error('Error deleting project:', err);
      return { success: false, error: err.message || 'Failed to delete project' };
    }
  },
};
