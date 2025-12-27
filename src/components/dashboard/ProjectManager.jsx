'use client';
import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash2, FiRefreshCw, FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';
import ProjectModal from './modals/ProjectModal';
import { projectsAPI } from '@/lib/projectApi';

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Memoized fetchProjects to prevent cascading renders
  const fetchProjects = useCallback(async () => {
    let mounted = true;

    setLoading(true);

    try {
      const res = await projectsAPI.getAll();
      if (!mounted) return;

      if (res.success || Array.isArray(res)) {
        setProjects(Array.isArray(res) ? res : res.data);
      } else {
        toast.error(res.error || 'Failed to load projects');
      }
    } catch (err) {
      if (!mounted) return;
      console.error(err);
      toast.error('Failed to load projects');
    } finally {
      if (mounted) setLoading(false);
    }

    return () => {
      mounted = false;
    };
  }, []);

  // Call fetchProjects on mount
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleAdd = () => {
    setSelectedProject(null);
    setModalOpen(true);
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('This will delete the project permanently! Are you sure?');
    if (!confirm) return;

    const toastId = toast.loading('Deleting project...');
    try {
      const res = await projectsAPI.delete(id);
      if (res.success || res.message) {
        toast.success('Project deleted successfully', { id: toastId });
        fetchProjects();
      } else {
        toast.error(res.error || 'Failed to delete project', { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete project', { id: toastId });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <FiLoader className="animate-spin text-5xl text-amber-600 mx-auto" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Projects Management</h2>
        <div className="flex gap-3">
          <button
            onClick={fetchProjects}
            className="px-4 py-2 bg-white border rounded-lg flex items-center gap-2 hover:bg-gray-50"
          >
            <FiRefreshCw /> Refresh
          </button>
          <button
            onClick={handleAdd}
            className="px-6 py-2 bg-amber-600 text-white rounded-lg flex items-center gap-2 hover:bg-amber-700"
          >
            <FiPlus /> Add Project
          </button>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Projects Yet</h3>
          <p className="text-gray-600 mb-6">Start by adding a new project</p>
          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700"
          >
            <FiPlus /> Add Project
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-slate-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Year</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Service</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {projects.map((project) => (
                    <motion.tr
                      key={project.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">{project.title}</td>
                      <td className="px-6 py-4">{project.category}</td>
                      <td className="px-6 py-4">{project.year}</td>
                      <td className="px-6 py-4">{project.service}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <FiTrash2 />
                        </button>
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
        {modalOpen && (
          <ProjectModal
            isOpen={modalOpen}
            project={selectedProject}
            onClose={() => setModalOpen(false)}
            onSave={fetchProjects}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
