'use client'
import { FiLogOut, FiGrid, FiBriefcase, FiImage, FiMail, FiSettings } from 'react-icons/fi';

export default function Sidebar({ activeTab, setActiveTab, onLogout }) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <FiGrid /> },
    { id: 'services', label: 'Services', icon: <FiBriefcase /> },
    { id: 'projects', label: 'Projects', icon: <FiImage /> },
    { id: 'gallery', label: 'Gallery', icon: <FiImage /> },
    { id: 'contacts', label: 'Contacts', icon: <FiMail /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings /> }
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-gradient-to-b from-slate-900 to-slate-800 p-6 overflow-y-auto z-50">
      {/* Logo */}
      <div className="mb-8">
        <div className="text-3xl font-bold">
          <span className="text-white">GLASS</span>
          <span className="text-amber-500">CO</span>
        </div>
        <p className="text-gray-400 text-sm mt-1">Admin Dashboard</p>
      </div>

      {/* Menu */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              activeTab === item.id
                ? 'bg-amber-600 text-white shadow-lg'
                : 'text-gray-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300 mt-8"
      >
        <FiLogOut className="text-xl" />
        <span className="font-medium">Logout</span>
      </button>
    </aside>
  );
}