// lib/serviceApi.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const servicesAPI = {
  // Get all services
  async getAll(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.category) queryParams.append('category', params.category);
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);

      const url = `${API_BASE_URL}/api/services${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        cache: 'no-store',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch services');
      }

      return { 
        success: result.success !== false,
        data: result.data || [],
        pagination: result.pagination || null
      };
    } catch (error) {
      console.error('Error fetching services:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to fetch services'
      };
    }
  },

  // Get service by slug
  async getBySlug(slug) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/services/${slug}`, {
        method: 'GET',
        cache: 'no-store',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch service');
      }

      return { 
        success: result.success !== false,
        data: result.data
      };
    } catch (error) {
      console.error('Error fetching service:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to fetch service'
      };
    }
  },

  // Create new service
  async create(serviceData) {
    try {
      const formData = new FormData();
      
      // Append simple fields
      const simpleFields = ['title', 'slug', 'tagline', 'category', 'description', 'fullDescription', 'icon'];
      simpleFields.forEach(field => {
        if (serviceData[field] !== undefined && serviceData[field] !== null) {
          formData.append(field, serviceData[field]);
        }
      });

      // Append arrays as JSON strings (filter out empty values)
      const arrayFields = ['features', 'specifications', 'benefits', 'applications'];
      arrayFields.forEach(field => {
        if (serviceData[field]) {
          const filteredData = field === 'features' 
            ? serviceData[field].filter(item => item.title || item.description)
            : serviceData[field].filter(item => item && item.trim() !== '');
          
          formData.append(field, JSON.stringify(filteredData));
        }
      });

      // Append image if it's a File object
      if (serviceData.image && serviceData.image instanceof File) {
        formData.append('image', serviceData.image);
      }

      const response = await fetch(`${API_BASE_URL}/api/services`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create service');
      }

      return { 
        success: result.success !== false,
        data: result.data,
        message: result.message || 'Service created successfully'
      };
    } catch (error) {
      console.error('Error creating service:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to create service'
      };
    }
  },

  // Update service
  async update(slug, serviceData) {
    try {
      const formData = new FormData();
      
      // Append simple fields
      const simpleFields = ['title', 'slug', 'tagline', 'category', 'description', 'fullDescription', 'icon'];
      simpleFields.forEach(field => {
        if (serviceData[field] !== undefined && serviceData[field] !== null) {
          formData.append(field, serviceData[field]);
        }
      });

      // Append arrays as JSON strings (filter out empty values)
      const arrayFields = ['features', 'specifications', 'benefits', 'applications'];
      arrayFields.forEach(field => {
        if (serviceData[field]) {
          const filteredData = field === 'features' 
            ? serviceData[field].filter(item => item.title || item.description)
            : serviceData[field].filter(item => item && item.trim() !== '');
          
          formData.append(field, JSON.stringify(filteredData));
        }
      });

      // Append image if it's a File object
      if (serviceData.image && serviceData.image instanceof File) {
        formData.append('image', serviceData.image);
      }

      const response = await fetch(`${API_BASE_URL}/api/services/${slug}`, {
        method: 'PUT',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to update service');
      }

      return { 
        success: result.success !== false,
        data: result.data,
        message: result.message || 'Service updated successfully'
      };
    } catch (error) {
      console.error('Error updating service:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to update service'
      };
    }
  },

  // Delete service
  async delete(slug) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/services/${slug}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to delete service');
      }

      return { 
        success: result.success !== false,
        message: result.message || 'Service deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting service:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to delete service'
      };
    }
  },
};