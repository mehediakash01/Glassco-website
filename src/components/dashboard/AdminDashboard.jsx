'use client'
import { useState, useEffect } from 'react';

import Sidebar from './Sidebar';
import Overview from './Overview';
import ServicesManager from './ServicesManager';
// import ProjectsManager from './ProjectsManager';
// import GalleryManager from './GalleryManager';
// import ContactsView from './ContactsView';
import LoginForm from './LoginForm';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
      setIsAuthenticated(true);
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
    <div className="min-h-screen bg-slate-50">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
      />
      
      <main className="ml-64 p-8">
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'services' && <ServicesManager />}
        {/* {activeTab === 'projects' && <ProjectsManager />}
        {activeTab === 'gallery' && <GalleryManager />}
        {activeTab === 'contacts' && <ContactsView />} */}
        {activeTab === 'settings' && <div>Settings (Coming soon)</div>}
      </main>
    </div>
  );
}