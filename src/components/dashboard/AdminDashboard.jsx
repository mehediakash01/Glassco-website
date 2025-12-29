'use client';
import { useState, useEffect } from 'react';
import { FiMenu } from 'react-icons/fi';

import Sidebar from '@/components/dashboard/Sidebar';
import Overview from './Overview';
import ServicesManager from './ServicesManager';
import ProjectsManager from './ProjectManager';
import LoginForm from './LoginForm';
import SectionWrapper from '../SectionWrapper';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fix: avoid direct sync setState inside effect
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (isLoggedIn === "true") {
      setTimeout(() => setIsAuthenticated(true), 0);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    setIsAuthenticated(false);
    setActiveTab('overview');
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        className={`fixed z-40 inset-y-0 left-0 w-64 transform bg-gradient-to-b from-black to-black transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:shadow-none`}
      />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-h-screen md:ml-64">
        <div className="flex items-center justify-between bg-white p-4 shadow md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-2xl text-gray-700"
          >
            <FiMenu />
          </button>
          <span className="font-bold text-lg">GLASSCO Dashboard</span>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm"
          >
            Logout
          </button>
        </div>

        <SectionWrapper className="flex-1 p-4 md:p-8 overflow-auto">
          {activeTab === 'overview' && <Overview />}
          {activeTab === 'services' && <ServicesManager />}
          {activeTab === 'projects' && <ProjectsManager />}
          {activeTab === 'settings' && <div>Settings (Coming soon)</div>}
        </SectionWrapper>
      </div>
    </div>
  );
}
